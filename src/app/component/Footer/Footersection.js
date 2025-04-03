"use client"

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";


export default function Footersection() {
	const { t } = useTranslation();
	const [pujaData, setPujaData] = useState(null);
	const [header, setHeader] = useState(null); // Initialize header state

	useEffect(() => {
		if (typeof window !== "undefined") {
			const formData = JSON.parse(localStorage.getItem("formData") || "{}");
			const authToken = localStorage.getItem("authToken");

			const newHeader = {
				language: "en",
				userId: "2",
				user_type: "user",
				Device_id: "upen",
				Longitude: formData.Longitude || "",
				Latitude: formData.Latitude || "",
				Ip_address: formData.Ip_address || "",
				web_token: authToken || "",
			};

			setHeader(newHeader);
			fetchPujaData(newHeader);
		}
	}, []);

	useEffect(() => {
		fetchPujaData();
	}, []);

	const fetchPujaData = async () => {
		try {
			let formData = new FormData();
			formData.append("type", "footer");


			const response = await axios.post(
				"http://13.50.195.64/websiteapi/footer",
				formData,
				{
					headers: header
				}
			);

			console.log("Puja API Response:", response.data);
			setPujaData(response.data.data);

		} catch (error) {
			console.error("Error fetching puja data:", error);
		}
	};

	return (
		<>
			<footer className=" px-4 divide-y text-gray-800 bg-gray-100">
				<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto  py-10 flex flex-col lg:flex-row justify-between space-y-8 lg:space-y-0">
					{/* Logo and Contact Info */}
					<div className="lg:w-1/3 space-y-5">
						<a href="/" className="flex items-center space-x-3">
							<img src="/images/logo.png" alt="logo" className="w-8 h-16" />
							<span className="text-3xl font-semibold">{t("PunyaSetu")}</span>
						</a>
						<div>
							<h1 className="font-bold text-lg">{pujaData?.name || " Satsambhav Technologies Private Limited"}</h1>
							<div className="mt-3 space-y-2">
								<p className="flex items-center">
									<a href={`mailto:${pujaData?.email || "report@punyasetu.com"}`} className="flex items-center text-gray-800 hover:text-orange-600">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-8 h-8 mr-2 bg-orange-600 p-2 rounded-full text-white text-xl sm:mr-2">
											<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
											<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
										</svg>
										<span>{pujaData?.email || "report@punyasetu.com"}</span>
									</a>
								</p>

								<p className="flex items-center">
									<a href={`tel:+91${pujaData?.contact_no}`} className="flex items-center text-gray-800 hover:text-green-600">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-8 h-8 mr-2 bg-green-500 p-2 rounded-full text-white text-xl sm:mr-2">
											<path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
										</svg>
										<span>+91 {pujaData?.contact_no}</span>
									</a>
								</p>


							</div>
						</div>
					</div>

					{/* Footer Links */}
					<div className="grid grid-cols-2 ga lg:w-2/3 lg:grid-cols-3">
						<nav>
							<h6 className="footer-title font-semibold text-lg mb-3">{t("Services")}</h6>
							<ul className="space-y-2">
								<li><Link href="/"> {t("Home")}</Link></li>
								<li><Link href="/about">{t("About")} </Link></li>
								<li><Link href="/service"> {t("Service")} </Link></li>
								<li><Link href="/contact">{t("Contact")} </Link></li>
							</ul>
						</nav>
						<nav>
							<h6 className="footer-title font-semibold text-lg mb-3">{t("Company")}</h6>
							<ul className="space-y-2">
								<li><Link href="/faq">{t("FAQ")}</Link></li>
								<li><Link href="/privacypolicy">{t("PrivacyPolicy")}</Link></li>
								<li><Link href="/terms&conditions">{t("TermsANDConditions")}</Link></li>
							</ul>
						</nav>
						<nav>
							<h6 className="footer-title font-semibold text-lg mb-3">{t("SocialMedia")}</h6>
							<div className="flex  space-x-1">
								<a
									rel="noopener noreferrer" href={pujaData?.social_links.facebook} title="Facebook" className="flex items-center p-1 ref"  target="_blank">
									<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 32 32" className="w-8 h-8 fill-current text-blue-600">
										<path d="M32 16c0-8.839-7.167-16-16-16-8.839 0-16 7.161-16 16 0 7.984 5.849 14.604 13.5 15.803v-11.177h-4.063v-4.625h4.063v-3.527c0-4.009 2.385-6.223 6.041-6.223 1.751 0 3.584 0.312 3.584 0.312v3.937h-2.021c-1.984 0-2.604 1.235-2.604 2.5v3h4.437l-0.713 4.625h-3.724v11.177c7.645-1.199 13.5-7.819 13.5-15.803z"></path>
									</svg>
								</a>
								<a  target="_blank" rel="noopener noreferrer" href={pujaData?.social_links.linkedin} title="linkedin" className="flex items-center p-1">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-linkedin w-8 h-8 text-sky-600" viewBox="0 0 16 16">
										<path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
									</svg>
								</a>
								<a  target="_blank" rel="noopener noreferrer" href={pujaData?.social_links.twitter} title="Twitter" className="flex items-center p-1">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-twitter-x w-8 h-8" viewBox="0 0 16 16">
										<path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
									</svg>
								</a>
								<a  target="_blank" rel="noopener noreferrer" href={pujaData?.social_links.instagram} title="Instagram" className="flex items-center p-1">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" className="w-8 h-8 fill-current">
										<path d="M16 0c-4.349 0-4.891 0.021-6.593 0.093-1.709 0.084-2.865 0.349-3.885 0.745-1.052 0.412-1.948 0.959-2.833 1.849-0.891 0.885-1.443 1.781-1.849 2.833-0.396 1.020-0.661 2.176-0.745 3.885-0.077 1.703-0.093 2.244-0.093 6.593s0.021 4.891 0.093 6.593c0.084 1.704 0.349 2.865 0.745 3.885 0.412 1.052 0.959 1.948 1.849 2.833 0.885 0.891 1.781 1.443 2.833 1.849 1.020 0.391 2.181 0.661 3.885 0.745 1.703 0.077 2.244 0.093 6.593 0.093s4.891-0.021 6.593-0.093c1.704-0.084 2.865-0.355 3.885-0.745 1.052-0.412 1.948-0.959 2.833-1.849 0.891-0.885 1.443-1.776 1.849-2.833 0.391-1.020 0.661-2.181 0.745-3.885 0.077-1.703 0.093-2.244 0.093-6.593s-0.021-4.891-0.093-6.593c-0.084-1.704-0.355-2.871-0.745-3.885-0.412-1.052-0.959-1.948-1.849-2.833-0.885-0.891-1.776-1.443-2.833-1.849-1.020-0.396-2.181-0.661-3.885-0.745-1.703-0.077-2.244-0.093-6.593-0.093zM16 2.88c4.271 0 4.781 0.021 6.469 0.093 1.557 0.073 2.405 0.333 2.968 0.553 0.751 0.291 1.276 0.635 1.844 1.197 0.557 0.557 0.901 1.088 1.192 1.839 0.22 0.563 0.48 1.411 0.553 2.968 0.072 1.688 0.093 2.199 0.093 6.469s-0.021 4.781-0.099 6.469c-0.084 1.557-0.344 2.405-0.563 2.968-0.303 0.751-0.641 1.276-1.199 1.844-0.563 0.557-1.099 0.901-1.844 1.192-0.556 0.22-1.416 0.48-2.979 0.553-1.697 0.072-2.197 0.093-6.479 0.093s-4.781-0.021-6.48-0.099c-1.557-0.084-2.416-0.344-2.979-0.563-0.76-0.303-1.281-0.641-1.839-1.199-0.563-0.563-0.921-1.099-1.197-1.844-0.224-0.556-0.48-1.416-0.563-2.979-0.057-1.677-0.084-2.197-0.084-6.459 0-4.26 0.027-4.781 0.084-6.479 0.083-1.563 0.339-2.421 0.563-2.979 0.276-0.761 0.635-1.281 1.197-1.844 0.557-0.557 1.079-0.917 1.839-1.199 0.563-0.219 1.401-0.479 2.964-0.557 1.697-0.061 2.197-0.083 6.473-0.083zM16 7.787c-4.541 0-8.213 3.677-8.213 8.213 0 4.541 3.677 8.213 8.213 8.213 4.541 0 8.213-3.677 8.213-8.213 0-4.541-3.677-8.213-8.213-8.213zM16 21.333c-2.948 0-5.333-2.385-5.333-5.333s2.385-5.333 5.333-5.333c2.948 0 5.333 2.385 5.333 5.333s-2.385 5.333-5.333 5.333zM26.464 7.459c0 1.063-0.865 1.921-1.923 1.921-1.063 0-1.921-0.859-1.921-1.921 0-1.057 0.864-1.917 1.921-1.917s1.923 0.86 1.923 1.917z"></path>
									</svg>
								</a>
								<a  target="_blank" rel="noopener noreferrer" href={pujaData?.social_links.youtube} title="youtube" className="flex items-center p-1">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-10 h-10 fill-current text-red-600" viewBox="0 0 16 16">
										<path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z" />
									</svg>
								</a>
							</div>
						</nav>
					</div>
				</div>
				<div className="py-6 text-[16px] border-t border-[#FA8128] text-center text-gray-600">{t("PunyaSetuIncAllrightsreserved")}</div>
			</footer>



		</>
	)
}