import AboutParty from '@/components/AboutParty'
import ReachUsSection from "@/components/ReachUsSection";
import VolunteerSection from '@/components/VolunteerSection';
import React from "react";


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
        const apiUrl = process.env.API_BASE_URL || "http://192.168.1.5:8022";
        const res = await fetch(`${apiUrl}/api/HomeAll?lang=${lang}`, { cache: "no-store" });

        if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();

        return {
            inspirations: data.inspiration || [],
            volunteers: data.volunteer || [],
            factSheets: data.factSheet || [],
        };
    } catch (err) {
        console.log(err);
        return {
            inspirations: [],
            volunteers: [],
            factSheets: [],
        };
    }
}

export default async function AboutPartyPage({ params }: Props) {

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
    const { volunteers } = await getData(locale);

    return (
        <>
            <AboutParty />
            <VolunteerSection volunteers={volunteers} />
            <ReachUsSection />
        </>
    );
}




