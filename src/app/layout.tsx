import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import '@/styles/tailwind.css';
import Navbar from '@/components/navbar';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Agent Validator',
  description: 'Agent Validator',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="fixed top-0 left-0 w-full h-full object-cover -z-10"
        >
          <source src="/background.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <Navbar />
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              animation: 'toast-slide-in-right 1s ease-out',  
              zIndex:50
            },
          }}
        />
      </body>
    </html>
  );
}
