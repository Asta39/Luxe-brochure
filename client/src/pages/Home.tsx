/**
 * DESIGN PHILOSOPHY: Romantic Minimalism
 * - Ivory (#FAF8F5) canvas, Crimson (#8B1A1A) headings, Gold (#C9A96E) accents
 * - Asymmetric editorial layouts: image bleeds on one side, text floats with generous padding
 * - Cormorant Garamond (serif display), Jost (body), Great Vibes (script accents)
 * - Scroll-triggered fade-in animations, gentle parallax on hero
 */

import { useEffect, useRef, useState } from "react";
import { Mail, Phone, Globe, Instagram, MapPin, ChevronDown, Star } from "lucide-react";
import { useLocation } from "wouter";
import InquiryModal from "@/components/InquiryModal";

// ─── Image CDN URLs ───────────────────────────────────────────────────────────
const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663416284923/VAXW3Vhviu7M238asRmJk5/hero-honeymoon-kRAWeAMGfE7Z8wa3FWsFQz.webp";
const ZANZIBAR_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663416284923/VAXW3Vhviu7M238asRmJk5/hero-zanzibar-mZVrX7iZMpmdoz5kWvbvc5.webp";
const SAFARI_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663416284923/VAXW3Vhviu7M238asRmJk5/hero-safari-2gGVEbUoh7kuzSQM4J2ruH.webp";
const SOVEREIGN_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663416284923/VAXW3Vhviu7M238asRmJk5/hero-sovereign-oSzP7XP6veCTeZATkCviJB.webp";
const ISLAND_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663416284923/VAXW3Vhviu7M238asRmJk5/hero-island-W5223mdrTmimpyNPAjki4o.webp";

// ─── Data ─────────────────────────────────────────────────────────────────────
const packages = [
  {
    id: "barefoot",
    name: "Barefoot Romance",
    tagline: "Where the ocean meets your soul",
    destinations: ["Zanzibar", "Diani", "Watamu"],
    nights: "5 Nights",
    price: "KES 420,000",
    priceNote: "Flights Included",
    image: ZANZIBAR_IMG,
    inclusions: [
      "Five nights of oceanfront serenity",
      "Return flights from Nairobi",
      "Seamless private transfers",
      "A candlelit dinner beneath the stars",
      "A restorative couple's spa ritual",
      "Daily gourmet breakfasts",
    ],
    color: "from-teal-900/60",
    badge: null,
  },
  {
    id: "island",
    name: "Island Escape",
    tagline: "Refined luxury on the world's finest islands",
    destinations: ["Bali", "Mauritius", "Phuket"],
    nights: "6–7 Nights",
    price: "KES 960,000",
    priceNote: "Flights Included",
    image: ISLAND_IMG,
    inclusions: [
      "Six to seven nights of refined island luxury",
      "Return international flights",
      "Private airport welcomes",
      "A curated romantic island experience",
      "Honeymoon suite styling",
      "Signature couple's spa indulgence",
    ],
    color: "from-blue-900/60",
    badge: "Popular",
  },
  {
    id: "safari",
    name: "Wild & In Love",
    tagline: "Romance under the infinite African sky",
    destinations: ["Maasai Mara", "Samburu", "Laikipia"],
    nights: "5+ Nights",
    price: "KES 520,000",
    priceNote: "Flights Included",
    image: SAFARI_IMG,
    inclusions: [
      "Luxury tented suites under African skies",
      "Return safari flights from Nairobi",
      "Daily private game drives",
      "Champagne sundowners at golden hour",
      "An intimate bush dinner experience",
      "All meals thoughtfully curated",
    ],
    color: "from-amber-900/60",
    badge: null,
  },
  {
    id: "sovereign",
    name: "The Sovereign Escape",
    tagline: "The pinnacle of honeymoon luxury",
    destinations: ["Santorini", "Ibiza", "Langkawi", "Maldives"],
    nights: "6–8 Nights",
    price: "KES 1,420,000",
    priceNote: "Per Couple · Flights Included",
    image: SOVEREIGN_IMG,
    inclusions: [
      "6–8 nights in hand-selected 5★ luxury resorts",
      "Return international flights from Nairobi",
      "VIP airport handling & private transfers",
      "Ocean-view or cliffside premium suites",
      "Signature sunset dining experience",
      "Private curated island excursion",
      "Luxury couple's spa ritual",
      "Dedicated Luxe & Allure concierge",
    ],
    color: "from-purple-900/60",
    badge: "Signature",
  },
];

