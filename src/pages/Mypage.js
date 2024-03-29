import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Select from "../components/Select";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Logo2 from "../assets/logo2.png";
import DefaultProfilePicture from "../assets/profile.png";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';
import { MdRateReview, MdLocationOn } from "react-icons/md";
import { BsFillPersonFill } from "react-icons/bs";
import { Pagination } from "../components";
import apiClient from "../api";

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

const Center = styled.div`
  text-align: center;
`;

const Header = styled.div`
  z-index: 1;
  position: fixed;
  top: 0;
  left: 10%;
  width: 80vw;
  height: 80px;
  background: #fff;
  border-bottom: 1px solid #969696;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    left: 0;
    width: 100%;
    padding: 0 20px;
  }
`;

const LogoIcon = styled.img`
  width: 50px;
  margin: 15px 100%;

  @media (max-width: 768px) {
    width: 30px;
    margin: 15px 10px;
  }
`;

const NavButton = styled.button`
  background: transparent;
  color: ${props => (props.selected ? "#24A1E8" : "#000000")};
  border: none;
  text-decoration: ${props => (props.selected ? "underline" : "none")};
  cursor: pointer;
  font-size: 1rem;
  margin: 30px 6% 30px 2%;
  vertical-align: top;

  @media (max-width: 768px) {
    margin: 30px 1%;
  }
`;

const DisableButton = styled.button`
  display: inline-block;
  margin: 5px;
  padding: 6px 30px;
  color: #c7dff8;
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
    cursor: not-allowed;
  }
`;

const AbleButton = styled.button`
  display: inline-block;
  margin: 30px 5px;
  padding: 6px 30px;
  color: #24A1E8;
  font-weight: 600;
  text-transform: uppercase;
  background: #fff;
  border: 1px solid #24A1E8;
  border-radius: 5px;
  outline: 0;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-out;

  :hover {
    background: #24A1E8;
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

  @media (max-width: 768px) {
    margin: 20px 15px;
  }
`;

const Container = styled.div`
  text-align: left;
  width: 80vw;
  margin: 80px auto;
  border-bottom: 1px solid #969696;
  background: #ffffff;

  @media (max-width: 768px) {
    width: 100%;
    margin: 80px auto;
  }
`;

const Wrapper = styled.div`
  padding: 50px;
  text-align: center;

  @media (max-width: 768px) {
    padding: 30px;
  }
`;

const ProfilePicture = styled.img`
  margin: 10px 55px;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;

  @media (max-width: 768px) {
    margin: 10px 40px;
  }
`;

const Textarea = styled.textarea`
  resize: none;
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

  @media (max-width: 768px) {
    width: 100%;
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

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const InputCenter = styled.input`
  display: block;
  width: 220px;
  padding: 11px 13px;
  background: #f9f9fa;
  color: #9dc3e6;
  margin: 5px auto 25px auto;
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

  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 25px;
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
  padding: 10px;
  border-right: 1px solid #ddd;
  background: #eef4f7;
  vertical-align: middle;
  font-size: 13px;
  width: 30%;
  text-align: center;
`;

const TableCell = styled.td`
  padding: 10px;
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
  min-width: 400px;
  max-width: 700px;
  margin: auto;
  border-bottom: 1px solid #d9d9d9;
  line-height: 2;

  * {
    vertical-align: middle;
  }
`;

const Star = styled(FaStar)`
  color: ${props => (props.active ? "#24A1E8" : "#ccc")};
  cursor: pointer;
`;

const PcOnly = styled.span`
  display: inline;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileOnly = styled.span`
  display: none;

  @media (max-width: 768px) {
    display: inline;
  }
`;

const LikedStoresContainer = styled.div`
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const ReviewStoresContainer = styled.div`
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const LikedStoreItem = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const ReviewStoreItem = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const StoreTitle = styled.h2`
  margin-right: 1rem;
  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 3px;
  }
`;

