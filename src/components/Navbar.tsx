import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Heart, Globe, User, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation2 } from "@/contexts/LocationContext";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Doctors", path: "/search" },
  { label: "Treatments", path: "/treatments" },
  { label: "Hospitals", path: "/hospital" },
  { label: "Blog", path: "/blog" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { selectedLocation } = useLocation2();

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md shadow-nav border-b border-border/50">
      {/* Location Bar */}
      {selectedLocation && (
        <div className="bg-primary/5 border-b border-border/50">
          <div className="container mx-auto flex items-center gap-2 px-4 lg:px-8 py-1.5">
            <MapPin className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-medium text-foreground">
              {selectedLocation.name}, {selectedLocation.country}
            </span>
          </div>
        </div>
      )}

      <div className="container mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-lg gradient-hero flex items-center justify-center">
            <Heart className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-display font-bold text-foreground">
            Medi<span className="text-gradient">Globe</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === link.path
                  ? "text-primary bg-primary/5"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/dashboard">
            <Button variant="ghost" size="sm" className="gap-2">
              <Globe className="w-4 h-4" />
              Dashboard
            </Button>
          </Link>
          <Link to="/auth">
            <Button size="sm" className="gap-2 gradient-hero border-0 text-primary-foreground hover:opacity-90">
              <User className="w-4 h-4" />
              Sign In
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden p-2 rounded-lg hover:bg-muted" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-card border-b border-border overflow-hidden"
          >
            <nav className="flex flex-col p-4 gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? "text-primary bg-primary/5"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-2 mt-3 pt-3 border-t border-border">
                <Link to="/dashboard" className="flex-1" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full">
                    Dashboard
                  </Button>
                </Link>
                <Link to="/auth" className="flex-1" onClick={() => setMobileOpen(false)}>
                  <Button size="sm" className="w-full gradient-hero border-0 text-primary-foreground">
                    Sign In
                  </Button>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
