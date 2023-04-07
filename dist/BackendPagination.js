import React from 'react';
const BackendPagination = ({
  totalPages,
  handlePageChange,
  currentPage,
  setState,
  state
}) => {
  const pageButtons = [];
  for (let i = 1; i <= totalPages; i++) {
    pageButtons.push( /*#__PURE__*/React.createElement("li", {
      key: i,
      class: "page-item",
      onClick: () => {
        setState({
          ...state,
          currentPage: i
        });
      }
    }, /*#__PURE__*/React.createElement("a", {
      class: `page-link ${currentPage === i ? "active" : ""}`
    }, "  ", i)));
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("ul", {
    class: "pagination pagination-sm m-0 "
  }, /*#__PURE__*/React.createElement("li", {
    class: "page-item",
    onClick: () => state.currentPage > 1 ? setState({
      ...state,
      currentPage: state.currentPage - 1
    }) : null,
    disabled: currentPage === 1
  }, /*#__PURE__*/React.createElement("a", {
    class: "page-link"
  }, "Previous")), pageButtons, /*#__PURE__*/React.createElement("li", {
    class: "page-item",
    onClick: () => setState({
      ...state,
      currentPage: state.currentPage === totalPages ? state.currentPage : state.currentPage + 1
    }),
    disabled: state.currentPage === pageButtons.length
  }, /*#__PURE__*/React.createElement("a", {
    class: "page-link"
  }, "Next"))), /*#__PURE__*/React.createElement("div", {
    class: "ms-3 d-flex align-items-center pageOftotal"
  }, "Page ", currentPage, " of ", totalPages));
};
export default BackendPagination;