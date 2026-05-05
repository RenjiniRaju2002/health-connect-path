import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Clock, Tag, ArrowRight, Quote, Video, Plus, Play, X, Star, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getBlogsForProcedure, getReviewsForProcedure } from "@/data/procedureBlogs";

const featuredStory = {
  title: "How Maria Found Hope: A Knee Replacement Journey to Thailand",
  excerpt:
    "After years of chronic pain, Maria discovered affordable world-class orthopedic care in Bangkok. Here's her inspiring story of recovery and new beginnings.",
  image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=500&fit=crop",
  readTime: "8 min read",
  category: "Patient Story",
  author: "Maria González",
  date: "Jan 28, 2026",
};

const blogPosts = [
  {
    title: "Top 10 Medical Tourism Destinations in 2026",
    excerpt: "Explore the best countries offering affordable, high-quality medical care for international patients.",
    image: "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=400&h=250&fit=crop",
    readTime: "5 min read",
    category: "Guide",
    date: "Jan 25, 2026",
  },
  {
    title: "Understanding Dental Implant Costs Abroad",
    excerpt: "A comprehensive comparison of dental implant costs across popular medical tourism destinations.",
    image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=400&h=250&fit=crop",
    readTime: "4 min read",
    category: "Dental",
    date: "Jan 22, 2026",
  },
  {
    title: "What to Pack for Your Medical Trip",
    excerpt: "Essential packing tips and a checklist for patients traveling abroad for medical treatment.",
    image: "https://images.unsplash.com/photo-1553531384-cc64ac80f931?w=400&h=250&fit=crop",
    readTime: "3 min read",
    category: "Tips",
    date: "Jan 20, 2026",
  },
  {
    title: "IVF Success Rates: India vs. South Korea",
    excerpt: "Comparing fertility treatment outcomes and costs in two of Asia's leading medical destinations.",
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&h=250&fit=crop",
    readTime: "6 min read",
    category: "Fertility",
    date: "Jan 18, 2026",
  },
  {
    title: "Recovery After Cosmetic Surgery Abroad",
    excerpt: "Expert tips for a smooth recovery when having cosmetic procedures in a foreign country.",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&h=250&fit=crop",
    readTime: "4 min read",
    category: "Cosmetic",
    date: "Jan 15, 2026",
  },
  {
    title: "How to Choose the Right International Hospital",
    excerpt: "Key factors to consider when selecting a hospital for your medical tourism journey.",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=400&h=250&fit=crop",
    readTime: "5 min read",
    category: "Guide",
    date: "Jan 12, 2026",
  },
];

const patientStories = [
  {
    name: "James Wilson",
    country: "USA",
    treatment: "Cardiac Surgery",
    destination: "Thailand",
    quote:
      "The care I received was exceptional. My surgeon was world-class and the total cost was a fraction of what I'd pay at home.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
  },
  {
    name: "Sophia Laurent",
    country: "France",
    treatment: "Dental Implants",
    destination: "Turkey",
    quote:
      "Istanbul was amazing — the dental clinic was state-of-the-art and I saved over 60% compared to Paris. Highly recommend!",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
  },
];

interface Vlog {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnail: string;
  author: string;
  duration: string;
  date: string;
  category: string;
}

