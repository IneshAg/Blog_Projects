import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ExternalLink, Github, Eye } from "lucide-react";

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  date: string;
  demoUrl?: string;
  githubUrl?: string;
  type: "project" | "blog";
}

const ProjectCard = ({
  id,
  title,
  description,
  image,
  category,
  date,
  demoUrl,
  githubUrl,
  type
}: ProjectCardProps) => {
  return (
    <Card className="group overflow-hidden bg-gradient-card shadow-card hover:shadow-elegant transition-all duration-300 hover:scale-[1.02] border-border/50">
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-4 left-4">
          <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
            {category}
          </Badge>
        </div>
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex space-x-2">
            {demoUrl && (
              <Button size="sm" variant="secondary" className="bg-background/80 backdrop-blur-sm" asChild>
                <a href={demoUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-3 h-3" />
                </a>
              </Button>
            )}
            {githubUrl && (
              <Button size="sm" variant="secondary" className="bg-background/80 backdrop-blur-sm" asChild>
                <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="w-3 h-3" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <Calendar className="w-4 h-4 mr-1" />
          {new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
          })}
        </div>
        <CardTitle className="text-xl group-hover:text-primary transition-colors duration-200 line-clamp-2">
          {title}
        </CardTitle>
        <CardDescription className="line-clamp-3">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-0">
        <Button asChild variant="ghost" className="w-full justify-start p-0 h-auto text-primary hover:text-primary-glow">
          <Link to={`/${type}/${id}`} className="flex items-center">
            <Eye className="w-4 h-4 mr-2" />
            {type === "project" ? "View Project" : "Read Article"}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
