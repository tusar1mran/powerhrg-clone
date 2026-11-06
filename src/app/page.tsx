import ProcessSteps from "@/components/home/ProcessSteps";
import PromiseGrid from "@/components/home/PromiseGrid";
import QuoteCta from "@/components/home/QuoteCta";
import { ChapterSection } from "@/features/walkaround/components/ChapterSection";
import { SelectionTray } from "@/features/walkaround/components/SelectionTray";
import { WalkaroundIntro } from "@/features/walkaround/components/WalkaroundIntro";
import { WalkaroundRoot, WalkaroundTrack } from "@/features/walkaround/components/WalkaroundLayout";
import { WalkaroundStage } from "@/features/walkaround/components/WalkaroundStage";
import { homeCta, services } from "@/lib/content";

// The homepage is a walk around a 3D house: the hero, then one chapter per service while the camera
// moves to that part of the house, then how a project works, the crew promise and a quote CTA.
// The page itself is static HTML; only the stage, the scroll timeline and the quote tray hydrate.
export default function Home() {
  return (
    <main id="main" className="dark bg-charcoal-950 text-foreground">
      <WalkaroundRoot>
        <WalkaroundStage />
        <WalkaroundTrack>
          <WalkaroundIntro />
          {services.map((service) => (
            <ChapterSection key={service.name} service={{ name: service.name, href: service.href, text: service.text }} />
          ))}
        </WalkaroundTrack>
        <SelectionTray />
      </WalkaroundRoot>
      <ProcessSteps />
      <PromiseGrid />
      <QuoteCta {...homeCta} />
    </main>
  );
}
