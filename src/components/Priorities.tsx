"use client";
import React from "react";
import { usePathname } from "next/navigation";

export default function Priorities() {
  const pathname = usePathname();
  const isGujarati = pathname.includes("/gu");

  return (
    <>
      {/* Party Priorities */}
      <div className="praja_shakti_domestic">
        <h3 className="title_2">
          {isGujarati
            ? "પ્રજા શક્તિ ડેમોક્રેટિક પાર્ટી ગુજરાતમાં સાચા, શુદ્ધ અને ન્યાયસંગત શાસન લાવવાની દ્રષ્ટિ સાથે આગળ વધી રહી છે. અમારી મુખ્ય પ્રાથમિકતાઓ નીચે મુજબ છે:"
            : "Praja Shakti Democratic Party is moving forward with the vision of bringing true, clean, and fair governance in Gujarat. Our main priorities are as follows:"}
        </h3>

        <div className="row mt-4">
          <div className="col-sm-12 col-md-6 col-lg-6">
            <div className="praja_shakti_domestic_list">
              <ul>
                <li>
                  {isGujarati
                    ? "1). ભ્રષ્ટ લીકર પ્રતિબંધની નીતિ હટાવીને પારદર્શક નીતિ લાવવી, જેથી મહિલાઓની સુરક્ષા, યુવાનોનું ભવિષ્ય અને જાહેર જનતાની ખુશહાલી અને સમૃદ્ધિ સુનિશ્ચિત થઈ શકે."
                    : "1). To remove the corrupt liquor ban policy and bring a transparent policy, so that the safety of women, the future of the youth and the happiness and prosperity of the public are ensured."}
                </li>
                <li>
                  {isGujarati
                    ? "2). બજેટમાં સુસંગત શિક્ષણ – દરેક વિદ્યાર્થીને સસ્તું અને ગુણવત્તાવાળું શિક્ષણ પૂરું પાડવું, જેથી ઊંચા શિક્ષણ ખર્ચને કારણે કોઈ પરિવાર તેમના બાળકના ભવિષ્ય સાથે સમજીદારી ન કરે."
                    : "2). Budget-friendly education – To provide affordable and quality education to every student, so that no family compromises with the future of their child due to the rising cost of education."}
                </li>
                <li>
                  {isGujarati
                    ? "3). મફત અને અસરકારક આરોગ્ય સેવા – દરેક નાગરિકને આધુનિક આરોગ્ય સુવિધાઓ મફતમાં કે ઓછા ખર્ચે મળવી જોઈએ, જેથી પૈસાની કમીના કારણે કોઈ પણ ઉપચાર વગર ન રહે."
                    : "3). Free and effective health service – Every citizen should get modern health facilities free of cost or at a low cost, so that no one has to go without treatment due to lack of money."}
                </li>
                <li>
                  {isGujarati
                    ? "4). ખેડૂતો માટે ન્યાય અને સહાયતા – ખેડૂતનો દેવું માફ કરાવવું, યોગ્ય ભાવ સુનિશ્ચિત કરવો અને આધુનિક કૃષિ પદ્ધતિઓ લાવવી જેથી ખેડૂત આર્થિક રીતે મજબૂત બને."
                    : "4). Justice and assistance for farmers – To waive the debts of farmers, ensure fair prices and introduce modern farming methods so that farmers become economically strong."}
                </li>
                <li>
                  {isGujarati
                    ? "5). મધ્યમ અને નાનાં ઉદ્યોગો માટે સહાયતા – નાના ઉદ્યોગો અને સ્ટાર્ટઅપ માટે નીતિ બનાવવી જેથી મોટા ઉદ્યોગોના એકબધ્ધ શાસન તૂટે અને સ્થાનિક ઉદ્યોગોને વિકાસ માટે સારું માહોલ મળે."
                    : "5). Assistance to medium and small industries – To make a policy for small industries and startups, so that the monopoly of big industries can be broken and local industries get a good environment for development."}
                </li>
                <li>
                  {isGujarati
                    ? "6). પોલીસ પ્રણાળી અને શાસન દ્વારા ત્રાસદ્રષ્ટિ દૂર કરવી – ખોટા કેસો અને ભ્રષ્ટાચારના દુરૂપયોગ સામે લડવું."
                    : "6). Eliminate harassment by the police system and the regime – To fight against false cases and abuse of corruption."}
                </li>
                <li>
                  {isGujarati
                    ? "7). યુવાનો માટે નવા રોજગારી સર્જવા ઉદ્યોગો અને નવી ટેકનોલોજીમાં રોકાણ લાવવું, જેથી યુવાનોએ નોકરી માટે રાજ્ય બહાર ન જવું પડે."
                    : "7). To bring investment in industries and new technology to create new jobs for the youth, so that the youth do not have to go out of the state for jobs."}
                </li>
                <li>
                  {isGujarati
                    ? "8). પ્રજા શક્તિ ડેમોક્રેટિક પાર્ટી ગુજરાતમાં દરેક નાગરિક માટે સાચી લોકશાહી, શુદ્ધ શાસન અને ન્યાયસંગત નીતિઓ લાવશે."
                    : "8). Praja Shakti Democratic Party will bring true democracy, clean governance, and fair policies for every citizen in Gujarat."}
                </li>
                <li>
                  {isGujarati
                    ? "લોકશક્તિ, લોકશાસન, લોકો સાથે!"
                    : "Peoples power, peoples rule, with the people!"}
                </li>
              </ul>
            </div>
          </div>

          {/* Images Grid */}
          <div className="col-sm-12 col-md-6 col-lg-6">
            <div className="praja_shakti_democratic_grid">
              <div className="praja_shkti_grid_items dem_grid_1">
                <img
                  src="/assets/img/party_ideology/Free_Tests.png"
                  alt={isGujarati ? "મફત ટેસ્ટ" : "Free Tests"}
                />
              </div>
              <div className="praja_shkti_grid_items dem_grid_2">
                <img
                  src="/assets/img/party_ideology/Gemini_Generated.png"
                  alt={isGujarati ? "ચિત્ર" : "Generated Image"}
                />
              </div>
              <div className="praja_shkti_grid_items dem_grid_3">
                <img
                  src="/assets/img/party_ideology/Gemini_Generated_Image.png"
                  alt={isGujarati ? "ચિત્ર" : "Generated Image"}
                />
              </div>
              <div className="praja_shkti_grid_items dem_grid_4">
                <img
                  src="/assets/img/party_ideology/Gemini_Generated_Image_d.png"
                  alt={isGujarati ? "ચિત્ર" : "Generated Image"}
                />
              </div>
              <div className="praja_shkti_grid_items dem_grid_5">
                <img
                  src="/assets/img/party_ideology/Gemini_Generated_Image_d6.png"
                  alt={isGujarati ? "ચિત્ર" : "Generated Image"}
                />
              </div>
              <div className="praja_shkti_grid_items dem_grid_6">
                <img
                  src="/assets/img/party_ideology/Gemini_Generated_Image_d7.png"
                  alt={isGujarati ? "ચિત્ર" : "Generated Image"}
                />
              </div>
              <div className="praja_shkti_grid_items dem_grid_7">
                <img
                  src="/assets/img/party_ideology/96201607.png"
                  alt={isGujarati ? "પાર્ટી ચિત્ર" : "Party Image"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
