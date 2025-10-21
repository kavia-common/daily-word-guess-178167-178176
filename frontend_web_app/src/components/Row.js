import React from 'react';
import Tile from './Tile';

/**
 * Row renders five tiles. If isCurrent, tiles up to currentCol are "filled".
 */
// PUBLIC_INTERFACE
export default function Row({ row, isCurrent, currentCol, shake }) {
  return (
    <div className={`row${shake ? ' shake' : ''}`} role="group" aria-label="Guess row">
      {row.map((cell, cIdx) => {
        const filled = isCurrent ? cIdx < currentCol && !cell.status : Boolean(cell.letter);
        return (
          <Tile
            key={cIdx}
            letter={cell.letter}
            status={cell.status}
            filled={filled}
            reveal={cell.reveal}
          />
        );
      })}
    </div>
  );
}
