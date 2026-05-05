import { Link } from "react-router-dom";
import { Heart, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground/80">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg gradient-hero flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-display font-bold text-primary-foreground">
                MediGlobe
              </span>
            </Link>
            <p className="text-sm text-primary-foreground/60 leading-relaxed">
              Your trusted partner for world-class medical tourism. Connect with top doctors and hospitals worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-primary-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {["Find Doctors", "Hospitals", "Treatments", "Blog", "About Us"].map((item) => (
                <li key={item}>
                  <Link to="/search" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Treatments */}
          <div>
            <h4 className="font-display font-semibold text-primary-foreground mb-4">Popular Treatments</h4>
            <ul className="space-y-2 text-sm">
              {["Cardiac Surgery", "Dental Implants", "Knee Replacement", "Cosmetic Surgery", "IVF Treatment"].map((item) => (
                <li key={item}>
                  <Link to="/search" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-primary-foreground mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-primary-foreground/60">
                <Mail className="w-4 h-4" /> support@mediglobe.com
              </li>
              <li className="flex items-center gap-2 text-primary-foreground/60">
                <Phone className="w-4 h-4" /> +1 (800) 123-4567
              </li>
              <li className="flex items-center gap-2 text-primary-foreground/60">
                <MapPin className="w-4 h-4" /> Available Worldwide
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center text-sm text-primary-foreground/40">
          © 2026 MediGlobe. All rights reserved. Your health, our priority.
        </div>
      </div>
    </footer>
  );
}
