/**
 * DESIGN PHILOSOPHY: Romantic Minimalism
 * Detailed package page with full itinerary, gallery, and booking CTA
 */

import { useState } from "react";
import { ChevronLeft, MapPin, Clock, Users, Star } from "lucide-react";
import { useLocation } from "wouter";
import InquiryModal from "@/components/InquiryModal";

// ─── Image CDN URLs ───────────────────────────────────────────────────────────
const ZANZIBAR_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663416284923/VAXW3Vhviu7M238asRmJk5/hero-zanzibar-mZVrX7iZMpmdoz5kWvbvc5.webp";
const SAFARI_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663416284923/VAXW3Vhviu7M238asRmJk5/hero-safari-2gGVEbUoh7kuzSQM4J2ruH.webp";
const SOVEREIGN_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663416284923/VAXW3Vhviu7M238asRmJk5/hero-sovereign-oSzP7XP6veCTeZATkCviJB.webp";
const ISLAND_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663416284923/VAXW3Vhviu7M238asRmJk5/hero-island-W5223mdrTmimpyNPAjki4o.webp";

// ─── Package Data ─────────────────────────────────────────────────────────────
const packageDetails: Record<
  string,
  {
    name: string;
    tagline: string;
    price: string;
    priceNote: string;
    nights: string;
    destinations: string[];
    mainImage: string;
    overview: string;
    highlights: string[];
    itinerary: { day: string; title: string; description: string }[];
    inclusions: string[];
    exclusions: string[];
    bestFor: string;
  }
