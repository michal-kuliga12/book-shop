const CustomInput = ({
  setBookToAdd,
  bookToAdd,
  header,
  labelFor,
  inputType,
}) => {
  return (
    <label htmlFor={labelFor}>
      {header}
      <input
        onChange={(e) => {
          setBookToAdd({
            ...bookToAdd,
            [labelFor]: e.target.value,
          });
        }}
        type={inputType}
        required
      ></input>
    </label>
  );
};

export default CustomInput;
