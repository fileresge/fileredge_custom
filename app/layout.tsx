import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "../components/site-header";
import StructuredData from "../components/structured-data";
import { absoluteUrl, createPageMetadata, pageSeo, siteName, siteUrl } from "../lib/seo";

export const metadata: Metadata = {
  ...createPageMetadata({ ...pageSeo.home, path: "/" }),
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  formatDetection: { telephone: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className="h-full scroll-smooth antialiased"
    >
      <body className="flex min-h-full flex-col bg-white font-sans leading-[normal] text-ink">
        <StructuredData data={{ "@context": "https://schema.org", "@graph": [
          { "@type": "Organization", "@id": absoluteUrl("/#organization"), name: siteName, url: absoluteUrl("/"), logo: absoluteUrl("/header-logo.png"), telephone: "+923362137034", areaServed: { "@type": "Country", name: "Pakistan" }, contactPoint: { "@type": "ContactPoint", telephone: "+923362137034", contactType: "customer service", availableLanguage: ["English", "Urdu"] } },
          { "@type": "WebSite", "@id": absoluteUrl("/#website"), name: siteName, url: absoluteUrl("/"), inLanguage: "en-PK", publisher: { "@id": absoluteUrl("/#organization") } },
        ] }} />
        <SiteHeader />{children}
      </body>
    </html>
  );
}
