'use client';

import { useState, useEffect, useRef } from 'react';

import { Send, Sparkles, Bot, User } from 'lucide-react';
import { useParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

import { DashboardShell } from '@/components/dashboard-shell';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useAgentByWallet } from '@/hooks/useAgentByWallet';
import { formatAddress } from '@/utils/agentStorage';

/**
 * Individual Agent page for a specific wallet address
 *
 * @returns {React.ReactNode} The agent page
 */
export default function AgentPage() {
  const params = useParams();
  const walletAddress = params.walletAddress as string;
  const [input, setInput] = useState('');
  const { messages, sendMessage, isThinking } = useAgentByWallet(walletAddress);

  // Ref for the messages container
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Function to scroll to the bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Auto-scroll whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const onSendMessage = async () => {
    if (!input.trim() || isThinking) return;
    const message = input;
    setInput('');
    await sendMessage(message);
  };

  return (
    <DashboardShell>
      <div className="flex flex-col h-[calc(100vh-8rem)] gap-4">
        {/* Agent Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <Bot className="h-6 w-6 text-primary" />
              Agent Interface
            </h1>
            <p className="text-muted-foreground font-mono text-sm mt-1">{walletAddress}</p>
          </div>
        </div>

        <Card className="flex-1 flex flex-col overflow-hidden shadow-sm border-border/50">
          <CardHeader className="border-b px-6 py-4 bg-muted/30">
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              {formatAddress(walletAddress)}
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0 overflow-hidden bg-background">
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground space-y-6">
                  <div className="p-6 bg-primary/5 rounded-full">
                    <Bot className="h-12 w-12 text-primary" />
                  </div>
                  <div className="text-center space-y-2 max-w-md">
                    <p className="text-lg font-medium text-foreground">Ready to assist</p>
                    <p className="text-sm">
                      I can help you with blockchain operations, token transfers, and other on-chain
                      activities for wallet{' '}
                      <span className="font-mono text-xs bg-muted px-1 py-0.5 rounded">
                        {formatAddress(walletAddress)}
                      </span>
                      .
                    </p>
                  </div>
                  <Button
                    onClick={() =>
                      sendMessage(
                        `Hello! I'm the agent with wallet address ${walletAddress}. I can help you with blockchain operations, token transfers, and other on-chain activities. What would you like to do?`
                      )
                    }
                    size="lg"
                    className="gap-2 shadow-lg hover:scale-105 transition-transform"
                    disabled={isThinking}
                  >
                    {isThinking ? (
                      <>
                        <Sparkles className="h-4 w-4 animate-spin" />
                        Initializing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" />
                        Launch Agent
                      </>
                    )}
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex gap-3 ${
                        msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                      }`}
                    >
                      <Avatar
                        className={`h-8 w-8 border ${
                          msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                        }`}
                      >
                        <AvatarFallback
                          className={
                            msg.sender === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          }
                        >
                          {msg.sender === 'user' ? (
                            <User className="h-4 w-4" />
                          ) : (
                            <Bot className="h-4 w-4" />
                          )}
                        </AvatarFallback>
                      </Avatar>

                      <div
                        className={`flex flex-col max-w-[80%] ${
                          msg.sender === 'user' ? 'items-end' : 'items-start'
                        }`}
                      >
                        <div
                          className={`px-4 py-2.5 rounded-2xl shadow-sm text-sm ${
                            msg.sender === 'user'
                              ? 'bg-primary text-primary-foreground rounded-tr-sm'
                              : 'bg-muted/50 border border-border rounded-tl-sm'
                          }`}
                        >
                          <ReactMarkdown
                            components={{
                              a: (props) => (
                                <a
                                  {...props}
                                  className={`underline underline-offset-4 ${
                                    msg.sender === 'user'
                                      ? 'text-primary-foreground/90 hover:text-primary-foreground'
                                      : 'text-primary hover:text-primary/80'
                                  }`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                />
                              ),
                              p: ({ children }) => <p className="leading-relaxed">{children}</p>,
                              code: ({ children }) => (
                                <code className="font-mono text-xs bg-black/10 dark:bg-white/10 px-1 py-0.5 rounded">
                                  {children}
                                </code>
                              ),
                            }}
                          >
                            {msg.text}
                          </ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Thinking Indicator */}
                  {isThinking && (
                    <div className="flex gap-3">
                      <Avatar className="h-8 w-8 border bg-muted">
                        <AvatarFallback className="bg-muted">
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm px-4 py-2">
                        <Sparkles className="h-3 w-3 animate-spin" />
                        <span className="animate-pulse">Thinking...</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            {messages.length > 0 && (
              <div className="p-4 bg-background border-t">
                <div className="flex items-center gap-2 max-w-4xl mx-auto">
                  <Input
                    type="text"
                    className="flex-1 bg-muted/30 focus-visible:ring-1 focus-visible:ring-primary/20"
                    placeholder="Type a message to your agent..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && onSendMessage()}
                    disabled={isThinking}
                  />
                  <Button
                    onClick={onSendMessage}
                    disabled={isThinking || !input.trim()}
                    size="icon"
                    className="h-10 w-10 shrink-0 rounded-full shadow-sm"
                  >
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send</span>
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
