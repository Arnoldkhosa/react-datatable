const FrontendPagination = ({ currentPage, handlePageChange, data, rowsPerPage }) => {

    const pageButtons = [];
    for (let i = 1; i <= Math.ceil(data.length / rowsPerPage); i++) {
        pageButtons.push(
            <li key={i} class="page-item records-total" onClick={() => handlePageChange(i)}><a class={`page-link ${currentPage === i ? "bg-primary text-light" : "text-dark"}`} >  {i}</a></li>
        );
    }
    return (
    <>
        <ul class="pagination pagination-sm m-0 records-total">

            <li class="page-item records-total " onClick={() => currentPage > 1 ? handlePageChange(currentPage - 1) : null} disabled={currentPage === 1}><a class="page-link text-dark"  >Previous</a></li>

            {pageButtons}

            <li class="page-item records-total " onClick={() => handlePageChange(Math.ceil(data.length / rowsPerPage)===currentPage?currentPage:currentPage + 1)} disabled={currentPage === pageButtons.length}><a class="page-link text-dark"  >Next</a></li>

        </ul>
        <div class="ms-3 d-flex align-items-center text-dark records-total mb-3">Page {currentPage} of {Math.ceil(data.length / rowsPerPage)}</div>
    </>)
}
export default FrontendPagination;