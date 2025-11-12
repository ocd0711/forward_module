// ==UserScript==
// @name         VOD & Live Portal
// @version      1.2.2
// @description  Fetches Movies, Series, and Live TV from an Xtream Codes portal
// @author       Dex
// ==/UserScript==

WidgetMetadata = {
    id: "vod_portal",
    title: "VOD & Live Portal",
    detailCacheDuration: 3600, 
    modules: [
        {
            title: "VOD & Live Portal",
            requiresWebView: false,
            functionName: "loadVodItems",
            cacheDuration: 21600, 
            params: [
                {
                    name: "portal",
                    title: "Portal URL",
                    type: "input",
                    description: "Enter the portal URL (e.g., http://example.com:8080)",
                    placeholders: [
                        { title: "Burner (Recommended)", value: "http://burner25699.cdn-24.me" },
                        { title: "P13 (Recommended)", value: "http://p13.live" },
                        { title: "Ultra (Recommended)", value: "http://ultra.gotop.me:8080" },
                        { title: "Lot (Recommended)", value: "http://lot77162.cdngold.me" },
                        { title: "Enter Custom Portal...", value: "" } 
                    ]
                },
                {
                    name: "username",
                    title: "Username",
                    type: "input",
                    description: "Your portal username",
                },
                {
                    name: "password",
                    title: "Password",
                    type: "input",
                    description: "Your portal password",
                },
                {
                    name: "type",
                    title: "Media Type",
                    type: "enumeration",
                    description: "Choose to load Movies, Series, or Live TV",
                    value: "movies", 
                    enumOptions: [
                        {title: "Movies", value: "movies"},
                        {title: "Series", value: "series"},
                        {title: "Live TV", value: "live"},
                    ]
                },
                {
                    name: "category_filter",
                    title: "Filter by Category (Optional)",
                    type: "input",
                    description: "e.g., 'Action' or 'مسلسلات عربية'",
                    placeholders: [
                        { title: "All", value: "" }, 
                        { title: "Type Custom Category...", value: "" }, 
                        // --- Updated Categories ---
                        { title: "مسلسلات عربية فائقة الوضوح", value: "مسلسلات عربية فائقة الوضوح" },
                        { title: "مسلسلات شاهد فائقة الوضوح", value: "مسلسلات شاهد فائقة الوضوح" },
                        { title: "مسلسلات انمي مترجمة", value: "مسلسلات انمي مترجمة" },
                        { title: "⁴ᴷ ³⁸⁴⁰ᴾ ᴰᴼᴸᴮʸ ᴬᵁᴰᴵᴼ مسلسلات عربية", value: "⁴K ³⁸⁴⁰ᴾ ᴰᴼᴸᴮʸ ᴬᵁᴰᴵᴼ مسلسلات عربية" },
                        { title: "يعرض الآن تركي مترجم", value: "يعرض الآن تركي مترجم" },
                        { title: "مسلسلات تركية فائقة الوضوح", value: "مسلسلات تركية فائقة الوضوح" },
                        { title: "مسلسلات تركية مترجمة", value: "مسلسلات تركية مترجمة" },
                        { title: "مسلسلات الشام العدية", value: "مسلسلات الشام العدية" },
                        { title: "افلام عادل امام", value: "افلام عادل امام" },
                        { title: "أفلام نجوم العرب", value: "أفلام نجوم العرب" },
                        { title: "أفلام احمد حلمي", value: "أفلام احمد حلمي" },
                        { title: "أفلام احمد عز", value: "أفلام احمد عز" },
                        { title: "أفلام محمد هنيدي", value: "أفلام محمد هنيدي" },
                        { title: "أفلام عربية حديثه", value: "أفلام عربية حديثه" },
                        { title: "⁴ᴷ ³⁸⁴⁰ᴾ  Dᴼᴸᴮʸ ᴬᵁᴰᴵᴼ افلام عربية", value: "⁴ᴷ ³⁸⁴⁰ᴾ ᴰᴼᴸᴮʸ ᴬᵁᴰᴵᴼ افلام عربية" },
                        { title: "ᴰᴼᴸᴮʸ ᴬᵁᴰᴵᴼ افلام عربية", value: "ᴰᴼᴸᴮʸ ᴬᵁᴰᴵᴼ افلام عربية" },
                        { title: "أفلام عربية فائقة الوضوح", value: "أفلام عربية فائقة الوضوح" },
                        { title: "مسرحيات مصرية", value: "مسرحيات مصرية" },
                        { title: "مسرحيات خليجية", value: "مسرحيات خليجية" },
                        { title: "أفلام انمي", value: "أفلام انمي" },
                        { title: "افلام تركية مترجمة", value: "افلام تركية مترجمة" }, 
                        { title: "أفلام اطفال مدبلجة", value: "أفلام اطفال مدبلجة" },
                        { title: "أفلام اطفال مترجمة", value: "أفلام اطفال مترجمة" },
                        { title: "أفلام أطفال فائقة الوضوح", value: "أفلام أطفال فائقة الوضوح" },
                        { title: "افلام دريد لحام", value: "افلام دريد لحam" }
                    ]
                },
                {
                    name: "name_filter",
                    title: "Filter by Title (Optional)",
                    type: "input",
                    description: "e.g., 'Spider-Man'",
                    placeholders: [
                        {
                            title: "All",
                            value: "",
                        },
                    ]
                },
                {
                    name: "sort_by",
                    title: "Sort By",
                    type: "enumeration",
                    description: "Choose the sort order for the results",
                    value: "default",
                    enumOptions: [
                        { title: "Default (API Order)", value: "default" },
                        { title: "Name (A-Z)", value: "az" },
                        { title: "Name (Z-A)", value: "za" },
                        { title: "Newest Added (Movies/Series)", value: "newest" }
                    ]
                }
            ],
        },
    ],
    version: "1.2.2", // <-- UPDATED VERSION
    requiredVersion: "0.0.1",
    description: "Loads Movies, Series, & Live TV from an Xtream Codes VOD portal.",
    author: "Dex"
};

