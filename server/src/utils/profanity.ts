/**
 * Explicit Name Content Filter (PT-BR + EN).
 * Blocks profanity / joke / fake names → HTTP 400.
 * Normalized (lowercase, no accents) substring match + repeated-char guard.
 */
const BLOCKED = [
  // PT profanity / slurs stems
  'otari', 'idiot', 'imbecil', 'retardad', 'burro', 'trouxa', 'palhac',
  'porra', 'caralh', 'merda', 'puta', 'puto', 'vagabund', 'safad',
  'corno', 'chifr', 'piranha', 'vadia', 'babaca', 'escrot', 'fdp',
  'cuzao', 'cuzão', 'bosta', 'droga',
  // EN
  'fuck', 'shit', 'bitch', 'asshole', 'dick', 'pussy', 'slut', 'whore',
  // joke / fake
  'teste fake', 'nome falso', 'fulano', 'ciclano', 'beltrano',
  'asdasd', 'qwerty', 'xxxx', 'teste teste',
];

const REPEATED = /(.)\1{4,}/;

export function normalizeName(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

export function isBlockedName(name: string): boolean {
  const n = normalizeName(name);
  if (n.length < 2) return true;
  if (REPEATED.test(n.replace(/ /g, ''))) return true;
  return BLOCKED.some((w) => n.includes(w));
}
