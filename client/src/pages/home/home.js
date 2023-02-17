import BookItem from "../../components/BookItem/BookItem.js";
import React, { useContext, useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import "./Home.scss";
import "../../components/BookItem/BookItem.scss";
import SearchMenu from "../../components/searchMenu/SearchMenu.js";
import { UserContext } from "../../context/userContext.js";
import axios from "axios";

const Home = () => {
  const [options, setOptions] = useState({
    category: "",
    filter: "",
  });
  let status = "";
  const { data, loading, error } = useFetch(
    `
    http://192.168.0.147:5000/book?${
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
        {/* <section className='banner'>
        <div className='bannerText'>
          <p>Witamy wszystkich miłośników książek!</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dignissim turpis purus, nec vulputate nisl ornare in. Suspendisse commodo aliquet mi id imperdiet. Curabitur quis nulla ultricies, congue odio at, feugiat velit. Nam porttitor, arcu ac </p>
        </div>
      </section> */}
        <SearchMenu options={options} setOptions={setOptions} />
        <section className="productList">
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
                      <div className="container" key={key}>
                        <BookItem item={item} />
                      </div>
                    );
                  })}
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
