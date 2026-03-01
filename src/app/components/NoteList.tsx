"use client"

import { Button } from '@/components/ui/button'
import React from 'react'

interface NoteListProps {
    handleSubmit: (e: React.FormEvent) => void;
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    createNote: {
        isPending: boolean;
    }
}

function NoteList({ handleSubmit, title, setTitle, createNote }: NoteListProps) {
    return (
        <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="New note title..."
                className="flex-1 px-3 py-2 border rounded-md bg-background text-foreground"
            />
            <Button type="submit" disabled={createNote.isPending}>
                {createNote.isPending ? "Adding..." : "Add Note"}
            </Button>
        </form>
    )
}

export default NoteList
