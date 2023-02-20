import { useState } from "react";
import "./SearchMenu.scss";

const SearchMenu = ({ setOptions, options }) => {
  const [toggleFilterList, setToggleFilterList] = useState(0);

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
      <div className="searchOptions">
        <div className="left">
          <button
            className="categoryBtn"
            onClick={() => {
              setToggleFilterList(1);
            }}
          >
            Kategoria
          </button>
          <button
            className="filterBtn"
            onClick={() => {
              setToggleFilterList(2);
            }}
          >
            Filtry
          </button>
        </div>
        <button className="right">Resetuj filtry</button>
      </div>
      <div
        className={
          toggleFilterList === 1 ? "categoryList" : "categoryList disabled"
        }
      ></div>
      <div
        className={toggleFilterList === 2 ? "tagList" : "tagList disabled"}
      ></div>
    </section>
  );
};

// {categoryList.map((category, key) => {
//   return (
//     <span
//       key={key}
//       onClick={() => {
//         setOptions({ ...options, category: category.dbName });
//         console.log(options);
//       }}
//     >
//       {category.name}
//     </span>
//   );
// })}

// {optionsList.map((option, key) => {
//   return (
//     <span
//       key={key}
//       onClick={() => {
//         setOptions({ ...options, filter: option.dbName });
//       }}
//     >
//       {option.name}
//     </span>
//   );
// })}
export default SearchMenu;
