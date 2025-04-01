
export type NoteLength = 'small' | 'medium' | 'detailed';

export interface Note {
  id: string;
  title: string;
  definition: string;
  formula?: string;
  diagram?: string;
  keyPoints: string[];
  length: NoteLength;
  createdAt: string;
  source?: string[];
}
