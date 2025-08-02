import { Button } from "../ui/button";

const Profile = () => {
  return (
    <div className="flex gap-4 items-center justify-center">
      <Button className="bg-primary hover:text-primary hover:bg-secondary">
        Edit Profile
      </Button>
      <Button className="bg-secondary text-primary hover:text-secondary">
        Logout
      </Button>
    </div>
  );
};
export default Profile;
