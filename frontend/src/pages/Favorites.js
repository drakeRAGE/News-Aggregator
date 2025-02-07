import React, { useState, useEffect } from 'react';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // TODO: Implement fetching favorites from backend
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Favorites</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {favorites.map((article) => (
          <div key={article.id} className="border p-4 rounded">
            <h2 className="text-xl font-bold">{article.title}</h2>
            <p className="mt-2">{article.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
