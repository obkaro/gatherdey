"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z, ZodTypeAny } from "zod";

import { PLASMIC } from "@/plasmic-init";
import { repeatedElement } from "@plasmicapp/loader-nextjs";

import { Form, FormField, FormItem } from "@/components/ui/form";

import React, { ReactElement, useRef, useImperativeHandle } from "react";

interface Field {
  name: string;
  label: string;
  type: "text" | "email" | "password" | "number";
  placeholder: string;
  description?: string;
  validationType: string;
  validationText: string;
  isRequired: boolean;
  isReadOnly: boolean;
  isDisabled: boolean;
  isInvalid: boolean;
  color: string;
  value: string;
  onChange: (value: string) => void;
}

interface FormValue {
  fieldName: string;
  value: string;
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
  value?: FormValue[];
  defaultValue?: string;
  errorMessage?: React.ReactNode;
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
  onValueChange: (value: FormValue[]) => void;
  clearForm: () => void;
}

const FormContext = React.createContext<Field | undefined>(undefined);

const getValidationSchema = (
  validationType: string,
  validationText: string
) => {
  switch (validationType) {
    case "name":
      return z.string().min(2, validationText);
    case "email":
      return z.string().email(validationText);
    case "password":
      return z.string().min(8, validationText);
    case "number":
      return z.number().nonnegative(validationText);
    case "generic":
    default:
      return z.string().min(1, validationText);
  }
};

export const ShadcnForm = React.forwardRef(
  (
    {
      className,
      onSubmit,
      button,
      formFields = [],
      inputSlot,
      variant = "flat",
      color = "default",
      size = "md",
      radius,
      labelPlacement = "inside",
      fullWidth = true,
      baseRef,
      startContent,
      endContent,
      onValueChange,
      validationState,
      classNames,
      value,
      clearForm,
    }: FormProps,
    ref
  ) => {
    // Dynamically build the form schema based on the fields prop
    const formSchema = z.object(
      formFields.reduce((schema, field) => {
        schema[field.name] = getValidationSchema(
          field.validationType,
          field.validationText
        );
        return schema;
      }, {} as Record<string, ZodTypeAny>)
    );

    const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: formFields.reduce((defaults, field) => {
        defaults[field.name] = "";
        return defaults;
      }, {} as Record<string, any>),
    });

    // Create a ref to the form
    const formRef = useRef<HTMLFormElement>(null);

    // Expose the formSubmit and clearForm actions
    useImperativeHandle(ref, () => ({
      formSubmit: async () => {
        if (formRef.current) {
          //await onSubmit(value);
          console.log("Submitting form", form.getValues());
          formRef.current.requestSubmit();
          console.log("Form submitted");
        }
        // await handleSubmit(form.getValues());
      },
      clearForm: () => {
        try {
          // Trigger the onSubmit prop provided by the parent component
          console.log("onSubmit Form action:", value);

          // Clear the form only after the submission is successful
          console.log("Resetting form", value);
          form.reset();
          console.log("Form reset state");
          onValueChange(
            formFields.map((field) => ({ fieldName: field.name, value: "" }))
          );
        } catch (error) {
          console.error("Form submission error:", error);
        }
      },
    }));
    const handleSubmit = async (data: any) => {};

    // Handler for when form input values change
    const handleInputChange = (inputProps: any, field: Field) => (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      const inputValue = e.toString();

      inputProps.onChange(e); // Update react-hook-form's internal state

      // Create a shallow copy of the value array
      const newValue = value ? [...value] : [];

      // Find the index of the field in the value array
      const index = newValue.findIndex((item) => item.fieldName === field.name);

      if (index !== -1) {
        // Update the existing field value
        newValue[index].value = inputValue;
      } else {
        // Add a new field if it doesn't exist in the value array
        newValue.push({
          fieldName: field.name,
          value: inputValue,
        });
      }

      // Call onValueChange with the updated array
      onValueChange(newValue);
    };

    return (
      <Form {...form}>
        <form
          ref={formRef} // Attach the ref to the form element
          onSubmit={form.handleSubmit(onSubmit)}
          className={className}
        >
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
                        placeholder: field.placeholder,
                        label: field.label,
                        type: field.type,
                        description: field.description,
                        isRequired: field.isRequired,
                        isReadOnly: field.isReadOnly,
                        isDisabled: field.isDisabled,
                        isInvalid:
                          !!fieldState.error?.message || field.isInvalid,
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
                        value: form.watch(field.name),
                        onChange: handleInputChange(inputProps, field), // Use handler function
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
);

ShadcnForm.displayName = "ShadcnForm";

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
          label: "slot",
          type: {
            type: "choice",
            options: ["text", "email", "password", "number"],
            defaultValueHint: "text",
          },
          placeholder: "string",
          description: "string",
          value: "string",
          onChange: {
            type: "eventHandler",
            argTypes: [
              {
                name: "value",
                type: "string",
              },
            ],
          },
          validationType: {
            type: "choice",
            options: ["generic", "name", "email", "password", "number"],
            defaultValueHint: "generic",
          },
          validationText: {
            type: "string",
            defaultValue: "Invalid input",
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
    onValueChange: {
      type: "eventHandler",
      argTypes: [
        {
          name: "value",
          type: {
            type: "array",
            itemType: {
              type: "object",
              fields: {
                fieldName: "string",
                value: "string",
              },
              //   defaultValue: {
              //     fieldName: "",
              //     value: "",
              //   },
            },
          },
        },
      ],
    },
    value: {
      type: "array",
      itemType: {
        type: "object",
        fields: {
          fieldName: "string",
          value: "string",
        },
        defaultValue: {
          fieldName: "",
          value: "",
        },
      },
    },
  },
  refActions: {
    formSubmit: {
      description: "Submit the form",
      argTypes: [],
    },
    clearForm: {
      description: "Clear the form",
      argTypes: [],
    },
  },
  states: {
    formData: {
      // The state value is owned by the parent -- parent can control
      // the value of this state
      type: "writable",
      // The type of state value
      variableType: "object",
      // The prop name that controls this state
      valueProp: "value",
      // The prop name for the event handler that is called whenever
      // this state changes
      onChangeProp: "onValueChange",
      // The initial value of a writable state is sepecified as the
      // `defaultValue` for your valueProp
    },
  },
});
