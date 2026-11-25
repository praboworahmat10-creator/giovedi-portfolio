import { useEffect, useState } from "react";
import AnimatedBackground from "./components/AnimatedBackground.jsx";
import ScrollProgress from "./components/ScrollProgress.jsx";
import Navbar from "./components/Navbar.jsx";
import Hero from "./sections/Hero.jsx";
import About from "./sections/About.jsx";
import Experience from "./sections/Experience.jsx";
import Projects from "./sections/Projects.jsx";
import Certificates from "./sections/Certificates.jsx";
import Contact from "./sections/Contact.jsx";
import Footer from "./components/Footer.jsx";
import Skills from "./sections/Skills.jsx";
import ProjectDetail from "./sections/ProjectDetail.jsx";

export default function App() {
  const [detailSlug, setDetailSlug] = useState("");

  useEffect(() => {
    const syncRoute = () => {
      const hash = window.location.hash.replace(/^#/, "");
      setDetailSlug(hash.startsWith("project/") ? hash.slice("project/".length) : "");
    };

    syncRoute();
    window.addEventListener("hashchange", syncRoute);
    return () => window.removeEventListener("hashchange", syncRoute);
  }, []);

  if (detailSlug) {
    return (
      <div className="relative min-h-screen text-ink font-sans">
        <AnimatedBackground />
        <Navbar />
        <ProjectDetail slug={detailSlug} />
        <Footer />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen text-ink font-sans">
      <AnimatedBackground />
      <ScrollProgress />
      <Navbar />
      <main className="w-full">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Certificates />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
