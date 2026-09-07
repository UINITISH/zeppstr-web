/**
 * Ambient floating marketing icons — perimeter frame layout, simplified.
 *
 * Layout follows the user's sketch:
 *   • LEFT edge — clean vertical line at 4% left (4 icons, evenly spaced)
 *   • TOP row — horizontal line above content (4 icons across)
 *   • RIGHT edge — below yellow firm card (2 icons)
 *   • BOTTOM row — horizontal line below content (3 icons)
 *
 * Center stays clear. Each icon drifts (float-a/b/c) AND pulses
 * (opacity 0.25 ↔ 0.75). Hidden on mobile.
 */

interface IconBubbleProps {
  top: string;
  left?: string;
  right?: string;
  size?: number;
  delay?: number;
  variant?: "a" | "b" | "c";
  children: React.ReactNode;
}

function IconBubble({
  top,
  left,
  right,
  size = 48,
  delay = 0,
  variant = "a",
  children,
}: IconBubbleProps) {
  return (
    <div
      className={`absolute float-${variant}`}
      style={{
        top,
        left,
        right,
        width: size,
        height: size,
        animationDelay: `${delay}s, ${delay * 0.7}s`,
      }}
    >
      <div className="w-full h-full rounded-full border border-ink-headline/20 bg-bg-primary/50 backdrop-blur-[2px] flex items-center justify-center text-ink-headline">
        {children}
      </div>
    </div>
  );
}

const iconStyle = {
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  fill: "none",
};

// ─── Icon SVG components ───

const Target = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" {...iconStyle}>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
  </svg>
);
const Chart = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" {...iconStyle}>
    <line x1="6" y1="20" x2="6" y2="14" />
    <line x1="12" y1="20" x2="12" y2="8" />
    <line x1="18" y1="20" x2="18" y2="11" />
    <line x1="3" y1="20" x2="21" y2="20" />
  </svg>
);
const Trending = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" {...iconStyle}>
    <polyline points="3 18 9 12 13 16 21 6" />
    <polyline points="14 6 21 6 21 13" />
  </svg>
);
const Search = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" {...iconStyle}>
    <circle cx="10" cy="10" r="6" />
    <line x1="14.5" y1="14.5" x2="20" y2="20" />
  </svg>
);
const Email = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" {...iconStyle}>
    <rect x="3" y="6" width="18" height="12" rx="1" />
    <polyline points="3 7 12 13 21 7" />
  </svg>
);
const Hashtag = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" {...iconStyle}>
    <line x1="9" y1="3" x2="7" y2="21" />
    <line x1="17" y1="3" x2="15" y2="21" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <line x1="3" y1="15" x2="21" y2="15" />
  </svg>
);
const Globe = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" {...iconStyle}>
    <circle cx="12" cy="12" r="10" />
    <ellipse cx="12" cy="12" rx="4" ry="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
  </svg>
);
const Funnel = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" {...iconStyle}>
    <polygon points="3 4 21 4 14 13 14 20 10 18 10 13" />
  </svg>
);
const Lightbulb = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" {...iconStyle}>
    <path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c1 .9 1.5 2 1.5 3.5h5c0-1.5.5-2.6 1.5-3.5A6 6 0 0 0 12 3z" />
  </svg>
);
const Sparkle = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" {...iconStyle}>
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" />
  </svg>
);
const Link = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" {...iconStyle}>
    <path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 1 0-5.66-5.66l-1 1" />
    <path d="M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 1 0 5.66 5.66l1-1" />
  </svg>
);

// ─── Layout ───

export function FloatingMarketingIcons() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden hidden md:block"
    >
      {/* ── LEFT EDGE: clean vertical line at 4% left, 4 icons evenly spaced ── */}
      <IconBubble top="22%" left="4%" size={48} variant="a" delay={0}>
        <Target />
      </IconBubble>
      <IconBubble top="42%" left="4%" size={48} variant="b" delay={1.4}>
        <Search />
      </IconBubble>
      <IconBubble top="62%" left="4%" size={48} variant="c" delay={2.8}>
        <Email />
      </IconBubble>
      <IconBubble top="82%" left="4%" size={48} variant="a" delay={4.2}>
        <Hashtag />
      </IconBubble>

      {/* ── TOP ROW: 4 icons across the top edge above content ── */}
      <IconBubble top="5%" left="14%" size={44} variant="b" delay={0.6}>
        <Chart />
      </IconBubble>
      <IconBubble top="5%" left="38%" size={44} variant="c" delay={1.8}>
        <Lightbulb />
      </IconBubble>
      <IconBubble top="5%" left="62%" size={44} variant="a" delay={3.0}>
        <Sparkle />
      </IconBubble>
      <IconBubble top="5%" right="4%" size={44} variant="b" delay={4.5}>
        <Star />
      </IconBubble>

      {/* ── RIGHT EDGE: below yellow firm card ── */}
      <IconBubble top="62%" right="4%" size={48} variant="c" delay={2.0}>
        <Trending />
      </IconBubble>
      <IconBubble top="82%" right="4%" size={48} variant="a" delay={3.4}>
        <Link />
      </IconBubble>

      {/* ── BOTTOM ROW: 3 icons in horizontal line below content ── */}
      <IconBubble top="93%" left="22%" size={44} variant="b" delay={2.2}>
        <Funnel />
      </IconBubble>
      <IconBubble top="93%" left="46%" size={44} variant="c" delay={3.6}>
        <Globe />
      </IconBubble>
    </div>
  );
}

// Small star icon used in the top-right slot
function Star() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" {...iconStyle}>
      <polygon points="12 2 15 9 22 9 17 14 19 21 12 17 5 21 7 14 2 9 9 9" />
    </svg>
  );
}
