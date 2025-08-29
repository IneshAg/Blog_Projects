import { useParams, Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getProjectById } from "@/data/projects";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  ExternalLink, 
  Github, 
  User,
  Share2,
  Heart,
  BookOpen
} from "lucide-react";

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  if (!id) {
    return <Navigate to="/" replace />;
  }
  
  const project = getProjectById(id);
  
  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
            <p className="text-muted-foreground mb-8">The project you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Button variant="ghost" asChild className="mb-4">
              <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            
            <div className="flex items-center space-x-2 mb-4">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                {project.category}
              </Badge>
              <Badge variant="outline" className="border-border/50">
                {project.type === "project" ? "Project" : "Article"}
              </Badge>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              {project.title}
            </h1>
            
            <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
              {project.description}
            </p>
            
            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(project.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              
              {project.author && (
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  {project.author}
                </div>
              )}
              
              {project.readTime && (
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {project.readTime}
                </div>
              )}
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              {project.demoUrl && (
                <Button asChild className="bg-gradient-primary hover:shadow-glow">
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Live Demo
                  </a>
                </Button>
              )}
              
              {project.githubUrl && (
                <Button variant="outline" asChild className="border-primary/20 hover:bg-primary/10">
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    View Source
                  </a>
                </Button>
              )}
              
              <Button variant="ghost" className="hover:bg-primary/10">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              
              <Button variant="ghost" className="hover:bg-primary/10">
                <Heart className="w-4 h-4 mr-2" />
                Like
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-xl shadow-card">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-64 md:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-card shadow-card border-border/50">
            <CardContent className="p-8 md:p-12">
              <div className="prose prose-lg prose-invert max-w-none">
                <div className="whitespace-pre-wrap text-foreground leading-relaxed">
                  {project.content.split('\n').map((paragraph, index) => {
                    if (paragraph.startsWith('# ')) {
                      return (
                        <h1 key={index} className="text-3xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
                          {paragraph.replace('# ', '')}
                        </h1>
                      );
                    } else if (paragraph.startsWith('## ')) {
                      return (
                        <h2 key={index} className="text-2xl font-semibold mb-4 text-foreground mt-8">
                          {paragraph.replace('## ', '')}
                        </h2>
                      );
                    } else if (paragraph.startsWith('### ')) {
                      return (
                        <h3 key={index} className="text-xl font-semibold mb-3 text-foreground mt-6">
                          {paragraph.replace('### ', '')}
                        </h3>
                      );
                    } else if (paragraph.startsWith('- ') || paragraph.startsWith('* ')) {
                      return (
                        <li key={index} className="mb-2 text-muted-foreground ml-4">
                          {paragraph.replace(/^[-*] /, '')}
                        </li>
                      );
                    } else if (paragraph.match(/^\d+\. /)) {
                      return (
                        <li key={index} className="mb-2 text-muted-foreground ml-4 list-decimal">
                          {paragraph.replace(/^\d+\. /, '')}
                        </li>
                      );
                    } else if (paragraph.trim() === '') {
                      return <br key={index} />;
                    } else {
                      return (
                        <p key={index} className="mb-4 text-muted-foreground leading-relaxed">
                          {paragraph}
                        </p>
                      );
                    }
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>


          

      <Footer />
    </div>
  );
};

export default ProjectDetail;