const initialVlogs: Vlog[] = [
  {
    id: "v1",
    title: "My Dental Implant Journey in Istanbul",
    description:
      "Follow my experience getting full dental implants at a top clinic in Istanbul, Turkey — from arrival to final results.",
    videoUrl: "https://www.youtube.com/watch?v=example1",
    thumbnail: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=600&h=340&fit=crop",
    author: "David Thompson",
    duration: "12:34",
    date: "Feb 1, 2026",
    category: "Dental",
  },
  {
    id: "v2",
    title: "Knee Replacement Recovery Vlog — Week by Week",
    description: "Documenting my recovery after knee replacement surgery at Apollo Hospital in Chennai, India.",
    videoUrl: "https://www.youtube.com/watch?v=example2",
    thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=340&fit=crop",
    author: "Emma Carter",
    duration: "18:22",
    date: "Jan 28, 2026",
    category: "Orthopedics",
  },
  {
    id: "v3",
    title: "Bangkok Hospital Tour — What to Expect",
    description:
      "A complete walkthrough of Bumrungrad International Hospital: rooms, facilities, food, and international patient services.",
    videoUrl: "https://www.youtube.com/watch?v=example3",
    thumbnail: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600&h=340&fit=crop",
    author: "Chris Rodriguez",
    duration: "15:07",
    date: "Jan 22, 2026",
    category: "Hospital Tour",
  },
];

const procedureFilters = ["All", "Cardiac Surgery", "Knee Replacement", "Dental Implants", "Cosmetic Surgery", "IVF Treatment", "Kidney Transplant"];

