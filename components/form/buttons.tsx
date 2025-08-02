"use client";

import { ReloadIcon } from "@radix-ui/react-icons";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import clsx from "clsx";

type BtnSize = "default" | "lg" | "sm";

interface SubmitButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  size?: BtnSize;
  submitText?: string;
}

export const SubmitButton = ({
  className,
  text = "Submit",
  size = "lg",
  submitText = "Submitting...",
  disabled,
}: SubmitButtonProps) => {
  const { pending } = useFormStatus();
  const isDisabled = pending || disabled;

  return (
    <Button
      type="submit"
      className={clsx("capitalize", className)}
      size={size}
      disabled={isDisabled}
      aria-live="polite"
      aria-busy={pending}
    >
      {pending ? (
        <>
          <ReloadIcon className="mr-2 size-4 animate-spin" aria-hidden="true" />
          <span>{submitText}</span>
          <span className="sr-only">Submitting</span>
        </>
      ) : (
        text
      )}
    </Button>
  );
};
