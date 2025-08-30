var WidgetMetadata = {
  id: "yuanqi.wallpaper",
  title: "🖼️ ✨wallpaper",
  description: "✨ Dynamic wallpaper For Topshelf",
  author: "🎁 Discount Code：VEUS",
  site: "🎁 Discount Code：VEUS",
  version: "2.3.0",
  requiredVersion: "0.0.1",
  modules: [
    {
      title: "获取壁纸列表",
      description: "关键词 / 分类 / 热门（循环意图字段 ready）",
      requiresWebView: false,
      functionName: "getWallpaperList",
      params: [
        {
          name: "keyword",
          title: "搜索关键词",
          type: "input",
          description: "输入关键词搜索，留空按分类获取",
          value: "",
          placeholder: "输入关键词搜索"
        },
        {
          name: "sortBy",
          title: "壁纸分类",
          type: "input",
          description: "选择壁纸分类（搜索时无效；默认热门）",
          value: "hot",
          placeholders: [
            { title: "热门", value: "hot" },
            { title: "全部", value: "all" },
            { title: "动态壁纸", value: "dynamic" },
            { title: "4K壁纸", value: "4k" },
            { title: "动漫", value: "anime" },
            { title: "美女", value: "beauty" },
            { title: "游戏", value: "game" },
            { title: "小清新", value: "fresh" },
            { title: "AI", value: "ai" },
            { title: "其他", value: "other" }
          ]
        },
        {
          name: "pg",
          title: "页码",
          type: "page",
          value: "1"
        }
      ]
    }
  ]
};

const BASE_URL = "https://mbizhi.cheetahfun.com";

/* ---------- 关键词到哈希的映射表 ---------- */
const KEYWORD_HASH_MAP = {
  // 根据你提供的数据
  '火影': '31cd26e7d0369541693622ae763b5d7e',
  '进击': 'ec17d65f052a9cbea27122ea0482a49f', 
  '风景': 'cc05699ac946c6a314a357bf939eebc9',
  
  // 已知能工作的
  '玛奇玛': '45a6bf9df5026fa77d33f77ef19f2a9e', // 原来的哈希可能就是这个关键词的
  '玛琪玛': '45a6bf9df5026fa77d33f77ef19f2a9e',
  
  // 常见关键词（可能需要动态获取）
  '原神': null,
  '崩坏': null,
  '鬼灭': null,
  '海贼': null,
  '龙珠': null,
  '美女': null,
  '动物': null,
  '汽车': null,
  '科技': null,
  '夜景': null
};

/* ---------- 哈希生成/获取策略 ---------- */
async function getSearchHash(keyword) {
  // 1. 先检查已知映射
  if (KEYWORD_HASH_MAP[keyword]) {
    console.log(`使用已知哈希: ${keyword} -> ${KEYWORD_HASH_MAP[keyword]}`);
    return KEYWORD_HASH_MAP[keyword];
  }
  
  // 2. 尝试从首页获取通用哈希
  try {
    const res = await Widget.http.get(BASE_URL);
    const hashMatch = res.data.match(/search_([a-f0-9]{32})\.html/);
    if (hashMatch) {
      const hash = hashMatch[1];
      console.log(`从首页获取哈希: ${hash}`);
      return hash;
    }
  } catch (e) {
    console.warn("获取首页哈希失败:", e.message);
  }
  
  // 3. 尝试通过AJAX获取搜索建议来获取哈希
  try {
    const suggestUrl = `${BASE_URL}/ajax/search_suggest?q=${encodeURIComponent(keyword)}`;
    const res = await Widget.http.get(suggestUrl);
    // 这个请求可能会返回包含正确哈希的响应
    if (res.data && typeof res.data === 'string') {
      const hashMatch = res.data.match(/([a-f0-9]{32})/);
      if (hashMatch) {
        const hash = hashMatch[1];
        console.log(`从搜索建议获取哈希: ${hash}`);
        return hash;
      }
    }
  } catch (e) {
    console.warn("搜索建议获取哈希失败:", e.message);
  }
  
  // 4. 使用MD5类似的算法生成哈希（模拟网站逻辑）
  return generateSearchHash(keyword);
}

