import config from "@/config";
import Link from "next/link";

const FooterLinks = () => {
  const links = [
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/toc", label: "Terms of Service" },
    { href: "contact", label: "Contact Us" },
  ];

  return (
    <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
      <p>
        © {new Date().getFullYear()} {config.appName}. All rights reserved.
      </p>
      <div className="flex space-x-6 mt-4 md:mt-0">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="hover:text-primary transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FooterLinks;
