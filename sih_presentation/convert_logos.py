import os
from playwright.sync_api import sync_playwright

def convert_svg_to_png():
    cur_dir = os.path.dirname(os.path.abspath(__file__))
    logo_svg = os.path.join(cur_dir, "sih_logo.svg")
    bulb_svg = os.path.join(cur_dir, "sih_bulb.svg")
    logo_png = os.path.join(cur_dir, "sih_logo.png")
    bulb_png = os.path.join(cur_dir, "sih_bulb.png")

    with sync_playwright() as p:
        browser = p.chromium.launch()
        
        # Render Logo
        page = browser.new_page(viewport={"width": 480, "height": 140}, device_scale_factor=3)
        page.goto(f"file:///{logo_svg.replace(os.sep, '/')}")
        page.locator("svg").screenshot(path=logo_png, omit_background=True)
        print("Exported sih_logo.png")

        # Render Bulb
        page2 = browser.new_page(viewport={"width": 640, "height": 720}, device_scale_factor=3)
        page2.goto(f"file:///{bulb_svg.replace(os.sep, '/')}")
        page2.locator("svg").screenshot(path=bulb_png, omit_background=True)
        print("Exported sih_bulb.png")

        browser.close()

if __name__ == "__main__":
    convert_svg_to_png()
