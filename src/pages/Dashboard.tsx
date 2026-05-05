import { Layout } from "@/components/Layout";
import {
  MessageCircle, FileText, Calendar, Activity, Upload, Clock, ChevronRight, User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const timelineEvents = [
  { date: "Jan 15, 2026", title: "Initial Consultation", type: "consultation", description: "Video call with Dr. Sarah Chen about cardiac procedure." },
  { date: "Jan 18, 2026", title: "Estimate Approved", type: "estimate", description: "Treatment estimate of $6,500 was approved." },
  { date: "Jan 20, 2026", title: "Documents Uploaded", type: "document", description: "MRI scan and blood work reports uploaded." },
  { date: "Feb 1, 2026", title: "Pre-Op Consultation", type: "upcoming", description: "Follow-up video consultation with Dr. Chen." },
  { date: "Feb 10, 2026", title: "Treatment Day", type: "upcoming", description: "Total Knee Replacement at Apollo Hospital." },
];

const documents = [
  { name: "MRI Scan Report.pdf", date: "Jan 20, 2026", size: "2.4 MB" },
  { name: "Blood Work Results.pdf", date: "Jan 20, 2026", size: "0.8 MB" },
  { name: "Medical History.pdf", date: "Jan 15, 2026", size: "1.2 MB" },
  { name: "Insurance Certificate.pdf", date: "Jan 12, 2026", size: "0.5 MB" },
];

const appointments = [
  { doctor: "Dr. Sarah Chen", specialty: "Cardiac Surgery", date: "Feb 1, 2026", time: "10:00 AM", type: "Video Call" },
  { doctor: "Dr. Raj Patel", specialty: "Orthopedics", date: "Feb 5, 2026", time: "2:00 PM", type: "In-Person" },
];

export default function Dashboard() {
  return (
    <Layout>
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-display font-bold text-foreground">Patient Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, John. Here's your medical journey overview.</p>
            </div>
            <Link to="/search">
              <Button className="gradient-hero border-0 text-primary-foreground gap-2">
                <Activity className="w-4 h-4" /> New Consultation
              </Button>
            </Link>
          </div>

          {/* Treatment Progress */}
          <div className="bg-card rounded-2xl shadow-card p-6 mb-8">
            <h3 className="font-display font-semibold text-foreground mb-4">Treatment Progress</h3>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Knee Replacement</span>
                <span className="font-medium text-primary">40% Complete</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5">
                <div className="gradient-hero h-2.5 rounded-full" style={{ width: "40%" }} />
              </div>
            </div>
            <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Next: Pre-Op Consultation (Feb 1)</span>
              <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> Dr. Sarah Chen</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Timeline */}
            <div className="lg:col-span-2">
              <h3 className="font-display font-semibold text-foreground mb-4">Journey Timeline</h3>
              <div className="space-y-4">
                {timelineEvents.map((event, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex gap-4"
                  >
                    <div className="flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full ${
                        event.type === "upcoming" ? "bg-muted-foreground/30" : "bg-primary"
                      }`} />
                      {i < timelineEvents.length - 1 && <div className="w-0.5 flex-1 bg-border mt-1" />}
                    </div>
                    <div className={`flex-1 pb-6 ${event.type === "upcoming" ? "opacity-60" : ""}`}>
                      <div className="bg-card rounded-xl shadow-card p-4">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-sm font-semibold text-foreground">{event.title}</h4>
                          <span className="text-[10px] text-muted-foreground">{event.date}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{event.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right sidebar */}
            <div className="space-y-6">
              {/* Upcoming Appointments */}
              <div className="bg-card rounded-2xl shadow-card p-5">
                <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" /> Upcoming
                </h3>
                <div className="space-y-3">
                  {appointments.map((apt) => (
                    <div key={apt.doctor} className="p-3 rounded-xl bg-muted/50">
                      <p className="text-sm font-medium text-foreground">{apt.doctor}</p>
                      <p className="text-xs text-primary">{apt.specialty}</p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                        <span>{apt.date}</span>•<span>{apt.time}</span>
                      </div>
                      <Button size="sm" className="w-full mt-2 text-xs" variant="outline">
                        {apt.type === "Video Call" ? "Join Call" : "Get Directions"}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Documents */}
              <div className="bg-card rounded-2xl shadow-card p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" /> Documents
                  </h3>
                  <button className="text-primary text-xs hover:underline flex items-center gap-0.5">
                    <Upload className="w-3.5 h-3.5" /> Upload
                  </button>
                </div>
                <div className="space-y-2">
                  {documents.map((doc) => (
                    <div key={doc.name} className="flex items-center justify-between p-2.5 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs font-medium text-foreground">{doc.name}</p>
                          <p className="text-[10px] text-muted-foreground">{doc.date} • {doc.size}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Chat */}
              <div className="bg-card rounded-2xl shadow-card p-5">
                <h3 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-primary" /> Recent Chats
                </h3>
                <div className="space-y-2">
                  {["Dr. Sarah Chen", "Dr. Raj Patel"].map((name) => (
                    <Link
                      key={name}
                      to="/doctor/1"
                      className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-foreground">{name}</p>
                        <p className="text-[10px] text-muted-foreground">Last message 2 hours ago</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
