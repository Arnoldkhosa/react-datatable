import React, { useEffect } from 'react';
const FrontendPagination = ({ currentPage, handlePageChange, data, rowsPerPage }) => {

  const pageButtons = [];
  for (let i = 1; i <= Math.ceil(data.length / rowsPerPage); i++) {
      pageButtons.push(
          <li key={i} class="page-item" onClick={() => handlePageChange(i)}><a class={`page-link ${currentPage === i ? "active" : ""}`} >  {i}</a></li>
      );
  }
  return (<>
      <ul class="pagination pagination-sm m-0 ">

          <li class="page-item" onClick={() => currentPage > 1 ? handlePageChange(currentPage - 1) : null} disabled={currentPage === 1}><a class="page-link"  >Previous</a></li>

          {pageButtons}

          <li class="page-item" onClick={() => handlePageChange(Math.ceil(data.length / rowsPerPage)===currentPage?currentPage:currentPage + 1)} disabled={currentPage === pageButtons.length}><a class="page-link"  >Next</a></li>

      </ul>
      <div class="ms-3 d-flex align-items-center pageOftotal">Page {currentPage} of {Math.ceil(data.length / rowsPerPage)}</div>
  </>)
}
export default FrontendPagination;