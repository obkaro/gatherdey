import React, { Ref } from "react";
import {
  Pagination,
  PaginationItem,
  PaginationCursor,
} from "@nextui-org/pagination";
import { PLASMIC } from "@/plasmic-init";

export type PaginationItemRenderProps = {
  ref?: Ref<any>;
  value: any;
  index: number;
  activePage: number;
  isActive: boolean;
  isFirst: boolean;
  isLast: boolean;
  isNext: boolean;
  isPrevious: boolean;
  className: string;
  onNext: () => void;
  onPrevious: () => void;
  setPage: (page: number) => void;
};

interface PaginationProps {
  variant?: "flat" | "bordered" | "light" | "faded";
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  size?: "sm" | "md" | "lg";
  radius?: "none" | "sm" | "md" | "lg" | "full";
  total?: number;
  dotsJump?: number;
  initialPage?: number;
  page?: number;
  siblings?: number;
  boundaries?: number;
  loop?: boolean;
  isCompact?: boolean;
  isDisabled?: boolean;
  showShadow?: boolean;
  showControls?: boolean;
  disableCursorAnimation?: boolean;
  renderItem?: (props: PaginationItemRenderProps) => React.ReactNode;
  getItemAriaLabel?: (page: string) => string;
  disableAnimation?: boolean;
  classNames?: Record<
    | "base"
    | "wrapper"
    | "prev"
    | "next"
    | "item"
    | "cursor"
    | "forwardIcon"
    | "ellipsis"
    | "chevronNext",
    string
  >;
  onChange?: (page: number) => void;
}

const NextuiPagination: React.FC<PaginationProps> = ({
  variant = "flat",
  color = "default",
  size = "md",
  radius = "xl",
  total = 1,
  dotsJump = 5,
  initialPage = 1,
  page,
  siblings = 1,
  boundaries = 1,
  loop = false,
  isCompact = false,
  isDisabled = false,
  showShadow = false,
  showControls = false,
  disableCursorAnimation = false,
  renderItem,
  getItemAriaLabel,
  disableAnimation = false,
  classNames,
  onChange,
}) => {
  // Implement the Pagination component logic here
  return (
    <nav
      role="navigation"
      data-controls={showControls}
      data-loop={loop}
      data-dots-jump={dotsJump}
      data-total={total}
      data-active-page={page || initialPage}
      className={`pagination ${variant} ${color} ${size} ${radius} ${
        isCompact ? "compact" : ""
      } ${isDisabled ? "disabled" : ""} ${showShadow ? "shadow" : ""} ${
        disableCursorAnimation ? "no-animation" : ""
      }`}
    >
      {/* Render pagination items here */}
      {renderItem &&
        renderItem({
          ref: null,
          value: null,
          index: 0,
          activePage: page || initialPage,
          isActive: false,
          isFirst: false,
          isLast: false,
          isNext: false,
          isPrevious: false,
          className: "",
          onNext: () => {},
          onPrevious: () => {},
          setPage: (page: number) => {},
        })}
    </nav>
  );
};

// Register Pagination Component with Plasmic
PLASMIC.registerComponent(Pagination, {
  name: "NextuiPagination",
  props: {
    variant: {
      type: "choice",
      options: ["flat", "bordered", "light", "faded"],
      defaultValueHint: "flat",
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
      defaultValueHint: "xl",
    },
    total: {
      type: "number",
      defaultValueHint: 1,
    },
    dotsJump: {
      type: "number",
      defaultValueHint: 5,
    },
    initialPage: {
      type: "number",
      defaultValueHint: 1,
    },
    page: {
      type: "number",
    },
    siblings: {
      type: "number",
      defaultValueHint: 1,
    },
    boundaries: {
      type: "number",
      defaultValueHint: 1,
    },
    loop: {
      type: "boolean",
      defaultValueHint: false,
    },
    isCompact: {
      type: "boolean",
      defaultValueHint: false,
    },
    isDisabled: {
      type: "boolean",
      defaultValueHint: false,
    },
    showShadow: {
      type: "boolean",
      defaultValueHint: false,
    },
    showControls: {
      type: "boolean",
      defaultValueHint: false,
    },
    disableCursorAnimation: {
      type: "boolean",
      defaultValueHint: false,
    },
    disableAnimation: {
      type: "boolean",
      defaultValueHint: false,
    },
    renderItem: {
      type: "eventHandler",
      argTypes: [
        {
          name: "props",
          type: "object",
        },
      ],
    },
    onChange: {
      type: "eventHandler",
      argTypes: [
        {
          name: "page",
          type: "number",
        },
      ],
    },
  },
});

export default NextuiPagination;
