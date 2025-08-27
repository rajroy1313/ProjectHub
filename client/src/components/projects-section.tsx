import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Download, Bot, BarChart3, Terminal } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: "websites" | "bots" | "utilities";
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
  status: string;
  statusColor: string;
}

const projects: Project[] = [
  {
    id: "portfolio-website",
    title: "Personal Portfolio Website",
    description: "A modern, responsive portfolio website built with React and TypeScript. Features smooth animations, dark/light mode toggle, and optimized performance.",
    image: "/api/placeholder/400/300",
    category: "websites",
    tech: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    liveUrl: "https://yourportfolio.com",
    githubUrl: "https://github.com/yourusername/portfolio",
    status: "Live",
    statusColor: "bg-green-500"
  },
  {
    id: "ecommerce-platform",
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with user authentication, payment processing, inventory management, and admin dashboard.",
    image: "/api/placeholder/400/300",
    category: "websites",
    tech: ["React", "Node.js", "PostgreSQL", "Stripe", "Express"],
    liveUrl: "https://yourstore.com",
    githubUrl: "https://github.com/yourusername/ecommerce",
    status: "Live",
    statusColor: "bg-green-500"
  },
  {
    id: "task-management",
    title: "Task Management App",
    description: "Collaborative task management application with real-time updates, team collaboration features, and project tracking capabilities.",
    image: "/api/placeholder/400/300",
    category: "websites",
    tech: ["React", "Socket.io", "MongoDB", "Express", "JWT"],
    liveUrl: "https://yourtasks.com",
    githubUrl: "https://github.com/yourusername/taskmanager",
    status: "Live",
    statusColor: "bg-green-500"
  },
  {
    id: "weather-dashboard",
    title: "Weather Dashboard",
    description: "Interactive weather dashboard with location-based forecasts, historical data visualization, and severe weather alerts.",
    image: "/api/placeholder/400/300",
    category: "websites",
    tech: ["React", "Chart.js", "OpenWeather API", "Geolocation"],
    liveUrl: "https://yourweather.com",
    githubUrl: "https://github.com/yourusername/weather-dashboard",
    status: "Live",
    statusColor: "bg-green-500"
  },
  {
    id: "blog-platform",
    title: "Blog Platform",
    description: "Content management system with markdown support, SEO optimization, comment system, and analytics dashboard for bloggers.",
    image: "/api/placeholder/400/300",
    category: "websites",
    tech: ["React", "Next.js", "Prisma", "PostgreSQL", "MDX"],
    liveUrl: "https://yourblog.com",
    githubUrl: "https://github.com/yourusername/blog-platform",
    status: "Development",
    statusColor: "bg-yellow-500"
  },
  {
    id: "fitness-tracker",
    title: "Fitness Tracking Website",
    description: "Personal fitness tracking application with workout logging, progress visualization, and social features for motivation.",
    image: "/api/placeholder/400/300",
    category: "websites",
    tech: ["React", "D3.js", "Firebase", "PWA", "Service Workers"],
    liveUrl: "https://yourfitness.com",
    githubUrl: "https://github.com/yourusername/fitness-tracker",
    status: "Beta",
    statusColor: "bg-blue-500"
  }
];

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredProjects = activeFilter === "all" 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const getActionIcon = (category: Project["category"]) => {
    switch (category) {
      case "websites":
        return <ExternalLink className="w-4 h-4 mr-2" />;
      case "bots":
        return <Bot className="w-4 h-4 mr-2" />;
      case "utilities":
        return <Download className="w-4 h-4 mr-2" />;
      default:
        return <ExternalLink className="w-4 h-4 mr-2" />;
    }
  };

  const getActionText = (category: Project["category"]) => {
    switch (category) {
      case "websites":
        return "Live Demo";
      case "bots":
        return "Add Bot";
      case "utilities":
        return "Download";
      default:
        return "View";
    }
  };

  return (
    <section id="projects" className="py-20 bg-slate-800/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-500">
              Featured Projects
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Explore my latest work in web development, automation, and developer tools
          </p>
        </div>

        {/* Project Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {[
            { key: "all", label: "All Projects" },
            { key: "websites", label: "Websites" },
            { key: "bots", label: "Bots" },
            { key: "utilities", label: "Utilities" }
          ].map((filter) => (
            <Button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeFilter === filter.key
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
              data-testid={`filter-${filter.key}`}
            >
              {filter.label}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10"
              data-testid={`project-card-${project.id}`}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className={`absolute top-4 right-4 ${project.statusColor} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                  {project.status}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-slate-300 mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>
                
                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <Badge
                      key={tech}
                      variant="outline"
                      className="bg-blue-500/20 text-blue-400 border-blue-500/30 px-3 py-1 rounded-full text-xs font-medium"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-4">
                  <Button
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-medium transition-colors duration-200"
                    data-testid={`button-demo-${project.id}`}
                  >
                    {getActionIcon(project.category)}
                    {getActionText(project.category)}
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border border-slate-600 hover:border-blue-500 hover:text-blue-400 text-slate-300 py-2 rounded-lg font-medium transition-all duration-200 bg-transparent"
                    data-testid={`button-code-${project.id}`}
                  >
                    <Github className="w-4 h-4 mr-2" />
                    Code
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <Button
            className="bg-gradient-to-r from-blue-500 to-violet-500 text-white px-8 py-4 rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-1"
            data-testid="button-load-more"
          >
            View More Projects
          </Button>
        </div>
      </div>
    </section>
  );
}
