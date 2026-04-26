"use client";

import { useState, useEffect, useCallback, useImperativeHandle, forwardRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Note } from "@/lib/supabase/database.types";
import { FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarNoteListProps {
  onNoteCreated?: (noteId: string) => void;
}

export interface SidebarNoteListRef {
  createNote: () => Promise<void>;
}

const SidebarNoteList = forwardRef<SidebarNoteListRef, SidebarNoteListProps>(
  function SidebarNoteList({ onNoteCreated }, ref) {
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState(true);
    const pathname = usePathname();
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

    const createNote = useCallback(async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("notes")
        .insert({ user_id: user.id, title: "Untitled", content: "" })
        .select()
        .single();

      if (!error && data) {
        setNotes((prev) => [data, ...prev]);
        if (onNoteCreated) {
          onNoteCreated(data.id);
        } else {
          window.location.href = `/app/${data.id}`;
        }
      }
    }, [supabase, onNoteCreated]);

    useImperativeHandle(ref, () => ({ createNote }), [createNote]);

    const isNoteActive = (noteId: string) => {
      return pathname === `/app/${noteId}`;
    };

    if (loading) {
      return (
        <div className="px-2 py-1">
          <div className="text-[13px] text-[#6B6B6B] py-1.5 px-2">Loading...</div>
        </div>
      );
    }

    if (notes.length === 0) {
      return (
        <div className="px-2 py-1">
          <button
            onClick={createNote}
            className="text-[13px] text-[#6B6B6B] py-1.5 px-2 hover:text-[#191919] w-full text-left"
          >
            No notes yet - click to create
          </button>
        </div>
      );
    }

    return (
      <div className="py-1">
        {notes.map((note) => (
          <div key={note.id}>
            <Link
              href={`/app/${note.id}`}
              className={cn(
                "flex items-center gap-1.5 py-1.5 px-2 rounded text-[14px] transition-colors",
                isNoteActive(note.id)
                  ? "bg-[#E8E7E4] text-[#191919]"
                  : "text-[#6B6B6B] hover:bg-[#E8E7E4]"
              )}
            >
              <FileText size={16} className="shrink-0" />
              <span className="truncate flex-1">{note.title || "Untitled"}</span>
            </Link>
          </div>
        ))}
      </div>
    );
  }
);

export default SidebarNoteList;