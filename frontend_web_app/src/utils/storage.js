const SCOPE = 'dwg';

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
