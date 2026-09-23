import * as React from "react";

/**
 * article-scenes — sixteen different PICTURES, not sixteen icon sets.
 *
 * ── WHAT WAS WRONG WITH THE VERSION BEFORE THIS ─────────────────────────────
 * Vikas, 23 Sep: "Why are you making all the images look similar when the
 * articles are different... I want the image to give a gist of the article
 * through the image."
 *
 * The previous attempt varied WHICH doodles appeared and where they sat. That
 * passed a collision test — 53 distinct icon sets — and still failed the only
 * test that matters, because every article got the same composition: five to
 * seven outline icons scattered on a dark grid. Varying the contents of an
 * identical layout does not make two images look different. It makes them look
 * like the same template twice, which is exactly what he saw.
 *
 * Worse, the keyword table is scanned in order and nearly every title on this
 * blog contains "seo", so the magnifier won the first slot roughly thirty
 * times. The most prominent mark in the collage was a constant.
 *
 * ── THE RULE NOW ────────────────────────────────────────────────────────────
 * The article's subject chooses a SCENE — a purpose-built drawing of the shape
 * of its argument — and the scene is what varies:
 *
 *   "SEO vs PPC"                  → a split screen, two columns weighed up
 *   "SEO audit guide"             → a clipboard with ticks
 *   "Email open rate benchmarks"  → a bar chart with a benchmark line
 *   "Best time to send email"     → a clock ringed with send times
 *   "Local SEO services"          → a map with pins
 *   "Black hat SEO risks"         → a struck-through warning
 *   "Free SEO tools"              → a toolkit grid
 *   "Off-page SEO authority"      → a link graph radiating from one node
 *
 * These are structurally different drawings. You can tell them apart from
 * across the room, which is the actual brief.
 *
 * Seeded jitter still runs INSIDE a scene — bar heights, pin placement, which
 * element takes the accent — so two articles sharing a scene are not identical
 * either. But the scene does the heavy lifting, not the jitter.
 *
 * ── ADDING ONE ──────────────────────────────────────────────────────────────
 * Ask what shape the argument has: a comparison, a sequence, a hierarchy, a
 * quantity, a warning, a place. Draw that shape. Do not draw the topic's
 * mascot — an article about email is not "an envelope", it is whatever claim
 * it makes about email.
 */

const Y = "#FFD031";
const W = "rgba(255,255,255,0.52)";
const Wf = "rgba(255,255,255,0.30)";
const Wd = "rgba(255,255,255,0.14)";
const MONO = "var(--font-mono), ui-monospace, monospace";

type Next = () => number;
type Scene = (n: Next) => React.ReactElement;

