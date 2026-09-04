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
  "nataraja": {
    "filename": "chola-nataraja-bronze.jpg",
    "subject": "Bronze sculpt NMND-7",
    "source": "Wikimedia Commons / Open Cultural Archive",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File%3ABronze_sculpt_NMND-7.JPG",
    "creator": "Daderot",
    "license": "Public domain",
    "attributionRequired": false,
    "modified": false,
    "checkedAt": "2026-09-04",
    "notes": "Nataraja, Late Chola, 12th century, South India. Bronze sculpture in National Museum, New Delhi, India."
  },
  "brihadisvara": {
    "filename": "brihadisvara-temple-thanjavur.jpg",
    "subject": "Brihadisvara Temple, Thanjavur, Tamil Nadu, India",
    "source": "Wikimedia Commons / Open Cultural Archive",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File%3ABrihadisvara_Temple%2C_Thanjavur%2C_Tamil_Nadu%2C_India.jpg",
    "creator": "Matthew T Rader",
    "license": "CC BY-SA 4.0",
    "attributionRequired": true,
    "modified": false,
    "checkedAt": "2026-09-04",
    "notes": "Brihadisvara Temple, Thanjavur, Tamil Nadu, India"
  },
  "ashoka-lion-capital": {
    "filename": "sarnath-lion-capital-ashoka.jpg",
    "subject": "Lion Capital of Ashoka 3",
    "source": "Wikimedia Commons / Open Cultural Archive",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File%3ALion_Capital_of_Ashoka_3.jpg",
    "creator": "Apurv013",
    "license": "CC0",
    "attributionRequired": false,
    "modified": false,
    "checkedAt": "2026-09-04",
    "notes": "State emblem of India"
  },
  "palm-leaf": {
    "filename": "palm-leaf-manuscript.jpg",
    "subject": "Palm leaf etching of Odisha",
    "source": "Wikimedia Commons / Open Cultural Archive",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File%3APalm_leaf_etching_of_Odisha.webm",
    "creator": "Subhashish Panigrahi",
    "license": "CC BY-SA 3.0",
    "attributionRequired": true,
    "modified": false,
    "checkedAt": "2026-09-04",
    "notes": "Palm leaf etching is a traditional form of art from Odisha. Palm leaves are dried, soaked in water, dried again and pressed to be made strai"
  },
  "ellora": {
    "filename": "kailasa-temple-ellora.jpg",
    "subject": "Gajalakshmi, Cave No. 16 (Kailasa Temple), Ellora Caves",
    "source": "Wikimedia Commons / Open Cultural Archive",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File%3AGajalakshmi%2C_Cave_No._16_(Kailasa_Temple)%2C_Ellora_Caves.jpg",
    "creator": "Ronakshah1990",
    "license": "CC BY-SA 4.0",
    "attributionRequired": true,
    "modified": false,
    "checkedAt": "2026-09-04",
    "notes": "This is a photo of ASI monument number"
  },
  "padmapani": {
    "filename": "ajanta-padmapani-fresco.jpg",
    "subject": "Bodhisattva Padmapani, Ajanta, cave 1, India",
    "source": "Wikimedia Commons / Open Cultural Archive",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File%3ABodhisattva_Padmapani%2C_Ajanta%2C_cave_1%2C_India.jpg",
    "creator": "Abdulsayed",
    "license": "CC BY-SA 3.0",
    "attributionRequired": true,
    "modified": false,
    "checkedAt": "2026-09-04",
    "notes": "The famous painting of the bodhisattva Padmapani in Ajanta caves is now a World Heritage site. This is one of the best paintings from the an"
  },
  "konark-wheel": {
    "filename": "konark-sun-temple-wheel.jpg",
    "subject": "Stone wheel engraved in the 13th century built Konark Sun Temple in Orissa, India",
    "source": "Wikimedia Commons / Open Cultural Archive",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File%3AStone_wheel_engraved_in_the_13th_century_built_Konark_Sun_Temple_in_Orissa%2C_India.jpg",
    "creator": "Subhrajyoti07",
    "license": "CC BY-SA 4.0",
    "attributionRequired": true,
    "modified": false,
    "checkedAt": "2026-09-04",
    "notes": "This is a wheel engraved in the 13th century built Konark Sun Temple in Orissa, India. The temple is designed as a chariot consisting of 24 "
  },
  "nalanda-seal": {
    "filename": "nalanda-seal-mahavihara.jpg",
    "subject": "Ruins of the Baladitya Temple, Nalanda, Bihar, 1872 photo",
    "source": "Wikimedia Commons / Open Cultural Archive",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File%3ARuins_of_the_Baladitya_Temple%2C_Nalanda%2C_Bihar%2C_1872_photo.jpg",
    "creator": "Beglar, Joseph David (1872)",
    "license": "Public domain",
    "attributionRequired": false,
    "modified": false,
    "checkedAt": "2026-09-04",
    "notes": "From the source,\nPhotograph of the rear view of the ruins of the Baladitya Temple at Nalanda, Bihar, taken by Joseph David Beglar in 1872. W"
  },
  "sanchi": {
    "filename": "sanchi-great-stupa.jpg",
    "subject": "Sanchi Great Stupa Torana",
    "source": "Wikimedia Commons / Open Cultural Archive",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File%3ASanchi_Great_Stupa_Torana.jpg",
    "creator": "Tom Maloney from London, United Kingdom",
    "license": "CC BY-SA 2.0",
    "attributionRequired": true,
    "modified": false,
    "checkedAt": "2026-09-04",
    "notes": "torana (gateway) of the Great Stupa at Sanchi (Madhya Pradesh, India)"
  },
  "hampi-vittala": {
    "filename": "hampi-stone-chariot.jpg",
    "subject": "Iconic Stone Chariot @ Vittala Temple, Hampi, Karnataka",
    "source": "Wikimedia Commons / Open Cultural Archive",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File%3AIconic_Stone_Chariot_%40_Vittala_Temple%2C_Hampi%2C_Karnataka.jpg",
    "creator": "Ram Nagesh Thota",
    "license": "CC BY-SA 4.0",
    "attributionRequired": true,
    "modified": false,
    "checkedAt": "2026-09-04",
    "notes": "File:Iconic Stone Chariot @ Vittala Temple, Hampi, Karnataka.jpg"
  },
  "taj-mahal": {
    "filename": "taj-mahal-agra.jpg",
    "subject": "Taj Mahal in March 2004",
    "source": "Wikimedia Commons / Open Cultural Archive",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File%3ATaj_Mahal_in_March_2004.jpg",
    "creator": "Dhirad, picture edited by J. A. Knudsen",
    "license": "CC BY-SA 3.0",
    "attributionRequired": true,
    "modified": false,
    "checkedAt": "2026-09-04",
    "notes": "Taj Mahal, Agra, India."
  },
  "meenakshi": {
    "filename": "meenakshi-temple-madurai.jpg",
    "subject": "Madurai Meenakshi Amman Temple Gopuram",
    "source": "Wikimedia Commons / Open Cultural Archive",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File%3AMadurai_Meenakshi_Amman_Temple_Gopuram.jpg",
    "creator": "user:deadrat",
    "license": "CC BY-SA 3.0",
    "attributionRequired": true,
    "modified": false,
    "checkedAt": "2026-09-04",
    "notes": "Madurai Meenakshi Amman Temple Gopuram , Madurai, Tamil Nadu , India"
  },
  "indus-valley": {
    "filename": "indus-priest-king.jpg",
    "subject": "Mohenjo-daro Priesterkönig",
    "source": "Wikimedia Commons / Open Cultural Archive",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File%3AMohenjo-daro_Priesterk%C3%B6nig.jpeg",
    "creator": "Mamoon Mengal",
    "license": "CC BY-SA 1.0",
    "attributionRequired": true,
    "modified": false,
    "checkedAt": "2026-09-04",
    "notes": "Indus Priest/King Statue.  The statue is 17.5 cm high and carved from steatite a.k.a. soapstone.  It was found in Mohenjo-daro in 1927.  It "
  },
  "didarganj-yakshi": {
    "filename": "didarganj-yakshi.jpg",
    "subject": "Didarganj-Yakshi-3bc-Patna",
    "source": "Wikimedia Commons / Open Cultural Archive",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File%3ADidarganj-Yakshi-3bc-Patna.jpg",
    "creator": "Anandajoti",
    "license": "CC BY 3.0",
    "attributionRequired": true,
    "modified": false,
    "checkedAt": "2026-09-04",
    "notes": "Photograph of the Didarganj Yakshini statue, from the 3rd century BC in the Patna Museum, Bihar, India."
  },
  "sultanganj-buddha": {
    "filename": "sultanganj-buddha-bronze.jpg",
    "subject": "Sultanganj Buddha",
    "source": "Wikimedia Commons / Open Cultural Archive",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File%3ASultanganj_Buddha.JPG",
    "creator": "Jononmac46",
    "license": "CC BY-SA 3.0",
    "attributionRequired": true,
    "modified": false,
    "checkedAt": "2026-09-04",
    "notes": "Sultanganj Buddha in the British Museum"
  },
  "varanasi-zari-guild": {
    "filename": "varanasi-zari-silk.jpg",
    "subject": "Jess; bits of wayside gospel",
    "source": "Wikimedia Commons / Open Cultural Archive",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File%3AJess%3B_bits_of_wayside_gospel_(IA_jessbitsofwaysid00joneiala).pdf",
    "creator": "Jones, Jenkin Lloyd, 1843-1918",
    "license": "Public domain",
    "attributionRequired": false,
    "modified": false,
    "checkedAt": "2026-09-04",
    "notes": "Subjects:"
  },
  "channapatna-toy-artisans": {
    "filename": "channapatna-toys.jpg",
    "subject": "Channapatna-toys",
    "source": "Wikimedia Commons / Open Cultural Archive",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File%3AChannapatna-toys.jpg",
    "creator": "HPNadig",
    "license": "CC BY-SA 3.0",
    "attributionRequired": true,
    "modified": false,
    "checkedAt": "2026-09-04",
    "notes": "Channapatna Toys or Chennapatna Toys."
  },
  "thanjavur-painting-guild": {
    "filename": "thanjavur-painting.jpg",
    "subject": "The Dravidian Nights Entertainments: Being a Translation of Madanakamarajankadai",
    "source": "Wikimedia Commons / Open Cultural Archive",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File%3AThe_Dravidian_Nights_Entertainments.djvu",
    "creator": "Natesa Sastri",
    "license": "Public domain",
    "attributionRequired": false,
    "modified": false,
    "checkedAt": "2026-09-04",
    "notes": "Book digitized by Google from the library of the University of Michigan and uploaded to the Internet Archive by user tpb."
  },
  "patan-patola-guild": {
    "filename": "patan-patola-ikat.jpg",
    "subject": "Gujarat patola",
    "source": "Wikimedia Commons / Open Cultural Archive",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File%3AGujarat_patola.jpg",
    "creator": "Unknown authorUnknown author",
    "license": "Public domain",
    "attributionRequired": false,
    "modified": false,
    "checkedAt": "2026-09-04",
    "notes": "Patola, early 19th century (detail): Western India, Gujarat, Patan\nTextile; Ceremonial/Ritual Furnishing, Resist-dyed silk warp and weft (do"
  },
  "bastar-dhokra-guild": {
    "filename": "bastar-dhokra-craft.jpg",
    "subject": "Metalcrafts",
    "source": "Wikimedia Commons / Open Cultural Archive",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File%3AMetalcrafts.jpg",
    "creator": "Vinodarch",
    "license": "CC BY-SA 4.0",
    "attributionRequired": true,
    "modified": false,
    "checkedAt": "2026-09-04",
    "notes": "Metal Crafts, Handicrafts, Dhokra arts"
  },
  "odisha-pattachitra": {
    "filename": "odisha-pattachitra.jpg",
    "subject": "Artist with Odisha Pattachitra DSCN1052 01",
    "source": "Wikimedia Commons / Open Cultural Archive",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File%3AArtist_with_Odisha_Pattachitra_DSCN1052_01.jpg",
    "creator": "Sumita Roy Dutta",
    "license": "CC BY-SA 4.0",
    "attributionRequired": true,
    "modified": false,
    "checkedAt": "2026-09-04",
    "notes": "The paintings of Odisha can be divided into three categories from the point of view of medium, i.e. paintings on cloth or 'Patta Chitra', pa"
  },
  "swamimalai-bronze": {
    "filename": "swamimalai-bronze-craft.jpg",
    "subject": "Swamimalai bronze icons of Tamilnadu",
    "source": "Wikimedia Commons / Open Cultural Archive",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File%3ASwamimalai_bronze_icons_of_Tamilnadu.jpeg",
    "creator": "Psubhashish",
    "license": "CC BY-SA 4.0",
    "attributionRequired": true,
    "modified": false,
    "checkedAt": "2026-09-04",
    "notes": "These bronze icons made in Tanjavur, Tamilnadu, India are popular and a unique art form. They were displayed at National Law University, New"
  },
  "aranmula-mirror": {
    "filename": "aranmula-kannadi-mirror.jpg",
    "subject": "Aranmula kannadi",
    "source": "Wikimedia Commons / Open Cultural Archive",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File%3AAranmula_kannadi.jpg",
    "creator": "Rajesh Nair from Bangalore, India",
    "license": "CC BY 2.0",
    "attributionRequired": true,
    "modified": false,
    "checkedAt": "2026-09-04",
    "notes": "Aranmula kannadi is special type of mirror produced at Aranmula, a village in the state of Kerala in India. These unique metal mirrors are t"
  },
  "rigveda-kashmir": {
    "filename": "rigveda-sharada-manuscript.jpg",
    "subject": "Rigveda palm leaf, Sanskrit language, Sharada script, Kashmir",
    "source": "Wikimedia Commons / Open Cultural Archive",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File%3ARigveda_palm_leaf%2C_Sanskrit_language%2C_Sharada_script%2C_Kashmir.jpg",
    "creator": "Ms Sarah Welch",
    "license": "CC0",
    "attributionRequired": false,
    "modified": false,
    "checkedAt": "2026-09-04",
    "notes": "This manuscript fragment is now preserved at the Bhandarkar Oriental Research Institute Pune Maharashtra.\nThe dark horizontal lines are deca"
  },
  "gilgit-lotus-sutra": {
    "filename": "gilgit-lotus-sutra.jpg",
    "subject": "Gilgitmanuscript",
    "source": "Wikimedia Commons / Open Cultural Archive",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File%3AGilgitmanuscript.jpg",
    "creator": "Wikimedia Open Contributor",
    "license": "Public domain",
    "attributionRequired": false,
    "modified": false,
    "checkedAt": "2026-09-04",
    "notes": "File:Gilgitmanuscript.jpg"
  },
  "bakhshali-manuscript": {
    "filename": "bakhshali-manuscript-zero.jpg",
    "subject": "Bakhshali numerals 1",
    "source": "Wikimedia Commons / Open Cultural Archive",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File%3ABakhshali_numerals_1.jpg",
    "creator": "Augustus Hoernle (1841-1918)",
    "license": "Public domain",
    "attributionRequired": false,
    "modified": false,
    "checkedAt": "2026-09-04",
    "notes": "The usual form of the numeral figures used in the w:Bakhshali manuscript"
  },
  "palm-leaf-chitra-pothi": {
    "filename": "palm-leaf-chitra-pothi-full.jpg",
    "subject": "Palm leaf etching of Odisha",
    "source": "Wikimedia Commons / Open Cultural Archive",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File%3APalm_leaf_etching_of_Odisha.webm",
    "creator": "Subhashish Panigrahi",
    "license": "CC BY-SA 3.0",
    "attributionRequired": true,
    "modified": false,
    "checkedAt": "2026-09-04",
    "notes": "Palm leaf etching is a traditional form of art from Odisha. Palm leaves are dried, soaked in water, dried again and pressed to be made strai"
  },
  "region-north": {
    "filename": "north-india.jpg",
    "subject": "Morning Ganga Aarti, Varanasi",
    "source": "Wikimedia Commons / Open Cultural Archive",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File%3AMorning_Ganga_Aarti%2C_Varanasi.jpg",
    "creator": "https://www.flickr.com/photos/london/",
    "license": "CC BY 2.0",
    "attributionRequired": true,
    "modified": false,
    "checkedAt": "2026-09-04",
    "notes": "Morning Ganga Aarti, Varanasi."
  },
  "region-south": {
    "filename": "south-india.jpg",
    "subject": "Brihadishwara Temple at Sunset - Thanjavur - India",
    "source": "Wikimedia Commons / Open Cultural Archive",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File%3ABrihadishwara_Temple_at_Sunset_-_Thanjavur_-_India.JPG",
    "creator": "Adam Jones Adam63",
    "license": "CC BY-SA 3.0",
    "attributionRequired": true,
    "modified": false,
    "checkedAt": "2026-09-04",
    "notes": "Brihadishwara Temple at Sunset, Thanjavur, India. July 2008."
  },
  "region-east": {
    "filename": "east-india.jpg",
    "subject": "Stone wheel engraved in the 13th century built Konark Sun Temple in Orissa, India",
    "source": "Wikimedia Commons / Open Cultural Archive",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File%3AStone_wheel_engraved_in_the_13th_century_built_Konark_Sun_Temple_in_Orissa%2C_India.jpg",
    "creator": "Subhrajyoti07",
    "license": "CC BY-SA 4.0",
    "attributionRequired": true,
    "modified": false,
    "checkedAt": "2026-09-04",
    "notes": "This is a wheel engraved in the 13th century built Konark Sun Temple in Orissa, India. The temple is designed as a chariot consisting of 24 "
  },
  "region-west": {
    "filename": "west-india.jpg",
    "subject": "Rani ki vav 10",
    "source": "Wikimedia Commons / Open Cultural Archive",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File%3ARani_ki_vav_10.jpg",
    "creator": "Bernard Gagnon",
    "license": "CC BY-SA 3.0",
    "attributionRequired": true,
    "modified": false,
    "checkedAt": "2026-09-04",
    "notes": "Sculptures in Rani ki vav, Patan, India"
  },
  "region-central": {
    "filename": "central-india.jpg",
    "subject": "Homosexuality in Khajuraho sculpture",
    "source": "Wikimedia Commons / Open Cultural Archive",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File%3AHomosexuality_in_Khajuraho_sculpture.jpg",
    "creator": "Dey.sandip",
    "license": "CC BY-SA 4.0",
    "attributionRequired": true,
    "modified": false,
    "checkedAt": "2026-09-04",
    "notes": "The western group of temples at Khajuraho is known for the architecture and erotic sculpting. These sculptures depict a lot of contemporary "
  },
  "region-northeast": {
    "filename": "northeast-india.jpg",
    "subject": "Kamakhya Temple, Guwahati",
    "source": "Wikimedia Commons / Open Cultural Archive",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File%3AKamakhya_Temple%2C_Guwahati.jpg",
    "creator": "Kunal Dalui",
    "license": "CC BY-SA 3.0",
    "attributionRequired": true,
    "modified": false,
    "checkedAt": "2026-09-04",
    "notes": "Kamakhya Temple Guwahati"
  },
  "hero-heritage": {
    "filename": "hero-heritage.jpg",
    "subject": "Panoramic view of Ajanta Caves",
    "source": "Wikimedia Commons / Open Cultural Archive",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File%3APanoramic_view_of_Ajanta_Caves.jpg",
    "creator": "Sujayadhar",
    "license": "CC BY-SA 4.0",
    "attributionRequired": true,
    "modified": false,
    "checkedAt": "2026-09-04",
    "notes": "The Ajanta caves in Aurangabad district of Maharashtra, India are about 30 rock-cut Buddhist cave monuments which date from the 2nd century "
  }
};
