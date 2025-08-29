import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import SearchBar from "@/components/SearchBar";
import { projects, searchProjects, getAllCategories } from "@/data/projects";
import { Sparkles, Code2 } from "lucide-react";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showType, setShowType] = useState<"all" | "project" | "blog">("all");

  const availableCategories = getAllCategories();

  const filteredProjects = useMemo(() => {
    return searchProjects(searchTerm, selectedCategories).filter(
      (p) => showType === "all" || p.type === showType
    );
  }, [searchTerm, selectedCategories, showType]);

  const typeButtons = [
    { label: "All", type: "all", count: projects.length },
    { label: "Projects", type: "project", count: projects.filter(p => p.type === "project").length },
    { label: "Blog", type: "blog", count: projects.filter(p => p.type === "blog").length }
  ];

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategories([]);
    setShowType("all");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background/20 to-background/5" />
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <Sparkles className="w-4 h-4 text-primary mr-2" />
            <span className="text-sm font-medium text-primary">Showcase & Blog Platform</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Projects & Ideas<br /><span className="text-foreground">In Motion</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover innovative projects, insightful articles, and cutting-edge development tutorials. Built with passion, shared with the community.
          </p>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-secondary">
        <div className="max-w-7xl mx-auto">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedCategories={selectedCategories}
            onCategoryChange={setSelectedCategories}
            availableCategories={availableCategories}
          />
          <div className="flex justify-center mt-8">
            <div className="flex bg-card rounded-lg p-1 border border-border/50">
              {typeButtons.map(btn => (
                <Button
                  key={btn.type}
                  variant={showType === btn.type ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setShowType(btn.type as any)}
                  className={showType === btn.type ? "bg-primary text-primary-foreground" : ""}
                >
                  {btn.label} ({btn.count})
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 opacity-50">
                <Code2 className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No results found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your search terms or filters</p>
              <Button variant="outline" onClick={clearFilters}>Clear all filters</Button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">
                    {showType === "all" ? "All Content" : showType === "project" ? "Projects" : "Blog Articles"}
                  </h2>
                  <p className="text-muted-foreground">
                    Showing {filteredProjects.length} result{filteredProjects.length !== 1 ? "s" : ""}
                  </p>
                </div>
                <div className="hidden md:flex flex-wrap gap-2">
                  {availableCategories.slice(0, 4).map(cat => (
                    <Badge
                      key={cat}
                      variant={selectedCategories.includes(cat) ? "default" : "outline"}
                      className={`cursor-pointer transition-all duration-200 ${selectedCategories.includes(cat) ? "bg-primary text-primary-foreground" : "hover:bg-primary/10 border-primary/20"}`}
                      onClick={() => toggleCategory(cat)}
                    >
                      {cat}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map(p => <ProjectCard key={p.id} {...p} />)}
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
