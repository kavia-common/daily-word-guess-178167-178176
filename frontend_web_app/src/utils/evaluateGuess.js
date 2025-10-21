 /**
  * Evaluate a guess against the target using Wordle rules.
  * Handles duplicates correctly using a two-pass algorithm:
  * 1) Mark exact matches (correct) and remove from frequency.
  * 2) For remaining letters, mark present if frequency remains; else absent.
  *
  * Returns array of statuses: 'correct' | 'present' | 'absent'
  */
// PUBLIC_INTERFACE
export function evaluateGuess(guess, target) {
  const g = guess.toLowerCase();
  const t = target.toLowerCase();
  const result = Array(g.length).fill('absent');

  const freq = {};
  for (let i = 0; i < t.length; i++) {
    const ch = t[i];
    freq[ch] = (freq[ch] || 0) + 1;
  }

  // First pass: mark correct
  for (let i = 0; i < g.length; i++) {
    if (g[i] === t[i]) {
      result[i] = 'correct';
      freq[g[i]] -= 1;
    }
  }

  // Second pass: mark present
  for (let i = 0; i < g.length; i++) {
    if (result[i] === 'correct') continue;
    const ch = g[i];
    if (freq[ch] > 0) {
      result[i] = 'present';
      freq[ch] -= 1;
    } else {
      result[i] = 'absent';
    }
  }

  return result;
}
