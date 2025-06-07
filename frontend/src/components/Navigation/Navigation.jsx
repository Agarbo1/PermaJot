import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

const Navigation = () => {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <nav className="nav-bar">
      <ul>
        <li>
          <NavLink to="/" className="logo" data-testid="logo">
            <span>
              Perma
              <span className="primary">
                Jot
              </span>
            </span>
          </NavLink>
        </li>
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
