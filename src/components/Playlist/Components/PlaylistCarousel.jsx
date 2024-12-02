import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PlaylistCarousel = ({ playlists }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  const renderPlaylistItem = (playlist) => (
    <div className="p-2">
      <img
        src={"https://placehold.co/296x296"}
        alt={playlist.name}
        className="rounded mb-2"
      />
      <h3 className="text-sm font-semibold">{playlist._name}</h3>
      <p className="text-xs text-gray-500">{playlist._description}</p>
    </div>
  );

  return (
    <div className="slider-container relative">
      <Slider {...settings} className="relative">
        {Array.isArray(playlists) &&
          playlists.map((playlist) => (
            <div key={playlist._id} className="carousel-item">
              {renderPlaylistItem(playlist)}
            </div>
          ))}
      </Slider>
    </div>
  );
};

export default PlaylistCarousel;
