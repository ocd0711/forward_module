WidgetMetadata = {
  id: "forward.combined.media.lists.en",
  title: "Movie & TV Lists",
  description: "Movie & TV Lists",
  author: "𝓑𝓾𝓽𝓽𝓮𝓻𝓯𝓵𝔂",
  site: "https://for-ward.vercel.app",
  version: "1.0.0",
  requiredVersion: "0.0.2",
  detailCacheDuration: 60,
  modules: [
    // -------------TMDB Module-------------
    // --- Popular Module ---
    {
      title: "TMDB Popular TV Shows",
      description: "Today's popular TV shows",
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
            { title: "United Kingdom", value: "GB" }
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
            { title: "United Kingdom", value: "GB" }
          ], 
          value: "" 
        },
        { name: "page", title: "Page", type: "page" }
      ]
    },
    // --- Discovery Module ---
    {
      title: "TMDB Top Rated",
      description: "Top rated movies or TV shows (sorted by user rating)",
      requiresWebView: false,
      functionName: "tmdbTopRated",
      cacheDuration: 3600,
      params: [
        { 
          name: "type", 
          title: "🎭 Type", 
          type: "enumeration", 
          enumOptions: [
            { title: "Movies", value: "movie" },
            { title: "TV Shows", value: "tv" }
          ], 
          value: "movie" 
        },
        { name: "language", title: "Language", type: "language", value: "en-US" },
        { name: "page", title: "Page", type: "page" }
      ]
    },
    // --- Network Platform Module ---
    {
        title: "TMDB Network Platform",
        description: "Filter TV content by network platform and content type",
        requiresWebView: false,
        functionName: "tmdbDiscoverByNetwork",
        cacheDuration: 3600,
        params: [
            {
                name: "with_networks",
                title: "Network Platform",
                type: "enumeration",
                description: "Select a platform to view its TV content",
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
            { title: "Viu TV", value: "2146" }
          ]
        },
        {
          name: "with_genres",
          title: "🎭 Content Type",
          type: "enumeration",
          description: "Select content type to filter",
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
          title: "Release Status",
          type: "enumeration",
          description: "Default: Released",
          value: "released",
          enumOptions: [
            { title: "Released", value: "released" },
            { title: "Upcoming", value: "upcoming" },
            { title: "All", value: "" }
          ]
        },
        {
          name: "sort_by",
          title: "🔢 Sort By",
          type: "enumeration",
          description: "Select content sorting method, default: Air Date ↓",
          value: "first_air_date.desc",
          enumOptions: [
            { title: "Air Date ↓", value: "first_air_date.desc" },
            { title: "Air Date ↑", value: "first_air_date.asc" },
            { title: "Most Popular", value: "popularity.desc" },
            { title: "Highest Rated", value: "vote_average.desc" },
            { title: "Most Voted", value: "vote_count.desc" }
          ]
        },
        { name: "page", title: "Page", type: "page" },
        { name: "language", title: "Language", type: "language", value: "en-US" }
      ]
    },
    // --- Production Company Module ---
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
          title: "🎭 Content Type",
          type: "enumeration",
          description: "Select content type to filter",
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
          description: "Default: Released",
          value: "released",
          enumOptions: [
            { title: "Released", value: "released" },
            { title: "Upcoming", value: "upcoming" },
            { title: "All", value: "" }
          ]
        },
        {
          name: "sort_by",
          title: "🔢 Sort By",
          type: "enumeration",
          description: "Select content sorting method, default: Release Date ↓",
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
    // =============Block Management Module=============
    {
      title: "TMDB Search & Block",
      description: "Search TMDB by title and automatically add all results to blocklist",
      requiresWebView: false,
      functionName: "searchAndBlock",
      cacheDuration: 0,
      params: [
        {
          name: "action",
          title: "🎯 Operation Mode",
          type: "enumeration",
          description: "Select operation type",
          value: "search_only",
          enumOptions: [
            { title: "Search Only", value: "search_only" },
            { title: "Search & Block", value: "search_and_block" },
            { title: "Manual Block ID", value: "manual_block" }
          ]
        },
        {
          name: "query",
          title: "🔍 Movie/TV Title",
          type: "input",
          description: "Enter movie or TV show title to search (for search mode)",
          value: "",
          placeholder: "e.g.: Ghost Blows Out the Light, South Park"
        },
        {
          name: "language",
          title: "🌐 Search Language",
          type: "enumeration",
          description: "Select search language (for search mode)",
          value: "en-US",
          enumOptions: [
            { title: "English", value: "en-US" },
            { title: "Chinese", value: "zh-CN" },
            { title: "Other Languages", value: "en" }
          ]
        },
        {
          name: "tmdb_id",
          title: "🆔 TMDB ID",
          type: "input",
          description: "Enter TMDB ID to block (for manual block mode)",
          value: "",
          placeholder: "e.g.: 550, 1399"
        },
        {
          name: "media_type",
          title: "🎭 Media Type",
          type: "enumeration",
          description: "Select media type (for manual block mode)",
          value: "tv",
          enumOptions: [
            { title: "TV Shows", value: "tv" },
            { title: "Movies", value: "movie" }
          ]
        }
      ]
    },
    {
      title: "TMDB Block Management",
      description: "View and manage blocked content",
      requiresWebView: false,
      functionName: "manageBlockedItems",
      cacheDuration: 0,
      params: [
        {
          name: "action",
          title: "📋 Action",
          type: "enumeration",
          description: "Select action to perform",
          value: "view",
          enumOptions: [
            { title: "View Blocklist", value: "view" },
            { title: "Unblock", value: "unblock" },
            { title: "Clear Blocklist", value: "clear" },
            { title: "Export Config", value: "export" },
            { title: "Import Config", value: "import" }
          ]
        },
        {
          name: "unblock_id",
          title: "🔓 Unblock ID",
          type: "input",
          description: "Enter TMDB ID to unblock",
          value: "",
          placeholder: "e.g.: 2190",
          belongTo: { paramName: "action", value: ["unblock"] }
        },
        {
          name: "unblock_media_type",
          title: "🎭 Media Type",
          type: "enumeration",
          description: "Select media type to unblock",
          value: "tv",
          enumOptions: [
            { title: "TV Shows", value: "tv" },
            { title: "Movies", value: "movie" }
          ],
          belongTo: { paramName: "action", value: ["unblock"] }
        },
        {
          name: "import_data",
          title: "📥 Import Data",
          type: "input",
          description: "Paste blocklist IDs, supports multiple formats",
          value: "",
          placeholder: "Supported formats: 550,1399 or '550','1399' or \"550\",\"1399\"",
          belongTo: { paramName: "action", value: ["import"] }
        }
      ]
    }
  ]
};

