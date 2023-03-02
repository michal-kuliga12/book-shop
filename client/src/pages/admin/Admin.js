import { faCheck, faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import "./Admin.scss";
import "../../components/AdminBookItem/AdminBookItem.scss";
import "../../components/AdminUserItem/AdminUserItem.scss";
import AdminBookItem from "../../components/AdminBookItem/AdminBookItem";
import AdminUserItem from "../../components/AdminUserItem/AdminUserItem";
import axios from "axios";
import AdminNavbar from "../../components/AdminNavbar/AdminNavbar";
import AdminAddForm from "../../components/AdminAddForm/AdminAddForm";
import { UserContext } from "../../context/userContext";

const Admin = () => {
  const userContext = useContext(UserContext);

  const navigate = useNavigate();
  const [toggleOptions, setToggleOptions] = useState(false);
  const [toggleDelete, setToggleDelete] = useState(false);
  const [toggleAdd, setToggleAdd] = useState(false);
  const [collection, setCollection] = useState("book");
  const [bookToAdd, setBookToAdd] = useState({
    title: "",
    author: "",
    type: "",
    publishingHouse: "",
    releaseYear: 0,
    format: "",
    desc: "",
    price: 0,
    images: "",
    isFeatured: false,
    isAvailable: false,
  });
  const { data, loading, error, reFetch } = useFetch(
    `${process.env.REACT_APP_API_URL}/${collection}`
  );

  let delArray = [];
  let domElArray = [];
  //SUBMIT BOOK
  const handleSubmitBook = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/${collection}/`, {
        data: bookToAdd,
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  //DELETE BOOK
  const handleSubmitDelete = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/${collection}/`, {
        data: delArray,
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  //FOR ITEMS SELECTION
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
  //FOR ITEMS SELECTION
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
  };
  return (
    loading === false && (
      <>
        {userContext.isAdmin === false ? (
          navigate("/")
        ) : (
          <div className="admin">
            <AdminNavbar
              setToggleAdd={setToggleAdd}
              setToggleOptions={setToggleOptions}
              toggleOptions={toggleOptions}
              setCollection={setCollection}
              collection={collection}
            />
            <main className="adminContentWrapper">
              <header>
                <h2>Panel admina</h2>
              </header>
              <div className="adminContent">
                <div className="contentToolbar">
                  <h3>
                    {(collection === "book" && !toggleAdd && "Książki") ||
                      (collection === "book" && toggleAdd && "Dodaj książkę") ||
                      (collection === "user" && "Użytkownicy") ||
                      (collection === "order" && "Zamówienia")}
                  </h3>
                  <div>
                    <button
                      className={toggleAdd && "delMode"}
                      onClick={() => {
                        setToggleAdd(!toggleAdd);
                        setToggleDelete(false);
                      }}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
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
                        setToggleAdd(false);
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
                      {collection === "book" && !toggleAdd && (
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
                      {collection === "user" && !toggleAdd && (
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
                      {toggleAdd && (
                        <>
                          {collection === "book" && (
                            <>
                              <AdminAddForm
                                collection={collection}
                                bookToAdd={bookToAdd}
                                setBookToAdd={setBookToAdd}
                              />
                            </>
                          )}
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            </main>
          </div>
        )}{" "}
        ?
      </>
    )
  );
};

export default Admin;
