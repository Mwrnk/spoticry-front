import React from "react";

const Carousel = ({ items, type }) => {
  return (
    <div className="carousel">
      {items.map((item) => (
        <div key={item._id} className="carousel-item">
          {type === "playlist" ? (
            <div>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
            </div>
          ) : (
            <div>
              <h3>{item.title}</h3>
              <p>{item.artist}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Carousel;
