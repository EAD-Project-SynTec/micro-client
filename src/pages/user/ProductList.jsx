import React from 'react'
import MainNav from './components/MainNav'
import { useLocation } from 'react-router-dom';
import Filterbar from './components/Filterbar'
import ProductsCard from './components/ProductsCard'
import axios from 'axios'
import { useEffect, useState } from 'react'
import SortBar from './components/SortBar'
import LoadingProducts from './courier/components/LoadingProducts'
import { getSortedProducts, getUnsortedProducts, getSearchProducts } from './services/productServices'
import { set } from 'date-fns'

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const ProductList = () => {
  const query = useQuery();
  const searchTerm = query.get('search') || '';
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState("");
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let data;
        if (sortedProducts === 'asc' || sortedProducts === 'desc') {
          data = await getSortedProducts(sortedProducts);
        } else {
          data = await getUnsortedProducts();
        }
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [sortedProducts]);

  useEffect(() => {
    if (searchTerm) {
      const searchProducts = async () => {
        try {
          const data = await getSearchProducts(searchTerm);
          setFilteredProducts(data);
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
      };
      searchProducts();
    }
  }, [searchTerm]);

  const applyFilters = (filteredData) => {
    setFilteredProducts(filteredData);
  };

  const handleSearchData = async (searchData) => {
    setFilteredProducts(searchData);
  };
  // sort products based on selected sorting option
  const handleSortedData = (sortedData) => {
    if (sortedData === 'asc' || sortedData ==='desc') {
      setSortedProducts(sortedData);
    } else {
      setSortedProducts(null);
    }
  };
  return (
    <div>
      <MainNav  getSearchResults={handleSearchData}/>
      <SortBar handleSortedData={handleSortedData}/>
      <div className='grid grid-cols-5'>
        <Filterbar items={products} applyFilters={applyFilters} />
        <div className='col-span-4 overflow-y-auto flex flex-wrap py-4 px-4 gap-4 min-h-screen' style={{ backgroundColor: '#f5f7fa' }}>
          {filteredProducts.length > 0 ?
            filteredProducts.map((product, index) => {
              const key = product.productID || index;
              return (
                <ProductsCard
                  key={key}
                  productID={product.id}
                  productTitle={product.name}
                  productImageUrl={product.imageUrl}
                  minimumQuantity={5}
                  availableStock={10}
                  unitPrice={product.price}
                />
              );
            }) :
            <LoadingProducts />
          }
        </div>
      </div>
    </div>
  )
}

export default ProductList