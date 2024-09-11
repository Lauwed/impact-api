const Input = (props: {
  type?: string;
  id: string;
  name: string;
  value?: any;
  onChange: (e: any) => void;
  required: boolean;
  className?: string;
}) => {
  return (
    <input
      {...props}
      value={props.value || ''}
      className={`w-full ${props.className}`}
      type={props.type ?? "text"}
    />
  );
};

export default Input;
