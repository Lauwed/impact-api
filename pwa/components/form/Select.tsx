import { FC, ReactNode } from "react";

type SelectType = {
  name: string;
  id: string;
  data: { value: number; label: string | ReactNode }[];
  required?: boolean;
  value?: any;
  onChange?: (value: number) => void;
  disabled?: boolean;
};

const Select: FC<SelectType> = ({
  name,
  id,
  data,
  required = false,
  value,
  onChange,
  disabled = false
}) => {
  return (
    <select
      className="block w-full"
      name={name}
      id={id}
      required={required}
      value={value}
      // @ts-ignore
      onChange={onChange}
      disabled={disabled}
    >
      {data.map((option, index) => (
        <option key={index} value={option.value}>{option.label}</option>
      ))}
    </select>
  );
};

export default Select;
