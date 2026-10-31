import { motion, useReducedMotion } from "motion/react";

// Elemen muncul (fade + naik) saat masuk viewport.
export default function Reveal({ children, delay = 0, y = 28, as = "div", className = "", ...rest }) {
  const reduceMotion = useReducedMotion();
  const Component = motion[as];

  return (
    <Component
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </Component>
  );
}
