import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Logo2 from "../assets/logo2.png";

function LogoBtn() {
  const LogoDiv = styled.button`
    background-image: url(${Logo2});
    background-size: contain;
    background-position: center;
    width: 50px;
    height: 50px;
    border: none;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    transition: box-shadow 0.3s;
    cursor: pointer;
    position: fixed;
    top: 30px;
    left: 30px;
    color: white;
    font-size: 25px;
    padding: 13px;
  `;

  return (
    <>
      <Link to="/">
        <LogoDiv></LogoDiv>
      </Link>
    </>
  );
}

export default LogoBtn;
