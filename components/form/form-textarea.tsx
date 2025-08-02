import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

type FormTextAreaProps = {
  label: string;
  name: string;
  placeholder?: string;
  defaultValue?: string;
  required?: boolean;
  rows?: number;
  cols?: number;
};

const FormTextArea = ({
  label,
  name,
  placeholder,
  defaultValue,
  required = false,
  rows = 4,
  cols = 50,
}: FormTextAreaProps) => {
  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize">
        {label || name}
      </Label>
      <Textarea
        name={name}
        id={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="mt-1"
        required={required}
        rows={rows}
        cols={cols}
      />
    </div>
  );
};
export default FormTextArea;
