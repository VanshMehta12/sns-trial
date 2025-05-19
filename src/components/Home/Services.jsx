// components/ServicesSection.jsx
'use client';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/app/styles/Services.module.css';

const Services = ({ sliderData }) => {
    // Filter all banner items
    const bannerItems = sliderData?.filter(item => item.type === 'banner') || [];

    // First banner is used for job search panel
    const jobSearchPanel = bannerItems[0] || {
        image: "/assets/job-search-image.png",
        alt: "Looking for a Job - Find an Employer matches your Skills",
        href: "/job-search", // Default URL if none provided
    };

    // Remaining banners used for service cards
    const servicesData = bannerItems.slice(1);

    return (
        <div className={styles.serviceSection}>
            <section className={styles.servicesContainer}>
                {/* Job Search Panel */}
                <Link href={jobSearchPanel.third_party_link || "#"} className={styles.jobSearchPanel}>
                    <div className={styles.imageWrapper}>
                        <Image
                            src={jobSearchPanel.image || jobSearchPanel.src}
                            alt={jobSearchPanel.alt || "Job search banner"}
                            fill
                            className={styles.jobSearchImg}
                        />
                    </div>
                </Link>

                {/* Service Cards */}
                <div className={styles.serviceCards}>
                    {servicesData.map((service, index) => (
                        <Link 
                            key={index} 
                            href={service.third_party_link || "#"} 
                            className={styles.serviceCard}
                        >
                            <div className={styles.imageWrapper}>
                                <Image
                                    src={service.image}
                                    alt={service.alt || `Service image ${index + 1}`}
                                    fill
                                    className={styles.serviceImg}
                                />
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Services;