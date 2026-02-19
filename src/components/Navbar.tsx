import { Link } from "react-router-dom";
import { Search } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 z-50 w-full bg-gradient-to-b from-background/90 to-transparent px-4 py-3 md:px-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="font-display text-3xl tracking-wider text-primary">
            MOVIEFLIX
          </Link>
          <div className="hidden items-center gap-5 md:flex">
            {["Home", "TV Shows", "Movies", "New & Popular"].map((item) => (
              <span
                key={item}
                className="cursor-pointer text-sm font-light text-muted-foreground transition-colors hover:text-foreground"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Search className="h-5 w-5 cursor-pointer text-foreground" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
