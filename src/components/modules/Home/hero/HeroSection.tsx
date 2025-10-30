import {} from "lucide-react";
import HeroForm from "./HeroForm";
import HeroLeftContent from "./HeroLeftContent";

export function HeroSection() {
  return (
    <div className="w-full bg-white relative">
      {/* Emerald Glow Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
        radial-gradient(120% 125% at 50% 90%, #ffffff 25%, #2ed32e 100%)
      `,
          backgroundSize: "100% 100%",
        }}
      />
      <section className="w-full  py-12 md:py-16 lg:py-20 z-10 relative  mx-auto">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8 justify-between container mx-auto ">
            {/* Left Content */}
            <HeroLeftContent />
            <HeroForm />
          </div>
        </div>
      </section>
    </div>
  );
}
