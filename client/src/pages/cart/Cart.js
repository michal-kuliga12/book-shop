import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useFetch from "../../hooks/useFetch.js";
import Stepper from "../../util/stepper/Stepper.js";
import "./Cart.scss";
import { faXmark } from "@fortawesome/free-regular-svg-icons";
import {
  faCheck,
  faMinus,
  faPlus,
  faX,
} from "@fortawesome/free-solid-svg-icons";

const Cart = () => {
  const { data, loading, error } = useFetch(
    "https://book-shop-api.onrender.com/book/basket/",
    "get"
  );
  const id = useParams().id;
  const [itemStatus, setItemStatus] = useState("generated");
  console.log(data);
  const handleDeleteItem = async (itemId) => {
    try {
      await axios.delete(
        `https://book-shop-api.onrender.com/book/basket/${itemId}`
      );
    } catch (err) {
      console.log(err);
    }
    window.location.reload();
  };
  return (
    <div className="cartWrapper">
      <Stepper id="1" text="Koszyk" />
      <section className="cartTableWrapper">
        <header>
          <div className="col Item">PRODUKT</div>
          <div className="col Price">CENA</div>
          <div className="col Qty">ILOŚĆ</div>
          <div className="col Subtotal">WARTOŚĆ</div>
        </header>
        {data.map((item, key) => {
          return (
            <div className="tableItem">
              <div className="row" key={key}>
                <div className="col Item">
                  <img
                    src={item.images[0]}
                    width="64px"
                    alt="www.swiatksiazki.pl"
                  />
                  <div>
                    <p className="colItemTitle">{item.title}</p>
                    <p className="colItemAuthor">{item.author}</p>
                  </div>
                </div>
                <div className="col Price">
                  <p>{item.price} ZŁ</p>
                </div>
                <div className="col Qty">
                  <i>
                    <FontAwesomeIcon icon={faMinus} />
                  </i>
                  <input type="number" min="1" max="99" />
                  <i>
                    <FontAwesomeIcon icon={faPlus} />
                  </i>
                </div>
                <div className="col Subtotal">
                  <div>
                    <p>2 X {item.price} ZŁ</p>
                  </div>
                  <div className="itemToolbar">
                    <button>
                      <i>
                        <FontAwesomeIcon icon={faCheck} />
                      </i>
                    </button>
                    <button
                      onClick={() => {
                        handleDeleteItem(item._id);
                      }}
                    >
                      <i>
                        <FontAwesomeIcon icon={faX} />
                      </i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>
      <section className="cartTableCheckout">
        <div>
          <button className="applyBtn">PRZEJDŹ DO DOSTAWY</button>
          {/* <button className="cancelBtn">ANULUJ ZAMÓWIENIE</button> */}
        </div>
        <div>
          <p>PODSUMOWANIE:</p>
          <p>3213 ZŁ</p>
        </div>
      </section>
      {/* <section className="delieverySection">
        <Stepper id="2" text="Dane dostawy" />
      </section>
      <section className="paymentSection">
        <Stepper
          id="3"
          text="Płatność
        "
        />
      </section> */}
    </div>
  );
};

export default Cart;
