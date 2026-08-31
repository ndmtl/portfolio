import React, { useState, useEffect, useRef } from 'react';
import { Menu, ChevronUp } from 'lucide-react';

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const projectsRef = useRef([]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const backgroundColor = `hsl(${scrollY / 2 % 360}, 70%, 90%)`;
  
  const projects = [
    { id: 1, color: '#FF6B6B' },
    { id: 2, color: '#4ECDC4' },
    { id: 3, color: '#45B7D1' },
    { id: 4, color: '#96CEB4' },
    { id: 5, color: '#FFEEAD' },
    { id: 6, color: '#D4A5A5' },
    { id: 7, color: '#FFB6B6' },
    { id: 8, color: '#B6FFB6' },
    { id: 9, color: '#B6B6FF' }
  ];

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor }}>
      <div className="w-[90%] mx-auto">
        <header className="flex justify-between items-center py-6">
          <h1 className="text-2xl font-bold">Your Name</h1>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
            <Menu size={24} />
          </button>
        </header>

        <section className="h-screen flex flex-col justify-center items-center text-center">
          <h2 className="text-6xl font-bold mb-4">Creative Developer</h2>
          <p className="text-xl">Turning ideas into digital experiences</p>
        </section>

        <section className="columns-1 md:columns-2 lg:columns-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={el => projectsRef.current[index] = el}
              className="mb-6 w-[300px] h-[300px] opacity-0 -translate-x-full transition-all duration-700 break-inside-avoid"
              style={{ 
                backgroundColor: project.color,
                borderRadius: '8px'
              }}
            />
          ))}
        </section>

        <footer className="h-screen flex items-center justify-center">
          <h2 className="text-6xl font-bold">Let's talk!</h2>
        </footer>
      </div>

      <button 
        onClick={handleScrollTop}
        className="fixed bottom-8 right-8 bg-black text-white p-4 rounded-full shadow-lg hover:bg-gray-800 transition-colors"
      >
        <ChevronUp size={24} />
      </button>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <nav className="text-white text-2xl space-y-8">
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-6 right-[5%] text-white"
            >
              Close
            </button>
            <ul className="space-y-4">
              <li><a href="#" className="hover:text-gray-300">Home</a></li>
              <li><a href="#" className="hover:text-gray-300">Projects</a></li>
              <li><a href="#" className="hover:text-gray-300">About</a></li>
              <li><a href="#" className="hover:text-gray-300">Contact</a></li>
            </ul>
          </nav>
        </div>
      )}

      <style jsx>{`
        [class*="scroll-up"] {
          opacity: 0 !important;
          transform: translateX(100%) !important;
        }
        [class*="scroll-down"] {
          opacity: 1 !important;
          transform: translateX(0) !important;
        }
      `}</style>

      <script dangerouslySetInnerHTML={{__html: `
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('scroll-down');
              entry.target.classList.remove('scroll-up');
            } else {
              entry.target.classList.add('scroll-up');
              entry.target.classList.remove('scroll-down');
            }
          });
        }, {
          threshold: 0.1
        });

        document.querySelectorAll('section > div').forEach(card => {
          observer.observe(card);
        });
      `}} />
    </div>
  );
};

export default HomePage;