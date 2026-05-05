import { useState } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { ChatInterface } from "@/components/ChatInterface";
import { VideoConsultationModal } from "@/components/VideoConsultationModal";
import { Star, MapPin, BadgeCheck, Award, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import { doctors } from "@/data/doctors";

export default function DoctorProfile() {
  const { id } = useParams();
  const [modalOpen, setModalOpen] = useState(false);

  const doctorData = doctors.find((d) => d.id === id) || doctors[0];

  return (
    <Layout>
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Panel - Doctor Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-2xl shadow-card p-6"
            >
              <div className="flex items-start gap-4 mb-5">
                <img
                  src={doctorData.image}
                  alt={doctorData.name}
                  className="w-20 h-20 rounded-2xl object-cover"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h1 className="text-xl font-display font-bold text-foreground">{doctorData.name}</h1>
                    <BadgeCheck className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-primary font-medium text-sm">{doctorData.specialty}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" /> {doctorData.flag} {doctorData.hospital}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-5">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="text-sm font-semibold text-foreground">{doctorData.rating}/5</span>
                  <span className="text-xs text-muted-foreground">({doctorData.reviews} reviews)</span>
                </div>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" /> {doctorData.experience} yrs experience
                </span>
              </div>

              <div className="flex items-center gap-3 mb-5 p-3 rounded-xl bg-primary/5 border border-primary/10">
                <span className="text-sm text-foreground">Starting from</span>
                <span className="text-lg font-display font-bold text-primary">${doctorData.price.toLocaleString()}</span>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">{doctorData.bio}</p>
            </motion.div>

            {/* Expertise */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card rounded-2xl shadow-card p-6"
            >
              <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-primary" />
                Expertise
              </h3>
              <div className="flex flex-wrap gap-2">
                {doctorData.expertise.map((e) => (
                  <span key={e} className="px-3 py-1.5 rounded-lg bg-primary/5 text-primary text-xs font-medium">
                    {e}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card rounded-2xl shadow-card p-6"
            >
              <h3 className="font-display font-semibold text-foreground mb-4">Education & Certifications</h3>
              <ul className="space-y-2">
                {doctorData.education.map((e) => (
                  <li key={e} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    {e}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                {doctorData.languages.map((lang) => (
                  <span key={lang} className="px-2.5 py-1 rounded-md bg-muted text-xs text-muted-foreground">
                    {lang}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Panel - Chat */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="sticky top-24 h-[calc(100vh-8rem)]"
            >
              <ChatInterface onRequestVideo={() => setModalOpen(true)} />
            </motion.div>
          </div>
        </div>

      </div>

      <VideoConsultationModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        procedure={doctorData.specialty}
        currentDoctorId={doctorData.id}
      />
    </Layout>
  );
}
