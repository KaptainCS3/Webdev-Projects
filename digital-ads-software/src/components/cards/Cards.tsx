// import React from 'react'
import sneakers from "/assets/sneakers.jpeg"
const Cards = () => {
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="grid grid-cols-2 grid-rows-1 w-[48%] mx-auto border rounded-lg">
        <div className="col-span-1 row-span-full">
          <img
            src={sneakers}
            alt=""
            className="w-full h-full bg-cover"
          />
        </div>
        <div className="px-8 col-span-1 py-12 row-span-full">
          <h1 className="text-2xl font-bold capitalize">harvest Vase</h1>
          <h4 className="uppercase py-2">by studio and friends</h4>
          <p className="pb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis alias
            totam ea vel voluptatum. Magni harum labore omnis a cumque sapiente
            error quas iusto repellat ex rerum, recusandae quam praesentium?
          </p>
          <span className="flex justify-between items-center text-xl">
            <span>78$</span>
            <button className="px-12 py-3 rounded-3xl bg-teal-500 text-white uppercase">buy now</button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Cards;
