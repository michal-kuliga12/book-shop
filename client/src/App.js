import React from "react";
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
import { UserContextProvider } from "./context/userContext.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={
        <UserContextProvider>
          <RootLayout />
        </UserContextProvider>
      }
    >
      <Route index element={<Home />} />
      <Route path=":id" element={<Book />} />
      <Route path="/login" element={<Login />} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
