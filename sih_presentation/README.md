# 🏛️ Smart India Hackathon 2026 — Official Idea Submission Deck

> **Theme**: Heritage & Culture (Problem Statement ID: `SIH26197`)  
> **Team Name**: VirasatX  
> **PS Category**: Software  
> **Template**: 100% strict 1:1 match with the official SIH 2026 6-Slide Idea Submission Template.

---

## 📁 Submission Files in this Folder

| File | Format | Purpose |
| :--- | :--- | :--- |
| **`SIH2026_VirasatX_Idea_Submission.pdf`** | **PDF** | **Official Submission File** — Direct upload to the SIH portal. Exactly 6 slides, 16:9 widescreen, clean human formatting. |
| **`SIH2026_VirasatX_Idea_Submission.pptx`** | **PowerPoint (PPTX)** | **Editable Presentation** — Standard Microsoft PowerPoint file with exact fonts, oval badges, logo placements, and bullet hierarchy. |
| **`index.html`** | **HTML Slide Deck** | Open in any web browser to view, present, or print to PDF. |
| **`slide_1.png` to `slide_6.png`** | **PNG** | Exact rendered image preview of each slide. |
| **`generate_presentation.py`** | **Python Script** | Script to generate the `.pptx` PowerPoint file. |
| **`render_pdf_and_images.py`** | **Python Script** | Script to generate `.pdf` and slide `.png` screenshots. |

---

## 📑 6 Slides Summary

### Slide 1: TITLE PAGE
- **Problem Statement ID** – `SIH26197`
- **Problem Statement Title** – `Student Innovation—Ideas that showcase the rich cultural heritage and traditions of India.`
- **Theme** – `Heritage & Culture`
- **PS Category** – `Software`
- **Team ID** – `[Enter Your Team ID / SIH2026_VIRASATX]`
- **Team Name (Registered on portal)** – `VirasatX`

---

### Slide 2: IDEA TITLE : VIRASATX
**❖ Proposed Solution (Describe your Idea/Solution/Prototype)**
- **• Detailed explanation of the proposed solution**
  - VirasatX is a digital heritage platform that preserves and makes accessible over 5,000 years of Indian civilization across 11 historical epochs.
  - Features an interactive 3D inspection studio with 360° rotation and dynamic lighting to examine delicate sculptures and monuments in detail.
  - Includes an Ancient Manuscript Conservation suite with side-by-side decipherment of scripts (Brahmi, Sharada, Grantha) and Sanskrit audio playback.
  - Provides a multilingual conversational AI heritage guide supporting 8 Indian languages for interactive museum learning.
- **• How it addresses the problem**
  - Prevents the permanent loss of fragile historical palm-leaf and birch-bark manuscripts through high-resolution digital transcription.
  - Eliminates physical distance barriers, enabling students, schools, and researchers in rural areas to access national museum archives.
  - Promotes sustainable cultural tourism and helps disperse tourist crowds by spotlighting lesser-known monuments and local artisan clusters.
- **• Innovation and uniqueness of the solution**
  - Multimodal AI guide grounded in verified museum archives with institutional citations to eliminate AI hallucinations.
  - Computer vision feature to detect dynastic art styles, postures (asanas), and mudras directly from user-uploaded photos.
  - Direct integration connecting cultural tourists with GI-tagged traditional master artisans (e.g., Dhokra craft, Patola, Chola bronzes).

---

### Slide 3: TECHNICAL APPROACH
- **• Technologies to be used (e.g. programming languages, frameworks, hardware)**
  - Frontend & Web Application: Next.js 16 (App Router), React 19, TypeScript, Vanilla CSS & Tailwind CSS.
  - 3D Graphics & Visuals: Three.js, WebGL, HTML5 Canvas for dynamic 3D lighting, 360° rotation, and zoom loupe.
  - AI & Multimodal Services: Domain-grounded NLP knowledge engine, Computer Vision classifier, Web Speech API (Voice input and Text-to-Speech).
  - Geospatial & Mapping: Leaflet / OpenStreetMap for interactive UNESCO heritage site mapping and regional exploration.
  - Security & Safety: In-memory rate limiting, prompt injection filter, strict input sanitization, and secure HTTP response headers.
