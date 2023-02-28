import {
  faHome,
  faLock,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const AdminNavbar = ({
  setToggleAdd,
  setToggleOptions,
  toggleOptions,
  setCollection,
  collection,
}) => {
  const navigate = useNavigate();
  return (
    <nav className="adminNav">
      <div className="navProfile">
        <i>
          <FontAwesomeIcon icon={faUserCircle} />
        </i>
        <i>
          <FontAwesomeIcon icon={faLock} />
        </i>
      </div>
      <div className={`navOptionsContainer ${toggleOptions ? "active" : ""}`}>
        <h2 className="active">Menu</h2>
        <ul className="navOptions">
          <li
            onClick={() => {
              setToggleAdd(false);
              setCollection("book");
            }}
            className={`navOptionsItem ${
              collection === "book" ? "active" : ""
            }`}
          >
            Książki
          </li>
          <li
            onClick={() => {
              setToggleAdd(false);
              setCollection("user");
            }}
            className={`navOptionsItem ${
              collection === "user" ? "active" : ""
            }`}
          >
            Użytkownicy
          </li>
          {/* <li
            onClick={() => {
              setToggleAdd(false);
              setCollection("order");
            }}
            className={`navOptionsItem ${
              collection === "order" ? "active" : ""
            }`}
          >
            Zamówienia
          </li> */}
        </ul>
      </div>
      <button
        onClick={() => {
          navigate("/");
        }}
        className={`navHomeBtn ${toggleOptions ? "active" : ""}`}
      >
        <i>
          <FontAwesomeIcon icon={faHome} />
        </i>
      </button>
      <button
        onClick={() => {
          setToggleOptions(!toggleOptions);
        }}
        className={`navOptionsBtn ${toggleOptions ? "active" : ""}`}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  );
};
export default AdminNavbar;
