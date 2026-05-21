'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { postsService } from '@/services/posts.service';
import { Post } from '@/types';

interface CreatePostProps {
    onPostCreated: (post: Post) => void;
}

export function CreatePost({ onPostCreated }: CreatePostProps) {
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit() {
        if (!content.trim()) return;
        setIsLoading(true);

        try {
            const post = await postsService.create(content);
            onPostCreated(post);
            setContent('');
        } catch {
            // erro silencioso por ora
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Card>
            <CardContent className="pt-4">
                <Textarea
                    placeholder="O que você está pensando?"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={3}
                    maxLength={500}
                />
                <p className="text-xs text-muted-foreground text-right mt-1">
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