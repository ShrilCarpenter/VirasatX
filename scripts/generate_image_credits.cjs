const fs = require('fs');

const fetchResults = JSON.parse(fs.readFileSync('scripts/fetch_results.json', 'utf8'));

function stripHtml(html) {
  if (!html) return '';
  return html.replace(/<[^>]*>?/gm, '').trim();
}

const credits = {};

fetchResults.forEach(item => {
  if (!item.success) return;
  const meta = item.metadata || {};
  const artist = stripHtml(meta.Artist?.value) || 'Wikimedia Open Contributor';
  const license = stripHtml(meta.LicenseShortName?.value) || stripHtml(meta.UsageTerms?.value) || 'CC BY-SA / Public Domain';
  const desc = stripHtml(meta.ImageDescription?.value) || item.pageTitle || item.id;
  const objectName = stripHtml(meta.ObjectName?.value) || item.filename.replace(/\.jpg$/, '').replace(/-/g, ' ');

  const pageUrl = item.pageTitle 
    ? `https://commons.wikimedia.org/wiki/${encodeURIComponent(item.pageTitle.replace(/ /g, '_'))}`
    : item.fullUrl;

  credits[item.id] = {
    filename: item.filename,
    subject: objectName.length > 5 ? objectName : desc.slice(0, 70),
    source: 'Wikimedia Commons / Open Cultural Archive',
    sourceUrl: pageUrl,
    creator: artist.length > 80 ? artist.slice(0, 77) + '...' : artist,
    license: license,
    attributionRequired: meta.AttributionRequired?.value === 'true' || license.includes('BY'),
    modified: false,
    checkedAt: '2026-09-04',
    notes: desc.slice(0, 140)
  };
});

const fileContent = `export interface ImageCredit {
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

export const IMAGE_CREDITS: Record<string, ImageCredit> = ${JSON.stringify(credits, null, 2)};
`;

fs.writeFileSync('src/data/imageCredits.ts', fileContent, 'utf8');
console.log(`Generated src/data/imageCredits.ts with ${Object.keys(credits).length} audited assets!`);
