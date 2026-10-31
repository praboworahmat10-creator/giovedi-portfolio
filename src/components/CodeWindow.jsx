import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

const TOKEN_RE = /(\/\/.*|#.*)|('[^']*'?|"[^"]*"?)|(\$[A-Za-z_]\w*)|\b(function|return|if|add|set)\b|(\/[a-z]+(?:\s\/?[a-z]+)*)|(\b\d+(?:\.\d+)?[A-Z]?\b)/g;

// Pewarnaan sintaks sederhana. Aman untuk teks yang baru setengah terketik.
function highlight(text) {
  const parts = [];
  let last = 0;
  for (const match of text.matchAll(TOKEN_RE)) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    const [token, comment, string, variable, keyword, path, number] = match;
    const color = comment
      ? "text-[#7d8296] italic"
      : string
        ? "text-[#9ee6a8]"
        : variable
          ? "text-[#8fb4ff]"
          : keyword
            ? "text-[#f0a3ff]"
            : path
              ? "text-[#ffd479]"
              : number
                ? "text-[#ffb38a]"
                : "";
    parts.push(
      <span key={match.index} className={color}>
        {token}
      </span>
    );
    last = match.index + token.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

export default function CodeWindow({ file, lines, speed = 9 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const reduceMotion = useReducedMotion();
  const total = lines.reduce((sum, line) => sum + line.length + 1, 0);
  const [typed, setTyped] = useState(0);
  const shown = reduceMotion ? total : typed;

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const id = setInterval(() => {
      setTyped((n) => {
        if (n >= total) {
          clearInterval(id);
          return n;
        }
        return n + 2;
      });
    }, speed);
    return () => clearInterval(id);
  }, [inView, reduceMotion, total, speed]);

  const done = shown >= total;
  // Posisi karakter awal tiap baris dalam total teks.
  const starts = lines.reduce((acc, line, i) => [...acc, i === 0 ? 0 : acc[i - 1] + lines[i - 1].length + 1], []);

  return (
    <div ref={ref} className="rounded-2xl bg-[#14161d] text-[#e6e8ef] shadow-[0_30px_60px_-30px_rgba(16,18,24,0.6)] overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-xs text-white/60">{file}</span>
        <span className="ml-auto font-mono text-[10px] text-white/35">ilustrasi</span>
      </div>
      <pre className="px-4 py-5 overflow-x-auto font-mono text-[12.5px] leading-[1.75]">
        {lines.map((line, i) => {
          const remaining = shown - starts[i];
          const visible = line.slice(0, Math.max(0, remaining));
          const isCurrent = !done && remaining >= 0 && remaining <= line.length;
          return (
            <div key={i} className="flex">
              <span className="select-none w-7 shrink-0 text-right pr-4 text-white/25">{i + 1}</span>
              <code className="whitespace-pre">
                {highlight(visible)}
                {isCurrent && <span className="caret inline-block w-[7px] h-[1.1em] -mb-[0.2em] bg-accent" />}
              </code>
            </div>
          );
        })}
      </pre>
    </div>
  );
}
