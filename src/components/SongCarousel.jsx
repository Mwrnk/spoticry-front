import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = ({ items }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 3,
  };

  const renderSongItem = (item) => (
    <div className="p-2">
      <img src="https://placehold.co/128x128" className="rounded mb-2" />
      <h3 className="text-sm font-semibold">{item.title}</h3>
      <p className="text-xs text-gray-500">{item.artist}</p>
    </div>
  );

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {Array.isArray(items) &&
          items.map((item) => (
            <div key={item._id} className="carousel-item">
              {renderSongItem(item)}
            </div>
          ))}
      </Slider>
    </div>
  );
};

export default Carousel;
