import { Banner } from "@/components/banner";
import { CtaBanner } from "@/components/cta-banner";
import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";
import { Testimonials } from "@/components/testimonials";
import { WhyChoose } from "@/components/why-choose";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Banner />
        <WhyChoose />
        <Testimonials />
        <CtaBanner />
      </main>
      <SiteFooter />
    </>
  );
}
