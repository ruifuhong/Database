import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "../stylesheets/NotLogin.css"; 

const NotLogin = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      navigate("/");
    }
  }, [countdown, navigate]);

  return (
    <>
    <div className="not-login-container">
      <h1 className="not-login-heading">你沒有登入</h1>
      <p className="not-login-countdown">{countdown}秒後跳轉</p>
      <a href="/" className="not-login-link">手動跳轉</a>
    </div>
    </>
  );
};

export default NotLogin;
