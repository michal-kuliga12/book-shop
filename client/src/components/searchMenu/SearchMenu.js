import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./SearchMenu.scss";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const SearchMenu = ({ setOptions, options }) => {
  const [toggleFilterList, setToggleFilterList] = useState(0);

  const optionsList = [
    {
      name: "Najnowsze",
      dbName: "new",
    },
    {
      name: "Polecane",
      dbName: "isFeatured",
    },
    {
      name: "Dostępne",
      dbName: "isAvailable",
    },
  ];
  const categoryList = [
    {
      name: "Audiobooki",
      dbName: "audiobook",
    },
    {
      name: "eBooki",
      dbName: "ebook",
    },
    {
      name: "Biografie",
      dbName: "biography",
    },
    {
      name: "Fantastyka",
      dbName: "fantasy",
    },
    {
      name: "Historia",
      dbName: "history",
    },
    {
      name: "Kryminał i sensacja",
      dbName: "thriller",
    },
    {
      name: "Komiksy",
      dbName: "comic",
    },
    {
      name: "Biznes",
      dbName: "business",
    },
    {
      name: "Sport",
      dbName: "sport",
    },
    {
      name: "Dla dzieci",
      dbName: "kids",
    },
    {
      name: "Dla młodzieży",
      dbName: "teen",
    },
    {
      name: "Kuchnia i diety",
      dbName: "kitchen",
    },
    {
      name: "Kultura i sztuka",
      dbName: "culture",
    },
    {
      name: "Lektury szkolne",
      dbName: "lectures",
    },
    {
      name: "Literatura obyczajowa",
      dbName: "custom literature",
    },
    {
      name: "Nauka języków",
      dbName: "languages",
    },
  ];
  return (
    <section className="searchMenu">
      <div className="searchOptions">
        <div className="left">
          <button
            className={`categoryBtn ${toggleFilterList === 1 ? "active" : ""}`}
            onClick={() => {
              if (toggleFilterList !== 1) setToggleFilterList(1);
              else setToggleFilterList(0);
            }}
          >
            Kategoria
          </button>
          <button
            className="filterBtn disabled"
            onClick={() => {
              if (toggleFilterList !== 2) setToggleFilterList(2);
              else setToggleFilterList(0);
            }}
          >
            Filtry
          </button>
          <div
            className={`filterList overlay ${
              toggleFilterList === 2 ? "active" : ""
            }`}
          >
            <div className="filterListContent">
              <h2 className="disabled">Sortuj wg. tagów</h2>
              {optionsList.map((option, key) => {
                return (
                  <span
                    className={options.filter === option.dbName ? "active" : ""}
                    key={key}
                    onClick={() => {
                      setOptions({ ...options, filter: option.dbName });
                    }}
                  >
                    {option.name}
                  </span>
                );
              })}
            </div>
            <button
              className="filterListCloseBtn disabled"
              onClick={() => {
                setToggleFilterList(0);
              }}
            >
              <i>
                <FontAwesomeIcon icon={faXmark} />
              </i>
            </button>
          </div>
        </div>
        <button
          onClick={() => {
            setOptions({ category: "", filter: "" });
            setToggleFilterList(0);
          }}
          className="right"
        >
          Resetuj filtry
        </button>
      </div>
      <div
        className={`filterList overlay ${
          toggleFilterList === 1 ? "active" : ""
        }`}
      >
        <div className="filterListContent">
          <h2 className="disabled">Sortuj wg. kategorii</h2>
          {categoryList.map((category, key) => {
            return (
              <span
                key={key}
                onClick={() => {
                  setOptions({ ...options, category: category.dbName });
                  console.log(options);
                }}
              >
                {category.name}
              </span>
            );
          })}
        </div>
        <button
          className="filterListCloseBtn disabled"
          onClick={() => {
            setToggleFilterList(0);
          }}
        >
          <i>
            <FontAwesomeIcon icon={faXmark} />
          </i>
        </button>
      </div>
    </section>
  );
};

export default SearchMenu;
