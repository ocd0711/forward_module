// ==UserScript==
// @name         Live tv portal
// @version      3.0.0
// @description  Loads Live TV from an M3U URL or an Xtream Codes player_api
// @author       Dex
// ==/UserScript==

WidgetMetadata = {
    id: "unified_live_portal_v3",
    title: "Live tv portal", // --- NAME CHANGED ---
    detailCacheDuration: 3600, 
    modules: [
        {
            title: "Live tv portal", // --- NAME CHANGED ---
            requiresWebView: false,
            functionName: "loadLiveItems", // Renamed function
            cacheDuration: 21600, 
            params: [
                {
                    name: "source_type",
                    title: "Source Type",
                    type: "enumeration",
                    description: "Choose how to load the playlist",
                    value: "url",
                    enumOptions: [
                        {title: "M3U Playlist URL", value: "url"},
                        {title: "Xtream Portal Login (API)", value: "xtream_api"}
                    ]
                },
                
                // --- M3U URL FIELD ---
                {
                    name: "m3u_url",
                    title: "M3U Playlist URL",
                    type: "input",
                    description: "Enter your M3U playlist URL",
                    placeholders: [ { title: "Enter M3U URL...", value: "" } ],
                    showIf: 'params.source_type === "url"'
                },

                // --- XTREAM PORTAL FIELDS ---
                {
                    name: "portal",
                    title: "Portal URL",
                    type: "input",
                    description: "e.g., http://example.com:8080",
                    placeholders: [
                        { title: "Burner (Recommended)", value: "http://burner25699.cdn-24.me" },
                        { title: "P13 (Recommended)", value: "http://p13.live" },
                        { title: "Ultra (Recommended)", value: "http://ultra.gotop.me:8080" },
                        { title: "Lot (Recommended)", value: "http://lot77162.cdngold.me" },
                        { title: "Enter Custom Portal...", value: "" } 
                    ],
                    showIf: 'params.source_type === "xtream_api"'
                },
                {
                    name: "username",
                    title: "Username",
                    type: "input",
                    description: "Your portal username",
                    showIf: 'params.source_type === "xtream_api"'
                },
                {
                    name: "password",
                    title: "Password",
                    type: "input",
                    description: "Your portal password",
                    showIf: 'params.source_type === "xtream_api"'
                },

                // --- COMMON FILTER FIELDS ---
                {
                    name: "category_filter",
                    title: "Filter by Category (Optional)",
                    type: "input",
                    description: "e.g., 'USA' or 'ARABIC'",
                    placeholders: [ { title: "All", value: "" } ]
                },
                {
                    name: "name_filter",
                    title: "Filter by Channel (Optional)",
                    type: "input",
                    description: "e.g., 'beIN' or 'ESPN'",
                    placeholders: [ { title: "All", value: "" } ]
                },
                {
                    name: "sort_by",
                    title: "Sort By",
                    type: "enumeration",
                    description: "Choose the sort order for the results",
                    value: "default",
                    enumOptions: [
                        { title: "Default (Playlist Order)", value: "default" },
                        { title: "Name (A-Z)", value: "az" },
                        { title: "Name (Z-A)", value: "za" },
                    ]
                }
            ],
        },
    ],
    version: "3.0.0",
    requiredVersion: "0.0.1",
    description: "Loads Live TV from an M3U URL or an Xtream Codes portal with category filtering.",
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
 * Helper: Fetches JSON content from an API.
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
 * Main function to load the list of Live items.
 */
async function loadLiveItems(params = {}) {
    try {
        const sourceType = params.source_type || "url";
        const categoryFilter = params.category_filter || "";
        const nameFilter = params.name_filter || "";
        const sortBy = params.sort_by || "default"; 

        let items = [];

        // --- LOGIC FOR M3U URL ---
        if (sourceType === 'url') {
            const m3uUrl = params.m3u_url || "";
            if (!m3uUrl) throw new Error("M3U Playlist URL is required.");

            const response = await Widget.http.get(m3uUrl, {
                headers: { 'User-Agent': 'AptvPlayer/1.4.6' }
            });
            if (!response.data || typeof response.data !== 'string') {
                throw new Error("Failed to fetch M3U playlist. Check the URL.");
            }
            items = parseM3U(response.data);
        
        // --- LOGIC FOR XTREAM PORTAL API ---
        } else if (sourceType === 'xtream_api') {
            const portal = params.portal || "";
            const username = params.username || "";
            const password = params.password || "";
            if (!portal || !username || !password) {
                throw new Error("Portal URL, Username, and Password are required.");
            }

            const baseUrl = `${portal}/player_api.php?username=${username}&password=${password}`;
            const categoryUrl = `${baseUrl}&action=get_live_categories`;
            const streamUrl = `${baseUrl}&action=get_live_streams`;

            // This is the "slow" method, but it's the one that works for you.
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

            items = parseXtreamLive(streamsResponse, portal, username, password, categoryMap);
        }

        // Apply filters
        const filteredItems = items.filter(item => {
            const groupMatch = !categoryFilter || 
                (item.metadata?.group?.toLowerCase() || '').includes(categoryFilter.toLowerCase());
            const nameMatch = !nameFilter || 
                (item.title?.toLowerCase() || '').includes(nameFilter.toLowerCase());
            return groupMatch && nameMatch;
        });

        // Apply sorting
        if (sortBy === 'az') {
            filteredItems.sort((a, b) => 
                (a.title || '').localeCompare(b.title || '')
            );
        } else if (sortBy === 'za') {
            filteredItems.sort((a, b) => 
                (b.title || '').localeCompare(a.title || '')
            );
        }

        return filteredItems;

    } catch (error) {
        console.error(`Error loading Live items: ${error.message}`);
        return [];
    }
}

/**
 * Parses the M3U text content into a widget item list.
 */
function parseM3U(m3uString) {
    const items = [];
    const lines = m3uString.split('\n');

    for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith('#EXTINF:')) {
            const infoLine = lines[i];
            const urlLine = (lines[i + 1] || '').trim();

            if (urlLine && !urlLine.startsWith('#')) {
                const groupMatch = infoLine.match(/group-title="([^"]*)"/);
                const group = groupMatch ? groupMatch[1] : 'Uncategorized';
                const logoMatch = infoLine.match(/tvg-logo="([^"]*)"/); // Corrected regex
                const logo = logoMatch ? logoMatch[1] : null;
                const title = infoLine.split(',').pop().trim();

                const widgetItem = {
                    id: `m3u_live_${i}`,
                    type: "url",
                    title: cleanTitle(title),
                    posterPath: logo,
                    backdropPath: logo,
                    link: urlLine, // The link *is* the final video URL
                    playerType: "system",
                    metadata: {
                        group: group
                    }
                };
                items.push(widgetItem);
                i++;
            }
        }
    }
    return items;
}

