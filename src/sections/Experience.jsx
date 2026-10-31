import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { experience } from "../data/experience.js";
import { education } from "../data/education.js";
import SectionHeading from "../components/SectionHeading.jsx";
import Reveal from "../components/Reveal.jsx";

function Entry({ period, title, org, location, description, points = [], tags = [], meta }) {
  return (
    <Reveal className="relative grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-10 pl-8 md:pl-0 py-10 border-b border-line last:border-b-0">
      {/* Titik timeline */}
      <span className="absolute left-0 md:left-[calc(25%-5px)] top-12 w-[11px] h-[11px] rounded-full bg-paper border-2 border-accent" />

      <div className="md:col-span-3 md:pr-8">
        <p className="font-mono text-xs text-muted">{period}</p>
        {meta && <p className="mt-2 font-mono text-xs text-accent">{meta}</p>}
      </div>

      <div className="md:col-span-9 md:pl-6">
        <h3 className="text-2xl sm:text-[1.7rem] font-semibold tracking-tight leading-tight">{title}</h3>
        <p className="mt-1.5 text-base text-ink-soft">
          {org}
          {location && <span className="text-muted"> · {location}</span>}
        </p>
        {description && <p className="mt-4 text-base text-ink-soft leading-relaxed max-w-2xl">{description}</p>}
        {points.length > 0 && (
          <ul className="mt-4 space-y-2 max-w-2xl">
            {points.map((point) => (
              <li key={point} className="flex gap-3 text-[15px] text-ink-soft leading-relaxed">
                <span className="mt-[0.7em] h-px w-3 shrink-0 bg-ink/40" />
                {point}
              </li>
            ))}
          </ul>
        )}
        {tags.length > 0 && (
          <p className="mt-5 font-mono text-xs text-muted">{tags.join("  ·  ")}</p>
        )}
      </div>
    </Reveal>
  );
}

export default function Experience() {
  const listRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 70%", "end 60%"] });
  const lineScale = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="experience" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading index="02" label="Pengalaman" title="Tempat saya belajar sambil bekerja.">
          Dua kali magang dan satu penelitian tugas akhir, di bidang pengembangan web dan instalasi jaringan di lapangan.
        </SectionHeading>

        <div ref={listRef} className="relative">
          {/* Garis timeline: abu-abu sebagai jalur, biru tergambar mengikuti scroll */}
          <div className="absolute left-[5px] md:left-1/4 top-0 bottom-0 w-px bg-line" aria-hidden="true" />
          <motion.div
            className="absolute left-[5px] md:left-1/4 top-0 bottom-0 w-px bg-accent origin-top"
            style={{ scaleY: lineScale }}
            aria-hidden="true"
          />

          {experience.map((item) => (
            <Entry
              key={`${item.role}-${item.company}`}
              period={item.period}
              meta={item.category}
              title={item.role}
              org={item.company}
              description={item.description}
              points={item.points}
              tags={item.tags}
            />
          ))}

          {education.map((item) => (
            <Entry
              key={`${item.degree}-${item.institution}`}
              period={item.period}
              meta={item.score}
              title={item.degree}
              org={item.institution}
              location={item.location}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
