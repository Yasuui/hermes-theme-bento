import type { Metadata } from 'next';
import { Geist, Geist_Mono, Space_Grotesk, JetBrains_Mono, Inter } from 'next/font/google';
import './globals.css';
import { DashboardProvider } from '@/lib/dashboard-context';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Bento Dashboard — Hermes Agent Theme',
  description:
    'A premium, accessible Bento Grid dashboard theme for the Hermes Agent ecosystem. Dark mode, WCAG 2.1 AA, responsive design.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${inter.variable} antialiased`}
      >
        <DashboardProvider>{children}</DashboardProvider>
      </body>
    </html>
  );
}
