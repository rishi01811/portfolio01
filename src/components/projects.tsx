"use client";

import { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, BrainCircuit, FileSearch, GraduationCap, Heart, HeartPulse, List, Phone, Sparkles, X } from "lucide-react";
import { projects, type Project } from "@/data/portfolio";
import { ProjectVisual } from "./project-visual";
import { ExternalLink, SectionHeading, Tags } from "./ui";

const projectIcons = { saathi: Heart, plant: BrainCircuit, voice: Phone, rag: FileSearch, disease: HeartPulse, eduflow: GraduationCap };

function ProjectDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (project) {
      dialog?.showModal();
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = previous; if (dialog?.open) dialog.close(); };
    }
  }, [project]);
  return <dialog ref={ref} className="project-dialog" onCancel={onClose} onClick={event => { if (event.target === event.currentTarget) onClose(); }} aria-labelledby="project-dialog-title">
    {project && <div className="dialog-inner"><button className="dialog-close icon-button" onClick={onClose} aria-label="Close project"><X size={20} /></button><ProjectVisual variant={project.visual} /><div className="dialog-copy"><span className="widget-caption">PROJECT {project.number} / {project.category}</span><h2 id="project-dialog-title">{project.title}</h2><p>{project.details}</p><Tags items={project.tags} /><div className="dialog-links">{project.repository && <ExternalLink href={project.repository} className="pill-button secondary">View source</ExternalLink>}{project.demo && <ExternalLink href={project.demo} className="pill-button primary">Explore project</ExternalLink>}{!project.repository && !project.demo && <span className="muted small">Project links will be shared here soon.</span>}</div></div></div>}
  </dialog>;
}

export function Projects() {
  const [view, setView] = useState<"list" | "spotlight">("list");
  const [selected, setSelected] = useState<Project | null>(null);
  const [index, setIndex] = useState(0);
  const current = projects[index];
  const move = (step: number) => setIndex(value => (value + step + projects.length) % projects.length);
  return <section id="projects" className="section projects-section"><SectionHeading title="Things I’ve built" anchor="projects"><div className="view-switch" role="group" aria-label="Project view"><button aria-pressed={view === "list"} onClick={() => setView("list")}><List size={13} />List</button><button aria-pressed={view === "spotlight"} onClick={() => setView("spotlight")}><Sparkles size={12} />Spotlight</button></div></SectionHeading><p className="section-description">A few ideas that made it out of the notebook.</p>
    <AnimatePresence mode="wait">{view === "list" ? <motion.div key="list" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: .2 }} className="project-list">{projects.map(project => { const Icon = projectIcons[project.visual]; return <button key={project.id} className={`project-row row-${project.color}`} onClick={() => setSelected(project)}><span className="project-icon"><Icon size={22} strokeWidth={1.5} /></span><span className="project-row-copy"><span className="project-row-title">{project.title}<ArrowUpRight size={15} /></span><span className="project-row-description">{project.subtitle}</span></span><span className="project-category">{project.category}</span><span className="row-index">{project.number}</span></button>; })}</motion.div> : <motion.div key="spotlight" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: .2 }} className="project-spotlight"><AnimatePresence mode="wait"><motion.div key={current.id} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: .22 }}><button className="project-open" onClick={() => setSelected(current)} aria-label={`Explore ${current.title}`}><ProjectVisual variant={current.visual} /><span className="preview-arrow"><ArrowUpRight size={22} /></span></button><div className="spotlight-info"><div><span className="widget-caption">{current.category} / PROJECT {current.number}</span><h3><button onClick={() => setSelected(current)}>{current.title}<ArrowUpRight size={18} /></button></h3><p>{current.description}</p><Tags items={current.tags} /></div></div></motion.div></AnimatePresence><div className="spotlight-navigation"><span className="small muted" role="status">{index + 1} of {projects.length} projects</span><div className="spotlight-dots">{projects.map((project, i) => <button key={project.id} aria-label={`Show ${project.title}`} aria-pressed={index === i} onClick={() => setIndex(i)} />)}</div><div><button className="icon-button" onClick={() => move(-1)} aria-label="Previous project"><ArrowLeft size={17} /></button><button className="icon-button" onClick={() => move(1)} aria-label="Next project"><ArrowRight size={17} /></button></div></div></motion.div>}</AnimatePresence>
    <p className="project-footnote"><span>Made to solve something. Built to learn something.</span><Brackets /></p><ProjectDialog project={selected} onClose={() => setSelected(null)} />
  </section>;
}

function Brackets() { return <span aria-hidden="true">&lt;/&gt;</span>; }
