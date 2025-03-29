"use client";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import api from "../../lib/axiosInstance";

export default function BookingDetailspage() {
  const { t } = useTranslation();
  const { id } = useParams();
  const [order, setOrder] = useState([]);
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
      label: t("YourPoojabookinghasbeenconfirmed"),
      condition: !!order?.certificate_url,
      content: order?.certificate_url ? (
        <button
          className="text-blue-600 underline"
          onClick={() => setShowCertificateModal(true)}
        >
          {t("ViewCertificate")}
        </button>
      ) : (
        <p className="text-gray-500">{t("Pending")}</p>
      ),
    },
    {
      label: t("YourPoojahassuccesssfullyconductedbyPunuyaSetuon"),
      condition: !!order?.booking_date,
      content: <p>{order?.booking_date}</p>,
    },
    {
      label: t("YourPoojahassuccesssfullyconductedbyPunuyaSetuon"),
      condition: !!order?.booking_time,
      content: <p>{order?.booking_time}</p>,
    },
    {
      label: t("WATCHPOOJAVIDEO"),
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
    setOrder((prevData) => {
      if (!prevData || !Array.isArray(prevData.faq_list)) return { faq_list: [] };
  
      return {
        ...prevData,
        faq_list: prevData.faq_list.map((faq, i) => ({
          ...faq,
          isOpen: i === index ? !faq.isOpen : false, // Close other accordions
        })),
      };
    });
  };
  

  if (!order) return <p className="p-4">Loading...</p>;

  return (
    <div className="bg-white">
      <div className="py-10 text-start px-5 bg-[#FFEEE2]">
        <h2 className="container max-w-7xl text-xl sm:text-2xl md:text-3xl font-bold">
          {t("PoojaBooking")}
        </h2>
      </div>

      <div className="container max-w-7xl mb-5 ">
        <p className="py-4 mt-2 text-xl font-semibold">{t("PoojaandParticipantsDetails")}</p>

        {/* Booking Details */}
        <div className="flex flex-wrap md:flex-nowrap gap-4 mt-2 space-y-4 shadow-lg border rounded-lg px-4">
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
        
Offer water to loard shiva({getSafeValue(order.booking_date)})
            </h2>
            {order.create_date && (
              <p className="text-gray-600 text-sm my-5">
                <span className="font-semibold">{t("Ordertimedate")}</span> {order.create_date}
              </p>
            )}
           
            {order.amount && (
              <p className="text-red-600 my-2 font-semibold text-xl">
                <span className="font-semibold text-black">    {t("AmountRs")} :</span>{" "} {order.amount}/-
              </p>
            )}


<p className="text-gray-600 text-sm my-5">
              For further details please check PunuyaSetu app frequently and keep updated version of app
              </p>


          </div>
        </div>




      
       
    
       


    
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
      <div className="space-y-4">
  {Array.isArray(order.faq_list) && order.faq_list.length > 0 ? (
    order.faq_list.map((faq, index) => (
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
              className="w-6 h-6"
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
          <div
            className="pb-5 text-base text-slate-500"
            dangerouslySetInnerHTML={{
              __html: faq?.answer || "No description available.",
            }}
          ></div>
        </div>
      </div>
    ))
  ) : (
    <p className="text-center text-gray-500">No FAQs available.</p>
  )}
</div>

      </div>
    </div>
    </div>
  );
}
