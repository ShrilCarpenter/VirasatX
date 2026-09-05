import os
import sys
from playwright.sync_api import sync_playwright
import pymupdf

def render_both_decks():
    cur_dir = os.path.dirname(os.path.abspath(__file__))
    html_file = os.path.join(cur_dir, "index.html")
    file_url = f"file:///{html_file.replace(os.sep, '/')}"

    pdf_virasatx = os.path.join(cur_dir, "SIH2026_VirasatX_Idea_Submission.pdf")
    pdf_hackastra = os.path.join(cur_dir, "SIH_Hackastra_Exact_Submission.pdf")

    print(f"Launching Playwright to render both decks from {file_url}...")

    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": 1920, "height": 1080}, device_scale_factor=2)
        page.goto(file_url, wait_until="networkidle")
        page.wait_for_timeout(1000)

        # -------------------------------------------------------------
        # 1. RENDER VIRASATX DECK
        # -------------------------------------------------------------
        page.evaluate("switchDeck('virasatx')")
        page.wait_for_timeout(500)

        v_slides = page.query_selector_all("#deck-virasatx .slide")
        v_images = []
        for idx, slide_el in enumerate(v_slides, start=1):
            img_path = os.path.join(cur_dir, f"slide_{idx}.png")
            slide_el.screenshot(path=img_path)
            v_images.append(img_path)
            print(f"Rendered VirasatX Slide {idx}: {img_path}")

        # Compile into VirasatX PDF
        doc_v = pymupdf.open()
        for img_path in v_images:
            img_doc = pymupdf.open(img_path)
            rect = img_doc[0].rect
            pdf_bytes = img_doc.convert_to_pdf()
            img_pdf = pymupdf.open("pdf", pdf_bytes)
            page_pdf = doc_v.new_page(width=rect.width, height=rect.height)
            page_pdf.show_pdf_page(rect, img_pdf, 0)
        doc_v.save(pdf_virasatx)
        doc_v.close()
        print(f"Saved VirasatX PDF: {pdf_virasatx}")

        # -------------------------------------------------------------
        # 2. RENDER HACKASTRA DECK (EXACT 1:1 REPLICA)
        # -------------------------------------------------------------
        page.evaluate("switchDeck('hackastra')")
        page.wait_for_timeout(500)

        h_slides = page.query_selector_all("#deck-hackastra .slide")
        h_images = []
        for idx, slide_el in enumerate(h_slides, start=1):
            img_path = os.path.join(cur_dir, f"hackastra_slide_{idx}.png")
            slide_el.screenshot(path=img_path)
            h_images.append(img_path)
            print(f"Rendered Hackastra Slide {idx}: {img_path}")

        # Compile into Hackastra PDF
        doc_h = pymupdf.open()
        for img_path in h_images:
            img_doc = pymupdf.open(img_path)
            rect = img_doc[0].rect
            pdf_bytes = img_doc.convert_to_pdf()
            img_pdf = pymupdf.open("pdf", pdf_bytes)
            page_pdf = doc_h.new_page(width=rect.width, height=rect.height)
            page_pdf.show_pdf_page(rect, img_pdf, 0)
        doc_h.save(pdf_hackastra)
        doc_h.close()
        print(f"Saved Hackastra PDF: {pdf_hackastra}")

        browser.close()

if __name__ == "__main__":
    render_both_decks()
