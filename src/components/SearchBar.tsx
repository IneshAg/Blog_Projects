import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
}

const SearchBar = ({
  searchTerm,
  onSearchChange,
  selectedCategories,
  onCategoryChange,
}: SearchBarProps) => {
  const clearFilters = () => {
    onSearchChange("");
    onCategoryChange([]);
  };

  const hasActiveFilters =
    searchTerm || selectedCategories.length > 0;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search projects and articles..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-10 h-12 bg-card border-border/50 focus:border-primary/50 transition-colors duration-200"
        />
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-destructive"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {selectedCategories.map((category) => (
            <Badge
              key={`category-${category}`}
              variant="secondary"
              className="bg-primary/10 text-primary border-primary/20"
            >
              Category: {category}
              <Button
                variant="ghost"
                size="sm"
                className="ml-1 h-auto p-0 text-primary hover:text-primary-glow"
                onClick={() =>
                  onCategoryChange(selectedCategories.filter((c) => c !== category))
                }
              >
                <X className="w-3 h-3" />
              </Button>
            </Badge>
          ))}
                  </div>
      )}
    </div>
  );
};

export default SearchBar;
