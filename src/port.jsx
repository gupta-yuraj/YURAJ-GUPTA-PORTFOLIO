import resumeFile from "./assets/Yuraj-cv.pdf";
import React, { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Github,
  Menu,
  X,
  Terminal,
  Shield,
  Cpu,
  Code2,
  Mail,
  Linkedin,
  Download,
  Phone,
  MapPin
} from "lucide-react";

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [visibleSections, setVisibleSections] = useState(() => new Set());
  const [isDownloading, setIsDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

  const contactInfo = {
    email: "guptayuraj10@gmail.com",
    phone: "+91 6362570156",
    github: "https://github.com/gupta-yuraj",
    linkedin: "https://www.linkedin.com/in/yuraj-gupta-576b41313/",
    instagram: "https://www.instagram.com/yurajgupta09/",
    location: "Bangalore, India"
  };

  // ✅ FIXED: reliable mouse tracking (cursor works again)
  useEffect(() => {
    const mql = window.matchMedia("(pointer: fine)");
    const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });

    const add = () => window.addEventListener("mousemove", handleMouseMove);
    const remove = () => window.removeEventListener("mousemove", handleMouseMove);

    if (mql.matches) add();

    const onChange = (e) => (e.matches ? add() : remove());
    if (mql.addEventListener) mql.addEventListener("change", onChange);
    else mql.addListener(onChange);

    return () => {
      remove();
      if (mql.removeEventListener) mql.removeEventListener("change", onChange);
      else mql.removeListener(onChange);
    };
  }, []);

  // Scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      setScrollProgress(scrolled);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Section reveal
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll("section")).filter((s) => s.id);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          setVisibleSections((prev) => {
            if (prev.has(entry.target.id)) return prev;
            const next = new Set(prev);
            next.add(entry.target.id);
            return next;
          });
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

