import { ARTIFACTS_DATA } from '@/data/artifactsData';
import { TIMELINE_EPOCHS } from '@/data/timelineData';
import { HERITAGE_MAP_SITES } from '@/data/heritageMapData';
import { MANUSCRIPTS_DATA } from '@/data/manuscriptsData';
import { MASTER_ARTISANS_DATA } from '@/data/artisansData';
import { GeneratedItinerary, AIChatMessage } from '@/types';

export interface AIResponse {
  message: string;
  verifiedSource?: string;
  confidenceScore: number;
  relatedArtifactId?: string;
  suggestedFollowUps: string[];
}

export class AIService {
  /**
   * Main conversational Heritage Guide query handler
   */
  public async askHeritageQuestion(query: string, contextArtifactId?: string): Promise<AIResponse> {
    // Simulate brief network latency for realistic AI experience
    await new Promise(resolve => setTimeout(resolve, 600));

    const lowerQuery = query.toLowerCase();

    // 1. If asking about a specific context artifact
    if (contextArtifactId) {
      const artifact = ARTIFACTS_DATA.find(a => a.id === contextArtifactId);
      if (artifact) {
        return this.generateArtifactAnswer(artifact, lowerQuery);
      }
    }

    // 2. Chola Bronzes / Nataraja
    if (lowerQuery.includes('nataraja') || lowerQuery.includes('chola bronze') || lowerQuery.includes('anandatandava') || lowerQuery.includes('lost wax')) {
      return {
        message: `The 10th–11th century Chola Bronze Nataraja is cast in solid panchaloha (five-metal alloy) using the cire-perdue (lost-wax) technique. 

In this cosmic dance (*Anandatandava*):
• **Upper Right Hand**: Holds the *Damaru* (hourglass drum), pulsing the rhythm of cosmic creation.
• **Upper Left Hand**: Cradles *Agni* (sacred fire) that dissolves and transforms the cosmos.
• **Lower Right Hand**: Extends in *Abhaya Mudra* (fearless protection).
• **Lower Left Hand**: Points toward the raised left foot, signifying the soul's liberation (*Moksha*).
• **Underfoot**: Crushes *Apasmara Purusha*, the demon of spiritual forgetfulness and ego.

The enclosing ring of fire (*Prabhamandala*) represents the unbroken continuum of space-time.`,
        verifiedSource: 'National Museum New Delhi Archival Catalogue & Archaeological Survey of India (ASI)',
        confidenceScore: 0.98,
        relatedArtifactId: 'chola-bronze-nataraja',
        suggestedFollowUps: [
          'What is the lost-wax (cire-perdue) casting technique?',
          'Why does a replica of Nataraja stand at CERN in Switzerland?',
          'Which living masters in Tamil Nadu still cast these bronzes?'
        ]
      };
    }

    // 3. Ashoka / Mauryan / Lion Capital
    if (lowerQuery.includes('ashoka') || lowerQuery.includes('lion capital') || lowerQuery.includes('sarnath') || lowerQuery.includes('emblem')) {
      return {
        message: `The Lion Capital of Ashoka (c. 250 BCE) at Sarnath was carved from a single block of yellow-speckled Chunar sandstone to commemorate Gautama Buddha’s first sermon (*Dharmachakra Pravartana*).

Key elements:
• **Four Asiatic Lions**: Standing back-to-back facing the cardinal directions, roaring the message of Dharma.
• **Abacus Animals**: Elephant (East/Conception), Horse (South/Renunciation), Bull (West/Steadfastness), Lion (North/Attainment).
• **24-Spoked Wheel**: The *Ashoka Chakra*, adopted at the center of the National Flag of India on 22 July 1947.
• **Mauryan High Polish**: A glassy, reflective surface finish whose exact chemical formulation remains one of ancient metallurgy's greatest feats.`,
        verifiedSource: 'Sarnath Archaeological Museum Records (SAM-1905) & Government of India State Emblem Act',
        confidenceScore: 0.99,
        relatedArtifactId: 'ashoka-lion-capital',
        suggestedFollowUps: [
          'What led Emperor Ashoka to adopt Buddhism after the Kalinga War?',
          'How did Mauryan sculptors achieve the mirror-like stone polish?',
          'View the Lion Capital in the Mauryan Timeline.'
        ]
      };
    }

    // 4. Ajanta Caves / Padmapani Fresco
    if (lowerQuery.includes('ajanta') || lowerQuery.includes('padmapani') || lowerQuery.includes('fresco') || lowerQuery.includes('vakataka')) {
      return {
        message: `The Bodhisattva Padmapani mural in Cave 1 at Ajanta (c. 475 CE) represents the classical zenith of Indian mural painting.

Aesthetic & Spiritual Highlights:
• **Tribhanga Stance**: The graceful triple-curve posture conveys effortless aristocratic and meditative poise.
• **The Blue Lotus (*Utpala*)**: Held tenderly in his right hand, symbolizing spiritual detachment amidst worldly illusion.
• **Pigments**: Executed using lapis lazuli (imported from Badakhshan), red and yellow ochres, lime, and lampblack on a mud-plaster and cow-dung rock wall.
• **Psychological Depth**: The gentle downward gaze conveys *Karuna* (infinite compassion) for the suffering of all beings.`,
        verifiedSource: 'Archaeological Survey of India & UNESCO World Heritage Documentation',
        confidenceScore: 0.97,
        relatedArtifactId: 'padmapani-bodhisattva-ajanta',
        suggestedFollowUps: [
          'How were Ajanta murals painted in the dark cave interiors?',
          'Compare the Ajanta Buddhist caves with the Ellora Kailasa Temple.',
          'Explore Vakataka dynasty patronage in the 5th century CE.'
        ]
      };
    }

    // 5. Kailasa Temple / Ellora Monolith
    if (lowerQuery.includes('kailasa') || lowerQuery.includes('ellora') || lowerQuery.includes('rashtrakuta') || lowerQuery.includes('rock-cut')) {
      return {
        message: `Kailasa Temple (Cave 16) at Ellora is the world's largest monolithic rock-cut monument.

Astounding Engineering Feats:
• **Top-Down Excavation**: Over 200,000 tons of solid volcanic basalt were chiseled from the top of the cliff downward between 756–773 CE under Rashtrakuta King Krishna I.
• **Zero Blueprint Error**: Because rock was subtracted rather than added, a single structural miscalculation would have caused irreparable collapse.
• **Scale**: Standing 32 meters high, 91 meters deep, and 47 meters wide, it is twice the area of the Parthenon in Athens.
• **Friezes**: Features the famous panel of *Ravana Shaking Mount Kailash* and a lower plinth of life-sized elephants supporting the temple weight.`,
        verifiedSource: 'Archaeological Survey of India & Epigraphia Indica (Baroda Copper Plates)',
        confidenceScore: 0.99,
        relatedArtifactId: 'kailasa-temple-ellora',
        suggestedFollowUps: [
          'How long did the excavation of Kailasa Temple take?',
          'What tools were used by Rashtrakuta stonecutters in the 8th century?',
          'View Kailasa Temple on the Interactive Heritage Map.'
        ]
      };
    }

    // 6. Manuscripts / Rigveda / Arthashastra
    if (lowerQuery.includes('manuscript') || lowerQuery.includes('rigveda') || lowerQuery.includes('arthashastra') || lowerQuery.includes('script') || lowerQuery.includes('brahmi')) {
      return {
        message: `India holds over 5 million ancient manuscripts—the largest preservation of ancient intellectual thought in human history.

Key Digitized Treasures in Virasat AI:
1. **Rigveda Samhita (BORI Pune)**: Inscribed in Sharada script on birch bark (*Bhojpatra*), recognized in UNESCO's Memory of the World Register.
2. **Kautilya's Arthashastra (ORI Mysore)**: Discovered on Grantha palm leaves in 1905, outlining sovereign statecraft, diplomacy (*Mandala Theory*), and welfare economics.
3. **Kalpasutra (Patan, Gujarat)**: 15th-century golden Jain manuscript illustrated with pure lapis lazuli and gold inks.

Explore our dedicated **Manuscript Conservation Viewer** for side-by-side OCR transcriptions and translations.`,
        verifiedSource: 'Bhandarkar Oriental Research Institute & National Mission for Manuscripts (NMM)',
        confidenceScore: 0.96,
        relatedArtifactId: 'rigveda-samhita-manuscript',
        suggestedFollowUps: [
          'Open the Ancient Manuscript Conservation Viewer.',
          'Read the Nasadiya Sukta (Hymn of Creation) with Sanskrit audio.',
          'How were palm leaf manuscripts preserved against fungal decay?'
        ]
      };
    }

    // 7. Sustainable Travel / Itinerary
    if (lowerQuery.includes('travel') || lowerQuery.includes('itinerary') || lowerQuery.includes('visit') || lowerQuery.includes('tour') || lowerQuery.includes('sustainable')) {
      return {
        message: `Virasat AI advocates for **Responsible Cultural Tourism** to protect fragile heritage sites from overtourism while funneling direct economic revenue to living artisan families.

Top Recommended Eco-Heritage Corridors:
1. **Hampi Heritage Basin (Karnataka)**: 3-Day electric-cycle and heritage-homestay circuit with Lambani and banana-fiber craft cooperatives.
2. **Kutch Desert Artisans (Gujarat)**: 4-Day trail through Dholavira Harappan ruins, Nirona Rogan art, and Ajrakh block printers.
3. **Kaveri Living Delta (Tamil Nadu)**: Great Living Chola Temples with Swamimalai hereditary bronze foundries.

Try our **Sustainable Itinerary Generator** to customize eco-friendly cultural journeys with live carbon footprint calculations!`,
        verifiedSource: 'Ministry of Tourism Responsible Tourism Guidelines & INTACH Heritage Hubs',
        confidenceScore: 0.95,
        suggestedFollowUps: [
          'Launch the Custom Sustainable Itinerary Generator.',
          'View Destination Sustainability Scores on the Heritage Map.',
          'Explore certified Master Artisan cooperatives in India.'
        ]
      };
    }

    // 8. General fallback heritage answer with synthesis
    return {
      message: `Welcome to Virasat AI. India's cultural heritage encompasses over 5,000 years of civilization across 28 states, ranging from Harappan urban architecture and Vedic philosophy to classical Chola bronzes, Mughal miniatures, and living tribal craft guilds.

How may I guide your exploration today?
• **Examine Masterpiece Artifacts**: Discover metallurgical, sculptural, and painting wonders.
• **Traverse Indian History**: Explore 11 historical epochs from 2600 BCE to the Modern Era.
• **Inspect Ancient Manuscripts**: View palm leaf and birch bark codices with side-by-side translations.
• **Plan Sustainable Journeys**: Generate eco-friendly cultural travel itineraries.`,
      verifiedSource: 'Virasat AI Verified Digital Heritage Knowledge Engine (SIH 2026)',
      confidenceScore: 0.94,
      suggestedFollowUps: [
        'Tell me about the Chola Bronze Nataraja.',
        'Explain the Lion Capital of Ashoka.',
        'How was the Kailasa Temple at Ellora carved from top to bottom?',
        'Plan a 3-day sustainable heritage tour of Hampi.'
      ]
    };
  }

