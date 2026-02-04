// JAVDB Forward 播放器模块
// 请在下方填入您的 token
let TOKEN = ""; // 请在此处填入您的 token

const UA = 'Dart/3.3';
const DEFAULT_HEADERS = {
  'Accept-Language': 'zh-CN,zh;q=0.9,zh-TW;q=0.8,en;q=0.7',
  'User-Agent': UA
};

const appConfig = {
  ver: 20250507,
  title: 'JAVDB',
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
  id: 'javdb-vod',
  title: 'JAVDB',
  description: 'JAVDB-使用前请先填入Token\n在Telegram bot @Infinite_SyncNext_bot 中创建账号并获取token',
  version: '1.0.2',
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
      id: 'javdb-vod.list',
      title: 'JAVDB',
      description: 'JAVDB',
      cacheDuration: 3600,
      requiresWebView: false,
      functionName: 'getJavdbList',
      params: [
        {
          name: 'category',
          title: '分类',
          description: '视频分类',
          type: 'enumeration',
          value: 'weekly',
          enumOptions: [
            {
              value: 'weekly',
              title: '每周双推'
            },
            {
              value: 'hot_daily',
              title: '高分日榜'
            },
            {
              value: 'hot_weekly',
              title: '高分周榜'
            },
            {
              value: 'hot_monthly',
              title: '高分月榜'
            },
            {
              value: 'Mosac_daily',
              title: '有码日榜'
            },
            {
              value: 'Mosac_weekly',
              title: '有码周榜'
            },
            {
              value: 'Mosac_monthly',
              title: '有码月榜'
            },
            {
              value: 'None_Mosac_daily',
              title: '无码日榜'
            },
            {
              value: 'None_Mosac_weekly',
              title: '无码周榜'
            },
            {
              value: 'None_Mosac_monthly',
              title: '无码月榜'
            },
            {
              value: 'US_daily',
              title: '欧美日榜'
            },
            {
              value: 'US_weekly',
              title: '欧美周榜'
            },
            {
              value: 'US_monthly',
              title: '欧美月榜'
            },
            {
              value: 'FC2_daily',
              title: 'FC2日榜'
            },
            {
              value: 'FC2_weekly',
              title: 'FC2周榜'
            },
            {
              value: 'FC2_monthly',
              title: 'FC2月榜'
            },
            {
              value: 'top250',
              title: 'TOP250'
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

async function search(params = {}) {
  try {
    const token = params.token || TOKEN;
    const keyword = params.keyword || '';
    const page = params.page || 1;
    const listUrl = `${appConfig.site}/${token}/javdb_vod?wd=${keyword}&ac=videolist&pg=${page}`;
    const listResponse = await Widget.http.get(listUrl, {
      headers: DEFAULT_HEADERS
    });
    const listData = listResponse.data;
    
    if (!listData) {
      return [];
    }

    // 解析XML格式的视频列表
    const videoMatches = listData.match(/<video>([\s\S]*?)<\/video>/g) || [];
    
    return videoMatches.map((videoXml) => {
      const nameMatch = videoXml.match(/<name><!\[CDATA\[(.*?)\]\]><\/name>/);
      const picMatch = videoXml.match(/<pic>(.*?)<\/pic>/);
      const bigpicMatch = videoXml.match(/<bigpic>(.*?)<\/bigpic>/);
      const idMatch = videoXml.match(/<id>(.*?)<\/id>/);
      
      return {
        id: idMatch ? idMatch[1] : "",
        type: 'link',
        mediaType: 'movie',
        link: `${appConfig.site}/${token}/javdb_vod?ids=${idMatch ? idMatch[1] : ""}`,
        title: nameMatch ? nameMatch[1] : "",
        backdropPath: bigpicMatch ? bigpicMatch[1] : "",
        posterPath: picMatch ? picMatch[1] : "",
        description: ""
      };
    }).filter(item => item.id);

  } catch (error) {
    console.error('获取JAVDB列表失败:', error);
    return [];
  }
}
async function getJavdbList(params = {}) {
  try {
    const token = params.token || TOKEN;
    const category = params.category || 'weekly';
    const page = params.page || 1;
    
    if (!token) {
      throw new Error('需要填入token才能使用');
    }
    console.log('ces');
    // 构建分类URL
    const listUrl = `${appConfig.site}/${token}/javdb_vod?t=${category}&ac=videolist&pg=${page}`;
    
    const listResponse = await Widget.http.get(listUrl, {
      headers: DEFAULT_HEADERS
    });
    
    if (!listResponse || listResponse.statusCode !== 200) {
      throw new Error(`获取列表失败: ${listResponse?.statusCode || '未知错误'}`);
    }

    const listData = listResponse.data;
    
    if (!listData) {
      return [];
    }

    // 解析XML格式的视频列表
    const videoMatches = listData.match(/<video>([\s\S]*?)<\/video>/g) || [];
    
    return videoMatches.map((videoXml) => {
      const nameMatch = videoXml.match(/<name><!\[CDATA\[(.*?)\]\]><\/name>/);
      const picMatch = videoXml.match(/<pic>(.*?)<\/pic>/);
      const bigpicMatch = videoXml.match(/<bigpic>(.*?)<\/bigpic>/);
      const idMatch = videoXml.match(/<id>(.*?)<\/id>/);
      
      return {
        id: idMatch ? idMatch[1] : "",
        type: 'link',
        mediaType: 'movie',
        link: `${appConfig.site}/${token}/javdb_vod?ids=${idMatch ? idMatch[1] : ""}`,
        title: nameMatch ? nameMatch[1] : "",
        backdropPath: bigpicMatch ? bigpicMatch[1] : "",
        posterPath: picMatch ? picMatch[1] : "",
        description: ""
      };
    }).filter(item => item.id);

  } catch (error) {
    console.error('获取JAVDB列表失败:', error);
    return [];
  }
}

async function loadDetail(url) {
  console.log('url:', url);
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
    const ddMatches = detailData.match(/<dd flag="">\s*<!\[CDATA\[(.*?)\]\]>\s*<\/dd>/g) || [];
    
    if (ddMatches.length === 0) {
      return null;
    }

    const firstMatch = ddMatches[0];
    const contentMatch = firstMatch.match(/<!\[CDATA\[(.*?)\]\]>/);
    
    if (!contentMatch) {
      return null;
    }

    const [title, playUrl] = contentMatch[1].split('$$');
    
    return {
      id: url,
      type: 'detail',
      mediaType: 'movie',
      link: url,
      title: title || 'JAVDB Video',
      playerType: "app", 
      videoUrl: playUrl
    };

  } catch (error) {
    console.error('加载JAVDB详情失败:', error);
    return null;
  }
}