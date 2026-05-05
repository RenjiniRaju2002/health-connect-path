import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Video, Phone, X, Clock, BadgeCheck, Star, PhoneCall, Download, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { doctors } from "@/data/doctors";

interface VideoConsultationModalProps {
  open: boolean;
  onClose: () => void;
  procedure: string;
  currentDoctorId?: string;
}

export function VideoConsultationModal({ open, onClose, procedure, currentDoctorId }: VideoConsultationModalProps) {
  const navigate = useNavigate();
  const [step, setStep] = useState<"doctor" | "download" | "ringing">("doctor");
  const [waitSeconds, setWaitSeconds] = useState(0);
  const [ringCount, setRingCount] = useState(0);

  const doctor = doctors.find((d) => d.id === currentDoctorId) || doctors[0];

  // Download screen timer → after 10 seconds, show ringing
  useEffect(() => {
    if (step === "download") {
      setWaitSeconds(0);
      const interval = setInterval(() => {
        setWaitSeconds((s) => {
          if (s >= 10) {
            clearInterval(interval);
            setStep("ringing");
            return s;
          }
          return s + 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [step]);

  // Ringing screen → after 4 rings, navigate to video consultation
  useEffect(() => {
    if (step === "ringing") {
      setRingCount(0);
      const interval = setInterval(() => {
        setRingCount((c) => {
          if (c >= 3) {
            clearInterval(interval);
            navigate(`/video-consultation?doctor=${currentDoctorId || doctor.id}`);
            onClose();
            return c;
          }
          return c + 1;
        });
      }, 1200);
      return () => clearInterval(interval);
    }
  }, [step, currentDoctorId, doctor.id, navigate, onClose]);

  const handleClose = () => {
    setStep("doctor");
    setWaitSeconds(0);
    setRingCount(0);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/60 backdrop-blur-sm z-50"
            onClick={handleClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-card rounded-3xl shadow-card-hover w-full max-w-lg overflow-hidden" onClick={(e) => e.stopPropagation()}>

              {step === "doctor" ? (
                <>
                  {/* Header */}
                  <div className="gradient-hero p-6 relative">
                    <button
                      onClick={handleClose}
                      className="absolute top-4 right-4 w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center hover:bg-primary-foreground/30 transition-colors"
                    >
                      <X className="w-4 h-4 text-primary-foreground" />
                    </button>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-primary-foreground/20 flex items-center justify-center">
                        <Video className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h2 className="text-xl font-display font-bold text-primary-foreground">Video Consultation</h2>
                        <p className="text-sm text-primary-foreground/70">{procedure}</p>
                      </div>
                    </div>
                  </div>

                  {/* Selected Doctor */}
                  <div className="p-6">
                    <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                      <BadgeCheck className="w-4 h-4 text-primary" />
                      Your Specialist
                    </h3>

                    <div className="flex items-center gap-4 p-4 rounded-2xl border-2 border-primary bg-primary/5 mb-6">
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="w-16 h-16 rounded-2xl object-cover ring-2 ring-primary/30"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <p className="text-base font-semibold text-foreground">{doctor.name}</p>
                          <BadgeCheck className="w-4 h-4 text-primary shrink-0" />
                        </div>
                        <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                        <div className="flex items-center gap-1.5 mt-1">
                          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                          <span className="text-sm font-bold text-foreground">{doctor.rating}</span>
                          <span className="text-xs text-muted-foreground">/5</span>
                          <span className="text-xs text-muted-foreground ml-1">({doctor.reviews} reviews)</span>
                        </div>
                      </div>
                    </div>

                    <Button
                      size="lg"
                      className="w-full gradient-hero border-0 text-primary-foreground gap-2 rounded-xl"
                      onClick={() => setStep("download")}
                    >
                      <Video className="w-5 h-5" />
                      Continue
                    </Button>

                    <p className="text-center text-xs text-muted-foreground mt-3">
                      Free initial consultation • No commitment required
                    </p>
                  </div>
                </>
              ) : step === "download" ? (
                /* Download App Screen */
                <div className="p-0">
                  <div className="gradient-hero p-6 relative">
                    <button
                      onClick={handleClose}
                      className="absolute top-4 right-4 w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center hover:bg-primary-foreground/30 transition-colors"
                    >
                      <X className="w-4 h-4 text-primary-foreground" />
                    </button>
                    <div className="flex items-center gap-3">
                      <img src={doctor.image} alt={doctor.name} className="w-14 h-14 rounded-2xl object-cover ring-2 ring-primary-foreground/30" />
                      <div>
                        <h2 className="text-lg font-display font-bold text-primary-foreground">{doctor.name}</h2>
                        <div className="flex items-center gap-1 text-primary-foreground/80 text-sm">
                          <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                          <span className="font-semibold">{doctor.rating}/5</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 text-center space-y-5">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto"
                    >
                      <Smartphone className="w-10 h-10 text-primary" />
                    </motion.div>

                    <div>
                      <h3 className="text-lg font-display font-bold text-foreground mb-2">
                        Download the App for Video Consultation
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        As soon as the app is downloaded, the doctor will call you. Please wait for the call.
                      </p>
                    </div>

                    <div className="bg-primary/5 border border-primary/10 rounded-2xl p-4">
                      <div className="flex items-center gap-2 justify-center mb-2">
                        <Clock className="w-4 h-4 text-primary" />
                        <span className="text-sm font-semibold text-foreground">Estimated Wait Time</span>
                      </div>
                      <p className="text-2xl font-display font-bold text-primary">~45 minutes</p>
                      <p className="text-xs text-muted-foreground mt-1">The doctor will call you typically within 45 mins</p>
                    </div>

                    <Button
                      size="lg"
                      className="w-full gradient-hero border-0 text-primary-foreground gap-2 rounded-xl"
                      onClick={() => window.open("https://apps.apple.com", "_blank")}
                    >
                      <Download className="w-5 h-5" />
                      Download App
                    </Button>

                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="flex items-center justify-center gap-2 text-muted-foreground"
                    >
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-xs">Waiting for connection... {waitSeconds}s</span>
                    </motion.div>
                  </div>
                </div>
              ) : (
                /* Ringing Screen */
                <div className="p-10 text-center relative">
                  <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
                  >
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>

                  <div className="relative w-28 h-28 mx-auto mb-6">
                    <motion.div
                      animate={{ scale: [1, 2.5], opacity: [0.4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                      className="absolute inset-0 rounded-full bg-primary/20"
                    />
                    <motion.div
                      animate={{ scale: [1, 2], opacity: [0.3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.3 }}
                      className="absolute inset-0 rounded-full bg-primary/30"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.6 }}
                      className="absolute inset-0 rounded-full bg-primary/40"
                    />
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-28 h-28 rounded-full object-cover relative z-10 ring-4 ring-primary/30"
                    />
                  </div>

                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <h2 className="text-xl font-display font-bold text-foreground mb-1">
                      Calling {doctor.name}...
                    </h2>
                    <p className="text-sm text-muted-foreground mb-1">{doctor.specialty}</p>
                    <div className="flex items-center justify-center gap-1 mb-6">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span className="text-sm font-bold text-foreground">{doctor.rating}/5</span>
                    </div>

                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="flex items-center justify-center gap-2 text-primary mb-8"
                    >
                      <PhoneCall className="w-5 h-5" />
                      <span className="text-sm font-medium">Ringing...</span>
                    </motion.div>

                    <button
                      onClick={handleClose}
                      className="w-14 h-14 rounded-full bg-destructive hover:bg-destructive/90 text-destructive-foreground flex items-center justify-center mx-auto transition-colors"
                    >
                      <Phone className="w-6 h-6 rotate-[135deg]" />
                    </button>
                    <p className="text-xs text-muted-foreground mt-3">Cancel Call</p>
                  </motion.div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
