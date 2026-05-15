import type { NewNoteValues, Note } from "../types/note";
import axios from "axios";

const url = "https://notehub-public.goit.study/api/notes";

export interface Resp {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(query: string, currentPage: number): Promise<Resp> {
  const res = await axios.get<Resp>(url, {
    params: {
      search: query,
      page: currentPage,
    },
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
    }
  });
  return res.data;
}

export async function postNote(newNote: NewNoteValues): Promise<Note> {
  const res = await axios.post<Note>(
    url, 
    newNote, 
    {headers: {
      Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
    }
  });
  return res.data;
}

export async function deleteNote(noteId: string) {
  const res = await axios.delete<Note>(
    url+'/'+noteId, 
    {headers: {
      Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
    }
  });
  return res.data;
}