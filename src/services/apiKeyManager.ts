
// API key management service

// List of required APIs
export type ApiKeyName = 'googleBooks' | 'huggingFace';

// Type for API keys storage
export interface ApiKeys {
  googleBooks?: string;
  huggingFace?: string;
}

// Hardcoded API keys (replace these with your actual API keys)
const hardcodedApiKeys: ApiKeys = {
  googleBooks: 'YOUR_GOOGLE_BOOKS_API_KEY_HERE',
  huggingFace: 'YOUR_HUGGINGFACE_API_KEY_HERE'
};

// Get API keys
export const getApiKeys = (): ApiKeys => {
  return hardcodedApiKeys;
};

// Save API key (for internal use only)
export const saveApiKey = (name: ApiKeyName, value: string): void => {
  hardcodedApiKeys[name] = value;
};

// Check if all required API keys are available
export const hasRequiredApiKeys = (): boolean => {
  return !!hardcodedApiKeys.googleBooks && !!hardcodedApiKeys.huggingFace;
};
