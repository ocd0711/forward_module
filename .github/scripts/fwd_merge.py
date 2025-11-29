import json
import requests
from packaging import version
import re
import os

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../"))

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.0 Safari/605.1.15"
}

# ================================================================
# 工具函数
# ================================================================

def is_url_accessible(url: str) -> bool:
    try:
        resp = requests.head(url, allow_redirects=True, timeout=10)
        return 200 <= resp.status_code < 400
    except requests.RequestException:
        return False

def check_url_final(url: str):
    """检测 URL 最终状态并返回 (可访问?, 最终URL, 状态码)"""
    try:
        resp = requests.head(url, headers=HEADERS, allow_redirects=True, timeout=10)

        if resp.status_code == 405:
            resp = requests.get(url, headers=HEADERS, allow_redirects=True, stream=True, timeout=10)
            resp.close()

        final_url = resp.url
        return (200 <= resp.status_code < 300), final_url, resp.status_code

    except requests.RequestException:
        return False, None, None

def sanitize_text(value: str) -> str:
    return re.sub(r"forward", "fw", value, flags=re.IGNORECASE) if isinstance(value, str) else value

def normalize_version(v: str):
    if not v:
        return version.parse("0.0.0")
    v_clean = re.sub(r"^[vV]", "", v.strip())
    try:
        return version.parse(v_clean)
    except Exception:
        return version.parse("0.0.0")

def _detect_branch(base_dir: str) -> str:
    if os.getenv("GITHUB_REF_NAME"):
        return os.getenv("GITHUB_REF_NAME")
    if os.getenv("GITHUB_REF"):
        return os.getenv("GITHUB_REF").split("/")[-1]

    head_file = os.path.join(base_dir, ".git", "HEAD")
    try:
        with open(head_file, "r", encoding="utf-8") as f:
            line = f.read().strip()
            if line.startswith("ref:"):
                return line.split("/")[-1]
    except Exception:
        pass

    return "master"

def _detect_owner_repo() -> str:
    return os.getenv("GITHUB_REPOSITORY", "ocd0711/forward_module")

OWNER_REPO = _detect_owner_repo()
BRANCH = _detect_branch(BASE_DIR)

def url_to_repo(raw_url: str) -> str:
    m = re.match(r"https://raw\.githubusercontent\.com/([^/]+)/([^/]+)/", raw_url)
    if m:
        return f"https://github.com/{m.group(1)}/{m.group(2)}"
    return raw_url

def normalize_filename(filename):
    name, ext = os.path.splitext(filename)
    return f"{name.lower()}{ext.lower()}"

def file_exists_case_insensitive(directory, filename):
    target = normalize_filename(filename)
    try:
        for f in os.listdir(directory):
            if normalize_filename(f) == target:
                return True
        return False
    except OSError:
        return False

def get_unique_filename(directory, filename, widget_id):
    base_name = normalize_filename(filename)
    name, ext = os.path.splitext(base_name)

    if name == widget_id.lower():
        return base_name

    if file_exists_case_insensitive(directory, base_name):
        return f"{widget_id.lower()}{ext}"

    return base_name

# ================================================================
# 下载 URL → 生成备份地址
# ================================================================

def download_and_replace_url(widget, base_dir):
    original_url = widget.get("url")
    if not original_url:
        return widget

    try:
        resp = requests.get(original_url, headers=HEADERS, timeout=20, stream=True)
        resp.raise_for_status()

        filename = os.path.basename(original_url.split("?")[0])
        if not filename or filename.lower() == "raw":
            filename = f"{widget.get('id')}.js"

        local_dir = os.path.join(base_dir, "widgets")
        os.makedirs(local_dir, exist_ok=True)

        unique_filename = get_unique_filename(local_dir, filename, widget.get("id"))
        local_path = os.path.join(local_dir, unique_filename)

        with open(local_path, "wb") as f:
            for chunk in resp.iter_content(chunk_size=8192):
                f.write(chunk)

        repo_url = f"https://raw.githubusercontent.com/{OWNER_REPO}/{BRANCH}/widgets/{unique_filename}"

        # 保存备份 URL，不覆盖原始 URL
        widget["backup_url"] = repo_url

        print(f"  💾 备份文件已保存: {widget.get('id')} -> {unique_filename}")

    except Exception as e:
        print(f"  ⚠️ 下载失败 {widget.get('id')} ({original_url}): {e}")

    return widget


