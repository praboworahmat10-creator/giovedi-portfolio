import { useEffect } from "react";
import { projects } from "../data/projects.js";
import { ExternalLinkIcon, GithubIcon } from "../components/ui/Icons.jsx";

export function projectSlug(project) {
  return project.title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function ProjectDetail({ slug }) {
  const project = projects.find((item) => projectSlug(item) === slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  const goBack = () => {
    window.location.hash = "projects";
  };

  if (!project) {
    return (
      <main className="min-h-screen px-4 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-xs text-accent">404 / Project</p>
          <h1 className="mt-4 text-4xl font-bold">Proyek tidak ditemukan.</h1>
          <button type="button" onClick={goBack} className="mt-8 rounded-full border border-line px-5 py-3 text-sm font-semibold hover:border-accent">
            Kembali ke proyek
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-5xl">
        <button
          type="button"
          onClick={goBack}
          className="mb-10 inline-flex items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-accent"
        >
          <span aria-hidden="true">←</span> Kembali ke proyek
        </button>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <header className="lg:col-span-8">
            <p className="font-mono text-xs text-accent">{project.period}</p>
            <h1 className="mt-4 text-4xl font-bold leading-[1.05] sm:text-6xl">{project.title}</h1>
            <p className="mt-4 text-base text-muted">{project.subtitle}</p>
          </header>

          <aside className="lg:col-span-4 lg:border-l lg:border-line lg:pl-8">
            <p className="font-mono text-xs text-muted">Technology</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span key={tech} className="rounded-full border border-line px-3 py-1.5 font-mono text-[11px] text-ink-soft">
                  {tech}
                </span>
              ))}
            </div>

            {(project.live || project.repo) && (
              <div className="mt-6 flex flex-wrap gap-3">
                {project.live && (
                  <a href={project.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-[#0b0b0d] hover:bg-accent-hover">
                    Lihat live <ExternalLinkIcon className="h-4 w-4" />
                  </a>
                )}
                {project.repo && (
                  <a href={project.repo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-semibold hover:border-accent hover:text-accent">
                    <GithubIcon className="h-4 w-4" /> Repository
                  </a>
                )}
              </div>
            )}
          </aside>
        </div>

        <section className="mt-14 grid grid-cols-1 gap-10 border-t border-line pt-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="font-mono text-xs text-accent">01 / Ringkasan</p>
          </div>
          <div className="lg:col-span-8">
            <p className="max-w-3xl text-lg leading-relaxed text-left text-ink-soft">{project.description}</p>
          </div>

          {project.details?.length > 0 && (
            <>
              <div className="lg:col-span-4">
                <p className="font-mono text-xs text-accent">02 / Poin utama</p>
              </div>
              <div className="lg:col-span-8">
                <ul className="space-y-4">
                  {project.details.map((detail, index) => (
                    <li key={detail} className="grid grid-cols-[44px_1fr] gap-3 border-b border-line pb-4 text-[15px] leading-relaxed text-ink-soft">
                      <span className="font-mono text-xs text-muted">{String(index + 1).padStart(2, "0")}</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
}
