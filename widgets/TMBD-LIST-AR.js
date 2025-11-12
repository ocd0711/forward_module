WidgetMetadata = {
  id: "forward.combined.media.lists.ar",
  title: "القوائم السينمائية والتلفزيونية",
  description: "قوائم الأفلام والمسلسلات والأنمي",
  author: "𝓑𝓾𝓽𝓽𝓮𝓻𝓯𝓵𝔂",
  site: "https://for-ward.vercel.app",
  version: "1.5.0",
  requiredVersion: "0.0.2",
  detailCacheDuration: 60,
  modules: [
    // -------------TMDB模块-------------
    // --- 热门模块 ---
    {
      title: "TMDB المسلسلات الشائعة",
      description: "المسلسلات التلفزيونية الشائعة اليوم",
      requiresWebView: false,
      functionName: "loadTodayHotTV",
      cacheDuration: 3600,
      params: [
        { name: "language", title: "اللغة", type: "language", value: "ar" },
        { 
          name: "sort_by", 
          title: "المنطقة", 
          type: "enumeration", 
          enumOptions: [
            { title: "جميع المناطق", value: "" },
            { title: "الصين", value: "CN" },
            { title: "الولايات المتحدة", value: "US" },
            { title: "كوريا", value: "KR" },
            { title: "اليابان", value: "JP" },
            { title: "المملكة المتحدة", value: "GB" },
            { title: "تايلاند", value: "TH" },
            { title: "إيطاليا", value: "IT" },
            { title: "ألمانيا", value: "DE" },
            { title: "إسبانيا", value: "ES" },
            { title: "روسيا", value: "RU" },
            { title: "السويد", value: "SE" },
            { title: "البرازيل", value: "BR" },
            { title: "الدنمارك", value: "DK" },
            { title: "الهند", value: "IN" },
            { title: "كندا", value: "CA" },
            { title: "أيرلندا", value: "IE" },
            { title: "أستراليا", value: "AU" },
            { title: "السعودية", value: "SA" }
          ], 
          value: "" 
        },
        { name: "page", title: "رقم الصفحة", type: "page" }
      ]
    },
    {
      title: "TMDB الأفلام الشائعة",
      description: "الأفلام الشائعة اليوم",
      requiresWebView: false,
      functionName: "loadTodayHotMovies",
      cacheDuration: 3600,
      params: [
        { name: "language", title: "اللغة", type: "language", value: "ar" },
        { 
          name: "sort_by", 
          title: "المنطقة", 
          type: "enumeration", 
          enumOptions: [
            { title: "جميع المناطق", value: "" },
            { title: "الصين", value: "CN" },
            { title: "الولايات المتحدة", value: "US" },
            { title: "كوريا", value: "KR" },
            { title: "اليابان", value: "JP" },
            { title: "المملكة المتحدة", value: "GB" },
            { title: "هونغ كونغ", value: "HK" },
            { title: "تايوان", value: "TW" },
            { title: "تايلاند", value: "TH" },
            { title: "إيطاليا", value: "IT" },
            { title: "ألمانيا", value: "DE" },
            { title: "إسبانيا", value: "ES" },
            { title: "روسيا", value: "RU" },
            { title: "السويد", value: "SE" },
            { title: "البرازيل", value: "BR" },
            { title: "الدنمارك", value: "DK" },
            { title: "الهند", value: "IN" },
            { title: "كندا", value: "CA" },
            { title: "أيرلندا", value: "IE" },
            { title: "أستراليا", value: "AU" },
            { title: "السعودية", value: "SA" }
          ], 
          value: "" 
        },
        { name: "page", title: "رقم الصفحة", type: "page" }
      ]
    },
    // --- 常规发现模块 ---
    {
      title: "TMDB المحتويات الأعلى تقييماً",
      description: "أفلام أو مسلسلات عالية التقييم (مرتبة حسب تقييم المستخدمين)",
      requiresWebView: false,
      functionName: "tmdbTopRated",
      cacheDuration: 3600,
      params: [
        { 
          name: "type", 
          title: "🎭 النوع", 
          type: "enumeration", 
          enumOptions: [
            { title: "أفلام", value: "movie" },
            { title: "مسلسلات", value: "tv" }
          ], 
          value: "movie" 
        },
        { name: "language", title: "اللغة", type: "language", value: "ar" },
        { name: "page", title: "رقم الصفحة", type: "page" }
      ]
    },
    // --- 播出平台模块 ---
    {
        title: "TMDB حسب منصة البث",
        description: "تصفية محتوى المسلسلات حسب منصة البث ونوع المحتوى",
        requiresWebView: false,
        functionName: "tmdbDiscoverByNetwork",
        cacheDuration: 3600,
        params: [
            {
                name: "with_networks",
                title: "منصة البث",
                type: "enumeration",
                description: "اختر منصة لعرض محتوى مسلسلاتها",
                value: "",
                belongTo: {
                  paramName: "air_status",
                  value: ["released","upcoming",""],
                },
          enumOptions: [
            { title: "الكل", value: "" },
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
          title: "🎭 نوع المحتوى",
          type: "enumeration",
          description: "اختر نوع المحتوى للتصفية",
          value: "",
          belongTo: {
            paramName: "air_status",
            value: ["released","upcoming",""],
          },
          enumOptions: [
            { title: "جميع الأنواع", value: "" },
            { title: "جريمة", value: "80" },
            { title: "أنمي", value: "16" },
            { title: "كوميديا", value: "35" },
            { title: "دراما", value: "18" },
            { title: "عائلي", value: "10751" },
            { title: "غموض", value: "9648" },
            { title: "واقعي", value: "10764" },
            { title: "برامج حواري", value: "10767" },
            { title: "وثائقي", value: "99" },
            { title: "حركة ومغامرة", value: "10759" },
            { title: "خيال علمي وفانتازيا", value: "10765" },
            { title: "حرب وسياسة", value: "10768" }
          ]
        },
        {
          name: "air_status",
          title: "حالة العرض",
          type: "enumeration",
          description: "افتراضي: تم العرض",
          value: "released",
          enumOptions: [
            { title: "تم العرض", value: "released" },
            { title: "قريباً", value: "upcoming" },
            { title: "الكل", value: "" }
          ]
        },
        {
          name: "sort_by",
          title: "🔢 طريقة الترتيب",
          type: "enumeration",
          description: "اختر طريقة ترتيب المحتوى, افتراضي: تاريخ العرض تنازلي",
          value: "first_air_date.desc",
          enumOptions: [
            { title: "تاريخ العرض ↓", value: "first_air_date.desc" },
            { title: "تاريخ العرض ↑", value: "first_air_date.asc" },
            { title: "الأكثر شيوعاً", value: "popularity.desc" },
            { title: "الأعلى تقييماً", value: "vote_average.desc" },
            { title: "الأكثر تصويتاً", value: "vote_count.desc" }
          ]
        },
        { name: "page", title: "رقم الصفحة", type: "page" },
        { name: "language", title: "اللغة", type: "language", value: "ar" }
      ]
    },
    // --- 出品公司模块 ---
    {
      title: "TMDB حسب شركة الإنتاج",
      functionName: "tmdbCompanies",
      cacheDuration: 3600,
      params: [
        {
          name: "with_companies",
          title: "شركة الإنتاج",
          type: "enumeration",
          value: "",
          description: "اختر شركة لعرض محتوى مسلسلاتها",
          belongTo: {
            paramName: "air_status",
            value: ["released","upcoming",""],
          },
          enumOptions: [
            { title: "الكل", value: "" },
            { title: "Disney", value: "2" },
            { title: "Warner Bros", value: "174" },
            { title: "Columbia", value: "5" },
            { title: "Sony", value: "34" },
            { title: "Universal", value: "33" },
            { title: "Paramount", value: "4" },
            { title: "20th Century", value: "25" },
            { title: "Marvel", value: "420" },
            { title: "Toho", value: "882" },
            { title: "China Film Group", value: "14714" },
            { title: "BBC", value: "3324" },
            { title: "A24", value: "41077" },
            { title: "Blumhouse", value: "3172" },
            { title: "Working Title Films", value: "10163" }
          ]
        },
        {
          name: "with_genres",
          title: "🎭 نوع المحتوى",
          type: "enumeration",
          description: "اختر نوع المحتوى للتصفية",
          value: "",
          belongTo: {
            paramName: "air_status",
            value: ["released","upcoming",""],
          },
          enumOptions: [
            { title: "جميع الأنواع", value: "" },
            { title: "مغامرة", value: "12" },
            { title: "دراما", value: "18" },
            { title: "حركة", value: "28" },
            { title: "أنمي", value: "16" },
            { title: "تاريخي", value: "36" },
            { title: "كوميديا", value: "35" },
            { title: "فانتازيا", value: "14" },
            { title: "عائلي", value: "10751" },
            { title: "رعب", value: "27" },
            { title: "غموض", value: "9648" },
            { title: "إثارة", value: "53" },
            { title: "حرب", value: "10752" },
            { title: "رومانسي", value: "10749" },
            { title: "جريمة", value: "80" },
            { title: "خيال علمي", value: "878" },
            { title: "وثائقي", value: "99" },
            { title: "غربي", value: "37" },
            { title: "موسيقي", value: "10402" },
            { title: "فيلم تلفزيوني", value: "10770" }
          ]
        },
        {
          name: "air_status",
          title: "حالة العرض",
          type: "enumeration",
          description: "افتراضي: تم العرض",
          value: "released",
          enumOptions: [
            { title: "تم العرض", value: "released" },
            { title: "قريباً", value: "upcoming" },
            { title: "الكل", value: "" }
          ]
        },
        {
          name: "sort_by",
          title: "🔢 طريقة الترتيب",
          type: "enumeration",
          description: "اختر طريقة ترتيب المحتوى, افتراضي: تاريخ العرض تنازلي",
          value: "primary_release_date.desc",
          enumOptions: [
            { title: "تاريخ العرض ↓", value: "primary_release_date.desc" },
            { title: "تاريخ العرض ↑", value: "primary_release_date.asc" },
            { title: "الأكثر شيوعاً", value: "popularity.desc" },
            { title: "الأعلى تقييماً", value: "vote_average.desc" },
            { title: "الأكثر تصويتاً", value: "vote_count.desc" }
          ]
        },
        { name: "page", title: "رقم الصفحة", type: "page" },
        { name: "language", title: "اللغة", type: "language", value: "ar" }
      ]
    },
    // =============屏蔽管理模块=============
    {
      title: "TMDB البحث والحجب",
      description: "حجب المحتوى حسب اسم الفيلم أو النوع",
      requiresWebView: false,
      functionName: "searchAndBlock",
      cacheDuration: 0,
      params: [
        {
          name: "block_type",
          title: "🎯 نوع الحجب",
          type: "enumeration",
          description: "اختر طريقة الحجب",
          value: "by_name",
          enumOptions: [
            { title: "حسب اسم الفيلم", value: "by_name" },
            { title: "حسب نوع المحتوى", value: "by_genre" },
            { title: "إدخال ID يدوياً", value: "manual_id" }
          ]
        },
        {
          name: "action",
          title: "🎮 وضع التشغيل",
          type: "enumeration",
          description: "اختر نوع العملية",
          value: "search_only",
          enumOptions: [
            { title: "بحث فقط", value: "search_only" },
            { title: "بحث وحجب", value: "search_and_block" }
          ]
        },
        {
          name: "query",
          title: "🔍 اسم الفيلم",
          type: "input",
          description: "أدخل اسم الفيلم أو المسلسل للبحث (وضع الحجب بالاسم)",
          value: "",
          placeholder: "مثال: Attack on Titan, South Park"
        },
        {
          name: "genre_name",
          title: "🏷️ اسم النوع",
          type: "input",
          description: "أدخل نوع المحتوى الذي تريد حجبه (وضع الحجب بالنوع)",
          value: "",
          placeholder: "مثال: واقعي, ترفيه, وثائقي, حركة, رومانسي"
        },
        {
          name: "language",
          title: "🌐 لغة البحث",
          type: "enumeration",
          description: "اختر لغة البحث (وضع الحجب بالاسم)",
          value: "ar",
          enumOptions: [
            { title: "العربية", value: "ar" },
            { title: "English", value: "en-US" },
            { title: "لغات أخرى", value: "en" }
          ]
        },
        {
          name: "tmdb_id",
          title: "🆔 TMDB ID",
          type: "input",
          description: "أدخل TMDB ID للحجب (وضع الإدخال اليدوي)",
          value: "",
          placeholder: "مثال: 550, 1399"
        },
        {
          name: "media_type",
          title: "🎭 نوع الوسائط",
          type: "enumeration",
          description: "اختر نوع الوسائط (وضع الإدخال اليدوي)",
          value: "tv",
          enumOptions: [
            { title: "مسلسلات", value: "tv" },
            { title: "أفلام", value: "movie" }
          ]
        }
      ]
    },
    {
      title: "TMDB إدارة المحتويات المحجوبة",
      description: "عرض وإدارة المحتويات والأنواع المحجوبة",
      requiresWebView: false,
      functionName: "manageBlockedItems",
      cacheDuration: 0,
      params: [
        {
          name: "manage_type",
          title: "📂 نوع الإدارة",
          type: "enumeration",
          description: "اختر نوع المحجوبات للإدارة",
          value: "items",
          enumOptions: [
            { title: "المحتويات المحجوبة", value: "items" },
            { title: "الأنواع المحجوبة", value: "genres" }
          ]
        },
        {
          name: "action",
          title: "📋 العملية",
          type: "enumeration",
          description: "اختر العملية المطلوبة",
          value: "view",
          enumOptions: [
            { title: "عرض القائمة", value: "view" },
            { title: "تفريغ القائمة", value: "clear" },
            { title: "إلغاء الحجب", value: "unblock" },
            { title: "تصدير الإعدادات", value: "export" },
            { title: "استيراد الإعدادات", value: "import" }
          ]
        },
        {
          name: "unblock_id",
          title: "🔓 إلغاء حجب ID",
          type: "input",
          description: "أدخل ID لإلغاء الحجب",
          value: "",
          placeholder: "محتوى ID مثال: 2190 | نوع ID مثال: 10764",
          belongTo: { paramName: "action", value: ["unblock"] }
        },
        {
          name: "unblock_media_type",
          title: "🎭 نوع الوسائط",
          type: "enumeration",
          description: "اختر نوع الوسائط (للمحتويات المحجوبة فقط)",
          value: "tv",
          enumOptions: [
            { title: "مسلسلات", value: "tv" },
            { title: "أفلام", value: "movie" }
          ],
          belongTo: { paramName: "action", value: ["unblock"], paramName2: "manage_type", value2: ["items"] }
        },
        {
          name: "import_data",
          title: "📥 استيراد البيانات",
          type: "input",
          description: "الصق قائمة IDs للحجب، يدعم تنسيقات متعددة",
          value: "",
          placeholder: "التنسيقات المدعومة: 550,1399 أو '550','1399' أو \"550\",\"1399\"",
          belongTo: { paramName: "action", value: ["import"] }
        }
      ]
    }
  ]
};

// ===============屏蔽配置===============
const GENRE_STORAGE_KEY = "forward_blocked_genres";
const STORAGE_KEY = "forward_blocked_items";

const TMDB_GENRE_MAPPING = {
    "واقعي": 10764,
    "برامج حواري": 10767, 
    "ترفيه": 10764,
    "وثائقي": 99,
    "حركة ومغامرة": 10759,
    "أنمي": 16,
    "كوميديا": 35,
    "جريمة": 80,
    "دراما": 18,
    "عائلي": 10751,
    "أطفال": 10762,
    "غموض": 9648,
    "أخبار": 10763,
    "خيال علمي وفانتازيا": 10765,
    "مسلسلات": 10766,
    "حرب وسياسة": 10768,
    "غربي": 37,
    "حركة": 28,
    "مغامرة": 12,
    "تاريخي": 36,
    "فانتازيا": 14,
    "رعب": 27,
    "موسيقي": 10402,
    "رومانسي": 10749,
    "خيال علمي": 878,
    "فيلم تلفزيوني": 10770,
    "إثارة": 53,
    "حرب": 10752
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
            description: description || `حجب جميع محتويات نوع "${genreName}"`,
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
        Widget.tmdb.get('/genre/movie/list', { params: { language: 'ar' } }),
        Widget.tmdb.get('/genre/tv/list', { params: { language: 'ar' } })
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
        .map(id => genres[id]?.trim() || `نوع غير معروف(${id})`)
        .filter(Boolean)
        .join('•');
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
        const response = await Widget.http.get("https://for-ward.vercel.app/data/TMDB_Trending.ar.json", {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 Safari/605.1.15'
            }
        });
        return response.data;
    } catch (error) {
        try {
            const fallbackResponse = await Widget.http.get("https://for-ward.vercel.app/data/TMDB_Trending.ar.json");
            return fallbackResponse.data;
        } catch (fallbackError) {
            throw fallbackError;
        }
    }
}

