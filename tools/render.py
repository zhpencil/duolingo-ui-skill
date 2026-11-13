"""Render demo/screens with Playwright and report console errors.

Usage:
    python tools/render.py http://127.0.0.1:8765/assets/demo.html out.png --full
    python tools/render.py <url> out.png --selector ".duo-phone"
"""
import argparse
import sys

from playwright.sync_api import sync_playwright


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("url")
    ap.add_argument("out")
    ap.add_argument("--width", type=int, default=1440)
    ap.add_argument("--height", type=int, default=1000)
    ap.add_argument("--full", action="store_true")
    ap.add_argument("--selector")
    ap.add_argument("--wait", type=int, default=800)
    ap.add_argument("--exe", default=r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
                    help="Chromium-family executable. Defaults to the Edge install.")
    args = ap.parse_args()

    errors = []
    with sync_playwright() as p:
        browser = p.chromium.launch(executable_path=args.exe, headless=True)
        page = browser.new_page(viewport={"width": args.width, "height": args.height}, device_scale_factor=1)
        page.on("console", lambda m: errors.append(f"console.{m.type}: {m.text}") if m.type in ("error", "warning") else None)
        page.on("pageerror", lambda e: errors.append(f"pageerror: {e}"))
        page.goto(args.url, wait_until="networkidle")
        page.evaluate("document.fonts.ready")
        page.wait_for_timeout(args.wait)
        if args.selector:
            page.locator(args.selector).first.screenshot(path=args.out)
        else:
            page.screenshot(path=args.out, full_page=args.full)
        height = page.evaluate("document.documentElement.scrollHeight")
        print(f"scrollHeight={height}")
        browser.close()

    for e in errors:
        print(e)
    return 0


if __name__ == "__main__":
    sys.exit(main())
