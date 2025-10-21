import React from 'react';

/**
 * Header component rendering the brand, title, subtitle, and actions.
 * Ocean Professional look with theme toggle and New Game button.
 */
// PUBLIC_INTERFACE
export default function Header({ title, subtitle, theme, onToggleTheme, onNewGame, showNewGame }) {
  return (
    <div className="header" role="banner">
      <div className="brand" aria-label="Daily Word Guess">
        <div className="brand-badge" aria-hidden="true">DW</div>
        <div>
          <h1 className="header-title">{title}</h1>
          <p className="header-subtitle">{subtitle}</p>
        </div>
      </div>
      <div className="header-actions">
        {showNewGame && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={onNewGame}
            aria-label="Start a new game"
          >
            New Game
          </button>
        )}
        <button
          type="button"
          className="btn"
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          title="Toggle theme"
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>
    </div>
  );
}
