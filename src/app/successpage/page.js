"use client"
import Image from "next/image";
export const dynamic = "force-dynamic"; // Ensures it's rendered on the server

import success from "../../../public/success.png"
import AuthGuard from "../component/AuthGuard";
import { useTranslation } from "react-i18next";
export default function page(){
  const { t } = useTranslation();
return(

    <>
      <AuthGuard>
<div className="bg-white content-center border-y h-screen">
  <div className="bg-white p-6  md:mx-auto">
   <div className="flex justify-center mb-4">
   <Image src={success} alt="ttt" width={50} height={50}/>
   </div>
    <div className="text-center">
      <h3 className="md:text-2xl text-base text-[#27AE60] font-semibold text-center ">{t("SUCCESS")}</h3>
      <p className="text-[#4A4A4A] my-5 font-semibold">{t("SUCCESSdis")}</p>
      
      <div className="py-10 text-center">
        <a href="/" className="px-20 rounded-lg bg-[#27AE60] hover:bg-green-500 text-white font-semibold py-3">
        {t("BackToHome")}
        </a>
      </div>
    </div>
  </div>
</div></AuthGuard>
    </>
)

}