// ===============Block Configuration===============
// Dynamic blocking system using Widget.storage API
const STORAGE_KEY = "forward_blocked_items";

let blockedIdCache = null;

function getBlockedIdSet() {
  try {
    if (blockedIdCache) {
      return blockedIdCache;
    }
    
    const stored = Widget.storage.get(STORAGE_KEY);
    const blockedItems = stored ? JSON.parse(stored) : [];
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

function clearBlockedIdCache() {
  blockedIdCache = null;
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

function filterBlockedItems(items) {
  if (!Array.isArray(items)) return items;
  
  const filtered = [];
  for (let i = 0; i < items.length; i++) {
    if (!isItemBlocked(items[i])) {
      filtered.push(items[i]);
    }
  }
  return filtered;
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
        overview: additionalInfo.overview || "Blocked item added via Move_list_EN.js",
        blocked_date: new Date().toISOString(),
        vote_average: additionalInfo.vote_average || 0
      });
      
      Widget.storage.set(STORAGE_KEY, JSON.stringify(blockedItems));
      clearBlockedIdCache();
      return true;
    }
    
    return false;
  } catch (error) {
    return false;
  }
}

// ===============Helper Functions===============
let tmdbGenresCache = null;

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

function formatItemDescription(item) {
    let description = item.description || '';
    const hasRating = /rating/i.test(description);
    const hasYear = /year/i.test(description);
    const hasType = /type/i.test(description);
    
    if (item.itemType && !hasType) {
        description = `Type: ${item.itemType} | ${description}`;
    }
    
    if (item.rating && !hasRating) {
        description = `Rating: ${item.rating} | ${description}`;
    }
    
    if (item.releaseDate && !hasYear) {
        const year = String(item.releaseDate).substring(0,4);
        if (/^\d{4}$/.test(year)) {
            description = `Year: ${year} | ${description}`;
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

// ================TMDB Functions===============
async function fetchTmdbData(api, params) {
    const [data, genres] = await Promise.all([
        Widget.tmdb.get(api, { params: params }),
        fetchTmdbGenres()
    ]);

    const filteredResults = data.results
        .filter((item) => {
            return item.poster_path &&
                   item.id &&
                   (item.title || item.name) &&
                   (item.title || item.name).trim().length > 0;
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
                genreTitle: genreTitle
            };
        });

    return filterBlockedItems(filteredResults);
}



async function loadTodayHotTV(params) {
  const page = parseInt(params.page) || 1;
  const region = params.sort_by || '';
  
  if (region) {
    const [data, genres] = await Promise.all([
      Widget.tmdb.get(`/discover/tv`, { 
        params: { 
          language: params.language || 'en-US',
          page: page,
          with_origin_country: region,
          sort_by: 'popularity.desc'
        } 
      }),
      fetchTmdbGenres()
    ]);
    
    const items = data.results
      .filter(item => item.poster_path)
      .map(item => ({
        id: String(item.id),
        type: "tmdb",
        title: item.name,
        description: item.overview,
        releaseDate: item.first_air_date,
        backdropPath: item.backdrop_path,
        posterPath: item.poster_path,
        rating: item.vote_average,
        mediaType: "tv",
        genreTitle: getTmdbGenreTitles(item.genre_ids || [], "tv")
      }));
    
    return filterBlockedItems(items);
  }
  
  // Skip Chinese cache data, always use direct TMDB API for English content
  const [data, genres] = await Promise.all([
    Widget.tmdb.get(`/trending/tv/day`, { 
      params: { 
        language: params.language || 'en-US',
        page: page
      } 
    }),
    fetchTmdbGenres()
  ]);
  
  const items = data.results
    .filter(item => (!item.media_type || item.media_type === 'tv') && item.poster_path)
    .map(item => ({
      id: String(item.id),
      type: "tmdb",
      title: item.name,
      description: item.overview,
      releaseDate: item.first_air_date,
      backdropPath: item.backdrop_path,
      posterPath: item.poster_path,
      rating: item.vote_average,
      mediaType: "tv",
      genreTitle: getTmdbGenreTitles(item.genre_ids || [], "tv")
    }));
  
  return filterBlockedItems(items);
}

async function loadTodayHotMovies(params) {
  const page = parseInt(params.page) || 1;
  const region = params.sort_by || '';
  
  if (region) {
    const [data, genres] = await Promise.all([
      Widget.tmdb.get(`/discover/movie`, { 
        params: { 
          language: params.language || 'en-US',
          page: page,
          with_origin_country: region,
          sort_by: 'popularity.desc'
        } 
      }),
      fetchTmdbGenres()
    ]);
    
    const items = data.results
      .filter(item => item.poster_path)
      .map(item => ({
        id: String(item.id),
        type: "tmdb",
        title: item.title,
        description: item.overview,
        releaseDate: item.release_date,
        backdropPath: item.backdrop_path,
        posterPath: item.poster_path,
        rating: item.vote_average,
        mediaType: "movie",
        genreTitle: getTmdbGenreTitles(item.genre_ids || [], "movie")
      }));
    
    return filterBlockedItems(items);
  }
  
  // Skip Chinese cache data, always use direct TMDB API for English content
  const [data, genres] = await Promise.all([
    Widget.tmdb.get(`/trending/movie/day`, { 
      params: { 
        language: params.language || 'en-US',
        page: page
      } 
    }),
    fetchTmdbGenres()
  ]);
  
  const items = data.results
    .filter(item => (!item.media_type || item.media_type === 'movie') && item.poster_path)
    .map(item => ({
      id: String(item.id),
      type: "tmdb",
      title: item.title,
      description: item.overview,
      releaseDate: item.release_date,
      backdropPath: item.backdrop_path,
      posterPath: item.poster_path,
      rating: item.vote_average,
      mediaType: "movie",
      genreTitle: getTmdbGenreTitles(item.genre_ids || [], "movie")
    }));
  
  return filterBlockedItems(items);
}

async function tmdbTopRated(params) {
    const type = params.type || 'movie';
    const api = type === 'movie' ? `movie/top_rated` : `tv/top_rated`;
    return await fetchTmdbData(api, params);
}

async function tmdbDiscoverByNetwork(params = {}) {
    const api = "discover/tv";
    const beijingDate = getBeijingDate();
    const discoverParams = {
        language: params.language || 'en-US',
        page: params.page || 1,
        with_networks: params.with_networks,
        sort_by: params.sort_by || "first_air_date.desc",
    };
    
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

    const cleanParams = {
        page: params.page || 1,
        language: params.language || "en-US",
        sort_by: params.sort_by || "primary_release_date.desc",
        include_adult: false,
        include_video: false
    };

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

//=============Block Management Functions=============
function getBlockedItems() {
  try {
    const stored = Widget.storage.get(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    return [];
  }
}

function saveBlockedItems(items) {
  try {
    Widget.storage.set(STORAGE_KEY, JSON.stringify(items));
    clearBlockedIdCache();
    return true;
  } catch (error) {
    return false;
  }
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
    clearBlockedIdCache();
    return true;
  } catch (error) {
    return false;
  }
}

async function searchTMDB(query, language) {
  if (!query || query.trim().length === 0) {
    throw new Error("Search keyword cannot be empty");
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
      throw new Error("TMDB API no response");
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

async function searchAndBlock(params) {
  const action = params.action || "search_and_block";
  
  if (action === "manual_block") {
    const tmdbId = params.tmdb_id ? params.tmdb_id.trim() : '';
    const mediaType = params.media_type || "movie";
    
    if (!tmdbId) {
      return [{
        id: "no_id",
        type: "info",
        title: "❓ Please enter TMDB ID",
        description: "Enter the TMDB ID to block in the input field above, then re-run this module.",
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
        description: "TMDB ID should be numbers only, e.g.: 550, 1399",
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

      const title = item.title || item.name;
      
      if (!title) {
        return [{
          id: "not_found",
          type: "error",
          title: "❌ Content not found",
          description: "No " + (mediaType === "movie" ? "movie" : "TV show") + " found with ID " + tmdbId,
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
      const mediaTypeText = mediaType === "movie" ? "Movie" : "TV Show";
      const ratingText = item.vote_average ? " ⭐" + item.vote_average.toFixed(1) : "";
      
      return [{
        id: "manual_block_result_" + tmdbId,
        type: "info",
        title: success ? "✅ Block successful" : "ℹ️ Already exists",
        description: success ? 
          mediaTypeText + " \"" + title + "\"" + ratingText + " added to blocklist" : 
          mediaTypeText + " \"" + title + "\"" + ratingText + " already in blocklist",
        posterPath: item.poster_path ? "https://image.tmdb.org/t/p/w500" + item.poster_path : "",
        backdropPath: "",
        rating: item.vote_average || 0,
        mediaType: mediaType
      }];

    } catch (error) {
      return [{
        id: "manual_block_error",
        type: "error", 
        title: "❌ Block failed",
        description: "Error message: " + error.message,
        posterPath: "",
        backdropPath: "",
        rating: 0,
        mediaType: "error"
      }];
    }
  }
  
  const query = params.query ? params.query.trim() : '';
  const language = params.language || "en-US";
  
  if (!query) {
    return [{
      id: "no_query",
      type: "info",
      title: "❓ Please enter search keyword",
      description: "Enter a movie or TV show title in the input field above, then re-run this module.",
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
        title: "🔍 No matching results found",
        description: "No movies or TV shows found related to \"" + query + "\", please try other keywords.",
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
        const mediaTypeText = item.media_type === "movie" ? "Movie" : "TV Show";
        const yearText = item.year ? " (" + item.year + ")" : "";
        const ratingText = item.vote_average ? " ⭐" + item.vote_average.toFixed(1) : "";
        const statusText = isBlocked ? " 🚫Blocked" : "";
        
        resultItems.push({
          id: "search_" + item.id + "_" + item.media_type,
          type: "info",
          title: item.title + yearText + statusText,
          description: mediaTypeText + ratingText + " (TMDB ID: " + item.id + ") | " + (item.overview || "No description available"),
          posterPath: item.poster_path ? "https://image.tmdb.org/t/p/w500" + item.poster_path : "",
          backdropPath: "",
          rating: item.vote_average || 0,
          mediaType: item.media_type
        });
      }
      
      resultItems.unshift({
        id: "search_summary",
        type: "info",
        title: "🔍 Search Results",
        description: "Search \"" + query + "\" found " + searchResults.length + " results\n\n" +
                     "To block these contents, please select \"Search & Block\" mode.",
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
        const mediaTypeText = item.media_type === "movie" ? "Movie" : "TV Show";
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
        
        const status = success ? "✅ Blocked" : "🚫 Already exists";
        
        resultItems.push({
          id: "blocked_" + item.id + "_" + item.media_type,
          type: "info",
          title: status + " " + item.title + yearText,
          description: mediaTypeText + ratingText + " (TMDB ID: " + item.id + ") | " + (item.overview || "No description available"),
          posterPath: item.poster_path ? "https://image.tmdb.org/t/p/w500" + item.poster_path : "",
          backdropPath: "",
          rating: item.vote_average || 0,
          mediaType: item.media_type
        });
      }
      
      resultItems.unshift({
        id: "block_summary",
        type: "info",
        title: "🎯 Block operation completed",
        description: "Search \"" + query + "\" found " + searchResults.length + " results\n" +
                     "Newly blocked: " + blockedCount + " items\n" +
                     "Already existed: " + alreadyBlockedCount + " items\n\n" +
                     "These contents will no longer appear in any TMDB lists.",
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
      title: "❌ Search failed",
      description: "Error message: " + error.message,
      posterPath: "",
      backdropPath: "",
      rating: 0,
      mediaType: "error"
    }];
  }
}

async function manageBlockedItems(params) {
  const action = params.action || "view";
  
  if (action === "unblock") {
    const unblockId = params.unblock_id ? params.unblock_id.trim() : '';
    const mediaType = params.unblock_media_type || "tv";
    
    if (!unblockId) {
      return [{
        id: "no_unblock_id",
        type: "info",
        title: "❓ Please enter ID to unblock",
        description: "Enter the TMDB ID to unblock in the input field above, then re-run.",
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
        description: "TMDB ID should be numbers only, e.g.: 2190, 550",
        posterPath: "",
        backdropPath: "",
        rating: 0,
        mediaType: "error"
      }];
    }

    const success = removeBlockedItem(unblockId, mediaType);
    const mediaTypeText = mediaType === "movie" ? "Movie" : "TV Show";
    
    return [{
      id: "unblock_result",
      type: "info",
      title: success ? "✅ Unblock successful" : "❌ Operation failed",
      description: success ? 
        mediaTypeText + " ID " + unblockId + " has been removed from blocklist and will appear in lists again." : 
        "No " + mediaTypeText + " with ID " + unblockId + " found, or error occurred during unblock.",
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
      title: success ? "✅ Blocklist cleared" : "❌ Clear failed",
      description: success ? "All blocked items have been removed, Widget storage cleared" : "Error occurred while clearing blocklist",
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
      title: "📤 Export block configuration",
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
        title: "❓ Please enter import data",
        description: "Enter TMDB ID list (comma-separated) in the input field above, then re-run.",
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
        title: success ? `✅ Import successful` : "❌ Import failed",
        description: success ? 
          `Successfully imported ${importedCount} new blocked items, total ${blockedItems.length} blocked items` :
          "Error occurred during import",
        posterPath: "",
        backdropPath: "",
        rating: 0,
        mediaType: "info"
      }];
    } catch (error) {
      return [{
        id: "import_error",
        type: "error",
        title: "❌ Import failed",
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
      title: "Blocklist is empty",
      description: "No content is currently blocked. Use \"🚫 Search & Block\" feature to add movies to block.",
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
      title: "💡 Unblock instructions",
      description: "To unblock content: 📝 Remember the TMDB ID to unblock, ⚙️ Select \"Unblock\" action, ✏️ Enter the corresponding ID and media type",
      posterPath: "",
      backdropPath: "",
      rating: 0,
      mediaType: "info"
    });
  }
  
  for (let i = 0; i < sortedItems.length; i++) {
    const item = sortedItems[i];
    const mediaTypeText = item.media_type === "movie" ? "Movie" : "TV Show";
    const blockedDate = new Date(item.blocked_date).toLocaleDateString();
    const ratingText = item.vote_average ? " ⭐" + item.vote_average.toFixed(1) : "";
    
    resultItems.push({
      id: "blocked_" + item.id + "_" + item.media_type,
      type: "blocked_item",
      title: "🚫 " + item.title,
      description: mediaTypeText + ratingText + " | TMDB ID: " + item.id + " | Blocked on: " + blockedDate + "\n" + (item.overview || "No description available"),
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

async function loadDetail(link) {
  try {
    if (link.startsWith("block://")) {
      const parts = link.replace("block://", "").split("/");
      const [id, mediaType, encodedTitle] = parts;
      const title = decodeURIComponent(encodedTitle);
      
      const endpoint = mediaType === "movie" ? "/movie/" + id : "/tv/" + id;
      
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
        title: success ? "✅ Block successful" : "ℹ️ Already exists",
        description: success ? 
          `${mediaTypeText} "${title}"${ratingText} added to blocklist and will no longer appear in the app.\n\nData saved to Widget.storage, all lists will automatically filter this content.` : 
          `${mediaTypeText} "${title}"${ratingText} already in blocklist.`
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
          `${mediaTypeText} "${title}" removed from blocklist and will appear in the app again.\n\nWidget.storage updated, all lists will show this content again.` : 
          `Error occurred while unblocking ${mediaTypeText} "${title}".`
      };
    }
    
    return {
      videoUrl: "",
      title: "❌ Invalid operation",
      description: "Unrecognized operation type, please use features in block manager."
    };
    
  } catch (error) {
    return {
      videoUrl: "",
      title: "❌ Operation failed", 
      description: `Error message: ${error.message}`
    };
  }
}