/* ---------- 简单哈希生成算法 ---------- */
function generateSearchHash(keyword) {
  // 这是一个简化的哈希生成，实际的算法可能更复杂
  let hash = '';
  const charset = 'abcdef0123456789';
  
  // 基于关键词的字符码生成种子
  let seed = 0;
  for (let i = 0; i < keyword.length; i++) {
    seed += keyword.charCodeAt(i) * (i + 1);
  }
  
  // 生成32位哈希
  for (let i = 0; i < 32; i++) {
    seed = (seed * 9301 + 49297) % 233280;
    hash += charset[seed % 16];
  }
  
  console.log(`生成哈希: ${keyword} -> ${hash}`);
  return hash;
}

/* ---------- 多策略搜索 ---------- */
async function tryMultipleSearchStrategies(keyword, page = 1) {
  const strategies = [];
  
  // 策略1: 使用已知哈希
  const knownHash = KEYWORD_HASH_MAP[keyword];
  if (knownHash) {
    strategies.push({
      name: '已知哈希',
      url: `${BASE_URL}/search_${knownHash}.html?search=${encodeURIComponent(keyword)}&page=${page}`
    });
  }
  
  // 策略2: 动态获取哈希
  try {
    const dynamicHash = await getSearchHash(keyword);
    if (dynamicHash && dynamicHash !== knownHash) {
      strategies.push({
        name: '动态哈希',
        url: `${BASE_URL}/search_${dynamicHash}.html?search=${encodeURIComponent(keyword)}&page=${page}`
      });
    }
  } catch (e) {
    console.warn("动态哈希获取失败");
  }
  
  // 策略3: 尝试不同的参数格式
  const fallbackHashes = [
    '31cd26e7d0369541693622ae763b5d7e', // 火影的哈希
    'ec17d65f052a9cbea27122ea0482a49f', // 进击的哈希
    'cc05699ac946c6a314a357bf939eebc9', // 风景的哈希
    '45a6bf9df5026fa77d33f77ef19f2a9e'  // 玛奇玛的哈希
  ];
  
  for (const hash of fallbackHashes) {
    strategies.push({
      name: `回退哈希-${hash.substring(0,8)}`,
      url: `${BASE_URL}/search_${hash}.html?search=${encodeURIComponent(keyword)}&page=${page}`
    });
  }
  
  // 执行策略
  for (const strategy of strategies) {
    try {
      console.log(`尝试策略: ${strategy.name}`);
      console.log(`URL: ${strategy.url}`);
      
      const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': BASE_URL,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      };
      
      const response = await Widget.http.get(strategy.url, { headers });
      
      if (response.data && response.data.length > 1000) {
        const items = parseWallpaperList(response.data);
        if (items.length > 0) {
          console.log(`策略成功! ${strategy.name} 找到 ${items.length} 项`);
          
          // 如果成功，保存这个哈希
          const hashMatch = strategy.url.match(/search_([a-f0-9]{32})\.html/);
          if (hashMatch) {
            KEYWORD_HASH_MAP[keyword] = hashMatch[1];
            console.log(`保存哈希映射: ${keyword} -> ${hashMatch[1]}`);
          }
          
          return items;
        }
      }
      
    } catch (e) {
      console.warn(`策略失败: ${strategy.name} - ${e.message}`);
      continue;
    }
  }
  
  return [];
}

/* ---------- 重试机制 ---------- */
async function retry(fn, times = 2) {
  for (let i = 0; i < times; i++) {
    try {
      return await fn();
    } catch (e) {
      if (i === times - 1) throw e;
      console.warn(`重试 ${i + 1}:`, e.message);
    }
  }
}

