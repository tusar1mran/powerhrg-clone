import Slot from "./layout/Slot";
import { ServicesBento, ServicesCards, ServicesList, ServicesScroller, ServicesTiles } from "./services-section/ServicesVariants";

export default function ServicesGrid() {
  return (
    <Slot
      name="services"
      fallback="bento"
      variants={{
        bento: <ServicesBento />,
        cards: <ServicesCards />,
        list: <ServicesList />,
        scroller: <ServicesScroller />,
        tiles: <ServicesTiles />,
      }}
    />
  );
}
