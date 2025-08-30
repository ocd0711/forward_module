/**
 * 弹幕示例模块
 * 给 module 指定 type 为 danmu 后，默认会携带以下参数：
 * tmdbId: TMDB ID，Optional
 * type: 类型，tv | movie
 * title: 标题
 * season: 季，电影时为空
 * episode: 集，电影时为空
 * link: 链接，Optional
 * videoUrl: 视频链接，Optional
 * commentId: 弹幕ID，Optional。在搜索到弹幕列表后实际加载时会携带
 * animeId: 动漫ID，Optional。在搜索到动漫列表后实际加载时会携带
 *
 */
WidgetMetadata = {
  id: "forward.playurl.danmu",
  title: "手动链接弹幕",
  version: "1.0.8",
  requiredVersion: "0.0.2",
  description: "从指定播放链接和服务器获取弹幕【五折码：CHEAP.5;七折码：CHEAP】",
  author: "huangxd",
  site: "https://github.com/huangxd-/ForwardWidgets",
  globalParams: [
    {
      name: "danmu_server",
      title: "自定义服务器",
      type: "input",
      placeholders: [
        {
          title: "localhost",
          value: "http://127.0.0.1",
        },
        {
          title: "lyz05",
          value: "https://fc.lyz05.cn",
        },
        {
          title: "hls",
          value: "https://dmku.hls.one",
        },
        {
          title: "icu",
          value: "https://api.danmu.icu",
        },
        {
          title: "678",
          value: "https://se.678.ooo",
        },
        {
          title: "56uxi",
          value: "https://danmu.56uxi.com",
        },
        {
          title: "lxlad",
          value: "https://dm.lxlad.com",
        },
      ],
    },
  ],
  modules: [
    {
      //id需固定为searchDanmu
      id: "searchDanmu",
      title: "搜索弹幕",
      functionName: "searchDanmu",
      type: "danmu",
      params: [],
    },
    {
      //id需固定为getComments
      id: "getComments",
      title: "获取弹幕",
      functionName: "getCommentsById",
      type: "danmu",
      params: [],
    },
  ],
};

function printFirst200Chars(data) {
  let dataToPrint;

  if (typeof data === 'string') {
    dataToPrint = data;  // 如果是字符串，直接使用
  } else if (Array.isArray(data)) {
    dataToPrint = JSON.stringify(data);  // 如果是数组，转为字符串
  } else if (typeof data === 'object') {
    dataToPrint = JSON.stringify(data);  // 如果是对象，转为字符串
  } else {
    console.error("Unsupported data type");
    return;
  }

  console.log(dataToPrint.slice(0, 200));  // 打印前200个字符
}

async function searchDanmu(params) {
  const { tmdbId, type, title, season, link, videoUrl, danmu_server } = params;

  return {
    animes: [
    {
      "animeId": 1223,
      "bangumiId": "string",
      "animeTitle": title,
      "type": "tvseries",
      "typeDescription": "string",
      "imageUrl": "string",
      "startDate": "2025-08-08T13:25:11.189Z",
      "episodeCount": 12,
      "rating": 0,
      "isFavorited": true
    }],
  };
}

async function getDetailById(params) {
  const { danmu_server, animeId } = params;

  return [
      {
        "seasonId": "string",
        "episodeId": 1,
        "episodeTitle": "episode",
        "episodeNumber": "string",
        "lastWatched": "2025-08-08T13:26:42.844Z",
        "airDate": "2025-08-08T13:26:42.844Z"
      }
    ];
}

function generateDanmaku(message, count) {
  const comments = [];
  const baseP = "1,1,25,16777215,1754803089,0,0,26732601000067074,1"; // 原始 p 字符串

  for (let i = 0; i < count; i++) {
    // 增加 cid
    const cid = i;

    // 修改 p 的第一位数字，加 5
    const pParts = baseP.split(',');
    pParts[0] = (parseInt(pParts[0], 10) + i * 5).toString(); // 每次增加 i * 5
    const updatedP = pParts.join(',');

    // 使用传入的 m 参数
    const m = message;

    // 生成每个弹幕对象
    comments.push({
      cid: cid,
      p: updatedP,
      m: m
    });
  }

  return {
    count: comments.length,
    comments: comments
  };
}

async function convertMobileToPcUrl(url) {
    /**
     * 将移动端页面 URL 转换为 PC 端页面 URL。
     * 支持爱奇艺、腾讯视频、优酷、芒果TV和哔哩哔哩。
     * @param {string} url - 移动端 URL
     * @returns {string} - PC 端 URL（匹配成功）、错误信息（匹配但解析失败）或原链接（不匹配）
     */

    // 爱奇艺 (iQIYI)
    if (url.includes('m.iqiyi.com')) {
        // 移动端示例: https://m.iqiyi.com/v_1ftv9n1m3bg.html
        // PC 端示例: https://www.iqiyi.com/v_1ftv9n1m3bg.html
        return url.replace('m.iqiyi.com', 'www.iqiyi.com');
    }

    // 腾讯视频 (Tencent Video)
    if (url.includes('m.v.qq.com')) {
        // 移动端示例: https://m.v.qq.com/x/m/play?cid=53q0eh78q97e4d1&vid=x00174aq5no&ptag=hippySearch&pageType=long
        // PC 端示例: https://v.qq.com/x/cover/53q0eh78q97e4d1/x00174aq5no.html
        const cidMatch = url.match(/cid=([a-zA-Z0-9]+)/);
        const vidMatch = url.match(/vid=([a-zA-Z0-9]+)/);
        if (cidMatch && vidMatch) {
            const cid = cidMatch[1];
            const vid = vidMatch[1];
            return `https://v.qq.com/x/cover/${cid}/${vid}.html`;
        } else if (vidMatch) {
            const vid = vidMatch[1];
            return `https://v.qq.com/x/page/${vid}.html`;
        }
        return "无法解析腾讯视频移动端 URL";
    }

    // 优酷 (Youku)
    if (url.includes('m.youku.com')) {
        // 移动端示例: https://m.youku.com/alipay_video/id_cbff0b0703e54d659628.html?spm=a2hww.12518357.drawer4.2
        // PC 端示例: https://v.youku.com/v_show/id_cbff0b0703e54d659628.html

        // 获取重定向location
        const response = await Widget.http.get(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            },
        });

        const regex = /https:\/\/v\.youku\.com\/v_show\/id_[A-Za-z0-9=]+\.html/g;
        const matches = response.data.match(regex); // 找到所有匹配的链接
        if (matches) {
            return matches[0];
        }

        return "无法解析优酷移动端 URL";
    }

    // 芒果TV (Mango TV)
    if (url.includes('m.mgtv.com')) {
        // 移动端示例: https://m.mgtv.com/b/771610/23300622.html?fpa=0&fpos=0
        // PC 端示例: https://www.mgtv.com/b/771610/23300622.html
        return url.replace('m.mgtv.com', 'www.mgtv.com').replace(/\?.*$/, '');
    }

    // 哔哩哔哩 (Bilibili)
    if (url.includes('m.bilibili.com')) {
        // 移动端示例: https://m.bilibili.com/bangumi/play/ep1231564
        // PC 端示例: https://www.bilibili.com/bangumi/play/ep1231564
        return url.replace('m.bilibili.com', 'www.bilibili.com');
    }

    // 不匹配任何支持的平台，直接返回原链接
    return url;
}

