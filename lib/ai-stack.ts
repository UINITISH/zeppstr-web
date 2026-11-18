/**
 * AI stack data — the AI tools Zeppstr uses at each stage of the work.
 * Shared by the homepage AIStack section and its design options.
 * Approved by Nitish 18 Nov 2026. Only list tools the team actually uses.
 */
export interface AIStage {
  stage: string;
  line: string;
  tools: string[];
}

export const AI_STAGES: AIStage[] = [
  {
    stage: "Research & strategy",
    line: "Market, competitor, keyword and audience research, done in days.",
    tools: ["Claude", "ChatGPT", "Perplexity", "Gemini"],
  },
  {
    stage: "Content & copy",
    line: "First drafts of web, ad, email and social copy, then edited by our writers.",
    tools: ["Claude", "ChatGPT", "Grammarly"],
  },
  {
    stage: "Design & creative",
    line: "Concepts, layouts, ad variations and imagery.",
    tools: ["Figma", "Midjourney", "Adobe Firefly", "Canva"],
  },
  {
    stage: "Video & voice",
    line: "Short-form video, motion and voiceovers.",
    tools: ["Higgsfield", "Runway", "ElevenLabs", "HeyGen"],
  },
  {
    stage: "Build & development",
    line: "Design to working code, faster builds, cleaner launches.",
    tools: ["Claude Code", "Vercel", "Cursor", "GitHub Copilot"],
  },
  {
    stage: "Prospecting & CRM",
    line: "Finding decision-makers, enriching leads and scoring them before handover.",
    tools: ["Apollo", "Clay", "HubSpot"],
  },
  {
    stage: "Ads & optimisation",
    line: "Bidding, audience targeting and budget moved to what converts.",
    tools: ["Google Ads (Performance Max)", "Meta Advantage+"],
  },
  {
    stage: "Analytics & reporting",
    line: "Daily data pulls, problem alerts, client reports.",
    tools: ["Supermetrics", "Google Analytics 4", "Looker Studio"],
  },
  {
    stage: "Automation",
    line: "Connecting every tool so leads and data move without manual work.",
    tools: ["Zapier", "Make", "n8n"],
  },
];
