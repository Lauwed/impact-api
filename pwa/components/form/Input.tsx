import ReactInputMask from "react-input-mask";

const Input = (props: {
  type?: string;
  id: string;
  name: string;
  value?: any;
  onChange?: (e: any) => void;
  required?: boolean;
  className?: string;
  placeholder?: string;
  masking?: string;
}) => {
  if (props.masking && props.masking !== "") {
    return (
      <ReactInputMask
        {...props}
        mask={props.masking}
        value={props.value}
        onChange={props.onChange}
      />
    );
  }
  return (
    <input
      {...props}
      value={props.value || ""}
      className={`w-full ${props.className}`}
      type={props.type ?? "text"}
    />
  );
};

export default Input;
