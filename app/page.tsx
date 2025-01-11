import Background3D from "./components/Background3D";
import ChromeSection from "./components/ChromeSection";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import MatrixSection from "./components/MatrixSection";
import Y2KSection from "./components/Y2KSection";
import Console from "./components/Console";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <Background3D />
      <div className="relative z-10">
        <HeroSection />
        <MatrixSection />
        <Y2KSection />
        <ChromeSection />
        <Footer />
        <Console />
      </div>
    </main>
  );
}
