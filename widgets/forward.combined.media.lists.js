WidgetMetadata = {
  id: "forward.combined.media.lists",
  title: "影视榜单",
  description: "影视动画榜单",
  author: "𝓑𝓾𝓽𝓽𝓮𝓻𝓯𝓵𝔂",
  site: "https://for-ward.vercel.app",
  version: "1.5.1",
  requiredVersion: "0.0.2",
  detailCacheDuration: 60,
  modules: [
    // -------------TMDB模块-------------
    // --- 热门模块 ---
    {
      title: "TMDB 热门剧集",
      description: "今日热门电视剧",
      requiresWebView: false,
      functionName: "loadTodayHotTV",
      cacheDuration: 3600,
      params: [
        { name: "language", title: "语言", type: "language", value: "zh-CN" },
        { 
          name: "sort_by", 
          title: "地区", 
          type: "enumeration", 
          enumOptions: [
            { title: "全部地区", value: "" },
            { title: "中国", value: "CN" },
            { title: "美国", value: "US" },
            { title: "韩国", value: "KR" },
            { title: "日本", value: "JP" },
            { title: "英国", value: "GB" },
            { title: "泰国", value: "TH" },
            { title: "意大利", value: "IT" },
            { title: "德国", value: "DE" },
            { title: "西班牙", value: "ES" },
            { title: "俄罗斯", value: "RU" },
            { title: "瑞典", value: "SE" },
            { title: "巴西", value: "BR" },
            { title: "丹麦", value: "DK" },
            { title: "印度", value: "IN" },
            { title: "加拿大", value: "CA" },
            { title: "爱尔兰", value: "IE" },
            { title: "澳大利亚", value: "AU" }
          ], 
          value: "" 
        },
        { name: "page", title: "页码", type: "page" }
      ]
    },
    {
      title: "TMDB 热门电影",
      description: "今日热门电影",
      requiresWebView: false,
      functionName: "loadTodayHotMovies",
      cacheDuration: 3600,
      params: [
        { name: "language", title: "语言", type: "language", value: "zh-CN" },
        { 
          name: "sort_by", 
          title: "地区", 
          type: "enumeration", 
          enumOptions: [
            { title: "全部地区", value: "" },
            { title: "中国", value: "CN" },
            { title: "美国", value: "US" },
            { title: "韩国", value: "KR" },
            { title: "日本", value: "JP" },
            { title: "英国", value: "GB" },
            { title: "中国香港", value: "HK" },
            { title: "中国台湾", value: "TW" },
            { title: "泰国", value: "TH" },
            { title: "意大利", value: "IT" },
            { title: "德国", value: "DE" },
            { title: "西班牙", value: "ES" },
            { title: "俄罗斯", value: "RU" },
            { title: "瑞典", value: "SE" },
            { title: "巴西", value: "BR" },
            { title: "丹麦", value: "DK" },
            { title: "印度", value: "IN" },
            { title: "加拿大", value: "CA" },
            { title: "爱尔兰", value: "IE" },
            { title: "澳大利亚", value: "AU" }
          ], 
          value: "" 
        },
        { name: "page", title: "页码", type: "page" }
      ]
    },
    // --- 常规发现模块 ---
    {
      title: "TMDB 高分内容",
      description: "高分电影或剧集 (按用户评分排序)",
      requiresWebView: false,
      functionName: "tmdbTopRated",
      cacheDuration: 3600,
      params: [
        { 
          name: "type", 
          title: "🎭类型", 
          type: "enumeration", 
          enumOptions: [
            { title: "电影", value: "movie" },
            { title: "剧集", value: "tv" }
          ], 
          value: "movie" 
        },
        { name: "language", title: "语言", type: "language", value: "zh-CN" },
        { name: "page", title: "页码", type: "page" }
      ]
    },
    // --- 播出平台模块 ---
    {
        title: "TMDB 播出平台",
        description: "按播出平台和内容类型筛选剧集内容",
        requiresWebView: false,
        functionName: "tmdbDiscoverByNetwork",
        cacheDuration: 3600,
        params: [
            {
                name: "with_networks",
                title: "播出平台",
                type: "enumeration",
                description: "选择一个平台以查看其剧集内容",
                value: "",
          enumOptions: [
            { title: "全部", value: "" },
            { title: "Tencent", value: "2007" },
            { title: "iQiyi", value: "1330" },
            { title: "Youku", value: "1419" },
            { title: "Bilibili", value: "1605" },
            { title: "MGTV", value: "1631" },
            { title: "Netflix", value: "213" },
            { title: "Disney+", value: "2739" },
            { title: "HBO", value: "49" },
            { title: "HBO Max", value: "3186" },
            { title: "Apple TV+", value: "2552" },
            { title: "Hulu", value: "453" },
            { title: "Amazon Prime Video", value: "1024" },
            { title: "FOX", value: "19" },
            { title: "Paramount+", value: "4330" },
            { title: "TV Tokyo", value: "94" },
            { title: "BBC One", value: "332" },
            { title: "BBC Two", value: "295" },
            { title: "NBC", value: "6" },
            { title: "AMC+", value: "174" },
            { title: "We TV", value: "3732" },
            { title: "Viu TV", value: "2146" },
            { title: "TVB", value: "48" }
          ]
        },
        {
          name: "with_genres",
          title: "🎭内容类型",
          type: "enumeration",
          description: "选择要筛选的内容类型",
          value: "",
          enumOptions: [
            { title: "全部类型", value: "" },
            { title: "犯罪", value: "80" },
            { title: "动画", value: "16" },
            { title: "喜剧", value: "35" },
            { title: "剧情", value: "18" },
            { title: "家庭", value: "10751" },
            { title: "悬疑", value: "9648" },
            { title: "真人秀", value: "10764" },
            { title: "脱口秀", value: "10767" },
            { title: "纪录片", value: "99" },
            { title: "动作与冒险", value: "10759" },
            { title: "科幻与奇幻", value: "10765" },
            { title: "战争与政治", value: "10768" }
          ]
        },
        {
          name: "air_status",
          title: "上映状态",
          type: "enumeration",
          description: "默认已上映",
          value: "released",
          enumOptions: [
            { title: "已上映", value: "released" },
            { title: "未上映", value: "upcoming" },
            { title: "全部", value: "" }
          ]
        },
        {
          name: "sort_by",
          title: "🔢 排序方式",
          type: "enumeration",
          description: "选择内容排序方式,默认上映时间↓",
          value: "first_air_date.desc",
          enumOptions: [
            { title: "上映时间↓", value: "first_air_date.desc" },
            { title: "上映时间↑", value: "first_air_date.asc" },
            { title: "人气最高", value: "popularity.desc" },
            { title: "评分最高", value: "vote_average.desc" },
            { title: "最多投票", value: "vote_count.desc" }
          ]
        },
        { name: "page", title: "页码", type: "page" },
        { name: "language", title: "语言", type: "language", value: "zh-CN" }
      ]
    },
    // --- 出品公司模块 ---
    {
      title: "TMDB 出品公司",
      functionName: "tmdbCompanies",
      cacheDuration: 3600,
      params: [
        {
          name: "with_companies",
          title: "出品公司",
          type: "enumeration",
          value: "",
          description: "选择一个公司以查看其剧集内容",
          enumOptions: [
            { title: "全部", value: "" },
            { title: "Disney", value: "2" },
            { title: "Warner Bros", value: "174" },
            { title: "Columbia", value: "5" },
            { title: "Sony", value: "34" },
            { title: "Universal", value: "33" },
            { title: "Paramount", value: "4" },
            { title: "20th Century", value: "25" },
            { title: "Marvel", value: "420" },
            { title: "Toho", value: "882" },
            { title: "中国电影集团公司", value: "14714" },
            { title: "BBC", value: "3324" },
            { title: "A24", value: "41077" },
            { title: "Blumhouse", value: "3172" },
            { title: "Working Title Films", value: "10163" }
          ]
        },
        {
          name: "with_genres",
          title: "🎭内容类型",
          type: "enumeration",
          description: "选择要筛选的内容类型",
          value: "",
          enumOptions: [
            { title: "全部类型", value: "" },
            { title: "冒险", value: "12" },
            { title: "剧情", value: "18" },
            { title: "动作", value: "28" },
            { title: "动画", value: "16" },
            { title: "历史", value: "36" },
            { title: "喜剧", value: "35" },
            { title: "奇幻", value: "14" },
            { title: "家庭", value: "10751" },
            { title: "恐怖", value: "27" },
            { title: "悬疑", value: "9648" },
            { title: "惊悚", value: "53" },
            { title: "战争", value: "10752" },
            { title: "爱情", value: "10749" },
            { title: "犯罪", value: "80" },
            { title: "科幻", value: "878" },
            { title: "记录", value: "99" },
            { title: "西部", value: "37" },
            { title: "音乐", value: "10402" },
            { title: "电视电影", value: "10770" }
          ]
        },
        {
          name: "air_status",
          title: "上映状态",
          type: "enumeration",
          description: "默认已上映",
          value: "released",
          enumOptions: [
            { title: "已上映", value: "released" },
            { title: "未上映", value: "upcoming" },
            { title: "全部", value: "" }
          ]
        },
        {
          name: "sort_by",
          title: "🔢 排序方式",
          type: "enumeration",
          description: "选择内容排序方式,默认上映时间↓",
          value: "primary_release_date.desc",
          enumOptions: [
            { title: "上映时间↓", value: "primary_release_date.desc" },
            { title: "上映时间↑", value: "primary_release_date.asc" },
            { title: "人气最高", value: "popularity.desc" },
            { title: "评分最高", value: "vote_average.desc" },
            { title: "最多投票", value: "vote_count.desc" }
          ]
        },
        { name: "page", title: "页码", type: "page" },
        { name: "language", title: "语言", type: "language", value: "zh-CN" }
      ]
    },
    // =============屏蔽管理模块=============
    {
      title: "TMDB 搜索屏蔽",
      description: "按影片名称或内容类型进行屏蔽",
      requiresWebView: false,
      functionName: "searchAndBlock",
      cacheDuration: 0,
      params: [
        {
          name: "block_type",
          title: "🎯 屏蔽类型",
          type: "enumeration",
          description: "选择屏蔽方式",
          value: "by_name",
          enumOptions: [
            { title: "按影片名称", value: "by_name" },
            { title: "按内容类型", value: "by_genre" },
            { title: "手动输入ID", value: "manual_id" }
          ]
        },
        {
          name: "action",
          title: "🎮 操作模式",
          type: "enumeration",
          description: "选择操作类型",
          value: "search_only",
          enumOptions: [
            { title: "仅搜索", value: "search_only" },
            { title: "搜索并屏蔽", value: "search_and_block" }
          ]
        },
        {
          name: "query",
          title: "🔍 影片名称",
          type: "input",
          description: "输入要搜索的影片或剧集名称(按名称屏蔽模式使用)",
          value: "",
          placeholder: "例如：鬼灭之刃、南方公园"
        },
        {
          name: "genre_name",
          title: "🏷️ 类型名称",
          type: "input",
          description: "输入要屏蔽的内容类型(按类型屏蔽模式使用)",
          value: "",
          placeholder: "例如：真人秀、综艺、纪录片、动作、爱情"
        },
        {
          name: "language",
          title: "🌐 搜索语言",
          type: "enumeration",
          description: "选择搜索语言（按名称屏蔽模式使用）",
          value: "zh-CN",
          enumOptions: [
            { title: "中文", value: "zh-CN" },
            { title: "English", value: "en-US" },
            { title: "其他语言", value: "en" }
          ]
        },
        {
          name: "tmdb_id",
          title: "🆔 TMDB ID",
          type: "input",
          description: "输入要屏蔽的TMDB ID（手动输入ID模式使用）",
          value: "",
          placeholder: "例如：550, 1399"
        },
        {
          name: "media_type",
          title: "🎭 媒体类型",
          type: "enumeration",
          description: "选择媒体类型（手动输入ID模式使用）",
          value: "tv",
          enumOptions: [
            { title: "剧集", value: "tv" },
            { title: "电影", value: "movie" }
          ]
        }
      ]
    },
    {
      title: "TMDB 屏蔽管理",
      description: "查看和管理已屏蔽的内容和类型",
      requiresWebView: false,
      functionName: "manageBlockedItems",
      cacheDuration: 0,
      params: [
        {
          name: "manage_type",
          title: "📂 管理类型",
          type: "enumeration",
          description: "选择要管理的屏蔽类型",
          value: "items",
          enumOptions: [
            { title: "屏蔽的内容", value: "items" },
            { title: "屏蔽的类型", value: "genres" }
          ]
        },
        {
          name: "action",
          title: "📋 操作",
          type: "enumeration",
          description: "选择要执行的操作",
          value: "view",
          enumOptions: [
            { title: "查看列表", value: "view" },
            { title: "清空列表", value: "clear" },
            { title: "取消屏蔽", value: "unblock" },
            { title: "导出配置", value: "export" },
            { title: "导入配置", value: "import" }
          ]
        },
        {
          name: "unblock_id",
          title: "🔓 取消屏蔽ID",
          type: "input",
          description: "输入要取消屏蔽的ID",
          value: "",
          placeholder: "内容ID例如：2190 | 类型ID例如：10764",
          belongTo: { paramName: "action", value: ["unblock"] }
        },
        {
          name: "unblock_media_type",
          title: "🎭 媒体类型",
          type: "enumeration",
          description: "选择要取消屏蔽的媒体类型（仅内容屏蔽需要）",
          value: "tv",
          enumOptions: [
            { title: "剧集", value: "tv" },
            { title: "电影", value: "movie" }
          ],
          belongTo: { paramName: "action", value: ["unblock"], paramName2: "manage_type", value2: ["items"] }
        },
        {
          name: "import_data",
          title: "📥 导入数据",
          type: "input",
          description: "粘贴要导入的屏蔽ID列表，支持多种格式",
          value: "",
          placeholder: "支持格式：550,1399 或 '550','1399' 或 \"550\",\"1399\"",
          belongTo: { paramName: "action", value: ["import"] }
        }
      ]
    },
    // -------------豆瓣模块-------------
    // --- 片单解析 ---
    {
      title: "豆瓣自定义片单",
      description: "支持格式:桌面/移动端豆列、官方榜单、App dispatch",
      requiresWebView: false,
      functionName: "loadEnhancedDoubanList",
      cacheDuration: 3600,
      params: [
        {
          name: "url", 
          title: "🔗 片单地址", 
          type: "input", 
          description: "支持格式:桌面/移动端豆列、官方榜单、App dispatch",
          placeholders: [
              { title: "豆瓣电影实时热榜", 
              value: "https://www.douban.com/doubanapp/dispatch?uri=/subject_collection/movie_real_time_hotest/&dt_dapp=1" },
              { title: "豆瓣剧集实时热榜", 
              value: "https://www.douban.com/doubanapp/dispatch?uri=/subject_collection/tv_real_time_hotest/&dt_dapp=1" },
              { title: "豆瓣书影音实时热榜", 
              value: "https://www.douban.com/doubanapp/dispatch?uri=/subject_collection/subject_real_time_hotest/&dt_dapp=1" },
              { title: "一周电影口碑榜", 
              value: "https://www.douban.com/doubanapp/dispatch?uri=/subject_collection/movie_weekly_best/&dt_dapp=1" },
              { title: "华语口碑剧集榜", 
              value: "https://www.douban.com/doubanapp/dispatch?uri=/subject_collection/tv_chinese_best_weekly/&dt_dapp=1" },
              { title: "全球口碑剧集榜", 
              value: "https://www.douban.com/doubanapp/dispatch?uri=/subject_collection/tv_global_best_weekly/&dt_dapp=1" },
              { title: "国内热播综艺", 
              value: "https://www.douban.com/doubanapp/dispatch?uri=/subject_collection/show_domestic/&dt_dapp=1" },
              { title: "国外热播综艺", 
              value: "https://www.douban.com/doubanapp/dispatch?uri=/subject_collection/show_foreign/&dt_dapp=1" },
              { title: "当地影院热映", 
              value: "https://www.douban.com/doubanapp/dispatch?uri=/subject_collection/movie_showing/&dt_dapp=1" },
              { title: "热门动画", 
              value: "https://www.douban.com/doubanapp/dispatch?uri=/subject_collection/tv_animation/&dt_dapp=1" }
          ]
        },
        { name: "page", title: "页码", type: "page" }
      ]
    }
  ]
};

