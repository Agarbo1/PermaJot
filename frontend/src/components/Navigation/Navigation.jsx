import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

const Navigation = ({ isLoaded }) => {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <nav className="nav-bar">
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
      {isLoaded && (
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {sessionUser && (
            <li>
              <NavLink to="/spots/new" data-testid="create-new-spot-button">
                Create a New Spot
              </NavLink>
            </li>
          )}
          <li>
            <ProfileButton user={sessionUser} />
          </li>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
