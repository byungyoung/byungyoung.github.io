"use client";

import { useEffect, useRef, useState } from "react";

import { onToast } from "@/lib/run-progress";

const TOAST_MS = 2600;

/** Achievement-style banner for the visitor's own progress. */
export function ToastHost() {
  const [message, setMessage] = useState<string | null>(null);
  const [serial, setSerial] = useState(0);
  const timer = useRef<number>(0);

  useEffect(() => {
    const off = onToast((next) => {
      window.clearTimeout(timer.current);
      setMessage(next);
      setSerial((value) => value + 1);
      timer.current = window.setTimeout(() => setMessage(null), TOAST_MS);
    });
    return () => {
      off();
      window.clearTimeout(timer.current);
    };
  }, []);

  return (
    <div role="status" aria-live="polite" className="g-toast-region">
      {message ? (
        <p key={serial} className="g-toast g-frame">
          <span aria-hidden className="g-toast__mark">
            ★
          </span>
          {message}
        </p>
      ) : null}
    </div>
  );
}
