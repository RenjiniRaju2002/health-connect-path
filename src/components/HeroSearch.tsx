import { useState } from "react";
import { Search, MapPin, Stethoscope, TrendingUp, Clock, Heart, Bone, Eye, SmilePlus, Baby, Brain, Scissors, Activity, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import heroImage from "@/assets/hero-medical.jpg";
import { useLocation2, locations } from "@/contexts/LocationContext";

const suggestions = [
  "Cardiac Surgery",
  "Dental Implants",
  "Knee Replacement",
  "Hair Transplant",
  "Cosmetic Surgery",
  "IVF Treatment",
  "Eye Surgery (LASIK)",
  "Spine Surgery",
  "Bariatric Surgery",
  "Orthopedic Surgery",
];

const frequentProcedures = [
  { name: "Cardiac Surgery", icon: Heart, searches: "12.4K" },
  { name: "Dental Implants", icon: SmilePlus, searches: "9.8K" },
  { name: "Knee Replacement", icon: Bone, searches: "8.2K" },
  { name: "Eye Surgery (LASIK)", icon: Eye, searches: "7.5K" },
  { name: "IVF Treatment", icon: Baby, searches: "6.1K" },
  { name: "Cosmetic Surgery", icon: Scissors, searches: "5.9K" },
];

interface HeroSearchProps {
  onProcedureSelect: (procedure: string) => void;
}

export function HeroSearch({ onProcedureSelect }: HeroSearchProps) {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const { selectedLocation, setSelectedLocation } = useLocation2();

  const filtered = query
    ? suggestions.filter((s) => s.toLowerCase().includes(query.toLowerCase()))
    : [];

  const handleSelect = (term: string) => {
    setQuery(term);
    setShowDropdown(false);
  };

  const handleSearch = () => {
    if (query) {
      onProcedureSelect(query);
    } else {
      setShowDropdown(true);
    }
  };

  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="World-class medical facilities"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 py-24 lg:py-36">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/20 text-primary-foreground text-xs font-medium mb-6 backdrop-blur-sm">
            <Stethoscope className="w-3.5 h-3.5" />
            Trusted by 50,000+ patients worldwide
          </span>
          <h1 className="text-4xl lg:text-6xl font-display font-bold text-primary-foreground leading-tight mb-6">
            World-Class Healthcare,{" "}
            <span className="text-medical-teal">Wherever You Are</span>
          </h1>
          <p className="text-lg text-primary-foreground/70 mb-10 max-w-lg leading-relaxed">
            Find top doctors, compare hospitals, and plan your medical journey abroad — all in one place.
          </p>

          {/* Search Bar */}
          <div className="relative">
            <div className="flex items-center bg-card rounded-2xl shadow-card-hover p-2 gap-2">
              <div className="flex items-center flex-1 gap-3 px-4">
                <Search className="w-5 h-5 text-muted-foreground shrink-0" />
                <input
                  type="text"
                  placeholder="Search procedures, treatments, or doctors…"
                  className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground py-3"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setShowDropdown(true);
                  }}
                  onFocus={() => setShowDropdown(true)}
                  onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && query) handleSearch();
                  }}
                />
              </div>

              {/* Location Selector */}
              <div className="relative hidden sm:block">
                <button
                  onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                  className="flex items-center gap-2 px-3 py-2 border-l border-border hover:bg-muted rounded-lg transition-colors"
                >
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-sm text-foreground font-medium max-w-[100px] truncate">
                    {selectedLocation ? selectedLocation.name : "Location"}
                  </span>
                  <ChevronDown className="w-3 h-3 text-muted-foreground" />
                </button>

                <AnimatePresence>
                  {showLocationDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="absolute right-0 top-full mt-2 w-56 bg-card rounded-xl shadow-card-hover border border-border z-50 overflow-hidden"
                    >
                      <div className="px-4 pt-3 pb-2">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Select Location</span>
                      </div>
                      <div className="max-h-64 overflow-y-auto">
                        {locations.map((loc) => (
                          <button
                            key={loc.name}
                            className={`w-full text-left px-4 py-2.5 text-sm hover:bg-muted transition-colors flex items-center gap-3 ${
                              selectedLocation?.name === loc.name ? "bg-primary/5 text-primary" : "text-foreground"
                            }`}
                            onClick={() => {
                              setSelectedLocation(loc);
                              setShowLocationDropdown(false);
                            }}
                          >
                            <MapPin className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                            <div>
                              <span className="font-medium">{loc.name}</span>
                              <span className="text-muted-foreground ml-1 text-xs">{loc.country}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                onClick={handleSearch}
                className="gradient-hero text-primary-foreground px-6 py-3 rounded-xl font-medium text-sm hover:opacity-90 transition-opacity shrink-0"
              >
                Search
              </button>
            </div>

            {/* Enhanced Dropdown */}
            <AnimatePresence>
              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-card rounded-2xl shadow-card-hover border border-border z-50 overflow-hidden"
                >
                  {query && filtered.length > 0 && (
                    <div className="border-b border-border">
                      <div className="px-5 pt-4 pb-2">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Suggestions</span>
                      </div>
                      {filtered.slice(0, 5).map((s) => (
                        <button
                          key={s}
                          className="w-full text-left px-5 py-2.5 text-sm text-foreground hover:bg-muted transition-colors flex items-center gap-3"
                          onMouseDown={() => handleSelect(s)}
                        >
                          <Search className="w-4 h-4 text-muted-foreground" />
                          <span>{s}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-3 px-1">
                      <TrendingUp className="w-3.5 h-3.5 text-primary" />
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Frequently Searched Procedures
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {frequentProcedures.map((proc) => (
                        <button
                          key={proc.name}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted transition-colors text-left group"
                          onMouseDown={() => handleSelect(proc.name)}
                        >
                          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
                            <proc.icon className="w-4.5 h-4.5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">{proc.name}</p>
                            <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                              <Clock className="w-2.5 h-2.5" /> {proc.searches} searches
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap gap-8 mt-10">
            {[
              { label: "Verified Doctors", value: "2,500+" },
              { label: "Partner Hospitals", value: "350+" },
              { label: "Countries", value: "25+" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-display font-bold text-primary-foreground">{stat.value}</div>
                <div className="text-sm text-primary-foreground/50">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
