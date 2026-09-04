import {
  HeritageItem,
  Epoch,
  CulturalCorridor,
  LivingTradition,
  ArtisanProfile,
  ManuscriptRecord,
  ResearchQueryPreset,
  VisionSpecimen
} from '../types';

export const HERITAGE_ITEMS: HeritageItem[] = [
  {
    id: 'nataraja',
    accessionNo: 'ASI-104',
    title: 'Ananda Tandava Nataraja',
    nativeTitle: 'நடராஜர் (தில்லை கூத்தன்)',
    period: 'Chola & Southern Dynasties',
    dateBadge: '11th c. CE',
    category: 'Artifacts',
    categoryLabel: 'Panchaloha Sculpture',
    description: 'Lost-wax copper alloy representing the cosmic dance of continuous creation, preservation, dissolution, illusion, and release.',
    historicalContext: 'Cast during the reign of Queen Sembiyan Mahadevi and Emperor Rajaraja Chola I, these processional bronzes (Utsava Murti) were consecrated for temple festivals in the Kaveri Delta.',
    culturalSignificance: 'Physicist Fritjof Capra observed that the rhythm of Nataraja’s dance mirrors the continuous dance of subatomic particles in quantum field theory.',
    region: 'South',
    location: 'Kaveri Delta, Tamil Nadu',
    state: 'Tamil Nadu',
    repository: 'National Museum, New Delhi (Bronze Gallery, Showcase 14)',
    imageUrl: '/images/artifacts/chola-nataraja-bronze.jpg',
    secondaryImages: [
      '/images/artifacts/nataraja-detail-1.jpg',
      '/images/artifacts/nataraja-detail-2.jpg'
    ],
    dimensions: '115 cm × 98 cm × 32 cm; 84 kg',
    material: 'Panchaloha (Copper, Tin, Zinc, Silver, Gold)',
    dynasty: 'Imperial Chola Dynasty (Rajendra Chola I)',
    significance: [
      'Panchakritya: Embodies the fivefold cosmic activities of creation (srishti), preservation (sthiti), dissolution (samhara), concealment (tirobhava), and grace (anugraha).',
      'Sthitapada: Right foot crushing Apasmara Purusha (the demon of cosmic forgetfulness and spiritual ignorance).',
      'Prabhamandala: Flaming elliptical aureole signifying the cosmic envelope of cyclic time and space.'
    ],
    iconographyDetails: [
      'Damaru (Hourglass drum) in upper right hand: Pulsing the primordial cosmic vibration (nada).',
      'Agni (Flames of fire) in upper left palm: Cosmic dissolution and spiritual purification.',
      'Abhaya Mudra (Gesture of fearlessness): Reassurance and sanctuary for all beings.',
      'Gajahasta gesture: Lower left hand pointing diagonally to lifted foot indicating liberation.'
    ],
    source: 'Archaeological Survey of India / National Museum',
    sourceUrl: 'https://www.nationalmuseumindia.gov.in',
    license: 'Public Domain / Open Cultural Access',
    attribution: 'Government Museum Chennai & National Museum New Delhi Archives',
    verificationStatus: 'Scholar-verified',
    coordinates: { lat: 10.7867, lng: 79.1378 },
    timelineEpochId: 'chola-era',
    heritageMapLocationId: 'brihadisvara-thanjavur',
    relatedArtifacts: ['brihadisvara', 'swamimalai-bronze'],
    relatedTraditions: ['swamimalai-bronze-guild'],
    relatedSites: ['brihadisvara'],
    audioNarrative: {
      title: 'The Cosmic Rhythm of Anandatandava',
      duration: '2 min 45 sec',
      transcript: 'You are beholding the supreme masterpiece of Chola metallurgy. Cast in solid panchaloha through the cire-perdue lost-wax technique, this Nataraja depicts Shiva executing the Anandatandava—the cosmic dance of creation and dissolution. His upper right hand holds the damaru, pulsing cosmic time. His upper left hand cradles agni, the sacred fire. The lower right hand extends in abhaya mudra, bestowing protection.',
      language: 'English'
    },
    model3DConfig: {
      rotationSpeed: 0.008,
      defaultAngle: 45,
      lightIntensity: 1.3,
      colorTint: '#D4AF37'
    }
  },
  {
    id: 'brihadisvara',
    accessionNo: 'UNESCO #250',
    title: 'Brihadisvara Vimana',
    nativeTitle: 'தஞ்சைப் பெருவுடையார் கோயில்',
    period: 'Chola & Southern Dynasties',
    dateBadge: '1010 CE',
    category: 'Monuments',
    categoryLabel: 'Dravidian Architecture',
    description: 'Monumental 66-metre monolithic granite superstructure engineered under Raja Raja Chola I without binding mortar.',
    historicalContext: 'Consecrated in 1010 CE to mark the 25th regnal year of Emperor Rajaraja Chola I, completed within just five years using extraordinary logistical planning.',
    culturalSignificance: 'Represents the zenith of Chola imperial architecture and Dravidian monumental engineering, designated a UNESCO World Heritage Site.',
    region: 'South',
    location: 'Thanjavur, Tamil Nadu',
    state: 'Tamil Nadu',
    repository: 'Archaeological Survey of India (Chennai Circle)',
    imageUrl: '/images/monuments/brihadisvara-temple-thanjavur.jpg',
    dimensions: 'Height 66 m (216 ft), Octagonal Kumbam capstone ~81.3 tonnes',
    material: 'Crystalline hard granite (Charokite)',
    dynasty: 'Imperial Chola Dynasty (Rajaraja Chola I)',
    significance: [
      'Entirely interlocking granite dry-masonry erected on an alluvial river basin where no native granite quarries exist within 60 km.',
      'The monumental 81-tonne monolithic cupola was elevated using an inclined earthen ramp extending over 4 kilometres.',
      'Extensive wall epigraphs record the names, roles, and grain endowments of 400 temple dancers, musicians, accountants, and sculptors.'
    ],
    source: 'Archaeological Survey of India (ASI)',
    sourceUrl: 'https://asi.nic.in',
    license: 'UNESCO World Heritage / Open Research',
    attribution: 'ASI Chennai Circle Documentation Dossier',
    verificationStatus: 'Scholar-verified',
    coordinates: { lat: 10.7828, lng: 79.1318 },
    timelineEpochId: 'chola-era',
    heritageMapLocationId: 'brihadisvara-thanjavur',
    relatedArtifacts: ['nataraja'],
    relatedTraditions: ['thanjavur-painting-guild', 'swamimalai-bronze-guild'],
    relatedSites: ['gangaikonda-cholapuram']
  },
  {
    id: 'ashoka-lion-capital',
    accessionNo: 'ASI-SAR-01',
    title: 'Lion Capital of Ashoka',
    nativeTitle: 'अशोक सिंह स्तम्भ शीर्ष',
    period: 'Mauryan Empire',
    dateBadge: 'c. 250 BCE',
    category: 'Artifacts',
    categoryLabel: 'Mauryan Polished Sandstone',
    description: 'Carved from a single block of Chunar sandstone with mirror-like Mauryan polish, adopted as the National Emblem of India.',
    historicalContext: 'Erected by Emperor Ashoka at Sarnath to commemorate Gautama Buddha’s Dhammacakkappavattana Sutta (first sermon turning the wheel of law).',
    culturalSignificance: 'The four lions standing back-to-back facing the cardinal directions proclaim the universal reign of Dharma, peace, and spiritual righteousness.',
    region: 'North',
    location: 'Sarnath, Varanasi',
    state: 'Uttar Pradesh',
    repository: 'Sarnath Archaeological Museum (ASI)',
    imageUrl: '/images/artifacts/sarnath-lion-capital-ashoka.jpg',
    dimensions: 'Height 2.15 m (7 ft 1 in), Width 1.4 m',
    material: 'Chunar sandstone with high vitreous lustre',
    dynasty: 'Mauryan Dynasty (Emperor Ashoka)',
    significance: [
      'Four Asiatic lions guarding four quarters of the realm with fearless open mouths.',
      'Circular abacus adorned with four 24-spoke Dharma Chakras alternating with an elephant, a galloping horse, a bull, and a lion.',
      'Bell-shaped inverted lotus base symbolizing spiritual purity rising untouched from the murky waters of worldly life.'
    ],
    source: 'Archaeological Survey of India',
    sourceUrl: 'https://asi.nic.in',
    license: 'National Heritage / Open Educational',
    attribution: 'Sarnath Archaeological Museum Accession Dossier',
    verificationStatus: 'Scholar-verified',
    coordinates: { lat: 25.3811, lng: 83.0214 },
    timelineEpochId: 'mauryan-era',
    heritageMapLocationId: 'sarnath-varanasi',
    relatedArtifacts: ['sanchi'],
    relatedTraditions: ['varanasi-zari-guild'],
    relatedSites: ['sarnath-dhamek-stupa']
  },
  {
    id: 'palm-leaf',
    accessionNo: 'IGNCA-MS-42',
    title: 'Palm-Leaf Chitra Pothi',
    nativeTitle: 'ତାଳପତ୍ର ପୋଥି (ଚିତ୍ର ପୋଥି)',
    period: 'Medieval India',
    dateBadge: '14th c. CE',
    category: 'Manuscripts',
    categoryLabel: 'Epigraphy & Manuscript',
    description: 'Cured Tala palm leaves etched with iron styluses and lampblack pigment encoding classical treatises and cosmic allegories.',
    historicalContext: 'Handcrafted by hereditary scribes in Puri and Ganjam, preserved in temple granthagarams using traditional neem leaf fumigation.',
    culturalSignificance: 'Represents the pinnacle of eastern Indian illustrated manuscript traditions, recognized by UNESCO Memory of the World.',
    region: 'East',
    location: 'Puri District, Odisha',
    state: 'Odisha',
    repository: 'Indira Gandhi National Centre for the Arts (IGNCA), Manuscript Division',
    imageUrl: '/images/manuscripts/palm-leaf-manuscript.jpg',
    dimensions: 'Folio length: 32 cm × 4.5 cm',
    material: 'Borassus flabellifer palm foliage, iron stylus (loha lekhani), lampblack soot',
    dynasty: 'Eastern Ganga / Gajapati Era',
    significance: [
      'Carefully cured in turmeric and saline solutions to ensure durability for over six centuries.',
      'Intricately incised text in Odia and Karani scripts with microscopic visual illuminations.',
      'Bound through central cord holes using hand-twisted wild tussar silk threads.'
    ],
    source: 'National Manuscript Mission / IGNCA',
    sourceUrl: 'https://www.namami.gov.in',
    license: 'Open Scholar Access',
    attribution: 'IGNCA Manuscript Archives Division',
    verificationStatus: 'Curator-reviewed',
    coordinates: { lat: 19.8135, lng: 85.8312 },
    timelineEpochId: 'medieval-era',
    heritageMapLocationId: 'konark-sun-temple',
    relatedArtifacts: ['konark-wheel'],
    relatedTraditions: ['odisha-pattachitra'],
    relatedSites: ['puri-jagannath-temple']
  },
  {
    id: 'ellora',
    accessionNo: 'UNESCO #243',
    title: 'Kailasa Monolith (Cave 16)',
    nativeTitle: 'कैलास लेणी (वेरूळ)',
    period: 'Post-Gupta & Regional Kingdoms',
    dateBadge: '8th c. CE',
    category: 'Monuments',
    categoryLabel: 'Rock-Cut Architecture',
    description: 'World’s largest monolithic rock excavation, carved top-down from a single basalt cliffside removing 200,000 tonnes of rock.',
    historicalContext: 'Commissioned under Rashtrakuta King Krishna I (756–773 CE). Sculptors started at the cliff summit and worked downward with chisels and hammers.',
    culturalSignificance: 'Engineering marvel where error was impossible—every pillar, sanctum, and elephant sculpture was premeditated in solid volcanic basalt.',
    region: 'West',
    location: 'Ellora, Chhatrapati Sambhaji Nagar, Maharashtra',
    state: 'Maharashtra',
    repository: 'Archaeological Survey of India (Aurangabad Circle)',
    imageUrl: '/images/monuments/kailasa-temple-ellora.jpg',
    dimensions: 'Pit dimensions: 84 m × 47 m × 33 m deep',
    material: 'Deccan Trap volcanic basalt bedrock',
    dynasty: 'Rashtrakuta Dynasty (Krishna I)',
    significance: [
      'Excavated entirely by vertical top-down subtraction without scaffolding or masonry keystones.',
      'Plinth carved with a herd of life-sized fighting elephants appearing to support the cosmic mountain on their backs.',
      'Features the famous relief panel depicting Ravana shaking Mount Kailasa with breathtaking dynamic tension.'
    ],
    source: 'Archaeological Survey of India',
    sourceUrl: 'https://asi.nic.in',
    license: 'UNESCO World Heritage Site',
    attribution: 'ASI Western Circle Field Survey',
    verificationStatus: 'Scholar-verified',
    coordinates: { lat: 20.0258, lng: 75.1780 },
    timelineEpochId: 'post-gupta',
    heritageMapLocationId: 'ellora-caves',
    relatedArtifacts: ['padmapani'],
    relatedTraditions: ['maharashtra-stone-craft'],
    relatedSites: ['ajanta-caves']
  },
  {
    id: 'padmapani',
    accessionNo: 'UNESCO #242',
    title: 'Bodhisattva Padmapani Fresco',
    nativeTitle: 'बोधिसत्त्व पद्मपाणि (अजिंठा)',
    period: 'Gupta Golden Age',
    dateBadge: '5th c. CE',
    category: 'Paintings',
    categoryLabel: 'Mural Fresco Secco',
    description: 'Cave 1 master mural depicting the Bodhisattva of Infinite Compassion holding a blue lotus in graceful tribhanga posture.',
    historicalContext: 'Painted during the reign of Vakataka Emperor Harishena (c. 460–477 CE) by master guild artists using mineral earth pigments.',
    culturalSignificance: 'Regarded internationally as the highest aesthetic achievement of ancient Asian painting and classical Indian portraiture.',
    region: 'West',
    location: 'Ajanta Cave 1, Maharashtra',
    state: 'Maharashtra',
    repository: 'Archaeological Survey of India (ASI)',
    imageUrl: '/images/artifacts/ajanta-padmapani-fresco.jpg',
    dimensions: 'Mural panel: 2.1 m × 1.3 m',
    material: 'Natural lapis lazuli, red ochre, lampblack on lime-clay plaster',
    dynasty: 'Vakataka Dynasty (Harishena Era)',
    significance: [
      'Grounded in the classical shadanga (six limbs) canons of ancient Indian painting.',
      'Triple-bent tribhanga stance conveying spiritual transcendence and serene detachment.',
      'Complex layered pigments including imported Afghan lapis lazuli and local malachite.'
    ],
    source: 'Archaeological Survey of India',
    sourceUrl: 'https://asi.nic.in',
    license: 'UNESCO World Heritage Site',
    attribution: 'ASI Chemical Conservation Division',
    verificationStatus: 'Scholar-verified',
    coordinates: { lat: 20.5519, lng: 75.7033 },
    timelineEpochId: 'gupta-era',
    heritageMapLocationId: 'ajanta-caves',
    relatedArtifacts: ['ellora'],
    relatedTraditions: ['warli-art-tradition'],
    relatedSites: ['ajanta-caves']
  },
  {
    id: 'konark-wheel',
    accessionNo: 'UNESCO #241',
    title: 'Sun Temple Chariot Wheel',
    nativeTitle: 'କୋଣାର୍କ ସୂର୍ଯ୍ୟ ମନ୍ଦିର ଚକ୍ର',
    period: 'Medieval India',
    dateBadge: '13th c. CE',
    category: 'Monuments',
    categoryLabel: 'Kalinga Architecture',
    description: 'Astronomical sundial carved into the chlorite plinth of King Narasimhadeva I’s colossal sun temple chariot.',
    historicalContext: 'Constructed by 1,200 master craftsmen over twelve years under chief architect Bishu Maharana on the Bay of Bengal coast.',
    culturalSignificance: 'Combines supreme sculptural finesse with functional astronomical precision, telling solar time to within a minute.',
    region: 'East',
    location: 'Konark, Puri District, Odisha',
    state: 'Odisha',
    repository: 'Archaeological Survey of India',
    imageUrl: '/images/monuments/konark-sun-temple-wheel.jpg',
    dimensions: 'Diameter: 3.0 m (9.8 ft) with 8 major & 8 minor spokes',
    material: 'Khondalite sandstone and dark chlorite stone',
    dynasty: 'Eastern Ganga Dynasty (Narasimhadeva I)',
    significance: [
      'Twenty-four carved wheels representing the 24 fortnights (pakshas) of the solar calendar.',
      'The shadow cast by the central axle pin across the spoke beads indicates exact local solar time.',
      'Spoke medallions depict micro-relief carvings of morning, midday, and evening life.'
    ],
    source: 'Archaeological Survey of India',
    sourceUrl: 'https://asi.nic.in',
    license: 'UNESCO World Heritage Site',
    attribution: 'ASI Bhubaneswar Circle Survey',
    verificationStatus: 'Scholar-verified',
    coordinates: { lat: 19.8876, lng: 86.0945 },
    timelineEpochId: 'medieval-era',
    heritageMapLocationId: 'konark-sun-temple',
    relatedArtifacts: ['palm-leaf'],
    relatedTraditions: ['odisha-pattachitra'],
    relatedSites: ['konark-sun-temple']
  },
  {
    id: 'nalanda-seal',
    accessionNo: 'ASI-NAL-12',
    title: 'Nalanda Mahavihara Terra Cotta Seal',
    nativeTitle: 'नालन्दा महाविहार मुद्रा',
    period: 'Gupta & Post-Gupta',
    dateBadge: '6th c. CE',
    category: 'Artifacts',
    categoryLabel: 'Epigraphical Ephemera',
    description: 'Official collegiate clay seal inscribed in Sanskrit depicting the Dharmachakra flanked by two gazelles.',
    historicalContext: 'Used to stamp scholarly credentials, diplomatic letters, and philosophical treatises across China, Korea, Tibet, and Java.',
    culturalSignificance: 'Attests to India’s status as the global intellectual capital of the ancient world hosting over 10,000 scholars and 2,000 teachers.',
    region: 'East',
    location: 'Nalanda, Bihar',
    state: 'Bihar',
    repository: 'Nalanda Archaeological Museum (ASI)',
    imageUrl: '/images/artifacts/nalanda-seal-mahavihara.jpg',
    dimensions: 'Diameter: 8.5 cm × 2 cm',
    material: 'Terracotta baked clay with Brahmi / Siddhamatrka script',
    dynasty: 'Gupta to Pala Dynasties',
    significance: [
      'Standard institutional emblem of the world’s first residential international university.',
      'Inscribed: "Sri-Nalanda-mahavihariy-arya-bhikshu-sanghasya" (Of the Community of Venerable Monks of the Great Nalanda Monastery).',
      'Affirms rigorous entrance examinations administered by the Dvara-panditas (gate scholars).'
    ],
    source: 'Archaeological Survey of India',
    sourceUrl: 'https://asi.nic.in',
    license: 'UNESCO World Heritage / Open Public Access',
    attribution: 'Nalanda Museum Archive ASI',
    verificationStatus: 'Scholar-verified',
    coordinates: { lat: 25.1357, lng: 85.4452 },
    timelineEpochId: 'gupta-era',
    heritageMapLocationId: 'nalanda-university',
    relatedArtifacts: ['ashoka-lion-capital'],
    relatedTraditions: ['bihar-madhubani-tradition'],
    relatedSites: ['nalanda-university']
  },
  {
    id: 'sanchi',
    accessionNo: 'UNESCO #524',
    title: 'Great Stupa & Torana Gates',
    nativeTitle: 'साँची महान स्तूप एवं तोरण द्वार',
    period: 'Mauryan to Satavahana',
    dateBadge: '3rd c. BCE – 1st c. CE',
    category: 'Monuments',
    categoryLabel: 'Buddhist Architecture',
    description: 'Hemispherical dome enshrining sacred relics, surrounded by four monumental stone toranas carved like wooden ivory work.',
    historicalContext: 'Original brick stupa commissioned by Emperor Ashoka; enlarged and encased in stone with monumental torana gateways during Satavahana rule.',
    culturalSignificance: 'Oldest stone structure in India and the supreme archetype for Buddhist hemispherical cosmic architecture across Asia.',
    region: 'Central',
    location: 'Sanchi, Raisen District, Madhya Pradesh',
    state: 'Madhya Pradesh',
    repository: 'Archaeological Survey of India (Bhopal Circle)',
    imageUrl: '/images/monuments/sanchi-great-stupa.jpg',
    dimensions: 'Dome height: 16.5 m (54 ft), Diameter: 36.5 m (120 ft)',
    material: 'Local sandstone blocks dry-masonry',
    dynasty: 'Mauryan to Satavahana Dynasties',
    significance: [
      'Harmika and Chhatra umbrella crowning the dome symbolizing the world axis (axis mundi).',
      'Torana carvings donated by ivory workers’ guilds of Vidisha showing remarkable precision.',
      'Aniconic Buddhist art depicting Buddha through footprints, parasols, and bodhi trees rather than anthropomorphic statues.'
    ],
    source: 'Archaeological Survey of India',
    sourceUrl: 'https://asi.nic.in',
    license: 'UNESCO World Heritage Site',
    attribution: 'ASI Bhopal Circle Documentation',
    verificationStatus: 'Scholar-verified',
    coordinates: { lat: 23.4793, lng: 77.7397 },
    timelineEpochId: 'mauryan-era',
    heritageMapLocationId: 'sanchi-stupa',
    relatedArtifacts: ['ashoka-lion-capital'],
    relatedTraditions: ['chanderi-weaving'],
    relatedSites: ['sanchi-stupa']
  },
  {
    id: 'hampi-vittala',
    accessionNo: 'UNESCO #247',
    title: 'Vittala Stone Chariot & Musical Pillars',
    nativeTitle: 'ಹಂಪಿ ವಿಜಯ ವಿಠ್ಠಲ ಕಲ್ಲಿನ ರಥ',
    period: 'Vijayanagara Empire',
    dateBadge: '16th c. CE',
    category: 'Monuments',
    categoryLabel: 'Vijayanagara Architecture',
    description: 'Ornate Garuda shrine sculpted in the form of a festival chariot alongside the world-renowned acoustic musical pillars.',
    historicalContext: 'Built under the patronage of Emperor Krishnadevaraya (1509–1529 CE) along the banks of the sacred Tungabhadra river.',
    culturalSignificance: 'Represents the opulent culmination of medieval Deccan temple architecture and liturgical music integration.',
    region: 'South',
    location: 'Hampi, Vijayanagara District, Karnataka',
    state: 'Karnataka',
    repository: 'Archaeological Survey of India (Hampi Mini Circle)',
    imageUrl: '/images/monuments/hampi-stone-chariot.jpg',
    dimensions: 'Chariot height: 5.2 m; Maha Mantapa: 56 musical colonnades',
    material: 'Local coarse crystalline granite and chlorite details',
    dynasty: 'Vijayanagara Empire (Tuluva Dynasty)',
    significance: [
      'Composed of giant granite slabs carved to resemble an operational wooden processional ratha.',
      '56 musical sa-re-ga-ma pillars carved from resonant granite pillars tuned to harmonic notes.',
      'Granite wheels fitted with axles that historically rotated on ceremonial occasions.'
    ],
    source: 'Archaeological Survey of India',
    sourceUrl: 'https://asi.nic.in',
    license: 'UNESCO World Heritage Site',
    attribution: 'ASI Hampi World Heritage Site Office',
    verificationStatus: 'Scholar-verified',
    coordinates: { lat: 15.3350, lng: 76.4600 },
    timelineEpochId: 'vijayanagara-era',
    heritageMapLocationId: 'hampi-ruins',
    relatedArtifacts: ['brihadisvara'],
    relatedTraditions: ['channapatna-toy-artisans'],
    relatedSites: ['hampi-ruins']
  },
  {
    id: 'taj-mahal',
    accessionNo: 'UNESCO #252',
    title: 'Taj Mahal Pietra Dura & Marble Dome',
    nativeTitle: 'تاج محل',
    period: 'Mughal Era',
    dateBadge: '1648 CE',
    category: 'Monuments',
    categoryLabel: 'Indo-Islamic Architecture',
    description: 'White Makrana marble mausoleum featuring symmetrical gardens, bulbous double dome, and lapidary parchin kari inlays.',
    historicalContext: 'Commissioned by Emperor Shah Jahan in 1631 in memory of Empress Mumtaz Mahal, completed over 22 years by 20,000 artisans from across India and Persia.',
    culturalSignificance: 'Globally recognized jewel of Muslim art in India and universally admired masterpiece of world heritage.',
    region: 'North',
    location: 'Agra, Uttar Pradesh',
    state: 'Uttar Pradesh',
    repository: 'Archaeological Survey of India (Agra Circle)',
    imageUrl: '/images/monuments/taj-mahal-agra.jpg',
    dimensions: 'Total height: 73 m (240 ft); Plinth: 95 m × 95 m',
    material: 'Pure white Makrana marble inlaid with jade, crystal, lapis lazuli, and carnelian',
    dynasty: 'Mughal Empire (Shah Jahan)',
    significance: [
      'Double dome construction enabling monumental height without compromising interior proportions.',
      'Parchin Kari stone inlays using 28 varieties of precious and semi-precious gemstones.',
      'Minarets intentionally angled 2 degrees outward to protect the central tomb from earthquakes.'
    ],
    source: 'Archaeological Survey of India',
    sourceUrl: 'https://asi.nic.in',
    license: 'UNESCO World Heritage Site',
    attribution: 'ASI Agra Circle Conservation Office',
    verificationStatus: 'Scholar-verified',
    coordinates: { lat: 27.1751, lng: 78.0421 },
    timelineEpochId: 'mughal-era',
    heritageMapLocationId: 'taj-mahal-agra',
    relatedArtifacts: ['ashoka-lion-capital'],
    relatedTraditions: ['varanasi-zari-guild'],
    relatedSites: ['agra-fort']
  },
  {
    id: 'meenakshi',
    accessionNo: 'TN-ASI-88',
    title: 'Meenakshi Sundareswarar Gopurams',
    nativeTitle: 'மதுரை மீனாட்சி சுந்தரேசுவரர் கோயில்',
    period: 'Nayak & Southern Dynasties',
    dateBadge: '16th–17th c. CE',
    category: 'Monuments',
    categoryLabel: 'Dravidian Architecture',
    description: 'Sacred twin temple complex with 14 towering multi-tiered gopurams encrusted with thousands of stucco mythological figures.',
    historicalContext: 'Rebuilt and vastly expanded by the Nayak rulers of Madurai, principally Vishwanatha Nayak and Tirumala Nayak (1623–1659 CE).',
    culturalSignificance: 'Living spiritual center of the Sangam city of Madurai, housing the celebrated Thousand Pillar Hall.',
    region: 'South',
    location: 'Madurai, Tamil Nadu',
    state: 'Tamil Nadu',
    repository: 'HR&CE Department, Government of Tamil Nadu / ASI',
    imageUrl: '/images/monuments/meenakshi-temple-madurai.jpg',
    dimensions: 'Southern Gopuram height: 51.9 m (170 ft); 14 gopurams total',
    material: 'Granite base, stucco-clad brick superstructure, natural mineral pigments',
    dynasty: 'Madurai Nayak Dynasty',
    significance: [
      'Complex geometric mandala ground plan reflecting ancient Vaastu Shastra city planning.',
      'Thousand Pillar Mandapa containing 985 exquisitely carved monolithic pillars.',
      'Continuous living ritual tradition practiced uninterrupted for over two millennia.'
    ],
    source: 'Tamil Nadu State Archaeology / ASI',
    sourceUrl: 'https://www.maduraimeenakshi.org',
    license: 'Living Cultural Heritage',
    attribution: 'Madurai Nayak Heritage Documentation',
    verificationStatus: 'Source-linked',
    coordinates: { lat: 9.9195, lng: 78.1193 },
    timelineEpochId: 'medieval-era',
    heritageMapLocationId: 'meenakshi-madurai',
    relatedArtifacts: ['nataraja', 'brihadisvara'],
    relatedTraditions: ['swamimalai-bronze-guild'],
    relatedSites: ['brihadisvara']
  }
];

