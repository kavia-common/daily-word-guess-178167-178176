const WORD_LIST = [
  // 5-letter words, include duplicates variations for validation richness
  'ocean','brine','coral','algae','whale','shark','squid','crabs','beach','tides',
  'shell','boats','pearl','reefs','storm','gales','breeze','spray','stern','keels',
  'steam','steel','cabin','chart','cloud','delta','frost','glaze','grape','hound',
  'jelly','knife','lemon','mango','naval','oxide','piano','query','rival','sugar',
  'tango','umbra','vivid','waltz','xenon','yacht','zebra','about','other','which',
  'their','there','would','could','right','sound','light','world','water','after',
  'point','house','place','small','great','again','under','never','heart','young'
];

export const ALL_WORDS = new Set(WORD_LIST);

// PUBLIC_INTERFACE
export function getRandomTarget() {
  /** Returns random word from WORD_LIST for use as target. */
  return WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
}
