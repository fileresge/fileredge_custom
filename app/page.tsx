import Image from "next/image";
import {
  ArrowRight,
  ChevronDown,
  Download,
  Menu,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import headerLogo from "../public/header-logo.png";
import FilingOverview from "./filing-overview";
import PricingPlans from "./pricing-plans";
import TaxCalculator from "./tax-calculator";

const benefits = [
  { icon: "/svg/encryption.svg", title: "Secure & Encrypted", text: "Your data is 100% safe with bank-level security" },
  { icon: "/svg/expert-consultant.svg", title: "Expert Consultants", text: "Certified professionals at your service" },
  { icon: "/svg/fast-turnaround.svg", title: "Fast Turnaround", text: "Quick processing & maximum refund" },
  { icon: "/svg/fbr-complaint.svg", title: "FBR Compliant", text: "100% compliant with FBR regulations" },
  { icon: "/svg/raast.svg", title: "RAAST Secure Payment", text: "Fast, safe and reliable payments via RAAST" },
];

const navigation = [
  { label: "Tax Tools", href: "#tax-calculator", dropdown: true },
  { label: "Business Services", href: "#services", dropdown: true },
  { label: "Sales Tax", href: "#sales-tax", dropdown: false },
  { label: "Resources", href: "#resources", dropdown: true },
];

const statistics = [
  { icon: Download, value: "1M+", label: "Downloads", iconClass: "w-[31px] rounded-[10px] bg-[#ffe1dc] text-brand-orange sm:w-12", glyphClass: "size-[25px]" },
  { icon: Star, value: "5/5", label: "Average Rating", iconClass: "w-7 text-[#ffba09] sm:w-10", glyphClass: "size-[30px] fill-current" },
  { icon: ShieldCheck, value: "Trusted by", label: "taxpayers across Pakistan", iconClass: "w-7 text-brand-orange sm:w-10", glyphClass: "size-[30px]" },
];

const filingButton = "inline-flex items-center justify-center rounded-[7px] bg-brand-orange font-extrabold text-white shadow-[0_7px_13px_rgb(255_106_25/18%)] transition-[background,transform] duration-200 hover:-translate-y-px hover:bg-brand-orange-dark";

export default function Home() {
  return (
    <main>
      <header className="relative z-20 flex h-[62px] items-center gap-[17px] border-b border-[#eeeef0] bg-white px-5 shadow-[0_2px_9px_rgb(8_19_44/7%)] sm:h-[72px] sm:px-[clamp(24px,3.7vw,52px)] lg:gap-7">
        <a className="inline-flex shrink-0 items-center" href="#top" aria-label="Fileredge home">
          <Image
            src={headerLogo}
            alt="Fileredge"
            className="h-auto w-[140px] sm:w-[160px] lg:w-[180px]"
            sizes="(max-width: 600px) 140px, (max-width: 1140px) 160px, 180px"
            loading="eager"
          />
        </a>
        <nav className="hidden flex-1 items-center justify-center gap-[clamp(16px,2.1vw,31px)] whitespace-nowrap xl:flex" aria-label="Primary navigation">
          {navigation.map((item) => (
            <a key={item.label} href={item.href} className="inline-flex items-center gap-[3px] text-xs font-bold text-[#292a2f] transition-colors duration-200 hover:text-brand-orange lg:text-sm">
              {item.label}
              {item.dropdown && <ChevronDown className="text-[#777]" size={14} strokeWidth={2.5} aria-hidden="true" />}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 whitespace-nowrap xl:flex">
          <div className="flex gap-0.5 rounded-lg border border-[#dedee2] p-[3px]" aria-label="Language selection">
            <button className="cursor-pointer rounded-[5px] bg-brand-orange px-[9px] py-[7px] text-[13px] font-bold text-white">English</button>
            <button className="cursor-pointer rounded-[5px] px-[9px] py-[7px] text-[13px] font-bold text-[#4b4c50]" lang="ur">اردو</button>
          </div>
          <a className="rounded-[7px] border border-[#dedee2] p-2.5 text-sm font-bold text-[#292a2f] lg:px-4" href="#signin">Sign In</a>
          <a className={`${filingButton} p-2.5 text-sm lg:px-4 lg:py-[11px]`} href="#file">File Tax Return</a>
        </div>
        <button className="ml-auto block text-navy xl:hidden" aria-label="Open menu"><Menu /></button>
      </header>

      <section className="relative flex min-h-[660px] flex-col overflow-hidden bg-[radial-gradient(circle_at_94%_17%,#fff2eb_0%,#fff9f6_23%,#fff8f5_48%,#fff_76%)] px-[22px] pt-[25px] sm:min-h-[610px] sm:px-[clamp(32px,3.7vw,52px)] sm:pt-[34px] md:min-h-[417px] md:flex-row md:pt-[23px] md:pb-[15px]" id="top">
        <div className="relative z-10 w-full md:w-[53%]">
          <p className="mb-[17px] inline-flex items-center gap-1.5 rounded-full bg-[#fff0eb] px-4 py-2 text-xs font-extrabold text-brand-orange-dark sm:mb-[18px] sm:text-sm">
            Tax Season 2026 is Here! <Sparkles size={16} aria-hidden="true" />
          </p>
          <h1 className="max-w-[600px] text-[37px] leading-[1.08] font-[850] tracking-[-1.5px] text-[#18191e] sm:text-[clamp(38px,3vw,48px)] sm:tracking-[-1.8px]">
            Your taxes.<br /><span className="text-brand-orange">Our expertise.</span>
          </h1>
          <p className="mt-[17px] mb-[22px] max-w-[580px] text-sm leading-[1.55] text-[#6c6d72] sm:mt-[21px] sm:mb-7 sm:text-base sm:leading-[1.65]">
            Move forward with confidence. Fileredge helps you prepare and file your Pakistan tax return, with personal guidance from your first document to final submission.
          </p>
          <div className="flex flex-wrap items-center gap-[9px] sm:gap-4">
            <a className={`${filingButton} gap-[13px] px-3 py-[13px] text-xs sm:px-[22px] sm:py-3.5 sm:text-[15px]`} href="#file">
              Start Filing Now <ArrowRight className="shrink-0" size={19} strokeWidth={2.6} aria-hidden="true" />
            </a>
            <a className="inline-flex min-h-[47px] items-center gap-1.5 rounded-[7px] border border-[#dcdee3] bg-white px-3 py-[13px] text-xs font-bold text-[#404147] sm:gap-2.5 sm:px-[21px] sm:py-0 sm:text-[15px]" href="#whatsapp">
              <Image src="/svg/whatsapp.svg" alt="" width={21} height={21} className="size-[21px] shrink-0" unoptimized />
              Chat on WhatsApp
            </a>
          </div>
          <div className="mt-[22px] flex flex-wrap gap-[13px] sm:mt-6 sm:gap-[clamp(22px,3vw,45px)]" aria-label="Fileredge statistics">
            {statistics.map(({ icon: Icon, value, label, iconClass, glyphClass }) => (
              <div key={label} className="flex items-center gap-[5px] sm:gap-2.5">
                <span className={`grid h-[34px] shrink-0 place-items-center sm:h-12 ${iconClass}`}><Icon className={glyphClass} aria-hidden="true" /></span>
                <p className="grid gap-px">
                  <strong className="text-[13px] leading-[18px] text-[#27272b] sm:text-base">{value}</strong>
                  <small className="max-w-[70px] text-[10px] text-[#8a8a8e] sm:max-w-none sm:text-[13px] sm:whitespace-nowrap">{label}</small>
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="pointer-events-none relative -left-[10%] mt-auto h-[270px] w-[120%] shrink-0 sm:left-auto sm:mx-auto sm:h-[300px] sm:w-[90%] md:absolute md:right-[-8%] md:bottom-[-18px] md:m-0 md:h-[404px] md:w-[55%] lg:right-[-1.1%]" aria-label="Fileredge tax dashboard and filing tools">
          <Image src="/images/banner-image.png" alt="Tax filing dashboard, calculator, FBR compliance shield and plants" width={1218} height={730} loading="eager" fetchPriority="high" sizes="(max-width: 600px) 120vw, (max-width: 900px) 90vw, 55vw" className="size-full object-contain object-center" />
        </div>
      </section>

      <section className="bg-[linear-gradient(110deg,#fff_0%,#fff8f5_76%,#fff_100%)] px-[15px] pt-6 pb-5 sm:px-[clamp(32px,3.7vw,52px)]" aria-label="Why choose Fileredge">
        <div className="mx-auto grid max-w-[1288px] grid-cols-1 overflow-hidden rounded-[13px] border border-[#dedee2] bg-white shadow-[0_8px_17px_rgb(10_25_48/7%)] sm:grid-cols-3 md:grid-cols-5">
          {benefits.map((benefit) => (
            <article className="flex min-h-[68px] items-center gap-[13px] border-b border-[#e8e8eb] px-4 py-3 last:border-0 sm:min-h-[84px] sm:gap-[9px] sm:border-r sm:px-2.5 sm:py-3.5 sm:[&:nth-child(3)]:border-r-0 sm:[&:nth-child(4)]:border-b-0 md:border-b-0 md:[&:nth-child(3)]:border-r lg:gap-[13px] lg:px-4 lg:py-[15px]" key={benefit.title}>
              <Image src={benefit.icon} alt="" width={40} height={40} className="size-10 shrink-0 object-contain" unoptimized />
              <div className="min-w-0">
                <h2 className="mb-[3px] text-[13px] font-extrabold text-[#24252a] sm:text-[11.5px] lg:text-[13px]">{benefit.title}</h2>
                <p className="text-xs leading-[1.28] text-[#85858a] sm:text-[11.5px] lg:text-[12.5px]">{benefit.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <FilingOverview />
      <PricingPlans />
      <TaxCalculator />
      <button className="fixed right-4 bottom-4 z-30 grid size-[52px] place-items-center rounded-full bg-navy shadow-[0_5px_16px_rgb(7_28_61/27%)] sm:right-[30px] sm:size-[58px]" aria-label="Open support chat">
        <MessageCircle size={27} className="fill-navy text-white" />
      </button>
    </main>
  );
}
