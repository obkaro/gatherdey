import React from "react";
import { Chip } from "@nextui-org/react";
import { PLASMIC } from "@/plasmic-init";

import { PressEvent } from "@react-types/shared"; // Adjust the import path as necessary

interface NextuiChipProps {
  className?: string;
  children?: React.ReactNode;
  variant?:
    | "solid"
    | "bordered"
    | "light"
    | "flat"
    | "faded"
    | "shadow"
    | "dot";
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  size?: "sm" | "md" | "lg";
  radius?: "none" | "sm" | "md" | "lg" | "full";
  avatar?: React.ReactNode;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  isDisabled?: boolean;
  classNames?: Record<
    "base" | "content" | "dot" | "avatar" | "closeButton",
    string
  >;
  onClose?: (e: PressEvent) => void;
}

function NextuiChip({
  children,
  className,
  variant = "solid",
  color = "default",
  size = "md",
  radius = "full",
  avatar,
  startContent,
  endContent,
  isDisabled = false,
  classNames,
  onClose,
}: NextuiChipProps) {
  return (
    <Chip
      className={className}
      variant={variant}
      color={color}
      size={size}
      radius={radius}
      avatar={avatar}
      startContent={startContent}
      endContent={endContent}
      isDisabled={isDisabled}
      classNames={classNames}
      onClose={onClose}
    >
      {children}
      {/* {startContent && (
        <span className={classNames?.avatar}>{startContent}</span>
      )}
      {!startContent && avatar && (
        <span className={classNames?.avatar}>{avatar}</span>
      )}
      <span className={classNames?.content}>{children}</span>
      {endContent && (
        <span className={classNames?.closeButton}>{endContent}</span>
      )} */}
    </Chip>
  );
}

PLASMIC.registerComponent(NextuiChip, {
  name: "NextuiChip",
  props: {
    children: {
      type: "slot",
      defaultValue: "Chip",
    },
    variant: {
      type: "choice",
      options: ["solid", "bordered", "light", "flat", "faded", "shadow", "dot"],
      defaultValueHint: "solid",
    },
    color: {
      type: "choice",
      options: [
        "default",
        "primary",
        "secondary",
        "success",
        "warning",
        "danger",
      ],
      defaultValueHint: "default",
    },
    size: {
      type: "choice",
      options: ["sm", "md", "lg"],
      defaultValueHint: "md",
    },
    radius: {
      type: "choice",
      options: ["none", "sm", "md", "lg", "full"],
      defaultValueHint: "full",
    },
    avatar: {
      type: "slot",
      hidePlaceholder: true,
    },
    startContent: {
      type: "slot",
      hidePlaceholder: true,
    },
    endContent: {
      type: "slot",
      hidePlaceholder: true,
    },
    isDisabled: {
      type: "boolean",
      defaultValueHint: false,
    },
    classNames: {
      type: "object",
      defaultValueHint: {},
    },
    onClose: {
      type: "eventHandler",
      argTypes: [
        {
          name: "e",
          type: "object",
        },
      ],
    },
  },
});
