import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// Entrance yang konsisten untuk seluruh section, dijalankan oleh GSAP ScrollTrigger.
export default function Reveal({ children, delay = 0, y = 28, as = "div", className = "", ...rest }) {
  const elementRef = useRef(null);
  const Component = as;

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) return;

      gsap.set(elementRef.current, { autoAlpha: 0, y });
      gsap.to(elementRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: elementRef.current,
          start: "top 88%",
          once: true,
        },
      });
    },
    { scope: elementRef, dependencies: [delay, y] }
  );

  return (
    <Component ref={elementRef} className={className} {...rest}>
      {children}
    </Component>
  );
}