# ================================================================
# 主逻辑：读取 module.json → 合并 → 保留最新版本
# ================================================================

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
        thanks.append(f"- [{name}]({url_to_repo(url)})")

        print(f"  ✅ 已加载 {len(widgets)} 个 widgets")
    except Exception as e:
        print(f"  ⚠️ 无法读取 {name}: {e}")

# ================================================================
# 去重 → 保留最新版本 → 过滤不可访问 URL
# ================================================================

merged = {}
for widget in all_widgets:
    wid = widget.get("id")
    url = widget.get("url")
    if not wid or not url:
        continue

    ok, final, code = check_url_final(url)
    if not ok:
        print(f"  ⚠️ 已跳过失效 widget: {wid} (最终 URL: {final}, 状态码: {code})")
        continue

    widget["url"] = final

    cur_ver = normalize_version(widget.get("version", "0.0.0"))
    if wid not in merged or cur_ver > normalize_version(merged[wid].get("version", "0.0.0")):
        merged[wid] = widget


# ================================================================
# 下载并生成 backup_url
# ================================================================

for wid, widget in merged.items():
    merged[wid] = download_and_replace_url(widget, BASE_DIR)


# ================================================================
# 从旧的 allinone.fwd 恢复缺失但本地存在备份的内容
# ================================================================

old_fwd_path = os.path.join(BASE_DIR, "allinone.fwd")

if os.path.exists(old_fwd_path):
    try:
        with open(old_fwd_path, "r", encoding="utf-8") as f:
            old_data = json.load(f)

        for old_widget in old_data.get("widgets", []):
            wid = old_widget.get("id")
            if wid not in merged:
                filename = os.path.basename(old_widget.get("url", "")).split("?")[0]
                if filename and file_exists_case_insensitive(os.path.join(BASE_DIR, "widgets"), filename):
                    merged[wid] = old_widget
                    print(f"  ♻️ 恢复本地备份 widget: {wid}")
    except Exception as e:
        print(f"⚠️ 无法读取旧 allinone.fwd: {e}")


# ================================================================
# 生成 **第一份 fwd**：allinone.fwd（原始 URL）
# ================================================================

result_main = {
    "title": "OCD's AllInOne Widgets",
    "description": "合并后的模块（使用原始 URL）",
    "icon": "https://avatars.githubusercontent.com/u/25606004",
    "widgets": list(merged.values())
}

main_file = os.path.join(BASE_DIR, "allinone.fwd")

with open(main_file, "w", encoding="utf-8") as f:
    json.dump(result_main, f, ensure_ascii=False, indent=2)

print(f"🎉 生成完成：{main_file}")


# ================================================================
# 生成 **第二份 fwd**：allinone_back.fwd（备份 URL）
# ================================================================

backup_widgets = []
for w in merged.values():
    w2 = w.copy()

    if "backup_url" in w2:
        w2["url"] = w2["backup_url"]

    w2.pop("backup_url", None)
    backup_widgets.append(w2)

result_backup = {
    "title": "OCD's AllInOne Widgets (Backup)",
    "description": "所有 widgets 使用备份 RAW URL",
    "icon": "https://avatars.githubusercontent.com/u/25606004",
    "widgets": backup_widgets
}

backup_file = os.path.join(BASE_DIR, "allinone_back.fwd")

with open(backup_file, "w", encoding="utf-8") as f:
    json.dump(result_backup, f, ensure_ascii=False, indent=2)

print(f"🎉 生成完成：{backup_file}")


# ================================================================
# 更新 README.md
# ================================================================

readme = (
    "# OCD's AllInOne Widgets\n\n"
    "自动合并多个 Forward Widgets 源并生成两份可用模块：\n\n"
    "- **allinone.fwd**（使用原始 URL）\n"
    "- **allinone_back.fwd**（使用仓库 RAW 备份 URL）\n\n"
    "## 原始来源仓库\n" + "\n".join(thanks)
)

with open(os.path.join(BASE_DIR, "README.md"), "w", encoding="utf-8") as f:
    f.write(readme)

print("📘 README.md 已更新")