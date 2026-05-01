import { useParams } from "react-router-dom";
// the use params hook will allow us to get the movieId from the url
import { useEffect, useState } from "react";
import { getMovieDetails, getMovietrailer } from "../services/api";
import { 
  //Star, 
  //Clock, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Building2, 
  Play, 
  Info, 
  //Globe 
} from "lucide-react";

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
    <div className="min-h-screen bg-[#050505] text-slate-100 selection:bg-primary selection:text-white pb-32 relative overflow-hidden font-sans ">
        
        {/* Immersive Background Atmosphere - Integrated with daisyUI Hero Method */}
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

        <div className="container mx-auto px-6 md:px-12 lg:px-16 z-10 relative">
            {/* Hero Section */}
            <div className="pt-16 md:pt-28 flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
                
                {/* Cinematic Poster */}
                <div className="relative shrink-0 flex-none w-[320px] md:w-[400px] aspect-[2/3] rounded-lg overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.9)] border border-white/5 transition-transform duration-700 hover:scale-[1.02]">
                    <img 
                        src={`https://image.tmdb.org/t/p/w500${details.poster_path}`} 
                        className="w-full h-full object-cover" 
                        alt={details.title}
                        referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
                </div>

                {/* Movie Information Extraction */}
                <div className="flex-grow space-y-10">
                    <div className="space-y-6">
                        <div className="flex flex-wrap items-center gap-4">
                            <span className="badge badge-outline border-primary/50 text-primary font-mono tracking-tighter uppercase text-[10px] px-4 py-3 rounded-md">
                                Official Cinematic Entry
                            </span>
                            <div className="flex items-center gap-3 text-xs text-white/40 tracking-[0.3em] uppercase font-bold">
                                {details.genres.slice(0, 3).map(g => g.name).join(' • ')}
                            </div>
                        </div>
                        
                        <div className="space-y-4">
    
                            {details.tagline && (
                                <p className="text-2xl md:text-3xl italic text-slate-400 font-light border-l-4 border-primary/30 pl-8 leading-relaxed max-w-3xl">
                                    "{details.tagline}"
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Integration Metrics Bar */}
                    <div className="flex flex-wrap gap-12 md:gap-20 items-center py-10 border-y border-white/5">
                        <div className="flex flex-col gap-2">
                            <span className="text-[10px] uppercase tracking-[0.4em] text-slate-500 font-black">Archive Score</span>
                            <div className="flex items-baseline gap-2">
                                <span className="text-5xl font-black text-yellow-500 tracking-tighter">{details.vote_average.toFixed(1)}</span>
                                <span className="text-sm text-slate-600 font-bold uppercase tracking-widest">/ 10</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <span className="text-[10px] uppercase tracking-[0.4em] text-slate-500 font-black">Sequence Duration</span>
                            <span className="text-5xl font-black tracking-tighter text-white">
                                {details.runtime || 0}<span className="text-xs font-bold text-slate-600 ml-2 uppercase tracking-widest">Minutes</span>
                            </span>
                        </div>

                        <div className="flex flex-col gap-2">
                            <span className="text-[10px] uppercase tracking-[0.4em] text-slate-500 font-black">Release Window</span>
                            <span className="text-5xl font-black tracking-tighter text-white">
                                {new Date(details.release_date).getFullYear()}
                            </span>
                        </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-xs font-black uppercase tracking-[0.4em] text-white/30">Synopsis</h3>
                      <p className="text-xl text-slate-300 max-w-3xl leading-relaxed font-light">
                          {details.overview}
                      </p>
                    </div>

                    <div className="pt-8">
                        <button 
                            onClick={() => setIsPlayerActive(true)}
                            className="btn btn-primary btn-lg rounded-full px-16 gap-4 shadow-[0_20px_50px_rgba(59,130,246,0.3)] border-none text-white font-black uppercase tracking-[0.2em] transform transition-all duration-500 hover:scale-110 active:scale-95 group"
                        >
                            <Play className="w-6 h-6 fill-current transition-transform group-hover:scale-125" />
                            Play Trailer
                        </button>
                    </div>
                </div>
            </div>

            {/* Sub-Archive Compartments */}
            <div className="mt-32 space-y-32">
                <div className="space-y-12">
                    <div className="flex items-center gap-8">
                        <h2 className="text-5xl font-black uppercase tracking-tighter whitespace-nowrap text-white">Official Media</h2>
                        <div className="flex-1 h-[1px] bg-gradient-to-r from-primary/40 via-primary/10 to-transparent"></div>
                    </div>
                    
                    <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-[0_60px_120px_rgba(0,0,0,0.9)] border border-white/5 transition-all duration-700">
                        {isPlayerActive && trailer &&(
                            <div className="absolute inset-0 w-full h-full">
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
                                    className="absolute top-8 right-8 btn btn-circle btn-sm bg-black/80 border-none text-white hover:bg-primary transition-all duration-300 backdrop-blur-md"
                                >
                                    ×
                                </button>
                            </div>
                    
                   ) }
                    </div>
                </div>

                {/* Metadata Grid Compartment */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <div className="bg-white/5 backdrop-blur-3xl rounded-3xl p-10 border border-white/5 space-y-5 transition-colors duration-500 hover:bg-white/[0.08] hover:border-white/10 group">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-white/20 uppercase tracking-[0.4em] font-black group-hover:text-primary transition-colors">Launch</span>
                      <Calendar className="w-5 h-5 text-primary opacity-30 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <span className="text-3xl font-black tracking-tighter text-white block">
                      {new Date(details.release_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>

                  <div className="bg-white/5 backdrop-blur-3xl rounded-3xl p-10 border border-white/5 space-y-5 transition-colors duration-500 hover:bg-white/[0.08] hover:border-white/10 group">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-white/20 uppercase tracking-[0.4em] font-black group-hover:text-emerald-500 transition-colors">Resources</span>
                      <DollarSign className="w-5 h-5 text-emerald-500 opacity-30 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <span className="text-3xl font-black tracking-tighter text-emerald-400 block uppercase">
                      {details.budget > 0 ? `$${details.budget.toLocaleString()}` : "Confidential"}
                    </span>
                  </div>

                  <div className="bg-white/5 backdrop-blur-3xl rounded-3xl p-10 border border-white/5 space-y-5 transition-colors duration-500 hover:bg-white/[0.08] hover:border-white/10 group">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-white/20 uppercase tracking-[0.4em] font-black group-hover:text-emerald-500 transition-colors">Revenue</span>
                      <TrendingUp className="w-5 h-5 text-emerald-500 opacity-30 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <span className="text-3xl font-black tracking-tighter text-emerald-400 block uppercase">
                      {details.revenue > 0 ? `$${details.revenue.toLocaleString()}` : "Archive Empty"}
                    </span>
                  </div>

                  <div className="bg-white/5 backdrop-blur-3xl rounded-3xl p-10 border border-white/5 space-y-5 transition-colors duration-500 hover:bg-white/[0.08] hover:border-white/10 group">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-white/20 uppercase tracking-[0.4em] font-black group-hover:text-primary transition-colors">Network</span>
                      <Building2 className="w-5 h-5 text-primary opacity-30 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <span className="text-3xl font-black tracking-tighter text-white block truncate uppercase">
                      {details.production_companies[0]?.name || "Independent"}
                    </span>
                  </div>
                </div>
            </div>

            {/* Inline Error Tracking */}
            {error && (
              <div className="mt-20 p-6 rounded-2xl bg-error/10 border border-error/20 flex items-center gap-4 text-error font-mono text-xs uppercase tracking-widest">
                <Info className="w-4 h-4" />
                <span>Warning: Internal Exception Detected - {error}</span>
              </div>
            )}
        </div>
    </div>
    </div>
);
}

export default MovieDetails;
