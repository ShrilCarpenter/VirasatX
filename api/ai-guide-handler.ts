import { GoogleGenAI } from '@google/genai';
import { HERITAGE_ITEMS, RESEARCH_PRESETS, LIVING_TRADITIONS } from '../src/data/heritageData.js';
import { AICurationResponse, ConfidenceLevel } from '../src/types.js';

export async function handleAIGuide(data: {
  query?: string;
  language?: string;
  context?: string;
  artifactId?: string;
}): Promise<AICurationResponse> {
  const query = (data.query || '').trim();
  const language = data.language || 'English';

  if (!query) {
    return {
      answer: 'Please provide a question regarding Indian heritage, art, temple architecture, or living traditions.',
      citations: [],
      confidence: 'Needs verification',
      relatedRecords: [],
      fallback: true,
      disclaimer: 'Curated knowledge base requires an inquiry.'
    };
  }

  // 1. Lightweight RAG: Retrieve candidate records based on lexical relevance
  const queryLower = query.toLowerCase();
  const matchedPresets = RESEARCH_PRESETS.filter(p => 
    p.question.toLowerCase().includes(queryLower) ||
    queryLower.includes(p.question.toLowerCase()) ||
    queryLower.includes(p.canonicalTerm.toLowerCase())
  );

  const matchedItems = HERITAGE_ITEMS.filter(item => {
    return (
      item.title.toLowerCase().includes(queryLower) ||
      item.category.toLowerCase().includes(queryLower) ||
      item.material?.toLowerCase().includes(queryLower) ||
      item.dynasty?.toLowerCase().includes(queryLower) ||
      item.location.toLowerCase().includes(queryLower) ||
      item.significance?.some(s => s.toLowerCase().includes(queryLower)) ||
      item.description.toLowerCase().includes(queryLower)
    );
  });

  const matchedTraditions = LIVING_TRADITIONS.filter(t =>
    t.title.toLowerCase().includes(queryLower) ||
    t.community.toLowerCase().includes(queryLower) ||
    t.location.toLowerCase().includes(queryLower)
  );

  // Compile context documents
  const contextDocs = [
    ...matchedItems.slice(0, 3).map(item => 
      `Record ID: [${item.accessionNo}] Title: ${item.title}. Period: ${item.period}. Dynasty: ${item.dynasty || 'N/A'}. Material: ${item.material || 'N/A'}. Description: ${item.description}. Cultural Significance: ${item.culturalSignificance || item.significance?.join(' ') || ''}`
    ),
    ...matchedTraditions.slice(0, 2).map(t =>
      `Living Tradition: [${t.giTagStatus || t.id}] Title: ${t.title}. Community: ${t.community}. Location: ${t.location}. Practices: ${t.keyPractices.join(' ')}`
    )
  ];

  const apiKey = process.env.GEMINI_API_KEY;

  // 2. If API Key is present, call Gemini securely on the server
  if (apiKey && apiKey !== 'your_google_gemini_api_key' && apiKey.length > 10) {
    try {
      const ai = new GoogleGenAI({ apiKey });

      const prompt = `You are the VirasatX Curatorial Research Assistant for Smart India Hackathon 2026 (SIH26197).
Your purpose is to provide authentic, scholarly, and culturally respectful answers regarding Indian heritage.

RULES:
1. Ground your answer strictly on the verified cultural records provided below.
2. Cite specific record IDs in brackets like [ASI-104] or [UNESCO #250].
3. If the context does not contain sufficient facts to answer the question, state: "The current curated scholarly records do not contain sufficient evidence to definitively verify this. Please consult institutional primary archives." Do NOT hallucinate.
4. Language requested: ${language}.
5. End with a confidence assessment: [CONFIDENCE: High confidence] or [CONFIDENCE: Moderate confidence] or [CONFIDENCE: Needs verification].

CURATED CULTURAL RECORDS:
${contextDocs.length > 0 ? contextDocs.join('\n\n') : 'No direct keyword match in local cache. Rely on conservative canonical historical facts without inventing partnerships.'}

USER QUESTION:
"${query}"`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
      });

      const responseText = response.text || '';

      // Extract confidence
      let confidence: ConfidenceLevel = 'High confidence';
      if (responseText.includes('Moderate confidence')) {
        confidence = 'Moderate confidence';
      } else if (responseText.includes('Needs verification') || contextDocs.length === 0) {
        confidence = 'Needs verification';
      }

      const cleanAnswer = responseText
        .replace(/\[CONFIDENCE:.*?\]/gi, '')
        .trim();

      // Collect citations
      const citations = matchedItems.slice(0, 3).map(item => ({
        recordId: item.accessionNo,
        title: item.title,
        source: item.repository,
        verificationStatus: item.verificationStatus
      }));

      const relatedRecords = matchedItems.slice(0, 4).map(item => ({
        id: item.id,
        title: item.title,
        category: item.category,
        imageUrl: item.imageUrl
      }));

      return {
        answer: cleanAnswer,
        citations,
        confidence,
        relatedRecords,
        fallback: false
      };
    } catch (err) {
      console.warn('Live Gemini API call error, activating curated fallback:', err);
    }
  }

  // 3. Robust Offline / Demo Fallback (Clearly Labeled)
  if (matchedPresets.length > 0) {
    const preset = matchedPresets[0];
    return {
      answer: preset.responseParagraphs.join('\n\n'),
      citations: preset.citations.map(c => ({
        recordId: c.recordId || 'ASI-CURATED',
        title: c.title,
        source: c.source,
        verificationStatus: 'Scholar-verified'
      })),
      confidence: preset.confidence,
      relatedRecords: (preset.relatedRecords || []).map(id => {
        const item = HERITAGE_ITEMS.find(i => i.id === id);
        return {
          id,
          title: item?.title || id,
          category: item?.category || 'Heritage',
          imageUrl: item?.imageUrl || ''
        };
      }),
      fallback: true,
      disclaimer: 'Demo response from curated heritage knowledge (offline mode)'
    };
  }

  if (matchedItems.length > 0) {
    const primary = matchedItems[0];
    return {
      answer: `${primary.title} (${primary.period}, ${primary.location}): ${primary.description}\n\nHistorical Context: ${primary.historicalContext || ''}\n\nCultural Significance: ${primary.culturalSignificance || primary.significance?.join(' ') || ''}`,
      citations: [{
        recordId: primary.accessionNo,
        title: primary.title,
        source: primary.repository,
        verificationStatus: primary.verificationStatus
      }],
      confidence: 'High confidence',
      relatedRecords: matchedItems.slice(0, 3).map(i => ({
        id: i.id,
        title: i.title,
        category: i.category,
        imageUrl: i.imageUrl
      })),
      fallback: true,
      disclaimer: 'Demo response from curated heritage knowledge (offline mode)'
    };
  }

  // Fallback for general questions
  return {
    answer: `The inquiry regarding "${query}" touches on India's rich cultural patrimony. In our curated archive, related civilizational epochs and regional traditions document interconnected motifs, metallurgical advances, and stone epigraphy. You may explore our full catalogue or ask about specific specimens such as the Chola Nataraja, Brihadisvara Vimana, or Nalanda Mahavihara.`,
    citations: [
      { recordId: 'ASI-104', title: 'National Museum Collection Catalogue', source: 'Archaeological Survey of India', verificationStatus: 'Curator-reviewed' }
    ],
    confidence: 'Moderate confidence',
    relatedRecords: HERITAGE_ITEMS.slice(0, 3).map(i => ({
      id: i.id,
      title: i.title,
      category: i.category,
      imageUrl: i.imageUrl
    })),
    fallback: true,
    disclaimer: 'Demo response from curated heritage knowledge (offline mode)'
  };
}
