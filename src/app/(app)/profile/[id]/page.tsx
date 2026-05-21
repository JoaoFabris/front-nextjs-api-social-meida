'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useAuth } from '@/contexts/auth.context';
import { usersService } from '@/services/users.service';
import { User, Post } from '@/types';
import { PostCard } from '@/components/post-card';
import { Header } from '@/components/header';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function UserProfilePage() {
  const { id } = useParams<{ id: string }>();
  const { user: currentUser } = useAuth();

  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [followers, setFollowers] = useState<any[]>([]);
  const [following, setFollowing] = useState<any[]>([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) loadProfile();
  }, [id]);

  async function loadProfile() {
    try {
      const [userRes, postsRes, followersRes, followingRes] = await Promise.all([
        usersService.getById(id),
        usersService.getPostsByUser(id),
        usersService.getFollowers(id),
        usersService.getFollowing(id),
      ]);

      setUser(userRes);
      setPosts(postsRes.data ?? []);
      setFollowers(followersRes ?? []);
      setFollowing(followingRes ?? []);

      // verifica se o usuário atual já segue esse perfil
      const alreadyFollowing = followersRes?.some(
        (f: any) => f.follower?.id === currentUser?.id
      );
      setIsFollowing(alreadyFollowing);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleFollow() {
    try {
      if (isFollowing) {
        await usersService.unfollow(id);
        setFollowers((prev) => prev.filter((f) => f.follower?.id !== currentUser?.id));
      } else {
        await usersService.follow(id);
        setFollowers((prev) => [...prev, { follower: currentUser }]);
      }
      setIsFollowing(!isFollowing);
    } catch {
      // silencia erro
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <p className="text-center py-8 text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <p className="text-center py-8 text-muted-foreground">Usuário não encontrado.</p>
      </div>
    );
  }

  const isOwnProfile = currentUser?.id === id;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-xl mx-auto py-8 px-4 space-y-6">

        {/* card do perfil */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                <AvatarFallback className="text-xl">
                  {user.username?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-xl font-semibold">@{user.username}</h1>
                {user.bio && (
                  <p className="text-sm text-muted-foreground">{user.bio}</p>
                )}
              </div>

              {/* botão seguir — só aparece se não for o próprio perfil */}
              {!isOwnProfile && (
                <Button
                  variant={isFollowing ? 'outline' : 'default'}
                  size="sm"
                  onClick={handleFollow}
                >
                  {isFollowing ? 'Seguindo' : 'Seguir'}
                </Button>
              )}
            </div>

            {/* stats */}
            <div className="flex gap-6 text-sm">
              <div className="text-center">
                <p className="font-semibold">{posts.length}</p>
                <p className="text-muted-foreground">posts</p>
              </div>
              <div className="text-center">
                <p className="font-semibold">{followers.length}</p>
                <p className="text-muted-foreground">seguidores</p>
              </div>
              <div className="text-center">
                <p className="font-semibold">{following.length}</p>
                <p className="text-muted-foreground">seguindo</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* posts do usuário */}
        <div className="space-y-4">
          {posts.length === 0 ? (
            <p className="text-center text-muted-foreground">Nenhum post ainda.</p>
          ) : (
            posts.map((post) => (
              <PostCard key={post.id} post={post} currentUserId={currentUser?.id} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}