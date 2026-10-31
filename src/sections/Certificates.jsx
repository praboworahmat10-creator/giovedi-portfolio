import { certificates } from "../data/certificates.js";
import SectionHeading from "../components/SectionHeading.jsx";
import Reveal from "../components/Reveal.jsx";
import { ExternalLinkIcon } from "../components/ui/Icons.jsx";

export default function Certificates() {
  return (
    <section id="certificates" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading index="04" label="Sertifikasi" title="Sertifikat & pelatihan." />

        <ol className="lg:ml-[25%] border-t border-ink">
          {certificates.map((cert, i) => {
            const Row = cert.link ? "a" : "div";
            return (
              <Reveal as="li" key={cert.title} delay={i * 0.06}>
                <Row
                  {...(cert.link ? { href: cert.link, target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group grid grid-cols-12 gap-4 items-baseline py-6 border-b border-line"
                >
                  <span className="col-span-2 sm:col-span-1 font-mono text-xs text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="col-span-10 sm:col-span-8">
                    <p className="text-lg sm:text-xl font-heading font-semibold text-ink transition-transform duration-300 group-hover:translate-x-2">
                      {cert.title}
                    </p>
                    {cert.issuer && <p className="mt-1 text-sm text-muted">{cert.issuer}</p>}
                  </div>
                  <span className="col-span-12 sm:col-span-3 sm:text-right font-mono text-xs text-muted pl-[16.66%] sm:pl-0">
                    {cert.date}
                    {cert.link && <ExternalLinkIcon className="inline w-3.5 h-3.5 ml-2 text-accent" />}
                  </span>
                </Row>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
