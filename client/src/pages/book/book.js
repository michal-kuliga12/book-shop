import React from "react";
import "../book/book.scss";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaceFrown,
  faFaceSmile,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

const Book = () => {
  const id = useParams().id;
  const { data, loading, error } = useFetch(
    `http://192.168.0.147:5000/book/find/${id}`,
    "get"
  );
  console.log(data);

  return (
    <div className="bookWrapper">
      <div className="bookContainer">
        <div className="bookImgAndDetails">
          <img src={data.images} width={240}></img>
          <div className="bookRight">
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
                <div className="tagItem" style={{ backgroundColor: "#ff5050" }}>
                  <i>
                    <FontAwesomeIcon icon={faFaceFrown} />
                  </i>
                  <p>Niedostępna</p>
                </div>
              )}
            </div>
            <div className="bookDetails">
              <p>
                <span>Gatunek:</span> <span>{data.type}</span>
              </p>
              <p>
                <span>Wydawnictwo:</span> <span>{data.publishingHouse}</span>
              </p>
              <p>
                <span>Rok wydania:</span> <span>{data.releaseYear}</span>
              </p>
              <p>
                <span>Informacje:</span> <span>{data.format}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="bookDesc">
          <h2>Opis:</h2>
          <p>{data.desc}</p>
        </div>
      </div>
    </div>
  );
};

export default Book;
