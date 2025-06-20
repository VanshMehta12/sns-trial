"use client";

import { usePathname } from "next/navigation";

interface Volunteer {
  id: string;
  image_url: string;
  name: string;
  title: string;
}

export default function VolunteerSection({ volunteers }: { volunteers: Volunteer[] }) {
  const pathname = usePathname();
  const isGujarati = pathname.includes("/gu");

  return (
    <section className="our_olunteers_section">
      <div className="container">
        <div className="title_info">
          <h2 className="title">{isGujarati ? "અમારા નેતાઓ" : "Our Leaders"}</h2>
        </div>
        <div className="our_volunteers_grid mt_65">
          {volunteers.map((volunteer) => (
            <div className="volunteers_card" id={volunteer.id} key={volunteer.id}>
              <div className="volunteers_card_img">
                <img src={volunteer.image_url} alt={volunteer.name} />
              </div>
              <div className="volunteers_card_cont">
                <h3>{volunteer.name}</h3>
                <p>{volunteer.title}</p>
                <ul className="person_social_list">
                  <li>
                    <a href="#">
                      <img src="/assets/img/team_fb.svg" alt="facebook" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src="/assets/img/team_insta.svg" alt="instagram" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src="/assets/img/team_twit.svg" alt="twitter" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src="/assets/img/team_youtb.svg" alt="youtube" />
                    </a>
                  </li>
                </ul>
                <a href="#" className="knnow_more_btn text-decoration-none">
                  <span>{isGujarati ? "વધુ જાણો" : "Know more"}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="our_volunteers_btn">
          <a href="#" className="theme_btn text-decoration-none">
            <span>{isGujarati ? "વધુ જાણો" : "Know more"}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