const handleResumeDownload = () => {
  setIsDownloading(true);

  const link = document.createElement("a");
  link.href = resumeFile;   // ✅ use imported file
  link.download = "Yuraj_Gupta_Resume.pdf";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  setTimeout(() => setIsDownloading(false), 1500);
};
  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactInfo.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = contactInfo.email;
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } finally {
        document.body.removeChild(ta);
      }
    }
  };

  const skills = {
    development: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS", "C", "Java Basics"],
    tools: ["Linux (Kali/KDE)", "Git & GitHub", "VS Code", "Netlify"],
    focus: [ "Linux Internals", "Web Security", "System Architecture"]
  };

  const experiences = [
    { company: "Grocers Adda", role: "Customer Satisfaction Intern", duration: "24 days / 90 hours" },
    { company: "Vijaya Steels", role: "HR Recruitment & Inventory Handling", duration: "4 weeks" },
    { company: "Prathik Medicals", role: "Customer Strategies & Operations", duration: "Internship" }
  ];

  const InstagramIcon = ({ className = "w-5 h-5" }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-x-hidden selection:bg-indigo-500 selection:text-white cursor-none">
      {/* ✅ Custom Cursor (shows on desktop; md+ to be safe) */}
      <div
        className="fixed w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] hidden md:block mix-blend-difference transition-transform duration-75"
        style={{ left: mousePosition.x, top: mousePosition.y, transform: "translate(-50%, -50%)" }}
      />
      <div
        className={`fixed w-8 h-8 border border-white rounded-full pointer-events-none z-[9998] hidden md:block transition-all duration-300 ${
          isHovering ? "scale-150 bg-white/10" : ""
        }`}
        style={{ left: mousePosition.x, top: mousePosition.y, transform: "translate(-50%, -50%)" }}
      />

      {/* Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 z-50 transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 px-4 sm:px-6 py-4 sm:py-6 lg:px-12 flex justify-between items-center backdrop-blur-md bg-white/5 border-b border-white/10">
        <div
          className="font-bold text-xl sm:text-2xl tracking-tighter bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent cursor-pointer"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          YG.
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex gap-8 text-sm font-medium tracking-wide items-center">
          {["ABOUT", "EXPERIENCE", "SKILLS", "CONTACT"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="relative group text-white/80 hover:text-white transition-colors"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300" />
            </a>
          ))}

          <button
            type="button"
            onClick={handleResumeDownload}
            className="flex items-center gap-2 px-4 py-2 glass rounded-full hover:bg-white/20 transition-all border border-indigo-400/50 text-indigo-300 hover:text-white text-sm"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <Download className={`w-4 h-4 ${isDownloading ? "animate-bounce" : ""}`} />
            <span>Resume</span>
          </button>
        </div>

        {/* Mobile Nav */}
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          <button
            type="button"
            onClick={handleResumeDownload}
            className="p-2 sm:px-4 sm:py-2 glass rounded-lg border border-indigo-400/50 text-indigo-300 flex items-center gap-2"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <Download className={`w-4 h-4 sm:w-5 sm:h-5 ${isDownloading ? "animate-bounce" : ""}`} />
            <span className="hidden sm:inline text-sm">Resume</span>
          </button>

          <button type="button" className="p-2 glass rounded-lg" onClick={() => setIsMenuOpen((v) => !v)}>
            {isMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-slate-900/98 backdrop-blur-xl z-30 transform transition-transform duration-500 flex flex-col justify-center items-center gap-6 sm:gap-8 lg:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full pointer-events-none"
        }`}
      >
        {["ABOUT", "EXPERIENCE", "SKILLS", "CONTACT"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-2xl sm:text-3xl font-bold text-white/90 hover:text-white"
            onClick={() => setIsMenuOpen(false)}
          >
            {item}
          </a>
        ))}

        <button
          type="button"
          onClick={() => {
            window.open(contactInfo.instagram, "_blank", "noopener,noreferrer");
            setIsMenuOpen(false);
          }}
          className="flex items-center gap-3 text-white/90 hover:text-pink-400"
        >
          <InstagramIcon className="w-6 h-6" />
          <span className="text-2xl font-bold">Instagram</span>
        </button>

        <button
          type="button"
          onClick={() => {
            handleResumeDownload();
            setIsMenuOpen(false);
          }}
          className="flex items-center gap-3 px-6 py-3 glass rounded-full border border-indigo-400/50 text-indigo-300 mt-4"
        >
          <Download className={`w-5 h-5 ${isDownloading ? "animate-bounce" : ""}`} />
          <span className="text-lg">Download Resume</span>
        </button>
      </div>

      {/* Hero */}
      <header className="min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-12 xl:px-24 relative overflow-hidden pt-16 sm:pt-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] lg:w-[800px] lg:h-[800px] bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="mb-4 sm:mb-6 flex flex-wrap items-center gap-2 sm:gap-4">
            <p className="text-white/60 text-xs sm:text-sm md:text-base tracking-widest uppercase font-medium glass inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
              Aspiring IT Intern
            </p>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-none tracking-tighter mb-4 sm:mb-8">
            <span className="block bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
              YURAJ
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              GUPTA
            </span>
          </h1>

          <div className="max-w-2xl mt-6 sm:mt-12 glass p-4 sm:p-6 rounded-xl sm:rounded-2xl">
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 leading-relaxed">
              BBA Graduate from Bangalore University. Passionate about Linux internals, web technologies . Building the bridge between business and technology.
            </p>
          </div>

          <div className="mt-6 sm:mt-12 flex flex-wrap gap-2 sm:gap-4">
            <a
              href="#contact"
              className="group relative px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 bg-white text-slate-900 rounded-full overflow-hidden font-medium flex items-center gap-2 hover:scale-105 transition-transform text-sm sm:text-base"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              Get in Touch
              <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>

            <a
              href={contactInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 glass rounded-full hover:bg-white/20 transition-all duration-300 flex items-center gap-2 text-sm sm:text-base"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <Github className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </div>
        </div>
      </header>

      {/* Marquee */}
      <div className="py-4 sm:py-6 lg:py-8 overflow-hidden glass border-y border-white/10">
        <div className="flex animate-marquee whitespace-nowrap">
          {[0, 1].map((i) => (
            <div
              key={i}
              className="flex items-center gap-4 sm:gap-6 lg:gap-8 text-xl sm:text-3xl md:text-4xl lg:text-6xl font-bold tracking-tighter mx-2 sm:mx-4"
            >
              {["LINUX ENTHUSIAST", "WEB DEVELOPER",  "OPEN SOURCE", "REACT", "TAILWIND", "KALI LINUX"].map(
                (text) => (
                  <span key={`${i}-${text}`} className="flex items-center gap-4 sm:gap-6 lg:gap-8">
                    <span className="text-white/20">•</span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white/80 to-white/40">
                      {text}
                    </span>
                  </span>
                )
              )}
            </div>
          ))}
        </div>
      </div>

      {/* About */}
      <section
        id="about"
        className={`py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-12 xl:px-24 transition-all duration-1000 ${
          visibleSections.has("about") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
          <div className="md:sticky md:top-24 lg:top-32">
            <span className="text-white/50 text-xs sm:text-sm tracking-widest uppercase mb-3 sm:mb-4 block glass w-fit px-3 py-1 rounded-full">
              01 — Profile
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              Bridging Business & Technology
            </h2>
          </div>

          <div className="space-y-4 sm:space-y-6 lg:space-y-8">
            <div className="glass p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl">
              <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed text-white/90">
                Recent BBA (General) graduate from <span className="text-indigo-400 font-semibold">Bangalore University</span>{" "}
                (2022–2025) with a growing passion for IT infrastructure and software development.
              </p>
            </div>

            <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-white/70 glass p-4 sm:p-6 rounded-lg sm:rounded-xl">
              My journey began with curiosity about how machines and software work, which evolved into a dedicated interest
              in <span className="text-indigo-400 font-medium"></span> and{" "}
              <span className="text-indigo-400 font-medium">Linux internals</span>. I thrive in environments where I can
              dissect systems, understand their core mechanics, and build solutions that are both elegant and functional.
            </p>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section
        id="experience"
        className={`py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-12 xl:px-24 transition-all duration-1000 ${
          visibleSections.has("experience") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 sm:mb-12 lg:mb-16">
            <span className="text-white/50 text-xs sm:text-sm tracking-widest uppercase mb-3 sm:mb-4 block glass w-fit px-3 py-1 rounded-full">
              02 — Experience
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              Professional Journey
            </h2>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {experiences.map((exp, index) => (
              <div
                key={`${exp.company}-${index}`}
                className="group glass p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl hover:bg-white/10 transition-all duration-300 cursor-pointer border border-white/5 hover:border-white/20"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2 text-white group-hover:text-indigo-400 transition-colors">
                      {exp.company}
                    </h3>
                    <p className="text-white/60 text-sm sm:text-base lg:text-lg">{exp.role}</p>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-4">
                    <span className="text-white/40 font-mono glass px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                      {exp.duration}
                    </span>
                    <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1 group-hover:-translate-y-1 text-indigo-400" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section
        id="skills"
        className={`py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-12 xl:px-24 transition-all duration-1000 ${
          visibleSections.has("skills") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 sm:mb-12 lg:mb-16 text-center">
            <span className="text-white/50 text-xs sm:text-sm tracking-widest uppercase mb-3 sm:mb-4 block glass w-fit mx-auto px-3 py-1 rounded-full">
              03 — Technical Arsenal
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              Skills & Technologies
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 lg:mb-16">
            {[
              { title: "Development", list: skills.development, icon: <Code2 className="w-5 h-5 sm:w-6 sm:h-6" /> },
              { title: "Tools & Environment", list: skills.tools, icon: <Terminal className="w-5 h-5 sm:w-6 sm:h-6" /> },
              { title: "Focus Areas", list: skills.focus, icon: <Shield className="w-5 h-5 sm:w-6 sm:h-6" /> }
            ].map((category) => (
              <div
                key={category.title}
                className="glass p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 text-indigo-400">
                  {category.icon}
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {category.list.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 rounded-full text-xs sm:text-sm font-medium glass hover:bg-white/20 hover:scale-105 transition-all cursor-default border border-white/10"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className={`py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-12 xl:px-24 relative overflow-hidden transition-all duration-1000 ${
          visibleSections.has("contact") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-indigo-900/50 to-transparent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[600px] lg:h-[600px] bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
            <div>
              <span className="text-white/50 text-xs sm:text-sm tracking-widest uppercase mb-3 sm:mb-4 block glass w-fit px-3 py-1 rounded-full">
                04 — Contact
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 lg:mb-8 leading-tight bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
                Let's Build
                <br />
                Something
                <br />
                Together
              </h2>

              <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="w-full flex items-center gap-3 sm:gap-4 group glass p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-white/10 transition-all cursor-pointer text-left border border-white/10 hover:border-indigo-400/30"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full glass flex items-center justify-center border border-white/10 flex-shrink-0">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="block text-xs sm:text-sm text-white/50 mb-0.5 sm:mb-1">Email (Click to Copy)</span>
                    <span className="text-sm sm:text-base lg:text-lg font-medium text-white truncate block">
                      {copied ? "Copied to clipboard!" : contactInfo.email}
                    </span>
                  </div>
                </button>

                <a
                  href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 sm:gap-4 group glass p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-white/10 transition-all border border-indigo-400/20 hover:border-indigo-400/50"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full glass flex items-center justify-center border border-white/10 flex-shrink-0">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400" />
                  </div>
                  <div>
                    <span className="block text-xs sm:text-sm text-white/50 mb-0.5 sm:mb-1">Phone</span>
                    <span className="text-sm sm:text-base lg:text-lg font-medium text-white">{contactInfo.phone}</span>
                  </div>
                </a>

                <a
                  href={contactInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 sm:gap-4 group glass p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-white/10 transition-all"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full glass flex items-center justify-center border border-white/10 flex-shrink-0">
                    <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <span className="block text-xs sm:text-sm text-white/50 mb-0.5 sm:mb-1">GitHub</span>
                    <span className="text-sm sm:text-base lg:text-lg font-medium text-white">@gupta-yuraj</span>
                  </div>
                </a>

                <a
                  href={contactInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 sm:gap-4 group glass p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-white/10 transition-all"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full glass flex items-center justify-center border border-white/10 flex-shrink-0">
                    <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <span className="block text-xs sm:text-sm text-white/50 mb-0.5 sm:mb-1">LinkedIn</span>
                    <span className="text-sm sm:text-base lg:text-lg font-medium text-white">Yuraj Gupta</span>
                  </div>
                </a>

                <div className="flex items-center gap-3 sm:gap-4 glass p-3 sm:p-4 rounded-lg sm:rounded-xl border border-white/5">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full glass flex items-center justify-center border border-white/10 flex-shrink-0">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-white/60" />
                  </div>
                  <div>
                    <span className="block text-xs sm:text-sm text-white/50 mb-0.5 sm:mb-1">Location</span>
                    <span className="text-sm sm:text-base lg:text-lg font-medium text-white/80">{contactInfo.location}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center mt-8 lg:mt-0">
              <div
                className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 cursor-pointer group"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onClick={() => (window.location.href = `mailto:${contactInfo.email}`)}
              >
                <div className="absolute inset-0 glass rounded-full flex items-center justify-center border border-white/20 group-hover:border-indigo-400/50 transition-all group-hover:scale-105">
                  <div className="text-center z-10 px-4">
                    <span className="block text-xl sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2 text-white">Say Hello</span>
                    <span className="text-white/50 text-xs sm:text-sm">Available for opportunities</span>
                    <div className="mt-3 sm:mt-4 flex items-center justify-center gap-2 text-indigo-400">
                      <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="text-xs sm:text-sm font-medium">{contactInfo.phone}</span>
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 animate-spin-slow">
                  <svg className="w-full h-full" viewBox="0 0 100 100" aria-hidden="true">
                    <path
                      id="circlePath"
                      d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                      fill="none"
                    />
                    <text fontSize="8" fill="rgba(255,255,255,0.4)" className="uppercase tracking-widest">
                      <textPath href="#circlePath">Open to Work • Available for Internship • </textPath>
                    </text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 sm:py-8 px-4 sm:px-6 lg:px-12 border-t border-white/10 glass">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="font-bold text-lg sm:text-xl bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
            YG.
          </div>

          <div className="text-white/40 text-xs sm:text-sm text-center sm:text-left">
            © 2025 Yuraj Gupta. Crafted with curiosity.
          </div>

          <div className="flex gap-3 sm:gap-6">
            {[
              { icon: <Github className="w-4 h-4 sm:w-5 sm:h-5" />, href: contactInfo.github, external: true },
              { icon: <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />, href: contactInfo.linkedin, external: true },
              { icon: <Mail className="w-4 h-4 sm:w-5 sm:h-5" />, href: `mailto:${contactInfo.email}` }
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                target={social.external ? "_blank" : undefined}
                rel={social.external ? "noopener noreferrer" : undefined}
                className="transition-colors p-2 glass rounded-full hover:bg-white/10 text-white/40 hover:text-white"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                {social.icon}
              </a>
            ))}

            <button
              type="button"
              onClick={() => window.open(contactInfo.instagram, "_blank", "noopener,noreferrer")}
              className="hidden sm:flex p-2 glass rounded-full hover:bg-white/10 text-white/40 hover:text-pink-400 transition-colors"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              title="Instagram"
            >
              <InstagramIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Bottom Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-lg border-t border-white/10 p-3 sm:hidden z-40 flex justify-around items-center">
          <button
            type="button"
            onClick={() => (window.location.href = `tel:${contactInfo.phone.replace(/\s/g, "")}`)}
            className="flex flex-col items-center gap-1 text-indigo-400"
          >
            <Phone className="w-5 h-5" />
            <span className="text-[10px]">Call</span>
          </button>

          <button
            type="button"
            onClick={() => window.open(contactInfo.instagram, "_blank", "noopener,noreferrer")}
            className="flex flex-col items-center gap-1 text-white hover:text-pink-400 transition-colors"
          >
            <InstagramIcon className="w-5 h-5 text-white" />
            <span className="text-[10px] text-white">Instagram</span>
          </button>

          <button
            type="button"
            onClick={() => window.open(contactInfo.github, "_blank", "noopener,noreferrer")}
            className="flex flex-col items-center gap-1 text-white"
          >
            <Github className="w-5 h-5 text-white" />
            <span className="text-[10px] text-white">GitHub</span>
          </button>

          <button
            type="button"
            onClick={() => window.open(contactInfo.linkedin, "_blank", "noopener,noreferrer")}
            className="flex flex-col items-center gap-1 text-white"
          >
            <Linkedin className="w-5 h-5 text-white" />
            <span className="text-[10px] text-white">LinkedIn</span>
          </button>
        </div>

        <div className="h-16 sm:hidden" />
      </footer>

      <style>{`
        .glass {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee { animation: marquee 30s linear infinite; }
        .animate-spin-slow { animation: spin 20s linear infinite; }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Portfolio;
