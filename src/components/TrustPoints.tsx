import Slot from "./layout/Slot";
import { TrustCards, TrustList, TrustStrip, type TrustProps } from "./trust/TrustVariants";

export default function TrustPoints(props: TrustProps) {
  return (
    <Slot
      name="trust"
      fallback="cards"
      variants={{
        cards: <TrustCards {...props} />,
        list: <TrustList {...props} />,
        strip: <TrustStrip {...props} />,
      }}
    />
  );
}
