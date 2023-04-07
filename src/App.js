import React, { useEffect, useState } from 'react';
import FrontendPagination from './FrontendPagination.js';
import BackendPagination from './BackendPagination.js';

const DataTable = ({ state, setState, className, backendPagination, fetchData, tableOptions }) => {

    const startIndex = (state.currentPage - 1) * state.rowsPerPage;
    const endIndex = startIndex + state.rowsPerPage;
    const pageData = backendPagination ? state.data : state.data.slice(startIndex, endIndex);

    const handlePageChange = (page) => { setState({ ...state, currentPage: page }); };

    const handleRowsPerPageChange = (event) => {
        setState({
            ...state, currentPage: 1,
            rowsPerPage: Number(event.target.value)
        });
    };

    const calculate = (column) => {
        var sum = 0;
        var end = false;
        var frozenColumns = [];

        for (var i = 0; i<tableOptions.length; i++){
            if(tableOptions[i].frozen){
                frozenColumns.push(tableOptions[i])
            }
        }

        for (var i = 0; i < frozenColumns.length; i++) {
            if (frozenColumns[i].column !== column && !end) {
                var width = frozenColumns[i].width;
                if (frozenColumns[0].column === column) { sum = sum; }
                else { sum = sum + Number(width.slice(0, width.length - 2)); }
                if (tableOptions[i].column === column) {end = true; }
            }
        }
        return sum;
    };
    useEffect(() => {
        if (fetchData) {
            fetchData();
        }
    }, [state.rowsPerPage, state.currentPage])

    return (

                            <div class="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns ">
                                <div className='dataTable-container border rounded-1' style={{ overflowX: 'scroll' }} >
                                    <table className={'table ' + className} style={{ tableLayout: 'fixed' }}>
                                        <thead>
                                            <tr>
                                                {tableOptions.map((item, key) => (
                                                    <th
                                                        key={key}
                                                        style={{
                                                            position: item.frozen ? 'sticky' : '',
                                                            left: item.frozen===true ? calculate(item.column) : '',
                                                            width: item.width ? item.width : "100px",
                                                            backgroundColor: item.frozen ? 'pink' : 'inherit'
                                                        }}
                                                    >
                                                        {item.appearAs}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {pageData.map((item, index) => (
                                                <tr key={index}>
                                                    {tableOptions.map((element) => (
                                                        <td className={element.column} key={element.appearAs}
                                                            style={{
                                                                position: element.frozen ? 'sticky' : '',
                                                                left: element.frozen ? calculate(element.column) : '',
                                                                width: element.width ? element.width : "100px",
                                                                backgroundColor: element.frozen ? 'white' : 'inherit'
                                                            }}
                                                        >
                                                            {element.render ? element.render(item, item[element.column]) : item[element.column]}
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div class="d-flex mt-3">
                                    {backendPagination ? <BackendPagination totalPages={state.totalPages} currentPage={state.currentPage} state={state} setState={setState} /> :
                                        <FrontendPagination
                                            currentPage={state.currentPage}
                                            handlePageChange={handlePageChange}
                                            data={state.data}
                                            rowsPerPage={state.rowsPerPage}
                                        />
                                    }
                                    <div class=" ms-auto">
                                        <select id="rows-per-page" className='form-control rounded-1 rows-per-page' onChange={handleRowsPerPageChange} value={state.rowsPerPage}>
                                            <option value={1}>1 rows per page</option>
                                            <option value={2}>2 rows per page</option>
                                            <option value={3}>3 rows per page</option>
                                            <option value={10}>10 rows per page</option>
                                            <option value={25}>25 rows per page</option>
                                            <option value={50}>50 rows per page</option>
                                            <option value={100}>100 rows per page</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
    );
};

export default DataTable;

