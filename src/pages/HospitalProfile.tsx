import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { hospitals } from "@/data/hospitals";
import { Star, MapPin, BadgeCheck, Building, Users, Calendar, Globe, Mail, Shield, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function HospitalProfile() {
  const { id } = useParams();
  const hospital = hospitals.find((h) => h.id === id) || hospitals[0];

  return (
    <Layout>
      {/* Hero */}
      <div className="relative h-64 lg:h-80 overflow-hidden">
        <img
          src={hospital.image}
          alt={hospital.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10">
          <div className="container mx-auto">
            <Link to="/search?tab=hospitals" className="inline-flex items-center gap-1.5 text-xs text-primary-foreground/70 hover:text-primary-foreground mb-3 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Hospitals
            </Link>
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-2xl lg:text-3xl font-display font-bold text-primary-foreground">{hospital.name}</h1>
              {hospital.isMedicalTourism && (
                <span className="px-2.5 py-1 rounded-full bg-medical-teal text-primary-foreground text-xs font-medium flex items-center gap-1">
                  <BadgeCheck className="w-3.5 h-3.5" /> Medical Tourism
                </span>
              )}
            </div>
            <div className="flex items-center gap-4 text-sm text-primary-foreground/80">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" /> {hospital.flag} {hospital.location}, {hospital.country}
              </span>
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> {hospital.rating} ({hospital.reviews} reviews)
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-2xl shadow-card p-6"
            >
              <h2 className="font-display font-semibold text-foreground mb-3 text-lg">About</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{hospital.description}</p>
            </motion.div>

            {/* Key Stats */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              {[
                { icon: Building, label: "Total Beds", value: hospital.beds.toLocaleString() },
                { icon: Calendar, label: "Established", value: hospital.yearEstablished.toString() },
                { icon: Users, label: "Int'l Patients", value: hospital.internationalPatients },
                { icon: Globe, label: "Price Range", value: hospital.priceRange },
              ].map((stat, i) => (
                <div key={stat.label} className="bg-card rounded-2xl shadow-card p-5 text-center">
                  <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                  <p className="text-lg font-display font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </motion.div>

            {/* Specialties */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card rounded-2xl shadow-card p-6"
            >
              <h2 className="font-display font-semibold text-foreground mb-4 text-lg">Specialties</h2>
              <div className="flex flex-wrap gap-2">
                {hospital.specialties.map((s) => (
                  <Link
                    key={s}
                    to={`/search?specialty=${encodeURIComponent(s)}`}
                    className="px-3 py-1.5 rounded-lg bg-primary/5 text-primary text-sm font-medium hover:bg-primary/10 transition-colors"
                  >
                    {s}
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Facilities */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-card rounded-2xl shadow-card p-6"
            >
              <h2 className="font-display font-semibold text-foreground mb-4 text-lg">Facilities & Services</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {hospital.facilities.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="w-2 h-2 rounded-full bg-medical-green shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Accreditations */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card rounded-2xl shadow-card p-6"
            >
              <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Accreditations
              </h3>
              <div className="space-y-2">
                {hospital.accreditations.map((a) => (
                  <div key={a} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/5 text-sm text-primary font-medium">
                    <BadgeCheck className="w-4 h-4 shrink-0" />
                    {a}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-card rounded-2xl shadow-card p-6"
            >
              <h3 className="font-display font-semibold text-foreground mb-4">Contact</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4 text-primary" />
                  {hospital.contactEmail}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Globe className="w-4 h-4 text-primary" />
                  {hospital.website}
                </div>
              </div>
              <Button className="w-full mt-5 gradient-hero border-0 text-primary-foreground">
                Request Free Consultation
              </Button>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="gradient-hero rounded-2xl p-6 text-center"
            >
              <h3 className="font-display font-semibold text-primary-foreground mb-2">Need an Estimate?</h3>
              <p className="text-sm text-primary-foreground/70 mb-4">Get a free treatment cost breakdown for this hospital.</p>
              <Link to="/estimate">
                <Button className="bg-card text-primary hover:bg-card/90 w-full">
                  Get Treatment Estimate
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
