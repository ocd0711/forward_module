import json
import requests
from packaging import version
import re
import os

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../"))

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.0 Safari/605.1.15"
}

def is_url_accessible(url: str) -> bool:
    try:
        resp = requests.head(url, allow_redirects=True, timeout=10)
        return 200 <= resp.status_code < 400
    except requests.RequestException:
        return False
    
def check_url_final(url: str):
    """
    检测 URL 最终是否可访问。
    自动跟随跳转，并返回最终状态码和最终 URL。
    
    返回:
        (is_accessible, final_url, status_code)
    """
    try:
        # 跟随重定向直到最终页面
        resp = requests.head(url, headers=HEADERS, allow_redirects=True, timeout=10)

        # 如果服务器不支持 HEAD，则尝试 GET（只获取头部，避免下载全部内容）
        if resp.status_code == 405:  
            resp = requests.get(url, headers=HEADERS, allow_redirects=True, stream=True, timeout=10)
            resp.close()

        final_url = resp.url
        status_code = resp.status_code
        is_accessible = 200 <= status_code < 300

        return is_accessible, final_url, status_code

    except requests.RequestException:
        return False, None, None

def sanitize_text(value: str) -> str:
    """替换掉 description 和 id 中的 forward → fw（不区分大小写）"""
    if isinstance(value, str):
        return re.sub(r"forward", "fw", value, flags=re.IGNORECASE)
    return value

def normalize_version(v: str):
    if not v:
        return version.parse("0.0.0")
    v_clean = re.sub(r"^[vV]", "", v.strip())
    try:
        return version.parse(v_clean)
    except Exception:
        return version.parse("0.0.0")

def url_to_repo(raw_url: str) -> str:
    m = re.match(r"https://raw\.githubusercontent\.com/([^/]+)/([^/]+)/", raw_url)
    if m:
        user, repo = m.groups()
        return f"https://github.com/{user}/{repo}"
    return raw_url

# 读取 module.json
with open(os.path.join(BASE_DIR, "module.json"), "r", encoding="utf-8") as f:
    modules = json.load(f)

all_widgets = []
thanks = []

for name, url in modules.items():
    print(f"正在获取: {name} -> {url}")
    try:
        resp = requests.get(url, headers=HEADERS, timeout=15)
        resp.raise_for_status()
        resp.encoding = "utf-8"
        text = re.sub(r",\s*([\]}])", r"\1", resp.text)
        data = json.loads(text)
        widgets = data.get("widgets", [])

        all_widgets.extend(widgets)

        repo_link = url_to_repo(url)
        thanks.append(f"- [{name}]({repo_link})")
        print(f"  ✅ 已加载 {len(widgets)} 个 widgets")
    except Exception as e:
        print(f"  ⚠️ 无法读取 {name}: {e}")

merged = {}
for widget in all_widgets:
    wid = widget.get("id")
    url = widget.get("url")
    if not wid or not url:
        continue

    # widget["id"] = sanitize_text(widget.get("id", ""))
    # widget["description"] = sanitize_text(widget.get("description", ""))

    # if not is_url_accessible(url):
    #     print(f"  ⚠️ widget 被移除: {widget.get('id', '')}")
    #     continue

    ok, final, code = check_url_final(url)
    if not ok:
        print(f"  ⚠️ widget 被移除: {widget.get('id', '')} (最终 URL: {final}, 状态码: {code})")
        continue

    widget["url"] = final

    cur_ver = normalize_version(widget.get("version", "0.0.0"))

    if wid not in merged:
        # 之前没有这个 id，直接放进去
        merged[wid] = widget
    else:
        # 已有相同 id，比较版本号
        old_ver = normalize_version(merged[wid].get("version", "0.0.0"))
        if cur_ver > old_ver:
            merged[wid] = widget

result = {
    "title": "OCD's AllInOne Widgets",
    "description": "合并自 module.json 中定义的多个 FW Widgets 源(30% off code: OCD)",
    "icon": "https://avatars.githubusercontent.com/u/25606004",
    "widgets": list(merged.values())
}

output_file = os.path.join(BASE_DIR, "allinone.fwd")
with open(output_file, "w", encoding="utf-8") as f:
    json.dump(result, f, ensure_ascii=False, indent=2)

print(f"✅ 合并完成，共 {len(result['widgets'])} 个 widget，已生成 {output_file}")

readme_content = "# OCD's AllInOne Widgets\n\n" \
    "本仓库自动合并多个 ForwardWidgets 源，方便统一使用。(30% off code: OCD)\n\n" \
    "自动检测链接是否有效, 最终生成集合不包含无效模块\n\n" \
    f"👉 [点此下载最新 allinone.fwd](https://github.com/ocd0711/forward_module/allinone.fwd)\n\n" \
    "## 感谢以下原始仓库作者\n" \
    + "\n".join(thanks) + "\n"

readme_file = os.path.join(BASE_DIR, "README.md")
with open(readme_file, "w", encoding="utf-8") as f:
    f.write(readme_content)

print("✅ README.md 已更新")