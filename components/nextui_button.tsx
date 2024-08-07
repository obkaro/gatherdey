import React from "react";
import { Button } from "@nextui-org/react";
import { PLASMIC } from "@/plasmic-init";

interface NextuiButtonProps {
  className?: string;
  children?: React.ReactNode;
  variant?:
    | "solid"
    | "bordered"
    | "light"
    | "flat"
    | "faded"
    | "shadow"
    | "ghost";
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  size?: "sm" | "md" | "lg";
  radius?: "none" | "sm" | "md" | "lg" | "full";
  hasStart?: boolean;
  hasEnd?: boolean;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  spinner?: React.ReactNode;
  spinnerPlacement?: "start" | "end";
  fullWidth?: boolean;
  isIconOnly?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  disableRipple?: boolean;
  disableAnimation?: boolean;
  onPress?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function NextuiButton({
  className,
  children,
  variant = "solid",
  color = "default",
  size = "md",
  radius,
  hasStart,
  hasEnd,
  startContent,
  endContent,
  spinner,
  spinnerPlacement = "start",
  fullWidth = false,
  isIconOnly = false,
  isDisabled = false,
  isLoading = false,
  disableRipple = false,
  disableAnimation = false,
  onPress,
}: NextuiButtonProps) {
  return (
    <Button
      className={className}
      variant={variant}
      color={color}
      size={size}
      radius={radius}
      fullWidth={fullWidth}
      isIconOnly={isIconOnly}
      isDisabled={isDisabled}
      isLoading={isLoading}
      disableRipple={disableRipple}
      disableAnimation={disableAnimation}
      onClick={onPress}
    >
      {startContent && hasStart && (
        <span className="start-content">{startContent}</span>
      )}
      {isLoading && spinnerPlacement === "start" && (
        <span className="spinner">{spinner}</span>
      )}
      {children}
      {isLoading && spinnerPlacement === "end" && (
        <span className="spinner">{spinner}</span>
      )}
      {endContent && hasEnd && (
        <span className="end-content">{endContent}</span>
      )}
    </Button>
    // <Button
    //   className={className}
    //   variant={variant}
    //   color={color}
    //   size={size}
    //   radius={radius}
    //   fullWidth={fullWidth}
    //   isIconOnly={isIconOnly}
    //   isDisabled={isDisabled}
    //   isLoading={isLoading}
    //   disableRipple={disableRipple}
    //   disableAnimation={disableAnimation}
    //   onClick={onPress}
    // >
    //   {startContent && hasStart && (
    //     <span className="start-content">{startContent}</span>
    //   )}
    //   {/* {isLoading && spinnerPlacement === "start" && (
    //     <span className="spinner">{spinner}</span>
    //   )} */}
    //   {children}
    //   {/* {isLoading && spinnerPlacement === "end" && (
    //     <span className="spinner">{spinner}</span>
    //   )} */}
    //   {endContent && hasEnd && (
    //     <span className="end-content">{endContent}</span>
    //   )}
    // </Button>
  );
}

PLASMIC.registerComponent(NextuiButton, {
  name: "NextuiButton",
  props: {
    children: {
      type: "slot",
      defaultValue: "Button",
    },
    variant: {
      type: "choice",
      options: [
        "solid",
        "bordered",
        "light",
        "flat",
        "faded",
        "shadow",
        "ghost",
      ],
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
    },
    hasStart: { type: "boolean", defaultValue: false },
    hasEnd: { type: "boolean", defaultValue: false },
    startContent: {
      type: "slot",
      hidden: (props) => !props.hasStart,
    },
    endContent: {
      type: "slot",
      hidden: (props) => !props.hasEnd,
    },
    spinner: {
      type: "slot",
      hidden: (props) => !props.isLoading,
    },
    spinnerPlacement: {
      type: "choice",
      options: ["start", "end"],
      defaultValue: "start",
    },
    fullWidth: {
      type: "boolean",
      defaultValueHint: false,
    },
    isIconOnly: {
      type: "boolean",
      defaultValueHint: false,
    },
    isDisabled: {
      type: "boolean",
      defaultValueHint: false,
    },
    isLoading: {
      type: "boolean",
      defaultValueHint: false,
    },
    disableRipple: {
      type: "boolean",
      defaultValueHint: false,
    },
    disableAnimation: {
      type: "boolean",
      defaultValueHint: false,
    },
    onPress: {
      type: "eventHandler",
      argTypes: [
        {
          name: "string",
          type: "object",
        },
      ],
    },
  },
});
