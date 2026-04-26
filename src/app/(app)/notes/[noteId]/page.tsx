import NoteEditor from "@/components/notes/NoteEditor";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ noteId: string }>;
}

export default async function NotePage({ params }: PageProps) {
  const { noteId } = await params;

  return <NoteEditor noteId={noteId} />;
}