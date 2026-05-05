import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LocationProvider } from "@/contexts/LocationContext";
import Index from "./pages/Index";
import SearchResults from "./pages/SearchResults";
import DoctorProfile from "./pages/DoctorProfile";
import HospitalProfile from "./pages/HospitalProfile";
import Auth from "./pages/Auth";
import TreatmentEstimate from "./pages/TreatmentEstimate";
import BookingPlanning from "./pages/BookingPlanning";
import Dashboard from "./pages/Dashboard";
import Blog from "./pages/Blog";
import Treatments from "./pages/Treatments";
import VideoConsultation from "./pages/VideoConsultation";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, "");

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LocationProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename={routerBasename || undefined}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/doctor/:id" element={<DoctorProfile />} />
            <Route path="/hospital" element={<SearchResults />} />
            <Route path="/hospital/:id" element={<HospitalProfile />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/estimate" element={<TreatmentEstimate />} />
            <Route path="/booking" element={<BookingPlanning />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/treatments" element={<Treatments />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/video-consultation" element={<VideoConsultation />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LocationProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
