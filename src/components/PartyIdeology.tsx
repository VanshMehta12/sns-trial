"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Priorities from "./Priorities";

export default function PartyIdeology() {
  const pathname = usePathname();
  const isGujarati = pathname.includes("/gu");

  return (
    <>
      {/* Breadcrumb Section */}
      <div
        className="breadcrumb_section"
        style={{
          background: "url(/assets/img/party_ideology/party_ideology_bg.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <div className="page_title">
            <h1>{isGujarati ? "પાર્ટી વિચારધારા" : "Party Ideology"}</h1>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="about_area_section">
        <div className="container">
          <div className="society_economy_sec">
            <h2 className="title_2">
              {isGujarati ? "પ્રજા શક્તિ ડેમોક્રેટિક પાર્ટીનો લક્ષ્ય" : "Motive of Praja Shakti Democratic Party"}
            </h2>
            <p className="lrg_body">
              {isGujarati
                ? `ગયા ઘણા વર્ષોથી ગુજરાતમાં શાસનકર્તા પક્ષો ખોટા વાદા અને અનિશ્ચિત શાસનથી લોકોનું શોષણ કરી રહ્યા છે. શાસનનો દુરૂપયોગ કરીને લોકોની અવાજ દબાવવામાં આવી રહી છે, બેરોજગારી વધતી જાય છે, મહિલાઓ પર અત્યાચાર વધે છે અને ભ્રષ્ટાચારનું જાળું વણાય છે, જે લોકો માટે સતત પીડાદાયક બની રહ્યું છે. પ્રજા શક્તિ ડેમોક્રેટિક પાર્ટીનો મુખ્ય ઉદ્દેશ ગુજરાતમાં સચ્ચા લોકશાહી વ્યવસ્થાનો સ્થાપન કરવો છે, જ્યાં લોકોના હિતને પ્રથમ સ્થાન મળે. અમારી પ્રાથમિકતા છે કે દરેક નાગરિકને સ્વાતંત્ર્ય, સુરક્ષા, ન્યાય અને રોજગારી મળે.`
                : `For the last several years, the ruling parties in Gujarat have been oppressing the people through false promises and unpredictable rule. Power is being misused to suppress the voice of the people, unemployment is increasing, atrocities on women are increasing, and a huge web of corruption is being woven, while the people are constantly troubled. The main objective of the Praja Shakti Democratic Party is to establish a true democratic system in Gujarat, where the interests of the people will be given first place. Our priority is that every citizen gets freedom, security, justice, and employment.`}
            </p>
            <p className="lrg_body">
              {isGujarati
                ? `આ સાથે, ગુજરાતમાં ભ્રષ્ટ લીકરનો પ્રતિબંધ અને તેના સાથે સંબંધિત ભ્રષ્ટાચાર ઊંડા સુધી ફેલાયેલા છે. લીકરનો પ્રતિબંધ માત્ર કાગળ પર જ છે, જ્યારે હકીકતમાં, બૂટલેગર્સને જે રાજકીય સમર્થન સાથે અયોગ્ય રીતે અશક્ત શરાબ વેચાણ ચલાવે છે, તેમને સંપૂર્ણ છૂટ આપવામાં આવી છે. લીકર પ્રતિબંધના નામે પ્રણાલી સામાન્ય નાગરિકોનું શોષણ કરે છે.`
                : `Along with this, the corrupt liquor ban and the corruption associated with it have spread deep in Gujarat. Liquor ban is only on paper, while in reality, bootleggers who run illegal liquor sales with political support are given free rein. In the name of liquor ban, the system is exploiting ordinary citizens.`}
            </p>
            <p className="lrg_body">
              {isGujarati
                ? `પ્રજા શક્તિ ડેમોક્રેટિક પાર્ટી આ ભ્રષ્ટ લીકર પ્રતિબંધની નીતિ હટાવીને સાફ અને પારદર્શક નીતિ લાવશે, જેથી સમગ્ર લોકોના હિતો, મહિલાઓની સુરક્ષા અને યુવાનોનો ભાવિ સુરક્ષિત થઈ શકે.`
                : `Praja Shakti Democratic Party will remove this corrupt liquor ban policy and bring a clean and transparent policy, so that the interest of the entire people, the safety of women, and the future of the youth can be secured.`}
            </p>
            <p className="lrg_body">
              {isGujarati
                ? `આ પાર્ટી કાયદા દુરૂપયોગ, પોલીસ પ્રણાળી દ્વારા થયેલ અન્યાય અને બેરોજગાર યુવાનો માટે યોગ્ય નીતિ ન બનાવવાનો મંતવ્યો સામે લડવા માટે ઉભી છે. અમે લોકોની સમસ્યાઓ સાંભળવા અને તેમને સાચા અને ટકાઉ ઉકેલ આપવા પ્રતિબદ્ધ છીએ. પ્રજા શક્તિ ડેમોક્રેટિક પાર્ટી એવા શાસન માટે પ્રતિબદ્ધ છે જે લોકોને ચલાવે, લોકોને માટે હોય અને લોકો દ્વારા બને.`
                : `This party has emerged to fight against the misuse of the law, injustice done by the police system, and the mentality of not making appropriate policies for the unemployed youth. We are committed to listening to the problems of the people and giving them true and sustainable solutions. Praja Shakti Democratic Party is determined to form a government run by the people, for the people, and by the people.`}
            </p>
          </div>

          {/* Party Priorities */}
          <div className="priorities_section">
            <Priorities />
          </div>

          {/* Join Button */}
          <div className="know_more_btn_wrap">
            <a href="#" className="theme_btn text-decoration-none">
              <span>{isGujarati ? "પાર્ટીમાં જોડાઓ" : "Join the party"}</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
