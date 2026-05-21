'use client';

import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Heart, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Post } from '@/types';
import { postsService } from '@/services/posts.service';

interface PostCardProps {
    post: Post;
    currentUserId?: string;
}

export function PostCard({ post, currentUserId }: PostCardProps) {
    const [likesCount, setLikesCount] = useState(post.likesCount);
    const [liked, setLiked] = useState(false);

    async function handleLike() {
        try {
            if (liked) {
                await postsService.unlike(post.id);
                setLikesCount((prev) => prev - 1);
            } else {
                await postsService.like(post.id);
                setLikesCount((prev) => prev + 1);
            }
            setLiked(!liked);
        } catch {
            // silencia erro de curtida duplicada
        }
    }

    return (
        <Card>
            <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarFallback>
                            {post.author?.username?.slice(0, 2).toUpperCase() ?? '??'}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <Link href={`/profile/${post.author?.id}`} className="font-medium text-sm hover:underline">
                            {post.author?.username ?? 'Usuário'}
                        </Link>
                        <p className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(post.createdAt), {
                                addSuffix: true,
                                locale: ptBR,
                            })}
                        </p>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="pb-3">
                <p className="text-sm leading-relaxed">{post.content}</p>
            </CardContent>

            <CardFooter className="pt-0 gap-4">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLike}
                    className={liked ? 'text-red-500' : 'text-muted-foreground'}
                >
                    <Heart className={`w-4 h-4 mr-1 ${liked ? 'fill-red-500' : ''}`} />
                    {likesCount}
                </Button>

                <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    {post.commentsCount}
                </Button>
            </CardFooter>
        </Card>
    );
}