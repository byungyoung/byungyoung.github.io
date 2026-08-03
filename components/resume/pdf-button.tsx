"use client";

import { useCallback } from "react";

import { Button } from "@/components/ui/button";

type PdfButtonProps = {
  label: string;
  /** Browsers seed the "Save as PDF" filename from document.title. */
  fileName: string;
  className?: string;
};

export function PdfButton({ label, fileName, className }: PdfButtonProps) {
  const handleClick = useCallback(() => {
    const originalTitle = document.title;
    const restore = () => {
      document.title = originalTitle;
    };

    window.addEventListener("afterprint", restore, { once: true });
    document.title = fileName;

    try {
      window.print();
    } catch {
      restore();
    }
  }, [fileName]);

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={handleClick}
      className={className}
    >
      {label}
    </Button>
  );
}
