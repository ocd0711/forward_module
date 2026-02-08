// =============UserScript=============
// @name         影视聚合终极版 (内置Key)
// @version      3.1.0
// @description  三合一：豆瓣全能推荐 | TMDB探索 | Trakt猜你喜欢
// @author       Forward_User & Fix
// =============UserScript=============

// 🔑 已内置您提供的 Key
var DEFAULT_TMDB_KEY = "d913a144d0ba98fdca978f53a1ce27a5";
var UA_PC = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
// ============================================================================
// 1. 常量定义 (API 映射与类型映射)
// ============================================================================

const DOUBAN_URLS = {
    // 📺 剧集组
    "tv_american": "https://m.douban.com/rexxar/api/v2/subject_collection/tv_american/items",
    "tv_korean": "https://m.douban.com/rexxar/api/v2/subject_collection/tv_korean/items",
    "tv_japanese": "https://m.douban.com/rexxar/api/v2/subject_collection/tv_japanese/items",
    "tv_domestic": "https://m.douban.com/rexxar/api/v2/subject_collection/tv_domestic/items",
    "tv_animation": "https://m.douban.com/rexxar/api/v2/subject_collection/tv_animation/items",
    // 🎬 电影组
    "movie_hot": "https://m.douban.com/rexxar/api/v2/subject_collection/movie_real_time_hotest/items",
    "movie_weekly": "https://m.douban.com/rexxar/api/v2/subject_collection/movie_weekly_best/items",
    "movie_top250": "https://m.douban.com/rexxar/api/v2/subject_collection/movie_top250/items",
    "movie_showing": "https://m.douban.com/rexxar/api/v2/subject_collection/movie_showing/items",
    // 🎤 综艺组
    "show_domestic": "https://m.douban.com/rexxar/api/v2/subject_collection/show_domestic/items",
    "show_foreign": "https://m.douban.com/rexxar/api/v2/subject_collection/show_foreign/items",
    // 🏆 榜单组
    "tv_global_best": "https://m.douban.com/rexxar/api/v2/subject_collection/tv_global_best_weekly/items",
    "tv_chinese_best": "https://m.douban.com/rexxar/api/v2/subject_collection/tv_chinese_best_weekly/items"
};

const GENRE_MAP = {
    28: "动作", 12: "冒险", 16: "动画", 35: "喜剧", 80: "犯罪", 99: "纪录片",
    18: "剧情", 10751: "家庭", 14: "奇幻", 36: "历史", 27: "恐怖", 10402: "音乐",
    9648: "悬疑", 10749: "爱情", 878: "科幻", 10770: "电视电影", 53: "惊悚",
    10752: "战争", 37: "西部", 10759: "动作冒险", 10765: "科幻奇幻"
};

var WidgetMetadata = {
    id: "forward.combined.makkapakka",
    title: "影视榜单Lite",
    description: "豆瓣全能推荐 | TMDB探索 | 猜你想看",
    author: "𝙈𝙖𝙠𝙠𝙖𝙋𝙖𝙠𝙠𝙖",
    version: "1.0.4",
    requiredVersion: "0.0.1",

    // 🔴 移除了所有全局参数
    globalParams: [],
    modules: [
        // =================================================
        // 🟢 一级栏目 1：豆瓣 (Douban)
        // =================================================
        {
            title: "🟢 豆瓣",
            description: "剧集 / 电影 / 综艺 / 榜单",
            functionName: "loadDoubanModule",
            params: [
                {
                    name: "category",
                    title: "选择栏目",
                    type: "enumeration",
                    value: "tv_american",
                    enumOptions: [
                        // --- 剧集推荐 ---
                        { value: "tv_american", title: "📺 英美剧" },
                        { value: "tv_korean", title: "📺 韩剧" },
                        { value: "tv_japanese", title: "📺 日剧" },
                        { value: "tv_domestic", title: "📺 国产剧" },
                        { value: "tv_animation", title: "🌸 日本动画" },
                        // --- 电影推荐 ---
                        { value: "movie_hot", title: "🎬 实时热门电影" },
                        { value: "movie_weekly", title: "🎬 一周口碑电影" },
                        { value: "movie_top250", title: "🎬 豆瓣 Top250" },
                        { value: "movie_showing", title: "🎬 院线热映" },
                        // --- 综艺推荐 ---
                        { value: "show_domestic", title: "🎤 国内综艺" },
                        { value: "show_foreign", title: "🎤 国外综艺" },
                        // --- 榜单 ---
                        { value: "tv_global_best", title: "🏆 全球口碑剧集" },
                        { value: "tv_chinese_best", title: "🏆 华语口碑剧集" }
                    ]
                },
                { name: "page", title: "页码", type: "page" }
            ]
        },

        // =================================================
        // 🔵 一级栏目 2：TMDB (The Movie Database)
        // =================================================
        {
            title: "🔵 TMDB",
            description: "探索电影与剧集",
            functionName: "loadTMDBModule",
            type: "video",
            params: [
                {
                    name: "mode", title: "模式", type: "enumeration", value: "movie",
                    enumOptions: [ { value: "movie", title: "🎬 电影筛选" }, { value: "tv", title: "📺 剧集筛选" } ]
                },
                {
                    name: "genre", title: "类型", type: "enumeration", value: "",
                    enumOptions: [
                        { title: "全部", value: "" },
                        { title: "动作/冒险", value: "28" }, { title: "科幻/奇幻", value: "878" },
                        { title: "剧情", value: "18" }, { title: "喜剧", value: "35" },
                        { title: "动画", value: "16" }, { title: "悬疑/犯罪", value: "9648" },
                        { title: "恐怖/惊悚", value: "27" }, { title: "爱情", value: "10749" }
                    ]
                },
                { name: "year", title: "年份", type: "input", description: "例如: 2024", value: "" },
                {
                    name: "sort_by", title: "排序", type: "enumeration", value: "popularity.desc",
                    enumOptions: [
                        { title: "🔥 热度最高", value: "popularity.desc" },
                        { title: "⭐️ 评分最高", value: "vote_average.desc" },
                        { title: "🆕 最新上映", value: "primary_release_date.desc" }
                    ]
                },
                { name: "page", title: "页码", type: "page" }
            ]
        }
    ]
};

