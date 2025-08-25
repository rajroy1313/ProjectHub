import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Github, Twitter, Facebook, ChevronDown } from "lucide-react";
import { FaDiscord } from "react-icons/fa";

export default function HeroSection() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const typingTexts = [
    "Building the future, one line of code at a time...",
    "Specializing in React applications and automation...",
    "Creating efficient solutions for complex problems...",
    "Passionate about clean code and user experience..."
  ];

  useEffect(() => {
    const typeText = () => {
      const currentText = typingTexts[currentTextIndex];
      
      if (isDeleting) {
        setCurrentCharIndex(prev => prev - 1);
      } else {
        setCurrentCharIndex(prev => prev + 1);
      }

      let typeSpeed = isDeleting ? 50 : 100;

      if (!isDeleting && currentCharIndex === currentText.length) {
        typeSpeed = 2000;
        setIsDeleting(true);
      } else if (isDeleting && currentCharIndex === 0) {
        setIsDeleting(false);
        setCurrentTextIndex((prev) => (prev + 1) % typingTexts.length);
      }

      setTimeout(typeText, typeSpeed);
    };

    const timer = setTimeout(typeText, 100);
    return () => clearTimeout(timer);
  }, [currentTextIndex, currentCharIndex, isDeleting, typingTexts]);

  const handleScroll = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-violet-500/10 rounded-full animate-float" style={{ animationDelay: "-2s" }}></div>
        <div className="absolute bottom-40 left-20 w-40 h-40 bg-emerald-500/10 rounded-full animate-float" style={{ animationDelay: "-4s" }}></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="mb-8">
          <img 
            src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200" 
            alt="Developer Profile" 
            className="w-48 h-48 rounded-full mx-auto border-4 border-blue-500/50 shadow-2xl object-cover hover:border-blue-400 transition-all duration-300 hover:scale-105"
            data-testid="profile-image"
          />
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-500">
            ProjectHub
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          Full Stack Developer specializing in{" "}
          <span className="text-blue-400 font-medium">Web Applications,</span>, 
          <span className="text-violet-400 font-medium"> Automation Bots</span>, and{" "}
          <span className="text-emerald-400 font-medium">Developer Utilities</span>
        </p>

        {/* Typing Effect */}
        <div className="mb-12 h-8">
          <span className="text-lg font-mono text-slate-400">
            <span className="text-emerald-400">$</span>{" "}
            <span data-testid="typing-text">
              {typingTexts[currentTextIndex].substring(0, currentCharIndex)}
            </span>
            <span className="animate-pulse">|</span>
          </span>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button
            onClick={() => handleScroll("projects")}
            className="bg-gradient-to-r from-blue-500 to-violet-500 text-white px-8 py-4 rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-1"
            data-testid="button-view-work"
          >
            View My Work
          </Button>
          <Button
            variant="outline"
            onClick={() => handleScroll("contact")}
            className="border-2 border-slate-600 text-slate-300 px-8 py-4 rounded-xl font-medium hover:border-blue-500 hover:text-blue-400 transition-all duration-300 hover:-translate-y-1 bg-transparent"
            data-testid="button-contact"
          >
            Get In Touch
          </Button>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-6">
          <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors duration-200 text-2xl" data-testid="social-github">
            <Github />
          </a>
          <a href="https://discord.gg/gd7UNSfX86" className="text-slate-400 hover:text-blue-400 transition-colors duration-200 text-2xl" data-testid="social-discord">
            <FaDiscord />
          </a>
          <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors duration-200 text-2xl" data-testid="social-twitter">
            <Twitter />
          </a>
          <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors duration-200 text-2xl" data-testid="social-facebook">
            <Facebook />
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="text-slate-400 text-2xl" />
      </div>
    </section>
  );
}