const base = {
  fill: "none" as const,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/* ── 1. SERP — search, ranking, google, visibility ────────────────────────── */
const serp: Scene = (n) => {
  const win = Math.floor(n() * 3);
  return (
    <g {...base} strokeWidth={3}>
      {[0, 1, 2, 3].map((i) => {
        const hit = i === win;
        return (
          <g key={i}>
            <rect
              x={44}
              y={40 + i * 40}
              width={248}
              height={30}
              rx={3}
              stroke={hit ? Y : Wd}
              strokeWidth={hit ? 3 : 2}
              fill={hit ? "rgba(255,208,49,0.10)" : "none"}
            />
            <path
              d={`M56 ${50 + i * 40} L${hit ? 200 : 150 + i * 14} ${50 + i * 40}`}
              stroke={hit ? Y : W}
            />
            <path
              d={`M56 ${60 + i * 40} L${hit ? 246 : 186 - i * 10} ${60 + i * 40}`}
              stroke={Wd}
              strokeWidth={2}
            />
          </g>
        );
      })}
      {/* magnifier resting on the winning result */}
      <g transform={`translate(258 ${30 + win * 40})`} stroke={Y} strokeWidth={3.5}>
        <circle cx={16} cy={16} r={14} />
        <path d="M26 26 L38 38" />
      </g>
    </g>
  );
};

/* ── 2. VERSUS — vs, or, comparison, organic vs paid ──────────────────────── */
const versus: Scene = (n) => {
  const L = [0.8, 0.55, 0.95];
  const R = [0.5, 0.9, 0.35];
  return (
    <g {...base} strokeWidth={3}>
      <path d="M168 18 L168 200" stroke={Wd} strokeWidth={2} strokeDasharray="5 7" />
      {L.map((v, i) => (
        <rect
          key={`l${i}`}
          x={40 + i * 34}
          y={170 - v * 110}
          width={22}
          height={v * 110}
          stroke={W}
          fill="none"
        />
      ))}
      {R.map((v, i) => (
        <rect
          key={`r${i}`}
          x={206 + i * 34}
          y={170 - v * 110}
          width={22}
          height={v * 110}
          stroke={i === 1 ? Y : W}
          fill={i === 1 ? "rgba(255,208,49,0.12)" : "none"}
        />
      ))}
      <path d="M28 172 L140 172 M196 172 L308 172" stroke={Wf} strokeWidth={2} />
      <circle cx={168} cy={108} r={17} stroke={Y} strokeWidth={3} fill="#0B3B2E" />
      <text
        x={168}
        y={114}
        textAnchor="middle"
        fill={Y}
        style={{ font: `600 13px ${MONO}` }}
        stroke="none"
      >
        VS
      </text>
    </g>
  );
};

/* ── 3. LADDER — ranking higher, climbing, improve position ───────────────── */
const ladder: Scene = () => (
  <g {...base} strokeWidth={3}>
    {[0, 1, 2, 3].map((i) => (
      <rect
        key={i}
        x={48 + i * 62}
        y={178 - (i + 1) * 32}
        width={52}
        height={(i + 1) * 32}
        stroke={i === 3 ? Y : W}
        fill={i === 3 ? "rgba(255,208,49,0.12)" : "none"}
      />
    ))}
    <path d="M34 178 L306 178" stroke={Wf} strokeWidth={2} />
    {/* flag planted on the top step */}
    <g stroke={Y} strokeWidth={3}>
      <path d="M262 50 L262 20" />
      <path d="M262 22 L292 30 L262 40 Z" fill="rgba(255,208,49,0.2)" />
    </g>
    <path d="M60 128 L118 100 L180 70 L240 44" stroke={Wd} strokeWidth={2} strokeDasharray="4 6" />
  </g>
);

/* ── 4. CHECKLIST — audit, guide, steps, how to, tips ─────────────────────── */
const checklist: Scene = (n) => {
  const done = 2 + Math.floor(n() * 2);
  return (
    <g {...base} strokeWidth={3}>
      <rect x={72} y={26} width={192} height={166} rx={5} stroke={W} fill="rgba(255,255,255,0.03)" />
      <rect x={140} y={16} width={56} height={20} rx={4} stroke={W} />
      {[0, 1, 2, 3, 4].map((i) => {
        const on = i < done;
        return (
          <g key={i}>
            <rect
              x={94}
              y={58 + i * 27}
              width={17}
              height={17}
              rx={2}
              stroke={on ? Y : Wf}
            />
            {on ? (
              <path d={`M97 ${67 + i * 27} l5 5 l9 -11`} stroke={Y} strokeWidth={3.5} />
            ) : null}
            <path
              d={`M124 ${67 + i * 27} L${on ? 240 : 208} ${67 + i * 27}`}
              stroke={on ? Wf : Wd}
              strokeWidth={2.5}
            />
          </g>
        );
      })}
    </g>
  );
};

/* ── 5. BARS — benchmarks, rates, averages, statistics ────────────────────── */
const bars: Scene = (n) => {
  const vals = [0.42, 0.66, 0.38, 0.88, 0.54, 0.72].map((v) => v * (0.86 + n() * 0.28));
  const top = vals.indexOf(Math.max(...vals));
  return (
    <g {...base} strokeWidth={3}>
      <path d="M40 178 L306 178" stroke={Wf} strokeWidth={2} />
      <path d="M40 178 L40 26" stroke={Wf} strokeWidth={2} />
      {vals.map((v, i) => {
        const h = Math.min(v, 1) * 130;
        return (
          <rect
            key={i}
            x={58 + i * 41}
            y={178 - h}
            width={26}
            height={h}
            stroke={i === top ? Y : W}
            fill={i === top ? "rgba(255,208,49,0.14)" : "none"}
          />
        );
      })}
      {/* benchmark line — the thing a benchmark article is actually about */}
      <path d="M40 96 L306 96" stroke={Y} strokeWidth={2} strokeDasharray="7 6" />
      <text x={306} y={88} textAnchor="end" fill={Y} stroke="none" style={{ font: `500 10px ${MONO}` }}>
        AVG
      </text>
    </g>
  );
};

/* ── 6. CURVE — growth, results, increase, compounding ────────────────────── */
const curve: Scene = () => (
  <g {...base} strokeWidth={3}>
    <path d="M40 182 L306 182" stroke={Wf} strokeWidth={2} />
    <path d="M40 182 L40 24" stroke={Wf} strokeWidth={2} />
    {[60, 100, 140].map((y) => (
      <path key={y} d={`M40 ${y} L306 ${y}`} stroke={Wd} strokeWidth={1.5} strokeDasharray="3 8" />
    ))}
    <path d="M52 166 C 110 162, 138 140, 172 116 S 232 62, 288 40" stroke={Y} strokeWidth={4} />
    <path d="M264 42 L290 38 L286 64" stroke={Y} strokeWidth={4} />
    {[[52, 166], [172, 116], [288, 40]].map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r={5} stroke={Y} strokeWidth={3} fill="#0B3B2E" />
    ))}
  </g>
);