- **• Methodology and process for implementation (Flow Charts/Images/ working prototype)**
  - Step 1 (Data Ingestion & 3D Scanning): Digitize artifacts and manuscripts via photogrammetry and high-resolution multispectral scans.
  - Step 2 (AI Indexing & Epigraphy OCR): Structure historical metadata, transcribe ancient scripts, and link verified citations to archives.
  - Step 3 (Interactive Rendering & Audio): Render client-side 3D models with real-time lighting, Sanskrit audio chants, and 11-epoch historical timeline.
  - Step 4 (Sustainable Tourism & Artisan Network): Generate custom travel itineraries that route visitors to local GI-certified artisan cooperatives.
  - Working Prototype: A functional responsive web application prototype is ready and tested with 3D viewer, multilingual AI guide, and manuscript decipherment.

---

### Slide 4: FEASIBILITY AND VIABILITY
- **• Analysis of the feasibility of the idea**
  - Technical Feasibility: Built on standard web technologies (Next.js/WebGL) that run smoothly on budget smartphones and low-bandwidth networks without requiring heavy app downloads or dedicated GPUs.
  - Operational Feasibility: Uses standard archival metadata schemas compatible with the Archaeological Survey of India (ASI) and National Mission for Manuscripts (NMM).
  - Financial Viability: Serverless edge deployment keeps hosting overhead minimal; self-sustaining through cultural tourism partnerships and verified artisan marketplace integration.
- **• Potential challenges and risks**
  - High physical degradation, flaking palm leaves, and dialect variations make automated OCR transcription of ancient manuscripts difficult.
  - Risk of generative AI hallucinations generating inaccurate dates, dynasties, or historical facts.
  - Large 3D models and high-resolution images can cause loading delays on 2G/3G rural mobile connections.
- **• Strategies for overcoming these challenges**
  - Implement human-in-the-loop validation where scholars can review and verify transcriptions with confidence scores.
  - Ground all AI responses strictly in verified museum records with institutional citations and explicit source attribution.
  - Use Draco 3D mesh compression, progressive WebP image streaming, and service-worker caching for sub-second page loads.

---

### Slide 5: IMPACT AND BENEFITS
- **• Potential impact on the target audience**
  - Students & Youth (250M+): Makes history interactive through 3D models, audio guides, and regional language explanations, replacing dry memorization with immersive discovery.
  - Historians & Epigraphists: Provides instant digital access to fragile palm-leaf manuscripts, reducing physical handling risks and accelerating research.
  - Tourists & General Public: Delivers responsible day-by-day travel itineraries and virtual gallery tours to promote deeper cultural appreciation across India and globally.
- **• Benefits of the solution (social, economic, environmental, etc.)**
  - Social & Cultural: Preserves vanishing ancient scripts (Sharada, Brahmi, Grantha) and instills civilizational pride across generations.
  - Economic (Artisan Empowerment - SDG 8): Directly links GI-certified master artisan cooperatives (Swamimalai Bronzes, Bastar Dhokra, Patan Patola) with ethical buyers, eliminating middlemen.
  - Environmental (Heritage Protection - SDG 11): AI crowd-dispersion itineraries redirect tourists from overcrowded monuments to lesser-known heritage sites, preventing ecological damage.

---

### Slide 6: RESEARCH AND REFERENCES
- **• Details / Links of the reference and research work**
  - Archaeological Survey of India (ASI) Digital Portal: https://asi.nic.in (Monuments, epigraphy records, and conservation archives).
  - National Mission for Manuscripts (NMM), Ministry of Culture: https://www.namami.gov.in (Manuscript digitization standards and catalog).
  - National Museum, New Delhi: https://nationalmuseumindia.gov.in (Archival bronze and sculpture accession data).
  - UNESCO World Heritage Centre: https://whc.unesco.org (India cultural heritage properties documentation).
  - Academic Literature on Indian Iconography: T.A. Gopinatha Rao — *Elements of Hindu Iconography* (Motilal Banarsidass).
  - Epigraphic Studies: D.C. Sircar — *Indian Epigraphy and Epigraphical Glossary* (Archaeological Survey of India).
  - Web & Multimodal Standards: W3C WebGL & WebXR Device API Standards, W3C Web Speech API, Unicode 15.0 Indic Scripts.
  - United Nations Sustainable Development Goals: SDG 8 (Decent Work and Economic Growth) & SDG 11 (Sustainable Cities and Communities).

---

## 🛠️ Re-generating Files

To re-run the generator scripts if you edit text:
```bash
# 1. Update PPTX
python sih_presentation/generate_presentation.py

# 2. Update PDF & PNGs
python sih_presentation/render_pdf_and_images.py
```
