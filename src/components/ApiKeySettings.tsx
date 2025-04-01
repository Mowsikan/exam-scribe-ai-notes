
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ApiKeyName, getApiKeys, saveApiKey } from '@/services/apiKeyManager';
import { useToast } from '@/components/ui/use-toast';

const ApiKeySettings = () => {
  const [googleBooksKey, setGoogleBooksKey] = useState('');
  const [huggingFaceKey, setHuggingFaceKey] = useState('');
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const keys = getApiKeys();
    if (keys.googleBooks) setGoogleBooksKey(keys.googleBooks);
    if (keys.huggingFace) setHuggingFaceKey(keys.huggingFace);
  }, [open]);

  const handleSave = () => {
    if (googleBooksKey) saveApiKey('googleBooks', googleBooksKey);
    if (huggingFaceKey) saveApiKey('huggingFace', huggingFaceKey);
    
    toast({
      title: "API Keys Saved",
      description: "Your API keys have been securely saved in your browser.",
    });
    
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">API Settings</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>API Key Settings</DialogTitle>
          <DialogDescription>
            Configure your API keys for ExamScribe functionality.
            These keys are stored locally in your browser.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="googleBooks">Google Books API Key</Label>
            <Input
              id="googleBooks"
              type="password"
              value={googleBooksKey}
              onChange={(e) => setGoogleBooksKey(e.target.value)}
              placeholder="Enter your Google Books API key"
            />
            <p className="text-xs text-gray-500">
              Get this from <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Google Cloud Console</a>
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="huggingFace">Hugging Face API Key</Label>
            <Input
              id="huggingFace"
              type="password"
              value={huggingFaceKey}
              onChange={(e) => setHuggingFaceKey(e.target.value)}
              placeholder="Enter your Hugging Face API key"
            />
            <p className="text-xs text-gray-500">
              Get this from <a href="https://huggingface.co/settings/tokens" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Hugging Face</a>
            </p>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save Settings</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeySettings;
