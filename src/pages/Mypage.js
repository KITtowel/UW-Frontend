import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.png";
import User from "../components/User";
import LogoBtn from "../components/LogoBtn";
import { Link } from "react-router-dom";
import Logo2 from "../assets/logo2.png";
import Profile from "../assets/profile.png";

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

const Header = styled.div`
  position: fixed;
  top: 0;
  left: 10%;
  width: 80%;
  height: 80px;
  background: #fff;
  border-bottom: 1px solid #969696;
  display: flex;
  align-items: center;
`;

const NavButton = styled.button`
  background: transparent;
  color: ${props => (props.selected ? "#24A1E8" : "#000000")};
  border: none;
  text-decoration: ${props => (props.selected ? "underline" : "none")};
  cursor: pointer;
  font-size: 1rem;
  margin: 30px 1rem;
  vertical-align: top;
`;

const EditButton = styled.button`
  display: inline-block;
  margin: 5px;
  padding: 6px 30px;
  color: #636363;
  font-weight: 600;
  text-transform: uppercase;
  background: #fff;
  border: 1px solid;
  border-radius: 5px;
  outline: 0;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-out;
  :hover {
    background: #636363;
    color: #fff;
  }
`;

const DeleteButton = styled.button`
  display: inline-block;
  margin: 5px;
  padding: 6px 30px;
  color: #ff0000;
  font-weight: 600;
  text-transform: uppercase;
  background: #fff;
  border: 1px solid;
  border-radius: 5px;
  outline: 0;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-out;
  :hover {
    background: #ff0000;
    color: #fff;
  }
`;

const Container = styled.div`
  text-align: left;
  width: 80%;
  margin: 80px auto 0;
  border-bottom: 1px solid #969696;
  background: #ffffff;
`;

const LogoIcon = styled.img`
  width: 50px;
  margin: 15px 50px;
`;

const ProfilePicture = styled.img`
  margin: 10px 55px;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
`;

const Select = styled.select`
  float: left;
  padding: 11px 13px;
  background: #f9f9fa;
  margin: 3px;
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
  display: block;
  width: 300px;
  padding: 11px 13px;
  background: #f9f9fa;
  color: #9dc3e6;
  margin: 5px 3px;
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

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;
`;

const TableHeader = styled.th`
  padding: 0.5rem;
  border-right: 1px solid #ddd;
  background: #eef4f7;
  vertical-align: middle;
  font-size: 13px;
  width: 30%;
  text-align: center;
`;

const TableCell = styled.td`
  padding: 0.5rem;
  width: 70%;
`;

function MyPage() {
  const [userData, setUserData] = useState({
    profilePicture: "",
    nickname: "",
  });
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [activeTab, setActiveTab] = useState("myinfo");

  const handleProvinceChange = e => {
    setSelectedProvince(e.target.value);
    setSelectedCity("");
  };

  const handleCityChange = e => {
    setSelectedCity(e.target.value);
  };

  const handleTabClick = tab => {
    setActiveTab(tab);
  };

  useEffect(() => {
    setUserData({
      profilePicture: Profile,
      nickname: "uw",
    });
  }, []);

  return (
    <>
      <Header>
        <Link to="/">
          <LogoIcon src={Logo2} />
        </Link>
        <NavButton
          selected={activeTab === "myinfo"}
          onClick={() => setActiveTab("myinfo")}>
          내 정보
        </NavButton>
        <NavButton
          selected={activeTab === "likes"}
          onClick={() => setActiveTab("likes")}>
          좋아요 목록
        </NavButton>
        <NavButton
          selected={activeTab === "reviews"}
          onClick={() => setActiveTab("reviews")}>
          후기 목록
        </NavButton>
        <NavButton
          selected={activeTab === "withdrawal"}
          onClick={() => setActiveTab("withdrawal")}>
          회원 탈퇴
        </NavButton>
      </Header>
      <Container>
        {activeTab === "myinfo" && (
          <div>
            <Table>
              <tbody>
                <TableRow>
                  <TableHeader>프로필 사진</TableHeader>
                  <TableCell>
                    <ProfilePicture src={userData.profilePicture} />
                    <div>
                      <EditButton>수정</EditButton>
                      <DeleteButton>삭제</DeleteButton>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHeader>닉네임</TableHeader>
                  <TableCell>
                    <Input placeholder={userData.nickname}></Input>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHeader>현재 거주 지역</TableHeader>
                  <TableCell>
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
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHeader>비밀번호 변경</TableHeader>
                  <TableCell>
                    <Input placeholder="현재 비밀번호"></Input>
                    <Input placeholder="새 비밀번호"></Input>
                    <Input placeholder="새 비밀번호 확인"></Input>
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </tbody>
            </Table>
          </div>
        )}
        {activeTab === "likes" && <div></div>}
        {activeTab === "reviews" && <div>{/* 후기 목록 내용 */}</div>}
        {activeTab === "withdrawal" && <div>{/* 회원 탈퇴 내용 */}</div>}
      </Container>
    </>
  );
}

export default MyPage;
