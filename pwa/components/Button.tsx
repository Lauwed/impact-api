import Link from "next/link";
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";
import { Button as RadixButton } from "@/components/ui/button";

const Button = ({
  children,
  customStyle,
  linkPath,
  size,
  variant = "outline",
  ...buttonProps
}: {
  children: ReactNode;
  customStyle?: string;
  linkPath?: string;
  size?: "default" | "sm" | "lg" | "icon" | null;
  variant?: "default" | "link" | "outline" | "destructive" | "secondary" | "ghost" | null;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) => {
  if (linkPath) {
    return (
      <RadixButton size={size} variant={variant} asChild>
        <Link href={linkPath} className={`block no-underline ${customStyle}`}>
          {children}
        </Link>
      </RadixButton>
    );
  }

  return (
    <RadixButton size={size}
      variant={variant}
      {...buttonProps}
      className={`block flex ${customStyle}`}
    >
      {children}
    </RadixButton>
  );
};

export default Button;
