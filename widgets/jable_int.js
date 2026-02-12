WidgetMetadata = {
  id: "jable_int",
  title: "Jable",
  description: "修复原本没有声音的问题",
  author: "nibiru & MakkaPakka",
  site: "https://widgets-xd.vercel.app",
  version: "1.2.0",
  requiredVersion: "0.0.2",
  detailCacheDuration: 60,
  modules: [
    // 搜索模块
    {
      title: "搜索",
      description: "搜索",
      requiresWebView: false,
      functionName: "search",
      cacheDuration: 3600,
      params: [
        {
          name: "keyword",
          title: "关键词",
          type: "input",
          description: "关键词",
        },
        {
          name: "sort_by",
          title: "排序",
          type: "enumeration",
          description: "排序",
          enumOptions: [
            { title: "最多观看", value: "video_viewed" },
            { title: "近期最佳", value: "post_date_and_popularity" },
            { title: "最近更新", value: "post_date" },
            { title: "最多收藏", value: "most_favourited" },
          ],
        },
        { name: "from", title: "页码", type: "page", description: "页码", value: "1" },
      ],
    },
    // 热门模块
    {
      title: "热门",
      description: "热门影片",
      requiresWebView: false,
      functionName: "loadPage",
      cacheDuration: 3600,
      params: [
        {
          name: "category",
          title: "分类",
          type: "enumeration",
          description: "分类",
          enumOptions: [
            { title: "热门", value: "hot" },
            { title: "最近更新", value: "latest-updates" },
            { title: "最新上市", value: "new-release" },
          ],
        },
        {
          name: "sort_by",
          title: "排序",
          type: "enumeration",
          description: "排序",
          enumOptions: [
            { title: "最多观看", value: "video_viewed" },
            { title: "近期最佳", value: "post_date_and_popularity" },
            { title: "最近更新", value: "post_date" },
            { title: "最多收藏", value: "most_favourited" },
          ],
        },
        { name: "from", title: "页码", type: "page", description: "页码", value: "1" },
      ],
    },
    // 标签模块
    {
      title: "标签",
      description: "标签",
      requiresWebView: false,
      functionName: "loadTag",
      cacheDuration: 3600,
      params: [
        {
          name: "tag",
          title: "标签",
          type: "input",
          description: "标签",
        },
        {
          name: "sort_by",
          title: "排序",
          type: "enumeration",
          description: "排序",
          enumOptions: [
            { title: "最多观看", value: "video_viewed" },
            { title: "近期最佳", value: "post_date_and_popularity" },
            { title: "最近更新", value: "post_date" },
            { title: "最多收藏", value: "most_favourited" },
          ],
        },
        { name: "from", title: "页码", type: "page", description: "页码", value: "1" },
      ],
    },
    // 类别模块
    {
      title: "类别",
      description: "类别",
      requiresWebView: false,
      functionName: "loadCategory",
      cacheDuration: 3600,
      params: [
        {
          name: "category",
          title: "类别",
          type: "enumeration",
          description: "类别",
          enumOptions: [
            { title: "无码", value: "uncensored" },
            { title: "FC2", value: "fc2" },
            { title: "剧情", value: "plot" },
            { title: "人妻", value: "creampie" },
            { title: "巨乳", value: "big-tits" },
            { title: "中文字幕", value: "chinese-subtitle" },
            { title: "美腿丝袜", value: "pantyhose" },
            { title: "近亲相奸", value: "incest" },
            { title: "强奸", value: "rape" },
            { title: "制服", value: "uniform" },
            { title: "女同", value: "lesbian" },
            { title: "熟女", value: "milf" },
            { title: "自拍", value: "selfie" },
            { title: "口交", value: "blowjob" },
            { title: "潮吹", value: "squirting" },
            { title: "群交", value: "orgy" },
            { title: "BDSM", value: "bdsm" },
            { title: "肛交", value: "anal" },
            { title: "颜射", value: "facial" },
            { title: "3P", value: "threesome" },
            { title: "素人", value: "amateur" },
            { title: "眼镜娘", value: "glasses" },
            { title: "偶像", value: "idol" },
            { title: "独家", value: "exclusive" },
            { title: "VR", value: "vr" },
          ],
        },
        {
          name: "sort_by",
          title: "排序",
          type: "enumeration",
          description: "排序",
          enumOptions: [
            { title: "最多观看", value: "video_viewed" },
            { title: "近期最佳", value: "post_date_and_popularity" },
            { title: "最近更新", value: "post_date" },
            { title: "最多收藏", value: "most_favourited" },
          ],
        },
        { name: "from", title: "页码", type: "page", description: "页码", value: "1" },
      ],
    },
  ],
};

