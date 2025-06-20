"use client"
import React, { useEffect, useState } from 'react';
import ReachUsSection from '@/components/ReachUsSection';
import { usePathname } from 'next/navigation';

interface Spokesperson {
    id: number;
    name: string;
    title: string;
    image_url: string;
    email: string;
    phone: string | null;
    address: string | null;
    fb_url: string | null;
    twitter_url: string | null;
    insta_url: string | null;
    youtube_url: string | null;
}

export default function Page() {
    const [spokespersons, setSpokespersons] = useState<Spokesperson[]>([]);
    const [loading, setLoading] = useState(true);
    const pathname = usePathname(); // Get current path
    const [Language, setLanguage] = useState("")

    const LanguagePicker = () => {
        if (pathname.includes("/gu")) {
            setLanguage("guj")
        } else if (pathname.includes("/en")) {
            setLanguage("eng")
        } else {
            // Default to English if no language is specified
            setLanguage("eng")
        }
    }

    useEffect(() => {
        LanguagePicker()
    }, [pathname])

    useEffect(() => {
        console.log('====================================');
        console.log(Language);
        console.log('====================================');
        fetch(`${process.env.NEXT_PUBLIC_REFERRED_MEMBERS_API_URL}HomeAll?lang=${Language}`)
            .then(response => response.json())
            .then(data => {
                setSpokespersons(data.spokePerson || []);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching spokesperson data:', error);
                setLoading(false);
            });
    }, [Language]);

    return (
        <>
            <div
                className="breadcrumb_section"
                style={{ background: "url(assets/img/about_the_party/about-the-party-bg.png)" }}
            ></div>
            <div className="about_area_section bg_light">
                <div className="container">
                    <div className="photo_gategory_bg">
                        <h2 className="title_2">
                            Spokesperson of Praja Shakti Democratic Party (Gujarat)
                        </h2>
                    </div>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <div className="our_volunteers_grid mt_65">
                            {spokespersons.map((person) => (
                                <div key={person.id} className="volunteers_card box_shadow">
                                    <div className="volunteers_card_img">
                                        <img src={person.image_url || "assets/img/default_avatar.png"} alt={person.name} />
                                    </div>
                                    <div className="volunteers_card_cont">
                                        <h3>{person.name}</h3>
                                        <p className="primary_color">
                                            &nbsp;({person.title})
                                        </p>
                                        {person.address && <p>{person.address}</p>}
                                        <ul className="person_info_list">
                                            {person.phone && (
                                                <li>
                                                    <i className="fa fa-phone" />
                                                    <a href={`tel:${person.phone}`}>{person.phone}</a>
                                                </li>
                                            )}
                                            {person.email && (
                                                <li>
                                                    <i className="fa fa-envelope" />
                                                    <a href={`mailto:${person.email}`}>{person.email}</a>
                                                </li>
                                            )}
                                        </ul>
                                        <ul className="person_social_list">
                                            {person.fb_url && (
                                                <li>
                                                    <a href={person.fb_url} target="_blank">
                                                        <img src="/assets/img/team_fb.svg" alt="facebook" />
                                                    </a>
                                                </li>
                                            )}
                                            {person.twitter_url && (
                                                <li>
                                                    <a href={person.twitter_url} target="_blank">
                                                        <img src="/assets/img/team_twit.svg" alt="twitter" />
                                                    </a>
                                                </li>
                                            )}
                                            {person.insta_url && (
                                                <li>
                                                    <a href={person.insta_url} target="_blank">
                                                        <img src="/assets/img/team_insta.svg" alt="instagram" />
                                                    </a>
                                                </li>
                                            )}
                                            {person.youtube_url && (
                                                <li>
                                                    <a href={person.youtube_url} target="_blank">
                                                        <img src="/assets/img/team_youtb.svg" alt="youtube" />
                                                    </a>
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <ReachUsSection />
        </>
    );
}
