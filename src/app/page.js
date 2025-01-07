'use client'
import React, { useEffect, useState } from 'react';
import { fetchMovies } from '../services/fetchDataBase'; // Ensure this function fetches the movie list from your service.
import './page.css'
import { FaThumbsUp } from "react-icons/fa";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [likedMovies, setLikedMovies] = useState(() => {
    // Retrieve liked movies from local storage or initialize to an empty array
    const storedLikes = localStorage.getItem('likedMovies');
    return storedLikes ? JSON.parse(storedLikes) : [];
  });

  // Fetch all movies on component mount
  useEffect(() => {
    const getMovies = async () => {
      try {
        const data = await fetchMovies();
        setMovies(data.results); // Assuming the API response contains a `results` array
        //results['results']['characters']
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    getMovies();
  }, []);

  // Handle liking or unliking a movie
  const handleLike = (movieId) => {
    const updatedLikes = likedMovies.includes(movieId)
      ? likedMovies.filter((id) => id !== movieId) // Remove from liked list if already liked
      : [...likedMovies, movieId]; // Add to liked list if not liked yet

    setLikedMovies(updatedLikes);
    localStorage.setItem('likedMovies', JSON.stringify(updatedLikes)); // Update local storage
  };

  return (
    <div>
      <h1 className='title'>Star Wars Movies</h1>
      <ul>
        <div className="gridTable">
          {movies.map((movie) => (
            <div className='movie-div'>
              <li key={movie.episode_id}>
                <p className='movie-title'>
                  <strong>{movie.title}</strong> ({movie.release_date})
                </p>
                <p>{movie.opening_crawl}</p>
                <FaThumbsUp
                  className="editIcon"
                  onClick={() => handleLike(movie.episode_id)}
                  style={{ color: likedMovies.includes(movie.episode_id) ? 'blue' : 'black' }}
                />
              </li>
            </div>
          ))}
        </div>
      </ul>
    </div>
  );
};

export default Movies;
