import { ReactNode } from "react";

const Kbd = ({
  customCSS = "",
  children,
}: {
  customCSS?: string;
  children: ReactNode;
}) => {
  return (
    <kbd
      className={`px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg ${customCSS}`}
    >
      {children}
    </kbd>
  );
};

export default Kbd;