export const EPOCHS: Epoch[] = [
  {
    id: 'indus-valley',
    name: 'Indus Valley Civilization',
    timeRange: '2600 – 1900 BCE',
    description: 'Urban planning, bronze metallurgy, standardized weights and measures, hydraulic engineering, and un-deciphered pictographic script.',
    recordsCount: '14 Accessions',
    keyInnovations: ['Grid city planning & drainage', 'Lost-wax bronze casting', 'Steatite seals with unicorn & pashupati motifs', 'Dockyard engineering at Lothal'],
    primarySites: ['Mohenjo-daro', 'Harappa', 'Dholavira', 'Lothal', 'Rakhigarhi'],
    prominentThinkers: ['Urban Planner Guilds', 'Harappan Maritime Navigators'],
    architecturalStyle: 'Fired brick hydraulic architecture, granaries, and monumental water reservoirs'
  },
  {
    id: 'vedic-period',
    name: 'Vedic Period & Janapadas',
    timeRange: '1500 – 500 BCE',
    description: 'Oral metric transmission of the four Vedas, formulation of Upanishadic metaphysics, Sanskrit grammar, and emergence of early urban centers.',
    recordsCount: '19 Accessions',
    keyInnovations: ['Oral Vedic mnemonics (Pathas)', 'Sulba Sutras geometric altar mathematics', 'Iron metallurgy in Painted Grey Ware culture'],
    primarySites: ['Hastinapur', 'Ayodhya', 'Kashi (Varanasi)', 'Kurukshetra', 'Taxila'],
    prominentThinkers: ['Yajnavalkya', 'Gargi Vachaknavi', 'Panini'],
    architecturalStyle: 'Sacrificial Yajna altars, wooden and thatch assemblies, early mud-brick fortifications'
  },
  {
    id: 'mauryan-era',
    name: 'Mauryan Empire & Sunga Era',
    timeRange: '322 – 185 BCE',
    description: 'First pan-Indian political unification under Chandragupta and Ashoka. Proclamation of imperial moral edicts and monumental monolithic stone sculpture.',
    recordsCount: '32 Accessions',
    keyInnovations: ['Pan-subcontinental Dhamma edicts', 'Chunar sandstone mirror polish', 'Imperial highway network (Uttarapatha)', 'Monolithic stupa construction'],
    primarySites: ['Pataliputra (Patna)', 'Sarnath', 'Sanchi', 'Dhauli', 'Barabar Caves'],
    prominentThinkers: ['Emperor Ashoka', 'Chanakya (Kautilya)', 'Moggaliputta Tissa'],
    architecturalStyle: 'Rock-cut lomas rishi chaityas, monumental stupas, and free-standing polish columns'
  },
  {
    id: 'gupta-era',
    name: 'Gupta Golden Age',
    timeRange: '320 – 550 CE',
    description: 'Classical golden era of Sanskrit literature, decimal zero mathematics, monumental structural temples, and master Buddhist murals.',
    recordsCount: '48 Accessions',
    keyInnovations: ['Aryabhata’s decimal astronomy', 'Invention of zero notation', 'Classical Sanskrit drama & poetry', 'Iron Pillar of Delhi rustless metallurgy'],
    primarySites: ['Nalanda', 'Ajanta Caves', 'Udayagiri', 'Deogarh Dashavatara', 'Eran'],
    prominentThinkers: ['Aryabhata', 'Kalidasa', 'Varahamihira', 'Chandragupta II Vikramaditya'],
    architecturalStyle: 'Flat-roofed stone sanctums transitioning to sikhara spires and rock-cut vihara frescoes'
  },
  {
    id: 'post-gupta',
    name: 'Post-Gupta & Regional Kingdoms',
    timeRange: '550 – 750 CE',
    description: 'Rise of regional dynastic identities: Harsha of Kannauj, Chalukyas of Badami, and Pallavas of Kanchipuram introducing structural granite carving.',
    recordsCount: '27 Accessions',
    keyInnovations: ['Shore temple monolithic granite rathas', 'Kavirajamarga proto-Kannada aesthetics', 'Complex diplomatic missions to Tang China'],
    primarySites: ['Mamallapuram', 'Badami', 'Aihole', 'Pattadakal', 'Kannauj'],
    prominentThinkers: ['Banabhatta', 'Pulakeshin II', 'Mahendravarman I Pallava'],
    architecturalStyle: 'Cave rock-cut sanctuaries and free-standing monolithic rathas'
  },
  {
    id: 'chola-era',
    name: 'Chola Maritime Empire',
    timeRange: '848 – 1279 CE',
    description: 'Grand maritime trade across Southeast Asia, colossal granite Dravidian temple engineering, and the pinnacle of cire-perdue bronze iconography.',
    recordsCount: '54 Accessions',
    keyInnovations: ['Panchaloha lost-wax bronze casting', 'Interlocking dry granite vimanas', 'Democratic village councils (Uttaramerur inscriptions)', 'Trans-oceanic naval trade'],
    primarySites: ['Thanjavur', 'Gangaikonda Cholapuram', 'Darasuram', 'Chidambaram', 'Kumbakonam'],
    prominentThinkers: ['Rajaraja Chola I', 'Rajendra Chola I', 'Queen Sembiyan Mahadevi', 'Kambar'],
    architecturalStyle: 'Pyramidal stepped granite vimanas with monolithic kumbam capstones'
  },
  {
    id: 'delhi-sultanate',
    name: 'Delhi Sultanate Period',
    timeRange: '1206 – 1526 CE',
    description: 'Synthesis of Indo-Islamic architectural idioms: true arch, vault, dome, calligraphic epigraphy, geometric arabesques, and Sufi devotional music.',
    recordsCount: '31 Accessions',
    keyInnovations: ['True arch and corbelled dome engineering', 'Introduction of Amir Khusrau’s sitar and qawwali', 'Zari zardozi court embroidery'],
    primarySites: ['Qutb Minar Complex', 'Tughlaqabad', 'Hauz Khas', 'Ajmer Sharif'],
    prominentThinkers: ['Amir Khusrau', 'Hazrat Nizamuddin Auliya', 'Ziauddin Barani'],
    architecturalStyle: 'Red sandstone and white marble true arches, minarets, and geometric jali screens'
  },
  {
    id: 'vijayanagara-era',
    name: 'Vijayanagara Empire',
    timeRange: '1336 – 1646 CE',
    description: 'Cosmopolitan capital at Hampi with sprawling granite mandapas, musical acoustic pillars, stone chariots, and vibrant international bazaar commerce.',
    recordsCount: '41 Accessions',
    keyInnovations: ['Acoustic resonant musical pillars', 'Pushkarani step-well hydraulic networks', 'Kalyana Mandapa wedding halls', 'Telugu & Kannada literary patronage'],
    primarySites: ['Hampi', 'Lepakshi', 'Sringeri', 'Chandragiri', 'Tirupati'],
    prominentThinkers: ['Krishnadevaraya', 'Vidyaranya', 'Tenali Ramakrishna', 'Allasani Peddana'],
    architecturalStyle: 'Carved granite pillared halls with charging yali mythical beasts and stone chariots'
  },
  {
    id: 'mughal-era',
    name: 'Mughal Empire',
    timeRange: '1526 – 1857 CE',
    description: 'Symbiosis of Persian, Timurid, and Indian artistic traditions in symmetrical Charbagh gardens, Pietra Dura lapidary work, and imperial miniature ateliers.',
    recordsCount: '63 Accessions',
    keyInnovations: ['Pietra dura (Parchin Kari) stone inlays', 'Double-dome marble engineering', 'Hamzanama miniature painting atelier', 'Standardized land revenue survey'],
    primarySites: ['Agra', 'Fatehpur Sikri', 'Delhi Red Fort', 'Humayun’s Tomb', 'Lahore'],
    prominentThinkers: ['Akbar the Great', 'Abu’l-Fazl', 'Tansen', 'Ustad Ahmad Lahori'],
    architecturalStyle: 'Symmetrical white marble double domes, red sandstone forts, and quadripartite Charbagh water gardens'
  },
  {
    id: 'maratha-era',
    name: 'Maratha Empire',
    timeRange: '1674 – 1818 CE',
    description: 'Swarajya maritime forts along the Konkan coast, hilltop bastion architecture, Modi script state administration, and wada residential courtyards.',
    recordsCount: '29 Accessions',
    keyInnovations: ['Guerilla mountain warfare fort engineering', 'Sindhudurg and Vijaydurg naval forts', 'Modi script diplomatic correspondence', 'Peshwa wada architecture'],
    primarySites: ['Raigad Fort', 'Shivneri', 'Sindhudurg', 'Pune (Shaniwar Wada)', 'Satara'],
    prominentThinkers: ['Chhatrapati Shivaji Maharaj', 'Samarth Ramdas', 'Peshwa Baji Rao I', 'Ahilyabai Holkar'],
    architecturalStyle: 'Mountain defensive bastions, sea forts, and multistoried timber-frame wada courtyards'
  },
  {
    id: 'modern-republic',
    name: 'Independence & Modern Republic',
    timeRange: '1947 CE – Present',
    description: 'Constitutional preservation of indigenous heritage, institutionalization of the Archaeological Survey of India, and safeguarding unbroken living traditions.',
    recordsCount: '78 Accessions',
    keyInnovations: ['Constitutional fundamental duty to value & preserve heritage (Art 51A(f))', 'Geographical Indications (GI) Registry for artisan guilds', 'Digital preservation of palm-leaf manuscripts'],
    primarySites: ['National Museum New Delhi', 'IGNCA', 'ASI Circles nationwide', 'UNESCO World Heritage Sites'],
    prominentThinkers: ['Dr. B.R. Ambedkar', 'Kapila Vatsyayan', 'Ananda Coomaraswamy', 'Pupul Jayakar'],
    architecturalStyle: 'Modern museum conservation laboratories and sustainable cultural corridors'
  }
];

