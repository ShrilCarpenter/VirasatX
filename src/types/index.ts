export type HistoricalPeriod =
  | 'Indus Valley Civilization'
  | 'Vedic Period'
  | 'Mahajanapadas & Mauryan Empire'
  | 'Gupta Golden Era'
  | 'Post-Gupta & Early Medieval'
  | 'Chola & Southern Dynasties'
  | 'Delhi Sultanate'
  | 'Vijayanagara Empire'
  | 'Mughal Era'
  | 'Maratha Empire'
  | 'Colonial Era'
  | 'Independent & Modern India';

export type HeritageRegion = 'North' | 'South' | 'East' | 'West' | 'Central' | 'Northeast';

export type ArtifactCategory =
  | 'Sculptures'
  | 'Paintings'
  | 'Manuscripts'
  | 'Architecture'
  | 'Textiles'
  | 'Jewellery'
  | 'Folk Art'
  | 'Music'
  | 'Dance'
  | 'Festivals'
  | 'Numismatics'
  | 'Weapons & Armour';

export type MarkerType =
  | 'Monument'
  | 'Museum'
  | 'Archaeological site'
  | 'Craft'
  | 'Festival'
  | 'Cuisine'
  | 'Music'
  | 'Dance'
  | 'UNESCO site'
  | 'Living tradition';

export interface Artifact {
  id: string;
  title: string;
  nativeTitle?: string;
  period: HistoricalPeriod;
  dateRange: string;
  region: HeritageRegion;
  location: string;
  state: string;
  category: ArtifactCategory;
  material: string;
  dynasty: string;
  dimensions?: string;
  currentLocation: string;
  accessionNumber?: string;
  imageUrl: string;
  secondaryImages?: string[];
  audioNarrative?: {
    title: string;
    duration: string;
    transcript: string;
    language: string;
  };
  overview: string;
  historicalContext: string;
  culturalSignificance: string;
  iconographyDetails?: string[];
  tags: string[];
  featured?: boolean;
  model3DConfig?: {
    rotationSpeed: number;
    defaultAngle: number;
    lightIntensity: number;
    colorTint: string;
  };
  timelineEpochId?: string;
  heritageMapLocationId?: string;
}

export interface TimelineEpoch {
  id: string;
  name: string;
  nativeName?: string;
  dateRange: string;
  startYearBCE_CE: number;
  endYearBCE_CE: number;
  summary: string;
  description: string;
  keyEvents: string[];
  prominentFigures: string[];
  architecturalStyle: string;
  artisticTraditions: string[];
  primaryLocations: string[];
  heroImageUrl: string;
  mapGeoContext: string;
  artifactsCount: number;
  relatedArtifactIds: string[];
}

export interface HeritageSiteLocation {
  id: string;
  name: string;
  hindiName?: string;
  state: string;
  region: HeritageRegion;
  coordinates: [number, number]; // [lat, lng]
  type: MarkerType;
  dynastyPeriod: string;
  shortDescription: string;
  fullDescription: string;
  imageUrl: string;
  unescoStatus: boolean;
  yearEstablishedOrBuilt?: string;
  highlights: string[];
  visitingTips: string;
  sustainabilityScore: number; // 1-100
  crowdLevel: 'Low' | 'Moderate' | 'High' | 'Very High';
  bestMonths: string;
  relatedArtifactIds?: string[];
}

export interface ManuscriptItem {
  id: string;
  title: string;
  nativeTitle: string;
  script: 'Brahmi' | 'Devanagari' | 'Sharada' | 'Grantha' | 'Nandinagari' | 'Perso-Arabic' | 'Kharosthi';
  language: 'Sanskrit' | 'Prakrit' | 'Tamil' | 'Pali' | 'Persian' | 'Odia' | 'Bengali';
  period: HistoricalPeriod;
  dateEst: string;
  material: 'Palm Leaf (Talapatra)' | 'Birch Bark (Bhojpatra)' | 'Handmade Rag Paper' | 'Copper Plate';
  locationFound: string;
  currentRepository: string;
  imageUrl: string;
  pagesCount: number;
  extractedSanskritPrakritText: string;
  englishTranslation: string;
  hindiTranslation: string;
  paleographyNotes: string;
  philosophicalContext: string;
  conservationStatus: 'Fragile - Digitized' | 'Restored' | 'Stable' | 'Critical';
  chantAudioUrl?: string;
  chantAudioTranscript?: string;
}

export interface MasterArtisan {
  id: string;
  name: string;
  craftName: string;
  state: string;
  villageTown: string;
  giTagCertified: boolean;
  giTagName?: string;
  experienceYears: number;
  generation: string;
  story: string;
  techniqueSummary: string;
  rawMaterials: string[];
  sustainabilityRating: number;
  culturalImportance: string;
  portraitUrl: string;
  craftImageUrl: string;
  contactCooperative: string;
  demoVideoPrompt?: string;
}

export interface EditorialStory {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  readTime: string;
  period: HistoricalPeriod;
  heroImage: string;
  publishedDate: string;
  audioGuideAvailable: boolean;
  audioTranscript?: string;
  sections: {
    heading: string;
    content: string;
    quote?: string;
    imageUrl?: string;
    imageCaption?: string;
  }[];
  tags: string[];
}

export interface SustainableDestination {
  id: string;
  name: string;
  state: string;
  region: HeritageRegion;
  sustainabilityScore: number;
  crowdLevel: 'Low' | 'Moderate' | 'High' | 'Overcrowded';
  environmentalSensitivity: 'Critical Eco-Heritage' | 'Fragile Stone/Cave System' | 'Riverine Ecosystem' | 'Resilient Urban Heritage';
  localEconomicImpact: 'High direct artisan benefit' | 'Moderate community revenue' | 'Developing cooperative eco-zone';
  bestVisitingPeriod: string;
  responsibleTravelTips: string[];
  imageUrl: string;
  recommendedStayDays: number;
  ecoStays: string[];
  localCraftCoops: string[];
}

export interface GeneratedItinerary {
  id: string;
  title: string;
  region: string;
  durationDays: number;
  pace: 'Leisurely' | 'Immersive' | 'Active';
  theme: 'Architecture & Temples' | 'Living Crafts & Artisans' | 'Ancient Manuscripts & Philosophy' | 'Royal Forts & Palaces' | 'Sacred Landscapes';
  estimatedCarbonImpact: string;
  localArtisanSupportScore: number;
  days: {
    dayNumber: number;
    title: string;
    morningActivity: string;
    afternoonActivity: string;
    eveningCulturalImmersion: string;
    localCuisineRecommendation: string;
    responsibleTravelNote: string;
    connectedArtifactIds?: string[];
  }[];
}

export interface AIChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  verifiedSource?: string;
  confidenceScore?: number;
  relatedArtifactId?: string;
  suggestedFollowUps?: string[];
  audioAvailable?: boolean;
}
