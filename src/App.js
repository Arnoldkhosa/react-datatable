import React, { useEffect, useState } from 'react';
import BackendPagination from "./BackendPagination"
import FrontendPagination from "./FrontendPagination"


const DataTable = ({ state, setState, className, backendPagination, fetchData, tableOptions, hidePagination }) => {

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
        var index = null;
        for (var i = 0; i < tableOptions.length; i++) {
            if (tableOptions[i].frozen && column === tableOptions[i].column) {
                index = i;
            }
        }
        if (index)
            for (var i = 0; i < index; i++) {
                if (tableOptions[i].frozen) {
                    var width = tableOptions[i].width;
                    sum = sum + Number(width.slice(0, width.length - 2))
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
        <>

            <table className={'table ' + className} style={{ tableLayout: 'fixed' }}>
                <thead className='thead text-light bg-primary'>
                    <tr>
                        {tableOptions.map((item, key) => (
                            <th
                                key={key}
                                class="text-nowrap"
                                style={{
                                    position: item.frozen ? 'sticky' : '',
                                    left: item.frozen === true ? calculate(item.column) : '',
                                    width: item.width?item.width:"140px" ,
                                    backgroundColor: item.frozen=== true ? 'grey' : ''
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
                            {tableOptions.map((element, key) => (

                                <td  className={`${element.render ? "m-0 p-0" : "m-0 py-1"} ${element.column} `} key={key}
                                    style={{
                                        height: "30px",
                                        position: element.frozen ? 'sticky' : '',
                                        left: element.frozen ? calculate(element.column) : '',
                                        width: element.width ? element.width : "auto",
                                        backgroundColor: element.frozen ? 'white' : 'inherit',
                                    }}
                                >

                                    {element.render ? element.render(item, item[element.column], index) : item[element.column]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            {hidePagination ? null : (
                <>
                    <div class="d-flex mt-3" style={{ position: "sticky", left: '0px' }}>
                        {backendPagination ? <BackendPagination totalPages={state.totalPages} currentPage={state.currentPage} state={state} setState={setState} /> :
                            <FrontendPagination
                                currentPage={state.currentPage}
                                handlePageChange={handlePageChange}
                                data={state.data}
                                rowsPerPage={state.rowsPerPage}
                            />
                        }
                        <div class=" ms-auto " style={{ position: "sticky", right: '0px' }}>
                            <select id="rows-per-page" className='form-select rounded-1  mb-3' onChange={handleRowsPerPageChange} value={state.rowsPerPage}>
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
                </>
            )}
        </>

    );
};

export default DataTable;

