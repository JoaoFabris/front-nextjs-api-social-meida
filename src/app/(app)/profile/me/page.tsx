'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/auth.context';
import { usersService } from '@/services/users.service';
import { Post } from '@/types';
import { PostCard } from '@/components/post-card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Header } from '@/components/header';

export default function MyProfilePage() {
  const { user, logout } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [followers, setFollowers] = useState<any[]>([]);
  const [following, setFollowing] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ bio: '', website: '' });

  useEffect(() => {
    if (user) loadProfile();
  }, [user]);

  async function loadProfile() {
    try {
      const [postsRes, followersRes, followingRes] = await Promise.all([
        usersService.getPostsByUser(user!.id),
        usersService.getFollowers(user!.id),
        usersService.getFollowing(user!.id),
      ]);
      setPosts(postsRes.data ?? []);
      setFollowers(followersRes);
      setFollowing(followingRes);
      setForm({ bio: user?.bio ?? '', website: user?.website ?? '' });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSave() {
    try {
      await usersService.update({ id: user!.id, ...form });
      setIsEditing(false);
    } catch {
      // erro silencioso
    }
  }

  if (isLoading) {
    return <p className="text-center py-8 text-muted-foreground">Carregando...</p>;
  }

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
                  {user?.username?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-xl font-semibold">@{user?.username}</h1>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? 'Cancelar' : 'Editar'}
              </Button>
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

            {/* bio */}
            {!isEditing && user?.bio && (
              <p className="text-sm">{user.bio}</p>
            )}

            {/* formulário de edição */}
            {isEditing && (
              <div className="space-y-3">
                <div className="space-y-1">
                  <Label>Bio</Label>
                  <Input
                    value={form.bio}
                    onChange={(e) => setForm({ ...form, bio: e.target.value })}
                    placeholder="Conte sobre você"
                  />
                </div>
                <div className="space-y-1">
                  <Label>Website</Label>
                  <Input
                    value={form.website}
                    onChange={(e) => setForm({ ...form, website: e.target.value })}
                    placeholder="https://seusite.com"
                  />
                </div>
                <Button onClick={handleSave} className="w-full">
                  Salvar
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* posts do usuário */}
        <div className="space-y-4">
          {posts.length === 0 ? (
            <p className="text-center text-muted-foreground">Nenhum post ainda.</p>
          ) : (
            posts.map((post) => (
              <PostCard key={post.id} post={post} currentUserId={user?.id} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}