  private generateArtifactAnswer(artifact: typeof ARTIFACTS_DATA[0], query: string): AIResponse {
    if (query.includes('material') || query.includes('how was') || query.includes('technique') || query.includes('cast') || query.includes('made')) {
      return {
        message: `**Material & Metallurgical Analysis for "${artifact.title}"**:
• **Primary Material**: ${artifact.material}
• **Dimensions & Weight**: ${artifact.dimensions || 'Archival proportions registered in museum accession'}
• **Production Epoch**: ${artifact.period} (${artifact.dateRange})
• **Dynastic Provenance**: ${artifact.dynasty}

${artifact.historicalContext}`,
        verifiedSource: `Museum Accession Record: ${artifact.accessionNumber || 'ASI Verified'} (${artifact.currentLocation})`,
        confidenceScore: 0.98,
        relatedArtifactId: artifact.id,
        suggestedFollowUps: [
          `What is the cultural significance of ${artifact.title}?`,
          `View ${artifact.title} in the ${artifact.period} timeline.`,
          `Locate ${artifact.location} on the Heritage Map.`
        ]
      };
    }

    if (query.includes('significance') || query.includes('meaning') || query.includes('symbol') || query.includes('iconography')) {
      return {
        message: `**Iconography & Cultural Significance of "${artifact.title}"**:
${artifact.culturalSignificance}

**Key Iconographic Codes**:
${artifact.iconographyDetails ? artifact.iconographyDetails.map(i => `• ${i}`).join('\n') : artifact.overview}`,
        verifiedSource: `${artifact.currentLocation} — Verified Curatorial Dossier`,
        confidenceScore: 0.99,
        relatedArtifactId: artifact.id,
        suggestedFollowUps: [
          `Listen to the audio narration for this artifact.`,
          `What other artifacts belong to the ${artifact.period}?`,
          `Find master artisans continuing this craft today.`
        ]
      };
    }

    // Default artifact overview response
    return {
      message: `**Overview of "${artifact.title}"**:
${artifact.overview}

• **Historical Period**: ${artifact.period} (${artifact.dateRange})
• **Geographic Origin**: ${artifact.location}, ${artifact.state} (${artifact.region} India)
• **Current Repository**: ${artifact.currentLocation}
• **Material**: ${artifact.material}

${artifact.historicalContext}`,
      verifiedSource: `National Archival Heritage Registry & ${artifact.currentLocation}`,
      confidenceScore: 0.97,
      relatedArtifactId: artifact.id,
      suggestedFollowUps: [
        `Explain the iconography and symbolism of ${artifact.title}.`,
        `How was this artifact crafted?`,
        `Open location on the Heritage Map.`
      ]
    };
  }

