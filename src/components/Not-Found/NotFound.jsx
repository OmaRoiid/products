import React from "react";

export const NotFoundPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Not Found</h1>
      <p className="text-lg text-gray-600">
        Sorry, the product you are looking for does not exist.
      </p>
    </div>
  );
};
