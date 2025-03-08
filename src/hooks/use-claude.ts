
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export type ClaudeMessage = {
  role: 'user' | 'assistant';
  content: string;
};

export type ClaudeOptions = {
  model?: 'claude-3-opus-20240229' | 'claude-3-sonnet-20240229' | 'claude-3-haiku-20240307';
  system?: string;
  max_tokens?: number;
  temperature?: number;
};

const DEFAULT_SYSTEM = 'You are a helpful development assistant that helps with debugging, code examples, and technical guidance.';
const DEFAULT_MODEL = 'claude-3-sonnet-20240229';

export const useClaude = (options: ClaudeOptions = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const sendMessage = async (messages: ClaudeMessage[], customSystemPrompt?: string): Promise<string> => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: supabaseError } = await supabase.functions.invoke('claude-assist', {
        body: {
          messages,
          model: options.model || DEFAULT_MODEL,
          system: customSystemPrompt || options.system || DEFAULT_SYSTEM,
          max_tokens: options.max_tokens || 1024,
          temperature: options.temperature || 0.7
        }
      });

      if (supabaseError) {
        throw new Error(supabaseError.message || 'Error communicating with Claude');
      }

      if (!data || !data.content || !data.content[0]) {
        throw new Error('Invalid response from Claude API');
      }

      return data.content[0].text;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('Claude API error:', err);
      toast({
        title: 'Error',
        description: `Failed to get response from Claude: ${errorMessage}`,
        variant: 'destructive',
      });
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
