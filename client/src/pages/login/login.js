import { faArrowAltCircleLeft, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useState } from 'react'
import {useNavigate } from 'react-router-dom';
import './login.scss'

const Login = () => {
  const navigate = useNavigate()
  const [status, setStatus] = useState("typing")
  const [action, setAction] = useState(0)
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: ""
  })
  const handleSubmit = async () => {
    setStatus("loading")
    try {
      const res = await axios.post('http://localhost:5000/auth/login', userData)
      setStatus("success")
      console.log(res)
    } catch(err) {
      setStatus("error")
      console.log(err)
    }
  }
  return (
    <div className="loginBg">
      <div className={action===0?"loginContainer":"loginContainer_disabled"}>
        <div className='loginTitle'>
          <i onClick={()=>{navigate(-1)}}>
            <FontAwesomeIcon icon={faArrowAltCircleLeft} />
          </i>
          <h1>Zaloguj się</h1>
        </div>
        <label className='loginItem'>
          <h2>Nazwa użytkownika *</h2>
          <input type="text" onChange={(e)=>{setUserData({...userData, username:e.target.value})}}></input>
        </label>
        <label className='loginItem'>
          <h2>Adres email *</h2>
          <input type="text" onChange={(e)=>{setUserData({...userData, email:e.target.value})}}></input>
        </label>
        <label className='loginItem'>
          <h2>Hasło *</h2>
          <input type="text" onChange={(e)=>{setUserData({...userData, password:e.target.value})}}></input>
        </label>
        <span>
          {
          (status === "error" && <p style={{color:"red"}}>Wystąpił błąd logowania!<br/>Spróbuj ponownie</p>) ||
          (status === "success" && "Pomyślnie zalogowano!")
          }
        </span>
        <button onClick={()=>{handleSubmit()}}>Zaloguj się</button>
      </div>
      <div className={action === 1?"registerContainer":"registerContainer_disabled"}>
        <h2>Witaj użytkowniku!</h2>
        <h3>Dlaczego warto założyć konto?</h3>
        <p><FontAwesomeIcon icon={faCheck}/>dostęp do historii zamówień</p>
        <p><FontAwesomeIcon icon={faCheck}/>dostęp do historii zamówień</p>
        <p><FontAwesomeIcon icon={faCheck}/>dostęp do historii zamówień</p>
        <p><FontAwesomeIcon icon={faCheck}/>dostęp do historii zamówień</p>
        <h3>Nie posiadasz jeszcze konta?</h3>
        <button>Zarejestruj się </button>
      </div>
      <div>
      </div>    
    </div>
  )
}

export default Login