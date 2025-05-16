import styles from '@/app/styles/Events.module.css';

const events = [
    {
        title: 'Rangtaali 2025',
        location: 'Melbourne, Victoria, Australia',
        image: '/assets/Rangtaali.png',
        alt: 'Rangtaali 2025 Event',
    },
    {
        title: 'Music Festival 2025',
        location: 'Sydney, New South Wales, Australia',
        image: '/assets/Music.png',
        alt: 'Music Festival 2025',
    },
    {
        title: 'Dance Competition 2025',
        location: 'Brisbane, Queensland, Australia',
        image: '/assets/Dance.png',
        alt: 'Dance Competition 2025',
    },
];

export default function EventsPage() {
    return (
        <>
            <div className={styles.body}>
                <div className={styles.container}>
                    <h4 className="pop_cat_head mb-4 text-center text-xl-start ms-xl-4 ps-xl-3">Event Tickets</h4>
                    <div className={styles.eventSection}>
                        {events.map((event, index) => (
                            <div key={index} className={styles.eventCard}>
                                <img
                                    className={styles.eventImage}
                                    src={event.image}
                                    alt={event.alt}
                                />
                                <div className={styles.eventDetails}>
                                    <div className={styles.eventTitle}>{event.title}</div>
                                    <div className={styles.eventLocation}>{event.location}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
