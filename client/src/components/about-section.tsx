import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function AboutSection() {
  const stats = [
    { value: "50+", label: "Projects Completed", color: "text-blue-400" },
    { value: "5+", label: "Years Experience", color: "text-emerald-400" },
    { value: "25+", label: "Happy Clients", color: "text-violet-400" },
    { value: "15+", label: "Technologies", color: "text-orange-400" }
  ];

  return (
    <section id="about" className="py-20 bg-slate-800/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* About Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-500">
                About Me
              </span>
            </h2>
            
            <div className="space-y-6 text-slate-300 leading-relaxed">
              <p className="text-lg">
                Hello! I'm Alex, a passionate full-stack developer with over 5 years of experience 
                building innovative web applications, automation tools, and custom software solutions.
              </p>
              
              <p>
                My journey started with a fascination for solving complex problems through code. 
                I specialize in creating efficient, scalable applications using modern technologies 
                like React, Node.js, and Python.
              </p>
              
              <p>
                When I'm not coding, you'll find me exploring new technologies, contributing to 
                open-source projects, or sharing knowledge with the developer community through 
                blog posts and technical talks.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center" data-testid={`stat-${index}`}>
                  <div className={`text-3xl font-bold ${stat.color} mb-2`}>
                    {stat.value}
                  </div>
                  <div className="text-slate-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Download Resume Button */}
            <div className="mt-12">
              <Button
                className="bg-gradient-to-r from-blue-500 to-violet-500 text-white px-8 py-4 rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-1"
                data-testid="button-download-resume"
              >
                <Download className="w-4 h-4 mr-3" />
                Download Resume
              </Button>
            </div>
          </div>

          {/* About Image 
          <div className="relative">
            <div className="relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=600"
                alt="Alex Chen - Developer Portrait"
                className="rounded-2xl shadow-2xl w-full h-auto object-cover"
                data-testid="about-image"
              />
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-violet-500/20 rounded-full blur-xl"></div>
            <div className="absolute top-1/2 -right-8 w-16 h-16 bg-emerald-500/20 rounded-full blur-lg"></div>
          </div>

        </div>
      </div>
    </section>
  );
}
