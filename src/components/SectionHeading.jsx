import Reveal from "./Reveal.jsx";

// Judul section bernomor + paragraf pendek opsional.
export default function SectionHeading({ index, label, title, children }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 mb-14 sm:mb-20">
      <Reveal className="lg:col-span-3">
        <p className="font-mono text-xs text-muted flex items-center gap-3">
          <span className="text-accent">{index}</span>
          <span className="h-px w-8 bg-line" />
          {label && <span>{label}</span>}
        </p>
      </Reveal>
      <div className="lg:col-span-9">
        <Reveal delay={0.05}>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.03em] leading-[1.02]">
            {title}
          </h2>
        </Reveal>
        {children && (
          <Reveal delay={0.12}>
            <p className="mt-5 max-w-2xl text-base sm:text-lg text-ink-soft leading-relaxed">
              {children}
            </p>
          </Reveal>
        )}
      </div>
    </div>
  );
}
