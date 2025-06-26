"use client"
import LoginModal from "@/components/Auth/LoginModal"
import { userSignUpData } from "@/redux/reuducer/authSlice"
import { saveOfferData } from "@/redux/reuducer/offerSlice"
import { extractYear, isLogin, placeholderImage, t } from "@/utils"
import { itemOfferApi } from "@/utils/api"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"
import { BiPhoneCall } from "react-icons/bi"
import { FaArrowRight } from "react-icons/fa6"
import { IoMdStar } from "react-icons/io"
import { IoChatboxEllipsesOutline, IoTicket } from "react-icons/io5"
import { MdVerifiedUser } from "react-icons/md"
import { useSelector } from "react-redux"
// import Swal from "sweetalert2"
import MailSentSucessfully from "@/components/Auth/MailSentSucessfully.jsx"
import AppDownloadModal from "@/components/Home/app-download-modal"

const SellerCardInProdDet = ({ productData, systemSettingsData }) => {
  const router = useRouter()
  const userData = productData && productData?.user
  const placeholder_image = systemSettingsData?.data?.data?.placeholder_image
  const [IsStartingChat, setIsStartingChat] = useState(false)
  const loggedInUser = useSelector(userSignUpData)
  const loggedInUserId = loggedInUser?.id
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)
  const [isMailSentOpen, setIsMailSentOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)

  const memberSinceYear = userData?.created_at ? extractYear(userData.created_at) : ""

  const openSentMailModal = () => {
    setIsLoginModalOpen(false)
    setIsMailSentOpen(true)
  }

  const offerData = {
    itemPrice: productData?.price,
    itemId: productData?.id,
  }

  const handleChat = async () => {
    if (!isLogin()) {
      setIsLoginModalOpen(true)
      return
    }

    if (!productData?.is_already_offered) {
      try {
        setIsStartingChat(true)
        const response = await itemOfferApi.offer({
          item_id: offerData.itemId,
        })
        const { data } = response.data
        const modifiedData = {
          ...data,
          tab: "buying",
        }
        saveOfferData(modifiedData)
      } catch (error) {
        toast.error(t("unableToStartChat"))
        console.log(error)
      }
    } else {
      setIsStartingChat(true)
      const offer = productData.item_offers.find((item) => loggedInUserId === item?.buyer_id)
      const offerAmount = offer?.amount
      const offerId = offer?.id

      const selectedChat = {
        amount: offerAmount,
        id: offerId,
        item: {
          status: productData?.status,
          price: productData?.price,
          image: productData?.image,
          name: productData?.name,
          review: null,
        },
        user_blocked: false,
        item_id: productData?.id,
        seller: {
          profile: productData?.user?.profile,
          name: productData?.user?.name,
          id: productData?.user?.id,
        },
        tab: "buying",
      }
      saveOfferData(selectedChat)
    }
    router.push("/chat")
  }

  return (
    <div className="user_profile_card card">
      {(userData?.is_verified === 1 || memberSinceYear) && (
        <div className="seller_verified_cont">
          {userData?.is_verified === 1 && (
            <div className="verfied_cont">
              <MdVerifiedUser size={16} />
              <p className="verified_text">{t("verified")}</p>
            </div>
          )}
          {memberSinceYear && (
            <p className="member_since">
              {t("memberSince")}: {memberSinceYear}
            </p>
          )}
        </div>
      )}
      <Link href={`/seller/${productData?.user_id}`} className="card-body">
        <div className="profile_sec_Cont">
          <div className="profile_sec">
            <Image
              loading="lazy"
              src={userData?.profile !== null ? userData?.profile : placeholder_image}
              alt="profile"
              className="profImage"
              width={80}
              height={80}
              onErrorCapture={placeholderImage}
            />
            <div className="user_details">
              <span className="user_name" title={userData?.name}>
                {userData?.name}
              </span>
              <div className="seller_Rating_cont">
                {productData?.user?.reviews_count > 0 && productData?.user?.average_rating && (
                  <>
                    <IoMdStar size={16} />
                    <p className="seller_rating">
                      {Math.round(productData?.user?.average_rating)} | {productData?.user?.reviews_count}{" "}
                      {t("ratings")}
                    </p>
                  </>
                )}
              </div>
              {productData?.user?.show_personal_details === 1 && productData?.user?.email && (
                <a href={`mailto:${productData?.user?.email}`} className="seller_rating">
                  {productData?.user?.email}
                </a>
              )}
            </div>
          </div>
          <FaArrowRight size={24} className="arrow_right" />
        </div>
      </Link>
      <div className="card-footer">
        <button disabled={IsStartingChat} className="chatBtn" onClick={handleChat}>
          <span>
            <IoChatboxEllipsesOutline size={20} />
          </span>
          {IsStartingChat ? <span>{t("startingChat")}</span> : <span>{t("startChat")}</span>}
        </button>
        {productData?.user?.show_personal_details === 1 && productData?.user?.mobile && (
          <button
            className="chatBtn"
            onClick={(e) => {
              if (!isLogin()) {
                e.preventDefault()
                setIsLoginModalOpen(true)
                return
              }
              window.location.href = `tel:${productData?.user?.mobile}`
            }}
          >
            <BiPhoneCall size={21} />
            <span>{t("call")}</span>
          </button>
        )}

        {productData?.event_id !== null && (
          <button className="chatBtn" onClick={() => setIsModalOpen(true)}>
            <span>
              <IoTicket size={20} />
            </span>
            <span>{"Buy Ticket"}</span>
          </button>
        )}
      </div>
      {isLoginModalOpen && (
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
      )}
      <AppDownloadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedEvent?.title ? `Download app to view "${selectedEvent.title}"` : "Get the full experience"}
      />
    </div>
  )
}

export default SellerCardInProdDet
