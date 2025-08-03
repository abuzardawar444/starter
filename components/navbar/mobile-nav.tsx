import { links } from "@/lib/links";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import Link from "next/link";
import { Menu } from "lucide-react";

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="lg:hidden">
          <Menu />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[350px] md:hidden">
        <SheetHeader className="text-left">
          <SheetTitle className="text-xl font-bold">L</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col space-y-3 mt-6">
          {links.map((link) => (
            <div key={link.href} className="flex flex-col">
              {link.submenu ? (
                <>
                  <h3 className="text-lg font-semibold px-4 py-2">
                    {link.label}
                  </h3>
                  <div className="flex flex-col space-y-2 pl-6 mt-1">
                    {link.submenu.map((subLink) => (
                      <Link
                        key={subLink.href}
                        href={subLink.href}
                        className="text-sm px-4 py-2 rounded-md hover:bg-accent transition-colors"
                      >
                        {subLink.label}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link
                  href={link.href}
                  className="text-lg font-medium px-4 py-2 rounded-md hover:bg-accent transition-colors"
                >
                  {link.label}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
