/**
 * Input sanitization, validation, and rate limiting utilities.
 * Applied to all user-controlled inputs: AI Guide, Search, Filters, etc.
 */

// --- Text Sanitization ---

/** Strip HTML tags from a string */
export function stripHtml(input: string): string {
  return input.replace(/<[^>]*>/g, '');
}

/** Normalize whitespace: collapse multiple spaces/newlines */
export function normalizeWhitespace(input: string): string {
  return input.replace(/\s+/g, ' ').trim();
}

/** Sanitize user text input: strip HTML, normalize, limit length */
export function sanitizeTextInput(input: string, maxLength: number = 500): string {
  if (!input || typeof input !== 'string') return '';
  let clean = stripHtml(input);
  clean = normalizeWhitespace(clean);
  if (clean.length > maxLength) {
    clean = clean.slice(0, maxLength);
  }
  return clean;
}

// --- Prompt Injection Detection ---

const INJECTION_PATTERNS = [
  /ignore\s+(all\s+)?previous\s+(instructions|prompts|context)/i,
  /reveal\s+(your\s+)?(system\s+)?prompt/i,
  /show\s+(me\s+)?(your\s+)?(system|hidden|secret)/i,
  /give\s+me\s+(the\s+)?(hidden|secret|private|internal)/i,
  /forget\s+(all\s+)?previous/i,
  /disregard\s+(all\s+)?previous/i,
  /override\s+(your\s+)?(instructions|safety|rules)/i,
  /pretend\s+(you\s+are|to\s+be)/i,
  /act\s+as\s+(if|though)/i,
  /you\s+are\s+now\s+(a|an)/i,
  /bypass\s+(your\s+)?(filter|safety|restriction)/i,
  /what\s+(is|are)\s+(your\s+)?(api|secret)\s*key/i,
  /database\s+(credentials|password|connection)/i,
  /environment\s+variable/i,
  /\.env\s+file/i,
];

/** Detect potential prompt injection attempts */
export function detectPromptInjection(input: string): boolean {
  const lower = input.toLowerCase();
  return INJECTION_PATTERNS.some(pattern => pattern.test(lower));
}

// --- Rate Limiting ---

interface RateLimitState {
  timestamps: number[];
}

const rateLimitStates: Map<string, RateLimitState> = new Map();

/**
 * Check if a request is within rate limits.
 * @param key - Unique key for the rate-limited action (e.g., 'ai-query')
 * @param maxRequests - Maximum requests allowed in the window
 * @param windowMs - Time window in milliseconds
 * @returns true if allowed, false if rate-limited
 */
export function checkRateLimit(
  key: string,
  maxRequests: number = 10,
  windowMs: number = 60_000
): boolean {
  const now = Date.now();
  let state = rateLimitStates.get(key);

  if (!state) {
    state = { timestamps: [] };
    rateLimitStates.set(key, state);
  }

  // Remove timestamps outside the window
  state.timestamps = state.timestamps.filter(t => now - t < windowMs);

  if (state.timestamps.length >= maxRequests) {
    return false; // Rate limited
  }

  state.timestamps.push(now);
  return true; // Allowed
}

/** Get seconds until rate limit resets */
export function getRateLimitResetSeconds(key: string, windowMs: number = 60_000): number {
  const state = rateLimitStates.get(key);
  if (!state || state.timestamps.length === 0) return 0;

  const oldest = Math.min(...state.timestamps);
  const resetTime = oldest + windowMs;
  const secondsLeft = Math.max(0, Math.ceil((resetTime - Date.now()) / 1000));
  return secondsLeft;
}

// --- URL Validation ---

/** Validate that a URL is safe (no javascript:, data:, etc.) */
export function isSafeUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim().toLowerCase();
  if (trimmed.startsWith('javascript:')) return false;
  if (trimmed.startsWith('data:')) return false;
  if (trimmed.startsWith('vbscript:')) return false;
  try {
    const parsed = new URL(url);
    return ['http:', 'https:'].includes(parsed.protocol);
  } catch {
    // Relative URLs are acceptable
    return !trimmed.includes(':') || trimmed.startsWith('/');
  }
}
