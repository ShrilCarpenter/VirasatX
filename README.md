# VirasatX — India’s Heritage Repository
> *Smart India Hackathon 2026 (Heritage & Culture Theme — Problem Statement ID: SIH26197)*  
> **Tagline**: *“India’s Heritage, Understood, Preserved and Experienced.”*  
> **Lead Organization**: All India Council for Technical Education (AICTE)  
> **Category**: Software (Student Innovation)

---

## 1. Executive Summary & Project Identity

**VirasatX** is an intelligent, multimodal cultural heritage platform engineered for the Smart India Hackathon 2026. Built on primary scholarly archives from the Archaeological Survey of India (ASI), National Mission for Manuscripts (NMM), and the Indira Gandhi National Centre for the Arts (IGNCA), VirasatX bridges physical monuments, temple iconography, sacred epigraphy, and unbroken living artisan guilds.

### Core Philosophy: The Cultural Horizon Model
Rather than presenting isolated objects inside static glass museum cases, VirasatX interconnects every cultural specimen across an unbroken civilizational thread:
$$\text{Artifact} \longrightarrow \text{Historical Era} \longrightarrow \text{Cultural Corridor} \longrightarrow \text{Sacred Site} \longrightarrow \text{Living Tradition} \longrightarrow \text{Master Artisan} \longrightarrow \text{Responsible Visit}$$

---

## 2. Key Capabilities & Architectural Modules

### 🏛️ Interactive 360° Archival Inspection Studio
- **WebGL Three.js Studio**: Full tactile 360° model inspection with rotational momentum, zoom loupe, and studio gallery lighting presets (Museum Amber, Gallery Neutral, Direct Raking Light).
- **Graceful Fallback**: High-resolution multi-angle photography when WebGL 3D meshes are undergoing photogrammetry.
- **Curatorial Audio Guides**: Synchronized speech synthesis audio narration with classical transcripts and agamic metrics.

### 🗺️ Geospatial Archaeological Atlas & Cultural Corridors
- **Leaflet & OpenStreetMap Engine**: Genuine GPS coordinate markers for UNESCO World Heritage Sites, ASI monuments, and artisan clusters.
- **Thematic Corridors**: Curated trans-regional corridors including the Buddhist Pilgrimage Circuit, Chola Granite & Bronze Way, Deccan Rock-Cut Sanctuary, and Kalinga Temple Arc.

### 📜 Epigraphy & Ancient Manuscripts Paleography Studio
- **Folio Viewer with Zoom**: Deep inspection of ancient palm-leaf (*Talapatra*) and birch-bark (*Bhojpatra*) folios.
- **Side-by-Side Transcription & Translation**: Original Brahmi, Sharada, and Newari script transcriptions paired with IAST international romanization, English curatorial translations, and Hindi translations.
- **Vedic Phonetics**: Audio vocalization of classical Sanskrit aksharas.

### 🏺 Living Traditions & GI-Certified Artisan Guilds
- **Living Heritage First**: Master crafts, handlooms, lost-wax bronze casting, and tribal metallurgy.
- **Ethical Custodianship**: Direct promotion of Geographical Indication (GI) certified artisan cooperatives with zero exposure of unconsented private telephone numbers or personal residential addresses.

### 🤖 Grounded Virasat AI Heritage Guide (Lightweight RAG)
- **Zero Hallucinations**: User queries are grounded against a curated knowledge vector base of ASI accession records.
- **Honest Citations & Confidence**: Every response provides explicit record IDs (e.g. `[ASI-104]`) and transparent confidence ratings (*High Confidence*, *Moderate Confidence*, *Needs Verification*).
- **Visual Iconography Identification**: Multimodal analysis of temple postures, mudras, drapery folds, and dynastic idioms with explicit disclaimers: *"AI-assisted visual interpretation, not expert authentication"*.

### 🌿 Responsible Cultural Travel & SDG 11 Framework
- **Overtourism Mitigation**: Dawn/dusk visitation advice, carrying-capacity protection for fragile rock-cut caves, and direct economic routing to rural craft cooperatives.

---

## 3. Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | React 19, Vite 6, TypeScript |
| **Styling & Design System** | Tailwind CSS v4, Museum Parchment Design System (`#FAF8F5`, `#151D2A`, `#936B38`) |
| **Icons & Motion** | Lucide React, Motion |
| **3D & Geospatial Engine** | Three.js (WebGL), Leaflet, OpenStreetMap |
| **Backend / Serverless API** | Vercel Serverless Functions (`/api/ai-guide`, `/api/vision-ai`), Vite dev proxy plugin |
| **AI / Multimodal LLM** | Google Gemini 2.5 Flash (`@google/genai`), Server-side RAG pipeline |
| **Auth & Patron Database** | Supabase Auth, PostgreSQL, Row Level Security (RLS) |

---

## 4. Security & Privacy Architecture

- **Absolute Secret Protection**: `GEMINI_API_KEY` is strictly executed in backend serverless handlers (`api/ai-guide-handler.ts`, `api/vision-ai-handler.ts`). It is **NEVER** exposed to client browser bundles or prefixed with `VITE_`.
- **Public Heritage Browsing**: Guests enjoy full access to all collections, timelines, maps, manuscripts, and AI guides without creating an account.
- **Row Level Security (RLS)**: Users can only read, update, or delete their own saved discoveries and submissions. Moderation approvals are restricted.

---

## 5. Supabase Setup & Database Schema

Run the SQL migration in `supabase/migrations/001_initial_schema.sql` within your Supabase project's SQL editor.

### Database Tables:
1. `profiles`: Extended user profile linked to `auth.users(id)` with preferred language.
2. `favorites`: Personal saved heritage discoveries with unique constraint on `(user_id, heritage_item_id)`.
3. `learning_progress`: Tracks completion across curriculum modules.
4. `submissions`: Community contributions marked `pending` until academic audit.
5. `feedback`: Anonymized discrepancy reporting.

---

## 6. Getting Started Locally

### Prerequisites
- Node.js 18+ or 20+
- npm

### Installation
```bash
# Clone the repository
git clone https://github.com/ShrilCarpenter/VirasatX.git
cd VirasatX

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
```

### Environment Variables (`.env.local`)
```env
# Supabase Configuration
VITE_SUPABASE_URL="https://your-project.supabase.co"
VITE_SUPABASE_PUBLISHABLE_KEY="your-supabase-publishable-key"

# Google Gemini API Key (Server-side only)
GEMINI_API_KEY="your-gemini-api-key"

# Host URL
APP_URL="http://localhost:3000"
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
npm run preview
```

---

## 7. SIH 2026 Verification & Compliance

- **Problem Statement ID**: **SIH26197**
- **Track**: Heritage & Culture (AICTE)
- **Zero Legacy Errors**: Verified 0 references to legacy SIH problem statement IDs.

---

## 8. License & Cultural Custodianship

VirasatX is an open-source educational innovation platform. All artifact imagery, museum scans, and epigraphical records are documented in `src/data/imageCredits.ts` and `docs/image-credits.md` under open cultural access and educational fair-use principles.
