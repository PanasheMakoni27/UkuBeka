import React, { useEffect, useState } from 'react';

const FAVORITES_KEY = 'ukubeka_favorites';

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
    setFavorites(favs);
  }, []);

  function removeFavorite(name) {
    const updated = favorites.filter(f => f.name !== name);
    setFavorites(updated);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  }

  function clearFavorites() {
    setFavorites([]);
    localStorage.removeItem(FAVORITES_KEY);
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Favorite Translations</h1>
      {favorites.length === 0 ? (
        <div className="text-gray-500 text-center py-12">No favorites saved yet.</div>
      ) : (
        <>
          <button
            className="mb-4 px-4 py-2 rounded bg-red-500 text-white text-sm font-semibold hover:bg-red-600"
            onClick={clearFavorites}
          >
            Clear All
          </button>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {favorites.map(fav => (
              <div key={fav.name} className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
                <img
                  src={fav.image}
                  alt={fav.name}
                  className="w-20 h-20 object-contain mb-2"
                />
                <div className="font-bold text-lg mb-1">{fav.name}</div>
                <div className="text-sm text-gray-600 mb-2">{fav.description}</div>
                <span className="text-xs px-2 py-1 bg-gray-100 rounded mb-2">{fav.category}</span>
                <button
                  className="px-3 py-1 rounded bg-red-400 text-white text-xs font-semibold hover:bg-red-500"
                  onClick={() => removeFavorite(fav.name)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
