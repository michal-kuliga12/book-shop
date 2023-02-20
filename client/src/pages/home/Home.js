import BookItem from "../../components/BookItem/BookItem.js";
import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import "./Home.scss";
import "../../components/BookItem/BookItem.scss";
import SearchMenu from "../../components/searchMenu/SearchMenu.js";

const Home = () => {
  const [options, setOptions] = useState({
    category: "",
    filter: "",
  });
  let status = "";
  const { data, loading, error } = useFetch(
    `
    https://book-shop-api.onrender.com/book?${
      options.filter ? `${options.filter}=true&` : ``
    }${options.category ? `type=${options.category}` : ``}
    `,
    "get"
  );
  if (data.length === 0) {
    status = "noResults";
  }
  return (
    <div className="home">
      <div className="homeSectionsContainer">
        <SearchMenu options={options} setOptions={setOptions} />
        <section className="productList">
          {error ? (
            <p className="statusBox">Wystąpił błąd!</p>
          ) : (
            <>
              {loading ? (
                <p className="statusBox">Szukanie...</p>
              ) : (
                <>
                  {status === "noResults" ? (
                    <p className="statusBox">
                      Nie znaleziono wyników dla zadanych filtrów
                    </p>
                  ) : (
                    <>
                      {data.map((item, key) => {
                        return (
                          <div className="bookItemWrapper" key={key}>
                            <BookItem item={item} />
                          </div>
                        );
                      })}
                    </>
                  )}
                </>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default Home;
