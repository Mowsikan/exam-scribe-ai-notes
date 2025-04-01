
import React from 'react';
import { Book } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const LoadingState = () => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center justify-center space-y-3 py-6">
        <div className="relative">
          <Book className="h-12 w-12 animate-pulse-slow text-brand-blue" />
          <span className="absolute -bottom-2 left-0 right-0 text-center text-sm font-medium">
            Generating...
          </span>
        </div>
        <p className="max-w-xs text-center text-sm text-gray-500">
          Searching through books and academic sources to create your notes
        </p>
      </div>

      <div className="space-y-4 rounded-lg border p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-48" />
          <div className="flex space-x-2">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-24" />
          </div>
        </div>
        
        <Skeleton className="h-0.5 w-full" />
        
        <div className="space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-16 w-full" />
        </div>
        
        <div className="space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-8 w-3/4" />
        </div>
        
        <div className="space-y-2">
          <Skeleton className="h-5 w-32" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingState;
