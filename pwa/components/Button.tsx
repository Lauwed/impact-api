import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

const Button = ({
  children,
  customStyle,
  ...buttonProps
}: { children: ReactNode; customStyle?: string } & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) => {
  return (
    <button
      {...buttonProps}
      className={`p-2 border hover:bg-slate-300 transition-all ${customStyle}`}
    >
      {children}
    </button>
  );
};

export default Button;
