import BookItem from "../../components/BookItem/BookItem.js";
import React, { useContext } from "react";
import useFetch from "../../hooks/useFetch";
import "./Home.scss";
import "../../components/BookItem/BookItem.scss";
import SearchMenu from "../../components/searchMenu/SearchMenu.js";
import { SearchContext } from "../../context/searchContext.js";

const Home = () => {
  const searchContext = useContext(SearchContext);
  let status = "";
  let fetchUrl = `
  ${process.env.REACT_APP_API_URL}/book?${
    searchContext.filter ? `${searchContext.filter}=true&` : ``
  }&${searchContext.category ? `type=${searchContext.category}` : ``}&${
    searchContext.search ? `title=${searchContext.search}` : ""
  }`;
  const { data, loading, error } = useFetch(fetchUrl, "get");
  if (data.length === 0) {
    status = "noResults";
  }
  return (
    <div className="home">
      <div className="homeSectionsContainer">
        <SearchMenu />
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
