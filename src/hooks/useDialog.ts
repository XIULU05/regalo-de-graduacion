import { useCallback, useEffect, useRef, useState } from 'react';
export function useDialog() {
  const ref = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const returnFocus = useRef<HTMLElement | null>(null);
  const show = useCallback((opener?: HTMLElement) => {
    returnFocus.current = opener ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null);
    ref.current?.showModal(); setOpen(true); setClosing(false);
  }, []);
  const close = useCallback(() => {
    if (closing) return;
    setClosing(true);
    timer.current = window.setTimeout(() => { ref.current?.close(); setOpen(false); setClosing(false); }, matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 350);
  }, [closing]);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [open]);
  useEffect(() => () => clearTimeout(timer.current), []);
  return { ref, open, closing, show, close, onClose: () => {
    setOpen(false); setClosing(false);
    returnFocus.current?.focus({ preventScroll: true });
  } };
}