export default function Blog() {
  const [searchParams] = useSearchParams();
  const initialProcedure = searchParams.get("procedure") || "All";
  const [selectedProcedure, setSelectedProcedure] = useState(initialProcedure);
  const [vlogs, setVlogs] = useState<Vlog[]>(initialVlogs);
  const [showAddVlog, setShowAddVlog] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewForm, setReviewForm] = useState({ name: "", treatment: "", destination: "", rating: 5, review: "" });
  const [reviews, setReviews] = useState([
    { id: "r1", name: "James Wilson", treatment: "Cardiac Surgery", destination: "Thailand", rating: 5, review: "The care I received was exceptional. My surgeon was world-class and the total cost was a fraction of what I'd pay at home.", date: "Jan 20, 2026" },
    { id: "r2", name: "Sophia Laurent", treatment: "Dental Implants", destination: "Turkey", rating: 5, review: "Istanbul was amazing — the dental clinic was state-of-the-art and I saved over 60% compared to Paris. Highly recommend!", date: "Jan 15, 2026" },
    { id: "r3", name: "Chen Wei", treatment: "Knee Replacement", destination: "India", rating: 4, review: "Apollo Hospital exceeded expectations. Recovery was smooth and the nursing staff was very attentive.", date: "Jan 10, 2026" },
  ]);
  const [newVlog, setNewVlog] = useState({
    title: "",
    description: "",
    videoUrl: "",
    author: "",
    category: "",
  });

  const handleAddVlog = () => {
    if (!newVlog.title) return;
    const vlog: Vlog = {
      id: `v${Date.now()}`,
      title: newVlog.title,
      description: newVlog.description,
      videoUrl: newVlog.videoUrl,
      thumbnail: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=340&fit=crop",
      author: newVlog.author || "Anonymous",
      duration: "0:00",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      category: newVlog.category || "General",
    };
    setVlogs([vlog, ...vlogs]);
    setNewVlog({ title: "", description: "", videoUrl: "", author: "", category: "" });
    setShowAddVlog(false);
  };

  const handleSubmitReview = () => {
    if (!reviewForm.name || !reviewForm.review) return;
    setReviews([
      {
        id: `r${Date.now()}`,
        name: reviewForm.name,
        treatment: reviewForm.treatment || "General",
        destination: reviewForm.destination || "N/A",
        rating: reviewForm.rating,
        review: reviewForm.review,
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      },
      ...reviews,
    ]);
    setReviewForm({ name: "", treatment: "", destination: "", rating: 5, review: "" });
    setShowReviewModal(false);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 lg:px-8 py-8">
        {/* Featured Story */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <div className="relative rounded-3xl overflow-hidden group cursor-pointer">
            <img
              src={featuredStory.image}
              alt={featuredStory.title}
              className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 rounded-full bg-primary/20 text-primary-foreground text-xs font-medium backdrop-blur-sm">
                  {featuredStory.category}
                </span>
                <span className="text-xs text-primary-foreground/60 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {featuredStory.readTime}
                </span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-display font-bold text-primary-foreground mb-3 max-w-2xl">
                {featuredStory.title}
              </h2>
              <p className="text-primary-foreground/70 max-w-xl text-sm lg:text-base">{featuredStory.excerpt}</p>
            </div>
          </div>
        </motion.div>

        {/* Procedure Filter Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {procedureFilters.map((proc) => (
              <button
                key={proc}
                onClick={() => setSelectedProcedure(proc)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  selectedProcedure === proc
                    ? "gradient-hero text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {proc}
              </button>
            ))}
          </div>
        </div>

        {/* Procedure-Specific Blogs & Reviews */}
        {selectedProcedure !== "All" && (
          <div className="mb-16">
            <h2 className="text-2xl font-display font-bold text-foreground mb-6 flex items-center gap-2">
              <Tag className="w-5 h-5 text-primary" />
              {selectedProcedure} — Articles & Guides
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {getBlogsForProcedure(selectedProcedure).map((post, i) => (
                <motion.div
                  key={post.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-card rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden group cursor-pointer"
                >
                  <div className="relative h-40 overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-card/90 backdrop-blur-sm text-xs font-medium text-foreground flex items-center gap-1">
                      <Tag className="w-3 h-3" /> {post.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display font-semibold text-foreground mb-2 text-sm leading-snug">{post.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                      <span>{post.date}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <h2 className="text-2xl font-display font-bold text-foreground mb-6 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              {selectedProcedure} — Patient Reviews
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getReviewsForProcedure(selectedProcedure).map((r, i) => (
                <motion.div
                  key={r.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-card rounded-2xl shadow-card p-6"
                >
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, si) => (
                      <Star key={si} className={`w-4 h-4 ${si < r.rating ? "text-amber-400 fill-amber-400" : "text-muted"}`} />
                    ))}
                    <span className="text-xs font-semibold text-foreground ml-1">{r.rating}/5</span>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed mb-4 italic">"{r.review}"</p>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{r.name}</p>
                    <p className="text-xs text-muted-foreground">{r.country} • {r.date}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Blog Grid */}
        <div className="mb-16">
          <h2 className="text-2xl font-display font-bold text-foreground mb-6">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post, i) => (
              <motion.div
                key={post.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-card rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden group cursor-pointer"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-card/90 backdrop-blur-sm text-xs font-medium text-foreground flex items-center gap-1">
                    <Tag className="w-3 h-3" /> {post.category}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-display font-semibold text-foreground mb-2 text-sm leading-snug">{post.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {post.readTime}
                    </span>
                    <span>{post.date}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Vlogs Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
                <Video className="w-6 h-6 text-primary" />
                Patient Vlogs
              </h2>
              <p className="text-sm text-muted-foreground mt-1">Watch real patient experiences and hospital tours</p>
            </div>
            <Button
              onClick={() => setShowAddVlog(true)}
              className="gap-2 gradient-hero border-0 text-primary-foreground"
            >
              <Plus className="w-4 h-4" />
              Add Your Vlog
            </Button>
          </div>

          {/* Add Vlog Form */}
          <AnimatePresence>
            {showAddVlog && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mb-8"
              >
                <div className="bg-card rounded-2xl shadow-card border border-border p-6">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="font-display font-semibold text-foreground">Share Your Vlog</h3>
                    <button onClick={() => setShowAddVlog(false)}>
                      <X className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Video Title *</label>
                      <Input
                        placeholder="e.g. My Hair Transplant Experience in Turkey"
                        value={newVlog.title}
                        onChange={(e) => setNewVlog({ ...newVlog, title: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                        YouTube / Video URL
                      </label>
                      <Input
                        placeholder="https://youtube.com/watch?v=..."
                        value={newVlog.videoUrl}
                        onChange={(e) => setNewVlog({ ...newVlog, videoUrl: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Your Name</label>
                      <Input
                        placeholder="Your name"
                        value={newVlog.author}
                        onChange={(e) => setNewVlog({ ...newVlog, author: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Category</label>
                      <Input
                        placeholder="e.g. Dental, Orthopedics, Hospital Tour"
                        value={newVlog.category}
                        onChange={(e) => setNewVlog({ ...newVlog, category: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Description</label>
                    <Textarea
                      placeholder="Tell us about your experience..."
                      value={newVlog.description}
                      onChange={(e) => setNewVlog({ ...newVlog, description: e.target.value })}
                      rows={3}
                    />
                  </div>
                  <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={() => setShowAddVlog(false)}>
                      Cancel
                    </Button>
                    <Button
                      onClick={handleAddVlog}
                      disabled={!newVlog.title}
                      className="gradient-hero border-0 text-primary-foreground"
                    >
                      Submit Vlog
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Vlogs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vlogs.map((vlog, i) => (
              <motion.div
                key={vlog.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-card rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden group cursor-pointer"
                onClick={() => window.open(vlog.videoUrl, "_blank")}
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={vlog.thumbnail}
                    alt={vlog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Play overlay */}
                  <div className="absolute inset-0 bg-foreground/30 flex items-center justify-center group-hover:bg-foreground/40 transition-colors">
                    <div className="w-14 h-14 rounded-full bg-primary-foreground/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 text-primary fill-primary ml-0.5" />
                    </div>
                  </div>
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-foreground/80 text-primary-foreground text-xs font-medium">
                    {vlog.duration}
                  </span>
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-card/90 backdrop-blur-sm text-xs font-medium text-foreground flex items-center gap-1">
                    <Video className="w-3 h-3" /> {vlog.category}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-display font-semibold text-foreground mb-2 text-sm leading-snug">{vlog.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-2">{vlog.description}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{vlog.author}</span>
                    <span>{vlog.date}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Patient Reviews */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-primary" />
              Patient Reviews
            </h2>
            <Button onClick={() => setShowReviewModal(true)} className="gap-2 gradient-hero border-0 text-primary-foreground">
              <Plus className="w-4 h-4" /> Write a Review
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-card rounded-2xl shadow-card p-6"
              >
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, si) => (
                    <Star key={si} className={`w-4 h-4 ${si < r.rating ? "text-amber-400 fill-amber-400" : "text-muted"}`} />
                  ))}
                </div>
                <p className="text-sm text-foreground leading-relaxed mb-4 italic">"{r.review}"</p>
                <div>
                  <p className="text-sm font-semibold text-foreground">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.treatment} in {r.destination} • {r.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Review Modal */}
        <Dialog open={showReviewModal} onOpenChange={setShowReviewModal}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="font-display">Write a Patient Review</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-2">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Your Name *</label>
                <Input placeholder="Your name" value={reviewForm.name} onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Treatment</label>
                  <Input placeholder="e.g. Dental Implants" value={reviewForm.treatment} onChange={(e) => setReviewForm({ ...reviewForm, treatment: e.target.value })} />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Destination</label>
                  <Input placeholder="e.g. Turkey" value={reviewForm.destination} onChange={(e) => setReviewForm({ ...reviewForm, destination: e.target.value })} />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button key={s} onClick={() => setReviewForm({ ...reviewForm, rating: s })}>
                      <Star className={`w-6 h-6 transition-colors ${s <= reviewForm.rating ? "text-amber-400 fill-amber-400" : "text-muted"}`} />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Your Review *</label>
                <Textarea placeholder="Share your experience..." value={reviewForm.review} onChange={(e) => setReviewForm({ ...reviewForm, review: e.target.value })} rows={4} />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <Button variant="outline" onClick={() => setShowReviewModal(false)}>Cancel</Button>
                <Button onClick={handleSubmitReview} disabled={!reviewForm.name || !reviewForm.review} className="gradient-hero border-0 text-primary-foreground">Submit Review</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}
