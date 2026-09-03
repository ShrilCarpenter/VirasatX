import os
import sys
from playwright.sync_api import sync_playwright
import pymupdf

def render_slides():
    cur_dir = os.path.dirname(os.path.abspath(__file__))
    html_file = os.path.join(cur_dir, "index.html")
    pdf_output = os.path.join(cur_dir, "SIH2026_VirasatX_Idea_Submission.pdf")
    
    file_url = f"file:///{html_file.replace(os.sep, '/')}"
    print(f"Opening {file_url} in headless browser...")

    with sync_playwright() as p:
        browser = p.chromium.launch()
        # High resolution 16:9 viewport
        page = browser.new_page(viewport={"width": 1920, "height": 1080}, device_scale_factor=2)
        page.goto(file_url, wait_until="networkidle")
        page.wait_for_timeout(1000)

        # Capture individual slides
        slide_elements = page.query_selector_all(".slide")
        image_paths = []
        for idx, slide_el in enumerate(slide_elements, start=1):
            img_path = os.path.join(cur_dir, f"slide_{idx}.png")
            slide_el.screenshot(path=img_path)
            image_paths.append(img_path)
            print(f"Rendered Slide {idx} screenshot: {img_path}")

        # Render PDF via browser print or via PyMuPDF image compilation
        # Let's compile the high-res screenshots into an exact 16:9 PDF using PyMuPDF for crystal-clear vector/raster accuracy
        doc = pymupdf.open()
        for img_path in image_paths:
            img_doc = pymupdf.open(img_path)
            rect = img_doc[0].rect
            pdf_bytes = img_doc.convert_to_pdf()
            img_pdf = pymupdf.open("pdf", pdf_bytes)
            page_pdf = doc.new_page(width=rect.width, height=rect.height)
            page_pdf.show_pdf_page(rect, img_pdf, 0)
        
        doc.save(pdf_output)
        doc.close()
        print(f"Generated High-Resolution PDF at: {pdf_output}")

        browser.close()

if __name__ == "__main__":
    render_slides()
