import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  search: "",
  category: "",
  filter: "",
};

export const SearchContext = createContext(INITIAL_STATE);

const SearchReducer = (state, action) => {
  switch (action.type) {
    case "NEW_SEARCH":
      return {
        search: action.search,
        category: action.category,
        filter: action.filter,
      };
    case "RESET_FILTER":
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);
  return (
    <SearchContext.Provider
      value={{
        search: state.search,
        category: state.category,
        filter: state.filter,
        dispatch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