// md5.js 本地版本
function md5(message) {
  // --- UTF-8 转换 ---
  function toUtf8(str) {
    let utf8 = "";
    for (let i = 0; i < str.length; i++) {
      const charCode = str.charCodeAt(i);
      if (charCode < 0x80) {
        utf8 += String.fromCharCode(charCode);
      } else if (charCode < 0x800) {
        utf8 += String.fromCharCode(0xc0 | (charCode >> 6));
        utf8 += String.fromCharCode(0x80 | (charCode & 0x3f));
      } else {
        utf8 += String.fromCharCode(0xe0 | (charCode >> 12));
        utf8 += String.fromCharCode(0x80 | ((charCode >> 6) & 0x3f));
        utf8 += String.fromCharCode(0x80 | (charCode & 0x3f));
      }
    }
    return utf8;
  }

  message = toUtf8(message);

  function rotateLeft(lValue, iShiftBits) {
    return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
  }

  function addUnsigned(lX, lY) {
    const lX4 = lX & 0x40000000;
    const lY4 = lY & 0x40000000;
    const lX8 = lX & 0x80000000;
    const lY8 = lY & 0x80000000;
    const lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
    if (lX4 & lY4) return lResult ^ 0x80000000 ^ lX8 ^ lY8;
    if (lX4 | lY4) {
      if (lResult & 0x40000000) return lResult ^ 0xC0000000 ^ lX8 ^ lY8;
      else return lResult ^ 0x40000000 ^ lX8 ^ lY8;
    } else return lResult ^ lX8 ^ lY8;
  }

  function F(x, y, z) { return (x & y) | (~x & z); }
  function G(x, y, z) { return (x & z) | (y & ~z); }
  function H(x, y, z) { return x ^ y ^ z; }
  function I(x, y, z) { return y ^ (x | ~z); }

  function FF(a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  }

  function GG(a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  }

  function HH(a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  }

  function II(a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  }

  function convertToWordArray(str) {
    const lMessageLength = str.length;
    const lNumberOfWords = (((lMessageLength + 8) >>> 6) + 1) * 16;
    const lWordArray = new Array(lNumberOfWords).fill(0);
    for (let i = 0; i < lMessageLength; i++) {
      lWordArray[i >> 2] |= str.charCodeAt(i) << ((i % 4) * 8);
    }
    lWordArray[lMessageLength >> 2] |= 0x80 << ((lMessageLength % 4) * 8);
    lWordArray[lNumberOfWords - 2] = lMessageLength * 8;
    return lWordArray;
  }

  function wordToHex(lValue) {
    let wordToHexValue = "";
    for (let lCount = 0; lCount <= 3; lCount++) {
      const lByte = (lValue >>> (lCount * 8)) & 255;
      let wordToHexValueTemp = "0" + lByte.toString(16);
      wordToHexValue += wordToHexValueTemp.substr(wordToHexValueTemp.length - 2, 2);
    }
    return wordToHexValue;
  }

  let x = convertToWordArray(message);
  let a = 0x67452301;
  let b = 0xEFCDAB89;
  let c = 0x98BADCFE;
  let d = 0x10325476;

  for (let k = 0; k < x.length; k += 16) {
    let AA = a, BB = b, CC = c, DD = d;

    // --- Round 1 ---
    a = FF(a, b, c, d, x[k + 0], 7, 0xD76AA478);
    d = FF(d, a, b, c, x[k + 1], 12, 0xE8C7B756);
    c = FF(c, d, a, b, x[k + 2], 17, 0x242070DB);
    b = FF(b, c, d, a, x[k + 3], 22, 0xC1BDCEEE);
    a = FF(a, b, c, d, x[k + 4], 7, 0xF57C0FAF);
    d = FF(d, a, b, c, x[k + 5], 12, 0x4787C62A);
    c = FF(c, d, a, b, x[k + 6], 17, 0xA8304613);
    b = FF(b, c, d, a, x[k + 7], 22, 0xFD469501);
    a = FF(a, b, c, d, x[k + 8], 7, 0x698098D8);
    d = FF(d, a, b, c, x[k + 9], 12, 0x8B44F7AF);
    c = FF(c, d, a, b, x[k + 10], 17, 0xFFFF5BB1);
    b = FF(b, c, d, a, x[k + 11], 22, 0x895CD7BE);
    a = FF(a, b, c, d, x[k + 12], 7, 0x6B901122);
    d = FF(d, a, b, c, x[k + 13], 12, 0xFD987193);
    c = FF(c, d, a, b, x[k + 14], 17, 0xA679438E);
    b = FF(b, c, d, a, x[k + 15], 22, 0x49B40821);

    // --- Round 2 ---
    a = GG(a, b, c, d, x[k + 1], 5, 0xF61E2562);
    d = GG(d, a, b, c, x[k + 6], 9, 0xC040B340);
    c = GG(c, d, a, b, x[k + 11], 14, 0x265E5A51);
    b = GG(b, c, d, a, x[k + 0], 20, 0xE9B6C7AA);
    a = GG(a, b, c, d, x[k + 5], 5, 0xD62F105D);
    d = GG(d, a, b, c, x[k + 10], 9, 0x02441453);
    c = GG(c, d, a, b, x[k + 15], 14, 0xD8A1E681);
    b = GG(b, c, d, a, x[k + 4], 20, 0xE7D3FBC8);
    a = GG(a, b, c, d, x[k + 9], 5, 0x21E1CDE6);
    d = GG(d, a, b, c, x[k + 14], 9, 0xC33707D6);
    c = GG(c, d, a, b, x[k + 3], 14, 0xF4D50D87);
    b = GG(b, c, d, a, x[k + 8], 20, 0x455A14ED);
    a = GG(a, b, c, d, x[k + 13], 5, 0xA9E3E905);
    d = GG(d, a, b, c, x[k + 2], 9, 0xFCEFA3F8);
    c = GG(c, d, a, b, x[k + 7], 14, 0x676F02D9);
    b = GG(b, c, d, a, x[k + 12], 20, 0x8D2A4C8A);

    // --- Round 3 ---
    a = HH(a, b, c, d, x[k + 5], 4, 0xFFFA3942);
    d = HH(d, a, b, c, x[k + 8], 11, 0x8771F681);
    c = HH(c, d, a, b, x[k + 11], 16, 0x6D9D6122);
    b = HH(b, c, d, a, x[k + 14], 23, 0xFDE5380C);
    a = HH(a, b, c, d, x[k + 1], 4, 0xA4BEEA44);
    d = HH(d, a, b, c, x[k + 4], 11, 0x4BDECFA9);
    c = HH(c, d, a, b, x[k + 7], 16, 0xF6BB4B60);
    b = HH(b, c, d, a, x[k + 10], 23, 0xBEBFBC70);
    a = HH(a, b, c, d, x[k + 13], 4, 0x289B7EC6);
    d = HH(d, a, b, c, x[k + 0], 11, 0xEAA127FA);
    c = HH(c, d, a, b, x[k + 3], 16, 0xD4EF3085);
    b = HH(b, c, d, a, x[k + 6], 23, 0x04881D05);
    a = HH(a, b, c, d, x[k + 9], 4, 0xD9D4D039);
    d = HH(d, a, b, c, x[k + 12], 11, 0xE6DB99E5);
    c = HH(c, d, a, b, x[k + 15], 16, 0x1FA27CF8);
    b = HH(b, c, d, a, x[k + 2], 23, 0xC4AC5665);

    // --- Round 4 ---
    a = II(a, b, c, d, x[k + 0], 6, 0xF4292244);
    d = II(d, a, b, c, x[k + 7], 10, 0x432AFF97);
    c = II(c, d, a, b, x[k + 14], 15, 0xAB9423A7);
    b = II(b, c, d, a, x[k + 5], 21, 0xFC93A039);
    a = II(a, b, c, d, x[k + 12], 6, 0x655B59C3);
    d = II(d, a, b, c, x[k + 3], 10, 0x8F0CCC92);
    c = II(c, d, a, b, x[k + 10], 15, 0xFFEFF47D);
    b = II(b, c, d, a, x[k + 1], 21, 0x85845DD1);
    a = II(a, b, c, d, x[k + 8], 6, 0x6FA87E4F);
    d = II(d, a, b, c, x[k + 15], 10, 0xFE2CE6E0);
    c = II(c, d, a, b, x[k + 6], 15, 0xA3014314);
    b = II(b, c, d, a, x[k + 13], 21, 0x4E0811A1);
    a = II(a, b, c, d, x[k + 4], 6, 0xF7537E82);
    d = II(d, a, b, c, x[k + 11], 10, 0xBD3AF235);
    c = II(c, d, a, b, x[k + 2], 15, 0x2AD7D2BB);
    b = II(b, c, d, a, x[k + 9], 21, 0xEB86D391);

    a = addUnsigned(a, AA);
    b = addUnsigned(b, BB);
    c = addUnsigned(c, CC);
    d = addUnsigned(d, DD);
  }

  return (wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d)).toLowerCase();
}

