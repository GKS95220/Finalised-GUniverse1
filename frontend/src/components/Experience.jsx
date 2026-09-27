import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";

const FRAME_COUNT = 192;
const frameUrl = (i) => `/frames/f${String(i + 1).padStart(4, "0")}.jpg`;

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
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);
  const imagesRef = useRef([]);
  const loadedFlagsRef = useRef(new Uint8Array(FRAME_COUNT));
  const frameRef = useRef(0);
  const [loaded, setLoaded] = useState(0);

  const draw = useCallback((idx) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[idx];
    if (!canvas || !img || !img.complete || !img.naturalWidth) return;
    const ctx = canvas.getContext("2d");
    const { width: cw, height: ch } = canvas;
    const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
    const w = img.naturalWidth * scale;
    const h = img.naturalHeight * scale;
    ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
  }, []);

  const drawNearest = useCallback(
    (idx) => {
      if (loadedFlagsRef.current[idx]) return draw(idx);
      for (let d = 1; d < FRAME_COUNT; d++) {
        if (idx - d >= 0 && loadedFlagsRef.current[idx - d]) return draw(idx - d);
        if (idx + d < FRAME_COUNT && loadedFlagsRef.current[idx + d]) return draw(idx + d);
      }
    },
    [draw]
  );

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = wrap.clientWidth * dpr;
    canvas.height = wrap.clientHeight * dpr;
    draw(frameRef.current);
  }, [draw]);

  useEffect(() => {
    const images = [];
    let count = 0;
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = frameUrl(i);
      img.onload = () => {
        loadedFlagsRef.current[i] = 1;
        count += 1;
        setLoaded(count);
        if (i === 0) draw(0);
        if (i === frameRef.current) draw(i);
      };
      images.push(img);
    }
    imagesRef.current = images;
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [draw, resize]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(v * (FRAME_COUNT - 1))));
    if (idx !== frameRef.current) {
      frameRef.current = idx;
      drawNearest(idx);
    }
  });

  return (
    <section ref={sectionRef} data-testid="experience-section" className="relative h-[300vh]">
      <div ref={wrapRef} className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <canvas
          ref={canvasRef}
          data-testid="experience-canvas"
          className="absolute inset-0 h-full w-full brightness-[0.6] contrast-[1.1] saturate-[1.35]"
        />
        <div className="pointer-events-none absolute inset-0 bg-[#050714]/45" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#050714] via-transparent to-[#050714]" />

        {loaded < 12 && (
          <div data-testid="experience-loading" className="absolute inset-0 flex items-center justify-center">
            <span className="font-mono-gu text-xs uppercase tracking-[0.25em] text-cyan-400/70">
              Loading experience…
            </span>
          </div>
        )}

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

        <div
          data-testid="experience-scroll-progress"
          className="absolute inset-x-0 bottom-0 h-[3px] bg-slate-800/60"
        >
          <motion.div
            style={{ scaleX: scrollYProgress }}
            className="h-full w-full origin-left bg-gradient-to-r from-cyan-400 via-sky-400 to-violet-500 shadow-[0_0_14px_rgba(0,242,254,0.7)]"
          />
        </div>
      </div>
    </section>
  );
}
