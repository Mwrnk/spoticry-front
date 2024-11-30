import Sidebar from "../components/Layout/Sidebar";
import Header from "../components/Layout/Header";
import Carousel from "../components/Carousel";
import { useEffect, useState } from "react";
import { fetchAllPlaylists } from "../services/playlistService";
import { fetchSongs } from "../services/songService";

function Home() {
  const [playlists, setPlaylists] = useState([]);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetchAllPlaylists(token).then((data) => setPlaylists(data.playlists));
    fetchSongs(token).then((data) => setSongs(data));
  }, []);

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      <Header />
      <main className="flex overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-y-auto p-4">
          <Carousel items={playlists} type="playlist" />
          <Carousel items={songs} type="song" />
        </div>
      </main>
    </div>
  );
}

export default Home;
