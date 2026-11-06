import Slot from "./layout/Slot";
import { HeroCard, HeroCentered, HeroEditorial, HeroFullSplit, HeroOverlay, HeroSplit, type HeroProps } from "./hero/HeroVariants";

export default function Hero(props: HeroProps) {
  return (
    <Slot
      name="hero"
      fallback="overlay"
      variants={{
        overlay: <HeroOverlay {...props} />,
        split: <HeroSplit {...props} />,
        centered: <HeroCentered {...props} />,
        editorial: <HeroEditorial {...props} />,
        card: <HeroCard {...props} />,
        fullsplit: <HeroFullSplit {...props} />,
      }}
    />
  );
}