> = {
  barefoot: {
    name: "Barefoot Romance",
    tagline: "Where the ocean meets your soul",
    price: "KES 420,000",
    priceNote: "Flights Included",
    nights: "5 Nights",
    destinations: ["Zanzibar", "Diani", "Watamu"],
    mainImage: ZANZIBAR_IMG,
    overview:
      "Escape to pristine beaches where turquoise waters meet white sand and the gentle rhythm of island life soothes your soul. The Barefoot Romance package is designed for couples seeking oceanfront serenity, candlelit dinners under the stars, and the intimate connection that only a tropical paradise can inspire.",
    highlights: [
      "Oceanfront beachfront accommodations",
      "Candlelit dinner on the beach",
      "Couple's spa treatments",
      "Sunset beach walks",
      "Gourmet breakfast service",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Paradise",
        description:
          "Arrive in Zanzibar and be transferred to your oceanfront resort. Settle into your suite, enjoy a welcome dinner, and watch the sunset from your private terrace.",
      },
      {
        day: "Day 2",
        title: "Beach Bliss",
        description:
          "Spend the day at leisure on pristine beaches. Enjoy water activities, relax under palm trees, or explore the local island culture.",
      },
      {
        day: "Day 3",
        title: "Couple's Spa Ritual",
        description:
          "Indulge in a restorative couple's spa treatment featuring traditional island therapies. Followed by a romantic lunch at the resort.",
      },
      {
        day: "Day 4",
        title: "Candlelit Dinner",
        description:
          "Experience a private candlelit dinner on the beach with champagne, fresh seafood, and the sound of waves as your soundtrack.",
      },
      {
        day: "Day 5",
        title: "Departure",
        description:
          "Enjoy a final breakfast with ocean views before being transferred to the airport for your return to Nairobi.",
      },
    ],
    inclusions: [
      "5 nights in oceanfront luxury suite",
      "Return flights from Nairobi",
      "Airport transfers (private)",
      "Daily gourmet breakfast",
      "Candlelit beach dinner (1 night)",
      "Couple's spa ritual (90 minutes)",
      "All meals and beverages at resort",
      "Beach activities and water sports",
    ],
    exclusions: [
      "Travel insurance",
      "Visa fees",
      "Personal shopping and souvenirs",
      "Optional excursions",
      "Gratuities",
    ],
    bestFor:
      "Couples seeking a romantic beach escape with luxury accommodations and intimate dining experiences.",
  },
  island: {
    name: "Island Escape",
    tagline: "Refined luxury on the world's finest islands",
    price: "KES 960,000",
    priceNote: "Flights Included",
    nights: "6–7 Nights",
    destinations: ["Bali", "Mauritius", "Phuket"],
    mainImage: ISLAND_IMG,
    overview:
      "Discover the world's most enchanting island destinations in refined luxury. The Island Escape package combines pristine beaches, vibrant cultures, and 5-star resort experiences across multiple tropical paradises.",
    highlights: [
      "Multi-island experience",
      "Luxury resort accommodations",
      "Private island excursions",
      "Honeymoon suite styling",
      "Signature spa treatments",
    ],
    itinerary: [
      {
        day: "Days 1-2",
        title: "Bali Arrival",
        description:
          "Arrive in Bali and transfer to your luxury resort. Explore the island's temples, rice terraces, and vibrant markets.",
      },
      {
        day: "Days 3-4",
        title: "Island Hopping",
        description:
          "Take a private boat to nearby islands for snorkeling, beach picnics, and water sports.",
      },
      {
        day: "Days 5-6",
        title: "Mauritius or Phuket",
        description:
          "Fly to your second island destination for more beach time, cultural experiences, and luxury dining.",
      },
      {
        day: "Day 7",
        title: "Departure",
        description:
          "Final morning at leisure before transfer to airport for return to Nairobi.",
      },
    ],
    inclusions: [
      "6-7 nights in 5-star luxury resorts",
      "Return international flights",
      "Private airport transfers",
      "Daily breakfast",
      "Honeymoon suite styling",
      "Couple's spa indulgence",
      "Private island excursion",
      "All meals and beverages",
    ],
    exclusions: [
      "Travel insurance",
      "Visa fees",
      "Optional activities",
      "Personal expenses",
      "Gratuities",
    ],
    bestFor:
      "Adventurous couples who want to experience multiple tropical destinations in one honeymoon.",
  },
  safari: {
    name: "Wild & In Love",
    tagline: "Romance under the infinite African sky",
    price: "KES 520,000",
    priceNote: "Flights Included",
    nights: "5+ Nights",
    destinations: ["Maasai Mara", "Samburu", "Laikipia"],
    mainImage: SAFARI_IMG,
    overview:
      "Experience the raw beauty of Africa's greatest wildlife reserves while enjoying luxury tented accommodations. The Wild & In Love package combines thrilling game drives, intimate bush dinners, and the magic of African sunsets.",
    highlights: [
      "Daily private game drives",
      "Luxury tented suites",
      "Champagne sundowners",
      "Bush dinner experience",
      "Wildlife photography",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Safari Arrival",
        description:
          "Fly from Nairobi to the Maasai Mara. Arrive at your luxury tented camp and settle in before an evening game drive.",
      },
      {
        day: "Days 2-4",
        title: "Game Drives & Exploration",
        description:
          "Enjoy twice-daily private game drives with expert guides. Spot the Big Five and witness the incredible African wildlife.",
      },
      {
        day: "Day 4 Evening",
        title: "Bush Dinner",
        description:
          "Experience an intimate dinner under the stars in the African bush, with champagne and gourmet cuisine.",
      },
      {
        day: "Day 5",
        title: "Departure",
        description:
          "Final morning game drive before transfer to airstrip for return to Nairobi.",
      },
    ],
    inclusions: [
      "5+ nights in luxury tented suites",
      "Return safari flights from Nairobi",
      "Daily private game drives (twice daily)",
      "Professional safari guide",
      "Champagne sundowners",
      "Bush dinner experience",
      "All meals and beverages",
      "Park fees included",
    ],
    exclusions: [
      "Travel insurance",
      "Photography permits",
      "Optional activities",
      "Personal expenses",
      "Gratuities",
    ],
    bestFor:
      "Adventure-loving couples who want to experience African wildlife and luxury camping under the stars.",
  },
  sovereign: {
    name: "The Sovereign Escape",
    tagline: "The pinnacle of honeymoon luxury",
    price: "KES 1,420,000",
    priceNote: "Per Couple · Flights Included",
    nights: "6–8 Nights",
    destinations: ["Santorini", "Ibiza", "Langkawi", "Maldives"],
    mainImage: SOVEREIGN_IMG,
    overview:
      "The ultimate honeymoon experience combining Europe's most romantic destinations with tropical island luxury. The Sovereign Escape is for discerning couples who demand nothing but the finest in accommodation, dining, and personalized service.",
    highlights: [
      "Hand-selected 5-star resorts",
      "VIP airport handling",
      "Private yacht excursions",
      "Michelin-starred dining",
      "Dedicated concierge",
    ],
    itinerary: [
      {
        day: "Days 1-2",
        title: "Santorini Romance",
        description:
          "Arrive in Santorini and stay in a cliffside luxury suite. Enjoy sunset views, fine dining, and romantic walks.",
      },
      {
        day: "Days 3-4",
        title: "Ibiza Celebration",
        description:
          "Experience Ibiza's luxury resorts, private beach clubs, and vibrant nightlife.",
      },
      {
        day: "Days 5-6",
        title: "Langkawi Retreat",
        description:
          "Relax in a tropical paradise with jungle views, private pools, and spa treatments.",
      },
      {
        day: "Days 7-8",
        title: "Maldives Paradise",
        description:
          "End your journey in the Maldives with overwater villas, snorkeling, and ultimate luxury.",
      },
    ],
    inclusions: [
      "6-8 nights in hand-selected 5-star resorts",
      "Return international flights from Nairobi",
      "VIP airport handling & private transfers",
      "Ocean-view or cliffside premium suites",
      "Signature sunset dining experience",
      "Private curated island excursion",
      "Luxury couple's spa ritual",
      "Dedicated Luxe & Allure concierge",
      "All meals and premium beverages",
    ],
    exclusions: [
      "Travel insurance",
      "Visa fees",
      "Optional activities",
      "Personal shopping",
      "Gratuities",
    ],
    bestFor:
      "Discerning couples seeking the ultimate luxury honeymoon experience across multiple world-class destinations.",
  },
};

function GoldDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="h-px flex-1 max-w-[60px]" style={{ backgroundColor: "#C9A96E" }} />
      <div className="w-1.5 h-1.5 rotate-45" style={{ backgroundColor: "#C9A96E" }} />
      <div className="h-px flex-1 max-w-[60px]" style={{ backgroundColor: "#C9A96E" }} />
    </div>
  );
}

export default function PackageDetail({ packageId }: { packageId: string }) {
  const [, navigate] = useLocation();
  const pkg = packageDetails[packageId];
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!pkg) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#FAF8F5" }}>
        <div className="text-center">
          <h1 className="font-display text-3xl mb-4" style={{ color: "#8B1A1A" }}>
            Package Not Found
          </h1>
          <button
            onClick={() => navigate("/")}
            className="btn-gold"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FAF8F5" }}>
      {/* Navigation */}
      <nav className="sticky top-0 z-40 py-4 px-6" style={{ backgroundColor: "rgba(250, 248, 245, 0.95)", backdropFilter: "blur(10px)" }}>
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 font-body text-sm tracking-[0.15em] uppercase transition-colors hover:opacity-70"
            style={{ color: "#8B1A1A" }}
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>
        </div>
      </nav>

      {/* Hero image */}
      <div className="relative h-[500px] overflow-hidden">
        <img
          src={pkg.mainImage}
          alt={pkg.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />
        
        {/* Title overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <p className="font-script text-3xl mb-3" style={{ color: "#C9A96E" }}>
            {pkg.tagline}
          </p>
          <h1
            className="font-display text-5xl md:text-6xl font-light text-white leading-tight"
          >
            {pkg.name}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-20">
        {/* Quick info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { icon: Clock, label: "Duration", value: pkg.nights },
            { icon: MapPin, label: "Destinations", value: pkg.destinations.length },
            { icon: Star, label: "Luxury Level", value: "5★" },
            { icon: Users, label: "Best For", value: "Couples" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="text-center">
                <Icon
                  className="w-6 h-6 mx-auto mb-3"
                  style={{ color: "#C9A96E" }}
                />
                <p
                  className="font-body text-xs tracking-[0.15em] uppercase opacity-70"
                  style={{ color: "#2D2D2D" }}
                >
                  {item.label}
                </p>
                <p
                  className="font-display text-xl font-semibold mt-1"
                  style={{ color: "#8B1A1A" }}
                >
                  {item.value}
                </p>
              </div>
            );
          })}
        </div>

        {/* Overview */}
        <div className="mb-16">
          <h2
            className="font-display text-3xl font-light mb-4"
            style={{ color: "#8B1A1A" }}
          >
            Overview
          </h2>
          <GoldDivider className="mb-6" />
          <p
            className="font-body text-lg leading-relaxed"
            style={{ color: "#2D2D2D", opacity: 0.85 }}
          >
            {pkg.overview}
          </p>
        </div>

        {/* Highlights */}
        <div className="mb-16">
          <h2
            className="font-display text-3xl font-light mb-4"
            style={{ color: "#8B1A1A" }}
          >
            Highlights
          </h2>
          <GoldDivider className="mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pkg.highlights.map((highlight) => (
              <div key={highlight} className="flex items-start gap-3">
                <div
                  className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                  style={{ backgroundColor: "#C9A96E" }}
                />
                <span
                  className="font-body text-base"
                  style={{ color: "#2D2D2D" }}
                >
                  {highlight}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Itinerary */}
        <div className="mb-16">
          <h2
            className="font-display text-3xl font-light mb-4"
            style={{ color: "#8B1A1A" }}
          >
            Itinerary
          </h2>
          <GoldDivider className="mb-6" />
          <div className="space-y-6">
            {pkg.itinerary.map((day, idx) => (
              <div key={idx} className="border-l-2 pl-6" style={{ borderColor: "#C9A96E" }}>
                <p
                  className="font-body text-xs tracking-[0.2em] uppercase mb-1"
                  style={{ color: "#C9A96E" }}
                >
                  {day.day}
                </p>
                <h3
                  className="font-display text-xl font-medium mb-2"
                  style={{ color: "#8B1A1A" }}
                >
                  {day.title}
                </h3>
                <p
                  className="font-body text-base leading-relaxed"
                  style={{ color: "#2D2D2D", opacity: 0.8 }}
                >
                  {day.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Inclusions & Exclusions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Inclusions */}
          <div>
            <h3
              className="font-display text-2xl font-light mb-4"
              style={{ color: "#8B1A1A" }}
            >
              What's Included
            </h3>
            <GoldDivider className="mb-6" />
            <ul className="space-y-3">
              {pkg.inclusions.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div
                    className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                    style={{ backgroundColor: "#8B1A1A" }}
                  />
                  <span
                    className="font-body text-sm"
                    style={{ color: "#2D2D2D" }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Exclusions */}
          <div>
            <h3
              className="font-display text-2xl font-light mb-4"
              style={{ color: "#8B1A1A" }}
            >
              Not Included
            </h3>
            <GoldDivider className="mb-6" />
            <ul className="space-y-3">
              {pkg.exclusions.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div
                    className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                    style={{ backgroundColor: "#C9A96E" }}
                  />
                  <span
                    className="font-body text-sm"
                    style={{ color: "#2D2D2D", opacity: 0.7 }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Best For */}
        <div
          className="p-8 rounded-lg mb-16"
          style={{ backgroundColor: "rgba(139, 26, 26, 0.05)", borderLeft: "4px solid #C9A96E" }}
        >
          <h3
            className="font-display text-xl font-medium mb-3"
            style={{ color: "#8B1A1A" }}
          >
            Best For
          </h3>
          <p
            className="font-body text-base"
            style={{ color: "#2D2D2D" }}
          >
            {pkg.bestFor}
          </p>
        </div>

        {/* CTA Section */}
        <div className="text-center py-12">
          <p className="font-script text-3xl mb-3" style={{ color: "#C9A96E" }}>
            Ready to escape?
          </p>
          <h2
            className="font-display text-4xl font-light mb-2"
            style={{ color: "#8B1A1A" }}
          >
            {pkg.price}
          </h2>
          <p
            className="font-body text-sm mb-8"
            style={{ color: "#2D2D2D", opacity: 0.7 }}
          >
            {pkg.priceNote}
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-gold"
          >
            Enquire Now
          </button>
        </div>
      </div>

      {/* Modal */}
      <InquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        packageName={pkg.name}
        packagePrice={pkg.price}
      />
    </div>
  );
}
