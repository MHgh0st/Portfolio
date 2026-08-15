"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

type SectionGeometryProps = {
  variant:
    | "hero"
    | "selected-work"
    | "case-study-salma"
    | "case-study-graphnext"
    | "what-i-do"
    | "about"
    | "stack"
    | "contact";
  scrollYProgress?: MotionValue<number>;
};

/* -------------------------------------------------------------------------- */
/* REUSABLE NEOBRUTALISM GEOMETRIC SVG PRIMITIVES                             */
/* -------------------------------------------------------------------------- */

/** 4-Point Retro Sparkle Star with concave curves */
export function SparkleStar({
  size = 48,
  fill = "#d4ff00",
  stroke = "#111111",
  className = "",
}: {
  size?: number;
  fill?: string;
  stroke?: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={`overflow-visible drop-shadow-[4px_4px_0px_#111111] ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M 50 0 C 50 28 72 50 100 50 C 72 50 50 72 50 100 C 50 72 28 50 0 50 C 28 50 50 28 50 0 Z"
        fill={fill}
        stroke={stroke}
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <circle cx="50" cy="50" r="4" fill={stroke} />
    </svg>
  );
}

/** 12-Point Sunburst / Starburst Sticker */
export function StarburstSticker({
  size = 120,
  fill = "#ff3b00",
  stroke = "#111111",
  text,
  className = "",
}: {
  size?: number;
  fill?: string;
  stroke?: string;
  text?: string;
  className?: string;
}) {
  // Exact 12-point starburst polygon (12 outer points R=50, 12 inner points r=38, center 55,55)
  const numPoints = 12;
  const outerR = 50;
  const innerR = 38;
  const cx = 55;
  const cy = 55;

  let pointsArr = [];
  for (let i = 0; i < numPoints * 2; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const angle = (i * Math.PI) / numPoints - Math.PI / 2;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    pointsArr.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  const points = pointsArr.join(" ");

  return (
    <svg
      viewBox="0 0 110 110"
      width={size}
      height={size}
      className={`overflow-visible ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon
        points={points}
        fill={fill}
        stroke={stroke}
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <circle cx={cx} cy={cy} r="24" fill="#f4f3ef" stroke={stroke} strokeWidth="3" />
      {text && (
        <text
          x={cx}
          y={cy + 4}
          textAnchor="middle"
          fill={stroke}
          fontSize="9"
          fontWeight="900"
          fontFamily="monospace"
        >
          {text}
        </text>
      )}
    </svg>
  );
}

/** Giant Raw Elongated 12-Point Star (No shadow, long rays, flat phosphor lime #d4ff00) */
export function GiantElongatedStar({
  size = 700,
  fill = "#d4ff00",
  stroke = "none",
  className = "",
}: {
  size?: number;
  fill?: string;
  stroke?: string;
  className?: string;
}) {
  // Deeply elongated rays: outer radius 100, inner radius 28 (very long, sharp spikes)
  const numPoints = 12;
  const outerR = 100;
  const innerR = 28;
  const cx = 110;
  const cy = 110;

  let pointsArr = [];
  for (let i = 0; i < numPoints * 2; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const angle = (i * Math.PI) / numPoints - Math.PI / 2;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    pointsArr.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  const points = pointsArr.join(" ");

  return (
    <svg
      viewBox="0 0 220 220"
      width={size}
      height={size}
      className={`overflow-visible ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon
        points={points}
        fill={fill}
        stroke={stroke}
        strokeWidth={stroke !== "none" ? "2" : "0"}
      />
    </svg>
  );
}

/** 8-Petal Asterisk / Flower Badge */
export function AsteriskBadge({
  size = 56,
  fill = "#0047ff",
  stroke = "#111111",
  className = "",
}: {
  size?: number;
  fill?: string;
  stroke?: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={`overflow-visible drop-shadow-[4px_4px_0px_#111111] ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill={fill} stroke={stroke} strokeWidth="3">
        <rect x="42" y="5" width="16" height="90" rx="8" />
        <rect x="5" y="42" width="90" height="16" rx="8" />
        <rect
          x="42"
          y="5"
          width="16"
          height="90"
          rx="8"
          transform="rotate(45 50 50)"
        />
        <rect
          x="42"
          y="5"
          width="16"
          height="90"
          rx="8"
          transform="rotate(-45 50 50)"
        />
      </g>
      <circle cx="50" cy="50" r="10" fill="#d4ff00" stroke={stroke} strokeWidth="3" />
    </svg>
  );
}

/** Notched Punch-Card Ticket with Barcode */
export function NotchedTicket({
  tag = "SPEC_01",
  code = "MHG-902",
  color = "#f4f3ef",
  accentColor = "#0047ff",
  className = "",
}: {
  tag?: string;
  code?: string;
  color?: string;
  accentColor?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative w-44 h-24 border-2 border-[#111111] bg-[${color}] p-2.5 flex flex-col justify-between shadow-[5px_5px_0px_#111111] ${className}`}
      style={{ backgroundColor: color }}
    >
      {/* Left & Right Circular Punch Notches */}
      <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#f4f3ef] border-r-2 border-[#111111]" />
      <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#f4f3ef] border-l-2 border-[#111111]" />

      <div className="flex items-center justify-between border-b border-dashed border-[#111111] pb-1.5 px-2">
        <span className="font-mono text-[10px] font-black text-[#111111] tracking-wider">
          // {tag}
        </span>
        <span
          className="w-2.5 h-2.5 rounded-full border border-[#111111]"
          style={{ backgroundColor: accentColor }}
        />
      </div>

      <div className="flex items-center justify-between px-2 pt-1 font-mono text-[9px] text-[#555555]">
        <span>CODE: {code}</span>
        <div className="flex gap-0.5 items-center h-4">
          <div className="w-[1.5px] h-full bg-[#111111]" />
          <div className="w-[3px] h-full bg-[#111111]" />
          <div className="w-[1px] h-full bg-[#111111]" />
          <div className="w-[2.5px] h-full bg-[#111111]" />
          <div className="w-[1px] h-full bg-[#111111]" />
          <div className="w-[3.5px] h-full bg-[#111111]" />
        </div>
      </div>
    </div>
  );
}

/** Architectural Geometric Portal / Arch */
export function ArchitecturalArch({
  size = 110,
  fill = "#f4f3ef",
  accentFill = "#d4ff00",
  className = "",
}: {
  size?: number;
  fill?: string;
  accentFill?: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 130"
      width={size}
      height={(size * 130) / 100}
      className={`overflow-visible drop-shadow-[5px_5px_0px_#0047ff] ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer Arch */}
      <path
        d="M 10 120 L 10 50 A 40 40 0 0 1 90 50 L 90 120 Z"
        fill={fill}
        stroke="#111111"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Inner Nested Arch */}
      <path
        d="M 22 120 L 22 55 A 28 28 0 0 1 78 55 L 78 120 Z"
        fill={accentFill}
        stroke="#111111"
        strokeWidth="2"
        strokeDasharray="4 3"
      />
      {/* Target Crosshair */}
      <circle cx="50" cy="55" r="8" fill="none" stroke="#111111" strokeWidth="2" />
      <line x1="50" y1="40" x2="50" y2="70" stroke="#111111" strokeWidth="2" />
      <line x1="35" y1="55" x2="65" y2="55" stroke="#111111" strokeWidth="2" />
      <rect x="47" y="100" width="6" height="6" fill="#ff3b00" stroke="#111111" strokeWidth="1.5" />
    </svg>
  );
}

/** 3D Isometric Neobrutalist Wireframe Cube */
export function IsometricCube({
  size = 80,
  topFill = "#d4ff00",
  leftFill = "#f4f3ef",
  rightFill = "#0047ff",
  className = "",
}: {
  size?: number;
  topFill?: string;
  leftFill?: string;
  rightFill?: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 115"
      width={size}
      height={(size * 115) / 100}
      className={`overflow-visible drop-shadow-[5px_5px_0px_#111111] ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Top Face */}
      <polygon
        points="50,5 90,28 50,51 10,28"
        fill={topFill}
        stroke="#111111"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Left Face */}
      <polygon
        points="10,28 50,51 50,97 10,74"
        fill={leftFill}
        stroke="#111111"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Right Face */}
      <polygon
        points="50,51 90,28 90,74 50,97"
        fill={rightFill}
        stroke="#111111"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Technical CAD Center Accent */}
      <circle cx="50" cy="51" r="3" fill="#ff3b00" />
    </svg>
  );
}

/** Postage Stamp Perforated Card */
export function PostageStampBadge({
  label = "SYSTEM",
  number = "01",
  color = "#d4ff00",
  className = "",
}: {
  label?: string;
  number?: string;
  color?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative w-28 h-32 p-2 border-2 border-dashed border-[#111111] shadow-[4px_4px_0px_#111111] flex flex-col justify-between items-center ${className}`}
      style={{ backgroundColor: color }}
    >
      <div className="w-full flex justify-between items-center font-mono text-[9px] font-black text-[#111111] border-b border-[#111111] pb-1">
        <span>POSTAGE</span>
        <span>{number}</span>
      </div>
      <div className="w-14 h-14 rounded-full border-2 border-[#111111] bg-[#f4f3ef] flex items-center justify-center font-black font-mono text-sm shadow-[2px_2px_0px_#0047ff]">
        {number}
      </div>
      <span className="font-mono text-[8px] font-black tracking-widest text-[#111111] uppercase">
        {label}
      </span>
    </div>
  );
}

/** Precision HUD Viewfinder Reticle */
export function HudReticleCorners({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-4 border border-[#111111]/10 ${className}`}>
      {/* Top Left */}
      <div className="absolute -top-1.5 -left-1.5 w-4 h-4 border-t-2 border-l-2 border-[#111111]" />
      {/* Top Right */}
      <div className="absolute -top-1.5 -right-1.5 w-4 h-4 border-t-2 border-r-2 border-[#111111]" />
      {/* Bottom Left */}
      <div className="absolute -bottom-1.5 -left-1.5 w-4 h-4 border-b-2 border-l-2 border-[#111111]" />
      {/* Bottom Right */}
      <div className="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b-2 border-r-2 border-[#111111]" />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* MAIN SECTION-SPECIFIC GEOMETRIC COMPOSITIONS                               */
/* -------------------------------------------------------------------------- */

export function SectionGeometry({ variant, scrollYProgress }: SectionGeometryProps) {
  // Shared smooth scroll transforms
  const fallbackVal = { get: () => 0 } as any;
  const activeProgress = scrollYProgress || fallbackVal;

  const rotateClockwise = useTransform(activeProgress, [0, 1], [0, 180]);
  const rotateCounter = useTransform(activeProgress, [0, 1], [0, -180]);
  const floatX = useTransform(activeProgress, [0, 1], [-30, 30]);
  const floatY = useTransform(activeProgress, [0, 1], [30, -30]);
  const scaleMorph = useTransform(activeProgress, [0, 0.5, 1], [0.95, 1.08, 0.98]);

  /* ----------------------------- HERO VARIANT ----------------------------- */
  if (variant === "hero") {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
        <HudReticleCorners />

        {/* Top-Left: Rotating Retro Sparkle Star */}
        <motion.div
          style={{ rotate: rotateClockwise, y: floatY }}
          animate={{
            rotate: [0, 10, -10, 0],
            y: [-4, 4, -4],
          }}
          transition={{
            repeat: Infinity,
            duration: 6,
            ease: "easeInOut",
          }}
          className="absolute top-16 left-[4vw] hidden md:block"
        >
          <SparkleStar size={64} fill="#d4ff00" />
        </motion.div>

        {/* Top-Left Secondary Mini Sparkle */}
        <motion.div
          animate={{
            scale: [0.85, 1.15, 0.85],
            rotate: [0, 90, 180],
          }}
          transition={{
            repeat: Infinity,
            duration: 5,
            ease: "easeInOut",
          }}
          className="absolute top-36 left-[8.5vw] hidden lg:block"
        >
          <SparkleStar size={28} fill="#ff3b00" />
        </motion.div>

        {/* Bottom-Center: 12-Point Sunburst Badge with spinning animation */}
        <motion.div
          style={{ rotate: rotateCounter }}
          className="absolute bottom-12 left-[38%] hidden lg:block origin-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 24, ease: "linear" }}
          >
            <StarburstSticker size={84} fill="#0047ff" text="60FPS" />
          </motion.div>
        </motion.div>

        {/* Hero Bottom-Right Isometric 3D Cube */}
        <motion.div
          style={{ scale: scaleMorph, x: floatX }}
          className="absolute top-28 right-[3vw] hidden xl:block"
        >
          <IsometricCube
            size={74}
            topFill="#d4ff00"
            leftFill="#f4f3ef"
            rightFill="#ff3b00"
          />
        </motion.div>
      </div>
    );
  }

  /* ------------------------ SELECTED WORK VARIANT ------------------------- */
  if (variant === "selected-work") {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
        {/* Notched Punch-Card Ticket Floating on Top-Left */}
        <motion.div
          style={{ x: floatX, rotate: rotateClockwise }}
          className="absolute top-12 left-[3vw] hidden lg:block rotate-6"
        >
          <NotchedTicket tag="PORTFOLIO_INDEX" code="PRJ_2025" accentColor="#ff3b00" />
        </motion.div>

        {/* Bottom-Right: 4-Point Sparkle with Concentric Ring */}
        <motion.div
          style={{ rotate: rotateCounter, scale: scaleMorph }}
          className="absolute bottom-8 right-[3vw] hidden md:flex items-center gap-3"
        >
          <SparkleStar size={52} fill="#ff3b00" />
          <div className="w-16 h-8 rounded-full border-2 border-[#111111] bg-[#d4ff00] flex items-center justify-center font-mono text-[9px] font-black shadow-[3px_3px_0px_#111111]">
            SELECTED
          </div>
        </motion.div>
      </div>
    );
  }

  /* ---------------------- CASE STUDY: SALMA VARIANT ----------------------- */
  if (variant === "case-study-salma") {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
        {/* Top-Left Architectural Arch Geometry */}
        <motion.div
          style={{ y: floatY, rotate: rotateClockwise }}
          className="absolute top-16 left-[2vw] hidden lg:block -rotate-6"
        >
          <ArchitecturalArch size={90} fill="#f4f3ef" accentFill="#d4ff00" />
        </motion.div>

        {/* Bottom-Right Postage Stamp Badge */}
        <motion.div
          style={{ scale: scaleMorph, x: floatX }}
          className="absolute bottom-12 right-[2vw] hidden lg:block rotate-12"
        >
          <PostageStampBadge label="SALMA_ADMIN" number="01" color="#ff3b00" />
        </motion.div>

        {/* Floating Mini Sparkle */}
        <motion.div
          animate={{ rotate: 360, scale: [0.9, 1.1, 0.9] }}
          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          className="absolute bottom-24 left-[10vw] hidden xl:block"
        >
          <SparkleStar size={36} fill="#0047ff" />
        </motion.div>
      </div>
    );
  }

  /* -------------------- CASE STUDY: GRAPHNEXT VARIANT --------------------- */
  if (variant === "case-study-graphnext") {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
        {/* Top-Right 3D Isometric Data Cube */}
        <motion.div
          style={{ x: floatX, rotate: rotateClockwise }}
          className="absolute top-14 left-[3vw] hidden lg:block"
        >
          <IsometricCube
            size={88}
            topFill="#0047ff"
            leftFill="#d4ff00"
            rightFill="#f4f3ef"
          />
        </motion.div>

        {/* Bottom-Left 12-Point Sunburst Spinning Badge */}
        <motion.div
          style={{ rotate: rotateCounter }}
          className="absolute bottom-12 right-[4vw] hidden lg:block origin-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          >
            <StarburstSticker size={76} fill="#d4ff00" text="GRAPH" />
          </motion.div>
        </motion.div>
      </div>
    );
  }

  /* ------------------------- WHAT I DO VARIANT ---------------------------- */
  if (variant === "what-i-do") {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
        {/* Top-Left Spinning Asterisk / 8-Petal Flower */}
        <motion.div
          style={{ rotate: rotateClockwise, y: floatY }}
          className="absolute top-16 left-[3vw] hidden lg:block"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 16, ease: "linear" }}
          >
            <AsteriskBadge size={64} fill="#0047ff" />
          </motion.div>
        </motion.div>

        {/* Bottom-Right Architectural Arch */}
        <motion.div
          style={{ scale: scaleMorph, x: floatX }}
          className="absolute bottom-12 right-[2.5vw] hidden xl:block rotate-12"
        >
          <ArchitecturalArch size={85} fill="#d4ff00" accentFill="#ff3b00" />
        </motion.div>
      </div>
    );
  }

  /* ---------------------------- ABOUT VARIANT ----------------------------- */
  if (variant === "about") {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
        {/* Top-Left Retro Sparkle Star with Shadow */}
        <motion.div
          style={{ scale: scaleMorph, rotate: rotateClockwise }}
          className="absolute top-16 left-[4vw] hidden lg:block"
        >
          <SparkleStar size={60} fill="#d4ff00" />
        </motion.div>

        {/* Bottom-Right Notched Ticket */}
        <motion.div
          style={{ x: floatX, rotate: rotateCounter }}
          className="absolute bottom-10 right-[3vw] hidden md:block -rotate-6"
        >
          <NotchedTicket tag="PHILOSOPHY" code="MINDSET" accentColor="#d4ff00" />
        </motion.div>
      </div>
    );
  }

  /* ---------------------------- STACK VARIANT ----------------------------- */
  if (variant === "stack") {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
        {/* Bottom-Left Isometric Cube */}
        <motion.div
          style={{ x: floatX, rotate: rotateClockwise }}
          className="absolute bottom-12 left-[3vw] hidden lg:block"
        >
          <IsometricCube
            size={80}
            topFill="#ff3b00"
            leftFill="#111111"
            rightFill="#0047ff"
          />
        </motion.div>

        {/* Top-Right 12-Point Sunburst Badge */}
        <motion.div
          style={{ scale: scaleMorph, rotate: rotateCounter }}
          className="absolute top-16 right-[3vw] hidden lg:block"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
          >
            <StarburstSticker size={70} fill="#d4ff00" text="VERIFIED" />
          </motion.div>
        </motion.div>
      </div>
    );
  }

  /* --------------------------- CONTACT VARIANT ---------------------------- */
  if (variant === "contact") {
    // Dynamic continuous rotation + scroll acceleration
    // Base scroll spin adds up to 900 degrees when scrolling across contact section
    const scrollSpin = useTransform(activeProgress, [0, 1], [0, 900]);
    const scrollSpinCounter = useTransform(activeProgress, [0, 1], [0, -900]);

    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
        {/* TOP-LEFT GIANT ELONGATED 12-POINT STAR (Responsive sizing & placement) */}
        <motion.div
          style={{ rotate: scrollSpin }}
          className="absolute -top-24 -left-24 sm:-top-44 sm:-left-44 lg:-top-64 lg:-left-64 origin-center z-0 opacity-80 sm:opacity-90"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          >
            {/* Mobile: 360px | Tablet: 540px | Desktop: 750px */}
            <div className="block sm:hidden">
              <GiantElongatedStar size={360} fill="#d4ff00" />
            </div>
            <div className="hidden sm:block lg:hidden">
              <GiantElongatedStar size={540} fill="#d4ff00" />
            </div>
            <div className="hidden lg:block">
              <GiantElongatedStar size={750} fill="#d4ff00" />
            </div>
          </motion.div>
        </motion.div>

        {/* BOTTOM-RIGHT GIANT ELONGATED 12-POINT STAR (Responsive sizing & placement) */}
        <motion.div
          style={{ rotate: scrollSpinCounter }}
          className="absolute -bottom-28 -right-28 sm:-bottom-48 sm:-right-48 lg:-bottom-64 lg:-right-64 origin-center z-0 opacity-80 sm:opacity-90"
        >
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 28, ease: "linear" }}
          >
            {/* Mobile: 380px | Tablet: 560px | Desktop: 780px */}
            <div className="block sm:hidden">
              <GiantElongatedStar size={380} fill="#d4ff00" />
            </div>
            <div className="hidden sm:block lg:hidden">
              <GiantElongatedStar size={560} fill="#d4ff00" />
            </div>
            <div className="hidden lg:block">
              <GiantElongatedStar size={780} fill="#d4ff00" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return null;
}