const StoreCategory = styled.h3`
  margin-right: 1rem;
  color: #666;
  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 3px;
  }
`;

const ThumbUpIcon = styled(AiFillLike)`
  /* color: ${({ liked }) => (liked ? "#000" : "#24A1E8")}; */
  color: #24A1E8;
  position: absolute;
  right: 30%;
  cursor: pointer;
  @media (max-width: 768px) {
    position: relative;
    right: 0;
    margin-top: 5px;
  }
`;

const EditIcons = styled.div`
  position: absolute;
  right: 30%;
  cursor: pointer;
  @media (max-width: 768px) {
    position: relative;
    right: 0;
    margin: 0 0 10px 0;
  }
`;

const Rating = styled.p`
  color: #666;
  display: flex;
  align-items: center;
  font-size: 14px;
  @media (max-width: 768px) {
    margin-bottom: 0.5rem;
  }
`;

const StarIcon = styled(FaStar)`
  color: #24A1E8;
  margin-right: 0.6rem;
`;

const LocationContainer = styled.div`
  display: flex;
  align-items: center;
  color: #666;
  @media (max-width: 768px) {
    flex-direction: row;
    align-items: center;
    margin-top: 0.5rem;
  }
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
`;

const ModalContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 550px;
  max-width: 85vw;
  text-align: center;

  @media (max-width: 768px) {
    width: 90vw;
    padding: 10px;
  }
`;

const DateText = styled.p`
  color: #666;
  font-size: 14px;
`

const LocationText = styled.p`
  margin-left: 0.5rem;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const StoreList = styled.div`
  text-align: center;
  padding: 2.5rem;
`;

const EditIcon = styled(FiEdit)`
  margin-right: 0.5rem;
  cursor: pointer;
  color: #aeaeae;
  :hover {
    color: #24A1E8;
  }
`;

const DeleteIcon = styled(FiTrash2)`
  cursor: pointer;
  color: #aeaeae;
  :hover {
    color: #ef877d;
  }
`;