// ===============屏蔽配置===============
const GENRE_STORAGE_KEY = "forward_blocked_genres";
const STORAGE_KEY = "forward_blocked_items";

const TMDB_GENRE_MAPPING = {
    "\u771f\u4eba\u79c0": 10764,
    "\u8131\u53e3\u79c0": 10767, 
    "\u7efc\u827a": 10764,
    "\u7eaa\u5f55\u7247": 99,
    "\u52a8\u4f5c\u5192\u9669": 10759,
    "\u52a8\u753b": 16,
    "\u559c\u5267": 35,
    "\u72af\u7f6a": 80,
    "\u5267\u60c5": 18,
    "\u5bb6\u5ead": 10751,
    "\u513f\u7ae5": 10762,
    "\u60ac\u7591": 9648,
    "\u65b0\u95fb": 10763,
    "\u79d1\u5e7b\u5947\u5e7b": 10765,
    "\u80a5\u7682\u5267": 10766,
    "\u6218\u4e89\u653f\u6cbb": 10768,
    "\u897f\u90e8": 37,
    "\u52a8\u4f5c": 28,
    "\u5192\u9669": 12,
    "\u5386\u53f2": 36,
    "\u5947\u5e7b": 14,
    "\u6050\u6016": 27,
    "\u97f3\u4e50": 10402,
    "\u7231\u60c5": 10749,
    "\u79d1\u5e7b": 878,
    "\u7535\u89c6\u7535\u5f71": 10770,
    "\u60ca\u609a": 53,
    "\u6218\u4e89": 10752
};

const REVERSE_GENRE_MAPPING = Object.fromEntries(
    Object.entries(TMDB_GENRE_MAPPING).map(([name, id]) => [id, name])
);

let blockedIdCache = null;
let blockedGenresCache = null;
let blockedItemsCache = null;
let tmdbGenresCache = null;

function clearAllCaches() {
    blockedIdCache = null;
    blockedGenresCache = null;
    blockedItemsCache = null;
    tmdbGenresCache = null;
}

function clearBlockedIdCache() {
    blockedIdCache = null;
}

function clearBlockedGenresCache() {
    blockedGenresCache = null;
}

function clearBlockedItemsCache() {
    blockedItemsCache = null;
}


function getBlockedIdSet() {
    try {
        if (blockedIdCache) {
            return blockedIdCache;
        }
        
        const blockedItems = getBlockedItems();
        const idSet = new Set();
        
        for (let i = 0; i < blockedItems.length; i++) {
            const item = blockedItems[i];
            const idStr = String(item.id);
            const idNum = parseInt(item.id);
            
            idSet.add(idStr + "_" + item.media_type);
            idSet.add(idNum + "_" + item.media_type);
            
            idSet.add(idStr);
            idSet.add(idNum);
        }
        
        blockedIdCache = idSet;
        return idSet;
    } catch (error) {
        return new Set();
    }
}

function getBlockedGenres() {
    try {
        if (blockedGenresCache) {
            return blockedGenresCache;
        }
        
        const stored = Widget.storage.get(GENRE_STORAGE_KEY);
        blockedGenresCache = stored ? JSON.parse(stored) : [];
        return blockedGenresCache;
    } catch (error) {
        return [];
    }
}

function saveBlockedGenres(genres) {
    try {
        Widget.storage.set(GENRE_STORAGE_KEY, JSON.stringify(genres));
        blockedGenresCache = genres;
        clearBlockedIdCache();
        return true;
    } catch (error) {
        return false;
    }
}

function getBlockedItems() {
    try {
        if (blockedItemsCache) {
            return blockedItemsCache;
        }
        
        const stored = Widget.storage.get(STORAGE_KEY);
        blockedItemsCache = stored ? JSON.parse(stored) : [];
        return blockedItemsCache;
    } catch (error) {
        return [];
    }
}

function saveBlockedItems(items) {
    try {
        Widget.storage.set(STORAGE_KEY, JSON.stringify(items));
        blockedItemsCache = items;
        clearBlockedIdCache();
        return true;
    } catch (error) {
        return false;
    }
}

function isItemBlocked(item) {
    if (!item || !item.id) return false;
    
    const blockedIdSet = getBlockedIdSet();
    const itemId = String(item.id);
    const itemIdNum = parseInt(item.id);
    
    if (blockedIdSet.has(itemId) || blockedIdSet.has(itemIdNum)) {
        return true;
    }
    
    if (item.mediaType || item.media_type) {
        const mediaType = item.mediaType || item.media_type;
        if (blockedIdSet.has(itemId + "_" + mediaType) || blockedIdSet.has(itemIdNum + "_" + mediaType)) {
            return true;
        }
    }
    
    if (item.originalDoubanId) {
        const doubanId = String(item.originalDoubanId);
        const doubanIdNum = parseInt(item.originalDoubanId);
        if (blockedIdSet.has(doubanId) || blockedIdSet.has(doubanIdNum)) {
            return true;
        }
    }
    
    return false;
}

function isItemBlockedByGenre(item) {
    if (!item || !item.genre_ids) return false;
    
    const blockedGenres = getBlockedGenres();
    const blockedGenreIds = new Set(blockedGenres.map(g => g.id));
    
    return item.genre_ids.some(genreId => blockedGenreIds.has(genreId));
}

function isItemBlockedEnhanced(item) {
    if (isItemBlocked(item)) {
        return true;
    }
    
    if (isItemBlockedByGenre(item)) {
        return true;
    }
    
    return false;
}

function filterBlockedItemsEnhanced(items) {
    if (!Array.isArray(items)) return items;
    
    const blockedIdSet = getBlockedIdSet();
    const blockedGenres = getBlockedGenres();
    const blockedGenreIds = new Set(blockedGenres.map(g => g.id));
    
    const filtered = [];
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (!item || !item.id) {
            filtered.push(item);
            continue;
        }
        
        const itemId = String(item.id);
        const itemIdNum = parseInt(item.id);
        if (blockedIdSet.has(itemId) || blockedIdSet.has(itemIdNum)) {
            continue;
        }
        
        if (item.genre_ids && item.genre_ids.some(genreId => blockedGenreIds.has(genreId))) {
            continue;
        }
        
        if (item.mediaType || item.media_type) {
            const mediaType = item.mediaType || item.media_type;
            if (blockedIdSet.has(itemId + "_" + mediaType) || blockedIdSet.has(itemIdNum + "_" + mediaType)) {
                continue;
            }
        }
        
        if (item.originalDoubanId) {
            const doubanId = String(item.originalDoubanId);
            const doubanIdNum = parseInt(item.originalDoubanId);
            if (blockedIdSet.has(doubanId) || blockedIdSet.has(doubanIdNum)) {
                continue;
            }
        }
        
        filtered.push(item);
    }
    
    return filtered;
}

function addBlockedGenre(genreName, genreId, description = "") {
    const blockedGenres = getBlockedGenres();
    
    const exists = blockedGenres.some(blocked => 
        blocked.id === genreId || blocked.name === genreName
    );
    
    if (!exists) {
        blockedGenres.push({
            id: genreId,
            name: genreName,
            description: description || `\u5c4f\u853d\u6240\u6709"${genreName}"\u7c7b\u578b\u7684\u5185\u5bb9`,
            blocked_date: new Date().toISOString()
        });
        
        return saveBlockedGenres(blockedGenres);
    }
    
    return false;
}

function removeBlockedGenre(genreId) {
    const blockedGenres = getBlockedGenres();
    const filtered = blockedGenres.filter(genre => genre.id !== genreId);
    return saveBlockedGenres(filtered);
}


function addBlockedItem(item) {
    const blockedItems = getBlockedItems();
    
    const exists = blockedItems.some(blocked => 
        blocked.id === String(item.id) && blocked.media_type === item.media_type
    );
    
    if (!exists) {
        blockedItems.push({
            id: String(item.id),
            media_type: item.media_type,
            title: item.title,
            poster_path: item.poster_path,
            overview: item.overview,
            blocked_date: new Date().toISOString(),
            vote_average: item.vote_average || 0
        });
        
        return saveBlockedItems(blockedItems);
    }
    
    return false;
}

function removeBlockedItem(id, mediaType) {
    const blockedItems = getBlockedItems();
    const filtered = blockedItems.filter(item => 
        !(item.id === String(id) && item.media_type === mediaType)
    );
    
    return saveBlockedItems(filtered);
}

function clearBlockedItems() {
    try {
        Widget.storage.clear();
        clearAllCaches();
        return true;
    } catch (error) {
        return false;
    }
}

// ===============辅助函数===============
async function fetchTmdbGenres() {
    if (tmdbGenresCache) return tmdbGenresCache;
    
    const [movieGenres, tvGenres] = await Promise.all([
        Widget.tmdb.get('/genre/movie/list', { params: { language: 'zh-CN' } }),
        Widget.tmdb.get('/genre/tv/list', { params: { language: 'zh-CN' } })
    ]);
    
    tmdbGenresCache = {
        movie: movieGenres.genres.reduce((acc, g) => ({ ...acc, [g.id]: g.name }), {}),
        tv: tvGenres.genres.reduce((acc, g) => ({ ...acc, [g.id]: g.name }), {})
    };
    return tmdbGenresCache;
}

function getTmdbGenreTitles(genreIds, mediaType) {
    const genres = tmdbGenresCache?.[mediaType] || {};
    const topThreeIds = genreIds.slice(0, 3); 
    return topThreeIds
        .map(id => genres[id]?.trim() || `\u672a\u77e5\u7c7b\u578b(${id})`)
        .filter(Boolean)
        .join('\u2022');
}

function getDoubanGenreTitles(genres, itemType) {
    if (!genres) {
        return "";
    }
    
    let genreArray = [];
    
    if (typeof genres === 'string') {
        const cleanGenres = genres.trim();
        if (cleanGenres) {
            if (cleanGenres.includes(',')) {
                genreArray = cleanGenres.split(',');
            } else if (cleanGenres.includes('\u3001')) {
                genreArray = cleanGenres.split('\u3001');
            } else if (cleanGenres.includes('/')) {
                genreArray = cleanGenres.split('/');
            } else if (cleanGenres.includes(' ')) {
                genreArray = cleanGenres.split(' ');
            } else {
                genreArray = [cleanGenres];
            }
        }
    } 
    else if (Array.isArray(genres)) {
        genreArray = genres.filter(g => g && g.trim());
    } 
    else {
        const genreStr = String(genres).trim();
        if (genreStr && genreStr !== 'undefined' && genreStr !== 'null') {
            genreArray = [genreStr];
        }
    }
    
    genreArray = genreArray
        .map(g => g.trim())
        .filter(g => g && g !== '')
        .filter((genre, index, arr) => arr.indexOf(genre) === index);
    
    if (genreArray.length === 0) {
        return "";
    }
    
    const topThreeGenres = genreArray.slice(0, 3);
    return topThreeGenres.join(' ');
}

function extractGenresFromText(text) {
    if (!text) return [];
    
    const genreKeywords = [
        '\u52a8\u4f5c', '\u79d1\u5e7b', '\u707e\u96be', '\u7231\u60c5', '\u559c\u5267', '\u60ac\u7591', '\u72af\u7f6a', '\u5192\u9669', '\u5947\u5e7b', '\u6218\u4e89',
        '\u5386\u53f2', '\u6b66\u4fa0', '\u60ca\u609a', '\u6050\u6016', '\u60c5\u8272', '\u52a8\u753b', '\u5267\u60c5', '\u897f\u90e8', '\u5bb6\u5ead', '\u97f3\u4e50',
        '\u8fd0\u52a8', '\u53e4\u88c5', '\u6b4c\u821e', '\u4f20\u8bb0', '\u77ed\u7247', '\u7eaa\u5f55\u7247', '\u6587\u827a', '\u9752\u6625', '\u6821\u56ed', '\u804c\u573a',
        '\u90fd\u5e02', '\u519c\u6751', '\u519b\u4e8b', '\u8b66\u50a3', '\u8c0d\u6218', '\u5bab\u5ef7', '\u795e\u8bdd', '\u9b54\u5e7b'
    ];
    
    const foundGenres = [];
    
    const typePattern = /(?:\u7c7b\u578b|genre)[\uff1a:\s]*([^\n\r]+)/i;
    const typeMatch = text.match(typePattern);
    if (typeMatch) {
        const typeText = typeMatch[1];
        const types = typeText.split(/[\/\u3001,,\s]+/).filter(t => t.trim());
        foundGenres.push(...types);
    }
    
    for (const keyword of genreKeywords) {
        if (text.includes(keyword) && !foundGenres.includes(keyword)) {
            foundGenres.push(keyword);
        }
    }
    
    return foundGenres.slice(0, 3);
}

