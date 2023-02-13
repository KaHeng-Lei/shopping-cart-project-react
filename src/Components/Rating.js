import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

//Rating function will take { rating, onClick, style } from parent component which is Filters.js.
const Rating = ({ rating, onClick, style }) => {
  return (
    <>
      {/* create an array of 5 elements. 
      we got the product rating out of 5. 
      if the rating is 2, then the first 2 index of array will be the fillstar icon,
      the rest element of array will be empty star*/}
      {[...Array(5)].map((_, i) => (
        // onClick will run the 'onClick' callback function and will pass the 'i' to it.
        <span key={i} onClick={() => onClick(i)} style={style}>
          {rating > i ? (
            <AiFillStar fontSize="15px" />
          ) : (
            <AiOutlineStar fontSize="15px" />
          )}
        </span>
      ))}
    </>
  );
};

export default Rating;
