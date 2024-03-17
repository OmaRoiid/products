import React from "react";

export const Loading = () => {
  return (
    <div
      data-testid="spinner"
      className="flex justify-center items-center h-screen"
    >
      <div className="border-t-4 border-gray-400 rounded-full animate-spin h-12 w-12"></div>
    </div>
  );
};
