import { SustainableDestination } from '@/types';

export const SUSTAINABLE_DESTINATIONS: SustainableDestination[] = [
  {
    id: 'hampi-karnataka',
    name: 'Hampi Heritage Valley',
    state: 'Karnataka',
    region: 'South',
    sustainabilityScore: 88,
    crowdLevel: 'Moderate',
    environmentalSensitivity: 'Fragile Stone/Cave System',
    localEconomicImpact: 'High direct artisan benefit',
    bestVisitingPeriod: 'October to February (Cool winter breezes)',
    responsibleTravelTips: [
      'Use rental electric golf carts or bicycles instead of fossil-fuel vehicles inside the monument zone.',
      'Do not climb or sit on fragile ancient granite carved pillars or temple friezes.',
      'Stay in community-run homestays across the Tungabhadra river in Anegundi village.',
      'Purchase banana-fiber handicrafts directly from the Kishkinda Trust women’s cooperative.'
    ],
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Stone_chariot_at_Hampi.jpg',
    recommendedStayDays: 3,
    ecoStays: ['Uramma Heritage Homes Anegundi', 'Kishkinda Eco Retreat'],
    localCraftCoops: ['The Kishkinda Trust (Banana Fiber Crafts)', 'Sandur Kushala Kala Kendra (Lambani Embroidery)']
  },
  {
    id: 'dholavira-kutch',
    name: 'Dholavira & Greater Rann of Kutch',
    state: 'Gujarat',
    region: 'West',
    sustainabilityScore: 95,
    crowdLevel: 'Low',
    environmentalSensitivity: 'Critical Eco-Heritage',
    localEconomicImpact: 'High direct artisan benefit',
    bestVisitingPeriod: 'November to February (Migratory flamingo season)',
    responsibleTravelTips: [
      'Carry refillable metal water flasks; zero single-use plastics are permitted near the Harappan reservoir sites.',
      'Hire certified local desert guides from the archaeological sanctuary to support local hamlet employment.',
      'Visit Rogan and Ajrakh artisan homes in Nirona and Ajrakhpur to buy directly with zero middleman markup.'
    ],
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Dholavira_Reservoir.jpg',
    recommendedStayDays: 4,
    ecoStays: ['Shaam-e-Sarhad Village Resort Hodka', 'Toran Rann Resort'],
    localCraftCoops: ['Khamir Craft Resource Centre', 'Kutch Rogan Art Heritage Guild', 'Shrujan Thread of Life']
  },
  {
    id: 'thanjavur-delta',
    name: 'Thanjavur & Kaveri Living Heritage Basin',
    state: 'Tamil Nadu',
    region: 'South',
    sustainabilityScore: 92,
    crowdLevel: 'Moderate',
    environmentalSensitivity: 'Riverine Ecosystem',
    localEconomicImpact: 'High direct artisan benefit',
    bestVisitingPeriod: 'October to March',
    responsibleTravelTips: [
      'Explore the Great Living Chola Temples (Thanjavur, Gangaikonda, Darasuram) using low-carbon rail transit.',
      'Visit the Swamimalai bronze casting units to see hereditary cire-perdue casting without touching chemical lacquers.',
      'Dine on banana-leaf regional millets and traditional Kaveri delta organic rice varieties.'
    ],
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Brihadisvara_Temple,_Thanjavur,_Tamil_Nadu,_India.jpg',
    recommendedStayDays: 3,
    ecoStays: ['Svatma Heritage Residence', 'Mantra Koodam Eco Living Kumbakonam'],
    localCraftCoops: ['Swamimalai Hereditary Bronze Guild', 'Thanjavur Art Plate Cooperative', 'Nachiyar Koil Brass Lamp Guild']
  },
  {
    id: 'majuli-assam',
    name: 'Majuli River Island & Satras',
    state: 'Assam',
    region: 'Northeast',
    sustainabilityScore: 96,
    crowdLevel: 'Low',
    environmentalSensitivity: 'Riverine Ecosystem',
    localEconomicImpact: 'High direct artisan benefit',
    bestVisitingPeriod: 'November to March',
    responsibleTravelTips: [
      'Strictly avoid plastic items that can wash into the fragile Brahmaputra freshwater dolphin habitat.',
      'Stay in indigenous bamboo chang-ghars (stilt cottages) built by the Mishing tribal community.',
      'Attend the morning Naam-Ghosha prayers at Sattras with reverence and humility.'
    ],
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Majuli_island_Assam.jpg',
    recommendedStayDays: 3,
    ecoStays: ['La Maison de Ananda Bamboo Eco Lodge', 'Yggdrasil Bamboo Cottage'],
    localCraftCoops: ['Samaguri Sattra Mask Making Atelier', 'Mishing Handloom Weavers Producer Group']
  },
  {
    id: 'bastar-chhattisgarh',
    name: 'Bastar Forest & Tribal Heritage Corridor',
    state: 'Chhattisgarh',
    region: 'Central',
    sustainabilityScore: 97,
    crowdLevel: 'Low',
    environmentalSensitivity: 'Critical Eco-Heritage',
    localEconomicImpact: 'High direct artisan benefit',
    bestVisitingPeriod: 'October to March',
    responsibleTravelTips: [
      'Respect indigenous tribal customs and seek consent before taking portraits in weekly Haat bazaars.',
      'Purchase authentic Dhokra brass, Tuma gourd craft, and wrought iron items bearing the Bastar GI tag.',
      'Taste Mahua flower tea and traditional red rice cooked in terracotta handis.'
    ],
    imageUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Chitrakote_Falls_Bastar.jpg',
    recommendedStayDays: 4,
    ecoStays: ['Bastar Jungle Eco Camp', 'Dandami Luxury Cottages Chitrakote'],
    localCraftCoops: ['Saathi Tribal Crafts Society Kondagaon', 'Bastar Iron & Bell Metal Federation']
  }
];
