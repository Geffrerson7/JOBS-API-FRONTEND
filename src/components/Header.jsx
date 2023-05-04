import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <nav>
        <ul className="flex">
          <li className="mr-6">
            <Link className="text-blue-500 hover:text-blue-800" to="/">
              Jobs
            </Link>
          </li>
          <li className="mr-6">
            <Link
              className="text-blue-500 hover:text-blue-800"
              to="/web-portals"
            >
              Web Portals
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
