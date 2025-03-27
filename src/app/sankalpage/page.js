"use client";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import AuthGuard from "../component/AuthGuard";
import Testimonials from "../poojadetail/Testimonials";
import Form from "./Form";

export const dynamic = "force-dynamic"; // Ensures it's rendered on the server

const Page = () => {
    const { t } = useTranslation();

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <AuthGuard>
            <div className="container max-w-7xl mx-auto p-6">
                <div className="flex flex-col md:flex-row items-center bg-orange-100 rounded-2xl justify-center p-8 md:p-30 mb-4">
                    <div className="flex items-center mb-4 md:mb-0">
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500 text-white">
                            <span className="font-bold">01</span>
                        </div>
                        <p className="ml-2 text-sm font-semibold text-gray-700">
                            {t("SankalpFormFillNameGotraAddress")}
                        </p>
                    </div>
                    <div className="w-10 border-t-2 md:border-t-0 md:border-l-2 border-gray-300 mx-4 my-4 md:my-0"></div>

                    <div className="flex items-center">
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-500">
                            <span className="font-bold">02</span>
                        </div>
                        <p className="ml-2 text-sm font-semibold text-gray-700">
                            {t("PaySelectapaymentmethod")}
                        </p>
                    </div>
                </div>
                <Form />
            </div>
            <Testimonials />
        </AuthGuard>
    );
};

export default Page;
