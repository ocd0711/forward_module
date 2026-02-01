WidgetMetadata = {
    id: "variety_hub_ultimate_v4_fix",
    title: "全球综艺追更热度榜",
    author: "𝙈𝙖𝙠𝙠𝙖𝙋𝙖𝙠𝙠𝙖",
    description: "综艺更新时间表，热度榜",
    version: "2.0.3",
    requiredVersion: "0.0.1",
    site: "https://www.themoviedb.org",

    modules: [
        {
            title: "综艺聚合",
            functionName: "loadVarietyUltimate",
            type: "list",
            cacheDuration: 300, 
            params: [
                {
                    name: "listType",
                    title: "榜单类型",
                    type: "enumeration",
                    value: "calendar",
                    enumOptions: [
                        { title: "📅 追新榜 (未来排期)", value: "calendar" },
                        { title: "🔥 热度榜 (按流行度)", value: "hot" }
                    ]
                },
                {
                    name: "days",
                    title: "预告范围",
                    type: "enumeration",
                    value: "14",
                    belongTo: { paramName: "listType", value: ["calendar"] },
                    enumOptions: [
                        { title: "未来 7 天", value: "7" },
                        { title: "未来 14 天", value: "14" },
                        { title: "未来 30 天", value: "30" }
                    ]
                },
                {
                    name: "region",
                    title: "地区筛选",
                    type: "enumeration",
                    value: "all",
                    enumOptions: [
                        { title: "🌏 全部地区", value: "all" },
                        { title: "🇨🇳 国内综艺", value: "cn" },
                        { title: "✈️ 国外综艺", value: "global" }
                    ]
                },
                { name: "page", title: "页码", type: "page" }
            ]
        }
    ]
};

// =========================================================================
// 0. 工具函数
// =========================================================================

// 格式化日期 MM-30
function formatShortDate(dateStr) {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const m = (date.getMonth() + 1).toString().padStart(2, '0');
    const d = date.getDate().toString().padStart(2, '0');
    return `${m}-${d}`;
}

// 获取今天 (YYYY-MM-DD) - 用于比较
function getTodayStr() {
    const d = new Date();
    // 简单粗暴处理时区，确保取到的是当前用户所在日期的字符串
    const offset = d.getTimezoneOffset() * 60000;
    const local = new Date(d.getTime() - offset);
    return local.toISOString().split('T')[0];
}

// 获取 N 天后的日期
function getFutureDateStr(days) {
    const d = new Date();
    d.setDate(d.getDate() + parseInt(days));
    const offset = d.getTimezoneOffset() * 60000;
    const local = new Date(d.getTime() - offset);
    return local.toISOString().split('T')[0];
}

// =========================================================================
// 1. 核心逻辑
// =========================================================================

async function loadVarietyUltimate(params = {}) {
    const { listType = "calendar", region = "all", days = "14", page = 1 } = params;

    const todayStr = getTodayStr(); // 获取今天的日期字符串 (2026-01-30)

    let discoverUrl = `/discover/tv`;
    let queryParams = {
        language: "zh-CN",
        page: page,
        with_genres: "10764|10767", 
        sort_by: "popularity.desc",
        "vote_count.gte": 0,
        include_null_first_air_dates: false
    };

    if (region === "cn") {
        queryParams.with_origin_country = "CN";
    } else if (region === "global") {
        queryParams.with_origin_country = "US|KR|JP|GB|TW|HK|TH";
    }

    // === 📅 步骤1：初步筛选 ===
    if (listType === "calendar") {
        const endDate = getFutureDateStr(days);
        // API 查询时，gte 设为今天
        queryParams["air_date.gte"] = todayStr;
        queryParams["air_date.lte"] = endDate;
    }

    try {
        const res = await Widget.tmdb.get(discoverUrl, { params: queryParams });
        const rawResults = res.results || [];

        if (rawResults.length === 0) return [];

        const detailPromises = rawResults.map(async (item) => {
            if (!item.poster_path) return null;

            try {
                const detail = await Widget.tmdb.get(`/tv/${item.id}`, { 
                    params: { language: "zh-CN" } 
                });
                
                const nextEp = detail.next_episode_to_air;
                const lastEp = detail.last_episode_to_air;
                
                let sortDate = "1900-01-01"; 
                let displayInfoStr = ""; 

                // 逻辑：找到最接近未来的那一集
                if (nextEp) {
                    sortDate = nextEp.air_date;
                    displayInfoStr = `${formatShortDate(sortDate)} S${nextEp.season_number}E${nextEp.episode_number}`;
                } else if (lastEp) {
                    sortDate = lastEp.air_date;
                    displayInfoStr = `${formatShortDate(sortDate)} S${lastEp.season_number}E${lastEp.episode_number}`;
                } else {
                    sortDate = item.first_air_date;
                    displayInfoStr = `${formatShortDate(sortDate)} 首播`;
                }

                // === 🛑 步骤2：最终强制过滤 (The Strict Gatekeeper) ===
                // 无论这一集是 next 还是 last，只要它的日期 < 今天，直接扔掉。
                // 这样就能干掉 "01-29" 这种昨天的数据
                if (listType === "calendar") {
                    if (!sortDate || sortDate < todayStr) {
                        return null; 
                    }
                }

                return {
                    detail: detail,
                    sortDate: sortDate,
                    displayInfoStr: displayInfoStr
                };
            } catch (e) {
                return null;
            }
        });

        const detailedItems = (await Promise.all(detailPromises)).filter(Boolean);

        // === 📅 步骤3：排序 (今天 -> 未来) ===
        if (listType === "calendar") {
            detailedItems.sort((a, b) => {
                if (a.sortDate === b.sortDate) return 0;
                return a.sortDate > b.sortDate ? 1 : -1; 
            });
        }

        return detailedItems.map(data => {
            const { detail, displayInfoStr, sortDate } = data;
            
            let finalGenreTitle = "";
            let finalSubTitle = "";

            if (listType === "calendar") {
                finalGenreTitle = displayInfoStr; 
                finalSubTitle = displayInfoStr;   
            } else {
                finalGenreTitle = `${detail.vote_average.toFixed(1)}分`;
                finalSubTitle = `🔥 热度 ${Math.round(detail.popularity)}`;
            }

            return {
                id: String(detail.id),
                tmdbId: detail.id,
                type: "tmdb",
                mediaType: "tv",
                title: detail.name || detail.original_name,
                genreTitle: finalGenreTitle, 
                subTitle: finalSubTitle,
                posterPath: detail.poster_path ? `https://image.tmdb.org/t/p/w500${detail.poster_path}` : "",
                backdropPath: detail.backdrop_path ? `https://image.tmdb.org/t/p/w780${detail.backdrop_path}` : "",
                description: `📅 播出时间: ${sortDate}\n${detail.overview || "暂无简介"}`,
                rating: detail.vote_average ? detail.vote_average.toFixed(1) : "0.0",
                year: (detail.first_air_date || "").substring(0, 4)
            };
        });

    } catch (e) {
        return [{ id: "err", type: "text", title: "加载失败", subTitle: e.message }];
    }
}
