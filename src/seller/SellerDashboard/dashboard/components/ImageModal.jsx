import React from 'react'
import { Modal, Box } from '@mui/material';
import { CarouselDefault } from './PopOver';
const ImageModal = ({images, open ,setOpen}) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700,
        bgcolor: 'transparent',
        // border: '2px solid #000',
        boxShadow: 24,
        // p: 4,
      };
      const handleClose = () => setOpen(false)
  return (
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      > 
        <Box sx={style} >
          <div className='flex justify-end p-3 text-white  text-2xl bg-transparent cursor-pointer' onClick={handleClose}>X</div>
          <CarouselDefault imgs={images}/>
        </Box>
      </Modal>
  )
}

export default ImageModal