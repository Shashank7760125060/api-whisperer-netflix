import { useQuery } from "@tanstack/react-query";
import { getImageUrl, Movie, MovieResponse } from "@/lib/tmdb";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useRef, useState } from "react";

interface MovieRowProps {
  title: string;
  queryKey: string;
  queryFn: () => Promise<MovieResponse>;
}

const MovieRow = ({ title, queryKey, queryFn }: MovieRowProps) => {
  const { data, isLoading } = useQuery({ queryKey: [queryKey], queryFn });
  const rowRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (rowRef.current) {
      const scrollAmount = rowRef.current.clientWidth * 0.75;
      rowRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-3 px-4 md:px-12">
        <div className="h-6 w-40 rounded bg-muted animate-pulse" />
        <div className="flex gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-40 w-28 shrink-0 rounded bg-muted animate-pulse md:h-52 md:w-36" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="group/row space-y-2 px-4 md:px-12">
      <h2 className="font-display text-xl tracking-wide text-foreground md:text-2xl">{title}</h2>
      <div className="relative">
        <button
          onClick={() => scroll("left")}
          className="absolute -left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/80 p-1.5 opacity-0 transition-opacity group-hover/row:opacity-100"
        >
          <ChevronLeft className="h-5 w-5 text-foreground" />
        </button>

        <div ref={rowRef} className="scrollbar-hide flex gap-2 overflow-x-auto">
          {data?.results?.map((movie: Movie) => (
            <div
              key={movie.id}
              className="relative shrink-0 cursor-pointer transition-transform duration-300 hover:scale-105 hover:z-10"
              onMouseEnter={() => setHoveredId(movie.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <img
                src={getImageUrl(movie.poster_path, "w300")}
                alt={movie.title || movie.name || ""}
                className="h-40 w-28 rounded object-cover md:h-52 md:w-36"
                loading="lazy"
              />
              {hoveredId === movie.id && (
                <div className="absolute inset-x-0 bottom-0 rounded-b bg-gradient-to-t from-background via-background/90 to-transparent p-2">
                  <p className="truncate text-xs font-medium text-foreground">{movie.title || movie.name}</p>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-primary text-primary" />
                    <span className="text-xs text-muted-foreground">{movie.vote_average?.toFixed(1)}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          className="absolute -right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/80 p-1.5 opacity-0 transition-opacity group-hover/row:opacity-100"
        >
          <ChevronRight className="h-5 w-5 text-foreground" />
        </button>
      </div>
    </div>
  );
};

export default MovieRow;
