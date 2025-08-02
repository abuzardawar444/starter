"use client";

import { Input } from "../ui/input";
import { Label } from "../ui/label";

type FormCheckBoxProps = {
  label: string;
  name: string;
  checked?: boolean;
  required?: boolean;
};

const FormCheckBox = ({
  label,
  name,
  checked,
  required = false,
}: FormCheckBoxProps) => {
  return (
    <div className="flex items-center gap-2 mb-2">
      <div className="relative flex items-center">
        <Input
          type="checkbox"
          id={name}
          name={name}
          checked={checked}
          required={required}
          className="size-4"
        />
      </div>
      <Label htmlFor={name} className="text-sm font-medium select-none">
        {label || name}
      </Label>
    </div>
  );
};

export default FormCheckBox;
