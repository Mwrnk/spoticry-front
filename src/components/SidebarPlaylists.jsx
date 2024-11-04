// src/components/SidebarPlaylists.jsx
import React from "react";

function SidebarPlaylists({ playlists }) {
  return (
    <div className="p-4 w-64 bg-gray-900 text-white h-screen overflow-y-auto hidden md:block">
      <h2 className="text-xl font-semibold mb-4">Playlists</h2>
      <div className="space-y-4">
        {playlists.length > 0 ? (
          playlists.map((playlist) => (
            <div
              key={playlist.id || playlist._id}
              className="p-2 bg-gray-800 rounded-lg"
            >
              <h3 className="text-lg font-bold">
                {playlist.name || playlist._name}
              </h3>
              <p className="text-sm">
                {playlist.description || playlist._description}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-400">Nenhuma playlist encontrada</p>
        )}
      </div>
    </div>
  );
}

export default SidebarPlaylists;
