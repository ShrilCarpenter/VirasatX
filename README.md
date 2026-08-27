# Virasat AI — Digital Heritage Museum of India
> **“India’s Heritage, Reimagined.”**  
> *Smart India Hackathon 2026 (Heritage & Culture Track)*

---

## 🏛️ Executive Summary

**Virasat AI** is a world-class digital heritage museum web application designed to digitally preserve, celebrate, and make accessible over 5,000 years of Indian civilization, art, architecture, ancient manuscripts, and living traditions.

Unlike generic tourist portals or basic databases, Virasat AI presents a museum experience inspired by Google Arts & Culture and premier Indian cultural institutions:
- **Warm Parchment & Antique Gold Aesthetics** with high editorial typography (`Cinzel`, `Cormorant Garamond`, `Outfit`).
- **Interactive 3D Archival Inspection Studio** with 360-degree rotation and dynamic spotlighting.
- **Multimodal AI Heritage Guide** with voice input, Indian speech synthesis, and Computer Vision for iconographic recognition.
- **Ancient Manuscript Conservation & OCR Viewer** with side-by-side translation (Brahmi / Sharada / Grantha $\leftrightarrow$ English / Hindi) and Sanskrit chant audio.
- **Historical Timeline Explorer** across 11 key Indian epochs from 2600 BCE to the Modern Era.
- **Geospatial Interactive Heritage Map** with sustainability metrics and UNESCO site documentation.
- **Responsible Cultural Tourism & AI Itinerary Generator** designed to prevent overtourism and channel direct revenue to GI-certified master artisan cooperatives.
- **Multilingual Support** across 8 Indian languages (English, हिन्दी, ગુજરાતી, मराठी, বাংলা, தமிழ், తెలుగు, ಕನ್ನಡ).

---

## 🌟 Key Application Horizons

### 1. 🏛️ Museum Collection Explorer (`/explore`)
- Multi-faceted filtering across Historical Period, Region, Category, Material, and Dynasty.
- Instant full-text search and Grid / Archival List view modes.
- Over 30+ catalogued artifacts with high-resolution imagery and curatorial accession dossiers.

### 2. 🔍 Deep Artifact Inspection Studio (`/artifact/[id]`)
- 360° interactive rotation and directional studio lighting controls.
- Official audio guide narration with animated waveforms.
- Contextual side-panel AI Curatorial Assistant.
- Direct links to Timeline epochs and Heritage Map locations.

### 3. 🖼️ Virtual 3D Museum Gallery (`/gallery/[id]`)
- Step-by-step virtual room walkthroughs (Gupta Wing, Chola Sanctum, Manuscript Vault).
- Spotlit wall-mounted exhibits, brass info plaques, and gallery floorplan minimap.

### 4. ⏳ Chronological Indian History Timeline (`/timeline`)
- 11 comprehensive historical epochs: Indus Valley Civilization, Vedic Period, Mauryan Empire, Gupta Golden Era, Post-Gupta, Chola Dynasty, Delhi Sultanate, Vijayanagara Empire, Mughal Era, Maratha Empire, and Independent India.
- Deep dive dossiers covering civilizational milestones, prominent thinkers/rulers, and architectural styles.

### 5. 🗺️ Interactive Heritage Map (`/map`)
- Geospatial mapping of UNESCO World Heritage Sites, monuments, archaeological excavations, and craft villages.
- Real-time Eco-Heritage Sustainability Scores (1–100) and crowd density indexes.

### 6. 📜 Ancient Manuscript Conservation Viewer (`/manuscripts`)
- High-resolution loupe zoom for palm-leaf (*Talapatra*) and birch-bark (*Bhojpatra*) manuscripts.
- Side-by-side ancient script OCR transcription, English/Hindi translations, and Sanskrit metric chant playback.

### 7. 🤖 Multimodal AI Heritage Guide (`/ai-guide`)
- Conversational assistant with verified Archaeological Survey of India (ASI) primary citations.
- Web Speech voice synthesis and voice recognition.
- **Visual Iconography Identifier**: Computer vision simulation that analyzes artifact photographs for dynastic motifs and mudras.

### 8. 🌿 Sustainable Heritage Tourism & AI Itinerary Builder (`/sustainable-travel`)
- Custom AI tour planner that creates responsible day-by-day itineraries with verified eco-homestays and local artisan visits.

### 9. 🎨 Living Heritage & Master Artisans Directory (`/artisans`)
- Profiles of GI-tagged master craftsmen (Pashmina weavers, Swamimalai bronze sculptors, Nirona Rogan artists, Patan Patola weavers, Bastar Dhokra metalsmiths).

---

## 🛠️ Technology Stack

- **Framework**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS (Custom Heritage Design Tokens, Parchment Textures, Grain Overlays)
- **Icons & Visuals**: Lucide React, Framer Motion, Canvas Confetti
- **Audio & Speech**: Web Speech API (Indian accent voice tuning) & Web Audio API (Ambient Tanpura drone synthesizer)
- **AI / ML Service**: Domain-grounded knowledge engine with verified citation tracking, computer vision classifier simulation, and pluggable LLM interface.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (or Node.js 20+)
- npm

### Installation & Run
```bash
# Clone repository
git clone https://github.com/ShrilCarpenter/VirasatX.git
cd VirasatX

# Install dependencies
npm install --ignore-scripts

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
- **Track**: Heritage & Culture
- **Problem Statement**: Digital preservation and accessibility of India's cultural heritage.
- **UN Sustainable Development Goals**: SDG 8 (Decent Work & Economic Growth via Artisans) & SDG 11 (Sustainable Cities and Communities).

---

© 2026 **Virasat AI Team** — Built for Smart India Hackathon 2026.
