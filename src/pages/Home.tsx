import "../css/Home.css"
import MovieCard from "../components/MovieCard";
import { searchMovies, getPopularMovies } from "../services/api";
import { useState, useEffect, type SubmitEvent } from "react";

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
}

function Home() {

    const [searchQuery, setSearchQuery] = useState<string>("")
    const [movies, setMovies] = useState<Movie[]>([])
    const [error, setError] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(true)
    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies()
                setMovies(popularMovies)
            }
            catch (err) {
                console.log(err)
                setError("Failed to load movies...")
            }
            finally {
                setLoading(false)
            }

        }
        loadPopularMovies()
    
    }, [])
    const handleSearch = async (e: SubmitEvent) =>{
        e.preventDefault() // prevent refresh after submit
        if(!searchQuery.trim()){return}
        if(loading){return}
        setLoading(true)
        try{
           const getSearchResults = await searchMovies(searchQuery)
           setMovies(getSearchResults)
        }
        catch(err){
            console.log(err)
            setError("Failed to search movies...")
        }
        finally{
            setLoading(false)
        }
    }
    return <div className="home">
        <form onSubmit={handleSearch} className="search-form">
            <input type="text" className="search-input" placeholder="search for movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} />
            <button type="submit" className="sub-btn"
            >search</button>
        </form>
        {error && <div className="error-message">{error}</div>}
        <div className="movies-grid">
            {movies.map((movie) => (<MovieCard movie={movie} key={movie.id} />))}
        </div>
    </div>
}
export default Home