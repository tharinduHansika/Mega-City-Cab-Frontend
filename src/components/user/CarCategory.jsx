import React from "react";

export function CarCategory({ name, price, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`p-4 rounded-lg transition-all ${
        selected
          ? "bg-yellow-500 text-black"
          : "bg-white/90 text-gray-800 hover:bg-yellow-500/90 hover:text-black"
      }`}
    >
      <div className="text-lg font-semibold">{name}</div>
      <div className="text-sm">${price}</div>
    </button>
  );
}