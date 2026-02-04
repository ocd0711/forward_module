WidgetMetadata = {
  id: "danmu.pro.online",
  title: "弹幕多源",
  version: "1.1.3",
  requiredVersion: "0.0.2",
  description: "支持添加多条api并自命名&繁简互转",
  author: "𝙈𝙖𝙠𝙠𝙖𝙋𝙖𝙠𝙠𝙖",
  
    globalParams: [
        { name: "server", title: "源1 (必填)", type: "input", value: "https://api.dandanplay.net" },
        { name: "server2", title: "源2", type: "input" },
        { name: "server3", title: "源3", type: "input" },
        { 
            name: "convertMode", 
            title: "🔠 弹幕转换", 
            type: "enumeration", 
            value: "none",
            enumOptions: [
                { title: "保持原样", value: "none" },
                { title: "转简体 (繁->简)", value: "t2s" },
                { title: "转繁体 (简->繁)", value: "s2t" }
            ]
        },
        // 新增：屏蔽词参数
        { 
            name: "blockKeywords", 
            title: "🚫 屏蔽词 (逗号分隔)", 
            type: "input", 
            value: "" 
        }
    ],
    modules: [
        { id: "searchDanmu", title: "搜索", functionName: "searchDanmu", type: "danmu", params: [] },
        { id: "getDetail", title: "详情", functionName: "getDetailById", type: "danmu", params: [] },
        { id: "getComments", title: "弹幕", functionName: "getCommentsById", type: "danmu", params: [] }
    ]
};

// ==========================================
// 1. 繁简转换核心 (OpenCC)
// ==========================================
const DICT_URL_S2T = "https://cdn.jsdelivr.net/npm/opencc-data@1.0.3/data/STCharacters.txt";
const DICT_URL_T2S = "https://cdn.jsdelivr.net/npm/opencc-data@1.0.3/data/TSCharacters.txt";
let MEM_DICT = null; // 内存缓存

async function initDict(mode) {
    if (!mode || mode === "none") return;
    if (MEM_DICT) return; // 内存已有

    const key = `dict_${mode}`;
    let local = await Widget.storage.get(key);

    if (!local) {
        try {
            console.log(`Downloading ${mode} dict...`);
            const res = await Widget.http.get(mode === "s2t" ? DICT_URL_S2T : DICT_URL_T2S);
            let text = res.data || res;
            if (typeof text === 'string' && text.length > 100) {
                const map = {};
                text.split('\n').forEach(l => {
                    const p = l.split(/\s+/);
                    if (p.length >= 2) map[p[0]] = p[1];
                });
                await Widget.storage.set(key, JSON.stringify(map));
                MEM_DICT = map;
            }
        } catch (e) {}
    } else {
        try { MEM_DICT = JSON.parse(local); } catch (e) {}
    }
}

function convertText(text) {
    if (!text || !MEM_DICT) return text;
    let res = "";
    for (let char of text) {
        res += MEM_DICT[char] || char;
    }
    return res;
}

// ==========================================
// 2. 核心功能 (带路由)
// ==========================================
const SOURCE_KEY = "dm_source_map";

async function saveSource(id, url) {
    let map = await Widget.storage.get(SOURCE_KEY);
    map = map ? JSON.parse(map) : {};
    map[id] = url;
    await Widget.storage.set(SOURCE_KEY, JSON.stringify(map));
}

async function getSource(id) {
    let map = await Widget.storage.get(SOURCE_KEY);
    return map ? JSON.parse(map)[id] : null;
}

