import { motion, useReducedMotion } from "motion/react";
import { techLogos } from "../data/techLogos.js";

// Posisi tiap logo di sekitar kartu ID (persen dari area kolom kanan).
const POSITIONS = [
  { left: "2%", top: "26%" },
  { left: "8%", top: "52%" },
  { left: "0%", top: "78%" },
  { right: "2%", top: "20%" },
  { right: "8%", top: "46%" },
  { right: "0%", top: "72%" },
];

export default function FloatingLogos() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 hidden md:block" aria-hidden="true">
      {techLogos.slice(0, POSITIONS.length).map((logo, i) => (
        <motion.div
          key={logo.name}
          className="absolute"
          style={POSITIONS[i]}
          initial={reduceMotion ? false : { opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.6 + i * 0.08 }}
        >
          <motion.div
            drag
            dragSnapToOrigin
            dragElastic={0.6}
            whileHover={{ scale: 1.12, rotate: i % 2 ? 6 : -6 }}
            whileDrag={{ scale: 1.15, cursor: "grabbing" }}
            className="group relative cursor-grab"
          >
            <div
              className="float-bob w-14 h-14 rounded-2xl bg-white border border-line shadow-[0_12px_30px_-12px_rgba(16,18,24,0.35)] flex items-center justify-center"
              style={{ animationDuration: `${3.2 + (i % 3) * 0.6}s`, animationDelay: `${i * 0.3}s` }}
            >
              <svg viewBox="0 0 24 24" className="w-7 h-7" fill={logo.color}>
                <path d={logo.path} />
              </svg>
            </div>
            <span className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] text-muted opacity-0 group-hover:opacity-100 transition-opacity">
              {logo.name}
            </span>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
