import { explorerCopy, houseHero } from "@/lib/house-content";
import { houseParts } from "@/lib/house/parts";
import { ExplorerCaption } from "../explorer/ExplorerCaption";
import { ExplorerDrawing } from "../explorer/ExplorerDrawing";
import { ExplorerLegend } from "../explorer/ExplorerLegend";
import { ExplorerModeSwitch } from "../explorer/ExplorerModeSwitch";
import { ExplorerTray } from "../explorer/ExplorerTray";
import { HouseExplorer } from "../explorer/context";
import { Container, Eyebrow } from "../section";

/**
 * Homepage hero. The house drawing is the site's main navigation: every part opens its service,
 * or, in "Build a quote" mode, goes into a quote list. The numbered legend beside it offers the
 * same actions as a plain list for keyboard, screen reader and small-screen visitors.
 *
 * Layout: on large screens the drawing fills the right column and stays in view while the
 * introduction, legend and quote tray sit on the left. On phones it runs edge to edge between the
 * introduction and the list, so its tap targets stay at least 44px.
 */
export default function HouseHero() {
  const [firstLine, ...rest] = houseHero.title;

  return (
    <section id="house" aria-labelledby="house-title" className="scroll-mt-16 border-b border-charcoal/15 drafting-grid">
      <HouseExplorer parts={houseParts} copy={explorerCopy}>
        <Container className="grid gap-x-14 gap-y-8 pt-8 pb-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:grid-rows-[auto_1fr] lg:pt-12 lg:pb-16">
          <div className="flex flex-col gap-6 lg:col-start-1 lg:row-start-1">
            <Eyebrow>{houseHero.eyebrow}</Eyebrow>
            <h1
              id="house-title"
              className="font-display text-[48px] leading-[0.95] tracking-display sm:text-[64px] xl:text-[84px]"
            >
              <span className="block">{firstLine}</span>
              {rest.map((line) => (
                <span key={line} className="block text-charcoal-700 italic">
                  {line}
                </span>
              ))}
            </h1>
            <p className="max-w-[44ch] text-[17px] leading-7 text-charcoal-700 lg:text-[18px]">{houseHero.intro}</p>
            <ExplorerModeSwitch />
          </div>

          <div className="-mx-4 drawing-in sm:mx-0 lg:sticky lg:top-20 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-start">
            <div className="border-y border-charcoal bg-paper sm:border-x">
              <div className="flex items-center justify-between border-b border-charcoal/20 px-4 py-2">
                <span className="annotation text-charcoal-700">{explorerCopy.sheet.title}</span>
                <span className="annotation text-charcoal-700">{explorerCopy.sheet.scale}</span>
              </div>
              <ExplorerDrawing className="px-0 py-3 sm:px-6 sm:py-6" />
            </div>
            <ExplorerCaption className="border-t-0 px-4 pt-4 sm:px-0" />
          </div>

          <div className="flex flex-col gap-6 lg:col-start-1 lg:row-start-2">
            <ExplorerTray />
            <ExplorerLegend />
          </div>
        </Container>
      </HouseExplorer>
    </section>
  );
}
