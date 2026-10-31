import { useState } from "react";
import { profile } from "../data/profile.js";
import SectionHeading from "../components/SectionHeading.jsx";
import Reveal from "../components/Reveal.jsx";
import { LinkedinIcon, GithubIcon, SendIcon } from "../components/ui/Icons.jsx";

const formspreeEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;

const inputClass =
  "w-full bg-transparent border-0 border-b py-3 text-base text-ink placeholder:text-muted/70 focus:outline-none focus:ring-0 transition-colors";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: null, message: "" });
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const validate = () => {
    const errs = {};
    if (formData.name.trim().length < 2) errs.name = "Nama minimal 2 karakter.";
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email.trim())) errs.email = "Format email tidak valid.";
    if (formData.message.trim().length < 10) errs.message = "Pesan minimal 10 karakter.";
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: null, message: "" });

    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    // Tanpa endpoint Formspree, buka aplikasi email pengunjung dengan pesan yang sudah terisi.
    if (!formspreeEndpoint) {
      const subject = encodeURIComponent(`Pesan dari ${formData.name}`);
      const body = encodeURIComponent(`${formData.message}\n\n${formData.name} (${formData.email})`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      setStatus({ type: "info", message: "Aplikasi email Anda sudah terbuka. Pesan baru terkirim setelah Anda menekan kirim di sana." });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error();
      setStatus({ type: "success", message: "Terima kasih, pesan Anda sudah terkirim." });
      setFormData({ name: "", email: "", message: "" });
      setErrors({});
    } catch {
      setStatus({ type: "error", message: `Pesan gagal terkirim. Silakan email langsung ke ${profile.email}.` });
    } finally {
      setIsSubmitting(false);
    }
  };

  const field = (name) =>
    `${inputClass} ${errors[name] ? "border-rose-500" : "border-ink/20 focus:border-accent"}`;

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading index="05" label="Kontak" title="Mari ngobrol.">
          Sedang mencari developer untuk tim Anda atau ingin diskusi proyek? Kirim email atau isi form di bawah.
        </SectionHeading>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-10">
          <div className="lg:col-start-4 lg:col-span-4">
            <Reveal>
              <a
                href={`mailto:${profile.email}`}
                className="group block text-xl sm:text-2xl font-heading font-semibold text-ink break-all"
              >
                <span className="bg-[linear-gradient(currentColor,currentColor)] bg-no-repeat bg-[length:0%_2px] bg-left-bottom group-hover:bg-[length:100%_2px] transition-[background-size] duration-500 group-hover:text-accent">
                  {profile.email}
                </span>
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="mt-3 font-mono text-xs text-muted hover:text-accent transition-colors"
              >
                {copied ? "tersalin ✓" : "salin email"}
              </button>
            </Reveal>

            <Reveal delay={0.08}>
              <dl className="mt-10 border-t border-ink">
                <div className="grid grid-cols-3 gap-4 py-3.5 border-b border-line">
                  <dt className="font-mono text-xs text-muted pt-0.5">Telepon</dt>
                  <dd className="col-span-2 text-sm font-medium">
                    <a href={`tel:${profile.phone}`} className="hover:text-accent">{profile.phone}</a>
                  </dd>
                </div>
                <div className="grid grid-cols-3 gap-4 py-3.5 border-b border-line">
                  <dt className="font-mono text-xs text-muted pt-0.5">Lokasi</dt>
                  <dd className="col-span-2 text-sm font-medium">{profile.address}, {profile.city}</dd>
                </div>
              </dl>
              <div className="mt-6 flex gap-2">
                {profile.socials?.linkedin && (
                  <a
                    href={profile.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-ink/15 text-sm font-medium hover:border-ink transition-colors"
                  >
                    <LinkedinIcon className="w-4 h-4" /> LinkedIn
                  </a>
                )}
                {profile.socials?.github && (
                  <a
                    href={profile.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-ink/15 text-sm font-medium hover:border-ink transition-colors"
                  >
                    <GithubIcon className="w-4 h-4" /> GitHub
                  </a>
                )}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="lg:col-span-5">
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <div>
                <label htmlFor="name" className="font-mono text-xs text-muted">Nama</label>
                <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} placeholder="Nama Anda atau perusahaan" className={field("name")} />
                {errors.name && <p className="text-xs text-rose-600 mt-1.5">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="font-mono text-xs text-muted">Email</label>
                <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="nama@email.com" className={field("email")} />
                {errors.email && <p className="text-xs text-rose-600 mt-1.5">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="message" className="font-mono text-xs text-muted">Pesan</label>
                <textarea id="message" name="message" rows={4} value={formData.message} onChange={handleChange} placeholder="Ceritakan posisi atau proyeknya..." className={`${field("message")} resize-y`} />
                {errors.message && <p className="text-xs text-rose-600 mt-1.5">{errors.message}</p>}
              </div>

              {status.type && (
                <p
                  role="status"
                  className={`text-sm ${status.type === "error" ? "text-rose-600" : status.type === "success" ? "text-emerald-700" : "text-ink-soft"}`}
                >
                  {status.message}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-ink text-white text-sm font-semibold hover:bg-accent transition-colors disabled:opacity-60"
              >
                {isSubmitting ? "Mengirim..." : "Kirim pesan"}
                <SendIcon className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
