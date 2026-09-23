import type { Metadata } from "next";

export const siteUrl = "https://fileredge.pk";
export const siteName = "Fileredge";

export const pageSeo = {
  home: { title: "Tax Filing & Business Registration in Pakistan", description: "File your income tax return in Pakistan with Fileredge. Explore NTN, sales tax and company registration, accounting support, and our salary tax calculator." },
  services: { title: "Tax & Business Registration Services in Pakistan", description: "Explore 42 Fileredge services in Pakistan, including NTN, income tax, sales tax, company registration and trademarks. View fees, timelines and requirements." },
  blog: { title: "Business Guides & Insights Blog", description: "Read practical Fileredge guides on organising business documents, recordkeeping and preparing for consultations. Find clear ideas for your next business step." },
  team: { title: "Our Team | Tax, Accounting & Audit Professionals", description: "Meet Fileredge partners Muhammad Junaid and Anees Saleem. Explore their taxation, accounting and audit expertise, our team, and photos from our gallery." },
};

export function absoluteUrl(path: string) {
  return new URL(path, `${siteUrl}/`).toString();
}

export function socialImageUrl(title: string, category = "Tax. Accounting. Business.") {
  return absoluteUrl(`/og?${new URLSearchParams({ title, category })}`);
}

export function createPageMetadata({ title, description, path, article = false }: { title: string; description: string; path: string; article?: boolean }): Metadata {
  const fullTitle = `${title} | ${siteName}`;
  const image = { url: socialImageUrl(title, article ? "The Fileredge Journal" : undefined), width: 1200, height: 630, alt: fullTitle };
  return {
    title: { absolute: fullTitle },
    description,
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
      index: process.env.VERCEL_ENV !== "preview",
      follow: true,
      googleBot: { index: process.env.VERCEL_ENV !== "preview", follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, item: absoluteUrl(item.path) })),
  };
}
