import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">AddYacht</Link>
          </li>
          <li>
            <Link to="/book">Book a Yacht</Link>
          </li>
          <li>
            <Link to="/listyacht">List all Yachts</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;