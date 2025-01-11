import "./globals.css";
import { Inter, Orbitron, Roboto_Mono } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" });
const robotoMono = Roboto_Mono({ subsets: ["latin"], variable: "--font-roboto-mono" });

export const metadata = {
  title: "a.i.ngel.cloud",
  description:
    "THIS IS A WEBSITE, THIS IS A SIMULATION, THIS IS A REFLECTION, THIS IS A MIRROR, THIS IS A STORY, THIS IS A SECRET, THIS IS A LIE, THIS IS A TRUTH, THIS IS A RIDDLE, THIS IS A CODE, THIS IS A SIGN, THIS IS A SYMBOL, THIS IS A METAPHOR, THIS IS A PARADOX, THIS IS A QUESTION, THIS IS AN ANSWER, THIS IS A SOLUTION, THIS IS A PROBLEM, THIS IS A CHALLENGE, THIS IS A JOURNEY, THIS IS A DESTINATION, THIS IS A BEGINNING, THIS IS AN END, THIS IS A CYCLE, THIS IS A CIRCLE, THIS IS A SPIRAL, THIS IS A MAZE, THIS IS A LABYRINTH, THIS IS A MATRIX, THIS IS A SYSTEM, THIS IS A NETWORK, THIS IS A WEB, THIS IS A TRAP, THIS IS A PRISON, THIS IS A CAGE, THIS IS",
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
