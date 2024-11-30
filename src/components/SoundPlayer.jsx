import ReactPlayer from "react-player";

function SoundPlayer({ url, playing }) {
  return (
    <div className="sound-player">
      <ReactPlayer url={url} controls playing={playing} width="0" height="0" />
    </div>
  );
}

export default SoundPlayer;
