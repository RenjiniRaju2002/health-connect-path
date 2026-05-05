import { Doctor } from "./doctors";

const faces = [
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1618498082410-b4aa22193b38?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=200&h=200&fit=crop&crop=face",
];

const stdAvail = [
  { day: "Mon", slots: ["9:00 AM", "11:00 AM", "2:00 PM"] },
  { day: "Wed", slots: ["10:00 AM", "1:00 PM"] },
  { day: "Fri", slots: ["9:00 AM", "3:00 PM"] },
];

interface CityDef {
  city: string;
  country: string;
  flag: string;
}

const cities: CityDef[] = [
  { city: "Mumbai", country: "India", flag: "🇮🇳" },
  { city: "Delhi", country: "India", flag: "🇮🇳" },
  { city: "Chennai", country: "India", flag: "🇮🇳" },
  { city: "Bangalore", country: "India", flag: "🇮🇳" },
  { city: "Hyderabad", country: "India", flag: "🇮🇳" },
  { city: "Gurgaon", country: "India", flag: "🇮🇳" },
  { city: "Bangkok", country: "Thailand", flag: "🇹🇭" },
  { city: "Istanbul", country: "Turkey", flag: "🇹🇷" },
];

interface ProcedureDef {
  specialty: string;
  expertiseOptions: string[][];
  hospitals: string[];
  priceRange: [number, number];
  bioTemplate: string;
}

const procedures: ProcedureDef[] = [
  {
    specialty: "Knee Replacement",
    expertiseOptions: [
      ["Total Knee Replacement", "Robotic Knee Surgery", "Partial Knee Replacement"],
      ["Bilateral Knee Replacement", "Knee Revision Surgery", "ACL Reconstruction"],
      ["Computer-Navigated Knee Surgery", "Unicondylar Replacement", "Knee Arthroscopy"],
      ["Minimally Invasive Knee Surgery", "Custom Knee Implants", "Sports Medicine"],
    ],
    hospitals: ["City Orthopedic Center", "Joint Care Hospital", "Bone & Joint Institute", "Ortho Specialty Clinic", "Advanced Joint Center"],
    priceRange: [3000, 8000],
    bioTemplate: "Experienced knee replacement surgeon specializing in advanced joint care in",
  },
  {
    specialty: "Dental Implants",
    expertiseOptions: [
      ["All-on-4 Implants", "Dental Veneers", "Full Mouth Rehabilitation"],
      ["Smile Design", "Zirconia Implants", "Bone Grafting"],
      ["Same-Day Implants", "3D-Printed Prosthetics", "Implant Planning"],
      ["Mini Implants", "Overdentures", "Sinus Lift"],
    ],
    hospitals: ["SmileCare Dental", "DentPro Clinic", "Dental Excellence Center", "Ivory Dental Hospital", "Perfect Smile Clinic"],
    priceRange: [800, 2500],
    bioTemplate: "Expert dental implantologist providing world-class dental care in",
  },
  {
    specialty: "Eye Surgery",
    expertiseOptions: [
      ["LASIK", "Cataract Surgery", "ICL Implantation"],
      ["Retinal Surgery", "Glaucoma Surgery", "Corneal Transplant"],
      ["SMILE Surgery", "Keratoconus Treatment", "Cross-Linking"],
      ["Phacoemulsification", "Premium IOLs", "Presbyopia Correction"],
    ],
    hospitals: ["VisionCare Eye Center", "EyeTech Hospital", "Clear Sight Clinic", "Optic Care Institute", "Eagle Eye Center"],
    priceRange: [1200, 4000],
    bioTemplate: "Skilled ophthalmologist offering cutting-edge eye surgery in",
  },
  {
    specialty: "Cosmetic Surgery",
    expertiseOptions: [
      ["Rhinoplasty", "Liposuction", "Breast Augmentation"],
      ["Brazilian Butt Lift", "Tummy Tuck", "Body Contouring"],
      ["Facelift", "Blepharoplasty", "Hair Transplant"],
      ["V-Line Surgery", "Dermal Fillers", "Thread Lift"],
    ],
    hospitals: ["Aesthetic Care Center", "Beauty & Health Clinic", "Cosmetic Surgery Institute", "Radiance Medical Spa", "Premier Aesthetic Clinic"],
    priceRange: [2500, 9000],
    bioTemplate: "Board-certified cosmetic surgeon delivering natural-looking results in",
  },
  {
    specialty: "Cardiac Surgery",
    expertiseOptions: [
      ["Coronary Artery Bypass", "Heart Valve Repair", "Minimally Invasive Surgery"],
      ["Robotic Heart Surgery", "CABG", "Aortic Aneurysm Repair"],
      ["Valve Replacement", "TAVR", "Maze Procedure"],
      ["Heart Transplant", "LVAD Implantation", "Hybrid Cardiac Surgery"],
    ],
    hospitals: ["Heart Care Hospital", "Cardiac Excellence Center", "HeartLine Institute", "CardioVascular Clinic", "Advanced Heart Center"],
    priceRange: [4000, 12000],
    bioTemplate: "Renowned cardiac surgeon performing advanced heart procedures in",
  },
  {
    specialty: "Kidney Transplant",
    expertiseOptions: [
      ["Living Donor Transplant", "ABO-Incompatible Transplant", "Robotic Transplant"],
      ["Laparoscopic Donor Nephrectomy", "Transplant Surgery", "Post-Transplant Care"],
      ["Pediatric Transplant", "Multi-Organ Transplant", "Transplant Nephrology"],
      ["Paired Kidney Exchange", "Desensitization Protocol", "Re-Transplantation"],
    ],
    hospitals: ["Transplant Care Hospital", "Kidney Institute", "Renal Excellence Center", "NephroLife Clinic", "Advanced Transplant Center"],
    priceRange: [9000, 30000],
    bioTemplate: "Expert transplant surgeon specializing in kidney transplantation in",
  },
  {
    specialty: "IVF Treatment",
    expertiseOptions: [
      ["IVF", "ICSI", "PGT-A Genetic Screening"],
      ["Egg Freezing", "Donor Programs", "Fertility Preservation"],
      ["Recurrent Failure Treatment", "ERA Testing", "Blastocyst Transfer"],
      ["Micro-TESE", "Male Infertility", "Natural Cycle IVF"],
    ],
    hospitals: ["Fertility Care Center", "IVF Excellence Clinic", "ReproLife Institute", "Family Hope Hospital", "Advanced Fertility Center"],
    priceRange: [2800, 8000],
    bioTemplate: "Leading fertility specialist helping families through IVF treatment in",
  },
];

