import React from "react";
import styled from '../styles/Home.module.css';

const MAX_ITEMS = 200; // máximo de botões de paginação
const MAX_LEFT = (MAX_ITEMS - 1) / 2;

const Pagination = ({ limit, total, offset, setOffset }) => {
  const current = offset ? offset / limit + 1 : 1;
  const pages = Math.ceil(total / limit);
  const maxFirst = Math.max(pages - (MAX_ITEMS - 1), 1);
  const first = Math.min(Math.max(current - MAX_LEFT, 1), maxFirst);

  function onPageChange(page) {
    setOffset((page - 1) * limit);
  }

  return (
    <ul className={styled.pagination}>
      <li>
        <button
          onClick={() => onPageChange(current - 1)}
          disabled={current <= 1}
        >
          Previous
        </button>
      </li>
      {Array.from({ length: Math.min(MAX_ITEMS, pages) }).map((_, index) => {
        const page = index + first;
        return (
          <li key={page}>
            <button
              onClick={() => onPageChange(page)}
              className={page === current ? styled.paginationItemActive : null}
            >
              {page}
            </button>
          </li>
        );
      })}
      <li>
        <button
          onClick={() => onPageChange(current + 1)}
          disabled={current >= pages}
        >
          Next
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
