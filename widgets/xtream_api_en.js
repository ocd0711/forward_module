/* ---------- Widget Metadata (English) ---------- */
var WidgetMetadata = {
  id: "xtream_api_en",
  title: "Xtream API Live",
  description: "Fetch live channels via official Xtream-Codes REST API with keyword search",
  author: "🎁 Discount Code：VEUS",
  site: "🎁 Discount Code：VEUS",
  version: "2.1.2",
  requiredVersion: "0.0.1",
  detailCacheDuration: 60,
  modules: [
    {
      title: "Channel List",
      description: "REST API → channel cards",
      requiresWebView: false,
      functionName: "getChannels",
      cacheDuration: 300,
      params: [
        { name: "host",     title: "Server Host",   type: "input", placeholder: "lot77162.cdngold.me" },
        { name: "username", title: "Username",      type: "input" },
        { name: "password", title: "Password",      type: "input" },
        { name: "keyword",  title: "Keyword",       type: "input", placeholder: "CCTV, Sports..." },
        { name: "bg_color", title: "Logo BG Color", type: "input", placeholder: "1C1C1E" }
      ]
    }
  ]
};

/* ---------- Main Function ---------- */
async function getChannels(params = {}) {
  const { host, username, password, keyword = "", bg_color } = params;
  if (!host || !username || !password) {
    throw new Error("host / username / password are required");
  }

  const apiUrl = `http://${host}/player_api.php?username=${username}&password=${password}&action=get_live_streams`;
  const headers = { "User-Agent": "AptvPlayer/1.4.11" };
  const res = await Widget.http.get(apiUrl, { headers });

  if (!res?.data || !Array.isArray(res.data)) {
    throw new Error("Invalid API response");
  }

  /* keyword filter (case-insensitive) */
  const kw = keyword.trim().toLowerCase();
  const channels = res.data.filter(ch =>
    !kw || (ch.name || "").toLowerCase().includes(kw)
  );

  return channels.map(ch => ({
    id: `http://${host}/live/${username}/${password}/${ch.stream_id}.ts`,
    type: "url",
    title: ch.name,
    backdropPath: ch.stream_icon || `https://fakeimg.pl/200x120/${bg_color || "1C1C1E"}/?text=${encodeURIComponent(ch.name)}`,
    description: ch.category_name || "",
    videoUrl: `http://${host}/live/${username}/${password}/${ch.stream_id}.ts`,
    customHeaders: headers
  }));
}