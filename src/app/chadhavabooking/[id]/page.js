"use client";
import { useParams, useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import AuthGuard from "./../../component/AuthGuard";

export default function BookingDetailspage() {
  const { t } = useTranslation();
  const { id } = useParams();
  const searchParams = useSearchParams(); // To get query params
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    // Get booking data from query parameter
    const queryData = searchParams.get("booking");
    if (queryData) {
      setOrder(JSON.parse(decodeURIComponent(queryData)));
    }
    setLoading(false);
  }, [id, searchParams]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!order) return <div className="text-center py-10 text-red-500">No booking data found.</div>;

  return (
  <AuthGuard>

<div className="bg-white ">
      <div className="py-10 text-start px-5 bg-[#FFEEE2]">
        <h2 className="container max-w-7xl text-xl sm:text-2xl md:text-3xl font-bold">
          {t("chadhava")}
        </h2>
      </div>

     

      {/* Items List */}
      <div className="my-6 container max-w-7xl mx-auto ">
      
        <ul className="flex flex-wrap md:flex-nowrap gap-3 mt-2">
  {order.items?.map((item, idx) => (
    <li key={idx} className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto bg-white p-3 rounded-lg shadow">
      <img
        src={item.image || "/images/logo.png"}
        alt={item.name}
        className="w-20 h-20 object-cover rounded-md"
      />
      <div className="text-center space-y-2 sm:text-left">
        <p className="font-semibold">{item.name}</p>
        <p className="text-xs text-gray-600">{t("Qty")}: {item.quantity}</p>
        {/* <p className="text-xs text-green-600">  {t("AmountRs")}: {item.price || t("Free")}/-</p> */}
      </div>
    </li>
  ))}
</ul>

      </div>

       {/* Booking Info */}
       <div className="container max-w-7xl mx-auto flex flex-col md:flex-row my-4  items-center md:items-start  p-4 rounded-md shadow-md">
        
        <div className="w-full md:w-2/3 space-y-3">
          <h3 className="text-xl font-semibold">{order.chadhava_name }</h3>
          <p><strong>{t("OrderDate")}: </strong>{order.created_at}</p>
          <p className="text-green-600"><strong>{t("AmountRs")}:</strong> {order.total_amount || t("Free")}/-</p>
          <div
                className={`rounded-full w-20 px-4 py-1 ${
                  order.payment_status === "success"
                    ? "bg-green-600"
                    : order.payment_status === "pending"
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
              >
                <p className="text-white  text-sm">{order.payment_status}</p>
              </div>
        </div>

       
      </div>

    
    </div>
  </AuthGuard>
  );
}