const firstNames = [
  "Aarav", "Vivaan", "Aditya", "Ananya", "Diya", "Ishaan", "Kavya", "Rohan", "Sneha", "Vikram",
  "Arjun", "Meera", "Priya", "Rahul", "Pooja", "Kiran", "Neha", "Siddharth", "Riya", "Amit",
  "Niran", "Somchai", "Apinya", "Thanaporn", "Burak", "Ceren", "Emre", "Fatma", "Murat", "Ayşe",
  "Suresh", "Lakshmi", "Ganesh", "Divya", "Harish", "Swathi", "Rajesh", "Deepa", "Mohan", "Padma",
];

const lastNames = [
  "Sharma", "Patel", "Kumar", "Singh", "Reddy", "Nair", "Joshi", "Gupta", "Verma", "Rao",
  "Chopra", "Malhotra", "Bansal", "Iyer", "Deshmukh", "Kapoor", "Mehta", "Thakur", "Bhat", "Pillai",
  "Prasert", "Srisuk", "Wongsa", "Thongchai", "Yılmaz", "Demir", "Kaya", "Aksoy", "Öztürk", "Toprak",
  "Menon", "Das", "Mishra", "Pandey", "Chauhan", "Tiwari", "Saxena", "Agarwal", "Sinha", "Bose",
];

const educationByCountry: Record<string, string[]> = {
  India: ["MBBS - AIIMS Delhi", "MS - PGIMER Chandigarh"],
  Thailand: ["MD - Chulalongkorn University", "Fellowship - Mahidol University"],
  Turkey: ["MD - Istanbul University", "Fellowship - Hacettepe University"],
};

const languagesByCountry: Record<string, string[]> = {
  India: ["English", "Hindi"],
  Thailand: ["English", "Thai"],
  Turkey: ["English", "Turkish"],
};

export const dummyDoctors: Doctor[] = [];

let counter = 0;
cities.forEach((city) => {
  procedures.forEach((proc) => {
    for (let i = 0; i < 10; i++) {
      counter++;
      const fIdx = (counter * 7 + i * 3) % firstNames.length;
      const lIdx = (counter * 5 + i * 11) % lastNames.length;
      const name = `Dr. ${firstNames[fIdx]} ${lastNames[lIdx]}`;
      const hospital = `${proc.hospitals[i % proc.hospitals.length]} - ${city.city}`;
      const experience = 8 + (counter % 20);
      const rating = parseFloat((4.3 + Math.random() * 0.6).toFixed(1));
      const reviews = 80 + Math.floor(Math.random() * 400);
      const price = proc.priceRange[0] + Math.floor(Math.random() * (proc.priceRange[1] - proc.priceRange[0]));
      const expertise = proc.expertiseOptions[i % proc.expertiseOptions.length];

      dummyDoctors.push({
        id: `dd${counter}`,
        name,
        specialty: proc.specialty,
        hospital,
        country: city.country,
        flag: city.flag,
        experience,
        rating,
        reviews,
        price,
        available: i !== 7, // 1 unavailable per set
        image: faces[i % faces.length],
        bio: `${proc.bioTemplate} ${city.city}.`,
        expertise,
        education: educationByCountry[city.country] || ["MD - University", "Fellowship"],
        languages: languagesByCountry[city.country] || ["English"],
        availability: stdAvail,
      });
    }
  });
});
