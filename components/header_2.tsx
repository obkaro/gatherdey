import { PLASMIC } from "@/plasmic-init";
import TextEffect from "./ui/text_effect";

export function TextEffectPerChar(props: {
  className?: string;
  words?: { text: string }[];
}) {
  return (
    <TextEffect
      words={props.words!.map((word) => word.text)}
      typeSpeed={180}
      backspaceSpeed={60}
      delay={3600}
      backspaceDelay={0}
      className={props.className}
      as="h1"
    />
  );
}

PLASMIC.registerComponent(TextEffectPerChar, {
  name: "TextEffectPerChar",
  props: {
    className: {
      type: "string",
    },
    words: {
      type: "array",
      itemType: {
        type: "object",
        fields: {
          text: {
            type: "string",
          },
        },
        defaultValue: [
          {
            text: "Food",
          },
        ],
      },
    },
  },
});
