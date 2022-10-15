import React from "react";
const Home = ({hero, descriptions, explore, space}) => {
    return (
      <div className="container__home">
        <div className="inner">
          <div className="left__container">
            <p className="hero">{hero}</p>
            <span>{space}</span>
            <p className="description">
              Let’s face it; if you want to go to space, you might as well
              genuinely go to outer space and not hover kind of on the edge of
              it. Well sit back, and relax because we’ll give you a truly out of
              this world experience!
            </p>
          </div>
          <div className="right__container">
            <button>{explore}</button>
          </div>
        </div>
      </div>
    );
};

export default Home;
