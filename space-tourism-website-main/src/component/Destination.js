import React from "react";
import data from "../data.json";
import Planets from "./Planets";
const Destination = () => {
  const name = data.destinations.map((el) => {
    return <h3>{el.name}</h3>;
  });
  const images = data.destinations.map((el) => {
    return <img src={el.images.png} alt='' />
  });
  const description = data.destinations.map((el) => {
    return <p>{el.description}</p>;
  });
  const distance = data.destinations.map((el) => {
    return el.distance;
  });
  const travel = data.destinations.map((el) => {
    return el.travel;
  });
  return (
    // <div className="destination__background">
      <Planets
        name={name}
        key={name}
        images={images}
        description={description}
        distance={distance}
        travel={travel}
      />
    // </div>
  );
};

export default Destination;
