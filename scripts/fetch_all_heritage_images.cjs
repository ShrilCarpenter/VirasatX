const fs = require('fs');
const path = require('path');

const ITEMS_TO_FETCH = [
  // Artifacts & Monuments
  {
    id: 'nataraja',
    category: 'artifacts',
    filename: 'chola-nataraja-bronze.jpg',
    query: 'Chola Nataraja bronze National Museum',
    fallbackQuery: 'Shiva as the Lord of Dance LACMA'
  },
  {
    id: 'brihadisvara',
    category: 'monuments',
    filename: 'brihadisvara-temple-thanjavur.jpg',
    query: 'Brihadisvara Temple Thanjavur',
    fallbackQuery: 'Brihadeeswarar Temple'
  },
  {
    id: 'ashoka-lion-capital',
    category: 'artifacts',
    filename: 'sarnath-lion-capital-ashoka.jpg',
    query: 'Sarnath Lion Capital of Ashoka',
    fallbackQuery: 'Lion Capital of Ashoka'
  },
  {
    id: 'palm-leaf',
    category: 'manuscripts',
    filename: 'palm-leaf-manuscript.jpg',
    query: 'Odia Palm leaf manuscript Gita Govinda',
    fallbackQuery: 'Palm-leaf manuscript India'
  },
  {
    id: 'ellora',
    category: 'monuments',
    filename: 'kailasa-temple-ellora.jpg',
    query: 'Kailasa temple Ellora Caves Cave 16',
    fallbackQuery: 'Kailasa temple Ellora'
  },
  {
    id: 'padmapani',
    category: 'artifacts',
    filename: 'ajanta-padmapani-fresco.jpg',
    query: 'Padmapani Ajanta Cave 1',
    fallbackQuery: 'Ajanta Cave 1 Padmapani'
  },
  {
    id: 'konark-wheel',
    category: 'monuments',
    filename: 'konark-sun-temple-wheel.jpg',
    query: 'Konark Sun Temple wheel',
    fallbackQuery: 'Sun Temple Konark chariot wheel'
  },
  {
    id: 'nalanda-seal',
    category: 'artifacts',
    filename: 'nalanda-seal-mahavihara.jpg',
    query: 'Nalanda archaeological site ruins',
    fallbackQuery: 'Nalanda Mahavihara ruins'
  },
  {
    id: 'sanchi',
    category: 'monuments',
    filename: 'sanchi-great-stupa.jpg',
    query: 'Sanchi Great Stupa Torana',
    fallbackQuery: 'Great Stupa at Sanchi'
  },
  {
    id: 'hampi-vittala',
    category: 'monuments',
    filename: 'hampi-stone-chariot.jpg',
    query: 'Hampi Stone Chariot Vittala temple',
    fallbackQuery: 'Stone Chariot Hampi'
  },
  {
    id: 'taj-mahal',
    category: 'monuments',
    filename: 'taj-mahal-agra.jpg',
    query: 'Taj Mahal front view Agra',
    fallbackQuery: 'Taj Mahal Agra India'
  },
  {
    id: 'meenakshi',
    category: 'monuments',
    filename: 'meenakshi-temple-madurai.jpg',
    query: 'Meenakshi Amman Temple gopuram Madurai',
    fallbackQuery: 'Meenakshi Temple Madurai'
  },
  {
    id: 'indus-valley',
    category: 'artifacts',
    filename: 'indus-priest-king.jpg',
    query: 'Priest King Mohenjo-daro National Museum Karachi',
    fallbackQuery: 'Priest King Mohenjo-daro'
  },
  {
    id: 'didarganj-yakshi',
    category: 'artifacts',
    filename: 'didarganj-yakshi.jpg',
    query: 'Didarganj Yakshi Patna Museum',
    fallbackQuery: 'Didarganj Chauri Bearer'
  },
  {
    id: 'sultanganj-buddha',
    category: 'artifacts',
    filename: 'sultanganj-buddha-bronze.jpg',
    query: 'Sultanganj Buddha Birmingham Museum',
    fallbackQuery: 'Sultanganj Buddha'
  },
  // Living Traditions
  {
    id: 'varanasi-zari-guild',
    category: 'traditions',
    filename: 'varanasi-zari-silk.jpg',
    query: 'Banarasi sari weaving loom',
    fallbackQuery: 'Banarasi saree weaving'
  },
  {
    id: 'channapatna-toy-artisans',
    category: 'traditions',
    filename: 'channapatna-toys.jpg',
    query: 'Channapatna toys wooden lacquer',
    fallbackQuery: 'Channapatna toys'
  },
  {
    id: 'thanjavur-painting-guild',
    category: 'traditions',
    filename: 'thanjavur-painting.jpg',
    query: 'Thanjavur painting gold leaf',
    fallbackQuery: 'Tanjore painting'
  },
  {
    id: 'patan-patola-guild',
    category: 'traditions',
    filename: 'patan-patola-ikat.jpg',
    query: 'Patola textile weaving Patan Gujarat',
    fallbackQuery: 'Patan Patola saree'
  },
  {
    id: 'bastar-dhokra-guild',
    category: 'traditions',
    filename: 'bastar-dhokra-craft.jpg',
    query: 'Dhokra brass craft Bastar',
    fallbackQuery: 'Dhokra metal craft'
  },
  {
    id: 'odisha-pattachitra',
    category: 'traditions',
    filename: 'odisha-pattachitra.jpg',
    query: 'Pattachitra painting Odisha',
    fallbackQuery: 'Pattachitra Raghurajpur'
  },
  {
    id: 'swamimalai-bronze',
    category: 'traditions',
    filename: 'swamimalai-bronze-craft.jpg',
    query: 'Bronze idol casting Swamimalai lost wax',
    fallbackQuery: 'Swamimalai bronze'
  },
  {
    id: 'aranmula-mirror',
    category: 'traditions',
    filename: 'aranmula-kannadi-mirror.jpg',
    query: 'Aranmula kannadi metal mirror Kerala',
    fallbackQuery: 'Aranmula mirror'
  },
  // Manuscripts
  {
    id: 'rigveda-kashmir',
    category: 'manuscripts',
    filename: 'rigveda-sharada-manuscript.jpg',
    query: 'Rigveda manuscript Sharada script',
    fallbackQuery: 'Rigveda manuscript BORI'
  },
  {
    id: 'gilgit-lotus-sutra',
    category: 'manuscripts',
    filename: 'gilgit-lotus-sutra.jpg',
    query: 'Gilgit manuscript Lotus Sutra Buddhist',
    fallbackQuery: 'Gilgit manuscripts'
  },
  {
    id: 'bakhshali-manuscript',
    category: 'manuscripts',
    filename: 'bakhshali-manuscript-zero.jpg',
    query: 'Bakhshali manuscript zero Bodleian',
    fallbackQuery: 'Bakhshali manuscript'
  },
  {
    id: 'palm-leaf-chitra-pothi',
    category: 'manuscripts',
    filename: 'palm-leaf-chitra-pothi-full.jpg',
    query: 'Gita Govinda palm leaf manuscript Odisha',
    fallbackQuery: 'Palm leaf manuscript illustrated'
  },
  // Regions
  {
    id: 'region-north',
    category: 'regions',
    filename: 'north-india.jpg',
    query: 'Varanasi Ghats morning Ganga Aarti',
    fallbackQuery: 'Varanasi Ghats'
  },
  {
    id: 'region-south',
    category: 'regions',
    filename: 'south-india.jpg',
    query: 'Brihadisvara Temple Thanjavur sunset',
    fallbackQuery: 'Meenakshi temple Madurai gopuram'
  },
  {
    id: 'region-east',
    category: 'regions',
    filename: 'east-india.jpg',
    query: 'Konark Sun Temple wheel Odisha',
    fallbackQuery: 'Konark Sun Temple'
  },
  {
    id: 'region-west',
    category: 'regions',
    filename: 'west-india.jpg',
    query: 'Rani ki Vav stepwell Patan Gujarat',
    fallbackQuery: 'Rani ki Vav Patan'
  },
  {
    id: 'region-central',
    category: 'regions',
    filename: 'central-india.jpg',
    query: 'Khajuraho temple Kandariya Mahadeva',
    fallbackQuery: 'Khajuraho temples Madhya Pradesh'
  },
  {
    id: 'region-northeast',
    category: 'regions',
    filename: 'northeast-india.jpg',
    query: 'Kamakhya Temple Guwahati Assam',
    fallbackQuery: 'Kaziranga or Rang Ghar Assam'
  },
  // Hero
  {
    id: 'hero-heritage',
    category: 'hero',
    filename: 'hero-heritage.jpg',
    query: 'Ajanta Caves panoramic view Maharashtra',
    fallbackQuery: 'Ajanta Caves exterior'
  }
];