function escapeXmlText(str) {
  return str.replace(/[<>&"']/g, function (c) {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '"': return '&quot;';
      case "'": return '&apos;';
    }
  });
}

function fixDTagContent(xmlStr) {
  return xmlStr.replace(/(<d [^>]*>)([\s\S]*?)(<\/d>)/g, function (match, startTag, textContent, endTag) {
    return startTag + escapeXmlText(textContent) + endTag;
  });
}

function buildQueryString(params) {
  let queryString = '';

  // 遍历 params 对象的每个属性
  for (let key in params) {
    if (params.hasOwnProperty(key)) {
      // 如果 queryString 已经有参数了，则添加 '&'
      if (queryString.length > 0) {
        queryString += '&';
      }

      // 将 key 和 value 使用 encodeURIComponent 编码，并拼接成查询字符串
      queryString += encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
    }
  }

  return queryString;
}

function time_to_second(time) {
  const parts = time.split(":").map(Number);
  let seconds = 0;
  if (parts.length === 3) {
    seconds = parts[0] * 3600 + parts[1] * 60 + parts[2];
  } else if (parts.length === 2) {
    seconds = parts[0] * 60 + parts[1];
  } else {
    seconds = parts[0];
  }
  return seconds;
}

function convertToDanmakuXML(contents) {
  let xml = '<?xml version="1.0" encoding="utf-8"?><i>';
  for (const content of contents) {
    const attributes = [
      content.timepoint,
      content.ct,
      content.size,
      content.color,
      content.unixtime,
      '0',
      content.uid,
      '26732601000067074',
      '1'
    ].join(',');
    xml += `<d p="${attributes}">${content.content}</d>`;
  }
  xml += '</i>';
  return xml;
}

