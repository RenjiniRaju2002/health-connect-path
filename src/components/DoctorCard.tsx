import { Star, MessageCircle, MapPin, BadgeCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface DoctorCardProps {
  id: string;
  name: string;
  specialty: string;
  hospital: string;
  country: string;
  flag: string;
  experience: number;
  rating: number;
  reviews: number;
  price: number;
  available: boolean;
  image: string;
}

export function DoctorCard({
  id, name, specialty, hospital, country, flag, experience, rating, reviews, price, available, image,
}: DoctorCardProps) {
  return (
    <div className="bg-card rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden group">
      <div className="p-5">
        <div className="flex gap-4">
          {/* Avatar */}
          <div className="relative shrink-0">
            <img
              src={image}
              alt={name}
              className="w-16 h-16 rounded-xl object-cover"
            />
            <span
              className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-card ${
                available ? "bg-medical-green" : "bg-destructive"
              }`}
            />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-1">
              <h3 className="font-display font-semibold text-foreground truncate">{name}</h3>
              <BadgeCheck className="w-4 h-4 text-primary shrink-0" />
            </div>
            <p className="text-sm text-primary font-medium">{specialty}</p>
            <p className="text-xs text-muted-foreground mt-0.5 truncate">{hospital}</p>
          </div>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" /> {flag} {country}
          </span>
          <span>{experience} yrs exp</span>
          <span className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            {rating}/5 ({reviews} reviews)
          </span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <div>
            <span className="text-xs text-muted-foreground">Starting from</span>
            <p className="text-lg font-display font-bold text-foreground">${price.toLocaleString()}</p>
          </div>
          <div className="flex gap-2">
            <Link to={`/doctor/${id}`}>
              <Button size="sm" variant="outline" className="text-xs">
                View Profile
              </Button>
            </Link>
            <Link to={`/doctor/${id}`}>
              <Button size="sm" className="text-xs gradient-hero border-0 text-primary-foreground gap-1">
                <MessageCircle className="w-3.5 h-3.5" />
                Chat
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
