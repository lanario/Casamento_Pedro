import SiteLogo from "@/components/SiteLogo";
import HeroSection from "@/components/HeroSection";
import InfoSection from "@/components/InfoSection";
import GuestManualSection from "@/components/GuestManualSection";
import DressCodeSection from "@/components/DressCodeSection";
import GiftListSection from "@/components/GiftListSection";
import RsvpSection from "@/components/RsvpSection";
import LocationSection from "@/components/LocationSection";
import SiteFooter from "@/components/SiteFooter";

export default function HomePage() {
  return (
    <main>
      <SiteLogo />
      <HeroSection />
      <InfoSection />
      <GuestManualSection />
      <DressCodeSection />
      <GiftListSection />
      <RsvpSection />
      <LocationSection />
      <SiteFooter />
    </main>
  );
}