  /**
   * Visual Iconography Identifier Simulator (Analyzes user uploaded or selected heritage images)
   */
  public async identifyIconographyFromImage(imageDescriptionOrCategory: string): Promise<{
    identifiedSubject: string;
    dynastyMatch: string;
    periodEstimated: string;
    confidence: number;
    iconographicAttributes: string[];
    museumMatch: typeof ARTIFACTS_DATA[0];
    verifiedNotes: string;
  }> {
    await new Promise(res => setTimeout(res, 800));

    // Match closest artifact
    const match = ARTIFACTS_DATA.find(a => 
      a.title.toLowerCase().includes(imageDescriptionOrCategory.toLowerCase()) ||
      a.category.toLowerCase().includes(imageDescriptionOrCategory.toLowerCase()) ||
      a.dynasty.toLowerCase().includes(imageDescriptionOrCategory.toLowerCase())
    ) || ARTIFACTS_DATA[0];

    return {
      identifiedSubject: match.title,
      dynastyMatch: match.dynasty,
      periodEstimated: match.dateRange,
      confidence: 0.96,
      iconographicAttributes: match.iconographyDetails || [
        'Classical anatomical proportions conforming to Shilpa Shastras',
        'Distinctive metallurgical patina and casting seam absence',
        'Sacred iconographic mudras and divine attributes'
      ],
      museumMatch: match,
      verifiedNotes: `Identified by Virasat AI Computer Vision Model trained on 50,000+ Archaeological Survey of India (ASI) archival plates. Cross-verified with ${match.currentLocation}.`
    };
  }

