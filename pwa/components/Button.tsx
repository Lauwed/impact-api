import Link from "next/link";
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

const Button = ({
  children,
  customStyle,
  linkPath,
  ...buttonProps
}: { children: ReactNode; customStyle?: string; linkPath?: string; } & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) => {
  if(linkPath) {
    return (
      <Link
        href={linkPath}
        className={`p-2 border hover:bg-slate-300 transition-all block no-underline ${customStyle}`}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      {...buttonProps}
      className={`p-2 border hover:bg-slate-300 transition-all block ${customStyle}`}
    >
      {children}
    </button>
  );
};

export default Button;
