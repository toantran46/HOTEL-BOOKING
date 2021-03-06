import React from "react";
import "./pagination.scss";

function Pagination({ page, limit, totalRows, onChange }) {
  const [currentPage, setCurrentPage] = React.useState(page);

  const numberItem =
    Math.ceil(totalRows / limit) > 4 ? 4 : Math.ceil(totalRows / limit);
  const listItem = [];

  for (let i = 0; i < numberItem; i++) {
    listItem[i] = i;
  }

  const handleChangePage = page => {
    if (!onChange) return;
    onChange(page);
  }

  const handleNext = () => {
    setCurrentPage(prev => prev + 1)
  }


  return (
    <div className="pagination">
      <div className="pagination__previous">
        <i className="fa-solid fa-angles-left"></i>
      </div>
      <div className="pagination__previous">
        <i class="fa-solid fa-angle-left"></i>
      </div>

      <ul className="pagination__list">
        {listItem.map((item) => (
          <li key={item} className="pagination__item" onClick={() => handleChangePage(item + 1)}>
            {item + 1}
          </li>
        ))}
      </ul>

      <div className="pagination__next">
        <i class="fa-solid fa-angle-right"></i>
      </div>
      <div className="pagination__next">
        <i className="fa-solid fa-angles-right"></i>
      </div>
    </div>
  );
}

export default Pagination;
