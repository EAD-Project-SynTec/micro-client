import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { getAllCourierOrders } from '@/services/orderServices';
import { jwtDecode } from 'jwt-decode';

export default function CourierNewOrdersTab() {
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = sessionStorage.getItem('jwtToken');
        const decodedData = jwtDecode(token);
        const courierID = decodedData.email;
        const orders = await getAllCourierOrders(courierID);
        const pendingOrders = orders.filter(order => order.orderStatus === 'pending');
        setData(pendingOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleRowClick = (id) => {  
    navigate(`/couriers/new-orders/${id}`);
  };

  return (
    <div>
      <div>
        <div className="relative flex-col w-full h-full text-custom_gray bg-white shadow-md overflow-auto rounded-xl bg-clip-border mt-8 hidden sm:block">
          <table className="w-full text-left table-auto min-w-max">
            <thead>
              <tr className="border-b border-primary mr-6">
                <th className="p-4 py-5 font-bold w-24 text-center align-middle">Product</th>
                <th className="p-4 py-5 font-bold w-24 text-center align-middle">Order reference</th>
                <th className="p-4 py-5 font-bold w-24 text-center align-middle">Order Placed</th>
                <th className="p-4 py-5 font-bold w-24 text-center align-middle">Quantity (Kg)</th>
                <th className="p-4 py-5 font-bold w-24 text-center align-middle">Delivery Fee</th>
              </tr>
            </thead>
            <tbody>
              {data.map((values) => {
                const { orderID, productTitle, orderedDate, totalQuantity, productImageUrl, deliveryFee } = values;
                const dateTimeString = orderedDate;
                const date = moment(dateTimeString).format("YYYY-MM-DD")
                return (
                  <tr
                    key={orderID}
                    onClick={() => handleRowClick(orderID)}
                    onMouseEnter={() => setSelectedRow(orderID)}
                    onMouseLeave={() => setSelectedRow(null)}
                    className={selectedRow === orderID ? 'bg-gray-200 cursor-pointer' : 'cursor-pointer'}
                  >
                    <td className="p-3 w-24 text-center align-middle">
                      <div className="flex flex-row items-center justify-center">
                        <img src={`https://syntecblobstorage.blob.core.windows.net/products/${productImageUrl}`} alt={productTitle} style={{ borderRadius: '100%', height: '40px', width: '40px', marginRight: '8px' }} />
                        <p className="block font-sans text-sm antialiased font-light leading-normal text-blue-gray-900">
                          {productTitle}
                        </p>
                      </div>
                    </td>
                    <td className="p-3 w-24 text-center align-middle">
                      <p className="block font-sans text-sm antialiased font-light leading-normal text-blue-gray-900">
                        {orderID}
                      </p>
                    </td>
                    <td className="p-3 w-24 text-center align-middle">
                      <p className="block font-sans text-sm antialiased font-light leading-normal text-blue-gray-900">
                        {date}
                      </p>
                    </td>
                    <td className="p-3 w-24 text-center align-middle">
                      <p className="block font-sans text-sm antialiased font-light leading-normal text-blue-gray-900">
                        {totalQuantity}
                      </p>
                    </td>
                    <td className="p-3 w-24 text-center align-middle">
                      <p className="block font-sans text-sm antialiased font-light leading-normal text-blue-gray-900">
                        {deliveryFee.toFixed(2)}
                      </p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
