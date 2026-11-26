"use client";

import { useRef, useState } from "react";

import type { Lang } from "@/content/types";
import type { Shot } from "@/content/shots";

const THUMB = 640;
const FULL = 1440;

const copy = {
  open: { ko: "크게 보기", en: "Enlarge" },
  close: { ko: "닫기", en: "Close" },
} as const;

const src = (file: string, width: number) => `/shots/${file}-${width}.webp`;

export function ShotGallery({ shots, lang, className }: { shots: Shot[]; lang: Lang; className?: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState<Shot | null>(null);

  if (shots.length === 0) return null;

  const show = (shot: Shot) => {
    setActive(shot);
    dialogRef.current?.showModal();
  };

  return (
    <>
      <ul className={`shot-gallery ${className ?? ""}`} data-print-hide>
        {shots.map((shot) => (
          <li key={shot.file}>
            <button type="button" className="shot-gallery__btn" onClick={() => show(shot)} aria-label={`${copy.open[lang]}: ${shot.alt[lang]}`}>
              <img
                src={src(shot.file, THUMB)}
                srcSet={`${src(shot.file, THUMB)} ${THUMB}w, ${src(shot.file, FULL)} ${FULL}w`}
                sizes="(min-width: 768px) 320px, 80vw"
                width={shot.width}
                height={shot.height}
                alt={shot.alt[lang]}
                loading="lazy"
                decoding="async"
              />
            </button>
          </li>
        ))}
      </ul>
      <dialog ref={dialogRef} className="shot-dialog" onClose={() => setActive(null)} onClick={(event) => event.target === event.currentTarget && dialogRef.current?.close()}>
        <button type="button" className="shot-dialog__close" onClick={() => dialogRef.current?.close()}>
          {copy.close[lang]}
        </button>
        {active ? <img src={src(active.file, FULL)} width={active.width} height={active.height} alt={active.alt[lang]} decoding="async" /> : null}
      </dialog>
    </>
  );
}