function search(params) {
  const keyword = params.keyword;
  const sort_by = params.sort_by;
  const from = params.from;
  const url = `https://jable.tv/search/${keyword}/${from}/?sort_by=${sort_by}`;
  return getVideos(url);
}

function loadPage(params) {
  const category = params.category;
  const sort_by = params.sort_by;
  const from = params.from;
  let url = `https://jable.tv/${category}/${from}/?sort_by=${sort_by}`;
  if (category === "hot") {
    url = `https://jable.tv/${category}/?sort_by=${sort_by}&from=${from}`;
  }
  return getVideos(url);
}

function loadTag(params) {
  const tag = params.tag;
  const sort_by = params.sort_by;
  const from = params.from;
  const url = `https://jable.tv/tags/${tag}/${from}/?sort_by=${sort_by}`;
  return getVideos(url);
}

function loadCategory(params) {
  const category = params.category;
  const sort_by = params.sort_by;
  const from = params.from;
  const url = `https://jable.tv/categories/${category}/${from}/?sort_by=${sort_by}`;
  return getVideos(url);
}

async function getVideos(url) {
  const response = await Widget.http.get(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    },
  });
  const $ = Widget.html.load(response.data);
  const items = [];
  const list = $(".video-img-box");
  list.each((i, element) => {
    const item = $(element);
    const link = item.find("a").attr("href");
    const title = item.find(".title").text().trim();
    const cover = item.find("img").attr("data-src");
    const label = item.find(".label").text().trim();
    items.push({
      title: title,
      link: link,
      posterPath: cover,
      subTitle: label,
      type: "article",
      id: link,
    });
  });
  return items;
}

// ============================================================================
// 详情页解析 (关键修复位置)
// ============================================================================

async function loadDetail(link) {
  const response = await Widget.http.get(link, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    },
  });
  
  // 提取 HLS 地址
  const match = response.data.match(/var hlsUrl = '(.*?)';/);
  if (!match) {
    throw new Error("无法获取有效的HLS URL，可能需要登录或视频已失效");
  }
  const hlsUrl = match[1];
  
  const $ = Widget.html.load(response.data);
  let videoDuration = null;
  const durationElements = $('.absolute-bottom-right .label, .duration, [class*="duration"]');
  if (durationElements.length > 0) {
    videoDuration = durationElements.first().text().trim();
  }
  
  const item = {
    id: link,
    type: "detail",
    videoUrl: hlsUrl,
    mediaType: "movie",
    releaseDate: videoDuration,
    // ✅ 修复无声问题：使用 ijk 播放器
    playerType: "ijk", 
    customHeaders: {
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      // ✅ 优化：Referer 设为当前视频页地址
      "Referer": link, 
      "Origin": "https://jable.tv"
    }
  };
  
  const sections = [];
  const relatedVideos = [];
  const relatedVideoElements = $("#list_videos_common_videos_list .video-img-box");
  relatedVideoElements.each((i, element) => {
    const item = $(element);
    const link = item.find("a").attr("href");
    const title = item.find(".title").text().trim();
    const cover = item.find("img").attr("data-src");
    const label = item.find(".label").text().trim();
    relatedVideos.push({
      title: title,
      link: link,
      posterPath: cover,
      subTitle: label,
      type: "article",
      id: link,
    });
  });
  
  item.childItems = relatedVideos;
  return item;
}
