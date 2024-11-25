import { Sour_Gummy, IBM_Plex_Mono } from "next/font/google"
import "./globals.css";

const SourGummy = Sour_Gummy({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sourGummy",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibmPlexMono",
  display: "swap",
});


export const metadata = {
  title: "Scrape Me",
  description: "Created by cheemda man",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${SourGummy.variable} ${ibmPlexMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
