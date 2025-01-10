import "./globals.css";
import { Inter, Orbitron, Roboto_Mono } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" });
const robotoMono = Roboto_Mono({ subsets: ["latin"], variable: "--font-roboto-mono" });

export const metadata = {
  title: "a.i.ngel.world",
  description: "Y2K, chrome, techno-angel themed website",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${orbitron.variable} ${robotoMono.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
