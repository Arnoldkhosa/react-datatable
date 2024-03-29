import React, { useEffect, useState } from 'react';
import FrontendPagination from './FrontendPagination.js';
import BackendPagination from './BackendPagination.js';
const DataTable = ({
  state,
  setState,
  className,
  backendPagination,
  fetchData,
  tableOptions
}) => {
  const startIndex = (state.currentPage - 1) * state.rowsPerPage;
  const endIndex = startIndex + state.rowsPerPage;
  const pageData = backendPagination ? state.data : state.data.slice(startIndex, endIndex);
  const handlePageChange = page => {
    setState({
      ...state,
      currentPage: page
    });
  };
  const handleRowsPerPageChange = event => {
    setState({
      ...state,
      currentPage: 1,
      rowsPerPage: Number(event.target.value)
    });
  };
  const calculate = column => {
    var sum = 0;
    var end = false;
    var frozenColumns = [];
    for (var i = 0; i < tableOptions.length; i++) {
      if (tableOptions[i].frozen) {
        frozenColumns.push(tableOptions[i]);
      }
    }
    for (var i = 0; i < frozenColumns.length; i++) {
      if (frozenColumns[i].column !== column && !end) {
        var width = frozenColumns[i].width;
        if (frozenColumns[0].column === column) {
          sum = sum;
        } else {
          sum = sum + Number(width.slice(0, width.length - 2));
        }
        if (tableOptions[i].column === column) {
          end = true;
        }
      }
    }
    return sum;
  };
  useEffect(() => {
    if (fetchData) {
      fetchData();
    }
  }, [state.rowsPerPage, state.currentPage]);
  return /*#__PURE__*/React.createElement("div", {
    class: "dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns "
  }, /*#__PURE__*/React.createElement("div", {
    className: "dataTable-container border rounded-1",
    style: {
      overflowX: 'scroll'
    }
  }, /*#__PURE__*/React.createElement("table", {
    className: 'table ' + className,
    style: {
      tableLayout: 'fixed'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, tableOptions.map((item, key) => /*#__PURE__*/React.createElement("th", {
    key: key,
    style: {
      position: item.frozen ? 'sticky' : '',
      left: item.frozen === true ? calculate(item.column) : '',
      width: item.width ? item.width : "100px",
      backgroundColor: item.frozen ? 'pink' : 'inherit'
    }
  }, item.appearAs)))), /*#__PURE__*/React.createElement("tbody", null, pageData.map((item, index) => /*#__PURE__*/React.createElement("tr", {
    key: index
  }, tableOptions.map(element => /*#__PURE__*/React.createElement("td", {
    className: element.column,
    key: element.appearAs,
    style: {
      position: element.frozen ? 'sticky' : '',
      left: element.frozen ? calculate(element.column) : '',
      width: element.width ? element.width : "100px",
      backgroundColor: element.frozen ? 'white' : 'inherit'
    }
  }, element.render ? element.render(item, item[element.column]) : item[element.column]))))))), /*#__PURE__*/React.createElement("div", {
    class: "d-flex mt-3"
  }, /*#__PURE__*/React.createElement("div", {
    class: " ms-auto"
  }, /*#__PURE__*/React.createElement("select", {
    id: "rows-per-page",
    className: "form-control rounded-1 rows-per-page",
    onChange: handleRowsPerPageChange,
    value: state.rowsPerPage
  }, /*#__PURE__*/React.createElement("option", {
    value: 1
  }, "1 rows per page"), /*#__PURE__*/React.createElement("option", {
    value: 2
  }, "2 rows per page"), /*#__PURE__*/React.createElement("option", {
    value: 3
  }, "3 rows per page"), /*#__PURE__*/React.createElement("option", {
    value: 10
  }, "10 rows per page"), /*#__PURE__*/React.createElement("option", {
    value: 25
  }, "25 rows per page"), /*#__PURE__*/React.createElement("option", {
    value: 50
  }, "50 rows per page"), /*#__PURE__*/React.createElement("option", {
    value: 100
  }, "100 rows per page")))));
};
export default DataTable;