/* ── 7. FUNNEL — leads, conversion, nurture, pipeline ─────────────────────── */
const funnel: Scene = () => (
  <g {...base} strokeWidth={3}>
    {[
      { y: 34, x1: 76, x2: 260 },
      { y: 86, x1: 100, x2: 236 },
      { y: 138, x1: 124, x2: 212 },
    ].map((s, i) => (
      <path
        key={i}
        d={`M${s.x1} ${s.y} L${s.x2} ${s.y} L${s.x2 - 12} ${s.y + 40} L${s.x1 + 12} ${s.y + 40} Z`}
        stroke={i === 2 ? Y : W}
        fill={i === 2 ? "rgba(255,208,49,0.12)" : "rgba(255,255,255,0.03)"}
      />
    ))}
    {[0, 1, 2].map((i) => (
      <path key={i} d={`M168 ${76 + i * 52} L168 ${86 + i * 52}`} stroke={Wf} strokeWidth={2} />
    ))}
    <path d="M168 182 L168 198 M160 190 L168 199 L176 190" stroke={Y} strokeWidth={3} />
  </g>
);

/* ── 8. CLOCK — timing, when to send, schedule, frequency ─────────────────── */
const clock: Scene = (n) => {
  const best = Math.floor(n() * 8);
  return (
    <g {...base} strokeWidth={3}>
      <circle cx={168} cy={106} r={62} stroke={W} />
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i / 8) * Math.PI * 2 - Math.PI / 2;
        const hit = i === best;
        return (
          <g key={i}>
            <path
              d={`M${168 + Math.cos(a) * 54} ${106 + Math.sin(a) * 54} L${
                168 + Math.cos(a) * 62
              } ${106 + Math.sin(a) * 62}`}
              stroke={hit ? Y : Wf}
            />
            <circle
              cx={168 + Math.cos(a) * 88}
              cy={106 + Math.sin(a) * 88}
              r={hit ? 13 : 9}
              stroke={hit ? Y : Wd}
              strokeWidth={hit ? 3 : 2}
              fill={hit ? "rgba(255,208,49,0.15)" : "none"}
            />
          </g>
        );
      })}
      <path d="M168 106 L168 72 M168 106 L194 118" stroke={Y} strokeWidth={3.5} />
      <circle cx={168} cy={106} r={4} fill={Y} stroke="none" />
    </g>
  );
};

