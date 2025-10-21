import React from 'react';

/**
 * Header component rendering the brand, title, subtitle, and actions.
 * Ocean Professional look with theme toggle, Help, Stats, and optional New Game button.
 */
// PUBLIC_INTERFACE
export default function Header({
  title,
  subtitle,
  theme,
  onToggleTheme,
  onNewGame,
  showNewGame,
  onOpenHelp,
  onOpenStats,
  helpBtnRef,
  statsBtnRef,
}) {
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
        <button
          type="button"
          ref={helpBtnRef}
          className="btn btn-primary"
          onClick={onOpenHelp}
          aria-label="Open help and rules"
          title="Help"
        >
          Help
        </button>
        <button
          type="button"
          ref={statsBtnRef}
          className="btn btn-primary"
          onClick={onOpenStats}
          aria-label="Open stats"
          title="Stats"
        >
          Stats
        </button>
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
