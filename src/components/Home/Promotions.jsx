// PromoCodesSection.jsx
'use client'; // Add this if using in a client component

import React from 'react';
// import '@/app/styles/Promotions.module.css'; // Import external CSS file

const PromoCard = ({
    title,
    description,
    code,
    backgroundColor = '#f0f5ff',
    percentIconColor = '#8a5cf6',
    validity,
}) => {
    return (
        <div className="coupon-card">
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
                <a href="#" className="know-more">Know more</a>
            </div>
        </div>
    );
};

export default function Promotions() {
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
                />

                <PromoCard
                    title="Weekend Special 15% Off"
                    description="On all premium products."
                    code="WEEKEND"
                    backgroundColor="#fff0e6"
                    percentIconColor="#f97316"
                    validity="Valid every weekend"
                />
            </div>
        </section>
    );
}