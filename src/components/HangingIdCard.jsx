import { useEffect, useRef, useState } from "react";
import {
  motion,
  animate,
  useMotionValue,
  useSpring,
  useTransform,
  useVelocity,
  useReducedMotion,
  useInView,
} from "motion/react";
import { LocationIcon } from "./ui/Icons.jsx";

const STAGE_WIDTH = 360;
const STRAP_LENGTH = 92;
const CARD_WIDTH = 320;
const CARD_YEAR = new Date().getFullYear();

// Kartu ID yang tergantung pada tali: bisa ditarik, berayun, lalu memantul kembali.
export default function HangingIdCard({ profile, skills = [] }) {
  const reduceMotion = useReducedMotion();
  const [dragging, setDragging] = useState(false);
  const cardRef = useRef(null);
  const rectRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const stageRef = useRef(null);
  // Ayunan idle hanya berjalan saat kartu terlihat, supaya tidak membebani scroll.
  const inView = useInView(stageRef);
  const idle = !reduceMotion && !dragging && inView;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xVelocity = useVelocity(x);

  // Badan kartu mengikuti arah tali, ditambah sedikit "lag" dari kecepatan gerak.
  const rawRotate = useTransform([x, y, xVelocity], ([px, py, vx]) => {
    const angle = (-Math.atan2(px, STRAP_LENGTH + py) * 180) / Math.PI;
    return Math.max(-40, Math.min(40, angle + vx * 0.015));
  });
  const rotate = useSpring(rawRotate, { stiffness: 140, damping: 9, mass: 0.6 });

  // Tali: dari titik gantung ke klip di atas kartu.
  const strapPath = useTransform([x, y], ([px, py]) => {
    const cx = STAGE_WIDTH / 2;
    const endX = cx + px;
    const endY = STRAP_LENGTH + py;
    const sag = Math.min(Math.abs(px) * 0.15, 18);
    return `M ${cx} 0 Q ${(cx + endX) / 2 - sag} ${endY / 2 + sag} ${endX} ${endY}`;
  });

  // 3D tilt mengikuti kursor saat hover.
  const tiltX = useSpring(0, { stiffness: 200, damping: 18 });
  const tiltY = useSpring(0, { stiffness: 200, damping: 18 });
  const shineX = useMotionValue(50);
  const shineY = useMotionValue(30);
  const shine = useTransform(
    [shineX, shineY],
    ([sx, sy]) =>
      `radial-gradient(circle at ${sx}% ${sy}%, rgba(255,255,255,0.22), transparent 55%)`
  );

  const handlePointerMove = (e) => {
    if (dragging || reduceMotion || !cardRef.current) return;
    // Ukuran kartu dibaca sekali saat kursor masuk, bukan di setiap gerakan.
    const rect = (rectRef.current ??= cardRef.current.getBoundingClientRect());
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    tiltY.set((px - 0.5) * 16);
    tiltX.set((0.5 - py) * 16);
    shineX.set(px * 100);
    shineY.set(py * 100);
  };

  const resetTilt = () => {
    rectRef.current = null;
    setHovered(false);
    tiltX.set(0);
    tiltY.set(0);
  };

  const handleDragEnd = (_, info) => {
    setDragging(false);
    const spring = { type: "spring", stiffness: 180, damping: 7, mass: 0.8 };
    animate(x, 0, { ...spring, velocity: info.velocity.x });
    animate(y, 0, { ...spring, velocity: info.velocity.y });
  };

  // Sapaan kecil saat pertama tampil: kartu jatuh dan berayun.
  useEffect(() => {
    if (reduceMotion) return;
    y.set(-60);
    x.set(-40);
    const spring = { type: "spring", stiffness: 120, damping: 6, delay: 0.3 };
    const ax = animate(x, 0, spring);
    const ay = animate(y, 0, spring);
    return () => {
      ax.stop();
      ay.stop();
    };
  }, [reduceMotion, x, y]);

  return (
    <div ref={stageRef} className="relative select-none" style={{ width: STAGE_WIDTH, maxWidth: "100%" }}>
      <motion.div
        className="relative mx-auto"
        style={{ width: STAGE_WIDTH, maxWidth: "100%", paddingTop: STRAP_LENGTH, transformOrigin: "50% 0%" }}
        animate={idle ? { rotate: [-0.7, 0.7, -0.7] } : { rotate: 0 }}
        transition={idle ? { duration: 7, repeat: Infinity, ease: "easeInOut" } : { duration: 0.3 }}
      >
        {/* Titik gantung */}
        <div className="absolute left-1/2 -top-2 -translate-x-1/2 z-20 w-8 h-4 rounded-full bg-slate-300 border border-slate-400/60 shadow-inner" />

        {/* Tali lanyard */}
        <svg
          className="absolute inset-0 overflow-visible pointer-events-none z-0"
          width={STAGE_WIDTH}
          height={STRAP_LENGTH}
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="strap-gradient" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2={STRAP_LENGTH}>
              <stop offset="0%" stopColor="#1f38d6" />
              <stop offset="100%" stopColor="#2f4dff" />
            </linearGradient>
          </defs>
          <motion.path d={strapPath} stroke="url(#strap-gradient)" strokeWidth="16" strokeLinecap="round" fill="none" />
          <motion.path
            d={strapPath}
            stroke="rgba(255,255,255,0.7)"
            strokeWidth="1.5"
            strokeDasharray="6 8"
            fill="none"
          />
        </svg>

        {/* Kartu */}
        <motion.div
          drag
          dragMomentum={false}
          dragElastic={0.15}
          dragConstraints={{ left: -160, right: 160, top: -80, bottom: 140 }}
          onDragStart={() => {
            setDragging(true);
            resetTilt();
          }}
          onDragEnd={handleDragEnd}
          whileDrag={{ scale: 1.03, cursor: "grabbing" }}
          className="relative z-10 mx-auto cursor-grab"
          style={{
            x,
            y,
            rotate,
            width: CARD_WIDTH,
            transformOrigin: "50% 0%",
            touchAction: "none",
            willChange: "transform",
          }}
        >
          {/* Klip logam */}
          <div className="absolute left-1/2 -top-5 -translate-x-1/2 z-20 flex flex-col items-center">
            <div className="w-7 h-5 rounded-t-lg border-4 border-b-0 border-slate-400" />
            <div className="w-14 h-4 rounded-md bg-gradient-to-b from-slate-300 to-slate-400 shadow-sm" />
          </div>

          <motion.div
            ref={cardRef}
            onPointerEnter={() => setHovered(true)}
            onPointerMove={handlePointerMove}
            onPointerLeave={resetTilt}
            style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 900 }}
            className="relative overflow-hidden rounded-3xl bg-[#1b1b1f] border border-[#3a3a40] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.65)]"
          >
            {/* Header */}
            <div className="relative h-24 bg-[linear-gradient(135deg,#242428,#1c1c20)] border-b border-[#45454b]">
                            <div className="absolute left-0 right-0 bottom-0 h-1 bg-accent" />
              <p className="absolute top-4 left-5 text-[10px] font-mono font-bold tracking-[0.2em] text-white/80">
                DEVELOPER ID
              </p>
              <span className="absolute top-4 right-5 text-[10px] font-mono font-bold text-white/90 bg-white/15 px-2 py-0.5 rounded">
                {CARD_YEAR}
              </span>
            </div>

            {/* Foto */}
            <div className="relative z-10 flex justify-center -mt-12">
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt={`Foto ${profile.name}`}
                  draggable={false}
                  className="w-32 h-40 object-cover object-top rounded-2xl border-4 border-[#e5e5e5] shadow-[0_16px_28px_-16px_rgba(0,0,0,0.85)] bg-[#27272a]"
                />
              ) : (
                <div className="w-32 h-40 rounded-2xl border-4 border-[#e5e5e5] shadow-md bg-accent" />
              )}
            </div>

            {/* Identitas */}
            <div className="px-6 pt-4 pb-5 text-center">
              <h2 className="text-lg font-bold font-heading tracking-tight text-ink leading-tight">
                {profile.name}
              </h2>
              <p className="mt-1 text-sm font-semibold text-accent">{profile.title}</p>
              <p className="mt-1 text-[11px] text-[#a7a7ae] font-medium"

