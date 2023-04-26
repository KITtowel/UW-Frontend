import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.png";
import User from "../components/User";
import Select from "../components/Select";
import { Link, useNavigate } from "react-router-dom";
import Logo2 from "../assets/logo2.png";
import DefaultProfilePicture from "../assets/profile.png";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { RiThumbUpFill, RiThumbUpLine } from "react-icons/ri";
import { MdOutlineLocationOn } from "react-icons/md";
import { Pagination } from "../components";
import axios from "axios";

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
  z-index: 999;
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

const Center = styled.div`
  text-align: center;
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

const ConfirmButton = styled.button`
  display: inline-block;
  margin: 5px;
  padding: 6px 30px;
  color: #969696;
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
    background: #969696;
    color: #fff;
  }
`;

const CancleButton = styled.button`
  display: inline-block;
  margin: 30px 5px;
  padding: 6px 30px;
  color: #000;
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
    background: #000;
    color: #fff;
  }
`;

const EditButton = styled.button`
  display: inline-block;
  margin: 20px 35px;
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

const Container = styled.div`
  text-align: left;
  width: 80%;
  margin: 80px auto;
  border-bottom: 1px solid #969696;
  background: #ffffff;
`;

const Wrapper = styled.div`
  padding: 50px;
  text-align: center;
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
`;

const InputCenter = styled.input`
  display: block;
  width: 160px;
  padding: 11px 13px;
  background: #f9f9fa;
  color: #9dc3e6;
  margin: 5px auto 35px auto;
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

const Label = styled.label`
  display: block;
  color: #656565;
  text-align: center;
  margin: 10px;
`;

const List = styled.div`
  padding: 30px;
  max-width: 700px;
  margin: auto;
  border-bottom: 1px solid #d9d9d9;
  line-height: 2;
  * {
    vertical-align: middle;
  }
