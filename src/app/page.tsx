import { DownloadCTA } from "@/components/sections/DownloadCTA";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { ReadyToRide } from "@/components/sections/ReadyToRide";
import { Testimonials } from "@/components/sections/Testimonials";
import { testimonials } from "@/lib/content";

const ratingSum = testimonials.reduce((s, t) => s + t.rating, 0);
const ratingAvg = (ratingSum / testimonials.length).toFixed(1);

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  name: "RideEasy",
  applicationCategory: "TravelApplication",
  operatingSystem: "iOS, Android",
  description:
    "RideEasy is the friendly ride-hailing app for everyday trips. Track your driver in real time, pay securely, and choose from ride options that fit your day.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: ratingAvg,
    bestRating: "5",
    reviewCount: String(testimonials.length),
  },
  review: testimonials.map((t) => ({
    "@type": "Review",
    reviewBody: t.quote,
    reviewRating: {
      "@type": "Rating",
      ratingValue: String(t.rating),
      bestRating: "5",
    },
    author: {
      "@type": "Person",
      name: t.name,
      jobTitle: t.role,
    },
  })),
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main id="main">
        <Hero />
        <HowItWorks />
        <ReadyToRide />
        <Testimonials />
        <DownloadCTA />
      </main>
      <Footer />
    </>
  );
}
