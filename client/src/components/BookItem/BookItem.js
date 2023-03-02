import axios from "axios";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import "./BookItem.scss";

const BookItem = ({ item, key }) => {
  const userContext = useContext(UserContext);
  // console.log(item.images);
  const handleEditBasket = async () => {
    if (!userContext.isLogged) {
      window.alert(
        "Aby uzyskać dostęp do tworzenia zamówienia należy założyć konto "
      );
    } else {
      try {
        await axios.post(
          `${process.env.REACT_APP_API_URL}/book/basket/${item._id}`
        );
        userContext.dispatch({
          type: "LOGIN",
          user: userContext.user,
          isLogged: userContext.isLogged,
          isAdmin: userContext.isAdmin,
          basketItems: userContext.basketItems + 1,
        });
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <>
      <Link className="bookItem" to={`/${item._id}`}>
        <div className="bookImgContainer">
          <img width={240} height={360} src={item.images[1]} alt=""></img>
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