const USER_AGENT = 'VirasatX-HeritageArchive/1.0 (https://virasatxai.vercel.app; info@virasatx.org)';

async function searchWikimedia(searchQuery) {
  const apiUrl = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(searchQuery)}&gsrnamespace=6&gsrlimit=5&prop=imageinfo&iiprop=url|size|extmetadata&iiurlwidth=1200&format=json`;
  try {
    const res = await fetch(apiUrl, { headers: { 'User-Agent': USER_AGENT } });
    if (!res.ok) return null;
    const data = await res.json();
    const pages = data.query?.pages || {};
    for (const pid in pages) {
      const p = pages[pid];
      const info = p.imageinfo?.[0];
      if (info && (info.thumburl || info.url)) {
        // filter out svg, ogg, pdf, tiff
        const targetUrl = info.thumburl || info.url;
        if (!targetUrl.match(/\.(ogg|ogv|pdf|tif|tiff)$/i)) {
          return {
            pageTitle: p.title,
            downloadUrl: targetUrl,
            fullUrl: info.url,
            metadata: info.extmetadata || {}
          };
        }
      }
    }
  } catch (err) {
    console.error(`Error searching "${searchQuery}":`, err.message);
  }
  return null;
}

async function downloadFile(url, destPath) {
  const dir = path.dirname(destPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  try {
    const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
    if (!res.ok) {
      console.error(`Failed to download ${url}: status ${res.status}`);
      return false;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 5000) {
      console.error(`Downloaded file too small (${buf.length} bytes): ${url}`);
      return false;
    }
    fs.writeFileSync(destPath, buf);
    console.log(`✓ Saved ${destPath} (${Math.round(buf.length / 1024)} KB)`);
    return true;
  } catch (err) {
    console.error(`Failed saving ${destPath}:`, err.message);
    return false;
  }
}

async function run() {
  console.log(`Starting fetch of ${ITEMS_TO_FETCH.length} authentic heritage assets...`);
  const results = [];

  for (let i = 0; i < ITEMS_TO_FETCH.length; i++) {
    const item = ITEMS_TO_FETCH[i];
    const targetPath = path.join('public/images', item.category, item.filename);

    console.log(`[${i+1}/${ITEMS_TO_FETCH.length}] Searching: ${item.id} ("${item.query}")...`);
    let match = await searchWikimedia(item.query);
    if (!match && item.fallbackQuery) {
      console.log(`  Trying fallback query: "${item.fallbackQuery}"...`);
      match = await searchWikimedia(item.fallbackQuery);
    }

    if (match) {
      console.log(`  Found: ${match.pageTitle}`);
      const ok = await downloadFile(match.downloadUrl, targetPath);
      results.push({
        id: item.id,
        category: item.category,
        filename: item.filename,
        localPath: `/images/${item.category}/${item.filename}`,
        success: ok,
        pageTitle: match.pageTitle,
        fullUrl: match.fullUrl,
        metadata: match.metadata
      });
    } else {
      console.warn(`  ✗ No Wikimedia match found for ${item.id}`);
      results.push({
        id: item.id,
        category: item.category,
        filename: item.filename,
        localPath: `/images/${item.category}/${item.filename}`,
        success: false
      });
    }
    // Respect rate limits with brief delay
    await new Promise(r => setTimeout(r, 600));
  }

  // Save report to scratch
  fs.writeFileSync('scripts/fetch_results.json', JSON.stringify(results, null, 2));
  console.log(`\nFetch process complete! Results written to scripts/fetch_results.json`);
}

run();
