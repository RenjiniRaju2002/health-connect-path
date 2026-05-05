import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { HeroSearch } from "@/components/HeroSearch";
import { ProcedureGrid } from "@/components/ProcedureGrid";
import { motion } from "framer-motion";
import { Shield, Clock, Award, Globe, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Shield,
    title: "Verified & Accredited",
    description: "All doctors and hospitals are thoroughly vetted and internationally accredited.",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock assistance from dedicated patient coordinators.",
  },
  {
    icon: Award,
    title: "Best Price Guarantee",
    description: "Transparent pricing with no hidden costs. Save up to 70% on treatments.",
  },
  {
    icon: Globe,
    title: "Global Network",
    description: "Access to 350+ partner hospitals across 25+ countries worldwide.",
  },
];

const Index = () => {
  const navigate = useNavigate();

  const handleProcedureSelect = (procedure: string) => {
    navigate(`/search?specialty=${encodeURIComponent(procedure)}&tab=doctors`);
  };

  return (
    <Layout>
      <HeroSearch onProcedureSelect={handleProcedureSelect} />
      <ProcedureGrid onProcedureSelect={handleProcedureSelect} />

      {/* Why Choose Us */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-4">
              Why Choose MediGlobe?
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              We make your medical journey safe, seamless, and affordable.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-background border border-border/50 hover:shadow-card transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <feat.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">{feat.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-primary-foreground mb-4">
              Ready to Start Your Medical Journey?
            </h2>
            <p className="text-primary-foreground/70 max-w-md mx-auto mb-8">
              Connect with top doctors today and get a free treatment estimate.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/search">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold gap-2">
                  Find a Doctor
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/estimate">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
                  Get Free Estimate
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
