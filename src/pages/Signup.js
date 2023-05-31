import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Select from "../components/Select";
import { useAuth } from "../contexts/AuthContext";
import NaverLogin from "react-naver-login";
import KakaoLogin from "react-kakao-login";
import axios from "axios";
import Logo2 from "../assets/logo2.png";

const cityOptions = {
  경상북도: [
    "경산시",
    "경주시",
    "고령군",
    "구미시",
    "군위군",
    "김천시",
    "문경시",
    "봉화군",
    "상주시",
    "성주군",
    "안동시",
    "영덕군",
    "영양군",
    "영주시",
    "영천시",
    "예천군",
    "울릉군",
    "울진군",
    "의성군",
    "청도군",
    "청송군",
    "칠곡군",
    "포항시 남구",
    "포항시 북구",
  ],
  대구광역시: ["남구", "동구", "북구", "서구", "수성구", "달서구", "달성군"],
};

const Container = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  width: 90%;
  justify-content: center;
  align-items: center;
  max-width: 28rem;
  margin: 3rem auto;
  padding: 2rem 2.5rem;
  border: none;
  outline: none;
  border-radius: 0.25rem;
  color: #121212;
  background: #ffffff;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
`;

const Button = styled.button`
  display: block;
  margin: 20px auto 50px auto;
  padding: 11px 100px;
  color: rgb(253, 249, 243);
  font-weight: 600;
  text-transform: uppercase;
  background: #9dc3e6;
  border: none;
  border-radius: 50px;
  outline: 0;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-out;
  :hover {
    background: #2e75b6;
  }
`;

const Hr = styled.div`
  position: relative;
  color: rgba(0, 0, 0, 0.35);
  font-size: 12px;
  margin: 38px 0px;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    width: 500%;
    height: 1px;
    background: rgba(0, 0, 0, 0.35);
    height: 1px;
    font-size: 0px;
    line-height: 0px;
    margin: 0px 140px;
  }

  &::before {
    left: 0;
    transform: translate(-100%, -50%);
  }

  &::after {
    right: 0;
    transform: translate(100%, -50%);
  }
`;

const Logo = styled.img`
  width: 100px;
  display: block;
  margin: 20px auto;
`;

const Label = styled.label`
  display: block;
  color: #656565;
  text-align: left;
  margin: 10px;
`;

const Input = styled.input`
  width: 300px;
  padding: 11px 13px;
  background: #f9f9fa;
  color: #9dc3e6;
  margin-bottom: 0.9rem;
  border-radius: 4px;
  outline: 0;
  border: 1px solid rgba(245, 245, 245, 0.7);
  font-size: 14px;
  transition: all 0.3s ease-out;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.1);
  :focus,
  :hover {
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.15), 0 1px 5px rgba(0, 0, 0, 0.1);
  }
`;

const NaverButton = styled(Button)`
  background-color: #1ec800;
  margin: 10px;
  padding: 10px;
  width: 100%;
`;

const KakaoButton = styled(Button)`
  background-color: #ffeb00;
  color: #000;
  margin: 10px;
  padding: 10px;
  width: 100%;
