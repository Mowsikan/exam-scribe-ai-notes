
import React from 'react';
import { Download, Save, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { Note } from '@/types/Note';

interface NotesCardProps {
  note: Note;
  onSave: () => void;
}

const NotesCard: React.FC<NotesCardProps> = ({ note, onSave }) => {
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `${note.title}\n\nDefinition: ${note.definition}\n\n${
        note.formula ? `Formula: ${note.formula}\n\n` : ''
      }Key Points:\n${note.keyPoints.map((point) => `- ${point}`).join('\n')}`
    );
    toast({
      title: 'Copied to clipboard',
      description: 'The note has been copied to your clipboard',
    });
  };

  const handleDownload = () => {
    // In a real app, this would generate a PDF
    toast({
      title: 'Download started',
      description: 'Your note is being downloaded as a PDF',
    });
  };

  return (
    <div className="note-card">
      <div className="flex items-center justify-between p-4">
        <h2 className="text-xl font-semibold">{note.title}</h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={handleCopy}>
            <Copy className="mr-2 h-4 w-4" />
            Copy
          </Button>
          <Button variant="outline" size="sm" onClick={onSave}>
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
      </div>
      
      <Separator />
      
      <Tabs defaultValue="normal" className="p-4">
        <TabsList>
          <TabsTrigger value="normal">Normal</TabsTrigger>
          <TabsTrigger value="handwritten">Handwritten</TabsTrigger>
        </TabsList>
        
        <TabsContent value="normal" className="mt-4 space-y-4">
          <div className="note-section">
            <h3 className="mb-2 font-semibold">Definition</h3>
            <p className="definition rounded bg-gray-50 p-3 dark:bg-gray-800">
              {note.definition}
            </p>
          </div>
          
          {note.formula && (
            <div className="note-section">
              <h3 className="mb-2 font-semibold">Formula</h3>
              <div className="formula">{note.formula}</div>
            </div>
          )}
          
          {note.diagram && (
            <div className="note-section">
              <h3 className="mb-2 font-semibold">Diagram</h3>
              <img 
                src={note.diagram} 
                alt="Diagram" 
                className="mx-auto max-h-64 rounded-md border"
              />
            </div>
          )}
          
          <div className="note-section">
            <h3 className="mb-2 font-semibold">Key Points</h3>
            <ul className="space-y-2">
              {note.keyPoints.map((point, index) => (
                <li key={index} className="key-point">
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </TabsContent>
        
        <TabsContent value="handwritten" className="mt-4 space-y-4">
          <div className="note-section">
            <h3 className="mb-2 font-semibold">Definition</h3>
            <p className="handwritten rounded bg-gray-50 p-3 dark:bg-gray-800 text-lg">
              {note.definition}
            </p>
          </div>
          
          {note.formula && (
            <div className="note-section">
              <h3 className="mb-2 font-semibold">Formula</h3>
              <div className="handwritten formula text-lg">{note.formula}</div>
            </div>
          )}
          
          {note.diagram && (
            <div className="note-section">
              <h3 className="mb-2 font-semibold">Diagram</h3>
              <img 
                src={note.diagram} 
                alt="Diagram" 
                className="mx-auto max-h-64 rounded-md border"
              />
            </div>
          )}
          
          <div className="note-section">
            <h3 className="mb-2 font-semibold">Key Points</h3>
            <ul className="space-y-2">
              {note.keyPoints.map((point, index) => (
                <li key={index} className="handwritten key-point text-lg">
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NotesCard;
