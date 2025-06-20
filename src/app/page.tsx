import HeroSlider from "@/components/HeroSlider";
import MotivesSection from "@/components/MotivesSection";
import InspirationSection from "@/components/InspirationSection";
import VolunteerSection from "@/components/VolunteerSection";
import FactSheetSection from "@/components/FactSheetSection";
import PeopleVoiceSection from "@/components/PeopleVoiceSection";
import ReachUsSection from "@/components/ReachUsSection";
import MediaSection from "@/components/MediaSection";

// ✅ Fetch Data in a Server Component
async function getData() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_REFERRED_MEMBERS_API_URL}HomeAll?lang=guj`, {
      cache: "no-store", // Ensures fresh data on every request
    });
    if (!res.ok) throw new Error("Failed to fetch data");
    const data = await res.json();
    return {
      bannerImages: data.sliders || [],
      inspirations: data.inspiration || [],
      volunteers: data.volunteer || [],
      factSheets: data.factSheet || [],
      motives: data.motive || [],
      voices: data.peoplePower || [],


    };
  } catch (err) {
    console.log(err)
    return {
      bannerImages: [],
      inspirations: [],
      volunteers: [],
      factSheets: [],
      motives: [],
      voices: [],
    };
  }
}

export default async function HomeMain() {
  const { inspirations, volunteers, factSheets, bannerImages, motives, voices } = await getData();


  return (
    <>
      <HeroSlider bannerImages={bannerImages} />
      <MotivesSection motives={motives} />
      <InspirationSection inspirations={inspirations} />
      <VolunteerSection volunteers={volunteers} />
      <FactSheetSection factSheets={factSheets} />
      <PeopleVoiceSection voices={voices} />
      <ReachUsSection />
      <MediaSection />
    </>
  );
}
