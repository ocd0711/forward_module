var WidgetMetadata = {
    id: "hanime1_me_style",
    title: "Hanime1",
    description: "获取 Hanime1 动画，折扣码gold",
    author: "gr294949",
    site: "https://hanime1.me",
    version: "2.1.1",
    requiredVersion: "0.0.2",
    detailCacheDuration: 300,
    modules: [
        {
            title: "搜索影片",
            description: "搜索 Hanime1 影片内容",
            requiresWebView: false,
            functionName: "searchVideos",
            cacheDuration: 1800,
            params: [
                {
                    name: "keyword",
                    title: "搜索关键词",
                    type: "input",
                    description: "输入搜索关键词（标题、番号、作者等）",
                    value: ""
                },
                {
                    name: "sort_by",
                    title: "排序",
                    type: "enumeration",
                    description: "排序方式",
                    value: "最新上市",
                    enumOptions: [
                        { title: "全部", value: "all" },
                        { title: "最新上市", value: "最新上市" },
                        { title: "最新上传", value: "最新上傳" },
                        { title: "本日排行", value: "本日排行" },
                        { title: "本周排行", value: "本週排行" },
                        { title: "本月排行", value: "本月排行" },
                        { title: "他们在看", value: "他們在看" }
                    ]
                },
                { name: "page", title: "页码", type: "page", description: "页码", value: "1" }
            ]
        },
        {
            title: "本日热门",
            description: "本日热门影片",
            requiresWebView: false,
            functionName: "loadDailyHot",
            cacheDuration: 1800,
            params: [
                { name: "page", title: "页码", type: "page", description: "页码", value: "1" }
            ]
        },
        {
            title: "本周热门",
            description: "本周热门影片",
            requiresWebView: false,
            functionName: "loadWeeklyHot",
            cacheDuration: 1800,
            params: [
                { name: "page", title: "页码", type: "page", description: "页码", value: "1" }
            ]
        },
        {
            title: "本月热门",
            description: "本月热门影片",
            requiresWebView: false,
            functionName: "loadMonthlyHot",
            cacheDuration: 1800,
            params: [
                { name: "page", title: "页码", type: "page", description: "页码", value: "1" }
            ]
        },
        {
            title: "最新上市",
            description: "最新上市影片",
            requiresWebView: false,
            functionName: "loadNewRelease",
            cacheDuration: 1800,
            params: [
                { name: "page", title: "页码", type: "page", description: "页码", value: "1" }
            ]
        },
        {
            title: "中文字幕",
            description: "中文字幕影片",
            requiresWebView: false,
            functionName: "loadChineseSubtitle",
            cacheDuration: 1800,
            params: [
                {
                    name: "genre",
                    title: "分类",
                    type: "enumeration",
                    description: "筛选分类",
                    value: "all",
                    enumOptions: [
                        { title: "全部", value: "all" },
                        { title: "里番", value: "裏番" },
                        { title: "泡面番", value: "泡麵番" },
                        { title: "Motion Anime", value: "Motion Anime" },
                        { title: "3DCG", value: "3DCG" },
                        { title: "2D 动画", value: "2D動畫" },
                        { title: "Cosplay", value: "Cosplay" }
                    ]
                },
                {
                    name: "sort_by",
                    title: "排序",
                    type: "enumeration",
                    description: "排序方式",
                    value: "all",
                    enumOptions: [
                        { title: "全部", value: "all" },
                        { title: "最新上市", value: "最新上市" },
                        { title: "最新上传", value: "最新上傳" },
                        { title: "本日排行", value: "本日排行" },
                        { title: "本月排行", value: "本月排行" }
                    ]
                },
                { name: "page", title: "页码", type: "page", description: "页码", value: "1" }
            ]
        },
        {
            title: "影片分类",
            description: "浏览不同分类的影片",
            requiresWebView: false,
            functionName: "loadByGenre",
            cacheDuration: 1800,
            params: [
                {
                    name: "genre",
                    title: "选择分类",
                    type: "enumeration",
                    description: "选择具体分类",
                    value: "all",
                    enumOptions: [
                        { title: "全部", value: "all" },
                        { title: "里番", value: "裏番" },
                        { title: "泡面番", value: "泡麵番" },
                        { title: "Motion Anime", value: "Motion Anime" },
                        { title: "3DCG", value: "3DCG" },
                        { title: "2D 动画", value: "2D動畫" },
                        { title: "Cosplay", value: "Cosplay" }
                    ]
                },
                {
                    name: "sort_by",
                    title: "排序",
                    type: "enumeration",
                    description: "排序方式",
                    value: "all",
                    enumOptions: [
                        { title: "全部", value: "all" },
                        { title: "最新上市", value: "最新上市" },
                        { title: "最新上传", value: "最新上傳" },
                        { title: "本日排行", value: "本日排行" },
                        { title: "本月排行", value: "本月排行" }
                    ]
                },
                { name: "page", title: "页码", type: "page", description: "页码", value: "1" }
            ]
        },
        {
            title: "新番预告",
            description: "查看即将上映的新番",
            requiresWebView: false,
            functionName: "loadPreviews",
            cacheDuration: 3600,
            params: []
        }
    ]
};

