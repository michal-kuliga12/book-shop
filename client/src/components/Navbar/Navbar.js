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
  const [openSearchBar, setOpenSearchBar] = useState(false);
  return (
    <nav className="navbar">
      <div className="wrapper">
        {/* <span onClick={()=>{setOpenMenu(!openMenu)}} className={openMenu?'navMenuBtn_active':'navMenuBtn'}>
            <span></span>
            <span></span>
            <span></span>
          </span> */}
        <Link className="navLogo" to="/">
          <i>
            <FontAwesomeIcon icon={faBookOpen} />
          </i>
          <p>
            <span style={{ color: "#FA824C" }}>Dobra</span>książka.pl
          </p>
        </Link>
        {/* <span className={openSearchBar?'navSearch_active':'navSearch'}>
              <input type="text" />
              <i><FontAwesomeIcon icon={faMagnifyingGlass} /></i>
          </span> */}
        <div className="navRight">
          <button
            className="navSearchBtn"
            onClick={() => {
              setOpenSearchBar(!openSearchBar);
            }}
          >
            <i>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </i>
          </button>
          <Link to="/login" className="navLogin">
            <i>
              <FontAwesomeIcon icon={faUser} />
            </i>
            {userContext.isLogged ? (
              <div>Witaj {userContext.user}!</div>
            ) : (
              <div>
                <span>Witaj! Masz już konto?</span>
                <span style={{ fontWeight: "bold" }}>Zaloguj się</span>
              </div>
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