async function fetchLocalhost(inputUrl) {
    console.log("开始从本地请求弹幕...", inputUrl);
    if (inputUrl.includes('.qq.com')) {
        return fetchTencentVideo(inputUrl);
    }
    if (inputUrl.includes('.iqiyi.com')) {
        return fetchIqiyi(inputUrl);
    }
    if (inputUrl.includes('.mgtv.com')) {
        return fetchMangoTV(inputUrl);
    }
    if (inputUrl.includes('.bilibili.com')) {
        return fetchBilibili(inputUrl);
    }
    if (inputUrl.includes('.youku.com')) {
        return fetchYouku(inputUrl);
    }
    return null;
}

async function fetchTencentVideo(inputUrl) {
  console.log("开始从本地请求腾讯视频弹幕...", inputUrl);

  // 弹幕 API 基础地址
  const api_danmaku_base = "https://dm.video.qq.com/barrage/base/";
  const api_danmaku_segment = "https://dm.video.qq.com/barrage/segment/";

  // 解析 URL 获取 vid
  let vid;
  // 1. 尝试从查询参数中提取 vid
  const queryMatch = inputUrl.match(/[?&]vid=([^&]+)/);
  if (queryMatch) {
    vid = queryMatch[1]; // 获取 vid 参数值
  } else {
    // 2. 从路径末尾提取 vid
    const pathParts = inputUrl.split('/');
    const lastPart = pathParts[pathParts.length - 1];
    vid = lastPart.split('.')[0]; // 去除文件扩展名
  }

  console.log("vid:", vid);

  // 获取页面标题
  let res;
  try {
    res = await Widget.http.get(inputUrl, {
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });
  } catch (error) {
    console.error("请求页面失败:", error);
    return null;
  }

  // 使用正则表达式提取 <title> 标签内容
  const titleMatch = res.data.match(/<title[^>]*>(.*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].split("_")[0] : "未知标题";
  console.log("标题:", title);

  // 获取弹幕基础数据
  try {
    res = await Widget.http.get(api_danmaku_base + vid, {
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });
  } catch (error) {
    if (error.response?.status === 404) {
      return null;
    }
    console.error("请求弹幕基础数据失败:", error);
    return null;
  }

  // 先把 res.data 转成 JSON
  const data = typeof res.data === "string" ? JSON.parse(res.data) : res.data;

  // 获取弹幕分段数据
  const promises = [];
  const segmentList = Object.values(data.segment_index);
  for (const item of segmentList) {
    promises.push(
      Widget.http.get(`${api_danmaku_segment}${vid}/${item.segment_name}`, {
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        },
      })
    );
  }

  console.log("弹幕分段数量:", promises.length);

  // 解析弹幕数据
  let contents = [];
  try {
    const results = await Promise.allSettled(promises);
    const datas = results
      .filter(result => result.status === "fulfilled")
      .map(result => result.value.data);

    for (let data of datas) {
      data = typeof data === "string" ? JSON.parse(data) : data;
      for (const item of data.barrage_list) {
        const content = {
            timepoint: 0,	// 弹幕发送时间（秒）
            ct: 1,	// 弹幕类型，1-3 为滚动弹幕、4 为底部、5 为顶端、6 为逆向、7 为精确、8 为高级
            size: 25,	//字体大小，25 为中，18 为小
            color: 16777215,	//弹幕颜色，RGB 颜色转为十进制后的值，16777215 为白色
            unixtime: Math.floor(Date.now() / 1000),	//Unix 时间戳格式
            uid: 0,		//发送人的 id
            content: "",
        };
        content.timepoint = item.time_offset / 1000;
        if (item.content_style?.color) {
          console.log("弹幕颜色:", JSON.stringify(item.content_style.color));
        }
        content.content = item.content;
        contents.push(content);
      }
    }
  } catch (error) {
    console.error("解析弹幕数据失败:", error);
    return null;
  }

  printFirst200Chars(contents);

  // 返回结果
  return convertToDanmakuXML(contents);
}

