WidgetMetadata = {
  id: "forward.combined.media.lists.en",
  title: "Movie & TV Lists",
  description: "Movie & TV Lists",
  author: "𝓑𝓾𝓽𝓽𝓮𝓻𝓯𝓵𝔂",
  site: "https://for-ward.vercel.app",
  version: "1.5.0",
  requiredVersion: "0.0.2",
  detailCacheDuration: 60,
  modules: [
    // ------------TMDB Module------------
    // --- Popular Modules ---
    {
      title: "TMDB Popular TV Series",
      description: "Today's popular TV dramas",
      requiresWebView: false,
      functionName: "loadTodayHotTV",
      cacheDuration: 3600,
      params: [
        { name: "language", title: "Language", type: "language", value: "en-US" },
        { 
          name: "sort_by", 
          title: "Region", 
          type: "enumeration", 
          enumOptions: [
            { title: "All Regions", value: "" },
            { title: "China", value: "CN" },
            { title: "United States", value: "US" },
            { title: "South Korea", value: "KR" },
            { title: "Japan", value: "JP" },
            { title: "United Kingdom", value: "GB" },
            { title: "Thailand", value: "TH" },
            { title: "Italy", value: "IT" },
            { title: "Germany", value: "DE" },
            { title: "Spain", value: "ES" },
            { title: "Russia", value: "RU" },
            { title: "Sweden", value: "SE" },
            { title: "Brazil", value: "BR" },
            { title: "Denmark", value: "DK" },
            { title: "India", value: "IN" },
            { title: "Canada", value: "CA" },
            { title: "Ireland", value: "IE" },
            { title: "Australia", value: "AU" }
          ], 
          value: "" 
        },
        { name: "page", title: "Page", type: "page" }
      ]
    },
    {
      title: "TMDB Popular Movies",
      description: "Today's popular movies",
      requiresWebView: false,
      functionName: "loadTodayHotMovies",
      cacheDuration: 3600,
      params: [
        { name: "language", title: "Language", type: "language", value: "en-US" },
        { 
          name: "sort_by", 
          title: "Region", 
          type: "enumeration", 
          enumOptions: [
            { title: "All Regions", value: "" },
            { title: "China", value: "CN" },
            { title: "United States", value: "US" },
            { title: "South Korea", value: "KR" },
            { title: "Japan", value: "JP" },
            { title: "United Kingdom", value: "GB" },
            { title: "Hong Kong", value: "HK" },
            { title: "Taiwan", value: "TW" },
            { title: "Thailand", value: "TH" },
            { title: "Italy", value: "IT" },
            { title: "Germany", value: "DE" },
            { title: "Spain", value: "ES" },
            { title: "Russia", value: "RU" },
            { title: "Sweden", value: "SE" },
            { title: "Brazil", value: "BR" },
            { title: "Denmark", value: "DK" },
            { title: "India", value: "IN" },
            { title: "Canada", value: "CA" },
            { title: "Ireland", value: "IE" },
            { title: "Australia", value: "AU" }
          ], 
          value: "" 
        },
        { name: "page", title: "Page", type: "page" }
      ]
    },
    // --- Regular Discovery Modules ---
    {
      title: "TMDB Top Rated Content",
      description: "High-rated movies or TV series (sorted by user ratings)",
      requiresWebView: false,
      functionName: "tmdbTopRated",
      cacheDuration: 3600,
      params: [
        { 
          name: "type", 
          title: "Content Type", 
          type: "enumeration", 
          enumOptions: [
            { title: "Movie", value: "movie" },
            { title: "TV Series", value: "tv" }
          ], 
          value: "movie" 
        },
        { name: "language", title: "Language", type: "language", value: "en-US" },
        { name: "page", title: "Page", type: "page" }
      ]
    },
    // --- Streaming Platform Modules ---
    {
        title: "TMDB Streaming Platforms",
        description: "Filter TV series content by streaming platform and content type",
        requiresWebView: false,
        functionName: "tmdbDiscoverByNetwork",
        cacheDuration: 3600,
        params: [
            {
                name: "with_networks",
                title: "Streaming Platform",
                type: "enumeration",
                description: "Select a platform to view its TV series content",
                value: "",
                belongTo: {
                  paramName: "air_status",
                  value: ["released","upcoming",""],
                },
          enumOptions: [
            { title: "All", value: "" },
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
          title: "Content Type",
          type: "enumeration",
          description: "Select the content type to filter",
          value: "",
          belongTo: {
            paramName: "air_status",
            value: ["released","upcoming",""],
          },
          enumOptions: [
            { title: "All Types", value: "" },
            { title: "Crime", value: "80" },
            { title: "Animation", value: "16" },
            { title: "Comedy", value: "35" },
            { title: "Drama", value: "18" },
            { title: "Family", value: "10751" },
            { title: "Mystery", value: "9648" },
            { title: "Reality", value: "10764" },
            { title: "Talk Show", value: "10767" },
            { title: "Documentary", value: "99" },
            { title: "Action & Adventure", value: "10759" },
            { title: "Sci-Fi & Fantasy", value: "10765" },
            { title: "War & Politics", value: "10768" }
          ]
        },
        {
          name: "air_status",
          title: "Airing Status",
          type: "enumeration",
          description: "Default: released",
          value: "released",
          enumOptions: [
            { title: "Released", value: "released" },
            { title: "Upcoming", value: "upcoming" },
            { title: "All", value: "" }
          ]
        },
        {
          name: "sort_by",
          title: "Sort By",
          type: "enumeration",
          description: "Select content sorting method, default by release date ↓",
          value: "first_air_date.desc",
          enumOptions: [
            { title: "Release Date ↓", value: "first_air_date.desc" },
            { title: "Release Date ↑", value: "first_air_date.asc" },
            { title: "Most Popular", value: "popularity.desc" },
            { title: "Highest Rated", value: "vote_average.desc" },
            { title: "Most Voted", value: "vote_count.desc" }
          ]
        },
        { name: "page", title: "Page", type: "page" },
        { name: "language", title: "Language", type: "language", value: "en-US" }
      ]
    },
    // --- Production Company Modules ---
    {
      title: "TMDB Production Companies",
      functionName: "tmdbCompanies",
      cacheDuration: 3600,
      params: [
        {
          name: "with_companies",
          title: "Production Company",
          type: "enumeration",
          value: "",
          description: "Select a company to view its content",
          belongTo: {
            paramName: "air_status",
            value: ["released","upcoming",""],
          },
          enumOptions: [
            { title: "All", value: "" },
            { title: "Disney", value: "2" },
            { title: "Warner Bros", value: "174" },
            { title: "Columbia", value: "5" },
            { title: "Sony", value: "34" },
            { title: "Universal", value: "33" },
            { title: "Paramount", value: "4" },
            { title: "20th Century", value: "25" },
            { title: "Marvel", value: "420" },
            { title: "Toho", value: "882" },
            { title: "China Film Group Corporation", value: "14714" },
            { title: "BBC", value: "3324" },
            { title: "A24", value: "41077" },
            { title: "Blumhouse", value: "3172" },
            { title: "Working Title Films", value: "10163" }
          ]
        },
        {
          name: "with_genres",
          title: "Content Type",
          type: "enumeration",
          description: "Select the content type to filter",
          value: "",
          belongTo: {
            paramName: "air_status",
            value: ["released","upcoming",""],
          },
          enumOptions: [
            { title: "All Types", value: "" },
            { title: "Adventure", value: "12" },
            { title: "Drama", value: "18" },
            { title: "Action", value: "28" },
            { title: "Animation", value: "16" },
            { title: "History", value: "36" },
            { title: "Comedy", value: "35" },
            { title: "Fantasy", value: "14" },
            { title: "Family", value: "10751" },
            { title: "Horror", value: "27" },
            { title: "Mystery", value: "9648" },
            { title: "Thriller", value: "53" },
            { title: "War", value: "10752" },
            { title: "Romance", value: "10749" },
            { title: "Crime", value: "80" },
            { title: "Science Fiction", value: "878" },
            { title: "Documentary", value: "99" },
            { title: "Western", value: "37" },
            { title: "Music", value: "10402" },
            { title: "TV Movie", value: "10770" }
          ]
        },
        {
          name: "air_status",
          title: "Release Status",
          type: "enumeration",
          description: "Default: released",
          value: "released",
          enumOptions: [
            { title: "Released", value: "released" },
            { title: "Upcoming", value: "upcoming" },
            { title: "All", value: "" }
          ]
        },
        {
          name: "sort_by",
          title: "Sort By",
          type: "enumeration",
          description: "Select content sorting method, default by release date ↓",
          value: "primary_release_date.desc",
          enumOptions: [
            { title: "Release Date ↓", value: "primary_release_date.desc" },
            { title: "Release Date ↑", value: "primary_release_date.asc" },
            { title: "Most Popular", value: "popularity.desc" },
            { title: "Highest Rated", value: "vote_average.desc" },
            { title: "Most Voted", value: "vote_count.desc" }
          ]
        },
        { name: "page", title: "Page", type: "page" },
        { name: "language", title: "Language", type: "language", value: "en-US" }
      ]
    },
    // ====Content Blocking Management====
    {
      title: "TMDB Search & Block",
      description: "Block content by movie/TV show name or content type",
      requiresWebView: false,
      functionName: "searchAndBlock",
      cacheDuration: 0,
      params: [
        {
          name: "block_type",
          title: "Block Type",
          type: "enumeration",
          description: "Select blocking method",
          value: "by_name",
          enumOptions: [
            { title: "By Movie/TV Name", value: "by_name" },
            { title: "By Content Type", value: "by_genre" },
            { title: "Manual ID Input", value: "manual_id" }
          ]
        },
        {
          name: "action",
          title: "Action Mode",
          type: "enumeration",
          description: "Select operation type",
          value: "search_only",
          enumOptions: [
            { title: "Search Only", value: "search_only" },
            { title: "Search & Block", value: "search_and_block" }
          ]
        },
        {
          name: "query",
          title: "Movie/TV Name",
          type: "input",
          description: "Enter the movie or TV show name to search (used in name-based blocking mode)",
          value: "",
          placeholder: "Example: Demon Slayer, Jurassic Park"
        },
        {
          name: "genre_name",
          title: "Type Name",
          type: "input",
          description: "Enter the content type to block (used in type-based blocking mode)",
          value: "",
          placeholder: "Example: Reality TV, Variety Show, Documentary, Action, Romance"
        },
        {
          name: "language",
          title: "Search Language",
          type: "enumeration",
          description: "Select search language (used in name-based blocking mode)",
          value: "en-US",
          enumOptions: [
            { title: "English", value: "en-US" },
            { title: "Chinese", value: "zh-CN" },
            { title: "Other Languages", value: "en" }
          ]
        },
        {
          name: "tmdb_id",
          title: "TMDB ID",
          type: "input",
          description: "Enter the TMDB ID to block (used in manual ID input mode)",
          value: "",
          placeholder: "Example: 550, 1399"
        },
        {
          name: "media_type",
          title: "Media Type",
          type: "enumeration",
          description: "Select media type (used in manual ID input mode)",
          value: "tv",
          enumOptions: [
            { title: "TV Series", value: "tv" },
            { title: "Movie", value: "movie" }
          ]
        }
      ]
    },
    {
      title: "TMDB Block Management",
      description: "View and manage blocked content and types",
      requiresWebView: false,
      functionName: "manageBlockedItems",
      cacheDuration: 0,
      params: [
        {
          name: "manage_type",
          title: "Management Type",
          type: "enumeration",
          description: "Select the type of blocking to manage",
          value: "items",
          enumOptions: [
            { title: "Blocked Content", value: "items" },
            { title: "Blocked Types", value: "genres" }
          ]
        },
        {
          name: "action",
          title: "Action",
          type: "enumeration",
          description: "Select the action to perform",
          value: "view",
          enumOptions: [
            { title: "View List", value: "view" },
            { title: "Clear List", value: "clear" },
            { title: "Unblock", value: "unblock" },
            { title: "Export Configuration", value: "export" },
            { title: "Import Configuration", value: "import" }
          ]
        },
        {
          name: "unblock_id",
          title: "Unblock ID",
          type: "input",
          description: "Enter the ID to unblock",
          value: "",
          placeholder: "Content ID example: 2190 | Type ID example: 10764",
          belongTo: { paramName: "action", value: ["unblock"] }
        },
        {
          name: "unblock_media_type",
          title: "Media Type",
          type: "enumeration",
          description: "Select the media type to unblock (only needed for content blocking)",
          value: "tv",
          enumOptions: [
            { title: "TV Series", value: "tv" },
            { title: "Movie", value: "movie" }
          ],
          belongTo: { paramName: "action", value: ["unblock"], paramName2: "manage_type", value2: ["items"] }
        },
        {
          name: "import_data",
          title: "Import Data",
          type: "input",
          description: "Paste the list of blocked IDs to import, supports multiple formats",
          value: "",
          placeholder: "Supported formats: 550,1399 or '550','1399' or \"550\",\"1399\"",
          belongTo: { paramName: "action", value: ["import"] }
        }
      ]
    }
  ]
};

// ========Blocking Configuration========
const GENRE_STORAGE_KEY = "forward_blocked_genres";
const STORAGE_KEY = "forward_blocked_items";

const TMDB_GENRE_MAPPING = {
    "Reality TV": 10764,
    "Talk Show": 10767, 
    "Variety Show": 10764,
    "Documentary": 99,
    "Action & Adventure": 10759,
    "Animation": 16,
    "Comedy": 35,
    "Crime": 80,
    "Drama": 18,
    "Family": 10751,
    "Kids": 10762,
    "Mystery": 9648,
    "News": 10763,
    "Sci-Fi & Fantasy": 10765,
    "Soap": 10766,
    "War & Politics": 10768,
    "Western": 37,
    "Action": 28,
    "Adventure": 12,
    "History": 36,
    "Fantasy": 14,
    "Horror": 27,
    "Music": 10402,
    "Romance": 10749,
    "Science Fiction": 878,
    "TV Movie": 10770,
    "Thriller": 53,
    "War": 10752
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
            description: description || `Block all "${genreName}" type content`,
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

// =========Auxiliary Functions=========
async function fetchTmdbGenres() {
    if (tmdbGenresCache) return tmdbGenresCache;
    
    const [movieGenres, tvGenres] = await Promise.all([
        Widget.tmdb.get('/genre/movie/list', { params: { language: 'en-US' } }),
        Widget.tmdb.get('/genre/tv/list', { params: { language: 'en-US' } })
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
        .map(id => genres[id]?.trim() || `Unknown Type(${id})`)
        .filter(Boolean)
        .join('•');
}

function getBeijingDate() {
    const now = new Date();
    const beijingTime = now.getTime() + (8 * 60 * 60 * 1000);
    const beijingDate = new Date(beijingTime);
    return `${beijingDate.getUTCFullYear()}-${String(beijingDate.getUTCMonth() + 1).padStart(2, '0')}-${String(beijingDate.getUTCDate()).padStart(2, '0')}`;
}

// =============TMDB Functions============
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
      language: params.language || 'en-US',
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
    language: params.language || 'en-US',
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
      language: params.language || 'en-US',
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
    language: params.language || 'en-US',
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
    language: params.language || 'en-US',
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
    language: params.language || "en-US",
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

// ===========Search & Block==========
async function searchTMDB(query, language) {
    if (!query || query.trim().length === 0) {
        throw new Error("Search keywords cannot be empty");
    }

    try {
        const response = await Widget.tmdb.get("/search/multi", {
            params: {
                query: query.trim(),
                language: language || "en-US",
                page: 1
            }
        });

        if (!response) {
            throw new Error("TMDB API has no response");
        }

        let results = [];
        if (response.results) {
            results = response.results;
        } else if (response.data && response.data.results) {
            results = response.data.results;
        } else if (Array.isArray(response)) {
            results = response;
        } else {
            throw new Error("Unable to parse TMDB response structure");
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
        throw new Error("Search failed: " + error.message);
    }
}

async function searchAndBlockByGenre(params) {
    const action = params.action || "search_only";
    const genreName = params.genre_name ? params.genre_name.trim() : '';
    
    if (!genreName) {
        return [{
            id: "no_genre_name",
            type: "info",
            title: "⚠ Please enter the type name to block",
            description: "Example: Reality TV, Variety Show, Documentary, Action, Romance, etc.",
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
            title: "❓ No matching type found",
            description: `No matching type found for "${genreName}".\n\nSupported types include:\n${suggestions.join('、')}`,
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
            title: "🔍 Found matching types",
            description: `Search for "${genreName}" found ${matchedGenres.length} matching types:\n\n${matchedGenres.map(g => `• ${g.name} (ID: ${g.id})`).join('\n')}\n\nSelect "Search & Block" mode to add these types to the block list.`,
            posterPath: "",
            backdropPath: "",
            rating: 0,
            mediaType: "info"
        });
        
        for (const genre of matchedGenres) {
            const blockedGenres = getBlockedGenres();
            const isBlocked = blockedGenres.some(blocked => blocked.id === genre.id);
            const status = isBlocked ? "🚫 Already Blocked" : "✅ Blockable";
            
            resultItems.push({
                id: `genre_detail_${genre.id}`,
                type: "info", 
                title: `${status} ${genre.name}`,
                description: `TMDB Type ID: ${genre.id}\n${isBlocked ? 'This type is already in the block list' : 'You can block all content of this type'}`,
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
            
            const status = success ? "✅ Blocked" : "🚫 Already Exists";
            resultItems.push({
                id: `blocked_genre_${genre.id}`,
                type: "info",
                title: `${status} ${genre.name}`,
                description: `TMDB Type ID: ${genre.id}\n${success ? 'Added to type block list' : 'This type is already in the block list'}`,
                posterPath: "",
                backdropPath: "",
                rating: 0,
                mediaType: "info"
            });
        }
        
        resultItems.unshift({
            id: "genre_block_summary",
            type: "info",
            title: "🎯 Type blocking operation completed",
            description: `Search for "${genreName}" found ${matchedGenres.length} types\nNew blocks: ${blockedCount}\nAlready existed: ${alreadyBlockedCount}\n\nAll content containing these types will no longer appear in rankings.`,
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
        title: "⚠ Please enter TMDB ID",
        description: "Enter the TMDB ID to block in the input field above, then run this module again.",
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
        title: "❌ Invalid ID format",
        description: "TMDB ID should be pure numbers, for example: 550, 1399",
        posterPath: "",
        backdropPath: "",
        rating: 0,
        mediaType: "error"
      }];
    }

    try {
      const endpoint = mediaType === "movie" ? "/movie/" + tmdbId : "/tv/" + tmdbId;
      
      const response = await Widget.tmdb.get(endpoint, {
        params: { language: "en-US" }
      });

      let item = null;
      if (response && response.data) {
        item = response.data;
      } else if (response && (response.title || response.name)) {
        item = response;
      } else {
        throw new Error("Unable to parse details response structure");
      }
      const blockItem = {
        id: tmdbId,
        media_type: mediaType,
        title: item.title || item.name,
        poster_path: item.poster_path,
        overview: item.overview,
        vote_average: item.vote_average
      };

      const success = addBlockedItem(blockItem);
      const mediaTypeText = mediaType === "movie" ? "Movie" : "TV Series";
      const ratingText = item.vote_average ? ` ⭐${item.vote_average.toFixed(1)}` : "";
      
      return [{
        id: "manual_block_result_" + tmdbId,
        type: "info",
        title: success ? "✅ Block Successful" : "ℹ️ Already Exists",
        description: success ? 
          `${mediaTypeText}"${title}"${ratingText} has been added to blacklist` : 
          `${mediaTypeText}"${title}"${ratingText} is already in the blacklist`,
        posterPath: item.poster_path ? "https://image.tmdb.org/t/p/w500" + item.poster_path : "",
        backdropPath: "",
        rating: item.vote_average || 0,
        mediaType: mediaType
      }];

    } catch (error) {
      return [{
        id: "manual_block_error",
        type: "error", 
        title: "❌ Block Failed",
        description: "Error message: " + error.message,
        posterPath: "",
        backdropPath: "",
        rating: 0,
        mediaType: "error"
      }];
    }
  } else {
    const query = params.query ? params.query.trim() : '';
    const language = params.language || "en-US";
    
    if (!query) {
      return [{
        id: "no_query",
        type: "info",
        title: "⚠ Please enter search keywords",
        description: "Enter the movie or TV show name to search in the input field above, then run this module again.",
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
          title: "∅ No matching results found",
          description: `No movies or TV shows related to "${query}" were found. Please try other keywords.`,
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
          const mediaTypeText = item.media_type === "movie" ? "Movie" : "TV Series";
          const yearText = item.year ? " (" + item.year + ")" : "";
          const ratingText = item.vote_average ? " ⭐" + item.vote_average.toFixed(1) : "";
          const statusText = isBlocked ? " 🚫 Already Blocked" : "";
          
          resultItems.push({
            id: "search_" + item.id + "_" + item.media_type,
            type: "info",
            title: item.title + yearText + statusText,
            description: mediaTypeText + ratingText + " (TMDB ID: " + item.id + ") | " + (item.overview || "No overview available"),
            posterPath: item.poster_path ? "https://image.tmdb.org/t/p/w500" + item.poster_path : "",
            backdropPath: "",
            rating: item.vote_average || 0,
            mediaType: item.media_type
          });
        }
        
        resultItems.unshift({
          id: "search_summary",
          type: "info",
          title: "∅ Search Results",
          description: `Search for "${query}" found ${searchResults.length} results\n\nTo block this content, please select "Search & Block" mode.`,
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
          const mediaTypeText = item.media_type === "movie" ? "Movie" : "TV Series";
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
          
          const status = success ? "✅ Blocked" : "🚫 Already Exists";
          
          resultItems.push({
            id: "blocked_" + item.id + "_" + item.media_type,
            type: "info",
            title: status + " " + item.title + yearText,
            description: mediaTypeText + ratingText + " (TMDB ID: " + item.id + ") | " + (item.overview || "No overview available"),
            posterPath: item.poster_path ? "https://image.tmdb.org/t/p/w500" + item.poster_path : "",
            backdropPath: "",
            rating: item.vote_average || 0,
            mediaType: item.media_type
          });
        }
        
        resultItems.unshift({
          id: "block_summary",
          type: "info",
          title: "🎯 Block Operation Completed",
          description: `Search for "${query}" found ${searchResults.length} results\n` +
                       `New blocks: ${blockedCount}\n` +
                       `Already existed: ${alreadyBlockedCount}\n\n` +
                       `This content will no longer appear in any TMDB rankings.`,
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
        title: "❌ Search Failed",
        description: "Error message: " + error.message,
        posterPath: "",
        backdropPath: "",
        rating: 0,
        mediaType: "error"
      }];
    }
  }
}

// =========Block Management=========
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
          title: "⚠ Please enter the type ID to unblock",
          description: "Enter the type ID you want to unblock in the input field above, then run again.",
          posterPath: "",
          backdropPath: "",
          rating: 0,
          mediaType: "info"
        }];
      }
      
      const success = removeBlockedGenre(genreId);
      const genreName = REVERSE_GENRE_MAPPING[genreId] || `Type ID: ${genreId}`;
      
      return [{
        id: "unblock_genre_result",
        type: "info",
        title: success ? "✅ Unblock Successful" : "❌ Operation Failed",
        description: success ? 
          `Type "${genreName}" has been removed from block list and will reappear in rankings.` : 
          `Type with ID ${genreId} not found, or error occurred during unblocking.`,
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
          title: "✅ Type Block List Cleared",
          description: "All blocked types have been removed and content will reappear in rankings.",
          posterPath: "",
          backdropPath: "",
          rating: 0,
          mediaType: "info"
        }];
      } catch (error) {
        return [{
          id: "clear_genres_error",
          type: "error",
          title: "❌ Clear Failed",
          description: "Error occurred while clearing type block list.",
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
        title: "Type Block List is Empty",
        description: "Currently no content types are blocked. Use \"TMDB Search & Block\" function with \"By Content Type\" to add types to block.",
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
      title: "💡 Type Unblocking Instructions",
      description: "To unblock a specific type: 📝 Remember the type ID you want to unblock, ⚙️ Select \"Unblock\" action, ✏️ Enter the corresponding type ID",
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
        description: `Type ID: ${genre.id} | Blocked on: ${blockedDate}\n${genre.description}`,
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
          title: "⚠ Please enter the ID to unblock",
          description: "Enter the TMDB ID you want to unblock in the input field above, then run again.",
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
          title: "❌ Invalid ID format",
          description: "TMDB ID should be pure numbers, for example: 2190, 550",
          posterPath: "",
          backdropPath: "",
          rating: 0,
          mediaType: "error"
        }];
      }

      const success = removeBlockedItem(unblockId, mediaType);
      const mediaTypeText = mediaType === "movie" ? "Movie" : "TV Series";
      
      return [{
        id: "unblock_result",
        type: "info",
        title: success ? "✅ Unblock Successful" : "❌ Operation Failed",
        description: success ? 
          `${mediaTypeText} ID ${unblockId} has been removed from blacklist and will reappear in rankings.` : 
          `Movie/TV with ID ${unblockId} not found, or error occurred during unblocking.`,
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
        title: success ? "✅ Blacklist Cleared" : "❌ Clear Failed",
        description: success ? "All blocked items have been removed and Widget storage has been cleared" : "Error occurred while clearing blacklist",
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
        title: "📤 Export Block Configuration",
        description: `Current blocked ID list (${blockedItems.length} items):\n\n${idList || 'None'}`,
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
          title: "⚠ Please enter import data",
          description: "Enter the list of TMDB IDs to import (separated by commas) in the input field above, then run again.",
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
              overview: "Blocked item imported via ID",
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
          title: success ? `✅ Import Successful` : "❌ Import Failed",
          description: success ? 
            `Successfully imported ${importedCount} new block items, total ${blockedItems.length} blocked items` :
            "Error occurred during import process",
          posterPath: "",
          backdropPath: "",
          rating: 0,
          mediaType: "info"
        }];
      } catch (error) {
        return [{
          id: "import_error",
          type: "error",
          title: "❌ Import Failed",
          description: `Error message: ${error.message}`,
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
        title: "Blacklist is Empty",
        description: "Currently no content is blocked. Use the \"TMDB Search & Block\" function to add movies/shows to block.",
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
        title: "💡 Unblocking Instructions",
        description: "To unblock specific content: 📝 Remember the TMDB ID you want to unblock, ⚙️ Select \"Unblock\" action, ✏️ Enter the corresponding ID and media type",
        posterPath: "",
        backdropPath: "",
        rating: 0,
        mediaType: "info"
      });
    }
    
    for (let i = 0; i < sortedItems.length; i++) {
      const item = sortedItems[i];
      const mediaTypeText = item.media_type === "movie" ? "Movie" : "TV Series";
      const blockedDate = new Date(item.blocked_date).toLocaleDateString();
      const ratingText = item.vote_average ? ` ⭐${item.vote_average.toFixed(1)}` : "";
      
      resultItems.push({
        id: "blocked_" + item.id + "_" + item.media_type,
        type: "blocked_item",
        title: "🚫 " + item.title,
        description: mediaTypeText + ratingText + " | TMDB ID: " + item.id + " | Blocked on: " + blockedDate + "\n" + (item.overview || "No overview available"),
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
        params: { language: "en" }
      });

      let item = null;
      if (response && response.data) {
        item = response.data;
      } else if (response && (response.title || response.name)) {
        item = response;
      } else {
        throw new Error("Could not parse detail response structure");
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
      const mediaTypeText = mediaType === "movie" ? "Movie" : "TV Show";
      const ratingText = item.vote_average ? ` ⭐${item.vote_average.toFixed(1)}` : "";

      return {
        videoUrl: "",
        title: success ? "✅ Blocked successfully" : "ℹ️ Already exists",
        description: success ?
          `${mediaTypeText} "${title}"${ratingText} has been added to the blocklist and will not appear in the app.\n\nData saved to Widget.storage, all lists will automatically filter this content.` :
          `${mediaTypeText} "${title}"${ratingText} is already in the blocklist.`
      };

    } else if (link.startsWith("unblock://")) {
      const parts = link.replace("unblock://", "").split("/");
      const [id, mediaType, encodedTitle] = parts;
      const title = decodeURIComponent(encodedTitle);

      const success = removeBlockedItem(id, mediaType);
      const mediaTypeText = mediaType === "movie" ? "Movie" : "TV Show";

      return {
        videoUrl: "",
        title: success ? "✅ Unblock successful" : "❌ Operation failed",
        description: success ?
          `${mediaTypeText} "${title}" has been removed from the blocklist and will reappear in the app.\n\nWidget.storage updated, all lists will show this content again.` :
          `An error occurred while unblocking ${mediaTypeText} "${title}".`
      };
    }

    return {
      videoUrl: "",
      title: "❌ Invalid Operation",
      description: "Could not recognize the operation type. Please use the blocker management functions."
    };

  } catch (error) {
    return {
      videoUrl: "",
      title: "❌ Operation Failed",
      description: `Error message: ${error.message}`
    };
  }
}
