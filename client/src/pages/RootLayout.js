import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { Outlet, useLocation } from "react-router-dom";

const RootLayout = () => {
  let location = useLocation();
  return (
    <div style={{ position: "relative" }}>
      {location.pathname !== ("/login" || "/register") && <Navbar />}
      <main>
        <Outlet />
      </main>
      {location.pathname !== ("/login" || "/register") && <Footer />}
    </div>
  );
};

export default RootLayout;
