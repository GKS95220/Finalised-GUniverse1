import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, PlayCircle, Sparkles } from "lucide-react";
import HeroCanvas from "@/components/HeroCanvas";
import PitchModal from "@/components/PitchModal";

export const RevealLine = ({ children, delay, className }) => (
  <span className="block overflow-hidden pb-1">
    <motion.span
      className={`block ${className || ""}`}
      initial={{ y: "115%" }}
      animate={{ y: 0 }}
      transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.span>
  </span>
);

export default function Hero() {
  const ref = useRef(null);
  const [pitchOpen, setPitchOpen] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const videoY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section id="top" ref={ref} data-testid="hero-section" className="relative flex min-h-screen items-center overflow-hidden">
      <div className="absolute inset-0 grid-texture opacity-60" />
      <div className="absolute inset-0 hero-glow" />
      <HeroCanvas />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#050714] to-transparent" />

      <motion.div style={{ opacity }} className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-28 pb-20 lg:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div style={{ y }}>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 px-4 py-1.5 backdrop-blur-md"
            >
              <Sparkles size={14} className="text-cyan-400" />
              <span className="font-mono-gu text-xs uppercase tracking-[0.2em] text-cyan-300">
                XR · Spatial Computing · Digital Therapeutics
              </span>
            </motion.div>

            <h1 data-testid="hero-headline" className="font-display text-4xl font-extrabold leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-[4rem]">
              <RevealLine delay={0.45}>Transforming Healthcare</RevealLine>
              <RevealLine delay={0.58}>& Education Through</RevealLine>
              <RevealLine delay={0.71} className="text-gradient drop-shadow-[0_0_18px_rgba(0,242,254,0.25)]">
                Spatial Computing
              </RevealLine>
            </h1>

            <motion.p
              data-testid="hero-subheadline"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.05 }}
              className="mt-7 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg"
            >
              GUniverse delivers interactive, evidence-backed XR digital therapeutics and immersive learning
              environments designed for clinical impact and seamless multi-platform access.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.2 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <a
                href="#platform"
                data-testid="hero-explore-platform-btn"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 px-7 py-3.5 text-sm font-semibold text-[#050714] transition-all duration-300 hover:shadow-[0_0_32px_rgba(0,242,254,0.5)] hover:brightness-110"
              >
                Explore Platform
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <button
                onClick={() => setPitchOpen(true)}
                data-testid="hero-view-pitch-btn"
                className="group inline-flex items-center gap-2 rounded-full border border-slate-600/70 bg-slate-900/40 px-7 py-3.5 text-sm font-semibold text-slate-200 backdrop-blur-md transition-all duration-300 hover:border-cyan-400/60 hover:text-cyan-300 hover:shadow-[0_0_20px_rgba(0,242,254,0.15)]"
              >
                <PlayCircle size={16} className="text-cyan-400" />
                View Pitch Highlights
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3"
            >
              {["Meta Quest 3S Native", "Non-Pharmacological", "Non-Biometric Architecture"].map((t) => (
                <span key={t} className="flex items-center gap-2 font-mono-gu text-xs uppercase tracking-[0.15em] text-slate-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,242,254,0.8)]" />
                  {t}
                </span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            style={{ y: videoY }}
            initial={{ opacity: 0, scale: 0.92, rotateY: -10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.3, delay: 1.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative [perspective:1200px]"
          >
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-tr from-cyan-500/25 via-transparent to-violet-500/30 blur-3xl" />
              <div
                data-testid="hero-headset-video-frame"
                className="relative overflow-hidden rounded-3xl border border-cyan-500/25 shadow-[0_0_60px_rgba(0,242,254,0.12)]"
              >
                <video
                  data-testid="hero-headset-video"
                  src="/guniverse-headset.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="aspect-[4/3] w-full object-cover brightness-[0.8] contrast-[1.05] saturate-[1.25]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#050714]/60 via-transparent to-violet-900/30" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050714]/75 via-transparent to-transparent" />
                <span className="absolute right-4 top-4 flex items-center gap-2 rounded-full border border-cyan-500/40 bg-[#050714]/70 px-3 py-1.5 font-mono-gu text-[10px] uppercase tracking-[0.18em] text-cyan-300 backdrop-blur-md">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,242,254,0.9)]" />
                  Realtime Render
                </span>
                <span className="absolute bottom-4 left-4 rounded-full border border-violet-500/40 bg-[#050714]/70 px-3 py-1.5 font-mono-gu text-[10px] uppercase tracking-[0.18em] text-violet-300 backdrop-blur-md">
                  GUniverse Engine · Meta Quest 3S
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <PitchModal open={pitchOpen} onClose={() => setPitchOpen(false)} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-slate-600/70 p-1.5">
          <motion.div
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-2 w-1 rounded-full bg-cyan-400"
          />
        </div>
      </motion.div>
    </section>
  );
}
