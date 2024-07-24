// src/Functions/renderStars.jimport React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const renderStars = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - Math.ceil(rating);

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={i} style={{ color: "#f89223" }} />);
  }

  if (halfStar) {
    stars.push(<FaStarHalfAlt key={fullStars} style={{ color: "#f89223" }} />);
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <FaRegStar key={fullStars + 1 + i} style={{ color: "#f89223" }} />
    );
  }

  return stars;
};

export default renderStars;
