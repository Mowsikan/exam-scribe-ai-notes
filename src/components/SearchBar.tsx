
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

type NoteLength = 'small' | 'medium' | 'detailed';

interface SearchBarProps {
  onSearch: (query: string, noteLength: NoteLength) => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');
  const [noteLength, setNoteLength] = useState<NoteLength>('medium');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      toast({
        title: 'Please enter a question',
        description: 'You need to enter a question to generate notes',
        variant: 'destructive',
      });
      return;
    }
    onSearch(query, noteLength);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Ask any exam question..."
          className="pl-10"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={isLoading}
        />
      </div>
      
      <div className="space-y-2">
        <Label>Note Length:</Label>
        <RadioGroup
          value={noteLength}
          onValueChange={(value) => setNoteLength(value as NoteLength)}
          className="flex space-x-4"
          disabled={isLoading}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="small" id="small" />
            <Label htmlFor="small">Small</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="medium" id="medium" />
            <Label htmlFor="medium">Medium</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="detailed" id="detailed" />
            <Label htmlFor="detailed">Detailed</Label>
          </div>
        </RadioGroup>
      </div>
      
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Generating Notes...' : 'Generate Notes'}
      </Button>
    </form>
  );
};

export default SearchBar;
