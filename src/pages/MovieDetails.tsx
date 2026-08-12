import { useParams } from "react-router-dom";
// the use params hook will allow us to get the movieId from the url
import { useEffect, useState } from "react";
import { getMovieDetails, getMovietrailer } from "../services/api";
import { Calendar, DollarSign, TrendingUp, Building2, Play, Info } from "lucide-react";
import "../css/MovieDetails.css";

// Interface provided by user
interface Genre {
  id: number;
  name: string;
}

interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

interface Video {
  key: string;
  site: string;
  type: string;
  official: boolean;
}

// Interface principale pour les détails du film
interface Movie_Details {
  id: number;
  title: string;
  overview: string;           // Le synopsis
  tagline: string | null;     // La phrase d'accroche
  runtime: number | null;     // Durée en minutes
  genres: Genre[];
  release_date: string;
  vote_average: number;
  backdrop_path: string | null; // Image de fond (large)
  poster_path: string | null;   // Affiche du film
  budget: number;
  revenue: number;
  spoken_languages: SpokenLanguage[];
  production_companies: ProductionCompany[];
  
  // Cette propriété n'existe que si tu utilises append_to_response=videos
  videos?: {
    results: Video[];
  };
}

function MovieDetails() {
    const [details, setDetails] = useState<Movie_Details | undefined>(undefined);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [isPlayerActive, setIsPlayerActive] = useState<boolean>(false);
    const [trailer, setTrailer] = useState<any>(null);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const loadDetails = async () => {
            if (id) {
                try {
                    const data = await getMovieDetails(Number(id));
                    setDetails(data);
                } catch (err) {
                    console.log(err);
                    setError("could not load movie details");
                } finally {
                    setLoading(false);
                }
            }
        };
        loadDetails();
    }, [id]);

    useEffect(() => {
        const loadTrailer = async () => {
            if (id) {
                const trailer = await getMovietrailer(Number(id));
                setTrailer(trailer);
            }
        };
        loadTrailer();
    }, [id]);

    // 2. Handle the loading state early (Styled Early Return)
    if (loading) return (
        <div className="h-screen flex flex-col items-center justify-center bg-[#050505] gap-6">
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <p className="text-xs font-black uppercase tracking-[0.5em] opacity-30 animate-pulse text-white">Initializing Experience</p>
        </div>
    );

    // 3. Handle the error state (Styled Early Return)
    if (error) return (
        <div className="min-h-screen flex items-center justify-center bg-[#050505] p-10">
            <div className="alert alert-error shadow-2xl max-w-md flex flex-col items-center text-center gap-6 py-12 rounded-3xl border-error/20 bg-error/5 backdrop-blur-xl">
                <div className="bg-error/20 p-5 rounded-full ring-8 ring-error/5">
                    <Info className="w-12 h-12 text-error" />
                </div>
                <div className="space-y-2">
                    <h3 className="font-black text-3xl uppercase tracking-tighter text-white">System Breach</h3>
                    <p className="text-slate-400 font-light italic leading-relaxed">"{error}"</p>
                </div>
            </div>
        </div>
    );

    // 4. Check if details exists before rendering (fixes TS error)
    if (!details) return null;

    return (
        <div className="movie-details-container">
            <div 
                className="hero absolute inset-0 z-0 opacity-20 select-none pointer-events-none transition-opacity duration-1000"
                style={{ 
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${details.backdrop_path})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover'
                }}
            >
                {/* 1. Low-opacity overlay to tint the image slightly darker */}
                <div className="hero-overlay bg-[#050505] bg-opacity-40"></div>

                {/* 2. Soft Vertical Gradient: Removes the 'via-95%' which was blocking the view */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent"></div>
                
                {/* 3. Soft Horizontal Gradient: Fades the edges so the poster stands out */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505]"></div>
                    

                {/* Subtle Design Accents */}
                <div className="absolute top-1/2 -right-10 w-24 h-[50vh] bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>
                <div className="fixed bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent pointer-events-none z-50"></div>
            </div>        

            <div className="container mx-auto px-6 md:px-12 lg:px-16 z-10 relative">
                <div className="movie-details-hero">
                    
                    {/* Cinematic Poster */}
                    <div className="details-poster">
                        <img 
                            src={`https://image.tmdb.org/t/p/w500${details.poster_path}`} 
                            alt={details.title}
                            referrerPolicy="no-referrer"
                        />
                    </div>

                    {/* Movie Information */}
                    <div className="details-info">
                        <div className="details-header">
                            <div className="details-badge-row">
                                <span className="details-badge">Official Entry</span>
                                <span className="details-genres">
                                    {details.genres.map(g => g.name).join(' • ')}
                                </span>
                            </div>
                            
                            <h1 className="details-title">
                                {details.title}
                            </h1>

                            {details.tagline && (
                                <p className="details-tagline">
                                    "{details.tagline}"
                                </p>
                            )}
                        </div>

                        {/* Integration Metrics Bar */}
                        <div className="details-metrics">
                            <div className="metric-item">
                                <span className="metric-label">Rating</span>
                                <span className="metric-value score-highlight">
                                    {details.vote_average.toFixed(1)}
                                    <span className="metric-suffix">/ 10</span>
                                </span>
                            </div>

                            <div className="metric-item">
                                <span className="metric-label">Runtime</span>
                                <span className="metric-value">
                                    {details.runtime || 0}
                                    <span className="metric-suffix">Mins</span>
                                </span>
                            </div>

                            <div className="metric-item">
                                <span className="metric-label">Released</span>
                                <span className="metric-value">
                                    {new Date(details.release_date).getFullYear()}
                                </span>
                            </div>
                        </div>

                        <div className="details-overview-section">
                            <h3 className="details-overview-title">Synopsis</h3>
                            <p className="details-overview-text">
                                {details.overview}
                            </p>
                        </div>

                        {trailer && (
                            <button 
                                onClick={() => setIsPlayerActive(true)}
                                className="play-trailer-btn"
                            >
                                <Play className="w-4 h-4 fill-current" />
                                Play Trailer
                            </button>
                        )}
                    </div>
                </div>

                {/* Embedded Trailer Section (Directly under poster and overview) */}
                {isPlayerActive && trailer && (
                    <div className="trailer-iframe-wrapper">
                        <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                        <button 
                            onClick={() => setIsPlayerActive(false)}
                            className="trailer-close-btn"
                        >
                            ×
                        </button>
                    </div>
                )}

                {/* Additional Details Grid */}
                <div className="details-grid">
                    <div className="details-card">
                        <div className="details-card-header">
                            <span>Release Date</span>
                            <Calendar className="w-4 h-4 text-primary opacity-50" />
                        </div>
                        <span className="details-card-value">
                            {new Date(details.release_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                    </div>

                    <div className="details-card">
                        <div className="details-card-header">
                            <span>Budget</span>
                            <DollarSign className="w-4 h-4 text-emerald-500 opacity-50" />
                        </div>
                        <span className="details-card-value">
                            {details.budget > 0 ? `$${details.budget.toLocaleString()}` : "Confidential"}
                        </span>
                    </div>

                    <div className="details-card">
                        <div className="details-card-header">
                            <span>Revenue</span>
                            <TrendingUp className="w-4 h-4 text-emerald-500 opacity-50" />
                        </div>
                        <span className="details-card-value">
                            {details.revenue > 0 ? `$${details.revenue.toLocaleString()}` : "Confidential"}
                        </span>
                    </div>

                    <div className="details-card">
                        <div className="details-card-header">
                            <span>Production</span>
                            <Building2 className="w-4 h-4 text-primary opacity-50" />
                        </div>
                        <span className="details-card-value">
                            {details.production_companies[0]?.name || "Independent"}
                        </span>
                    </div>
                </div>

                {error && (
                    <div className="error-banner">
                        <Info className="w-4 h-4" />
                        <span>Warning: Internal Exception - {error}</span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MovieDetails;