`;

function MyPage() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [userData, setUserData] = useState({
    nickname: "",
    location: "",
    location2: "",
    image: "",
  });
  const [profilePicture, setProfilePicture] = useState(DefaultProfilePicture);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [activeTab, setActiveTab] = useState("myinfo");
  const [nickname, setNickname] = useState(userData.nickname);
  const [location, setLocation] = useState("");
  const [location2, setLocation2] = useState("");
  const [image, setImage] = useState(profilePicture);
  const [password, setPassword] = useState("");
  const [reason, setReason] = useState("");

  const [data, setData] = useState([
    {
      id: 1,
      name: "GS25 구미옥계대로점",
      category: "편의점",
      rating: 5.0,
      address: "경상북도 구미시 산호대로 747",
      liked: false,
      review: "친절해요.",
    },
    {
      id: 2,
      name: "GS25 옥계희망점",
      category: "편의점",
      rating: 4.2,
      address: "경상북도 구미시 옥계동 산호대로25안길 1",
      liked: false,
      review: "친절해요.",
    },
    {
      id: 3,
      name: "GS25 옥계센타점",
      category: "편의점",
      rating: 4.8,
      address: "경상북도 구미시 산호대로24길 9-12",
      liked: false,
      review: "친절해요.",
    },
    {
      id: 4,
      name: "GS25 구미옥계행운점",
      category: "편의점",
      rating: 3.9,
      address: "경상북도 구미시 산호대로27길 13-17",
      liked: false,
      review: "친절해요.",
    },
    {
      id: 5,
      name: "GS25 구미산호점",
      category: "편의점",
      rating: 4.1,
      address: "경상북도 구미시 옥계동 산호대로27길 17",
      liked: false,
      review: "친절해요.",
    },
  ]);

  const handleCancel = () => {
    navigate(-1);
  };

  const handleLike = id => {
    const newData = data.map(item => {
      if (item.id === id) {
        return {
          ...item,
          liked: !item.liked,
        };
      }
      return item;
    });
    setData(newData);
  };

  const handleProvinceChange = e => {
    setSelectedProvince(e.target.value);
    setSelectedCity("");
  };

  const handleImageChange = e => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleNicknameChange = e => {
    setNickname(e.target.value);
  };

  const handleLocationChange = e => {
    setLocation(e.target.value);
  };

  const handleLocation2Change = e => {
    setLocation2(e.target.value);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  const handleReasonChange = e => {
    setReason(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_API_BASE_URL}/users/profile/13/`, {
        nickname,
        location,
        location2,
        image,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit4 = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/users/profile/{user}/`, {
        data: { password, reason },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleCityChange = e => {
    setSelectedCity(e.target.value);
  };

  const handleTabClick = tab => {
    setActiveTab(tab);
  };

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/users/profile/13/`
        );

        if (response.data.success) {
          const { nickname, location, location2, image } = response.data;
          setUserData({ nickname, location, location2, image });
          setProfilePicture(image || DefaultProfilePicture);
        } else {
          alert("사용자 데이터를 가져오는데 실패했습니다.");
        }
      } catch (error) {
        console.error(error);
        alert("서버와 통신 중 문제가 발생했습니다. 다시 시도해주세요.");
      }
    }

    fetchUserData();
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
                    <ProfilePicture src={image} />
                    <div>
                      <label htmlFor="imageInput">
                        <EditButton as="span">이미지 선택</EditButton>
                      </label>
                      <input
                        type="file"
                        id="imageInput"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: "none" }}
                      />
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHeader>닉네임</TableHeader>
                  <TableCell>
                    <Input
                      placeholder={userData.nickname}
                      value={nickname}
                      onChange={handleNicknameChange}></Input>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHeader>현재 거주 지역</TableHeader>
                  <TableCell>
                    <Select id="province" onChange={handleLocationChange}>
                      <option value="">도 선택</option>
                      {Object.keys(cityOptions).map(province => (
                        <option key={province} value={province}>
                          {province}
                        </option>
                      ))}
                    </Select>
                    <Select id="city" onChange={handleLocation2Change}>
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
              </tbody>
            </Table>
            <Center>
              <ConfirmButton onClick={handleSubmit}>확인</ConfirmButton>
              <CancleButton onClick={handleCancel}>취소</CancleButton>
            </Center>
          </div>
        )}
        {activeTab === "likes" && (
          <div>
            {data.map(item => (
              <List key={item.id}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <h2 style={{ marginRight: "1rem" }}>{item.name}</h2>
                  <h3 style={{ marginRight: "1rem", color: "#666" }}>
                    {item.category}
                  </h3>
                  {item.liked ? (
                    <RiThumbUpLine
                      style={{
                        color: "#24A1E8",
                        position: "absolute",
                        right: "30%",
                        cursor: "pointer",
                      }}
                      onClick={() => handleLike(item.id)}
                    />
                  ) : (
                    <RiThumbUpFill
                      style={{
                        color: "#666",
                        position: "absolute",
                        right: "30%",
                        cursor: "pointer",
                      }}
                      onClick={() => handleLike(item.id)}
                    />
                  )}
                </div>
                <p style={{ color: "#666" }}>
                  <FaStar color="#F7CA46" size={15} /> {item.rating} / 5
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: "#666",
                  }}>
                  <MdOutlineLocationOn style={{ marginRight: "0.5rem" }} />
                  <p>{item.address}</p>
                </div>
              </List>
            ))}
            <Pagination total={100} limit={15} page={page} setPage={setPage} />
          </div>
        )}
        {activeTab === "reviews" && (
          <div>
            {data.map(item => (
              <List key={item.id}>
                <div style={{}}>
                  <div style={{ position: "absolute", right: "30%" }}>
                    <FiEdit style={{ marginRight: "0.5rem" }} />
                    <FiTrash2 />
                  </div>
                  <h2 style={{ display: "block" }}>{item.name}</h2>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      color: "#666",
                    }}>
                    <MdOutlineLocationOn style={{ marginRight: "0.5rem" }} />
                    <p>{item.address}</p>
                  </div>
                </div>
                <p>{item.review}</p>
              </List>
            ))}
          </div>
        )}
        {activeTab === "withdrawal" && (
          <Wrapper>
            <Label htmlFor="password">비밀번호 입력</Label>
            <InputCenter
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />

            <Label htmlFor="reason">탈퇴 사유</Label>
            <Select id="reason" value={reason} onChange={handleReasonChange}>
              <option value="">-- 탈퇴 사유 선택 --</option>
              <option value="reason1">이유 1</option>
              <option value="reason2">이유 2</option>
              <option value="reason3">이유 3</option>
            </Select>
            <Center>
              <ConfirmButton onClick={handleSubmit4}>확인</ConfirmButton>
              <CancleButton onClick={handleCancel}>취소</CancleButton>
            </Center>
          </Wrapper>
        )}
      </Container>
    </>
  );
}

export default MyPage;
