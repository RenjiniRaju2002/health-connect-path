import { Hospital } from "./hospitals";

// Helper to offset coordinates by approximate km
function offsetCoords(lat: number, lng: number, kmLat: number, kmLng: number): { lat: number; lng: number } {
  return {
    lat: lat + kmLat / 111.32,
    lng: lng + kmLng / (111.32 * Math.cos((lat * Math.PI) / 180)),
  };
}

const baseTemplate: Omit<Hospital, "id" | "name" | "location" | "country" | "flag" | "lat" | "lng" | "rating" | "reviews" | "priceRange"> = {
  specialties: ["Cardiac Surgery", "Orthopedics", "Oncology"],
  isMedicalTourism: true,
  image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600&h=400&fit=crop",
  description: "A modern multi-specialty hospital offering world-class healthcare services.",
  accreditations: ["JCI Accredited", "ISO 9001"],
  beds: 350,
  yearEstablished: 2010,
  internationalPatients: "20,000+ per year",
  facilities: ["24/7 Emergency", "International Patient Center", "Interpreter Services", "Pharmacy"],
  contactEmail: "info@hospital.com",
  website: "https://www.hospital.com",
};

interface CityDef {
  city: string;
  country: string;
  flag: string;
  lat: number;
  lng: number;
}

const cities: CityDef[] = [
  { city: "Mumbai", country: "India", flag: "🇮🇳", lat: 19.076, lng: 72.8777 },
  { city: "Delhi", country: "India", flag: "🇮🇳", lat: 28.6139, lng: 77.209 },
  { city: "Chennai", country: "India", flag: "🇮🇳", lat: 13.0827, lng: 80.2707 },
  { city: "Bangalore", country: "India", flag: "🇮🇳", lat: 12.9716, lng: 77.5946 },
  { city: "Hyderabad", country: "India", flag: "🇮🇳", lat: 17.385, lng: 78.4867 },
  { city: "Gurgaon", country: "India", flag: "🇮🇳", lat: 28.4595, lng: 77.0266 },
  { city: "Bangkok", country: "Thailand", flag: "🇹🇭", lat: 13.7563, lng: 100.5018 },
  { city: "Istanbul", country: "Turkey", flag: "🇹🇷", lat: 41.0082, lng: 28.9784 },
];

// Each entry generates hospitals at that distance band.
// Cumulative: 100km→2, 500km→+2=4, 1000km→+2=6, 5000km→+2=8, 20000km→+2=10
const distanceBands: { km: number; count: number }[] = [
  { km: 80, count: 2 },
  { km: 400, count: 2 },
  { km: 800, count: 2 },
  { km: 4000, count: 2 },
  { km: 15000, count: 2 },
];

const hospitalNames = [
  "City Care Hospital", "LifeLine Medical Center", "Global Health Institute",
  "Premier Specialty Hospital", "Sunrise Medical Hub", "Metro Health Center",
  "Unity Hospital", "Wellness Clinic", "MedStar Hospital", "CureWell Institute",
];

const specialtySets = [
  ["Knee Replacement", "Orthopedic Surgery", "Spine Surgery"],
  ["Dental Implants", "Cosmetic Surgery", "Smile Design"],
  ["Eye Surgery", "LASIK", "Cataract Surgery"],
  ["Cosmetic Surgery", "Rhinoplasty", "Hair Transplant"],
  ["Knee Replacement", "Dental Implants", "Eye Surgery"],
  ["Cardiac Surgery", "IVF Treatment", "Kidney Transplant"],
  ["IVF Treatment", "Cosmetic Surgery", "Dental Implants"],
  ["Cardiac Surgery", "Kidney Transplant", "Orthopedic Surgery"],
  ["Eye Surgery", "Knee Replacement", "Spine Surgery"],
  ["Dental Implants", "Cardiac Surgery", "Cosmetic Surgery"],
];

const priceRanges = [
  "$1,500 - $8,000", "$2,000 - $10,000", "$3,000 - $12,000", "$2,500 - $9,000",
  "$1,800 - $7,500", "$2,200 - $11,000", "$1,600 - $6,500", "$3,500 - $13,000",
  "$2,800 - $9,500", "$1,900 - $8,500",
];
const images = [
  "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=600&h=400&fit=crop",
];

// Spread hospitals in different directions around each city
const angles = [0, 45, 90, 135, 180, 225, 270, 315, 30, 150];

export const dummyHospitals: Hospital[] = [];

let counter = 0;
cities.forEach((c) => {
  let hospIdx = 0;
  distanceBands.forEach((band) => {
    for (let i = 0; i < band.count; i++) {
      const angle = angles[hospIdx % angles.length];
      const rad = (angle * Math.PI) / 180;
      // Add some randomness within the band
      const actualKm = band.km * (0.7 + Math.random() * 0.5);
      const offset = offsetCoords(c.lat, c.lng, actualKm * Math.cos(rad), actualKm * Math.sin(rad));
      counter++;
      dummyHospitals.push({
        ...baseTemplate,
        id: `dh${counter}`,
        name: `${hospitalNames[hospIdx % hospitalNames.length]} - ${c.city}`,
        location: c.city,
        country: c.country,
        flag: c.flag,
        lat: offset.lat,
        lng: offset.lng,
        rating: parseFloat((4.2 + Math.random() * 0.7).toFixed(1)),
        reviews: 100 + Math.floor(Math.random() * 500),
        priceRange: priceRanges[hospIdx % priceRanges.length],
        specialties: specialtySets[hospIdx % specialtySets.length],
        image: images[hospIdx % images.length],
        description: `A leading hospital near ${c.city} offering specialized care.`,
        beds: 200 + hospIdx * 50,
      });
      hospIdx++;
    }
  });
});
