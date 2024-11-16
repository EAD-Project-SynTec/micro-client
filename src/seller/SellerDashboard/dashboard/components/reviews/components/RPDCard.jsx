import React, { useState } from 'react'
import ImageModal from '../../ImageModal';
import ImageGallery from '../../ImageGallery';

const paragraStyles = {
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    display: '-webkit-box',
  };
const RPDCard = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);

    const [returnImgs, setReturnImgs] = useState([
        "https://tse1.mm.bing.net/th?id=OIP.bprm9Awwe2tzYwo80PtKIwHaE6&pid=Api&P=0&h=220",
        "https://tse1.mm.bing.net/th?id=OIP.bprm9Awwe2tzYwo80PtKIwHaE6&pid=Api&P=0&h=220",
        "https://tse1.mm.bing.net/th?id=OIP.bprm9Awwe2tzYwo80PtKIwHaE6&pid=Api&P=0&h=220",
        "https://tse1.mm.bing.net/th?id=OIP.bprm9Awwe2tzYwo80PtKIwHaE6&pid=Api&P=0&h=220",
        "https://tse1.mm.bing.net/th?id=OIP.bprm9Awwe2tzYwo80PtKIwHaE6&pid=Api&P=0&h=220",
        "https://tse1.mm.bing.net/th?id=OIP.bprm9Awwe2tzYwo80PtKIwHaE6&pid=Api&P=0&h=220",
        "https://tse1.mm.bing.net/th?id=OIP.bprm9Awwe2tzYwo80PtKIwHaE6&pid=Api&P=0&h=220",
        "https://tse1.mm.bing.net/th?id=OIP.bprm9Awwe2tzYwo80PtKIwHaE6&pid=Api&P=0&h=220",
      ])
      const data = [
        {
          CN: "Methsara",
          CA: "Kurunagala",
          CCN: "0713600779",
          OID: "214059"
        }
    
      ]
      const B = [
        {
          BaN: "BOC",
          BRN: "Kurunegala",
          ACN: "1234556778908",
          ACNO: "595425248589"
        }
    
      ]
     
    
  return (
    <div>
 <ImageModal images={returnImgs} open={open} setOpen={setOpen}/>
      <div className='bg-white rounded-lg px-8 py-2'>
        <h1 className='text-[#12101082]'> Return product Details</h1>
      </div>
      <div className='bg-white px-8 py-5 rounded-lg my-2 pb-1'>
        <div className='flex gap-[400px] text-[#282727]'>
          <div className='mb-4'>
            <h1>Vegetable Gallery </h1>
            <h1>Purchased on 16 Dec 2023</h1>
          </div>
          <div>
            <h1 className='my-6'>Returned on 16 Dec 2023</h1>
          </div>
        </div>
        <hr className='py-2'></hr>
        <div className='flex w-full gap-4 items-end'>
          <img
            src="https://tse1.mm.bing.net/th?id=OIP.bprm9Awwe2tzYwo80PtKIwHaE6&pid=Api&P=0&h=220"
            alt=""
            className='w-[160px] h-[120px]'
          />

          <div className='w-full px-3'>
            <h1 className='font-semibold text-gray-800 text-lg my-3'>Leeks 1kg</h1>
            <p className='text-blue-gray-500'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Exercitationem, libero optio voluptate accusantium temporibus quis
              aperiam soluta nihil est magnam omnis, aliquam architecto
              necessitatibus quaerat delectus eveniet in totam quos.
            </p>
          </div>
        </div>
        <div className='flex justify-between'>
          <div className='my-6 '>
            <div>Returned Quantity - 100kg</div>
            <div>Amount Returned Quantity - Ru.10000.00</div>
          </div>
        </div>
        <hr />
        <h1 className='my-3 font-semibold'>Update Return Product Photos and videos</h1>
        <ImageGallery returnImgs={returnImgs} handleOpen={handleOpen}/>
        <hr className='my-4' />
        <h1 className='my-2'>Return Reason</h1>
        <p style={isOpen ? null : paragraStyles}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Nihil enim dignissimos quaerat porro perferendis corporis possimus natus,
          sequi corrupti similique autem suscipit saepe incidunt obcaecati odit animi,
          earum, delectus aperiam? Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Dolore aliquam ut odio iusto. Voluptates, maiores veniam nisi,
          quas commodi cum quibusdam mollitia ratione nihil iste voluptate aliquam
          dolore sapiente sit.
        </p>
        <button className='font-semibold' onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? 'Read less...' : 'Read more...'}
        </button>
        <hr className='my-4' />
        <div>
          <h1>Customer Details</h1>

          {
            data.map((item) => {
              return (
                <div className='my-4'>
                  <p ><span className='font-semibold'>Customer Name: </span> {item.CN}</p>
                  <p><span className='font-semibold'>Customer Area:</span>  {item.CA}</p>
                  <p><span className='font-semibold'>Customer Contact No:</span> {item.CCN} </p>
                  <p ><span className='font-semibold'>Order ID:</span> {item.OID}</p>

                  < hr className='my-4' />
                </div>
              )
            })
          }
        </div>
        <div>
          <h1>Bank Details</h1>
          {
            B.map((item) => {
              return (
                <div className='my-4'>
                  <p ><span className='font-semibold'>Bank Name: </span> {item.BaN}</p>
                  <p><span className='font-semibold'>Branch Name:</span>  {item.BRN}</p>
                  <p><span className='font-semibold'>AAC Name:</span> {item.ACN} </p>
                  <p ><span className='font-semibold'>ACC NO:</span> {item.ACNO}</p>

                  < hr className='my-4' />
                </div>
              )
            })
          }
        </div>
      </div>


    </div>
  )
}

export default RPDCard