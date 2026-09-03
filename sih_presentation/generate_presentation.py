import os
import sys
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE

def create_pptx(output_path):
    prs = Presentation()
    # 16:9 Widescreen standard
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]

    cur_dir = os.path.dirname(os.path.abspath(__file__))
    logo_png = os.path.join(cur_dir, "sih_logo.png")
    bulb_png = os.path.join(cur_dir, "sih_bulb.png")

    # Colors matching the reference SIH presentation
    NAVY_TITLE = RGBColor(26, 54, 93)       # #1A365D
    BLACK = RGBColor(0, 0, 0)
    DARK_TEXT = RGBColor(0, 0, 0)           # Exact Black matching reference PPT
    BLUE_HEADING = RGBColor(0, 112, 192)    # #0070C0
    GREEN_ACCENT = RGBColor(21, 128, 61)    # #15803D
    YELLOW_BOX = RGBColor(254, 240, 138)    # #FEF08A
    YELLOW_LIGHT = RGBColor(254, 249, 195)  # #FEF9C3
    WHITE = RGBColor(255, 255, 255)
    DIVIDER_COLOR = RGBColor(0, 0, 0)

    def add_common_header(slide, title_text, slide_num):
        # 1. Top Left Team Oval
        oval = slide.shapes.add_shape(MSO_SHAPE.OVAL, Inches(0.45), Inches(0.3), Inches(1.85), Inches(0.8))
        oval.fill.solid()
        oval.fill.fore_color.rgb = WHITE
        oval.line.color.rgb = BLACK
        oval.line.width = Pt(1.5)
        tf_oval = oval.text_frame
        tf_oval.word_wrap = True
        p1 = tf_oval.paragraphs[0]
        p1.text = "Team"
        p1.font.name = "Arial"
        p1.font.size = Pt(11)
        p1.font.bold = True
        p1.font.color.rgb = BLACK
        p1.alignment = PP_ALIGN.CENTER
        p2 = tf_oval.add_paragraph()
        p2.text = "Sanskriti RakshaX"
        p2.font.name = "Arial"
        p2.font.size = Pt(10)
        p2.font.bold = True
        p2.font.color.rgb = BLACK
        p2.alignment = PP_ALIGN.CENTER

        # 2. Center Pill Title
        pill = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(3.6), Inches(0.3), Inches(6.1), Inches(0.8))
        pill.fill.solid()
        pill.fill.fore_color.rgb = WHITE
        pill.line.color.rgb = BLACK
        pill.line.width = Pt(1.5)
        tf_pill = pill.text_frame
        tf_pill.word_wrap = True
        p_p = tf_pill.paragraphs[0]
        p_p.text = title_text
        p_p.font.name = "Arial"
        p_p.font.size = Pt(26)
        p_p.font.bold = True
        p_p.font.color.rgb = BLACK
        p_p.alignment = PP_ALIGN.CENTER

        # 3. Top Right SIH Logo
        if os.path.exists(logo_png):
            slide.shapes.add_picture(logo_png, Inches(10.9), Inches(0.3), width=Inches(1.9))

        # 4. Slide Number at Bottom Right
        num_box = slide.shapes.add_textbox(Inches(12.4), Inches(6.9), Inches(0.6), Inches(0.4))
        p_num = num_box.text_frame.paragraphs[0]
        p_num.text = str(slide_num)
        p_num.font.name = "Arial"
        p_num.font.size = Pt(14)
        p_num.font.bold = True
        p_num.font.color.rgb = BLACK
        p_num.alignment = PP_ALIGN.RIGHT

    def add_vertical_divider(slide):
        # Vertical dividing line down the center
        div = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(6.6), Inches(1.2), Inches(0.015), Inches(5.6))
        div.fill.solid()
        div.fill.fore_color.rgb = DIVIDER_COLOR
        div.line.fill.background()

    # =========================================================================
    # SLIDE 1: TITLE PAGE
    # =========================================================================
    slide1 = prs.slides.add_slide(blank_layout)

    # Top Title
    h1_box = slide1.shapes.add_textbox(Inches(0.6), Inches(0.35), Inches(9.5), Inches(0.8))
    p_h1 = h1_box.text_frame.paragraphs[0]
    p_h1.text = "SMART INDIA HACKATHON 2025"
    p_h1.font.name = "Times New Roman"
    p_h1.font.size = Pt(30)
    p_h1.font.bold = True
    p_h1.font.color.rgb = NAVY_TITLE

    # Top Right SIH Logo
    if os.path.exists(logo_png):
        slide1.shapes.add_picture(logo_png, Inches(10.8), Inches(0.35), width=Inches(2.0))

    # Center Subtitle
    sub1_box = slide1.shapes.add_textbox(Inches(0.6), Inches(1.25), Inches(12.133), Inches(0.6))
    p_sub1 = sub1_box.text_frame.paragraphs[0]
    p_sub1.text = "TITLE PAGE"
    p_sub1.font.name = "Arial"
    p_sub1.font.size = Pt(26)
    p_sub1.font.bold = True
    p_sub1.font.color.rgb = BLACK
    p_sub1.alignment = PP_ALIGN.CENTER

    # Left Bullets
    bullets_box = slide1.shapes.add_textbox(Inches(0.6), Inches(2.0), Inches(8.2), Inches(5.0))
    tf_b = bullets_box.text_frame
    tf_b.word_wrap = True

    items_s1 = [
        ("Problem Statement ID –", "SIH26197"),
        ("Problem Statement Title-", "Digital Preservation, AI-Powered Paleography and Interactive 3D WebGIS Atlas for Indian Cultural Heritage, Monuments & Ancient Manuscripts. (Centres to be concentrated: National Archives, ASI Sites, Craft Clusters)"),
        ("Theme-", "Heritage & Culture"),
        ("PS Category-", "Software"),
        ("Team ID-", "57385"),
        ("Team Name-", "Sanskriti RakshaX")
    ]

    for idx, (label, val) in enumerate(items_s1):
        p = tf_b.paragraphs[0] if idx == 0 else tf_b.add_paragraph()
        p.space_after = Pt(14)
        r1 = p.add_run()
        r1.text = f"• {label} "
        r1.font.name = "Arial"
        r1.font.size = Pt(14)
        r1.font.bold = True
        r1.font.color.rgb = BLACK

        r2 = p.add_run()
        r2.text = val
        r2.font.name = "Arial"
        r2.font.size = Pt(14)
        r2.font.color.rgb = DARK_TEXT

    # Right SIH Brain Bulb
    if os.path.exists(bulb_png):
        slide1.shapes.add_picture(bulb_png, Inches(8.8), Inches(1.9), width=Inches(3.8))

    # Slide 1 Number
    num1_box = slide1.shapes.add_textbox(Inches(12.4), Inches(6.9), Inches(0.6), Inches(0.4))
    p1_num = num1_box.text_frame.paragraphs[0]
    p1_num.text = "1"
    p1_num.font.name = "Arial"
    p1_num.font.size = Pt(14)
    p1_num.font.bold = True
    p1_num.alignment = PP_ALIGN.RIGHT

    # =========================================================================
    # SLIDE 2: IDEA TITLE
    # =========================================================================
    slide2 = prs.slides.add_slide(blank_layout)
    add_common_header(slide2, "IDEA TITLE", 2)
    add_vertical_divider(slide2)

    # Left Column: Proposed Solution
    s2_left = slide2.shapes.add_textbox(Inches(0.5), Inches(1.15), Inches(5.9), Inches(5.7))
    tf2_l = s2_left.text_frame
    tf2_l.word_wrap = True

    p_s2_head = tf2_l.paragraphs[0]
    p_s2_head.text = "❖ Proposed Solution:"
    p_s2_head.font.name = "Arial"
    p_s2_head.font.size = Pt(18)
    p_s2_head.font.bold = True
    p_s2_head.font.color.rgb = BLUE_HEADING
    p_s2_head.space_after = Pt(6)

    sol_bullets = [
        ("3D Archival & Artifact Studio :", "360° interactive rotation, dynamic lighting & sub-millimeter zoom inspection for sculptures."),
        ("Ancient Manuscript Paleography :", "AI decipherment of fragile palm-leaf (Talapatra) & birch-bark scripts with Sanskrit audio."),
        ("Multimodal AI Heritage Guide :", "Voice, vision, and multilingual conversational assistance grounded in verified archives."),
        ("Computer Vision Iconography Scanner :", "Identifies dynastic art styles, postures (asanas), mudras, and motifs from photos."),
        ("Chronological Epoch Explorer :", "Interactive 11-epoch historical timeline spanning 5,000+ years of civilizational heritage."),
        ("Interactive Heritage Web-GIS Atlas :", "Dynamic platform for exploring monuments, excavations, and conservation zones."),
        ("GI Artisan Marketplace & Livelihood :", "Direct fair-trade connect supporting GI-certified traditional master artisan cooperatives."),
        ("Sustainable Tourism & Itinerary AI :", "Eco-friendly tour planner dispersing crowds away from overtouristed monuments."),
        ("GI Tagging and E-Signature :", "To preserve cultural heritage, safeguard traditional products and paperless approval.")
    ]

    for title, desc in sol_bullets:
        p = tf2_l.add_paragraph()
        p.space_after = Pt(4)
        r_t = p.add_run()
        r_t.text = f"• {title}\n"
        r_t.font.name = "Arial"
        r_t.font.size = Pt(11)
        r_t.font.bold = True
        r_t.font.underline = True
        r_t.font.color.rgb = GREEN_ACCENT

        r_d = p.add_run()
        r_d.text = f"  {desc}"
        r_d.font.name = "Arial"
        r_d.font.size = Pt(10.5)
        r_d.font.color.rgb = BLACK

    # Right Column: Flowchart Diagram (Shapes)
    def add_flow_box(slide, text, x, y, w, h, bg_color=YELLOW_BOX, font_size=9, is_pill=False):
        shape_type = MSO_SHAPE.ROUNDED_RECTANGLE if is_pill else MSO_SHAPE.RECTANGLE
        box = slide.shapes.add_shape(shape_type, Inches(x), Inches(y), Inches(w), Inches(h))
        box.fill.solid()
        box.fill.fore_color.rgb = bg_color
        box.line.color.rgb = BLACK
        box.line.width = Pt(1.2)
        tf = box.text_frame
        tf.word_wrap = True
        tf.vertical_anchor = MSO_ANCHOR.MIDDLE
        p = tf.paragraphs[0]
        p.text = text
        p.font.name = "Arial"
        p.font.size = Pt(font_size)
        p.font.bold = True
        p.font.color.rgb = BLACK
        p.alignment = PP_ALIGN.CENTER
        return box

    def add_arrow_down(slide, x, y, w=0.4, h=0.2):
        tx = slide.shapes.add_textbox(Inches(x), Inches(y), Inches(w), Inches(h))
        p = tx.text_frame.paragraphs[0]
        p.text = "▼"
        p.font.name = "Arial"
        p.font.size = Pt(8)
        p.font.color.rgb = BLACK
        p.alignment = PP_ALIGN.CENTER

    # Flowchart rendering on right column
    add_flow_box(slide2, "Login", 8.8, 1.25, 1.8, 0.35, is_pill=True, font_size=11)
    add_arrow_down(slide2, 9.5, 1.6)

    # Left Branch (User)
    add_flow_box(slide2, "User Login", 6.8, 1.85, 1.8, 0.3, bg_color=YELLOW_LIGHT, is_pill=True, font_size=9.5)
    add_arrow_down(slide2, 7.5, 2.15)
    add_flow_box(slide2, "User Dashboard", 6.8, 2.35, 1.8, 0.35, font_size=9)
    add_arrow_down(slide2, 7.5, 2.7)
    add_flow_box(slide2, "Artifact Search", 6.8, 2.9, 1.8, 0.35, font_size=9)
    add_arrow_down(slide2, 7.5, 3.25)
    add_flow_box(slide2, "3D Studio & OCR", 6.8, 3.45, 1.8, 0.35, font_size=9)
    add_arrow_down(slide2, 7.5, 3.8)
    add_flow_box(slide2, "AI Guide & Voice", 6.8, 4.0, 1.8, 0.35, font_size=9)
    add_arrow_down(slide2, 7.5, 4.35)
    add_flow_box(slide2, "Artisan Connect", 6.8, 4.55, 1.8, 0.35, font_size=9)
    add_arrow_down(slide2, 7.5, 4.9)
    add_flow_box(slide2, "Feedback & Support", 6.8, 5.1, 1.8, 0.35, font_size=9)

    # Right Branch (Govt / Curator)
    add_flow_box(slide2, "Govt Login", 10.4, 1.85, 1.8, 0.3, bg_color=YELLOW_LIGHT, is_pill=True, font_size=9.5)
    add_arrow_down(slide2, 11.1, 2.15)

    # 4 Dept Mini boxes
    add_flow_box(slide2, "Ministry Of Culture", 9.0, 2.35, 1.4, 0.35, font_size=7)
    add_flow_box(slide2, "ASI Depts.", 10.5, 2.35, 1.1, 0.35, font_size=7)
    add_flow_box(slide2, "NMM & Archives", 11.7, 2.35, 1.2, 0.35, font_size=7)

    add_arrow_down(slide2, 11.1, 2.7)
    add_flow_box(slide2, "Government Dashboard", 9.8, 2.9, 2.6, 0.35, font_size=9)
    add_arrow_down(slide2, 10.9, 3.25)
    add_flow_box(slide2, "Document Verification", 9.8, 3.45, 2.6, 0.35, font_size=9)
    add_arrow_down(slide2, 10.9, 3.8)
    add_flow_box(slide2, "Spatial & Epigraphic Verification", 9.8, 4.0, 2.6, 0.35, font_size=8.5)
    add_arrow_down(slide2, 10.9, 4.35)
    add_flow_box(slide2, "Approve/Publish Exhibit", 9.8, 4.55, 2.6, 0.35, font_size=9)
    add_arrow_down(slide2, 10.9, 4.9)
    add_flow_box(slide2, "Update Heritage Atlas", 9.8, 5.1, 2.6, 0.35, font_size=9)
    add_arrow_down(slide2, 10.9, 5.45)
    add_flow_box(slide2, "Generate Reports", 9.8, 5.65, 2.6, 0.35, font_size=9)

    # Converge bottom
    add_arrow_down(slide2, 8.8, 5.85)
    add_flow_box(slide2, "VirasatX Central Heritage Atlas + DSS", 7.6, 6.15, 4.4, 0.45, font_size=10.5)

    # =========================================================================
    # SLIDE 3: TECHNICAL APPROACH
    # =========================================================================
    slide3 = prs.slides.add_slide(blank_layout)
    add_common_header(slide3, "TECHNICAL APPROACH", 3)
    add_vertical_divider(slide3)

    # Left Column: Tech Stack & UI Box
    s3_left = slide3.shapes.add_textbox(Inches(0.5), Inches(1.15), Inches(5.9), Inches(4.0))
    tf3_l = s3_left.text_frame
    tf3_l.word_wrap = True

    tech_bullets = [
        ("Data Extraction:", "Optical Character Recognition (OCR), NLP, Vision Transformers."),
        ("WebGIS platform:", "Leaflet.js & OpenLayers (for interactive maps)."),
        ("Asset Mapping:", "Random Forest & CNN (for motif & iconography classification)."),
        ("Data Storage:", "PostgreSQL & PostGIS (for geospatial data)."),
        ("Data Management:", "Cloud Object Storage & MySQL (Structured metadata)."),
        ("GeoServer:", "Use standard protocols WMS and WFS to serve maps."),
        ("Decision Support System:", "For tourist dispersal & scheme recommendations."),
        ("Blockchain based Security:", "Hyperledger Fabric (for digital provenance & GI)."),
        ("Key Lock Framework:", "Open-source Identity & Access Management."),
        ("Rasa / RAG AI:", "Preferred for its offline, multilingual, and secure chatbot.")
    ]

    for idx, (title, desc) in enumerate(tech_bullets):
        p = tf3_l.paragraphs[0] if idx == 0 else tf3_l.add_paragraph()
        p.space_after = Pt(2)
        r_t = p.add_run()
        r_t.text = f"• {title} "
        r_t.font.name = "Arial"
        r_t.font.size = Pt(10.5)
        r_t.font.bold = True
        r_t.font.underline = True
        r_t.font.color.rgb = GREEN_ACCENT

        r_d = p.add_run()
        r_d.text = desc
        r_d.font.name = "Arial"
        r_d.font.size = Pt(10)
        r_d.font.color.rgb = BLACK

    # Left Bottom UI Draft Preview Card
    ui_card = slide3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.5), Inches(4.85), Inches(5.9), Inches(1.85))
    ui_card.fill.solid()
    ui_card.fill.fore_color.rgb = RGBColor(240, 253, 244)
    ui_card.line.color.rgb = BLACK
    ui_card.line.width = Pt(1.2)
    tf_ui = ui_card.text_frame
    tf_ui.word_wrap = True

    p_ui1 = tf_ui.paragraphs[0]
    p_ui1.text = "🏛️ VirasatX Digital Heritage Portal (Draft Live Prototype)"
    p_ui1.font.name = "Arial"
    p_ui1.font.size = Pt(10.5)
    p_ui1.font.bold = True
    p_ui1.font.color.rgb = GREEN_ACCENT

    p_ui2 = tf_ui.add_paragraph()
    p_ui2.text = "[ Navigation: 3D Studio | Manuscripts | Heritage Map | AI Curatorial Guide ]\n• 3D Canvas: 360° rotation, real-time lighting simulation, sub-mm loupe.\n• AI Sidecar: Grounded RAG citations with ancient script transcription."
    p_ui2.font.name = "Arial"
    p_ui2.font.size = Pt(9)
    p_ui2.font.color.rgb = BLACK

    p_ui3 = tf_ui.add_paragraph()
    p_ui3.text = "User Interface: It is a draft version, subject to future updates."
    p_ui3.font.name = "Arial"
    p_ui3.font.size = Pt(9.5)
    p_ui3.font.bold = True
    p_ui3.font.color.rgb = BLACK

    # Right Column: System Architecture Diagram
    add_flow_box(slide3, "🌐 Web / Mobile Browser", 8.2, 1.25, 3.2, 0.4, bg_color=WHITE, is_pill=True, font_size=10.5)
    add_arrow_down(slide3, 9.6, 1.68)

    # Frontend Layer
    add_flow_box(slide3, "Frontend Layer (HTML5, CSS, JS, Leaflet.js, Three.js, React 19)", 7.0, 1.9, 5.6, 0.55, bg_color=RGBColor(248, 250, 252), font_size=9.5)

    # Request / Response
    tx_req = slide3.shapes.add_textbox(Inches(7.0), Inches(2.45), Inches(5.6), Inches(0.3))
    p_req = tx_req.text_frame.paragraphs[0]
    p_req.text = "▲ Request                       ▼ Response"
    p_req.font.name = "Arial"
    p_req.font.size = Pt(8.5)
    p_req.font.bold = True
    p_req.alignment = PP_ALIGN.CENTER

    # Backend Node.js
    add_flow_box(slide3, "Backend (API Gateway / Node.js)", 7.0, 2.75, 5.6, 0.4, bg_color=WHITE, font_size=10.5)
    add_arrow_down(slide3, 9.6, 3.15)

    # 3 Modules
    add_flow_box(slide3, "GIS Module\n(GeoServer/Leaflet)", 7.0, 3.4, 1.75, 0.55, bg_color=RGBColor(239, 246, 255), font_size=8.5)
    add_flow_box(slide3, "AI/ML Core\n(CNN & Paleography)", 8.9, 3.4, 1.75, 0.55, bg_color=RGBColor(253, 242, 248), font_size=8.5)
    add_flow_box(slide3, "Blockchain\n(Hyperledger Fabric)", 10.8, 3.4, 1.75, 0.55, bg_color=RGBColor(254, 243, 199), font_size=8.5)

    add_arrow_down(slide3, 9.6, 4.0)

    # Storage Layer
    add_flow_box(slide3, "Data Storage: PostgreSQL + PostGIS | Cloud Object Storage | MySQL", 7.0, 4.25, 5.6, 0.45, bg_color=RGBColor(241, 245, 249), font_size=9)

    # Integration & Security Row
    add_flow_box(slide3, "Integration:\nSatellite APIs | Government APIs | Decision Support System", 7.0, 4.95, 2.7, 0.65, bg_color=RGBColor(240, 249, 255), font_size=8.5)
    add_flow_box(slide3, "Security:\nBlockchain, JSON Web Tokens, AES-256 & RSA Encryption", 9.9, 4.95, 2.7, 0.65, bg_color=RGBColor(240, 253, 244), font_size=8.5)

    # =========================================================================
    # SLIDE 4: FEASIBILITY AND VIABILITY
    # =========================================================================
    slide4 = prs.slides.add_slide(blank_layout)
    add_common_header(slide4, "FEASIBILITY AND VIABILITY", 4)
    add_vertical_divider(slide4)

    # Left Column: Feasibility
    s4_left = slide4.shapes.add_textbox(Inches(0.5), Inches(1.15), Inches(5.9), Inches(5.7))
    tf4_l = s4_left.text_frame
    tf4_l.word_wrap = True

    p_f_head = tf4_l.paragraphs[0]
    p_f_head.text = "❖ Feasibility:"
    p_f_head.font.name = "Arial"
    p_f_head.font.size = Pt(18)
    p_f_head.font.bold = True
    p_f_head.font.color.rgb = BLUE_HEADING
    p_f_head.space_after = Pt(4)

    feasibility_data = [
        ("1. Technical Feasibility:", [
            ("1. Digitization, AI Mapping and Web-GIS Dashboards:", [
                "OCR and AI extract data from fragile ancient manuscripts.",
                "Web-GIS dashboards show real-time interactive heritage maps."
            ]),
            ("2. DSS Integration with Blockchain Security:", [
                "AI engines match cultural schemes to community needs.",
                "Blockchain ensures secure, tamper-proof digital records."
            ])
        ]),
        ("2. Operational Feasibility:", [
            ("1. Existing Setup and Simple Staff Training:", [
                "Museum and archival data exists, needs unified connection.",
                "Staff need basic training through short workshops."
            ]),
            ("2. Stakeholder Support and Effective Implementation:", [
                "Ministries and cultural NGOs already support heritage preservation.",
                "System strengthens efforts, not replacing existing work."
            ])
        ]),
        ("3. Legal & Ethical Feasibility:", [
            ("1. Data Privacy:", [
                "Must follow India’s DPDP Act, ensuring legal compliance.",
                "Blockchain and encryption safeguard sensitive user data."
            ]),
            ("2. Consent Mechanism:", [
                "Holders' informed consent required in all processes.",
                "Real-time feedback enables secure two-way communication."
            ])
        ])
    ]

    for section_title, subsections in feasibility_data:
        p_sec = tf4_l.add_paragraph()
        p_sec.text = section_title
        p_sec.font.name = "Arial"
        p_sec.font.size = Pt(11)
        p_sec.font.bold = True
        p_sec.font.underline = True
        p_sec.font.color.rgb = GREEN_ACCENT
        p_sec.space_before = Pt(3)

        for sub_title, bullets in subsections:
            p_sub = tf4_l.add_paragraph()
            p_sub.text = f"  {sub_title}"
            p_sub.font.name = "Arial"
            p_sub.font.size = Pt(10)
            p_sub.font.bold = True
            p_sub.font.color.rgb = BLACK

            for b in bullets:
                p_b = tf4_l.add_paragraph()
                p_b.text = f"    • {b}"
                p_b.font.name = "Arial"
                p_b.font.size = Pt(9.5)
                p_b.font.color.rgb = DARK_TEXT

    # Right Column: Viability
    s4_right = slide4.shapes.add_textbox(Inches(6.8), Inches(1.15), Inches(5.9), Inches(5.7))
    tf4_r = s4_right.text_frame
    tf4_r.word_wrap = True

    p_v_head = tf4_r.paragraphs[0]
    p_v_head.text = "❖ Viability:"
    p_v_head.font.name = "Arial"
    p_v_head.font.size = Pt(18)
    p_v_head.font.bold = True
    p_v_head.font.color.rgb = BLUE_HEADING
    p_v_head.space_after = Pt(4)

    viability_data = [
        ("1. Economic Viability:", [
            ("1. Cost-Effective & Efficient:", [
                "Saves paperwork, effort, duplication, and reduces physical wear.",
                "Cuts processing delays, expenses, and operational overhead."
            ]),
            ("2. Supported & Scalable Technology:", [
                "Backed by government programs and cultural inclusion schemes.",
                "Open-source tech ensures flexible, low-cost, future-ready deployment."
            ])
        ]),
        ("2. Social Viability:", [
            ("1. Empowers Communities & Improves Scheme Access:", [
                "Provides transparency, secure records, and better documentation.",
                "Directly benefits artisan cooperatives through market access."
            ]),
            ("2. Reduces Conflict & Promotes Stronger Inclusion:", [
                "Verified records, citations reduce frequent historical disputes.",
                "Mobile updates, two-way communication improve engagement."
            ])
        ]),
        ("3. Scalability:", [
            ("1. Pan-India Expansion for Wider Community Benefits:", [
                "Pilot in districts & ASI circles, then scale across India.",
                "Adjust platform easily for local data and regional dialects."
            ]),
            ("2. Cross-Sector Use of WebGIS + DSS:", [
                "Adaptable for archaeology, urban heritage planning needs.",
                "Useful in disaster management and post-crisis restoration."
            ])
        ])
    ]

    for section_title, subsections in viability_data:
        p_sec = tf4_r.add_paragraph()
        p_sec.text = section_title
        p_sec.font.name = "Arial"
        p_sec.font.size = Pt(11)
        p_sec.font.bold = True
        p_sec.font.underline = True
        p_sec.font.color.rgb = GREEN_ACCENT
        p_sec.space_before = Pt(3)

        for sub_title, bullets in subsections:
            p_sub = tf4_r.add_paragraph()
            p_sub.text = f"  {sub_title}"
            p_sub.font.name = "Arial"
            p_sub.font.size = Pt(10)
            p_sub.font.bold = True
            p_sub.font.color.rgb = BLACK

            for b in bullets:
                p_b = tf4_r.add_paragraph()
                p_b.text = f"    • {b}"
                p_b.font.name = "Arial"
                p_b.font.size = Pt(9.5)
                p_b.font.color.rgb = DARK_TEXT

    # =========================================================================
    # SLIDE 5: IMPACT AND BENEFITS
    # =========================================================================
    slide5 = prs.slides.add_slide(blank_layout)
    add_common_header(slide5, "IMPACT AND BENEFITS", 5)
    add_vertical_divider(slide5)

    # Left Column: Benefits
    s5_left = slide5.shapes.add_textbox(Inches(0.5), Inches(1.15), Inches(5.9), Inches(5.7))
    tf5_l = s5_left.text_frame
    tf5_l.word_wrap = True

    p_b_head = tf5_l.paragraphs[0]
    p_b_head.text = "❖ Benefits:"
    p_b_head.font.name = "Arial"
    p_b_head.font.size = Pt(18)
    p_b_head.font.bold = True
    p_b_head.font.color.rgb = BLUE_HEADING
    p_b_head.space_after = Pt(4)

    benefits_data = [
        ("1. Social Benefits:", [
            "Digital platform enables communities with interactive heritage learning.",
            "IVR helpline, e-learning ensure inclusive literacy access.",
            "Transparent records, video testimonies reduce conflict, build trust."
        ]),
        ("2. Environmental Benefits:", [
            "Sustainable tourism through AI crowd dispersal around monuments.",
            "Conservation through community stewardship and digital archiving.",
            "GI Tagging preserves cultural heritage & traditional handicraft products."
        ]),
        ("3. Economic Benefits:", [
            "Access to schemes (Heritage City Development, PRASHAD, Swadesh Darshan).",
            "GI Tagging boosts local artisanal products & tribal livelihoods.",
            "Direct artisan connection ensures secure economic stability -> fair wages."
        ]),
        ("4. Governance Benefits:", [
            "Audit trails ensure curatorial accountability, prevent misuse.",
            "Whistleblowing/review portal boosts transparency, fights illicit trade.",
            "Cross-validation stops duplication and fraudulent claims."
        ]),
        ("5. Legal & Security Benefits:", [
            "E-Signature & Digital Records provide legally valid provenance records.",
            "Protection against unauthorized duplication (Illegal Practice Alert).",
            "Digital witness/testimony ensures fair dispute settlement."
        ])
    ]

    for sec_title, bullets in benefits_data:
        p_s = tf5_l.add_paragraph()
        p_s.text = sec_title
        p_s.font.name = "Arial"
        p_s.font.size = Pt(11)
        p_s.font.bold = True
        p_s.font.underline = True
        p_s.font.color.rgb = GREEN_ACCENT
        p_s.space_before = Pt(2)

        for b in bullets:
            p_b = tf5_l.add_paragraph()
            p_b.text = f"• {b}"
            p_b.font.name = "Arial"
            p_b.font.size = Pt(9.5)
            p_b.font.color.rgb = DARK_TEXT

    # Right Column: Impacts
    s5_right = slide5.shapes.add_textbox(Inches(6.8), Inches(1.15), Inches(5.9), Inches(5.7))
    tf5_r = s5_right.text_frame
    tf5_r.word_wrap = True

    p_i_head = tf5_r.paragraphs[0]
    p_i_head.text = "❖ Impacts:"
    p_i_head.font.name = "Arial"
    p_i_head.font.size = Pt(18)
    p_i_head.font.bold = True
    p_i_head.font.color.rgb = BLUE_HEADING
    p_i_head.space_after = Pt(4)

    impacts_data = [
        ("1. Secure Cultural Rights & Transparency:", [
            "Communities track claims and archival data, reducing neglect.",
            "Digital records ensure authenticity in museum cataloging.",
            "Builds trust between citizens, scholars, and government authorities."
        ]),
        ("2. Heritage Protection & Conservation with AI:", [
            "AI monitors physical & digital assets to prevent loss and decay.",
            "Conserves ancient knowledge and safeguards rare manuscripts.",
            "Promotes sustainable, community-driven cultural resource management."
        ]),
        ("3. Boost Livelihoods & Local Development:", [
            "Resource planning improves incomes and rural handicraft economy.",
            "GI tagging protects heritage, boosts local products internationally.",
            "VirasatX enables fair access to national cultural welfare schemes."
        ]),
        ("4. Digital, Eco-Friendly & Cost Effective:", [
            "Reduces paperwork, ensuring greener, eco-friendly e-governance.",
            "Preserves tribal & traditional knowledge through digital archiving tools.",
            "Lowers administrative costs and increases curatorial efficiency."
        ]),
        ("5. Smart, Transparent & Scalable Governance:", [
            "Transparent dashboards track digitization performance and visitor engagement.",
            "AI dispute mediation ensures fairness, reduces subjective human bias.",
            "Unified digital platform enables future-ready, pan-India expansion."
        ])
    ]

    for sec_title, bullets in impacts_data:
        p_s = tf5_r.add_paragraph()
        p_s.text = sec_title
        p_s.font.name = "Arial"
        p_s.font.size = Pt(11)
        p_s.font.bold = True
        p_s.font.underline = True
        p_s.font.color.rgb = GREEN_ACCENT
        p_s.space_before = Pt(2)

        for b in bullets:
            p_b = tf5_r.add_paragraph()
            p_b.text = f"• {b}"
            p_b.font.name = "Arial"
            p_b.font.size = Pt(9.5)
            p_b.font.color.rgb = DARK_TEXT

    # =========================================================================
    # SLIDE 6: RESEARCH AND REFERENCES
    # =========================================================================
    slide6 = prs.slides.add_slide(blank_layout)
    add_common_header(slide6, "RESEARCH AND REFERENCES", 6)

    s6_box = slide6.shapes.add_textbox(Inches(0.6), Inches(1.15), Inches(12.133), Inches(5.6))
    tf6 = s6_box.text_frame
    tf6.word_wrap = True

    references_data = [
        ("1. Archaeological Survey of India (ASI) & National Heritage Portals:",
         "The Archaeological Survey of India (ASI) and Ministry of Culture govern the protection and documentation of cultural heritage monuments, ancient inscriptions, and archaeological excavations.",
         "https://asi.nic.in/  |  https://asi.nic.in/epigraphy/"),

        ("2. National Mission for Manuscripts (NMM) & Paleography Standards:",
         "Established by Ministry of Culture to unearth, preserve, and digitally catalog India’s vast manuscript heritage (Talapatra, Bhojpatra) and ancient epigraphy.",
         "https://www.namami.gov.in/  |  https://ignca.gov.in/"),

        ("3. Best Practices for Web Security & Cryptographic Integrity:",
         "This framework outlines key web security measures, DPDP Act 2023 compliance, and verifiable tamper-proof records using Blockchain & Encryption Standards.",
         "https://owasp.org/www-project-top-ten/  |  https://www.meity.gov.in/data-protection-framework"),

        ("4. The AMASR Act 1958 & GI Registry:",
         "The Ancient Monuments and Archaeological Sites and Remains Act (1958 & 2010) and Geographical Indications of Goods Act (1999) safeguarding cultural heritage & traditional artisan products.",
         "https://indiacode.nic.in/handle/123456789/1631  |  https://ipindia.gov.in/geographical-indications.htm")
    ]

    for idx, (head, body, url) in enumerate(references_data):
        p_h = tf6.paragraphs[0] if idx == 0 else tf6.add_paragraph()
        p_h.text = head
        p_h.font.name = "Arial"
        p_h.font.size = Pt(12)
        p_h.font.bold = True
        p_h.font.underline = True
        p_h.font.color.rgb = GREEN_ACCENT
        p_h.space_before = Pt(4)

        p_b = tf6.add_paragraph()
        p_b.text = body
        p_b.font.name = "Arial"
        p_b.font.size = Pt(11)
        p_b.font.color.rgb = BLACK

        p_u = tf6.add_paragraph()
        p_u.text = url
        p_u.font.name = "Arial"
        p_u.font.size = Pt(10.5)
        p_u.font.underline = True
        p_u.font.color.rgb = BLUE_HEADING
        p_u.space_after = Pt(4)

    # Official Contacts Callout Box
    contact_box = slide6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.6), Inches(5.3), Inches(12.133), Inches(1.5))
    contact_box.fill.solid()
    contact_box.fill.fore_color.rgb = RGBColor(248, 250, 252)
    contact_box.line.color.rgb = BLUE_HEADING
    contact_box.line.width = Pt(1.5)
    tf_c = contact_box.text_frame
    tf_c.word_wrap = True

    p_c1 = tf_c.paragraphs[0]
    p_c1.text = "To enable smooth implementation and integration of the VirasatX System, the following contacts serve as official national-level resources for communication, data coordination, and support:"
    p_c1.font.name = "Arial"
    p_c1.font.size = Pt(10)
    p_c1.font.bold = True
    p_c1.font.color.rgb = NAVY_TITLE
    p_c1.space_after = Pt(3)

    contacts = [
        "5. Ministry of Culture: https://indiaculture.gov.in/  |  secy-culture@nic.in",
        "6. National Museum, New Delhi: https://nationalmuseumindia.gov.in/",
        "7. National Archives of India: https://www.abhilekh-patal.in/",
        "8. UNESCO World Heritage Centre: https://whc.unesco.org/en/statesparties/in"
    ]

    for c in contacts:
        p_ci = tf_c.add_paragraph()
        p_ci.text = c
        p_ci.font.name = "Arial"
        p_ci.font.size = Pt(9.5)
        p_ci.font.color.rgb = BLACK

    try:
        prs.save(output_path)
        print(f"Presentation saved successfully to: {output_path}")
    except PermissionError:
        print(f"Notice: {output_path} is currently locked by another application (e.g. PowerPoint).")

    # Also save to dedicated SanskritiRakshaX PPTX file
    out_dir = os.path.dirname(output_path)
    sr_file = os.path.join(out_dir, "SIH2026_SanskritiRakshaX_Idea_Submission.pptx")
    try:
        prs.save(sr_file)
        print(f"Presentation saved successfully to: {sr_file}")
    except Exception as e:
        print(f"Could not save to {sr_file}: {e}")

if __name__ == "__main__":
    out_dir = os.path.dirname(os.path.abspath(__file__))
    pptx_file = os.path.join(out_dir, "SIH2026_VirasatX_Idea_Submission.pptx")
    create_pptx(pptx_file)
