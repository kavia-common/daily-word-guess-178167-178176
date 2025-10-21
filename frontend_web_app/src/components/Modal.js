import React, { useEffect, useRef } from 'react';

/**
 * Modal component with accessibility and focus management.
 * - role="dialog", aria-modal="true"
 * - Focus trap within modal; initial focus on close button
 * - Close on overlay click and Escape key
 * - Returns focus to the opener on close if opener provided
 */
// PUBLIC_INTERFACE
export default function Modal({ isOpen, onClose, title = 'Dialog', children, openerRef }) {
  const overlayRef = useRef(null);
  const closeBtnRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    // Focus first interactive element (close button) when opened
    const t = setTimeout(() => {
      if (closeBtnRef.current) closeBtnRef.current.focus();
    }, 0);

    // Keydown handler for Escape and focus trap
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose?.();
        return;
      }
      if (e.key === 'Tab') {
        // Simple focus trap within modal content
        const focusable = contentRef.current
          ? contentRef.current.querySelectorAll(
              'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
            )
          : [];
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            last.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === last) {
            first.focus();
            e.preventDefault();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown, true);
    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
      clearTimeout(t);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    // Prevent background scroll while modal open
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      onClose?.();
    }
  };

  useEffect(() => {
    // Return focus to opener when closed
    if (!isOpen && openerRef?.current) {
      const t = setTimeout(() => openerRef.current?.focus(), 0);
      return () => clearTimeout(t);
    }
  }, [isOpen, openerRef]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onMouseDown={handleOverlayClick}
      ref={overlayRef}
      aria-hidden={!isOpen}
    >
      <div
        className="modal-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        ref={contentRef}
      >
        <div className="modal-header">
          <h2 id="modal-title" className="modal-title">{title}</h2>
          <button
            ref={closeBtnRef}
            type="button"
            className="btn btn-icon"
            aria-label="Close dialog"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}
