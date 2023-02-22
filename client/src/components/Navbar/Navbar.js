import {
  faBookOpen,
  faCartShopping,
  faMagnifyingGlass,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import "./Navbar.scss";

const Navbar = () => {
  const userContext = useContext(UserContext);
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <nav className="navbar">
      <div className="wrapper">
        <div className="navLeft">
          <Link className="navLogo" to="/">
            <i>
              <FontAwesomeIcon icon={faBookOpen} />
            </i>
            <p>
              <span style={{ color: "#FA824C" }}>Dobra</span>książka.pl
            </p>
          </Link>
        </div>
        <div
          onClick={() => {
            setOpenMenu(!openMenu);
          }}
          className={`navMenuBtn ${openMenu ? "active" : ""}`}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={openMenu ? "navRight_active" : "navRight"}>
          <div className="navSearch">
            <input type="text" placeholder="Wyszukaj książkę..." />
            <button onClick={() => {}}>
              <i>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </i>
            </button>
          </div>
          <Link to="/login" className="navLogin">
            <i>
              <FontAwesomeIcon icon={faUser} />
            </i>
            {userContext.isLogged ? (
              <div>Witaj {userContext.user}!</div>
            ) : (
              <div>Zaloguj się</div>
            )}
          </Link>
          <Link to="/cart" className="navBasket">
            <i>
              <FontAwesomeIcon icon={faCartShopping} />
            </i>
            <p>Koszyk</p>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
