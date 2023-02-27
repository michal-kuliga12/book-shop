import React, { useContext, useEffect } from "react";
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
import { UserContext } from "./context/userContext.js";
import axios from "axios";
import Cart from "./pages/cart/Cart.js";
import Admin from "./pages/admin/Admin.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path=":id" element={<Book />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Admin />} />
    </Route>
  )
);

const App = () => {
  const userContext = useContext(UserContext);
  useEffect(() => {
    const contextAuthCheck = async () => {
      try {
        const tokenUser = await axios.get(
          `${process.env.REACT_APP_API_URL}/auth/checkToken/`
        );
        if (tokenUser) {
          userContext.dispatch({
            type: "TOKEN_CHECK",
            user: tokenUser.data.user,
            isLogged: true,
            isAdmin: tokenUser.data.isAdmin,
            basketItems: tokenUser.data.basketItems,
          });
        } else {
          userContext.dispatch({
            type: "TOKEN_CHECK",
            user: null,
            isLogged: false,
            isAdmin: false,
            basketItems: 0,
          });
        }
      } catch (err) {
        userContext.dispatch({
          type: "TOKEN_CHECK",
          user: null,
          isLogged: false,
          isAdmin: false,
          basketItems: 0,
        });
      }
    };
    contextAuthCheck();
  }, []);
  return <RouterProvider router={router} />;
};

export default App;