function formatItemDescription(item) {
    let description = item.description || '';
    const hasRating = /\u8bc4\u5206|rating/i.test(description);
    const hasYear = /\u5e74\u4efd|year/i.test(description);
    const hasType = /\u7c7b\u578b|type/i.test(description);
    
    if (item.itemType && !hasType) {
        description = `\u7c7b\u578b: ${item.itemType} | ${description}`;
    }
    
    if (item.rating && !hasRating) {
        description = `\u8bc4\u5206: ${item.rating} | ${description}`;
    }
    
    if (item.releaseDate && !hasYear) {
        const year = String(item.releaseDate).substring(0,4);
        if (/^\d{4}$/.test(year)) {
            description = `\u5e74\u4efd: ${year} | ${description}`;
        }
    }
    
    return description
        .replace(/^\|\s*/, '')
        .replace(/\s*\|$/, '')
        .trim();
}

function calculatePagination(params) {
    let page = parseInt(params.page) || 1;
    const limit = parseInt(params.limit) || 20;
    
    if (typeof params.start !== 'undefined') {
        page = Math.floor(parseInt(params.start) / limit) + 1;
    }
    
    const start = (page - 1) * limit;
    return { page, limit, start };
}

function getBeijingDate() {
    const now = new Date();
    const beijingTime = now.getTime() + (8 * 60 * 60 * 1000);
    const beijingDate = new Date(beijingTime);
    return `${beijingDate.getUTCFullYear()}-${String(beijingDate.getUTCMonth() + 1).padStart(2, '0')}-${String(beijingDate.getUTCDate()).padStart(2, '0')}`;
}

function parseDoubanAppDispatchUrl(url) {
    const cleanedUrl = url.replace(/\s+/g, '').trim();
    const questionMarkIndex = cleanedUrl.indexOf('?');
    const queryString = cleanedUrl.substring(questionMarkIndex + 1);
    
    const params = {};
    const paramPairs = queryString.split('&');
    for (const pair of paramPairs) {
        const [key, value] = pair.split('=');
        params[decodeURIComponent(key)] = decodeURIComponent(value);
    }
    
    const uriParam = params['uri'];
    const cleanUri = (uriParam.startsWith('/') ? uriParam.substring(1) : uriParam).trim();
    
    if (cleanUri.includes('subject_collection/')) {
        return `https://m.douban.com/${cleanUri}`;
    }
    else if (cleanUri.includes('doulist/')) {
        return `https://www.douban.com/${cleanUri}`;
    }
    
    return null;
}

// =============TMDB功能函数============
const MIN_VOTE_COUNT = {
  movie: 50,
  tv: 30
};

const POPULARITY_QUALITY_STANDARDS = {
  movie: {
    minVoteCount: 50,
    minVoteAverage: 5.0
  },
  tv: {
    minVoteCount: 10,
    minVoteAverage: 5.0
  }
};

const DOMESTIC_PLATFORMS = ['2007', '1330', '1419', '1605', '1631'];

const DOMESTIC_MIN_VOTE_COUNT = {
  tv: 5
};

const DOMESTIC_PLATFORM_STANDARDS = {
  movie: {
    minVoteCount: 15,
    minVoteAverage: 4.5
  },
  tv: {
    minVoteCount: 5,
    minVoteAverage: 4.5
  }
};

const CN_COUNTRY_CODE = 'CN';
const isDomesticCN = (region) => region === CN_COUNTRY_CODE;

async function fetchTmdbData(api, params) {
    const [data, genres] = await Promise.all([
        Widget.tmdb.get(api, { params: params }),
        fetchTmdbGenres()
    ]);

    const filteredResults = data.results
        .filter((item) => {
            const mediaType = item.media_type || (item.title ? 'movie' : 'tv');
            const sortBy = params.sort_by || '';

            let passesFilter = item.poster_path &&
                   item.id &&
                   (item.title || item.name) &&
                   (item.title || item.name).trim().length > 0 &&
                   item.genre_ids && 
                   Array.isArray(item.genre_ids) && 
                   item.genre_ids.length >= 1;

            if (passesFilter && sortBy === 'vote_average.desc') {
                const isDomestic = DOMESTIC_PLATFORMS.includes(String(params.with_networks));
                const minVoteCount = isDomestic
                    ? DOMESTIC_MIN_VOTE_COUNT[mediaType]
                    : (MIN_VOTE_COUNT[mediaType] || MIN_VOTE_COUNT.movie);
                passesFilter = passesFilter && (item.vote_count >= minVoteCount);
            }

            return passesFilter;
        })
        .map((item) => {
            const mediaType = item.media_type || (item.title ? 'movie' : 'tv');
            const genreIds = item.genre_ids || [];
            const genreTitle = getTmdbGenreTitles(genreIds, mediaType);

            return {
                id: item.id,
                type: "tmdb",
                title: item.title || item.name,
                description: item.overview,
                releaseDate: item.release_date || item.first_air_date,
                backdropPath: item.backdrop_path,
                posterPath: item.poster_path,
                rating: item.vote_average,
                mediaType: mediaType,
                genreTitle: genreTitle,
                genre_ids: genreIds
            };
        });

    return filterBlockedItemsEnhanced(filteredResults);
}

async function loadTmdbTrendingData() {
    try {
        const response = await Widget.http.get("https://for-ward.vercel.app/data/TMDB_Trending.json", {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 Safari/605.1.15'
            }
        });
        return response.data;
    } catch (error) {
        try {
            const fallbackResponse = await Widget.http.get("https://for-ward.vercel.app/data/TMDB_Trending.json");
            return fallbackResponse.data;
        } catch (fallbackError) {
            throw fallbackError;
        }
    }
}

async function loadTodayHotTV(params) {
  const page = parseInt(params.page) || 1;
  const region = params.sort_by || '';
  
  let remoteData;
  try {
    remoteData = await loadTmdbTrendingData();
  } catch (e) {
    return [];
  }

  const sortBy = 'popularity.desc';
  const isPopularitySort = (s) => s === 'popularity.desc';
  const isDomesticCN = (r) => r === 'CN';

  if (region) {
    const std = isDomesticCN(region) && isPopularitySort(sortBy)
      ? DOMESTIC_PLATFORM_STANDARDS.tv
      : POPULARITY_QUALITY_STANDARDS.tv;

    const discoverParams = {
      language: params.language || 'zh-CN',
      page: page,
      with_origin_country: region,
      sort_by: sortBy,
      'vote_count.gte': std.minVoteCount,
      'vote_average.gte': std.minVoteAverage
    };

    const [data, genres] = await Promise.all([
      Widget.tmdb.get('/discover/tv', { params: discoverParams }),
      fetchTmdbGenres()
    ]);

    const items = data.results
      .filter((it) => it.poster_path && it.genre_ids?.length)
      .map((it) => ({
        id: String(it.id),
        type: 'tmdb',
        title: it.name,
        description: it.overview,
        releaseDate: it.first_air_date,
        backdropPath: it.backdrop_path,
        posterPath: it.poster_path,
        rating: it.vote_average,
        mediaType: 'tv',
        genreTitle: getTmdbGenreTitles(it.genre_ids, 'tv'),
        genre_ids: it.genre_ids
      }));

    return filterBlockedItemsEnhanced(items);
  }

  if (page === 1) {
    const allTv = remoteData.today_tv || [];
    const tvItems = [];
    for (let i = 0; i < allTv.length && tvItems.length < 20; i++) {
      const it = allTv[i];
      if (it.type === 'tv' && it.poster_url && it.genre_ids?.length) {
        tvItems.push({
          id: it.id.toString(),
          type: 'tmdb',
          title: it.title,
          genreTitle: it.genreTitle,
          rating: it.rating,
          description: it.overview,
          releaseDate: it.release_date,
          posterPath: it.poster_url,
          backdropPath: it.title_backdrop,
          mediaType: 'tv',
          genre_ids: it.genre_ids || []
        });
      }
    }
    return filterBlockedItemsEnhanced(tvItems);
  }

  const std = POPULARITY_QUALITY_STANDARDS.tv;
  const fallbackParams = {
    language: params.language || 'zh-CN',
    page: page,
    sort_by: sortBy,
    'vote_count.gte': std.minVoteCount,
    'vote_average.gte': std.minVoteAverage
  };

  const [data, genres] = await Promise.all([
    Widget.tmdb.get('/discover/tv', { params: fallbackParams }),
    fetchTmdbGenres()
  ]);

  const items = data.results
    .filter((it) => it.poster_path && it.genre_ids?.length)
    .map((it) => ({
      id: String(it.id),
      type: 'tmdb',
      title: it.name,
      description: it.overview,
      releaseDate: it.first_air_date,
      backdropPath: it.backdrop_path,
      posterPath: it.poster_path,
      rating: it.vote_average,
      mediaType: 'tv',
      genreTitle: getTmdbGenreTitles(it.genre_ids, 'tv'),
      genre_ids: it.genre_ids
    }));

  return filterBlockedItemsEnhanced(items);
}

async function loadTodayHotMovies(params) {
  const page = parseInt(params.page) || 1;
  const region = params.sort_by || '';
  const sortBy = 'popularity.desc';

  let remoteData;
  try {
    remoteData = await loadTmdbTrendingData();
  } catch (e) {
    return [];
  }

  const isPopularitySort = (s) => s === 'popularity.desc';
  const isDomesticCN = (r) => r === 'CN';

  if (region) {
    const std = isDomesticCN(region) && isPopularitySort(sortBy)
      ? DOMESTIC_PLATFORM_STANDARDS.movie
      : POPULARITY_QUALITY_STANDARDS.movie;

    const discoverParams = {
      language: params.language || 'zh-CN',
      page: page,
      with_origin_country: region,
      sort_by: sortBy,
      'vote_count.gte': std.minVoteCount,
      'vote_average.gte': std.minVoteAverage
    };

    const [data, genres] = await Promise.all([
      Widget.tmdb.get('/discover/movie', { params: discoverParams }),
      fetchTmdbGenres()
    ]);

    const items = data.results
      .filter((it) => it.poster_path && it.genre_ids?.length)
      .map((it) => ({
        id: String(it.id),
        type: 'tmdb',
        title: it.title,
        description: it.overview,
        releaseDate: it.release_date,
        backdropPath: it.backdrop_path,
        posterPath: it.poster_path,
        rating: it.vote_average,
        mediaType: 'movie',
        genreTitle: getTmdbGenreTitles(it.genre_ids, 'movie'),
        genre_ids: it.genre_ids
      }));

    return filterBlockedItemsEnhanced(items);
  }

  if (page === 1) {
    const allMovies = remoteData.today_movies || [];
    const movieItems = [];
    for (let i = 0; i < allMovies.length && movieItems.length < 20; i++) {
      const it = allMovies[i];
      if (it.type === 'movie' && it.poster_url && it.genre_ids?.length) {
        movieItems.push({
          id: it.id.toString(),
          type: 'tmdb',
          title: it.title,
          genreTitle: it.genreTitle,
          rating: it.rating,
          description: it.overview,
          releaseDate: it.release_date,
          posterPath: it.poster_url,
          backdropPath: it.title_backdrop,
          mediaType: 'movie',
          genre_ids: it.genre_ids || []
        });
      }
    }
    return filterBlockedItemsEnhanced(movieItems);
  }

  const std = POPULARITY_QUALITY_STANDARDS.movie;
  const fallbackParams = {
    language: params.language || 'zh-CN',
    page: page,
    sort_by: sortBy,
    'vote_count.gte': std.minVoteCount,
    'vote_average.gte': std.minVoteAverage
  };

  const [data, genres] = await Promise.all([
    Widget.tmdb.get('/discover/movie', { params: fallbackParams }),
    fetchTmdbGenres()
  ]);

  const items = data.results
    .filter((it) => it.poster_path && it.genre_ids?.length)
    .map((it) => ({
      id: String(it.id),
      type: 'tmdb',
      title: it.title,
      description: it.overview,
      releaseDate: it.release_date,
      backdropPath: it.backdrop_path,
      posterPath: it.poster_path,
      rating: it.vote_average,
      mediaType: 'movie',
      genreTitle: getTmdbGenreTitles(it.genre_ids, 'movie'),
      genre_ids: it.genre_ids
    }));

  return filterBlockedItemsEnhanced(items);
}

async function tmdbTopRated(params) {
    const type = params.type || 'movie';
    const api = type === 'movie' ? `movie/top_rated` : `tv/top_rated`;
    
    const [data, genres] = await Promise.all([
        Widget.tmdb.get(api, { params: params }),
        fetchTmdbGenres()
    ]);

    const filteredResults = data.results
        .filter((item) => {
            const mediaType = item.media_type || (item.title ? 'movie' : 'tv');
            const minVoteCount = MIN_VOTE_COUNT[type] || MIN_VOTE_COUNT.movie;
            
            return item.poster_path &&
                   item.id &&
                   (item.title || item.name) &&
                   (item.title || item.name).trim().length > 0 &&
                   item.genre_ids && 
                   Array.isArray(item.genre_ids) && 
                   item.genre_ids.length >= 1 &&
                   item.vote_count >= minVoteCount;
        })
        .map((item) => {
            const mediaType = item.media_type || (item.title ? 'movie' : 'tv');
            const genreIds = item.genre_ids || [];
            const genreTitle = getTmdbGenreTitles(genreIds, mediaType);

            return {
                id: item.id,
                type: "tmdb",
                title: item.title || item.name,
                description: item.overview,
                releaseDate: item.release_date || item.first_air_date,
                backdropPath: item.backdrop_path,
                posterPath: item.poster_path,
                rating: item.vote_average,
                mediaType: mediaType,
                genreTitle: genreTitle,
                genre_ids: genreIds
            };
        });

    return filterBlockedItemsEnhanced(filteredResults);
}

