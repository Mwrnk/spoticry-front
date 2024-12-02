import Sidebar from "../components/Layout/Sidebar";
import Header from "../components/Layout/Header";
import Carousel from "../components/SongCarousel";
import PlaylistCarousel from "../components/PlaylistCarousel";
import { useEffect, useState } from "react";
import { fetchSongs } from "../services/songService";
import { fetchPlaylists } from "../services/playlistService";

function Home() {
  const [songs, setSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetchSongs(token).then((data) => {
      setSongs(data);
      console.log("Songs:", data);
    });
    fetchPlaylists(token).then((data) => {
      setPlaylists(data);
      console.log("Playlists:", data);
    });
  }, []);

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      <Header />
      <main className="flex overflow-hidden" role="main">
        <Sidebar />
        <div className="flex-1 overflow-y-auto p-4 space-y-8 pl-8 pr-8">
          <h2
            className="text-4xl font-bold text-gray-200 mb-4"
            id="discover-music"
          >
            Descubra novas músicas
          </h2>
          <Carousel
            items={songs}
            type="song"
            aria-labelledby="discover-music"
          />
          <h2
            className="text-4xl font-bold text-gray-200 mb-4"
            id="recently-played"
          >
            Tocadas recentemente
          </h2>
          <Carousel
            items={songs}
            type="song"
            aria-labelledby="recently-played"
          />
          <h2
            className="text-4xl font-bold text-gray-200 mb-4"
            id="trending-playlists"
          >
            Playlists em tendência
          </h2>
          <PlaylistCarousel
            playlists={playlists}
            aria-labelledby="trending-playlists"
          />
        </div>
      </main>
    </div>
  );
}

export default Home;
