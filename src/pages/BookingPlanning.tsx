import { Layout } from "@/components/Layout";
import { CheckCircle2, Circle, Plane, Hotel, Calendar, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const timelineSteps = [
  { label: "Consultation", status: "completed", date: "Jan 15, 2026" },
  { label: "Estimate Approved", status: "completed", date: "Jan 18, 2026" },
  { label: "Accommodation", status: "current", date: "Select dates" },
  { label: "Travel Planning", status: "upcoming", date: "Pending" },
  { label: "Treatment", status: "upcoming", date: "Feb 10, 2026" },
];

const hotels = [
  { name: "Royal Orchid Suites", distance: "0.5 km from hospital", price: 85, rating: 4.7, image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=250&fit=crop" },
  { name: "MedStay Residence", distance: "1.2 km from hospital", price: 55, rating: 4.5, image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=250&fit=crop" },
  { name: "Bangkok Grand Hotel", distance: "2 km from hospital", price: 120, rating: 4.9, image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=250&fit=crop" },
];

const flights = [
  { airline: "Thai Airways", route: "NYC → Bangkok", departure: "Feb 5, 9:00 AM", arrival: "Feb 6, 2:30 PM", price: 780 },
  { airline: "Emirates", route: "NYC → Bangkok (via Dubai)", departure: "Feb 5, 11:00 PM", arrival: "Feb 7, 8:00 AM", price: 650 },
];

export default function BookingPlanning() {
  return (
    <Layout>
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">Booking & Travel Planning</h1>
          <p className="text-muted-foreground mb-8">Plan your complete medical journey step by step.</p>

          {/* Timeline */}
          <div className="bg-card rounded-2xl shadow-card p-6 mb-8">
            <h3 className="font-display font-semibold text-foreground mb-6">Journey Timeline</h3>
            <div className="flex items-center justify-between overflow-x-auto pb-2">
              {timelineSteps.map((step, i) => (
                <div key={step.label} className="flex items-center">
                  <div className="flex flex-col items-center min-w-[100px]">
                    {step.status === "completed" ? (
                      <CheckCircle2 className="w-8 h-8 text-medical-green mb-2" />
                    ) : step.status === "current" ? (
                      <div className="w-8 h-8 rounded-full gradient-hero flex items-center justify-center mb-2 animate-pulse-soft">
                        <Circle className="w-4 h-4 text-primary-foreground" />
                      </div>
                    ) : (
                      <Circle className="w-8 h-8 text-muted-foreground/30 mb-2" />
                    )}
                    <span className={`text-xs font-medium text-center ${
                      step.status === "current" ? "text-primary" : step.status === "completed" ? "text-foreground" : "text-muted-foreground"
                    }`}>
                      {step.label}
                    </span>
                    <span className="text-[10px] text-muted-foreground mt-0.5">{step.date}</span>
                  </div>
                  {i < timelineSteps.length - 1 && (
                    <div className={`w-12 h-0.5 mx-1 ${
                      step.status === "completed" ? "bg-medical-green" : "bg-border"
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Accommodation */}
            <div>
              <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                <Hotel className="w-5 h-5 text-primary" /> Accommodation
              </h3>
              <div className="space-y-4">
                {hotels.map((hotel) => (
                  <div key={hotel.name} className="bg-card rounded-2xl shadow-card overflow-hidden group">
                    <div className="relative h-36 overflow-hidden">
                      <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-foreground text-sm">{hotel.name}</h4>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3" /> {hotel.distance}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-lg font-display font-bold text-foreground">${hotel.price}<span className="text-xs text-muted-foreground font-normal">/night</span></span>
                        <Button size="sm" variant="outline" className="text-xs">Book</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Flights */}
            <div>
              <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                <Plane className="w-5 h-5 text-primary" /> Travel Options
              </h3>
              <div className="space-y-4">
                {flights.map((flight) => (
                  <div key={flight.airline} className="bg-card rounded-2xl shadow-card p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-foreground text-sm">{flight.airline}</h4>
                      <span className="text-lg font-display font-bold text-foreground">${flight.price}</span>
                    </div>
                    <p className="text-sm text-primary font-medium mb-2">{flight.route}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                      <span>Depart: {flight.departure}</span>
                      <ArrowRight className="w-3 h-3" />
                      <span>Arrive: {flight.arrival}</span>
                    </div>
                    <Button size="sm" className="w-full gradient-hero border-0 text-primary-foreground text-xs">
                      Select Flight
                    </Button>
                  </div>
                ))}
              </div>

              {/* Date Selector */}
              <div className="bg-card rounded-2xl shadow-card p-5 mt-4">
                <h4 className="font-semibold text-foreground text-sm mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" /> Select Travel Dates
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Departure</label>
                    <input
                      type="date"
                      className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Return</label>
                    <input
                      type="date"
                      className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
