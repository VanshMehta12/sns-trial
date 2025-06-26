'use client';

import React, { useState } from 'react';
import AppDownloadModal from '@/components/Home/app-download-modal'; // Make sure this path is correct

const PromoCard = ({
    title,
    description,
    code,
    backgroundColor = '#f0f5ff',
    percentIconColor = '#8a5cf6',
    validity,
    onKnowMore, // callback prop for handling "Know more"
}) => {
    return (
        <div className="coupon-card" style={{ cursor: 'pointer' }} onClick={onKnowMore}>
            <div className="coupon-content">
                <div className="coupon" style={{ backgroundColor }}>
                    <div className="corner-top"></div>
                    <div className="corner-bottom"></div>

                    <div className="coupon-text">
                        <h2>{title}</h2>
                        <p>{description}</p>
                        <div className="code-container">
                            <div className="check-icon"></div>
                            <div className="code">Use code {code}</div>
                        </div>
                    </div>

                    <div className="coupon-image">
                        <div className="arrow"></div>
                        <div className="percent-icon" style={{ backgroundColor: percentIconColor }}></div>
                    </div>
                </div>
            </div>

            <div className="coupon-footer">
                <div className="validity">{validity}</div>
                <a
                    href='#'
                    className="know-more"
                >
                    Know more
                </a>
            </div>
        </div>
    );
};

export default function Promotions() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section className="promo-section">
            <h4 className='pop_cat_head'>Promo Codes for More Savings</h4>
            <div className="coupon-container">
                <PromoCard
                    title="Get 20% instant Discount"
                    description="Valid for new users only."
                    code="WELCOME"
                    backgroundColor="#f0f5ff"
                    percentIconColor="#8a5cf6"
                    validity="Valid till 30 Jun 2025"
                    onKnowMore={() => setIsModalOpen(true)}
                />

                <PromoCard
                    title="Weekend Special 15% Off"
                    description="On all premium products."
                    code="WEEKEND"
                    backgroundColor="#fff0e6"
                    percentIconColor="#f97316"
                    validity="Valid every weekend"
                    onKnowMore={() => setIsModalOpen(true)}
                />
            </div>

            <AppDownloadModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={"Download app to view to get more discounts"}
            />
        </section>
    );
}
