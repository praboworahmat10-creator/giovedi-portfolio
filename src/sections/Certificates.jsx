import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { certificates } from "../data/certificates.js";
import SectionHeading from "../components/SectionHeading.jsx";
import Reveal from "../components/Reveal.jsx";
import { CloseIcon } from "../components/ui/Icons.jsx";

function CertificateCard({ cert, index, onOpen }) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <figure className="group">
      {cert.image ? (
        <button
          type="button"
          onClick={onOpen}
          className="block w-full overflow-hidden rounded-2xl border border-line bg-[#1c1c20] shadow-[0_20px_40px_-24px_rgba(0,0,0,0.65)] cursor-zoom-in"
          aria-label={`Perbesar sertifikat ${cert.title}`}
        >
          <motion.img
            layoutId={`cert-${cert.image}`}
            src={cert.image}
            alt={`Sertifikat ${cert.title}`}
            loading="lazy"
            className="w-full aspect-[1600/1236] object-contain bg-white transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </button>
      ) : (
        <div className="w-full aspect-[1600/1236] rounded-2xl border border-dashed border-line bg-[#1c1c20]/90 flex items-center justify-center p-6 text-center">
          <p className="font-mono text-xs text-muted">Gambar sertifikat menyusul</p>
        </div>
      )}

      <figcaption className="mt-4 flex gap-4">
        <span className="font-mono text-xs text-accent pt-1">{number}</span>
        <div>
          <p className="text-lg font-heading font-semibold text-ink leading-snug">{cert.title}</p>
          {(cert.issuer || cert.date) && (
            <p className="mt-1 text-sm text-muted">{[cert.issuer, cert.date].filter(Boolean).join(" · ")}</p>
          )}
          {cert.credentialId && <p className="mt-1 font-mono text-[11px] text-muted">No. {cert.credentialId}</p>}
        </div>
      </figcaption>
    </figure>
  );
}

export default function Certificates() {
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <section id="certificates" className="relative py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading index="04" label="Sertifikasi" title="Sertifikat & pelatihan." />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {certificates.map((cert, i) => (
            <Reveal key={cert.title} delay={i * 0.06}>
              <CertificateCard cert={cert} index={i} onOpen={() => setActive(cert)} />
            </Reveal>
          ))}
        </div>
      </div>

      {/* Tampilan sertifikat ukuran penuh */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-10 bg-ink/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
          >
            <motion.img
              layoutId={`cert-${active.image}`}
              src={active.image}
              alt={`Sertifikat ${active.title}`}
              className="max-h-full max-w-full rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              type="button"
              onClick={() => setActive(null)}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-[#17171a] text-ink border border-line hover:border-accent hover:text-accent transition-colors"
              aria-label="Tutup"
            >
              <CloseIcon className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
