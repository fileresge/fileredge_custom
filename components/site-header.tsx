"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, BookOpen, ChevronDown, Menu, UsersRound, X } from "lucide-react";
import headerLogo from "../public/header-logo.png";
import { serviceCategories, serviceCategoryUrl } from "../lib/business-services";
import ServiceIcon from "./service-icon";

const navClass = "inline-flex items-center gap-1 rounded-lg px-3 py-3 text-sm font-bold transition-colors hover:bg-[#fff4ed] hover:text-brand-orange-dark focus-visible:outline-2 focus-visible:outline-brand-orange";

const resourceLinks = [
  { href: "/blog", label: "Blog", icon: BookOpen },
  { href: "/our-team", label: "Our Team", icon: UsersRound },
];

export default function SiteHeader() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const servicesButton = useRef<HTMLButtonElement>(null);
  const resourcesButton = useRef<HTMLButtonElement>(null);
  const mobileButton = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  function closeMenus() {
    setServicesOpen(false);
    setResourcesOpen(false);
    setMobileOpen(false);
  }

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      if (!headerRef.current?.contains(event.target as Node)) {
        setServicesOpen(false);
        setResourcesOpen(false);
        setMobileOpen(false);
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  return (
    <header
      ref={headerRef}
      className="relative z-40 border-b border-[#eeeef0] bg-white shadow-[0_2px_9px_rgb(8_19_44/7%)]"
      onMouseLeave={() => { setServicesOpen(false); setResourcesOpen(false); }}
      onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) closeMenus(); }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          if (mobileOpen) mobileButton.current?.focus();
          else if (resourcesOpen) resourcesButton.current?.focus();
          else servicesButton.current?.focus();
          closeMenus();
        }
      }}
    >
      <div className="flex h-[62px] items-center gap-4 px-5 sm:h-[72px] sm:px-[clamp(24px,3.7vw,52px)] lg:gap-6">
        <Link href="/" aria-label="Fileredge home" onClick={closeMenus} className="inline-flex shrink-0">
          <Image src={headerLogo} alt="Fileredge" className="h-auto w-[140px] sm:w-[160px] lg:w-[180px]" sizes="(max-width: 600px) 140px, (max-width: 1140px) 160px, 180px" loading="eager" />
        </Link>
        <nav className="hidden h-full flex-1 items-center justify-center gap-1 whitespace-nowrap xl:flex" aria-label="Primary navigation">
          <Link href="/#tax-calculator" className={navClass} onMouseEnter={() => { setServicesOpen(false); setResourcesOpen(false); }}>Tax Tools <ChevronDown size={14} aria-hidden="true" /></Link>
          <button
            ref={servicesButton}
            type="button"
            aria-expanded={servicesOpen}
            aria-controls="business-services-menu"
            className={`${navClass} cursor-pointer ${servicesOpen || pathname.startsWith("/business-services") ? "bg-[#fff4ed] text-brand-orange-dark" : "text-[#292a2f]"}`}
            onMouseEnter={() => { setServicesOpen(true); setResourcesOpen(false); }}
            onClick={() => { setServicesOpen(!servicesOpen); setResourcesOpen(false); }}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown") {
                event.preventDefault();
                setServicesOpen(true);
                setResourcesOpen(false);
                requestAnimationFrame(() => document.querySelector<HTMLAnchorElement>("#business-services-menu a")?.focus());
              }
            }}
          >Business Services <ChevronDown size={14} className={`transition-transform ${servicesOpen ? "rotate-180" : ""}`} aria-hidden="true" /></button>
          <Link href={serviceCategoryUrl("sales-tax")} className={navClass} onClick={closeMenus} onMouseEnter={() => { setServicesOpen(false); setResourcesOpen(false); }}>Sales Tax</Link>
          <div className="relative flex h-full items-center" onMouseEnter={() => { setResourcesOpen(true); setServicesOpen(false); }} onMouseLeave={() => setResourcesOpen(false)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setResourcesOpen(false); }}>
            <button
              ref={resourcesButton}
              type="button"
              aria-expanded={resourcesOpen}
              aria-controls="resources-menu"
              className={`${navClass} cursor-pointer ${resourcesOpen || resourceLinks.some((item) => pathname.startsWith(item.href)) ? "bg-[#fff4ed] text-brand-orange-dark" : ""}`}
              onClick={() => { setResourcesOpen(!resourcesOpen); setServicesOpen(false); }}
              onKeyDown={(event) => {
                if (event.key === "ArrowDown") {
                  event.preventDefault();
                  setResourcesOpen(true);
                  setServicesOpen(false);
                  requestAnimationFrame(() => document.querySelector<HTMLAnchorElement>("#resources-menu a")?.focus());
                }
              }}
            >Resources <ChevronDown size={14} className={`transition-transform ${resourcesOpen ? "rotate-180" : ""}`} aria-hidden="true" /></button>
            <div id="resources-menu" hidden={!resourcesOpen} className="absolute top-full -left-5 w-[260px] pt-2">
              <nav aria-label="Resources" className="relative rounded-2xl border border-[#e8e8ed] bg-white p-3 shadow-[0_10px_30px_rgb(7_28_61/12%)]">
                <span aria-hidden="true" className="absolute -top-[7px] left-16 size-3 rotate-45 border-t border-l border-[#e8e8ed] bg-white" />
                {resourceLinks.map(({ href, label, icon: Icon }) => <Link key={href} href={href} onClick={closeMenus} aria-current={pathname.startsWith(href) ? "page" : undefined} className="flex items-center gap-4 rounded-xl px-4 py-4 text-base font-semibold text-navy transition-colors hover:bg-[#fff4ed] hover:text-brand-orange-dark focus-visible:outline-2 focus-visible:outline-brand-orange"><Icon size={27} strokeWidth={1.6} aria-hidden="true" />{label}</Link>)}
              </nav>
            </div>
          </div>
        </nav>
        <div className="hidden items-center gap-3 whitespace-nowrap xl:flex">
          <div className="flex gap-0.5 rounded-lg border border-[#dedee2] p-[3px]" aria-label="Language selection">
            <button className="rounded-[5px] bg-brand-orange px-[9px] py-[7px] text-[13px] font-bold text-white">English</button>
            <button className="rounded-[5px] px-[9px] py-[7px] text-[13px] font-bold text-[#4b4c50]" lang="ur">اردو</button>
          </div>
          <Link href="/#signin" className="rounded-lg border border-[#dedee2] px-4 py-2.5 text-sm font-bold">Sign In</Link>
          <Link href={serviceCategoryUrl("income-tax")} onClick={closeMenus} className="rounded-lg bg-brand-orange px-4 py-3 text-sm font-extrabold text-white shadow-[0_7px_13px_rgb(255_106_25/18%)] transition-colors hover:bg-brand-orange-dark">File Tax Return</Link>
        </div>
        <button ref={mobileButton} type="button" aria-label={mobileOpen ? "Close menu" : "Open menu"} aria-expanded={mobileOpen} aria-controls="mobile-navigation" className="ml-auto rounded-lg p-2 text-navy focus-visible:outline-2 focus-visible:outline-brand-orange xl:hidden" onClick={() => { setMobileOpen(!mobileOpen); setServicesOpen(false); setResourcesOpen(false); }}>
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      <div id="business-services-menu" hidden={!servicesOpen} className="absolute top-full right-0 left-0 hidden border-t border-[#ededf0] bg-white shadow-[0_18px_28px_rgb(7_28_61/10%)] xl:block">
        <nav aria-label="Business services" className="mx-auto grid max-w-[1800px] grid-cols-6 gap-4 px-8 py-7">
          {serviceCategories.map((category) => <Link key={category.id} href={serviceCategoryUrl(category.id)} onClick={closeMenus} className="group rounded-xl p-4 transition-colors hover:bg-[#fff7f1] focus-visible:outline-2 focus-visible:outline-brand-orange">
            <span className="mb-3 grid size-12 place-items-center rounded-xl bg-[#fff0e7] text-brand-orange-dark"><ServiceIcon category={category.id} /></span>
            <span className="block text-[15px] font-extrabold text-navy group-hover:text-brand-orange-dark">{category.title}</span>
            <span className="mt-2 block text-[13px] leading-relaxed text-[#777b85]">{category.description}</span>
          </Link>)}
          <Link href="/business-services" onClick={closeMenus} className="rounded-2xl border border-dashed border-brand-orange/40 bg-[#fffaf7] p-4 transition-colors hover:bg-[#fff0e7] focus-visible:outline-2 focus-visible:outline-brand-orange">
            <span className="mb-3 grid size-12 place-items-center rounded-xl bg-[#ffeadc] text-brand-orange-dark"><ArrowRight /></span>
            <span className="block text-[15px] font-extrabold text-brand-orange-dark">View All Services</span>
            <span className="mt-2 block text-[13px] leading-relaxed text-[#777b85]">Explore our full range of tax and business solutions.</span>
          </Link>
        </nav>
      </div>

      {mobileOpen && <nav id="mobile-navigation" aria-label="Mobile navigation" className="absolute top-full right-0 left-0 max-h-[calc(100dvh-72px)] overflow-y-auto border-t border-[#eeeef0] bg-white p-5 shadow-xl xl:hidden">
        <Link href="/#tax-calculator" onClick={closeMenus} className="block rounded-lg p-3 font-bold text-navy">Tax Tools</Link>
        <button type="button" aria-expanded={servicesOpen} aria-controls="mobile-services" onClick={() => { setServicesOpen(!servicesOpen); setResourcesOpen(false); }} className="flex w-full items-center justify-between rounded-lg bg-[#fff4ed] p-3 font-bold text-brand-orange-dark">Business Services <ChevronDown size={18} className={servicesOpen ? "rotate-180" : ""} /></button>
        {servicesOpen && <div id="mobile-services" className="grid gap-1 py-2 pl-3">
          {serviceCategories.map((category) => <Link key={category.id} href={serviceCategoryUrl(category.id)} onClick={closeMenus} className="flex items-center gap-3 rounded-lg p-3 text-sm text-navy hover:bg-[#fff4ed]"><ServiceIcon category={category.id} className="size-5 text-brand-orange" />{category.title}</Link>)}
          <Link href="/business-services" onClick={closeMenus} className="p-3 text-sm font-bold text-brand-orange-dark">View All Services →</Link>
        </div>}
        <Link href={serviceCategoryUrl("sales-tax")} onClick={closeMenus} className="block rounded-lg p-3 font-bold text-navy">Sales Tax</Link>
        <button type="button" aria-expanded={resourcesOpen} aria-controls="mobile-resources" onClick={() => { setResourcesOpen(!resourcesOpen); setServicesOpen(false); }} className="flex w-full items-center justify-between rounded-lg p-3 font-bold text-navy">Resources <ChevronDown size={18} className={resourcesOpen ? "rotate-180" : ""} aria-hidden="true" /></button>
        {resourcesOpen && <div id="mobile-resources" className="grid gap-1 py-2 pl-3">{resourceLinks.map(({ href, label, icon: Icon }) => <Link key={href} href={href} onClick={closeMenus} className="flex items-center gap-3 rounded-lg p-3 text-sm text-navy hover:bg-[#fff4ed]"><Icon size={20} className="text-brand-orange" aria-hidden="true" />{label}</Link>)}</div>}
        <Link href={serviceCategoryUrl("income-tax")} onClick={closeMenus} className="mt-3 block rounded-lg bg-brand-orange p-3 text-center font-bold text-white">File Tax Return</Link>
      </nav>}
    </header>
  );
}
