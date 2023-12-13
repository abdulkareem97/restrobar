import ReactTable from 'react-table-6'
import 'react-table-6/react-table.css'

const SearchTable = (props) => {
  return (
    <div className="grid grid-cols-6">
      <div className=" my-5 mx-6  p-3 rounded-lg font-bold col-span-6">
        <div className="flex ">
          <form className="w-full">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
            >
              Search
            </label>
            <div className="relative">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-red-800 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                type="search"
                id="search"
                className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-red-800 focus:ring-blue-500 focus:border-red-00 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={props.placeholder}
                onChange={props.change}
                required
              />
            </div>
          </form>
        </div>
      </div>
      <ReactTable
        data={props.search_data}
        columns={props.columns}
        defaultPageSize={props.rows_count}
        className="-striped -highlight col-span-6 rounded-lg m-6"
        // pageSizeOptions = {[2,4, 6]}
      />
    </div>
  )
}

export default SearchTable
