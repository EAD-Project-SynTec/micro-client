import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { PencilIcon, UserPlusIcon, } from "@heroicons/react/24/solid";
import { HiTrash } from "react-icons/hi2";
import Swal from 'sweetalert2'
import { Card, CardHeader, Typography, Button, CardBody, Avatar, IconButton, Tooltip, } from "@material-tailwind/react";
import { deleteProduct,getProducts } from '@/services/productServices';
const TABLE_HEAD = ["Product", "Product Number", "Category", "Unit Price", "Stock", "Ratings", "", ""];

const MyProductsTable = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 5;
  const PopupHandler = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#44bd32",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        if (id != 0) {
          deleteConfirmHandler(id);
        }
        console.log("deleted");
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      } else {
        console.log("Canceled " + id);
      }
    });
  }
  const fetchProducts = async (pageNum) => {
    try {
      const productData = await getProducts();
      console.log("Product Data",productData);
      setProducts(productData);
      setTotalPages(productData.totalPages);

    } catch (error) {
      console.error('Error fetching cart details:', error);
    }
  };
 
  const deleteConfirmHandler = async (productId) => {
    const result = await deleteProduct(productId);
    fetchProducts(page);
  }
  useEffect(() => {
    fetchProducts(page);
  }, []);
  return (
    <div>
      {/* Header card */}
      <Card className="h-full w-full mt-4">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                My Products
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about all products
              </Typography>
            </div>

            {/* Add button */}
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button className="flex items-center gap-3" size="md" color='green'
                onClick={() => navigate('/dashboard/add-products')}
              >
                Add products
              </Button>
            </div>
          </div>

        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head,index) => (
                  <th
                    key={index}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
            {products.map((p, index)  =>  (
                  <tr key={index}>
                    <td className="p-4 border-b border-blue-gray-50">
                      <div className="flex items-center gap-3">
                        <Avatar src={p.imageUrl} alt={p.name} size="sm" />
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {p.name}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {`${p.description?.split(' ').slice(0, 3).join(' ')}...`}
                          </Typography>
                        </div>
                      </div>
                    </td>

                    <td className="p-4 border-b border-blue-gray-50">
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {"PO-" + 1000 + p.id}
                        </Typography>
                      </div>
                    </td>

                    <td className="p-4 border-b border-blue-gray-50">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {p.category}
                      </Typography>
                    </td>

                    <td className="p-4 border-b border-blue-gray-50">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {p.price.toFixed(2)}
                      </Typography>
                    </td>

                    <td className="p-4 border-b border-blue-gray-50">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {p.quantity}
                      </Typography>
                    </td>

                    <td className="p-4 border-b border-blue-gray-50">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {p.rating}
                      </Typography>
                    </td>

                    {/* edit button column */}
                    <td className="p-4 border-b border-blue-gray-50">
                      <Tooltip content="Edit Product">
                        <IconButton variant="text"
                          onClick={() => navigate(`/dashboard/update-product/${p.id}`)}
                        >
                          <PencilIcon className="h-4 w-4"
                          />
                        </IconButton>
                      </Tooltip>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <Tooltip content="Delete Product">
                        <IconButton variant="text" color='red'
                          onClick={() => PopupHandler(p.id)}
                        >
                          <HiTrash className="h-4 w-4"
                          />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>

    </div>
  )
}

export default MyProductsTable