/**
 * Helper: clean channel prefixes from title
 */
function cleanTitle(title) {
  if (!title) return "Unknown Title";
  return title
    .replace(/^[A-Z]{2,}-[A-Z]{2,}\s*-\s*/i, '') // FR-DE -
    .replace(/^\[.*?\]\s*-?\s*/, '')            // [US] -
    .replace(/^.*?\|\s*/, '')                   // 4K|
    .replace(/^\w+:\s*/, '')                    // VIP:
    .trim() || title;
}

/**
 * Main function to load the list of VOD items (Movies or Series).
 */
async function loadVodItems(params = {}) {
    try {
        const portal = params.portal || "";
        const username = params.username || "";
        const password = params.password || "";
        const type = params.type || "movies";
        const categoryFilter = params.category_filter || "";
        const nameFilter = params.name_filter || "";
        const sortBy = params.sort_by || "default"; 

        if (!portal || !username || !password) {
            throw new Error("Portal URL, Username, and Password are required.");
        }

        let categoryAction;
        let streamAction;

        if (type === 'movies') {
            categoryAction = 'get_vod_categories';
            streamAction = 'get_vod_streams';
        } else if (type === 'series') {
            categoryAction = 'get_series_categories';
            streamAction = 'get_series';
        } else if (type === 'live') {
            categoryAction = 'get_live_categories';
            streamAction = 'get_live_streams';
        } else {
            throw new Error("Invalid media type selected.");
        }

        const baseUrl = `${portal}/player_api.php?username=${username}&password=${password}`;
        const categoryUrl = `${baseUrl}&action=${categoryAction}`;
        const streamUrl = `${baseUrl}&action=${streamAction}`;

        const [categoriesResponse, streamsResponse] = await Promise.all([
            fetchApiContent(categoryUrl),
            fetchApiContent(streamUrl)
        ]);

        if (!categoriesResponse || !streamsResponse) {
            throw new Error("Failed to fetch data from portal. Check credentials.");
        }

        const categoryMap = new Map();
        categoriesResponse.forEach(cat => {
            categoryMap.set(cat.category_id, cat.category_name);
        });

        const items = parseVodContent(streamsResponse, type, portal, username, password, categoryMap);

        // Apply filters
        const filteredItems = items.filter(item => {
            
            const groupMatch = !categoryFilter || 
                (item.metadata?.group?.toLowerCase() || '').includes(categoryFilter.toLowerCase());

            const nameMatch = !nameFilter || 
                (item.title?.toLowerCase() || '').includes(nameFilter.toLowerCase());
            
            return groupMatch && nameMatch;
        });

        // --- START OF SORTING LOGIC (v1.2.0 - More Robust) ---
        if (sortBy === 'az') {
            filteredItems.sort((a, b) => 
                (a.title || '').localeCompare(b.title || '')
            );
        } else if (sortBy === 'za') {
            filteredItems.sort((a, b) => 
                (b.title || '').localeCompare(a.title || '')
            );
        } else if (sortBy === 'newest') {
            const getTimestamp = (item) => {
                let ts = 0;
                if (type === 'movies') {
                    ts = item.metadata?.added;
                } else if (type === 'series') {
                    ts = item.metadata?.last_modified;
                }
                // Ensure it's a number. Handles null, undefined, and string numbers.
                return parseInt(ts, 10) || 0; 
            };
            
            // Sort descending (newest first)
            filteredItems.sort((a, b) => getTimestamp(b) - getTimestamp(a));
        }
        // --- END OF SORTING LOGIC ---

        return filteredItems;

    } catch (error) {
        console.error(`Error loading VOD items: ${error.message}`);
        return [];
    }
}

