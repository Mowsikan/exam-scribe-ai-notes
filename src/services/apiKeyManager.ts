
// API key management service

// List of required APIs
export type ApiKeyName = 'googleBooks' | 'huggingFace';

// Type for API keys storage
export interface ApiKeys {
  googleBooks?: string;
  huggingFace?: string;
}

// Get API keys from localStorage
export const getApiKeys = (): ApiKeys => {
  const keysJson = localStorage.getItem('examscribe_api_keys');
  return keysJson ? JSON.parse(keysJson) : {};
};

// Save API key to localStorage
export const saveApiKey = (name: ApiKeyName, value: string): void => {
  const keys = getApiKeys();
  keys[name] = value;
  localStorage.setItem('examscribe_api_keys', JSON.stringify(keys));
};

// Check if all required API keys are available
export const hasRequiredApiKeys = (): boolean => {
  const keys = getApiKeys();
  return !!keys.googleBooks && !!keys.huggingFace;
};
