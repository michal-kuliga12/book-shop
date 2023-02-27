import {
  faCheck,
  faHome,
  faLock,
  faTrashAlt,
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
import axios from "axios";

const Admin = () => {
  const navigate = useNavigate();
  const [toggleOptions, setToggleOptions] = useState(false);
  const [toggleDelete, setToggleDelete] = useState(false);
  const [collection, setCollection] = useState("book");
  const [operation, setOperation] = useState("none");

  const { data, loading, error } = useFetch(
    `${process.env.REACT_APP_API_URL}/${collection}`
  );
  let delArray = [];
  let domElArray = [];
  const handleSubmitDelete = async () => {
    console.log(delArray);
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/book/`, {
        data: delArray,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const classEdit = (item) => {
    if (!String(item.classList).includes("adminBookItem")) {
      item = item.parentElement;
    }
    if (String(item.classList).includes("delMode")) {
      item.classList.remove("delMode");
    } else {
      item.classList.add("delMode");
    }
  };
  const handleSelect = (e, item) => {
    const domEl = e.target;
    const isSelectedArr = delArray.filter((i) => {
      return i === item;
    });
    if (isSelectedArr.length > 0) {
      delArray = delArray.filter((i) => {
        return i !== item._id;
      });
    } else {
      delArray.push(item._id);
      domElArray.push(domEl);
    }
    classEdit(domEl);
    console.log(delArray);
    console.log(domElArray);
  };
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
            <div>
              {toggleDelete && (
                <button
                  onClick={() => {
                    handleSubmitDelete();
                    if (toggleDelete) {
                      domElArray.map((i) => {
                        classEdit(i);
                      });
                    }
                  }}
                >
                  <i>
                    <FontAwesomeIcon icon={faCheck} />
                  </i>
                </button>
              )}
              <button
                className={toggleDelete && "delMode"}
                onClick={() => {
                  setToggleDelete(!toggleDelete);
                  if (toggleDelete) {
                    domElArray.map((i) => {
                      classEdit(i);
                    });
                    domElArray = [];
                    delArray = [];
                    console.log(delArray);
                    console.log(domElArray);
                  }
                }}
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </div>
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
                        <div
                          onClick={(e) => {
                            if (toggleDelete) {
                              handleSelect(e, item);
                            }
                          }}
                          className="adminBookItem"
                          key={index}
                        >
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
                        <div
                          onClick={(e) => {
                            if (toggleDelete) {
                              handleSelect(e, item);
                            }
                          }}
                          className="adminUserItem"
                          key={index}
                        >
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
