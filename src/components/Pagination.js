import React from 'react';
import styled from 'styled-components';
import { BiFirstPage, BiLastPage, BiChevronLeft, BiChevronRight } from 'react-icons/bi'

const Nav = styled.nav`
  display: flex;
  justify-content: space-around;
  margin-top: 7px;
  width: 265px;
`;

const Button = styled.button`
  background-color: white;
  border: none;
  border-radius: 8px;
  color: #24A1E8;
  font-size: 20px;

  &:hover:not([disabled]) {
    background: #24A1E8;
    color: white;
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] {
    cursor: not-allowed;
    color: #929292;
  }

  &[aria-current] {
    background: #24A1E8;
    color: white;
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`;

function Pagination({ total, limit, page, setPage }) {
  const numPages = Math.ceil(total / limit);
  let pageGroup = Math.ceil(page / 5);
  let lastPage = pageGroup * 5;
  if (lastPage > numPages) lastPage = numPages;
  let startPage = (pageGroup - 1) * 5 + 1;
  let pageList = [];

  for (let i = startPage; i <= lastPage; i++) {
    pageList.push(i);
  }

  return (
    <>
      <Nav>
        <Button onClick={() => setPage(1)} disabled={page === 1}>
          <BiFirstPage style={{paddingTop: '3px'}}/>
        </Button>
        <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
          <BiChevronLeft style={{paddingTop: '3px'}}/>
        </Button>
        {/* {Array(numPages)
          .fill()
          .map((_, i) => (
            numPages >= 7 && ![page-1, page, page+1].includes(i+1) ?
            <div>.</div> : 
            <Button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              aria-current={page === i + 1 ? "page" : null}
            >
              {i + 1}
            </Button>
          ))} */}
          {pageList
          .map((num, i) => (
            <Button
              key={i + 1}
              onClick={() => setPage(num)}
              aria-current={page === num ? "page" : null}
            >
              {num}
            </Button>
          ))}
        <Button onClick={() => setPage(page + 1)} disabled={page === numPages}>
          <BiChevronRight style={{paddingTop: '3px'}}/>
        </Button>
        <Button onClick={() => setPage(numPages)} disabled={page === numPages}>
          <BiLastPage style={{paddingTop: '3px'}}/>
        </Button>
      </Nav>
    </>
  );
}

export default Pagination;