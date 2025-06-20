"use client"
import React from "react";
import Priorities from "./Priorities";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useGSAP } from "@gsap/react";

export default function PartyConstitutional() {
    // useGSAP(() => {
    //     gsap.registerPlugin(ScrollTrigger);

    //     // Breadcrumb fade-in animation
    //     gsap.from(".breadcrumb_section", {
    //         opacity: 0,
    //         y: -50,
    //         duration: 1,
    //         ease: "power2.out",
    //     });

    //     // Motive section fade-in
    //     gsap.from(".society_economy_sec", {
    //         opacity: 0,
    //         y: 50,
    //         duration: 1.2,
    //         ease: "power2.out",
    //         scrollTrigger: {
    //             trigger: ".society_economy_sec",
    //             start: "top 80%",
    //             toggleActions: "play none none none",
    //         },
    //     });

    //     // Scroll-triggered animation for Priorities section
    //     gsap.from(".priorities_section", {
    //         opacity: 0,
    //         x: -100,
    //         duration: 1.2,
    //         ease: "power2.out",
    //         scrollTrigger: {
    //             trigger: ".priorities_section",
    //             start: "top 85%",
    //             toggleActions: "play none none none",
    //         },
    //     });

    //     // Join Button animation
    //     gsap.from(".know_more_btn_wrap", {
    //         opacity: 0,
    //         scale: 0.8,
    //         duration: 1,
    //         ease: "back.out(1.7)",
    //         scrollTrigger: {
    //             trigger: ".know_more_btn_wrap",
    //             start: "top 90%",
    //             toggleActions: "play none none none",
    //         },
    //     });

    // }, []);

    return (
        <>
            <div
                className="breadcrumb_section"
                style={{
                    background: "url(/assets/img/party_constitution.jpg)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="container">
                    <div className="page_title">
                        <h1>Party Constitution</h1>
                    </div>
                </div>
            </div>

            <div className="about_area_section">
                <div className="container">
                    <div className="society_economy_sec">
                        <h2 className="title_2">Motive of Praja Shakti Democratic Party</h2>
                        <p className="lrg_body">
                            For the last several years, the ruling parties in Gujarat have been
                            oppressing the people through false promises and unpredictable rule.
                            Power is being misused to suppress the voice of the people,
                            unemployment is increasing, atrocities on women are increasing, and a
                            huge web of corruption is being woven, while the people are constantly
                            troubled. The main objective of the Praja Shakti Democratic Party is
                            to establish a true democratic system in Gujarat, where the interests
                            of the people will be given first place. Our priority is that every
                            citizen gets freedom, security, justice, and employment.
                        </p>
                        <p className="lrg_body">
                            Along with this, the corrupt liquor ban and the corruption associated
                            with it have spread deep in Gujarat. Liquor ban is only on paper,
                            while in reality, bootleggers who run illegal liquor sales with
                            political support are given free rein. In the name of liquor ban, the
                            system is exploiting ordinary citizens.
                        </p>
                        <p className="lrg_body">
                            Praja Shakti Democratic Party will remove this corrupt liquor ban
                            policy and bring a clean and transparent policy, so that the interest
                            of the entire people, the safety of women, and the future of the youth
                            can be secured.
                        </p>
                        <p className="lrg_body">
                            This party has emerged to fight against the misuse of the law,
                            injustice done by the police system, and the mentality of not making
                            appropriate policies for the unemployed youth. We are committed to
                            listening to the problems of the people and giving them true and
                            sustainable solutions. Praja Shakti Democratic Party is determined to
                            form a government run by the people, for the people, and by the people.
                        </p>
                    </div>

                    <div className="priorities_section">
                        <Priorities />
                    </div>

                    {/* Join Button */}
                    <div className="know_more_btn_wrap">
                        <a href="#" className="theme_btn text-decoration-none">
                            <span>Join the party</span>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
