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
  visual: "saathi" | "plant" | "voice" | "rag" | "disease" | "eduflow";
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
    id: "voice", number: "02", title: "Telugu AI Voice Agent", category: "AI / ML",
    subtitle: "Real-time voice. Real conversations.",
    description: "An end-to-end real-time voice AI pipeline for multilingual telephony conversations.",
    tags: ["Pipecat", "Groq/LLaMA", "Deepgram", "Sarvam AI"], visual: "voice", color: "lavender",
    details: "Engineered a real-time voice AI pipeline: Deepgram Nova-3 (STT) → LLaMA 3.1-8b via Groq (LLM inference) → Sarvam AI Bulbul v3 (TTS), orchestrated with Pipecat. Integrated Exotel telephony for call routing with structured prompt engineering for multilingual Telugu/English conversations. Built an MCP integration layer demonstrating applied agentic AI and REST/webhook architecture.",
  },
  {
    id: "rag", number: "03", title: "Document Q&A RAG Pipeline", category: "AI / ML",
    subtitle: "Ask questions. Get grounded answers.",
    description: "A Retrieval-Augmented Generation pipeline for querying PDFs and documents.",
    tags: ["LangChain", "LangGraph", "ChromaDB", "OpenAI"], visual: "rag", color: "blue",
    details: "Built a Retrieval-Augmented Generation pipeline for querying PDFs and documents using LangChain and LangGraph for orchestration. Implemented document chunking, embedding generation, and semantic retrieval via vector databases (ChromaDB/FAISS) to ground LLM responses in source documents.",
  },
  {
    id: "disease", number: "04", title: "Multiple Disease Prediction", category: "AI / ML",
    subtitle: "Data-driven health insights.",
    description: "An ML pipeline predicting Diabetes, Heart Disease, and Parkinson's with 91% accuracy.",
    tags: ["Scikit-learn", "Streamlit", "SQL", "Pandas"], visual: "disease", color: "rose",
    details: "Built an end-to-end ML pipeline predicting Diabetes, Heart Disease, and Parkinson's Disease. Covers feature selection, normalisation, and model training using Logistic Regression, Random Forest, and SVM — achieving 91% accuracy on held-out test sets evaluated via precision, recall, F1, and ROC-AUC. Optimised SQL queries with indexed lookups, cutting average read latency from ~150ms to ~50ms. Deployed via Streamlit for real-time prediction.",
  },
  {
    id: "plant", number: "05", title: "Medicinal Plant Identification", category: "AI / ML",
    subtitle: "Nature, understood through intelligence.",
    description: "CNN image classifiers achieving 95% validation accuracy on 6,500+ plant images.",
    tags: ["TensorFlow", "Keras", "PyTorch", "OpenCV"], visual: "plant", color: "lime",
    details: "Built and benchmarked CNN image classifiers on 6,500+ plant images, achieving 95% validation accuracy for multi-class classification. Applied data augmentation, batch normalisation, and dropout, improving generalisation by ~12% over baseline. Reduced training time by ~28% through hyperparameter tuning (learning rate scheduling, batch size, dropout).",
  },
  {
    id: "eduflow", number: "06", title: "EduFlow", category: "Web",
    subtitle: "Student management, simplified.",
    description: "A production SaaS platform with real-time data sync and interactive analytics.",
    tags: ["Firebase", "Chart.js", "Docker", "Vercel"], visual: "eduflow", color: "amber",
    details: "Built a production SaaS platform serving active users with real-time data sync via Firestore and role-based access control. Developed 4+ interactive analytics dashboards with Chart.js and a CSV bulk-import pipeline handling 1,000 records per upload, cutting manual reporting time by ~70%. Containerized using Docker for cloud deployment testing; deployed on Vercel with CI/CD achieving 1.5–2s load times.",
  },
];

// Editorial content, not an automatically measured development status.
export const currentWork = {
  title: "This little corner of the internet.",
  description: "A home for my projects, experiments, and everything I'm learning along the way. Built with care, one interaction at a time.",
  label: "On my workbench",
  tags: ["Next.js", "TypeScript", "Framer Motion"],
  stages: ["Design", "Development", "Iteration"],
  activeStage: 2,
};
