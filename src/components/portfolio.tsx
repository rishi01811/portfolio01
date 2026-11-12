"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowDownRight, ArrowUp, ArrowUpRight, Braces, BrainCircuit, Check, ChevronDown, ChevronUp, Code2, Copy, Download, Folder, Github, Globe2, Hand, Heart, Home, Linkedin, Mail, Menu, Moon, Pause, Play, Radio, Smartphone, Sparkles, Sun, Terminal, X, Zap } from "lucide-react";
import { currentWork, profile } from "@/data/portfolio";
import { ActivitySection, DiscordStatus } from "./activity";
import { Projects } from "./projects";
import { Reveal, SectionHeading, Tags } from "./ui";

const navigation = [
  { name: "Home", icon: Home }, { name: "About", icon: Braces },
  { name: "Projects", icon: Folder }, { name: "Activity", icon: Radio }, { name: "Contact", icon: Mail },
];

function BotanicalBanner() {
  return <svg className="botanical-banner" viewBox="0 0 900 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <radialGradient id="banner-ground"><stop stopColor="#573c65" /><stop offset="1" stopColor="#211b32" /></radialGradient>
      <linearGradient id="petal-light" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#f8e9ba" /><stop offset=".65" stopColor="#ddbc7f" /><stop offset="1" stopColor="#aa795e" /></linearGradient>
      <linearGradient id="petal-mauve" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#b28cb7" /><stop offset="1" stopColor="#5d3f75" /></linearGradient>
      <pattern id="banner-dots" width="12" height="12" patternUnits="userSpaceOnUse"><circle cx="6" cy="6" r=".65" fill="#e8c59b" opacity=".16" /></pattern>
      <g id="botanical-petal"><path d="M0 0C-35-21-42-74 0-106C42-74 35-21 0 0Z" fill="url(#petal-light)" stroke="#e7cb93" strokeWidth=".6" /><path d="M0-4V-96M0-29L-19-51M0-44L-24-68M0-56L-20-81M0-29L19-51M0-44L24-68M0-56L20-81" stroke="#aa815b" strokeWidth=".7" opacity=".55" fill="none" /></g>
      <g id="botanical-flower">{Array.from({ length: 8 }, (_, i) => <use key={i} href="#botanical-petal" transform={`rotate(${i * 45})`} />)}<circle r="22" fill="#ae777e" /><circle r="15" fill="#d4ad8f" /><circle r="10" fill="#50354e" />{Array.from({ length: 12 }, (_, i) => <circle key={i} cx={Math.cos(i * Math.PI / 6) * 17} cy={Math.sin(i * Math.PI / 6) * 17} r="1.4" fill="#f7dfaf" />)}</g>
      <g id="botanical-leaf"><path d="M0 0Q-41-55 0-90Q40-52 0 0" fill="url(#petal-mauve)" stroke="#b68ea5" strokeWidth=".5" /><path d="M0 0V-82M0-22L-17-41M0-38L-18-57M0-22L17-41M0-38L18-57" stroke="#d2aeb6" opacity=".3" fill="none" /></g>
    </defs>
    <rect width="900" height="300" fill="url(#banner-ground)" /><rect width="900" height="300" fill="url(#banner-dots)" />
    <g transform="translate(450 155)"><g className="rosette-spin">{Array.from({ length: 16 }, (_, i) => <use href="#botanical-leaf" key={i} transform={`rotate(${i * 22.5}) translate(0 -43) scale(1.45)`} />)}<circle r="57" fill="#39243c" stroke="#af7f9a" />{[45, 35, 25].map((r, i) => <circle r={r} key={r} fill="none" stroke={i === 1 ? "#e1ba8c" : "#ab748c"} strokeWidth="1" strokeDasharray={i === 1 ? "2 5" : "1 3"} />)}<path d="M0-20L5-5L20 0L5 5L0 20L-5 5L-20 0L-5-5Z" fill="#eccd96" /></g></g>
    {[{ x: 52, y: 44, s: 1.2, r: 15 }, { x: 247, y: 120, s: 1.05, r: -10 }, { x: 95, y: 287, s: 1.2, r: 25 }, { x: 322, y: 326, s: .9, r: 8 }, { x: 652, y: 43, s: 1.15, r: 18 }, { x: 833, y: 168, s: 1.35, r: -8 }, { x: 602, y: 283, s: 1.05, r: 10 }, { x: 390, y: -71, s: .85, r: 15 }].map(({ x, y, s, r }, i) => <use key={i} href="#botanical-flower" transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} />)}
    <rect width="900" height="300" fill="#160c22" opacity=".12" />
  </svg>;
}

