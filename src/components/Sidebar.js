import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { AiFillStar } from "react-icons/ai";
import { AiOutlineRollback } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";

import img from "../assets/img.jpg";

function Sidebar() {
  const [categories, setCategories] = useState([
    { id: 1, name: "한식", color: "#e6b29d" },
    { id: 2, name: "양식", color: "#a1e69d" },
    { id: 3, name: "일식", color: "#e6e69d" },
    { id: 4, name: "중식", color: "#9dc3e6" },
    { id: 5, name: "분식", color: "#9d9de6" },
    { id: 6, name: "도시락", color: "#e69de0" },
    { id: 7, name: "고기", color: "#a99de6" },
    { id: 8, name: "아시안", color: "#e69d9d" },
    { id: 9, name: "치킨", color: "#9de6ba" },
    { id: 10, name: "햄버거", color: "#e6be9d" },
    { id: 11, name: "피자", color: "#a4e69d" },
    { id: 12, name: "찜/탕", color: "#9d9de6" },
  ]);

  const [stores, setStores] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const Sidebar = styled.div`
    width: 380px;
    height: 100vh;
    overflow: auto;
    box-shadow: 3px 3px 1px 1px #ccc1cd;
    padding: 10px;
    text-align: center;
  `;
  const Cate = styled.div`
    :hover {
      box-shadow: 5px 5px 1px 1px rgba(0, 0, 0, 0.3);
    }
    box-shadow: 5px 5px 1px 1px rgba(0, 0, 0, 0.1);
    display: inline-block;
    border-radius: 15px;
    width: 80px;
    height: 60px;
    padding: 20px 0;
    margin: 15px;
    font-size: 1.2rem;
    text-align: center;
    vertical-align: middle;
    color: white;
    transition: box-shadow 0.3s, cursor 0.3s;
    cursor: pointer;
    background-color: ${props => props.bgColor};
  `;

  const StoreList = styled.ul`
    margin-top: 20px;
    list-style: none;
    padding: 0;
    text-align: left;
  `;
  const SearchBox = styled.div`
    position: relative;
    margin: 15px 30px;
  `;

  const SearchInput = styled.input`
    ::placeholder {
      color: white;
    }
    :focus {
      outline: none;
    }
    :hover {
      box-shadow: 5px 5px 1px 1px rgba(0, 0, 0, 0.3);
    }
    border: none;
    box-shadow: 5px 5px 1px 1px rgba(0, 0, 0, 0.1);
    width: 100%;
    padding: 20px 40px 20px 15px;
    font-size: 1rem;
    border-radius: 5px;
    box-sizing: border-box;
    background: #9dc3e6;
    color: white;
  `;

  const SearchIcon = styled(AiOutlineSearch)`
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    font-size: 1.5rem;
    color: white;
  `;

  const StoreItem = styled.li`
    :hover {
      transition: 0.5s;
      background: #eee;
    }

    width: 100%;
    display: inline-block;
    align-items: center;
    font-size: 1.1rem;
    padding: 15px 0;
    cursor: pointer;
    border-bottom: 3px double #9dc3e6;

    div {
      margin: 15px 0 5px 0;
      font-weight: 900;
    }

    i {
      margin-right: 3px;
      vertical-align: middle;
      color: #dfd880;
    }

    img {
      float: left;
      width: 50px;
      height: 50px;
      background-color: #9dc3e6;
      border-radius: 5px;
      margin: 10px 25px;
    }
  `;

  const BackButton = styled.button`
    margin-top: 15px;
  `;

  const storeData = [
    {
      id: 1,
      name: "가게1",
      category: "한식",
      imageUrl: img,
      rating: 4.5,
    },
    {
      id: 2,
      name: "가게2",
      category: "일식",
      imageUrl: img,
      rating: 4.0,
    },
    {
      id: 3,
      name: "가게3",
      category: "중식",
      imageUrl: img,
      rating: 3.5,
    },
    {
      id: 4,
      name: "가게4",
      category: "양식",
      imageUrl: img,
      rating: 4.2,
    },
    {
      id: 5,
      name: "가게5",
      category: "한식",
      imageUrl: img,
      rating: 4.8,
    },
    {
      id: 6,
      name: "가게6",
      category: "일식",
      imageUrl: img,
      rating: 3.9,
    },
    {
      id: 7,
      name: "가게7",
      category: "중식",
      imageUrl: img,
      rating: 4.1,
    },
    {
      id: 8,
      name: "가게8",
      category: "양식",
      imageUrl: img,
      rating: 4.3,
    },
  ];

  const handleCategoryClick = category => {
    setSelectedCategory(category);
  };

  const handleBackClick = () => {
    setSelectedCategory(null);
  };

  useEffect(() => {
    if (selectedCategory) {
      const data = storeData.filter(
        store => store.category === selectedCategory
      );
      setStores(data);
    } else {
      setStores([]);
    }
  }, [selectedCategory]);

  return (
    <Sidebar>
      {!selectedCategory ? (
        <>
          <SearchBox>
            <SearchInput type="text" placeholder="검색어를 입력해주세요" />
            <SearchIcon />
          </SearchBox>
          {categories.map(category => (
            <Cate
              key={category.id}
              onClick={() => handleCategoryClick(category.name)}
              bgColor={category.color}>
              {category.name}
            </Cate>
          ))}
        </>
      ) : (
        <>
          <BackButton onClick={handleBackClick}>
            <AiOutlineRollback />
          </BackButton>
          {stores.length > 0 && (
            <StoreList>
              {stores.map(store => (
                <StoreItem key={store.id}>
                  <img src={store.imageUrl} alt={store.name} />
                  <div>{store.name}</div>
                  <i>
                    <AiFillStar />
                  </i>
                  {store.rating}
                </StoreItem>
              ))}
            </StoreList>
          )}
        </>
      )}
    </Sidebar>
  );
}

export default Sidebar;
