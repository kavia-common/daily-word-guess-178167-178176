const SCOPE = 'dwg';
const STATS_KEY = 'dwg_stats_v1';

/**
 * Load JSON state by key from localStorage.
 */
// PUBLIC_INTERFACE
export function loadState(key) {
  try {
    const raw = localStorage.getItem(`${SCOPE}:${key}`);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/**
 * Save JSON state to localStorage.
 */
// PUBLIC_INTERFACE
export function saveState(key, value) {
  try {
    localStorage.setItem(`${SCOPE}:${key}`, JSON.stringify(value));
  } catch {
    // ignore
  }
}

/**
 * Clear a stored key in localStorage.
 */
// PUBLIC_INTERFACE
export function clearState(key) {
  try {
    localStorage.removeItem(`${SCOPE}:${key}`);
  } catch {
    // ignore
  }
}

/**
 * Default stats shape for the session.
 */
function defaultStats() {
  return {
    gamesPlayed: 0,
    wins: 0,
    currentStreak: 0,
    maxStreak: 0,
    guessDistribution: [0, 0, 0, 0, 0, 0],
    // lastResult: 'win'|'loss' (optional, not persisted necessarily)
  };
}

// PUBLIC_INTERFACE
export function getStats() {
  try {
    const raw = localStorage.getItem(STATS_KEY);
    if (!raw) return defaultStats();
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed.guessDistribution) || parsed.guessDistribution.length !== 6) {
      parsed.guessDistribution = [0, 0, 0, 0, 0, 0];
    }
    return { ...defaultStats(), ...parsed };
  } catch {
    return defaultStats();
  }
}

// PUBLIC_INTERFACE
export function saveStats(stats) {
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch {
    // ignore
  }
}