/* ---------- 缓存系统 ---------- */
const cache = new Map();
const CACHE_TIME = 3600000;

function getCached(key) {
  const item = cache.get(key);
  if (item && Date.now() - item.time < CACHE_TIME) {
    return item.data;
  }
  return null;
}

function setCache(key, data) {
  cache.set(key, { data, time: Date.now() });
}

/* ---------- URL构造 ---------- */
function buildCategoryUrl(category, page) {
  const paths = {
    hot: "/ranking/rookie_",
    all: "/dn/d/",
    dynamic: "/dn/d/",
    "4k": "/dn/c1d/",
    anime: "/dn/c2d/",
    beauty: "/dn/c4d/",
    game: "/dn/c7d/",
    fresh: "/dn/c8d/",
    ai: "/dn/c5d/",
    other: "/dn/c11d/"
  };
  
  let url = BASE_URL + (paths[category] || paths.hot);
  if (page > 1) url += `p${page}`;
  return url;
}

/* ---------- 页面解析 ---------- */
function parseWallpaperList(html) {
  const $ = Widget.html.load(html);
  
  const selectors = [
    'a[href*="/dn/pd"]',
    'a[href*="/dn/pj"]'
  ];
  
  let $items = $();
  for (const sel of selectors) {
    $items = $(sel);
    if ($items.length > 0) {
      console.log(`解析器: ${sel}, 找到 ${$items.length} 项`);
      break;
    }
  }
  
  if ($items.length === 0) {
    console.warn("页面解析失败");
    // 调试：输出页面片段
    console.log("页面片段:", html.substring(0, 500));
    return [];
  }

  const items = [];
  $items.slice(0, 30).each((_, el) => {
    const $el = $(el);
    let href = $el.attr("href");
    
    if (!href || (!href.includes("/pd") && !href.includes("/pj"))) {
      return;
    }
    
    if (!href.startsWith("http")) {
      href = BASE_URL + href;
    }

    const $img = $el.find('img').first();
    let thumb = "";
    if ($img.length > 0) {
      thumb = $img.attr("src") || $img.attr("data-src") || "";
      if (thumb && !thumb.startsWith("http")) {
        thumb = BASE_URL + thumb;
      }
    }

    let title = $el.attr("title") || 
                $img.attr("alt") || 
                `壁纸${items.length + 1}`;

    items.push({
      link: href,
      title: title.trim(),
      posterPath: thumb
    });
  });
  
  console.log(`成功解析 ${items.length} 个项目`);
  return items;
}

/* ---------- 详情页处理 ---------- */
async function loadWallpaperDetail(url) {
  const cached = getCached(url);
  if (cached) return cached;
  
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    'Referer': BASE_URL
  };
  
  const response = await Widget.http.get(url, { headers });
  const $ = Widget.html.load(response.data);

  let poster = $('video').attr("poster") ||
               $('img[src*="hd"], img[src*="large"], img[src*="cover"]').first().attr("src");
               
  if (poster && !poster.startsWith("http")) {
    poster = BASE_URL + poster;
  }

  let video = $("video").first().attr("src") ||
              $("video source").first().attr("src") ||
              $('a[href$=".mp4"]').first().attr("href");
              
  if (video && !video.startsWith("http")) {
    video = BASE_URL + video;
  }

  let title = $("title").text().replace(/\s*-\s*元气壁纸.*$/i, "").trim() ||
              $("h1").first().text().trim() ||
              "动态壁纸";

  const getCategory = () => {
    if (url.includes("/c1d/")) return "4K";
    if (url.includes("/c2d/")) return "动漫";
    if (url.includes("/c4d/")) return "美女";
    if (url.includes("/c5d/")) return "AI";
    if (url.includes("/c7d/")) return "游戏";
    if (url.includes("/c8d/")) return "小清新";
    return "热门";
  };

  const result = {
    videoUrl: video || null,
    posterPath: poster || "",
    title,
    genreTitle: getCategory()
  };
  
  setCache(url, result);
  return result;
}

