import axios from "axios";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useFetch from "../../hooks/useFetch.js";
import Stepper from "../../components/Stepper/Stepper.js";
import "./Cart.scss";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
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
            {loading ? (
              <></>
            ) : (
              <>
                {data.length > 0 ? (
                  <>
                    <div className="orderItemsContainer">
                      {data.map((item, key) => {
                        return (
                          <div className="orderItem">
                            <div className="orderItemL">
                              <img
                                src={item.images[0]}
                                width="64px"
                                alt="www.swiatksiazki.pl"
                              />
                              <div className="orderItemInfo">
                                <div>
                                  <p>{item.title}</p>
                                  <p>{item.author}</p>
                                </div>
                                <div style={{ color: "red" }}>
                                  2 x {item.price}
                                </div>
                              </div>
                            </div>
                            <div className="orderItemR">
                              <div className="orderItemToolbar">
                                <button
                                  onClick={() => {
                                    handleDeleteItem(item._id);
                                  }}
                                >
                                  <i>
                                    <FontAwesomeIcon icon={faTrash} />
                                  </i>
                                </button>
                              </div>
                              <div className="orderItemQty">
                                <i>
                                  <FontAwesomeIcon icon={faMinus} />
                                </i>
                                <input type="number" min="1" max="99" />
                                <i>
                                  <FontAwesomeIcon icon={faPlus} />
                                </i>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="orderCheckout">
                      <div className="orderTotal">
                        <p>Do zapłaty:</p>
                        <p>CENA</p>
                      </div>
                      <div>
                        <button
                          className="submitBtn"
                          onClick={() => {
                            setOrderStatus(2);
                          }}
                        >
                          DALEJ
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="statusInfoContainer">
                    <p>Brak produktów w koszyku</p>
                  </div>
                )}
              </>
            )}
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
                className="orderBackBtn"
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
      {orderStatus === 3 && (
        <section className="paymentWrapper">
          <div className="paymentTop">
            <form className="orderPayment">
              <div className="formItem">
                <label id="cardNumLabel" for="cardNum">
                  <p>Numer karty </p>
                  <div>
                    <input className="cardNum" type="text" disabled />-
                    <input className="cardNum" type="text" disabled />-
                    <input className="cardNum" type="text" disabled />-
                    <input className="cardNum" type="text" disabled />
                  </div>
                </label>
              </div>
              <div className="formItem">
                <label for="cvv">
                  Kod CVV <input id="cardCvv" type="text" disabled />
                </label>
              </div>
            </form>
            <div className="orderTotalContainer">
              <header>Podsumowanie</header>
              <div className="sumItem">
                <p>Cena:</p>
                <p>Cena:</p>
              </div>
              <div className="sumItem">
                <p>Dostawa:</p>
                <p>Dostawa:</p>
              </div>
              <div className="sumItem">
                <p>Zniżka:</p>
                <p>Zniżka:</p>
              </div>
              <div className="sumItem">
                <p>Łącznie</p>
                <p></p>
              </div>
            </div>
          </div>
          <div className="formItem Btn">
            <button
              className="orderBackBtn"
              onClick={() => {
                setOrderStatus(2);
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
              UTWÓRZ ZAMÓWIENIE
            </button>
          </div>
        </section>
      )}
    </div>
  );
};

export default Cart;
