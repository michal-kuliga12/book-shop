import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import "./SearchMenu.scss";

const SearchMenu = ({ setOptions, options }) => {
  const [toggleCategory, setToggleCategory] = useState(false);
  const optionsList = [
    {
      name: "Najnowsze",
      dbName: "new",
    },
    {
      name: "Rekomendowane",
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
      <div className="searchMenuUp">
        <div
          className="categoryFilter"
          onClick={() => {
            setToggleCategory(!toggleCategory);
          }}
        >
          <i>
            <FontAwesomeIcon icon={faBars} />
          </i>
          <span>KATEGORIA</span>
        </div>
        <div className="optionsFilter">
          <div className="optionsL">
            {optionsList.map((option, key) => {
              return (
                <span
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
          <span
            className="optionsR"
            onClick={() => {
              setOptions({ category: "", filter: "" });
            }}
          >
            Resetuj filtry
          </span>
        </div>
      </div>
      <div
        className={toggleCategory ? "searchMenuDown_active" : "searchMenuDown"}
      >
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
    </section>
  );
};

export default SearchMenu;
