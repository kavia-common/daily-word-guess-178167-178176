import React, { useMemo } from 'react';

/**
 * StatsContent displays session statistics in a simple layout with a bar chart.
 * Expected stats shape:
 * {
 *   gamesPlayed: number,
 *   wins: number,
 *   currentStreak: number,
 *   maxStreak: number,
 *   guessDistribution: number[] // length 6, index 0->1 guess, ... index 5->6 guesses
 * }
 */
// PUBLIC_INTERFACE
export default function StatsContent({ stats }) {
  const {
    gamesPlayed = 0,
    wins = 0,
    currentStreak = 0,
    maxStreak = 0,
    guessDistribution = [0, 0, 0, 0, 0, 0],
  } = stats || {};

  const winRate = useMemo(() => {
    if (!gamesPlayed) return 0;
    return Math.round((wins / gamesPlayed) * 100);
  }, [gamesPlayed, wins]);

  const maxDist = Math.max(1, ...guessDistribution);

  return (
    <div className="stats-content">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{gamesPlayed}</div>
          <div className="stat-label">Played</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{winRate}%</div>
          <div className="stat-label">Win Rate</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{currentStreak}</div>
          <div className="stat-label">Current Streak</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{maxStreak}</div>
          <div className="stat-label">Max Streak</div>
        </div>
      </div>

      <h3 className="chart-title">Guess Distribution</h3>
      <div className="bar-chart" role="img" aria-label="Guess distribution from 1 to 6 guesses">
        {guessDistribution.map((count, idx) => {
          const widthPct = Math.max(8, Math.round((count / maxDist) * 100));
          return (
            <div className="bar-row" key={idx}>
              <div className="bar-label">{idx + 1}</div>
              <div className="bar-track" aria-hidden="true">
                <div
                  className="bar-fill"
                  style={{ width: `${widthPct}%` }}
                  title={`${count} win${count === 1 ? '' : 's'} in ${idx + 1} ${idx === 0 ? 'guess' : 'guesses'}`}
                >
                  {count}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
