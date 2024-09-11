import { FC } from "react";
import Input from "./Input";
import Label from "./Label";

type FormControlType = {
  type?: string;
  id: string;
  name: string;
  value?: any;
  onChange: (e: any) => void;
  label: string;
  required?: boolean;
  hint?: string;
};

const FormControl: FC<FormControlType> = ({
  type = "text",
  id,
  name,
  value,
  onChange,
  label,
  required = false,
  hint,
}) => {
  const labelText = required ? (
    label
  ) : (
    <>
      <span>{label}</span>
      <span className="text-xs ml-2">(Facultatif)</span>
    </>
  );

  return (
    <div className="mb-4">
      <Label htmlFor={id}>
        {hint ? (
          <>
            <span className="block">{labelText}</span>
            <span className="text-sm">{hint}</span>
          </>
        ) : (
          labelText
        )}
      </Label>
      <Input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default FormControl;
