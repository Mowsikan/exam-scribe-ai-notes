
import React from 'react';
import { Book } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ApiKeySettings from './ApiKeySettings';

const Header = () => {
  return (
    <header className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur dark:bg-gray-900/80">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Book className="h-6 w-6 text-brand-blue" />
          <h1 className="text-xl font-bold text-brand-dark dark:text-white">
            Exam<span className="text-brand-blue">Scribe</span>
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <ApiKeySettings />
          <Button variant="outline" size="sm">
            History
          </Button>
          <Button size="sm">New Note</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
