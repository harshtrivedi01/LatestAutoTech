"use client";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import api from "../../lib/axiosInstance";

export default function BookingDetailspage() {
  const { t } = useTranslation();
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  const getSafeValue = (val) => (val && val !== "undefined" ? val : "-");

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    async function fetchOrderDetails() {
      try {
        const formData = new FormData();
        formData.append("type", "pooja_booking_detail");
        formData.append("booking_id", id);

        const response = await api.post("/puja", formData);

        if (response.data.status === "1") {
          setOrder(response.data.data);
        } else {
          setOrder(null);
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
        setOrder(null);
      } finally {
        setLoading(false);
      }
    }

    fetchOrderDetails();
  }, [id]);

 
  const statusLabelMap = {
    pending: t("Pending"),
    confirmed: t("Confirmed"),
    success: t("Success"),
    cancelled: t("Cancelled"),
  };



  const stepStatus = [
    {
      label: t("Your Pooja booking has been confirmed"),
      condition: !!order?.certificate_url,
      content: order?.certificate_url ? (
        <button
          className="text-blue-600 underline"
          onClick={() => setShowCertificateModal(true)}
        >
          {t("View Certificate")}
        </button>
      ) : (
        <p className="text-gray-500">{t("Pending")}</p>
      ),
    },
    {
      label: t("Your Pooja has successsfully conducted by PunuyaSetu on"),
      condition: !!order?.booking_date,
      content: <p>{order?.booking_date}</p>,
    },
    {
      label: t("Your Pooja has successsfully conducted by PunuyaSetu at"),
      condition: !!order?.booking_time,
      content: <p>{order?.booking_time}</p>,
    },
    {
      label: t("WATCH POOJA VIDEO"),
      condition: !!order?.video_path,
      content: order?.video_path ? (
        <video controls width="100%" height="50% "className="rounded-md shadow mt-2 h-80 w-80">
          <source src={order.video_path} type="video/mp4" />
          {t("Your browser does not support the video tag.")}
        </video>
      ) : (
        <p className="text-gray-500">{t("Pending")}</p>
      ),
    },
  ];
  
  const completedSteps = stepStatus.filter((step) => step.condition);
  
  const currentStepIndex = stepStatus.indexOf(order?.booking_status);

  if (!order) return <div className="text-center py-10 text-red-500">No booking data found.</div>;
  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (!order) {
    return <div className="text-center py-10 text-red-500">No booking data found.</div>;
  }
  const toggleAccordion = (index) => {
    setOrder((prevData) =>
      prevData.map((faq, i) => ({
        ...faq,
        isOpen: i === index ? !faq.isOpen : false, // Close other accordions
      }))
    );
  };

  if (!order) return <p className="p-4">Loading...</p>;

  return (
    <div className="bg-white">
      <div className="py-10 text-start px-5 bg-[#FFEEE2]">
        <h2 className="container max-w-7xl text-xl sm:text-2xl md:text-3xl font-bold">
          {t("PoojaBooking")}
        </h2>
      </div>

      <div className="container max-w-7xl mb-5">
        <p className="p-4 mt-2 text-xl font-semibold">Pooja and Participant's Details</p>

        {/* Booking Details */}
        <div className="flex flex-wrap md:flex-nowrap gap-4 mt-2 shadow-lg border rounded-lg p-4">
          {/* Image */}
          <div className="w-full md:w-5/12 flex justify-center">
            <img
              src={order.puja_image || "/images/poojabox.png"}
              alt="Pooja Image"
              onError={(e) => (e.target.src = "/images/logo.png")}
              className="w-full max-w-sm h-[250px] border-2 border-white object-contain rounded-lg"
            />
          </div>

          {/* Info */}
          <div className="w-full md:w-7/12">
            <h2 className="text-xl font-bold text-black my-2 border-b">
              {order.puja_name} ({getSafeValue(order.booking_date)})
            </h2>
            {order.create_date && (
              <p className="text-gray-600 text-sm">
                <span className="font-semibold">{t("Ordertimedate")}</span> {order.create_date}
              </p>
            )}
            {order.package_name && (
              <p className="text-red-600 font-bold text-lg mt-2">{order.package_name}</p>
            )}
            {order.amount && (
              <p className="text-red-600 my-2 font-semibold text-xl">
                {t("AmountRs")} {order.amount}/-
              </p>
            )}

            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold">{t("Payment")}:</h1>
              <span
                className={`text-lg uppercase font-medium ${
                  order.payment_status === "success"
                    ? "text-green-600"
                    : order.payment_status === "failed"
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}
              >
                {getSafeValue(order.payment_status)}
              </span>
            </div>

            <div className="flex items-center gap-2 mt-1">
              <h1 className="text-lg font-semibold">{t("Bookingstatus")}:</h1>
              <span
                className={`text-lg uppercase font-medium ${
                  order.booking_status === "completed"
                    ? "text-green-600"
                    : order.booking_status === "cancelled"
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}
              >
                {statusLabelMap[order.booking_status] || order.booking_status}
              </span>
            </div>
          </div>
        </div>

   {/* Always show Booking Status at the top */}
<div className="py-4">
  <p className="text-xl font-semibold mb-2">{t("Pooja Updates")}</p>

  <div className="shadow-lg border rounded-lg p-4 bg-white min-w-[320px]">
    <div className="mb-4">
      <span className="font-semibold">{t("Booking Status")}: </span>
      <span
        className={`font-medium uppercase ${
          order.booking_status === "completed"
            ? "text-green-600"
            : order.booking_status === "cancelled"
            ? "text-red-600"
            : "text-yellow-600"
        }`}
      >
        {statusLabelMap[order.booking_status] || order.booking_status}
      </span>
    </div>

    {/* Only show progress steps if status is valid and steps exist */}
    {stepStatus.some((step) => step.condition) &&
    order.booking_status !== "cancelled" &&
    order.booking_status !== "pending" ? (
      <div className="flex flex-col gap-6 border-l-2 border-gray-300 pl-6 relative">
        {stepStatus.map(
          (step, index) =>
            step.condition && (
              <div key={index} className="relative pb-2">
                {/* Progress Dot */}
                <div
                  className={`w-4 h-4 rounded-full absolute -left-[33px] ${
                    step.condition ? "bg-green-500" : "bg-gray-300"
                  }`}
                ></div>

                {/* Step Content */}
                <p className="font-semibold">{step.label}</p>
                <div className="text-sm text-gray-700">{step.content}</div>
              </div>
            )
        )}
      </div>
    ) : (
      <p className="text-sm text-gray-500">{t("Pooja updates not available for this booking status.")}</p>
    )}
  </div>

  {/* Certificate Modal */}
  {showCertificateModal && (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full relative">
        <button
          className="absolute top-2 right-2 text-red-600 font-bold text-lg"
          onClick={() => setShowCertificateModal(false)}
        >
          ×
        </button>
        <h3 className="text-lg font-semibold mb-4">{t("Certificate")}</h3>
        <img
          src={order?.certificate_url}
          alt="Certificate"
          className="w-full max-h-[80vh] object-contain rounded"
        />
      </div>
    </div>
  )}
</div>


        {/* User Details */}
        {order.user_info && (
          <>
            <p className="p-4 mt-4 text-xl font-semibold">{t("UserDetail")}</p>
            <div className="shadow-lg border rounded-lg p-4 bg-white min-w-[320px]">
              <p className="border-b p-2">
                <span className="font-semibold">{t("Name")}:</span>{" "}
                {getSafeValue(order.user_info.name)}
              </p>
              <p className="p-2">
                <span className="font-semibold">{t("Gotra")}:</span>{" "}
                {getSafeValue(order.user_info.gotra)}
              </p>
            </div>
          </>
        )}

        {/* Participants */}
        {order.members?.length > 0 && (
          <>
            <p className="p-4 mt-4 text-xl font-semibold">
              {t("MembersParticipatinginPooja")}
            </p>
            <div className="shadow-lg border rounded-lg p-4 bg-white min-w-[320px]">
              {order.members.map((member, index) => (
                <div key={index} className="border-b p-2 last:border-none">
                  <p className="border-b p-2">
                    <span className="font-semibold">{t("Member")}:</span>{" "}
                    {getSafeValue(member.name)}
                  </p>
                  <p className="p-2">
                    <span className="font-semibold">{t("Gotra")}:</span>{" "}
                    {getSafeValue(member.gotra)}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}


    
      </div>
      <div className="faq p-10 bg-[#FFF8F5] ">
      <div className="'container max-w-7xl mx-auto ">
      <div className=" mb-4 overflow-hidden">
        <div className="container">
          <div className="items-center gap-10">
            <div>
              <h2 className="lg:text-2xl md:text-xl text-2xl font-bold mb-">
              {t("FAQ")}
              </h2>
            </div>
          </div>
        </div>
      
      </div>
        <div className="space-y-4 ">
          {order.faq_list?.map((faq, index) => (
            <div key={index} className="border-b border-slate-200 bg-white px-2">
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex justify-between items-center text-start py-5 text-slate-600 text-lg"
              >
                <span>{faq?.question || "No Title"}</span>
                <span
                  className={`text-slate-600 transition-transform duration-300 ${
                    faq.isOpen ? "rotate-45" : ""
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-6 h-6 "
                  >
                    <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
                  </svg>
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  faq.isOpen ? "" : "max-h-0"
                }`}
              >
                <div className="pb-5 text-base text-slate-500"  dangerouslySetInnerHTML={{ __html:( faq?.answer || "No description available.") }}>
                 
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}
