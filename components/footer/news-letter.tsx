import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Newsletter = () => {
  return (
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground">
        Subscribe to our newsletter
      </p>
      <div className="flex space-x-2">
        <Input placeholder="Your email" className="flex-1" />
        <Button variant="outline">Subscribe</Button>
      </div>
    </div>
  );
};

export default Newsletter;