async function fetchIqiyi(inputUrl) {
  console.log("开始从本地请求爱奇艺弹幕...", inputUrl);

  // 弹幕 API 基础地址
  const api_decode_base = "https://pcw-api.iq.com/api/decode/";
  const api_video_info = "https://pcw-api.iqiyi.com/video/video/baseinfo/";
  const api_danmaku_base = "https://cmts.iqiyi.com/bullet/";

  // 解析 URL 获取 tvid
  let tvid;
  try {
    const idMatch = inputUrl.match(/v_(\w+)/);
    if (!idMatch) {
      console.error("无法从 URL 中提取 tvid");
      return null;
    }
    tvid = idMatch[1];
    console.log("tvid:", tvid);

    // 获取 tvid 的解码信息
    const decodeUrl = `${api_decode_base}${tvid}?platformId=3&modeCode=intl&langCode=sg`;
    let res = await Widget.http.get(decodeUrl, {
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });
    const data = typeof res.data === "string" ? JSON.parse(res.data) : res.data;
    tvid = data.data.toString();
    console.log("解码后 tvid:", tvid);
  } catch (error) {
    console.error("请求解码信息失败:", error);
    return null;
  }

  // 获取视频基础信息
  let title, duration, albumid, categoryid;
  try {
    const videoInfoUrl = `${api_video_info}${tvid}`;
    const res = await Widget.http.get(videoInfoUrl, {
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });
    const data = typeof res.data === "string" ? JSON.parse(res.data) : res.data;
    const videoInfo = data.data;
    title = videoInfo.name || videoInfo.tvName || "未知标题";
    duration = videoInfo.durationSec;
    albumid = videoInfo.albumId;
    categoryid = videoInfo.channelId || videoInfo.categoryId;
    console.log("标题:", title, "时长:", duration);
  } catch (error) {
    console.error("请求视频基础信息失败:", error);
    return null;
  }

  // 计算弹幕分段数量（每5分钟一个分段）
  const page = Math.ceil(duration / (60 * 5));
  console.log("弹幕分段数量:", page);

  // 构建弹幕请求
  const promises = [];
  for (let i = 0; i < page; i++) {
    const params = {
        rn: "0.0123456789123456",
        business: "danmu",
        is_iqiyi: "true",
        is_video_page: "true",
        tvid: tvid,
        albumid: albumid,
        categoryid: categoryid,
        qypid: "01010021010000000000",
    };
    let queryParams = buildQueryString(params);
    const api_url = `${api_danmaku_base}${tvid.slice(-4, -2)}/${tvid.slice(-2)}/${tvid}_300_${i + 1}.z?${queryParams.toString()}`;
    promises.push(
        // fetch(api_url, {
        //     method: 'GET',
        //     headers: {
        //         "Content-Type": "application/json",
        //         "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        //     }
        // })
        // .then(async response => {
        //     if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        //     return response.arrayBuffer();
        // })
        // .catch(err => {
        //     console.error(`Fetch error for ${api_url}:`, err);
        //     return null;
        // })
        Widget.http.get(`https://zlib-decompress.hxd.ip-ddns.com/?url=${api_url}`, {
          headers: {
            "Accpet-Encoding": "gzip",
            "Content-Type": "application/xml",
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
          },
        })
    );
  }

  // 提取 XML 标签内容的辅助函数
  function extract(xml, tag) {
      const reg = new RegExp(`<${tag}>(.*?)</${tag}>`, "g");
      const res = xml.match(reg)?.map((x) => x.substring(tag.length + 2, x.length - tag.length - 3));
      return res || [];
  }

  // 解析弹幕数据
  let contents = [];
  try {
    const results = await Promise.allSettled(promises);
    const datas = results
        .filter((result) => result.status === "fulfilled")
        .map((result) => result.value);

    for (let data of datas) {
        console.log("piece data: ", printFirst200Chars(data));
        let xml;
        // 检查数据是否需要解压
        if (data instanceof ArrayBuffer || data instanceof Uint8Array) {
            // 使用 DecompressionStream 解压 zlib 数据
            const ds = new DecompressionStream("deflate"); // 修改为 zlib 的解压格式
            const stream = new Blob([data]).stream(); // 将 ArrayBuffer 或 Uint8Array 转换为 Blob 并创建流
            const decompressedStream = stream.pipeThrough(ds); // 解压流
            const reader = decompressedStream.getReader();

            let result = "";
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                result += new TextDecoder().decode(value); // 将解压的数据解码为文本
            }
            xml = result;
        } else {
            // 如果数据已经是字符串，直接使用
            console.log("数据是未压缩的字符串，直接使用");
            xml = data.data;
        }

        // 解析 XML 数据
        const danmaku = extract(xml, "content");
        const showTime = extract(xml, "showTime");
        const color = extract(xml, "color");
        const step = Math.ceil(danmaku.length * datas.length / 10000);

        for (let i = 0; i < danmaku.length; i += step) {
            const content = {
                timepoint: 0,	// 弹幕发送时间（秒）
                ct: 1,	// 弹幕类型，1-3 为滚动弹幕、4 为底部、5 为顶端、6 为逆向、7 为精确、8 为高级
                size: 25,	//字体大小，25 为中，18 为小
                color: 16777215,	//弹幕颜色，RGB 颜色转为十进制后的值，16777215 为白色
                unixtime: Math.floor(Date.now() / 1000),	//Unix 时间戳格式
                uid: 0,		//发送人的 id
                content: "",
            };
            content.timepoint = parseFloat(showTime[i]);
            content.color = parseInt(color[i], 16);
            content.content = danmaku[i];
            content.size = 25;
            contents.push(content);
        }
    }
  } catch (error) {
      console.error("解析弹幕数据失败:", error);
      return null;
  }

  printFirst200Chars(contents);

  // 返回结果
  return convertToDanmakuXML(contents);
}

