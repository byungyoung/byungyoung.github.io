"use client";

import { useEffect } from "react";

import { markQuest, showToast } from "@/lib/run-progress";

type QuestVisitProps = {
  slug: string;
  message: string;
};

/** Records that the visitor entered this quest and announces it once. */
export function QuestVisit({ slug, message }: QuestVisitProps) {
  useEffect(() => {
    if (markQuest(slug)) showToast(message);
  }, [slug, message]);

  return null;
}
