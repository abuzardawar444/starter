import Link from "next/link";
import { Button } from "../ui/button";

const Logo = ({ text }: { text?: string }) => {
  return (
    <Button variant="outline" asChild size="icon">
      <Link href="/" className="font-bold uppercase">
        {text || "Default Logo"}
      </Link>
    </Button>
  );
};
export default Logo;
