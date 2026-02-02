WidgetMetadata = {
    id: "trakt_personal_key",
    title: "Trakt 追剧日历 免key版",
    author: "𝙈𝙖𝙠𝙠𝙖𝙋𝙖𝙠𝙠𝙖",
    description: "内置 API Key 版：只需填写用户名即可使用。显示追剧日历、待看、收藏及历史记录。",
    version: "1.0.8", // 版本号微升
    requiredVersion: "0.0.1",
    site: "https://trakt.tv",

    globalParams: [
        { name: "traktUser", title: "Trakt 用户名 (必填)", type: "input", value: "" }
    ],

    modules: [
        {
            title: "我的片单",
            functionName: "loadTraktProfile",
            type: "list",
            cacheDuration: 300,
            params: [
                {
                    name: "section",
                    title: "浏览区域",
                    type: "enumeration",
                    value: "updates",
                    enumOptions: [
                        { title: "📅 追剧日历", value: "updates" },
                        { title: "📜 待看列表", value: "watchlist" },
                        { title: "📦 收藏列表", value: "collection" }, // UI 显示为收藏，实际获取 Favorites
                        { title: "🕒 观看历史", value: "history" }
                    ]
                },
                {
                    name: "type",
                    title: "内容筛选",
                    type: "enumeration",
                    value: "all",
                    belongTo: { paramName: "section", value: ["watchlist", "collection", "history"] },
                    enumOptions: [ { title: "全部", value: "all" }, { title: "剧集", value: "shows" }, { title: "电影", value: "movies" } ]
                },
                {
                    name: "updateSort",
                    title: "追剧模式",
                    type: "enumeration",
                    value: "future_first",
                    belongTo: { paramName: "section", value: ["updates"] },
                    enumOptions: [
                        { title: "🔜 从今天往后", value: "future_first" },
                        { title: "🔄 按更新倒序", value: "air_date_desc" },
                        { title: "👁️ 按观看倒序", value: "watched_at" }
                    ]
                },
                { name: "page", title: "页码", type: "page" }
            ]
        }
    ]
};

// ==========================================
// 0. 全局配置 & 工具函数
// ==========================================

const TRAKT_CLIENT_ID = "95b59922670c84040db3632c7aac6f33704f6ffe5cbf3113a056e37cb45cb482";

function formatShortDate(dateStr) {
    if (!dateStr) return "待定";
    const date = new Date(dateStr);
    const m = (date.getMonth() + 1).toString().padStart(2, '0');
    const d = date.getDate().toString().padStart(2, '0');
    return `${m}-${d}`;
}

// ==========================================
// 1. 主逻辑
// ==========================================

async function loadTraktProfile(params = {}) {
    const { traktUser, section, updateSort = "future_first", type = "all", page = 1 } = params;

    if (!traktUser) return [{ id: "err", type: "text", title: "请填写 Trakt 用户名" }];

    // === A. 追剧日历 (Updates) ===
    if (section === "updates") {
        return await loadUpdatesLogic(traktUser, TRAKT_CLIENT_ID, updateSort, page);
    }

    // === B. 常规列表 ===
    let rawItems = [];
    const sortType = "added,desc"; 
    
    if (type === "all") {
        const [movies, shows] = await Promise.all([
            fetchTraktList(section, "movies", sortType, page, traktUser, TRAKT_CLIENT_ID),
            fetchTraktList(section, "shows", sortType, page, traktUser, TRAKT_CLIENT_ID)
        ]);
        rawItems = [...movies, ...shows];
    } else {
        rawItems = await fetchTraktList(section, type, sortType, page, traktUser, TRAKT_CLIENT_ID);
    }
    
    // 统一按时间倒序排列
    rawItems.sort((a, b) => new Date(getItemTime(b, section)) - new Date(getItemTime(a, section)));
    
    if (!rawItems || rawItems.length === 0) return page === 1 ? [{ id: "empty", type: "text", title: "列表为空" }] : [];

    const promises = rawItems.map(async (item) => {
        const subject = item.show || item.movie || item;
        if (!subject?.ids?.tmdb) return null;
        let subInfo = "";
        const timeStr = getItemTime(item, section);
        if (timeStr) subInfo = timeStr.split('T')[0];
        if (type === "all") subInfo = `[${item.show ? "剧" : "影"}] ${subInfo}`;
        return await fetchTmdbDetail(subject.ids.tmdb, item.show ? "tv" : "movie", subInfo, subject.title);
    });
    return (await Promise.all(promises)).filter(Boolean);
}

// ==========================================
// 2. 追剧日历逻辑 (保持不变)
// ==========================================