function Header({ theme, onTheme, paused, onPause }: { theme: string; onTheme: () => void; paused: boolean; onPause: () => void }) {
  const menu = useRef<HTMLDialogElement>(null);
  const closeMenu = () => { menu.current?.close(); document.body.style.overflow = ""; };
  return <header id="home" className="profile-header">
    <div className="cover-art"><BotanicalBanner /><div className="cover-shade" /></div>
    <div className="cover-navigation"><nav className="desktop-nav" aria-label="Main navigation">{navigation.map(({ name, icon: Icon }) => <a href={`#${name.toLowerCase()}`} key={name}><Icon size={13} /><span>{name}</span></a>)}</nav><button className="mobile-menu-button cover-button" aria-label="Open navigation" onClick={() => { menu.current?.showModal(); document.body.style.overflow = "hidden"; }}><Menu size={16} /><span>Menu</span></button><div className="cover-controls"><button className="cover-button" aria-label={paused ? "Enable decorative motion" : "Pause decorative motion"} aria-pressed={paused} onClick={onPause}>{paused ? <Play size={15} /> : <Pause size={15} />}</button><button className="cover-button" aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`} onClick={onTheme}>{theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}</button></div></div>
    <motion.a href="#about" className="profile-avatar" aria-label="Get to know Rishi" whileHover={{ rotate: -7, scale: 1.06 }} whileTap={{ scale: .95 }}><span className="avatar-grid" /><span className="avatar-monogram">r<span>.</span></span><Sparkles className="avatar-spark" size={14} /></motion.a>
    <dialog className="mobile-dialog" ref={menu} onCancel={closeMenu} aria-label="Mobile navigation"><div className="mobile-dialog-top"><span className="serif">Make yourself at home.</span><button className="icon-button" aria-label="Close navigation" onClick={closeMenu}><X size={20} /></button></div><nav>{navigation.map(({ name, icon: Icon }) => <a key={name} href={`#${name.toLowerCase()}`} onClick={closeMenu}><Icon size={18} />{name}<ArrowUpRight size={18} /></a>)}</nav></dialog>
  </header>;
}

function Introduction() {
  return <><div className="profile-identity"><motion.h1 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }}>Rishi<span className="name-spark">✳</span></motion.h1><p>Developer <span>·</span> AI enthusiast <span>·</span> Creative thinker</p></div><section id="about" className="intro-section"><Reveal><p className="hello-line">Hello, I’m Rishi <Hand size={23} className="hello-hand" /></p><h2>I turn <span>curious ideas</span> into<br className="desktop-break" /> things you can <span>actually use.</span></h2><p className="intro-description">Building things at the intersection of AI, technology and creativity. From thoughtful mobile apps to machine learning experiments, I like figuring things out—and making them feel a little more human.</p><div className="intro-meta"><span><Globe2 size={16} />India, Earth</span><span className="availability"><i />{profile.availability}</span></div><div className="intro-actions"><a href="#projects" className="pill-button primary">Explore my work<ArrowDownRight size={15} /></a><a href="#contact" className="pill-button secondary">Let’s talk<ArrowUpRight size={15} /></a>{profile.resume ? <a href={profile.resume} download className="resume-link"><Download size={14} />Résumé</a> : <span className="resume-link muted" title="Résumé coming soon"><Download size={14} />Résumé <small>soon</small></span>}</div></Reveal></section></>;
}

function LocalClock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => { const update = () => setNow(new Date()); update(); const timer = setInterval(update, 1000); return () => clearInterval(timer); }, []);
  const indiaDate = now ? new Date(now.getTime() + 330 * 60 * 1000) : null;
  const hours = indiaDate?.getUTCHours() ?? 0, minutes = indiaDate?.getUTCMinutes() ?? 0, seconds = indiaDate?.getUTCSeconds() ?? 0;
  return <div className="clock-card"><div className="analog-clock" aria-hidden="true"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" className="clock-face" />{Array.from({ length: 60 }, (_, i) => <line key={i} x1="50" y1={i % 5 === 0 ? "9" : "11"} x2="50" y2={i % 5 === 0 ? "15" : "13"} transform={`rotate(${i * 6} 50 50)`} className={i % 5 === 0 ? "clock-major" : "clock-minor"} />)}<line x1="50" y1="53" x2="50" y2="27" transform={`rotate(${(hours % 12) * 30 + minutes / 2} 50 50)`} className="hour-hand" /><line x1="50" y1="55" x2="50" y2="18" transform={`rotate(${minutes * 6 + seconds / 10} 50 50)`} className="minute-hand" /><line x1="50" y1="59" x2="50" y2="17" transform={`rotate(${seconds * 6} 50 50)`} className="second-hand" /><circle cx="50" cy="50" r="3" fill="var(--accent)" /></svg></div><div className="clock-copy"><span className="widget-caption">A LITTLE WINDOW INTO MY WORLD</span><time dateTime={now?.toISOString()}>{now ? new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }).format(now) : "--:--:--"}</time><span className="clock-location">{now ? new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", weekday: "long" }).format(now) : "Local time"} <span>·</span> India <span>↗</span></span><p><span className="tiny-dot" />{hours >= 6 && hours < 18 ? "A good day to build something." : "Ideas don’t keep office hours."}</p></div></div>;
}

