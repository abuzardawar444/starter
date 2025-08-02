import NavLinks from "./nav-links";
import Profile from "./profile";

const Navbar = () => {
  return (
    <div className="container">
      <nav className="flex justify-between items-center py-4">
        <div>logo</div>
        <NavLinks />
        <Profile />
      </nav>
    </div>
  );
};
export default Navbar;