async function searchDanmu(params) {
    const { title, season } = params;
    const servers = [params.server, params.server2, params.server3].filter(s => s && s.startsWith("http")).map(s => s.replace(/\/$/, ""));
    
    if (!servers.length) return { animes: [] };

    const tasks = servers.map(async (server) => {
        try {
            const res = await Widget.http.get(`${server}/api/v2/search/anime?keyword=${encodeURIComponent(title)}`, {
                headers: { "Content-Type": "application/json", "User-Agent": "ForwardWidgets/2.0" }
            });
            const data = typeof res.data === "string" ? JSON.parse(res.data) : res.data;
            if (data?.success && data.animes?.length > 0) return { server, animes: data.animes };
        } catch (e) {}
        return null;
    });

    const results = await Promise.all(tasks);
    let finalAnimes = [];

    for (const res of results) {
        if (res) {
            for (const a of res.animes) await saveSource(a.animeId, res.server);
            finalAnimes = finalAnimes.concat(res.animes);
        }
    }

    // 官方过滤
    if (finalAnimes.length > 0 && season) {
        const matched = finalAnimes.filter(a => {
            if (!a.animeTitle.includes(title)) return false;
            const parts = a.animeTitle.split(" ");
            for (let p of parts) {
                if (p.match(/\d+/) && parseInt(p.match(/\d+/)[0]) == season) return true;
                const cn = p.match(/[一二三四五六七八九十]+/);
                if (cn && convertChineseNumber(cn[0]) == season) return true;
            }
            return (a.animeTitle.trim() === title.trim() && season == 1);
        });
        if (matched.length > 0) finalAnimes = matched;
    }

    return { animes: finalAnimes };
}

async function getDetailById(params) {
    const { animeId } = params;
    let server = (await getSource(animeId)) || params.server;

    try {
        const res = await Widget.http.get(`${server}/api/v2/bangumi/${animeId}`, {
            headers: { "Content-Type": "application/json" }
        });
        const data = typeof res.data === "string" ? JSON.parse(res.data) : res.data;
        if (data?.bangumi?.episodes) {
            for (const ep of data.bangumi.episodes) await saveSource(ep.episodeId, server);
            return data.bangumi.episodes;
        }
    } catch (e) {}
    return [];
}

async function getCommentsById(params) {
    // 1. 获取参数：ID, 转换模式, 屏蔽词
    const { commentId, convertMode, blockKeywords } = params;
    if (!commentId) return null;

    // 准备字典
    await initDict(convertMode);

    // 获取源
    let server = (await getSource(commentId)) || params.server;

    try {
        // chConvert=0 (关掉服务端的转换，用我们自己的)
        const res = await Widget.http.get(`${server}/api/v2/comment/${commentId}?withRelated=true&chConvert=0`, {
            headers: { "Content-Type": "application/json" }
        });
        const data = typeof res.data === "string" ? JSON.parse(res.data) : res.data;
        
        let list = data.comments || [];

        // 2. 解析屏蔽词列表 (支持中文逗号和英文逗号，去空格)
        const blockedList = blockKeywords 
            ? blockKeywords.split(/[,，]/).map(k => k.trim()).filter(k => k.length > 0) 
            : [];

        // 3. 执行：转换 + 过滤
        if (list.length > 0) {
            // 如果需要转换，先转换
            if (convertMode !== "none" && MEM_DICT) {
                list.forEach(c => {
                    if (c.m) c.m = convertText(c.m);
                    if (c.message) c.message = convertText(c.message);
                });
            }

            // 如果有屏蔽词，执行过滤
            if (blockedList.length > 0) {
                data.comments = list.filter(c => {
                    const msg = c.m || c.message || "";
                    // 只要包含任意一个屏蔽词，就丢弃
                    for (const keyword of blockedList) {
                        if (msg.includes(keyword)) return false; 
                    }
                    return true;
                });
            }
        }
        
        return data;
    } catch (e) { return null; }
}

function convertChineseNumber(str) {
    const map = {'零':0,'一':1,'二':2,'三':3,'四':4,'五':5,'六':6,'七':7,'八':8,'九':9,'十':10};
    let res = 0, curr = 0, lastUnit = 1;
    for (let char of str) {
        if (map[char] < 10) curr = map[char];
        else {
            let unit = map[char];
            if (curr === 0) curr = 1;
            if (unit >= lastUnit) res = curr * unit; else res += curr * unit;
            lastUnit = unit; curr = 0;
        }
    }
    return res + curr;
}