export const CULTURAL_CORRIDORS: CulturalCorridor[] = [
  {
    id: 'buddhist-pilgrimage',
    name: 'The Great Buddhist Pilgrimage Corridor',
    region: 'Northern & Eastern India',
    sitesCount: 8,
    highlight: 'Sarnath • Bodh Gaya • Nalanda • Sanchi • Kushinagar',
    description: 'Follow the 2,500-year-old footsteps of the Buddha, ancient Chinese pilgrim-monks Faxian and Xuanzang, and early scholastic councils.',
    unescoSites: '3 UNESCO World Heritage Sites',
    artisanGuilds: 'Varanasi Zari Handlooms, Bodh Gaya Stone Carving Guilds',
    mapCoordinates: { x: 55, y: 35, lat: 25.3811, lng: 83.0214 },
    activeBanner: {
      title: 'Buddhist Pilgrimage Corridor Active',
      subtext: 'Connecting Ashokan epigraphy to Mahavihara monasteries across Uttar Pradesh, Bihar, and Madhya Pradesh.'
    }
  },
  {
    id: 'chola-sacred-architecture',
    name: 'Chola Sacred Architecture & Bronze Corridor',
    region: 'Kaveri Delta, Tamil Nadu',
    sitesCount: 6,
    highlight: 'Thanjavur • Gangaikonda Cholapuram • Darasuram • Swamimalai • Kumbakonam',
    description: 'Epicenter of Dravidian monumental granite engineering, hydraulic temple tanks, and unbroken 1,000-year lost-wax bronze casting.',
    unescoSites: 'Great Living Chola Temples (UNESCO #250)',
    artisanGuilds: 'Swamimalai Sthapati Guilds, Thanjavur Gold Foil Painters',
    mapCoordinates: { x: 45, y: 78, lat: 10.7828, lng: 79.1318 },
    activeBanner: {
      title: 'Chola Sacred Architecture Corridor Active',
      subtext: 'Exploring the Kaveri Delta’s granite vimanas, temple epigraphy, and living lost-wax bronze foundries.'
    }
  },
  {
    id: 'deccan-rock-cut',
    name: 'Deccan Rock-Cut & Cave Sanctuary Corridor',
    region: 'Western Ghats & Deccan Plateau',
    sitesCount: 7,
    highlight: 'Ajanta • Ellora • Elephanta • Karla • Bhaja • Badami',
    description: 'Carved over a millennium from volcanic basalt cliffs, showcasing the evolution of Buddhist, Hindu, and Jain subterranean architecture.',
    unescoSites: 'Ajanta Caves, Ellora Caves, Elephanta Caves',
    artisanGuilds: 'Deccan Stone Carvers, Paithani Silk Weavers',
    mapCoordinates: { x: 38, y: 52, lat: 20.0258, lng: 75.1780 },
    activeBanner: {
      title: 'Deccan Rock-Cut Corridor Active',
      subtext: 'Traversing subterranean monolithic temples and classical Buddhist frescoes in Maharashtra and Karnataka.'
    }
  },
  {
    id: 'malabar-spice-maritime',
    name: 'Malabar Maritime & Living Traditions Corridor',
    region: 'Southwestern Coast',
    sitesCount: 5,
    highlight: 'Muziris • Kochi • Calicut • Wayanad • Thiruvananthapuram',
    description: 'Ancient global port corridor trading black pepper, cardamom, and teakwood with the Roman Empire, Arabia, and China since 1st c. BCE.',
    unescoSites: 'Western Ghats Bio-Cultural Corridor',
    artisanGuilds: 'Aranmula Metal Mirror Makers, Kalaripayattu Gurukulams',
    mapCoordinates: { x: 38, y: 88, lat: 9.9312, lng: 76.2673 },
    activeBanner: {
      title: 'Malabar Maritime Corridor Active',
      subtext: 'Unbroken coastal traditions, spice trade maritime archaeology, and temple mural paintings.'
    }
  }
];

