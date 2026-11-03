import { Banner } from "@/components/banner";
import { CtaBanner } from "@/components/cta-banner";

import { Testimonials } from "@/components/testimonials";
import { WhyChoose } from "@/components/why-choose";

export default function Home() {
  return (
    <>
      
      <main className="flex-1">
        <Banner />
        <WhyChoose />
        <Testimonials />
        <CtaBanner />
      </main>
      
    </>
  );
}
