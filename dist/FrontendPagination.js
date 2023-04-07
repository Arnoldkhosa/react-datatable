import React, { useEffect } from 'react';
const FrontendPagination = ({
  currentPage,
  handlePageChange,
  data,
  rowsPerPage
}) => {
  const pageButtons = [];
  for (let i = 1; i <= Math.ceil(data.length / rowsPerPage); i++) {
    pageButtons.push( /*#__PURE__*/React.createElement("li", {
      key: i,
      class: "page-item",
      onClick: () => handlePageChange(i)
    }, /*#__PURE__*/React.createElement("a", {
      class: `page-link ${currentPage === i ? "active" : ""}`
    }, "  ", i)));
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("ul", {
    class: "pagination pagination-sm m-0 "
  }, /*#__PURE__*/React.createElement("li", {
    class: "page-item",
    onClick: () => currentPage > 1 ? handlePageChange(currentPage - 1) : null,
    disabled: currentPage === 1
  }, /*#__PURE__*/React.createElement("a", {
    class: "page-link"
  }, "Previous")), pageButtons, /*#__PURE__*/React.createElement("li", {
    class: "page-item",
    onClick: () => handlePageChange(Math.ceil(data.length / rowsPerPage) === currentPage ? currentPage : currentPage + 1),
    disabled: currentPage === pageButtons.length
  }, /*#__PURE__*/React.createElement("a", {
    class: "page-link"
  }, "Next"))), /*#__PURE__*/React.createElement("div", {
    class: "ms-3 d-flex align-items-center pageOftotal"
  }, "Page ", currentPage, " of ", Math.ceil(data.length / rowsPerPage)));
};
export default FrontendPagination;