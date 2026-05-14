"use client"

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";


export default function Footersection() {
	const { t } = useTranslation();
	const [pujaData, setPujaData] = useState(null);
	

	return (
		<>
			<footer className=" px-4 divide-y text-gray-800 bg-gray-100">
				<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto  py-10 flex flex-col lg:flex-row justify-between space-y-8 lg:space-y-0">
					{/* Logo and Contact Info */}
					<div className="lg:w-1/3 space-y-5">
						{/* <a href="/" className="flex items-center space-x-3">
							<img src="/images/logo.png" alt="logo" className="w-60 h-12" />
					
						</a> */}
						<div>
							<div className="mt-3 space-y-2">
								<p className="flex items-center">
									<a href={`mailto:${pujaData?.email || "report@LatestAutoTech.com"}`} className="flex items-center text-gray-800 hover:text-orange-600">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-8 h-8 mr-2 bg-orange-600 p-2 rounded-full text-white text-xl sm:mr-2">
											<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
											<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
										</svg>
										<span>{pujaData?.email || "report@LatestAutoTech.com"}</span>
									</a>
								</p>

								{/* <p className="flex items-center">
									<a href={`tel:+91${pujaData?.contact_no}`} className="flex items-center text-gray-800 hover:text-green-600">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-8 h-8 mr-2 bg-green-500 p-2 rounded-full text-white text-xl sm:mr-2">
											<path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
										</svg>
										<span>+91 {pujaData?.contact_no}</span>
									</a>
								</p> */}


							</div>
						</div>
					</div>

					
				</div>
				<div className="py-6 text-[16px] border-t border-[#FA8128] text-center text-gray-600">{t("LatestAutoTechIncAllrightsreserved")}</div>
			</footer>



		</>
	)
}