const toolkit = [
  { name: "Next.js", icon: Braces, color: "#ededed", verb: "build", detail: "Thoughtful experiences for the web." },
  { name: "TypeScript", icon: Code2, color: "#7bb5f6", verb: "structure", detail: "A little more clarity in every line." },
  { name: "Flutter", icon: Smartphone, color: "#73d1ed", verb: "create", detail: "Small screens. Real-world possibilities." },
  { name: "Supabase", icon: Zap, color: "#7cdbb4", verb: "connect", detail: "The pieces behind the experience." },
  { name: "AI / ML", icon: BrainCircuit, color: "#c1a2ec", verb: "explore", detail: "Curiosity, with a little intelligence." },
  { name: "Git & GitHub", icon: Github, color: "#efb38e", verb: "iterate", detail: "Learning and improving, commit by commit." },
];

function Tools({ paused }: { paused: boolean }) {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const reduceMotion = useReducedMotion();
  useEffect(() => { if (paused || hovered || reduceMotion) return; const timer = setInterval(() => setIndex(value => (value + 1) % toolkit.length), 3500); return () => clearInterval(timer); }, [paused, hovered, reduceMotion]);
  const move = (step: number) => setIndex(value => (value + step + toolkit.length) % toolkit.length);
  return <section id="tools" className="section tools-section"><SectionHeading title="Tools I reach for" anchor="tools" /><div className="tools-playground" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocusCapture={() => setHovered(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setHovered(false); }}><div className="tool-wheel"><button className="wheel-arrow wheel-up" onClick={() => move(-1)} aria-label="Previous tool"><ChevronUp size={17} /></button><div className="tool-viewport">{toolkit.map(({ name, icon: Icon, color }, i) => { const offset = ((i - index + toolkit.length + 3) % toolkit.length) - 3; return <motion.button key={name} className={`tool-pill ${offset === 0 ? "selected" : ""}`} animate={{ y: offset * 59, scale: 1 - Math.abs(offset) * .12, opacity: Math.abs(offset) > 2 ? 0 : Math.max(.12, 1 - Math.abs(offset) * .43) }} transition={{ type: "spring", stiffness: 180, damping: 24 }} onClick={() => setIndex(i)} tabIndex={Math.abs(offset) > 1 ? -1 : 0} aria-pressed={offset === 0} style={{ zIndex: 4 - Math.abs(offset) }}><Icon size={22} style={{ color }} />{name}</motion.button>; })}</div><button className="wheel-arrow wheel-down" onClick={() => move(1)} aria-label="Next tool"><ChevronDown size={17} /></button></div><div className="tool-story"><p>I <AnimatePresence mode="wait"><motion.span key={index} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .25 }}>{toolkit[index].verb}</motion.span></AnimatePresence><br />with curiosity<span className="serif-period">.</span></p><span>{toolkit[index].detail}</span><div className="tool-pagination" aria-label="Choose a tool">{toolkit.map((tool, i) => <button key={tool.name} aria-label={`Show ${tool.name}`} aria-pressed={index === i} onClick={() => setIndex(i)} />)}</div></div></div><div className="learning-note"><Sparkles size={15} /><p>Currently exploring <strong>computer vision, practical AI,</strong> and better ways to build for the web.</p></div></section>;
}

function CurrentlyBuilding() {
  const [expanded, setExpanded] = useState(false);
  return <section id="building" className="section building-section"><SectionHeading title="On my workbench" anchor="building" /><Reveal className="building-card"><div className="building-top"><span className="work-icon"><Terminal size={20} /></span><div><span className="widget-caption">CURRENTLY BUILDING</span><h3>This little corner of the internet.</h3></div><span className="work-status"><i />In progress</span></div><p>{currentWork.description}</p><div className="building-bottom"><Tags items={currentWork.tags} /><button className="text-link" aria-expanded={expanded} aria-controls="build-notes" onClick={() => setExpanded(value => !value)}>{expanded ? "Less" : "Build notes"}<ChevronDown size={14} className={expanded ? "rotated" : ""} /></button></div><AnimatePresence>{expanded && <motion.div id="build-notes" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="build-notes"><p>A personal space for projects and experiments. The focus right now: thoughtful interactions, responsive details, and making it feel like me.</p><div className="build-stages" aria-label={`Current stage: ${currentWork.stages[currentWork.activeStage]}`}>{currentWork.stages.map((stage, index) => <span key={stage}>{index < currentWork.activeStage ? <Check size={13} /> : <i className="stage-dot" />}{stage}</span>)}</div></motion.div>}</AnimatePresence></Reveal></section>;
}

