// components/ServicesSection.jsx
'use client';
import Image from 'next/image';
import styles from '@/app/styles/Services.module.css';

const Services = ({ sliderData }) => {
    // Filter all banner items
    const bannerItems = sliderData?.filter(item => item.type === 'banner') || [];

    // First banner is used for job search panel
    const jobSearchPanel = bannerItems[0] || {
        image: "/assets/job-search-image.png",
        alt: "Looking for a Job - Find an Employer matches your Skills",
    };

    // Remaining banners used for service cards
    const servicesData = bannerItems.slice(1);

    return (
        <div className={styles.serviceSection}>
            <section className={styles.servicesContainer}>
                {/* Job Search Panel */}
                <div className={styles.jobSearchPanel}>
                    <Image
                        src={jobSearchPanel.image || jobSearchPanel.src}
                        alt={jobSearchPanel.alt || "Job search banner"}
                        fill
                        className={styles.jobSearchImg}
                    />
                </div>

                {/* Service Cards */}
                <div className={styles.serviceCards}>
                    {servicesData.map((service, index) => (
                        <div key={index} className={styles.serviceCard}>
                            <Image
                                src={service.image}
                                alt={service.alt || `Service image ${index + 1}`}
                                fill
                                className={styles.serviceImg}
                            />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Services;
