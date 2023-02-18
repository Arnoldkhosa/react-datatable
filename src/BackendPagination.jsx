import React from 'react'
const BackendPagination = ({totalPages,handlePageChange,currentPage,setState,state}) => {
  const pageButtons = [];
  for (let i = 1; i <= totalPages; i++) {
      pageButtons.push(
          <li key={i} class="page-item" onClick={() =>{ setState({...state,currentPage:i})} }><a class={`page-link ${currentPage === i ? "active" : ""}`} >  {i}</a></li>
      );
  }
  return (
  <>
      <ul class="pagination pagination-sm m-0 ">

          <li class="page-item" onClick={() => state.currentPage > 1 ? setState({...state,currentPage:state.currentPage - 1}) : null} disabled={currentPage === 1}><a class="page-link"  >Previous</a></li>

          {pageButtons}

          <li class="page-item" onClick={() => setState({...state,currentPage:state.currentPage ===totalPages?state.currentPage:state.currentPage+1})} disabled={state.currentPage === pageButtons.length}><a class="page-link"  >Next</a></li>

      </ul>
      <div class="ms-3 d-flex align-items-center pageOftotal">Page {currentPage} of {totalPages}</div>
      </>
      )
  }

  export default BackendPagination;