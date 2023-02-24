import React, { useContext, useEffect, useState } from "react";
import "../book/Book.scss";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaceFrown,
  faFaceSmile,
  faHeart as faHeartSolid,
  faShoppingBasket,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import { UserContext } from "../../context/userContext";

const Book = () => {
  const userContext = useContext(UserContext);

  const [like, setLike] = useState(false);
  const id = useParams().id;
  useEffect(() => {
    const checkBookInFav = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/book/findFav/${id}`
      );
      if (res.data.favBook) setLike(true);
      else setLike(false);
    };
    checkBookInFav();
  }, []);
  const { data } = useFetch(
    `${process.env.REACT_APP_API_URL}/book/find/${id}`,
    "get"
  );
  const handleEditBasket = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/book/basket/${id}`);
    } catch (err) {
      console.log(err);
    }
  };
  const handleEditFavorite = async () => {
    try {
      if (!like) {
        await axios.post(`${process.env.REACT_APP_API_URL}/book/fav/${id}`);
        return;
      } else {
        await axios.delete(`${process.env.REACT_APP_API_URL}/book/fav/${id}`);
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        paddingTop: "100px",
        paddingBottom: "100px",
      }}
    >
      <div className="bookWrapper">
        <div className="bookContainer">
          <div className="bookImgAndDetails">
            <img alt="taniaksiążka.pl" src={data.images} width={240}></img>
            <div className="bookRight">
              <div className="bookDetails">
                <div>
                  <h1>{data.title}</h1>
                  <p>Autor: {data.author}</p>
                </div>
                <div className="tagContainer">
                  {data.isFeatured && (
                    <div className="tagItem">
                      <i style={{ color: "gold" }}>
                        <FontAwesomeIcon icon={faStar} />
                      </i>
                      <p>Polecana</p>
                    </div>
                  )}
                  {data.isAvailable ? (
                    <div className="tagItem">
                      <i>
                        <FontAwesomeIcon icon={faFaceSmile} />
                      </i>
                      <p>Dostępna</p>
                    </div>
                  ) : (
                    <div
                      className="tagItem"
                      style={{ backgroundColor: "#ff5050" }}
                    >
                      <i>
                        <FontAwesomeIcon icon={faFaceFrown} />
                      </i>
                      <p>Niedostępna</p>
                    </div>
                  )}
                </div>
                <div className="bookInfo">
                  <p>
                    <span>Gatunek:</span> <span>{data.type}</span>
                  </p>
                  <p>
                    <span>Wydawnictwo:</span>{" "}
                    <span>{data.publishingHouse}</span>
                  </p>
                  <p>
                    <span>Rok wydania:</span> <span>{data.releaseYear}</span>
                  </p>
                  <p>
                    <span>Informacje:</span> <span>{data.format}</span>
                  </p>
                </div>
              </div>
              {userContext.isLogged ? (
                <div className="bookButtons">
                  <button
                    onClick={() => {
                      setLike(!like);
                      handleEditFavorite();
                    }}
                    className="addToFavBtn"
                    style={
                      like
                        ? { borderColor: "red" }
                        : { borderColor: "lightgray" }
                    }
                  >
                    {like ? (
                      <>
                        <i style={{ color: "red" }}>
                          <FontAwesomeIcon icon={faHeartSolid} />
                        </i>
                        <span>Dodano do ulubionych</span>
                      </>
                    ) : (
                      <>
                        <i>
                          <FontAwesomeIcon icon={faHeart} />
                        </i>
                        <span>Dodaj do ulubionych</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      handleEditBasket();
                    }}
                    className="addToBasketBtn"
                  >
                    <i>
                      <FontAwesomeIcon icon={faShoppingBasket} />
                    </i>
                    <span>Dodaj do koszyka</span>
                  </button>
                </div>
              ) : (
                <div className="bookButtons_disabled">
                  <p>
                    Aby uzyskać dostęp do listy ulubionych, oraz tworzenia
                    zamówień zaloguj się
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="bookDesc">
            <h2>Opis:</h2>
            <p>{data.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;
