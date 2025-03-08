
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

type ClaudeOptions = {
  model?: 'claude-3-opus-20240229' | 'claude-3-sonnet-20240229' | 'claude-3-haiku-20240307';
  system?: string;
};

const DEFAULT_SYSTEM = 'You are a helpful development assistant that helps with debugging, code examples, and technical guidance.';

export const useClaude = (options: ClaudeOptions = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (messages: Message[], customSystemPrompt?: string): Promise<string> => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.functions.invoke('claude-assist', {
        body: {
          messages,
          model: options.model || 'claude-3-sonnet-20240229',
          system: customSystemPrompt || options.system || DEFAULT_SYSTEM
        }
      });

      if (error) {
        throw new Error(error.message || 'Error communicating with Claude');
      }

      return data.content[0].text;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('Claude API error:', err);
      return '';
    } finally {
      setIsLoading(false);
    }
  };

  return {
    sendMessage,
    isLoading,
    error
  };
};
