import { links } from "@/lib/links";
import Link from "next/link";

const NavLinks = () => {
  return (
    <div className="flex space-x-4 font-semibold uppercase">
      {links.map((link) => (
        <Link key={link.href} href={link.href} className="">
          {link.label}
        </Link>
      ))}
    </div>
  );
};
export default NavLinks;
