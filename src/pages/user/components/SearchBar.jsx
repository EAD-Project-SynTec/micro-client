import { getSearchProducts } from "@/services/productServices";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const SearchBar = ({ onSearch, isInProductPage }) => {
  const [searchData, setSearchData] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    console.log("--------------------------")
    console.log(searchData)
    e.preventDefault();
    if (typeof onSearch === 'function') {
      onSearch(searchData);
    } else {
      console.error("onSearch is not a function");
    }
    console.log('here')
    navigate(`/products?search=${searchData}`);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full mx-2">
      <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
          placeholder="Search Products..."
          value={searchData}
          onChange={(e) => setSearchData(e.target.value)}
          required
        />
        <button
          type="submit"
          className="text-white absolute bg-green-500 end-2.5 bottom-2.5 bg-primary hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button>
      </div>
    </form>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func,
  isInProductPage: PropTypes.bool,
};

SearchBar.defaultProps = {
  onSearch: () => {},
};

export default SearchBar;