// ============================================================================
// 工具函数
// ============================================================================

function safeJsonParse(data) {
    try {
        if (typeof data === 'object') return data;
        return JSON.parse(data);
    } catch (e) { return null; }
}

function cleanPath(path) {
    if (!path) return undefined;
    if (path.startsWith("/")) return path;
    return "/" + path;
}

// 补全 TMDB 图片路径
function getTmdbImage(path) {
    if (!path) return undefined;
    if (path.startsWith("/")) return "https://image.tmdb.org/t/p/w500" + path;
    return path;
}

// 辅助函数：将ID数组转换为类型字符串（如 "科幻 / 剧情"）
function getGenreString(ids) {
    if (!ids || !ids.length) return "";
    return ids.map(function(id) { return GENRE_MAP[id]; })
              .filter(Boolean)
              .slice(0, 3) 
              .join(" / ");
}

// ============================================================================
// 🟢 模块逻辑 1：豆瓣 (统一入口)
// ============================================================================

async function searchTmdb(title, year, apiKey, isTv) {
    if (!title) return null;
    var url = "https://api.themoviedb.org/3/search/multi?api_key=" + apiKey + "&language=zh-CN&query=" + encodeURIComponent(title);
    try {
        var res = await Widget.http.get(url);
        var data = safeJsonParse(res.data);
        if (!data || !data.results || data.results.length === 0) return null;
        
        var validItems = data.results.filter(function(item) {
            return item.media_type === 'movie' || item.media_type === 'tv';
        });
        if (validItems.length === 0) return null;

        if (year) {
            var targetYear = parseInt(year);
            var match = validItems.find(function(item) {
                var d = item.release_date || item.first_air_date || "0000";
                var y = parseInt(d.substring(0, 4));
                return Math.abs(y - targetYear) <= 1;
            });
            if (match) return match;
        }

        if (isTv) {
             var tvMatch = validItems.find(function(item) { return item.media_type === 'tv'; });
             if (tvMatch) return tvMatch;
        }
        return validItems[0];
    } catch (e) { return null; }
}

