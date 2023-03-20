import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { AiFillStar } from "react-icons/ai";
import { AiOutlineRollback } from "react-icons/ai";
import img from "../assets/img.jpg";

function Sidebar() {
  const [categories, setCategories] = useState([
    { id: 1, name: "한식", color: "#f94144" },
    { id: 2, name: "일식", color: "#f3722c" },
    { id: 3, name: "중식", color: "#f8961e" },
    { id: 4, name: "양식", color: "#f9c74f" },
  ]);

  const [stores, setStores] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const Sidebar = styled.div`
    width: 350px;
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
    display: inline-block;
    box-shadow: 5px 5px 1px 1px rgba(0, 0, 0, 0.1);
    border-radius: 15px;
    padding: 20px 35px;
    margin: 15px;
    font-size: 1.2rem;
    text-align: center;
    vertical-align: middle;
    color: black;
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
      margin: 10px 15px;
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
        categories.map(category => (
          <Cate
            key={category.id}
            onClick={() => handleCategoryClick(category.name)}
            bgColor={category.color}>
            {category.name}
          </Cate>
        ))
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
