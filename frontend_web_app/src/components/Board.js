import React from 'react';
import Row from './Row';

/**
 * Board renders a 6-row by 5-column grid.
 * board: array of rows, each row is array of { letter, status, reveal }
 */
// PUBLIC_INTERFACE
export default function Board({ board, currentRow, currentCol, rowShake }) {
  return (
    <section className="board" aria-label="Game board">
      {board.map((row, rIdx) => (
        <Row
          key={rIdx}
          row={row}
          isCurrent={rIdx === currentRow}
          currentCol={currentCol}
          shake={rowShake && rIdx === currentRow}
        />
      ))}
    </section>
  );
}
