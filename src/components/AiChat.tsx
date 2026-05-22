'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, X, Send } from 'lucide-react';
import { aiService } from '@/services/ai.service';

interface Message {
    role: 'user' | 'ai';
    content: string;
}

export function AiChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: 'ai', content: 'Olá! Sou seu assistente de redes sociais. Como posso te ajudar?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    async function handleSend() {
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        try {
            const reply = await aiService.chat(userMessage);
            setMessages(prev => [...prev, { role: 'ai', content: reply }]);
        } catch {
            setMessages(prev => [...prev, { role: 'ai', content: 'Erro ao conectar com a IA. Tente novamente.' }]);
        } finally {
            setIsLoading(false);
        }
    }

    function handleKeyDown(e: React.KeyboardEvent) {
        if (e.key === 'Enter') handleSend();
    }

    return (
        <>
            {/* Botão flutuante */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 bg-primary text-primary-foreground rounded-full p-4 shadow-lg hover:opacity-90 transition z-50"
            >
                <MessageCircle className="w-6 h-6" />
            </button>

            {/* Painel do chat */}
            {isOpen && (
                <div className="fixed bottom-6 right-6 w-80 h-[480px] bg-background border rounded-xl shadow-xl flex flex-col z-50">

                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b">
                        <div>
                            <p className="font-semibold text-sm">Assistente IA</p>
                            <p className="text-xs text-muted-foreground">Dicas de redes sociais</p>
                        </div>
                        <button onClick={() => setIsOpen(false)}>
                            <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                        </button>
                    </div>

                    {/* Mensagens */}
                    <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`text-sm px-3 py-2 rounded-lg max-w-[85%] ${msg.role === 'user'
                                        ? 'bg-primary text-primary-foreground self-end'
                                        : 'bg-muted self-start'
                                    }`}
                            >
                                {msg.content}
                            </div>
                        ))}
                        {isLoading && (
                            <div className="bg-muted text-sm px-3 py-2 rounded-lg self-start text-muted-foreground">
                                Digitando...
                            </div>
                        )}
                        <div ref={bottomRef} />
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t flex gap-2">
                        <Input
                            placeholder="Digite sua pergunta..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            disabled={isLoading}
                        />
                        <Button size="icon" onClick={handleSend} disabled={isLoading || !input.trim()}>
                            <Send className="w-4 h-4" />
                        </Button>
                    </div>

                </div>
            )}
        </>
    );
}