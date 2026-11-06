import { RoofExplorerProvider } from "@/features/roof-explorer/RoofExplorerProvider";
import {
  ExplodeSlider,
  LayerDetail,
  LayerList,
  ViewPicker,
} from "@/features/roof-explorer/components/RoofExplorerControls";
import { RoofExplorerStage } from "@/features/roof-explorer/components/RoofExplorerStage";
import { roofExplorer, roofingIntro } from "@/lib/roofing-content";

// The roofing intro beside the interactive roof section. Text is server-rendered; the controls and
// the 3D view share the explorer state, so every action in the canvas also exists as a control.
// Small screens stack intro, model, controls; large screens put the model in a sticky column.
export default function RoofExplorerSection() {
  return (
    <section id="roof-explorer" aria-labelledby="roof-explorer-title" className="scroll-mt-20 px-3 pb-24 sm:px-6 lg:px-10 lg:pb-36">
      <RoofExplorerProvider>
        <div className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-x-12 lg:gap-y-8">
          <div className="flex flex-col gap-4 px-2 lg:px-0 lg:pt-4">
            <p className="text-[12px] font-semibold tracking-label text-gold uppercase">{roofingIntro.eyebrow}</p>
            <h2
              id="roof-explorer-title"
              className="font-heading text-[32px] leading-[1.02] font-semibold tracking-tightest text-white sm:text-[40px]"
            >
              {roofingIntro.title}
            </h2>
            <p className="text-[16px] leading-relaxed text-white/75">{roofingIntro.text}</p>
          </div>

          <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <div className="flex flex-col gap-4 lg:sticky lg:top-24">
              <div className="lg:h-[calc(100svh-11rem)] lg:max-h-[52rem]">
                <RoofExplorerStage />
              </div>
              <div className="px-2">
                <ViewPicker />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5 px-2 lg:px-0">
            <h3 className="font-heading text-[20px] font-semibold text-white">{roofExplorer.title}</h3>
            <ExplodeSlider />
            <LayerList />
            <LayerDetail />
          </div>
        </div>
      </RoofExplorerProvider>
    </section>
  );
}