const BASE_URL = "https://hanime1.me";

function getCommonHeaders() {
    return {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Referer": BASE_URL,
        "Accept-Language": "zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7"
    };
}

async function fetchAndParse(url) {
    try {
        const response = await Widget.http.get(url, {
            headers: getCommonHeaders()
        });

        const $ = Widget.html.load(response.data);
        const items = [];

        // 策略 1: 标签搜索页 (Tags Search) 结构
        // .content-padding-new .search-doujin-videos -> a.overlay
        const $doujinVideos = $('.content-padding-new .search-doujin-videos');
        if ($doujinVideos.length > 0) {
            $doujinVideos.each((i, el) => {
                const $card = $(el);
                const $link = $card.find('a.overlay');
                const href = $link.attr('href');
                if (!href || href.indexOf('/watch?v=') === -1) return;

                let link = href;
                if (!link.startsWith('http')) {
                    link = BASE_URL + (link.startsWith('/') ? '' : '/') + link;
                }

                if (items.some(it => it.link === link)) return;

                // 图片提取
                let poster = "";
                $card.find('img').each((j, imgEl) => {
                    const src = $(imgEl).attr('src') || $(imgEl).attr('data-src');
                    if (src && src.indexOf('background.jpg') === -1) {
                        poster = src;
                        return false;
                    }
                });
                if (!poster) poster = $card.find('img').attr('src') || "";

                if (poster && !poster.startsWith('http')) {
                    if (poster.startsWith('//')) poster = "https:" + poster;
                    else poster = BASE_URL + (poster.startsWith('/') ? '' : '/') + poster;
                }

                let title = $card.find('.card-mobile-title').text().trim() || $card.attr('title') || "";
                const duration = $card.find('.card-mobile-duration').first().text().trim();
                const author = $card.find('.card-mobile-user').text().trim();

                items.push({
                    id: link,
                    type: "url",
                    title: title,
                    posterPath: poster,
                    backdropPath: poster,
                    mediaType: "movie",
                    durationText: duration,
                    description: author || "",
                    link: link
                });
            });
        }

        // 策略 2: 分类/排行 (Genre/Rank) 结构
        // 直接是 <a> 包含 .home-rows-videos-div.search-videos
        // 参考 Step 220 output: <a href="..."><div class="home-rows-videos-div search-videos">...</div></a>
        // 有时候可能是 .home-rows-videos-div 下的 a
        if (items.length === 0) {
            $('a').each((i, el) => {
                const $a = $(el);
                const href = $a.attr('href');
                if (!href || href.indexOf('/watch?v=') === -1) return;

                // 必须包含视频卡片特征元素
                const $videoDiv = $a.find('.home-rows-videos-div');
                if ($videoDiv.length === 0 && !$a.parent().hasClass('home-rows-videos-div')) {
                    // 也许是 <a> 里面直接有 img?
                    // 让我们严格一点，只匹配包含 .home-rows-videos-title 或 .search-videos 的
                    if ($a.find('.home-rows-videos-title').length === 0 && $a.find('.search-videos').length === 0) return;
                }

                let link = href;
                if (!link.startsWith('http')) {
                    link = BASE_URL + (link.startsWith('/') ? '' : '/') + link;
                }

                if (items.some(it => it.link === link)) return;

                const $img = $a.find('img');
                let poster = $img.attr('src') || $img.attr('data-src') || "";
                if (poster && !poster.startsWith('http')) {
                    if (poster.startsWith('//')) poster = "https:" + poster;
                    else poster = BASE_URL + (poster.startsWith('/') ? '' : '/') + poster;
                }

                let title = $a.find('.home-rows-videos-title').text().trim();
                // 如果找不到标题，尝试找 img alt
                if (!title) title = $img.attr('alt') || "";

                // 时长通常在这个模式下不直接显示在卡片上，或者在图片右上角？
                // 暂时留空或尝试查找
                const duration = "";
                const author = "";

                if (title) {
                    items.push({
                        id: link,
                        type: "url",
                        title: title,
                        posterPath: poster,
                        backdropPath: poster,
                        mediaType: "movie",
                        durationText: duration,
                        description: author,
                        link: link
                    });
                }
            });
        }

        return items;

    } catch (e) {
        console.error(`Fetch error for ${url}:`, e);
        return [];
    }
}

