import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  ChevronDown,
  Download,
  Landmark,
  LockKeyhole,
  Menu,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Star,
  UserRoundCheck,
  Zap,
  type LucideIcon,
} from "lucide-react";

const benefits: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: LockKeyhole, title: "Secure & Encrypted", text: "Your data is 100% safe with bank-level security" },
  { icon: UserRoundCheck, title: "Expert Consultants", text: "Certified professionals at your service" },
  { icon: Zap, title: "Fast Turnaround", text: "Quick processing & maximum refund" },
  { icon: BadgeCheck, title: "FBR Compliant", text: "100% compliant with FBR regulations" },
  { icon: Landmark, title: "RAAST Secure Payment", text: "Fast, safe and reliable payments via RAAST" },
];

function Chevron() {
  return <ChevronDown className="chevron" size={14} strokeWidth={2.5} aria-hidden="true" />;
}

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Fileredge home">
          <span className="brand-mark">F</span><span>Fileredge</span>
        </a>
        <nav className="primary-nav" aria-label="Primary navigation">
          <a href="#services">Tax Tools <Chevron /></a><a href="#services">Business Services <Chevron /></a>
          <a href="#sales-tax">Sales Tax</a><a href="#resources">Resources <Chevron /></a><a href="#usa">USA Services</a>
        </nav>
        <div className="header-actions">
          <div className="language-switch" aria-label="Language selection"><button className="selected">English</button><button>اردو</button></div>
          <a className="sign-in" href="#signin">Sign In</a><a className="file-return header-cta" href="#file">File Tax Return</a>
        </div>
        <button className="menu-button" aria-label="Open menu"><Menu /></button>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="season-badge">Tax Season 2026 is Here! <Sparkles size={16} aria-hidden="true" /></p>
          <h1>Pakistan&apos;s easiest way to<br />file your <span>tax return</span></h1>
          <p className="hero-description">File accurately, stay compliant and get the maximum refund with help from expert tax consultants. Fast, secure &amp; hassle-free.</p>
          <div className="hero-buttons"><a className="file-return primary-button" href="#file">Start Filing Now <ArrowRight size={19} strokeWidth={2.6} aria-hidden="true" /></a><a className="whatsapp-button" href="#whatsapp"><MessageCircle aria-hidden="true" /> Chat on WhatsApp</a></div>
          <div className="stats" aria-label="Fileredge statistics">
            <div className="stat"><span className="stat-icon download"><Download aria-hidden="true" /></span><p><strong>1M+</strong><small>Downloads</small></p></div>
            <div className="stat"><span className="stat-icon star"><Star aria-hidden="true" fill="currentColor" /></span><p><strong>5/5</strong><small>Average Rating</small></p></div>
            <div className="stat"><span className="stat-icon shield"><ShieldCheck aria-hidden="true" /></span><p><strong>Trusted by</strong><small>taxpayers across Pakistan</small></p></div>
          </div>
        </div>
        <div className="hero-art" aria-label="Fileredge tax dashboard and filing tools">
          <Image src="/images/banner-image.png" alt="Tax filing dashboard, calculator, FBR compliance shield and plants" width={1218} height={730} priority sizes="(max-width: 850px) 100vw, 55vw" />
        </div>
      </section>

      <section className="benefit-wrap" aria-label="Why choose Fileredge"><div className="benefit-grid">
        {benefits.map((benefit) => { const Icon = benefit.icon; return <article className="benefit" key={benefit.title}><span className="benefit-icon"><Icon size={21} strokeWidth={2.4} aria-hidden="true" /></span><div><h2>{benefit.title}</h2><p>{benefit.text}</p></div></article>; })}
      </div></section>
      <button className="chat-float" aria-label="Open support chat"><MessageCircle size={27} fill="var(--navy)" color="#fff" /></button>
    </main>
  );
}
