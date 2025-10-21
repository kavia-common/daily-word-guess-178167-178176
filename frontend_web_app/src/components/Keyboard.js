import React from 'react';

/**
 * On-screen keyboard with letter, Enter, and Backspace keys.
 * keyStatuses: map of letter -> 'correct' | 'present' | 'absent'
 */
// PUBLIC_INTERFACE
export default function Keyboard({ onKey, onEnter, onBackspace, keyStatuses = {}, disabled }) {
  const rows = [
    'QWERTYUIOP'.split(''),
    'ASDFGHJKL'.split(''),
    ['ENTER', ...'ZXCVBNM'.split(''), '⌫'],
  ];

  const renderKey = (label) => {
    const isEnter = label === 'ENTER';
    const isBack = label === '⌫';
    const keyLabel = isEnter ? 'Enter' : isBack ? 'Backspace' : label;
    const statusClass =
      !isEnter && !isBack && keyStatuses[label] ? keyStatuses[label] : '';

    return (
      <button
        key={label}
        type="button"
        className={`key ${statusClass} ${isEnter || isBack ? 'wide' : ''}`}
        onClick={() => {
          if (disabled) return;
          if (isEnter) onEnter();
          else if (isBack) onBackspace();
          else onKey(label);
        }}
        aria-label={isEnter ? 'Submit guess' : isBack ? 'Delete letter' : `Letter ${label}`}
        disabled={disabled && !isEnter && !isBack}
      >
        {label}
      </button>
    );
  };

  return (
    <section className="keyboard" aria-label="On-screen keyboard">
      {rows.map((r, idx) => (
        <div className="kbd-row" key={idx}>
          {r.map(renderKey)}
        </div>
      ))}
    </section>
  );
}
