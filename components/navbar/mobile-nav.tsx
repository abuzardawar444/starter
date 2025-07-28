// components/navbar/mobile-nav.tsx

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { links } from "@/lib/links";

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="size-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-[300px] px-0 md:hidden">
        <div className="flex items-center justify-between px-6 pb-4 border-b">
          <Link
            href="/"
            className="text-xl font-bold"
            onClick={() => document.body.click()}
          >
            MyApp
          </Link>
          <SheetClose />
        </div>

        <nav className="flex flex-col gap-1 px-4 pt-4">
          {links.map((link) => (
            <SheetClose asChild key={link.href}>
              <Link
                href={link.href}
                className="px-4 py-3 rounded-lg text-base font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                {link.label}
              </Link>
            </SheetClose>
          ))}

          <div className="px-4 pt-2 mt-2 border-t">
            <SheetClose asChild>
              <Link href="/login">
                <Button className="w-full mt-2">Login</Button>
              </Link>
            </SheetClose>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
