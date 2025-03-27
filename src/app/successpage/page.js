"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
export const dynamic = "force-dynamic"; // Ensures it's rendered on the server

import success from "../../../public/success.png";
import AuthGuard from "../component/AuthGuard";
import { useTranslation } from "react-i18next";

export default function Page() {
  const { t } = useTranslation();
  const router = useRouter();
  const [countdown, setCountdown] = useState(3); // Countdown starts from 3 seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const redirectTimeout = setTimeout(() => {
      router.push("/"); // Redirect after 3 seconds
    }, 3000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirectTimeout);
    };
  }, []);

  return (
    <>
      <AuthGuard>
        <div className="bg-white content-center border-y h-screen">
          <div className="bg-white p-6 md:mx-auto">
            <div className="flex justify-center mb-4">
              <Image src={success} alt="success" width={50} height={50} />
            </div>
            <div className="text-center">
              <h3 className="md:text-2xl text-base text-[#27AE60] font-semibold">
                {t("SUCCESSS")}
              </h3>
              <p className="text-[#4A4A4A] my-5 font-semibold">
                {t("SUCCESSdis")}
              </p>
              <p className="text-sm text-gray-600">
                {t("RedirectingIn")} {countdown} {t("Seconds")}...
              </p>
              <div className="py-10 text-center">
                <a
                  href="/"
                  className="px-20 rounded-lg bg-[#27AE60] hover:bg-green-500 text-white font-semibold py-3"
                >
                  {t("BackToHome")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </AuthGuard>
    </>
  );
}
