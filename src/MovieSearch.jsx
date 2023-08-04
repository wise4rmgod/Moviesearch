import React, { useState } from "react";

const MovieSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
          searchQuery
        )}`,
        {
          headers: {
            Authorization: "Bearer YOUR_BEARER_TOKEN_HERE", // Replace with your actual bearer token
          },
        }
      );

      if (!response.ok) {
        setError("No movies found");
      } else {
        const data = await response.json();
        setMovies(data.results);
      }
    } catch (error) {
      setError("Error fetching movies");
    }

    setLoading(false);
  };

  const openModal = (movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="flex items-center justify-center py-8">
        <div className="flex">
          <input
            type="text"
            className="w-64 mr-2 py-2 px-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter movie title"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      {loading && <p className="text-center mt-4">Loading...</p>}
      {error && <p className="text-center mt-4 text-red-600">{error}</p>}

      {!loading && !error && movies.length === 0 && (
        <p className="text-center mt-4">No movies found</p>
      )}

      <div
        id="clickcard"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4"
      >
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-white rounded-lg shadow-md p-4 cursor-pointer"
          >
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
              className="mx-auto mb-4"
            />
            <h2 className="text-xl font-semibold text-center">{movie.title}</h2>
            <p className="text-center mt-2">{movie.release_date}</p>
            <button
              className="block mt-4 mx-auto bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
              onClick={() => openModal(movie)}
            >
              Show Overview
            </button>
          </div>
        ))}
      </div>

      {selectedMovie && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-md p-4">
            <img
              src={`https://image.tmdb.org/t/p/w300${selectedMovie.poster_path}`}
              alt={selectedMovie.title}
              className="mx-auto mb-4"
            />
            <h2 className="text-xl font-semibold text-center">
              {selectedMovie.title}
            </h2>
            <p className="text-center mt-2">{selectedMovie.release_date}</p>
            <p className="mt-4">{selectedMovie.overview}</p>
            <button
              className="block mt-4 mx-auto bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieSearch;
