import React, { useState } from "react";
import { MotionProps } from "framer-motion";
import { PLASMIC } from "@/plasmic-init";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";

// Define Navbar Props
interface NavbarProps {
  children: React.ReactNode[];
  className?: string;
  height?: string | number;
  position?: "static" | "sticky";
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  parentRef?: React.RefObject<HTMLElement>;
  isBordered?: boolean;
  isBlurred?: boolean;
  isMenuOpen?: boolean;
  isMenuDefaultOpen?: boolean;
  shouldHideOnScroll?: boolean;
  motionProps?: MotionProps;
  disableScrollHandler?: boolean;
  disableAnimation?: boolean;
  classNames?: Record<
    | "base"
    | "wrapper"
    | "brand"
    | "content"
    | "item"
    | "toggle"
    | "toggleIcon"
    | "menu"
    | "menuItem",
    string
  >;
  onMenuOpenChange?: (isOpen: boolean) => void;
  onScrollPositionChange?: (position: number) => void;
}

// Define Navbar Component
function NextuiNavbar({
  children,
  className,
  height = "4rem",
  position = "sticky",
  maxWidth = "lg",
  parentRef,
  isBordered = false,
  isBlurred = true,
  isMenuOpen = false,
  isMenuDefaultOpen = false,
  shouldHideOnScroll = false,
  motionProps,
  disableScrollHandler = false,
  disableAnimation = false,
  classNames,
  onMenuOpenChange,
  onScrollPositionChange,
}: NavbarProps) {
  //   const [isMenuOpen, setIsMenuOpen] = useState(isMenuDefaultOpen);

  //   const handleMenuToggle = () => {
  //     const newIsMenuOpen = !isMenuOpen;
  //     setIsMenuOpen(newIsMenuOpen);
  //     onMenuOpenChange?.(newIsMenuOpen);
  //   };

  return (
    <Navbar
      className={className}
      height={height}
      position={position}
      maxWidth={maxWidth}
      isBordered={isBordered}
      isBlurred={isBlurred}
      isMenuOpen={isMenuOpen}
      isMenuDefaultOpen={isMenuDefaultOpen}
      shouldHideOnScroll={shouldHideOnScroll}
      motionProps={motionProps}
      disableScrollHandler={disableScrollHandler}
      disableAnimation={disableAnimation}
      classNames={classNames}
      onMenuOpenChange={onMenuOpenChange}
      onScrollPositionChange={onScrollPositionChange}
    >
      {children}
    </Navbar>
  );
}

// Define NavbarContent Props
interface NavbarContentProps {
  children: React.ReactNode[];
  justify?: "start" | "center" | "end";
}

// Define NavbarContent Component
function NextuiNavbarContent({
  children,
  justify = "start",
}: NavbarContentProps) {
  return <NavbarContent data-justify={justify}>{children}</NavbarContent>;
}

// Define NavbarItem Props
interface NavbarItemProps {
  children: React.ReactNode;
  isActive?: boolean;
  className?: string;
}

// Define NavbarItem Component
function NextuiNavbarItem({
  children,
  isActive = false,
  className,
}: NavbarItemProps) {
  return (
    <NavbarItem data-active={isActive} className={className}>
      {children}
    </NavbarItem>
  );
}

// Define NavbarMenuToggle Props
interface NavbarMenuToggleProps {
  icon:
    | React.ReactNode
    | ((isOpen: boolean | undefined) => React.ReactNode | null);
  isSelected?: boolean;
  defaultSelected?: boolean;
  srOnlyText?: string;
  onChange?: (isOpen: boolean) => void;
  className?: string;
}

// Define NavbarMenuToggle Component
function NextuiNavbarMenuToggle({
  icon,
  isSelected = false,
  defaultSelected = false,
  srOnlyText = "open/close navigation menu",
  onChange,
  className,
}: NavbarMenuToggleProps) {
  const [isOpen, setIsOpen] = useState(defaultSelected);

  const handleToggle = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    onChange?.(newIsOpen);
  };

  return (
    <NavbarMenuToggle
      data-open={isOpen}
      data-pressed={isSelected}
      onClick={handleToggle}
      onChange={onChange}
      className={className}
    >
      {typeof icon === "function" ? icon(isOpen) : icon}
      <span className="sr-only">{srOnlyText}</span>
    </NavbarMenuToggle>
  );
}

