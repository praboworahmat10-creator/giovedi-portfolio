import { motion, useReducedMotion } from "motion/react";
import { profile } from "../data/profile.js";
import { education } from "../data/education.js";
import { tools } from "../data/tools.js";
import SectionHeading from "../components/SectionHeading.jsx";
import Reveal from "../components/Reveal.jsx";

const SKILL_GROUPS = [
  { key: "engineering", code: "A" },
  { key: "creative", code: "B" },
  { key: "productivity", code: "C" },
];

export default function About() {
  const { about } = profile;
  const reduceMotion = useReducedMotion();
  const degree = education[0];

  const facts = [
    { label: "Domisili", value: `${profile.address}, ${profile.city}` },
    { label: "Pendidikan", value: `${degree.degree}, ${degree.institution}` },
    { label: "Angkatan", value: degree.period },
    { label: "IPK", value: degree.score },
    { label: "Fokus", value: "Fullstack Developer & Mobile Developer" },
  ];

  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading index="01" label="Tentang" title={<>Developer yang juga<br className="hidden sm:block" /> paham jaringannya.</>} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10">
          <div className="lg:col-start-4 lg:col-span-5">
            <Reveal>
              <p className="text-xl sm:text-2xl font-heading font-medium leading-snug text-ink">
                {about.headline}
              </p>
            </Reveal>
            {about.paragraphs.map((paragraph, i) => (
              <Reveal key={i} delay={0.08 + i * 0.06}>
                <p className="mt-5 text-base text-ink-soft leading-relaxed">{paragraph}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15} className="lg:col-span-4">
            <dl className="border-t border-ink">
              {facts.map((fact) => (
                <div key={fact.label} className="grid grid-cols-3 gap-4 py-3.5 border-b border-line">
                  <dt className="font-mono text-xs text-muted pt-0.5">{fact.label}</dt>
                  <dd className="col-span-2 text-sm font-medium text-ink">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* Keahlian */}
        <div className="mt-28">
          <Reveal>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">Keahlian</h3>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {SKILL_GROUPS.map(({ key, code }, groupIndex) => {
              const group = tools[key];
              return (
                <Reveal key={key} delay={groupIndex * 0.08}>
                  <div className="flex items-baseline justify-between border-b border-ink pb-3">
                    <h4 className="text-lg font-semibold">{group.title}</h4>
                    <span className="font-mono text-xs text-muted">
                      {code}/{String(group.items.length).padStart(2, "0")}
                    </span>
                  </div>
                  <ul>
                    {group.items.map((item, i) => (
                      <motion.li
                        key={item.name}
                        initial={reduceMotion ? false : { opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, delay: 0.15 + i * 0.05 }}
                        className="group relative py-3.5 border-b border-line"
                      >
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 h-0 w-[3px] bg-accent transition-all duration-300 group-hover:h-2/3" />
                        <div className="transition-transform duration-300 group-hover:translate-x-3">
                          <p className="text-[15px] font-semibold text-ink group-hover:text-accent transition-colors">
                            {item.name}
                          </p>
                          <p className="text-sm text-muted mt-0.5">{item.description}</p>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
