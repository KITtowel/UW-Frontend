import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

const Callback = () => {
  const locate = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();

  useEffect(() => {
    if (isAuthenticated === true) {
      window.close();
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const getNaverUserData = async () => {
      try {
        const searchParams = new URLSearchParams(locate.hash.substring(1));
        const access_token = searchParams.get("access_token");

        const naverResponse = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/users/rest-auth/naver/`,
          {
            access_token: access_token,
          }
        );

        if (naverResponse.status === 200) {
          const receivedToken = naverResponse.data.key;
          const receivedUserId = naverResponse.data.user_id;
          const receivedLocation = naverResponse.location;

          console.log(receivedToken);
          console.log(receivedUserId);
          console.log(receivedLocation);

          localStorage.setItem("token", receivedToken);
          localStorage.setItem("userId", receivedUserId);
          localStorage.setItem("location", receivedLocation);
          login(receivedToken);

          window.close();
        } else {
          throw new Error("네이버 회원가입이 되지 않았습니다.");
        }
      } catch (error) {
        console.error(error);
        console.log(error.response?.data);
      }
    };

    getNaverUserData();
  }, [locate.hash, navigate]);

  return null;
};

export default Callback;
