import React, { useState } from 'react';
import { FaHandLizard } from 'react-icons/fa';
import { IconButton } from "@material-tailwind/react";

const ProductQuantity = ({ minimumQuantity, availableStock, onQuantityChange }) => {
    const minQuantity = minimumQuantity;
    const maxQuantity = availableStock;
    const [quantity, setQuantity] = useState(minQuantity);
    const [disableIncrement, setDisableIncrement] = useState(false);
    const [disableDecrement, setDisableDecrement] = useState(true);

    const handleIncrement = () => {
        if (quantity >= maxQuantity) {
            setDisableIncrement(true);
            setDisableDecrement(false);
        } else {
            setDisableIncrement(false);
            setQuantity(quantity + 1);
            setDisableDecrement(false);
            onQuantityChange(quantity + 1); // Callback to parent with updated quantity
        }
    };

    const handleDecrement = () => {
        if (quantity <= minQuantity) {
            setDisableDecrement(true);
            setDisableIncrement(false);
        } else {
            setDisableDecrement(false);
            setQuantity(quantity - 1);
            setDisableIncrement(false);
            onQuantityChange(quantity - 1); // Callback to parent with updated quantity
        }
    };

    return (
        <div className='rounded-full bg-secondary w-[220px] '>
            <div className='flex justify-between items-center p-2 '>
                <IconButton color="gray" className="bg-primary text-white p-4 disabled:bg-gray-400 rounded-full text-3xl font-normal" disabled={disableDecrement} onClick={handleDecrement}>-</IconButton>
                <span className=' text-gray-800 font-medium '>{quantity} kg</span>
                <IconButton color="gray" className="bg-primary text-white p-4 disabled:bg-gray-400 rounded-full text-2xl font-normal" disabled={disableIncrement} onClick={handleIncrement}>+</IconButton>
            </div>
        </div>
    );
};

export default ProductQuantity;
