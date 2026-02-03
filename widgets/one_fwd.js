// One源测试 Forward 播放器模块
// 请在下方填入您的 token
let TOKEN = ""; // 请在此处填入您的 token

const UA = 'Dart/3.3';
const DEFAULT_HEADERS = {
  'Accept-Language': 'zh-CN,zh;q=0.9,zh-TW;q=0.8,en;q=0.7',
  'User-Agent': UA
};

const appConfig = {
  ver: 20250507,
  title: 'One源测试',
  site: 'https://vod.infiniteapi.com',
};

class WidgetAPI {
  async get(url, options) {
    const baseOptions = {
      headers: DEFAULT_HEADERS
    };
    const finalOptions = { ...baseOptions, ...options };
    
    try {
      const resp = await Widget.http.get(url, finalOptions);
      if (!resp || resp.statusCode !== 200) {
        throw new Error(`请求失败: ${resp?.statusCode || '未知错误'}`);
      }
      return resp.data;
    } catch (error) {
      throw new Error(`网络请求失败: ${error instanceof Error ? error.message : '未知错误'}`);
    }
  }
}

const widgetAPI = new WidgetAPI();

WidgetMetadata = {
  id: 'one-source-test',
  title: 'One',
  description: 'One-使用前请先填入Token\n在Telegram bot @Infinite_SyncNext_bot 中创建账号并获取token',
  version: '1.0.15',
  requiredVersion: '0.0.1',
  site: 'https://vod.infiniteapi.com',
  detailCacheDuration: 1,
  globalParams: [
    {
      name: "token",
      title: "Token",
      type: "input",
      placeholders: [
        {
          title: "Token",
          value: TOKEN,
        },
      ],
    },
  ],
  modules: [
    {
      id: 'one-source-list',
      title: 'One',
      description: 'One',
      cacheDuration: 3600,
      requiresWebView: false,
      functionName: 'getOneList',
      params: [
        {
          name: 'category',
          title: '分类',
          description: '视频分类',
          type: 'enumeration',
          value: '2',
          enumOptions: [
            {
              value: '2',
              title: '推荐'
            },
            {
              value: '40',
              title: '4K推荐'
            },
            {
              value: '3',
              title: '电影'
            },
            {
              value: '4',
              title: '电视剧'
            },
            {
              value: '5',
              title: '综艺'
            },
            {
              value: '6',
              title: '动漫'
            },
            {
              value: '95',
              title: '体育'
            },
            {
              value: '7',
              title: '纪录片'
            }
          ]
        },
        {
          name: 'page',
          title: '页码',
          type: 'page',
          value: '1'
        }
      ]
    },
    {
      id: "search",
      title: "搜索",
      functionName: "search",
      type: "search",
      params: [
        {
          name: 'keyword',
          title: '关键词',
          type: 'input',
          value: ''
        },
        {
          name: 'page',
          title: '页码',
          type: 'page',
          value: '1'
        }
      ],
    }
  ]
};
// 清洗 key：去掉“第x季”与结尾年份（20xx，可带“年”）
function normalizeTitleKey(originalKey) {
  let cleaned = (originalKey || "").toString();
  // 去掉括号内容：半角 () 与全角 （）
  cleaned = cleaned.replace(/\([^)]*\)/g, "");
  cleaned = cleaned.replace(/（[^）]*）/g, "");
  // 去掉“第x季”，x 支持阿拉伯数字与中文数字
  cleaned = cleaned.replace(/第\s*[0-9一二三四五六七八九十百千]+\s*季/g, "");
  // 去掉结尾年份：20xx，可选的“年”，以及两端空格
  cleaned = cleaned.replace(/\s*20\d{2}\s*年?$/g, "");
  // 压缩多余空白
  cleaned = cleaned.replace(/\s{2,}/g, " ");
  return cleaned.trim();
}
// 基础获取TMDB数据方法
async function fetchTmdbData(key, mediaType, year) {
  const cleanedKey = normalizeTitleKey(key);
  // console.log("TMDB 查询关键字:", { original: key, cleaned: cleanedKey });
  const tmdbResults = await Widget.tmdb.get(`/search/${mediaType}`, {
      params: {
          query: cleanedKey,
          language: "zh_CN",
          year: year
      }
  });
  //打印结果

  // console.log("tmdbResults:" + JSON.stringify(tmdbResults, null, 2));
  // console.log("tmdbResults.total_results:" + tmdbResults.total_results);
  // console.log("tmdbResults.results[0]:" + tmdbResults.results[0]);
  return tmdbResults.results;
}
async function search(params = {}) {
  try {
    const token = params.token || TOKEN;
    const keyword = params.keyword || '';
    const page = params.page || 1;
    const listUrl = `${appConfig.site}/${token}/one_vod?wd=${keyword}&ac=videolist&pg=${page}`;
    const listResponse = await Widget.http.get(listUrl, {
      headers: DEFAULT_HEADERS
    });
    const listData = listResponse.data;
 
    if (!listData) {
      return [];
    }

    // 解析XML格式的视频列表
    const videoMatches = listData.match(/<video>([\s\S]*?)<\/video>/g) || [];
    
    // console.log('找到的视频数量:', videoMatches.length);
    
    const items = await Promise.all(
      videoMatches.map(async (videoXml) => {
        const nameMatch = videoXml.match(/<name><!\[CDATA\[(.*?)\]\]><\/name>/);
        const idMatch = videoXml.match(/<id>(.*?)<\/id>/);
        const picMatch = videoXml.match(/<pic>(.*?)<\/pic>/);
        const type = videoXml.match(/<type>(.*?)<\/type>/);
        if (!idMatch) return null;
        const yearMatch = videoXml.match(/<year>(.*?)<\/year>/);
        const title = nameMatch ? nameMatch[1] : "";
        const tmdbDatas = await fetchTmdbData(title, type[1], yearMatch[1]);
        const tm = tmdbDatas && tmdbDatas[0] ? tmdbDatas[0] : {};

        return {
          id: idMatch[1],
          type: 'link',
          mediaType: type[1] === 'movie' ? 'movie' : 'tv',
          link: `${appConfig.site}/${token}/one_vod?ac=videolist&ids=${idMatch[1]}`,
          title: title,
          description: tm.overview || "",
          releaseDate: tm.release_date ?? tm.first_air_date,
          backdropPath: tm.backdrop_path || (picMatch ? picMatch[1] : ""),
          posterPath: tm.poster_path || (picMatch ? picMatch[1] : ""),
          rating: tm.vote_average
        };
      })
    );
    return items.filter(Boolean);

  } catch (error) {
    console.error('获取One源列表失败:', error);
    return [];
  }
}
async function getOneList(params = {}) {
  try {
    const token = params.token || TOKEN;
    const category = params.category || 'hot';
    const page = params.page || 1;
    
    if (!token) {
      throw new Error('需要填入token才能使用');
    }

    // 构建分类URL
    const listUrl = `${appConfig.site}/${token}/one_vod?t=${category}&ac=videolist&pg=${page}`;
    
    console.log('请求URL:', listUrl);
    
    const listResponse = await Widget.http.get(listUrl, {
      headers: DEFAULT_HEADERS
    });
    
    if (!listResponse || listResponse.statusCode !== 200) {
      throw new Error(`获取列表失败: ${listResponse?.statusCode || '未知错误'}`);
    }

    const listData = listResponse.data;
    
    // console.log('响应数据:', listData);
    
    if (!listData) {
      return [];
    }

    // 解析XML格式的视频列表
    const videoMatches = listData.match(/<video>([\s\S]*?)<\/video>/g) || [];
    
    // console.log('找到的视频数量:', videoMatches.length);
    
    const items = await Promise.all(
      videoMatches.map(async (videoXml) => {
        const nameMatch = videoXml.match(/<name><!\[CDATA\[(.*?)\]\]><\/name>/);
        const idMatch = videoXml.match(/<id>(.*?)<\/id>/);
        const picMatch = videoXml.match(/<pic>(.*?)<\/pic>/);
        const type = videoXml.match(/<type>(.*?)<\/type>/);
        if (!idMatch) return null;
        const yearMatch = videoXml.match(/<year>(.*?)<\/year>/);
        const title = nameMatch ? nameMatch[1] : "";
        const tmdbDatas = await fetchTmdbData(title, type[1], yearMatch[1]);
        const tm = tmdbDatas && tmdbDatas[0] ? tmdbDatas[0] : {};

        return {
          id: idMatch[1],
          type: 'link',
          mediaType: type[1] === 'movie' ? 'movie' : 'tv',
          link: `${appConfig.site}/${token}/one_vod?ac=videolist&ids=${idMatch[1]}`,
          title: title,
          description: tm.overview || "",
          releaseDate: tm.release_date ?? tm.first_air_date,
          backdropPath: tm.backdrop_path || (picMatch ? picMatch[1] : ""),
          posterPath: tm.poster_path || (picMatch ? picMatch[1] : ""),
          rating: tm.vote_average
        };
      })
    );
    return items.filter(Boolean);

  } catch (error) {
    console.error('获取One源列表失败:', error);
    return [];
  }
}

