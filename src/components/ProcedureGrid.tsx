import { motion } from "framer-motion";
import {
  Heart, Bone, Eye, SmilePlus, Baby, Brain, Scissors, Activity,
} from "lucide-react";

const procedures = [
  { name: "Cardiac Surgery", icon: Heart, color: "bg-red-50 text-red-500" },
  { name: "Orthopedics", icon: Bone, color: "bg-blue-50 text-blue-500" },
  { name: "Eye Surgery", icon: Eye, color: "bg-teal-50 text-teal-500" },
  { name: "Dental Implants", icon: SmilePlus, color: "bg-amber-50 text-amber-500" },
  { name: "IVF Treatment", icon: Baby, color: "bg-pink-50 text-pink-500" },
  { name: "Neurosurgery", icon: Brain, color: "bg-purple-50 text-purple-500" },
  { name: "Cosmetic Surgery", icon: Scissors, color: "bg-rose-50 text-rose-500" },
  { name: "Bariatric Surgery", icon: Activity, color: "bg-green-50 text-green-500" },
];

interface ProcedureGridProps {
  onProcedureSelect: (procedure: string) => void;
}

export function ProcedureGrid({ onProcedureSelect }: ProcedureGridProps) {
  return (
    <section className="py-20 gradient-subtle">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-4">
            Explore Treatments
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Browse our most sought-after medical procedures across top hospitals worldwide.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {procedures.map((proc, i) => (
            <motion.div
              key={proc.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <button
                onClick={() => onProcedureSelect(proc.name)}
                className="w-full group flex flex-col items-center gap-4 p-6 lg:p-8 bg-card rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-14 h-14 rounded-xl ${proc.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <proc.icon className="w-7 h-7" />
                </div>
                <span className="text-sm font-medium text-foreground text-center">{proc.name}</span>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
