import axios from 'axios';

export async function fetchMovies() {
    try {
        const response = await axios.get(`https://swapi.py4e.com/api/films/`);
        console.log('Movies Data:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error;
    }
};