/* ── 9. MAP — local, near me, city, store, GMB ────────────────────────────── */
const mapScene: Scene = (n) => {
  const pins = [
    [116, 74],
    [212, 62],
    [160, 136],
  ] as const;
  const hot = Math.floor(n() * 3);
  return (
    <g {...base} strokeWidth={2.5}>
      <path
        d="M52 40 L118 26 L200 46 L286 28 L282 180 L198 196 L116 176 L56 192 Z"
        stroke={W}
        fill="rgba(255,255,255,0.03)"
      />
      <path d="M118 26 L116 176 M200 46 L198 196" stroke={Wd} />
      <path d="M52 100 C 120 92, 210 118, 282 104" stroke={Wd} />
      {pins.map(([x, y], i) => {
        const on = i === hot;
        return (
          <g key={i} stroke={on ? Y : Wf} strokeWidth={on ? 3.5 : 2.5}>
            <path
              d={`M${x} ${y}c-11 0-19 8-19 19 0 14 19 33 19 33s19-19 19-33c0-11-8-19-19-19z`}
              fill={on ? "rgba(255,208,49,0.16)" : "none"}
            />
            <circle cx={x} cy={y + 18} r={6} />
          </g>
        );
      })}
    </g>
  );
};

/* ── 10. WARNING — risks, myths, mistakes, penalties, what not to do ──────── */
const warning: Scene = () => (
  <g {...base} strokeWidth={3}>
    <path d="M168 34 L262 178 L74 178 Z" stroke={Y} strokeWidth={4} fill="rgba(255,208,49,0.08)" />
    <path d="M168 84 L168 130" stroke={Y} strokeWidth={5} />
    <circle cx={168} cy={152} r={4.5} fill={Y} stroke="none" />
    {/* the struck-through practice */}
    <g stroke={Wf} strokeWidth={2.5}>
      <rect x={36} y={52} width={44} height={30} rx={3} />
      <rect x={256} y={106} width={44} height={30} rx={3} />
      <path d="M36 82 L80 52 M256 136 L300 106" stroke="rgba(255,120,120,0.55)" strokeWidth={3} />
    </g>
  </g>
);

/* ── 11. TOOLKIT — tools, software, platforms, stack ──────────────────────── */
const toolkit: Scene = (n) => {
  const pick = Math.floor(n() * 6);
  return (
    <g {...base} strokeWidth={2.5}>
      {Array.from({ length: 6 }, (_, i) => {
        const x = 62 + (i % 3) * 82;
        const y = 48 + Math.floor(i / 3) * 78;
        const on = i === pick;
        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width={62}
              height={58}
              rx={5}
              stroke={on ? Y : Wf}
              strokeWidth={on ? 3 : 2.5}
              fill={on ? "rgba(255,208,49,0.12)" : "rgba(255,255,255,0.03)"}
            />
            <path
              d={`M${x + 14} ${y + 38} L${x + 14} ${y + 26} M${x + 26} ${y + 38} L${x + 26} ${
                y + 16
              } M${x + 38} ${y + 38} L${x + 38} ${y + 30} M${x + 50} ${y + 38} L${x + 50} ${y + 20}`}
              stroke={on ? Y : W}
              strokeWidth={3}
            />
          </g>
        );
      })}
    </g>
  );
};