export const LIVING_TRADITIONS: LivingTradition[] = [
  {
    id: 'swamimalai-bronze-guild',
    title: 'Swamimalai Lost-Wax Bronze Guild',
    subCategory: 'Cire-Perdue Metallurgy',
    description: 'Hereditary sthapatis continuing the 1,000-year-old Imperial Chola method of casting sacred bronzes according to the Shilpa Shastras.',
    community: 'Vishwakarma Sthapati Community',
    location: 'Swamimalai, Thanjavur District, Tamil Nadu',
    region: 'South',
    guildCount: '12 Active Master Ateliers',
    imageUrl: '/images/traditions/swamimalai-bronze-craft.jpg',
    unbrokenSince: 'c. 950 CE (Imperial Chola Era)',
    keyPractices: [
      'Beeswax, dammar resin, and groundnut oil preparation for sculpturing the core model.',
      'Three-layered alluvial clay mould sourced exclusively from the bed of the Kaveri river.',
      'Panchaloha molten alloy casting at 1,100°C followed by slow bench chiselling and burnishing.'
    ],
    materials: ['Copper', 'Brass', 'Zinc', 'Tin', 'Beeswax', 'Kaveri River Alluvial Silt'],
    processSteps: ['Wax Model Sculpting', 'Clay Mould Application', 'Dewaxing via Furnace', 'Molten Metal Pouring', 'Chiselling & Polishing'],
    giTagStatus: 'GI Registered (#GI-09, Swamimalai Bronze Icons)',
    responsibleWaysToSupport: [
      'Purchase directly from certified master cooperatives in Swamimalai.',
      'Visit master foundries with authorized cultural guides respecting workshop hours.',
      'Commission custom traditional sculptures with authenticity certificates.'
    ],
    relatedArtifacts: ['nataraja'],
    verificationStatus: 'Scholar-verified'
  },
  {
    id: 'varanasi-zari-guild',
    title: 'Varanasi Zari & Katan Silk Handloom',
    subCategory: 'Sacred Textile Weaving',
    description: 'Intricate jacquard and pit-loom brocade weaving combining real gold and silver metallic threads into pure mulberry silk.',
    community: 'Banarasi Bunkar Weavers Community',
    location: 'Kotwa & Madanpura, Varanasi, Uttar Pradesh',
    region: 'North',
    guildCount: 'Over 40,000 Pit Looms',
    imageUrl: '/images/traditions/varanasi-zari-silk.jpg',
    unbrokenSince: 'Mentioned in Jataka Tales (c. 5th c. BCE)',
    keyPractices: [
      'Naksha pattern drawing on graph paper transferred to wooden jacquard lattice punch cards.',
      'Real silver electroplated gold thread (Zari) interlaced with fine mulberry warp threads.',
      'Taking between 15 days to 6 months to weave a single ceremonial bridal sari.'
    ],
    materials: ['Pure Mulberry Silk', 'Silver Wire', 'Gold Foil', 'Natural Dyes'],
    processSteps: ['Raw Silk Degumming', 'Dyeing', 'Zari Drawing', 'Loom Setup', 'Manual Shuttle Weaving'],
    giTagStatus: 'GI Registered (#GI-99, Banaras Brocades and Sarees)',
    responsibleWaysToSupport: [
      'Look for the official Silk Mark and Handloom Mark holograms.',
      'Support fair-trade weaver cooperatives like Bunkar Sewa Kendra.',
      'Avoid machine-made synthetic polyester imitations.'
    ],
    relatedArtifacts: ['ashoka-lion-capital'],
    verificationStatus: 'Scholar-verified'
  },
  {
    id: 'channapatna-toy-artisans',
    title: 'Channapatna Lacquer Woodcraft',
    subCategory: 'Eco-Friendly Toy Making',
    description: 'Traditional wood turning and non-toxic natural vegetable lacquer polishing creating world-renowned organic toys and decorative pieces.',
    community: 'Channapatna Woodcraft Guild',
    location: 'Channapatna ("Gombegala Ooru"), Ramanagara, Karnataka',
    region: 'South',
    guildCount: '3,000+ Master Turners',
    imageUrl: '/images/traditions/channapatna-toys.jpg',
    unbrokenSince: 'Patronized by Tipu Sultan in late 18th c.',
    keyPractices: [
      'Using sustainably harvested soft Wrightia tinctoria (Aale mara / ivory wood).',
      'High-speed lathe turning with chisels without toxic chemical varnishes.',
      'Polishing with lac infused with turmeric (yellow), vermilion (red), and indigo (blue).'
    ],
    materials: ['Wrightia tinctoria wood', 'Natural lac resin', 'Turmeric', 'Indigo', 'Kewra leaf polishers'],
    processSteps: ['Wood Seasoning', 'Lathe Turning', 'Natural Lac Dyeing', 'Friction Polishing with Talegari leaves'],
    giTagStatus: 'GI Registered (#GI-17, Channapatna Toys and Dolls)',
    responsibleWaysToSupport: [
      'Choose organic Channapatna toys for children instead of imported plastic toys.',
      'Buy directly from artisan-owned shops along the Bangalore-Mysore highway.',
      'Support workshops offering sustainable apprenticeships to younger artisans.'
    ],
    relatedArtifacts: ['hampi-vittala'],
    verificationStatus: 'Scholar-verified'
  },
  {
    id: 'thanjavur-painting-guild',
    title: 'Thanjavur Gold Leaf Painting Maestros',
    subCategory: 'Sacred Iconography Panel Painting',
    description: 'Classical South Indian painting style characterized by rich, vivid colors, surface gesso relief work, and pure 22-karat gold foil adornments.',
    community: 'Raju and Naidu Painter Guilds',
    location: 'Thanjavur, Tamil Nadu',
    region: 'South',
    guildCount: '80+ Certified Studios',
    imageUrl: '/images/traditions/thanjavur-painting.jpg',
    unbrokenSince: '16th Century (Maratha & Nayak Courts)',
    keyPractices: [
      'Plank preparation with teakwood board, unbleached cloth, and French chalk/tamarind gesso paste.',
      'Embossed relief ornamentation using Arabic gum and powdered chalk stone.',
      'Meticulous application of ultra-thin 22-karat pure gold foil with embedded Jaipur semi-precious stones.'
    ],
    materials: ['Teakwood base', '22K Gold foil', 'Jaipur glass gemstones', 'Tamarind seed glue', 'Natural pigments'],
    processSteps: ['Board Preparation', 'Sketching', 'Gesso Relief Work', 'Gold Foil Leafing', 'Detailed Pigment Painting'],
    giTagStatus: 'GI Registered (#GI-22, Thanjavur Paintings)',
    responsibleWaysToSupport: [
      'Verify 22K gold foil authenticity certificates when purchasing.',
      'Support traditional artists who preserve natural stone and vegetable pigments.',
      'Commission custom family heirloom panels directly from master painters.'
    ],
    relatedArtifacts: ['brihadisvara', 'nataraja'],
    verificationStatus: 'Scholar-verified'
  },
  {
    id: 'patan-patola-guild',
    title: 'Patan Patola Double Ikat Weaving',
    subCategory: 'Heritage Double-Ikat Silk',
    description: 'Extremely intricate double ikat silk weaving where both warp and weft are tie-dyed before weaving, creating identical reverse patterns.',
    community: 'Salvi Master Weavers Family',
    location: 'Patan, North Gujarat',
    region: 'West',
    guildCount: 'Only 3 Preserving Master Families',
    imageUrl: '/images/traditions/patan-patola-ikat.jpg',
    unbrokenSince: '11th Century (Solanki Dynasty)',
    keyPractices: [
      'Mathematical pre-calculation of warp and weft intersections with cotton tie knots.',
      'Natural dyeing with pomegranate rind, madder root, indigo, and marigold flowers.',
      'Taking 6 months to 1 year for two weavers to produce a single authentic Patan Patola.'
    ],
    materials: ['Natural Mulberry Silk', 'Natural Vegetable Dyes', 'Teakwood Handlooms'],
    processSteps: ['Yarn Tying', 'Multi-stage Dyeing', 'Loom Tensioning', 'Precision Alignment Weaving'],
    giTagStatus: 'GI Registered (#GI-232, Patan Patola)',
    responsibleWaysToSupport: [
      'Visit the Patan Patola Heritage Museum in Patan to see the master loom.',
      'Recognize that true double ikat takes months of mathematical hand labor.',
      'Protect hereditary master weavers from cheap machine-printed imitations.'
    ],
    relatedArtifacts: ['ellora'],
    verificationStatus: 'Scholar-verified'
  },
  {
    id: 'bastar-dhokra-guild',
    title: 'Bastar Dhokra Lost-Wax Bell Metalcraft',
    subCategory: 'Tribal Metallurgy',
    description: 'Ancient lost-wax bell metal casting practiced by indigenous artisans without joints, directly descending from Mohenjo-daro traditions.',
    community: 'Ghadwa Tribal Metalsmiths',
    location: 'Kondagaon & Bastar, Chhattisgarh',
    region: 'Central',
    guildCount: '25 Village Clusters',
    imageUrl: '/images/traditions/bastar-dhokra-craft.jpg',
    unbrokenSince: 'Over 4,000 Years (Direct continuity from Dancing Girl of Mohenjo-daro)',
    keyPractices: [
      'Preparation of clay core from ant-hill clay and paddy chaff.',
      'Extracting thin wax threads using a wooden piston press and wrapping the clay core.',
      'Firing in an open pit furnace using local timber charcoal and scrap brass.'
    ],
    materials: ['Ant-hill clay', 'Natural beeswax', 'Scrap brass & bell metal', 'Charcoal'],
    processSteps: ['Clay Core Modeling', 'Wax Thread Wrapping', 'Outer Clay Casing', 'Pit Furnace Melting', 'Break-mould Retrieval'],
    giTagStatus: 'GI Registered (#GI-83, Bastar Dhokra)',
    responsibleWaysToSupport: [
      'Buy directly through certified tribal cooperatives like Jharokha and Tribes India.',
      'Acknowledge Dhokra as one of humanity’s oldest surviving metallurgic technologies.',
      'Support forest-based livelihood security for tribal metalsmiths.'
    ],
    relatedArtifacts: ['nataraja'],
    verificationStatus: 'Scholar-verified'
  },
  {
    id: 'odisha-pattachitra',
    title: 'Odisha Pattachitra & Palm-Leaf Scroll Art',
    subCategory: 'Sacred Narrative Scroll Painting',
    description: 'Classical cloth-based and palm-leaf narrative painting characterized by rich natural mineral pigments, intricate mythological iconography, and fine freehand line work.',
    community: 'Chitrakar Hereditary Guild',
    location: 'Raghurajpur Heritage Village, Puri District, Odisha',
    region: 'East',
    guildCount: '120+ Hereditary Master Families',
    imageUrl: '/images/traditions/odisha-pattachitra.jpg',
    unbrokenSince: '12th Century CE (Rooted in Jagannath Temple Rites)',
    keyPractices: [
      'Patta canvas preparation using cotton cloth bonded with tamarind seed gum and burnished with conch powder.',
      '100% natural mineral pigments: white from sea conch, yellow from harital, red from hingula, black from lamp soot.',
      'Meticulous freehand brushwork with fine squirrel and mouse-hair brushes, sealed with tree resin glaze.'
    ],
    materials: ['Wild Cotton Canvas', 'Tamarind Seed Gum', 'Conch Shell Chalk', 'Natural Mineral Pigments', 'Palm Leaves'],
    processSteps: ['Canvas Priming', 'Conch Stone Burnishing', 'Red Ink Drawing', 'Mineral Color Infilling', 'Black Detail Outlining', 'Natural Resin Glazing'],
    giTagStatus: 'GI Registered (#GI-87, Odisha Pattachitra)',
    responsibleWaysToSupport: [
      'Visit Raghurajpur Heritage Crafts Village respectfully, engaging directly with artisan family ateliers.',
      'Verify authentic hand-painted canvas and palm leaf vs printed paper imitations.',
      'Support verified government emporiums such as Utkalika (Odisha State Co-op).'
    ],
    relatedArtifacts: ['palm-leaf', 'konark-wheel'],
    verificationStatus: 'Scholar-verified'
  }
];