async function tmdbDiscoverByNetwork(params = {}) {
  const api = "discover/tv";
  const beijingDate = getBeijingDate();
  const sortBy = params.sort_by || "first_air_date.desc";

  const discoverParams = {
    language: params.language || 'zh-CN',
    page: params.page || 1,
    with_networks: params.with_networks,
    sort_by: sortBy
  };
  
  if (sortBy === 'vote_average.desc') {
    const isDomestic = DOMESTIC_PLATFORMS.includes(String(params.with_networks));
    const std = isDomestic ? DOMESTIC_MIN_VOTE_COUNT.tv : MIN_VOTE_COUNT.tv;
    discoverParams['vote_count.gte'] = std;
  }

  if (params.air_status === 'released') {
    discoverParams['first_air_date.lte'] = beijingDate;
  } else if (params.air_status === 'upcoming') {
    discoverParams['first_air_date.gte'] = beijingDate;
  }
  if (params.with_genres) {
    discoverParams.with_genres = params.with_genres;
  }

  return await fetchTmdbData(api, discoverParams);
}

async function tmdbCompanies(params = {}) {
  const api = "discover/movie";
  const beijingDate = getBeijingDate();
  const withCompanies = String(params.with_companies || '').trim();
  const sortBy = params.sort_by || "primary_release_date.desc";

  const cleanParams = {
    page: params.page || 1,
    language: params.language || "zh-CN",
    sort_by: sortBy,
    include_adult: false,
    include_video: false
  };

  if (sortBy === 'vote_average.desc') {
    cleanParams['vote_count.gte'] = MIN_VOTE_COUNT.movie;
  }

  if (sortBy === 'popularity.desc') {
    cleanParams['vote_count.gte'] = POPULARITY_QUALITY_STANDARDS.movie.minVoteCount;
    cleanParams['vote_average.gte'] = POPULARITY_QUALITY_STANDARDS.movie.minVoteAverage;
  }

  if (sortBy === 'vote_count.desc') {
    cleanParams['vote_average.gte'] = 6.0;
  }

  if (withCompanies) {
    cleanParams.with_companies = withCompanies;
  }
  if (params.air_status === 'released') {
    cleanParams['primary_release_date.lte'] = beijingDate;
  } else if (params.air_status === 'upcoming') {
    cleanParams['primary_release_date.gte'] = beijingDate;
  }
  if (params.with_genres) {
    cleanParams.with_genres = String(params.with_genres).trim();
  }

  return await fetchTmdbData(api, cleanParams);
}

// ===============搜索屏蔽==============
async function searchTMDB(query, language) {
    if (!query || query.trim().length === 0) {
        throw new Error("\u641c\u7d22\u5173\u952e\u8bcd\u4e0d\u80fd\u4e3a\u7a7a");
    }

    try {
        const response = await Widget.tmdb.get("/search/multi", {
            params: {
                query: query.trim(),
                language: language || "zh-CN",
                page: 1
            }
        });

        if (!response) {
            throw new Error("TMDB API\u65e0\u54cd\u5e94");
        }

        let results = [];
        if (response.results) {
            results = response.results;
        } else if (response.data && response.data.results) {
            results = response.data.results;
        } else if (Array.isArray(response)) {
            results = response;
        } else {
            throw new Error("\u65e0\u6cd5\u89e3\u6790TMDB\u54cd\u5e94\u7ed3\u6784");
        }

        const filteredResults = [];
        for (let i = 0; i < results.length && filteredResults.length < 20; i++) {
            const item = results[i];
            if ((item.media_type === "movie" || item.media_type === "tv") &&
                item.id &&
                (item.title || item.name) &&
                item.poster_path) {
                
                const title = item.title || item.name;
                const releaseDate = item.release_date || item.first_air_date;
                const year = releaseDate ? new Date(releaseDate).getFullYear() : "";
                
                filteredResults.push({
                    id: String(item.id),
                    media_type: item.media_type,
                    title: title,
                    poster_path: item.poster_path,
                    overview: item.overview || "",
                    vote_average: item.vote_average || 0,
                    release_date: releaseDate,
                    year: year
                });
            }
        }
        
        return filteredResults;
        
    } catch (error) {
        throw new Error("\u641c\u7d22\u5931\u8d25: " + error.message);
    }
}

async function searchAndBlockByGenre(params) {
    const action = params.action || "search_only";
    const genreName = params.genre_name ? params.genre_name.trim() : '';
    
    if (!genreName) {
        return [{
            id: "no_genre_name",
            type: "info",
            title: "\u26a0 \u8bf7\u8f93\u5165\u8981\u5c4f\u853d\u7684\u7c7b\u578b\u540d\u79f0",
            description: "\u4f8b\u5982\uff1a\u771f\u4eba\u79c0\u3001\u7efc\u827a\u3001\u7eaa\u5f55\u7247\u3001\u52a8\u4f5c\u3001\u7231\u60c5\u7b49",
            posterPath: "",
            backdropPath: "",
            rating: 0,
            mediaType: "info"
        }];
    }
    
    const matchedGenres = [];
    const lowerGenreName = genreName.toLowerCase();
    
    for (const [name, id] of Object.entries(TMDB_GENRE_MAPPING)) {
        if (name.includes(genreName) || genreName.includes(name) || 
            name.toLowerCase().includes(lowerGenreName)) {
            matchedGenres.push({ name, id });
        }
    }
    
    if (matchedGenres.length === 0) {
        const suggestions = Object.keys(TMDB_GENRE_MAPPING).slice(0, 10);
        return [{
            id: "no_genre_match",
            type: "info",
            title: "\u2753 \u672a\u627e\u5230\u5339\u914d\u7684\u7c7b\u578b",
            description: `\u672a\u627e\u5230\u4e0e"${genreName}"\u5339\u914d\u7684\u7c7b\u578b\u3002\n\n\u652f\u6301\u7684\u7c7b\u578b\u5305\u62ec\uff1a\n${suggestions.join('\u3001')}`,
            posterPath: "",
            backdropPath: "",
            rating: 0,
            mediaType: "info"
        }];
    }
    
    const resultItems = [];
    
    if (action === "search_only") {
        resultItems.push({
            id: "genre_search_summary",
            type: "info",
            title: "\u1f50d \u627e\u5230\u5339\u914d\u7684\u7c7b\u578b",
            description: `\u641c\u7d22"${genreName}"\u627e\u5230 ${matchedGenres.length} \u4e2a\u5339\u914d\u7c7b\u578b\uff1a\n\n${matchedGenres.map(g => `\u2022 ${g.name} (ID: ${g.id})`).join('\n')}\n\n\u9009\u62e9"\u641c\u7d22\u5e76\u5c4f\u853d"\u6a21\u5f0f\u53ef\u5c06\u8fd9\u4e9b\u7c7b\u578b\u52a0\u5165\u5c4f\u853d\u5217\u8868\u3002`,
            posterPath: "",
            backdropPath: "",
            rating: 0,
            mediaType: "info"
        });
        
        for (const genre of matchedGenres) {
            const blockedGenres = getBlockedGenres();
            const isBlocked = blockedGenres.some(blocked => blocked.id === genre.id);
            const status = isBlocked ? "\u1f6ab \u5df2\u5c4f\u853d" : "\u2705 \u53ef\u5c4f\u853d";
            
            resultItems.push({
                id: `genre_detail_${genre.id}`,
                type: "info", 
                title: `${status} ${genre.name}`,
                description: `TMDB\u7c7b\u578bID: ${genre.id}\n${isBlocked ? '\u6b64\u7c7b\u578b\u5df2\u5728\u5c4f\u853d\u5217\u8868\u4e2d' : '\u53ef\u4ee5\u5c4f\u853d\u6b64\u7c7b\u578b\u7684\u6240\u6709\u5185\u5bb9'}`,
                posterPath: "",
                backdropPath: "",
                rating: 0,
                mediaType: "info"
            });
        }
        
    } else if (action === "search_and_block") {
        let blockedCount = 0;
        let alreadyBlockedCount = 0;
        
        for (const genre of matchedGenres) {
            const success = addBlockedGenre(genre.name, genre.id);
            if (success) {
                blockedCount++;
            } else {
                alreadyBlockedCount++;
            }
            
            const status = success ? "\u2705 \u5df2\u5c4f\u853d" : "\u1f6ab \u5df2\u5b58\u5728";
            resultItems.push({
                id: `blocked_genre_${genre.id}`,
                type: "info",
                title: `${status} ${genre.name}`,
                description: `TMDB\u7c7b\u578bID: ${genre.id}\n${success ? '\u5df2\u6dfb\u52a0\u5230\u7c7b\u578b\u5c4f\u853d\u5217\u8868' : '\u6b64\u7c7b\u578b\u5df2\u5728\u5c4f\u853d\u5217\u8868\u4e2d'}`,
                posterPath: "",
                backdropPath: "",
                rating: 0,
                mediaType: "info"
            });
        }
        
        resultItems.unshift({
            id: "genre_block_summary",
            type: "info",
            title: "\u1f3af \u7c7b\u578b\u5c4f\u853d\u64cd\u4f5c\u5b8c\u6210",
            description: `\u641c\u7d22"${genreName}"\u627e\u5230 ${matchedGenres.length} \u4e2a\u7c7b\u578b\n\u65b0\u589e\u5c4f\u853d: ${blockedCount} \u4e2a\n\u5df2\u5b58\u5728: ${alreadyBlockedCount} \u4e2a\n\n\u5305\u542b\u8fd9\u4e9b\u7c7b\u578b\u7684\u6240\u6709\u5185\u5bb9\u5c06\u4e0d\u518d\u5728\u699c\u5355\u4e2d\u663e\u793a\u3002`,
            posterPath: "",
            backdropPath: "",
            rating: 0,
            mediaType: "info"
        });
    }
    
    return resultItems;
}

const originalFilterBlockedItems = filterBlockedItems;

function filterBlockedItems(items) {
    return filterBlockedItemsEnhanced(items);
}

function addToBlockList(tmdbId, mediaType = "movie", title = "", additionalInfo = {}) {
  try {
    const stored = Widget.storage.get(STORAGE_KEY);
    const blockedItems = stored ? JSON.parse(stored) : [];
    
    const itemId = String(tmdbId);
    
    let exists = false;
    for (let i = 0; i < blockedItems.length; i++) {
      if (blockedItems[i].id === itemId && blockedItems[i].media_type === mediaType) {
        exists = true;
        break;
      }
    }
    
    if (!exists) {
      blockedItems.push({
        id: itemId,
        media_type: mediaType,
        title: title || `TMDB ID: ${itemId}`,
        poster_path: additionalInfo.poster_path || "",
        overview: additionalInfo.overview,
        blocked_date: new Date().toISOString(),
        vote_average: additionalInfo.vote_average || 0
      });
      
      Widget.storage.set(STORAGE_KEY, JSON.stringify(blockedItems));
      clearBlockedIdCache();
      clearBlockedItemsCache();
      return true;
    }
    
    return false;
  } catch (error) {
    return false;
  }
}