/* ── 12. NETWORK — backlinks, authority, referrals, off-page ──────────────── */
const network: Scene = (n) => {
  const strong = Math.floor(n() * 6);
  return (
    <g {...base} strokeWidth={2.5}>
      {Array.from({ length: 6 }, (_, i) => {
        const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
        const x = 168 + Math.cos(a) * 82;
        const y = 106 + Math.sin(a) * 72;
        const on = i === strong;
        return (
          <g key={i}>
            <path d={`M168 106 L${x} ${y}`} stroke={on ? Y : Wd} strokeWidth={on ? 3 : 2} />
            <circle
              cx={x}
              cy={y}
              r={on ? 17 : 12}
              stroke={on ? Y : Wf}
              strokeWidth={on ? 3 : 2.5}
              fill={on ? "rgba(255,208,49,0.14)" : "none"}
            />
          </g>
        );
      })}
      <circle cx={168} cy={106} r={26} stroke={Y} strokeWidth={3.5} fill="rgba(255,208,49,0.10)" />
      <path d="M158 106 a10 10 0 0 1 20 0 M168 98 L168 114" stroke={Y} strokeWidth={3} />
    </g>
  );
};

/* ── 13. TARGET — audience, personas, intent, targeting ───────────────────── */
const target: Scene = () => (
  <g {...base} strokeWidth={3}>
    {[62, 42, 22].map((r, i) => (
      <circle key={r} cx={168} cy={106} r={r} stroke={i === 2 ? Y : W} strokeWidth={i === 2 ? 3.5 : 3} />
    ))}
    <circle cx={168} cy={106} r={6} fill={Y} stroke="none" />
    {/* two arrows that missed, one that landed */}
    <g stroke={Wf} strokeWidth={2.5}>
      <path d="M40 40 L120 82 M40 40 L56 44 M40 40 L44 56" />
      <path d="M300 178 L214 138 M300 178 L284 174 M300 178 L296 162" />
    </g>
    <path d="M296 30 L176 100 M296 30 L280 34 M296 30 L292 46" stroke={Y} strokeWidth={3} />
  </g>
);

