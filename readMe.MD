# Getting Started with react-advanced-datatable

    `npm install react-advanced-datatable`


## Usage
1. Import the DataTable component, the necessary CSS styles, and Axios for making API requests:
```javascript
import DataTable from 'react-advanced-datatable';
import axios from 'axios';
```
2. Define the state for the DataTable component, including the data, current page, rows per page, and total pages:
```javascript
const [state, setState] = useState({
  rowsPerPage: 3,
  data: [],
  currentPage: 2,
  totalPages: 0,
});
```

3. Create a function to fetch the data from the API using Axios, and update the state with the results:
```javascript
const fetchData = async () => {
  await axios
    .get(`http://localhost:3001/api/books/page=${state.currentPage}&total=${state.rowsPerPage}`)
    .then(res => {
      setState({ ...state, data: res.data.data, totalPages: res.data.total });
      console.log(res.data);
    });
};
```
4. Use the useEffect hook to fetch the data when the component mounts:
```javascript
<DataTable
  className={'striped table-bordered package-table'}
  state={state}
  setState={setState}
  tableOptions={[
    {
      column: '#',
      appearAs: '#',
      width: '10px',
      frozen: true,
      render: (object, value) => (
        <>
          <input type="checkbox" className="m-auto" />
        </>
      ),
    },
    {
      column: 'age',
      appearAs: 'Age',
      width: '180px',
      frozen: true,
      render: null,
    },
    {
      column: 'name',
      appearAs: 'Name',
      width: '180px',
      frozen: false,
      render: null,
    },
    {
      column: 'location3',
      appearAs: 'Location 3',
      width: '201px',
      frozen: false,
      render: (object, value) => (
        <>
          {value}
          <button className="btn btn-sm btn-outline-danger p-0 px-2 ms-auto" onClick={() => console.log(value)}>
            view
          </button>
        </>
      ),
    },
    {
      column: 'location4',
      appearAs: 'Location 4',
      width: '50px',
      frozen: false,
      render: (object, value) => (
        <button className="btn btn-sm btn-outline-danger p-0 px-2 ms-auto">{value}</button>
      ),
    },
  ]}
/>
```

## Props
The DataTable component accepts the following props:

* className: The class name for the table. Optional.
* state: An object that defines the state of the table, including the data, current-page, rows-per-page, and  total-pages. Required.
* setState: A function to update the state of the table. Required.
* tableOptions: An array of objects that define the columns of the table, including their name, appearance, width, and rendering function. Required.
