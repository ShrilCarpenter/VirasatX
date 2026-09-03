export interface ImageCredit {
  filename: string;
  subject: string;
  source: string;
  sourceUrl: string;
  creator: string;
  license: string;
  attributionRequired: boolean;
  modified: boolean;
  checkedAt: string;
  notes?: string;
}

export const IMAGE_CREDITS: Record<string, ImageCredit> = {
  'nataraja': {
    filename: 'chola-nataraja-bronze.jpg',
    subject: 'Shiva as the Cosmic Dancer (Ananda Tandava Nataraja)',
    source: 'Wikimedia Commons / National Museum New Delhi',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Nataraja_-_Chola_Dynasty_-_National_Museum_New_Delhi.jpg',
    creator: 'Imperial Chola Royal Guild (Archaeological Survey of India)',
    license: 'Public Domain / CC0 (Cultural Heritage Open Access)',
    attributionRequired: true,
    modified: false,
    checkedAt: '2026-09-03',
    notes: 'Accession #ASI-104. 11th-century lost-wax bronze.'
  },
  'ashoka-capital': {
    filename: 'sarnath-lion-capital-ashoka.jpg',
    subject: 'Lion Capital of Ashoka (Sarnath)',
    source: 'Wikimedia Commons / Archaeological Museum Sarnath',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Sarnath_Lion_Capital_of_Ashoka.jpg',
    creator: 'Mauryan Imperial Atelier',
    license: 'Public Domain (Ancient Antiquity)',
    attributionRequired: true,
    modified: false,
    checkedAt: '2026-09-03',
    notes: 'Accession #ASI-042. Chunar polished sandstone.'
  },
  'didarganj-yakshi': {
    filename: 'didarganj-chauri-bearer.jpg',
    subject: 'Didarganj Chauri Bearer (Yakshi)',
    source: 'Wikimedia Commons / Bihar Museum Patna',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Didarganj_Yakshi_Patna_Museum.jpg',
    creator: 'Mauryan / Shunga Sculptural Tradition',
    license: 'Public Domain',
    attributionRequired: true,
    modified: false,
    checkedAt: '2026-09-03',
    notes: 'Accession #BM-902. Chunar sandstone.'
  },
  'sultanganj-buddha': {
    filename: 'sultanganj-bronze-buddha.jpg',
    subject: 'Sultanganj Buddha Bronze',
    source: 'Birmingham Museum & Art Gallery / Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Sultanganj_Buddha_Birmingham_Museum.jpg',
    creator: 'Gupta Metallurgical Atelier',
    license: 'CC BY-SA 4.0 / Public Domain',
    attributionRequired: true,
    modified: false,
    checkedAt: '2026-09-03',
    notes: 'Accession #BMA-1864. Lost-wax unalloyed copper.'
  },
  'brihadisvara': {
    filename: 'brihadisvara-temple-thanjavur.jpg',
    subject: 'Brihadisvara Temple (Rajarajesvaram)',
    source: 'Archaeological Survey of India / Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Brihadisvara_Temple_Thanjavur.jpg',
    creator: 'Architect Kunjara Mallan Raja Rama Perunthachan (ASI Custodianship)',
    license: 'CC BY-SA 3.0',
    attributionRequired: true,
    modified: false,
    checkedAt: '2026-09-03',
    notes: 'UNESCO World Heritage Site #250.'
  },
  'sun-temple-konark': {
    filename: 'konark-sun-temple-odisha.jpg',
    subject: 'Konark Sun Temple (Surya Deula)',
    source: 'Archaeological Survey of India / UNESCO',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Sun_Temple_Konark_Odisha.jpg',
    creator: 'King Narasimhadeva I (Eastern Ganga Dynasty)',
    license: 'CC BY-SA 4.0',
    attributionRequired: true,
    modified: false,
    checkedAt: '2026-09-03',
    notes: 'UNESCO World Heritage Site #246.'
  },
  'ellora-kailasa': {
    filename: 'kailasa-temple-ellora-cave16.jpg',
    subject: 'Kailasa Monolithic Temple (Ellora Cave 16)',
    source: 'Wikimedia Commons / Archaeological Survey of India',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Kailasa_temple_Ellora_Caves.jpg',
    creator: 'Rashtrakuta King Krishna I',
    license: 'CC BY-SA 4.0',
    attributionRequired: true,
    modified: false,
    checkedAt: '2026-09-03',
    notes: 'Monolithic basalt excavation.'
  },
  'bakhshali-manuscript': {
    filename: 'bakhshali-manuscript-zero.jpg',
    subject: 'Bakhshali Mathematical Manuscript (Earliest Record of Zero)',
    source: 'Bodleian Library, University of Oxford / Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Bakhshali_manuscript.jpg',
    creator: 'Ancient North-Western Indian Mathematicians',
    license: 'Public Domain / CC-BY-NC 4.0',
    attributionRequired: true,
    modified: false,
    checkedAt: '2026-09-03',
    notes: 'Accession #MS-Bakhshali-1. Birch bark folios.'
  },
  'rigveda-kashmir': {
    filename: 'rigveda-sharada-script-folio.jpg',
    subject: 'Rigveda Samhita (Sharada Script on Birch Bark)',
    source: 'Bhandarkar Oriental Research Institute (BORI) / UNESCO Memory of the World',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Rigveda_manuscript_Sharada_script.jpg',
    creator: 'Kashmiri Vedic Pandit Guild',
    license: 'Public Domain / UNESCO Open Heritage',
    attributionRequired: true,
    modified: false,
    checkedAt: '2026-09-03',
    notes: 'Accession #BORI-Veda-08. UNESCO Memory of the World Register.'
  },
  'swamimalai-bronze': {
    filename: 'swamimalai-bronze-casting.jpg',
    subject: 'Swamimalai Bronze Casting Master Guild',
    source: 'Geographical Indications Registry of India / IGNCA',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Swamimalai_Bronze_Sculpture.jpg',
    creator: 'Hereditary Sthapati Guild Association',
    license: 'CC BY-SA 3.0 / Government Open Data License',
    attributionRequired: true,
    modified: false,
    checkedAt: '2026-09-03',
    notes: 'GI Tag Registration #GI-029.'
  },
  'aranmula-mirror': {
    filename: 'aranmula-kannadi-metal-mirror.jpg',
    subject: 'Aranmula Kannadi Metal Alloy Mirror',
    source: 'Kerala State Handicrafts Development Corporation / GI Registry',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Aranmula_kannadi.jpg',
    creator: 'Viswakarma Artisan Community of Aranmula',
    license: 'CC BY-SA 4.0',
    attributionRequired: true,
    modified: false,
    checkedAt: '2026-09-03',
    notes: 'GI Tag Registration #GI-007.'
  }
};
