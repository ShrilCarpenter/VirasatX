export type HeritageCategory = 
  | 'All' 
  | 'Artifacts' 
  | 'Monuments' 
  | 'Manuscripts' 
  | 'Living Traditions' 
  | 'Sculptures' 
  | 'Paintings' 
  | 'Architecture';

export type VerificationStatus = 
  | 'Source-linked' 
  | 'Curator-reviewed' 
  | 'Scholar-verified' 
  | 'Community-contributed' 
  | 'AI-assisted' 
  | 'Under review';

export type ConfidenceLevel = 
  | 'High confidence' 
  | 'Moderate confidence' 
  | 'Needs verification';

export interface AudioNarrative {
  title: string;
  duration: string;
  transcript: string;
  language: string;
}

export interface Model3DConfig {
  rotationSpeed?: number;
  defaultAngle?: number;
  lightIntensity?: number;
  colorTint?: string;
  has360Photos?: boolean;
}

export interface HeritageItem {
  id: string;
  accessionNo: string;
  title: string;
  nativeTitle?: string;
  period: string;
  dateBadge: string;
  category: 'Artifacts' | 'Monuments' | 'Manuscripts' | 'Living Traditions' | 'Sculptures' | 'Paintings' | 'Architecture';
  categoryLabel: string;
  description: string;
  historicalContext?: string;
  culturalSignificance?: string;
  region: 'North' | 'South' | 'East' | 'West' | 'Central' | 'Northeast';
  location: string;
  state?: string;
  repository: string;
  imageUrl: string;
  secondaryImages?: string[];
  dimensions?: string;
  material?: string;
  dynasty?: string;
  significance?: string[];
  iconographyDetails?: string[];
  source: string;
  sourceUrl?: string;
  license: string;
  attribution: string;
  verificationStatus: VerificationStatus;
  lastUpdated?: string;
  culturalSensitivity?: string;
  communityConsent?: boolean;
  coordinates?: { lat: number; lng: number };
  relatedArtifacts?: string[];
  relatedTraditions?: string[];
  relatedSites?: string[];
  timelineEpochId?: string;
  heritageMapLocationId?: string;
  audioNarrative?: AudioNarrative;
  model3DConfig?: Model3DConfig;
}

export interface Epoch {
  id: string;
  name: string;
  timeRange: string;
  description: string;
  recordsCount: string;
  keyInnovations: string[];
  primarySites: string[];
  prominentThinkers?: string[];
  architecturalStyle?: string;
  connectedArtifacts?: string[];
}

export interface CulturalCorridor {
  id: string;
  name: string;
  region: string;
  sitesCount: number;
  highlight: string;
  description: string;
  unescoSites: string;
  artisanGuilds: string;
  mapCoordinates: { x: number; y: number; lat?: number; lng?: number };
  activeBanner: {
    title: string;
    subtext: string;
  };
}

export interface LivingTradition {
  id: string;
  title: string;
  subCategory: string;
  description: string;
  community: string;
  location: string;
  region: string;
  guildCount: string;
  imageUrl: string;
  unbrokenSince: string;
  keyPractices: string[];
  materials?: string[];
  processSteps?: string[];
  giTagStatus?: string;
  responsibleWaysToSupport?: string[];
  relatedArtifacts?: string[];
  verificationStatus: VerificationStatus;
}

export interface ArtisanProfile {
  id: string;
  name: string;
  tradition: string;
  location: string;
  state: string;
  giTagCertified: boolean;
  giCertificationNo?: string;
  generationSpan: string;
  materials: string[];
  techniques: string[];
  bio: string;
  culturalContext: string;
  sustainablePractices: string[];
  supportAvenues: string[];
  imageUrl: string;
  verificationStatus: VerificationStatus;
}

export interface ManuscriptRecord {
  id: string;
  accessionNo: string;
  title: string;
  period: string;
  script: string;
  language: string;
  region: string;
  material: string;
  folioCount: number;
  dimensions: string;
  repository: string;
  preservationStatus: string;
  transcription: string;
  transliteration: string;
  translation: string;
  hindiTranslation?: string;
  audioPhonetics?: string;
  imageUrl: string;
  zoomDetailUrl?: string;
  source: string;
  verificationStatus: VerificationStatus;
  paleographyNotes: string[];
}

export interface ResearchQueryPreset {
  question: string;
  canonicalTerm: string;
  status: string;
  confidence: ConfidenceLevel;
  responseParagraphs: string[];
  citations: { recordId?: string; title: string; link?: string; source: string }[];
  relatedRecords?: string[];
}

export interface VisionSpecimen {
  id: string;
  name: string;
  classification: string;
  attributes: string;
  stylisticAttribution: string;
  comparativeSpecimen: string;
  confidence: string;
  imageUrl: string;
  regionBox: { 
    label: string; 
    confidence: string; 
    x: number; 
    y: number; 
    width: number; 
    height: number;
  };
}

export interface AICurationResponse {
  answer: string;
  citations: {
    recordId: string;
    title: string;
    source: string;
    verificationStatus: VerificationStatus;
  }[];
  confidence: ConfidenceLevel;
  relatedRecords: {
    id: string;
    title: string;
    category: string;
    imageUrl: string;
  }[];
  fallback: boolean;
  disclaimer?: string;
}

export interface VisionAnalysisResult {
  detectedCategory: string;
  detectedFeatures: string[];
  possiblePeriod: string;
  possibleRegion: string;
  stylisticAttribution: string;
  confidence: ConfidenceLevel;
  confidenceScore: string;
  relatedHeritageRecords: {
    id: string;
    title: string;
    category: string;
    imageUrl: string;
  }[];
  disclaimer: string;
}