interface NavbarMenuProps {
  children: React.ReactNode[];
  portalContainer?: HTMLElement;
  motionProps?: MotionProps;
}

function NextuiNavbarMenu({
  children,
  portalContainer,
  motionProps,
}: NavbarMenuProps) {
  const defaultPortalContainer =
    typeof document !== "undefined" ? document.body : undefined;

  return (
    <NavbarMenu
      portalContainer={portalContainer || defaultPortalContainer}
      motionProps={motionProps}
    >
      {children}
    </NavbarMenu>
  );
}

// Define NavbarMenuItem Props
interface NavbarMenuItemProps {
  children: React.ReactNode;
  isActive?: boolean;
}

// Define NavbarMenuItem Component
function NextuiNavbarMenuItem({
  children,
  isActive = false,
}: NavbarMenuItemProps) {
  return <NavbarMenuItem data-active={isActive}>{children}</NavbarMenuItem>;
}
// Export Components
export {
  NextuiNavbar,
  NextuiNavbarContent,
  NextuiNavbarItem,
  NextuiNavbarMenuToggle,
  NextuiNavbarMenu,
  NextuiNavbarMenuItem,
};

PLASMIC.registerComponent(NextuiNavbar, {
  name: "NextuiNavbar",
  props: {
    children: "slot",
    height: "string",
    position: {
      type: "choice",
      options: ["static", "sticky"],
    },
    maxWidth: {
      type: "choice",
      options: ["sm", "md", "lg", "xl", "2xl", "full"],
    },
    parentRef: "object",
    isBordered: "boolean",
    isBlurred: "boolean",
    isMenuOpen: "boolean",
    isMenuDefaultOpen: "boolean",
    shouldHideOnScroll: "boolean",
    motionProps: "object",
    disableScrollHandler: "boolean",
    disableAnimation: "boolean",
    classNames: "object",
    onMenuOpenChange: {
      type: "eventHandler",
      argTypes: [{ name: "isOpen", type: "boolean" }],
    },
    onScrollPositionChange: {
      type: "eventHandler",
      argTypes: [{ name: "position", type: "number" }],
    },
  },
});

PLASMIC.registerComponent(NextuiNavbarContent, {
  name: "NextuiNavbarContent",
  props: {
    children: "slot",
    justify: {
      type: "choice",
      options: ["start", "center", "end"],
    },
  },
  parentComponentName: "NextuiNavbar",
});

PLASMIC.registerComponent(NextuiNavbarItem, {
  name: "NextuiNavbarItem",
  props: {
    children: "slot",
    isActive: "boolean",
  },
  parentComponentName: "NextuiNavbarContent",
});

PLASMIC.registerComponent(NextuiNavbarMenuToggle, {
  name: "NextuiNavbarMenuToggle",
  props: {
    icon: "slot",
    isSelected: "boolean",
    defaultSelected: "boolean",
    srOnlyText: "string",
    onChange: {
      type: "eventHandler",
      argTypes: [{ name: "isOpen", type: "boolean" }],
    },
  },
  parentComponentName: "NextuiNavbar",
});

PLASMIC.registerComponent(NextuiNavbarMenu, {
  name: "NextuiNavbarMenu",
  props: {
    children: {
      type: "slot",
      allowedComponents: ["NextuiNavbarMenuItem"],
      //   defaultValue: [
      //     {
      //       type: "component",
      //       name: "NextuiNavbarMenuItem",
      //       props: {
      //         children: "Menu Item 1",
      //       },
      //     },
      //     {
      //       type: "component",
      //       name: "NextuiNavbarMenuItem",
      //       props: {
      //         children: "Menu Item 2",
      //       },
      //     },
      //   ],
    },
    portalContainer: {
      type: "code",
      lang: "html",
      // defaultValue: document.body,
    },
    motionProps: {
      type: "object",
    },
  },
});

PLASMIC.registerComponent(NextuiNavbarMenuItem, {
  name: "NextuiNavbarMenuItem",
  props: {
    children: "slot",
    isActive: "boolean",
  },
  parentComponentName: "NextuiNavbarMenu",
});
