import React, { useContext, useEffect, useReducer } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import RootLayout from "./pages/RootLayout.js";
import Home from "./pages/home/Home.js";
import Login from "./pages/login/Login";
import Book from "./pages/book/Book.js";
import { UserContext, UserContextProvider } from "./context/userContext.js";
import axios from "axios";
import Cart from "./pages/cart/Cart.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path=":id" element={<Book />} />
      <Route path="/login" element={<Login />} />
    </Route>
  )
);

const App = () => {
  const url = "https://book-shop-api.onrender.com/book";
  const userContext = useContext(UserContext);
  useEffect(() => {
    const contextAuthCheck = async () => {
      try {
        const tokenUser = await axios.get(
          "http://localhost:5000/auth/checkToken/"
        );
        if (tokenUser) {
          userContext.dispatch({
            type: "TOKEN_CHECK",
            user: tokenUser.data.user,
            isLogged: true,
          });
        } else {
          userContext.dispatch({
            type: "TOKEN_CHECK",
            user: null,
            isLogged: false,
          });
        }
      } catch (err) {
        console.log(err);
      }
    };
    contextAuthCheck();
  }, []);
  return <RouterProvider router={router} />;
};

export default App;
