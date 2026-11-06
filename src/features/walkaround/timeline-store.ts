// A tiny external store for the scroll timeline. Scroll updates arrive up to 60 times a second,
// so they bypass React state: the 3D scene reads the value inside its frame loop, and React
// components subscribe only to derived values that rarely change (e.g. the active chapter).
export type TimelineStore = {
  get: () => number;
  set: (value: number) => void;
  subscribe: (listener: () => void) => () => void;
};

export function createTimelineStore(initial = 0): TimelineStore {
  let value = initial;
  const listeners = new Set<() => void>();

  return {
    get: () => value,
    set: (next) => {
      if (Object.is(next, value)) {
        return;
      }
      value = next;
      for (const listener of listeners) {
        listener();
      }
    },
    subscribe: (listener) => {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
  };
}
