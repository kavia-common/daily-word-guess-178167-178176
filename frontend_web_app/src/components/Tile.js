import React from 'react';

/**
 * Single board tile. Displays letter and visual status.
 * status: 'correct' | 'present' | 'absent' | undefined
 */
// PUBLIC_INTERFACE
export default function Tile({ letter = '', status, filled, reveal }) {
  const classes = ['tile'];
  if (filled) classes.push('filled');
  if (status) classes.push(status);
  if (reveal) classes.push('reveal');

  return (
    <div
      className={classes.join(' ')}
      role="img"
      aria-label={letter ? `Letter ${letter}` : 'Empty'}
    >
      {letter}
    </div>
  );
}
