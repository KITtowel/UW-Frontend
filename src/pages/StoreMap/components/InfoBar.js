import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Logo2 from "../../../assets/logo2.png";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  height: 100vh;
  min-width: 80px;
  background-color: white;
  z-index: 5;
`;

const Logo = styled.button`
    background-image: url(${Logo2});
    background-size: contain;
    background-position: center;
    width: 60px;
    height: 60px;
    border: none;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    transition: box-shadow 0.3s;
    cursor: pointer;
    margin-top: 10px;
`;

const Icon = styled.button`
  background-color: white;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  width: 60px;
  height: 60px;
  border: 1px solid black;
`

function InfoBar(props) {
  return (
    <Container>
      <Link to='/'>
        <Logo />
      </Link>
      <Icon />
      <Icon />
    </Container>
  );
}

export default InfoBar;