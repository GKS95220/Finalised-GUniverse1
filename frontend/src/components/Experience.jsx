import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const Beat = ({ progress, range, overline, title, sub }) => {
  const [a, b, c] = range;
  const opacity = useTransform(progress, [a, b, c], [0, 1, 0]);
  const y = useTransform(progress, [a, b, c], [40, 0, -40]);
  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0 flex items-center justify-center px-6">
      <div className="max-w-2xl text-center">
        <p className="font-mono-gu text-xs uppercase tracking-[0.25em] text-cyan-300 drop-shadow-[0_0_10px_rgba(0,242,254,0.5)]">
          {overline}
        </p>
        <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)] sm:text-4xl lg:text-5xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-slate-200 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] sm:text-base">
          {sub}
        </p>
      </div>
    </motion.div>
  );
};

export default function Experience() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const targetRef = useRef(0);
  const [duration, setDuration] = useState(0);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    targetRef.current = v;
  });

  useEffect(() => {
    let raf;
    const tick = () => {
      const vid = videoRef.current;
      if (vid && duration > 0 && !vid.seeking) {
        const target = targetRef.current * duration;
        const diff = target - vid.currentTime;
        if (Math.abs(diff) > 0.03) vid.currentTime += diff * 0.25;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [duration]);

  return (
    <section ref={sectionRef} data-testid="experience-section" className="relative h-[300vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <video
          ref={videoRef}
          data-testid="experience-video"
          src="/guniverse-headset.mp4"
          muted
          playsInline
          preload="auto"
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
          className="absolute inset-0 h-full w-full object-cover brightness-[0.6] contrast-[1.1] saturate-[1.35]"
        />
        <div className="pointer-events-none absolute inset-0 bg-[#050714]/45" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#050714] via-transparent to-[#050714]" />

        <Beat
          progress={scrollYProgress}
          range={[0, 0.12, 0.3]}
          overline="The Experience"
          title={<>Step inside the <span className="text-gradient drop-shadow-[0_0_18px_rgba(0,242,254,0.3)]">future of care.</span></>}
          sub="Scroll to move through the world your patients will enter."
        />
        <Beat
          progress={scrollYProgress}
          range={[0.35, 0.48, 0.65]}
          overline="Real-Time Rendering"
          title="Every session is a living 3D world."
          sub="Photorealistic multi-sensory scenes rendered live on standalone hardware — no wires, no PCs."
        />
        <Beat
          progress={scrollYProgress}
          range={[0.7, 0.85, 1]}
          overline="Clinician-Guided"
          title="Shaped around the patient inside it."
          sub="Your clinician sees what you see and tunes the world in real time, moment by moment."
        />
      </div>
    </section>
  );
}
