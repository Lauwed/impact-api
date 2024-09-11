import { FC, ReactNode } from "react";

type SelectType = {
  name: string;
  id: string;
  data: { value: number; label: string | ReactNode }[];
  required?: boolean;
  value?: any;
  onChange?: () => void;
};

const Select: FC<SelectType> = ({
  name,
  id,
  data,
  required = false,
  value,
  onChange,
}) => {
  return (
    <select
      className="block w-full"
      name={name}
      id={id}
      required={required}
      value={value}
      onChange={onChange}
    >
      {data.map((option, index) => (
        <option key={index} value={option.value}>{option.label}</option>
      ))}
    </select>
  );
};

export default Select;