async function searchAndBlock(params) {
  const blockType = params.block_type || "by_name";
  const action = params.action || "search_only";
  
  if (blockType === "by_genre") {
    return await searchAndBlockByGenre({
      action: action,
      genre_name: params.genre_name
    });
  } else if (blockType === "manual_id") {
    const tmdbId = params.tmdb_id ? params.tmdb_id.trim() : '';
    const mediaType = params.media_type || "movie";
    
    if (!tmdbId) {
      return [{
        id: "no_id",
        type: "info",
        title: "\u26a0 \u8bf7\u8f93\u5165TMDB ID",
        description: "\u5728\u4e0a\u65b9\u8f93\u5165\u6846\u4e2d\u8f93\u5165\u8981\u5c4f\u853d\u7684TMDB ID\uff0c\u7136\u540e\u91cd\u65b0\u8fd0\u884c\u6b64\u6a21\u5757\u3002",
        posterPath: "",
        backdropPath: "",
        rating: 0,
        mediaType: "info"
      }];
    }

    if (!/^\d+$/.test(tmdbId)) {
      return [{
        id: "invalid_id",
        type: "error",
        title: "\u274c \u65e0\u6548\u7684ID\u683c\u5f0f",
        description: "TMDB ID\u5e94\u8be5\u662f\u7eaf\u6570\u5b57\uff0c\u4f8b\u5982\uff1a550\u30011399",
        posterPath: "",
        backdropPath: "",
        rating: 0,
        mediaType: "error"
      }];
    }

    try {
      const endpoint = mediaType === "movie" ? "/movie/" + tmdbId : "/tv/" + tmdbId;
      
      const response = await Widget.tmdb.get(endpoint, {
        params: { language: "zh-CN" }
      });

      let item = null;
      if (response && response.data) {
        item = response.data;
      } else if (response && (response.title || response.name)) {
        item = response;
      } else {
        throw new Error("\u65e0\u6cd5\u89e3\u6790\u8be6\u60c5\u54cd\u5e94\u7ed3\u6784");
      }

      const title = item.title || item.name;
      
      if (!title) {
        return [{
          id: "not_found",
          type: "error",
          title: "\u274c \u5185\u5bb9\u4e0d\u5b58\u5728",
          description: "\u672a\u627e\u5230ID\u4e3a " + tmdbId + " \u7684" + (mediaType === "movie" ? "\u7535\u5f71" : "\u5267\u96c6"),
          posterPath: "",
          backdropPath: "",
          rating: 0,
          mediaType: "error"
        }];
      }

      const blockItem = {
        id: tmdbId,
        media_type: mediaType,
        title: title,
        poster_path: item.poster_path,
        overview: item.overview,
        vote_average: item.vote_average
      };

      const success = addBlockedItem(blockItem);
      const mediaTypeText = mediaType === "movie" ? "\u7535\u5f71" : "\u5267\u96c6";
      const ratingText = item.vote_average ? " \u2b50" + item.vote_average.toFixed(1) : "";
      
      return [{
        id: "manual_block_result_" + tmdbId,
        type: "info",
        title: success ? "\u2705 \u5c4f\u853d\u6210\u529f" : "\u2139\ufe0f \u5df2\u5b58\u5728",
        description: success ? 
          mediaTypeText + "\"" + title + "\"" + ratingText + "\u5df2\u6dfb\u52a0\u5230\u9ed1\u540d\u5355" : 
          mediaTypeText + "\"" + title + "\"" + ratingText + "\u5df2\u5728\u9ed1\u540d\u5355\u4e2d",
        posterPath: item.poster_path ? "https://image.tmdb.org/t/p/w500" + item.poster_path : "",
        backdropPath: "",
        rating: item.vote_average || 0,
        mediaType: mediaType
      }];

    } catch (error) {
      return [{
        id: "manual_block_error",
        type: "error", 
        title: "\u274c \u5c4f\u853d\u5931\u8d25",
        description: "\u9519\u8bef\u4fe1\u606f: " + error.message,
        posterPath: "",
        backdropPath: "",
        rating: 0,
        mediaType: "error"
      }];
    }
  } else {
    const query = params.query ? params.query.trim() : '';
    const language = params.language || "zh-CN";
    
    if (!query) {
      return [{
        id: "no_query",
        type: "info",
        title: "\u26a0 \u8bf7\u8f93\u5165\u641c\u7d22\u5173\u952e\u8bcd",
        description: "\u5728\u4e0a\u65b9\u8f93\u5165\u6846\u4e2d\u8f93\u5165\u8981\u641c\u7d22\u7684\u5f71\u7247\u6216\u5267\u96c6\u540d\u79f0\uff0c\u7136\u540e\u91cd\u65b0\u8fd0\u884c\u6b64\u6a21\u5757\u3002",
        posterPath: "",
        backdropPath: "",
        rating: 0,
        mediaType: "info"
      }];
    }

    try {
      const searchResults = await searchTMDB(query, language);
      
      if (searchResults.length === 0) {
        return [{
          id: "no_results",
          type: "info", 
          title: "\u1f50d \u672a\u627e\u5230\u5339\u914d\u7ed3\u679c",
          description: "\u6ca1\u6709\u627e\u5230\u4e0e\"" + query + "\"\u76f8\u5173\u7684\u5f71\u7247\u6216\u5267\u96c6\uff0c\u8bf7\u5c1d\u8bd5\u5176\u4ed6\u5173\u952e\u8bcd\u3002",
          posterPath: "",
          backdropPath: "",
          rating: 0,
          mediaType: "info"
        }];
      }

      const resultItems = [];
      
      if (action === "search_only") {
        const blockedItems = getBlockedItems();
        const blockedIds = new Set();
        for (let i = 0; i < blockedItems.length; i++) {
          blockedIds.add(blockedItems[i].id + "_" + blockedItems[i].media_type);
        }
        
        for (let i = 0; i < searchResults.length; i++) {
          const item = searchResults[i];
          const isBlocked = blockedIds.has(item.id + "_" + item.media_type);
          const mediaTypeText = item.media_type === "movie" ? "\u7535\u5f71" : "\u5267\u96c6";
          const yearText = item.year ? " (" + item.year + ")" : "";
          const ratingText = item.vote_average ? " \u2b50" + item.vote_average.toFixed(1) : "";
          const statusText = isBlocked ? " \u1f6ab\u5df2\u5c4f\u853d" : "";
          
          resultItems.push({
            id: "search_" + item.id + "_" + item.media_type,
            type: "info",
            title: item.title + yearText + statusText,
            description: mediaTypeText + ratingText + " (TMDB ID: " + item.id + ") | " + (item.overview || "\u6682\u65e0\u7b80\u4ecb"),
            posterPath: item.poster_path ? "https://image.tmdb.org/t/p/w500" + item.poster_path : "",
            backdropPath: "",
            rating: item.vote_average || 0,
            mediaType: item.media_type
          });
        }
        
        resultItems.unshift({
          id: "search_summary",
          type: "info",
          title: "\u1f50d \u641c\u7d22\u7ed3\u679c",
          description: "\u641c\u7d22\"" + query + "\"\u627e\u5230 " + searchResults.length + " \u4e2a\u7ed3\u679c\n\n" +
                       "\u5982\u9700\u5c4f\u853d\u8fd9\u4e9b\u5185\u5bb9\uff0c\u8bf7\u9009\u62e9\"\u641c\u7d22\u5e76\u5c4f\u853d\"\u6a21\u5f0f\u3002",
          posterPath: "",
          backdropPath: "",
          rating: 0,
          mediaType: "info"
        });
        
      } else {
        let blockedCount = 0;
        let alreadyBlockedCount = 0;
        
        for (let i = 0; i < searchResults.length; i++) {
          const item = searchResults[i];
          const mediaTypeText = item.media_type === "movie" ? "\u7535\u5f71" : "\u5267\u96c6";
          const yearText = item.year ? " (" + item.year + ")" : "";
          const ratingText = item.vote_average ? " \u2b50" + item.vote_average.toFixed(1) : "";
          
          const blockItem = {
            id: item.id,
            media_type: item.media_type,
            title: item.title,
            poster_path: item.poster_path,
            overview: item.overview,
            vote_average: item.vote_average
          };
          
          const success = addBlockedItem(blockItem);
          if (success) {
            blockedCount++;
          } else {
            alreadyBlockedCount++;
          }
          
          const status = success ? "\u2705 \u5df2\u5c4f\u853d" : "\u1f6ab \u5df2\u5b58\u5728";
          
          resultItems.push({
            id: "blocked_" + item.id + "_" + item.media_type,
            type: "info",
            title: status + " " + item.title + yearText,
            description: mediaTypeText + ratingText + " (TMDB ID: " + item.id + ") | " + (item.overview || "\u6682\u65e0\u7b80\u4ecb"),
            posterPath: item.poster_path ? "https://image.tmdb.org/t/p/w500" + item.poster_path : "",
            backdropPath: "",
            rating: item.vote_average || 0,
            mediaType: item.media_type
          });
        }
        
        resultItems.unshift({
          id: "block_summary",
          type: "info",
          title: "\u1f3af \u5c4f\u853d\u64cd\u4f5c\u5b8c\u6210",
          description: "\u641c\u7d22\"" + query + "\"\u627e\u5230 " + searchResults.length + " \u4e2a\u7ed3\u679c\n" +
                       "\u65b0\u589e\u5c4f\u853d: " + blockedCount + " \u4e2a\n" +
                       "\u5df2\u5b58\u5728: " + alreadyBlockedCount + " \u4e2a\n\n" +
                       "\u8fd9\u4e9b\u5185\u5bb9\u5c06\u4e0d\u518d\u5728\u4efb\u4f55TMDB\u699c\u5355\u4e2d\u663e\u793a\u3002",
          posterPath: "",
          backdropPath: "",
          rating: 0,
          mediaType: "info"
        });
      }
      
      return resultItems;
      
    } catch (error) {
      return [{
        id: "error",
        type: "error",
        title: "\u274c \u641c\u7d22\u5931\u8d25",
        description: "\u9519\u8bef\u4fe1\u606f: " + error.message,
        posterPath: "",
        backdropPath: "",
        rating: 0,
        mediaType: "error"
      }];
    }
  }
}

