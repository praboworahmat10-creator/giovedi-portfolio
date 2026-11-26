import { useMemo, useState } from "react";
import { projects } from "../data/projects.js";
import SectionHeading from "../components/SectionHeading.jsx";
import Reveal from "../components/Reveal.jsx";
import { ExternalLinkIcon, GithubIcon } from "../components/ui/Icons.jsx";
import { projectSlug } from "./ProjectDetail.jsx";

const categories = ["Semua", "Web", "E-Commerce", "Jaringan"];

function categoryFor(project) {
  if (project.stack.some((item) => ["MikroTik", "Ruijie", "LTE/4G/5G", "Failover"].includes(item))) return "Jaringan";
  if (project.title.includes("E-Commerce")) return "E-Commerce";
  return "Web";
}

function ProjectPreview({ project, index }) {
  const category = categoryFor(project);
  const previewImage = project.images?.[0];

  return (
    <div className="relative h-52 overflow-hidden border-b border-line bg-[#141416]">
      {previewImage ? (
        <img
          src={previewImage.src}
          alt={`Pratinjau ${project.title}`}
          width={previewImage.width}
          height={previewImage.height}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
      ) : (
        <>
          <div className="absolute inset-0 opacity-70 [background-image:linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] [background-size:32px_32px]" />
          <div className="absolute -right-10 -top-16 h-44 w-44 rounded-full border border-accent/15" />
          <div className="absolute -right-4 -top-10 h-28 w-28 rounded-full border border-accent/10" />
        </>
      )}

      <div className={`relative flex h-full flex-col justify-between p-5 sm:p-6 ${previewImage ? "bg-gradient-to-t from-black/75 via-black/10 to-black/20" : ""}`}>
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] tracking-[0.16em] text-accent">
            P/{String(index + 1).padStart(2, "0")}
          </span>
          <span className="rounded-full border border-white/10 bg-black/50 px-2.5 py-1 font-mono text-[10px] text-ink-soft">
            {category}
          </span>
        </div>

        <div className="absolute inset-x-5 bottom-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">{project.subtitle}</p>
        </div>
      </div>

      <span className="absolute bottom-0 right-5 h-12 w-px bg-accent/55" />
    </div>
  );
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("Semua");

  const filteredProjects = useMemo(
    () => activeCategory === "Semua" ? projects : projects.filter((project) => categoryFor(project) === activeCategory),
    [activeCategory]
  );

  function openProject(project) {
    window.location.hash = `project/${projectSlug(project)}`;
  }

  return (
    <section id="projects" className="relative py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading index="04" label="Proyek" title="Karya yang sudah saya bangun.">
          Sistem presensi, aplikasi web, E-Commerce, dan konfigurasi jaringan yang pernah saya kerjakan.
        </SectionHeading>

        <div className="mb-8 flex flex-wrap items-center gap-2" aria-label="Filter kategori proyek">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-4 py-2 font-mono text-xs transition-colors ${activeCategory === category ? "bg-accent text-[#0b0b0d]" : "border border-line/80 text-muted hover:border-ink/30 hover:text-ink"}`}
              aria-pressed={activeCategory === category}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredProjects.map((project) => {
            const originalIndex = projects.indexOf(project);
            return (
              <Reveal key={project.title} delay={(originalIndex % 3) * 0.05}>
                <article
                  role="button"
                  tabIndex={0}
                  onClick={() => openProject(project)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      openProject(project);
                    }
                  }}
                  className="group h-full cursor-pointer overflow-hidden rounded-2xl border border-line/90 bg-[#111114] transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-1 hover:border-ink/25 hover:shadow-[0_28px_70px_-44px_rgba(0,0,0,0.95)]"
                >
                  <ProjectPreview project={project} index={originalIndex} />
                  <div className="p-5 sm:p-6">
                    <div className="flex items-center justify-between gap-4">
                      <p className="font-mono text-[11px] text-muted">{project.period}</p>
                      <span className="h-px w-10 bg-line group-hover:w-14 group-hover:bg-accent/60 transition-all duration-500" />
                    </div>

                    <h3 className="mt-4 text-xl font-heading font-bold leading-tight">{project.title}</h3>

                    <p className="mt-4 line-clamp-3 text-[15px] leading-[1.65] text-left text-ink-soft">
                      {project.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {project.stack.slice(0, 4).map((tech) => (
                        <span key={tech} className="text-[11px] text-muted">
                          {tech}<span className="ml-1.5 text-line">/</span>
                        </span>
                      ))}
                    </div>

                    {(project.live || project.repo) ? (
                      <div className="mt-5 flex gap-5 border-t border-line pt-4 text-sm font-semibold">
                        {project.live && (
                          <a href={project.live} target="_blank" rel="noopener noreferrer" onClick={(event) => event.stopPropagation()} className="inline-flex items-center gap-1.5 text-accent hover:underline">
                            Lihat demo <ExternalLinkIcon className="w-4 h-4" />
                          </a>
                        )}
                        {project.repo && (
                          <a href={project.repo} target="_blank" rel="noopener noreferrer" onClick={(event) => event.stopPropagation()} className="inline-flex items-center gap-1.5 text-ink hover:text-accent transition-colors">
                            <GithubIcon className="w-4 h-4" /> Repository
                          </a>
                        )}
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            openProject(project);
                          }}
                          className="ml-auto text-ink-soft hover:text-accent transition-colors"
                        >
                          Lihat detail →
                        </button>
                      </div>
                    ) : (
                      <div className="mt-5 flex border-t border-line pt-4 text-sm font-semibold">
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            openProject(project);
                          }}
                          className="ml-auto text-ink-soft hover:text-accent transition-colors"
                        >
                          Lihat detail →
                        </button>
                      </div>
                    )}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
