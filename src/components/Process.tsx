import Slot from "./layout/Slot";
import { ProcessCards, ProcessSplit, ProcessTimeline, type ProcessProps } from "./process/ProcessVariants";

export type { ProcessStep } from "./process/ProcessVariants";

export default function Process(props: ProcessProps) {
  return (
    <Slot
      name="process"
      fallback="split"
      variants={{
        split: <ProcessSplit {...props} />,
        timeline: <ProcessTimeline {...props} />,
        cards: <ProcessCards {...props} />,
      }}
    />
  );
}
