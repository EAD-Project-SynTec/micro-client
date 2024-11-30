// CourierOrderDetail.js
import React, { useState } from 'react';
import {
  Card,
  CardBody,
  Typography,
} from '@material-tailwind/react';
import { Button } from "@material-tailwind/react";
import { Pickup_Drop_Detail } from './Pickup_Drop_Detail';
import { Popup } from './Popup'; // Import the Popup component here
import DeliveryFee from './DeliveryFee';


export function CourierOrderDetail() {
  const handleAccept = () => {
    // Handle accept logic here
    console.log("Accepted");
  };

  const handleReject = () => {
    // Handle reject logic here
    console.log("Rejected");
  };

  return (
    <>
      <div className="flex justify-center ">
        <table className="w-full max-w-[50em] flex-row">
          <tr style={{ height: '50px' }}>
            <th className='p-2'>
              <Card className="w-full max-w-[50rem] flex-row">
                <div style={{ display: 'flex', alignItems: 'center', marginLeft: '40px' }}>
                  <img src="/img/carrot.png" alt="" style={{ width: '100px', height: '100px', marginLeft: '30px' }} />
                </div>
                <CardBody style={{ marginLeft: '90px', marginTop: '15px' }}>
                  <Typography variant="h4" color="blue-gray" className="mb-2">
                    Product: Carrot - 25Kg
                  </Typography>
                  <div className="flex-col items-center">
                    <>
                      <Typography color="black" className="mb-2 font-normal">
                        <strong>Delivery Date</strong>&nbsp;:&nbsp;<span style={{ color: 'gray' }}>before</span> <strong>2024-05-16</strong>
                      </Typography>
                      <Typography variant="h5" color="blue-gray" className="mb-2">
                        Delivery Fee : Rs.30000.00
                      </Typography>
                    </>
                  </div>
                </CardBody>
              </Card>
            </th>
          </tr>

          <tr>
            <td className='p-2 mb-5'>
              <Pickup_Drop_Detail
                type="pickup"
                name="K.J.Perara"
                address="Katubedda, Moratuwa, SriLanka"
                phoneNumber="077-2385612"
              />
              <br />
            </td>
          </tr>
          <tr>
            <td className='p-2'>
              <Pickup_Drop_Detail
                type="drop"
                name="T.M.Dilshan"
                address="Maduragama, Hullogedra, Nikaweratiya"
                phoneNumber="077-2385612"
              />
            </td>
          </tr>
          <tr>
            <td colSpan="2" className='p-2'>
              <Card className="mt-10 w-full max-w-[50rem] flex-row">
                <CardBody className="w-full max-w-[50rem] flex-row">
                  <div className="flex w-full max-w-[50rem] gap-4 justify-center items-center">
                    <Popup
                      title="Are you sure?"
                      text="Do you want this order?"
                      icon="warning"
                      buttoncolor="green"
                      confirmButtonText="Accept"
                      handleConfirm={handleAccept}
                    />
                    <Popup
                      title="Are you sure?"
                      text="Don't you want this order?"
                      icon="warning"
                      buttoncolor="red"
                      confirmButtonText="Reject"
                      handleConfirm={handleReject}
                    />
                  </div>
                </CardBody>
              </Card>
            </td>
          </tr>
        </table>
      </div>
      <div>
      </div>
    </>
  );
}
