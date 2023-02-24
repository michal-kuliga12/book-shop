import axios from "axios";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useFetch from "../../hooks/useFetch.js";
import Stepper from "../../components/Stepper/Stepper.js";
import "./Cart.scss";
import {
  faCheck,
  faMinus,
  faPlus,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import BackBtn from "../../components/BackBtn/BackBtn.js";

const Cart = () => {
  const [orderStatus, setOrderStatus] = useState(1);
  const { data, loading, error } = useFetch(
    `${process.env.REACT_APP_API_URL}/book/basket/`,
    "get"
  );
  const handleDeleteItem = async (itemId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/book/basket/${itemId}`
      );
    } catch (err) {
      console.log(err);
    }
    window.location.reload();
  };
  return (
    <div className="cartWrapper">
      <BackBtn />
      <Stepper orderStatus={orderStatus} />
      {orderStatus === 1 && (
        <>
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
              <button
                onClick={() => {
                  setOrderStatus(2);
                }}
                className="submitBtn"
              >
                DALEJ
              </button>
            </div>
            <div>
              <p>PODSUMOWANIE:</p>
              <p>3213 ZŁ</p>
            </div>
          </section>
        </>
      )}
      {orderStatus === 2 && (
        <section className="delieveryFormWrapper">
          <form
            onSubmit={() => {
              setOrderStatus(3);
              return false;
            }}
          >
            <h1>Dane dostawy</h1>
            <div className="formItem">
              <label for="name">
                Imię: <input type="text" />
              </label>
              <label for="surname">
                Nazwisko: <input type="text" />
              </label>
            </div>
            <div className="formItem">
              <label for="address">
                Adres: <input type="text" id="address" />
              </label>
            </div>
            <div className="formItem">
              <label for="postal">
                Kod pocztowy:
                <div className="postalContainer">
                  <input
                    type="number"
                    min="10"
                    max="99"
                    maxLength="2"
                    id="postal1"
                  />
                  ---
                  <input
                    type="number"
                    min="100"
                    max="999"
                    maxLength="3"
                    id="postal2"
                  />
                </div>
              </label>
              <label for="city">
                Miasto: <input type="text" />
              </label>
            </div>
            <div className="formItem">
              <label for="info">
                Dodatkowe informacje:
                <input type="textarea" id="info" />
              </label>
            </div>
            <div className="formItem Btn">
              <button
                id="backBtn"
                onClick={() => {
                  setOrderStatus(1);
                }}
              >
                WSTECZ
              </button>
              <button
                className="submitBtn"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                DALEJ
              </button>
            </div>
          </form>
        </section>
      )}
      {orderStatus === 3 && <section>a</section>}
    </div>
  );
};

export default Cart;