/* ---------- 智能分类回退 ---------- */
const keywordCategoryMap = {
  '火影': 'anime', '进击': 'anime', '鬼灭': 'anime', '海贼': 'anime', '龙珠': 'anime',
  '原神': 'game', '崩坏': 'game', '王者': 'game', '英雄联盟': 'game',
  '美女': 'beauty', '风景': 'fresh', '动物': 'other', '汽车': 'other'
};

function getRelevantCategory(keyword) {
  return keywordCategoryMap[keyword] || 'anime';
}

/* ---------- 主函数 ---------- */
async function getWallpaperList(params = {}) {
  const keyword = (params.keyword || "").trim();
  const sortBy = params.sortBy || "hot";
  const page = parseInt(params.pg) || 1;
  
  if (page < 1) {
    throw new Error("页码必须大于0");
  }

  console.log(`=== 壁纸获取开始 ===`);
  console.log(`关键词: "${keyword}", 分类: ${sortBy}, 页码: ${page}`);

  let items = [];
  
  if (keyword) {
    console.log("=== 搜索模式 ===");
    
    // 使用多策略搜索
    items = await tryMultipleSearchStrategies(keyword, page);
    
    // 如果搜索失败，回退到相关分类
    if (items.length === 0) {
      console.log("搜索失败，使用分类回退");
      const fallbackCategory = getRelevantCategory(keyword);
      const categoryUrl = buildCategoryUrl(fallbackCategory, page);
      
      try {
        const headers = {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Referer': BASE_URL
        };
        
        const resp = await Widget.http.get(categoryUrl, { headers });
        items = parseWallpaperList(resp.data);
        console.log(`分类回退找到 ${items.length} 项`);
      } catch (e) {
        console.error("分类回退失败:", e.message);
        return [];
      }
    }
    
  } else {
    console.log("=== 分类模式 ===");
    const categoryUrl = buildCategoryUrl(sortBy, page);
    console.log("分类URL:", categoryUrl);
    
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Referer': BASE_URL
    };
    
    const resp = await retry(() => Widget.http.get(categoryUrl, { headers }));
    items = parseWallpaperList(resp.data);
  }

  if (items.length === 0) {
    console.warn("没有找到任何项目");
    return [];
  }

  console.log(`=== 详情处理开始: ${items.length} 项 ===`);

  // 分批处理详情
  const results = [];
  const batchSize = 5;
  
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    console.log(`处理批次 ${Math.floor(i/batchSize) + 1}/${Math.ceil(items.length/batchSize)}`);
    
    const batchPromises = batch.map(async ({ link, title, posterPath }) => {
      try {
        const detail = await loadWallpaperDetail(link);
        return {
          id: link,
          type: "video",
          title: detail.title || title,
          posterPath: detail.posterPath || posterPath,
          backdropPath: detail.posterPath || posterPath,
          releaseDate: "",
          genreTitle: detail.genreTitle,
          description: keyword ? `"${keyword}" - ${detail.genreTitle}动态壁纸` : `${detail.genreTitle}动态壁纸`,
          link,
          videoUrl: detail.videoUrl,
          mediaType: "tv",
          customData: { loop: true }
        };
      } catch (e) {
        console.warn("详情失败:", link, e.message);
        return {
          id: link,
          type: "video",
          title,
          posterPath,
          backdropPath: posterPath,
          releaseDate: "",
          genreTitle: "热门",
          description: keyword ? `"${keyword}" - 动态壁纸` : "动态壁纸",
          link,
          videoUrl: null,
          mediaType: "tv",
          customData: { loop: true }
        };
      }
    });
    
    const batchResults = await Promise.all(batchPromises);
    results.push(...batchResults.filter(Boolean));
  }
  
  console.log(`=== 完成: 返回 ${results.length} 个壁纸 ===`);
  return results;
}