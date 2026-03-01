"use client";

import { useState } from "react";
import { useNotes, useCreateNote, useUpdateNote } from "@/hooks/use-notes";
import { Button } from "@/components/ui/button";
import NoteList from "./components/NoteList";
import { Checkbox } from "@/components/ui/checkbox"


export default function Home() {
    const { data: notes, isLoading, error } = useNotes();
    const createNote = useCreateNote();
    const updateNote = useUpdateNote();
    const [title, setTitle] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;
        createNote.mutate({ title });
        setTitle("");
    };

    const handlePinnedChange = (noteId: number, isPinned: boolean) => {
        const note = notes?.find((n) => n.id === noteId);
        if (!note) return;

        updateNote.mutate({
            id: noteId,
            title: note.title,
            content: note.content || "",
            isPinned
        });
    }

    if (isLoading) return <div className="p-8">Loading...</div>;
    if (error)
        return <div className="p-8 text-destructive">Error: {error.message}</div>;

    return (
        <main className="p-8 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">DuckBoard</h1>

            <NoteList
                handleSubmit={handleSubmit}
                title={title} setTitle={setTitle}
                createNote={createNote} />

            <div className="space-y-3">
                {notes?.map((note) => (
                    <div key={note.id} className="p-4 border rounded-lg">
                        <Checkbox
                            checked={note.isPinned}
                            onCheckedChange={(checked) => handlePinnedChange(note.id, !!checked)}
                        />
                        <h2 className="font-semibold">{note.title}</h2>

                        <p className="text-sm text-muted-foreground">
                            {new Date(note.createdAt).toLocaleString()}
                        </p>
                    </div>
                ))}
                {notes?.length === 0 && (
                    <p className="text-muted-foreground">
                        No notes yet. Create one above.
                    </p>
                )}
            </div>
        </main>
    );
}
