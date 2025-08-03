import { ReactNode } from "react";

interface FooterSectionProps {
  title: string;
  children: ReactNode;
}

const FooterSection = ({ title, children }: FooterSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      {children}
    </div>
  );
};

export default FooterSection;
