import os
import sys
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE

def build_presentation(is_hackastra=False):
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]

    cur_dir = os.path.dirname(os.path.abspath(__file__))
    logo_png = os.path.join(cur_dir, "sih_logo.png")
    bulb_png = os.path.join(cur_dir, "sih_bulb.png")
    img_dir = os.path.join(cur_dir, "images")

    NAVY_TITLE = RGBColor(27, 54, 93)        # #1B365D
    BLACK = RGBColor(0, 0, 0)
    BLUE_HEADING = RGBColor(0, 112, 192)     # #0070C0
    GREEN_ACCENT = RGBColor(21, 128, 61)     # #15803D
    WHITE = RGBColor(255, 255, 255)
    GRAY_TEXT = RGBColor(71, 85, 105)        # #475569

    team_name = "Hackastra" if is_hackastra else "VirasatX"

    def add_sih_footer(slide, slide_num):
        rect = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(7.12), Inches(13.333), Inches(0.38))
        rect.fill.solid()
        rect.fill.fore_color.rgb = BLUE_HEADING
        rect.line.fill.background()

        tf = rect.text_frame
        tf.word_wrap = False
        p = tf.paragraphs[0]
        p.text = "@SIH Idea submission- Template"
        p.font.name = "Arial"
        p.font.size = Pt(12)
        p.font.bold = True
        p.font.color.rgb = WHITE
        p.alignment = PP_ALIGN.CENTER

        num_box = slide.shapes.add_textbox(Inches(12.0), Inches(7.12), Inches(1.1), Inches(0.38))
        p_num = num_box.text_frame.paragraphs[0]
        p_num.text = str(slide_num)
        p_num.font.name = "Arial"
        p_num.font.size = Pt(13)
        p_num.font.bold = True
        p_num.font.color.rgb = WHITE
        p_num.alignment = PP_ALIGN.RIGHT

    def add_common_header(slide, title_text, slide_num):
        # 1. Top Left Team Oval
        oval = slide.shapes.add_shape(MSO_SHAPE.OVAL, Inches(0.45), Inches(0.18), Inches(1.85), Inches(0.75))
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
        p2.text = team_name
        p2.font.name = "Arial"
        p2.font.size = Pt(11)
        p2.font.bold = True
        p2.font.color.rgb = BLACK
        p2.alignment = PP_ALIGN.CENTER

        # 2. Center Title (Exact SIH 2026 Template: Serif Bold, No Box)
        title_box = slide.shapes.add_textbox(Inches(2.5), Inches(0.18), Inches(8.333), Inches(0.75))
        tf_title = title_box.text_frame
        tf_title.word_wrap = True
        p_p = tf_title.paragraphs[0]
        p_p.text = title_text
        p_p.font.name = "Times New Roman"
        p_p.font.size = Pt(24) if len(title_text) > 24 else Pt(26)
        p_p.font.bold = True
        p_p.font.color.rgb = BLACK
        p_p.alignment = PP_ALIGN.CENTER

        # 3. Top Right SIH Logo
        if os.path.exists(logo_png):
            slide.shapes.add_picture(logo_png, Inches(11.0), Inches(0.15), width=Inches(1.85))

        # 4. Footer Bar
        add_sih_footer(slide, slide_num)

    def add_sharp_border(slide, x, y, w, h):
        box = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(x), Inches(y), Inches(w), Inches(h))
        box.fill.solid()
        box.fill.fore_color.rgb = WHITE
        box.line.color.rgb = BLACK
        box.line.width = Pt(1.8)
        return box

    # #########################################################################
    # BUILD TEAM VIRASATX DECK (6 SLIDES - 100% VERIFIED & PRESERVED DESIGN)
    # #########################################################################
    if not is_hackastra:
        fc_img = os.path.join(img_dir, "virasatx_flowchart.png")
        arch_img = os.path.join(img_dir, "virasatx_arch.png")
        ui_img = os.path.join(img_dir, "home.png")

        # ---------------------------------------------------------------------
        # SLIDE 1: TITLE PAGE
        # ---------------------------------------------------------------------
        slide1 = prs.slides.add_slide(blank_layout)

        h1_box = slide1.shapes.add_textbox(Inches(0.5), Inches(0.32), Inches(12.333), Inches(0.8))
        p_h1 = h1_box.text_frame.paragraphs[0]
        p_h1.text = "SMART INDIA HACKATHON 2026"
        p_h1.font.name = "Times New Roman"
        p_h1.font.size = Pt(36)
        p_h1.font.bold = True
        p_h1.font.color.rgb = NAVY_TITLE
        p_h1.alignment = PP_ALIGN.CENTER

        if os.path.exists(logo_png):
            slide1.shapes.add_picture(logo_png, Inches(10.8), Inches(0.2), width=Inches(2.0))

        tp_box = slide1.shapes.add_textbox(Inches(1.5), Inches(1.15), Inches(10.333), Inches(0.6))
        p_tp = tp_box.text_frame.paragraphs[0]
        p_tp.text = "TITLE PAGE"
        p_tp.font.name = "Times New Roman"
        p_tp.font.size = Pt(32)
        p_tp.font.bold = True
        p_tp.font.color.rgb = BLACK
        p_tp.alignment = PP_ALIGN.CENTER

        # Right Side Bulb Graphic
        if os.path.exists(bulb_png):
            slide1.shapes.add_picture(bulb_png, Inches(8.3), Inches(1.55), width=Inches(4.3))

        # Left Side: Exact 6 Official Pointers
        meta_box = slide1.shapes.add_textbox(Inches(0.8), Inches(2.25), Inches(7.5), Inches(4.8))
        tf_m = meta_box.text_frame
        tf_m.word_wrap = True

        v_items = [
            ("• Problem Statement ID – ", "SIH26197", True),
            ("• Problem Statement Title- ", "Student Innovation—Ideas that showcase the rich cultural heritage and traditions of India", False),
            ("• Theme- ", "Heritage & Culture", True),
            ("• PS Category- ", "Software", True),
            ("• Team ID- ", "57385", False),
            ("• Team Name (Registered on portal) ", "Team VirasatX", False)
        ]

        for idx, (label, val, val_under) in enumerate(v_items):
            p = tf_m.paragraphs[0] if idx == 0 else tf_m.add_paragraph()
            p.space_after = Pt(18)
            r_lbl = p.add_run()
            r_lbl.text = label
            r_lbl.font.name = "Arial"
            r_lbl.font.size = Pt(17)
            r_lbl.font.bold = True
            r_lbl.font.color.rgb = BLACK

            r_val = p.add_run()
            r_val.text = val
            r_val.font.name = "Arial"
            r_val.font.size = Pt(17)
            r_val.font.bold = True
            r_val.font.underline = val_under
            r_val.font.color.rgb = BLACK

        # ---------------------------------------------------------------------
        # SLIDE 2: IDEA TITLE (PROBLEM / SOLUTION / UVP)
        # ---------------------------------------------------------------------
        slide2 = prs.slides.add_slide(blank_layout)
        add_common_header(slide2, "IDEA TITLE: VIRASATX", 2)

        s2_left = slide2.shapes.add_textbox(Inches(0.45), Inches(1.04), Inches(6.0), Inches(5.8))
        tf2_l = s2_left.text_frame
        tf2_l.word_wrap = True

        p_s2_head = tf2_l.paragraphs[0]
        p_s2_head.text = "❖ Proposed Solution (Describe your Idea/Solution/Prototype):"
        p_s2_head.font.name = "Arial"
        p_s2_head.font.size = Pt(14)
        p_s2_head.font.bold = True
        p_s2_head.font.underline = True
        p_s2_head.font.color.rgb = BLUE_HEADING
        p_s2_head.space_after = Pt(4)

        s2_sections = [
            ("• Detailed explanation of the proposed solution", [
                ("Unified Cultural Ecosystem:", "VirasatX connects monuments, 3D artifacts, living traditions, timelines, and regional geography into one cohesive, discoverable experience."),
                ("Multi-Modal Exploration:", "Interactive Three.js WebGL 3D artifact studio, 11-period chronological timeline, Leaflet GIS heritage mapping, and living artisan craft profiles."),
                ("Google Gemini Multimodal AI:", "Contextual conversational cultural Q&A and visual iconography AI analyzing motifs, mudras, and architectural orders with fact-grounded guardrails.")
            ]),
            ("• How it addresses the problem", [
                ("Synthesizes Fragmented Archives:", "Overcomes isolated, disconnected heritage archives by linking assets across historical epochs and geographic regions into an intuitive discovery graph."),
                ("Bridges Cultural Context Gap:", "Transitions users from passive browsing to deep civilizational context (Dynasty → Period → Artisan Technique → Architectural Symbolism)."),
                ("Elevates Endangered Traditions:", "Provides dedicated digital visibility and direct patronage pathways for endangered craft forms, folklore, and master artisans.")
            ]),
            ("• Innovation and uniqueness of the solution", [
                ("Context-First Philosophy:", "“VirasatX connects the cultural context around heritage — not just isolated artifacts or 3D models.”"),
                ("Interconnected Discovery Chain:", "Artifact → Story → Period → Place → Tradition → Community → Active Learning & Patronage.")
            ])
        ]

        for sec_title, items in s2_sections:
            p_sec = tf2_l.add_paragraph()
            p_sec.space_after = Pt(2)
            r_s = p_sec.add_run()
            r_s.text = sec_title
            r_s.font.name = "Arial"
            r_s.font.size = Pt(11)
            r_s.font.bold = True
            r_s.font.color.rgb = BLACK

            for title, desc in items:
                p = tf2_l.add_paragraph()
                p.space_after = Pt(2)
                r_t = p.add_run()
                r_t.text = f"  • {title} "
                r_t.font.name = "Arial"
                r_t.font.size = Pt(9)
                r_t.font.bold = True
                r_t.font.color.rgb = BLACK

                r_d = p.add_run()
                r_d.text = desc
                r_d.font.name = "Arial"
                r_d.font.size = Pt(9)
                r_d.font.color.rgb = GRAY_TEXT

        # Diagram Card Right
        box2 = slide2.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(6.6), Inches(1.04), Inches(6.3), Inches(5.8))
        box2.fill.solid()
        box2.fill.fore_color.rgb = WHITE
        box2.line.color.rgb = RGBColor(203, 213, 225)
        box2.line.width = Pt(1.0)
        if os.path.exists(fc_img):
            slide2.shapes.add_picture(fc_img, Inches(6.65), Inches(1.09), width=Inches(6.2), height=Inches(5.7))

        # ---------------------------------------------------------------------
        # SLIDE 3: TECHNICAL APPROACH
        # ---------------------------------------------------------------------
        slide3 = prs.slides.add_slide(blank_layout)
        add_common_header(slide3, "TECHNICAL APPROACH", 3)

        s3_top = slide3.shapes.add_textbox(Inches(0.45), Inches(1.04), Inches(6.0), Inches(2.75))
        tf3_t = s3_top.text_frame
        tf3_t.word_wrap = True

        p_t1 = tf3_t.paragraphs[0]
        p_t1.text = "• Technologies to be used (e.g. programming languages, frameworks, hardware)"
        p_t1.font.name = "Arial"
        p_t1.font.size = Pt(11)
        p_t1.font.bold = True
        p_t1.font.color.rgb = BLACK
        p_t1.space_after = Pt(3)

        tech_bullets = [
            ("Frontend Framework:", "React 19, TypeScript, Vite & Tailwind CSS with Motion."),
            ("Multimodal AI Engine:", "Google Gemini AI for contextual cultural exploration and visual iconography analysis."),
            ("3D Artifact Studio:", "Three.js & WebGL for real-time interactive 3D model rendering directly in mobile browsers."),
            ("GIS Spatial Mapping:", "Leaflet & OpenStreetMap for geographic heritage discovery and cluster exploration."),
            ("Voice Interaction:", "Web Speech API for voice-assisted queries and audio guidance."),
            ("Backend & Database:", "Supabase with PostgreSQL relational database and Row Level Security (RLS)."),
            ("Cloud & Edge:", "Vercel serverless edge deployment ensuring sub-second global response times.")
        ]

        for title, desc in tech_bullets:
            p = tf3_t.add_paragraph()
            p.space_after = Pt(2)
            r_t = p.add_run()
            r_t.text = f"  • {title} "
            r_t.font.name = "Arial"
            r_t.font.size = Pt(9.5)
            r_t.font.bold = True
            r_t.font.color.rgb = GREEN_ACCENT

            r_d = p.add_run()
            r_d.text = desc
            r_d.font.name = "Arial"
            r_d.font.size = Pt(9.5)
            r_d.font.color.rgb = BLACK

        s3_mid = slide3.shapes.add_textbox(Inches(0.45), Inches(3.85), Inches(6.0), Inches(0.35))
        p_t2 = s3_mid.text_frame.paragraphs[0]
        p_t2.text = "• Methodology and process for implementation (Flow Charts/Images/ working prototype)"
        p_t2.font.name = "Arial"
        p_t2.font.size = Pt(11)
        p_t2.font.bold = True
        p_t2.font.color.rgb = BLACK

        # UI Prototype Card
        box_ui = slide3.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.45), Inches(4.25), Inches(6.0), Inches(2.6))
        box_ui.fill.solid()
        box_ui.fill.fore_color.rgb = WHITE
        box_ui.line.color.rgb = RGBColor(203, 213, 225)
        box_ui.line.width = Pt(1.0)
        if os.path.exists(ui_img):
            slide3.shapes.add_picture(ui_img, Inches(0.48), Inches(4.28), width=Inches(5.94), height=Inches(2.25))

        cap_box = slide3.shapes.add_textbox(Inches(0.45), Inches(6.55), Inches(6.0), Inches(0.28))
        p_c = cap_box.text_frame.paragraphs[0]
        p_c.text = "Live Working Prototype: React 19 • Three.js WebGL • Gemini AI (https://virasatxai.vercel.app/)"
        p_c.font.name = "Arial"
        p_c.font.size = Pt(9)
        p_c.font.bold = True
        p_c.font.color.rgb = BLACK

        # Architecture Diagram Card Right
        box_arch = slide3.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(6.6), Inches(1.04), Inches(6.3), Inches(5.8))
        box_arch.fill.solid()
        box_arch.fill.fore_color.rgb = WHITE
        box_arch.line.color.rgb = RGBColor(203, 213, 225)
        box_arch.line.width = Pt(1.0)
        if os.path.exists(arch_img):
            slide3.shapes.add_picture(arch_img, Inches(6.65), Inches(1.09), width=Inches(6.2), height=Inches(5.7))

        # ---------------------------------------------------------------------
        # SLIDE 4: FEASIBILITY AND VIABILITY
        # ---------------------------------------------------------------------
        slide4 = prs.slides.add_slide(blank_layout)
        add_common_header(slide4, "FEASIBILITY AND VIABILITY", 4)

        s4_left = slide4.shapes.add_textbox(Inches(0.45), Inches(1.04), Inches(6.0), Inches(5.8))
        tf4_l = s4_left.text_frame
        tf4_l.word_wrap = True

        p_f4 = tf4_l.paragraphs[0]
        p_f4.text = "• Analysis of the feasibility of the idea"
        p_f4.font.name = "Arial"
        p_f4.font.size = Pt(13)
        p_f4.font.bold = True
        p_f4.font.color.rgb = BLUE_HEADING
        p_f4.space_after = Pt(4)

        feas_sections = [
            ("1. Technical Feasibility:", [
                ("Lightweight Web Architecture:", "React 19, TypeScript, and WebGL deliver responsive 3D artifact rendering in mobile browsers without demanding app downloads."),
                ("Modular Multimodal AI:", "Google Gemini multimodal AI orchestrated through serverless edge functions for rapid, low-latency contextual guidance."),
                ("Standardized Cultural Data Schemas:", "Structured PostgreSQL & JSON schemas compatible with national heritage classification standards.")
            ]),
            ("2. Operational Feasibility:", [
                ("Public Open Datasets:", "Built upon documented public domain archives, monument registries, and academic resources without proprietary data locks."),
                ("Zero Infrastructure Overhead:", "Serverless deployment on Vercel and Supabase eliminates physical server upkeep and high operational costs."),
                ("Modular Content Extensibility:", "Structured content taxonomy allows adding new regional monuments, epochs, and craft traditions effortlessly.")
            ]),
            ("3. Legal & Ethical Feasibility:", [
                ("Privacy & Data Governance:", "Strictly compliant with India’s Digital Personal Data Protection (DPDP) Act with zero unauthorized user tracking."),
                ("Cultural Sensitivity & Attribution:", "Strict prompt guardrails enforce respectful, non-distorted historical interpretation with explicit source citations.")
            ])
        ]

        for sec_title, items in feas_sections:
            p_sec = tf4_l.add_paragraph()
            p_sec.space_after = Pt(2)
            r_s = p_sec.add_run()
            r_s.text = sec_title
            r_s.font.name = "Arial"
            r_s.font.size = Pt(10.5)
            r_s.font.bold = True
            r_s.font.color.rgb = GREEN_ACCENT

            for title, desc in items:
                p = tf4_l.add_paragraph()
                p.space_after = Pt(2)
                r_t = p.add_run()
                r_t.text = f"  • {title} "
                r_t.font.name = "Arial"
                r_t.font.size = Pt(9)
                r_t.font.bold = True
                r_t.font.color.rgb = BLACK

                r_d = p.add_run()
                r_d.text = desc
                r_d.font.name = "Arial"
                r_d.font.size = Pt(9)
                r_d.font.color.rgb = GRAY_TEXT

        # Right: Challenges & Strategies
        s4_right = slide4.shapes.add_textbox(Inches(6.7), Inches(1.04), Inches(6.2), Inches(5.8))
        tf4_r = s4_right.text_frame
        tf4_r.word_wrap = True

        p_c4_1 = tf4_r.paragraphs[0]
        p_c4_1.text = "• Potential challenges and risks"
        p_c4_1.font.name = "Arial"
        p_c4_1.font.size = Pt(13)
        p_c4_1.font.bold = True
        p_c4_1.font.color.rgb = BLUE_HEADING
        p_c4_1.space_after = Pt(3)

        chall_items = [
            ("Data Fragmentation:", "Heritage information scattered across divergent regional archives with inconsistent naming conventions."),
            ("AI Hallucination Risk:", "Risk of large language models generating inaccurate historical dates, dynasties, or architectural styles."),
            ("Connectivity Variations:", "Rich 3D models and high-resolution cultural imagery may face latency on 3G/4G rural mobile connections.")
        ]
        for title, desc in chall_items:
            p = tf4_r.add_paragraph()
            p.space_after = Pt(2)
            r_t = p.add_run()
            r_t.text = f"  • {title} "
            r_t.font.name = "Arial"
            r_t.font.size = Pt(9)
            r_t.font.bold = True
            r_t.font.color.rgb = BLACK
            r_d = p.add_run()
            r_d.text = desc
            r_d.font.name = "Arial"
            r_d.font.size = Pt(9)
            r_d.font.color.rgb = GRAY_TEXT

        p_c4_2 = tf4_r.add_paragraph()
        p_c4_2.text = "• Strategies for overcoming these challenges"
        p_c4_2.font.name = "Arial"
        p_c4_2.font.size = Pt(13)
        p_c4_2.font.bold = True
        p_c4_2.font.color.rgb = BLUE_HEADING
        p_c4_2.space_before = Pt(8)
        p_c4_2.space_after = Pt(3)

        strat_items = [
            ("Unified Taxonomy Schemas:", "Standardized normalizers reconcile regional spelling variants, dynasties, and historical eras into a single linked graph."),
            ("Source-Grounded Prompting:", "AI Guide strictly constrained to verified facts with explicit archival citations and uncertainty disclaimers."),
            ("Progressive Web Optimization:", "WebP compression, low-polygon 3D meshes, and browser caching ensure sub-second page loads.")
        ]
        for title, desc in strat_items:
            p = tf4_r.add_paragraph()
            p.space_after = Pt(2)
            r_t = p.add_run()
            r_t.text = f"  • {title} "
            r_t.font.name = "Arial"
            r_t.font.size = Pt(9)
            r_t.font.bold = True
            r_t.font.color.rgb = BLACK
            r_d = p.add_run()
            r_d.text = desc
            r_d.font.name = "Arial"
            r_d.font.size = Pt(9)
            r_d.font.color.rgb = GRAY_TEXT

        p_c4_3 = tf4_r.add_paragraph()
        p_c4_3.text = "❖ Economic Viability & Scalability"
        p_c4_3.font.name = "Arial"
        p_c4_3.font.size = Pt(12)
        p_c4_3.font.bold = True
        p_c4_3.font.color.rgb = NAVY_TITLE
        p_c4_3.space_before = Pt(8)
        p_c4_3.space_after = Pt(3)

        viab_items = [
            ("Cost-Effective Foundation:", "Built on modern open-source web technologies with near-zero baseline hosting expenses."),
            ("Elastic Cloud Scaling:", "Serverless edge hosting through Vercel and Supabase scales dynamically on demand from pilot to national scale.")
        ]
        for title, desc in viab_items:
            p = tf4_r.add_paragraph()
            p.space_after = Pt(2)
            r_t = p.add_run()
            r_t.text = f"  • {title} "
            r_t.font.name = "Arial"
            r_t.font.size = Pt(9)
            r_t.font.bold = True
            r_t.font.color.rgb = BLACK
            r_d = p.add_run()
            r_d.text = desc
            r_d.font.name = "Arial"
            r_d.font.size = Pt(9)
            r_d.font.color.rgb = GRAY_TEXT

        # ---------------------------------------------------------------------
        # SLIDE 5: IMPACT AND BENEFITS
        # ---------------------------------------------------------------------
        slide5 = prs.slides.add_slide(blank_layout)
        add_common_header(slide5, "IMPACT AND BENEFITS", 5)

        s5_left = slide5.shapes.add_textbox(Inches(0.45), Inches(1.04), Inches(6.0), Inches(5.8))
        tf5_l = s5_left.text_frame
        tf5_l.word_wrap = True

        p_i5 = tf5_l.paragraphs[0]
        p_i5.text = "• Potential impact on the target audience"
        p_i5.font.name = "Arial"
        p_i5.font.size = Pt(13)
        p_i5.font.bold = True
        p_i5.font.color.rgb = BLUE_HEADING
        p_i5.space_after = Pt(4)

        impact_sections = [
            ("1. Students & Youth:", [
                ("Interactive Learning:", "Replaces dry textbook memorization with interactive 3D artifact exploration, timeline navigation, and conversational AI guidance."),
                ("Civilizational Pride:", "Fosters civilizational pride and active engagement among younger generations through visual and interactive pathways.")
            ]),
            ("2. Cultural Researchers & Educators:", [
                ("Centralized Reference:", "Provides a centralized digital platform linking monuments, artifacts, regional periods, and living traditions with institutional citations."),
                ("Accelerated Research:", "Accelerates cultural studies with structured epoch relationships, iconography references, and comparative timelines.")
            ]),
            ("3. Traditional Artisans & Craft Communities:", [
                ("Digital Visibility:", "Creates direct digital visibility for indigenous handlooms, terracotta, metalcasting, and regional craftsmanship."),
                ("Artisan Discovery:", "Connects traditional craftspeople to cultural discovery pathways, fostering greater public awareness and patronage.")
            ]),
            ("4. Cultural Tourists & Heritage Travelers:", [
                ("Context-First Travel:", "Promotes responsible travel, encouraging deeper respect and cultural literacy before visiting physical heritage sites."),
                ("Hidden Heritage:", "Uncovers hidden, lesser-known regional heritage treasures beyond mainstream crowded tourist landmarks.")
            ])
        ]

        for sec_title, items in impact_sections:
            p_sec = tf5_l.add_paragraph()
            p_sec.space_after = Pt(2)
            r_s = p_sec.add_run()
            r_s.text = sec_title
            r_s.font.name = "Arial"
            r_s.font.size = Pt(10.5)
            r_s.font.bold = True
            r_s.font.color.rgb = GREEN_ACCENT

            for title, desc in items:
                p = tf5_l.add_paragraph()
                p.space_after = Pt(2)
                r_t = p.add_run()
                r_t.text = f"  • {title} "
                r_t.font.name = "Arial"
                r_t.font.size = Pt(9)
                r_t.font.bold = True
                r_t.font.color.rgb = BLACK

                r_d = p.add_run()
                r_d.text = desc
                r_d.font.name = "Arial"
                r_d.font.size = Pt(9)
                r_d.font.color.rgb = GRAY_TEXT

        # Right: Benefits of the Solution
        s5_right = slide5.shapes.add_textbox(Inches(6.7), Inches(1.04), Inches(6.2), Inches(5.8))
        tf5_r = s5_right.text_frame
        tf5_r.word_wrap = True

        p_b5 = tf5_r.paragraphs[0]
        p_b5.text = "• Benefits of the solution (social, economic, environmental, etc.)"
        p_b5.font.name = "Arial"
        p_b5.font.size = Pt(13)
        p_b5.font.bold = True
        p_b5.font.color.rgb = BLUE_HEADING
        p_b5.space_after = Pt(4)

        benefits_sections = [
            ("1. Social & Cultural Benefits:", [
                ("Heritage Preservation:", "Digitally preserves India’s tangible and intangible heritage for future generations."),
                ("National Unity:", "Fosters intercultural dialogue and civilizational awareness across diverse Indian regions and languages.")
            ]),
            ("2. Educational & Research Benefits:", [
                ("Open-Access Knowledge:", "Delivers an open-access cultural learning repository for schools, universities, and self-directed learners nationwide."),
                ("Interdisciplinary Exploration:", "Encourages exploration connecting architecture, epigraphy, mythology, and craft sciences.")
            ]),
            ("3. Economic & Community Benefits:", [
                ("Tourism Dispersal:", "Stimulates regional cultural tourism, dispersing economic benefits to rural communities and artisan clusters."),
                ("Demand for Crafts:", "Increases awareness and demand for authentic traditional craftsmanship and community-made goods.")
            ]),
            ("4. Digital Preservation & Scalability:", [
                ("Pan-India Scalability:", "Creates a future-ready, resilient digital architecture that scales seamlessly across hundreds of regional sites."),
                ("Knowledge Safeguarding:", "Safeguards vulnerable cultural knowledge against permanent loss through structured digital documentation.")
            ])
        ]

        for sec_title, items in benefits_sections:
            p_sec = tf5_r.add_paragraph()
            p_sec.space_after = Pt(2)
            r_s = p_sec.add_run()
            r_s.text = sec_title
            r_s.font.name = "Arial"
            r_s.font.size = Pt(10.5)
            r_s.font.bold = True
            r_s.font.color.rgb = GREEN_ACCENT

            for title, desc in items:
                p = tf5_r.add_paragraph()
                p.space_after = Pt(2)
                r_t = p.add_run()
                r_t.text = f"  • {title} "
                r_t.font.name = "Arial"
                r_t.font.size = Pt(9)
                r_t.font.bold = True
                r_t.font.color.rgb = BLACK

                r_d = p.add_run()
                r_d.text = desc
                r_d.font.name = "Arial"
                r_d.font.size = Pt(9)
                r_d.font.color.rgb = GRAY_TEXT

        # ---------------------------------------------------------------------
        # SLIDE 6: RESEARCH AND REFERENCES
        # ---------------------------------------------------------------------
        slide6 = prs.slides.add_slide(blank_layout)
        add_common_header(slide6, "RESEARCH AND REFERENCES", 6)

        s6_top = slide6.shapes.add_textbox(Inches(0.45), Inches(1.04), Inches(12.4), Inches(0.4))
        p_ref_head = s6_top.text_frame.paragraphs[0]
        p_ref_head.text = "• Details / Links of the reference and research work"
        p_ref_head.font.name = "Arial"
        p_ref_head.font.size = Pt(13)
        p_ref_head.font.bold = True
        p_ref_head.font.color.rgb = BLUE_HEADING

        # Left Column: Prototype & Institutional Sources
        s6_left = slide6.shapes.add_textbox(Inches(0.45), Inches(1.45), Inches(6.1), Inches(5.4))
        tf6_l = s6_left.text_frame
        tf6_l.word_wrap = True

        p_p1 = tf6_l.paragraphs[0]
        p_p1.space_after = Pt(2)
        r_p1 = p_p1.add_run()
        r_p1.text = "1. Project & Prototype:"
        r_p1.font.name = "Arial"
        r_p1.font.size = Pt(11)
        r_p1.font.bold = True
        r_p1.font.underline = True
        r_p1.font.color.rgb = GREEN_ACCENT

        proj_info = [
            ("Live Working Prototype:", "https://virasatxai.vercel.app/"),
            ("GitHub Source Repository:", "https://github.com/ShrilCarpenter/VirasatX"),
            ("Core Production Modules:", "React 19 • Three.js WebGL • Gemini AI • Supabase")
        ]
        for label, val in proj_info:
            p = tf6_l.add_paragraph()
            p.space_after = Pt(2)
            r_lbl = p.add_run()
            r_lbl.text = f"  • {label} "
            r_lbl.font.name = "Arial"
            r_lbl.font.size = Pt(9.5)
            r_lbl.font.bold = True
            r_lbl.font.color.rgb = BLACK
            r_v = p.add_run()
            r_v.text = val
            r_v.font.name = "Arial"
            r_v.font.size = Pt(9.5)
            r_v.font.color.rgb = BLUE_HEADING if "http" in val else GRAY_TEXT

        p_p2 = tf6_l.add_paragraph()
        p_p2.space_before = Pt(8)
        p_p2.space_after = Pt(2)
        r_p2 = p_p2.add_run()
        r_p2.text = "2. Institutional Reference Sources:"
        r_p2.font.name = "Arial"
        r_p2.font.size = Pt(11)
        r_p2.font.bold = True
        r_p2.font.underline = True
        r_p2.font.color.rgb = GREEN_ACCENT

        ref_links = [
            ("Archaeological Survey of India (ASI)", "asi.nic.in"),
            ("Ministry of Culture, Govt. of India", "indiaculture.gov.in"),
            ("National Archives of India", "nationalarchives.nic.in"),
            ("National Mission on Monuments & Antiquities", "nmma.nic.in"),
            ("Museums of India Portal", "museumsofindia.gov.in"),
            ("Indira Gandhi National Centre for Arts (IGNCA)", "ignca.gov.in"),
            ("Vedic Heritage Portal", "vedicheritage.gov.in"),
            ("UNESCO World Heritage Centre", "whc.unesco.org")
        ]
        for name, link in ref_links:
            p = tf6_l.add_paragraph()
            p.space_after = Pt(1.5)
            r_n = p.add_run()
            r_n.text = f"  • {name} "
            r_n.font.name = "Arial"
            r_n.font.size = Pt(9)
            r_n.font.color.rgb = BLACK
            r_l = p.add_run()
            r_l.text = f"({link})"
            r_l.font.name = "Arial"
            r_l.font.size = Pt(8.5)
            r_l.font.color.rgb = BLUE_HEADING

        # Right Column: Standards & Closing Vision Card
        s6_right = slide6.shapes.add_textbox(Inches(6.7), Inches(1.45), Inches(6.2), Inches(5.4))
        tf6_r = s6_right.text_frame
        tf6_r.word_wrap = True

        p_p3 = tf6_r.paragraphs[0]
        p_p3.space_after = Pt(2)
        r_p3 = p_p3.add_run()
        r_p3.text = "3. Technical Standards & Frameworks:"
        r_p3.font.name = "Arial"
        r_p3.font.size = Pt(11)
        r_p3.font.bold = True
        r_p3.font.underline = True
        r_p3.font.color.rgb = GREEN_ACCENT

        standards = [
            ("W3C WebGL & WebXR Guidelines:", "Mobile-optimized interactive 3D rendering standards."),
            ("CIDOC-CRM & Dublin Core:", "Global cultural heritage cataloging & semantic metadata models."),
            ("DPDP Act 2023 Compliance:", "Complete regulatory compliance for citizen data privacy."),
            ("NEP 2020 Guidelines:", "Pedagogical alignment with Indian Knowledge Systems (IKS).")
        ]
        for title, desc in standards:
            p = tf6_r.add_paragraph()
            p.space_after = Pt(2)
            r_t = p.add_run()
            r_t.text = f"  • {title} "
            r_t.font.name = "Arial"
            r_t.font.size = Pt(9)
            r_t.font.bold = True
            r_t.font.color.rgb = BLACK
            r_d = p.add_run()
            r_d.text = desc
            r_d.font.name = "Arial"
            r_d.font.size = Pt(9)
            r_d.font.color.rgb = GRAY_TEXT

        # Vision Card Right Bottom
        box_v = slide6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.7), Inches(4.2), Inches(6.1), Inches(2.5))
        box_v.fill.solid()
        box_v.fill.fore_color.rgb = RGBColor(248, 250, 252)
        box_v.line.color.rgb = NAVY_TITLE
        box_v.line.width = Pt(1.5)

        v_card = slide6.shapes.add_textbox(Inches(6.8), Inches(4.3), Inches(5.9), Inches(2.3))
        tf_v = v_card.text_frame
        tf_v.word_wrap = True

        pv1 = tf_v.paragraphs[0]
        pv1.text = "VIRASATX"
        pv1.font.name = "Times New Roman"
        pv1.font.size = Pt(18)
        pv1.font.bold = True
        pv1.font.color.rgb = NAVY_TITLE
        pv1.space_after = Pt(2)

        pv2 = tf_v.add_paragraph()
        pv2.text = "“From scattered heritage knowledge to one connected cultural experience.”"
        pv2.font.name = "Arial"
        pv2.font.size = Pt(11)
        pv2.font.italic = True
        pv2.font.color.rgb = GRAY_TEXT
        pv2.space_after = Pt(4)

        pv3 = tf_v.add_paragraph()
        pv3.text = "EXPLORE • UNDERSTAND • PRESERVE"
        pv3.font.name = "Arial"
        pv3.font.size = Pt(12)
        pv3.font.bold = True
        pv3.font.color.rgb = GREEN_ACCENT
        pv3.space_after = Pt(6)

        pv4 = tf_v.add_paragraph()
        pv4.text = "Smart India Hackathon 2026 — Problem Statement ID: SIH26197\nTheme: Heritage & Culture • PS Category: Software • Team: Team VirasatX (ID: 57385)"
        pv4.font.name = "Arial"
        pv4.font.size = Pt(9.5)
        pv4.font.color.rgb = BLACK

        return prs

    # #########################################################################
    # BUILD TEAM HACKASTRA DECK (EXACT 1:1 REPLICA FROM REFERENCE 2_SIH.PDF)
    # #########################################################################
    else:
        fc_img = os.path.join(img_dir, "hackastra_flowchart.png")
        arch_img = os.path.join(img_dir, "hackastra_arch.png")
        ui_img = os.path.join(img_dir, "fra_setu_ui.png")

        # Slide 1
        slide1 = prs.slides.add_slide(blank_layout)
        h1_box = slide1.shapes.add_textbox(Inches(0.5), Inches(0.32), Inches(12.333), Inches(0.8))
        p_h1 = h1_box.text_frame.paragraphs[0]
        p_h1.text = "SMART INDIA HACKATHON 2025"
        p_h1.font.name = "Times New Roman"
        p_h1.font.size = Pt(36)
        p_h1.font.bold = True
        p_h1.font.color.rgb = NAVY_TITLE
        p_h1.alignment = PP_ALIGN.CENTER

        if os.path.exists(logo_png):
            slide1.shapes.add_picture(logo_png, Inches(10.8), Inches(0.2), width=Inches(2.0))

        tp_box = slide1.shapes.add_textbox(Inches(1.5), Inches(1.3), Inches(10.333), Inches(0.6))
        p_tp = tp_box.text_frame.paragraphs[0]
        p_tp.text = "TITLE PAGE"
        p_tp.font.name = "Arial"
        p_tp.font.size = Pt(30)
        p_tp.font.bold = True
        p_tp.font.color.rgb = BLACK
        p_tp.alignment = PP_ALIGN.CENTER

        if os.path.exists(bulb_png):
            slide1.shapes.add_picture(bulb_png, Inches(5.2), Inches(1.5), width=Inches(3.8))

        meta_box = slide1.shapes.add_textbox(Inches(0.5), Inches(2.15), Inches(12.0), Inches(4.8))
        tf_m = meta_box.text_frame
        tf_m.word_wrap = True

        h_items = [
            ("• Problem Statement ID –", "SIH25108", True),
            ("• Problem Statement Title-", "Development of AI-powered FRA Atlas and WebGIS-based Decision Support System (DSS) for Integrated Monitoring of Forest Rights Act (FRA) Implementation.\n(States to be concentrated: Madhya Pradesh, Tripura , Odisha, Telangana)", False),
            ("• Theme-", "Miscellaneous", True),
            ("• PS Category- ", "Software", True),
            ("• Team ID- ", "57385", False),
            ("• Team Name- ", "Team Hackastra", False)
        ]
        for idx, (label, val, val_under) in enumerate(h_items):
            p = tf_m.paragraphs[0] if idx == 0 else tf_m.add_paragraph()
            p.space_after = Pt(13)
            r_lbl = p.add_run()
            r_lbl.text = label
            r_lbl.font.name = "Arial"
            r_lbl.font.size = Pt(17)
            r_lbl.font.bold = True
            r_lbl.font.color.rgb = BLACK

            r_val = p.add_run()
            r_val.text = val
            r_val.font.name = "Arial"
            r_val.font.size = Pt(16.5) if "Title" in label else Pt(17)
            r_val.font.bold = True
            r_val.font.underline = val_under
            r_val.font.color.rgb = BLACK

        num1_box = slide1.shapes.add_textbox(Inches(12.4), Inches(6.92), Inches(0.6), Inches(0.4))
        p1_num = num1_box.text_frame.paragraphs[0]
        p1_num.text = "1"
        p1_num.font.name = "Arial"
        p1_num.font.size = Pt(14)
        p1_num.font.bold = True
        p1_num.alignment = PP_ALIGN.RIGHT

        # Slide 2
        slide2 = prs.slides.add_slide(blank_layout)
        add_common_header(slide2, "IDEA TITLE", 2)
        add_sharp_border(slide2, 0.45, 1.08, 6.0, 5.75)
        s2_left = slide2.shapes.add_textbox(Inches(0.55), Inches(1.15), Inches(5.8), Inches(5.6))
        tf2_l = s2_left.text_frame
        tf2_l.word_wrap = True

        p_s2_head = tf2_l.paragraphs[0]
        p_s2_head.text = "❖ Proposed Solution:"
        p_s2_head.font.name = "Arial"
        p_s2_head.font.size = Pt(18)
        p_s2_head.font.bold = True
        p_s2_head.font.color.rgb = BLUE_HEADING
        p_s2_head.space_after = Pt(6)

        h_sol_bullets = [
            ("NGO Digital Aid :", "Teach Gram Sabhas and communities apps, IVR, and GIS tools."),
            ("Digital Witness & Testimony:", "Voice and video records stored securely as valid proof."),
            ("Title Insurance / Digital Patta :", "Ensures authenticity with secure 7/12 land record entry."),
            ("Grievance Resolution & Illegal Alerts:", "Efficient FRA grievance handling and unauthorized land encroachment warnings."),
            ("AI Disciplinary Dashboard :", "Suggests actions and tracks officer accountability."),
            ("Analytics-Driven Officer Monitoring:", "Tracks verification time, claim outcomes, and grievances reported."),
            ("Interactive FRA Web-GIS Atlas:", "Dynamic platform for exploring forest rights and assets."),
            ("AI Disputes Mediator:", "Resolving conflicts within existing legal frameworks."),
            ("GI Tagging and E-Signature :", "To preserve cultural heritage safeguard traditional products and paperless approval .")
        ]
        for title, desc in h_sol_bullets:
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

        add_sharp_border(slide2, 6.65, 1.08, 6.25, 5.75)
        if os.path.exists(fc_img):
            slide2.shapes.add_picture(fc_img, Inches(6.7), Inches(1.13), width=Inches(6.15), height=Inches(5.65))

        # Slide 3
        slide3 = prs.slides.add_slide(blank_layout)
        add_common_header(slide3, "TECHNICAL APPROACH", 3)
        add_sharp_border(slide3, 0.45, 1.08, 6.0, 2.85)
        s3_top = slide3.shapes.add_textbox(Inches(0.55), Inches(1.12), Inches(5.8), Inches(2.75))
        tf3_t = s3_top.text_frame
        tf3_t.word_wrap = True

        h_tech_bullets = [
            ("Data Extraction:", "Optical Character Recogntion(OCR), NLP."),
            ("WebGIS platform:", "Leaflet.js(for interactive maps)."),
            ("Asset Mapping:", "Random Forest & CNN."),
            ("Data Storage:", "PostgreSQl & PostGIS(for geospatial data)."),
            ("Data Management:", "Cloud Object Storage & MySQL(Structured)."),
            ("GeoServer:", "Use standard protocols WMS and WFS to serve maps."),
            ("Decision Support System:", "for scheme recommendations."),
            ("Blockchain based Security:", "Hyperledger Fabric."),
            ("Key Lock Framework:", "Open-source Identity & Access Management"),
            ("Rasa:", "Preferred for its offline, multilingual, and secure chatbot.")
        ]
        for idx, (title, desc) in enumerate(h_tech_bullets):
            p = tf3_t.paragraphs[0] if idx == 0 else tf3_t.add_paragraph()
            p.space_after = Pt(2)
            r_t = p.add_run()
            r_t.text = f"• {title} "
            r_t.font.name = "Arial"
            r_t.font.size = Pt(9.5)
            r_t.font.bold = True
            r_t.font.underline = True
            r_t.font.color.rgb = GREEN_ACCENT

            r_d = p.add_run()
            r_d.text = desc
            r_d.font.name = "Arial"
            r_d.font.size = Pt(9.5)
            r_d.font.color.rgb = BLACK

        add_sharp_border(slide3, 0.45, 4.05, 6.0, 2.78)
        if os.path.exists(ui_img):
            slide3.shapes.add_picture(ui_img, Inches(0.48), Inches(4.08), width=Inches(5.94), height=Inches(2.45))

        cap_box = slide3.shapes.add_textbox(Inches(0.5), Inches(6.55), Inches(5.9), Inches(0.25))
        p_c = cap_box.text_frame.paragraphs[0]
        p_c.text = "User Interface: It is a draft version, subject to future updates."
        p_c.font.name = "Arial"
        p_c.font.size = Pt(9.5)
        p_c.font.bold = True
        p_c.font.color.rgb = BLACK

        add_sharp_border(slide3, 6.65, 1.08, 6.25, 5.75)
        if os.path.exists(arch_img):
            slide3.shapes.add_picture(arch_img, Inches(6.7), Inches(1.13), width=Inches(6.15), height=Inches(5.65))

        # Slide 4
        slide4 = prs.slides.add_slide(blank_layout)
        add_common_header(slide4, "FEASIBILITY AND VIABILITY", 4)
        add_sharp_border(slide4, 0.45, 1.08, 6.0, 5.75)
        s4_left = slide4.shapes.add_textbox(Inches(0.55), Inches(1.15), Inches(5.8), Inches(5.6))
        tf4_l = s4_left.text_frame
        tf4_l.word_wrap = True

        p_f = tf4_l.paragraphs[0]
        p_f.text = "❖ Feasibility:"
        p_f.font.name = "Arial"
        p_f.font.size = Pt(18)
        p_f.font.bold = True
        p_f.font.color.rgb = BLUE_HEADING
        p_f.space_after = Pt(4)

        feas_tree = [
            ("1. Technical Feasibility:", [
                ("1.Digitization, AI Mapping and Web-GIS Dashboards:", [
                    "OCR and AI extract data from documents.",
                    "Web-GIS dashboards show real-time interactive maps."
                ]),
                ("2. DSS Integration with Blockchain Security:", [
                    "AI engines match schemes to community needs.",
                    "Blockchain ensures secure, tamper-proof digital records."
                ])
            ]),
            ("2. Operational Feasibility:", [
                ("1.Existing Setup and Simple Staff Training:", [
                    "Government data exists, needs proper connection.",
                    "Staff need basic training through short workshops."
                ]),
                ("2. Stakeholder Support and Effective FRA Implementation:", [
                    "Ministries and NGOs already support FRA schemes.",
                    "System strengthens efforts, not replacing existing work."
                ])
            ]),
            ("3. Legal & Ethical Feasibility:", [
                ("1.Data Privacy:", [
                    "Must follow India’s DPDP Act, ensuring legal compliance.",
                    "Blockchain and encryption safeguard sensitive user data."
                ]),
                ("2. Consent Mechanism:", [
                    "FRA holders’ informed consent required in all processes.",
                    "Real-time feedback enables secure two-way communication."
                ])
            ])
        ]
        for sec_title, sub_list in feas_tree:
            p_sec = tf4_l.add_paragraph()
            p_sec.space_after = Pt(2)
            r_s = p_sec.add_run()
            r_s.text = sec_title
            r_s.font.name = "Arial"
            r_s.font.size = Pt(11)
            r_s.font.bold = True
            r_s.font.underline = True
            r_s.font.color.rgb = GREEN_ACCENT

            for sub_head, b_list in sub_list:
                p_sub = tf4_l.add_paragraph()
                p_sub.space_after = Pt(1)
                r_sh = p_sub.add_run()
                r_sh.text = sub_head
                r_sh.font.name = "Arial"
                r_sh.font.size = Pt(10.5)
                r_sh.font.bold = True
                r_sh.font.color.rgb = BLACK

                for b in b_list:
                    p_b = tf4_l.add_paragraph()
                    p_b.space_after = Pt(1)
                    r_b = p_b.add_run()
                    r_b.text = f"  • {b}"
                    r_b.font.name = "Arial"
                    r_b.font.size = Pt(10)
                    r_b.font.color.rgb = BLACK

        add_sharp_border(slide4, 6.65, 1.08, 6.25, 5.75)
        s4_right = slide4.shapes.add_textbox(Inches(6.75), Inches(1.15), Inches(6.05), Inches(5.6))
        tf4_r = s4_right.text_frame
        tf4_r.word_wrap = True

        p_v = tf4_r.paragraphs[0]
        p_v.text = "❖ Viability:"
        p_v.font.name = "Arial"
        p_v.font.size = Pt(18)
        p_v.font.bold = True
        p_v.font.color.rgb = BLUE_HEADING
        p_v.space_after = Pt(4)

        viab_tree = [
            ("1. Economic Viability:", [
                ("1.Cost-Effective & Efficient:", [
                    "Saves paperwork, effort, duplication, and reduces fraud.",
                    "Cuts processing delays, expenses, and operational overhead."
                ]),
                ("2. Supported & Scalable Technology:", [
                    "Backed by government programs and tribal inclusion schemes.",
                    "Open-source tech ensures flexible, low-cost,future-ready deployment."
                ])
            ]),
            ("2. Social Viability:", [
                ("1. Empowers Communities & Improves Scheme Access:", [
                    "Provides transparency, secure records, better documentation.",
                    "Directly benefits FRA holders through scheme access."
                ]),
                ("2. Reduces Conflict & Promotes Stronger Inclusion:", [
                    "Verified records, alerts reduce frequent land disputes.",
                    "Mobile updates, two-way communication improve engagement."
                ])
            ]),
            ("3. Scalability:", [
                ("1. Pan-India Expansion for Wider Community Benefits:", [
                    "Pilot in districts, then scale across India.",
                    "Adjust platform easily for local data."
                ]),
                ("2. Cross-Sector Use of WebGIS + DSS:", [
                    "Adaptable for agriculture, urban development needs.",
                    "Useful in disaster management and planning."
                ])
            ])
        ]
        for sec_title, sub_list in viab_tree:
            p_sec = tf4_r.add_paragraph()
            p_sec.space_after = Pt(2)
            r_s = p_sec.add_run()
            r_s.text = sec_title
            r_s.font.name = "Arial"
            r_s.font.size = Pt(11)
            r_s.font.bold = True
            r_s.font.underline = True
            r_s.font.color.rgb = GREEN_ACCENT

            for sub_head, b_list in sub_list:
                p_sub = tf4_r.add_paragraph()
                p_sub.space_after = Pt(1)
                r_sh = p_sub.add_run()
                r_sh.text = sub_head
                r_sh.font.name = "Arial"
                r_sh.font.size = Pt(10.5)
                r_sh.font.bold = True
                r_sh.font.color.rgb = BLACK

                for b in b_list:
                    p_b = tf4_r.add_paragraph()
                    p_b.space_after = Pt(1)
                    r_b = p_b.add_run()
                    r_b.text = f"  • {b}"
                    r_b.font.name = "Arial"
                    r_b.font.size = Pt(10)
                    r_b.font.color.rgb = BLACK

        # Slide 5
        slide5 = prs.slides.add_slide(blank_layout)
        add_common_header(slide5, "IMPACT AND BENEFITS", 5)
        add_sharp_border(slide5, 0.45, 1.08, 6.0, 5.75)
        s5_left = slide5.shapes.add_textbox(Inches(0.55), Inches(1.15), Inches(5.8), Inches(5.6))
        tf5_l = s5_left.text_frame
        tf5_l.word_wrap = True

        p_ben = tf5_l.paragraphs[0]
        p_ben.text = "❖ Benefits:"
        p_ben.font.name = "Arial"
        p_ben.font.size = Pt(18)
        p_ben.font.bold = True
        p_ben.font.color.rgb = BLUE_HEADING
        p_ben.space_after = Pt(4)

        ben_tree = [
            ("1.Social Benefits:", [
                "Digital platform enables communities with land rights tracking.",
                "IVR helpline, e-learning ensure inclusive literacy access.",
                "Transparent records, video testimonies reduce conflict, build trust."
            ]),
            ("2. Environmental Benefits:", [
                "Sustainable forest use by recognized communities.",
                "Conservation through community stewardship.",
                "GI Tagging preserves cultural heritage & traditional products."
            ]),
            ("3. Economic Benefits:", [
                "Access to schemes (MGNREGA, PM-KISAN, DAGAJU, Jal Jeevan Mission)",
                "GI Tagging boosts local products & tribal livelihoods",
                "Title insurance & digital patta ensure secure land ownership → easier loans & income stability"
            ]),
            ("4. Governance Benefits:", [
                "Audit trails ensure accountability, prevent misuse.",
                "Whistleblowing portal boosts transparency, fights corruption.",
                "Cross-validation stops duplication and fraudulent claims."
            ]),
            ("5.Legal & Security Benefits:", [
                "E-Signature & Digital Patta provide legally valid ownership records.",
                "Protection against land encroachment (Illegal Practice Alert).",
                "Digital witness/testimony ensures fair dispute settlement."
            ])
        ]
        for sec_title, b_list in ben_tree:
            p_sec = tf5_l.add_paragraph()
            p_sec.space_after = Pt(2)
            r_s = p_sec.add_run()
            r_s.text = sec_title
            r_s.font.name = "Arial"
            r_s.font.size = Pt(11)
            r_s.font.bold = True
            r_s.font.underline = True
            r_s.font.color.rgb = GREEN_ACCENT

            for b in b_list:
                p_b = tf5_l.add_paragraph()
                p_b.space_after = Pt(1.5)
                r_b = p_b.add_run()
                r_b.text = f"  • {b}"
                r_b.font.name = "Arial"
                r_b.font.size = Pt(10)
                r_b.font.color.rgb = BLACK

        add_sharp_border(slide5, 6.65, 1.08, 6.25, 5.75)
        s5_right = slide5.shapes.add_textbox(Inches(6.75), Inches(1.15), Inches(6.05), Inches(5.6))
        tf5_r = s5_right.text_frame
        tf5_r.word_wrap = True

        p_imp = tf5_r.paragraphs[0]
        p_imp.text = "❖ Impacts:"
        p_imp.font.name = "Arial"
        p_imp.font.size = Pt(18)
        p_imp.font.bold = True
        p_imp.font.color.rgb = BLUE_HEADING
        p_imp.space_after = Pt(4)

        imp_tree = [
            ("1.Secure Land Rights & Transparency:", [
                "Communities track claims, reducing corruption and fraud.",
                "Digital patta ensures authenticity in land ownership records.",
                "Builds trust between citizens and government authorities."
            ]),
            ("2. Forest Protection & Conservation with AI:", [
                "AI monitors land to prevent illegal encroachment.",
                "Conserves biodiversity and safeguards natural resources.",
                "Promotes sustainable, community-driven forest management."
            ]),
            ("3. Boost Livelihoods & Local Development:", [
                "Resource planning improves incomes and rural economy.",
                "GI tagging protects heritage, boosts local products.",
                "FRA enables fair access to welfare schemes."
            ]),
            ("4. Digital, Eco-Friendly & Cost Effective:", [
                "Reduces paperwork,ensuring greener, eco-friendly governance.",
                "Preserves tribal knowledge through digital archiving tools.",
                "Lowers administrative costs and increases efficiency."
            ]),
            ("5. Smart, Transparent & Scalable Governance:", [
                "Transparent dashboards track officer performance and claims.",
                "AI dispute mediation ensures fairness, reduces human bias.",
                "Unified digital platform enables future-ready expansion."
            ])
        ]
        for sec_title, b_list in imp_tree:
            p_sec = tf5_r.add_paragraph()
            p_sec.space_after = Pt(2)
            r_s = p_sec.add_run()
            r_s.text = sec_title
            r_s.font.name = "Arial"
            r_s.font.size = Pt(11)
            r_s.font.bold = True
            r_s.font.underline = True
            r_s.font.color.rgb = GREEN_ACCENT

            for b in b_list:
                p_b = tf5_r.add_paragraph()
                p_b.space_after = Pt(1.5)
                r_b = p_b.add_run()
                r_b.text = f"  • {b}"
                r_b.font.name = "Arial"
                r_b.font.size = Pt(10)
                r_b.font.color.rgb = BLACK

        # Slide 6
        slide6 = prs.slides.add_slide(blank_layout)
        add_common_header(slide6, "RESEARCH AND REFERENCES", 6)
        add_sharp_border(slide6, 0.45, 1.08, 12.45, 5.75)
        s6_box = slide6.shapes.add_textbox(Inches(0.6), Inches(1.18), Inches(12.15), Inches(5.5))
        tf6 = s6_box.text_frame
        tf6.word_wrap = True

        refs = [
            ("1. FRA: ", "The Forest Rights Act (FRA), 2006 gives rights to forest-dwelling and tribal people, but challenges in implementation remain.\nhttps://tribal.nic.in/FRA.aspx\nhttps://mpvanmitra.mkcl.org/hi"),
            ("2. Best Practices for Web Security: ", "This guide outlines key web security measures to safeguard user information using Blockchain Technology.\nhttps://owasp.org/www-project-blockchain-appsec-standard/"),
            ("3. The Wildlife Protection Act: ", "1972 aims to protect wild animals, birds, plants, and their habitats.\nhttps://share.google/F3sPygTbDmIslAmAd")
        ]
        lead_text = "To enable smooth implementation and integration of the FRA Atlas System, the following contacts serve as official state-level resources for communication, data coordination, and support:"
        contacts = [
            ("4. Madhya Pradesh: ", "dirtadp@mp.gov.in"),
            ("5. Odisha: ", "https://stsc.odisha.gov.in/acts-policies-guidelines/scheduled-tribes-and-other-traditional-forest-dwellers"),
            ("6. Tripura: ", "https://forest.tripura.gov.in/"),
            ("7. Telangana: ", "https://forestrights.telangana.gov.in/")
        ]
        for idx, (head, body) in enumerate(refs):
            p = tf6.paragraphs[0] if idx == 0 else tf6.add_paragraph()
            p.space_after = Pt(10)
            r_h = p.add_run()
            r_h.text = head
            r_h.font.name = "Arial"
            r_h.font.size = Pt(11.5)
            r_h.font.bold = True
            r_h.font.underline = True
            r_h.font.color.rgb = GREEN_ACCENT

            r_b = p.add_run()
            r_b.text = body
            r_b.font.name = "Arial"
            r_b.font.size = Pt(11)
            r_b.font.color.rgb = BLACK

        p_lead = tf6.add_paragraph()
        p_lead.space_after = Pt(8)
        r_l = p_lead.add_run()
        r_l.text = lead_text
        r_l.font.name = "Arial"
        r_l.font.size = Pt(11)
        r_l.font.color.rgb = BLACK

        for head, val in contacts:
            p_c = tf6.add_paragraph()
            p_c.space_after = Pt(5)
            r_h = p_c.add_run()
            r_h.text = head
            r_h.font.name = "Arial"
            r_h.font.size = Pt(11)
            r_h.font.bold = True
            r_h.font.underline = True
            r_h.font.color.rgb = GREEN_ACCENT

            r_v = p_c.add_run()
            r_v.text = val
            r_v.font.name = "Arial"
            r_v.font.size = Pt(11)
            r_v.font.color.rgb = BLUE_HEADING

        return prs

if __name__ == "__main__":
    cur_dir = os.path.dirname(os.path.abspath(__file__))
    
    # 1. Generate VirasatX Deck
    virasat_path = os.path.join(cur_dir, "SIH2026_VirasatX_Idea_Submission.pptx")
    prs_v = build_presentation(is_hackastra=False)
    prs_v.save(virasat_path)
    print(f"Generated VirasatX PPTX: {virasat_path}")

    # 2. Generate Hackastra Deck (100% exact replica)
    hack_path = os.path.join(cur_dir, "SIH_Hackastra_Exact_Submission.pptx")
    prs_h = build_presentation(is_hackastra=True)
    prs_h.save(hack_path)
    print(f"Generated Hackastra PPTX: {hack_path}")
