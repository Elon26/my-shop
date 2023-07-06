import React, { useState } from "react";
import StarRatings from "react-star-ratings";
import betweenNumberSpacer from "../../../utils/betweenNumberSpacer";
import { toast } from "react-toastify";
import axios from "axios";
import { wrapAsyncFunction } from "../../../utils/wrapAsyncFunction";
import { useAppDispatch } from "../../../hooks/reduxHook";
import { setProduct } from "../../../store/products";
import { IProduct } from "../../../models";

interface StarRatingProps {
    product: IProduct
}

const StarRating = ({ product }: StarRatingProps) => {
    const dispatch = useAppDispatch();
    const [currentRate, setCurrentRate] = useState(product.rate);
    const [currentVotes, setCurrentVotes] = useState(product.votes);

    async function changeRating(rate: number) {
        const lastRate = localStorage.getItem(`rate-of-${product._id}`);
        let updatedVotes;
        let updatedRate;

        if (lastRate) {
            updatedVotes = currentVotes;
            updatedRate = ((currentRate * currentVotes - +lastRate) + rate) / currentVotes;
        } else {
            updatedVotes = currentVotes + 1;
            updatedRate = (currentRate * currentVotes + rate) / updatedVotes;
        }

        setCurrentVotes(updatedVotes);
        setCurrentRate(updatedRate);

        const data = {
            ...product,
            rate: updatedRate,
            votes: updatedVotes
        };

        toast.success("Ваша оценка зарегистрирована");
        dispatch(setProduct(data));
        await axios.patch("products/" + product._id + ".json", data);
        localStorage.setItem(`rate-of-${product._id}`, rate.toString());
    }

    return (
        <div className="starRating">
            <StarRatings
                rating={currentRate}
                starDimension="26px"
                starSpacing="2px"
                starEmptyColor="#4D4D4D"
                starRatedColor="#F9AD3D"
                starHoverColor="#F9AD3D"
                changeRating={wrapAsyncFunction(changeRating)}
                numberOfStars={5}
                name="rating"
            />
            <b>({betweenNumberSpacer(currentVotes)})</b>
        </div>
    );
};

export default StarRating;
