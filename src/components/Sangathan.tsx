'use client'

import ReachUsSection from "@/components/ReachUsSection"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

interface Sangathan {
    id: string
    banner_url: string
    name: string
    title: string
    short_desc: string
    link: string
    slug: string
}

type Lang = "en" | "gu";

const titles: Record<Lang, {
  pageTitle: string,
  sectionTitle: string,
  description: string,
  buttonText: string
}> = {
  en: {
    pageTitle: "Sangathan",
    sectionTitle: "Party Sangathan",
    description: `For the last several years, the ruling parties in Gujarat have been
      oppressing the people through false promises and unpredictable rule.
      Power is being misused to suppress the voice of the people,
      unemployment is increasing, atrocities on women are increasing, and a
      huge web of corruption is being woven, while the people are constantly
      troubled. The main objective of the Praja Shakti Democratic Party is
      to establish a true democratic system in Gujarat, where the interests
      of the people will be given first place. Our priority is that every
      citizen gets freedom, security, justice, and employment.`,
    buttonText: "Know more",
  },
  gu: {
    pageTitle: "સંગઠન",
    sectionTitle: "પાર્ટી સંગઠન",
    description: `ગયા ઘણા વર્ષોથી ગુજરાતમાં શાસનકર્તા પક્ષો ખોટા વાદા અને અનિશ્ચિત શાસનથી લોકોનું શોષણ કરી રહ્યા છે.
      શાસનનો દુરૂપયોગ કરીને લોકોની અવાજ દબાવવામાં આવી રહી છે,
      બેરોજગારી વધતી જાય છે, મહિલાઓ પર अत्याचार વધે છે અને ભ્રષ્ટાચારનું જાળું વણાય છે,
      જે લોકો માટે સતત પીડાદાયક બની રહ્યું છે.
      પ્રજા શક્તિ ડેમોક્રેટિક પાર્ટીનો મુખ્ય ઉદ્દેશ ગુજરાતમાં સચ્ચા લોકશાહી વ્યવસ્થાનો સ્થાપન કરવો છે,
      જ્યાં લોકોના હિતને પ્રથમ સ્થાન મળે.
      અમારી પ્રાથમિકતા છે કે દરેક નાગરિકને સ્વાતંત્ર્ય, સુરક્ષા, ન્યાય અને રોજગારી મળે.`,
    buttonText: "વધુ જાણો",
  }
}

export default function SangathanPage({ sangathan }: { sangathan: Sangathan[] }) {
  const pathname = usePathname();
  const langFromPath = pathname?.split("/")[1];
  const [lang, setLang] = useState<Lang>(langFromPath === "gu" ? "gu" : "en");

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language");
    if (storedLanguage === "en" || storedLanguage === "gu") {
      setLang(storedLanguage);
    }
  }, []);

  return (
    <>
      <div
        className="breadcrumb_section"
        style={{
          background: "url(/assets/img/sangathan_bg.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <div className="page_title">
            <h1>{titles[lang].pageTitle}</h1>
          </div>
        </div>
      </div>

      <div className="about_area_section">
        <div className="container">
          <div className="society_economy_sec">
            <h2 className="title_2">{titles[lang].sectionTitle}</h2>
            <p className="lrg_body">{titles[lang].description}</p>
          </div>

          <div className="sangathan_morcha">
            {sangathan?.map((morcha, index) => (
              <div key={morcha.id} className="sangathan_morcha_list">
                <div className="row align-items-center">
                  {index % 2 !== 0 && (
                    <div className="col-sm-12 col-md-6 col-lg-6">
                      <div className="morcha_img">
                        <img src={morcha.banner_url || "/placeholder.svg"} alt={morcha.title} />
                      </div>
                    </div>
                  )}
                  <div className="col-sm-12 col-md-6 col-lg-6">
                    <div className="morcha_des">
                      <h3 className="title_2">{morcha.title}</h3>
                      <p className="lrg_body" dangerouslySetInnerHTML={{ __html: morcha.short_desc }} />
                      <a href={`/${lang}/sangathan/${morcha.slug}`} className="theme_btn text-decoration-none">
                        <span>{titles[lang].buttonText}</span>
                      </a>
                    </div>
                  </div>
                  {index % 2 === 0 && (
                    <div className="col-sm-12 col-md-6 col-lg-6">
                      <div className="morcha_img">
                        <img src={morcha.banner_url || "/placeholder.svg"} alt={morcha.title} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
