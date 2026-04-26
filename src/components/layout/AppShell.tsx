"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import SidebarNoteList, { SidebarNoteListRef } from "@/components/layout/SidebarNoteList";
import {
  ChevronsUpDown,
  Search,
  SquarePen,
  Inbox,
  Plus,
  Trash2,
  Settings,
  PanelLeftClose,
  Share,
  MessageSquareText,
  MoreHorizontal,
  LogOut,
} from "lucide-react";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState<{
    id: string;
    email?: string;
    display_name?: string | null;
  } | null>(null);
  const pathname = usePathname();
  const supabase = createClient();
  const sidebarRef = useRef<SidebarNoteListRef>(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();
      if (authUser) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", authUser.id)
          .single();
        setUser({ ...authUser, ...profile });
      }
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  const getInitials = (name: string | null | undefined) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getUserDisplayName = () => {
    if (user?.display_name) return user.display_name;
    if (user?.email) return user.email.split("@")[0];
    return "User";
  };

  return (
    <div className="min-h-screen flex bg-[#F7F6F3]">
      {sidebarOpen && (
        <aside className="w-[240px] bg-[#F7F6F3] border-r border-[#E8E8E8] flex flex-col h-screen">
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="p-3 flex flex-col gap-1">
              <div className="flex items-center gap-2 p-2 rounded hover:bg-[#E8E7E4] cursor-pointer">
                <div className="w-5 h-5 bg-[#191919] rounded flex items-center justify-center">
                  <span className="text-white text-[11px] font-semibold">
                    {getInitials(getUserDisplayName())}
                  </span>
                </div>
                <span className="text-[14px] font-medium text-[#191919] flex-1 truncate">
                  {getUserDisplayName()}&apos;s Workspace
                </span>
                <ChevronsUpDown size={14} className="text-[#6B6B6B]" />
              </div>

              <div className="flex items-center gap-2 p-2 rounded hover:bg-[#E8E7E4] cursor-pointer">
                <Search size={16} className="text-[#6B6B6B]" />
                <span className="text-[14px] text-[#6B6B6B] flex-1">Search</span>
                <span className="text-[11px] text-[#6B6B6B] bg-[#E8E7E4] px-[5px] py-[2px] rounded">
                  ⌘K
                </span>
              </div>

              <button
                onClick={() => sidebarRef.current?.createNote()}
                className="flex items-center gap-2 p-2 rounded hover:bg-[#E8E7E4] cursor-pointer w-full text-left"
              >
                <SquarePen size={16} className="text-[#6B6B6B]" />
                <span className="text-[14px] text-[#6B6B6B]">New page</span>
              </button>

              <div className="flex items-center gap-2 p-2 rounded hover:bg-[#E8E7E4] cursor-pointer">
                <Inbox size={16} className="text-[#6B6B6B]" />
                <span className="text-[14px] text-[#6B6B6B]">Inbox</span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-3">
              <div className="py-2">
                <div className="px-2 py-1.5">
                  <span className="text-[11px] font-medium text-[#6B6B6B] tracking-wide">
                    PRIVATE
                  </span>
                </div>
                <SidebarNoteList ref={sidebarRef} />
              </div>

              <button
                onClick={() => sidebarRef.current?.createNote()}
                className="flex items-center gap-2 p-2 rounded hover:bg-[#E8E7E4] cursor-pointer mb-1 w-full text-left"
              >
                <Plus size={16} className="text-[#6B6B6B]" />
                <span className="text-[14px] text-[#6B6B6B]">Add a page</span>
              </button>
            </div>

            <div className="p-3 border-t border-[#E8E8E8]">
              <div className="flex items-center gap-2 p-2 rounded hover:bg-[#E8E7E4] cursor-pointer">
                <Trash2 size={16} className="text-[#6B6B6B]" />
                <span className="text-[14px] text-[#6B6B6B]">Trash</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded hover:bg-[#E8E7E4] cursor-pointer">
                <Settings size={16} className="text-[#6B6B6B]" />
                <span className="text-[14px] text-[#6B6B6B]">Settings</span>
              </div>
            </div>

            <div className="p-3 border-t border-[#E8E8E8]">
              <div className="flex items-center gap-2 p-2 rounded hover:bg-[#E8E7E4] cursor-pointer">
                <div className="w-8 h-8 bg-[#2383E2] rounded-full flex items-center justify-center">
                  <span className="text-white text-[12px] font-semibold">
                    {getInitials(getUserDisplayName())}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium text-[#191919] truncate">
                    {getUserDisplayName()}
                  </div>
                  <div className="text-[11px] text-[#6B6B6B] truncate">
                    {user?.email}
                  </div>
                </div>
                <ChevronsUpDown size={14} className="text-[#6B6B6B]" />
              </div>
            </div>
          </div>
        </aside>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-11 bg-white border-b border-[#E8E8E8] flex items-center px-4 shrink-0">
          <div className="flex items-center gap-4 flex-1">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 hover:bg-[#F7F6F3] rounded transition-colors"
            >
              <PanelLeftClose size={16} className="text-[#6B6B6B]" />
            </button>

            <div className="flex items-center gap-1 text-[13px]">
              <span className="text-[#6B6B6B]">Workspace</span>
              <span className="text-[#9B9B9B]">/</span>
              <span className="text-[#6B6B6B]">Private</span>
              {pathname?.startsWith("/app/") && pathname !== "/app" && (
                <>
                  <span className="text-[#9B9B9B]">/</span>
                  <span className="text-[#191919] font-medium">Edit</span>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[12px] text-[#6B6B6B]">Edited 2 min ago</span>
            <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded border border-[#E8E8E8] hover:bg-[#F7F6F3] transition-colors">
              <Share size={14} className="text-[#191919]" />
              <span className="text-[13px] font-medium text-[#191919]">Share</span>
            </button>
            <button className="p-1.5 hover:bg-[#F7F6F3] rounded transition-colors">
              <MessageSquareText size={16} className="text-[#6B6B6B]" />
            </button>
            <button className="p-1.5 hover:bg-[#F7F6F3] rounded transition-colors">
              <MoreHorizontal size={16} className="text-[#6B6B6B]" />
            </button>
            <button
              onClick={handleLogout}
              className="p-1.5 hover:bg-[#F7F6F3] rounded transition-colors ml-1"
              title="Log out"
            >
              <LogOut size={16} className="text-[#6B6B6B]" />
            </button>
          </div>
        </header>

        <main className="flex-1 bg-white overflow-y-auto">
          <div className="max-w-3xl mx-auto px-8 py-8">{children}</div>
        </main>
      </div>
    </div>
  );
}