import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Instagram } from "lucide-react";

const SocialIcons = () => {
  const socialLinks = [
    {
      name: "Facebook",
      icon: <Facebook className="h-4 w-4" />,
      url: "https://facebook.com",
    },
    {
      name: "Twitter",
      icon: <Twitter className="h-4 w-4" />,
      url: "https://twitter.com",
    },
    {
      name: "Instagram",
      icon: <Instagram className="h-4 w-4" />,
      url: "https://instagram.com",
    },
  ];

  return (
    <div className="space-y-2 mt-4">
      <p className="text-sm text-muted-foreground">Follow Us</p>
      <div className="flex space-x-4">
        {socialLinks.map((social) => (
          <Button key={social.name} variant="ghost" size="icon" asChild>
            <a href={social.url} target="_blank" rel="noopener noreferrer">
              {social.icon}
              <span className="sr-only">{social.name}</span>
            </a>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SocialIcons;
