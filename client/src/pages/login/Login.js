import {
  faArrowAltCircleLeft,
  faBookOpen,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import "./Login.scss";

const Login = () => {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  const [status, setStatus] = useState("typing");
  const [action, setAction] = useState(0);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    rePassword: "",
  });
  const handleLogin = async () => {
    setStatus("loading");
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        userData,
        { withCredentials: true }
      );
      setStatus("success");
      await userContext.dispatch({
        type: "LOGIN",
        user: userData.username,
        isLogged: true,
        isAdmin: userContext.isAdmin,
        basketItems: userContext.basketItems,
      });
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      setStatus("error");
    }
  };
  const handleRegister = async () => {
    setStatus("loading");
    if (userData.password !== userData.rePassword) {
      setStatus("passwordError");
      return;
    }
    if (!(userData.username && userData.email && userData.password)) {
      setStatus("bracketsError");
      return;
    }
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/register`,
        userData
      );
      setStatus("success");
      handleLogin();
    } catch {
      setStatus("error");
      return;
    }
  };
  return (
    <div className="loginBg">
      <>
        {action === 0 ? (
          <>
            <div className="login">
              <div className="loginTitle">
                <Link to="/">
                  <i>
                    <FontAwesomeIcon icon={faArrowAltCircleLeft} />
                  </i>
                </Link>
                <h1>Zaloguj si??</h1>
              </div>
              <form>
                <label className="loginItem">Nazwa u??ytkownika*</label>
                <br />
                <input
                  type="text"
                  onChange={(e) => {
                    setUserData({ ...userData, username: e.target.value });
                  }}
                ></input>
                <br />
                <label className="loginItem">Adres email *</label>
                <br />
                <input
                  type="text"
                  onChange={(e) => {
                    setUserData({ ...userData, email: e.target.value });
                  }}
                ></input>
                <br />
                <label className="loginItem">Has??o *</label>
                <br />
                <input
                  type="password"
                  onChange={(e) => {
                    setUserData({ ...userData, password: e.target.value });
                  }}
                ></input>{" "}
                <br />
              </form>
              <span>
                {(status === "error" && (
                  <p style={{ color: "red" }}>
                    Wyst??pi?? b????d logowania!
                    <br />
                    Spr??buj ponownie
                  </p>
                )) ||
                  (status === "success" && "Pomy??lnie zalogowano!")}
              </span>
              <button
                disabled={status === "loading"}
                onClick={() => {
                  handleLogin();
                }}
              >
                Zaloguj si??
              </button>
              <div className="loginRedirect">
                <p>Nie posiadasz jeszcze konta?</p>
                <p>
                  Mo??esz si?? zarejestrowa??{" "}
                  <span
                    onClick={() => {
                      setAction(1);
                    }}
                  >
                    TUTAJ
                  </span>
                </p>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="registerLeft">
              <div className="loginTitle">
                <Link to="/">
                  <i>
                    <FontAwesomeIcon icon={faArrowAltCircleLeft} />
                  </i>
                </Link>
                <h1>Zarejestruj si??</h1>
              </div>
              <form>
                <label className="loginItem">Nazwa u??ytkownika*</label>
                <br />
                <input
                  type="text"
                  onChange={(e) => {
                    setUserData({ ...userData, username: e.target.value });
                  }}
                ></input>
                <br />
                <label className="loginItem">Adres email *</label>
                <br />
                <input
                  type="text"
                  onChange={(e) => {
                    setUserData({ ...userData, email: e.target.value });
                  }}
                ></input>
                <br />
                <label className="loginItem">Has??o *</label>
                <br />
                <input
                  type="password"
                  onChange={(e) => {
                    setUserData({ ...userData, password: e.target.value });
                  }}
                ></input>{" "}
                <br />
                <label className="loginItem"></label>
                <input
                  type="password"
                  onChange={(e) => {
                    setUserData({ ...userData, rePassword: e.target.value });
                  }}
                ></input>{" "}
                <br />
              </form>
              <span>
                {(status === "error" && (
                  <p style={{ color: "red" }}>
                    Wyst??pi?? b????d rejestracji!
                    <br />
                    Spr??buj ponownie
                  </p>
                )) ||
                  (status === "passwordError" && (
                    <p style={{ color: "red" }}>
                      Podane has??a nie s?? identyczne!
                    </p>
                  )) ||
                  (status === "bracketsError" && (
                    <p style={{ color: "red" }}>
                      Nale??y uzupe??ni?? wszystkie pola!
                    </p>
                  )) ||
                  (status === "success" && "Rejestracja przebieg??a pomy??lnie!")}
              </span>
              <button
                disabled={status === "loading"}
                onClick={() => {
                  handleRegister();
                }}
              >
                Zarejestruj si??
              </button>
              <div className="loginRedirect">
                <p>
                  Masz ju?? konto? Aby si?? zalogowa?? kliknij{" "}
                  <span
                    onClick={() => {
                      setAction(0);
                    }}
                  >
                    TUTAJ
                  </span>
                </p>
              </div>
            </div>
            <div className="registerRight">
              <div className="registerRightLogo">
                <i>
                  <FontAwesomeIcon icon={faBookOpen} />
                </i>
                <p>
                  <span style={{ color: "#FA824C" }}>Dobra</span>ksi????ka.pl
                </p>
              </div>
              <h2>Witaj u??ytkowniku!</h2>
              <h3>Dlaczego warto za??o??y?? konto?</h3>
              <p className="registerRightInfo">
                <FontAwesomeIcon icon={faCheck} />
                mo??liwo???? tworzenia zam??wie??
              </p>
              <p className="registerRightInfo">
                <FontAwesomeIcon icon={faCheck} />
                dost??p do kod??w zni??kowych dla zalogowanych u??ytkownik??w
              </p>
              <p className="registerRightInfo">
                <FontAwesomeIcon icon={faCheck} />
                dost??p do historii zam??wie??
              </p>
              <p className="registerRightInfo">
                <FontAwesomeIcon icon={faCheck} />
                mo??liwo???? dodawania ksia??ek do listy ulubionych
              </p>
              <p className="registerRightInfo">
                <FontAwesomeIcon icon={faCheck} />
                przekazywanie najnowszych ofert oraz obni??ek cen poprzez kontakt
                mailowy
              </p>
            </div>
          </>
        )}
      </>
    </div>
  );
};

export default Login;
