import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
import zukeeper from "zukeeper";

export const store = create(
  zukeeper((set) => ({
    tests: {
      MBTI: null,
      Enneagram: null,
      BigFive: null,
      IQ: null,
      EQ: null,
      Astrology: null,
      Mindset: null,
      Grit: null,
      LoveLanguages: null,
      AttachmentStyle: null,
      FlirtingStyle: null,
      FisherTemperamentInventory: null,
      GallupStrengthsFinder: null,
      DISC: null,
      ViaCareerStrengths: null,
    },
    updateTests: (newTests) =>
      set((state) => ({
        tests: {
          ...state.tests,
          ...newTests,
        },
      })),
  }))
);

window.store = store;
mountStoreDevtool("Store", store);
