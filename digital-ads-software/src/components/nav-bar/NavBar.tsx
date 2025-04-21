import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <div className="flex justify-between items-center py-4">
      <h1>
        <img
          src="/assets/digital-ads-software-logo-white.webp"
          alt="logo"
        />
      </h1>
      <div>
        <Link to={"#"}>home</Link>
        <Link to={"#"}>Templates</Link>
        <Link to={"#"}>Testimonials</Link>

        <button type="button">let's chat</button>
      </div>
    </div>
  );
};

export default NavBar;
