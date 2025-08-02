import { Input } from "../ui/input";
import { Label } from "../ui/label";

type FormInputProps = {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  defaultValue?: string;
};
const FormInput = ({
  label,
  name,
  type,
  placeholder,
  defaultValue,
}: FormInputProps) => {
  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize">
        {label || name}
      </Label>
      <Input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="mt-1"
        required
      />
    </div>
  );
};
export default FormInput;
