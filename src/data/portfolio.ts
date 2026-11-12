export const profile = {
  name: "Rishi",
  role: "Developer · AI Enthusiast · Creative Problem Solver",
  location: "India",
  tagline: "Building things at the intersection of AI, technology and creativity.",
  availability: "Open to conversations",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "",
  github: process.env.NEXT_PUBLIC_GITHUB_USERNAME?.trim() || "",
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL?.trim() || "",
  resume: process.env.NEXT_PUBLIC_RESUME_URL?.trim() || "",
};

export type Project = {
  id: string;
  number: string;
  title: string;
  category: "Mobile" | "AI / ML" | "Web";
  subtitle: string;
  description: string;
  tags: string[];
  visual: "saathi" | "plant" | "waste" | "geo";
  color: string;
  details: string;
  repository?: string;
  demo?: string;
};

export const projects: Project[] = [
  {
    id: "saathi", number: "01", title: "Saathi", category: "Mobile",
    subtitle: "A little care. A constant companion.",
    description: "A patient companion application that brings technology closer to the people who need it.",
    tags: ["Flutter", "Supabase", "Healthcare"], visual: "saathi", color: "mint",
    details: "Saathi explores how a mobile companion can make the patient experience feel more approachable. Built with Flutter and Supabase, it brings a human-centered perspective to healthcare technology. The interface shown here is an illustrative concept; project screenshots and a repository link will be added when available.",
  },
  {
    id: "plant", number: "02", title: "Medicinal Plant Identification", category: "AI / ML",
    subtitle: "Nature, understood through intelligence.",
    description: "Exploring medicinal plant identification with computer vision and machine learning.",
    tags: ["MobileNetV2", "VMD", "Computer Vision"], visual: "plant", color: "lime",
    details: "An AI-powered medicinal plant identification project using MobileNetV2 and VMD. It explores the relationship between image analysis and botanical knowledge. The visual is a concept preview, not an actual model prediction. Accuracy, dataset details, and evaluation results are intentionally omitted until verified.",
  },
  {
    id: "waste", number: "03", title: "Smart Waste Management", category: "Web",
    subtitle: "Smarter systems. Cleaner spaces.",
    description: "A platform exploring how thoughtful software can support better waste management.",
    tags: ["Sustainability", "Platform", "Systems Thinking"], visual: "waste", color: "lavender",
    details: "A smart waste management platform focused on applying technology to an everyday environmental challenge. The dashboard is an illustrative interface concept. Implementation details, verified features, and source code can be added to the project data file as the case study develops.",
  },
  {
    id: "geo", number: "04", title: "GeoBioAttend", category: "Web",
    subtitle: "The right person. The right place.",
    description: "Connecting geolocation and biometric verification for a more intentional attendance experience.",
    tags: ["Geolocation", "Biometrics", "Attendance"], visual: "geo", color: "blue",
    details: "GeoBioAttend is a geolocation and biometric attendance system. The project explores how location and identity can work together in attendance workflows. The map and verification interface are concept placeholders, with no personal or live location data displayed.",
  },
];

// Editorial content, not an automatically measured development status.
export const currentWork = {
  title: "This little corner of the internet.",
  description: "A home for my projects, experiments, and everything I’m learning along the way. Built with care, one interaction at a time.",
  label: "On my workbench",
  tags: ["Next.js", "TypeScript", "Framer Motion"],
  stages: ["Design", "Development", "Iteration"],
  activeStage: 2,
};
