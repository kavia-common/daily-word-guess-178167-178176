import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { evaluateGuess } from '../utils/evaluateGuess';

/**
 * useGameEngine
 * Handles board state, inputs, evaluation, key statuses, messages, and reset.
 */
// PUBLIC_INTERFACE
export function useGameEngine({ target, dictionary, rows = 6, cols = 5 }) {
  const emptyRow = () => Array.from({ length: cols }, () => ({ letter: '', status: null, reveal: false }));
  const initialBoard = useMemo(() => Array.from({ length: rows }, emptyRow), [rows, cols]);

  const [board, setBoard] = useState(initialBoard);
  const [currentRow, setCurrentRow] = useState(0);
  const [currentCol, setCurrentCol] = useState(0);
  const [gameStatus, setGameStatus] = useState('playing');
  const [message, setMessage] = useState('');
  const [rowShake, setRowShake] = useState(false);
  const [keyStatuses, setKeyStatuses] = useState({}); // letter -> status
  const evaluatingRef = useRef(false);

  useEffect(() => {
    // Reset derived states if target changes via reset
    if (!target) return;
  }, [target]);

  const setTempMessage = useCallback((msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 1300);
  }, []);

  const handleInput = useCallback((letter) => {
    if (gameStatus !== 'playing' || evaluatingRef.current) return;
    if (currentCol >= cols) return;

    setBoard((prev) => {
      const next = prev.map((r) => r.map((c) => ({ ...c })));
      next[currentRow][currentCol].letter = letter;
      return next;
    });
    setCurrentCol((c) => c + 1);
  }, [currentCol, currentRow, cols, gameStatus]);

  const handleBackspace = useCallback(() => {
    if (gameStatus !== 'playing' || evaluatingRef.current) return;
    if (currentCol === 0) return;

    setBoard((prev) => {
      const next = prev.map((r) => r.map((c) => ({ ...c })));
      next[currentRow][currentCol - 1].letter = '';
      return next;
    });
    setCurrentCol((c) => Math.max(0, c - 1));
  }, [currentCol, currentRow, gameStatus]);

  const updateKeyStatuses = useCallback((guess, evalResult) => {
    setKeyStatuses((prev) => {
      const next = { ...prev };
      guess.forEach((letter, idx) => {
        const status = evalResult[idx];
        const prevStatus = next[letter];
        // Priority: correct > present > absent
        if (status === 'correct' ||
          (status === 'present' && prevStatus !== 'correct') ||
          (status === 'absent' && !prevStatus)) {
          next[letter] = status;
        }
      });
      return next;
    });
  }, []);

  const revealRow = useCallback((rowIndex, statuses) => {
    setBoard((prev) => {
      const next = prev.map((r) => r.map((c) => ({ ...c })));
      for (let i = 0; i < cols; i++) {
        next[rowIndex][i].status = statuses[i];
      }
      return next;
    });

    // Staggered reveal effect
    for (let i = 0; i < cols; i++) {
      setTimeout(() => {
        setBoard((prev) => {
          const next = prev.map((r) => r.map((c) => ({ ...c })));
          next[rowIndex][i].reveal = true;
          return next;
        });
      }, 80 * i);
    }
  }, [cols]);

  const handleEnter = useCallback(() => {
    if (gameStatus !== 'playing' || evaluatingRef.current) return;

    if (currentCol < cols) {
      setRowShake(true);
      setTempMessage('Not enough letters');
      setTimeout(() => setRowShake(false), 400);
      return;
    }

    const guess = board[currentRow].map((c) => c.letter).join('').toLowerCase();
    if (!dictionary.has(guess)) {
      setRowShake(true);
      setTempMessage('Not in word list');
      setTimeout(() => setRowShake(false), 400);
      return;
    }

    evaluatingRef.current = true;
    const statuses = evaluateGuess(guess, target.toLowerCase());

    revealRow(currentRow, statuses);
    updateKeyStatuses(guess.toUpperCase().split(''), statuses);

    const isWin = statuses.every((s) => s === 'correct');

    // Move to next row after reveal completes
    setTimeout(() => {
      if (isWin) {
        setGameStatus('won');
        setTempMessage('Great job! You guessed it.');
      } else if (currentRow + 1 >= rows) {
        setGameStatus('lost');
        setTempMessage(`The word was ${target.toUpperCase()}.`);
      } else {
        setCurrentRow((r) => r + 1);
        setCurrentCol(0);
      }
      evaluatingRef.current = false;
    }, 80 * cols + 80);
  }, [
    board, currentCol, currentRow, cols, dictionary, gameStatus,
    revealRow, setTempMessage, rows, target, updateKeyStatuses
  ]);

  // PUBLIC_INTERFACE
  const resetGame = useCallback((newTarget) => {
    setBoard(Array.from({ length: rows }, () => Array.from({ length: cols }, () => ({ letter: '', status: null, reveal: false }))));
    setCurrentRow(0);
    setCurrentCol(0);
    setGameStatus('playing');
    setMessage('');
    setRowShake(false);
    setKeyStatuses({});
  }, [rows, cols]);

  return {
    board,
    currentRow,
    currentCol,
    gameStatus,
    keyStatuses,
    message,
    rowShake,
    handleInput,
    handleBackspace,
    handleEnter,
    resetGame,
  };
}
