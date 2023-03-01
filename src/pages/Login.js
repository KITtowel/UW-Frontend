import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
// import axios from 'axios';

let Container = styled.div`
text-align: center;

`
const Button = styled.button`
    max-width: 100%;
    padding: 11px 13px;
    color: rgb(253, 249, 243);
    font-weight: 600;
    text-transform: uppercase;
    background: #9DC3E6;
    border: none;
    border-radius: 3px;
    outline: 0;
    cursor: pointer;
    margin-top: 0.6rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease-out;
    :hover {
        background: #2E75B6;
    }
`;
const Input = styled.input`
    max-width: 100%;
    padding: 11px 13px;
    background: #f9f9fa;
    color: #9DC3E6;
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

function Login() {
    const [inputId, setInputId] = useState('')
    const [inputPw, setInputPw] = useState('')
 
    const handleInputId = (e) => {
        setInputId(e.target.value)
    }
 
    const handleInputPw = (e) => {
        setInputPw(e.target.value)
    }
 
    const onClickLogin = () => {
        console.log('로그인 버튼 클릭!')
    }
 
    // useEffect(() => {
    //     axios.get('/')
    //     .then(res => console.log(res))
    //     .catch()
    // },
    // [])
 
    return(
        <>
            <Container>
                <h2>Login</h2>
                <div>
                    <Input type='text' placeholder='아이디' name='input_id' value={inputId} onChange={handleInputId} />
                </div>
                <div>
                    <Input type='password' placeholder='비밀번호' name='input_pw' value={inputPw} onChange={handleInputPw} />
                </div>
                <div>
                    <Button type='button' onClick={onClickLogin}>로그인</Button>
            </div>
            </Container>
        </>
    )
}
 
export default Login;