export const ARTISANS_DATA: ArtisanProfile[] = [
  {
    id: 'chitrakar-raghurajpur',
    name: 'Raghurajpur Chitrakar Artisan Heritage Society',
    tradition: 'Odisha Pattachitra & Tala Pothi Inscribing',
    location: 'Raghurajpur, Puri District',
    state: 'Odisha',
    giTagCertified: true,
    giCertificationNo: 'GI-87',
    generationSpan: 'Over 30 Generations of Continuous Practice',
    materials: ['Tamarind-treated Cotton Canvas', 'Conch Shell Powder', 'Harital Stone', 'Cured Palm Leaf', 'Iron Stylus'],
    techniques: ['Natural pigment synthesis', 'Microscopic palm-leaf engraving (Tala Pothi)', 'Vedic iconographic composition'],
    bio: 'An entire living heritage village where every family maintains the hereditary Chitrakar art. Their works are commissioned for the annual Rath Yatra at Puri and international museums.',
    culturalContext: 'Traditionally created during the sacred Anasara fortnight when the Jagannath sanctum is secluded. The scrolls embody centuries of continuous oral and visual literature.',
    sustainablePractices: ['Zero synthetic chemical solvents or plastic resins', 'All pigments derived from local stones, clay, and shells', 'Re-usable organic compost from palm waste'],
    supportAvenues: [
      'Direct studio visits in Raghurajpur village adhering to respectful community visiting hours.',
      'Purchasing directly through registered artisan society certificates.'
    ],
    imageUrl: '/images/traditions/odisha-pattachitra.jpg',
    verificationStatus: 'Scholar-verified'
  },
  {
    id: 'sthapati-swamimalai',
    name: 'Swamimalai Sthapati Master Cooperative',
    tradition: 'Chola Lost-Wax Bronze Sculpture',
    location: 'Swamimalai, Thanjavur District',
    state: 'Tamil Nadu',
    giTagCertified: true,
    giCertificationNo: 'GI-09',
    generationSpan: 'Over 30 Generations Unbroken',
    materials: ['Copper', 'Brass', 'Zinc', 'Beeswax', 'Kaveri Alluvial Clay'],
    techniques: ['Cire-perdue (lost wax)', 'Agamic proporational iconometry (Talamana)', 'Fine hand chiselling'],
    bio: 'Direct descendants of the imperial sthapatis commissioned by Rajaraja Chola I for the Brihadisvara Temple. Working in open-air foundries strictly adhering to the Manasara and Shilpa Shastras.',
    culturalContext: 'Each sculpture is cast as a unique, non-reproducible devotional masterpiece. The clay mould is destroyed upon retrieval of the molten bronze casting.',
    sustainablePractices: ['Using 100% biodegradable beeswax cores', 'Recycling scrap copper alloys', 'Zero chemical effluent discharge'],
    supportAvenues: [
      'Direct order placement through the Tamil Nadu Handicrafts Development Corporation (Poompuhar).',
      'Educational masterclasses for heritage conservation students.'
    ],
    imageUrl: '/images/traditions/swamimalai-bronze-craft.jpg',
    verificationStatus: 'Scholar-verified'
  },
  {
    id: 'bunkar-varanasi',
    name: 'Kashi Bunkar Weaver Cooperative',
    tradition: 'Banarasi Real Zari Silk Brocade',
    location: 'Kotwa & Madanpura, Varanasi',
    state: 'Uttar Pradesh',
    giTagCertified: true,
    giCertificationNo: 'GI-99',
    generationSpan: '6th Generation Master Weavers',
    materials: ['Pure Mulberry Silk', 'Silver-core electroplated Gold Zari', 'Natural Dyes'],
    techniques: ['Phekwa and Kadwa shuttle techniques', 'Traditional manual pit loom', 'Jala floral designing'],
    bio: 'Master weavers who interlace centuries-old Mughal and Persian motifs with classical Indian floral jaal patterns. The cooperative operates collective welfare funds for elderly artisan pension support.',
    culturalContext: 'Banarasi silk is intrinsically intertwined with India’s festive rites of passage, celebrated for its weighty hand-feel and heirloom longevity across generations.',
    sustainablePractices: ['Solar-powered warping units', 'Non-toxic natural vegetable and azo-free dyes', 'Fair-wage cooperative dividend distribution'],
    supportAvenues: [
      'Purchase directly from certified bunkar society depots in Varanasi.',
      'Encourage transparent handloom traceability tags.'
    ],
    imageUrl: '/images/traditions/varanasi-zari-silk.jpg',
    verificationStatus: 'Scholar-verified'
  },
  {
    id: 'channapatna-crafts',
    name: 'Channapatna Organic Toy Artisan Society',
    tradition: 'Natural Lacquer Wooden Toycraft',
    location: 'Channapatna',
    state: 'Karnataka',
    giTagCertified: true,
    giCertificationNo: 'GI-17',
    generationSpan: '4th Generation Guild Artisans',
    materials: ['Aale Mara (Wrightia tinctoria)', 'Natural Shellac', 'Turmeric', 'Indigo', 'Kewra leaves'],
    techniques: ['Manual Lathe Turning', 'Friction-applied lacquer glazing', 'Screw-press natural dye blending'],
    bio: 'Pioneered by craftsmen who transformed soft local timber into safe, organic, child-friendly playthings. The cooperative has trained hundreds of women artisans in precision lathe turning.',
    culturalContext: 'A prime example of circular, zero-waste indigenous craft where even the wood shavings are reused as compost and fuel.',
    sustainablePractices: ['Using sustainably pruned agro-forestry wood', '100% natural, non-toxic, child-safe vegetable colors', 'Plastic-free organic packaging'],
    supportAvenues: [
      'Support institutional school orders for eco-friendly educational toys.',
      'Purchase directly from artisan cooperatives via Karnataka State Arts & Crafts Emporium (Cauvery).'
    ],
    imageUrl: '/images/traditions/channapatna-toys.jpg',
    verificationStatus: 'Scholar-verified'
  }
];

