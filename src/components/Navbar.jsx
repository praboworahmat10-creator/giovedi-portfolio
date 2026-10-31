import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { navItems } from "../data/navigation.js";
import { profile } from "../data/profile.js";
import { MenuIcon, CloseIcon, DownloadIcon } from "./ui/Icons.jsx";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#home");

  // Blur hanya muncul setelah halaman di-scroll, tanpa garis pemisah.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Tandai section yang sedang terlihat.
  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Lapisan latar yang memudar ke bawah, jadi tidak ada batas tegas dengan latar.
          Sengaja tanpa backdrop-blur karena blur dihitung ulang tiap frame saat scroll. */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 -bottom-6 bg-gradient-to-b from-paper from-55% to-paper/0 transition-opacity duration-300 ${
          scrolled || isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Spacer agar navigasi tetap di tengah */}
          <div className="hidden md:block md:flex-1" aria-hidden="true" />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 p-1 rounded-full" aria-label="Navigasi Utama">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  active === item.href ? "text-white" : "text-ink-soft hover:text-ink"
                }`}
              >
                {active === item.href && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-ink"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{item.label}</span>
              </a>
            ))}
          </nav>

          {/* Desktop Action Button */}
          <div className="hidden md:flex md:flex-1 justify-end items-center gap-2">
            <a
              href={profile.cv}
              download
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full text-ink-soft hover:text-ink transition-colors"
            >
              <DownloadIcon className="w-4 h-4" />
              <span>CV</span>
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="inline-flex items-center px-4 py-2 text-sm font-semibold rounded-full bg-accent text-white hover:bg-accent-hover transition-colors"
            >
              Hubungi
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-1 ml-auto">
            <a
              href={profile.cv}
              download
              className="p-2 rounded-full text-ink-soft hover:text-ink"
              aria-label="Download CV"
            >
              <DownloadIcon className="w-5 h-5" />
            </a>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-full text-ink hover:bg-ink/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label={isOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
              aria-expanded={isOpen}
            >
              {isOpen ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden relative px-4 pb-6"
            aria-label="Navigasi Menu Mobile"
          >
            {navItems.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="flex items-baseline gap-3 py-3 border-b border-line text-2xl font-heading font-semibold text-ink"
              >
                <span className="font-mono text-xs text-accent">0{i + 1}</span>
                {item.label}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
