import type { Metadata } from 'next';
import { AuthProvider } from '@/contexts/auth.context';
import './globals.css';

export const metadata: Metadata = {
  title: 'Social Media',
  description: 'Rede social construída com Next.js e NestJS',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}