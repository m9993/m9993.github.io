import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Muntasir Alam",
  description:
    "Welcome to my portfolio website! Explore my software development projects and experience. Find out how I might assist you as a developer.",
  icons: {
    icon: "/profile.jpg", // Path from public folder
  },
  images: [
    {
      url: "/profile.jpg", // put in public folder
      width: 1200,
      height: 630,
      alt: "Preview Image",
    },
  ],
  siteName: "Muntasir Alam",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
