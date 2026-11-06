import { atticLayers, roofLayers, wallLayers } from "@/lib/house/layers";
import { atticStory, roofStory, storyIntro, wallStory } from "@/lib/house-content";
import { AtticLayersExploded } from "../story/AtticLayers";
import { RoofLayersExploded } from "../story/RoofLayers";
import { StoryChapter } from "../story/StoryChapter";
import { WallLayersExploded } from "../story/WallLayers";
import { Container, SectionHeader } from "../section";

/** "Take the house apart": the roof, wall and attic, each drawn layer by layer with notes. */
export default function TakeApart() {
  return (
    <section aria-labelledby="take-apart-title" className="py-16 lg:py-24">
      <Container>
        <SectionHeader eyebrow={storyIntro.eyebrow} title={storyIntro.title} titleId="take-apart-title" className="mb-12 lg:mb-16">
          <p>{storyIntro.text}</p>
        </SectionHeader>

        <StoryChapter chapter={roofStory} order={roofLayers} figure={<RoofLayersExploded />} figureSide="start" />
        <StoryChapter chapter={wallStory} order={wallLayers} figure={<WallLayersExploded />} figureSide="end" />
        <StoryChapter chapter={atticStory} order={atticLayers} figure={<AtticLayersExploded />} figureSide="start" />
      </Container>
    </section>
  );
}
