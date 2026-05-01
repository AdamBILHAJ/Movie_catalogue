import {useState, useEffect, createContext,useContext, type ReactNode} from "react"
interface Movie {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
}
interface MovieContextType{
    favorites:Movie[];
    addToFavorites:(movie:Movie)=>void;
    removeFromFavorites:(movieId:number)=>void;
    isFavorite:(movieId:number)=>boolean
}
interface MovieProviderProps{
    children:ReactNode // type for children in typescript
}
//initialize with undefined but type it
const MovieContext= createContext<MovieContextType | undefined>(undefined)
export const useMovieContext = ()=>{
    const context = useContext(MovieContext)
    // the safety net
    if(!context){
        throw new Error("useMovieContext must be used within a MovieProvider")
    }
    return context
    /* approch summary:
    -cleaner import: only import context instead of useContext and MovieContext
    -explicit debugging
    -typescript type narrowing:
    In the standard way, TypeScript thinks the context might be undefined. With the safety net, the throw new Error tells TypeScript: "If the code gets past this point, the context is guaranteed to exist." This removes the need for annoying null-checks (like context?.favorites) later in your code.
    */
}
export const MovieProvider = ({children}:MovieProviderProps) => {
    const [favorites,setFavorites]=useState<Movie[]>([])
    useEffect(()=>{
        const storedFavs = localStorage.getItem("favorites")
        if(storedFavs)setFavorites(JSON.parse(storedFavs))
    },[]
    )
    useEffect(()=>{
        localStorage.setItem('favorites',JSON.stringify(favorites))
    },[favorites])
    const addToFavorites = (movie:Movie)=>{
        setFavorites(prev=>[...prev,movie])
    }
    const removeFromFavorites = (movieId:number)=>{
        setFavorites(prev=>prev.filter((movie)=>movie.id!==movieId))
    }
    const isFavorite=(movieId:number)=>{
        return favorites.some((movie)=>movie.id===movieId)
    }
    const value={
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite
    }
    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
}