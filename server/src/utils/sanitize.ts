import xss from 'xss';

/** XSS sanitization — strips scripts/event-handlers, keeps plain text safe. */
const options = {
  whiteList: {},
  stripIgnoreTagBody: ['script', 'style'],
};

export function sanitizeText(input: unknown, maxLen = 300): string {
  if (typeof input !== 'string') return '';
  // 1) strip scripts/tags 2) drop entity-encoded tags (&lt;img …&gt;) 3) trim/collapse/truncate
  const clean = xss(input, options)
    .replace(/<[^>]*>/g, '')
    .replace(/&lt;\/?[a-z][^&]*?&gt;/gi, '')
    .replace(/&(?:quot|amp|#x27|#x2F);/g, '')
    .trim();
  return clean.replace(/\s+/g, ' ').slice(0, maxLen);
}

export function sanitizePhone(input: unknown): string {
  if (typeof input !== 'string') return '';
  return input.replace(/\D/g, '').slice(0, 11);
}