`;

const Signup = () => {
  const locate = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();
  const [userData, setUserData] = useState(null);
  const [nickname, setNickname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [location2, setLocation2] = useState("");
  useEffect(() => {
    if (isAuthenticated === true) {
      navigate("/");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (
      locate.state &&
      locate.state.userData &&
      locate.state.userData.nickname
    ) {
      setUserData(locate.state.userData);
      setNickname(locate.state.userData.nickname);
      setEmail(locate.state.userData.email);
      setUsername(locate.state.userData.username || "");
      setNickname(locate.state.userData.nickname || "");
    }
  }, [locate.state]);

  const handleNicknameChange = e => {
    setNickname(e.target.value);
  };

  const handleUsernameChange = e => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  const handlePassword2Change = e => {
    setPassword2(e.target.value);
  };

  const handleEmailChange = e => {
    setEmail(e.target.value);
  };

  const handleLocationChange = e => {
    setLocation(e.target.value);
    setLocation2("");
  };

  const handleLocation2Change = e => {
    setLocation2(e.target.value);
  };

  const handleKakaoLogin = async ({ response }) => {
    try {
      const access_token = response?.access_token;
      const code = response?.code;
      const profile = response?.profile;
      const nickname = profile?.kakao_account?.profile?.nickname;
      const email = profile?.kakao_account?.email;

      console.log("Access Token:", access_token);
      console.log("Code:", code);

      const axiosResponse = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/users/rest-auth/kakao/`,
        {
          access_token,
        }
      );

      if (axiosResponse.status !== 200) {
        throw new Error("카카오 회원가입이 되지 않았습니다.");
      }

      const receivedKey = axiosResponse.data.key;
      const receivedUserId = axiosResponse.data.user_id;

      localStorage.setItem("key", receivedKey);
      localStorage.setItem("userId", receivedUserId);

      console.log(axiosResponse);
      login(receivedKey);
      alert("마이페이지에서 거주지 정보를 입력해주세요.");
      navigate("/mypage");
    } catch (error) {
      console.error(error);
      console.log(error.response.data);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (
      !nickname ||
      !username ||
      !password ||
      !password2 ||
      !email ||
      !location ||
      !location2
    ) {
      alert("모든 필드를 채워주세요.");
      return;
    }

    if (password.length < 8) {
      alert("비밀번호는 8자 이상이어야 합니다.");
      return;
    }

    if (password !== password2) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    let userPayload;
    if (userData) {
      userPayload = {
        ...userData,
        username,
        location,
        location2,
      };
    } else {
      userPayload = {
        nickname,
        username,
        password,
        password2,
        email,
        location,
        location2,
      };
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/users/register/`,
        userPayload
      );

      const { key, user_id } = response.data;
      localStorage.setItem("accessToken", key);
      localStorage.setItem("userId", user_id);

      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const handleNaverLogin = () => {
    const naverPopup = window.open(
      "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=rVPk557GGXAVOFzBIcCK&state=false&redirect_uri=http://127.0.0.1:3000/callback",
      "_blank",
      "width=500,height=700"
    );

    const checkPopupClosed = setInterval(() => {
      if (naverPopup.closed) {
        clearInterval(checkPopupClosed);
        navigate("/mypage");
      }
    }, 500);
  };

  return (
    <>
      <Link to="/">
        <Logo src={Logo2} />
      </Link>
      <form onSubmit={handleSubmit}>
        <Container>
          <NaverButton onClick={handleNaverLogin}>
            네이버로 회원가입
          </NaverButton>

          <KakaoLogin
            token="80ce118f2250d6342436cb0f233a5afb"
            redirectUri={`${process.env.REACT_APP_API_BASE_URL}/users/kakao/callback`}
            onSuccess={handleKakaoLogin}
            onFail={console.error}
            onLogout={console.info}
            render={props => (
              <KakaoButton onClick={props.onClick}>
                카카오로 회원가입
              </KakaoButton>
            )}
          />

          <Hr>또는</Hr>
          <div>
            <Label>닉네임</Label>
            <Input
              type="text"
              value={nickname}
              onChange={handleNicknameChange}
            />
          </div>
          <div>
            <Label>아이디</Label>
            <Input
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div>
            <Label>비밀번호</Label>
            <Input
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div>
            <Label>비밀번호 확인</Label>
            <Input
              type="password"
              value={password2}
              onChange={handlePassword2Change}
            />
          </div>
          <div>
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div>
            <Label>현재 거주 지역</Label>
            <Select id="province" onChange={handleLocationChange}>
              <option value="">시/도 선택</option>
              {Object.keys(cityOptions).map(location => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </Select>
            <Select id="city" onChange={handleLocation2Change}>
              <option value="">시/군/구 선택</option>
              {location === ""
                ? Object.values(cityOptions)
                    .flat()
                    .map(location2 => (
                      <option key={location2} value={location2}>
                        {location2}
                      </option>
                    ))
                : cityOptions[location].map(location2 => (
                    <option key={location2} value={location2}>
                      {location2}
                    </option>
                  ))}
            </Select>
          </div>
        </Container>

        <Button type="submit">가입하기</Button>
      </form>
    </>
  );
};

export default Signup;