// --- 模块功能函数 ---

async function searchVideos(params) {
    const page = params.page || 1;
    const keyword = params.keyword || "";
    const sort = params.sort_by || "最新上市";

    let url = `${BASE_URL}/search?query=${encodeURIComponent(keyword)}&sort=${encodeURIComponent(sort)}`;
    if (page > 1) url += `&page=${page}`;

    return fetchAndParse(url);
}

async function loadDailyHot(params) {
    const page = params.page || 1;
    let url = `${BASE_URL}/search?sort=${encodeURIComponent('本日排行')}`;
    if (page > 1) url += `&page=${page}`;
    return fetchAndParse(url);
}

async function loadWeeklyHot(params) {
    const page = params.page || 1;
    let url = `${BASE_URL}/search?sort=${encodeURIComponent('本週排行')}`;
    if (page > 1) url += `&page=${page}`;
    return fetchAndParse(url);
}

async function loadMonthlyHot(params) {
    const page = params.page || 1;
    let url = `${BASE_URL}/search?sort=${encodeURIComponent('本月排行')}`;
    if (page > 1) url += `&page=${page}`;
    return fetchAndParse(url);
}

async function loadNewRelease(params) {
    const page = params.page || 1;
    let url = `${BASE_URL}/search?sort=${encodeURIComponent('最新上市')}`;
    if (page > 1) url += `&page=${page}`;
    return fetchAndParse(url);
}

async function loadChineseSubtitle(params) {
    const page = params.page || 1;
    const sort = params.sort_by || ""; // 默认为空，或最新上市
    const genre = params.genre || "";

    // 手动编码 tags[] 为 tags%5B%5D
    let url = `${BASE_URL}/search?tags%5B%5D=${encodeURIComponent('中文字幕')}`;

    // 只有当 sort 既不是 'all' 也不是 '全部' 且有值时才添加
    if (sort && sort !== 'all' && sort !== '全部') {
        url += `&sort=${encodeURIComponent(sort)}`;
    }

    if (genre && genre !== 'all' && genre !== '全部') {
        url += `&genre=${encodeURIComponent(genre)}`;
    }

    if (page > 1) url += `&page=${page}`;
    return fetchAndParse(url);
}

async function loadByGenre(params) {
    const page = params.page || 1;
    const genre = params.genre || "";
    const sort = params.sort_by || "";

    let url = `${BASE_URL}/search?`;
    // 这里 URL 构造需要小心，如果没有 query param，search 页面可能默认显示全部

    let queryParts = [];

    if (genre && genre !== 'all' && genre !== '全部') {
        queryParts.push(`genre=${encodeURIComponent(genre)}`);
    }

    if (sort && sort !== 'all' && sort !== '全部') {
        queryParts.push(`sort=${encodeURIComponent(sort)}`);
    }

    if (page > 1) {
        queryParts.push(`page=${page}`);
    }

    if (queryParts.length > 0) {
        url += queryParts.join('&');
    } else {
        // 如果没有任何参数，默认可能需要一个参数来触发搜索结果？
        // 不过 hanime1.me/search 直接访问也是有结果的 (默认排序)
    }

    return fetchAndParse(url);
}

