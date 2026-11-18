/**
 * AI stack data — the AI tools Zeppstr uses at each stage of the work.
 * Shared by the homepage AIStack section and its design options.
 * Approved by Nitish 18 Nov 2026. Only list tools the team actually uses.
 *
 * Logos: official marks from the open-source icon sets simple-icons (CC0) and
 * @lobehub/icons (MIT), exported to /public/ai-tool-logos/. Still needed as
 * files from the team: Canva, Higgsfield, HeyGen, Apollo, Clay, Supermetrics.
 */
export interface AITool {
  name: string;
  /** File stem in /public/ai-tool-logos/ (svg). Missing = logo not supplied yet. */
  logo?: string;
}

export interface AIStage {
  stage: string;
  line: string;
  tools: AITool[];
}

export const AI_STAGES: AIStage[] = [
  {
    stage: "Research & strategy",
    line: "Market, competitor, keyword and audience research, done in days.",
    tools: [
      { name: "Claude", logo: "claude" },
      { name: "ChatGPT", logo: "chatgpt" },
      { name: "Perplexity", logo: "perplexity" },
      { name: "Gemini", logo: "gemini" },
    ],
  },
  {
    stage: "Content & copy",
    line: "First drafts of web, ad, email and social copy, then edited by our writers.",
    tools: [
      { name: "Claude", logo: "claude" },
      { name: "ChatGPT", logo: "chatgpt" },
      { name: "Grammarly", logo: "grammarly" },
    ],
  },
  {
    stage: "Design & creative",
    line: "Concepts, layouts, ad variations and imagery.",
    tools: [
      { name: "Figma", logo: "figma" },
      { name: "Midjourney", logo: "midjourney" },
      { name: "Adobe Firefly", logo: "adobe-firefly" },
      { name: "Canva" },
    ],
  },
  {
    stage: "Video & voice",
    line: "Short-form video, motion and voiceovers.",
    tools: [
      { name: "Higgsfield" },
      { name: "Runway", logo: "runway" },
      { name: "ElevenLabs", logo: "elevenlabs" },
      { name: "HeyGen" },
    ],
  },
  {
    stage: "Build & development",
    line: "Design to working code, faster builds, cleaner launches.",
    tools: [
      { name: "Claude Code", logo: "claude-code" },
      { name: "Vercel", logo: "vercel" },
      { name: "Cursor", logo: "cursor" },
      { name: "GitHub Copilot", logo: "github-copilot" },
    ],
  },
  {
    stage: "Prospecting & CRM",
    line: "Finding decision-makers, enriching leads and scoring them before handover.",
    tools: [
      { name: "Apollo" },
      { name: "Clay" },
      { name: "HubSpot", logo: "hubspot" },
    ],
  },
  {
    stage: "Ads & optimisation",
    line: "Bidding, audience targeting and budget moved to what converts.",
    tools: [
      { name: "Google Ads (Performance Max)", logo: "google-ads" },
      { name: "Meta Advantage+", logo: "meta" },
    ],
  },
  {
    stage: "Analytics & reporting",
    line: "Daily data pulls, problem alerts, client reports.",
    tools: [
      { name: "Supermetrics" },
      { name: "Google Analytics 4", logo: "google-analytics" },
      { name: "Looker Studio", logo: "looker" },
    ],
  },
  {
    stage: "Automation",
    line: "Connecting every tool so leads and data move without manual work.",
    tools: [
      { name: "Zapier", logo: "zapier" },
      { name: "Make", logo: "make" },
      { name: "n8n", logo: "n8n" },
    ],
  },
];