// =============屏蔽管理=============
async function manageBlockedItems(params) {
  const manageType = params.manage_type || "items";
  const action = params.action || "view";
  
  if (manageType === "genres") {
    if (action === "unblock") {
      const genreId = params.unblock_id ? parseInt(params.unblock_id.trim()) : null;
      
      if (!genreId) {
        return [{
          id: "no_genre_id",
          type: "info",
          title: "\u26a0 \u8bf7\u8f93\u5165\u8981\u53d6\u6d88\u5c4f\u853d\u7684\u7c7b\u578bID",
          description: "\u5728\u4e0a\u65b9\u8f93\u5165\u6846\u4e2d\u8f93\u5165\u8981\u53d6\u6d88\u5c4f\u853d\u7684\u7c7b\u578bID\uff0c\u7136\u540e\u91cd\u65b0\u8fd0\u884c\u3002",
          posterPath: "",
          backdropPath: "",
          rating: 0,
          mediaType: "info"
        }];
      }
      
      const success = removeBlockedGenre(genreId);
      const genreName = REVERSE_GENRE_MAPPING[genreId] || `\u7c7b\u578bID: ${genreId}`;
      
      return [{
        id: "unblock_genre_result",
        type: "info",
        title: success ? "\u2705 \u53d6\u6d88\u5c4f\u853d\u6210\u529f" : "\u274c \u64cd\u4f5c\u5931\u8d25",
        description: success ? 
          `\u7c7b\u578b"${genreName}"\u5df2\u4ece\u5c4f\u853d\u5217\u8868\u4e2d\u79fb\u9664\uff0c\u5c06\u91cd\u65b0\u5728\u699c\u5355\u4e2d\u663e\u793a\u3002` : 
          `\u672a\u627e\u5230ID\u4e3a ${genreId} \u7684\u7c7b\u578b\uff0c\u6216\u53d6\u6d88\u5c4f\u853d\u65f6\u51fa\u73b0\u9519\u8bef\u3002`,
        posterPath: "",
        backdropPath: "",
        rating: 0,
        mediaType: "info"
      }];
    }
    
    if (action === "clear") {
      try {
        Widget.storage.remove(GENRE_STORAGE_KEY);
        clearBlockedGenresCache();
        clearBlockedIdCache();
        return [{
          id: "clear_genres_result",
          type: "info",
          title: "\u2705 \u7c7b\u578b\u5c4f\u853d\u5217\u8868\u5df2\u6e05\u7a7a",
          description: "\u6240\u6709\u88ab\u5c4f\u853d\u7684\u7c7b\u578b\u5df2\u88ab\u79fb\u9664\uff0c\u5185\u5bb9\u5c06\u91cd\u65b0\u5728\u699c\u5355\u4e2d\u663e\u793a\u3002",
          posterPath: "",
          backdropPath: "",
          rating: 0,
          mediaType: "info"
        }];
      } catch (error) {
        return [{
          id: "clear_genres_error",
          type: "error",
          title: "\u274c \u6e05\u7a7a\u5931\u8d25",
          description: "\u6e05\u7a7a\u7c7b\u578b\u5c4f\u853d\u5217\u8868\u65f6\u51fa\u73b0\u9519\u8bef\u3002",
          posterPath: "",
          backdropPath: "",
          rating: 0,
          mediaType: "error"
        }];
      }
    }
    
    const blockedGenres = getBlockedGenres();
    
    if (blockedGenres.length === 0) {
      return [{
        id: "empty_genre_list",
        type: "info",
        title: "\u7c7b\u578b\u5c4f\u853d\u5217\u8868\u4e3a\u7a7a",
        description: "\u5f53\u524d\u6ca1\u6709\u5c4f\u853d\u4efb\u4f55\u5185\u5bb9\u7c7b\u578b\u3002\u5728\u5c4f\u853d\u7c7b\u578b\u9009\u62e9\"\u6309\u5185\u5bb9\u7c7b\u578b\"\u6dfb\u52a0\u8981\u5c4f\u853d\u7684\u7c7b\u578b\u3002",
        posterPath: "",
        backdropPath: "",
        rating: 0,
        mediaType: "info"
      }];
    }
    
    const resultItems = [];
    
    resultItems.push({
      id: "genre_unblock_help",
      type: "info",
      title: "\ud83d\udca1 \u53d6\u6d88\u7c7b\u578b\u5c4f\u853d\u8bf4\u660e",
      description: "\u8981\u53d6\u6d88\u5c4f\u853d\u67d0\u4e2a\u7c7b\u578b\uff0c\u8bf7\uff1a\ud83d\udcdd \u8bb0\u4f4f\u8981\u53d6\u6d88\u7684\u7c7b\u578bID\uff0c\u2699\ufe0f \u9009\u62e9\"\u53d6\u6d88\u5c4f\u853d\"\u64cd\u4f5c\uff0c\u270f\ufe0f \u8f93\u5165\u5bf9\u5e94\u7684\u7c7b\u578bID",
      posterPath: "",
      backdropPath: "",
      rating: 0,
      mediaType: "info"
    });
    
    const sortedGenres = [...blockedGenres].sort((a, b) => 
      new Date(b.blocked_date) - new Date(a.blocked_date)
    );
    
    for (const genre of sortedGenres) {
      const blockedDate = new Date(genre.blocked_date).toLocaleDateString();
      
      resultItems.push({
        id: `blocked_genre_${genre.id}`,
        type: "blocked_genre",
        title: `\ud83d\udeab ${genre.name}`,
        description: `\u7c7b\u578bID: ${genre.id} | \u5c4f\u853d\u4e8e: ${blockedDate}\n${genre.description}`,
        posterPath: "",
        backdropPath: "",
        rating: 0,
        mediaType: "genre",
        genreId: genre.id,
        genreName: genre.name
      });
    }
    
    return resultItems;
  } else {
    if (action === "unblock") {
      const unblockId = params.unblock_id ? params.unblock_id.trim() : '';
      const mediaType = params.unblock_media_type || "tv";
      
      if (!unblockId) {
        return [{
          id: "no_unblock_id",
          type: "info",
          title: "\u26a0 \u8bf7\u8f93\u5165\u8981\u53d6\u6d88\u5c4f\u853d\u7684ID",
          description: "\u5728\u4e0a\u65b9\u8f93\u5165\u6846\u4e2d\u8f93\u5165\u8981\u53d6\u6d88\u5c4f\u853d\u7684TMDB ID\uff0c\u7136\u540e\u91cd\u65b0\u8fd0\u884c\u3002",
          posterPath: "",
          backdropPath: "",
          rating: 0,
          mediaType: "info"
        }];
      }

      if (!/^\d+$/.test(unblockId)) {
        return [{
          id: "invalid_unblock_id",
          type: "error",
          title: "\u274c \u65e0\u6548\u7684ID\u683c\u5f0f",
          description: "TMDB ID\u5e94\u8be5\u662f\u7eaf\u6570\u5b57\uff0c\u4f8b\u5982\uff1a2190\u3001550",
          posterPath: "",
          backdropPath: "",
          rating: 0,
          mediaType: "error"
        }];
      }

      const success = removeBlockedItem(unblockId, mediaType);
      const mediaTypeText = mediaType === "movie" ? "\u7535\u5f71" : "\u5267\u96c6";
      
      return [{
        id: "unblock_result",
        type: "info",
        title: success ? "\u2705 \u53d6\u6d88\u5c4f\u853d\u6210\u529f" : "\u274c \u64cd\u4f5c\u5931\u8d25",
        description: success ? 
          mediaTypeText + " ID " + unblockId + " \u5df2\u4ece\u9ed1\u540d\u5355\u4e2d\u79fb\u9664\uff0c\u5c06\u91cd\u65b0\u5728\u699c\u5355\u4e2d\u663e\u793a\u3002" : 
          "\u672a\u627e\u5230ID\u4e3a " + unblockId + " \u7684" + mediaTypeText + "\uff0c\u6216\u53d6\u6d88\u5c4f\u853d\u65f6\u51fa\u73b0\u9519\u8bef\u3002",
        posterPath: "",
        backdropPath: "",
        rating: 0,
        mediaType: "info"
      }];
    }
    
    if (action === "clear") {
      const success = clearBlockedItems();
      return [{
        id: "clear_result",
        type: "info",
        title: success ? "\u2705 \u9ed1\u540d\u5355\u5df2\u6e05\u7a7a" : "\u274c \u6e05\u7a7a\u5931\u8d25",
        description: success ? "\u6240\u6709\u5c4f\u853d\u9879\u5df2\u88ab\u79fb\u9664\uff0cWidget\u5b58\u50a8\u5df2\u6e05\u7a7a" : "\u6e05\u7a7a\u9ed1\u540d\u5355\u65f6\u51fa\u73b0\u9519\u8bef",
        posterPath: "",
        backdropPath: "",
        rating: 0,
        mediaType: "info"
      }];
    }

    if (action === "export") {
      const blockedItems = getBlockedItems();
      const idList = blockedItems.map(item => item.id).join(',');
      
      return [{
        id: "export_result",
        type: "info",
        title: "\ud83d\udce4 \u5bfc\u51fa\u5c4f\u853d\u914d\u7f6e",
        description: `\u5f53\u524d\u5c4f\u853d\u7684ID\u5217\u8868\uff08${blockedItems.length}\u4e2a\uff09\uff1a\n\n${idList || '\u65e0'}`,
        posterPath: "",
        backdropPath: "",
        rating: 0,
        mediaType: "info"
      }];
    }

    if (action === "import") {
      const importData = params.import_data ? params.import_data.trim() : '';
      if (!importData) {
        return [{
          id: "import_empty",
          type: "info",
          title: "\u26a0 \u8bf7\u8f93\u5165\u5bfc\u5165\u6570\u636e",
          description: "\u5728\u4e0a\u65b9\u8f93\u5165\u6846\u4e2d\u8f93\u5165\u8981\u5bfc\u5165\u7684TMDB ID\u5217\u8868\uff08\u7528\u9017\u53f7\u5206\u9694\uff09\uff0c\u7136\u540e\u91cd\u65b0\u8fd0\u884c\u3002",
          posterPath: "",
          backdropPath: "",
          rating: 0,
          mediaType: "info"
        }];
      }

      try {
        let cleanedData = importData;
        
        cleanedData = cleanedData.replace(/['"]/g, '');
        
        const idArray = cleanedData.split(',');
        const ids = [];
        for (let i = 0; i < idArray.length; i++) {
          const id = idArray[i].trim();
          if (/^\d+$/.test(id)) {
            ids.push(id);
          }
        }
        
        let importedCount = 0;
        const blockedItems = getBlockedItems();

        for (let i = 0; i < ids.length; i++) {
          const id = ids[i];
          const exists = blockedItems.some(item => item.id === id);
          if (!exists) {
            blockedItems.push({
              id: id,
              media_type: "movie",
              title: `TMDB ID: ${id}`,
              poster_path: "",
              overview: "\u901a\u8fc7ID\u5bfc\u5165\u7684\u5c4f\u853d\u9879",
              blocked_date: new Date().toISOString(),
              vote_average: 0
            });
            importedCount++;
          }
        }

        const success = saveBlockedItems(blockedItems);
        
        return [{
          id: "import_result",
          type: "info",
          title: success ? `\u2705 \u5bfc\u5165\u6210\u529f` : "\u274c \u5bfc\u5165\u5931\u8d25",
          description: success ? 
            `\u6210\u529f\u5bfc\u5165 ${importedCount} \u4e2a\u65b0\u7684\u5c4f\u853d\u9879\uff0c\u603b\u8ba1 ${blockedItems.length} \u4e2a\u5c4f\u853d\u9879` :
            "\u5bfc\u5165\u8fc7\u7a0b\u4e2d\u51fa\u73b0\u9519\u8bef",
          posterPath: "",
          backdropPath: "",
          rating: 0,
          mediaType: "info"
        }];
      } catch (error) {
        return [{
          id: "import_error",
          type: "error",
          title: "\u274c \u5bfc\u5165\u5931\u8d25",
          description: `\u9519\u8bef\u4fe1\u606f: ${error.message}`,
          posterPath: "",
          backdropPath: "",
          rating: 0,
          mediaType: "error"
        }];
      }
    }
    
    const blockedItems = getBlockedItems();
    
    if (blockedItems.length === 0) {
      return [{
        id: "empty_list",
        type: "info",
        title: "\u9ed1\u540d\u5355\u4e3a\u7a7a",
        description: "\u5f53\u524d\u6ca1\u6709\u5c4f\u853d\u4efb\u4f55\u5185\u5bb9\u3002\u4f7f\u7528\"TMDB \u641c\u7d22\u5c4f\u853d\"\u529f\u80fd\u6dfb\u52a0\u8981\u5c4f\u853d\u7684\u5f71\u7247\u3002",
        posterPath: "",
        backdropPath: "",
        rating: 0,
        mediaType: "info"
      }];
    }

    const sortedItems = [];
    for (let i = 0; i < blockedItems.length; i++) {
      sortedItems.push(blockedItems[i]);
    }
    
    sortedItems.sort(function(a, b) {
      return new Date(b.blocked_date) - new Date(a.blocked_date);
    });

    const resultItems = [];
    
    if (sortedItems.length > 0) {
      resultItems.push({
        id: "unblock_help",
        type: "info",
        title: "\ud83d\udca1 \u53d6\u6d88\u5c4f\u853d\u8bf4\u660e",
        description: "\u8981\u53d6\u6d88\u5c4f\u853d\u67d0\u4e2a\u5185\u5bb9\uff0c\u8bf7\uff1a\ud83d\udcdd \u8bb0\u4f4f\u8981\u53d6\u6d88\u7684TMDB ID\uff0c\u2699\ufe0f \u9009\u62e9\"\u53d6\u6d88\u5c4f\u853d\"\u64cd\u4f5c\uff0c\u270f\ufe0f \u8f93\u5165\u5bf9\u5e94\u7684ID\u548c\u5a92\u4f53\u7c7b\u578b",
        posterPath: "",
        backdropPath: "",
        rating: 0,
        mediaType: "info"
      });
    }
    
    for (let i = 0; i < sortedItems.length; i++) {
      const item = sortedItems[i];
      const mediaTypeText = item.media_type === "movie" ? "\u7535\u5f71" : "\u5267\u96c6";
      const blockedDate = new Date(item.blocked_date).toLocaleDateString();
      const ratingText = item.vote_average ? " \u2b50" + item.vote_average.toFixed(1) : "";
      
      resultItems.push({
        id: "blocked_" + item.id + "_" + item.media_type,
        type: "blocked_item",
        title: "\ud83d\udeab " + item.title,
        description: mediaTypeText + ratingText + " | TMDB ID: " + item.id + " | \u5c4f\u853d\u4e8e: " + blockedDate + "\n" + (item.overview || "\u6682\u65e0\u7b80\u4ecb"),
        posterPath: item.poster_path ? "https://image.tmdb.org/t/p/w500" + item.poster_path : "",
        backdropPath: "",
        rating: item.vote_average || 0,
        mediaType: item.media_type,
        tmdbId: item.id,
        tmdbMediaType: item.media_type
      });
    }
    
    return resultItems;
  }
}

async function loadDetail(link) {
  try {
    if (link.startsWith("block://")) {
      const parts = link.replace("block://", "").split("/");
      const [id, mediaType, encodedTitle] = parts;
      const title = decodeURIComponent(encodedTitle);
      
      const endpoint = mediaType === "movie" ? "/movie/" + id : "/tv/" + id;
      
      const response = await Widget.tmdb.get(endpoint, {
        params: { language: "zh-CN" }
      });

      let item = null;
      if (response && response.data) {
        item = response.data;
      } else if (response && (response.title || response.name)) {
        item = response;
      } else {
        throw new Error("\u65e0\u6cd5\u89e3\u6790\u8be6\u60c5\u54cd\u5e94\u7ed3\u6784");
      }
      const blockItem = {
        id: id,
        media_type: mediaType,
        title: item.title || item.name,
        poster_path: item.poster_path,
        overview: item.overview,
        vote_average: item.vote_average
      };

      const success = addBlockedItem(blockItem);
      const mediaTypeText = mediaType === "movie" ? "\u7535\u5f71" : "\u5267\u96c6";
      const ratingText = item.vote_average ? ` \u2b50${item.vote_average.toFixed(1)}` : "";
      
      return {
        videoUrl: "",
        title: success ? "\u2705 \u5c4f\u853d\u6210\u529f" : "\u2139\ufe0f \u5df2\u5b58\u5728",
        description: success ? 
          `${mediaTypeText}"${title}"${ratingText}\u5df2\u6dfb\u52a0\u5230\u9ed1\u540d\u5355\uff0c\u5c06\u4e0d\u518d\u5728\u5e94\u7528\u4e2d\u663e\u793a\u3002\n\n\u6570\u636e\u5df2\u4fdd\u5b58\u5230Widget.storage\u4e2d\uff0c\u6240\u6709\u699c\u5355\u90fd\u4f1a\u81ea\u52a8\u8fc7\u6ee4\u6b64\u5185\u5bb9\u3002` : 
          `${mediaTypeText}"${title}"${ratingText}\u5df2\u5728\u9ed1\u540d\u5355\u4e2d\u3002`
      };
      
    } else if (link.startsWith("unblock://")) {
      const parts = link.replace("unblock://", "").split("/");
      const [id, mediaType, encodedTitle] = parts;
      const title = decodeURIComponent(encodedTitle);
      
      const success = removeBlockedItem(id, mediaType);
      const mediaTypeText = mediaType === "movie" ? "\u7535\u5f71" : "\u5267\u96c6";
      
      return {
        videoUrl: "",
        title: success ? "\u2705 \u53d6\u6d88\u5c4f\u853d\u6210\u529f" : "\u274c \u64cd\u4f5c\u5931\u8d25",
        description: success ? 
          `${mediaTypeText}"${title}"\u5df2\u4ece\u9ed1\u540d\u5355\u4e2d\u79fb\u9664\uff0c\u5c06\u91cd\u65b0\u5728\u5e94\u7528\u4e2d\u663e\u793a\u3002\n\nWidget.storage\u5df2\u66f4\u65b0\uff0c\u6240\u6709\u699c\u5355\u5c06\u91cd\u65b0\u663e\u793a\u6b64\u5185\u5bb9\u3002` : 
          `\u53d6\u6d88\u5c4f\u853d${mediaTypeText}"${title}"\u65f6\u51fa\u73b0\u9519\u8bef\u3002`
      };
    }
    
    return {
      videoUrl: "",
      title: "\u274c \u65e0\u6548\u64cd\u4f5c",
      description: "\u65e0\u6cd5\u8bc6\u522b\u7684\u64cd\u4f5c\u7c7b\u578b\uff0c\u8bf7\u4f7f\u7528\u5c4f\u853d\u7ba1\u7406\u5668\u4e2d\u7684\u529f\u80fd\u3002"
    };
    
  } catch (error) {
    return {
      videoUrl: "",
      title: "\u274c \u64cd\u4f5c\u5931\u8d25", 
      description: `\u9519\u8bef\u4fe1\u606f: ${error.message}`
    };
  }
}

// =============豆瓣功能函数=============
async function loadDoubanItemsFromApi(params = {}) {
  const { start, limit } = calculatePagination(params);
  const url = params.url;
  const apiUrl = `${url}?start=${start}&count=${limit}&updated_at&items_only=1&for_mobile=1`;
  const listIdMatch = params.url.match(/subject_collection\/(\w+)/);
  const referer = listIdMatch ? `https://m.douban.com/subject_collection/${listIdMatch[1]}/` : 'https://m.douban.com/';
  const response = await Widget.http.get(apiUrl, {
    headers: {
      Referer: referer,
      "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1",
    },
  });
  
  const items = response.data.subject_collection_items;
  const processedItems = items.map((item) => {
    let genres = item.genres;
    
    if (!genres || (Array.isArray(genres) && genres.length === 0)) {
        const textToExtract = [
            item.card_subtitle,
            item.description,
            item.abstract
        ].filter(Boolean).join(' ');
        
        if (textToExtract) {
            const extractedGenres = extractGenresFromText(textToExtract);
            if (extractedGenres.length > 0) {
                genres = extractedGenres;
            }
        }
    }
   
    return {
      id: item.id,
      type: "douban",
      title: item.title,
      coverUrl: item.cover?.url,
      description: formatItemDescription({
          description: item.card_subtitle || item.description,
          rating: item.rating?.value,
          releaseDate: item.year
      }),
      rating: item.rating?.value,
      releaseDate: item.year,
      genreTitle: getDoubanGenreTitles(genres || [], null)
    };
  });
  
  return filterBlockedItemsEnhanced(processedItems);
}

async function loadDoubanHotList(params = {}) {
  const url = params.url;
  
  const uriMatch = url.match(/uri=([^&]+)/);
  if (!uriMatch) {
    throw new Error("\u65e0\u6cd5\u89e3\u6790\u8c46\u74e3dispatch URL");
  }
  
  const uri = decodeURIComponent(uriMatch[1]);
  const collectionMatch = uri.match(/\/subject_collection\/([^\/]+)/);
  if (!collectionMatch) {
    throw new Error("\u65e0\u6cd5\u4ece URI\u4e2d\u63d0\u53d6collection ID");
  }
  
  const collectionId = collectionMatch[1];
  
  const apiUrl = `https://m.douban.com/rexxar/api/v2/subject_collection/${collectionId}/items?updated_at&items_only=1&for_mobile=1`;
  const referer = `https://m.douban.com/subject_collection/${collectionId}/`;
  
  const response = await Widget.http.get(apiUrl, {
    headers: {
      Referer: referer,
      "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1",
    },
  });
  
  if (!response.data || !response.data.subject_collection_items) {
    throw new Error("\u83b7\u53d6\u8c46\u74e3\u70ed\u699c\u6570\u636e\u5931\u8d25");
  }
  
  const items = response.data.subject_collection_items;
  
  const processedItems = items.map((item) => {
    let genres = item.genres;
    
    if (!genres || (Array.isArray(genres) && genres.length === 0)) {
        const textToExtract = [
            item.card_subtitle,
            item.description,
            item.abstract
        ].filter(Boolean).join(' ');
        
        if (textToExtract) {
            const extractedGenres = extractGenresFromText(textToExtract);
            if (extractedGenres.length > 0) {
                genres = extractedGenres;
            }
        }
    }
    
    const itemType = determineItemType(item, params.type);
   
    return {
      id: item.id,
      type: "douban",
      title: item.title,
      coverUrl: item.cover?.url,
      description: formatItemDescription({
          description: item.card_subtitle || item.description,
          rating: item.rating?.value,
          releaseDate: item.year,
          itemType: itemType
      }),
      rating: item.rating?.value,
      releaseDate: item.year,
      genreTitle: getDoubanGenreTitles(genres || [], itemType),
      itemType: itemType
    };
  });
  
  return filterBlockedItemsEnhanced(processedItems);
}

function determineItemType(item, paramType) {
  if (paramType === "movie") return "\u7535\u5f71";
  if (paramType === "tv") return "\u5267\u96c6";
  if (paramType === "subject") {
    if (item.subtype === "movie") return "\u7535\u5f71";
    
    const cardSubtitle = item.card_subtitle || "";
    if (cardSubtitle.includes("\u7535\u5f71")) return "\u7535\u5f71";
    if (cardSubtitle.includes("\u5267\u96c6") || cardSubtitle.includes("\u7535\u89c6\u5267")) return "\u5267\u96c6";
    
    return "\u7efc\u5408";
  }
  return "\u672a\u77e5";
}

function detectMultiTypeItems(items) {
  const titleTypeMap = new Map();
  
  for (const item of items) {
    const title = item.title.trim();
    if (!titleTypeMap.has(title)) {
      titleTypeMap.set(title, new Set());
    }
    
    let itemType = item.type;
    if (item.subtype) {
      itemType = item.subtype;
    }
    
    titleTypeMap.get(title).add(itemType);
  }
  
  const multiTypesTitles = new Set();
  for (const [title, types] of titleTypeMap.entries()) {
    if (types.size > 1) {
      const hasMovieOrTv = types.has('movie') || types.has('tv');
      if (hasMovieOrTv) {
        multiTypesTitles.add(title);
      }
    }
  }
  
  return items.map(item => {
    const title = item.title.trim();
    const isMultiType = multiTypesTitles.has(title);
    
    return {
      ...item,
      shouldUseMultiTypeMatching: isMultiType
    };
  });
}

function detectItemTypeFromContent(item) {
  const aliases = (item.original_title || item.aka || item.alternate_title || "").toLowerCase();
  if (aliases.includes("\u7535\u5f71\u7248") || aliases.includes("(\u7535\u5f71)") || aliases.includes("movie")) {
    return "movie";
  }
  if (aliases.includes("\u7535\u89c6\u5267\u7248") || aliases.includes("(\u7535\u89c6\u5267)") || aliases.includes("tv") || aliases.includes("series")) {
    return "tv";
  }
  
  const description = (item.card_subtitle || item.description || item.abstract || "").toLowerCase();
  const title = (item.title || "").toLowerCase();
  
  if (description.includes("\u7535\u5f71") && !description.includes("\u7535\u89c6") && !description.includes("\u5267")) {
    return "movie";
  }
  
  if (description.includes("\u7535\u89c6\u5267") || description.includes("\u5267\u96c6") || description.includes("\u96c6\u6570") || 
      description.includes("\u5b63") || description.includes("\u5168") && description.includes("\u96c6")) {
    return "tv";
  }
  
  if (description.includes("\u52a8\u753b") || title.includes("\u52a8\u753b") || 
      description.includes("\u756a\u5267") || description.includes("anime") ||
      description.includes("animation") || aliases.includes("\u52a8\u753b")) {
    
    if (description.includes("\u7535\u5f71") || title.includes("\u7535\u5f71") || 
        description.includes("\u5267\u573a\u7248") || title.includes("\u5267\u573a\u7248")) {
      return "movie";
    }
    
    if (description.includes("\u756a\u5267") || description.includes("\u7b2c") && description.includes("\u5b63") ||
        description.includes("\u96c6") && !description.includes("\u7535\u5f71") ||
        description.includes("tv") || description.includes("series")) {
      return "tv";
    }
    
    return "multi";
  }
  
  if (description.includes("\u5206\u949f") || description.includes("min") || description.includes("\u5c0f\u65f6")) {
    return "movie";
  }
  
  if (title.includes("\u7535\u5f71\u7248")) {
    return "movie";
  }
  if (title.includes("\u7535\u89c6\u5267\u7248") || title.includes("\u5267\u7248")) {
    return "tv";
  }
  
  return null;
}

function detectAndAssignTypePreferences(items) {
  const titleItemsMap = new Map();
  
  for (const item of items) {
    const title = item.title.trim();
    if (!titleItemsMap.has(title)) {
      titleItemsMap.set(title, []);
    }
    titleItemsMap.get(title).push(item);
  }
  
  const multiItemTitles = new Set();
  for (const [title, titleItems] of titleItemsMap.entries()) {
    if (titleItems.length > 1) {
      const hasMultipleTypes = titleItems.some((item, index) => {
        const otherItems = titleItems.filter((_, i) => i !== index);
        const itemType = detectItemTypeFromContent(item);
        return otherItems.some(otherItem => {
          const otherType = detectItemTypeFromContent(otherItem);
          return itemType && otherType && itemType !== otherType;
        });
      });
      
      if (hasMultipleTypes) {
        multiItemTitles.add(title);
      } else {
        multiItemTitles.add(title);
      }
    }
  }
  
  const itemsWithPreferences = [];
  const processedTitles = new Map();
  
  for (const item of items) {
    const title = item.title.trim();
    const isMultiTypeTitle = multiItemTitles.has(title);
    
    let assignedTypePreference = null;
    
    if (isMultiTypeTitle) {
      if (!processedTitles.has(title)) {
        processedTitles.set(title, []);
      }
      
      const sameTitle = processedTitles.get(title);
      const currentCount = sameTitle.length;
      
      if (currentCount === 0) {
        assignedTypePreference = "movie";
      } else if (currentCount === 1) {
        assignedTypePreference = "tv";
      }
      
      sameTitle.push(item.id);
    }
    
    itemsWithPreferences.push({
      ...item,
      isMultiTypeTitle: isMultiTypeTitle,
      assignedTypePreference: assignedTypePreference
    });
  }
  
  return itemsWithPreferences;
}

async function fetchTmdbDataForDouban(key, mediaType) {
    let searchTypes = [];
    
    if (mediaType === "movie") {
        searchTypes = ["movie"];
    } else if (mediaType === "tv") {
        searchTypes = ["tv"];
    } else if (mediaType === "multi") {
        searchTypes = ["movie", "tv"];
    } else {
        searchTypes = ["movie", "tv"];
    }
    
    const allResults = [];
    
    for (const type of searchTypes) {
        try {
            const tmdbResults = await Widget.tmdb.get(`/search/${type}`, {
                params: {
                    query: key,
                    language: "zh_CN",
                }
            });
            
            if (tmdbResults.results && tmdbResults.results.length > 0) {
                const resultsWithType = tmdbResults.results.map(result => ({
                    ...result,
                    media_type: type
                }));
                allResults.push(...resultsWithType);
            }
        } catch (error) {
        }
    }
    
    return allResults;
}

function calculateSimilarity(str1, str2) {
    const cleanStr1 = str1.toLowerCase().replace(/[^\u4e00-\u9fa5a-z0-9]/g, '');
    const cleanStr2 = str2.toLowerCase().replace(/[^\u4e00-\u9fa5a-z0-9]/g, '');
    
    if (cleanStr1 === cleanStr2) return 1.0;
    
    const longer = cleanStr1.length > cleanStr2.length ? cleanStr1 : cleanStr2;
    const shorter = cleanStr1.length > cleanStr2.length ? cleanStr2 : cleanStr1;
    
    if (longer.length === 0) return 1.0;
    
    const editDistance = getEditDistance(longer, shorter);
    return (longer.length - editDistance) / longer.length;
}

function getEditDistance(str1, str2) {
    const matrix = [];
    
    for (let i = 0; i <= str2.length; i++) {
        matrix[i] = [i];
    }
    
    for (let j = 0; j <= str1.length; j++) {
        matrix[0][j] = j;
    }
    
    for (let i = 1; i <= str2.length; i++) {
        for (let j = 1; j <= str1.length; j++) {
            if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
            }
        }
    }
    
    return matrix[str2.length][str1.length];
}

function selectMatches(tmdbResults, originalTitle, originalYear, options = {}) {
    if (tmdbResults.length === 0) return options.returnArray ? [] : null;
    
    const {
        returnArray = false,
        preferredType = null,
        minThreshold = 0.7,
        doubanItem = null
    } = options;
    
    let actualPreferredType = preferredType;
    if (!actualPreferredType && doubanItem) {
        const detectedType = detectItemTypeFromContent(doubanItem);
        if (detectedType) {
            actualPreferredType = detectedType;
        } else if (doubanItem.subtype === "movie") {
            actualPreferredType = "movie";
        } else if (doubanItem.subtype === "tv") {
            actualPreferredType = "tv";
        }
    }
    
    if (!returnArray) {
        if (tmdbResults.length === 1) return tmdbResults[0];
        
        let bestMatch = null;
        let bestScore = 0;
        
        for (const result of tmdbResults) {
            let score = calculateMatchScore(result, originalTitle, originalYear);
            
            if (actualPreferredType && result.media_type === actualPreferredType) {
                score += 1.0;
            }
            
            if (score > bestScore) {
                bestScore = score;
                bestMatch = result;
            }
        }
        
        return bestMatch;
    } else {
        const resultsByType = {};
        for (const result of tmdbResults) {
            const mediaType = result.media_type;
            if (!resultsByType[mediaType]) {
                resultsByType[mediaType] = [];
            }
            resultsByType[mediaType].push(result);
        }
        
        const bestMatches = [];
        for (const [mediaType, results] of Object.entries(resultsByType)) {
            const bestMatch = selectMatches(results, originalTitle, originalYear, { preferredType: mediaType });
            if (bestMatch) {
                const score = calculateMatchScore(bestMatch, originalTitle, originalYear);
                if (score >= minThreshold) {
                    bestMatches.push(bestMatch);
                }
            }
        }
        
        bestMatches.sort((a, b) => {
            const scoreA = calculateMatchScore(a, originalTitle, originalYear);
            const scoreB = calculateMatchScore(b, originalTitle, originalYear);
            return scoreB - scoreA;
        });
        
        return bestMatches;
    }
}

function calculateMatchScore(result, originalTitle, originalYear) {
    const tmdbTitle = result.title || result.name || '';
    const originalName = result.original_title || result.original_name || '';
    
    const titleSimilarity = Math.max(
        calculateSimilarity(originalTitle, tmdbTitle),
        calculateSimilarity(originalTitle, originalName)
    );
    
    let exactMatchBonus = 0;
    if (titleSimilarity >= 0.98) {
        exactMatchBonus = 2.0;
    } else if (titleSimilarity >= 0.9) {
        exactMatchBonus = 1.0;
    }
    
    let yearBonus = 0;
    if (originalYear) {
        const tmdbYear = (result.release_date || result.first_air_date || '').substring(0, 4);
        if (tmdbYear && Math.abs(parseInt(originalYear) - parseInt(tmdbYear)) <= 1) {
            yearBonus = 0.2;
        }
    }
    
    const popularityBonus = Math.min(result.popularity / 10000, 0.05);
    const ratingBonus = Math.min(result.vote_average / 200, 0.025);
    
    return titleSimilarity + exactMatchBonus + yearBonus + popularityBonus + ratingBonus;
}

function generateGenreTitleFromTmdb(tmdbItem, doubanItem) {
    let genres = doubanItem.genres;
    
    if (!genres || (Array.isArray(genres) && genres.length === 0)) {
        const textToExtract = [
            doubanItem.card_subtitle,
            doubanItem.description,
            doubanItem.abstract
        ].filter(Boolean).join(' ');
        
        if (textToExtract) {
            const extractedGenres = extractGenresFromText(textToExtract);
            if (extractedGenres.length > 0) {
                genres = extractedGenres;
            }
        }
    }
    
    if (!genres || (Array.isArray(genres) && genres.length === 0)) {
        if (tmdbItem.genre_ids && tmdbItem.genre_ids.length > 0) {
            genres = tmdbItem.genre_ids.map(id => mapTmdbGenreIdToChineseName(id)).filter(Boolean);
        }
    }
    
    if (!genres || (Array.isArray(genres) && genres.length === 0)) {
        return "";
    }
    
    return getDoubanGenreTitles(genres, determineItemType(doubanItem, doubanItem.type));
}

function mapTmdbGenreIdToChineseName(genreId) {
    const genreMap = {
        28: "\u52a8\u4f5c", 12: "\u5192\u9669", 16: "\u52a8\u753b", 35: "\u559c\u5267", 80: "\u72af\u7f6a",
        99: "\u7eaa\u5f55\u7247", 18: "\u5267\u60c5", 10751: "\u5bb6\u5ead", 14: "\u5947\u5e7b", 36: "\u5386\u53f2",
        27: "\u6050\u6016", 10402: "\u97f3\u4e50", 9648: "\u60ac\u7591", 10749: "\u7231\u60c5", 878: "\u79d1\u5e7b",
        10770: "\u7535\u89c6\u7535\u5f71", 53: "\u60ca\u609a", 10752: "\u6218\u4e89", 37: "\u897f\u90e8",
        
        10759: "\u52a8\u4f5c\u5192\u9669", 16: "\u52a8\u753b", 35: "\u559c\u5267", 80: "\u72af\u7f6a", 99: "\u7eaa\u5f55\u7247",
        18: "\u5267\u60c5", 10751: "\u5bb6\u5ead", 10762: "\u513f\u7ae5", 9648: "\u60ac\u7591", 10763: "\u65b0\u95fb",
        10764: "\u771f\u4eba\u79c0", 10765: "\u79d1\u5e7b\u5947\u5e7b", 10766: "\u80a5\u7682\u5267", 10767: "\u8131\u53e3\u79c0",
        10768: "\u6218\u4e89\u653f\u6cbb", 37: "\u897f\u90e8"
    };
    
    return genreMap[genreId] || null;
}

async function fetchImdbItemsForDouban(scItems) {
    const promises = scItems.map(async (scItem) => {
        const titleNormalizationRules = [
            { pattern: /^\u771f\u7684\u662f\u5f88\u4e0d\u9519\u7684\u4eba/, replacement: '\uc9c4\uc9dc \uad1c\ucc2e\uc740 \uc0ac\ub78c', forceFirstResult: true },
            { pattern: /^\u6700\u540e\u590d\u6d3b\u6218/, replacement: '\u30d5\u30a1\u30a4\u30ca\u30eb\u30c9\u30e9\u30d5\u30c8', forceFirstResult: true },
            { pattern: /^\u66b4\u98ce\u5708/, replacement: '\ubd81\uadf9\uc131', forceFirstResult: true },
            { pattern: /^\u5510\u671d\u8be1\u4e8b\u5f55\u4e4b\u957f\u5b89/, replacement: '\u5510\u671d\u8be1\u4e8b\u5f55', forceFirstResult: true },
            { pattern: /^\u51e1\u4eba\u4fee\u4ed9\u4f20[\uff1a:]\u91cd\u8fd4\u5929\u5357/, replacement: '\u51e1\u4eba\u4fee\u4ed9\u4f20', forceFirstResult: true },
            { pattern: /^\u7f57\u5c0f\u9ed1\u6218\u8bb0/, replacement: '\u7f57\u5c0f\u9ed1\u6218\u8bb0', forceMovieType: true },
            { pattern: /^\u7d2b\u5ddd \u7b2c\u4e8c\u5b63/, replacement: '\u7d2b\u5ddd', forceFirstResult: true },
            { pattern: /^\u661f\u671f\u4e09 \u7b2c\u4e8c\u5b63/, replacement: 'Wednesday', forceFirstResult: true, forceTypeFilter: 'tv' },
            { pattern: /^\u66b4\u98ce\u5708/, replacement: '\ubd81\uadf9\uc131', forceFirstResult: true },
            { pattern: /^\u6d41\u4eba \u7b2c\u4e94\u5b63/, replacement: 'Slow Horses', forceFirstResult: true },
            { pattern: / \u7b2c[^\u5b63]*\u5b63/, replacement: '' },
            { pattern: /^\u5343\u4e0e\u5343\u5bfb/, replacement: '\u5343\u4e0e\u5343\u5bfb', forceMovieType: true },
            { pattern: /^\u54c8\u5c14\u7684\u79fb\u52a8\u57ce\u5821/, replacement: '\u54c8\u5c14\u7684\u79fb\u52a8\u57ce\u5821', forceMovieType: true },
            { pattern: /^\u9b3c\u706d\u4e4b\u5203/, replacement: '\u9b3c\u706d\u4e4b\u5203', forceMovieType: true },
            { pattern: /^\u5929\u6c14\u4e4b\u5b50/, replacement: '\u5929\u6c14\u4e4b\u5b50', forceMovieType: true },
            { pattern: /^\u5742\u672c\u65e5\u5e38 Part 2/, replacement: '\u5742\u672c\u65e5\u5e38' },
            { pattern: /^\u6ca7\u5143\u56fe2 \u5143\u521d\u5c71\u756a\u5916\u7bc7/, replacement: '\u6ca7\u5143\u56fe' },
            { pattern: /^\u82cd\u5170\u8bc02 \u5f71\u4e09\u754c\u7bc7/, replacement: '\u82cd\u5170\u8bc0 \u52a8\u753b\u7248', forceFirstResult: true },
            { pattern: /^\u77f3\u7eaa\u5143 \u7b2c\u56db\u5b63 Part 2/, replacement: '\u77f3\u7eaa\u5143' },
            { pattern: /^\u53cc\u4eba\u72ec\u81ea\u9732\u8425/, replacement: 'ふたりソロキャンプ' },
            { pattern: /^\u5730\u7f1a\u5c11\u5e74\u82b1\u5b50\u541b \u7b2c\u4e8c\u5b63 \u540e\u7bc7/, replacement: '\u5730\u7f1a\u5c11\u5e74\u82b1\u5b50\u541b' },
            { pattern: /^\u66f4\u8863\u4eba\u5076\u5760\u5165\u7231\u6cb3 \u7b2c\u4e8c\u5b63/, replacement: '\u66f4\u8863\u4eba\u5076\u5760\u5165\u7231\u6cb3', forceFirstResult: true },
            { pattern: /^\u574f\u5973\u5b69/, replacement: '\u4e0d\u826f\u5c11\u5973' },
            { pattern: /^\u82b1\u513f\u4e0e\u5c11\u5e74·\u540c\u5fc3\u5b63/, replacement: '\u82b1\u513f\u4e0e\u5c11\u5e74·\u540c\u5fc3\u5b63', forceFirstResult: true },
            { pattern: /^\u5954\u8dd1\u5427 \u7b2c\u4e5d\u5b63/, replacement: '\u5954\u8dd1\u5427!\u5144\u5f1f', forceFirstResult: true },
            { pattern: /^\u4e58\u98ce2025/, replacement: '\u4e58\u98ce2025', forceFirstResult: true },
            { pattern: /^\u4f60\u7684\u7231$/, replacement: '\ub108\uc758\uc5f0\uc560', forceFirstResult: true },
            { pattern: /^\u771f\u7684\u662f\u5f88\u4e0d\u9519\u7684\u4eba/, replacement: '\uc9c4\uc9dc \uad1c\ucc2e\uc740 \uc0ac\ub78c', forceFirstResult: true },
            { pattern: /^\u6700\u540e\u590d\u6d3b\u6218/, replacement: '\u30d5\u30a1\u30a4\u30ca\u30eb\u30c9\u30e9\u30d5\u30c8', forceFirstResult: true },
            { pattern: /^\u66b4\u98ce\u5708/, replacement: '\ubd81\uadf9\uc131', forceFirstResult: true },
            { pattern: / \u7b2c[^\u5b63]*\u5b63/, replacement: '' },
            { pattern: /^(\u6b4c\u624b|\u5168\u5458\u52a0\u901f\u4e2d)\d{4}$/, replacement: (match, showName) => {
                const showMap = {
                    '\u6b4c\u624b': '\u6211\u662f\u6b4c\u624b',
                    '\u5168\u5458\u52a0\u901f\u4e2d': '\u5168\u5458\u52a0\u901f\u4e2d'
                };
                return showMap[showName] || showName;
            }},
            { pattern: /^\u5954\u8dd1\u5427(?! ?\u5144\u5f1f)/, replacement: '\u5954\u8dd1\u5427\u5144\u5f1f' },
            { pattern: /^(.+?[^0-9])\d+$/, replacement: (match, baseName) => {
                if (/^(\u6b4c\u624b|\u5168\u5458\u52a0\u901f\u4e2d)\d{4}$/.test(match)) {
                    return match;
                }
                return baseName;
            }},
            { pattern: /^([^·]+)·(.*)$/, replacement: (match, part1, part2) => {
                if (part2 && !/^(\u6162\u4eab\u5b63|\u7b2c.*\u5b63)/.test(part2)) {
                    return part1 + part2;
                }
                return part1;
            }}
        ];
        
        let title = scItem.title;
        let forceFirstResult = false;
        let forceMovieType = false;
        let forceTypeFilter = null;
        
        for (const rule of titleNormalizationRules) {
            if (rule.pattern.test(title)) {
                if (typeof rule.replacement === 'function') {
                    title = title.replace(rule.pattern, rule.replacement);
                } else {
                    title = title.replace(rule.pattern, rule.replacement);
                }
                if (rule.forceFirstResult) {
                    forceFirstResult = true;
                }
                if (rule.forceMovieType) {
                    forceMovieType = true;
                }
                if (rule.forceTypeFilter) {
                    forceTypeFilter = rule.forceTypeFilter;
                }
                break;
            }
        }
        
        let year = null;
        if (scItem.year) {
            year = String(scItem.year);
        } else if (scItem.card_subtitle) {
            const yearMatch = scItem.card_subtitle.match(/(\d{4})/);
            if (yearMatch) year = yearMatch[1];
        }

        let searchType = scItem.type;
        
        if (forceMovieType) {
            searchType = "movie";
        } else {
            let detectedType = detectItemTypeFromContent(scItem);
            
            if (scItem.type === "multi") {
                if (detectedType) {
                    searchType = detectedType;
                } else if (scItem.subtype && (scItem.subtype === "movie" || scItem.subtype === "tv")) {
                    searchType = scItem.subtype;
                } else {
                    searchType = "multi";
                }
            }
        }
        
        const tmdbDatas = await fetchTmdbDataForDouban(title, searchType);

        if (tmdbDatas.length !== 0) {
            
            if (scItem.isMultiTypeTitle) {
                const allMatches = selectMatches(tmdbDatas, title, year, { 
                    returnArray: true, 
                    doubanItem: scItem
                });

                return allMatches
                    .filter(match => {
                        return match.poster_path &&
                               match.id &&
                               (match.title || match.name) &&
                               (match.title || match.name).trim().length > 0;
                    })
                    .map(match => ({
                        id: match.id,
                        type: "tmdb",
                        title: match.title ?? match.name,
                        description: match.overview,
                        releaseDate: match.release_date ?? match.first_air_date,
                        backdropPath: match.backdrop_path,
                        posterPath: match.poster_path,
                        rating: match.vote_average,
                        mediaType: match.media_type,
                        genreTitle: generateGenreTitleFromTmdb(match, scItem),
                        originalDoubanTitle: scItem.title,
                        originalDoubanYear: scItem.year,
                        originalDoubanId: scItem.id
                    }));
            } else {
                let bestMatch;
                
                if (forceFirstResult && tmdbDatas.length > 0) {
                    if (forceTypeFilter) {
                        bestMatch = tmdbDatas.find(item => item.media_type === forceTypeFilter) || tmdbDatas[0];
                    } else {
                        bestMatch = tmdbDatas[0];
                    }
                } else {
                    bestMatch = selectMatches(tmdbDatas, title, year, { 
                        doubanItem: scItem
                    });
                }
                
                if (bestMatch && bestMatch.poster_path && bestMatch.id && 
                    (bestMatch.title || bestMatch.name) && 
                    (bestMatch.title || bestMatch.name).trim().length > 0) {
                    return {
                        id: bestMatch.id,
                        type: "tmdb",
                        title: bestMatch.title ?? bestMatch.name,
                        description: bestMatch.overview,
                        releaseDate: bestMatch.release_date ?? bestMatch.first_air_date,
                        backdropPath: bestMatch.backdrop_path,
                        posterPath: bestMatch.poster_path,
                        rating: bestMatch.vote_average,
                        mediaType: bestMatch.media_type,
                        genreTitle: generateGenreTitleFromTmdb(bestMatch, scItem),
                        originalDoubanTitle: scItem.title,
                        originalDoubanYear: scItem.year,
                        originalDoubanId: scItem.id
                    };
                }
            }
        }
        return null;
    });

    const results = await Promise.all(promises);
    
    const allItems = [];
    for (const result of results) {
        if (result) {
            if (Array.isArray(result)) {
                allItems.push(...result);
            } else {
                allItems.push(result);
            }
        }
    }
    
    return filterBlockedItemsEnhanced(allItems);
}

async function loadEnhancedDoubanList(params = {}) {
    const url = params.url;
    
    if (url.includes("douban.com/doulist/")) {
        return loadEnhancedDefaultList(params);
    } 
    else if (url.includes("douban.com/subject_collection/")) {
        return loadEnhancedSubjectCollection(params);
    } 
    else if (url.includes("m.douban.com/doulist/")) {
        const desktopUrl = url.replace("m.douban.com", "www.douban.com");
        return loadEnhancedDefaultList({ ...params, url: desktopUrl });
    }
    else if (url.includes("douban.com/doubanapp/dispatch")) {
        const parsedUrl = parseDoubanAppDispatchUrl(url);
        return loadEnhancedDoubanList({ ...params, url: parsedUrl });
    }
    
    return [];
}

async function loadEnhancedDefaultList(params = {}) {
    const url = params.url;
    const listId = url.match(/doulist\/(\d+)/)?.[1];
    const page = params.page || 1;
    const count = 25;
    const start = (page - 1) * count;
    const pageUrl = `https://www.douban.com/doulist/${listId}/?start=${start}&sort=seq&playable=0&sub_type=`;

    const response = await Widget.http.get(pageUrl, {
        headers: {
            Referer: `https://movie.douban.com/explore`,
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        },
    });

    const docId = Widget.dom.parse(response.data);
    const videoElementIds = Widget.dom.select(docId, ".doulist-item .title a");

    let doubanItems = [];
    for (const itemId of videoElementIds) {
        const link = await Widget.dom.attr(itemId, "href");
        const text = await Widget.dom.text(itemId);
        const chineseTitle = text.trim().split(' ')[0];
        if (chineseTitle) {
            doubanItems.push({ title: chineseTitle, type: "multi" });
        }
    }

    return await fetchImdbItemsForDouban(doubanItems);
}

async function loadEnhancedItemsFromApi(params = {}) {
    const url = params.url;
    const listId = params.url.match(/subject_collection\/(\w+)/)?.[1];
    const response = await Widget.http.get(url, {
        headers: {
            Referer: `https://m.douban.com/subject_collection/${listId}/`,
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        },
    });

    const scItems = response.data.subject_collection_items;
    return await fetchImdbItemsForDouban(scItems);
}

async function loadEnhancedSubjectCollection(params = {}) {
    const listId = params.url.match(/subject_collection\/(\w+)/)?.[1];
    const page = params.page || 1;
    const count = 20;
    const start = (page - 1) * count;
    
    let pageUrl = `https://m.douban.com/rexxar/api/v2/subject_collection/${listId}/items?start=${start}&count=${count}&updated_at&items_only=1&type_tag&for_mobile=1`;
    if (params.type) {
        pageUrl += `&type=${params.type}`;
    }
    
    return await loadEnhancedItemsFromApi({ ...params, url: pageUrl });
}
