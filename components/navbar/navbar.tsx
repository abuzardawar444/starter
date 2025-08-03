"use client";
import Logo from "./logo";
import MobileNav from "./mobile-nav";
import NavLinks from "./nav-links";
import NavRight from "./nav-right";
import { useScroll } from "@/hooks/use-scroll";

const Navbar = () => {
  const isScrolled = useScroll(50);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/40 backdrop-blur-sm shadow-sm"
          : "bg-background"
      }`}
    >
      <div className="container">
        <nav className="flex justify-between items-center py-4">
          <Logo text="l" />
          <NavLinks />
          <div className="flex items-center gap-4">
            <NavRight />
            <div className="md:hidden block">
              <MobileNav />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
