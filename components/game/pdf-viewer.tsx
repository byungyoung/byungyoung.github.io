"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import type { PDFDocumentLoadingTask, PDFDocumentProxy } from "pdfjs-dist";

export interface PdfViewerCopy {
  viewerLabel: string;
  loading: string;
  error: string;
  pageLabel: string;
  zoomIn: string;
  zoomOut: string;
  zoomReset: string;
}

type PdfViewerProps = {
  src: string;
  copy: PdfViewerCopy;
};

type Status = "loading" | "ready" | "error";

const ZOOM_STEP = 0.25;
const ZOOM_MIN = 1;
const ZOOM_MAX = 2.5;
const MAX_PIXEL_RATIO = 2;
const RESIZE_DEBOUNCE_MS = 150;

/**
 * Renders the résumé PDF with PDF.js onto canvases, so it shows inline on
 * phones too (mobile browsers will not display a PDF inside an iframe).
 * PDF.js is loaded only when this component mounts, keeping it out of the
 * game's own bundle. The legacy build is used for older mobile browsers.
 */
export function PdfViewer({ src, copy }: PdfViewerProps) {
  const [status, setStatus] = useState<Status>("loading");
  const [pageCount, setPageCount] = useState(0);
  const [zoom, setZoom] = useState(ZOOM_MIN);
  const docRef = useRef<PDFDocumentProxy | null>(null);
  const taskRef = useRef<PDFDocumentLoadingTask | null>(null);
  const pagesRef = useRef<HTMLDivElement>(null);
  const renderSerial = useRef(0);

  const renderPages = useCallback(async (scaleFactor: number) => {
    const doc = docRef.current;
    const host = pagesRef.current;
    if (!doc || !host) return;

    const serial = ++renderSerial.current;
    const available = host.clientWidth;
    const ratio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);
    const canvases = host.querySelectorAll<HTMLCanvasElement>("canvas");

    for (let pageNumber = 1; pageNumber <= doc.numPages; pageNumber += 1) {
      if (serial !== renderSerial.current) return;
      const canvas = canvases[pageNumber - 1];
      if (!canvas) continue;
      const page = await doc.getPage(pageNumber);
      const base = page.getViewport({ scale: 1 });
      const cssWidth = available * scaleFactor;
      const viewport = page.getViewport({ scale: (cssWidth / base.width) * ratio });

      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);
      canvas.style.width = `${Math.floor(cssWidth)}px`;
      canvas.style.height = `${Math.floor(viewport.height / ratio)}px`;
      await page.render({ canvas, viewport }).promise;
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
        pdfjs.GlobalWorkerOptions.workerSrc = new URL(
          "pdfjs-dist/legacy/build/pdf.worker.min.mjs",
          import.meta.url,
        ).toString();
        const task = pdfjs.getDocument({ url: src });
        taskRef.current = task;
        const doc = await task.promise;
        if (cancelled) return;
        docRef.current = doc;
        setPageCount(doc.numPages);
        setStatus("ready");
      } catch {
        if (!cancelled) setStatus("error");
      }
    })();

    return () => {
      cancelled = true;
      renderSerial.current += 1;
      void taskRef.current?.destroy();
      taskRef.current = null;
      docRef.current = null;
    };
  }, [src]);

  useEffect(() => {
    if (status !== "ready") return;
    renderPages(zoom).catch(() => setStatus("error"));
  }, [status, zoom, pageCount, renderPages]);

  useEffect(() => {
    if (status !== "ready" || !pagesRef.current) return;
    let timer = 0;
    let lastWidth = pagesRef.current.clientWidth;
    const observer = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;
      if (Math.abs(width - lastWidth) < 1) return;
      lastWidth = width;
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        renderPages(zoom).catch(() => setStatus("error"));
      }, RESIZE_DEBOUNCE_MS);
    });
    observer.observe(pagesRef.current);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, [status, zoom, renderPages]);

  const changeZoom = (delta: number) =>
    setZoom((value) => Math.min(Math.max(value + delta, ZOOM_MIN), ZOOM_MAX));

  return (
    <div className="g-pdf g-frame">
      <div className="g-pdf__toolbar">
        <span className="g-pixel g-pdf__count" aria-live="polite">
          {status === "ready" ? `${pageCount} ${copy.pageLabel}` : "—"}
        </span>
        <div className="g-pdf__zoom">
          <button type="button" className="g-btn g-btn--sm" onClick={() => changeZoom(-ZOOM_STEP)} disabled={zoom <= ZOOM_MIN || status !== "ready"} aria-label={copy.zoomOut}>
            −
          </button>
          <button type="button" className="g-btn g-btn--sm" onClick={() => setZoom(ZOOM_MIN)} disabled={zoom === ZOOM_MIN || status !== "ready"}>
            {copy.zoomReset}
          </button>
          <button type="button" className="g-btn g-btn--sm" onClick={() => changeZoom(ZOOM_STEP)} disabled={zoom >= ZOOM_MAX || status !== "ready"} aria-label={copy.zoomIn}>
            +
          </button>
        </div>
      </div>

      <div className="g-pdf__scroller" role="region" aria-label={copy.viewerLabel} tabIndex={0}>
        {status === "loading" ? <p className="g-pdf__status g-pixel">{copy.loading}…</p> : null}
        {status === "error" ? <p className="g-pdf__status">{copy.error}</p> : null}
        <div ref={pagesRef} className="g-pdf__pages" data-zoomed={zoom > ZOOM_MIN || undefined}>
          {Array.from({ length: status === "ready" ? pageCount : 0 }, (_, index) => (
            <canvas
              key={index}
              className="g-pdf__page"
              role="img"
              aria-label={`${copy.viewerLabel}, ${copy.pageLabel} ${index + 1} / ${pageCount}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
