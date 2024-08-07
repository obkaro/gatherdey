// Step 2: Import the Divider component
import { Divider } from "@nextui-org/divider";
import React from "react";
import { PLASMIC } from "@/plasmic-init";

// Step 3: Create the Divider component
interface NextuiDividerProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
}

const NextuiDivider: React.FC<NextuiDividerProps> = ({
  orientation = "horizontal",
  className = "",
}) => {
  return <Divider orientation={orientation} className={className} />;
};

// Step 4: Register the Divider component with PLASMIC
PLASMIC.registerComponent(NextuiDivider, {
  name: "NextuiDivider",
  props: {
    orientation: {
      type: "choice",
      options: ["horizontal", "vertical"],
      defaultValueHint: "horizontal",
    },
  },
});

export default NextuiDivider;
