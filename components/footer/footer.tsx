import { Separator } from "@/components/ui/separator";
import FooterSection from "./footer-section";
import FooterLinks from "./footer-links";
import { companyInfo, workHours, contactInfo } from "./footer-data";
import { Mail } from "lucide-react";
import Newsletter from "./news-letter";
import SocialIcons from "./social-icons";

const Footer = () => {
  return (
    <footer className="bg-background border-t">
      <div className="container py-12 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <FooterSection title="About Us">
            <p className="text-sm text-muted-foreground">
              {companyInfo.description}
            </p>
            <div className="flex items-center space-x-2 mt-2">
              <Mail className="size-4" />
              <span className="text-sm">{companyInfo.email}</span>
            </div>
          </FooterSection>

          <FooterSection title="Hours of Work">
            <ul className="space-y-2 text-sm text-muted-foreground">
              {workHours.map((hour) => (
                <li key={hour.days} className="flex justify-between">
                  <span>{hour.days}</span>
                  <span className={hour.closed ? "text-destructive" : ""}>
                    {hour.hours}
                  </span>
                </li>
              ))}
            </ul>
          </FooterSection>

          <FooterSection title="Location">
            <address className="not-italic text-sm text-muted-foreground">
              <p>{contactInfo.address.line1}</p>
              <p>{contactInfo.address.line2}</p>
              <p className="mt-2">Phone: {contactInfo.phone}</p>
            </address>
          </FooterSection>

          <FooterSection title="Stay Updated">
            <Newsletter />
            <SocialIcons />
          </FooterSection>
        </div>

        <Separator className="my-6" />
        <FooterLinks />
      </div>
    </footer>
  );
};

export default Footer;