/* ── 14. BROADCAST — ads, PPC, campaigns, paid reach ──────────────────────── */
const broadcast: Scene = (n) => {
  const reach = 2 + Math.floor(n() * 2);
  return (
    <g {...base} strokeWidth={3}>
      <path
        d="M52 88 L52 124 L86 124 L158 164 L158 48 L86 88 Z"
        stroke={Y}
        strokeWidth={3.5}
        fill="rgba(255,208,49,0.10)"
      />
      <path d="M92 128 L100 188 L124 188 L116 140" stroke={Y} />
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M${176 + i * 24} ${86 - i * 14} a ${30 + i * 14} ${30 + i * 14} 0 0 1 0 ${64 + i * 28}`}
          stroke={i < reach ? W : Wd}
          strokeWidth={i < reach ? 3 : 2}
        />
      ))}
      {/* impressions landing */}
      {[[268, 52], [292, 106], [268, 160]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={7} stroke={i < reach ? W : Wd} strokeWidth={2.5} />
      ))}
    </g>
  );
};

/* ── 15. PAGE — content, copywriting, blogging, on-page ───────────────────── */
const page: Scene = (n) => {
  const hi = 1 + Math.floor(n() * 3);
  return (
    <g {...base} strokeWidth={3}>
      <path
        d="M84 20 L212 22 L256 66 L254 196 L82 194 Z"
        stroke={W}
        fill="rgba(255,255,255,0.03)"
      />
      <path d="M212 22 L212 66 L256 66" stroke={W} />
      <path d="M104 92 L200 92" stroke={Y} strokeWidth={4} />
      {[0, 1, 2, 3].map((i) => (
        <path
          key={i}
          d={`M104 ${116 + i * 20} L${i === hi ? 214 : 232 - i * 16} ${116 + i * 20}`}
          stroke={i === hi ? Y : Wd}
          strokeWidth={i === hi ? 3 : 2.5}
        />
      ))}
      {/* pen */}
      <g stroke={Y} strokeWidth={3}>
        <path d="M244 132 L286 90 L298 102 L256 144 L238 150 Z" />
      </g>
    </g>
  );
};

/* ── 16. INBOX — email, newsletters, deliverability, open rates ───────────── */
const inbox: Scene = (n) => {
  const open = Math.floor(n() * 3);
  return (
    <g {...base} strokeWidth={3}>
      {[0, 1, 2].map((i) => {
        const on = i === open;
        const y = 36 + i * 54;
        return (
          <g key={i}>
            <rect
              x={78}
              y={y}
              width={180}
              height={44}
              rx={4}
              stroke={on ? Y : Wf}
              strokeWidth={on ? 3.5 : 2.5}
              fill={on ? "rgba(255,208,49,0.12)" : "rgba(255,255,255,0.03)"}
            />
            <path d={`M78 ${y} L168 ${y + 28} L258 ${y}`} stroke={on ? Y : Wd} strokeWidth={on ? 3 : 2} />
          </g>
        );
      })}
      {/* the one that got opened, lifting out */}
      <path d="M272 52 L296 34 M290 34 L297 33 L296 41" stroke={Y} strokeWidth={3} />
    </g>
  );
};

/* ── 17. STOREFRONT — ecommerce, product pages, checkout, sellers ─────────── */
const storefront: Scene = (n) => {
  const hot = Math.floor(n() * 3);
  return (
    <g {...base} strokeWidth={2.5}>
      {/* awning */}
      <path d="M48 44 L288 44 L288 62 L48 62 Z" stroke={W} />
      <path d="M78 44 L78 62 M108 44 L108 62 M138 44 L138 62 M168 44 L168 62 M198 44 L198 62 M228 44 L228 62 M258 44 L258 62" stroke={Wd} strokeWidth={2} />
      {/* product tiles in the window */}
      {[0, 1, 2].map((i) => {
        const on = i === hot;
        const x = 62 + i * 76;
        return (
          <g key={i}>
            <rect
              x={x}
              y={84}
              width={60}
              height={62}
              rx={4}
              stroke={on ? Y : Wf}
              strokeWidth={on ? 3.5 : 2.5}
              fill={on ? "rgba(255,208,49,0.12)" : "rgba(255,255,255,0.03)"}
            />
            <path d={`M${x + 12} 120 L${x + 48} 120`} stroke={on ? Y : Wd} strokeWidth={3} />
            <path d={`M${x + 12} 132 L${x + 36} 132`} stroke={Wd} strokeWidth={2.5} />
          </g>
        );
      })}
      {/* cart at the till */}
      <g stroke={Y} strokeWidth={3}>
        <path d="M118 168 L132 170 L142 196 L196 193" />
        <path d="M134 176 L206 173 L200 193" />
        <circle cx={150} cy={204} r={5} />
        <circle cx={192} cy={203} r={5} />
      </g>
    </g>
  );
};
/* ── 18. VIDEO — video SEO, YouTube, reels, watch time ────────────────────── */
const video: Scene = (n) => {
  const cut = 0.34 + n() * 0.3;
  return (
    <g {...base} strokeWidth={3}>
      <rect x={64} y={30} width={208} height={118} rx={6} stroke={W} fill="rgba(255,255,255,0.03)" />
      <path d="M150 66 L196 89 L150 112 Z" stroke={Y} strokeWidth={3.5} fill="rgba(255,208,49,0.14)" />
      {/* scrubber */}
      <path d="M64 170 L272 170" stroke={Wd} strokeWidth={4} />
      <path d={`M64 170 L${64 + 208 * cut} 170`} stroke={Y} strokeWidth={4} />
      <circle cx={64 + 208 * cut} cy={170} r={7} stroke={Y} strokeWidth={3} fill="#0B3B2E" />
      {/* retention drop — what a video article is really about */}
      <path
        d="M64 202 C 110 200, 150 206, 190 210 S 250 214, 272 216"
        stroke={Wf}
        strokeWidth={2.5}
      />
    </g>
  );
};

/**
 * Ordered scene rules. First match wins.
 *
 * ── THE ORDERING PRINCIPLE: SUBJECT BEATS FORMAT ────────────────────────────
 * The first cut of this table put "guide|step|tips|beginner|comprehensive" near
 * the top, and the clipboard promptly took 14 of 53 articles — it had simply
 * replaced the magnifier as the thing you see over and over. Format words are
 * the LEAST informative part of a headline: nearly every post on this blog is
 * a guide of some kind, so "guide" tells a reader nothing and must not be
 * allowed to decide the picture.
 *
 * So topic rules run first and the clipboard now fires only on titles that are
 * literally about auditing or working through a checklist. "Local SEO Services:
 * A Comprehensive Guide" is a map, not a clipboard.
 *
 * ── TWO REGEX BUGS WORTH REMEMBERING ────────────────────────────────────────
 * 1. `\bads?` with no TRAILING boundary matched the "Ad" in "Advanced SEO
 *    Techniques", filing a technique piece under paid advertising. Every
 *    alternation group in this table now closes with \b.
 * 2. A bare `\bor\b` in the comparison rule caught "Guaranteed SEO: Myth or
 *    Reality?" — a warning piece, not a comparison. Comparison now requires
 *    an explicit "vs", "versus" or "compare".
 */
const RULES: Array<[RegExp, string]> = [
  [/\b(vs\.?|versus|compar\w*)\b/i, "versus"],
  [/\b(risks?|myths?|mistakes?|avoid|penalt\w*|black hat|spam\w*|scams?|guaranteed|wrong|fails?|dangers?)\b/i, "warning"],
  [/\b(best time|when to|timing|frequency|how often|schedule|calendar)\b/i, "clock"],
  [/\b(local|near me|gmb|google business|city|storefront|map)\b/i, "map"],
  [/\b(e-?commerce|shop\w*|product pages?|checkout|cart|sales online|sellers?|amazon)\b/i, "storefront"],
  [/\b(videos?|youtube|reels?|shorts|visual content|watch time)\b/i, "video"],
  [/\b(emails?|open rates?|bounce|deliverab\w*|inbox|subject lines?|newsletters?|spf|dkim|dmarc)\b/i, "inbox"],
  [/\b(backlinks?|off-?page|authority|referr\w*|link building|outreach)\b/i, "network"],
  [/\b(tools?|software|platforms?|stack|apps?)\b/i, "toolkit"],
  [/\b(ppc|ads?|advertising|adwords|paid|campaigns?|facebook|meta|promot\w*)\b/i, "broadcast"],
  [/\b(audiences?|personas?|targeting|segments?|intent|b2b|influencers?|user-generated)\b/i, "target"],
  [/\b(funnels?|leads?|conversions?|convert\w*|nurtur\w*|pipeline|journey)\b/i, "funnel"],
  [/\b(benchmarks?|rates?|averages?|statistics?|percent\w*|metrics?|roi|roas|costs?|prices?|pricing|budgets?)\b/i, "bars"],
  [/\b(checklists?|audit\w*|step-by-step|step by step|how to choose|choosing|selection)\b/i, "checklist"],
  [/\b(content|copywrit\w*|blogs?|articles?|writing|on-?page|wordpress)\b/i, "page"],
  [/\b(growth|trends?|traffic|performance|success|compound\w*|importance)\b/i, "curve"],
  [/\b(rank\w*|higher|positions?|climb\w*|improve|advanced|results?|boost\w*)\b/i, "ladder"],
  [/\b(seo|search|serp|google|keywords?|organic|visibility|index\w*|crawl\w*|technical|sem)\b/i, "serp"],
];

export const SCENES: Record<string, Scene> = {
  serp,
  versus,
  ladder,
  checklist,
  bars,
  curve,
  funnel,
  clock,
  map: mapScene,
  warning,
  toolkit,
  network,
  target,
  broadcast,
  page,
  inbox,
  storefront,
  video,
};

export const SCENE_NAMES = Object.keys(SCENES);

/** Pick the scene from the title; fall back by slug hash so nothing repeats. */
export function pickScene(title: string, hashed: number): string {
  for (const [re, name] of RULES) {
    if (re.test(title)) return name;
  }
  return SCENE_NAMES[hashed % SCENE_NAMES.length];
}
