
// components/ServicesSection.jsx
import Image from 'next/image';
import styles from '@/app/styles/Services.module.css';

const Services = () => {
    return (
        <div className={styles.serviceSection}>
            <section className={styles.servicesContainer}>
                {/* Job Search Panel */}
                <div className={styles.jobSearchPanel}>
                    <Image
                        src="/assets/job-search-image.png"
                        alt="Looking for a Job - Find an Employer matches your Skills"
                        fill
                        className={styles.jobSearchImg}
                    />
                </div>

                {/* Service Cards */}
                <div className={styles.serviceCards}>
                    {/* Cleaning Services */}
                    <div className={styles.serviceCard}>
                        <Image
                            src="/assets/cleaning-services.png"
                            alt="Cleaning Services - Find Contact Details and Hire Local Cleaners"
                            fill
                            className={styles.serviceImg}
                        />
                    </div>

                    {/* Packers & Movers */}
                    <div className={styles.serviceCard}>
                        <Image
                            src="/assets/packers-movers.png"
                            alt="Packers & Movers"
                            fill
                            className={styles.serviceImg}
                        />
                    </div>

                    {/* Repair & Service */}
                    <div className={styles.serviceCard}>
                        <Image
                            src="/assets/repair-service.png"
                            alt="Repair & Service - Find a Handyman Locally"
                            fill
                            className={styles.serviceImg}
                        />
                    </div>

                    {/* Tiffin & Catering */}
                    <div className={styles.serviceCard}>
                        <Image
                            src="/assets/tiffin-catering.png"
                            alt="Tiffin & Catering - Test the Best from Local Indian Chef"
                            fill
                            className={styles.serviceImg}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Services;