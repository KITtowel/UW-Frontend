import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Callback = () => {
  const locate = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const getNaverUserData = async () => {
      const searchParams = new URLSearchParams(locate.hash.substring(1));
      const access_token = searchParams.get("access_token");

      try {
        const response = await axios.get(
          "https://openapi.naver.com/v1/nid/me",
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
              "X-Client-ID": "rVPk557GGXAVOFzBIcCK",
              "X-Client-Secret": "y_aJ6RlZQ_",
            },
          }
        );

        const { nickname, email } = response.data.response;

        console.log("닉네임:", nickname);
        console.log("이메일:", email);

        const naverUser = {
          access_token,
          code: searchParams.get("code"),
          nickname,
          email,
        };

        try {
          const naverResponse = await axios.post(
            `${process.env.REACT_APP_API_BASE_URL}/users/rest-auth/naver/`,
            {
              access_token: naverUser.access_token,
              code: naverUser.code,
              nickname: naverUser.nickname,
              email: naverUser.email,
            }
          );

          if (naverResponse.status !== 200) {
            throw new Error("네이버 회원가입이 되지 않았습니다.");
          }

          const receivedToken = naverResponse.data.key;
          const receivedUserId = naverResponse.data.user_id;

          localStorage.setItem("token", receivedToken);
          localStorage.setItem("userId", receivedUserId);

          alert("마이페이지에서 거주지 정보를 입력해주세요.");
          navigate("/mypage");
        } catch (error) {
          console.error(error);
          console.log(error.response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getNaverUserData();
  }, [locate.hash, navigate]);

  return null;
};

export default Callback;
