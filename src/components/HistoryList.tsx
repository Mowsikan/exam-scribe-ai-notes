
import React from 'react';
import { Clock, Search } from 'lucide-react';
import { Note } from '@/types/Note';

interface HistoryListProps {
  notes: Note[];
  onSelect: (note: Note) => void;
}

const HistoryList: React.FC<HistoryListProps> = ({ notes, onSelect }) => {
  if (notes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <Clock className="mb-2 h-10 w-10 text-gray-400" />
        <h3 className="text-lg font-medium">No history yet</h3>
        <p className="text-sm text-gray-500">
          Generated notes will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search history..."
          className="w-full rounded-md border border-gray-300 py-2 pl-9 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
      
      <div className="space-y-2">
        {notes.map((note) => (
          <div
            key={note.id}
            onClick={() => onSelect(note)}
            className="cursor-pointer rounded-md border border-gray-200 p-3 transition-colors hover:bg-gray-50"
          >
            <h3 className="font-medium line-clamp-1">{note.title}</h3>
            <p className="mt-1 text-sm text-gray-500 line-clamp-2">
              {note.definition}
            </p>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs text-gray-400">
                {new Date(note.createdAt).toLocaleDateString()}
              </span>
              <span className="rounded-full bg-gray-100 px-2 py-1 text-xs capitalize">
                {note.length}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryList;
