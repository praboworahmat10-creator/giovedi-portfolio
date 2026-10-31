import { projects } from "../data/projects.js";
import SectionHeading from "../components/SectionHeading.jsx";
import Reveal from "../components/Reveal.jsx";
import CodeWindow from "../components/CodeWindow.jsx";
import { ExternalLinkIcon, GithubIcon } from "../components/ui/Icons.jsx";

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading index="03" label="Proyek" title="Yang sudah saya bangun.">
          Sistem presensi dari tugas akhir, aplikasi web saat magang, dan konfigurasi jaringan di lapangan.
        </SectionHeading>

        <div className="space-y-24 sm:space-y-32">
          {projects.map((project, i) => {
            const flipped = i % 2 === 1;
            return (
              <article
                key={project.title}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
              >
                <div className={`lg:col-span-5 ${flipped ? "lg:order-2" : ""}`}>
                  <Reveal>
                    <p className="font-mono text-xs text-muted flex items-center gap-3">
                      <span className="text-accent">P/{String(i + 1).padStart(2, "0")}</span>
                      <span>{project.period}</span>
                    </p>
                    <h3 className="mt-4 text-3xl sm:text-4xl font-bold tracking-[-0.02em] leading-[1.05]">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted">{project.subtitle}</p>
                  </Reveal>

                  <Reveal delay={0.08}>
                    <p className="mt-6 text-base text-ink-soft leading-relaxed">{project.description}</p>
                    {project.details?.length > 0 && (
                      <ul className="mt-5 space-y-2">
                        {project.details.map((detail) => (
                          <li key={detail} className="flex gap-3 text-[15px] text-ink-soft leading-relaxed">
                            <span className="mt-[0.7em] h-px w-3 shrink-0 bg-ink/40" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    )}
                  </Reveal>

                  <Reveal delay={0.14}>
                    <div className="mt-6 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-ink">
                      {project.stack.map((tech) => (
                        <span key={tech}>{tech}</span>
                      ))}
                    </div>
                    {(project.live || project.repo) && (
                      <div className="mt-6 flex gap-4 text-sm font-semibold">
                        {project.live && (
                          <a href={project.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-accent hover:underline">
                            Lihat demo <ExternalLinkIcon className="w-4 h-4" />
                          </a>
                        )}
                        {project.repo && (
                          <a href={project.repo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-ink hover:underline">
                            <GithubIcon className="w-4 h-4" /> Repository
                          </a>
                        )}
                      </div>
                    )}
                  </Reveal>
                </div>

                {project.code && (
                  <Reveal delay={0.1} y={40} className={`lg:col-span-7 ${flipped ? "lg:order-1" : ""}`}>
                    <div className={`transition-transform duration-500 hover:-translate-y-1 ${flipped ? "lg:-rotate-1" : "lg:rotate-1"} hover:rotate-0`}>
                      <CodeWindow file={project.code.file} lines={project.code.lines} />
                    </div>
                  </Reveal>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
