import { useUser, SignOutButton, SignedIn, SignedOut } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import ThemeToggle from "./theme-toggle";

const profileLinks: { href: string; label: string }[] = [
  {
    href: "/profile",
    label: "Profile",
  },
  {
    href: "/settings",
    label: "Settings",
  },
];

const CustomUserButton = () => {
  const { user } = useUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="size-8 cursor-pointer">
          <AvatarImage src={user?.imageUrl} />
          <AvatarFallback>
            {user?.firstName?.charAt(0)}
            {user?.lastName?.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        {profileLinks.map((link) => (
          <DropdownMenuItem asChild key={link.href} className="cursor-pointer">
            <Link href={link.href}>{link.label}</Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem className="cursor-pointer">
          <SignOutButton>Sign out</SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// Then use it in your NavRight component:
const NavRight = () => {
  return (
    <div className="flex items-center gap-4">
      <ThemeToggle />
      <SignedIn>
        <CustomUserButton />
      </SignedIn>
      <SignedOut>
        <Link href="/sign-in">Sign In</Link>
      </SignedOut>
    </div>
  );
};

export default NavRight;
