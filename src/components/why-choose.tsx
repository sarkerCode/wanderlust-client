import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    title: "Safe & Secure",
    icon: "/images/ShieldCheck.png",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    title: "Expert Guides",
    icon: "/images/MapTrifold.png",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    title: "24/7 Support",
    icon: "/images/Headset.png",
    description:
      "Round-the-clock customer service to assist you where your journey takes you.",
  },
];

export function WhyChoose() {
  return (
    <section id="features" className="w-full bg-[#edf8fa] py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-10">
        <h2 className="text-center text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[44px] lg:leading-tight">
          Why Choose Wanderlust
        </h2>
        <p className="mt-3 text-center text-sm text-muted-foreground sm:text-[15px]">
          Your trusted partner for exceptional travel experiences
        </p>

        <div className="mt-10 grid gap-6 sm:mt-12 md:grid-cols-3 lg:gap-8">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="rounded-md bg-white shadow-[0_2px_10px_rgba(0,0,0,0.05)] ring-black/5 [--card-spacing:--spacing(7)]"
            >
              <CardContent>
                <Image
                  src={feature.icon}
                  alt=""
                  width={40}
                  height={40}
                  className="size-8"
                />
                <CardTitle className="mt-7 text-xl">
                  {feature.title}
                </CardTitle>
                <CardDescription className="mt-2 leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
