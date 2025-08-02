import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type FormSelectProps = {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  defaultValue?: string;
  required?: boolean;
};

const FormSelect = ({
  label,
  name,
  options,
  defaultValue,
  required = false,
}: FormSelectProps) => {
  return (
    <div>
      <Label htmlFor={name} className="capitalize mb-2">
        {label || name}
      </Label>
      <Select
        defaultValue={defaultValue || options[0].label}
        name={name}
        required={required}
      >
        <SelectTrigger id={name}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
export default FormSelect;
