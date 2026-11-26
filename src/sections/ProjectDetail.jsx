import { useCallback, useEffect, useRef, useState } from "react";
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
  const imageGalleryRef = useRef(null);
  const hasArrowControls = project?.imageControls === "arrows";
  const [canScrollPrevious, setCanScrollPrevious] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateScrollControls = useCallback(() => {
    const gallery = imageGalleryRef.current;
    if (!gallery) return;

    setCanScrollPrevious(gallery.scrollLeft > 1);
    setCanScrollNext(gallery.scrollLeft + gallery.clientWidth < gallery.scrollWidth - 1);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  useEffect(() => {
    const gallery = imageGalleryRef.current;
    if (!hasArrowControls || !gallery) return;

    gallery.scrollLeft = 0;
    updateScrollControls();
    window.addEventListener("resize", updateScrollControls);

    return () => {
      window.removeEventListener("resize", updateScrollControls);
    };
  }, [hasArrowControls, slug, updateScrollControls]);

  const scrollGallery = (direction) => {
    const gallery = imageGalleryRef.current;
    if (!gallery) return;
    gallery.scrollBy({
      left: direction * gallery.clientWidth,
      behavior: "smooth",
    });
  };

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

        {project.images?.length > 0 && (
          <section aria-label="Tampilan aplikasi" className="mt-14 border-t border-line pt-10">
            <p className="font-mono text-xs text-accent">03 / Tampilan aplikasi</p>
            {project.imageLayout === "horizontal" && !hasArrowControls && (
              <p className="mt-2 text-sm text-muted">Geser ke samping untuk melihat screenshot lainnya.</p>
            )}
            <div
              className={`mt-6 ${
                hasArrowControls ? "grid grid-cols-[44px_minmax(0,1fr)_44px] items-center gap-3" : ""
              }`}
            >
              {hasArrowControls && (
                <button
                  type="button"
                  aria-label="Screenshot sebelumnya"
                  onClick={() => scrollGallery(-1)}
                  disabled={!canScrollPrevious}
                  className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-line text-xl text-ink transition-colors hover:border-accent hover:text-accent active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-line disabled:hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
                >
                  <span aria-hidden="true">←</span>
                </button>
              )}
              <div
                ref={imageGalleryRef}
                role={project.imageLayout === "horizontal" ? "region" : undefined}
                aria-label={project.imageLayout === "horizontal" ? "Galeri screenshot, geser horizontal" : undefined}
                tabIndex={project.imageLayout === "horizontal" ? 0 : undefined}
                onScroll={hasArrowControls ? updateScrollControls : undefined}
                className={`${
                  project.imageLayout === "horizontal"
                    ? `flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4 ${
                        hasArrowControls ? "scrollbar-hidden" : "gap-4 pb-4"
                      }`
                    : "grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
                }`}
              >
                {project.images.map((image) => (
                  <figure
                    key={image.src}
                    className={
                      project.imageLayout === "horizontal"
                        ? hasArrowControls
                          ? "w-full shrink-0 snap-start"
                          : "w-[min(88vw,52rem)] shrink-0 snap-start"
                        : image.layout === "desktop"
                          ? "md:col-span-2 xl:col-span-3"
                          : ""
                    }
                  >
                    <div
                      className={`flex items-center justify-center overflow-hidden ${
                        image.layout === "mobile" ? "" : "rounded-xl border border-line bg-[#141416]"
                      } ${
                        project.imageLayout === "horizontal"
                          ? "aspect-video"
                          : image.layout === "desktop"
                            ? "aspect-video"
                            : "h-[32rem] sm:h-[36rem]"
                      }`}
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        width={image.width}
                        height={image.height}
                        loading="lazy"
                        style={image.objectPosition ? { objectPosition: image.objectPosition } : undefined}
                        className={`h-full w-full ${
                          project.imageLayout === "horizontal"
                            ? "object-contain"
                            : image.layout === "desktop"
                              ? "object-cover"
                              : "object-contain"
                        }`}
                      />
                    </div>
                    <figcaption className="mt-3 text-sm text-muted">{image.caption}</figcaption>
                  </figure>
                ))}
              </div>
              {hasArrowControls && (
                <button
                  type="button"
                  aria-label="Screenshot berikutnya"
                  onClick={() => scrollGallery(1)}
                  disabled={!canScrollNext}
                  className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-line text-xl text-ink transition-colors hover:border-accent hover:text-accent active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-line disabled:hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
                >
                  <span aria-hidden="true">→</span>
                </button>
              )}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