function MyPage() {
  const storedUserId = localStorage.getItem("userId");
  const storedToken = localStorage.getItem("token");
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("location") !== null) {
      navigate("/mypages");
    }
    if (isAuthenticated !== true) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const [isChanged, setIsChanged] = useState(false);

  const handleCancel = () => {
    navigate(-1);
  };

  function ImageComponent({imageUrl}) {
    // const imageUrl = "http://13.209.7.234:8000/media/profile/logo2.b3c9259ee43360d3d14a_cTtKZDf.png";
    const httpsUrl = imageUrl ? `https://images.weserv.nl/?url=${encodeURIComponent(imageUrl.slice(imageUrl.indexOf('//') + 2))}` : null;
  
    return <ProfilePicture src={httpsUrl} />;
  }

  // 탭
  const [activeTab, setActiveTab] = useState("myinfo");

  const handleTabClick = tab => {
    resetInputFields();
    if (tab !== "myinfo") {
      setImage(null);
    }
    setActiveTab(tab);

    if (tab === "likes") {
      fetchLikedStores();
    }
  };

  const resetInputFields = () => {
    setOldPassword("");
    setNewPassword("");
    setNewPasswordConfirm("");
    setProfilePicture(userData.image || DefaultProfilePicture);
    setSelectedProvince("");
    setIsChanged(false);
    setPassword("");
    setReason("");
    setShowOtherInput(false);
    setNickname("");
  };

  // 내 정보
  const [userData, setUserData] = useState({});
  const [isImageChanged, setIsImageChanged] = useState(false);
  const [profilePicture, setProfilePicture] = useState(DefaultProfilePicture);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [nickname, setNickname] = useState("");
  const [location, setLocation] = useState("");
  const [location2, setLocation2] = useState("");
  const [image, setImage] = useState(null);

  const getProfileData = async () => {
    try {
      const response = await apiClient.get(
        `/users/profile/${storedUserId}/`
      );
      setUserData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCityChange = e => {
    setSelectedCity(e.target.value);
  };

  const handleProvinceChange = e => {
    setSelectedProvince(e.target.value);
    setSelectedCity("");
  };

  const handleImageChange = e => {
    setImage(e.target.files[0]);
    setIsImageChanged(true);
  };

  const handleNicknameChange = e => {
    setNickname(e.target.value);
    if (!location) {
      setLocation(userData.location);
      setSelectedProvince(userData.location);
      setLocation2(userData.location2);
    }
  };
  
  const handleLocationChange = e => {
    setLocation(e.target.value);
    setSelectedProvince(e.target.value);
    localStorage.setItem("location", "거주지_변경");
  };  

  const handleLocation2Change = e => {
    setLocation2(e.target.value);
  };

  const handleSubmit1 = async () => {
    try {
      if (!nickname && !location && !location2 && !isImageChanged) {
        return;
      }
  
      const formData = new FormData();
      if (nickname) {
        formData.append("nickname", nickname);
      }
      if (location) {
        formData.append("location", location);
      }
      if (location2) {
        formData.append("location2", location2);
      }
      if (isImageChanged) {
        formData.append("image", image);
      }
  
      await apiClient.put(
        `/users/profile/${storedUserId}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token ${storedToken}`,
          },
        }
      );
  
      getProfileData();
      alert("내 정보가 변경되었습니다.");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  

  useEffect(() => {
    getProfileData();
  }, []);

  // 좋아요
  const [likePage, setLikePage] = useState(1);
  const [likedStores, setLikedStores] = useState({ results: [] });

  const fetchLikedStores = async () => {
    try {
      const response = await apiClient.post(
        `/stores/liked_list/?page=${likePage}`,
        null,
        {
          headers: {
            Authorization: `Token ${storedToken}`,
          },
        }
      );
      setLikedStores(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLikedStores();
  }, [likePage, storedToken]);

  const handleLike = async (id, isLiked) => {
    try {
      const newData = likedStores.results.map(item => {
        if (item.store_id === id) {
          return {
            ...item,
            liked: isLiked,
          };
        }
        return item;
      });

      setLikedStores(prevState => ({
        ...prevState,
        results: newData,
      }));

      const response = await apiClient.post(
        `/stores/like/${id}/`,
        null,
        {
          headers: {
            Authorization: `Token ${storedToken}`,
          },
        }
      );
      alert(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  // 후기
  const [reviews, setReviews] = useState([]);
  const [reviewPage, setReviewPage] = useState(1);
  const [reviewsCount, setReviewsCount] = useState(0);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState(null);
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);

  const handleEditModal = id => {
    const selectedReview = reviews.find(review => review.id === id);
    if (selectedReview) {
      setContent(selectedReview.content);
      setRating(selectedReview.rating);
    }
    setSelectedReviewId(id);
    setShowEditModal(true);
  };

  const handleClose = () => {
    setShowEditModal(false);
  };

  const handleContentChange = e => {
    setContent(e.target.value);
  };

  const handleRatingChange = value => {
    setRating(value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: `Token ${storedToken}`,
        },
      };
      const body = {};
      if (content !== "") {
        body.content = content;
      }
      if (rating !== 0) {
        body.rating = rating;
      }
      const response = await apiClient.put(
        `/stores/reviews/${selectedReviewId}/`,
        body,
        config
      );
      alert(response.data.message);
      getReviews();
      setShowEditModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const getReviews = async () => {
    try {
      const response = await apiClient.post(
        `/stores/reviewed_list/?page=${reviewPage}`,
        {},
        {
          headers: {
            Authorization: `Token ${storedToken}`,
          },
        }
      );
      setReviews(response.data.results);
      setReviewsCount(response.data.count);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async reviewId => {
    try {
      const response = await apiClient.delete(
        `/stores/reviews/${reviewId}/`,
        {
          headers: {
            Authorization: `Token ${storedToken}`,
          },
        }
      );
      alert("후기글이 삭제되었습니다.");
      getReviews();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getReviews();
  }, [storedToken, reviewPage]);

  // 비밀번호 변경
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

  const handleOldPasswordChange = e => {
    setOldPassword(e.target.value);
  };

  const handleNewPasswordChange = e => {
    setNewPassword(e.target.value);
  };

  const handleNewPasswordConfirmChange = e => {
    setNewPasswordConfirm(e.target.value);
  };

  const handleSubmit2 = async () => {
    try {
      const response = await apiClient.post(
        `/users/password_change/`,
        {
          old_password: oldPassword,
          new_password: newPassword,
          new_password_confirm: newPasswordConfirm,
        },
        {
          headers: {
            Authorization: `Token ${storedToken}`,
          },
        }
      );

      alert("비밀번호가 성공적으로 변경되었습니다.");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("서버와 통신 중 문제가 발생했습니다. 다시 시도해주세요.");
    }
  };

  // 회원 탈퇴
  const [password, setPassword] = useState("");
  const [reason, setReason] = useState("");
  const [showOtherInput, setShowOtherInput] = useState(false);

  const handleSubmit3 = async () => {
    try {
      await apiClient.delete(
        `/users/profile/${storedUserId}/`,
        {
          data: { reason },
        }
      );
      alert("회원 탈퇴가 완료되었습니다.");
      navigate("/");
      logout();
    } catch (error) {
      alert(error);
    }
  };

  const handleReasonChange = e => {
    setReason(e.target.value);
    if (e.target.value === "other") {
      setShowOtherInput(true);
    } else {
      setShowOtherInput(false);
    }
  };

  useEffect(() => {
    let hasChanges = false;
    if (
      (nickname && userData.nickname !== nickname) ||
      (location && userData.location !== location) ||
      (location2 && userData.location2 !== location2) ||
      isImageChanged
    ) {
      hasChanges = true;
    }
    if (
      oldPassword.length > 0 &&
      newPassword.length > 0 &&
      newPasswordConfirm.length > 0
    ) {
      hasChanges = true;
    }
    if (reason !== "") {
      hasChanges = true;
    }
    setIsChanged(hasChanges);
  }, [
    userData,
    nickname,
    location,
    location2,
    isImageChanged,
    oldPassword,
    newPassword,
    newPasswordConfirm,
    password,
    reason,
  ]);

  return (
    <>
      <Header>
        <NavButton>
          <Link to="/">
            <LogoIcon src={Logo2} />
          </Link>
        </NavButton>
        <NavButton
          selected={activeTab === "myinfo"}
          onClick={() => handleTabClick("myinfo", resetInputFields)}>
          <PcOnly>내 정보</PcOnly>
          <MobileOnly>
            <BsFillPersonFill />
          </MobileOnly>
        </NavButton>
        <NavButton
          selected={activeTab === "likes"}
          onClick={() => handleTabClick("likes", resetInputFields)}>
          <PcOnly>좋아요 목록</PcOnly>
          <MobileOnly>
            <AiFillLike />
          </MobileOnly>
        </NavButton>
        <NavButton
          selected={activeTab === "reviews"}
          onClick={() => handleTabClick("reviews", resetInputFields)}>
          <PcOnly>후기 목록</PcOnly>
          <MobileOnly>
            <MdRateReview />
          </MobileOnly>
        </NavButton>
        <NavButton
          selected={activeTab === "changepw"}
          onClick={() => handleTabClick("changepw", resetInputFields)}>
          <PcOnly>비밀번호 변경</PcOnly>
          <MobileOnly>
            <RiLockPasswordFill />
          </MobileOnly>
        </NavButton>
        <NavButton
          selected={activeTab === "withdrawal"}
          onClick={() => handleTabClick("withdrawal", resetInputFields)}>
          <PcOnly>회원 탈퇴</PcOnly>
          <MobileOnly>
            <FiTrash2 />
          </MobileOnly>
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
                    {/* <ProfilePicture
                      src={
                        image
                          ? URL.createObjectURL(image)
                          : userData.image || profilePicture
                      }
                    /> */}
                    {/* {console.log(userData)} */}
                    {userData && <ImageComponent imageUrl={userData.image}/>}
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
                      onChange={handleNicknameChange}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHeader>현재 거주 지역</TableHeader>
                  <TableCell>
                    <Select
                      id="province"
                      value={location || userData.location}
                      onChange={handleLocationChange}>
                      <option value="">시/도 선택</option>
                      {Object.keys(cityOptions).map(province => (
                        <option key={province} value={province}>
                          {province}
                        </option>
                      ))}
                    </Select>
                    <Select
                      id="city"
                      value={location2 || userData.location2}
                      onChange={handleLocation2Change}
                      disabled={!selectedProvince}>
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
              {isChanged ? (
                <>
                  <AbleButton onClick={handleSubmit1}>확인</AbleButton>
                  <AbleButton onClick={handleCancel}>취소</AbleButton>
                </>
              ) : (
                <>
                  <DisableButton disabled>확인</DisableButton>
                  <AbleButton onClick={handleCancel}>취소</AbleButton>
                </>
              )}
            </Center>
          </div>
        )}
        {activeTab === "likes" && (
          <LikedStoresContainer>
            {likedStores.count > 0 ? (
              likedStores.results.map(item => (
                <List key={item.store_id}>
                  <LikedStoreItem>
                    <StoreTitle>{item.store_name}</StoreTitle>
                    <StoreCategory>{item.category}</StoreCategory>
                    {item.liked ? (
                      <ThumbUpIcon
                        as={AiOutlineLike}
                        liked={true}
                        onClick={() => handleLike(item.store_id, false)}
                      />
                    ) : (
                      <ThumbUpIcon
                        as={AiFillLike}
                        liked={false}
                        onClick={() => handleLike(item.store_id, true)}
                      />
                    )}
                  </LikedStoreItem>
                  <Rating>
                    <StarIcon />
                    {Number.parseFloat(item.rating_mean).toFixed(1)} / 5
                  </Rating>
                  <LocationContainer>
                    <MdLocationOn style={{color: '#ef877d'}}/>
                    <LocationText>{item.store_address}</LocationText>
                  </LocationContainer>
                </List>
              ))
            ) : (
              <StoreList>
                <p>좋아요한 가게가 없습니다.</p>
              </StoreList>
            )}
            <div style={{maxWidth : '400px', paddingBottom: '10px', margin: 'auto'}}>
              {likedStores.count > 0 && (
                <Pagination
                  total={likedStores.count}
                  limit={20}
                  page={likePage}
                  setPage={setLikePage}
                />
              )}
            </div>
          </LikedStoresContainer>
        )}
        {activeTab === "reviews" && (
          <ReviewStoresContainer>
            {reviews && reviews.length > 0 ? (
              reviews.map(review => (
                <List key={review.id}>
                  <ReviewStoreItem>
                    <StoreTitle>{review.store_name}</StoreTitle>
                    <StoreCategory>{review.category}</StoreCategory>
                    <EditIcons>
                      <EditIcon onClick={() => handleEditModal(review.id)} />
                      <DeleteIcon onClick={() => handleDelete(review.id)} />
                    </EditIcons>
                      <Rating>
                        {[...Array(5)].map((_, index) => (
                          <Star
                            key={index}
                            size={16}
                            active={index < review.rating}
                          />
                        ))}
                      </Rating>
                  </ReviewStoreItem>
                  <LocationContainer>
                    <MdLocationOn style={{color: '#ef877d'}}/>
                    <LocationText>{review.store_address}</LocationText>
                  </LocationContainer>
                  <DateText>등록일: {new Date(review.published_data).toLocaleDateString()} / 마지막 수정일: {new Date(review.modified_date).toLocaleDateString()}</DateText>
                    <div>
                      <p>{review.content}</p>
                    </div>
                </List>
              ))
            ) : (
              <StoreList>
                <p>후기가 없습니다.</p>
              </StoreList>
            )}
            <div style={{maxWidth : '400px', paddingBottom: '10px', margin: 'auto'}}>
              {reviews.length > 0 && (
                <Pagination
                  total={reviewsCount}
                  limit={20}
                  page={reviewPage}
                  setPage={() => {}}
                />
              )}
            </div>
            {showEditModal && (
              <ModalBackground>
                <ModalContainer>
                  <div style={{ margin: '20px' }}>
                    {[...Array(5)].map((_, index) => {
                      const ratingValue = index + 1;
                      return (
                        <Star
                          key={ratingValue}
                          active={ratingValue <= rating}
                          onChange={handleRatingChange}
                          onClick={() => setRating(ratingValue)}
                        />
                      );
                    })}
                  </div>
                  <Textarea
                    value={content}
                    onChange={handleContentChange}
                    style={{
                      width: 'calc(100% - 6px)',
                      height: '150px',
                    }}
                  />
                  <AbleButton type="submit" onClick={handleSubmit}>
                    확인
                  </AbleButton>
                  <AbleButton onClick={handleClose}>취소</AbleButton>
                </ModalContainer>
              </ModalBackground>
            )}
          </ReviewStoresContainer>
        )}

        {activeTab === "changepw" && (
          <Wrapper>
            <InputCenter
              type="password"
              placeholder="현재 비밀번호"
              value={oldPassword}
              onChange={handleOldPasswordChange}
            />
            <InputCenter
              type="password"
              placeholder="변경 비밀번호"
              value={newPassword}
              onChange={handleNewPasswordChange}
            />
            <InputCenter
              type="password"
              placeholder="변경 비밀번호 재입력"
              value={newPasswordConfirm}
              onChange={handleNewPasswordConfirmChange}
            />
            <Center>
              {isChanged ? (
                <>
                  <AbleButton onClick={handleSubmit2}>확인</AbleButton>
                  <AbleButton onClick={handleCancel}>취소</AbleButton>
                </>
              ) : (
                <>
                  <DisableButton disabled>확인</DisableButton>
                  <AbleButton onClick={handleCancel}>취소</AbleButton>
                </>
              )}
            </Center>
          </Wrapper>
        )}
        {activeTab === "withdrawal" && (
          <Wrapper>
            <Label htmlFor="reason">탈퇴 사유</Label>
            <Select id="reason" value={reason} onChange={handleReasonChange}>
              <option value="">-- 탈퇴 사유 선택 --</option>
              <option value="서비스를 더 이상 사용하지 않음">
                서비스를 더 이상 사용하지 않음
              </option>
              <option value="개인정보 관련 우려">개인정보 관련 우려</option>
              <option value="사용하기 어려움">사용하기 어려움</option>
              <option value="다른 서비스로 이동">다른 서비스로 이동</option>
              <option value="기술적 문제">기술적 문제</option>
              <option value="other">기타 (직접 입력)</option>
            </Select>
            {showOtherInput && (
              <>
                <Label htmlFor="otherReason">기타 사유 입력</Label>
                <InputCenter
                  type="text"
                  id="otherReason"
                  placeholder="탈퇴 사유를 직접 입력해주세요."
                />
              </>
            )}
            <Center>
              {isChanged ? (
                <>
                  <AbleButton onClick={handleSubmit3}>확인</AbleButton>
                  <AbleButton onClick={handleCancel}>취소</AbleButton>
                </>
              ) : (
                <>
                  <DisableButton disabled>확인</DisableButton>
                  <AbleButton onClick={handleCancel}>취소</AbleButton>
                </>
              )}
            </Center>
          </Wrapper>
        )}
      </Container>
    </>
  );
}

export default MyPage;
