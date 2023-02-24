import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import "./BookItem.scss";

const BookItem = ({ item, key }) => {
  const handleEditBasket = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/book/basket/${item._id}`
      );
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Link className="bookItem" to={`/${item._id}`}>
        <div className="bookImgContainer">
          <img width={240} height={360} src={item.images[0]} alt=""></img>
        </div>
        <div className="itemDetails">
          <p className="title">{item.title}</p>
          <div>
            <p className="details">{item.author}</p>
            <p className="details">{item.price} zł</p>
          </div>
        </div>
      </Link>
      <div className="itemBtn">
        <button onClick={handleEditBasket}>Dodaj do koszyka</button>
      </div>
    </>
  );
};

export default BookItem;
