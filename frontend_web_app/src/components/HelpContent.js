import React from 'react';

/**
 * Help/How-to-Play content for the game.
 * Covers: rules, color meanings, controls, and starting a new game.
 */
// PUBLIC_INTERFACE
export default function HelpContent() {
  return (
    <div className="help-content">
      <section>
        <h3>How to Play</h3>
        <p>
          Guess the 5-letter word in 6 tries. Each guess must be a valid word.
          After submitting a guess, the color of the tiles will change to show how close your guess was to the word.
        </p>
      </section>

      <section>
        <h3>Tile Colors</h3>
        <ul className="legend">
          <li>
            <span className="legend-box correct" aria-hidden="true" /> Correct: Letter is in the word and in the right spot.
          </li>
          <li>
            <span className="legend-box present" aria-hidden="true" /> Present: Letter is in the word but in the wrong spot.
          </li>
          <li>
            <span className="legend-box absent" aria-hidden="true" /> Absent: Letter is not in the word in any spot.
          </li>
        </ul>
      </section>

      <section>
        <h3>Controls</h3>
        <ul>
          <li>Use your keyboard or click the on-screen keys to enter letters.</li>
          <li>Press Enter or click ENTER to submit your guess.</li>
          <li>Press Backspace or click ⌫ to delete a letter.</li>
        </ul>
      </section>

      <section>
        <h3>New Game</h3>
        <p>
          Start a new game anytime from the header. Your session stats will persist while this tab is open in your browser.
        </p>
      </section>
    </div>
  );
}