// ─── Hooks ────────────────────────────────────────────────────────────────────
function useScrollAnimation() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".fade-in-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function useNavScroll() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return scrolled;
}

// ─── Components ───────────────────────────────────────────────────────────────

function GoldDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="h-px flex-1 max-w-[60px]" style={{ backgroundColor: "#C9A96E" }} />
      <div className="w-1.5 h-1.5 rotate-45" style={{ backgroundColor: "#C9A96E" }} />
      <div className="h-px flex-1 max-w-[60px]" style={{ backgroundColor: "#C9A96E" }} />
    </div>
  );
}

function Nav({ scrolled }: { scrolled: boolean }) {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "nav-solid" : "nav-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex flex-col items-start">
          <span
            className="font-script text-3xl leading-none"
            style={{ color: "#8B1A1A" }}
          >
            Luxe &amp; Allure
          </span>
          <span
            className="font-body text-[9px] tracking-[0.25em] uppercase mt-0.5"
            style={{ color: scrolled ? "#8B1A1A" : "#FAF8F5", opacity: 0.8 }}
          >
            Events &amp; Decor
          </span>
        </div>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-8">
          {["packages", "experience", "contact"].map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              className="font-body text-xs tracking-[0.2em] uppercase transition-colors duration-200"
              style={{ color: scrolled ? "#2D2D2D" : "#FAF8F5" }}
            >
              {item}
            </button>
          ))}
          <button
            onClick={() => scrollTo("contact")}
            className="btn-gold text-xs"
          >
            Book Now
          </button>
        </div>

        {/* Mobile menu */}
        <button
          onClick={() => scrollTo("contact")}
          className="md:hidden btn-gold text-xs"
        >
          Book Now
        </button>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden flex items-center justify-center">
      {/* Background video with overlay */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source
            src="https://videos.pexels.com/video-files/3576379/3576379-uhd_3840_2160_25fps.mp4"
            type="video/mp4"
          />
          {/* Fallback to image if video doesn't load */}
          <img
            src={HERO_IMG}
            alt="Romantic honeymoon sunset"
            className="w-full h-full object-cover"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/25 to-black/50" />
      </div>

      {/* Hero content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <p className="font-script text-4xl md:text-5xl text-white/90 animate-fade-in-delay-1 mb-2">
          Where elegance travels with you
        </p>
        <div className="flex justify-center my-4 animate-fade-in-delay-2">
          <GoldDivider />
        </div>
        <h1
          className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-white animate-fade-in-delay-2 leading-none tracking-wide"
        >
          The Couture
          <br />
          <span className="italic font-medium">Honeymoon</span>
          <br />
          Collection
        </h1>
        <p className="font-body text-sm tracking-[0.3em] uppercase text-white/80 mt-6 animate-fade-in-delay-3">
          Luxe &amp; Allure Events &amp; Decor
        </p>
        <div className="mt-10 animate-fade-in-delay-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            className="btn-gold"
            onClick={() => document.getElementById("packages")?.scrollIntoView({ behavior: "smooth" })}
          >
            Explore Packages
          </button>
          <button
            className="btn-outline-crimson border-white/60 text-white hover:bg-white/10"
            style={{ borderColor: "rgba(255,255,255,0.5)", color: "white" }}
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Begin Your Journey
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-white/60" />
      </div>
    </section>
  );
}

function IntroSection() {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: "#FAF8F5" }}>
      <div className="max-w-4xl mx-auto text-center fade-in-up">
        <p className="font-script text-3xl md:text-4xl mb-4" style={{ color: "#8B1A1A" }}>
          Crafted for the extraordinary
        </p>
        <GoldDivider className="justify-center mb-8" />
        <p className="font-display text-xl md:text-2xl font-light leading-relaxed" style={{ color: "#2D2D2D" }}>
          At Luxe &amp; Allure, we believe your honeymoon should be as unique as your love story. 
          Each of our curated packages is thoughtfully designed to wrap you in elegance — 
          from the moment you depart Nairobi to the last lingering sunset of your journey.
        </p>
        <p className="font-body text-sm tracking-[0.2em] uppercase mt-8 opacity-60" style={{ color: "#2D2D2D" }}>
          Four Collections · Infinite Memories
        </p>
      </div>

      {/* Stats row */}
      <div className="max-w-5xl mx-auto mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 fade-in-up">
        {[
          { number: "4", label: "Curated Collections" },
          { number: "15+", label: "Destinations" },
          { number: "100%", label: "Personalised" },
          { number: "5★", label: "Luxury Standard" },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <div
              className="font-display text-4xl md:text-5xl font-light"
              style={{ color: "#8B1A1A" }}
            >
              {stat.number}
            </div>
            <div
              className="h-px w-8 mx-auto my-3"
              style={{ backgroundColor: "#C9A96E" }}
            />
            <div
              className="font-body text-xs tracking-[0.2em] uppercase opacity-70"
              style={{ color: "#2D2D2D" }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function PackageCard({
  pkg,
  index,
  onEnquire,
  onViewDetails,
}: {
  pkg: (typeof packages)[0];
  index: number;
  onEnquire: (pkg: { id: string; name: string; price: string }) => void;
  onViewDetails: (packageId: string) => void;
}) {
  const isEven = index % 2 === 0;

  return (
    <div
      id={index === 0 ? "packages" : undefined}
      className={`relative flex flex-col ${
        isEven ? "lg:flex-row" : "lg:flex-row-reverse"
      } fade-in-up`}
      style={{ minHeight: "580px" }}
    >
      {/* Destination watermark */}
      <div
        className="destination-watermark"
        style={{
          top: "50%",
          [isEven ? "right" : "left"]: "-2%",
          transform: "translateY(-50%)",
          zIndex: 0,
        }}
      >
        {pkg.destinations[0]}
      </div>

      {/* Image side */}
      <div className="relative lg:w-[55%] img-hover-zoom overflow-hidden" style={{ minHeight: "520px" }}>
        <img
          src={pkg.image}
          alt={pkg.name}
          className="w-full h-full object-cover absolute inset-0"
        />
        {/* Gradient overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-r ${
            isEven ? "from-transparent to-black/20" : "from-black/20 to-transparent"
          }`}
        />
        {/* Badge */}
        {pkg.badge && (
          <div
            className="absolute top-6 left-6 px-4 py-1.5 font-body text-xs tracking-[0.2em] uppercase"
            style={{ backgroundColor: "#8B1A1A", color: "#FAF8F5" }}
          >
            {pkg.badge}
          </div>
        )}
        {/* Price tag on image */}
        <div
          className="absolute bottom-6 right-6 text-right"
          style={{ color: "#FAF8F5" }}
        >
          <div className="font-body text-xs tracking-[0.15em] uppercase opacity-80 mb-1">
            Starting from
          </div>
          <div className="font-display text-2xl font-semibold">{pkg.price}</div>
          <div className="font-body text-xs opacity-70">{pkg.priceNote}</div>
        </div>
      </div>

      {/* Content side */}
      <div
        className={`lg:w-[45%] flex flex-col justify-center px-8 md:px-12 lg:px-16 py-16 relative z-10`}
        style={{ backgroundColor: "#FAF8F5" }}
      >
        {/* Nights badge */}
        <div
          className="font-body text-xs tracking-[0.25em] uppercase mb-4"
          style={{ color: "#C9A96E" }}
        >
          {pkg.nights}
        </div>

        {/* Package name */}
        <h2
          className="font-display text-4xl md:text-5xl font-light leading-tight mb-2"
          style={{ color: "#8B1A1A" }}
        >
          {pkg.name}
        </h2>

        {/* Tagline */}
        <p className="font-script text-xl mb-4" style={{ color: "#C9A96E" }}>
          {pkg.tagline}
        </p>

        {/* Gold divider */}
        <div className="gold-divider-left mb-6" />

        {/* Destinations */}
        <div className="flex flex-wrap gap-2 mb-6">
          {pkg.destinations.map((dest) => (
            <span
              key={dest}
              className="font-body text-xs tracking-[0.15em] uppercase px-3 py-1.5 border"
              style={{ borderColor: "#C9A96E", color: "#8B1A1A" }}
            >
              {dest}
            </span>
          ))}
        </div>

        {/* Inclusions */}
        <div className="space-y-2.5 mb-8">
          {pkg.inclusions.map((item) => (
            <div key={item} className="flex items-start gap-3">
              <div
                className="w-1 h-1 rounded-full mt-2 flex-shrink-0"
                style={{ backgroundColor: "#C9A96E" }}
              />
              <span
                className="font-body text-sm leading-relaxed"
                style={{ color: "#2D2D2D", opacity: 0.85 }}
              >
                {item}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <button
            className="btn-gold"
            onClick={() => onEnquire({ id: pkg.id, name: pkg.name, price: pkg.price })}
          >
            Enquire Now
          </button>
          <button
            className="btn-outline-crimson"
            onClick={() => onViewDetails(pkg.id)}
          >
            View Details
          </button>
          <div
            className="font-display text-2xl font-semibold"
            style={{ color: "#8B1A1A" }}
          >
            {pkg.price}
          </div>
        </div>
      </div>
    </div>
  );
}

function ExperienceSection() {
  const experiences = [
    {
      icon: "✦",
      title: "Curated Itineraries",
      desc: "Every detail is thoughtfully planned — from arrival transfers to sunset dining reservations.",
    },
    {
      icon: "✦",
      title: "Private Transfers",
      desc: "Seamless, door-to-door private transportation throughout your entire journey.",
    },
    {
      icon: "✦",
      title: "Couple's Spa Rituals",
      desc: "Restorative spa experiences designed exclusively for two, at world-class resort spas.",
    },
    {
      icon: "✦",
      title: "Concierge Support",
      desc: "Your dedicated Luxe & Allure concierge is available throughout your honeymoon.",
    },
    {
      icon: "✦",
      title: "Gourmet Dining",
      desc: "From candlelit beach dinners to intimate bush feasts — every meal is an occasion.",
    },
    {
      icon: "✦",
      title: "Suite Styling",
      desc: "Honeymoon suite decorated with flowers, petals, and personalised touches on arrival.",
    },
  ];

  return (
    <section
      id="experience"
      className="py-24 px-6 relative overflow-hidden"
      style={{ backgroundColor: "#2D2D2D" }}
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, #C9A96E 0, #C9A96E 1px, transparent 0, transparent 50%)`,
          backgroundSize: "20px 20px",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 fade-in-up">
          <p className="font-script text-3xl mb-3" style={{ color: "#C9A96E" }}>
            The Luxe &amp; Allure Difference
          </p>
          <GoldDivider className="justify-center mb-6" />
          <h2
            className="font-display text-4xl md:text-5xl font-light"
            style={{ color: "#FAF8F5" }}
          >
            Every Detail, Perfected
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((exp, i) => (
            <div
              key={exp.title}
              className="fade-in-up p-8 border border-white/10 hover:border-[#C9A96E]/40 transition-colors duration-300"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div
                className="font-display text-2xl mb-4"
                style={{ color: "#C9A96E" }}
              >
                {exp.icon}
              </div>
              <h3
                className="font-display text-xl font-medium mb-3"
                style={{ color: "#FAF8F5" }}
              >
                {exp.title}
              </h3>
              <p
                className="font-body text-sm leading-relaxed"
                style={{ color: "rgba(250,248,245,0.65)" }}
              >
                {exp.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialSection() {
  return (
    <section
      className="py-24 px-6 relative overflow-hidden"
      style={{ backgroundColor: "#FAF8F5" }}
    >
      <div className="max-w-3xl mx-auto text-center fade-in-up">
        <div className="flex justify-center gap-1 mb-6">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className="w-4 h-4 fill-current"
              style={{ color: "#C9A96E" }}
            />
          ))}
        </div>
        <blockquote
          className="font-display text-2xl md:text-3xl italic font-light leading-relaxed mb-8"
          style={{ color: "#2D2D2D" }}
        >
          "Our Luxe &amp; Allure honeymoon was beyond anything we could have imagined. 
          Every detail was flawlessly arranged — from the private beach dinner in Zanzibar 
          to the champagne waiting in our suite. Truly the most magical week of our lives."
        </blockquote>
        <GoldDivider className="justify-center mb-6" />
        <p className="font-body text-xs tracking-[0.25em] uppercase" style={{ color: "#8B1A1A" }}>
          Amara &amp; David — Barefoot Romance Package
        </p>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden"
      style={{ minHeight: "600px" }}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={SOVEREIGN_IMG}
          alt="Begin your journey"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
      </div>

      <div className="relative z-10 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: CTA text */}
            <div className="fade-in-up">
              <p className="font-script text-4xl mb-3" style={{ color: "#C9A96E" }}>
                Begin Your Journey
              </p>
              <GoldDivider className="mb-6" />
              <h2
                className="font-display text-4xl md:text-5xl font-light leading-tight mb-6"
                style={{ color: "#FAF8F5" }}
              >
                Let us craft your
                <br />
                <span className="italic">perfect escape</span>
              </h2>
              <p
                className="font-body text-sm leading-relaxed mb-8"
                style={{ color: "rgba(250,248,245,0.75)" }}
              >
                Reach out to our team and we will personally guide you through 
                selecting and customising the perfect honeymoon package for your love story.
              </p>
              <div className="space-y-4">
                {[
                  { icon: Mail, text: "info@luxeandallureevents.co.ke", href: "mailto:info@luxeandallureeventske.co.ke" },
                  { icon: Globe, text: "www.luxeandallureevents.co.ke", href: "https://www.luxeandallureevents.co.ke" },
                  { icon: Instagram, text: "@luxeandallureevents", href: "https://instagram.com/luxeallureevents" },
                ].map(({ icon: Icon, text, href }) => (
                  <a
                    key={text}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 group"
                  >
                    <Icon
                      className="w-4 h-4 flex-shrink-0"
                      style={{ color: "#C9A96E" }}
                    />
                    <span
                      className="font-body text-sm group-hover:opacity-100 transition-opacity"
                      style={{ color: "rgba(250,248,245,0.8)" }}
                    >
                      {text}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Right: Quick enquiry form */}
            <div
              className="fade-in-up p-8 md:p-10"
              style={{ backgroundColor: "rgba(250,248,245,0.97)" }}
            >
              <h3
                className="font-display text-2xl font-medium mb-2"
                style={{ color: "#8B1A1A" }}
              >
                Send an Enquiry
              </h3>
              <p
                className="font-body text-xs tracking-[0.15em] uppercase mb-6"
                style={{ color: "#C9A96E" }}
              >
                We respond within 24 hours
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const name = (form.elements.namedItem("name") as HTMLInputElement).value;
                  const email = (form.elements.namedItem("email") as HTMLInputElement).value;
                  const pkg = (form.elements.namedItem("package") as HTMLSelectElement).value;
                  const msg = (form.elements.namedItem("message") as HTMLTextAreaElement).value;
                  window.location.href = `mailto:info@luxeandallureevents.co.ke?subject=Honeymoon Enquiry - ${pkg}&body=Name: ${name}%0AEmail: ${email}%0APackage: ${pkg}%0A%0AMessage: ${msg}`;
                }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      className="font-body text-xs tracking-[0.15em] uppercase block mb-1.5"
                      style={{ color: "#8B1A1A" }}
                    >
                      Full Name
                    </label>
                    <input
                      name="name"
                      required
                      className="w-full border-b bg-transparent py-2 font-body text-sm outline-none focus:border-[#8B1A1A] transition-colors"
                      style={{ borderColor: "#C9A96E", color: "#2D2D2D" }}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label
                      className="font-body text-xs tracking-[0.15em] uppercase block mb-1.5"
                      style={{ color: "#8B1A1A" }}
                    >
                      Email
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      className="w-full border-b bg-transparent py-2 font-body text-sm outline-none focus:border-[#8B1A1A] transition-colors"
                      style={{ borderColor: "#C9A96E", color: "#2D2D2D" }}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="font-body text-xs tracking-[0.15em] uppercase block mb-1.5"
                    style={{ color: "#8B1A1A" }}
                  >
                    Package of Interest
                  </label>
                  <select
                    name="package"
                    className="w-full border-b bg-transparent py-2 font-body text-sm outline-none focus:border-[#8B1A1A] transition-colors"
                    style={{ borderColor: "#C9A96E", color: "#2D2D2D" }}
                  >
                    <option value="Barefoot Romance">Barefoot Romance — KES 420,000</option>
                    <option value="Island Escape">Island Escape — KES 960,000</option>
                    <option value="Wild & In Love">Wild &amp; In Love — KES 520,000</option>
                    <option value="The Sovereign Escape">The Sovereign Escape — KES 1,420,000</option>
                    <option value="Not sure yet">Not sure yet — help me choose</option>
                  </select>
                </div>

                <div>
                  <label
                    className="font-body text-xs tracking-[0.15em] uppercase block mb-1.5"
                    style={{ color: "#8B1A1A" }}
                  >
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    className="w-full border-b bg-transparent py-2 font-body text-sm outline-none focus:border-[#8B1A1A] transition-colors resize-none"
                    style={{ borderColor: "#C9A96E", color: "#2D2D2D" }}
                    placeholder="Tell us about your dream honeymoon..."
                  />
                </div>

                <button type="submit" className="btn-gold w-full mt-2">
                  Send Enquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      className="py-12 px-6 text-center"
      style={{ backgroundColor: "#1A1210" }}
    >
      <p className="font-script text-3xl mb-2" style={{ color: "#C9A96E" }}>
        Luxe &amp; Allure
      </p>
      <p
        className="font-body text-xs tracking-[0.25em] uppercase mb-6"
        style={{ color: "rgba(201,169,110,0.6)" }}
      >
        Events &amp; Decor
      </p>
      <div
        className="h-px max-w-xs mx-auto mb-6"
        style={{ backgroundColor: "rgba(201,169,110,0.2)" }}
      />
      <p
        className="font-body text-xs"
        style={{ color: "rgba(250,248,245,0.35)" }}
      >
        © {new Date().getFullYear()} Luxe &amp; Allure Events &amp; Decor. All rights reserved.
        <br />
        <a
          href="mailto:info@luxeandallureevents.co.ke"
          className="hover:opacity-70 transition-opacity"
          style={{ color: "rgba(201,169,110,0.6)" }}
        >
          info@luxeandallureevents.co.ke
        </a>
      </p>
    </footer>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Home() {
  const scrolled = useNavScroll();
  useScrollAnimation();
  const [, navigate] = useLocation();
  const [selectedPackage, setSelectedPackage] = useState<{ id: string; name: string; price: string } | null>(null);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FAF8F5" }}>
      <Nav scrolled={scrolled} />
      <HeroSection />
      <IntroSection />

      {/* Packages */}
      <div id="packages" className="relative">
        {packages.map((pkg, i) => (
          <PackageCard
            key={pkg.id}
            pkg={pkg}
            index={i}
            onEnquire={setSelectedPackage}
            onViewDetails={(id) => navigate(`/package/${id}`)}
          />
        ))}
      </div>

      <ExperienceSection />
      <TestimonialSection />
      <ContactSection />
      <Footer />

      {/* Inquiry Modal */}
      {selectedPackage && (
        <InquiryModal
          isOpen={!!selectedPackage}
          onClose={() => setSelectedPackage(null)}
          packageName={selectedPackage.name}
          packagePrice={selectedPackage.price}
        />
      )}
    </div>
  );
}