/**
 * Fetches JSON content from the Xtream Codes API.
 */
async function fetchApiContent(url) {
    try {
        const response = await Widget.http.get(url, {
            headers: {
                'User-Agent': 'AptvPlayer/1.4.6',
            }
        });

        if (response.data && (Array.isArray(response.data) || typeof response.data === 'object')) {
            return response.data;
        }
        return null;
    } catch (error) {
        console.error(`Error fetching API content from ${url}: ${error.message}`);
        return null;
    }
}

/**
 * Parses the JSON response from the API into a widget item list.
 */
function parseVodContent(data, type, portal, username, password, categoryMap) {
    if (!data || !Array.isArray(data)) return [];

    const items = [];
    const encodedPortal = encodeURIComponent(portal);
    const encodedUser = encodeURIComponent(username);
    const encodedPass = encodeURIComponent(password);

    for (const item of data) {
        const categoryName = categoryMap.get(item.category_id) || 'Uncategorized';
        let widgetItem = null;

        if (type === 'movies') {
            const streamId = item.stream_id;
            const detailLink = `xtream:movie:${encodedPortal}:${encodedUser}:${encodedPass}:${streamId}`;

            widgetItem = {
                id: `movie_${streamId}`,
                type: "url",
                title: cleanTitle(item.name),
                posterPath: item.stream_icon,
                backdropPath: item.stream_icon,
                link: detailLink,
                playerType: "system",
                metadata: {
                    group: categoryName,
                    rating: item.rating,
                    added: item.added,
                }
            };
        } else if (type === 'series') {
            const seriesId = item.series_id;
            const detailLink = `xtream:series:${encodedPortal}:${encodedUser}:${encodedPass}:${seriesId}`;

            widgetItem = {
                id: `series_${seriesId}`,
                type: "url",
                title: cleanTitle(item.name),
                posterPath: item.cover,
                backdropPath: item.backdrop_path ? (Array.isArray(item.backdrop_path) ? item.backdrop_path[0] : item.backdrop_path) : item.cover,
                link: detailLink,
                playerType: "system",
                metadata: {
                    group: categoryName,
                    rating: item.rating,
                    last_modified: item.last_modified,
                }
            };
        } else if (type === 'live') {
            const streamId = item.stream_id;
            const detailLink = `xtream:live:${encodedPortal}:${encodedUser}:${encodedPass}:${streamId}`;

            widgetItem = {
                id: `live_${streamId}`,
                type: "url",
                title: cleanTitle(item.name),
                posterPath: item.stream_icon,
                backdropPath: item.stream_icon,
                link: detailLink, 
                playerType: "system",
                metadata: {
                    group: categoryName,
                    rating: item.rating || "",
                }
            };
        }

        if (widgetItem) {
            items.push(widgetItem);
        }
    }

    return items;
}

/**
 * Loads detail for a clicked item.
 */