export const MANUSCRIPTS_DATA: ManuscriptRecord[] = [
  {
    id: 'rigveda-samhita-folio',
    accessionNo: 'BHO-MS-1875',
    title: 'Rigveda Samhita (Shakala Shakha)',
    period: 'Vedic Tradition / 14th c. CE Copy',
    script: 'Sharada Script on Himalayan Birch Bark',
    language: 'Vedic Sanskrit',
    region: 'Kashmir Valley',
    material: 'Cured Betula utilis (Bhojpatra) bark folios with walnut ink',
    folioCount: 84,
    dimensions: '28 cm × 12.5 cm',
    repository: 'Bhandarkar Oriental Research Institute (BORI), Pune',
    preservationStatus: 'Digitized & Chemically Consolidated with Hydroxypropyl Cellulose',
    transcription: 'अग्निमीळे पुरोहितं यज्ञस्य देवमृत्विजम् । होतारं रत्नधातमम् ॥',
    transliteration: 'agnim īḷe purohitaṁ yajñasya devam ṛtvijam | hotāraṁ ratnadhātamam ||',
    translation: 'I glorify Agni, the high priest of the sacrifice, the divine minister of religious rites, the summoner of the gods, the greatest bestower of treasures.',
    hindiTranslation: 'मैं यज्ञ के पुरोहित, दिव्य देव, ऋत्विज और प्रचुर रत्नों के धारक अग्निदेव की स्तुति करता हूँ।',
    audioPhonetics: 'Mandala 1, Sukta 1, Rik 1 (Svarita & Udatta tonal Vedic chant cadence)',
    imageUrl: '/images/manuscripts/rigveda-sharada-manuscript.jpg',
    zoomDetailUrl: '/images/manuscripts/rigveda-sharada-manuscript.jpg',
    source: 'Bhandarkar Oriental Research Institute / UNESCO Memory of the World',
    verificationStatus: 'Scholar-verified',
    paleographyNotes: [
      'Inscribed in archaic Kashmiri Sharada characters using organic soot-based carbon ink impervious to water.',
      'Features explicit red accent marks designating the triple Vedic pitch accents (Udatta, Anudatta, Svarita).',
      'Nominated to the UNESCO Memory of the World Register in 2007 as humanity’s oldest philosophical collection.'
    ]
  },
  {
    id: 'gilgit-lotus-sutra',
    accessionNo: 'NAM-MS-GIL-04',
    title: 'Saddharmapundarika Sutra (Gilgit Lotus Sutra)',
    period: '5th – 6th Century CE',
    script: 'Early Gupta Brahmi (Siddhamatrka)',
    language: 'Buddhist Hybrid Sanskrit',
    region: 'Gilgit (Ancient Gandhara / Northern Transit Route)',
    material: 'Birch bark bound in traditional pothi format with wooden covers',
    folioCount: 120,
    dimensions: '31 cm × 7.5 cm',
    repository: 'National Archives of India, New Delhi',
    preservationStatus: 'Climate-controlled inert nitrogen archival storage',
    transcription: 'गाथाभिरभिष्टुवन्ति स्म । सर्वसत्त्वेषु च महाकरुणां समुत्पादयन्ति स्म ॥',
    transliteration: 'gāthābhir abhiṣṭuvanti sma | sarvasattveṣu ca mahākaruṇāṁ samutpādayanti sma ||',
    translation: 'They praised with metrical verses and awakened boundless great compassion toward all sentient beings in the cosmos.',
    hindiTranslation: 'उन्होंने छंदबद्ध श्लोकों से स्तुति की और समस्त जीवित प्राणियों के प्रति महाकरुणा का संचार किया।',
    imageUrl: '/images/manuscripts/gilgit-lotus-sutra.jpg',
    source: 'National Archives of India / Archaeological Survey of India',
    verificationStatus: 'Scholar-verified',
    paleographyNotes: [
      'Discovered inside a hollow stupa in Gilgit in 1931; among the oldest surviving physical Buddhist manuscripts in the world.',
      'Demonstrates the northern spread of Brahmi letterforms into Central Asian and Silk Road scripts.',
      'Contains profound Mahayana treatises on cosmic compassion, expedient means (upaya), and the universal potential for enlightenment.'
    ]
  },
  {
    id: 'palm-leaf-chitra-pothi',
    accessionNo: 'IGNCA-MS-42',
    title: 'Illustrated Palm-Leaf Gita Govinda (Chitra Pothi)',
    period: '14th – 15th Century CE',
    script: 'Karani / Odia Script',
    language: 'Classical Sanskrit with Odia annotations',
    region: 'Puri District, Odisha',
    material: 'Incised Tala palm leaf (Borassus flabellifer) folios stitched with raw silk cord',
    folioCount: 42,
    dimensions: '32 cm × 4.5 cm',
    repository: 'Indira Gandhi National Centre for the Arts (IGNCA), New Delhi',
    preservationStatus: 'Protected with natural citronella and neem oil fumigation',
    transcription: 'मेघैर्मेदुरमम्बरं वनभुवः श्यामास्तमालद्रुमैर्नक्तं भीरुरयं त्वमेव तदिमं राधे गृहं प्रापय ॥',
    transliteration: 'meghair meduram ambaraṁ vanabhuvaḥ śyāmās tamāladrumair naktaṁ bhīrur ayaṁ tvam eva tad imaṁ rādhe gṛhaṁ prāpaya ||',
    translation: 'The sky is thick with dark monsoon clouds, the woodland is shadowed with deep tamala trees; the night approaches and he is timid. O Radha, lead him safely home.',
    hindiTranslation: 'आकाश बादलों से घिरा है, तमाल वृक्षों से वन अंधकारमय हो रहा है; हे राधा, तुम इसे घर तक पहुँचा दो।',
    imageUrl: '/images/manuscripts/palm-leaf-chitra-pothi-full.jpg',
    source: 'IGNCA Manuscript Division / National Mission for Manuscripts',
    verificationStatus: 'Curator-reviewed',
    paleographyNotes: [
      'Each letter incised using an iron stylus (loha lekhani) without tearing the longitudinal palm-leaf grain.',
      'Soot and lampblack rubbed into the etched incisions to render the text legible and insect-resistant.',
      'Accompanied by miniature etched line drawings showing dancers, peacocks, and seasonal flora.'
    ]
  }
];

