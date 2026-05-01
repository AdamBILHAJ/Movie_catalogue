import "../css/MovieCard.css"
import { useMovieContext } from "../contexts/MovieContext";
import { Link } from "react-router-dom";
interface Movie {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
}
interface movieCardProps{
    movie:Movie
}
function MovieCard({movie}:movieCardProps){
    const {isFavorite,addToFavorites,removeFromFavorites}=useMovieContext()
    const favorite=isFavorite(movie.id)
    function onFavoriteClick(e:React.MouseEvent<HTMLButtonElement>){
        e.preventDefault()
        if(favorite)removeFromFavorites(movie.id)
        else addToFavorites(movie)

    }
    return <div className="movie-card">
        <div className="movie-poster">
            <Link className="details-link" to={`/movie/${movie.id}`}><img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/></Link>
            <div className="movie-overlay">
                <button className={`favorite-btn${favorite ? "active":""}`} onClick={onFavoriteClick}>
                    ♥️
                </button>
            </div>
        </div>
        <div className="movie-info">
            <Link className="details-link" to={`/movie/${movie.id}`}><h3>{movie.title}</h3></Link>
            <p>{movie.release_date?.split("-")[0]}</p>
        </div>
    </div>
}
export default MovieCard