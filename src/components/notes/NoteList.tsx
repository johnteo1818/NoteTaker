"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { Note } from "@/lib/supabase/database.types";
import NoteCard from "./NoteCard";
import { Button } from "@/components/ui/Button";

export default function NoteList() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const supabase = createClient();

  const fetchNotes = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .eq("user_id", user.id)
      .order("updated_at", { ascending: false });

    if (!error && data) {
      setNotes(data);
    }
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  async function createNote() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    setCreating(true);
    const { data, error } = await supabase
      .from("notes")
      .insert({ user_id: user.id, title: "Untitled", content: "" })
      .select()
      .single();

    if (!error && data) {
      window.location.href = `/app/${data.id}`;
    }
    setCreating(false);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="text-sm text-[#6B6B6B]">Loading notes...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-[#191919]">Notes</h2>
        <Button onClick={createNote} disabled={creating} size="sm">
          {creating ? "Creating..." : "New note"}
        </Button>
      </div>

      {notes.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-12 h-12 bg-[#F7F6F3] rounded-lg flex items-center justify-center mx-auto mb-4">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#6B6B6B]"
            >
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <polyline points="14,2 14,8 20,8" />
            </svg>
          </div>
          <p className="text-[#6B6B6B] mb-4">No notes yet</p>
          <Button onClick={createNote} disabled={creating}>
            Create your first note
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      )}
    </div>
  );
}