'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { postsService } from '@/services/posts.service';
import { aiService } from '@/services/ai.service';
import { Post } from '@/types';
import { Sparkles } from 'lucide-react';

interface CreatePostProps {
    onPostCreated: (post: Post) => void;
}

export function CreatePost({ onPostCreated }: CreatePostProps) {
    const [content, setContent] = useState('');
    const [topic, setTopic] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isAiLoading, setIsAiLoading] = useState(false);

    async function handleSubmit() {
        if (!content.trim()) return;
        setIsLoading(true);
        try {
            const post = await postsService.create(content);
            onPostCreated(post);
            setContent('');
            setTopic('');
        } catch {
            // erro silencioso por ora
        } finally {
            setIsLoading(false);
        }
    }

    async function handleSuggestCaption() {
        if (!topic.trim()) return;
        setIsAiLoading(true);
        try {
            const caption = await aiService.suggestCaption(topic);
            setContent(caption);
        } catch {
            // erro silencioso por ora
        } finally {
            setIsAiLoading(false);
        }
    }

    return (
        <Card>
            <CardContent className="pt-4 flex flex-col gap-2">

                {/* Input do tema para a IA */}
                <div className="flex gap-2">
                    <Input
                        placeholder="Tema do post (ex: pôr do sol na praia)"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                    />
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleSuggestCaption}
                        disabled={isAiLoading || !topic.trim()}
                    >
                        <Sparkles className="w-4 h-4 mr-1" />
                        {isAiLoading ? 'Gerando...' : 'Sugerir'}
                    </Button>
                </div>

                {/* Textarea do conteúdo */}
                <Textarea
                    placeholder="O que você está pensando?"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={3}
                    maxLength={500}
                />
                <p className="text-xs text-muted-foreground text-right">
                    {content.length}/500
                </p>

            </CardContent>
            <CardFooter className="justify-end pt-0">
                <Button
                    onClick={handleSubmit}
                    disabled={isLoading || !content.trim()}
                    size="sm"
                >
                    {isLoading ? 'Publicando...' : 'Publicar'}
                </Button>
            </CardFooter>
        </Card>
    );
}