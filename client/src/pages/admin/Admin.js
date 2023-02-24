import {
  faHome,
  faLock,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import "./Admin.scss";
import "../../components/AdminBookItem/AdminBookItem.scss";
import "../../components/AdminUserItem/AdminUserItem.scss";
import AdminBookItem from "../../components/AdminBookItem/AdminBookItem";
import AdminUserItem from "../../components/AdminUserItem/AdminUserItem";

const Admin = () => {
  const navigate = useNavigate();
  const [toggleOptions, setToggleOptions] = useState(false);
  const [collection, setCollection] = useState("book");
  const [operation, setOperation] = useState("none");

  const { data, loading, error } = useFetch(
    `${process.env.REACT_APP_API_URL}/${collection}`
  );
  return (
    <div className="admin">
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
                setCollection("user");
              }}
              className={`navOptionsItem ${
                collection === "user" ? "active" : ""
              }`}
            >
              Użytkownicy
            </li>
            <li
              onClick={() => {
                setCollection("order");
              }}
              className={`navOptionsItem ${
                collection === "order" ? "active" : ""
              }`}
            >
              Zamówienia
            </li>
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
      <main className="adminContentWrapper">
        <header>
          <h2>Panel admina</h2>
        </header>
        <div className="adminContent">
          <div className="contentToolbar">
            <h3>
              {(collection === "book" && "Książki") ||
                (collection === "user" && "Użytkownicy") ||
                (collection === "order" && "Zamówienia")}
            </h3>
          </div>
          <div className="contentTable">
            {loading ? (
              <></>
            ) : (
              <>
                {collection === "book" && (
                  <>
                    <div className="adminBookItem disabled">
                      <p className="headId bookCol">Lp.</p>
                      <p className="headTitle bookCol">Tytuł:</p>
                      <p className="headAuthor bookCol">Autor:</p>
                      <p className="headAuthor bookCol">Id:</p>
                    </div>
                    {data.map((item, index) => {
                      return (
                        <div className="adminBookItem" key={index}>
                          <AdminBookItem data={item} id={index} />
                        </div>
                      );
                    })}
                  </>
                )}

                {collection === "user" && (
                  <>
                    <div className="adminUserItem disabled">
                      <p className="headId row">Lp.</p>
                      <p className="headTitle row">Nazwa użytkownika:</p>
                      <p className="headEmail row">Email:</p>
                      <p className="headObjId row">Id</p>
                      <p className="userIsAdmin row">Status</p>
                    </div>
                    {data.map((item, index) => {
                      return (
                        <div className="adminUserItem" key={index}>
                          <AdminUserItem data={item} id={index} />
                        </div>
                      );
                    })}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
