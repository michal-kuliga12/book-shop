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
      userContext.dispatch({
        type: "LOGIN",
        user: userData.username,
        isLogged: true,
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
                <h1>Zaloguj się</h1>
              </div>
              <form>
                <label className="loginItem">Nazwa użytkownika*</label>
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
                <label className="loginItem">Hasło *</label>
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
                    Wystąpił błąd logowania!
                    <br />
                    Spróbuj ponownie
                  </p>
                )) ||
                  (status === "success" && "Pomyślnie zalogowano!")}
              </span>
              <button
                disabled={status === "loading"}
                onClick={() => {
                  handleLogin();
                }}
              >
                Zaloguj się
              </button>
              <div className="loginRedirect">
                <p>Nie posiadasz jeszcze konta?</p>
                <p>
                  Możesz się zarejestrować{" "}
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
                <h1>Zarejestruj się</h1>
              </div>
              <form>
                <label className="loginItem">Nazwa użytkownika*</label>
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
                <label className="loginItem">Hasło *</label>
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
                    Wystąpił błąd rejestracji!
                    <br />
                    Spróbuj ponownie
                  </p>
                )) ||
                  (status === "passwordError" && (
                    <p style={{ color: "red" }}>
                      Podane hasła nie są identyczne!
                    </p>
                  )) ||
                  (status === "bracketsError" && (
                    <p style={{ color: "red" }}>
                      Należy uzupełnić wszystkie pola!
                    </p>
                  )) ||
                  (status === "success" && "Rejestracja przebiegła pomyślnie!")}
              </span>
              <button
                disabled={status === "loading"}
                onClick={() => {
                  handleRegister();
                }}
              >
                Zarejestruj się
              </button>
              <div className="loginRedirect">
                <p>
                  Masz już konto? Aby się zalogować kliknij{" "}
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
                  <span style={{ color: "#FA824C" }}>Dobra</span>książka.pl
                </p>
              </div>
              <h2>Witaj użytkowniku!</h2>
              <h3>Dlaczego warto założyć konto?</h3>
              <p>
                <FontAwesomeIcon icon={faCheck} />
                dostęp do historii zamówień
              </p>
              <p>
                <FontAwesomeIcon icon={faCheck} />
                dostęp do historii zamówień
              </p>
              <p>
                <FontAwesomeIcon icon={faCheck} />
                dostęp do historii zamówień
              </p>
              <p>
                <FontAwesomeIcon icon={faCheck} />
                dostęp do historii zamówień
              </p>
            </div>
          </>
        )}
      </>
    </div>
  );
};

export default Login;
