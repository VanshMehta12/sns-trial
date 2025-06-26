'use client';

import ProductCard from "../Cards/ProductCard";
import { t } from "@/utils";
import Link from "next/link";
import { useSelector } from "react-redux";
import { userSignUpData } from "@/redux/reuducer/authSlice";

const FeaturedSections = ({ featuredData = [], setFeaturedData, allEmpty }) => {
    const userData = useSelector(userSignUpData);

    // Handle like/unlike
    const handleLike = (id) => {
        const updatedData = featuredData.map(section => {
            const updatedSectionData = section.section_data.map(item => {
                if (item.id === id) {
                    return { ...item, is_liked: !item.is_liked };
                }
                return item;
            });
            return { ...section, section_data: updatedSectionData };
        });
        setFeaturedData(updatedData);
    };

    // Filter valid sections (with data)
    const visibleSections = featuredData.filter(section => section.section_data?.length > 0);

    if (visibleSections.length === 0 || allEmpty) return null;

    let visualIndex = 0;

    return (
        <>
            {visibleSections.map((ele, index) => {
                const section = (
                    <div
                        key={ele.slug || index}
                        style={{
                            backgroundColor: visualIndex % 2 === 0 ? "#f6f5fa" : "#ffffff",
                            paddingTop: "10px",
                            paddingBottom: "40px",
                        }}
                    >
                        <div className="container">
                            <div className="pop_categ_mrg_btm w-100">
                                <h4 className="pop_cat_head">{ele?.title}</h4>

                                {ele.section_data.length > 4 && (
                                    <Link
                                        href={`/featured-sections/${ele?.slug}`}
                                        className="view_all_link"
                                        prefetch={false}
                                    >
                                        <span className="view_all">{t("viewAll")}</span>
                                    </Link>
                                )}
                            </div>

                            <div className="row product_card_card_gap">
                                {ele.section_data.slice(0, 4).map((data) => (
                                    <div
                                        className="col-xxl-3 col-lg-4 col-6 card_col_gap"
                                        key={data.id}
                                    >
                                        <Link
                                            href={
                                                userData?.id === data?.user_id
                                                    ? `/my-listing/${data?.slug}`
                                                    : `/product-details/${data?.slug}`
                                            }
                                            prefetch={false}
                                        >
                                            {/* ProductCard should handle like button internally to avoid Link issues */}
                                            <ProductCard
                                                data={data}
                                                handleLike={(e) => {
                                                    e.preventDefault(); // prevent Link from triggering
                                                    handleLike(data.id);
                                                }}
                                            />
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );

                visualIndex++;
                return section;
            })}
        </>
    );
};

export default FeaturedSections;
