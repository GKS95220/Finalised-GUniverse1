import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Experience() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-14%", "14%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.28, 1.18]);

  return (
    <section
      ref={ref}
      data-testid="experience-section"
      className="relative flex h-[72vh] items-center overflow-hidden border-y border-slate-800/70"
    >
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <video
          data-testid="experience-video"
          src="/guniverse-headset.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover brightness-[0.55] contrast-[1.1] saturate-[1.35]"
        />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-[#050714]/55" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#050714]/90 via-[#050714]/30 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#050714] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#050714] to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-10">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-mono-gu text-xs uppercase tracking-[0.25em] text-cyan-400"
        >
          The Experience
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 max-w-xl font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl"
        >
          Step inside the <span className="text-gradient drop-shadow-[0_0_18px_rgba(0,242,254,0.3)]">future of care.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-5 max-w-md text-sm leading-relaxed text-slate-300 sm:text-base"
        >
          Every GUniverse session is a living 3D world — rendered in real time, guided by your clinician,
          and shaped around the patient inside it.
        </motion.p>
      </div>
    </section>
  );
}
