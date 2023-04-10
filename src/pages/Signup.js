import React, { useState } from "react";
import styled from "styled-components";
import LogoBtn from "../components/LogoBtn";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import KakaoLogin from "react-kakao-login";
import axios from "axios";
import { API_BASE_URL } from "../config";
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
  width: 100%;
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

const Select = styled.select`
  float: left;
  padding: 11px 13px;
  background: #f9f9fa;
  margin: 0 4px 0.9rem;
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
}
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
}
`;

function Signup() {
  const [id, setId] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [email, setEmail] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const handleProvinceChange = e => {
    setSelectedProvince(e.target.value);
    setSelectedCity("");
  };

  const handleCityChange = e => {
    setSelectedCity(e.target.value);
  };

  const handleIdChange = e => {
    setId(e.target.value);
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

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await axios.post(`${API_BASE_URL}/users/register/`, {
      username: username,
      id: id,
      password: password,
      password2: password2,
      email: email,
    });
    console.log(response);
  };

  return (
    <>
      <Link to="/">
        <Logo src={Logo2} />
      </Link>
      <Container>
        <form onSubmit={handleSubmit}>
          <div>
            <Label>닉네임</Label>
            <Input type="text" value={id} onChange={handleIdChange} />
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
            <Select id="province" onChange={handleProvinceChange}>
              <option value="">도 선택</option>
              {Object.keys(cityOptions).map(province => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </Select>
            <Select id="city">
              <option value="">시/군/구 선택</option>
              {selectedProvince === ""
                ? Object.values(cityOptions)
                    .flat()
                    .map(city => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))
                : cityOptions[selectedProvince].map(city => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
            </Select>
          </div>
        </form>
      </Container>

      <Button type="submit">가입하기</Button>
    </>
  );
}

export default Signup;
