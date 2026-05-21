'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/auth.context';
import { Button } from '@/components/ui/button';

export function Header() {
    const { user, logout } = useAuth();

    return (
        <header className="border-b sticky top-0 bg-background z-10">
            <div className="max-w-xl mx-auto px-4 py-3 flex items-center justify-between">
                <Link href="/feed" className="font-semibold hover:opacity-80 transition-opacity">
                    Social
                </Link>

                <div className="flex items-center gap-3">
                    <Link
                        href="/profile/me"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        @{user?.username}
                    </Link>
                    <Button variant="outline" size="sm" onClick={logout}>
                        Sair
                    </Button>
                </div>
            </div>
        </header>
    );
}