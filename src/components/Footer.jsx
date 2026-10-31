import { profile } from "../data/profile.js";

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-ink py-8 flex flex-col sm:flex-row gap-4 sm:items-center justify-between font-mono text-xs text-muted">
          <p>
            © {CURRENT_YEAR} {profile.name}
          </p>
          <p>{profile.address}, {profile.city}</p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="self-start sm:self-auto text-ink hover:text-accent transition-colors"
          >
            Kembali ke atas ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