export const VISION_SPECIMENS: VisionSpecimen[] = [
  {
    id: 'specimen-nataraja',
    name: 'Chola Bronze Nataraja',
    classification: 'Panchaloha Sacred Sculpture (11th c. CE)',
    attributes: 'Anandatandava posture, Damaru in upper right, Agni in upper left, Abhaya mudra, Apasmara underfoot, Prabhamandala ring',
    stylisticAttribution: 'Imperial Chola Dynastic Foundry (Kaveri Delta, Tamil Nadu)',
    comparativeSpecimen: 'National Museum New Delhi Showcase #14 / LACMA Accession #M.75.1',
    confidence: '98.4%',
    imageUrl: '/images/artifacts/chola-nataraja-bronze.jpg',
    regionBox: {
      label: 'Detected: Canonical Anandatandava Mudra & Prabhamandala',
      confidence: '98.4%',
      x: 18,
      y: 15,
      width: 64,
      height: 70
    }
  },
  {
    id: 'specimen-gandhara-buddha',
    name: 'Gandhara Standing Buddha',
    classification: 'Greco-Buddhist Schist Sculpture (2nd c. CE)',
    attributes: 'Wavy hair ushnisha, heavy togate sanghati drapery, urna brow mark, calm contemplative expression, classical contrapposto',
    stylisticAttribution: 'Kushan Empire / Gandhara School (Peshawar / Taxila Basin)',
    comparativeSpecimen: 'Government Museum Chandigarh & British Museum Asian Collection',
    confidence: '96.2%',
    imageUrl: '/images/artifacts/sultanganj-buddha-bronze.jpg',
    regionBox: {
      label: 'Detected: Greco-Buddhist Sanghati Folds & Ushnisha',
      confidence: '96.2%',
      x: 22,
      y: 10,
      width: 56,
      height: 80
    }
  },
  {
    id: 'specimen-temple-pillar',
    name: 'Dravidian Yali Temple Pillar',
    classification: 'Granite Monolithic Architectural Column (16th c. CE)',
    attributes: 'Rearing leonine Yali composite beast, rider with spear, multi-faceted fluted shaft, drooping lotus bracket capital',
    stylisticAttribution: 'Vijayanagara / Nayak Dynastic Style (Deccan & Tamil Nadu)',
    comparativeSpecimen: 'Hampi Vittala Temple Mandapa / Madurai Meenakshi Thousand Pillar Hall',
    confidence: '95.7%',
    imageUrl: '/images/monuments/hampi-stone-chariot.jpg',
    regionBox: {
      label: 'Detected: Rearing Yali Bracket & Fluted Granite Shaft',
      confidence: '95.7%',
      x: 25,
      y: 20,
      width: 50,
      height: 60
    }
  },
  {
    id: 'specimen-mughal-miniature',
    name: 'Imperial Court Miniature Painting',
    classification: 'Gouache on Wasli Paper with Gold Leaf (c. 1620 CE)',
    attributes: 'Three-quarter profile portraiture, fine single-hair brush stippling (pardaz), floral illumination border (hashiya), lapis lazuli background',
    stylisticAttribution: 'Mughal Imperial Atelier (Jahangir / Shah Jahan Era)',
    comparativeSpecimen: 'National Museum Miniature Gallery / Victoria and Albert Museum',
    confidence: '94.8%',
    imageUrl: '/images/traditions/thanjavur-painting.jpg',
    regionBox: {
      label: 'Detected: Mughal Court Hashiya & Wasli Mineral Pigment Layering',
      confidence: '94.8%',
      x: 15,
      y: 15,
      width: 70,
      height: 70
    }
  }
];

