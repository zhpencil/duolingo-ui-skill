"""Capture the four demo phones at 2x for the cover and README.

Usage:
    python tools/capture-phones.py http://127.0.0.1:8765/assets/demo.html docs/phones
"""
import argparse
import pathlib
import sys

from playwright.sync_api import sync_playwright

EXE = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("url")
    ap.add_argument("outdir")
    args = ap.parse_args()

    out = pathlib.Path(args.outdir)
    out.mkdir(parents=True, exist_ok=True)

    errors = []
    with sync_playwright() as p:
        browser = p.chromium.launch(executable_path=EXE, headless=True)
        page = browser.new_page(viewport={"width": 1440, "height": 1000}, device_scale_factor=2)
        page.on("console", lambda m: errors.append(f"console.{m.type}: {m.text}") if m.type == "error" else None)
        page.on("pageerror", lambda e: errors.append(f"pageerror: {e}"))
        page.goto(args.url, wait_until="networkidle")
        page.evaluate("document.fonts.ready")
        page.wait_for_timeout(900)

        phones = page.locator(".duo-kit__phones .duo-phone")
        names = ["01-learn", "02-lesson", "03-profile"]
        for i, name in enumerate(names):
            phone = phones.nth(i)
            phone.scroll_into_view_if_needed()
            phone.screenshot(path=str(out / f"{name}.png"))
            print("wrote", out / f"{name}.png")

        overlay = page.locator("#overlay-phone")
        overlay.scroll_into_view_if_needed()
        overlay.screenshot(path=str(out / "04-courses.png"))
        print("wrote", out / "04-courses.png")

        # Answered lesson: place words so CHECK turns green.
        lesson = phones.nth(1)
        for word in ("We", "are", "always", "sorry"):
            lesson.locator(f'[data-word="{word}"]').click()
        page.wait_for_timeout(450)
        lesson.screenshot(path=str(out / "02-lesson-answered.png"))
        print("wrote", out / "02-lesson-answered.png")

        # Courses with the bottom sheet open.
        page.evaluate("Duo.open('demo-sheet')")
        page.wait_for_timeout(700)
        page.locator("#overlay-phone").screenshot(path=str(out / "04-courses-sheet.png"))
        print("wrote", out / "04-courses-sheet.png")

        browser.close()

    for e in errors:
        print(e)
    return 0


if __name__ == "__main__":
    sys.exit(main())
