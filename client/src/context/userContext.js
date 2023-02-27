import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  user: "",
  isLogged: false,
  isAdmin: false,
  basketItems: 0,
};

export const UserContext = createContext(INITIAL_STATE);

const UserReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.user,
        isLogged: action.isLogged,
        isAdmin: action.isAdmin,
        basketItems: action.basketItems,
      };
    case "LOGOUT":
      return INITIAL_STATE;
    case "TOKEN_CHECK":
      return {
        user: action.user,
        isLogged: action.isLogged,
        isAdmin: action.isAdmin,
        basketItems: action.basketItems,
      };
    default:
      return state;
  }
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, INITIAL_STATE);
  return (
    <UserContext.Provider
      value={{
        user: state.user,
        isLogged: state.isLogged,
        isAdmin: state.isAdmin,
        basketItems: state.basketItems,
        dispatch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