async function loadUpdatesLogic(user, id, sort, page) {
    const url = `https://api.trakt.tv/users/${user}/watched/shows?extended=noseasons&limit=100`;
    try {
        const res = await Widget.http.get(url, {
            headers: { "Content-Type": "application/json", "trakt-api-version": "2", "trakt-api-key": id }
        });
        const data = res.data || [];
        if (data.length === 0) return [{ id: "empty", type: "text", title: "无观看记录" }];

        const enrichedShows = await Promise.all(data.slice(0, 60).map(async (item) => {
            if (!item.show?.ids?.tmdb) return null;
            const tmdb = await fetchTmdbShowDetails(item.show.ids.tmdb);
            if (!tmdb) return null;
            
            const nextAir = tmdb.next_episode_to_air?.air_date;
            const lastAir = tmdb.last_episode_to_air?.air_date;
            const sortDate = nextAir || lastAir || "1970-01-01";
            const today = new Date().toISOString().split('T')[0];
            const isFuture = sortDate >= today;

            return {
                trakt: item, tmdb: tmdb,
                sortDate: sortDate,
                isFuture: isFuture,
                watchedDate: item.last_watched_at
            };
        }));

        const valid = enrichedShows.filter(Boolean);
        
        if (sort === "future_first") {
            const futureShows = valid.filter(s => s.isFuture && s.tmdb.next_episode_to_air);
            const pastShows = valid.filter(s => !s.isFuture || !s.tmdb.next_episode_to_air);
            futureShows.sort((a, b) => new Date(a.sortDate) - new Date(b.sortDate));
            pastShows.sort((a, b) => new Date(b.sortDate) - new Date(a.sortDate));
            valid.length = 0; 
            valid.push(...futureShows, ...pastShows);
        } else if (sort === "air_date_desc") {
            valid.sort((a, b) => new Date(b.sortDate) - new Date(a.sortDate));
        } else {
            valid.sort((a, b) => new Date(b.watchedDate) - new Date(a.watchedDate));
        }

        const start = (page - 1) * 15;
        return valid.slice(start, start + 15).map(item => {
            const d = item.tmdb;
            let displayStr = "暂无排期";
            let icon = "📅";
            let epData = null;

            if (d.next_episode_to_air) {
                icon = "🔜";
                epData = d.next_episode_to_air;
            } else if (d.last_episode_to_air) {
                icon = "📅";
                epData = d.last_episode_to_air;
            }

            if (epData) {
                const shortDate = formatShortDate(epData.air_date);
                displayStr = `${icon} ${shortDate} 📺 S${epData.season_number}E${epData.episode_number}`;
            }

            return {
                id: String(d.id), 
                tmdbId: d.id, 
                type: "tmdb", 
                mediaType: "tv",
                title: d.name, 
                genreTitle: displayStr, 
                subTitle: displayStr,
                posterPath: d.poster_path ? `https://image.tmdb.org/t/p/w500${d.poster_path}` : "",
                description: `上次观看: ${item.watchedDate.split("T")[0]}\n${d.overview}`
            };
        });
    } catch (e) { return []; }
}

// ==========================================
// 3. 核心修复区：API 映射与时间获取
// ==========================================

async function fetchTraktList(section, type, sort, page, user, id) {
    const limit = 20; 
    let url = "";

    // 修复重点：如果选的是 "collection" (收藏)，则请求 Favorites List 接口
    if (section === "collection") {
        url = `https://api.trakt.tv/users/${user}/favorites/${type}?extended=full&page=${page}&limit=${limit}`;
    } else {
        // watchlist, history 保持原样
        url = `https://api.trakt.tv/users/${user}/${section}/${type}?extended=full&page=${page}&limit=${limit}`;
    }

    try {
        const res = await Widget.http.get(url, {
            headers: { "Content-Type": "application/json", "trakt-api-version": "2", "trakt-api-key": id }
        });
        return Array.isArray(res.data) ? res.data : [];
    } catch (e) { return []; }
}

function getItemTime(item, section) {
    if (section === "watchlist") return item.listed_at;
    if (section === "history") return item.watched_at;
    
    // 修复重点：收藏列表 (Favorites) 的时间字段是 listed_at
    if (section === "collection") return item.listed_at;
    
    return item.created_at || "1970-01-01";
}

async function fetchTmdbDetail(id, type, subInfo, originalTitle) {
    try {
        const d = await Widget.tmdb.get(`/${type}/${id}`, { params: { language: "zh-CN" } });
        const year = (d.first_air_date || d.release_date || "").substring(0, 4);
        return {
            id: String(d.id), tmdbId: d.id, type: "tmdb", mediaType: type,
            title: d.name || d.title || originalTitle,
            genreTitle: year, subTitle: subInfo, description: d.overview,
            posterPath: d.poster_path ? `https://image.tmdb.org/t/p/w500${d.poster_path}` : ""
        };
    } catch (e) { return null; }
}

async function fetchTmdbShowDetails(id) {
    try { return await Widget.tmdb.get(`/tv/${id}`, { params: { language: "zh-CN" } }); } catch (e) { return null; }
}
