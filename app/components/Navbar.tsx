import { Link } from "react-router";

const Navbar = () => (
  <nav className="navbar">
    <Link to="/">
      <p className="text-gradient text-2xl font-bold">RESUMIND</p>
    </Link>
    <Link to="/upload" className="primary-button w-fit">
      Upload Resume
    </Link>
  </nav>
);

export default Navbar;
