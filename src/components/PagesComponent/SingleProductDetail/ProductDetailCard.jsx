'use client'
import ReactShare from "@/components/SEO/ReactShare"
import { exactPrice, formatProdDate, isLogin, t } from "@/utils";
import { manageFavouriteApi } from "@/utils/api";
import { Dropdown } from "antd";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";
import { FaHeart, FaRegCalendarCheck, FaRegHeart } from "react-icons/fa6";
import { FiShare2 } from "react-icons/fi";
// import Swal from "sweetalert2";
import LoginModal from "@/components/Auth/LoginModal";
import MailSentSucessfully from '@/components/Auth/MailSentSucessfully.jsx';
import { useState } from "react";


const ProductDetailCard = ({ productData, setProductData, systemSettingsData }) => {

    const [isMailSentOpen, setIsMailSentOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const path = usePathname()
    const CompanyName = systemSettingsData?.data?.data?.company_name
    const currentUrl = `${process.env.NEXT_PUBLIC_WEB_URL}${path}`;

    const handleCopyUrl = async () => {
        try {
            await navigator.clipboard.writeText(currentUrl + "?share=true");
            toast.success(t("copyToClipboard"));
        } catch (error) {
            console.error("Error copying to clipboard:", error);
        }
    };

    const openSentMailModal = () => {
        setIsLoginModalOpen(false);
        setIsMailSentOpen(true);
    };


    const handleLikeItem = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isLogin()) {
            setIsLoginModalOpen(true);
            return;
        }
        try {
            const response = await manageFavouriteApi.manageFavouriteApi({ item_id: productData?.id })
            if (response?.data?.error === false) {
                setProductData((prev) => ({ ...prev, is_liked: !productData?.is_liked }))
            }
            toast.success(response?.data?.message)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className="product card">
                <div className="card-body">
                    <div className="product_div">
                        <div className="title_and_price">
                            <span className='title'>
                                {productData?.name}
                            </span>
                            <span className="price">{exactPrice(productData?.price)}</span>
                        </div>
                        <div className="like_share">
                            {productData?.is_liked === true ? (
                                <button className="isLiked" onClick={handleLikeItem}><FaHeart size={20} /></button>

                            ) : (
                                <button onClick={handleLikeItem}><FaRegHeart size={20} /></button>
                            )}

                            <Dropdown overlay={<ReactShare currentUrl={currentUrl} handleCopyUrl={handleCopyUrl} data={productData?.name} CompanyName={CompanyName} />} placement="bottomRight" arrow>
                                <button><FiShare2 size={20} /></button>
                            </Dropdown>
                        </div>
                    </div>
                    <div className="product_id">
                        <FaRegCalendarCheck size={16} />
                        <span> {t('postedOn')}: {formatProdDate(productData.created_at)} </span>
                    </div>
                </div>
            </div>
            {
                isLoginModalOpen && (
                    <>
                        <LoginModal
                            IsLoginModalOpen={isLoginModalOpen}
                            setIsLoginModalOpen={setIsLoginModalOpen}
                            setIsRegisterModalOpen={setIsRegisterModalOpen}
                            IsMailSentOpen={isMailSentOpen}
                            setIsMailSentOpen={setIsMailSentOpen}
                            IsRegisterModalOpen={isRegisterModalOpen}
                            openSentMailModal={openSentMailModal}
                        />

                        {/* Mail Sent Successfully Modal */}
                        <MailSentSucessfully
                            IsMailSentOpen={isMailSentOpen}
                            OnHide={() => setIsMailSentOpen(false)}
                            IsLoginModalOpen={() => setIsLoginModalOpen(true)}
                        />
                    </>
                )
            }
        </>
    )
}

export default ProductDetailCard