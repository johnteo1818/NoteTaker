"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Note } from "@/lib/supabase/database.types";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface NoteEditorProps {
  noteId: string;
}

export default function NoteEditor({ noteId }: NoteEditorProps) {
  const [note, setNote] = useState<Note | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const router = useRouter();
  const supabase = createClient();
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const fetchNote = useCallback(async () => {
    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .eq("id", noteId)
      .single();

    if (error || !data) {
      router.push("/app");
      return;
    }

    setNote(data);
    setTitle(data.title);
    setContent(data.content);
  }, [noteId, supabase, router]);

  useEffect(() => {
    fetchNote();
  }, [fetchNote]);

  const saveNote = useCallback(async () => {
    if (!note) return;

    setSaving(true);
    const { error } = await supabase
      .from("notes")
      .update({ title, content, updated_at: new Date().toISOString() })
      .eq("id", noteId);

    if (!error) {
      setHasChanges(false);
    }
    setSaving(false);
  }, [note, noteId, title, content, supabase]);

  useEffect(() => {
    if (hasChanges) {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      saveTimeoutRef.current = setTimeout(() => {
        saveNote();
      }, 500);
    }

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [hasChanges, saveNote]);

  function handleTitleChange(value: string) {
    setTitle(value);
    setHasChanges(true);
  }

  function handleContentChange(value: string) {
    setContent(value);
    setHasChanges(true);
  }

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this note?")) return;

    setDeleting(true);
    const { error } = await supabase.from("notes").delete().eq("id", noteId);

    if (!error) {
      router.push("/app");
    }
    setDeleting(false);
  }

  if (!note) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-sm text-[#6B6B6B]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between pb-4 border-b border-[#E8E8E8]">
        <div className="flex items-center gap-2">
          <Link
            href="/app"
            className="p-2 hover:bg-[#F7F6F3] rounded-md transition-colors"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#6B6B6B]"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </Link>
          <span className="text-sm text-[#6B6B6B]">
            {saving ? "Saving..." : hasChanges ? "Unsaved changes" : "Saved"}
          </span>
        </div>
        <Button
          variant="danger"
          size="sm"
          onClick={handleDelete}
          disabled={deleting}
        >
          {deleting ? "Deleting..." : "Delete"}
        </Button>
      </div>

      <div className="flex-1 py-8">
        <input
          type="text"
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder="Untitled"
          className={cn(
            "w-full text-3xl font-semibold text-[#191919]",
            "border-none outline-none",
            "placeholder:text-[#9B9B9B]",
            "bg-transparent"
          )}
        />
        <textarea
          value={content}
          onChange={(e) => handleContentChange(e.target.value)}
          placeholder="Start writing..."
          className={cn(
            "w-full mt-4 text-[#191919] text-lg leading-relaxed",
            "border-none outline-none resize-none",
            "placeholder:text-[#9B9B9B]",
            "bg-transparent"
          )}
          rows={20}
        />
      </div>
    </div>
  );
}