function Contact() {
  const [notice, setNotice] = useState("");
  const [copied, setCopied] = useState(false);
  const copyEmail = async () => { try { await navigator.clipboard.writeText(profile.email); setCopied(true); setNotice("Email address copied."); setTimeout(() => setCopied(false), 2500); } catch { setNotice(`You can reach me at ${profile.email}`); } };
  const channels = [{ name: "GitHub", href: profile.github ? `https://github.com/${profile.github}` : "", caption: profile.github || "Code & experiments", icon: Github }, { name: "LinkedIn", href: profile.linkedin, caption: "Let’s connect", icon: Linkedin }, { name: "Email", href: profile.email ? `mailto:${profile.email}` : "", caption: profile.email || "Start a conversation", icon: Mail }];
  return <section id="contact" className="section contact-section"><Reveal><div className="contact-card"><span className="contact-badge"><Sparkles size={12} />Good things start with a hello.</span><div className="contact-spark spark-a">✦</div><div className="contact-spark spark-b">✦</div><div className="contact-spark spark-c">✧</div><div className="contact-spark spark-d">✧</div>{profile.email ? <a className="contact-title" href={`mailto:${profile.email}`}>Let’s make<br /><em>something.</em><ArrowUpRight size={38} /></a> : <button className="contact-title" onClick={() => setNotice("My contact details will be shared here soon. Thanks for stopping by!")}>Let’s make<br /><em>something.</em><ArrowUpRight size={38} /></button>}<p>A project, a possibility, or a wonderfully strange idea.<br />I’d love to hear what you have in mind.</p><span className="contact-availability"><i />Open to conversations</span></div><div className="contact-channels">{channels.map(({ name, href, caption, icon: Icon }) => { const content = <><span className="channel-icon"><Icon size={19} /></span><span><strong>{name}</strong><small>{href ? caption : "Details coming soon"}</small></span><ArrowUpRight size={15} /></>; return href ? <a key={name} href={href} target={name === "Email" ? undefined : "_blank"} rel={name === "Email" ? undefined : "noopener noreferrer"} className="contact-channel" aria-label={`${name}${name === "Email" ? "" : " (opens in new tab)"}`}>{content}</a> : <button key={name} className="contact-channel" onClick={() => setNotice(`${name} details will be shared here soon.`)}>{content}</button>; })}</div>{profile.email && <button className="copy-email" onClick={copyEmail}>{copied ? <Check size={13} /> : <Copy size={13} />}{copied ? "Copied" : "Copy email address"}</button>}<p className="contact-notice" role="status">{notice}</p></Reveal></section>;
}

function Footer() {
  return <footer className="site-footer"><div><a href="#home" className="footer-wordmark">rishi<span>✳</span></a><span>Made with curiosity. © {new Date().getFullYear()} Rishi.</span></div><a href="#home" className="back-to-top">Back to top<ArrowUp size={14} /></a><div className="footer-note"><span>Based in India. Building for everywhere.</span><Heart size={11} /></div></footer>;
}

export function Portfolio() {
  const [theme, setTheme] = useState("dark");
  const [paused, setPaused] = useState(false);
  const frame = useRef<HTMLDivElement>(null);
  return <MotionConfig reducedMotion={paused ? "always" : "user"}><div ref={frame} className="portfolio-world" data-theme={theme} data-paused={paused} onPointerMove={event => { frame.current?.style.setProperty("--pointer-x", `${event.clientX}px`); frame.current?.style.setProperty("--pointer-y", `${event.clientY}px`); }}><a className="skip-link" href="#main">Skip to content</a><div className="page-gutters" aria-hidden="true"><div /><div /></div><div className="portfolio-frame"><Header theme={theme} onTheme={() => setTheme(value => value === "dark" ? "light" : "dark")} paused={paused} onPause={() => setPaused(value => !value)} /><main id="main" className="page-content"><Introduction /><Reveal className="personal-widgets"><DiscordStatus /><LocalClock /></Reveal><Tools paused={paused} /><Projects /><CurrentlyBuilding /><ActivitySection /><Contact /><Footer /></main><a href="#about" className="edge-label" aria-label="Scroll to about">A WORK IN PROGRESS<ArrowDown size={12} /></a></div></div></MotionConfig>;
}
