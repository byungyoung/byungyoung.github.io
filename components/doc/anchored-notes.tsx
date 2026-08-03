import { DraftGate } from "@/components/doc/draft-gate";
import { MarginNote } from "@/components/doc/margin-note";
import { notes } from "@/content/notes";
import { ui } from "@/content/ui";
import type { Lang, MarginNote as MarginNoteData } from "@/content/types";

const OFFSET_COUNT = 3;

export function notesFor(anchor: string): MarginNoteData[] {
  return notes.filter((note) => note.anchor === anchor);
}

export function noteById(id: string): MarginNoteData | undefined {
  return notes.find((note) => note.id === id);
}

type AnchoredNotesProps = {
  anchor: string;
  lang: Lang;
  /** Starting rail offset; successive notes rotate through 0—2 so the rail is not ruler-straight. */
  offset?: number;
  /** Renders in development only regardless of review state (density-budget omission). */
  devOnly?: boolean;
  inline?: boolean;
};

export function AnchoredNotes({
  anchor,
  lang,
  offset = 0,
  devOnly = false,
  inline = false,
}: AnchoredNotesProps) {
  const found = notesFor(anchor);
  if (found.length === 0) return null;

  return (
    <>
      {found.map((note, index) => (
        <DraftGate
          key={note.id}
          lang={lang}
          status={note.status}
          devOnly={devOnly}
        >
          <MarginNote
            offset={((offset + index) % OFFSET_COUNT) as 0 | 1 | 2}
            label={ui.marginNote.label[lang]}
            className={inline ? "doc-note--inline" : undefined}
          >
            {note.text[lang]}
          </MarginNote>
        </DraftGate>
      ))}
    </>
  );
}
