import React, { forwardRef } from "react";
import { Input } from "@nextui-org/react";
import { PLASMIC } from "@/plasmic-init";
import { ValidationError } from "@react-types/shared";

export interface InputProps {
  className?: string;
  children?: React.ReactNode;
  variant?: "flat" | "bordered" | "faded" | "underlined";
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  size?: "sm" | "md" | "lg";
  radius?: "none" | "sm" | "md" | "lg" | "full";
  label?: React.ReactNode;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  description?: React.ReactNode;
  errorMessage?: React.ReactNode;
  validate?:
    | ((value: string) => true | ValidationError | null | undefined)
    | undefined;
  validationBehavior?: "native" | "aria";
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  labelPlacement?: "inside" | "outside" | "outside-left";
  fullWidth?: boolean;
  isClearable?: boolean;
  isRequired?: boolean;
  isReadOnly?: boolean;
  isDisabled?: boolean;
  isInvalid?: boolean;
  baseRef?: React.RefObject<HTMLInputElement>;
  validationState?: "valid" | "invalid";
  disableAnimation?: boolean;
  classNames?: Record<
    | "base"
    | "label"
    | "inputWrapper"
    | "innerWrapper"
    | "mainWrapper"
    | "input"
    | "clearButton"
    | "helperWrapper"
    | "description"
    | "errorMessage",
    string
  >;
  onChange?: (value: string) => void;
  onValueChange?: (value: string) => void;
  onClear?: () => void;
}

export const NextuiInput = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      children,
      variant = "flat",
      color = "default",
      size = "md",
      radius,
      label,
      value,
      defaultValue,
      placeholder,
      description,
      errorMessage,
      validate,
      validationBehavior = "aria",
      startContent,
      endContent,
      labelPlacement = "inside",
      fullWidth = true,
      isClearable = false,
      isRequired = false,
      isReadOnly = false,
      isDisabled = false,
      isInvalid = false,
      disableAnimation = false,
      classNames,
      onChange,
      onValueChange,
      onClear,
    }: InputProps,
    ref // This is the forwarded ref
  ) => {
    return (
      <Input
        className={className}
        ref={ref} // Attach the forwarded ref here
        variant={variant}
        color={color}
        size={size}
        radius={radius}
        label={label}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        description={description}
        errorMessage={isInvalid ? errorMessage : undefined}
        validate={validate}
        validationBehavior={validationBehavior}
        startContent={startContent}
        endContent={endContent}
        labelPlacement={labelPlacement}
        fullWidth={fullWidth}
        isClearable={isClearable}
        isRequired={isRequired}
        isReadOnly={isReadOnly}
        isDisabled={isDisabled}
        isInvalid={isInvalid}
        disableAnimation={disableAnimation}
        classNames={classNames}
        onChange={(e) => {
          onChange?.(e.target.value);
          //onValueChange?.(e.target.value);
        }}
        onClear={onClear}
      />
    );
  }
);

NextuiInput.displayName = "NextuiInput";

PLASMIC.registerComponent(NextuiInput, {
  name: "NextuiInput",
  props: {
    children: {
      type: "slot",
      defaultValue: [],
    },
    variant: {
      type: "choice",
      options: ["flat", "bordered", "faded", "underlined"],
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
    },
    label: {
      type: "string",
    },
    value: "string",
    defaultValue: {
      type: "string",
    },
    placeholder: {
      type: "string",
    },
    description: {
      type: "string",
    },
    errorMessage: {
      type: "string",
    },
    validationBehavior: {
      type: "choice",
      options: ["native", "aria"],
      defaultValueHint: "aria",
    },
    startContent: {
      type: "slot",
      hidePlaceholder: true,
    },
    endContent: {
      type: "slot",
      hidePlaceholder: true,
    },
    labelPlacement: {
      type: "choice",
      options: ["inside", "outside", "outside-left"],
      defaultValueHint: "inside",
    },
    fullWidth: {
      type: "boolean",
      defaultValueHint: true,
    },
    isClearable: {
      type: "boolean",
      defaultValueHint: false,
    },
    isRequired: {
      type: "boolean",
      defaultValueHint: false,
    },
    isReadOnly: {
      type: "boolean",
    },
    isDisabled: {
      type: "boolean",
      defaultValueHint: false,
    },
    isInvalid: {
      type: "boolean",
      defaultValueHint: false,
    },
    onChange: {
      type: "eventHandler",
      argTypes: [
        {
          name: "value",
          type: "object",
        },
      ],
    },
    onValueChange: {
      type: "eventHandler",
      argTypes: [
        {
          name: "value",
          type: "string",
        },
      ],
    },
    onClear: {
      type: "eventHandler",
      argTypes: [],
    },
  },
  refActions: {
    clearField: {
      description: "Clear the input field",
      argTypes: [],
    },
  },
  states: {
    value: {
      // The state value is owned by the parent -- parent can control
      // the value of this state
      type: "writable",
      // The type of state value
      variableType: "object",
      // The prop name that controls this state
      valueProp: "value",
      // The prop name for the event handler that is called whenever
      // this state changes
      onChangeProp: "onChange",
      // The initial value of a writable state is specified as the
      // `defaultValue` for your valueProp
    },
  },
});
