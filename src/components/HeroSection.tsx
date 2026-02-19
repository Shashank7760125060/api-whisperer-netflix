import { useQuery } from "@tanstack/react-query";
import { getTrending, getImageUrl, Movie } from "@/lib/tmdb";
import { Play, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const HeroSection = () => {
  const { data } = useQuery({ queryKey: ["trending"], queryFn: getTrending });
  const [featured, setFeatured] = useState<Movie | null>(null);

  useEffect(() => {
    if (data?.results?.length) {
      const moviesWithBackdrop = data.results.filter((m) => m.backdrop_path);
      setFeatured(moviesWithBackdrop[Math.floor(Math.random() * Math.min(5, moviesWithBackdrop.length))]);
    }
  }, [data]);

  if (!featured) {
    return <div className="h-[85vh] w-full bg-background" />;
  }

  return (
    <div className="relative h-[85vh] w-full">
      <div className="absolute inset-0">
        <img
          src={getImageUrl(featured.backdrop_path, "original")}
          alt={featured.title || featured.name || ""}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />
      </div>

      <div className="absolute bottom-[20%] left-4 z-10 max-w-xl space-y-4 md:left-12">
        <h1 className="font-display text-5xl tracking-wide text-foreground md:text-7xl animate-fade-in">
          {featured.title || featured.name}
        </h1>
        <p className="line-clamp-3 text-sm font-light leading-relaxed text-foreground/80 md:text-base animate-fade-in" style={{ animationDelay: "0.1s" }}>
          {featured.overview}
        </p>
        <div className="flex gap-3 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <Button className="gap-2 bg-foreground text-background font-semibold hover:bg-foreground/80 px-6 py-2">
            <Play className="h-5 w-5 fill-current" /> Play
          </Button>
          <Button variant="secondary" className="gap-2 bg-muted/70 text-foreground hover:bg-muted px-6 py-2">
            <Info className="h-5 w-5" /> More Info
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
