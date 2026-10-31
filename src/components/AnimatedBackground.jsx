import { useEffect, useRef } from "react";

export default function AnimatedBackground() {
  const litRef = useRef(null);

  const innerRef = useRef(null);

  // Lingkaran sorotan mengikuti kursor, sementara grid di dalamnya digeser balik agar tetap sejajar.
  // Keduanya hanya memakai transform sehingga browser tidak perlu menggambar ulang.
  useEffect(() => {
    let frame = 0;
    const handleMove = (e) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const lit = litRef.current;
        const inner = innerRef.current;
        if (!lit || !inner) return;
        const ox = e.clientX - 280;
        const oy = e.clientY - 280;
        lit.style.transform = `translate3d(${ox}px, ${oy}px, 0)`;
        inner.style.transform = `translate3d(${-ox}px, ${-oy}px, 0)`;
        lit.style.opacity = "1";
      });
    };
    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", handleMove);
    };
  }, []);

  return (
    <div className="bg-anim" aria-hidden="true">
      <div className="bg-mesh" />
      <div className="bg-grid" />
      <div ref={litRef} className="bg-grid-lit">
        <div ref={innerRef} className="bg-grid-lit-inner" />
      </div>
    </div>
  );
}
