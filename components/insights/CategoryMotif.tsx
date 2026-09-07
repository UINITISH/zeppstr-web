interface CategoryMotifProps {
  category: string;
  color: string;
  className?: string;
}

/**
 * Per-category line motif used on article covers.
 *
 * Each shape carries the idea of its category rather than decorating for the
 * sake of it: an authority graph for search, a compounding curve for growth,
 * spend columns for paid, a funnel for conversion, concentric bands for
 * industry work. Pure SVG — no assets, no network request, scales cleanly.
 */
export function CategoryMotif({ category, color, className }: CategoryMotifProps) {
  const common = {
    className,
    viewBox: "0 0 200 200",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true as const,
  };

  switch (category) {
    // Authority graph — nodes earning links
    case "seo-search":
      return (
        <svg {...common}>
          <g stroke={color} strokeWidth="1.25" opacity="0.55">
            <path d="M100 100 L40 45M100 100 L165 55M100 100 L35 150M100 100 L155 155M100 100 L100 22M40 45 L35 150M165 55 L155 155" />
          </g>
          <g fill={color}>
            <circle cx="100" cy="100" r="9" />
            <circle cx="40" cy="45" r="5" opacity="0.85" />
            <circle cx="165" cy="55" r="5" opacity="0.85" />
            <circle cx="35" cy="150" r="5" opacity="0.7" />
            <circle cx="155" cy="155" r="5" opacity="0.7" />
            <circle cx="100" cy="22" r="4" opacity="0.55" />
          </g>
        </svg>
      );

    // Compounding curve — slow start, steep return
    case "growth-strategy":
      return (
        <svg {...common}>
          <path
            d="M20 175 C70 172 108 150 132 108 C150 76 162 46 180 25"
            stroke={color}
            strokeWidth="2.25"
            strokeLinecap="round"
          />
          <path
            d="M20 175 C70 172 108 150 132 108 C150 76 162 46 180 25 L180 175 Z"
            fill={color}
            opacity="0.12"
          />
          <g stroke={color} strokeWidth="1" opacity="0.3">
            <path d="M20 175 H180M20 130 H180M20 85 H180M20 40 H180" />
          </g>
          <circle cx="180" cy="25" r="6" fill={color} />
        </svg>
      );

    // Spend allocation columns
    case "performance-paid":
      return (
        <svg {...common}>
          <g fill={color}>
            <rect x="24" y="120" width="24" height="56" opacity="0.45" rx="2" />
            <rect x="62" y="92" width="24" height="84" opacity="0.6" rx="2" />
            <rect x="100" y="60" width="24" height="116" opacity="0.8" rx="2" />
            <rect x="138" y="36" width="24" height="140" rx="2" />
          </g>
          <path d="M18 176 H182" stroke={color} strokeWidth="1.5" opacity="0.5" />
        </svg>
      );

    // Conversion funnel — traffic in, revenue out
    case "conversion-experience":
      return (
        <svg {...common}>
          <g fill={color}>
            <path d="M22 30 H178 L152 68 H48 Z" opacity="0.8" />
            <path d="M52 82 H148 L128 120 H72 Z" opacity="0.55" />
            <path d="M76 134 H124 L110 170 H90 Z" opacity="0.35" />
          </g>
          <path
            d="M100 174 V186"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );

    // Send cadence — a sequence firing over time, with drop-off
    case "email-lifecycle":
      return (
        <svg {...common}>
          <g fill={color}>
            <rect x="24" y="52" width="46" height="34" rx="3" opacity="0.85" />
            <rect x="82" y="62" width="42" height="31" rx="3" opacity="0.6" />
            <rect x="136" y="72" width="38" height="28" rx="3" opacity="0.4" />
          </g>
          <g stroke={color} strokeWidth="1.25" opacity="0.5">
            <path d="M24 52 L47 72 L70 52M82 62 L103 79 L124 62M136 72 L155 87 L174 72" />
          </g>
          <path
            d="M28 150 Q70 118 112 138 T176 122"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="28" cy="150" r="4" fill={color} />
          <circle cx="176" cy="122" r="4" fill={color} opacity="0.6" />
        </svg>
      );

    // Distribution web — one asset, many surfaces
    case "social-content":
      return (
        <svg {...common}>
          <g stroke={color} strokeWidth="1.25" opacity="0.5">
            <path d="M100 96 L36 44M100 96 L164 44M100 96 L28 128M100 96 L172 128M100 96 L100 172" />
          </g>
          <rect
            x="78"
            y="74"
            width="44"
            height="44"
            rx="6"
            fill={color}
            opacity="0.9"
          />
          <g fill={color}>
            <circle cx="36" cy="44" r="9" opacity="0.75" />
            <circle cx="164" cy="44" r="7" opacity="0.6" />
            <circle cx="28" cy="128" r="6" opacity="0.5" />
            <circle cx="172" cy="128" r="8" opacity="0.65" />
            <circle cx="100" cy="172" r="6" opacity="0.45" />
          </g>
        </svg>
      );

    // Concentric bands — market structure
    default:
      return (
        <svg {...common}>
          <g stroke={color} fill="none">
            <circle cx="100" cy="100" r="78" strokeWidth="1" opacity="0.3" />
            <circle cx="100" cy="100" r="56" strokeWidth="1.25" opacity="0.45" />
            <circle cx="100" cy="100" r="34" strokeWidth="1.75" opacity="0.7" />
          </g>
          <circle cx="100" cy="100" r="12" fill={color} />
          <path
            d="M100 22 A78 78 0 0 1 178 100"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      );
  }
}
