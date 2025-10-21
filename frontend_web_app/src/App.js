import React, { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';
import './index.css';
import Header from './components/Header';
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import { useGameEngine } from './hooks/useGameEngine';
import { getRandomTarget, ALL_WORDS } from './utils/words';
import { loadState, saveState, clearState } from './utils/storage';

// PUBLIC_INTERFACE
function App() {
  /**
   * Wordle-like game app with on-screen and physical keyboard support.
   * - Renders header, game board (6x5), and keyboard
   * - Uses Ocean Professional theme via CSS variables
   * - Handles win/lose states, new game, and persistence per session
   */
  const [theme, setTheme] = useState('light');
  const [ariaMessage, setAriaMessage] = useState('');
  const liveRef = useRef(null);

  // Persist a single target word per session until New Game
  const initialState = useMemo(() => loadState('gameState') || {}, []);
  const [target, setTarget] = useState(() => initialState.target || getRandomTarget());

  const {
    board,
    currentRow,
    currentCol,
    gameStatus, // 'playing' | 'won' | 'lost'
    keyStatuses, // map { letter: 'correct'|'present'|'absent' }
    message,
    rowShake, // boolean for invalid/no-op, triggers shake animation
    handleInput, // letter input
    handleBackspace,
    handleEnter,
    resetGame,
  } = useGameEngine({ target, dictionary: ALL_WORDS, rows: 6, cols: 5 });

  // Persist minimal game state for session resume
  useEffect(() => {
    saveState('gameState', {
      target,
      board,
      currentRow,
      currentCol,
      gameStatus,
    });
  }, [board, currentRow, currentCol, gameStatus, target]);

  // Effect to apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Keyboard listeners
  useEffect(() => {
    const onKeyDown = (e) => {
      if (gameStatus !== 'playing' && e.key !== 'Enter') return;

      if (e.key === 'Enter') {
        handleEnter();
      } else if (e.key === 'Backspace') {
        handleBackspace();
      } else {
        const letter = e.key.toUpperCase();
        if (/^[A-Z]$/.test(letter)) {
          handleInput(letter);
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [gameStatus, handleEnter, handleBackspace, handleInput]);

  // Announce important messages (win/lose/invalid)
  useEffect(() => {
    if (message) {
      setAriaMessage(message);
      if (liveRef.current) {
        // force reflow announcement by resetting
        liveRef.current.textContent = '';
        setTimeout(() => {
          if (liveRef.current) liveRef.current.textContent = message;
        }, 50);
      }
    }
  }, [message]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // PUBLIC_INTERFACE
  const startNewGame = () => {
    const next = getRandomTarget();
    setTarget(next);
    clearState('gameState');
    resetGame(next);
    setAriaMessage('New game started.');
  };

  const headerSubtitle =
    gameStatus === 'won'
      ? 'You Win! 🎉'
      : gameStatus === 'lost'
        ? `Out of tries. The word was ${target.toUpperCase()}.`
        : 'Guess the 5-letter word';

  return (
    <div className="App ocean-bg">
      <header className="ocean-container">
        <Header
          title="Daily Word Guess"
          subtitle={headerSubtitle}
          theme={theme}
          onToggleTheme={toggleTheme}
          onNewGame={startNewGame}
          showNewGame={gameStatus !== 'playing'}
        />
      </header>

      <main className="ocean-main" aria-label="Word guessing game">
        <Board
          board={board}
          currentRow={currentRow}
          currentCol={currentCol}
          rowShake={rowShake}
        />
        <Keyboard
          onKey={handleInput}
          onEnter={handleEnter}
          onBackspace={handleBackspace}
          keyStatuses={keyStatuses}
          disabled={gameStatus !== 'playing'}
        />
        <div
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
          ref={liveRef}
        >
          {ariaMessage}
        </div>
      </main>

      <footer className="ocean-footer">
        <span className="footer-note">
          Ocean Professional Theme • No external dependencies
        </span>
      </footer>
    </div>
  );
}

export default App;
