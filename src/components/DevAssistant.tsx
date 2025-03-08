
import React, { useState, useRef, useEffect } from 'react';
import { useClaude, type ClaudeMessage } from '@/hooks/use-claude';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Send, FileText, RefreshCw, Code, Terminal, ShieldAlert } from 'lucide-react';

export const DevAssistant: React.FC = () => {
  const [query, setQuery] = useState('');
  const [conversation, setConversation] = useState<ClaudeMessage[]>([]);
  const [activeTab, setActiveTab] = useState('chat');
  const [errorDebugInput, setErrorDebugInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { sendMessage, isLoading, error } = useClaude({
    model: 'claude-3-sonnet-20240229',
    system: 'You are an expert developer assistant helping with code, debugging, and technical guidance. Provide clear, concise, and practical advice with code examples where appropriate. Format code blocks with markdown syntax.',
  });

  const handleSendMessage = async () => {
    if (!query.trim() || isLoading) return;
    
    // Add user message to conversation
    const newUserMessage = { role: 'user' as const, content: query };
    const updatedConversation = [...conversation, newUserMessage];
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
    } catch (err) {
      console.error('Error sending message to Claude:', err);
    }
  };

  const handleDebugError = async () => {
    if (!errorDebugInput.trim() || isLoading) return;
    
    const debugPrompt = `Please help debug this error:\n\n${errorDebugInput}`;
    const newUserMessage = { role: 'user' as const, content: debugPrompt };
    const updatedConversation = [...conversation, newUserMessage];
    setConversation(updatedConversation);
    
    setErrorDebugInput('');
    
    try {
      const debugResponse = await sendMessage(updatedConversation);
      
      setConversation([
        ...updatedConversation,
        { role: 'assistant', content: debugResponse }
      ]);
    } catch (err) {
      console.error('Error sending debug request to Claude:', err);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      e.preventDefault();
      if (activeTab === 'chat') {
        handleSendMessage();
      } else if (activeTab === 'debug') {
        handleDebugError();
      }
    }
  };

  const clearConversation = () => {
    setConversation([]);
  };

  useEffect(() => {
    // Scroll to bottom of chat
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  // Simple markdown code block renderer
  const renderMessage = (content: string) => {
    const parts = content.split(/(```[\s\S]*?```)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('```') && part.endsWith('```')) {
        const code = part.slice(3, -3);
        const language = code.split('\n')[0].trim();
        const codeContent = language ? code.slice(language.length).trim() : code;
        
        return (
          <pre key={index} className="bg-gray-800 text-gray-100 p-3 rounded-md overflow-x-auto my-2">
            <code>{codeContent}</code>
          </pre>
        );
      }
      return <p key={index} className="whitespace-pre-wrap">{part}</p>;
    });
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Code className="w-5 h-5 mr-2" />
          Development Assistant
        </CardTitle>
        <CardDescription>
          Get help with coding, debugging, and technical guidance powered by Claude AI
        </CardDescription>
      </CardHeader>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="px-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chat">
              <Terminal className="w-4 h-4 mr-2" />
              Chat
            </TabsTrigger>
            <TabsTrigger value="debug">
              <ShieldAlert className="w-4 h-4 mr-2" />
              Debug Errors
            </TabsTrigger>
          </TabsList>
        </div>
        
        <CardContent className="pt-6">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <TabsContent value="chat" className="space-y-4">
            <div className="bg-gray-50 rounded-md p-4 h-[400px] overflow-y-auto">
              {conversation.length === 0 ? (
                <div className="text-gray-500 italic text-center mt-20">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p>Ask Claude for development help, code examples, or technical guidance.</p>
                </div>
              ) : (
                conversation.map((message, index) => (
                  <div 
                    key={index} 
                    className={cn(
                      "mb-4 p-3 rounded-lg",
                      message.role === 'user' ? "bg-blue-100 ml-8" : "bg-gray-100 mr-8"
                    )}
                  >
                    <p className="text-xs font-semibold mb-1">
                      {message.role === 'user' ? 'You' : 'Claude'}
                    </p>
                    <div>{renderMessage(message.content)}</div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>
            
            <div className="flex flex-col space-y-2">
              <Textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask for development help, code examples, or technical explanations..."
                className="min-h-[100px] p-3 resize-none"
                onKeyDown={handleKeyDown}
                disabled={isLoading}
              />
              <div className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={clearConversation}
                  disabled={conversation.length === 0 || isLoading}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Clear
                </Button>
                <Button 
                  onClick={handleSendMessage} 
                  disabled={isLoading || !query.trim()}
                  className="flex items-center"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin w-4 h-4 mr-2 border-2 border-white border-opacity-50 border-t-white rounded-full" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send
                    </>
                  )}
                </Button>
              </div>
              <p className="text-xs text-gray-500 text-right">Press Ctrl+Enter to send</p>
            </div>
          </TabsContent>
          
          <TabsContent value="debug" className="space-y-4">
            <div className="bg-gray-50 rounded-md p-4 h-[400px] overflow-y-auto">
              {conversation.length === 0 ? (
                <div className="text-gray-500 italic text-center mt-20">
                  <ShieldAlert className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p>Paste error messages or stack traces for Claude to debug.</p>
                </div>
              ) : (
                conversation.map((message, index) => (
                  <div 
                    key={index} 
                    className={cn(
                      "mb-4 p-3 rounded-lg",
                      message.role === 'user' ? "bg-red-50 ml-8" : "bg-gray-100 mr-8"
                    )}
                  >
                    <p className="text-xs font-semibold mb-1">
                      {message.role === 'user' ? 'Error Details' : 'Claude'}
                    </p>
                    <div>{renderMessage(message.content)}</div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>
            
            <div className="flex flex-col space-y-2">
              <Textarea
                value={errorDebugInput}
                onChange={(e) => setErrorDebugInput(e.target.value)}
                placeholder="Paste error messages, stack traces, or console logs here..."
                className="min-h-[100px] p-3 resize-none"
                onKeyDown={handleKeyDown}
                disabled={isLoading}
              />
              <div className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={clearConversation}
                  disabled={conversation.length === 0 || isLoading}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Clear
                </Button>
                <Button 
                  onClick={handleDebugError} 
                  disabled={isLoading || !errorDebugInput.trim()}
                  className="flex items-center"
                  variant="destructive"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin w-4 h-4 mr-2 border-2 border-white border-opacity-50 border-t-white rounded-full" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <ShieldAlert className="w-4 h-4 mr-2" />
                      Debug
                    </>
                  )}
                </Button>
              </div>
              <p className="text-xs text-gray-500 text-right">Press Ctrl+Enter to send</p>
            </div>
          </TabsContent>
        </CardContent>
      </Tabs>
      
      <Separator />
      
      <CardFooter className="flex justify-between pt-4">
        <p className="text-xs text-gray-500">
          Powered by Anthropic's Claude AI
        </p>
        <p className="text-xs text-gray-500">
          Conversations are not stored
        </p>
      </CardFooter>
    </Card>
  );
};

export default DevAssistant;
