import React, { useEffect } from "react";
import ReactPlayer from "react-player";

function SoundPlayer({ url, playing }) {
  useEffect(() => {
    return () => {
      // Limpa recursos quando o componente é desmontado
      ReactPlayer.stop();
    };
  }, []);

  return (
    <div className="sound-player">
      <ReactPlayer url={url} controls playing={playing} width="0" height="0" />
    </div>
  );
}

export default SoundPlayer;
