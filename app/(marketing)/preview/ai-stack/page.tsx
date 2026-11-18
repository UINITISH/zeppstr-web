import type { Metadata } from "next";
import { GlobalNav } from "@/components/nav/GlobalNav";
import { AIStack } from "@/components/blocks/AIStack";
import { AIStackPipeline } from "@/components/blocks/ai-stack/AIStackPipeline";
import { AIStackTabs } from "@/components/blocks/ai-stack/AIStackTabs";
import { AIStackIndex } from "@/components/blocks/ai-stack/AIStackIndex";

/* Internal design review page (18 Nov 2026). Not linked, not indexed.
   Delete once an option is chosen. /preview/ is also disallowed in robots.ts. */
export const metadata: Metadata = {
  title: "AI stack — design options",
  robots: { index: false, follow: false },
};

function Label({ letter, name, note }: { letter: string; name: string; note: string }) {
  return (
    <div className="bg-brand-yellow">
      <div className="container-layout py-5 flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <span className="font-display font-bold text-[22px] text-ink-headline">Option {letter} — {name}</span>
        <span className="font-body text-body-sm text-ink-headline/80">{note}</span>
      </div>
    </div>
  );
}

export default function AIStackOptions() {
  return (
    <>
      <GlobalNav />
      <main>
        <Label letter="A" name="Pipeline" note="One horizontal rail, stage to stage. Scroll sideways to follow the process." />
        <AIStackPipeline />
        <Label letter="B" name="Explorer" note="Hover or tap a stage on the left; its tools show in the dark panel." />
        <AIStackTabs />
        <Label letter="C" name="Index" note="Editorial list, one row per stage. Row turns yellow on hover." />
        <AIStackIndex />
        <Label letter="Current" name="Grid (live on home page now)" note="For comparison." />
        <AIStack />
      </main>
    </>
  );
}
