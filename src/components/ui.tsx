"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { ArrowUpRight, Link2 } from "lucide-react";

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .08 }} transition={{ duration: .55, delay, ease: [.22, 1, .36, 1] }}>{children}</motion.div>;
}
export function SectionHeading({ title, anchor, children }: { title: string; anchor: string; children?: ReactNode }) {
  return <div className="section-heading"><h2>{title}</h2><a href={`#${anchor}`} className="section-anchor" aria-label={`Link to ${title}`}><Link2 size={15} /></a>{children}</div>;
}
export function Tags({ items }: { items: string[] }) { return <div className="tags">{items.map(item => <span key={item}>{item}</span>)}</div>; }
export function ExternalLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{children}<ArrowUpRight size={14} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>;
}
