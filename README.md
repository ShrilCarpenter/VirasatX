# Virasat AI — Digital Heritage Museum of India
> **“India’s Heritage, Reimagined.”**  
> *Smart India Hackathon 2026 (Heritage & Culture Track — SIH26195)*

---

## 🏛️ Executive Summary

**Virasat AI** is a digital heritage museum web application designed to digitally preserve, celebrate, and make accessible over 5,000 years of Indian civilization, art, architecture, ancient manuscripts, and living traditions.

Inspired by premier Indian and international cultural archives:
- **Museum Ivory & Warm Sand Aesthetics** with elegant editorial typography (`Playfair Display`, `Cormorant Garamond`, `Inter`).
- **Interactive 3D Archival Inspection Studio** with 360-degree rotation, zoom loupe, and dynamic gallery lighting simulation.
- **Multimodal AI Heritage Guide** with voice input, speech synthesis, and Computer Vision for dynastic iconography recognition.
- **Ancient Manuscript Conservation & Paleography Viewer** with side-by-side translation (Brahmi / Sharada / Grantha $\leftrightarrow$ English / Hindi) and Sanskrit chant audio.
- **Historical Timeline Explorer** across 11 key Indian epochs from 2600 BCE (Indus Valley) to the Modern Republic.
- **Geospatial Interactive Heritage Map** with UNESCO site documentation, conservation guidelines, and regional filtering.
- **Responsible Cultural Tourism & AI Itinerary Generator** designed to prevent overtourism and support GI-certified master artisan cooperatives.
- **Multilingual Support** across 8 Indian languages (English, हिन्दी, ગુજરાતી, मराठी, বাংলা, தமிழ், తెలుగు, ಕನ್ನಡ).

---

## 🌟 Key Application Horizons

### 1. 🏛️ Museum Collection Explorer (`/explore`)
- Multi-faceted filtering across Historical Period, Region, Category, Material, and Dynasty.
- Instant search and Grid / Archival List view modes.
- Curated exhibits with high-resolution imagery and curatorial accession dossiers.

### 2. 🔍 Deep Artifact Inspection Studio (`/artifact/[id]`)
- 360° interactive rotation, zoom inspection, and directional studio lighting controls.
- Official audio guide narration with cross-browser speech synthesis.
- Contextual side-panel AI Curatorial Assistant with source attribution.
- Direct links to Timeline epochs and Heritage Map locations.

### 3. 🖼️ Virtual Museum Gallery (`/gallery/[id]`)
- Curated virtual gallery walkthroughs (Sculpture Gallery, Manuscript Gallery, Architecture Gallery, Painting Gallery).
- Wall-mounted exhibits, brass info plaques, and gallery switcher.

### 4. ⏳ Chronological Indian History Timeline (`/timeline`)
- 11 comprehensive historical epochs: Indus Valley Civilization, Vedic Period, Mauryan Empire, Gupta Golden Era, Post-Gupta, Chola Dynasty, Delhi Sultanate, Vijayanagara Empire, Mughal Era, Maratha Empire, and Independent India.
- Deep-dive dossiers covering civilizational milestones, prominent thinkers/rulers, and architectural styles.

### 5. 🗺️ Interactive Heritage Map (`/map`)
- Geospatial mapping of UNESCO World Heritage Sites, monuments, archaeological excavations, and craft villages.
- Regional filtering, visiting guidelines, and environmental sensitivity indicators.

### 6. 📜 Ancient Manuscript Conservation Viewer (`/manuscripts`)
- High-resolution loupe zoom for palm-leaf (*Talapatra*) and birch-bark (*Bhojpatra*) manuscripts.
- Side-by-side ancient script transcription, English/Hindi translations, and Sanskrit metric chant playback.

### 7. 🤖 Multimodal AI Heritage Guide (`/ai-guide`)
- Museum research assistant with institutional citations and transparent interpretive disclaimers.
- Web Speech voice input and voice recognition.
- **Visual Iconography Identifier**: Analyzes artifact imagery for dynastic motifs, postures, and mudras.
- Built-in input sanitization, prompt injection guard, and rate limiting.

### 8. 🌿 Responsible Heritage Travel (`/sustainable-travel`)
- Custom AI tour planner that creates responsible day-by-day itineraries with eco-friendly guidelines and artisan visits.

### 9. 🎨 Living Heritage & Master Artisans Directory (`/artisans`)
- Profiles of GI-tagged master craft traditions (Pashmina weavers, Swamimalai bronze sculptors, Nirona Rogan artists, Patan Patola weavers, Bastar Dhokra metalsmiths).

---

## 🛠️ Technology Stack

- **Framework**: Next.js 16 (App Router, Turbopack), React 19, TypeScript
- **Styling**: Vanilla CSS & Tailwind CSS (Custom Heritage Design Tokens, Parchment Textures)
- **Icons & Visuals**: Lucide React, Framer Motion
- **Audio & Speech**: Web Speech API (Speech Recognition & Speech Synthesis)
- **Security & Reliability**: In-memory rate limiting, prompt injection detection, security response headers (`CSP`, `X-Frame-Options`, `X-Content-Type-Options`)
- **AI / ML Service**: Domain-grounded knowledge engine with citation tracking and iconography pattern matching.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or Node.js 20+
- npm

### Installation & Run
```bash
# Clone repository
git clone https://github.com/ShrilCarpenter/VirasatX.git
cd VirasatX

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
npm run start
```

---

## 🏆 Smart India Hackathon 2026 Alignment
- **Track**: Heritage & Culture (SIH26195)
- **Problem Statement**: Digital preservation and accessibility of India's cultural heritage.
- **UN Sustainable Development Goals**: SDG 8 (Decent Work & Economic Growth via Artisans) & SDG 11 (Sustainable Cities and Communities).

---

© 2026 **Virasat AI Team** — Built for Smart India Hackathon 2026.
