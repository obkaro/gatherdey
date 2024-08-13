"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z, ZodRawShape, ZodTypeAny } from "zod";

import { PLASMIC } from "@/plasmic-init";
import { repeatedElement } from "@plasmicapp/loader-nextjs";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
} from "@/components/ui/form";

import React, { ReactElement } from "react";

interface Field {
  name: string;
  label: string;
  placeholder: string;
  description?: string;
  validation: ZodTypeAny;
  isRequired: boolean;
  isReadOnly: boolean;
  isDisabled: boolean;
  isInvalid: boolean;
  color: string;
}

interface FormProps {
  className?: string;
  onSubmit: (data: any) => void;
  button: React.ReactNode;
  formFields: Field[];
  inputSlot: React.ReactNode;
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
  value?: string;
  defaultValue?: string;
  errorMessage?: React.ReactNode;
  //   validate?:
  //     | ((value: string) => true | ValidationError | null | undefined)
  //     | undefined;
  //   validationBehavior?: "native" | "aria";
  labelPlacement?: "inside" | "outside" | "outside-left";
  fullWidth?: boolean;
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
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
}

const FormContext = React.createContext<Field | undefined>(undefined);

export function ShadcnForm({
  className,
  onSubmit,
  button,
  formFields = [
    // {
    //   name: "name",
    //   label: "Name",
    //   placeholder: "Enter your name",
    //   description: "Your full name",
    //   validation: z.string().nonempty("Name is required"),
    // },
    // {
    //   name: "message",
    //   label: "Message",
    //   placeholder: "Enter your message",
    //   description: "Your message",
    //   validation: z.string().nonempty("Message is required  "),
    // }, // Add a space to avoid issues
  ], // Provide a default empty array to avoid issues
  inputSlot,
  variant = "flat",
  color = "default",
  size = "md",
  radius,
  //   validate,
  //   validationBehavior = "aria",
  labelPlacement = "inside",
  fullWidth = true,
  baseRef,
  startContent,
  endContent,
  validationState,
  classNames,
}: FormProps) {
  // Dynamically build the form schema based on the fields prop
  const formSchema = z.object(
    formFields.reduce((schema, field) => {
      schema[field.name] = field.validation;
      return schema;
    }, {} as Record<string, ZodTypeAny>)
  );

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: formFields.reduce((defaults, field) => {
      defaults[field.name] = ""; // Set your own default values if necessary
      return defaults;
    }, {} as Record<string, any>),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={className}>
        {formFields.map((field, i) => (
          <FormContext.Provider value={field} key={field.name}>
            <FormField
              key={field.name}
              control={form.control}
              name={field.name}
              render={({ field: inputProps, fieldState }) => (
                <FormItem>
                  {repeatedElement(
                    i === 0, // Set the first element as primary for editing in Plasmic Studio
                    React.cloneElement(inputSlot as ReactElement, {
                      // Pass form field props to input
                      placeholder: field.placeholder, // Pass additional props
                      label: field.label,
                      description: field.description,
                      isRequired: field.isRequired,
                      isReadOnly: field.isReadOnly,
                      isDisabled: field.isDisabled,
                      isInvalid: !!fieldState.error?.message || field.isInvalid,
                      errorMessage: fieldState.error?.message,
                      variant: variant,
                      color: color,
                      size: size,
                      radius: radius,
                      labelPlacement: labelPlacement,
                      fullWidth: fullWidth,
                      baseRef: baseRef,
                      startContent: startContent,
                      endContent: endContent,
                    })
                  )}
                </FormItem>
              )}
            />
          </FormContext.Provider>
        ))}
        {button}
      </form>
    </Form>
  );
}

PLASMIC.registerComponent(ShadcnForm, {
  name: "ShadcnForm",
  props: {
    onSubmit: {
      type: "eventHandler",
      argTypes: [
        {
          name: "data",
          type: "object",
        },
      ],
    },
    formFields: {
      type: "array",
      itemType: {
        type: "object",
        fields: {
          id: "number",
          name: "string",
          label: "string",
          placeholder: "string",
          description: "string",
          validation: {
            type: "code",
            lang: "javascript",
          },
          isPrimary: "boolean",
          isRequired: "boolean",
          isReadOnly: "boolean",
          isDisabled: "boolean",
          isInvalid: "boolean",
        },
      },
    },
    inputSlot: {
      type: "slot",
      isRepeated: true,
    },
    button: {
      type: "slot",
      hidePlaceholder: true,
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
    defaultValue: {
      type: "string",
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
    disableAnimation: {
      type: "boolean",
      defaultValueHint: false,
    },
    startContent: {
      type: "slot",
      hidePlaceholder: true,
    },
    endContent: {
      type: "slot",
      hidePlaceholder: true,
    },
  },
});
