// ==UserScript==
// @name         VOD & Live Portal
// @version      1.0.8
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
                    placeholders: []
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
                    title: "Filter by Category (Optional, Regex)",
                    type: "input",
                    description: "e.g., 'Action' or '.*(Action|Comedy).*'",
                    placeholders: [
                        {
                            title: "All",
                            value: "",
                        },
                    ]
                },
                {
                    name: "name_filter",
                    title: "Filter by Title (Optional, Regex)",
                    type: "input",
                    description: "e.g., 'Spider-Man' or '.*(Batman|Superman).*'",
                    placeholders: [
                        {
                            title: "All",
                            value: "",
                        },
                    ]
                },
            ],
        },
    ],
    version: "1.0.8",
    requiredVersion: "0.0.1",
    description: "Loads Movies, Series, & Live TV from an Xtream Codes VOD portal.",
    author: "Dex"
};


/**
 * Main function to load the list of VOD items (Movies or Series).
 */
async function loadVodItems(params = {}) {
    try {
        const portal = params.portal || "";
        const username = params.username || "";
        const password = params.password || "";
        const type = params.type || "movies"; // 'movies', 'series', or 'live'
        const categoryFilter = params.category_filter || "";
        const nameFilter = params.name_filter || "";

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
            const groupMatch = !categoryFilter || (() => {
                try {
                    const regex = new RegExp(categoryFilter, 'i');
                    return regex.test(item.metadata?.group || '');
                } catch (e) {
                    return (item.metadata?.group?.toLowerCase() || '').includes(categoryFilter.toLowerCase());
                }
            })();

            const nameMatch = !nameFilter || (() => {
                try {
                    const regex = new RegExp(nameFilter, 'i');
                    return regex.test(item.title || '');
                } catch (e) {
                    return (item.title?.toLowerCase() || '').includes(nameFilter.toLowerCase());
                }
            })();

            return groupMatch && nameMatch;
        });

        const totalCount = filteredItems.length;

        return filteredItems.map((item, index) => ({
            ...item,
            title: `${item.title} (${index + 1}/${totalCount})`
        }));
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
                'User-Agent': 'AptvPlayer/1.4.6', // User-Agent for API calls
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
                title: item.name,
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
                title: item.name,
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
                title: item.name,
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

        const type = parts[1]; // 'movie', 'series', or 'live'
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
                title: info.name || "Movie",
                description: info.plot,
                posterPath: info.movie_image || info.cover_big,
                backdropPath: info.backdrop_path ? (Array.isArray(info.backdrop_path) ? info.backdrop_path[0] : info.backdrop_path) : info.movie_image,
                videoUrl: videoUrl,
                playerType: "system",
                childItems: [],
            };

        } else if (type === 'series') {
            // **FIXED SERIES LOGIC**
            const apiUrl = `${portal}/player_api.php?username=${username}&password=${password}&action=get_series_info&series_id=${id}`;
            const seriesData = await fetchApiContent(apiUrl);

            if (!seriesData || !seriesData.episodes) {
                throw new Error("Could not load series info.");
            }

            const info = seriesData.info || {};
            const episodesData = seriesData.episodes || {};
            const episodeItemsList = []; 
            let firstEpisodeUrl = null; 

            for (const seasonNum in episodesData) {
                const seasonEpisodes = episodesData[seasonNum];

                for (const ep of seasonEpisodes) {
                    const extension = ep.container_extension || 'mp4';
                    const epLink = `${portal}/series/${username}/${password}/${ep.id}.${extension}`;
                    const epTitle = `S${seasonNum.padStart(2, '0')}E${ep.episode_num.toString().padStart(2, '0')} - ${ep.title}`;

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
                }
            }

            return {
                id: link, // <-- Use original link
                type: "url", 
                title: info.name,
                description: info.plot,
                posterPath: info.cover,
                backdropPath: info.backdrop_path ? (Array.isArray(info.backdrop_path) ? info.backdrop_path[0] : info.backdrop_path) : info.cover,
                videoUrl: firstEpisodeUrl,
                link: link, // <-- Add original link
                mediaType: "tv", // <-- Add mediaType
                episode: episodeItemsList.length, // <-- Add episode count
                episodeItems: episodeItemsList, 
                rating: info.rating ? parseFloat(info.rating).toFixed(1) : "", // <-- Add rating
                playerType: "system" // <-- Add playerType
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