async function fetchMangoTV(inputUrl) {
  console.log("开始从本地请求芒果TV弹幕...", inputUrl);

  // 弹幕和视频信息 API 基础地址
  const api_video_info = "https://pcweb.api.mgtv.com/video/info";
  const api_danmaku = "https://galaxy.bz.mgtv.com/rdbarrage";

  // 解析 URL 获取 cid 和 vid
  // 手动解析 URL（没有 URL 对象的情况下）
  const regex = /^(https?:\/\/[^\/]+)(\/[^?#]*)/;
  const match = inputUrl.match(regex);

  let path;
  if (match) {
    path = match[2].split('/').filter(Boolean);  // 分割路径并去掉空字符串
    console.log(path);
  } else {
    console.error('Invalid URL');
    return null;
  }
  const cid = path[path.length - 2];
  const vid = path[path.length - 1].split(".")[0];

  console.log("cid:", cid, "vid:", vid);

  // 获取页面标题和视频时长
  let res;
  try {
    const videoInfoUrl = `${api_video_info}?cid=${cid}&vid=${vid}`;
    res = await Widget.http.get(videoInfoUrl, {
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });
  } catch (error) {
    console.error("请求视频信息失败:", error);
    return null;
  }

  const data = typeof res.data === "string" ? JSON.parse(res.data) : res.data;
  const title = data.data.info.videoName;
  const time = data.data.info.time;
  console.log("标题:", title);

  // 计算弹幕分段请求
  const step = 60 * 1000; // 每60秒一个分段
  const end_time = time_to_second(time) * 1000; // 将视频时长转换为毫秒
  const promises = [];
  for (let i = 0; i < end_time; i += step) {
    const danmakuUrl = `${api_danmaku}?vid=${vid}&cid=${cid}&time=${i}`;
    promises.push(
      Widget.http.get(danmakuUrl, {
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        },
      })
    );
  }

  console.log("弹幕分段数量:", promises.length);

  // 解析弹幕数据
  let contents = [];
  try {
    const results = await Promise.allSettled(promises);
    const datas = results
      .filter(result => result.status === "fulfilled")
      .map(result => result.value.data);

    for (const data of datas) {
      const dataJson = typeof data === "string" ? JSON.parse(data) : data;
      if (!dataJson.data.items) continue;
      for (const item of dataJson.data.items) {
        const content = {
            timepoint: 0,	// 弹幕发送时间（秒）
            ct: 1,	// 弹幕类型，1-3 为滚动弹幕、4 为底部、5 为顶端、6 为逆向、7 为精确、8 为高级
            size: 25,	//字体大小，25 为中，18 为小
            color: 16777215,	//弹幕颜色，RGB 颜色转为十进制后的值，16777215 为白色
            unixtime: Math.floor(Date.now() / 1000),	//Unix 时间戳格式
            uid: 0,		//发送人的 id
            content: "",
        };
        content.timepoint = item.time / 1000;
        content.content = item.content;
        content.uid = item.uid;
        contents.push(content);
      }
    }
  } catch (error) {
    console.error("解析弹幕数据失败:", error);
    return null;
  }

  printFirst200Chars(contents);

  // 返回结果
  return convertToDanmakuXML(contents);
}

async function fetchBilibili(inputUrl) {
  console.log("开始从本地请求B站弹幕...", inputUrl);

  // 弹幕和视频信息 API 基础地址
  const api_video_info = "https://api.bilibili.com/x/web-interface/view";
  const api_epid_cid = "https://api.bilibili.com/pgc/view/web/season";

  // 解析 URL 获取必要参数
  // 手动解析 URL（没有 URL 对象的情况下）
  const regex = /^(https?:\/\/[^\/]+)(\/[^?#]*)/;
  const match = inputUrl.match(regex);

  let path;
  if (match) {
    path = match[2].split('/').filter(Boolean);  // 分割路径并去掉空字符串
    path.unshift("");
    console.log(path);
  } else {
    console.error('Invalid URL');
    return null;
  }

  let title, danmakuUrl;

  // 普通投稿视频
  if (inputUrl.includes("video/")) {
    try {
      // 获取查询字符串部分（从 `?` 开始的部分）
      const queryString = inputUrl.split('?')[1];

      // 如果查询字符串存在，则查找参数 p
      let p = 1; // 默认值为 1
      if (queryString) {
          const params = queryString.split('&'); // 按 `&` 分割多个参数
          for (let param of params) {
            const [key, value] = param.split('='); // 分割每个参数的键值对
            if (key === 'p') {
              p = value || 1; // 如果找到 p，使用它的值，否则使用默认值
            }
          }
      }
      console.log("p: ", p);

      let videoInfoUrl;
      if (inputUrl.includes("BV")) {
        videoInfoUrl = `${api_video_info}?bvid=${path[2]}`;
      } else {
        videoInfoUrl = `${api_video_info}?aid=${path[2].substring(2)}`;
      }

      const res = await Widget.http.get(videoInfoUrl, {
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        },
      });

      const data = typeof res.data === "string" ? JSON.parse(res.data) : res.data;
      if (data.code !== 0) {
        console.error("获取普通投稿视频信息失败:", data.message);
        return null;
      }

      const cid = data.data.pages[p - 1].cid;
      danmakuUrl = `https://comment.bilibili.com/${cid}.xml`;
    } catch (error) {
      console.error("请求普通投稿视频信息失败:", error);
      return null;
    }

  // 番剧
  } else if (inputUrl.includes("bangumi/") && inputUrl.includes("ep")) {
    try {
      const epid = path.slice(-1)[0].slice(2);
      const epInfoUrl = `${api_epid_cid}?ep_id=${epid}`;

      const res = await Widget.http.get(epInfoUrl, {
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        },
      });

      const data = typeof res.data === "string" ? JSON.parse(res.data) : res.data;
      if (data.code !== 0) {
        console.error("获取番剧视频信息失败:", data.message);
        return null;
      }

      for (const episode of data.result.episodes) {
        if (episode.id == epid) {
          title = episode.share_copy;
          const cid = episode.cid;
          danmakuUrl = `https://comment.bilibili.com/${cid}.xml`;
          break;
        }
      }

      if (!danmakuUrl) {
        console.error("未找到匹配的番剧集信息");
        return null;
      }

    } catch (error) {
      console.error("请求番剧视频信息失败:", error);
      return null;
    }

  } else {
    console.error("不支持的B站视频网址，仅支持普通视频(av,bv)、剧集视频(ep)");
    return null;
  }

  const response = await Widget.http.get(danmakuUrl, {
    headers: {
      "Content-Type": "application/xml",
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    },
  });

  return response.data;
}

async function fetchYouku(inputUrl) {
  console.log("开始从本地请求优酷弹幕...", inputUrl);

  // 弹幕和视频信息 API 基础地址
  const api_video_info = "https://openapi.youku.com/v2/videos/show.json";
  const api_danmaku = "https://acs.youku.com/h5/mopen.youku.danmu.list/1.0/";

  // 手动解析 URL（没有 URL 对象的情况下）
  const regex = /^(https?:\/\/[^\/]+)(\/[^?#]*)/;
  const match = inputUrl.match(regex);

  let path;
  if (match) {
    path = match[2].split('/').filter(Boolean);  // 分割路径并去掉空字符串
    path.unshift("");
    console.log(path);
  } else {
    console.error('Invalid URL');
    return null;
  }
  const video_id = path[path.length - 1].split(".")[0].slice(3);

  console.log("video_id:", video_id);

  // 获取页面标题和视频时长
  let res;
  try {
    const videoInfoUrl = `${api_video_info}?client_id=53e6cc67237fc59a&video_id=${video_id}&package=com.huawei.hwvplayer.youku&ext=show`;
    res = await Widget.http.get(videoInfoUrl, {
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36",
      },
      allow_redirects: false
    });
  } catch (error) {
    console.error("请求视频信息失败:", error);
    return null;
  }

  const data = typeof res.data === "string" ? JSON.parse(res.data) : res.data;
  const title = data.title;
  const duration = data.duration;
  console.log("标题:", title, "时长:", duration);

  // 获取 cna 和 tk_enc
  let cna, _m_h5_tk_enc, _m_h5_tk;
  try {
    const cnaUrl = "https://log.mmstat.com/eg.js";
    const tkEncUrl = "https://acs.youku.com/h5/mtop.com.youku.aplatform.weakget/1.0/?jsv=2.5.1&appKey=24679788";
    const cnaRes = await Widget.http.get(cnaUrl, {
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36",
      },
      allow_redirects: false
    });
    console.log("cnaRes: ", cnaRes);
    console.log("cnaRes.headers: ", cnaRes.headers);
    const etag = cnaRes.headers["etag"] || cnaRes.headers["Etag"];
    console.log("etag: ", etag);
    // const match = cnaRes.headers["set-cookie"].match(/cna=([^;]+)/);
    // cna = match ? match[1] : null;
    cna = etag.replace(/^"|"$/g, '');
    console.log("cna: ", cna);

    let tkEncRes;
    while (!tkEncRes) {
      tkEncRes = await Widget.http.get(tkEncUrl, {
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36",
        },
        allow_redirects: false
      });
    }
    console.log("tkEncRes: ", tkEncRes);
    console.log("tkEncRes.headers: ", tkEncRes.headers);
    const tkEncSetCookie = tkEncRes.headers["set-cookie"] || tkEncRes.headers["Set-Cookie"];
    console.log("tkEncSetCookie: ", tkEncSetCookie);

    // 获取 _m_h5_tk_enc
    const tkEncMatch = tkEncSetCookie.match(/_m_h5_tk_enc=([^;]+)/);
    _m_h5_tk_enc = tkEncMatch ? tkEncMatch[1] : null;

    // 获取 _m_h5_tkh
    const tkH5Match = tkEncSetCookie.match(/_m_h5_tk=([^;]+)/);
    _m_h5_tk = tkH5Match ? tkH5Match[1] : null;

    console.log("_m_h5_tk_enc:", _m_h5_tk_enc);
    console.log("_m_h5_tk:", _m_h5_tk);
  } catch (error) {
    console.error("获取 cna 或 tk_enc 失败:", error);
    return null;
  }

  // 计算弹幕分段请求
  const step = 60; // 每60秒一个分段
  const max_mat = Math.floor(duration / step) + 1;
  let contents = [];
  for (let mat = 0; mat < max_mat; mat++) {
    const msg = {
      ctime: Date.now(),
      ctype: 10004,
      cver: "v1.0",
      guid: cna,
      mat: mat,
      mcount: 1,
      pid: 0,
      sver: "3.1.0",
      type: 1,
      vid: video_id,
    };

    const str = JSON.stringify(msg);
    // const buff = Buffer.from(str, "utf-8");
    // const msg_b64encode = buff.toString("base64");
    // msg.msg = msg_b64encode;

    // 2. 处理 UTF-8 编码（替代 TextEncoder 和 Buffer）
    // 对于简单的 ASCII 字符串，btoa 可以直接处理
    // 如果需要支持 UTF-8 字符（例如中文），需要手动编码
    function utf8ToLatin1(str) {
      // 将 UTF-8 字符串转换为 Latin-1 可用的字符串
      // 浏览器 btoa 只能处理 Latin-1（0-255 字符码）
      let result = '';
      for (let i = 0; i < str.length; i++) {
        const charCode = str.charCodeAt(i);
        if (charCode > 255) {
          // 对于非 Latin-1 字符（如中文），可以用 encodeURIComponent 转义
          result += encodeURIComponent(str[i]);
        } else {
          result += str[i];
        }
      }
      return result;
    }

    function base64Encode(input) {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
      let output = '';
      let buffer = 0;
      let bufferLength = 0;

      for (let i = 0; i < input.length; i++) {
        buffer = (buffer << 8) | input.charCodeAt(i);
        bufferLength += 8;

        while (bufferLength >= 6) {
          output += chars[(buffer >> (bufferLength - 6)) & 0x3F];
          bufferLength -= 6;
        }
      }

      if (bufferLength > 0) {
        output += chars[(buffer << (6 - bufferLength)) & 0x3F];
      }

      while (output.length % 4 !== 0) {
        output += '=';
      }

      return output;
    }

    // 3. 转为 Base64 编码
    const msg_b64encode = base64Encode(utf8ToLatin1(str));

    // 4. 将 Base64 编码存入 msg.msg
    msg.msg = msg_b64encode;
    msg.sign = md5(`${msg_b64encode}MkmC9SoIw6xCkSKHhJ7b5D2r51kBiREr`).toString().toLowerCase();

    const data = JSON.stringify(msg);
    const t = Date.now();
    const params = {
      jsv: "2.5.6",
      appKey: "24679788",
      t: t,
      sign: md5([_m_h5_tk.slice(0, 32), t, "24679788", data].join("&")).toString().toLowerCase(),
      api: "mopen.youku.danmu.list",
      v: "1.0",
      type: "originaljson",
      dataType: "jsonp",
      timeout: "20000",
      jsonpIncPrefix: "utility",
    };

    let queryString = buildQueryString(params);
    const url = `${api_danmaku}?${queryString}`;
    console.log("piece_url: ", url);

    try {
        const response = await Widget.http.post(url, buildQueryString({ data: data }), {
          headers: {
              "Cookie": `_m_h5_tk=${_m_h5_tk};_m_h5_tk_enc=${_m_h5_tk_enc};`,
              "Referer": "https://v.youku.com",
              "Content-Type": "application/x-www-form-urlencoded",
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36",
          },
          allow_redirects: false
        });

        if (response.data.data && response.data.data.result) {
          const result = JSON.parse(response.data.data.result);
          if (result.code === "-1") continue;
          const danmus = result.data.result;
          for (const danmu of danmus) {
            const content = {
                timepoint: 0,	// 弹幕发送时间（秒）
                ct: 1,	// 弹幕类型，1-3 为滚动弹幕、4 为底部、5 为顶端、6 为逆向、7 为精确、8 为高级
                size: 25,	//字体大小，25 为中，18 为小
                color: 16777215,	//弹幕颜色，RGB 颜色转为十进制后的值，16777215 为白色
                unixtime: Math.floor(Date.now() / 1000),	//Unix 时间戳格式
                uid: 0,		//发送人的 id
                content: "",
            };
            content.timepoint = danmu.playat / 1000;
            if (danmu.propertis?.color) {
              content.color = JSON.parse(danmu.propertis).color;
            }
            content.content = danmu.content;
            contents.push(content);
          }
        }
    } catch (error) {
        console.error("请求失败:", error.message); // 输出错误信息
        return null;
    }
  }

  printFirst200Chars(contents);

  // 返回结果
  return convertToDanmakuXML(contents);
}