async function loadTodayHotTV(params) {
  const page = parseInt(params.page) || 1;
  const region = params.sort_by || '';         
  const sortBy = 'popularity.desc';           
  const isPopularitySort = (s) => s === 'popularity.desc';
  const isDomesticCN = (r) => r === 'CN';

  if (region) {
    const std = isDomesticCN(region) && isPopularitySort(sortBy)
      ? DOMESTIC_PLATFORM_STANDARDS.tv
      : POPULARITY_QUALITY_STANDARDS.tv;

    const discoverParams = {
      language: params.language || 'ar',
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
    try {
      const data = await loadTmdbTrendingData();
      const allTv = data.today_tv || [];
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
    } catch (e) {
    }
  }

  const std = POPULARITY_QUALITY_STANDARDS.tv;
  const fallbackParams = {
    language: params.language || 'ar',
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

  const isPopularitySort = (s) => s === 'popularity.desc';
  const isDomesticCN = (r) => r === 'CN';

  if (region) {
    const std = isDomesticCN(region) && isPopularitySort(sortBy)
      ? DOMESTIC_PLATFORM_STANDARDS.movie
      : POPULARITY_QUALITY_STANDARDS.movie;

    const discoverParams = {
      language: params.language || 'ar',
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
    try {
      const data = await loadTmdbTrendingData();
      const allMovies = data.today_movies || [];
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
    } catch (e) {
    }
  }

  const std = POPULARITY_QUALITY_STANDARDS.movie;
  const fallbackParams = {
    language: params.language || 'ar',
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
    language: params.language || 'ar',
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
    language: params.language || "ar",
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
        throw new Error("كلمة البحث لا يمكن أن تكون فارغة");
    }

    try {
        const response = await Widget.tmdb.get("/search/multi", {
            params: {
                query: query.trim(),
                language: language || "ar",
                page: 1
            }
        });

        if (!response) {
            throw new Error("TMDB API لم يستجب");
        }

        let results = [];
        if (response.results) {
            results = response.results;
        } else if (response.data && response.data.results) {
            results = response.data.results;
        } else if (Array.isArray(response)) {
            results = response;
        } else {
            throw new Error("تعذر تحليل هيكل استجابة TMDB");
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
        throw new Error("فشل البحث: " + error.message);
    }
}

async function searchAndBlockByGenre(params) {
    const action = params.action || "search_only";
    const genreName = params.genre_name ? params.genre_name.trim() : '';
    
    if (!genreName) {
        return [{
            id: "no_genre_name",
            type: "info",
            title: "⚠ الرجاء إدخال اسم النوع للحجب",
            description: "مثال: واقعي, ترفيه, وثائقي, حركة, رومانسي, إلخ",
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
            title: "❓ لم يتم العثور على نوع مطابق",
            description: `لم يتم العثور على نوع يطابق "${genreName}".\n\nالأنواع المدعومة تشمل:\n${suggestions.join('، ')}`,
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
            title: "ὐd تم العثور على أنواع مطابقة",
            description: `البحث عن "${genreName}" وجد ${matchedGenres.length} نوع مطابق:\n\n${matchedGenres.map(g => `• ${g.name} (ID: ${g.id})`).join('\n')}\n\nاختر وضع "بحث وحجب" لإضافة هذه الأنواع إلى قائمة الحجب.`,
            posterPath: "",
            backdropPath: "",
            rating: 0,
            mediaType: "info"
        });
        
        for (const genre of matchedGenres) {
            const blockedGenres = getBlockedGenres();
            const isBlocked = blockedGenres.some(blocked => blocked.id === genre.id);
            const status = isBlocked ? "Ὢb محجوب" : "✅ يمكن الحجب";
            
            resultItems.push({
                id: `genre_detail_${genre.id}`,
                type: "info", 
                title: `${status} ${genre.name}`,
                description: `TMDB نوع ID: ${genre.id}\n${isBlocked ? 'هذا النوع موجود بالفعل في قائمة الحجب' : 'يمكن حجب جميع محتويات هذا النوع'}`,
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
            
            const status = success ? "✅ تم الحجب" : "Ὢb موجود";
            resultItems.push({
                id: `blocked_genre_${genre.id}`,
                type: "info",
                title: `${status} ${genre.name}`,
                description: `TMDB نوع ID: ${genre.id}\n${success ? 'تمت الإضافة إلى قائمة حجب الأنواع' : 'هذا النوع موجود بالفعل في قائمة الحجب'}`,
                posterPath: "",
                backdropPath: "",
                rating: 0,
                mediaType: "info"
            });
        }
        
        resultItems.unshift({
            id: "genre_block_summary",
            type: "info",
            title: "Ἲf اكتملت عملية حجب الأنواع",
            description: `البحث عن "${genreName}" وجد ${matchedGenres.length} نوع\nتم حجب: ${blockedCount} جديد\nموجود مسبقاً: ${alreadyBlockedCount}\n\nلن تظهر أي محتويات تحتوي على هذه الأنواع في القوائم.`,
            posterPath: "",
            backdropPath: "",
            rating: 0,
            mediaType: "info"
        });
    }
    
    return resultItems;
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
        title: "⚠ الرجاء إدخال TMDB ID",
        description: "أدخل TMDB ID للحجب في مربع الإدخال أعلاه، ثم أعد تشغيل هذه الوحدة.",
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
        title: "❌ تنسيق ID غير صالح",
        description: "يجب أن يكون TMDB ID أرقاماً فقط، مثال: 550، 1399",
        posterPath: "",
        backdropPath: "",
        rating: 0,
        mediaType: "error"
      }];
    }

    try {
      const endpoint = mediaType === "movie" ? "/movie/" + tmdbId : "/tv/" + tmdbId;
      
      const response = await Widget.tmdb.get(endpoint, {
        params: { language: "ar" }
      });

      let item = null;
      if (response && response.data) {
        item = response.data;
      } else if (response && (response.title || response.name)) {
        item = response;
      } else {
        throw new Error("تعذر تحليل هيكل استجابة التفاصيل");
      }

      const title = item.title || item.name;
      
      if (!title) {
        return [{
          id: "not_found",
          type: "error",
          title: "❌ المحتوى غير موجود",
          description: "لم يتم العثور على " + (mediaType === "movie" ? "فيلم" : "مسلسل") + " بالـ ID " + tmdbId,
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
      const mediaTypeText = mediaType === "movie" ? "فيلم" : "مسلسل";
      const ratingText = item.vote_average ? " ⭐" + item.vote_average.toFixed(1) : "";
      
      return [{
        id: "manual_block_result_" + tmdbId,
        type: "info",
        title: success ? "✅ تم الحجب بنجاح" : "ℹ️ موجود مسبقاً",
        description: success ? 
          mediaTypeText + " \"" + title + "\"" + ratingText + " تمت إضافته إلى القائمة السوداء" : 
          mediaTypeText + " \"" + title + "\"" + ratingText + " موجود بالفعل في القائمة السوداء",
        posterPath: item.poster_path ? "https://image.tmdb.org/t/p/w500" + item.poster_path : "",
        backdropPath: "",
        rating: item.vote_average || 0,
        mediaType: mediaType
      }];

    } catch (error) {
      return [{
        id: "manual_block_error",
        type: "error", 
        title: "❌ فشل الحجب",
        description: "رسالة الخطأ: " + error.message,
        posterPath: "",
        backdropPath: "",
        rating: 0,
        mediaType: "error"
      }];
    }
  } else {
    const query = params.query ? params.query.trim() : '';
    const language = params.language || "ar";
    
    if (!query) {
      return [{
        id: "no_query",
        type: "info",
        title: "⚠ الرجاء إدخال كلمة البحث",
        description: "أدخل اسم الفيلم أو المسلسل للبحث في مربع الإدخال أعلاه، ثم أعد تشغيل هذه الوحدة.",
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
          title: "ὐd لم يتم العثور على نتائج مطابقة",
          description: "لم يتم العثور على أفلام أو مسلسلات تتعلق بـ \"" + query + "\"، يرجى تجربة كلمات بحث أخرى.",
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
          const mediaTypeText = item.media_type === "movie" ? "فيلم" : "مسلسل";
          const yearText = item.year ? " (" + item.year + ")" : "";
          const ratingText = item.vote_average ? " ⭐" + item.vote_average.toFixed(1) : "";
          const statusText = isBlocked ? " Ὢb محجوب" : "";
          
          resultItems.push({
            id: "search_" + item.id + "_" + item.media_type,
            type: "info",
            title: item.title + yearText + statusText,
            description: mediaTypeText + ratingText + " (TMDB ID: " + item.id + ") | " + (item.overview || "لا يوجد وصف"),
            posterPath: item.poster_path ? "https://image.tmdb.org/t/p/w500" + item.poster_path : "",
            backdropPath: "",
            rating: item.vote_average || 0,
            mediaType: item.media_type
          });
        }
        
        resultItems.unshift({
          id: "search_summary",
          type: "info",
          title: "ὐd نتائج البحث",
          description: "البحث عن \"" + query + "\" وجد " + searchResults.length + " نتيجة\n\n" +
                       "لحجب هذه المحتويات، اختر وضع \"بحث وحجب\".",
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
          const mediaTypeText = item.media_type === "movie" ? "فيلم" : "مسلسل";
          const yearText = item.year ? " (" + item.year + ")" : "";
          const ratingText = item.vote_average ? " ⭐" + item.vote_average.toFixed(1) : "";
          
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
          
          const status = success ? "✅ تم الحجب" : "Ὢb موجود";
          
          resultItems.push({
            id: "blocked_" + item.id + "_" + item.media_type,
            type: "info",
            title: status + " " + item.title + yearText,
            description: mediaTypeText + ratingText + " (TMDB ID: " + item.id + ") | " + (item.overview || "لا يوجد وصف"),
            posterPath: item.poster_path ? "https://image.tmdb.org/t/p/w500" + item.poster_path : "",
            backdropPath: "",
            rating: item.vote_average || 0,
            mediaType: item.media_type
          });
        }
        
        resultItems.unshift({
          id: "block_summary",
          type: "info",
          title: "Ἲf اكتملت عملية الحجب",
          description: "البحث عن \"" + query + "\" وجد " + searchResults.length + " نتيجة\n" +
                       "تم حجب: " + blockedCount + " جديد\n" +
                       "موجود مسبقاً: " + alreadyBlockedCount + "\n\n" +
                       "لن تظهر هذه المحتويات في أي قوائم TMDB.",
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
        title: "❌ فشل البحث",
        description: "رسالة الخطأ: " + error.message,
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
          title: "⚠ الرجاء إدخال ID النوع لإلغاء الحجب",
          description: "أدخل ID النوع لإلغاء الحجب في مربع الإدخال أعلاه، ثم أعد التشغيل.",
          posterPath: "",
          backdropPath: "",
          rating: 0,
          mediaType: "info"
        }];
      }
      
      const success = removeBlockedGenre(genreId);
      const genreName = REVERSE_GENRE_MAPPING[genreId] || `نوع ID: ${genreId}`;
      
      return [{
        id: "unblock_genre_result",
        type: "info",
        title: success ? "✅ تم إلغاء الحجب بنجاح" : "❌ فشلت العملية",
        description: success ? 
          `النوع "${genreName}" تمت إزالته من قائمة الحجب، وسيعود للظهور في القوائم.` : 
          `لم يتم العثور على نوع بالـ ID ${genreId}، أو حدث خطأ أثناء إلغاء الحجب.`,
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
          title: "✅ تم تفريغ قائمة حجب الأنواع",
          description: "تمت إزالة جميع الأنواع المحجوبة، وسيعود المحتوى للظهور في القوائم.",
          posterPath: "",
          backdropPath: "",
          rating: 0,
          mediaType: "info"
        }];
      } catch (error) {
        return [{
          id: "clear_genres_error",
          type: "error",
          title: "❌ فشل التفريغ",
          description: "حدث خطأ أثناء تفريغ قائمة حجب الأنواع.",
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
        title: "قائمة حجب الأنواع فارغة",
        description: "لا توجد أنواع محجوبة حالياً. استخدم وظيفة \"TMDB البحث والحجب\" واختر \"حسب نوع المحتوى\" لإضافة أنواع للحجب.",
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
      title: "💡 شرح إلغاء حجب النوع",
      description: "لإلغاء حجب نوع ما، يرجى: 📝 تذكر ID النوع المراد إلغاء حجبه، ⚙️ اختر عملية \"إلغاء الحجب\"، ✏️ أدخل ID النوع المقابل",
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
        title: `🚫 ${genre.name}`,
        description: `نوع ID: ${genre.id} | تم الحجب في: ${blockedDate}\n${genre.description}`,
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
          title: "⚠ الرجاء إدخال ID لإلغاء الحجب",
          description: "أدخل TMDB ID لإلغاء الحجب في مربع الإدخال أعلاه، ثم أعد التشغيل.",
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
          title: "❌ تنسيق ID غير صالح",
          description: "يجب أن يكون TMDB ID أرقاماً فقط، مثال: 2190، 550",
          posterPath: "",
          backdropPath: "",
          rating: 0,
          mediaType: "error"
        }];
      }

      const success = removeBlockedItem(unblockId, mediaType);
      const mediaTypeText = mediaType === "movie" ? "فيلم" : "مسلسل";
      
      return [{
        id: "unblock_result",
        type: "info",
        title: success ? "✅ تم إلغاء الحجب بنجاح" : "❌ فشلت العملية",
        description: success ? 
          mediaTypeText + " ID " + unblockId + " تمت إزالته من القائمة السوداء، وسيعود للظهور في القوائم." : 
          "لم يتم العثور على " + mediaTypeText + " بالـ ID " + unblockId + "، أو حدث خطأ أثناء إلغاء الحجب.",
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
        title: success ? "✅ تم تفريغ القائمة السوداء" : "❌ فشل التفريغ",
        description: success ? "تمت إزالة جميع العناصر المحجوبة، وتم تفريغ تخزين Widget" : "حدث خطأ أثناء تفريغ القائمة السوداء",
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
        title: "📤 تصدير إعدادات الحجب",
        description: `قائمة IDs المحجوبة الحالية (${blockedItems.length}):\n\n${idList || 'لا يوجد'}`,
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
          title: "⚠ الرجاء إدخال بيانات الاستيراد",
          description: "أدخل قائمة TMDB IDs للاستيراد (مفصولة بفواصل) في مربع الإدخال أعلاه، ثم أعد التشغيل.",
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
              overview: "عنصر محجوب تم استيراده عبر ID",
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
          title: success ? `✅ تم الاستيراد بنجاح` : "❌ فشل الاستيراد",
          description: success ? 
            `تم استيراد ${importedCount} عنصر محجوب جديد، إجمالي ${blockedItems.length} عنصر محجوب` :
            "حدث خطأ أثناء الاستيراد",
          posterPath: "",
          backdropPath: "",
          rating: 0,
          mediaType: "info"
        }];
      } catch (error) {
        return [{
          id: "import_error",
          type: "error",
          title: "❌ فشل الاستيراد",
          description: `رسالة الخطأ: ${error.message}`,
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
        title: "القائمة السوداء فارغة",
        description: "لا توجد محتويات محجوبة حالياً. استخدم وظيفة \"TMDB البحث والحجب\" لإضافة محتويات للحجب.",
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
        title: "💡 شرح إلغاء الحجب",
        description: "لإلغاء حجب محتوى ما، يرجى: 📝 تذكر TMDB ID المراد إلغاء حجبه، ⚙️ اختر عملية \"إلغاء الحجب\"، ✏️ أدخل ID المقابل ونوع الوسائط",
        posterPath: "",
        backdropPath: "",
        rating: 0,
        mediaType: "info"
      });
    }
    
    for (let i = 0; i < sortedItems.length; i++) {
      const item = sortedItems[i];
      const mediaTypeText = item.media_type === "movie" ? "فيلم" : "مسلسل";
      const blockedDate = new Date(item.blocked_date).toLocaleDateString();
      const ratingText = item.vote_average ? " ⭐" + item.vote_average.toFixed(1) : "";
      
      resultItems.push({
        id: "blocked_" + item.id + "_" + item.media_type,
        type: "blocked_item",
        title: "🚫 " + item.title,
        description: mediaTypeText + ratingText + " | TMDB ID: " + item.id + " | تم الحجب في: " + blockedDate + "\n" + (item.overview || "لا يوجد وصف"),
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
        params: { language: "ar" }
      });

      let item = null;
      if (response && response.data) {
        item = response.data;
      } else if (response && (response.title || response.name)) {
        item = response;
      } else {
        throw new Error("تعذر تحليل هيكل استجابة التفاصيل");
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
      const mediaTypeText = mediaType === "movie" ? "فيلم" : "مسلسل";
      const ratingText = item.vote_average ? ` ⭐${item.vote_average.toFixed(1)}` : "";
      
      return {
        videoUrl: "",
        title: success ? "✅ تم الحجب بنجاح" : "ℹ️ موجود مسبقاً",
        description: success ? 
          `${mediaTypeText}"${title}"${ratingText} تمت إضافته إلى القائمة السوداء، ولن يظهر في التطبيق.\n\nتم حفظ البيانات في Widget.storage، وستقوم جميع القوائم تلقائياً بتصفية هذا المحتوى.` : 
          `${mediaTypeText}"${title}"${ratingText} موجود بالفعل في القائمة السوداء.`
      };
      
    } else if (link.startsWith("unblock://")) {
      const parts = link.replace("unblock://", "").split("/");
      const [id, mediaType, encodedTitle] = parts;
      const title = decodeURIComponent(encodedTitle);
      
      const success = removeBlockedItem(id, mediaType);
      const mediaTypeText = mediaType === "movie" ? "فيلم" : "مسلسل";
      
      return {
        videoUrl: "",
        title: success ? "✅ تم إلغاء الحجب بنجاح" : "❌ فشلت العملية",
        description: success ? 
          `${mediaTypeText}"${title}" تمت إزالته من القائمة السوداء، وسيعود للظهور في التطبيق.\n\nتم تحديث Widget.storage، وستقوم جميع القوائم بإظهار هذا المحتوى مجدداً.` : 
          `حدث خطأ أثناء إلغاء حجب ${mediaTypeText}"${title}".`
      };
    }
    
    return {
      videoUrl: "",
      title: "❌ عملية غير صالحة",
      description: "تعذر التعرف على نوع العملية، يرجى استخدام وظائف مدير الحجب."
    };
    
  } catch (error) {
    return {
      videoUrl: "",
      title: "❌ فشلت العملية", 
      description: `رسالة الخطأ: ${error.message}`
    };
  }
}