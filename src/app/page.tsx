import DomainsSection from "./components/DomainsSection";
import ExpertsSection from "./components/ExpertsSection";
import FAQSection from "./components/FAQSection";
import FeaturesSection from "./components/FeaturesSection";
import HeroSection from "./components/HeroSection";
import TrainingInterface from "./components/TrainingInterface";


export default function Home() {
  return (
    <main>
      <HeroSection/>
      <FeaturesSection/>
      <DomainsSection/>
      <TrainingInterface/>
      <ExpertsSection/>
      <FAQSection/>
      {/* Other sections */}
    </main>
  );
}
