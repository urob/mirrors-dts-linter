# /// script
# requires-python = ">=3.11"
# dependencies = [
#   "httpx",
# ]
# ///

import json
import subprocess
from pathlib import Path

import httpx


def get_latest_npm_version(package: str) -> str:
    r = httpx.get(f"https://registry.npmjs.org/{package}/latest", timeout=30)
    r.raise_for_status()
    return r.json()["version"]


def get_current_version() -> str:
    return json.loads(Path("package.json").read_text())["version"]


def update_package_json(version: str) -> None:
    pkg = json.loads(Path("package.json").read_text())
    pkg["version"] = version
    pkg["dependencies"]["dts-linter"] = version
    Path("package.json").write_text(json.dumps(pkg, indent=2) + "\n")


def update_readme(old_version: str, new_version: str) -> None:
    path = Path("README.md")
    path.write_text(path.read_text().replace(f"v{old_version}", f"v{new_version}"))


def git(*args: str) -> None:
    subprocess.run(["git", *args], check=True)


def main() -> None:
    current = get_current_version()
    latest = get_latest_npm_version("dts-linter")

    if current == latest:
        print(f"No change v{current}")
        return

    print(f"Updating {current} -> {latest}")
    update_package_json(latest)
    update_readme(current, latest)

    tag = f"v{latest}" if not latest.startswith("v") else latest
    git("add", "package.json", "README.md")
    git("commit", "-m", f"Mirror {tag}")
    git("tag", tag)


if __name__ == "__main__":
    main()