async function loadDetail(url) {
  try {
    const detailResponse = await Widget.http.get(url, {
      headers: DEFAULT_HEADERS
    });
    
    if (!detailResponse || detailResponse.statusCode !== 200) {
      throw new Error(`获取详情失败: ${detailResponse?.statusCode || '未知错误'}`);
    }

    const detailData = detailResponse.data;
    
    if (!detailData) {
      throw new Error('无法获取视频详情');
    }

    // 解析XML格式的播放数据
    const idMatch = detailData.match(/<id>(.*?)<\/id>/);
    const ddMatches = detailData.match(/<dd flag="">\s*<!\[CDATA\[(.*?)\]\]>\s*<\/dd>/g) || [];
    
    if (ddMatches.length === 0) {
      return null;
    }

    const firstMatch = ddMatches[0];
    const contentMatch = firstMatch.match(/<!\[CDATA\[(.*?)\]\]>/);
    
    if (!contentMatch) {
      return null;
    }

    // 先用 # 分割不同的集
    const episodes = contentMatch[1].split('#');
    
    // 判断是单集还是多集
    if (episodes.length === 1) {
      // 单集情况
      const [title, playUrl] = episodes[0].split('$');
      // const tmdbDatas = await fetchTmdbData(title, 'movie')
      // barkNotify(tmdbDatas[0].overview)
      return {
        id: idMatch[1],
        type: 'detail',
        mediaType: 'movie',
        link: url,
        title: title || 'One',
        rating: "5",  
        playerType: "app", 
        videoUrl: playUrl
      };
    } else {
      // 多集情况
      const episodeItems = episodes.map((episodeString, index) => {
        const [title, playUrl] = episodeString.split('$');
        return {
          id: idMatch[1]+'|'+index,
          link: url,
          type: 'detail',
          title: title || `第 ${index + 1} 集`,
          videoUrl: playUrl,
          mediaType: 'episode'
        };
      }).filter(item => item.videoUrl); // 过滤掉没有播放链接的项
      
      
      return {
        id: idMatch[1],
        type: 'detail',
        mediaType: 'tv',
        link: url,
        title:episodeItems[1]?.title || 'One视频',
        videoUrl: episodeItems[1]?.videoUrl,
        episodeItems: episodeItems,
        playerType: "app", 
        episode: episodeItems.length
      };
    }

  } catch (error) {
    console.error('加载详情失败:', error);
    return null;
  }
}