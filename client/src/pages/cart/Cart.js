import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch.js";
import Stepper from "../../util/stepper/Stepper.js";

const Cart = () => {
  const { data, loading, error } = useFetch(
    "http://localhost:5000/book/basket/",
    "get"
  );
  const id = useParams().id;
  const [itemStatus, setItemStatus] = useState("generated");
  console.log(data);
  const handleDeleteItem = async (itemId) => {
    try {
      await axios.delete(`http://localhost:5000/book/basket/${itemId}`);
    } catch (err) {
      console.log(err);
    }
    window.location.reload();
  };
  return (
    <div
      className="cartWrapper"
      style={{ paddingTop: "200px", minHeight: "100vh" }}
    >
      <section style={{ width: "100%", height: "200px" }}>
        <Stepper id="1." text="Koszyk" />
        <div className="cartProductList">
          {data.map((item, key) => {
            return (
              <div key={key}>
                <img
                  src={item.images[0]}
                  width="64px"
                  alt="www.swiatksiazki.pl"
                />
                <div>
                  <p>{item.title}</p>
                  <p>{item.author}</p>
                </div>
                <button
                  onClick={() => {
                    handleDeleteItem(item._id);
                  }}
                >
                  X
                </button>
              </div>
            );
          })}
        </div>
      </section>
      <section>
        <Stepper id="2." text="Dane dostawy" />
      </section>
      <section>
        <Stepper
          id="3."
          text="Płatność
        "
        />
      </section>
    </div>
  );
};

export default Cart;
