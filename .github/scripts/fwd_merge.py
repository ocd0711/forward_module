import json
import requests
from packaging import version
import re
import os

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../"))

def is_url_accessible(url: str) -> bool:
    try:
        resp = requests.head(url, timeout=10)
        return resp.status_code == 200
    except:
        return False

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
        resp = requests.get(url, timeout=15)
        resp.raise_for_status()
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

    if not is_url_accessible(url):
        print(f"  ⚠️ widget 被移除: {widget.get('id', '')}")
        continue

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