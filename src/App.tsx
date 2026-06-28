import React, { useState, useEffect } from 'react';
import { 
  Sun, 
  Moon, 
  ArrowRight, 
  Phone, 
  ShieldCheck, 
  CheckCircle, 
  Menu, 
  X, 
  Star, 
  Award, 
  MapPin, 
  Zap, 
  Layers, 
  Building,
  User,
  Mail,
  ChevronLeft,
  ChevronRight,
  ArrowUp
} from 'lucide-react';
import { SavingsCalculator } from './components/SavingsCalculator';
import { FAQAccordion } from './components/FAQAccordion';
import { StatsCounter } from './components/StatsCounter';

// Official WhatsApp logo as SVG
const WhatsAppIcon: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = 'currentColor' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 448 512" 
    fill={color} 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
  </svg>
);

interface ProjectSpec {
  label: string;
  value: string;
}

interface Project {
  title: string;
  category: 'residential' | 'commercial' | 'offgrid';
  location: string;
  metric: string;
  imageUrl: string;
  description: string;
  specs: ProjectSpec[];
}

interface Testimonial {
  name: string;
  location: string;
  systemSize: string;
  quote: string;
  rating: number;
}

interface Service {
  id: string;
  title: string;
  description: string;
  details: string[];
  icon: React.ReactNode;
}

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('light');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [projectFilter, setProjectFilter] = useState<'all' | 'residential' | 'commercial' | 'offgrid'>('all');
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Lifted financial calculator & live states
  const [bill, setBill] = useState<number>(7200);
  const [heroBillInput, setHeroBillInput] = useState<string>('');
  const [co2Saved, setCo2Saved] = useState<number>(12584.2);

  // Form states
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [roofDetails, setRoofDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Modal State for Project Details
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showInquiry, setShowInquiry] = useState<boolean>(false);

  useEffect(() => {
    // Set theme attribute on html node
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedProject, showInquiry]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCo2Saved(prev => prev + 0.08);
    }, 200);
    return () => clearInterval(timer);
  }, []);

  const handleQuickCalcSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseFloat(heroBillInput);
    if (!isNaN(parsed) && parsed > 0) {
      setBill(parsed);
    }
    scrollToSection('calculator');
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
    }, 1500);
  };

  const services: Service[] = [
    {
      id: 'ongrid',
      title: 'On-Grid Solar Systems',
      description: 'Net metering installations connected with the state grid, delivering maximum utility savings and immediate zero bills.',
      icon: <Zap size={28} />,
      details: [
        'Optimal ROI: Pays back within 3 to 4 years.',
        'Subsidy eligible: Approved under PM Surya Ghar Yojana.',
        'Best suited for urban homes with stable grid power.',
        'Excess power generated is exported back to government for Discom credits.'
      ]
    },
    {
      id: 'offgrid',
      title: 'Off-Grid + Batteries',
      description: 'Complete energy independence from the Discom utility grid using state-of-the-art lithium-ion battery backup bank.',
      icon: <Layers size={28} />,
      details: [
        '100% independent power: Functions perfectly during grid failures.',
        'High capacity solar battery storage for night utilization.',
        'Best suited for rural sectors, farmlands, and remote villas.',
        'Premium build: Smart hybrid inverter & remote app-based metrics.'
      ]
    },
    {
      id: 'commercial',
      title: 'Commercial & Industrial',
      description: 'High-yield solar infrastructure for factories, institutional colleges, hotels, and enterprise structures.',
      icon: <Building size={28} />,
      details: [
        'Significant operational savings: Lowers high commercial tariffs.',
        'Accelerated depreciation benefits under corporate tax rules.',
        'Scale capacity: 10kW up to 1MW+ robust engineering designs.',
        'Includes dedicated smart logging instruments & yearly auditing.'
      ]
    }
  ];

  const projects: Project[] = [
    {
      title: '4 kW Residential',
      category: 'residential',
      location: 'Vaishali Nagar, Jaipur',
      metric: 'Zero Bills Guaranteed',
      imageUrl: '/project-residential.webp',
      description: 'A premium rooftop installation on a residential villa in Vaishali Nagar, Jaipur. The owner was receiving average monthly bills of ₹6,500. After installing 8 high-efficiency Waaree solar panels, their bill has dropped to the basic grid maintenance charge of ₹140 per month.',
      specs: [
        { label: 'System Size', value: '4.0 kW' },
        { label: 'Modules Used', value: '8x Waaree Mono PERC 500Wp' },
        { label: 'Inverter Brand', value: 'Growatt 4kW Smart String' },
        { label: 'Est. Generation', value: '480 Units / Month' },
        { label: 'Payback Duration', value: '3.4 Years' },
        { label: 'Structure Type', value: 'Elevated 8ft High-Wind Mounts' }
      ]
    },
    {
      title: '15 kW School System',
      category: 'commercial',
      location: 'Bikaner Rural',
      metric: '87% Monthly Savings',
      imageUrl: '/project-school.webp',
      description: 'Designed and implemented for a regional school in Bikaner. The solar setup offsets peak daytime loads from classrooms, air conditioners, and labs. Slashing commercial tariff bills by 87% and teaching children about sustainable energy.',
      specs: [
        { label: 'System Size', value: '15.0 kW' },
        { label: 'Modules Used', value: '30x Waaree Mono PERC 500Wp' },
        { label: 'Inverter Brand', value: 'Solace 15kW Dual-MPPT' },
        { label: 'Est. Generation', value: '1,850 Units / Month' },
        { label: 'Payback Duration', value: '3.6 Years' },
        { label: 'Structure Type', value: 'Flat Roof Heavy-Ballast Structure' }
      ]
    },
    {
      title: '120 kW Factory Array',
      category: 'commercial',
      location: 'Sri Ganganagar Industrial Area',
      metric: '₹19 Lakhs Saved Annually',
      imageUrl: '/project-factory.webp',
      description: 'A massive industrial rooftop solar installation for a textile manufacturing plant in Sri Ganganagar. Designed to lower heavy commercial peak demand rates, increase profit margins, and optimize corporate tax benefits via accelerated depreciation.',
      specs: [
        { label: 'System Size', value: '120.0 kW' },
        { label: 'Modules Used', value: '240x Longi Hi-MO 500Wp' },
        { label: 'Inverters Used', value: '2x Growatt 60kW String Inverters' },
        { label: 'Est. Generation', value: '14,500 Units / Month' },
        { label: 'Annual Cash Savings', value: '₹19.2 Lakhs / Year' },
        { label: 'Structure Type', value: 'Tinclad Trapezoidal Clamp Mounting' }
      ]
    },
    {
      title: '8 kW Off-Grid Farmhouse',
      category: 'offgrid',
      location: 'Hanumangarh Plains',
      metric: '100% Grid Independent',
      imageUrl: '/project-farmhouse.webp',
      description: 'A fully self-sustained off-grid hybrid solar power station in Hanumangarh. Equipped with a high-capacity lithium battery bank, supporting continuous air conditioning, water pumps, and lighting without any utility grid connection.',
      specs: [
        { label: 'System Size', value: '8.0 kW' },
        { label: 'Modules Used', value: '16x Waaree Mono PERC 500Wp' },
        { label: 'Battery Bank', value: '48V 400Ah Lithium Iron Phosphate (LFP)' },
        { label: 'Inverter Brand', value: 'Growatt 8kW Hybrid Off-Grid' },
        { label: 'Autonomy Duration', value: 'Up to 36 hours without sun' },
        { label: 'Structure Type', value: 'Ground-Mount Concrete Foundation Racks' }
      ]
    }
  ];

  const testimonials: Testimonial[] = [
    {
      name: 'Anil Choudhary',
      location: 'Vaishali Nagar, Jaipur',
      systemSize: '6 kW Residential',
      quote: '"My monthly electricity bill dropped from ₹9,800 to exactly ₹140. The ZERO BILL SOLAR team managed the entire net-metering and subsidy application flawlessly. Excellent post-installation support!"',
      rating: 5
    },
    {
      name: 'Vikram Agarwal',
      location: 'RIICO Area, Sri Ganganagar',
      systemSize: '120 kW Industrial',
      quote: '"Installing solar at our manufacturing plant was our best corporate investment. We saved over ₹2.1 lakhs in the first year alone. The execution was completed on time, and quality is world-class."',
      rating: 5
    },
    {
      name: 'Priya Mehta',
      location: 'J N Vyas Nagar, Bikaner',
      systemSize: '4 kW Residential',
      quote: '"Extremely happy with the service. They customized the roof structure to match our requirements, finalized the bank loans easily, and secured the ₹78,000 subsidy within a month of completion."',
      rating: 5
    }
  ];

  const filteredProjects = projectFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === projectFilter);

  const handleNextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* ==================== HEADER & NAVIGATION ==================== */}
      <header className="glass-panel" style={styles.header}>
        <div className="container" style={styles.navContainer}>
          
          {/* Logo */}
          <div className="logo-group" onClick={() => scrollToSection('hero')}>
            <div className="logo-icon">
              <Sun size={24} color="#ffffff" />
            </div>
            <div>
              <span className="heading logo-text">ZERO BILL</span>
              <span className="logo-subtext">SOLAR ENERGY</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="desktop-nav" style={styles.desktopNav}>
            <button onClick={() => scrollToSection('about')} className="nav-link">About</button>
            <button onClick={() => scrollToSection('process')} className="nav-link">Process</button>
            <button onClick={() => scrollToSection('services')} className="nav-link">Solutions</button>
            <button onClick={() => scrollToSection('schemes')} className="nav-link">Subsidies</button>
            <button onClick={() => scrollToSection('projects')} className="nav-link">Projects</button>
            <button onClick={() => scrollToSection('calculator')} className="nav-link">Calculator</button>
          </nav>

          {/* Call to Actions & Theme toggle */}
          <div className="action-group" style={styles.actionGroup}>
            <button 
              className="theme-toggle"
              onClick={toggleTheme} 
              style={styles.themeToggle} 
              title="Toggle light/dark mode"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <a 
              href="https://wa.me/919548595485" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="nav-whatsapp-btn"
              style={styles.navWhatsAppBtn}
            >
              <WhatsAppIcon size={18} />
              <span className="hide-mobile">WhatsApp</span>
            </a>

            <button 
              onClick={() => scrollToSection('contact')} 
              className="nav-quote-btn"
              style={{ borderRadius: '9999px' }}
            >
              Get Free Quote
            </button>

            <button 
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(true)} 
              style={styles.mobileMenuToggle}
              aria-label="Open navigation menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div style={styles.drawerOverlay} onClick={() => setMobileMenuOpen(false)}>
          <div style={styles.drawer} onClick={(e) => e.stopPropagation()}>
            <div style={styles.drawerHeader}>
              <div className="logo-group">
                <div className="logo-icon">
                  <Sun size={20} color="#ffffff" />
                </div>
                <span className="heading" style={{ fontSize: '1.25rem' }}>ZERO BILL</span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} style={styles.drawerClose} aria-label="Close menu">
                <X size={24} />
              </button>
            </div>
            
            <div style={styles.drawerLinks}>
              <button onClick={() => scrollToSection('about')} style={styles.drawerLink}>About Company</button>
              <button onClick={() => scrollToSection('process')} style={styles.drawerLink}>Our Process</button>
              <button onClick={() => scrollToSection('services')} style={styles.drawerLink}>Solar Solutions</button>
              <button onClick={() => scrollToSection('schemes')} style={styles.drawerLink}>Govt. Subsidies</button>
              <button onClick={() => scrollToSection('projects')} style={styles.drawerLink}>Featured Projects</button>
              <button onClick={() => scrollToSection('calculator')} style={styles.drawerLink}>Savings Calculator</button>
              <button onClick={() => scrollToSection('contact')} style={{ ...styles.drawerLink, color: 'var(--accent)' }}>Book Site Survey</button>
            </div>

            <div style={styles.drawerFooter}>
              <a href="tel:+919548595485" style={styles.drawerPhone}>
                <Phone size={18} />
                <span>+91 95485 95485</span>
              </a>
              <p style={styles.drawerFooterText}>Rajasthan's Empanelled Solar Partner</p>
            </div>
          </div>
        </div>
      )}

      {selectedProject ? (
        showInquiry ? (
          <InquiryPageView
            project={selectedProject}
            onBack={() => setShowInquiry(false)}
            fullName={fullName}
            setFullName={setFullName}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            emailAddress={emailAddress}
            setEmailAddress={setEmailAddress}
            roofDetails={roofDetails}
            setRoofDetails={setRoofDetails}
            onSubmit={handleFormSubmit}
            isSubmitting={isSubmitting}
            submitSuccess={submitSuccess}
            setSubmitSuccess={setSubmitSuccess}
            onGoHome={() => {
              setShowInquiry(false);
              setSelectedProject(null);
            }}
          />
        ) : (
          <ProjectDetailsView 
            project={selectedProject} 
            onBack={() => setSelectedProject(null)} 
            onInquire={(setupInfo) => {
              setRoofDetails(setupInfo);
              setShowInquiry(true);
            }} 
          />
        )
      ) : (
        <>
          {/* ==================== HERO SECTION ==================== */}
          <section id="hero" className="hero-wrapper">
        <div className="hero-mesh"></div>
        
        {/* Interactive Image Container with Hotspots */}
        <div className="hero-image-container hide-mobile">
          <div className="hero-bg-image" style={{ backgroundImage: `url('/hero-bg.webp')` }}></div>
          
          {/* Hotspot 1 - Panel */}
          <div className="hotspot" style={{ top: '74%', left: '25%' }}>
            <div className="hotspot-pulse"></div>
            <div className="hotspot-dot"></div>
            <div className="hotspot-tooltip glass-panel" style={{ bottom: '45px', left: '-30px', transform: 'none', width: '220px' }}>
              <h5>Waaree Solar Panels</h5>
              <p>Tier-1 high efficiency (up to 22.5%) monocrystalline half-cut modules with 25 years warranty.</p>
            </div>
          </div>

          {/* Hotspot 2 - Mounting */}
          <div className="hotspot" style={{ top: '88%', left: '50%' }}>
            <div className="hotspot-pulse"></div>
            <div className="hotspot-dot"></div>
            <div className="hotspot-tooltip glass-panel" style={{ bottom: '30px', left: '50%', transform: 'translateX(-50%)', width: '200px' }}>
              <h5>HDG Mounting Structure</h5>
              <p>Hot-dip galvanized steel frames built to resist strong desert winds up to 150 km/h.</p>
            </div>
          </div>

          {/* Hotspot 3 - Inverter */}
          <div className="hotspot" style={{ top: '80%', left: '80%' }}>
            <div className="hotspot-pulse"></div>
            <div className="hotspot-dot"></div>
            <div className="hotspot-tooltip glass-panel" style={{ bottom: '55px', right: '-30px', left: 'auto', transform: 'none', width: '230px' }}>
              <h5>Smart Grid Inverter</h5>
              <p>Growatt/Solace IP65 rated inverters. Includes integrated Wi-Fi for real-time mobile app tracking.</p>
            </div>
          </div>
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div className="hero-content">
            
            {/* Badge */}
            <div className="badge badge-accent" style={{ marginBottom: '1.5rem' }}>
              <Award size={14} />
              <span>Rajasthan's #1 Solar EPC Partner</span>
            </div>

            {/* Main Headline */}
            <h1 className="heading hero-headline" style={styles.heroHeadline}>
              ZERO <br />
              ELECTRICITY <br />
              <span className="gradient-text">BILLS.</span>
            </h1>

            {/* Description */}
            <p className="hero-subheadline">
              Achieve complete financial independence. Premium rooftop solar designs with full MNRE subsidies and seamless net metering.
            </p>

            {/* Quick Savings Form */}
            <form onSubmit={handleQuickCalcSubmit} className="quick-calc-container">
              <span className="quick-calc-text">Estimate your savings instantly:</span>
              <div className="quick-calc-input-row">
                <input 
                  type="number" 
                  placeholder="Enter Monthly Bill (₹)" 
                  value={heroBillInput}
                  onChange={(e) => setHeroBillInput(e.target.value)}
                  className="quick-calc-input"
                  required
                  min="500"
                />
                <button type="submit" className="quick-calc-btn">
                  Check Savings
                  <ArrowRight size={16} />
                </button>
              </div>
            </form>

            {/* Action buttons */}
            <div className="hero-actions">
              <button 
                onClick={() => scrollToSection('contact')} 
                className="btn btn-hero btn-primary"
              >
                Book Free Site Survey
                <ArrowRight size={18} />
              </button>

              <a 
                href="tel:+919548595485" 
                className="btn btn-hero btn-secondary"
              >
                <Phone size={18} />
                <span>95485 95485</span>
              </a>
            </div>

            {/* Social Trust Metrics */}
            <div className="hero-trust-grid" style={styles.heroTrustGrid}>
              <div style={styles.heroTrustItem}>
                <div style={styles.stars}>★★★★★</div>
                <div style={styles.trustText}>4.98 Rating • 1,240+ Reviews</div>
              </div>
              
              <div className="divider" style={styles.divider}></div>
              
              <div style={styles.heroTrustItem}>
                <div style={styles.metricsTitle}>5,200+</div>
                <div style={styles.trustText}>Installations Rajasthan wide</div>
              </div>

              <div className="divider" style={styles.divider}></div>

              {/* CO2 Live Counter */}
              <div style={styles.heroTrustItem}>
                <div style={{ ...styles.metricsTitle, color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={styles.livePulse}></span>
                  <span>{co2Saved.toLocaleString('en-IN', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} kg</span>
                </div>
                <div style={styles.trustText}>CO2 Saved in Rajasthan today</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================== TRUST BAR ==================== */}
      <section style={styles.trustBar}>
        <div className="container trust-bar-container" style={styles.trustBarContainer}>
          <div className="trust-bar-item" style={styles.trustBarItem}>
            <ShieldCheck size={18} color="var(--accent)" />
            <span>MNRE Empanelled Partner</span>
          </div>
          <div className="trust-bar-item" style={styles.trustBarItem}>
            <ShieldCheck size={18} color="var(--accent)" />
            <span>Waaree Certified EPC</span>
          </div>
          <div className="trust-bar-item" style={styles.trustBarItem}>
            <ShieldCheck size={18} color="var(--accent)" />
            <span>25-Year Panel Warranty</span>
          </div>
          <div className="trust-bar-item" style={styles.trustBarItem}>
            <ShieldCheck size={18} color="var(--accent)" />
            <span>Guaranteed Zero Bills</span>
          </div>
        </div>
      </section>

      {/* ==================== ABOUT SECTION ==================== */}
      <section id="about" className="section-padding" style={{ position: 'relative' }}>
        <div className="container">
          <div className="about-grid" style={styles.aboutGrid}>
            
            {/* Context Details */}
            <div className="about-text-content" style={styles.aboutTextContent}>
              <span className="section-subtitle">Since 2018 • Jaipur Head Office</span>
              <h2 className="section-title">Powering Rajasthan's Sustainable Transition</h2>
              <p style={styles.aboutBody}>
                Headquartered in Vaishali Nagar, Jaipur, ZERO BILL SOLAR is dedicated to creating green autonomy for residences, educational hubs, and industrial sectors. We manage the entire lifecycle, ensuring you leverage maximum benefits from state policy Net-Metering and financial subsidies.
              </p>

              <div className="stats-count-grid" style={styles.statsCountGrid}>
                <div style={styles.statsCountCard}>
                  <StatsCounter target={5200} suffix="+" />
                  <span style={styles.statsCountLabel}>HAPPY CUSTOMERS</span>
                </div>
                <div style={styles.statsCountCard}>
                  <StatsCounter target={52} suffix=" MW" />
                  <span style={styles.statsCountLabel}>CLEAN POWER DELIVERED</span>
                </div>
                <div style={styles.statsCountCard}>
                  <StatsCounter target={98} suffix="%" />
                  <span style={styles.statsCountLabel}>RETENTION RATIO</span>
                </div>
              </div>
            </div>

            {/* Interactive Image Frame */}
            <div style={styles.aboutVisualContent}>
              <div style={styles.imageOverlayContainer}>
                <img 
                  src="/about-team.webp" 
                  alt="ZERO BILL SOLAR Head Office Team" 
                  style={styles.aboutImage}
                />
                <div className="glass-panel" style={styles.addressFloatingBadge}>
                  <MapPin size={20} color="var(--accent)" />
                  <div>
                    <h5 style={{ fontWeight: '700', fontSize: '0.95rem' }}>Jaipur Head Office</h5>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Nursery Circle, Vaishali Nagar</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================== PROCESS TIMELINE ==================== */}
      <section id="process" className="section-padding" style={{ background: 'var(--bg-tertiary)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span className="section-subtitle">A Seamless 5-Week Timeline</span>
            <h2 className="section-title">Your Simple Pathway to Zero Bills</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
              We manage all site planning, municipal approvals, subsidy validation, and technical engineering.
            </p>
          </div>

          <div className="process-grid" style={styles.processGrid}>
            
            <div className="glass-card" style={styles.processCard}>
              <div style={styles.processNum}>01</div>
              <h4 style={styles.processTitle}>Free Survey</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                We execute an on-site structural check, calculate shading analysis, and catalog historical power invoices.
              </p>
            </div>

            <div className="glass-card" style={styles.processCard}>
              <div style={styles.processNum}>02</div>
              <h4 style={styles.processTitle}>Subsidy Audit</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                Our architects model the rooftop layout and draft direct subsidy applications for instant approvals.
              </p>
            </div>

            <div className="glass-card" style={styles.processCard}>
              <div style={styles.processNum}>03</div>
              <h4 style={styles.processTitle}>Installation</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                Empanelled engineers construct the premium mounting structures and assemble tier-1 solar modules in 1-2 days.
              </p>
            </div>

            <div className="glass-card" style={styles.processCard}>
              <div style={styles.processNum}>04</div>
              <h4 style={styles.processTitle}>Commission</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                We finalize Net-Metering with local Discoms, activate grid syncing, and launch the performance application.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ==================== SERVICES & SOLUTIONS ==================== */}
      <section id="services" className="section-padding">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <span className="section-subtitle">Tailored Energy Architectures</span>
              <h2 className="section-title">Premium Solar Solutions</h2>
            </div>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '500px' }}>
              We install only premium Tier-1 components (Waaree, Longi panels, Growatt/Solace inverters) carrying extended warranty coverages.
            </p>
          </div>

          <div className="grid-3">
            {services.map((service) => {
              return (
                <div 
                  key={service.id} 
                  className="glass-card" 
                  style={{
                    ...styles.serviceCard,
                    borderColor: 'var(--border)'
                  }}
                >
                  <div className="service-icon-container">
                    {service.icon}
                  </div>
                  <h3 style={styles.serviceTitle}>{service.title}</h3>
                  <p style={styles.serviceDescription}>{service.description}</p>
                  
                  <div style={styles.serviceExpansion}>
                    <ul style={styles.expansionList}>
                      {service.details.map((detail, i) => (
                        <li key={i} style={styles.expansionItem}>
                          <CheckCircle size={14} color="var(--accent)" style={{ marginTop: '3px', flexShrink: 0 }} />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== GOVERNMENT SCHEMES & SUBSIDY ==================== */}
      <section id="schemes" className="section-padding-sm">
        <div className="container">
          <div className="schemes-container" style={styles.schemesContainer}>
            <div style={styles.schemesTextSide}>
              <div className="badge badge-accent" style={{ background: 'rgba(255,255,255,0.1)', color: '#a7f3d0' }}>
                PM SURYA GHAR YOJANA 2026
              </div>
              <h2 style={styles.schemesTitle}>Direct Subsidy up to ₹78,000</h2>
              <p style={styles.schemesSubtitle}>
                Get your residential rooftop system approved with streamlined capital subsidies, paid directly into your bank account post Net-metering activation.
              </p>
            </div>

            <div style={styles.schemesGridSide}>
              <div className="scheme-metric-card" style={styles.schemeMetricCard}>
                <span className="scheme-metric-label" style={styles.schemeMetricLabel}>Residential 1-3 kW</span>
                <h3 className="scheme-metric-value" style={styles.schemeMetricValue}>₹60K - ₹78K</h3>
                <p className="scheme-metric-help" style={styles.schemeMetricHelp}>Direct Govt cash subsidy</p>
              </div>
              <div className="scheme-metric-card" style={styles.schemeMetricCard}>
                <span className="scheme-metric-label" style={styles.schemeMetricLabel}>Net-Metering Setup</span>
                <h3 className="scheme-metric-value" style={styles.schemeMetricValue}>Included</h3>
                <p className="scheme-metric-help" style={styles.schemeMetricHelp}>Discom approvals handled</p>
              </div>
              <div className="scheme-metric-card" style={styles.schemeMetricCard}>
                <span className="scheme-metric-label" style={styles.schemeMetricLabel}>Financing Support</span>
                <h3 className="scheme-metric-value" style={styles.schemeMetricValue}>Low EMI</h3>
                <p className="scheme-metric-help" style={styles.schemeMetricHelp}>Collateral-free solar loans</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== PROJECTS GALLERY ==================== */}
      <section id="projects" className="section-padding">
        <div className="container">
          <div className="projects-header" style={styles.projectsHeader}>
            <div>
              <span className="section-subtitle">Real Installations</span>
              <h2 className="section-title">Rajasthan Rooftop Work</h2>
            </div>
            
            {/* Filter buttons */}
            <div className="filter-container" style={styles.filterContainer}>
              {['all', 'residential', 'commercial', 'offgrid'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setProjectFilter(cat as any)}
                  style={{
                    ...styles.filterBtn,
                    background: projectFilter === cat ? 'var(--accent)' : 'var(--bg-tertiary)',
                    color: projectFilter === cat ? '#ffffff' : 'var(--text-primary)',
                    borderColor: projectFilter === cat ? 'var(--accent)' : 'var(--border)'
                  }}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="projects-grid" style={styles.projectsGrid}>
            {filteredProjects.map((project, index) => (
              <div key={index} style={styles.projectCard} onClick={() => setSelectedProject(project)}>
                <div style={styles.projectImageWrapper}>
                  <img src={project.imageUrl} alt={project.title} style={styles.projectImage} />
                  <div style={styles.projectOverlay}>
                    <div style={styles.projectOverlayText}>
                      <span className="badge badge-accent" style={{ background: 'var(--accent)', color: 'white', border: 'none' }}>
                        {project.metric}
                      </span>
                      <h4 style={styles.projectCardTitle}>{project.title}</h4>
                      <div style={styles.projectCardLocation}>
                        <MapPin size={14} style={{ marginRight: '4px' }} />
                        <span>{project.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== SAVINGS CALCULATOR ==================== */}
      <section id="calculator" className="section-padding" style={{ background: 'var(--bg-tertiary)' }}>
        <div className="container">
          <SavingsCalculator bill={bill} setBill={setBill} />
        </div>
      </section>

      {/* ==================== TESTIMONIALS SLIDER ==================== */}
      <section id="testimonials" className="section-padding">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span className="section-subtitle">Client Success Stories</span>
            <h2 className="section-title">Verified Customer Experiences</h2>
          </div>

          <div className="glass-panel testimonial-container" style={styles.testimonialContainer}>
            <div className="testimonial-quotes" style={styles.testimonialQuotes}>
              <div style={styles.stars}>
                {Array.from({ length: testimonials[activeTestimonial].rating }).map((_, i) => (
                  <Star key={i} size={20} fill="#f59e0b" color="#f59e0b" style={{ marginRight: '4px' }} />
                ))}
              </div>
              
              <blockquote className="testimonial-text" style={styles.testimonialText}>
                {testimonials[activeTestimonial].quote}
              </blockquote>

              <div style={styles.testimonialAuthor}>
                <div style={styles.authorAvatar}>
                  <User size={22} color="var(--accent)" />
                </div>
                <div>
                  <h5 style={{ fontWeight: '700', fontSize: '1.1rem' }}>{testimonials[activeTestimonial].name}</h5>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    {testimonials[activeTestimonial].location} • <span style={{ color: 'var(--accent)' }}>{testimonials[activeTestimonial].systemSize}</span>
                  </p>
                </div>
              </div>
            </div>

            <div style={styles.sliderControls}>
              <button onClick={handlePrevTestimonial} style={styles.sliderArrowBtn} aria-label="Previous testimonial">
                <ChevronLeft size={22} />
              </button>
              <span style={styles.sliderPages}>{activeTestimonial + 1} / {testimonials.length}</span>
              <button onClick={handleNextTestimonial} style={styles.sliderArrowBtn} aria-label="Next testimonial">
                <ChevronRight size={22} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FAQ SECTION ==================== */}
      <section className="section-padding" style={{ background: 'var(--bg-tertiary)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span className="section-subtitle">Any Questions?</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>
          
          <FAQAccordion />
        </div>
      </section>

      {/* ==================== CONTACT FORM SECTION ==================== */}
      <section id="contact" className="section-padding">
        <div className="container">
          <div className="contact-grid" style={styles.contactSectionGrid}>
            
            {/* Info panel */}
            <div className="contact-info" style={styles.contactInfo}>
              <span className="section-subtitle">Reach Out Today</span>
              <h2 className="section-title" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>Ready to Eliminate Your Bill?</h2>
              <p style={styles.contactIntroText}>
                Submit your contact details and our technician will schedule a site survey in Jaipur/Rajasthan within 24 hours.
              </p>

              <div className="contact-direct-details" style={styles.contactDirectDetails}>
                <div style={styles.contactDetailItem}>
                  <div style={styles.contactDetailIcon}><Phone size={20} /></div>
                  <div>
                    <div style={styles.contactDetailLabel}>Call or WhatsApp</div>
                    <a href="tel:+919548595485" style={styles.contactDetailLink}>+91 95485 95485</a>
                  </div>
                </div>

                <div style={styles.contactDetailItem}>
                  <div style={styles.contactDetailIcon}><Mail size={20} /></div>
                  <div>
                    <div style={styles.contactDetailLabel}>Email Support</div>
                    <a href="mailto:zerobillsolar@waareepartners.com" style={styles.contactDetailLink}>zerobillsolar@waareepartners.com</a>
                  </div>
                </div>

                <div style={styles.contactDetailItem}>
                  <div style={styles.contactDetailIcon}><MapPin size={20} /></div>
                  <div>
                    <div style={styles.contactDetailLabel}>Shree Kanhaiya Mansion Office</div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                      A-12, Nursery Circle, Vaishali Nagar, Jaipur 302021
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Form panel */}
            <div className="glass-panel contact-form-container" style={styles.contactFormContainer}>
              {submitSuccess ? (
                <div style={styles.successScreen}>
                  <CheckCircle size={64} color="#10b981" style={{ marginBottom: '1.5rem' }} />
                  <h3 className="heading" style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>Site Survey Booked!</h3>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                    Thank you, {fullName}. Our solar engineer will contact you on <strong>{phoneNumber}</strong> within 2 hours to confirm your rooftop inspection.
                  </p>
                  <button 
                    onClick={() => {
                      setSubmitSuccess(false);
                      setFullName('');
                      setPhoneNumber('');
                      setEmailAddress('');
                      setRoofDetails('');
                    }} 
                    className="btn btn-secondary"
                  >
                    Submit another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} style={styles.formStructure}>
                  <div className="form-row" style={styles.formRow}>
                    <div style={styles.formInputWrapper}>
                      <label style={styles.formLabel}>Full Name</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="Anil Choudhary" 
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="form-input"
                        style={styles.formInput}
                      />
                    </div>
                    <div style={styles.formInputWrapper}>
                      <label style={styles.formLabel}>Phone Number</label>
                      <input 
                        type="tel" 
                        required 
                        placeholder="95485 95485" 
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="form-input"
                        style={styles.formInput}
                      />
                    </div>
                  </div>

                  <div style={styles.formInputWrapper}>
                    <label style={styles.formLabel}>Email Address (Optional)</label>
                    <input 
                      type="email" 
                      placeholder="name@domain.com" 
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                      className="form-input"
                      style={styles.formInput}
                    />
                  </div>

                  <div style={styles.formInputWrapper}>
                    <label style={styles.formLabel}>Roof and Power Bill Details</label>
                    <textarea 
                      placeholder="My monthly electricity bill is around Rs. 7,000, and my roof is concrete with approx 1,000 sq ft shadow-free space..." 
                      rows={4}
                      value={roofDetails}
                      onChange={(e) => setRoofDetails(e.target.value)}
                      className="form-textarea"
                      style={styles.formTextarea}
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting} 
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '1rem', fontSize: '1.05rem', borderRadius: 'var(--radius-sm)' }}
                  >
                    {isSubmitting ? 'Processing request...' : 'Book Free Site Survey'}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>
        </>
      )}

      {/* ==================== FOOTER ==================== */}
      <footer className="main-footer">
        <div className="container">
          <div className="footer-grid">
            
            <div className="footer-left">
              <div className="logo-group">
                <div className="logo-icon">
                  <Sun size={20} color="#ffffff" />
                </div>
                <span className="heading" style={{ fontSize: '1.5rem', color: '#ffffff' }}>ZERO BILL</span>
              </div>
              <p style={styles.footerDesc}>
                Rajasthan's trusted partner for high-efficiency, subsidy-eligible rooftop solar installations.
              </p>
              <div style={{ marginTop: '1.5rem' }}>
                <span style={styles.footerBadge}>MNRE Approved EPC</span>
              </div>
            </div>

            <div style={styles.footerLinksCol}>
              <h5 style={styles.footerHeading}>Company</h5>
              <button onClick={() => scrollToSection('about')} style={styles.footerLink}>About Us</button>
              <button onClick={() => scrollToSection('process')} style={styles.footerLink}>Our Process</button>
              <button onClick={() => scrollToSection('services')} style={styles.footerLink}>Solar Solutions</button>
              <button onClick={() => scrollToSection('projects')} style={styles.footerLink}>Projects</button>
            </div>

            <div style={styles.footerLinksCol}>
              <h5 style={styles.footerHeading}>Resources</h5>
              <button onClick={() => scrollToSection('schemes')} style={styles.footerLink}>Subsidy Guide</button>
              <button onClick={() => scrollToSection('calculator')} style={styles.footerLink}>Savings Calculator</button>
              <a href="https://wa.me/919548595485" target="_blank" rel="noreferrer" style={styles.footerLink}>WhatsApp Chat</a>
            </div>

            <div style={styles.footerLinksCol}>
              <h5 style={styles.footerHeading}>Address</h5>
              <p style={styles.footerAddressText}>
                Shree Kanhaiya Mansion,<br />
                A-12, Nursery Circle,<br />
                Vaishali Nagar, Jaipur,<br />
                Rajasthan 302021
              </p>
              <a href="tel:+919548595485" style={styles.footerPhone}>+91 95485 95485</a>
            </div>

          </div>

          <div style={styles.footerBottom}>
            <p>© {new Date().getFullYear()} ZERO BILL SOLAR ENERGY. All Rights Reserved.</p>
            <p style={{ color: 'var(--text-tertiary)' }}>Waaree Certified Channel Partner</p>
          </div>
        </div>
      </footer>

      {/* ==================== FLOATING WIDGETS ==================== */}
      


      {/* Floating WhatsApp */}
      <a 
        href="https://wa.me/919548595485" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="whatsapp-widget"
        title="Chat on WhatsApp"
        aria-label="WhatsApp chat link"
      >
        <WhatsAppIcon size={28} />
      </a>

      {/* Back to top button */}
      {showScrollTop && (
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
          className="scroll-to-top"
          title="Scroll back to top"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </button>
      )}

    </div>
  );
}

/* ==========================================================================
   STYLING OBJECTS (Inline with standard layout handles)
   ========================================================================== */
const styles: Record<string, React.CSSProperties> = {
  header: {
    position: 'sticky' as const,
    top: 0,
    zIndex: 50,
    borderBottom: '1px solid var(--border)',
    transition: 'background-color 0.4s ease',
  },
  navContainer: {
    height: '4.75rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoGroup: {},
  logoIcon: {},
  logoText: {},
  logoSubtext: {},
  desktopNav: {},
  actionGroup: {},
  themeToggle: {},
  navWhatsAppBtn: {},
  mobileMenuToggle: {},
  
  // Mobile drawer styling
  drawerOverlay: {
    position: 'fixed' as const,
    inset: 0,
    background: 'rgba(0, 0, 0, 0.65)',
    backdropFilter: 'blur(5px)',
    zIndex: 100,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  drawer: {
    width: '20rem',
    height: '100%',
    background: 'var(--bg-primary)',
    borderLeft: '1px solid var(--border)',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'space-between',
    boxShadow: '-10px 0 30px rgba(0,0,0,0.2)',
  },
  drawerHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid var(--border)',
    paddingBottom: '1.25rem',
  },
  drawerClose: {
    background: 'none',
    border: 'none',
    color: 'var(--text-primary)',
    cursor: 'pointer',
  },
  drawerLinks: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1.5rem',
    margin: '3rem 0',
  },
  drawerLink: {
    background: 'none',
    border: 'none',
    color: 'var(--text-secondary)',
    fontSize: '1.15rem',
    fontWeight: '600',
    textAlign: 'left' as const,
    cursor: 'pointer',
    padding: '0.25rem 0',
  },
  drawerFooter: {
    borderTop: '1px solid var(--border)',
    paddingTop: '1.5rem',
  },
  drawerPhone: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    fontSize: '1.1rem',
    fontWeight: '700',
    color: 'var(--accent)',
    marginBottom: '0.5rem',
  },
  drawerFooterText: {
    fontSize: '0.75rem',
    color: 'var(--text-tertiary)',
  },

  // Hero Section
  heroHeadline: {},
  heroSubheadline: {},
  heroActions: {},
  heroTrustGrid: {},
  divider: {},
  heroTrustItem: {
    display: 'flex',
    flexDirection: 'column' as const,
  },
  livePulse: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: '#10b981',
    display: 'inline-block',
    boxShadow: '0 0 0 0 rgba(16, 185, 129, 0.7)',
    animation: 'pulse-live 1.6s infinite',
  },
  quickCalcContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.75rem',
    marginBottom: '2.5rem',
    maxWidth: '480px',
    width: '100%',
    padding: '1.25rem',
    borderRadius: 'var(--radius-sm)',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid var(--border)',
    backdropFilter: 'blur(10px)',
  },
  quickCalcText: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: 'var(--text-secondary)',
  },
  quickCalcInputRow: {
    display: 'flex',
    gap: '0.75rem',
  },
  quickCalcInput: {
    flex: 1,
    padding: '0.75rem 1.25rem',
    borderRadius: '9999px',
    border: '1px solid var(--border)',
    background: 'var(--bg-primary)',
    color: 'var(--text-primary)',
    fontSize: '0.9rem',
    outline: 'none',
  },
  quickCalcBtn: {
    padding: '0.75rem 1.75rem',
    borderRadius: '9999px',
    background: 'var(--accent)',
    color: '#ffffff',
    border: 'none',
    fontWeight: '600',
    fontSize: '0.9rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    cursor: 'pointer',
    transition: 'var(--transition-smooth)',
  },
  modalOverlay: {
    position: 'fixed' as const,
    inset: 0,
    background: 'rgba(0, 0, 0, 0.75)',
    backdropFilter: 'blur(10px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 200,
    padding: '2rem',
  },
  modalContent: {},
  modalCloseBtn: {
    position: 'absolute' as const,
    top: '1.25rem',
    right: '1.25rem',
    width: '2.5rem',
    height: '2.5rem',
    borderRadius: '50%',
    background: 'var(--bg-tertiary)',
    border: '1px solid var(--border)',
    color: 'var(--text-primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: 10,
    transition: 'var(--transition-smooth)',
  },
  modalGrid: {},
  modalImageColumn: {
    position: 'relative' as const,
    overflow: 'hidden' as const,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalImageBlurBackground: {
    position: 'absolute' as const,
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
    filter: 'blur(20px) brightness(0.65)',
    transform: 'scale(1.1)',
    zIndex: 1,
  },
  modalImage: {
    position: 'relative' as const,
    width: '100%',
    height: '100%',
    objectFit: 'contain' as const,
    zIndex: 2,
  },
  modalBadgeOverlay: {
    position: 'absolute' as const,
    top: '1.5rem',
    left: '1.5rem',
    zIndex: 3,
  },
  modalTextColumn: {},
  modalTitle: {},
  modalDesc: {
    color: 'var(--text-secondary)',
    fontSize: '0.95rem',
    lineHeight: '1.5',
    marginBottom: '1.5rem',
  },
  modalSpecsGrid: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.75rem',
    marginBottom: '2rem',
  },
  specsHeading: {
    fontSize: '0.85rem',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
    color: 'var(--text-tertiary)',
    fontWeight: '700',
    borderBottom: '1px solid var(--border)',
    paddingBottom: '0.5rem',
  },
  specsList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.6rem',
  },
  specRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.88rem',
  },
  specLabel: {
    color: 'var(--text-secondary)',
  },
  specValue: {
    fontWeight: '600',
    color: 'var(--text-primary)',
  },
  stars: {
    color: '#f59e0b',
    fontSize: '1.1rem',
    fontWeight: '700',
    letterSpacing: '1.5px',
  },
  trustText: {
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
    marginTop: '0.25rem',
    fontWeight: '500',
  },
  metricsTitle: {
    fontSize: '1.75rem',
    fontWeight: '800',
    color: 'var(--text-primary)',
    lineHeight: '1',
  },

  // Trust Bar
  trustBar: {
    background: 'var(--bg-secondary)',
    borderBottom: '1px solid var(--border)',
    padding: '1.75rem 0',
  },
  trustBarContainer: {},
  trustBarItem: {},

  // About Section
  aboutGrid: {},
  aboutTextContent: {},
  aboutBody: {
    fontSize: '1.05rem',
    lineHeight: '1.6',
    color: 'var(--text-secondary)',
    marginBottom: '2.5rem',
  },
  statsCountGrid: {},
  statsCountCard: {
    display: 'flex',
    flexDirection: 'column' as const,
  },
  statsCountLabel: {
    fontSize: '0.7rem',
    letterSpacing: '0.12em',
    color: 'var(--text-tertiary)',
    fontWeight: '700',
    marginTop: '0.5rem',
  },
  aboutVisualContent: {
    display: 'flex',
    justifyContent: 'center',
  },
  imageOverlayContainer: {
    position: 'relative' as const,
    borderRadius: 'var(--radius-lg)',
    overflow: 'hidden',
    boxShadow: 'var(--card-shadow)',
    width: '100%',
    aspectRatio: '1.25',
  },
  aboutImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
  },
  addressFloatingBadge: {
    position: 'absolute' as const,
    bottom: '1.5rem',
    left: '1.5rem',
    right: '1.5rem',
    padding: '1.25rem',
    borderRadius: 'var(--radius-sm)',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },

  // Process timeline
  processGrid: {},
  processCard: {
    position: 'relative' as const,
    padding: '2.5rem 2rem',
    height: '100%',
  },
  processNum: {
    fontSize: '3.75rem',
    fontWeight: '800',
    color: 'var(--accent)',
    lineHeight: '1',
    opacity: '0.2',
    marginBottom: '1rem',
    fontFamily: 'var(--font-heading)',
  },
  processTitle: {
    fontSize: '1.3rem',
    fontWeight: '700',
    marginBottom: '0.75rem',
  },

  // Service solutions
  serviceCard: {
    position: 'relative' as const,
    display: 'flex',
    flexDirection: 'column' as const,
    transition: 'var(--transition-smooth)',
    height: '100%',
  },
  serviceTitle: {
    fontSize: '1.65rem',
    fontWeight: '700',
    marginBottom: '0.875rem',
  },
  serviceDescription: {
    color: 'var(--text-secondary)',
    fontSize: '0.98rem',
    lineHeight: '1.5',
    marginBottom: '1.75rem',
  },
  serviceExpansion: {
    paddingTop: '1.5rem',
    borderTop: '1px dashed var(--border)',
    marginBottom: '1.5rem',
  },
  expansionList: {
    listStyleType: 'none',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.75rem',
  },
  expansionItem: {
    display: 'flex',
    gap: '0.75rem',
    fontSize: '0.88rem',
    color: 'var(--text-secondary)',
    lineHeight: '1.4',
  },
  serviceActionBtn: {
    marginTop: 'auto',
    background: 'none',
    border: 'none',
    color: 'var(--accent)',
    fontSize: '0.9rem',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    cursor: 'pointer',
    alignSelf: 'flex-start',
    padding: 0,
  },

  // Government subsidy showcase
  schemesContainer: {},
  schemesTextSide: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1rem',
    color: '#ffffff',
  },
  schemesTitle: {
    fontSize: 'clamp(2.25rem, 4vw, 3.25rem)',
    fontWeight: '700',
    letterSpacing: '-0.04em',
    lineHeight: '1.1',
  },
  schemesSubtitle: {
    color: '#a7f3d0',
    fontSize: '1.15rem',
    lineHeight: '1.5',
  },
  schemesGridSide: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1.25rem',
  },
  schemeMetricCard: {},
  schemeMetricLabel: {},
  schemeMetricValue: {},
  schemeMetricHelp: {},

  // Projects gallery
  projectsHeader: {},
  filterContainer: {},
  filterBtn: {
    border: 'none',
    padding: '0.6rem 1.5rem',
    borderRadius: '9999px',
    fontSize: '0.88rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'var(--transition-smooth)',
  },
  projectsGrid: {},
  projectCard: {
    position: 'relative' as const,
    borderRadius: 'var(--radius-md)',
    overflow: 'hidden',
    aspectRatio: '1.2',
    boxShadow: 'var(--card-shadow)',
  },
  projectImageWrapper: {
    position: 'relative' as const,
    width: '100%',
    height: '100%',
    cursor: 'pointer',
    overflow: 'hidden',
  },
  projectImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
    transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
  },
  projectOverlay: {
    position: 'absolute' as const,
    inset: 0,
    background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 70%)',
    display: 'flex',
    alignItems: 'flex-end',
    padding: '1.5rem',
    transition: 'var(--transition-smooth)',
  },
  projectOverlayText: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.5rem',
    width: '100%',
  },
  projectCardTitle: {
    fontSize: '1.75rem',
    fontWeight: '700',
    color: '#ffffff',
  },
  projectCardLocation: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.95rem',
    color: '#a1a1aa',
  },

  // Testimonials Slider
  testimonialContainer: {},
  testimonialQuotes: {},
  testimonialText: {},
  testimonialAuthor: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  authorAvatar: {
    width: '2.75rem',
    height: '2.75rem',
    borderRadius: '1.375rem',
    background: 'var(--accent-glow)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    alignSelf: 'flex-end',
  },
  sliderArrowBtn: {
    width: '3rem',
    height: '3rem',
    borderRadius: '1.5rem',
    background: 'var(--bg-tertiary)',
    border: '1px solid var(--border)',
    color: 'var(--text-primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'var(--transition-smooth)',
  },
  sliderPages: {
    fontSize: '0.95rem',
    fontWeight: '600',
    color: 'var(--text-secondary)',
  },

  // Contact form layout
  contactSectionGrid: {},
  contactInfo: {},
  contactIntroText: {
    fontSize: '1.1rem',
    color: 'var(--text-secondary)',
    lineHeight: '1.5',
    marginBottom: '3rem',
  },
  contactDirectDetails: {},
  contactDetailItem: {
    display: 'flex',
    alignItems: 'start',
    gap: '1.25rem',
  },
  contactDetailIcon: {
    width: '3rem',
    height: '3rem',
    borderRadius: 'var(--radius-xs)',
    background: 'var(--accent-glow)',
    color: 'var(--accent)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  contactDetailLabel: {
    fontSize: '0.8rem',
    color: 'var(--text-tertiary)',
    fontWeight: '700',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
  },
  contactDetailLink: {
    fontSize: 'clamp(1rem, 3.5vw, 1.35rem)',
    fontWeight: '700',
    color: 'var(--text-primary)',
    transition: 'var(--transition-smooth)',
    wordBreak: 'break-word',
  },
  contactFormContainer: {},
  formStructure: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1.5rem',
  },
  formRow: {},
  formInputWrapper: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.5rem',
  },
  formLabel: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: 'var(--text-secondary)',
  },
  formInput: {},
  formTextarea: {},
  successScreen: {
    textAlign: 'center' as const,
    padding: '3rem 1rem',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
  },

  // Footer styling
  footer: {},
  footerMainGrid: {},
  footerLeft: {},
  footerDesc: {
    fontSize: '0.9rem',
    lineHeight: '1.5',
    maxWidth: '280px',
  },
  footerBadge: {
    display: 'inline-block',
    padding: '0.4rem 1rem',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: '9999px',
    fontSize: '0.75rem',
    fontWeight: '600',
    color: '#ffffff',
  },
  footerLinksCol: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.875rem',
    alignItems: 'flex-start',
  },
  footerHeading: {
    fontSize: '0.95rem',
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: '0.5rem',
  },
  footerLink: {
    background: 'none',
    border: 'none',
    color: '#a1a1aa',
    fontSize: '0.88rem',
    cursor: 'pointer',
    textAlign: 'left' as const,
    transition: 'color 0.3s ease',
    padding: 0,
  },
  footerAddressText: {
    fontSize: '0.88rem',
    lineHeight: '1.5',
  },
  footerPhone: {
    fontSize: '1.2rem',
    fontWeight: '700',
    color: '#10b981',
    marginTop: '0.5rem',
    display: 'inline-block',
  },
  footerBottom: {
    borderTop: '1px solid rgba(255,255,255,0.06)',
    paddingTop: '2rem',
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap' as const,
    gap: '1rem',
    fontSize: '0.8rem',
  },
  detailsPage: {
    padding: '3rem 0',
    minHeight: '60vh',
    display: 'flex',
    alignItems: 'center',
  },
  detailsContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '2.5rem',
    width: '100%',
  },
  detailsNav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid var(--border)',
    paddingBottom: '1.25rem',
    flexWrap: 'wrap' as const,
    gap: '1rem',
    width: '100%',
  },
  backBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--accent)',
    fontSize: '0.95rem',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    cursor: 'pointer',
    padding: 0,
    transition: 'var(--transition-smooth)',
  },
  breadcrumb: {
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
    fontWeight: '500',
  },
  detailsImageColumn: {
    width: '100%',
  },
  detailsImageWrapper: {
    position: 'relative' as const,
    borderRadius: 'var(--radius-lg)',
    overflow: 'hidden',
    boxShadow: 'var(--card-shadow)',
    width: '100%',
    aspectRatio: '1.4',
  },
  detailsImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
  },
  detailsBadge: {
    position: 'absolute' as const,
    top: '1.5rem',
    left: '1.5rem',
    background: 'var(--accent)',
    color: '#ffffff',
    padding: '0.6rem 1.25rem',
    borderRadius: '9999px',
    fontSize: '0.85rem',
    fontWeight: '600',
    boxShadow: '0 8px 20px rgba(16, 185, 129, 0.25)',
  },
  detailsContentColumn: {
    display: 'flex',
    flexDirection: 'column' as const,
    width: '100%',
  },
  detailsTitle: {
    fontSize: 'clamp(2.25rem, 5vw, 3.25rem)',
    fontWeight: '700',
    letterSpacing: '-0.04em',
    marginBottom: '1.5rem',
    lineHeight: '1.1',
    color: 'var(--text-primary)',
  },
  detailsDesc: {
    fontSize: '1.05rem',
    lineHeight: '1.65',
    color: 'var(--text-secondary)',
    marginBottom: '2.5rem',
  },
  detailsSpecsWrapper: {
    marginBottom: '2.5rem',
    width: '100%',
  },
  detailsSpecsList: {
    display: 'flex',
    flexDirection: 'column' as const,
    width: '100%',
  },
  detailsInquireBtn: {
    alignSelf: 'flex-start',
    width: '100%',
    padding: '1.1rem 2rem',
    fontSize: '1.05rem',
    borderRadius: 'var(--radius-md)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.75rem',
  },
  inquiryPage: {
    padding: '4rem 0',
    background: 'var(--bg-primary)',
    minHeight: '80vh',
    display: 'flex',
    alignItems: 'center',
  },
  inquiryContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '2.5rem',
    width: '100%',
  },
  inquirySummaryCard: {
    background: 'var(--bg-secondary)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-md)',
    padding: '2rem',
  },
  miniProjectCard: {
    display: 'flex',
    gap: '1.25rem',
    alignItems: 'center',
  },
  miniImageWrapper: {
    width: '80px',
    height: '80px',
    borderRadius: 'var(--radius-xs)',
    overflow: 'hidden',
    flexShrink: 0,
  },
  miniImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
  },
  miniCardContent: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.25rem',
  },
  miniBadge: {
    display: 'inline-block',
    fontSize: '0.72rem',
    fontWeight: '700',
    color: 'var(--accent)',
    textTransform: 'uppercase' as const,
  },
  miniTitle: {
    fontSize: '1.15rem',
    fontWeight: '700',
    color: 'var(--text-primary)',
  },
  miniLocation: {
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
  },
  inquiryFormCard: {
    padding: '3rem',
    borderRadius: 'var(--radius-lg)',
    width: '100%',
  },
};