// 专门解析预览页面的函数
function parsePreviewsHtml(html) {
    const $ = Widget.html.load(html);
    const items = [];

    // 预览页结构：
    // 移动端通常是 div.hidden-sm.hidden-md.hidden-lg (根据curl结果)
    // 或者更通用的: 查找包含 .preview-image-modal-trigger 的容器

    // 根据 curl 结果，有一块 <div class="hidden-sm hidden-md hidden-lg"> 包含 h5.caption 和 图片
    // 让我们遍历这些容器

    $('div.hidden-sm.hidden-md.hidden-lg').each((i, el) => {
        const $container = $(el);

        const desc = $container.find('h5.caption').text().trim();
        // 标题通常在描述之前，或者就是描述的第一行？
        // 看起来 h5.caption 是描述。标题可能在更上面的结构，或者在模态框里。
        // 根据 DOM 结构，标题似乎不好找。
        // 我们可以尝试找同级的 h4 或者 data-target 关联的 modal 里的 title

        // 尝试获取第一张图
        const $img = $container.find('img.preview-image-modal-trigger').first();
        const poster = $img.attr('src');

        // 尝试从 Modal ID 反推或者找附近的标题
        // 也可以直接用描述的前几个字当标题
        let title = desc.split('\n')[0];
        if (title.length > 30) title = title.substring(0, 30) + "...";
        if (!title) title = "新番预览";

        // 构造一个伪链接，因为是预览，没有播放地址
        // 我们可以让它指向当前页面，或者搜索该标题
        const link = BASE_URL + "/search?query=" + encodeURIComponent(title);

        if (poster) {
            items.push({
                id: link,
                type: "url",
                title: title,
                posterPath: poster,
                backdropPath: poster,
                mediaType: "movie",
                description: desc,
                link: link
            });
        }
    });

    return items;
}

async function loadPreviews(params) {
    const d = new Date();
    const year = d.getFullYear();
    let month = d.getMonth() + 1;
    if (month < 10) month = '0' + month;

    const url = `${BASE_URL}/previews/${year}${month}`;

    try {
        const response = await Widget.http.get(url, { headers: getCommonHeaders() });
        return parsePreviewsHtml(response.data);
    } catch (e) {
        console.error("Preview load failed", e);
        return [];
    }
}

// --- 详情加载 ---

async function loadDetail(link) {
    try {
        const response = await Widget.http.get(link, {
            headers: getCommonHeaders()
        });

        const $ = Widget.html.load(response.data);

        let videoUrl = "";

        // 策略1: Input ID (Hanime1 特有)
        const val = $('input#video-sd').val();
        if (val) videoUrl = val;

        // 策略2: RegExp
        if (!videoUrl) {
            const match = response.data.match(/source\s*=\s*['"](https:\/\/[^'"]+)['"]/);
            if (match) videoUrl = match[1];
        }

        // 策略3: Video tag
        if (!videoUrl) {
            videoUrl = $('video source').attr('src');
        }

        // 兜底对象 (模仿 MissAV 的错误处理逻辑)
        if (!videoUrl) {
            throw new Error("Video URL not found");
        }

        videoUrl = videoUrl.replace(/&amp;/g, '&');

        const title = $('meta[property="og:title"]').attr('content') || "Title Not Found";
        const desc = $('meta[property="og:description"]').attr('content') || "";
        const cover = $('meta[property="og:image"]').attr('content') || "";

        // 解析推荐
        // 这里为了简化，我们仅在成功解析到视频时尝试获取推荐，
        // 或者如果需要，可以再次发起 search 请求。
        // 为了性能，我们尝试从当前页面解析相关的 (Hanime1 详情页底部有相关视频)
        // 复用 fetchAndParse 的逻辑:
        const childItems = [];
        $('.home-rows-videos-div a').each((i, el) => {
            // 简单解析，略... 
            // 由于 Hanime1 详情页结构与列表页相似，可以使用相似逻辑提取
            // 但这里直接返回空数组也是安全的，或者简单实现前3个
        });

        return {
            id: link,
            type: "detail", // MissAV 使用 'detail' 或 'url'
            videoUrl: videoUrl,
            title: title,
            description: desc,
            posterPath: cover,
            backdropPath: cover,
            mediaType: "movie",
            link: link,
            childItems: [], // 暂时留空推荐，以保证稳定性
            headers: getCommonHeaders()
        };

    } catch (error) {
        // Fallback object similar to MissAV
        return {
            id: link,
            type: "detail",
            videoUrl: link, // 让 App 尝试直接打开网页
            title: "加载失败 / 需要登录",
            description: `无法解析视频地址: ${error.message}`,
            posterPath: "",
            mediaType: "movie",
            link: link
        };
    }
}
