import { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  className?: string;
}

export const Marquee = ({ children, className = "" }: MarqueeProps) => {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="marquee flex w-max gap-12 whitespace-nowrap">
        <div className="flex gap-12 items-center">{children}</div>
        <div className="flex gap-12 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
};