async function loadDoubanModule(params) {
    var categoryKey = params.category;
    var url = DOUBAN_URLS[categoryKey];
    
    if (!url) return [{ title: "配置错误", subTitle: "未找到API", type: "text" }];

    var page = params.page || 1;
    // 使用内置 Key
    var apiKey = DEFAULT_TMDB_KEY;
    var isTv = (url.indexOf("tv") > -1 || url.indexOf("show") > -1);

    var count = 20;
    var start = (page - 1) * count;
    var finalUrl = url.includes("?") ? `${url}&start=${start}&count=${count}` : `${url}?start=${start}&count=${count}`;

    try {
        var headers = { "Referer": "https://m.douban.com/", "User-Agent": UA_PC };
        var res = await Widget.http.get(finalUrl, { headers: headers });
        var data = safeJsonParse(res.data);
        
        if (!data || !data.subject_collection_items) return [{ title: "列表为空", type: "text" }];

        var items = data.subject_collection_items;
        var promises = items.map(async function(item) {
            var title = item.title;
            var year = item.year;
            var sub = item.card_subtitle || "";
            var rate = item.rating ? item.rating.value : 0;
            
            var tmdbItem = await searchTmdb(title, year, apiKey, isTv);

            if (tmdbItem) {
                // ✅ 1. 构造 genreTitle (年份 • 类型)
                var dateStr = tmdbItem.release_date || tmdbItem.first_air_date || (year + "");
                var yearStr = dateStr.substring(0, 4);
                var genreStr = getGenreString(tmdbItem.genre_ids);
                var finalGenreTitle = [yearStr, genreStr].filter(Boolean).join(" • ");

                return {
                    id: String(tmdbItem.id),
                    tmdbId: tmdbItem.id,
                    type: "tmdb",
                    mediaType: tmdbItem.media_type,
                    title: tmdbItem.title || tmdbItem.name || title,
                    
                    // ✨ 核心修改点
                    genreTitle: finalGenreTitle, // 显示: 2024 • 剧情 / 科幻
                    subTitle: "⭐ " + rate,      // 显示: ⭐ 8.5
                    
                    description: item.info || tmdbItem.overview,
                    posterPath: cleanPath(tmdbItem.poster_path),
                    backdropPath: cleanPath(tmdbItem.backdrop_path),
                    rating: tmdbItem.vote_average,
                    releaseDate: tmdbItem.release_date || tmdbItem.first_air_date
                };
            } else {
                // 兜底逻辑：使用原图
                var cover = "";
                if (item.cover && item.cover.url) {
                    cover = item.cover.url;
                } else if (item.pic && item.pic.normal) {
                    cover = item.pic.normal;
                }

                return {
                    id: String(item.id),
                    type: "link",
                    mediaType: isTv ? "tv" : "movie",
                    title: title,
                    
                    // 兜底显示
                    genreTitle: (year ? year : "") + " • " + sub,
                    subTitle: "⭐ " + rate,
                    description: "TMDB 未收录",
                    
                    posterPath: cover, // 直连原图
                    rating: rate,
                    link: item.url || `https://movie.douban.com/subject/${item.id}/`
                };
            }
        });
        return await Promise.all(promises);
    } catch (e) { return [{ title: "错误", subTitle: e.message, type: "text" }]; }
}

// ============================================================================
// 🔵 模块逻辑 2：TMDB (统一入口)
// ============================================================================

function buildTmdbItem(item, mediaType) {
    var title = item.title || item.name;
    var dateStr = item.release_date || item.first_air_date || "";
    var yearStr = dateStr.substring(0, 4);
    var vote = item.vote_average ? item.vote_average.toFixed(1) : "0.0";
    var genreNames = getGenreString(item.genre_ids);

    // TMDB 模块保持一致布局
    var finalGenreTitle = [yearStr, genreNames].filter(Boolean).join(" • ");

    return {
        id: String(item.id),
        tmdbId: item.id,
        type: "tmdb",
        mediaType: mediaType,
        title: title,
        description: item.overview || "",
        
        // ✨ 核心修改点
        genreTitle: finalGenreTitle, // 2024 • 动作 / 冒险
        subTitle: "⭐ " + vote,      // ⭐ 7.8
        
        posterPath: getTmdbImage(item.poster_path),
        backdropPath: getTmdbImage(item.backdrop_path),
        releaseDate: dateStr,
        rating: item.vote_average
    };
}

async function loadTMDBModule(params) {
    var mode = params.mode || "movie"; 
    var page = params.page || 1;
    var queryParams = {
        api_key: DEFAULT_TMDB_KEY, // 强制内置Key
        language: "zh-CN",
        page: page,
        sort_by: params.sort_by || "popularity.desc",
        include_adult: false
    };

    if (params.genre) queryParams.with_genres = params.genre;
    if (params.year) {
        if (mode === "movie") queryParams.primary_release_year = params.year;
        else queryParams.first_air_date_year = params.year;
    }
    if (params.sort_by && params.sort_by.includes("vote_average")) queryParams["vote_count.gte"] = 100;

    var endpoint = (mode === "movie") ? "/discover/movie" : "/discover/tv";
    var baseUrl = "https://api.themoviedb.org/3";

    try {
        var queryString = Object.keys(queryParams).map(k => k + '=' + queryParams[k]).join('&');
        var res = await Widget.http.get(`${baseUrl}${endpoint}?${queryString}`);
        var data = safeJsonParse(res.data);
        var items = (data && data.results) ? data.results : [];
        return items.map(function(item) { return buildTmdbItem(item, mode); });
    } catch (e) { return []; }
}
