const API_KEY = import.meta.env.VITE_MOVIE_API_KEY
const BASE_URL = import.meta.env.VITE_BASE_URL

export const getPopularMovies = async () => {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`)
    const data = await response.json()
    return data.results
}
export const searchMovies = async (query:string) => {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`)
    const data = await response.json()
    return data.results
}
export const getMovieDetails=async(movieId:number)=>{
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`)
    const data = await response.json()
    return data
}
export const getMovietrailer = async(movieId:number)=>{
    const response = await fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`)
    const data = await response.json()
    // On filtre pour ne retourner que le trailer officiel YouTube s'il existe
    return data.results.find(
        (video: any) => video.type === "Trailer" && video.site === "YouTube"
    ) || data.results[0]; // ou la première vidéo par défaut
}