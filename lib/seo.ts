import type { Metadata } from "next";

export const siteUrl = "https://fileredge.pk";
export const siteName = "Fileredge";

export const pageSeo = {
  home: { title: "Tax Filing & NTN Registration in Pakistan", description: "File your income tax return in Pakistan with Fileredge. Get help with NTN, sales tax, company registration and accounting, or use our salary tax calculator.", keywords: ["tax filing Pakistan", "income tax return Pakistan", "NTN registration", "tax consultants Pakistan"] },
  services: { title: "Tax & Business Registration Services", description: "Explore Fileredge's NTN, income tax, sales tax, company registration and accounting services in Pakistan. Compare fees, timelines and document requirements.", keywords: ["business registration Pakistan", "NTN registration", "sales tax registration", "company registration Pakistan", "accounting services"] },
  blog: { title: "Business Guides & Insights Blog", description: "Read practical Fileredge guides on organising business documents, recordkeeping and preparing for consultations. Find clear ideas for your next business step.", keywords: ["business guides Pakistan", "business recordkeeping", "consultation preparation", "Fileredge Journal"] },
  team: { title: "Our Tax, Accounting & Audit Team", description: "Meet Fileredge partners Muhammad Junaid and Anees Saleem. Explore their taxation, accounting and audit expertise, our team, and photos from our gallery.", keywords: ["Fileredge team", "tax consultants Pakistan", "accounting professionals", "audit consultants"] },
  tools: { title: "Pakistan Tax Tools & Salary Calculator", description: "Explore Fileredge's Pakistan salary tax calculator, find answers to common questions, and contact our team for help with tax filing and business services.", keywords: ["Pakistan tax tools", "salary tax calculator", "income tax calculator Pakistan"] },
  calculator: { title: "Salary Tax Calculator Pakistan 2010–2026", description: "Calculate estimated salary income tax and take-home pay in Pakistan. Compare monthly and annual results for tax years 2010–2026 with Fileredge's free tool.", keywords: ["salary tax calculator Pakistan", "income tax calculator 2026", "take home salary Pakistan", "monthly salary tax"] },
  faqs: { title: "Salary Calculator & Tax Filing FAQs", description: "Find answers about Fileredge's salary tax calculator, supported tax years and filing services. Learn how to use our tools and contact the team for support.", keywords: ["salary calculator FAQs", "tax filing questions Pakistan", "Fileredge help"] },
  contact: { title: "Contact Our Tax Consultants in Karachi", description: "Visit Fileredge at Sea Breeze Plaza, Shahra-e-Faisal, Karachi. Get tax filing, accounting and business support by email, WhatsApp or our contact form.", keywords: ["contact Fileredge", "tax consultants Karachi", "tax filing support Pakistan", "Sea Breeze Plaza Fileredge"] },
};

export function absoluteUrl(path: string) {
  return new URL(path, `${siteUrl}/`).toString();
}

export function socialImageUrl(title: string, category = "Tax. Accounting. Business.") {
  return absoluteUrl(`/og?${new URLSearchParams({ title, category })}`);
}

export function createPageMetadata({ title, description, path, article = false, keywords = ["Fileredge", "business support Pakistan"], noIndex = false }: { title: string; description: string; path: string; article?: boolean; keywords?: string[]; noIndex?: boolean }): Metadata {
  const fullTitle = `${title} | ${siteName}`;
  const image = { url: socialImageUrl(title, article ? "The Fileredge Journal" : undefined), width: 1200, height: 630, alt: fullTitle };
  return {
    title: { absolute: fullTitle },
    description,
    keywords,
    authors: [{ name: siteName, url: siteUrl }],
    creator: siteName,
    publisher: siteName,
    category: article ? "Business guides" : "Tax and business services",
    icons: { icon: "/favicon.ico", shortcut: "/favicon.ico" },
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      title: fullTitle,
      description,
      url: absoluteUrl(path),
      siteName,
      locale: "en_PK",
      type: article ? "article" : "website",
      images: [image],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [image] },
    robots: {
      index: !noIndex && process.env.VERCEL_ENV !== "preview",
      follow: true,
      googleBot: { index: !noIndex && process.env.VERCEL_ENV !== "preview", follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    },
  };
}

export function webPageSchema({ title, description, path, type = "WebPage" }: { title: string; description: string; path: string; type?: "WebPage" | "ContactPage" | "CollectionPage" | "FAQPage" }) {
  return { "@context": "https://schema.org", "@type": type, "@id": absoluteUrl(`${path}#webpage`), name: title, description, url: absoluteUrl(path), inLanguage: "en-PK", isPartOf: { "@id": absoluteUrl("/#website") }, publisher: { "@id": absoluteUrl("/#organization") } };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, item: absoluteUrl(item.path) })),
  };
}