>                S1 Teknik Informatika • Universitas Budi Luhur              </p>

              {skills.length > 0 && (
                <div className="mt-4 flex flex-wrap justify-center gap-1.5">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-paper text-ink-soft border border-line"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-4 pt-3 border-t border-dashed border-[#3f3f46] flex items-center justify-between text-[11px]">
                <span className="inline-flex items-center gap-1 text-[#a1a1aa]">
                  <LocationIcon className="w-3 h-3 text-slate-400" />
                  {profile.address}, Tangerang
                </span>
                <span className="inline-flex items-center gap-1.5 font-semibold text-accent">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Open to work
                </span>
              </div>

              {/* Barcode dekoratif */}
              <div className="mt-3 flex items-end justify-center gap-[2px] h-6 opacity-70" aria-hidden="true">
                {"1101001011101001101011100101101".split("").map((bit, i) => (
                  <span key={i} className={`bg-[#52525b] ${bit === "1" ? "w-[2px]" : "w-px"} h-full`} />
                ))}
              </div>
            </div>

            {/* Kilau: hanya dirender saat hover, tanpa blend mode supaya ringan saat kartu digerakkan */}
            {hovered && !dragging && (
              <motion.div className="pointer-events-none absolute inset-0" style={{ background: shine }} />
            )}
          </motion.div>
        </motion.div>
      </motion.div>

      <p className="mt-3 text-center text-[10px] font-mono uppercase tracking-[0.18em] text-muted/70">
        Interactive profile
      </p>
    </div>
  );
}
