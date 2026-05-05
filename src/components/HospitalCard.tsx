import { MapPin, Star, BadgeCheck, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface HospitalCardProps {
  id: string;
  name: string;
  location: string;
  country: string;
  flag: string;
  rating: number;
  reviews: number;
  priceRange: string;
  specialties: string[];
  isMedicalTourism: boolean;
  image: string;
}

export function HospitalCard({
  id, name, location, country, flag, rating, reviews, priceRange, specialties, isMedicalTourism, image,
}: HospitalCardProps) {
  return (
    <div className="bg-card rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden group">
      <div className="relative h-40 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {isMedicalTourism && (
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-medical-teal text-primary-foreground text-xs font-medium flex items-center gap-1">
            <BadgeCheck className="w-3.5 h-3.5" />
            Medical Tourism
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-display font-semibold text-foreground mb-1">{name}</h3>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
          <MapPin className="w-3.5 h-3.5" />
          <span>{flag} {location}, {country}</span>
          <span className="ml-auto flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            {rating}/5 ({reviews} reviews)
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {specialties.slice(0, 3).map((s) => (
            <span key={s} className="px-2 py-0.5 rounded-md bg-muted text-xs text-muted-foreground">
              {s}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <span className="text-sm text-muted-foreground">
            Price: <strong className="text-foreground">{priceRange}</strong>
          </span>
          <Link to={`/hospital/${id}`}>
            <Button size="sm" variant="outline" className="text-xs gap-1">
              <ExternalLink className="w-3.5 h-3.5" />
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
