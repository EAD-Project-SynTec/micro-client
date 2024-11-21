import React from 'react'
const ImageGallery = ({returnImgs,handleOpen}) => {
  return (
    <div className='flex gap-6'>
    {returnImgs && returnImgs.map((img, index) => {
      if (index <= 2) return <img src={img} className='w-[110px] h-auto' />
      if (index === 3) return <div className='w-[100px] h-[100px]'
        onClick={handleOpen}
        style={{ background: `linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${img}) center / cover`, backgroundSize: "cover", backgroundPosition: "center", color: "white", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "24px", cursor: "pointer" }}>
        + {returnImgs.length - 3}
      </div>
    })}
  </div>
  )
}

export default ImageGallery