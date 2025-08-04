import type { Metadata } from "next";
import { Inter, IBM_Plex_Sans_Thai } from "next/font/google";
import "./globals.css"
import logo from '../public/spotify_logo.png';

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const main_font = IBM_Plex_Sans_Thai({
  subsets: ["thai"],
  weight: "400",
})

export const metadata: Metadata = {
  title: "sana bank",
  description: "sana banking testing project",
  icons: {
    icon: logo.src
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${main_font.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
