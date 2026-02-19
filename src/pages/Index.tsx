import HeroSection from "@/components/HeroSection";
import MovieRow from "@/components/MovieRow";
import {
  getTrending,
  getPopularMovies,
  getTopRated,
  getNowPlaying,
  getUpcoming,
  getPopularTV,
} from "@/lib/tmdb";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <div className="-mt-24 relative z-10 space-y-8 pb-16">
        <MovieRow title="Trending Now" queryKey="trending-row" queryFn={getTrending} />
        <MovieRow title="Popular Movies" queryKey="popular" queryFn={getPopularMovies} />
        <MovieRow title="Now Playing" queryKey="now-playing" queryFn={getNowPlaying} />
        <MovieRow title="Top Rated" queryKey="top-rated" queryFn={getTopRated} />
        <MovieRow title="Coming Soon" queryKey="upcoming" queryFn={getUpcoming} />
        <MovieRow title="Popular TV Shows" queryKey="popular-tv" queryFn={getPopularTV} />
      </div>
      <footer className="border-t border-border py-8 text-center">
        <p className="text-sm text-muted-foreground">Developed by <span className="font-semibold text-foreground">Shashank M</span></p>
      </footer>
    </div>
  );
};

export default Index;
