import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { profile } from "../data/profile.js";
import { tools } from "../data/tools.js";
import {
  DownloadIcon,
  MailIcon,
  LinkedinIcon,
  GithubIcon,
  PhoneIcon,
} from "../components/ui/Icons.jsx";
import SplitText from "../components/reactbits/SplitText.jsx";
import CountUp from "../components/reactbits/CountUp.jsx";
import HangingIdCard from "../components/HangingIdCard.jsx";
import Typewriter from "../components/Typewriter.jsx";
import FloatingLogos from "../components/FloatingLogos.jsx";

const ROLES = ["Fullstack Developer", "Laravel & React", "REST API & MySQL", "MikroTik & Networking"];

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

function Marquee({ items, reverse = false }) {
  // Daftar digandakan agar loop tidak terlihat sambungannya.
  const loop = [...items, ...items];
  return (
    <div className="marquee overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div className={`marquee-track flex w-max gap-10 py-3 ${reverse ? "reverse" : ""}`}>
        {loop.map((item, i) => (
          <span
            key={`${item}-${i}`}
            aria-hidden={i >= items.length}
            className="flex items-center gap-10 text-2xl sm:text-3xl font-heading font-semibold text-ink/80 whitespace-nowrap"
          >
            {item}
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  const [copied, setCopied] = useState(false);
  const reduceMotion = useReducedMotion();
  const anim = (delay) => (reduceMotion ? {} : fadeUp(delay));

  const copyPhone = () => {
    navigator.clipboard.writeText(profile.phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const skillNames = [...tools.engineering.items, ...tools.creative.items, ...tools.productivity.items].map(
    (item) => item.name
  );
  const half = Math.ceil(skillNames.length / 2);

  return (
    <section id="home" className="relative pt-8 pb-16 sm:pt-12 sm:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* Left Column */}
          <div className="lg:col-span-7 lg:pt-16 flex flex-col items-start text-left">
            <motion.p {...anim(0)} className="font-mono text-xs sm:text-sm text-muted flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              {profile.availability}
            </motion.p>

            <h1 className="mt-6 text-[2.75rem] sm:text-7xl lg:text-[5.5rem] font-bold tracking-[-0.04em] leading-[0.95]">
              <SplitText
                text={profile.name}
                className="text-[2.75rem] sm:text-7xl lg:text-[5.5rem] font-bold font-heading tracking-[-0.04em] leading-[0.95] text-ink"
                splitType="chars"
                effect="rise"
                trigger="load"
                delay={22}
                duration={0.8}
                staggerFrom="start"
                textAlign="left"
                tag="span"
              />
            </h1>

            <motion.p {...anim(0.35)} className="mt-6 font-mono text-lg sm:text-2xl text-ink">
              <span className="text-muted">~/</span> <Typewriter words={ROLES} />
            </motion.p>

            <motion.p {...anim(0.45)} className="mt-6 text-base sm:text-lg text-ink-soft leading-relaxed max-w-xl">
              {profile.tagline}
            </motion.p>

            <motion.div {...anim(0.55)} className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href={profile.cv}
                download
                className="group inline-flex items-center gap-2.5 pl-5 pr-6 py-3.5 rounded-full bg-accent text-[#0b0b0d] text-sm font-semibold hover:bg-accent-hover transition-colors"
              >
                <DownloadIcon className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                Download CV
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2.5 px-5 py-3.5 rounded-full border border-ink/15 text-ink text-sm font-semibold hover:border-ink transition-colors"
              >
                <MailIcon className="w-4 h-4" />
                Kirim Email
              </a>
              <button
                type="button"
                onClick={copyPhone}
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-full text-ink-soft text-sm font-medium hover:text-ink transition-colors"
                title="Salin nomor telepon"
              >
                <PhoneIcon className="w-4 h-4" />
                <span className="font-mono">{copied ? "tersalin ✓" : profile.phone}</span>
              </button>
              <div className="flex items-center gap-1">
                {profile.socials?.linkedin && (
                  <a
                    href={profile.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full text-ink-soft hover:text-accent hover:bg-accent-muted transition-colors"
                    aria-label="LinkedIn"
                  >
                    <LinkedinIcon className="w-5 h-5" />
                  </a>
                )}
                {profile.socials?.github && (
                  <a
                    href={profile.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full text-ink-soft hover:text-ink hover:bg-ink/5 transition-colors"
                    aria-label="GitHub"
                  >
                    <GithubIcon className="w-5 h-5" />
                  </a>
                )}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Interactive Hanging ID Card */}
          <motion.div
            {...anim(0.2)}
            className="lg:col-span-5 relative flex justify-center"
          >
            <FloatingLogos />
            <HangingIdCard
              profile={profile}
              skills={["Laravel", "JavaScript", "React", "MySQL", "PostgreSQL", "Mobile Dev", "Web Dev", "Node.js"]}
            />
          </motion.div>
        </div>

        {/* Stats strip */}
        {profile.stats?.length > 0 && (
          <dl className="mt-20 grid grid-cols-2 lg:grid-cols-4 border-y border-line">
            {profile.stats.map((stat, i) => {
              const numericMatch = String(stat.value).match(/^(\d+(\.\d+)?)/);
              const numericVal = numericMatch ? parseFloat(numericMatch[1]) : null;
              const suffix = numericMatch ? String(stat.value).slice(numericMatch[0].length) : "";
              return (
                <div
                  key={stat.label}
                  className={`py-7 px-1 sm:px-6 ${i % 2 === 1 ? "pl-5 border-l border-line" : ""} ${
                    i > 0 ? "lg:pl-6 lg:border-l lg:border-line" : "lg:pl-0"
                  } ${i > 1 ? "border-t border-line lg:border-t-0" : ""}`}
                >
                  <dt className="font-mono text-xs text-muted">{stat.label}</dt>
                  <dd className="mt-2 text-4xl sm:text-5xl font-heading font-bold tracking-tight text-ink">
                    {numericVal !== null ? (
                      <CountUp
                        from={0}
                        to={numericVal}
                        suffix={suffix}
                        duration={1.8}
                        delay={0.1}
                        easing="expo"
                        trigger="view"
                        className="font-heading font-bold tracking-tight text-ink"
                      />
                    ) : (
                      stat.value
                    )}
                  </dd>
                  <dd className="mt-1 text-sm text-ink-soft">{stat.desc}</dd>
                </div>
              );
            })}
          </dl>
        )}
      </div>

      {/* Skill marquee */}
      <div className="mt-14 space-y-1" aria-label="Daftar keahlian">
        <Marquee items={skillNames.slice(0, half)} />
        <Marquee items={skillNames.slice(half)} reverse />
      </div>
    </section>
  );
}
