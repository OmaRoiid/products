import React from "react";

export const ProductCard = ({ product }) => {
  const { title, description, category, image, price } = product;
  return (
    <div className="border border-gray-300 rounded-md p-4 m-4 max-w-xs">
      <div className="relative aspect-w-3 aspect-h-4">
        <img src={image} alt={title} className="object-scale-down h-48 w-96" />
      </div>
      <div className="mt-2">
        <h3 className="text-lg font-bold leading-tight hover:text-clip">
          {title}
        </h3>
        <p className="text-gray-700 mt-1 line-clamp-2">{description}</p>
        <div className="flex justify-between mt-2">
          <p className="text-gray-600 font-semibold">{category}</p>
          <p className="text-gray-600 font-semibold">${price}</p>
        </div>
      </div>
    </div>
  );
};