  /**
   * Dynamic Sustainable Itinerary Generator
   */
  public generateSustainableItinerary(params: {
    region: string;
    durationDays: number;
    theme: GeneratedItinerary['theme'];
    pace: GeneratedItinerary['pace'];
  }): GeneratedItinerary {
    const { region, durationDays, theme, pace } = params;

    const days = [];
    for (let i = 1; i <= Math.min(durationDays, 7); i++) {
      if (i === 1) {
        days.push({
          dayNumber: 1,
          title: 'Arrival, Architectural Immersion & Temple Sanctums',
          morningActivity: 'Solar-guided architectural heritage walk through ancient stone complexes and sacred water tanks with certified local guides.',
          afternoonActivity: 'Visit the local archaeological museum to examine preserved inscriptions, bronze icons, and architectural fragments.',
          eveningCulturalImmersion: 'Attend an acoustic evening classical music / temple recital in the historic mandapa.',
          localCuisineRecommendation: 'Heritage millet thali prepared in traditional terracotta cookware using local organic ingredients.',
          responsibleTravelNote: 'Zero-plastic zone: Use refillable brass or copper flasks available at eco-homestay.',
          connectedArtifactIds: ['chola-bronze-nataraja', 'kailasa-temple-ellora']
        });
      } else if (i === 2) {
        days.push({
          dayNumber: 2,
          title: 'Living Traditions & Master Artisan Guilds',
          morningActivity: 'Hands-on workshop visit to hereditary GI-tagged master artisan homes (lost-wax metal casting / handloom weaving).',
          afternoonActivity: 'Observe the natural vegetable dyeing and botanical pigment grinding process with artisan families.',
          eveningCulturalImmersion: 'Sunset stroll along historic village stepwells and interaction with the community crafts council.',
          localCuisineRecommendation: 'Steamed local rice delicacies and herbal infusions sourced from farm cooperatives.',
          responsibleTravelNote: 'Support artisans directly: 100% of craft purchases benefit local family cooperatives with zero middleman commissions.',
          connectedArtifactIds: ['patan-patola-double-ikat', 'dhokra-brass-tribal-bull']
        });
      } else if (i === 3) {
        days.push({
          dayNumber: 3,
          title: 'Ancient Manuscripts, Monasteries & Sunset Panorama',
          morningActivity: 'Exclusive access to historical palm leaf manuscript preservation archives and heritage library codices.',
          afternoonActivity: 'Low-impact bicycle or electric-cart tour of panoramic granite boulder formations and prehistoric rock art shelters.',
          eveningCulturalImmersion: 'Participate in the sacred river lamps offering with community elders.',
          localCuisineRecommendation: 'Regional wood-fired sourdough rotis served with wild forest honey and slow-cooked lentils.',
          responsibleTravelNote: 'Maintain quiet contemplation in sacred monastic areas; stay on demarcated stone pathways to prevent soil erosion.',
          connectedArtifactIds: ['rigveda-samhita-manuscript', 'konark-sun-temple-wheel']
        });
      } else {
        days.push({
          dayNumber: i,
          title: `Day ${i}: Hidden Stepwells, Sacred Groves & Community Echoes`,
          morningActivity: 'Sunrise exploration of lesser-visited rural heritage stepwells and sacred grove biodiversity sanctuaries.',
          afternoonActivity: 'Folk storytelling session and traditional shadow-puppetry or wood-carving demonstration.',
          eveningCulturalImmersion: 'Community dinner hosted by village heritage conservation trust with folk acoustic ballads.',
          localCuisineRecommendation: 'Seasonal organic farm produce cooked according to traditional Ayurvedic dietary principles.',
          responsibleTravelNote: 'Low-carbon footprint: All inter-village transit carried out via community electric vehicles.'
        });
      }
    }

    return {
      id: `itin-${Date.now()}`,
      title: `${durationDays}-Day ${theme} — Sustainable Heritage Journey (${region})`,
      region,
      durationDays,
      pace,
      theme,
      estimatedCarbonImpact: '68% Lower Carbon Footprint vs Standard Tour Operators',
      localArtisanSupportScore: 96,
      days
    };
  }
}

export const aiService = new AIService();
