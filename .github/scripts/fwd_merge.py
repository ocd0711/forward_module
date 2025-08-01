import json
import requests
from packaging import version
import re
import os

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../"))

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

        for w in widgets:
            w["source"] = name
        all_widgets.extend(widgets)

        repo_link = url_to_repo(url)
        thanks.append(f"- [{name}]({repo_link})")
        print(f"  ✅ 已加载 {len(widgets)} 个 widgets")
    except Exception as e:
        print(f"  ⚠️ 无法读取 {name}: {e}")

merged = {}
for widget in all_widgets:
    wid = widget.get("id")
    ver = normalize_version(widget.get("version", "0.0.0"))
    if not wid:
        continue
    if wid not in merged or ver > normalize_version(merged[wid].get("version", "0.0.0")):
        merged[wid] = widget

result = {
    "title": "OCD's AllInOne Widgets",
    "description": "合并自 module.json 中定义的多个 ForwardWidgets 源",
    "icon": "https://avatars.githubusercontent.com/u/25606004",
    "widgets": list(merged.values())
}

output_file = os.path.join(BASE_DIR, "allinone.fwd")
with open(output_file, "w", encoding="utf-8") as f:
    json.dump(result, f, ensure_ascii=False, indent=2)

print(f"✅ 合并完成，共 {len(result['widgets'])} 个 widget，已生成 {output_file}")

readme_content = "# OCD's AllInOne Widgets\n\n" \
    "本仓库自动合并多个 ForwardWidgets 源，方便统一使用。\n\n" \
    f"👉 [点此下载最新 allinone.fwd](https://github.com/ocd0711/forward_module/allinone.fwd)\n\n" \
    "## 感谢以下原始仓库作者\n" \
    + "\n".join(thanks) + "\n"

readme_file = os.path.join(BASE_DIR, "README.md")
with open(readme_file, "w", encoding="utf-8") as f:
    f.write(readme_content)

print("✅ README.md 已更新")
