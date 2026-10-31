import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

// Mengetik dan menghapus kata secara bergantian.
export default function Typewriter({ words, typeSpeed = 70, deleteSpeed = 35, pause = 1600 }) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;
    const word = words[index % words.length];
    let timeout;

    if (!deleting && text === word) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      timeout = setTimeout(() => {
        setDeleting(false);
        setIndex((i) => i + 1);
      }, 250);
    } else {
      timeout = setTimeout(
        () => setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)),
        deleting ? deleteSpeed : typeSpeed
      );
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, index, words, typeSpeed, deleteSpeed, pause, reduceMotion]);

  return (
    <span>
      {reduceMotion ? words[0] : text}
      <span className="caret inline-block w-[0.55ch] h-[1.05em] -mb-[0.15em] ml-0.5 bg-accent" aria-hidden="true" />
    </span>
  );
}
