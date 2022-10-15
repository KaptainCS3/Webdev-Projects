import React from "react";
const Planets = ({ name, images, description, distance, travel }) => {
  return (
    <section className="container__home">
        <div className="caption__container">
          <p className="pick__destination">
            <span>0 1</span> Pick your Destination
          </p>
          <div className="img">
            <img src={require("../assets/destination/image-moon.png")} alt="" />
          </div>
        </div>
        <div className="description__container">
          {}
          <div className="planet__name">
            <div className="names">{name}</div>
          </div>
          <h1 className="hero__planet"></h1>
          <div className="planet__content">
              {description}
          </div>
          <div className="border__planet">
            <div className="meta__data"></div>
          </div>
        </div>
    </section>
  );
};

export default Planets;
