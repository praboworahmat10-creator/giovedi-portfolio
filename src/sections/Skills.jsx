import { motion, useReducedMotion } from "motion/react";
import {
  SiLaravel,
  SiPhp,
  SiJavascript,
  SiReact,
  SiHtml5,
  SiCss,
  SiMysql,
  SiPostgresql,
  SiGo,
  SiPython,
  SiTypescript,
  SiKotlin,
  SiSwift,
  SiCisco,
} from "react-icons/si";
import {
  FaBug,
  FaArrowRotateRight,
  FaBolt,
  FaBrain,
  FaDatabase,
  FaApple,
  FaMobileScreen,
  FaComments,
  FaUsers,
  FaPuzzlePiece,
  FaArrowsRotate,
  FaClipboardList,
  FaHashtag,
} from "react-icons/fa6";
import {
  HiOutlineCpuChip,
  HiOutlineSquares2X2,
  HiOutlineWrenchScrewdriver,
  HiOutlineDevicePhoneMobile,
  HiOutlineSparkles,
} from "react-icons/hi2";
import { skillGroups } from "../data/skills.js";
import SectionHeading from "../components/SectionHeading.jsx";
import Reveal from "../components/Reveal.jsx";
import CountUp from "../components/reactbits/CountUp.jsx";

const SKILL_COLORS = {
  Laravel: "#ff2d20",
  PHP: "#777bb4",
  JavaScript: "#f7df1e",
  React: "#61dafb",
  HTML: "#e34f26",
  CSS: "#663399",
  "C#": "#512bd4",
  MySQL: "#4479a1",
  PostgreSQL: "#336791",
  Golang: "#00add8",
  Networking: "#1ba0d7",
  "Database Management": "#f97316",
  Debugging: "#ef4444",
  Migration: "#22c55e",
  Automation: "#f59e0b",
  LLM: "#a78bfa",
  Python: "#3776ab",
  MVVC: "#60a5fa",
  Kotlin: "#7f52ff",
  SwiftUI: "#f05138",
  Xcode: "#147efb",
  "React Native": "#61dafb",
  TypeScript: "#3178c6",
  Communication: "#38bdf8",
  Teamwork: "#22c55e",
  "Problem Solving": "#f97316",
  Adaptability: "#a78bfa",
  "Project Planning": "#fbbf24",
};

const SKILL_ICONS = {
  Laravel: SiLaravel,
  PHP: SiPhp,
  JavaScript: SiJavascript,
  React: SiReact,
  HTML: SiHtml5,
  CSS: SiCss,
  "C#": FaHashtag,
  MySQL: SiMysql,
  PostgreSQL: SiPostgresql,
  Golang: SiGo,
  Networking: SiCisco,
  "Database Management": FaDatabase,
  Debugging: FaBug,
  Migration: FaArrowRotateRight,
  Automation: FaBolt,
  LLM: FaBrain,
  Python: SiPython,
  MVVC: HiOutlineSquares2X2,
  Kotlin: SiKotlin,
  SwiftUI: SiSwift,
  Xcode: FaApple,
  "React Native": FaMobileScreen,
  TypeScript: SiTypescript,
  Communication: FaComments,
  Teamwork: FaUsers,
  "Problem Solving": FaPuzzlePiece,
  Adaptability: FaArrowsRotate,
  "Project Planning": FaClipboardList,
};

export default function Skills() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="skills" className="relative isolate py-16 sm:py-20">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 mx-auto h-[420px] max-w-6xl rounded-[50%] bg-[radial-gradient(ellipse_at_top,rgba(249,115,22,0.055),transparent_68%)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading index="03" label="Keahlian" title="Skill yang saya gunakan.">
          Gabungan kemampuan teknis, pengembangan aplikasi, dan kolaborasi untuk menyelesaikan pekerjaan secara efektif.
        </SectionHeading>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-8">
          {skillGroups.map((group, groupIndex) => (
            <Reveal
              key={group.key}
              delay={groupIndex * 0.08}
              className={group.key === "soft" ? "xl:col-span-12" : "xl:col-span-6"}
            >
              <div className="skill-card group/card h-full rounded-2xl border border-line/90 bg-[#111114]/90 p-5 sm:p-7 transition-[border-color,transform,box-shadow] duration-500 hover:-translate-y-1 hover:border-accent/30 hover:shadow-[0_24px_60px_-38px_rgba(249,115,22,0.55)]">
                <div className="flex items-start justify-between gap-4 border-b border-line pb-5">
                  <div>
                    <p className="font-mono text-xs text-accent">S/{group.index}</p>
                    <h3 className="mt-2 text-2xl font-heading font-bold">{group.title}</h3>
                  </div>
                  <span className="font-mono text-xs text-muted">{String(group.items.length).padStart(2, "0")}</span>
                </div>

                <p className="mt-4 text-sm text-ink-soft leading-relaxed max-w-2xl">
                  {group.description}
                </p>

                <div className={group.key === "soft" ? "mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-x-6 gap-y-5" : "mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5"}>
                  {group.items.map((skill, skillIndex) => {
                    const SkillIcon = SKILL_ICONS[skill.name];
                    return (
                    <div key={skill.name} className="group">
                      <div className="mb-2 flex items-center gap-3">
                        <span
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-line bg-[#17171b] text-[17px] transition-[border-color,background-color,transform,filter] duration-300 group-hover:-translate-y-0.5 group-hover:border-current/30 group-hover:bg-[#1d1d22] group-hover:drop-shadow-[0_4px_10px_currentColor]"
                          style={{ color: SKILL_COLORS[skill.name] || "#f97316" }}
                          aria-hidden="true"
                        >
                          {SkillIcon ? <SkillIcon /> : <HiOutlineCpuChip />}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <p className="truncate text-sm font-semibold text-ink">{skill.name}</p>
                            <span className="font-mono text-xs text-muted">
                              {reduceMotion ? `${skill.level}%` : <CountUp to={skill.level} suffix="%" duration={1.4} delay={skillIndex * 0.03} trigger="view" />}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-line/70">
                        <motion.div
                          className="h-full rounded-full bg-accent origin-left"
                          initial={reduceMotion ? false : { scaleX: 0 }}
                          animate={{ scaleX: skill.level / 100 }}
                          transition={{ duration: 1.1, delay: 0.08 + skillIndex * 0.035, ease: [0.22, 1, 0.36, 1] }}
                        />
                      </div>
                    </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
