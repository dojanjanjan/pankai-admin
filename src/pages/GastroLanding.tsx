import { useState, useEffect, useRef } from 'react';
import { 
  Zap, 
  Database, 
  MessageSquare, 
  BarChart3, 
  CheckCircle2,
  ArrowRight,
  Mail,
  Instagram,
  Cpu,
  Layout,
  Layers,
  Users,
  Loader2,
  ShieldCheck,
  TrendingUp,
  Table,
  Cloud,
  Sparkles,
  MousePointer2,
  Smartphone,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Phone,
  Menu,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { supabase } from '../lib/supabase';
import LegalModal from '../components/LegalModal';

export default function GastroLanding() {
  const { language } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success?: boolean; message?: string } | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [modalType, setModalType] = useState<'imprint' | 'privacy' | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (window.scrollY / windowHeight) * 100;
      setScrollProgress(scrolled);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % 5);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleMenuClick = (href: string) => {
    setMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const formData = new FormData(e.currentTarget);
    
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      company: formData.get('company'),
      message: formData.get('message'),
      services: ['Gastro Landing Page Lead'],
      language: 'de'
    };

    try {
      const { error } = await supabase.functions.invoke('youncreatives_send-contact-form', {
        body: data,
      });

      if (error) throw error;

      setSubmitStatus({
        success: true,
        message: 'Vielen Dank! Wir haben Ihre Anfrage erhalten und melden uns in Kürze.'
      });
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      console.error('Error submitting form:', err);
      setSubmitStatus({
        success: false,
        message: 'Es gab ein Problem beim Senden. Bitte versuchen Sie es später erneut oder schreiben Sie uns direkt.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="top" className="bg-[#050505] text-white min-h-screen font-sans selection:bg-[#E8DEC8] selection:text-black overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#E8DEC8]/5 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#E8DEC8]/3 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled ? 'bg-black/40 backdrop-blur-2xl border-b border-white/5 py-3 md:py-4' : 'bg-transparent py-4 md:py-6 lg:py-8'}`}>
        <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-[#E8DEC8] to-transparent transition-all duration-300" style={{ width: `${scrollProgress}%` }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          <a href="/" className="text-base sm:text-lg md:text-xl font-light tracking-[0.2em] sm:tracking-[0.3em] uppercase leading-none flex items-center hover:text-[#E8DEC8] transition-all duration-500 group">
            young <span className="font-semibold text-gradient ml-1 sm:ml-2 group-hover:tracking-[0.3em] sm:group-hover:tracking-[0.4em] transition-all duration-500">creatives</span>
          </a>
          <div className="flex items-center gap-4">
            <a href="#contact" className="hidden md:flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 md:px-8 py-2.5 md:py-3 rounded-full text-xs md:text-sm font-medium hover:bg-white hover:text-black transition-all duration-500 group">
              Jetzt Demo anfragen
              <ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 relative z-[51]"
              aria-label="Menu"
            >
              {menuOpen ? (
                <X className="w-5 h-5 md:w-6 md:h-6 text-white" />
              ) : (
                <Menu className="w-5 h-5 md:w-6 md:h-6 text-white" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Menu Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[90] transition-opacity duration-500"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile & Desktop Menu */}
      <div
        ref={menuRef}
        className={`fixed top-0 right-0 h-full w-full md:w-96 bg-black/25 backdrop-blur-xl border-l border-white/20 shadow-2xl z-[100] transform transition-transform duration-500 ease-in-out ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Close Button inside Menu */}
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-4 right-4 md:top-6 md:right-6 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-300 z-10"
          aria-label="Close menu"
        >
          <X className="w-5 h-5 md:w-6 md:h-6 text-white" />
        </button>

        <div className="flex flex-col h-full pt-20 md:pt-24 px-6 md:px-8">
          <nav className="flex flex-col gap-6 md:gap-8">
            <button
              onClick={() => handleMenuClick('#top')}
              className="text-left text-lg md:text-xl font-medium text-white/80 hover:text-[#E8DEC8] transition-colors duration-300 py-2"
            >
              Start
            </button>
            <button
              onClick={() => handleMenuClick('#vision')}
              className="text-left text-lg md:text-xl font-medium text-white/80 hover:text-[#E8DEC8] transition-colors duration-300 py-2"
            >
              Vision & Strategie
            </button>
            <button
              onClick={() => handleMenuClick('#project')}
              className="text-left text-lg md:text-xl font-medium text-white/80 hover:text-[#E8DEC8] transition-colors duration-300 py-2"
            >
              Live-Projekt
            </button>
            <button
              onClick={() => handleMenuClick('#automatisierung')}
              className="text-left text-lg md:text-xl font-medium text-white/80 hover:text-[#E8DEC8] transition-colors duration-300 py-2"
            >
              Automatisierung
            </button>
            <button
              onClick={() => handleMenuClick('#ux-ki')}
              className="text-left text-lg md:text-xl font-medium text-white/80 hover:text-[#E8DEC8] transition-colors duration-300 py-2"
            >
              UX & KI
            </button>
            <button
              onClick={() => handleMenuClick('#performance')}
              className="text-left text-lg md:text-xl font-medium text-white/80 hover:text-[#E8DEC8] transition-colors duration-300 py-2"
            >
              Performance & SEO
            </button>
            <button
              onClick={() => handleMenuClick('#contact')}
              className="text-left text-lg md:text-xl font-medium text-white/80 hover:text-[#E8DEC8] transition-colors duration-300 py-2"
            >
              Kontakt
            </button>
          </nav>
          <div className="mt-auto pb-8">
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full bg-[#E8DEC8] text-black px-8 py-4 rounded-full text-base md:text-lg font-bold hover:bg-white transition-all duration-500 group"
            >
              Jetzt Demo anfragen
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 lg:pt-64 lg:pb-48 overflow-hidden">
        {/* Background Image with Ken Burns Effect */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/yc_grandebeach_01.webp"
            alt="Grande Beach Café"
            className="absolute inset-0 w-full h-full object-cover animate-ken-burns"
            style={{
              filter: 'contrast(1.1) brightness(0.75)',
            }}
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/80"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 md:px-6 md:py-2.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 mb-8 md:mb-12 animate-fadeIn shadow-2xl">
            <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-[#E8DEC8]" />
            <span className="text-[9px] md:text-[10px] font-bold tracking-[0.15em] md:tracking-[0.2em] uppercase text-[#E8DEC8]">Referenz: Grande Beach Café Scharbeutz</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 md:mb-10 leading-[1.1] md:leading-[1] animate-fadeIn px-2" style={{ animationDelay: '0.2s' }}>
            Schluss mit 2€ pro Gast <br className="hidden lg:block" /> an <span className="text-gradient">Portale.</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl lg:text-2xl text-white mb-10 md:mb-16 leading-relaxed font-light animate-fadeIn px-4" style={{ animationDelay: '0.4s' }}>
            Ihr eigenes Reservierungssystem – provisionsfrei & vollautomatisch. <br className="hidden md:block" />
            Holen Sie sich die Unabhängigkeit zurück, die Grande Beach groß gemacht hat.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 animate-fadeIn px-4" style={{ animationDelay: '0.6s' }}>
            <a href="#contact" className="w-full sm:w-auto bg-[#E8DEC8] text-black px-5 py-2.5 md:px-8 md:py-3.5 rounded-full text-sm md:text-base font-bold hover:bg-white transition-all duration-500 shadow-[0_0_40px_rgba(232,222,200,0.2)] hover:shadow-[0_0_60px_rgba(232,222,200,0.3)]">
              Jetzt Demo anfragen
            </a>
            <a href="#vision" className="w-full sm:w-auto px-5 py-2.5 md:px-8 md:py-3.5 rounded-full text-sm md:text-base font-bold bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all duration-500">
              Case Study ansehen
            </a>
          </div>
        </div>
      </section>

      {/* Section 1: Vision & Strategie */}
      <section id="vision" className="py-16 md:py-24 lg:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-center">
            <div className="space-y-8 md:space-y-12">
              <div className="space-y-4 md:space-y-6">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">Vom Kostenfaktor zum <br /><span className="text-[#E8DEC8]">Profit-Center.</span></h2>
                <p className="text-white/40 text-base md:text-lg leading-relaxed font-light">
                  Wir transformieren Ihre digitale Präsenz von einer "Visitenkarte" in eine Verkaufsmaschine. Sparen Sie Provisionen und generieren Sie Umsatz, auch wenn geschlossen ist.
                </p>
              </div>
              
              <div className="glassmorphism p-6 md:p-8 lg:p-10 rounded-2xl md:rounded-3xl lg:rounded-[40px] border border-white/10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 md:p-6 lg:p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                  <ShieldCheck className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 text-[#E8DEC8]" />
                </div>
                <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-[#E8DEC8] block mb-3 md:mb-4">Ihr Geld-Vorteil</span>
                <p className="text-base md:text-lg lg:text-xl text-white/90 leading-relaxed font-medium italic">
                  "Rechnen Sie mal nach: 200 Reservierungen im Monat über Portale kosten schnell 400€+. Unser System gehört Ihnen. 0€ Provision. Für immer."
                </p>
              </div>

              <a 
                href="https://grandebeach-cafe.de" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 md:gap-3 px-6 py-3 md:px-8 md:py-4 rounded-full bg-[#E8DEC8]/10 backdrop-blur-xl border border-[#E8DEC8]/20 hover:bg-[#E8DEC8] hover:text-black transition-all duration-500 group text-sm md:text-base"
              >
                <span className="font-semibold text-[#E8DEC8] group-hover:text-black transition-colors">Live-Projekt besuchen</span>
                <ExternalLink className="w-4 h-4 md:w-5 md:h-5 text-[#E8DEC8] group-hover:text-black transition-colors group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>
            
            <div className="grid gap-6 md:gap-8">
              <div className="glassmorphism p-6 md:p-8 rounded-2xl md:rounded-3xl border border-white/10 hover:bg-white/5 transition-all duration-500">
                <div className="flex gap-4 md:gap-6 items-start">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-[#E8DEC8]/10 flex items-center justify-center text-[#E8DEC8] flex-shrink-0">
                    <TrendingUp className="w-6 h-6 md:w-7 md:h-7" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Schlaf-Umsatz (Gutscheine)</h3>
                    <p className="text-white/40 text-xs md:text-sm leading-relaxed mb-3 md:mb-4">Integrierter Gutschein-Shop mit PDF-Automatik. Verkaufen Sie Geschenke zu Weihnachten, ohne den Laden aufzuschließen.</p>
                    <p className="text-[#E8DEC8] text-[10px] md:text-xs font-semibold italic">Sofortige Liquidität direkt auf Ihr Konto.</p>
                  </div>
                </div>
              </div>

              <div className="glassmorphism p-6 md:p-8 rounded-2xl md:rounded-3xl border border-white/10 hover:bg-white/5 transition-all duration-500">
                <div className="flex gap-4 md:gap-6 items-start">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-[#E8DEC8]/10 flex items-center justify-center text-[#E8DEC8] flex-shrink-0">
                    <MessageSquare className="w-6 h-6 md:w-7 md:h-7" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">KI-Personal "Linda"</h3>
                    <p className="text-white/40 text-xs md:text-sm leading-relaxed mb-3 md:mb-4">Beantwortet Fragen zu Allergenen, Parkplätzen und Reservierungen 24/7. Kein Telefonklingeln im Service mehr.</p>
                    <p className="text-[#E8DEC8] text-[10px] md:text-xs font-semibold italic">Spart ca. 15-20 Min Service-Zeit pro Tag.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Project Showcase */}
      <section id="project" className="py-12 md:py-20 lg:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="glassmorphism p-6 md:p-12 lg:p-16 xl:p-24 rounded-3xl md:rounded-[48px] lg:rounded-[64px] border border-white/10 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#E8DEC8]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            
            <div className="relative z-10 grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
              <div className="space-y-6 md:space-y-8">
                <div className="space-y-3 md:space-y-4">
                  <span className="inline-block px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-[#E8DEC8]/10 border border-[#E8DEC8]/20 text-[#E8DEC8] text-[10px] md:text-xs font-bold uppercase tracking-widest">
                    Live-Projekt
                  </span>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                    Erleben Sie das <br />
                    <span className="text-[#E8DEC8]">Grande Beach Café</span> <br />
                    in Aktion.
                  </h2>
                  <p className="text-white/50 text-base md:text-lg leading-relaxed font-light">
                    Besuchen Sie die Website und erleben Sie selbst, wie moderne Technologie und herausragendes Design zusammenkommen.
                  </p>
                </div>

                <a 
                  href="https://grandebeach-cafe.de" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 md:gap-4 px-6 py-3 md:px-10 md:py-5 rounded-full bg-[#E8DEC8] text-black font-bold text-base md:text-lg hover:bg-white transition-all duration-500 shadow-[0_0_40px_rgba(232,222,200,0.3)] hover:shadow-[0_0_60px_rgba(232,222,200,0.4)] group"
                >
                  <span>Zur Website</span>
                  <ExternalLink className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              </div>

              <div className="relative">
                <a 
                  href="https://grandebeach-cafe.de" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block aspect-video rounded-2xl md:rounded-3xl lg:rounded-[40px] overflow-hidden border border-white/10 bg-black shadow-2xl relative group/iframe hover:border-[#E8DEC8]/50 transition-all duration-500"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10 pointer-events-none"></div>
                  <img 
                    src="/images/yc_grandebeach_01.webp" 
                    alt="Grande Beach Café Website Preview" 
                    className="w-full h-full object-cover opacity-80 group-hover/iframe:opacity-95 transition-opacity duration-500"
                  />
                </a>
                <a 
                  href="https://grandebeach-cafe.de" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="absolute -bottom-12 md:-bottom-16 lg:-bottom-20 -right-3 md:-right-6 bg-gray-800 p-4 md:p-6 rounded-2xl md:rounded-3xl border border-white/30 hidden lg:block shadow-2xl z-50 hover:bg-gray-700 hover:border-[#E8DEC8]/50 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center gap-2 md:gap-3 mb-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white">Live & Online</span>
                  </div>
                  <div className="text-xl md:text-2xl font-bold text-[#E8DEC8]">grandebeach-cafe.de</div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery Carousel Section */}
      <section className="py-16 md:py-24 lg:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 md:mb-14 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 px-2">
              Das Grande Beach Café <br />
              <span className="text-[#E8DEC8]">in Bildern</span>
            </h2>
            <p className="text-white/50 text-base md:text-lg font-light max-w-2xl mx-auto px-4">
              Erleben Sie die Atmosphäre und das Ambiente unseres Referenzprojekts
            </p>
          </div>

          <div className="relative">
            <div 
              ref={carouselRef}
              className="overflow-hidden rounded-2xl md:rounded-3xl lg:rounded-[40px] relative group"
              onTouchStart={(e) => {
                setIsDragging(true);
                setStartX(e.touches[0].clientX);
              }}
              onTouchMove={(e) => {
                if (!isDragging) return;
                const diff = startX - e.touches[0].clientX;
                if (Math.abs(diff) > 50) {
                  if (diff > 0) {
                    setCurrentImageIndex((prev) => (prev + 1) % 5);
                  } else {
                    setCurrentImageIndex((prev) => (prev - 1 + 5) % 5);
                  }
                  setIsDragging(false);
                }
              }}
              onTouchEnd={() => setIsDragging(false)}
            >
              <div 
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
              >
                {[2, 3, 4, 1, 5].map((imageNum, index) => (
                  <div 
                    key={index}
                    className="w-full flex-shrink-0 relative"
                  >
                    <div className="aspect-[16/10] relative overflow-hidden">
                      <img
                        src={`/images/yc_grandebeach_0${imageNum}.webp`}
                        alt={`Grande Beach Café ${index + 1}`}
                        className="w-full h-full object-cover"
                        loading={index === 0 ? "eager" : "lazy"}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={() => setCurrentImageIndex((prev) => (prev - 1 + 5) % 5)}
                className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-xl border border-white/20 p-2.5 md:p-4 rounded-full hover:bg-white/20 transition-all duration-300 opacity-0 group-hover:opacity-100"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-4 h-4 md:w-6 md:h-6 text-white" />
              </button>
              <button
                onClick={() => setCurrentImageIndex((prev) => (prev + 1) % 5)}
                className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-xl border border-white/20 p-2.5 md:p-4 rounded-full hover:bg-white/20 transition-all duration-300 opacity-0 group-hover:opacity-100"
                aria-label="Next image"
              >
                <ChevronRight className="w-4 h-4 md:w-6 md:h-6 text-white" />
              </button>

              {/* Dots Indicator */}
              <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 md:gap-3">
                {[0, 1, 2, 3, 4].map((index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`transition-all duration-300 rounded-full ${
                      currentImageIndex === index
                        ? 'w-3 md:w-8 h-1 md:h-2 bg-[#E8DEC8]'
                        : 'w-1 md:w-2 h-1 md:h-2 bg-white/40 hover:bg-white/60'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Automatisierung & Content */}
      <section id="automatisierung" className="py-16 md:py-24 lg:py-32 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-20 lg:mb-24">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 lg:mb-8 px-2">Volle Kontrolle <span className="text-gradient">ohne IT-Stress.</span></h2>
            <p className="text-white/40 max-w-2xl mx-auto text-base md:text-lg font-light px-4">Komplizierte Systeme gehören der Vergangenheit an. Steuern Sie Ihr Restaurant einfach per Smartphone.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
            <div className="glassmorphism p-6 md:p-8 lg:p-10 rounded-3xl md:rounded-[40px] lg:rounded-[48px] border border-white/10 flex flex-col h-full group hover:border-[#E8DEC8]/30 transition-all duration-700">
              <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-2xl md:rounded-3xl bg-[#E8DEC8]/10 flex items-center justify-center text-[#E8DEC8] mb-6 md:mb-8 lg:mb-10 group-hover:scale-110 transition-transform duration-500">
                <Table className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Google Sheets Sync</h3>
              <p className="text-white/40 mb-6 md:mb-8 lg:mb-10 leading-relaxed font-light text-sm md:text-base">Ändern Sie Preise oder Gerichte einfach in einer Google-Tabelle oder über das Headless CMS. Die Website aktualisiert sich automatisch.</p>
              <div className="mt-auto pt-6 md:pt-8 border-t border-white/5">
                <p className="text-white/90 font-medium italic text-xs md:text-sm">"So einfach wie eine Excel-Liste. Keine Einarbeitung in komplexe Systeme nötig."</p>
              </div>
            </div>

            <div className="glassmorphism p-6 md:p-8 lg:p-10 rounded-3xl md:rounded-[40px] lg:rounded-[48px] border border-white/10 flex flex-col h-full group hover:border-[#E8DEC8]/30 transition-all duration-700">
              <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-2xl md:rounded-3xl bg-[#E8DEC8]/10 flex items-center justify-center text-[#E8DEC8] mb-6 md:mb-8 lg:mb-10 group-hover:scale-110 transition-transform duration-500">
                <BarChart3 className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Admin Dashboard</h3>
              <p className="text-white/40 mb-6 md:mb-8 lg:mb-10 leading-relaxed font-light text-sm md:text-base">Alle Reservierungen, Anfragen, Bestellungen und Analytics an einem zentralen Ort – übersichtlich und mobil.</p>
              <div className="mt-auto pt-6 md:pt-8 border-t border-white/5">
                <p className="text-white/90 font-medium italic text-xs md:text-sm">"Behalten Sie den vollen Überblick über Ihren Umsatz und Ihre Gäste, ohne IT-Experte zu sein."</p>
              </div>
            </div>

            <div className="glassmorphism p-6 md:p-8 lg:p-10 rounded-3xl md:rounded-[40px] lg:rounded-[48px] border border-white/10 flex flex-col h-full group hover:border-[#E8DEC8]/30 transition-all duration-700">
              <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-2xl md:rounded-3xl bg-[#E8DEC8]/10 flex items-center justify-center text-[#E8DEC8] mb-6 md:mb-8 lg:mb-10 group-hover:scale-110 transition-transform duration-500">
                <Cloud className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Cloud Hosting</h3>
              <p className="text-white/40 mb-6 md:mb-8 lg:mb-10 leading-relaxed font-light text-sm md:text-base">Serverlose Architektur, die mitwächst. Stabil bei 10 oder 10.000 gleichzeitigen Zugriffen.</p>
              <div className="mt-auto pt-6 md:pt-8 border-t border-white/5">
                <p className="text-white/90 font-medium italic text-xs md:text-sm">"Kein eigener Server nötig. Ihre Seite bleibt immer online und stabil, egal wie groß der Ansturm ist."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: User Experience & KI */}
      <section id="ux-ki" className="py-16 md:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="aspect-square rounded-3xl md:rounded-[48px] lg:rounded-[60px] overflow-hidden border border-white/10 bg-black shadow-2xl relative group">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#E8DEC8]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <img 
                  src="/images/yc_grandebeach_02.webp" 
                  alt="Grande Beach Café" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 lg:bottom-10 lg:left-10 lg:right-10 bg-blue-600/90 backdrop-blur-md p-4 md:p-6 lg:p-8 rounded-2xl md:rounded-3xl border border-blue-400/30 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                  <div className="flex items-center gap-2 md:gap-3 lg:gap-4 mb-2 md:mb-3">
                    <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white">KI-Chatbot Linda ist online</span>
                  </div>
                  <p className="text-xs md:text-sm text-white italic">"Hallo! Ich kann Ihnen bei Reservierungen helfen oder den passenden Wein zu Ihrem Gericht empfehlen."</p>
                </div>
              </div>
            </div>

            <div className="space-y-8 md:space-y-10 lg:space-y-12 order-1 lg:order-2">
              <div className="space-y-4 md:space-y-6">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">Das Erlebnis <br /><span className="text-[#E8DEC8]">beginnt online.</span></h2>
                <p className="text-white/40 text-base md:text-lg leading-relaxed font-light">
                  Wir nutzen künstliche Intelligenz und Gamification, um Ihre Gäste schon vor dem Besuch zu begeistern.
                </p>
              </div>

              <div className="space-y-6 md:space-y-8">
                <div className="flex gap-4 md:gap-6">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-[#E8DEC8]/10 flex items-center justify-center text-[#E8DEC8] flex-shrink-0">
                    <MessageSquare className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1 md:mb-2 text-base md:text-lg">KI-Support</h4>
                    <p className="text-white/40 text-xs md:text-sm leading-relaxed">Linda beantwortet 90% der Fragen sofort und entlastet Ihr Personal spürbar.</p>
                  </div>
                </div>
                <div className="flex gap-4 md:gap-6">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-[#E8DEC8]/10 flex items-center justify-center text-[#E8DEC8] flex-shrink-0">
                    <Users className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1 md:mb-2 text-base md:text-lg">Gamification & UX</h4>
                    <p className="text-white/40 text-xs md:text-sm leading-relaxed">Interaktive Menü-Quizze und digitale Weinberater steigern die Lust auf den Besuch.</p>
                  </div>
                </div>
              </div>

              <div className="glassmorphism p-6 md:p-8 lg:p-10 rounded-2xl md:rounded-3xl lg:rounded-[40px] border border-white/10">
                <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-[#E8DEC8] block mb-3 md:mb-4">Dein Business-Nutzen</span>
                <p className="text-base md:text-lg lg:text-xl text-white/90 leading-relaxed font-medium italic">
                  "Wir machen die Website zum Erlebnis. Das steigert die Vorfreude und erhöht den Umsatz pro Gast messbar."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Performance & SEO */}
      <section id="performance" className="py-16 md:py-24 lg:py-32 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="glassmorphism p-6 md:p-12 lg:p-16 xl:p-24 rounded-3xl md:rounded-[48px] lg:rounded-[64px] border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#E8DEC8]/5 to-transparent"></div>
            
            <div className="relative z-10 grid lg:grid-cols-2 gap-10 md:gap-16 lg:gap-20 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 lg:mb-10 leading-tight">Mehr Gäste, <br />weniger <span className="text-[#E8DEC8]">Streuverlust.</span></h2>
                <div className="space-y-5 md:space-y-6 lg:space-y-8 mb-8 md:mb-10 lg:mb-12">
                  <div className="flex items-center gap-3 md:gap-4">
                    <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-[#E8DEC8] flex-shrink-0" />
                    <span className="text-white/60 text-sm md:text-base lg:text-lg">Dominante Google-Rankings in Ihrer Region</span>
                  </div>
                  <div className="flex items-center gap-3 md:gap-4">
                    <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-[#E8DEC8] flex-shrink-0" />
                    <span className="text-white/60 text-sm md:text-base lg:text-lg">Optimierte Nutzerführung für maximale Reservierungen</span>
                  </div>
                  <div className="flex items-center gap-3 md:gap-4">
                    <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-[#E8DEC8] flex-shrink-0" />
                    <span className="text-white/60 text-sm md:text-base lg:text-lg">Schnellste Ladezeiten für mobile Nutzer</span>
                  </div>
                </div>
                <div className="p-5 md:p-6 lg:p-8 rounded-2xl md:rounded-3xl bg-white/5 border border-white/10">
                  <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-[#E8DEC8] block mb-2 md:mb-3">Dein Business-Nutzen</span>
                  <p className="text-white/90 font-medium italic text-sm md:text-base">"Wir sorgen dafür, dass Sie die Nr. 1 in Ihrer Stadt sind, wenn Gäste nach einem Restaurant suchen. Sichtbarkeit, die sich direkt in vollen Tischen auszahlt."</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 md:gap-5 lg:gap-6">
                <div className="glassmorphism p-6 md:p-8 lg:p-10 rounded-2xl md:rounded-3xl lg:rounded-[40px] border border-white/10 text-center">
                  <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#E8DEC8] mb-1 md:mb-2">97</div>
                  <div className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-white/40">Performance</div>
                </div>
                <div className="glassmorphism p-6 md:p-8 lg:p-10 rounded-2xl md:rounded-3xl lg:rounded-[40px] border border-white/10 text-center">
                  <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#E8DEC8] mb-1 md:mb-2">100</div>
                  <div className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-white/40">SEO Score</div>
                </div>
                <div className="glassmorphism p-6 md:p-8 lg:p-10 rounded-2xl md:rounded-3xl lg:rounded-[40px] border border-white/10 text-center">
                  <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#E8DEC8] mb-1 md:mb-2">&lt;1s</div>
                  <div className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-white/40">Ladezeit</div>
                </div>
                <div className="glassmorphism p-6 md:p-8 lg:p-10 rounded-2xl md:rounded-3xl lg:rounded-[40px] border border-white/10 text-center">
                  <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#E8DEC8] mb-1 md:mb-2">30%</div>
                  <div className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-white/40">Mehr Leads</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA / Form */}
      <section id="contact" className="py-16 md:py-24 lg:py-32 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="glassmorphism p-6 md:p-10 lg:p-12 xl:p-20 rounded-3xl md:rounded-[48px] lg:rounded-[64px] border border-white/20 shadow-2xl">
            <div className="text-center mb-10 md:mb-14 lg:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">Projekt starten</h2>
              <p className="text-white/40 text-base md:text-lg font-light px-2">Holen Sie sich Zeit und Umsatz zurück. Lassen Sie uns über Ihre Automatisierung sprechen.</p>
            </div>
            
            <form className="space-y-6 md:space-y-8" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                <div className="space-y-2 md:space-y-3">
                  <label className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-[#E8DEC8] ml-2">Name</label>
                  <input name="name" required type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl px-5 py-3.5 md:px-8 md:py-5 focus:border-[#E8DEC8] focus:bg-white/10 outline-none transition-all duration-300 text-sm md:text-base" />
                </div>
                <div className="space-y-2 md:space-y-3">
                  <label className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-[#E8DEC8] ml-2">Gastronomie / Unternehmen</label>
                  <input name="company" type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl px-5 py-3.5 md:px-8 md:py-5 focus:border-[#E8DEC8] focus:bg-white/10 outline-none transition-all duration-300 text-sm md:text-base" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                <div className="space-y-2 md:space-y-3">
                  <label className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-[#E8DEC8] ml-2">E-Mail</label>
                  <input name="email" required type="email" className="w-full bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl px-5 py-3.5 md:px-8 md:py-5 focus:border-[#E8DEC8] focus:bg-white/10 outline-none transition-all duration-300 text-sm md:text-base" />
                </div>
                <div className="space-y-2 md:space-y-3">
                  <label className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-[#E8DEC8] ml-2">Telefon</label>
                  <div className="relative">
                    <Phone className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-[#E8DEC8] pointer-events-none z-10" />
                    <input name="phone" type="tel" className="w-full bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl pl-11 md:pl-14 pr-5 md:pr-8 py-3.5 md:py-5 focus:border-[#E8DEC8] focus:bg-white/10 outline-none transition-all duration-300 text-sm md:text-base" />
                  </div>
                </div>
              </div>
              <div className="space-y-2 md:space-y-3">
                <label className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-[#E8DEC8] ml-2">Ihre Vision</label>
                <textarea name="message" className="w-full bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl px-5 md:px-8 py-4 md:py-6 focus:border-[#E8DEC8] focus:bg-white/10 outline-none transition-all duration-300 h-32 md:h-40 text-sm md:text-base"></textarea>
              </div>
              
              {submitStatus && (
                <div className={`p-4 md:p-6 rounded-2xl md:rounded-3xl text-xs md:text-sm font-medium animate-fadeIn ${submitStatus.success ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                  {submitStatus.message}
                </div>
              )}

              <button 
                disabled={isSubmitting}
                className="w-full bg-[#E8DEC8] text-black py-4 md:py-5 lg:py-6 rounded-2xl md:rounded-3xl font-bold text-base md:text-lg lg:text-xl hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500 shadow-[0_0_40px_rgba(232,222,200,0.2)] flex items-center justify-center gap-2 md:gap-3 group"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 md:w-6 md:h-6 animate-spin" />
                    <span className="text-sm md:text-base">Wird gesendet...</span>
                  </>
                ) : (
                  <>
                    <span className="text-sm md:text-base lg:text-lg">Jetzt Demo anfragen</span>
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 md:py-14 lg:py-16 bg-white border-t border-black/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid md:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
            <div className="md:col-span-2">
              <h3 className="text-xl md:text-2xl font-light tracking-widest uppercase mb-4 md:mb-6 text-black">young <span className="font-bold">creatives</span></h3>
              <div className="space-y-2 md:space-y-3">
                <div className="flex items-start gap-2 md:gap-3 text-black/80">
                  <MapPin size={16} className="md:w-[18px] md:h-[18px] mt-0.5 md:mt-1 flex-shrink-0" />
                  <p className="font-light text-sm md:text-base">
                    Böhmersweg 21<br />
                    20148 Hamburg
                  </p>
                </div>
                <div className="flex items-start gap-2 md:gap-3 text-black/80">
                  <Phone size={16} className="md:w-[18px] md:h-[18px] mt-0.5 flex-shrink-0" />
                  <a href="tel:+4940345999" className="font-light hover:text-black transition-colors text-sm md:text-base">
                    +49 40 345 999
                  </a>
                </div>
                <div className="flex items-start gap-2 md:gap-3 text-black/80">
                  <Mail size={16} className="md:w-[18px] md:h-[18px] mt-0.5 flex-shrink-0" />
                  <a
                    href="mailto:hello@youngcreatives.de"
                    className="font-light hover:text-black transition-colors text-sm md:text-base break-all"
                  >
                    hello@youngcreatives.de
                  </a>
                </div>
              </div>
            </div>

            <div className="md:flex md:flex-col md:justify-start">
              <div>
                <h4 className="text-base md:text-lg font-light tracking-wide uppercase mb-3 md:mb-4 text-black">Legal</h4>
                <div className="space-y-2 md:space-y-3">
                  <button
                    onClick={() => setModalType('imprint')}
                    className="block text-black/80 hover:text-black transition-colors font-light text-left text-xs md:text-sm"
                  >
                    {language === 'de' ? 'Impressum' : language === 'ko' ? '법적 고지' : 'Imprint'}
                  </button>
                  <button
                    onClick={() => setModalType('privacy')}
                    className="block text-black/80 hover:text-black transition-colors font-light text-left text-xs md:text-sm"
                  >
                    {language === 'de' ? 'Datenschutz' : language === 'ko' ? '개인정보 보호정책' : 'Privacy Policy'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 md:mt-10 lg:mt-12 pt-6 md:pt-8 border-t border-black/10 text-center text-xs md:text-sm text-black/70">
            © {new Date().getFullYear()} YOUNG <span className="font-bold">CREATIVES</span>. All rights reserved.
          </div>
        </div>
        {modalType && (
          <LegalModal type={modalType} onClose={() => setModalType(null)} />
        )}
      </footer>
    </div>
  );
}