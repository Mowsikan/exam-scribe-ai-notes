
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import NotesCard from '@/components/NotesCard';
import HistoryList from '@/components/HistoryList';
import LoadingState from '@/components/LoadingState';
import { generateNotes, saveNote as apiSaveNote } from '@/services/api';
import { Note, NoteLength } from '@/types/Note';

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  const [savedNotes, setSavedNotes] = useState<Note[]>([]);
  const [activeTab, setActiveTab] = useState<string>('generate');
  const { toast } = useToast();

  const handleSearch = async (query: string, noteLength: NoteLength) => {
    try {
      setIsLoading(true);
      const result = await generateNotes(query, noteLength);
      setCurrentNote(result);
      setActiveTab('generate');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to generate notes. Please try again.',
        variant: 'destructive',
      });
      console.error('Error generating notes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveNote = async () => {
    if (!currentNote) return;
    
    try {
      // Check if already saved
      if (savedNotes.some(note => note.id === currentNote.id)) {
        toast({
          title: 'Already saved',
          description: 'This note is already in your saved notes.',
        });
        return;
      }
      
      const savedNote = await apiSaveNote(currentNote);
      setSavedNotes([savedNote, ...savedNotes]);
      toast({
        title: 'Note saved',
        description: 'Note has been saved successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save note. Please try again.',
        variant: 'destructive',
      });
      console.error('Error saving note:', error);
    }
  };

  const handleSelectFromHistory = (note: Note) => {
    setCurrentNote(note);
    setActiveTab('generate');
  };

  const renderContent = () => {
    if (isLoading) {
      return <LoadingState />;
    }

    if (!currentNote) {
      return (
        <div className="mt-10 flex flex-col items-center justify-center text-center">
          <div className="mb-4 rounded-full bg-brand-light p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-10 w-10 text-brand-blue"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
              />
            </svg>
          </div>
          <h2 className="mb-2 text-2xl font-bold">Start Creating Exam Notes</h2>
          <p className="mb-6 max-w-md text-gray-600">
            Ask any exam question and get AI-generated notes with key definitions, formulas, and points
          </p>
          <div className="space-y-2 text-sm text-gray-500">
            <p>Try questions like:</p>
            <Button 
              variant="link" 
              onClick={() => handleSearch("Explain Newton's Laws for exams", "medium")}
              className="block text-brand-blue"
            >
              "Explain Newton's Laws for exams"
            </Button>
            <Button 
              variant="link" 
              onClick={() => handleSearch("What is mitosis and its phases?", "medium")}
              className="block text-brand-blue"
            >
              "What is mitosis and its phases?"
            </Button>
            <Button 
              variant="link" 
              onClick={() => handleSearch("Explain photosynthesis process for biology exam", "medium")}
              className="block text-brand-blue"
            >
              "Explain photosynthesis process for biology exam"
            </Button>
          </div>
        </div>
      );
    }

    return <NotesCard note={currentNote} onSave={handleSaveNote} />;
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="container flex-1 py-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="md:col-span-1">
            <div className="sticky top-20 rounded-lg border p-4 shadow-sm">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4 grid w-full grid-cols-2">
                  <TabsTrigger value="generate">Generate</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>
                
                <TabsContent value="generate">
                  <SearchBar onSearch={handleSearch} isLoading={isLoading} />
                </TabsContent>
                
                <TabsContent value="history">
                  <HistoryList notes={savedNotes} onSelect={handleSelectFromHistory} />
                </TabsContent>
              </Tabs>
            </div>
          </div>
          
          <div className="md:col-span-2">
            {renderContent()}
          </div>
        </div>
      </main>
      
      <footer className="border-t py-4 text-center text-sm text-gray-500">
        <div className="container">
          ExamScribe AI Notes Generator © {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
};

export default Index;
