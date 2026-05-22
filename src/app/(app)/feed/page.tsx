'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/auth.context';
import { postsService } from '@/services/posts.service';
import { PostCard } from '@/components/post-card';
import { CreatePost } from '@/components/create-post';
import { Button } from '@/components/ui/button';
import { Post } from '@/types';
import { Header } from '@/components/header';
import { AiChat } from '@/components/AiChat';

export default function FeedPage() {
  const { user, logout } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    loadFeed();
  }, []);

  async function loadFeed(currentPage = 1) {
    try {
      // tenta o feed personalizado primeiro
      // se vazio, carrega todos os posts
      let response = await postsService.getFeed(currentPage);

      if (response.data.length === 0) {
        response = await postsService.getAll(currentPage);
      }

      if (currentPage === 1) {
        setPosts(response.data);
      } else {
        setPosts((prev) => [...prev, ...response.data]);
      }

      setHasNextPage(response.meta.hasNextPage);
    } catch {
      // erro silencioso
    } finally {
      setIsLoading(false);
    }
  }

  function handlePostCreated(post: Post) {
    setPosts((prev) => [post, ...prev]);
  }

  function handleLoadMore() {
    const nextPage = page + 1;
    setPage(nextPage);
    loadFeed(nextPage);
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Conteúdo */}
      <main className="max-w-xl mx-auto px-4 py-6 space-y-4">
        {/* Criar post */}
        <CreatePost onPostCreated={handlePostCreated} />

        {/* Lista de posts */}
        {isLoading ? (
          <div className="text-center py-10 text-muted-foreground">
            Carregando...
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground">
            Nenhum post ainda. Que tal criar o primeiro?
          </div>
        ) : (
          posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              currentUserId={user?.id}
            />
          ))
        )}

        {/* Carregar mais */}
        {hasNextPage && (
          <div className="text-center pt-4">
            <Button variant="outline" onClick={handleLoadMore}>
              Carregar mais
            </Button>
          </div>
        )}
      </main>
      <AiChat /> {/* 👈 adiciona aqui */}
    </div>
  );
}