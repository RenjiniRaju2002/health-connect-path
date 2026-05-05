import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export interface LocationOption {
  name: string;
  country: string;
  lat: number;
  lng: number;
}

export const locations: LocationOption[] = [
  { name: "Mumbai", country: "India", lat: 19.076, lng: 72.8777 },
  { name: "Delhi", country: "India", lat: 28.6139, lng: 77.209 },
  { name: "Chennai", country: "India", lat: 13.0827, lng: 80.2707 },
  { name: "Bangalore", country: "India", lat: 12.9716, lng: 77.5946 },
  { name: "Hyderabad", country: "India", lat: 17.385, lng: 78.4867 },
  { name: "Kolkata", country: "India", lat: 22.5726, lng: 88.3639 },
  { name: "Gurgaon", country: "India", lat: 28.4595, lng: 77.0266 },
  { name: "Bangkok", country: "Thailand", lat: 13.7563, lng: 100.5018 },
  { name: "Istanbul", country: "Turkey", lat: 41.0082, lng: 28.9784 },
  { name: "Seoul", country: "South Korea", lat: 37.5665, lng: 126.978 },
  { name: "Mexico City", country: "Mexico", lat: 19.4326, lng: -99.1332 },
  { name: "Berlin", country: "Germany", lat: 52.52, lng: 13.405 },
];

interface LocationContextType {
  selectedLocation: LocationOption | null;
  setSelectedLocation: (loc: LocationOption | null) => void;
}

const LocationContext = createContext<LocationContextType>({
  selectedLocation: null,
  setSelectedLocation: () => {},
});

function getStoredLocation(): LocationOption | null {
  try {
    const stored = sessionStorage.getItem("selectedLocation");
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function LocationProvider({ children }: { children: ReactNode }) {
  const [selectedLocation, setSelectedLocationState] = useState<LocationOption | null>(getStoredLocation);

  const setSelectedLocation = (loc: LocationOption | null) => {
    setSelectedLocationState(loc);
    if (loc) {
      sessionStorage.setItem("selectedLocation", JSON.stringify(loc));
    } else {
      sessionStorage.removeItem("selectedLocation");
    }
  };

  return (
    <LocationContext.Provider value={{ selectedLocation, setSelectedLocation }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation2() {
  return useContext(LocationContext);
}
