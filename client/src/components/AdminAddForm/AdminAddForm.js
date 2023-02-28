import axios from "axios";
import CustomInput from "../CustomInput/CustomInput";

const AdminAddForm = ({ collection, bookToAdd, setBookToAdd }) => {
  const handleSubmitBook = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/${collection}/`, {
        data: bookToAdd,
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmitBook();
      }}
      className="addBookForm"
    >
      <CustomInput
        setBookToAdd={setBookToAdd}
        bookToAdd={bookToAdd}
        header="Tytuł: "
        labelFor="title"
        inputType="text"
      />
      <CustomInput
        setBookToAdd={setBookToAdd}
        bookToAdd={bookToAdd}
        header="Autor: "
        labelFor="author"
        inputType="text"
      />
      <CustomInput
        setBookToAdd={setBookToAdd}
        bookToAdd={bookToAdd}
        header="Typ: "
        labelFor="type"
        inputType="text"
      />
      <CustomInput
        setBookToAdd={setBookToAdd}
        bookToAdd={bookToAdd}
        header="Wydawnictwo: "
        labelFor="publishingHouse"
        inputType="text"
      />
      <CustomInput
        setBookToAdd={setBookToAdd}
        bookToAdd={bookToAdd}
        header="Format: "
        labelFor="format"
        inputType="text"
      />
      <label htmlFor="releaseYear">
        Rok wydania:
        <input
          onChange={(e) => {
            setBookToAdd({
              ...bookToAdd,
              releaseYear: e.target.value,
            });
          }}
          type="number"
          required
        ></input>
      </label>
      <label htmlFor="price">
        Cena:
        <input
          onChange={(e) => {
            setBookToAdd({
              ...bookToAdd,
              price: e.target.value,
            });
          }}
          type="number"
          required
        ></input>
      </label>
      <label htmlFor="desc">
        Opis książki:
        <textarea
          onChange={(e) => {
            setBookToAdd({
              ...bookToAdd,
              desc: e.target.value,
            });
          }}
          id="desc"
          required
        ></textarea>
      </label>
      <label htmlFor="images">
        URL zdjęcia:
        <input
          onChange={(e) => {
            setBookToAdd({
              ...bookToAdd,
              images: [e.target.value],
            });
          }}
          type="text"
        ></input>
      </label>
      <label className="checkBox" htmlFor="isAvailable">
        <span>Dostępny</span>
        <input
          onChange={(e) => {
            setBookToAdd({
              ...bookToAdd,
              isAvailable: e.target.checked,
            });
          }}
          id="isAvailable"
          type="checkbox"
        ></input>
      </label>
      <label className="checkBox" htmlFor="isFeatured">
        <span>Rekomendowany</span>
        <input
          onChange={(e) => {
            setBookToAdd({
              ...bookToAdd,
              isFeatured: e.target.checked,
            });
          }}
          id="isFeatured"
          type="checkbox"
        ></input>
      </label>
      <div>
        <input
          className="submitBtn"
          type="submit"
          value="Dodaj książkę"
          onSubmit={(e) => {
            handleSubmitBook(e);
          }}
        ></input>
      </div>
    </form>
  );
};

export default AdminAddForm;
