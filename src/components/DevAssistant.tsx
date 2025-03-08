
import React, { useState } from 'react';
import { useClaude } from '@/hooks/use-claude';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { LoadingCircle } from '@/components/ui/LoadingCircle';

export const DevAssistant: React.FC = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [conversation, setConversation] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([]);
  const { sendMessage, isLoading, error } = useClaude({
    model: 'claude-3-sonnet-20240229',
    system: 'You are an expert developer assistant helping with code, debugging, and technical guidance. Provide clear, concise, and practical advice.'
  });

  const handleSendMessage = async () => {
    if (!query.trim() || isLoading) return;
    
    // Add user message to conversation
    const updatedConversation = [
      ...conversation,
      { role: 'user', content: query }
    ];
    setConversation(updatedConversation);
    
    // Clear input
    setQuery('');
    
    try {
      // Get response from Claude
      const claudeResponse = await sendMessage(updatedConversation);
      
      // Add Claude's response to conversation
      setConversation([
        ...updatedConversation,
        { role: 'assistant', content: claudeResponse }
      ]);
      
      setResponse(claudeResponse);
    } catch (err) {
      console.error('Error sending message to Claude:', err);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 space-y-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold">Development Assistant</h2>
      
      {error && (
        <div className="p-3 text-sm bg-red-50 text-red-600 rounded-md">
          Error: {error}
        </div>
      )}
      
      <div className="min-h-[200px] max-h-[400px] overflow-y-auto p-4 bg-gray-50 rounded-md">
        {conversation.length === 0 ? (
          <p className="text-gray-500 italic">Ask Claude for development help or debugging assistance.</p>
        ) : (
          conversation.map((message, index) => (
            <div 
              key={index} 
              className={`mb-4 p-3 rounded-lg ${
                message.role === 'user' 
                  ? 'bg-blue-100 ml-10' 
                  : 'bg-gray-100 mr-10'
              }`}
            >
              <p className="text-xs font-semibold mb-1">
                {message.role === 'user' ? 'You' : 'Claude'}
              </p>
              <div className="whitespace-pre-wrap">{message.content}</div>
            </div>
          ))
        )}
      </div>
      
      <div className="flex flex-col space-y-2">
        <Textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask for development help, code reviews, debugging assistance..."
          className="min-h-[100px] p-3"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
        />
        <div className="flex justify-end">
          <Button 
            onClick={handleSendMessage} 
            disabled={isLoading || !query.trim()}
            className="flex items-center space-x-2"
          >
            {isLoading ? (
              <>
                <LoadingCircle size={16} /> 
                <span>Processing...</span>
              </>
            ) : 'Send'}
          </Button>
        </div>
        <p className="text-xs text-gray-500">Press Ctrl+Enter to send</p>
      </div>
    </div>
  );
};

export default DevAssistant;
