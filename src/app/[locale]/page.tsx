import FactSheetSection from "@/components/FactSheetSection";
import HeroSlider from "@/components/HeroSlider";
import InspirationSection from "@/components/InspirationSection";
import MediaSection from "@/components/MediaSection";
import MotivesSection from "@/components/MotivesSection";
import PeopleVoiceSection from "@/components/PeopleVoiceSection";
import ReachUsSection from "@/components/ReachUsSection";
import VolunteerSection from "@/components/VolunteerSection";

// Define the resolved params type
type ResolvedParams = {
  locale: "en" | "gu";
};

// Update Props to use Promise for params
type Props = {
  params: Promise<ResolvedParams>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

async function getData(locale: string) {
  const lang = locale === "gu" ? "guj" : "eng";

  try {
    const apiUrl = process.env.NEXT_PUBLIC_REFERRED_MEMBERS_API_URL;
    const res = await fetch(`${apiUrl}HomeAll?lang=${lang}`, { cache: "no-store" });

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
    console.log(err);
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

// Update the page component to await params
export default async function Page({ params }: Props) {
  // Await the params promise to get the actual values
  const resolvedParams = await params;
  const { locale } = resolvedParams;

  if (locale !== "en" && locale !== "gu") {
    return (
      <div>
        <img src="/assets/img/404.svg" alt="" width="100%" height="100%" />
      </div>
    );
  }

  const { inspirations, volunteers, factSheets, bannerImages, motives, voices } = await getData(locale);

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