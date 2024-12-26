import HeroSection from "@/components/home/HeroSection";
import BestSection from "@/components/home/BestSection";
import FeaturedSection from "@/components/home/FeaturedSection";
import GearUpSection from "@/components/home/GearUpSection";
import DontMiss from "@/components/home/DontMiss";
import Essentials from "@/components/home/Essentials";

export default function Home() {
    return (
        <main className="container">
            <HeroSection />
            <BestSection />
            <FeaturedSection />
            <GearUpSection />
            <DontMiss />
            <Essentials />
        </main>
    );
}