interface ProjectDetailsViewProps {
  project: Project;
  onBack: () => void;
  onInquire: (setupInfo: string) => void;
}

const ProjectDetailsView: React.FC<ProjectDetailsViewProps> = ({ project, onBack, onInquire }) => {
  return (
    <main className="details-page" style={styles.detailsPage}>
      <div className="container" style={styles.detailsContainer}>
        {/* Breadcrumb / Back Navigation */}
        <div style={styles.detailsNav}>
          <button onClick={onBack} style={styles.backBtn}>
            <ChevronLeft size={16} />
            <span>Back to Home</span>
          </button>
          <span style={styles.breadcrumb}>
            Projects / {project.title}
          </span>
        </div>

        {/* Project Details Grid */}
        <div className="details-grid">
          {/* Left Column: Image Card */}
          <div style={styles.detailsImageColumn}>
            <div style={styles.detailsImageWrapper}>
              <img src={project.imageUrl} alt={project.title} style={styles.detailsImage} />
              <div style={styles.detailsBadge}>
                {project.metric}
              </div>
            </div>
          </div>

          {/* Right Column: Content Card */}
          <div style={styles.detailsContentColumn}>
            <span className="section-subtitle" style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>
              {project.category.toUpperCase()} • {project.location}
            </span>
            <h1 className="heading" style={styles.detailsTitle}>{project.title}</h1>
            
            <p style={styles.detailsDesc}>{project.description}</p>

            <div style={styles.detailsSpecsWrapper}>
              <h4 style={styles.specsHeading}>Technical Specifications</h4>
              <div style={styles.detailsSpecsList}>
                {project.specs.map((spec, i) => (
                  <div key={i} className="spec-row">
                    <span className="spec-label">{spec.label}</span>
                    <span className="spec-value">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={() => {
                const setupInfo = `Interested in a ${project.title} setup similar to ${project.location}.`;
                onInquire(setupInfo);
              }} 
              className="btn btn-primary"
              style={styles.detailsInquireBtn}
            >
              Inquire About This Setup
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

interface InquiryPageViewProps {
  project: Project;
  onBack: () => void;
  fullName: string;
  setFullName: (val: string) => void;
  phoneNumber: string;
  setPhoneNumber: (val: string) => void;
  emailAddress: string;
  setEmailAddress: (val: string) => void;
  roofDetails: string;
  setRoofDetails: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  submitSuccess: boolean;
  setSubmitSuccess: (val: boolean) => void;
  onGoHome: () => void;
}

const InquiryPageView: React.FC<InquiryPageViewProps> = ({
  project,
  onBack,
  fullName,
  setFullName,
  phoneNumber,
  setPhoneNumber,
  emailAddress,
  setEmailAddress,
  roofDetails,
  setRoofDetails,
  onSubmit,
  isSubmitting,
  submitSuccess,
  setSubmitSuccess,
  onGoHome,
}) => {
  useEffect(() => {
    if (!roofDetails) {
      setRoofDetails(`Interested in a ${project.title} setup similar to ${project.location}.`);
    }
  }, [project, roofDetails, setRoofDetails]);

  return (
    <main className="inquiry-page" style={styles.inquiryPage}>
      <div className="container" style={styles.inquiryContainer}>
        {/* Navigation */}
        <div style={styles.detailsNav}>
          <button onClick={onBack} style={styles.backBtn}>
            <ChevronLeft size={16} />
            <span>Back to Details</span>
          </button>
          <span style={styles.breadcrumb}>
            Inquiry / {project.title}
          </span>
        </div>

        <div className="inquiry-grid">
          {/* Left Side: Summary Card */}
          <div style={styles.inquirySummaryCard}>
            <h3 className="heading" style={{ fontSize: '1.5rem', marginBottom: '1.25rem', color: 'var(--text-primary)' }}>Selected Setup</h3>
            <div style={styles.miniProjectCard}>
              <div style={styles.miniImageWrapper}>
                <img src={project.imageUrl} alt={project.title} style={styles.miniImage} />
              </div>
              <div style={styles.miniCardContent}>
                <span style={styles.miniBadge}>{project.metric}</span>
                <h4 style={styles.miniTitle}>{project.title}</h4>
                <p style={styles.miniLocation}>{project.location}</p>
              </div>
            </div>
            <div style={{ marginTop: '2rem', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
              <h5 style={{ fontWeight: '700', fontSize: '0.9rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>Why this configuration?</h5>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                This {project.title} installation uses Waaree certified panels and inverters optimized for Rajasthan's climate, securing high efficiency and the maximum state subsidy of up to ₹78,000.
              </p>
            </div>
          </div>

          {/* Right Side: Form Card */}
          <div className="glass-panel" style={styles.inquiryFormCard}>
            {submitSuccess ? (
              <div style={styles.successScreen}>
                <CheckCircle size={64} color="#10b981" style={{ marginBottom: '1.5rem' }} />
                <h3 className="heading" style={{ fontSize: '1.75rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>Inquiry Submitted!</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: '400px', lineHeight: '1.5' }}>
                  Thank you, {fullName}. Our solar engineer will review the details for the <strong>{project.title}</strong> setup and contact you at <strong>{phoneNumber}</strong> within 2 hours.
                </p>
                <button 
                  onClick={() => {
                    setSubmitSuccess(false);
                    setFullName('');
                    setPhoneNumber('');
                    setEmailAddress('');
                    setRoofDetails('');
                    onGoHome();
                  }} 
                  className="btn btn-primary"
                  style={{ borderRadius: 'var(--radius-sm)' }}
                >
                  Return to Home
                </button>
              </div>
            ) : (
              <div>
                <h2 className="heading" style={{ fontSize: '1.85rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Request Site Survey</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '2rem', lineHeight: '1.5' }}>
                  Fill in your details below. We will analyze your roof requirements and get back with a customized quote.
                </p>
                
                <form onSubmit={onSubmit} style={styles.formStructure}>
                  <div className="form-row" style={styles.formRow}>
                    <div style={styles.formInputWrapper}>
                      <label style={styles.formLabel}>Full Name</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="Anil Choudhary" 
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="form-input"
                        style={styles.formInput}
                      />
                    </div>
                    <div style={styles.formInputWrapper}>
                      <label style={styles.formLabel}>Phone Number</label>
                      <input 
                        type="tel" 
                        required 
                        placeholder="95485 95485" 
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="form-input"
                        style={styles.formInput}
                      />
                    </div>
                  </div>

                  <div style={styles.formInputWrapper}>
                    <label style={styles.formLabel}>Email Address (Optional)</label>
                    <input 
                      type="email" 
                      placeholder="name@domain.com" 
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                      className="form-input"
                      style={styles.formInput}
                    />
                  </div>

                  <div style={styles.formInputWrapper}>
                    <label style={styles.formLabel}>Roof and Power Bill Details</label>
                    <textarea 
                      placeholder="My monthly electricity bill is around Rs. 7,000, and my roof is concrete with approx 1,000 sq ft shadow-free space..." 
                      rows={4}
                      value={roofDetails}
                      onChange={(e) => setRoofDetails(e.target.value)}
                      className="form-textarea"
                      style={styles.formTextarea}
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting} 
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '1rem', fontSize: '1.05rem', borderRadius: 'var(--radius-sm)' }}
                  >
                    {isSubmitting ? 'Sending Request...' : 'Submit Inquiry'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default App;
