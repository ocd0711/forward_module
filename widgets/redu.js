WidgetMetadata = {
    id: "tmdb_upcoming_center_makka",
    title: "即将上映与热映榜",
    description: "追踪院线即将上映的电影与最新剧集，热度显示，不错过任何一部大片",
    author: "𝙈𝙖𝙠𝙠𝙖𝙋𝙖𝙠𝙠𝙖",
    version: "1.0.0",
    requiredVersion: "0.0.1",
    modules: [
        {
            title: "🎬 新片追踪",
            functionName: "loadUpcoming",
            type: "list",
            cacheDuration: 3600, // 缓存1小时
            params: [
                {
                    name: "category",
                    title: "选择频道",
                    type: "enumeration",
                    value: "movie_upcoming",
                    enumOptions: [
                        { title: "🍿 即将上映 (期待榜)", value: "movie_upcoming" },
                        { title: "🔥 正在热映 (院线)", value: "movie_now_playing" },
                        { title: "📺 近期开播 (新剧集)", value: "tv_on_the_air" },
                        { title: "📅 今日首播 (追更)", value: "tv_airing_today" }
                    ]
                },
                { name: "page", title: "页码", type: "page", startPage: 1 }
            ]
        }
    ]
};

// ================= 逻辑处理部分 =================

// 数据格式化函数，包含倒计时计算魔法
function buildItem(item, mediaType) {
    if (!item) return null;
    
    // 兼容电影和剧集的标题与日期字段
    const title = item.title || item.name;
    const releaseDate = item.release_date || item.first_air_date || "";
    
    // 计算上映倒计时
    let dateLabel = `📅 ${releaseDate}`;
    if (releaseDate) {
        const today = new Date();
        // 抹平时间差，只对比日期
        today.setHours(0, 0, 0, 0); 
        const rDate = new Date(releaseDate);
        rDate.setHours(0, 0, 0, 0);
        
        const diffTime = rDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays > 0) {
            dateLabel = `⏳ 还有 ${diffDays} 天上映 (${releaseDate})`;
        } else if (diffDays === 0) {
            dateLabel = `🔥 今天首映! (${releaseDate})`;
        } else {
            dateLabel = `✅ 已上映 (${releaseDate})`;
        }
    }

    const score = item.vote_average ? item.vote_average.toFixed(1) : "暂无";
    const popularity = item.popularity ? `热度: ${Math.round(item.popularity)}` : "";

    return {
        id: String(item.id),
        tmdbId: parseInt(item.id),
        type: "tmdb", // FW 核心：调起原生页面获取预告片
        mediaType: mediaType,
        title: title,
        // 将倒计时和评分组合显示在副标题
        subTitle: `${dateLabel} | ⭐ ${score}`,
        coverUrl: item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : "",
        backdropPath: item.backdrop_path ? `https://image.tmdb.org/t/p/w780${item.backdrop_path}` : "",
        description: item.overview || "这部影片目前还没有中文简介，敬请期待！",
        rating: item.vote_average || 0,
        // 添加一个额外标签显示关注度
        genreTitle: popularity 
    };
}

// 主请求函数
async function loadUpcoming(params) {
    const category = params.category || "movie_upcoming";
    const page = params.page || 1;

    let endpoint = "";
    let mediaType = "movie";

    // 路由匹配
    if (category === "movie_upcoming") {
        endpoint = "/movie/upcoming";
    } else if (category === "movie_now_playing") {
        endpoint = "/movie/now_playing";
    } else if (category === "tv_on_the_air") {
        endpoint = "/tv/on_the_air";
        mediaType = "tv";
    } else if (category === "tv_airing_today") {
        endpoint = "/tv/airing_today";
        mediaType = "tv";
    }

    try {
        const queryParams = { 
            language: "zh-CN", 
            page: page,
            region: "US" // 加入 region 参数，保证上映时间的准确性（好莱坞大片以北美时间为主）
        };

        const res = await Widget.tmdb.get(endpoint, { params: queryParams });
        const items = (res.results || []).map(i => buildItem(i, mediaType)).filter(Boolean);
        
        return items;

    } catch (error) {
        console.error("请求失败:", error);
        return [{
            id: "error",
            type: "text",
            title: "加载失败",
            description: "获取最新上映数据失败，请下拉刷新或检查网络"
        }];
    }
}