async function getCommentsById(params) {
  const { danmu_server, commentId, link, videoUrl, season, episode, tmdbId, type, title } = params;

  console.log("原始播放链接：", title);

  const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(:\d+)?(\/[^\s]*)?$/;
  if (!urlRegex.test(title)) {
      return generateDanmaku(`【手动链接弹幕】：请输入有效的播放链接进行弹幕搜索`, 1);
  }

  const url = await convertMobileToPcUrl(title);

  if (!urlRegex.test(title)) {
      return generateDanmaku(`【手动链接弹幕】：请输入有效的播放链接进行弹幕搜索`, 1);
  }

  console.log("转换后播放链接：", url);

  const danmu_server_list = [
        "http://127.0.0.1",
        "https://fc.lyz05.cn",
        "https://dmku.hls.one",
        "https://api.danmu.icu",
        "https://se.678.ooo",
        "https://danmu.56uxi.com",
        "https://dm.lxlad.com",
    ];

    // 统一的请求函数
    async function fetchDanmu(server) {
        if (server === "http://127.0.0.1") {
            let res = await fetchLocalhost(url);
            // 弹幕中有特殊字符会导致弹幕消失
            res = fixDTagContent(res);

            const danmuCount = parseDanmuku(res);
            return danmuCount >= 5 ? res : null; // 如果弹幕数大于等于 5，返回弹幕数据
        }
        try {
            const response = await Widget.http.get(
                `${server}/?url=${url}&ac=dm`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                    },
                    timeout: 15,
                }
            );

            console.log(`danmu response from ${server}: ↓↓↓`);
            printFirst200Chars(response.data);

            const danmuCount = parseDanmuku(response.data);
            return danmuCount >= 5 ? response.data : null; // 如果弹幕数大于等于 5，返回弹幕数据
        } catch (error) {
            console.error(`请求 ${server} 失败:`, error);
            return null;  // 如果请求失败，返回 null
        }
    }

    // 先查询传入的 danmu_server
    let result = await fetchDanmu(danmu_server);
    printFirst200Chars(result);
    if (result) return result;

    // 如果传入的 danmu_server 不满足条件，查询 danmu_server_list 中的其他服务器
    for (let server of danmu_server_list) {
        if (server === danmu_server) continue;  // 如果是传入的 danmu_server，跳过

        result = await fetchDanmu(server);
        if (result) return result;  // 如果获取到有效弹幕，返回弹幕数据
    }

    // 如果遍历完所有服务器都没有获得有效弹幕，返回默认错误信息
    return generateDanmaku(`【手动链接弹幕】：弹幕服务器异常，轮询后还是未获得到有效弹幕`, 1);
}

