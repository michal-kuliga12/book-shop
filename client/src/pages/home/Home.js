import BookItem from "../../components/BookItem/BookItem.js";
import React, { useContext, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import "./Home.scss";
import "../../components/BookItem/BookItem.scss";
import SearchMenu from "../../components/searchMenu/SearchMenu.js";
import { SearchContext } from "../../context/searchContext.js";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const Home = () => {
  const searchContext = useContext(SearchContext);
  useEffect(() => {
    const imgConversion = async () => {
      try {
        await axios.get(
          `${process.env.REACT_APP_API_URL}/book/imgToWebp`,
          "get"
        );
      } catch (err) {
        console.log(err);
      }
    };
    imgConversion();
  }, []);
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
            <div style={{ backgroundColor: "#ffb8b8" }} className="statusBox">
              Wystąpił błąd!
            </div>
          ) : (
            <>
              {loading ? (
                <div className="loadingBox">
                  <i>
                    <FontAwesomeIcon icon={faBookOpen} />
                  </i>
                </div>
              ) : (
                <>
                  {status === "noResults" ? (
                    <div className="statusBox">
                      Nie znaleziono wyników dla zadanych filtrów
                    </div>
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
