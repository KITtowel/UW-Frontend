import React from 'react';
import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 10px;
`;

const Button = styled.button`
  border: none;
  border-radius: 8px;
  padding: 8px;
  margin: 0;
  color: #24A1E8;
  font-size: 1rem;

  &:hover:not([disabled]) {
    background: #24A1E8;
    color: white;
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] {
    cursor: not-allowed;
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

  return (
    <>
      <Nav>
        <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
          &lt;
        </Button>
        {Array(numPages)
          .fill()
          .map((_, i) => (
            <Button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              aria-current={page === i + 1 ? "page" : null}
            >
              {i + 1}
            </Button>
          ))}
        <Button onClick={() => setPage(page + 1)} disabled={page === numPages}>
          &gt;
        </Button>
      </Nav>
    </>
  );
}

export default Pagination;