async function loadDetail(link) {
    try {
        const parts = link.split(':');
        if (parts[0] !== 'xtream') throw new Error("Invalid link format");

        const type = parts[1];
        const portal = decodeURIComponent(parts[2]);
        const username = decodeURIComponent(parts[3]);
        const password = decodeURIComponent(parts[4]);
        const id = parts[5];

        if (type === 'movie') {
            const apiUrl = `${portal}/player_api.php?username=${username}&password=${password}&action=get_vod_info&vod_id=${id}`;
            const movieData = await fetchApiContent(apiUrl);

            if (!movieData) {
                throw new Error("Could not load movie info.");
            }

            const info = movieData.info || {};
            const streamDetails = movieData.movie_data || {};
            const extension = streamDetails.container_extension || 'mp4';
            
            const videoUrl = `${portal}/movie/${username}/${password}/${streamDetails.stream_id || id}.${extension}`;

            return {
                id: `movie_detail_${id}`,
                type: "detail",
                title: cleanTitle(info.name) || "Movie",
                description: info.plot,
                posterPath: info.movie_image || info.cover_big,
                backdropPath: info.backdrop_path ? (Array.isArray(info.backdrop_path) ? info.backdrop_path[0] : info.backdrop_path) : info.movie_image,
                videoUrl: videoUrl,
                playerType: "system",
                childItems: [],
            };

        } else if (type === 'series') {
            const apiUrl = `${portal}/player_api.php?username=${username}&password=${password}&action=get_series_info&series_id=${id}`;
            const seriesData = await fetchApiContent(apiUrl);

            if (!seriesData) {
                throw new Error("Could not load series info.");
            }

            const info = seriesData.info || seriesData;
            const episodesData = seriesData.episodes || {};
            const episodeItemsList = []; 
            let firstEpisodeUrl = null;

            // --- FIXED EPISODE PROCESSING (v1.2.1) ---
            /**
             * Process a single episode with SAFE episode numbering
             * Uses a per-season counter
             */
            const addEpisode = (ep, seasonNum, safeEpisodeCounter) => { 
                const extension = ep.container_extension || 'mp4';
                const epLink = `${portal}/series/${username}/${password}/${ep.id}.${extension}`;
                
                const sNum = ep.season || seasonNum || 1;
                
                // Get the counter-based episode number (from the loop)
                const safeEpisodeNum = safeEpisodeCounter; 
                
                // Try to get episode number from API
                let apiEpisodeNum = ep.episode_num;
                
                // Validate the API episode number
                let isApiNumValid = false;
                if (apiEpisodeNum !== undefined && apiEpisodeNum !== null) {
                    const numValue = parseInt(apiEpisodeNum, 10);
                    // Consider valid if: is a number, is positive, and is reasonable (< 2000)
                    if (!isNaN(numValue) && numValue > 0 && numValue < 2000) {
                        isApiNumValid = true;
                        apiEpisodeNum = numValue;
                    }
                }
                
                // Choose which episode number to use
                const finalEpisodeNum = isApiNumValid ? apiEpisodeNum : safeEpisodeNum;
                
                // --- START OF CHANGE (v1.2.2) ---
                // Always use S/E format per user request, ignoring ep.title
                const epTitle = `S${String(sNum).padStart(2, '0')}E${String(finalEpisodeNum).padStart(2, '0')}`;
                // --- END OF CHANGE (v1.2.2) ---

                if (!firstEpisodeUrl) {
                    firstEpisodeUrl = epLink;
                }

                episodeItemsList.push({
                    id: ep.id,
                    type: "url",
                    title: epTitle,
                    posterPath: (ep.info ? ep.info.movie_image : null) || ep.movie_image || info.cover,
                    backdropPath: (ep.info ? ep.info.movie_image : null) || ep.movie_image || info.cover,
                    videoUrl: epLink,
                    playerType: "system",
                    description: (ep.info ? ep.info.plot : null) || "",
                    releaseDate: (ep.info ? ep.info.releasedate : null) || ""
                });
            };

            // Parse episodes (handles both flat array and season-grouped object)
            if (Array.isArray(episodesData)) {
                let currentSeason = -1;
                let perSeasonCounter = 1;
                for (const ep of episodesData) {
                    const sNum = ep.season || 1;
                    if (sNum !== currentSeason) { // Check if season has changed
                        currentSeason = sNum;
                        perSeasonCounter = 1; // Reset counter
                    }
                    addEpisode(ep, sNum, perSeasonCounter);
                    perSeasonCounter++;
                }
            } else if (typeof episodesData === 'object' && episodesData !== null) {
                for (const seasonNum in episodesData) {
                    if (!episodesData.hasOwnProperty(seasonNum)) continue;
                    
                    const seasonEpisodes = episodesData[seasonNum];
                    
                    if (Array.isArray(seasonEpisodes)) {
                        let perSeasonCounter = 1; // Counter resets for each new season
                        for (const ep of seasonEpisodes) {
                            addEpisode(ep, seasonNum, perSeasonCounter);
                            perSeasonCounter++;
                        }
                    }
                }
            }
            // --- END FIXED EPISODE PROCESSING ---

            return {
                id: link,
                type: "url", 
                title: cleanTitle(info.name),
                description: info.plot,
                posterPath: info.cover,
                backdropPath: info.backdrop_path ? (Array.isArray(info.backdrop_path) ? info.backdrop_path[0] : info.backdrop_path) : info.cover,
                videoUrl: firstEpisodeUrl,
                link: link, 
                mediaType: "tv",
                episode: episodeItemsList.length,
                episodeItems: episodeItemsList, 
                rating: info.rating ? parseFloat(info.rating).toFixed(1) : "",
                playerType: "system"
            };

        } else if (type === 'live') {
            const extension = ".ts";
            const videoUrl = `${portal}/live/${username}/${password}/${id}${extension}`;

            return {
                id: `live_detail_${id}`,
                type: "detail", 
                title: "Live Stream",
                description: "Playing live channel...",
                videoUrl: videoUrl,
                playerType: "system",
                childItems: [], 
            };
        }

    } catch (error) {
        console.error(`Error in loadDetail: ${error.message}`);
        return null;
    }
}
