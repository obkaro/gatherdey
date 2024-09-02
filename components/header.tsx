import { PLASMIC } from "@/plasmic-init";

import { TextEffectPerChar } from "./header_2";

export function HeroText(props: { className?: string }) {
  return (
    <h1>
      Explore Nigerian <TextEffectPerChar /> in Toronto
    </h1>
  );
}

PLASMIC.registerComponent(HeroText, {
  name: "HeroText",
  props: {
    className: {
      type: "string",
    },
  },
});
