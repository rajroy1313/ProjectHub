import { Github, Linkedin, Twitter, Mail, ChevronUp } from "lucide-react";

export default function TopFooter() {
  const handleScrollToTop = () => {
    const element = document.getElementById("home");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const socialLinks = [
    { icon: <Github />, href: "#", name: "github" },
    { icon: <Linkedin />, href: "#", name: "linkedin" },
    { icon: <Twitter />, href: "#", name: "twitter" },
    { icon: <Mail />, href: "#", name: "email" }
  ];

  return (
    <header className="bg-slate-950 border-b border-slate-800 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          
          {/* Logo and Copyright */}
          <div className="mb-6 md:mb-0">
            <div className="text-xl font-bold text-blue-400 mb-2">
              <span className="font-mono">&lt;</span>ProjectHub<span className="font-mono">/&gt;</span>
            </div>
            <p className="text-slate-400 text-sm">© 2024 ProjectHub. All rights reserved.</p>
          </div>

          {/* Social Links */}
          <div className="flex space-x-6">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-slate-400 hover:text-blue-400 transition-colors duration-200"
                data-testid={`footer-social-${link.name}`}
              >
                {link.icon}
              </a>
            ))}
          </div>

        </div>

        {/* Back to Top Button */}
        <div className="mt-8 text-center">
          <button
            onClick={handleScrollToTop}
            className="inline-flex items-center text-slate-400 hover:text-blue-400 transition-colors duration-200"
            data-testid="button-back-to-top"
          >
            <ChevronUp className="w-4 h-4 mr-2" />
            Back to Top
          </button>
        </div>
      </div>
    </header>
  );
}
