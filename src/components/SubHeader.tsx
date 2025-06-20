"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';
import { usePathname } from 'next/navigation';

const SubHeader: React.FC = () => {
    const pathname = usePathname();
    const [LanguageRoute, setLanguageRoute] = useState("")

    useEffect(() => {
        const lang = localStorage.getItem("language");
        if (lang) {
            setLanguageRoute(`/${lang}/`);
        }
    }, [pathname])

    const menuItems = [
        { icon: 'columns', text: 'Dashboard', href: `${LanguageRoute}dashboard`, exact: true },
        { icon: 'user-edit', text: 'Update Profile', href: `${LanguageRoute}dashboard/user-details`, exact: false },
        { icon: 'id-card', text: 'My Membership', href: `${LanguageRoute}dashboard/membership-details`, exact: false },
        { icon: 'money-bill-transfer', text: 'Donation', href: `${LanguageRoute}dashboard/membership-donation`, exact: false },
        { icon: 'user-friends', text: 'Refer Member', href: `${LanguageRoute}dashboard/referred-member`, exact: false },
        { icon: 'envelope', text: 'Write to Party', href: `${LanguageRoute}dashboard/write`, exact: false },
    ];

    // const handleLogout = () => {
    //     sessionStorage.removeItem('auth_token');
    // };

    // Function to check if a link is active
    const isActive = (href: string, exact: boolean) => {
        if (!pathname) return false;

        // Remove any language prefix and normalize paths
        const normalizedPathname = pathname.replace(/^\/[^\/]+\//, '/');
        const normalizedHref = href.replace(/^\/[^\/]+\//, '/');

        if (exact) {
            // For the main dashboard, only highlight when it's exactly '/dashboard'
            return normalizedPathname === normalizedHref ||
                normalizedPathname === `${normalizedHref}/`;
        } else {
            // For sub-pages, check if the current path includes the href
            return normalizedPathname.startsWith(normalizedHref);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light subheader pt-lg-3 pt-xl-2" style={{ backgroundColor: '#CB392C' }}>
            <div className="container-fluid mt-lg-2 mt-xxl-1">
                <ul className="navbar-nav d-flex flex-wrap justify-content-center mx-lg-auto mx-1">
                    {menuItems.map((item, index) => (
                        <li key={index} className="nav-item mx-3 my-2">
                            <Link
                                href={item.href}
                                className={`nav-link d-flex align-items-center text-white text ${isActive(item.href, item.exact) ? 'active-link fw-bold' : ''}`}
                                style={{
                                    fontSize: "16px",
                                    position: "relative"
                                }}
                            >
                                <i className={`fas fa-${item.icon} me-2`}></i>
                                <span>{item.text}</span>
                                {isActive(item.href, item.exact) && (
                                    <span
                                        style={{
                                            position: "absolute",
                                            bottom: "1px",
                                            left: "50%",
                                            transform: "translateX(-50%)",
                                            width: "90%",
                                            height: "2px",
                                            backgroundColor: "white",
                                            fontWeight: "bold",
                                            borderRadius: "10px",
                                            opacity: 0.7                                                      
                                        }}
                                    />
                                )}
                            </Link>
                        </li>
                    ))}
                    {/* <li className="nav-item mx-3 my-2">
                        <Link
                            href={`/join`}
                            onClick={handleLogout}
                            className="nav-link d-flex align-items-center text-white text"      
                            style={{ fontSize: "16px" }}
                        >
                            <i className="fa-solid fa-right-from-bracket me-2"></i>
                            <span>Logout</span>
                        </Link>
                    </li> */}
                </ul>
            </div>
        </nav>
    );
};

export default SubHeader;