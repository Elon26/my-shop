import React from "react";
import { AiFillCheckSquare, AiFillCloseCircle } from "react-icons/ai";

interface InStockProps {
    quantity: number;
}

const InStock = ({ quantity }: InStockProps) => {
    return (
        <>
            {quantity > 0 && (
                <div className="reused__inStock">
                    <span>
                        <AiFillCheckSquare />
                    </span>
                    <span>Товар в наличии</span>
                </div>
            )}
            {quantity === 0 && (
                <div className="reused__inStock reused__inStock_not">
                    <span>
                        <AiFillCloseCircle />
                    </span>
                    <span>Ожидаем поставку</span>
                </div>
            )}
        </>
    );
};

export default InStock;