function parseDanmuku(responseData) {
  let danmukuArray = [];
  let length = 0;

  try {
    // 检测是否为 XML 格式（基于字符串开头）
    if (typeof responseData === 'string' && (responseData.trim().startsWith('<?xml') || responseData.trim().startsWith('<'))) {
      // 处理 XML 格式
      // 使用正则表达式匹配所有 <d> 标签以计算总数
      const danmukuRegex = /<d p="([^"]+)">([^<]+)<\/d>/g;
      const allDanmuku = responseData.match(danmukuRegex) || [];
      length = allDanmuku.length;

      // 提取前 10 条弹幕
      let count = 0;
      let match;
      danmukuRegex.lastIndex = 0; // 重置正则索引
      while ((match = danmukuRegex.exec(responseData)) !== null && count < 10) {
        const attr = match[1]; // p 属性值
        const content = match[2]; // 弹幕内容
        const [time, type, fontSize, color, sender, ...others] = attr.split(','); // 解析属性
        danmukuArray.push({
          time: parseFloat(time),
          content: content,
          type: parseInt(type),
          color: `#${parseInt(color).toString(16).padStart(6, '0')}`,
          fontSize: parseInt(fontSize)
        });
        count++;
      }
    } else {
      // 处理 JSON 格式
      const data = typeof responseData === 'string' ? JSON.parse(responseData) : responseData;
      const danmukuList = data.danmuku || data; // 支持 { danmuku: [...] } 或直接 [...] 格式
      length = danmukuList.length;
      danmukuArray = danmukuList.slice(0, 10); // 提取前 10 条
    }

    // 输出前 10 条弹幕
    console.log('前 10 条弹幕:', danmukuArray);
    console.log('获取到弹幕总数:', length);
    return length;
  } catch (error) {
    console.error('解析弹幕失败:', error);
    return 0;
  }
}