export const RESEARCH_PRESETS: ResearchQueryPreset[] = [
  {
    question: 'What does the Nataraja pose represent?',
    canonicalTerm: 'Ananda Tandava Metaphysics & Agamic Iconometry',
    status: 'Corroborated by primary Shilpa Shastra sources',
    confidence: 'High confidence',
    responseParagraphs: [
      'The Ananda Tandava ("Dance of Bliss") of Shiva Nataraja encodes the five fundamental activities of cosmic life (Panchakritya): creation (srishti), preservation (sthiti), destruction or transformation (samhara), illusion or embodiment (tirobhava), and spiritual liberation (anugraha).',
      'The upper right hand holds the damaru (hourglass drum), producing the primordial sound vibrations (nada) from which all cosmic geometry emerges. The upper left hand cradles agni (sacred fire), representing the fire that purifies and dissolves the universe at the end of the cosmic cycle.',
      'The lower right hand is raised in the abhaya mudra ("fear not"), offering divine protection to all beings. The lower left hand sweeps diagonally across the chest in the gajahasta gesture, pointing downward to the lifted left foot, which signifies sanctuary and spiritual release for the soul.',
      'Under the firmly planted right foot lies Apasmara Purusha, the dwarf representing spiritual ignorance, forgetfulness, and human ego. Nataraja dances directly upon this ignorance without slaying it, signifying perpetual mastery over cosmic forgetfulness.'
    ],
    citations: [
      { recordId: 'ASI-104', title: 'Ananda Tandava Nataraja (Accession ASI-104)', link: '/artifact/nataraja', source: 'National Museum Bronze Archive' },
      { recordId: 'UNESCO #250', title: 'Brihadisvara Inscriptions (UNESCO #250)', link: '/artifact/brihadisvara', source: 'ASI Epigraphia Indica' }
    ],
    relatedRecords: ['nataraja', 'brihadisvara', 'swamimalai-bronze-guild']
  },
  {
    question: 'Explain Chola lost-wax bronze metallurgy.',
    canonicalTerm: 'Cire-Perdue Panchaloha Casting Process',
    status: 'Verified across ASI laboratory surveys & living Swamimalai guild records',
    confidence: 'High confidence',
    responseParagraphs: [
      'Chola bronze casting utilized the cire-perdue (lost-wax) technique codified in ancient Shilpa treatises such as the Manasara and Mayamata. Unlike hollow bronze castings in other ancient cultures, Chola master sculptures were cast in solid panchaloha (an alloy traditionally composed of copper, tin, zinc, silver, and gold).',
      'First, the master sthapati hand-sculpts a detailed wax model using a compound of beeswax, resin (kungilium), and groundnut oil according to strict proportional canon (talamana). Every jewel, finger posture, and ornament is finished entirely in the wax phase.',
      'Next, three distinct layers of clay are applied over the wax model: the first layer uses ultra-fine alluvial silt from the Kaveri riverbed to capture microscopic details, followed by coarser clay and sand mixed with rice husk to withstand molten heat.',
      'The mould is baked in an open kiln, allowing the wax to drain away through sprues. The molten alloy, heated to over 1,100°C, is poured into the hollow cavity in a single continuous stream. Once cooled, the mould is broken, and weeks of meticulous chisel finishing, engraving, and polishing follow.'
    ],
    citations: [
      { recordId: 'ASI-104', title: 'Chola Metallurgy Archival Dossier #NM-BR-56', link: '/artifact/nataraja', source: 'National Museum New Delhi' },
      { recordId: 'GI-09', title: 'Swamimalai Bronze Icons GI Record #GI-09', link: '/living-traditions', source: 'Government of India GI Registry' }
    ],
    relatedRecords: ['nataraja', 'swamimalai-bronze-guild']
  },
  {
    question: 'What is the architectural significance of the Brihadisvara Vimana?',
    canonicalTerm: 'Dravidian Structural Granite Engineering',
    status: 'Verified against ASI Chennai Circle architectural survey',
    confidence: 'High confidence',
    responseParagraphs: [
      'The Brihadisvara Temple (consecrated 1010 CE under Rajaraja Chola I) represents the zenith of south Indian Dravidian temple architecture. Its central vimana towers 66 metres (216 feet) high, making it one of the tallest stone temples in the ancient world.',
      'The entire superstructure is built of interlocking, dry-joint granite masonry without the use of binding mortar or cement. Remarkably, there are no granite quarries anywhere in the alluvial Kaveri delta within a 60-kilometre radius, requiring a massive river transport and elephant hauling logistics system.',
      'The octagonal sikhara capstone (kumbam) at the summit weighs approximately 81.3 tonnes and is carved from a single granite boulder. Ancient records and architectural calculations confirm it was raised to the 66-metre summit along an inclined earthen ramp spanning over 4 kilometres from the village of Sarapallam.'
    ],
    citations: [
      { recordId: 'UNESCO #250', title: 'Great Living Chola Temples Dossier', link: '/artifact/brihadisvara', source: 'UNESCO World Heritage Centre' },
      { recordId: 'ASI-EP-34', title: 'South Indian Inscriptions, Vol. II', link: '/sources', source: 'Archaeological Survey of India' }
    ],
    relatedRecords: ['brihadisvara', 'nataraja']
  },
  {
    question: 'Explain the Nalanda University curriculum and international significance.',
    canonicalTerm: 'Mahavihara Pedagogy & Epistemology',
    status: 'Corroborated by Xuanzang, Yijing, and ASI excavations',
    confidence: 'High confidence',
    responseParagraphs: [
      'Nalanda Mahavihara (founded 5th c. CE under Kumaragupta I) was the world’s first residential international university, housing over 10,000 students and 2,000 faculty members from China, Korea, Japan, Tibet, Mongolia, and Sumatra.',
      'The university was rigorously intellectual and interdisciplinary. The curriculum spanned Mahayana and Theravada Buddhist philosophy, Hetuvidya (formal logic and epistemology), Sabdavidya (Sanskrit grammar and linguistics), Cikitsavidya (Ayurvedic medicine), mathematics, astronomy, and urban architecture.',
      'Entrance examinations were notoriously demanding: prospective students had to debate the Dvara-panditas (gatekeeper scholars) at the entrance gates, and only two out of ten applicants succeeded in gaining admission. The institution was supported by royal endowments of over 100 villages guaranteeing free tuition, food, lodging, and medicines for all scholars.'
    ],
    citations: [
      { recordId: 'ASI-NAL-12', title: 'Nalanda Terracotta Seal Inscription', link: '/artifact/nalanda-seal', source: 'Nalanda Archaeological Museum' },
      { recordId: 'UNESCO #1502', title: 'Archaeological Site of Nalanda Mahavihara', link: '/map', source: 'UNESCO World Heritage Centre' }
    ],
    relatedRecords: ['nalanda-seal', 'ashoka-lion-capital']
  }
];
