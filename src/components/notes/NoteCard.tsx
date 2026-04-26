"use client";

import Link from "next/link";
import { Note } from "@/lib/supabase/database.types";
import { cn } from "@/lib/utils";

interface NoteCardProps {
  note: Note;
  isActive?: boolean;
}

export default function NoteCard({ note, isActive }: NoteCardProps) {
  const preview = note.content.slice(0, 100) || "No content";
  const formattedDate = new Date(note.updated_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Link
      href={`/app/${note.id}`}
      className={cn(
        "block p-4 rounded-lg transition-colors",
        "hover:bg-[#F7F6F3]",
        isActive && "bg-[#F7F6F3] border-l-2 border-[#2383E2]"
      )}
    >
      <h3 className="font-medium text-[#191919] mb-1 truncate">
        {note.title || "Untitled"}
      </h3>
      <p className="text-sm text-[#6B6B6B] line-clamp-2 mb-2">{preview}</p>
      <time className="text-xs text-[#9B9B9B]">{formattedDate}</time>
    </Link>
  );
}