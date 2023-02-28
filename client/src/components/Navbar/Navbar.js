import {
  faBookOpen,
  faCartShopping,
  faKey,
  faMagnifyingGlass,
  faQuestionCircle,
  faRightFromBracket,
  faUserCircle,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { createRef, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/searchContext";
import { UserContext } from "../../context/userContext";
import "./Navbar.scss";

const Navbar = () => {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const searchContext = useContext(SearchContext);
  const [search, setSearch] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const htmlElRef = createRef();
  const handleSearchDispatch = () => {
    searchContext.dispatch({
      type: "NEW_SEARCH",
      search: search,
      filter: searchContext.filter,
      category: searchContext.category,
    });
  };
  const focusProfileMenu = () => {
    htmlElRef.current.focus();
  };
  const handleLogout = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/auth/logout`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
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
          <div className="navSearch navEl">
            <input
              onSubmit={(e) => {
                handleSearchDispatch();
                e.target.value = "";
              }}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              id="searchInput"
              type="text"
              placeholder="Wyszukaj książkę..."
            />
            <button
              onClick={() => {
                document.getElementById("searchInput").value = "";
                handleSearchDispatch();
                navigate("/");
              }}
            >
              <i>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </i>
            </button>
          </div>
          <div className="navRightLinks">
            <div
              onClick={() => {
                if (!profileMenu) {
                  setProfileMenu(true);
                  focusProfileMenu();
                }
              }}
              className="navLogin navEl responsive"
            >
              {userContext.isLogged ? (
                <div
                  className="responsive"
                  style={{ display: "flex", alignItems: "center", gap: "20px" }}
                >
                  <i>
                    <FontAwesomeIcon icon={faUserCircle} />
                  </i>
                  <p className="navLoginText responsive">
                    Witaj {userContext.user}!
                  </p>
                </div>
              ) : (
                <Link to="/login">
                  <i>
                    <FontAwesomeIcon icon={faUserCircle} />
                  </i>
                  <p className="navLoginText">Zaloguj się</p>
                </Link>
              )}
            </div>
            {userContext.isLogged && (
              <Link to="/cart" className="navBasket navEl">
                <i>
                  <FontAwesomeIcon icon={faCartShopping} />
                </i>
                <p>Koszyk</p>
                {userContext.basketItems > 0 && (
                  <span>{userContext.basketItems}</span>
                )}
              </Link>
            )}
          </div>
          {userContext.isLogged && (
            <div
              tabIndex={1}
              ref={htmlElRef}
              className={`profileMenu ${profileMenu ? "active" : ""}`}
              onBlur={() => {
                setProfileMenu(false);
              }}
            >
              <div className="profile">
                <i>
                  <FontAwesomeIcon icon={faUserCircle} />
                </i>
                <div className="profileInfo">
                  <p>Witaj {userContext.user}!</p>
                </div>
                <button
                  onClick={() => {
                    setProfileMenu(false);
                  }}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>
              {userContext.isAdmin && (
                <Link to="/admin" className="navEl">
                  <i>
                    <FontAwesomeIcon icon={faKey} />
                  </i>
                  <p>Panel admina</p>
                </Link>
              )}
              <div
                onClick={() => {
                  handleLogout();
                }}
                className="navEl"
              >
                <i>
                  <FontAwesomeIcon icon={faRightFromBracket} />
                </i>
                <p>Wyloguj się</p>
              </div>
            </div>
          )}
        </div>
        <div
          onClick={() => {
            setShowHint(!showHint);
          }}
          className="hintBtn"
        >
          <i>
            <FontAwesomeIcon icon={faQuestionCircle} />
          </i>
        </div>
        {showHint && (
          <div className="hint">
            <div className="hintUp">
              <h2>Uwagi</h2>
              <button
                onClick={() => {
                  setShowHint(false);
                }}
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
            <ul>
              <li>
                Aplikacja internetowa umożliwia klientom rejestracje konta w
                serwisie, które odblokowuje dostęp do tworzenia zamówień w
                koszyku i dodawania książek do ulubionych. Tworzenie zamówienia
                przebiega z pominięciem etapu płatności, która nie została
                zaimplementowana.
              </li>
              <li>
                Zawartość koszyka, utworzone zamówienia, oraz lista ulubionych
                książek są przechowywane w profilu użytkownika w bazie danych
              </li>
              <li>
                Wyszukiwanie książek zrezlizowano w oparciu o 3 filtry: nazwa
                książki, kategoria książki oraz przy użyciu właściwości
                przypisanych do książki w bazie danych (dostępność, czy jest
                polecana)
              </li>
              <li>
                Domyślny status nowo zarejestrowanych użytkowników uniemożliwia
                dostęp do panelu administratora. Program przy zalogowaniu
                pozyskuje status użytkownika z bazy danych i z wykorzystaniem
                Context API weryfikuje uprawnienia przy próbie wygenerowania
                panelu
              </li>
              <li>
                Za odnawianie sesji, oraz zabezpieczenie konta odpowiadają
                tokeny uwierzytelniające zapisane w plikach cookie w momencie
                logowania. Wykorzystano dwa tokeny: <br />
                token dostępu (access_token) - odpowiada za dostęp do
                funkcjonalności, wygasa po 10 minutach, <br />
                token odświeżający (refresh_token) - odpowiada za generowanie
                nowych tokenów dostępu w momencie korzystania z aplikacji, jest
                przechowywany w bazie danych i wygasa kiedy sesja użytkownika
                się zakończy,
              </li>
              <li>
                Panel administratora umożliwia dodawanie książek do bazy danych
                oraz usuwanie książek i użytkowników.
              </li>
              <li>
                Aby uzyskać dostęp do panelu admina należy się zalogować na
                następujące konto: <br />
                nazwa użytkownika: <span style={{ color: "red" }}>
                  admin
                </span>, <br /> email:{" "}
                <span style={{ color: "red" }}> admin</span>, <br /> hasło:
                <span style={{ color: "red" }}> admin</span>.
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