/**
 * Parses the JSON response from the Xtream API into a widget item list.
 */
function parseXtreamLive(data, portal, username, password, categoryMap) {
    if (!data || !Array.isArray(data)) return [];

    const items = [];
    const encodedPortal = encodeURIComponent(portal);
    const encodedUser = encodeURIComponent(username);
    const encodedPass = encodeURIComponent(password);

    for (const item of data) {
        const categoryName = categoryMap.get(item.category_id) || 'Uncategorized';
        const streamId = item.stream_id;
        
        // This is the special link format your original script used
        const detailLink = `xtream:live:${encodedPortal}:${encodedUser}:${encodedPass}:${streamId}`;

        const widgetItem = {
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
        items.push(widgetItem);
    }
    return items;
}


/**
 * Loads detail for a clicked item.
 * This function can now handle BOTH M3U links and Xtream links.
 */
async function loadDetail(link) {
    try {
        // --- M3U URL LOGIC ---
        // If it's a normal URL, just play it.
        if (link.startsWith('http')) {
            return {
                id: `detail_${link}`,
                type: "detail", 
                title: "Live Stream",
                description: "Playing live channel...",
                videoUrl: link, // The link *is* the videoUrl
                playerType: "system",
                childItems: [], 
            };
        } 
        
        // --- XTREAM API LOGIC ---
        // If it's an 'xtream' link, parse it.
        else if (link.startsWith('xtream:live')) {
            const parts = link.split(':');
            const portal = decodeURIComponent(parts[2]);
            const username = decodeURIComponent(parts[3]);
            const password = decodeURIComponent(parts[4]);
            const id = parts[5];

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
        
        throw new Error("Invalid link format");

    } catch (error) {
        console.error(`Error in loadDetail: ${error.message}`);
        return null;
    }
}
