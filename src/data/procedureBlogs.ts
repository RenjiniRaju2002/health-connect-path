export interface ProcedureBlog {
  title: string;
  excerpt: string;
  image: string;
  readTime: string;
  category: string;
  date: string;
  author: string;
}

export interface ProcedureReview {
  name: string;
  country: string;
  rating: number;
  review: string;
  date: string;
}

const procedureBlogsMap: Record<string, ProcedureBlog[]> = {
  "Knee Replacement": [
    { title: "Complete Guide to Knee Replacement Surgery Abroad", excerpt: "Everything you need to know about getting knee replacement surgery overseas — from choosing a hospital to recovery.", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop", readTime: "6 min read", category: "Knee Replacement", date: "Feb 5, 2026", author: "Dr. Health Team" },
    { title: "Recovery Timeline After Knee Replacement", excerpt: "Week-by-week recovery expectations after total knee replacement surgery.", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=250&fit=crop", readTime: "5 min read", category: "Knee Replacement", date: "Jan 28, 2026", author: "Emma Carter" },
    { title: "Knee Replacement Cost Comparison: USA vs India vs Thailand", excerpt: "A detailed breakdown of knee replacement surgery costs across popular medical tourism destinations.", image: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=400&h=250&fit=crop", readTime: "4 min read", category: "Knee Replacement", date: "Jan 20, 2026", author: "Medical Travel Guide" },
  ],
  "Cardiac Surgery": [
    { title: "Understanding Heart Bypass Surgery Abroad", excerpt: "What to expect when traveling for cardiac bypass surgery — risks, benefits, and top destinations.", image: "https://images.unsplash.com/photo-1628348070889-cb656235b4eb?w=400&h=250&fit=crop", readTime: "7 min read", category: "Cardiac Surgery", date: "Feb 3, 2026", author: "Dr. Heart Care" },
    { title: "Top Cardiac Surgery Hospitals Worldwide", excerpt: "Ranking the best hospitals for heart surgery across Asia, Europe, and the Americas.", image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=400&h=250&fit=crop", readTime: "5 min read", category: "Cardiac Surgery", date: "Jan 25, 2026", author: "Health Insights" },
    { title: "Life After Open Heart Surgery: Patient Stories", excerpt: "Real patients share their journeys of recovery and renewed health after cardiac procedures.", image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&h=250&fit=crop", readTime: "6 min read", category: "Cardiac Surgery", date: "Jan 18, 2026", author: "Patient Stories" },
  ],
  "Dental Implants": [
    { title: "Dental Implants Abroad: Is It Worth It?", excerpt: "Pros and cons of getting dental implants in popular medical tourism countries like Turkey and Thailand.", image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=400&h=250&fit=crop", readTime: "5 min read", category: "Dental Implants", date: "Feb 4, 2026", author: "Dental Care Guide" },
    { title: "All-on-4 vs Traditional Implants: Which Is Right for You?", excerpt: "Comparing two popular dental implant techniques — cost, durability, and recovery time.", image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=250&fit=crop", readTime: "4 min read", category: "Dental Implants", date: "Jan 22, 2026", author: "Dr. Smile" },
    { title: "My Dental Implant Journey in Istanbul", excerpt: "A first-person account of getting full-mouth dental implants at a top clinic in Turkey.", image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=400&h=250&fit=crop", readTime: "6 min read", category: "Dental Implants", date: "Jan 15, 2026", author: "Sophia Laurent" },
  ],
  "Cosmetic Surgery": [
    { title: "Cosmetic Surgery Abroad: Safety First", excerpt: "Essential safety tips for anyone considering cosmetic procedures overseas.", image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&h=250&fit=crop", readTime: "5 min read", category: "Cosmetic Surgery", date: "Feb 2, 2026", author: "Beauty & Health" },
    { title: "Top 5 Countries for Rhinoplasty", excerpt: "Where to get the best nose jobs worldwide — quality, cost, and patient satisfaction compared.", image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=400&h=250&fit=crop", readTime: "4 min read", category: "Cosmetic Surgery", date: "Jan 24, 2026", author: "Cosmetic Guide" },
    { title: "Before & After: Real Cosmetic Surgery Transformations", excerpt: "Patient stories and results from cosmetic procedures performed at top international clinics.", image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=250&fit=crop", readTime: "5 min read", category: "Cosmetic Surgery", date: "Jan 16, 2026", author: "Patient Stories" },
  ],
  "IVF Treatment": [
    { title: "IVF Abroad: A Complete Guide for Hopeful Parents", excerpt: "Everything you need to know about fertility treatment overseas — success rates, costs, and top clinics.", image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&h=250&fit=crop", readTime: "7 min read", category: "IVF Treatment", date: "Feb 1, 2026", author: "Fertility Guide" },
    { title: "IVF Success Rates: India vs South Korea vs Spain", excerpt: "Comparing fertility treatment outcomes across leading IVF destinations.", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=250&fit=crop", readTime: "5 min read", category: "IVF Treatment", date: "Jan 20, 2026", author: "Dr. Fertility" },
    { title: "Our IVF Journey: From Heartbreak to Hope", excerpt: "A couple shares their emotional journey through IVF treatment at a clinic in Mumbai.", image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=400&h=250&fit=crop", readTime: "8 min read", category: "IVF Treatment", date: "Jan 12, 2026", author: "Sarah & James" },
  ],
  "Kidney Transplant": [
    { title: "Kidney Transplant Abroad: What You Must Know", excerpt: "Critical information for patients considering kidney transplant surgery in another country.", image: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=400&h=250&fit=crop", readTime: "6 min read", category: "Kidney Transplant", date: "Feb 3, 2026", author: "Transplant Guide" },
    { title: "Top Hospitals for Kidney Transplant in Asia", excerpt: "A curated list of the best kidney transplant centers across India, Thailand, and South Korea.", image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=400&h=250&fit=crop", readTime: "5 min read", category: "Kidney Transplant", date: "Jan 22, 2026", author: "Medical Expert" },
    { title: "Life After Kidney Transplant: Patient Experiences", excerpt: "Real stories from patients who received kidney transplants at international hospitals.", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=250&fit=crop", readTime: "6 min read", category: "Kidney Transplant", date: "Jan 14, 2026", author: "Patient Stories" },
  ],
};

const procedureReviewsMap: Record<string, ProcedureReview[]> = {
  "Knee Replacement": [
    { name: "Robert Miller", country: "USA", rating: 5, review: "Best decision I ever made. Walking pain-free after 20 years. The surgeon was incredible.", date: "Feb 1, 2026" },
    { name: "Chen Wei", country: "China", rating: 5, review: "Apollo Hospital exceeded expectations. Recovery was smooth and the nursing staff was very attentive.", date: "Jan 25, 2026" },
    { name: "Anna Schmidt", country: "Germany", rating: 4, review: "Great results at a fraction of the cost. Only minor language barrier during recovery.", date: "Jan 18, 2026" },
  ],
  "Cardiac Surgery": [
    { name: "James Wilson", country: "USA", rating: 5, review: "The care I received was exceptional. My surgeon was world-class and the total cost was a fraction of what I'd pay at home.", date: "Jan 30, 2026" },
    { name: "Pierre Dubois", country: "France", rating: 5, review: "Had triple bypass surgery in Bangkok. The hospital was better equipped than many in Europe.", date: "Jan 22, 2026" },
    { name: "Maria Santos", country: "Brazil", rating: 5, review: "My heart valve replacement went perfectly. The cardiology team was outstanding.", date: "Jan 15, 2026" },
  ],
  "Dental Implants": [
    { name: "Sophia Laurent", country: "France", rating: 5, review: "Istanbul was amazing — the dental clinic was state-of-the-art and I saved over 60% compared to Paris!", date: "Jan 28, 2026" },
    { name: "Tom Andrews", country: "UK", rating: 5, review: "Full mouth restoration done in 5 days. Incredible quality and the team spoke perfect English.", date: "Jan 20, 2026" },
    { name: "Lisa Park", country: "Australia", rating: 4, review: "Very happy with my All-on-4 implants. The only challenge was the long flight for follow-up.", date: "Jan 12, 2026" },
  ],
  "Cosmetic Surgery": [
    { name: "Emily Rose", country: "UK", rating: 5, review: "My rhinoplasty results are amazing. The surgeon really listened to what I wanted.", date: "Feb 2, 2026" },
    { name: "Yuki Tanaka", country: "Japan", rating: 5, review: "Had a facelift in South Korea. The expertise in cosmetic surgery there is unmatched.", date: "Jan 24, 2026" },
    { name: "Karen Mitchell", country: "Canada", rating: 4, review: "Great results from my liposuction. Recovery hotel was comfortable and staff was caring.", date: "Jan 16, 2026" },
  ],
  "IVF Treatment": [
    { name: "Sarah & James", country: "USA", rating: 5, review: "After 3 failed rounds at home, we succeeded on our first try in India. Forever grateful.", date: "Feb 1, 2026" },
    { name: "Ana García", country: "Spain", rating: 5, review: "The fertility clinic in Mumbai was outstanding. So professional and compassionate.", date: "Jan 22, 2026" },
    { name: "Fatima Al-Hassan", country: "UAE", rating: 5, review: "We now have our miracle baby thanks to an amazing IVF team in Bangkok.", date: "Jan 14, 2026" },
  ],
  "Kidney Transplant": [
    { name: "David Brown", country: "USA", rating: 5, review: "My kidney transplant at Fortis Hospital was life-saving. The transplant team was world-class.", date: "Jan 28, 2026" },
    { name: "Raj Sharma", country: "UK", rating: 5, review: "Traveled to India for my transplant. The care was exceptional from pre-op to discharge.", date: "Jan 20, 2026" },
    { name: "Michael O'Brien", country: "Ireland", rating: 4, review: "Everything went smoothly. The hospital coordinated all logistics including accommodation.", date: "Jan 10, 2026" },
  ],
};

export function getBlogsForProcedure(specialty: string): ProcedureBlog[] {
  // Try exact match first, then partial match
  const exact = procedureBlogsMap[specialty];
  if (exact) return exact;
  
  const key = Object.keys(procedureBlogsMap).find(k => 
    specialty.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(specialty.toLowerCase())
  );
  return key ? procedureBlogsMap[key] : procedureBlogsMap["Cardiac Surgery"];
}

export function getReviewsForProcedure(specialty: string): ProcedureReview[] {
  const exact = procedureReviewsMap[specialty];
  if (exact) return exact;
  
  const key = Object.keys(procedureReviewsMap).find(k =>
    specialty.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(specialty.toLowerCase())
  );
  return key ? procedureReviewsMap[key] : procedureReviewsMap["Cardiac Surgery"];
}
