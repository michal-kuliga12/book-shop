import axios from "axios";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useFetch from "../../hooks/useFetch.js";
import Stepper from "../../components/Stepper/Stepper.js";
import "./Cart.scss";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import BackBtn from "../../components/BackBtn/BackBtn.js";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [orderStatus, setOrderStatus] = useState(1);
  const { data, loading, error } = useFetch(
    `${process.env.REACT_APP_API_URL}/book/basket/`,
    "get"
  );
  const [order, setOrder] = useState({
    items: [{}],
    totalPrice: data[1] || 0,
    name: "",
    surname: "",
    address: "",
    postal: "",
    city: "",
    addInfo: "",
    date: new Date(),
  });
  const navigate = useNavigate();
  // console.log(order);
  // console.log(data);
  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/book/basket/${id}`);
    } catch (err) {
      console.log(err);
    }
    window.location.reload();
  };
  const handleCreateOrder = async () => {
    console.log("tworzenie zamowienia");
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/book/order`, order);
      setOrderStatus(4);
    } catch (err) {
      console.log(err);
    }
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
                      {data[0].map((item, key) => {
                        return (
                          <div key={key} className="orderItem">
                            <div className="orderItemL">
                              <img
                                src={item.book.images[0]}
                                width="64px"
                                alt="www.swiatksiazki.pl"
                              />
                              <div className="orderItemInfo">
                                <div>
                                  <p>{item.book.title}</p>
                                  <p>{item.book.author}</p>
                                </div>
                                <div style={{ color: "red" }}>
                                  {item.quantity} x {item.book.price} ZŁ
                                </div>
                              </div>
                            </div>
                            <div className="orderItemR">
                              <div className="orderItemToolbar">
                                <button
                                  onClick={() => {
                                    handleDeleteItem(item._id);
                                    item.quantity -= 1;
                                  }}
                                >
                                  <i>
                                    <FontAwesomeIcon icon={faTrash} />
                                  </i>
                                </button>
                              </div>
                              <div className="orderItemQty">
                                {/* <i
                                  onClick={() => {
                                    handleCounterChange(-1, item);
                                  }}
                                >
                                  <FontAwesomeIcon icon={faMinus} />
                                </i>
                                <input type="number" min="1" max="99" />
                                <i
                                  onClick={() => {
                                    handleCounterChange(1, item);
                                  }}
                                >
                                  <FontAwesomeIcon icon={faPlus} />
                                </i> */}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="orderCheckout">
                      <div className="orderTotal">
                        <p>Do zapłaty:</p>
                        <p>{data[1].toFixed(2)} ZŁ</p>
                      </div>
                      <div>
                        <button
                          className="submitBtn"
                          onClick={() => {
                            setOrderStatus(2);
                            setOrder({
                              ...order,
                              items: data[0],
                              totalPrice: data[1],
                            });
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
                Imię *:
                <input
                  placeholder="Adam"
                  pattern="^(\w+)$"
                  autoComplete="off"
                  onChange={(e) => {
                    setOrder({ ...order, name: e.target.value });
                  }}
                  value={order.name || ""}
                  type="text"
                  required
                  spellCheck="false"
                />
              </label>
              <label for="surname">
                Nazwisko *:
                <input
                  placeholder="Kowalski"
                  pattern="^(\w+)$"
                  autoComplete="off"
                  onChange={(e) => {
                    setOrder({ ...order, surname: e.target.value });
                  }}
                  value={order.surname || ""}
                  type="text"
                  required
                  spellCheck="false"
                />
              </label>
            </div>
            <div className="formItem">
              <label for="address">
                Adres *:
                <input
                  placeholder="Sadowa 30"
                  pattern="^((\w)+[\s])+(\d+[a-zA-Z]?)$"
                  autoComplete="off"
                  onChange={(e) => {
                    setOrder({ ...order, address: e.target.value });
                  }}
                  value={order.address || ""}
                  type="text"
                  id="address"
                  required
                  spellCheck="false"
                />
              </label>
            </div>
            <div className="formItem">
              <label for="postal">
                Kod pocztowy *:
                <div className="postalContainer">
                  <input
                    placeholder="00-141"
                    autoComplete="off"
                    pattern="([0-9]{2})[\s-]([0-9]{3})"
                    onChange={(e) => {
                      setOrder({ ...order, postal: e.target.value });
                    }}
                    value={order.postal || ""}
                    type="postal"
                    id="postal"
                    required
                    spellCheck="false"
                  />
                  {/* ---
                  <input
                    type="number"
                    min="100"
                    max="999"
                    maxLength="3"
                    id="postal2"
                  /> */}
                </div>
              </label>
              <label for="city">
                Miasto *:{" "}
                <input
                  placeholder="Warszawa"
                  pattern="^(\w+)$"
                  autoComplete="off"
                  onChange={(e) => {
                    setOrder({ ...order, city: e.target.value });
                  }}
                  value={order.city || ""}
                  type="text"
                  required
                  spellCheck="false"
                />
              </label>
            </div>
            <div className="formItem">
              <label for="info">
                Dodatkowe informacje:
                <input
                  placeholder="Tel. 111 111 111"
                  autoComplete="off"
                  onChange={(e) => {
                    setOrder({ ...order, addInfo: e.target.value });
                  }}
                  value={order.addInfo || ""}
                  type="textarea"
                  id="info"
                  spellCheck="false"
                />
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
      {(orderStatus === 3 || orderStatus === 4) && (
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
                <p>{order.totalPrice.toFixed(2)} Zł</p>
              </div>
              <div className="sumItem">
                <p>Dostawa:</p>
                <p>0 Zł</p>
              </div>
              <div className="sumItem">
                <p>Zniżka:</p>
                <p>0 Zł</p>
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
              onClick={() => {
                setOrder({ ...order, orderDate: new Date() });
                handleCreateOrder();
                setTimeout(() => {
                  navigate("/");
                  window.location.reload();
                }, 2000);
              }}
            >
              UTWÓRZ ZAMÓWIENIE
            </button>
          </div>
          {orderStatus === 4 && (
            <div style={{ textAlign: "center" }}>
              <p>Utworzono zamówienie!</p>
              <p>Teraz nastąpi przekierowanie do strony głównej</p>
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default Cart;
