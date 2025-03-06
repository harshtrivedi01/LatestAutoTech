"use client";
import { BiSolidPhoneCall } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { useEffect, useState } from "react";
import api from "../lib/axiosInstance";
import DOMPurify from "dompurify";
import toast, { Toaster } from "react-hot-toast";

export default function ContactPage() {
  const [pujaData, setPujaData] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchPujaData();
  }, []);

  const fetchPujaData = async () => {
    try {
      let data = new FormData();
      data.append("type", "contact_page");

      const response = await api.post("/contact", data);
      setPujaData(response.data.data);
    } catch (error) {
      console.error("Error fetching puja data:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }
    if (!formData.message) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fill all required fields correctly.");
      return;
    }

    try {
      let data = new FormData();
      data.append("type", "submit_contact_form");
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("message", formData.message);

      console.log("Submitting form:", Object.fromEntries(data)); // Debugging

      const response = await api.post("/contactstore", data);
      console.log("Response:", response.data);

      if (response.data.status === "1") {
        toast.success("Contact form submitted successfully!");
        setFormData({ name: "", email: "", phone: "", message: "" });
        setErrors({});
      } else {
        toast.error(response.data.message || "Submission failed!");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div style={{ backgroundColor: "#FAFAFA" }}>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="max-w-screen-lg mx-auto p-5 lg:py-20 w-full">
        <div className="text-center mb-5">
          <h1 className="text-3xl font-extrabold mb-5">Contact Us</h1>
          <p className="font-semibold text-gray-400">
            Any question or remarks? Just write us a message!
          </p>
        </div>
        <br />
        <div className="grid grid-cols-1 md:grid-cols-10 rounded-xl shadow bg-white">
          {/* Contact Information Section */}
          <div className="bg-[#E5644E] md:col-span-4 p-10 m-2 rounded-xl text-white">
            <p className="text-xl font-semibold tracking-tight mt-5">Contact Information</p>
            <h3 className="text-sm mt-1 text-gray-300 font-light">Say something to start a live chat!</h3>
            <br />
            <div className="flex items-center mt-5">
              <BiSolidPhoneCall className="text-xl" />
              <span className="text-sm text-light m-4">{pujaData.contact_no}</span>
            </div>
            <div className="flex items-center mt-5">
              <MdEmail className="text-xl" />
              <span className="text-sm text-light m-4">{pujaData.email}</span>
            </div>
            <div className="flex items-center mt-5">
              <FaLocationDot className="text-xl" />
              <span className="text-sm text-light m-4" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(pujaData.address) }}></span>
            </div>
            <br /><br /><br /><br />
        <div className="grid grid-cols-6 g">
        <a rel="noopener noreferrer" href={pujaData.social_links?.twitter} title="Twitter" className="flex items-center p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-twitter-x w-6 h-6" viewBox="0 0 16 16">
  <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
</svg>
					</a>
					<a rel="noopener noreferrer"  href={pujaData.social_links?.instagram} title="Instagram" className="flex items-center p-1">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" className="w-6 h-6 fill-current ">
							<path d="M16 0c-4.349 0-4.891 0.021-6.593 0.093-1.709 0.084-2.865 0.349-3.885 0.745-1.052 0.412-1.948 0.959-2.833 1.849-0.891 0.885-1.443 1.781-1.849 2.833-0.396 1.020-0.661 2.176-0.745 3.885-0.077 1.703-0.093 2.244-0.093 6.593s0.021 4.891 0.093 6.593c0.084 1.704 0.349 2.865 0.745 3.885 0.412 1.052 0.959 1.948 1.849 2.833 0.885 0.891 1.781 1.443 2.833 1.849 1.020 0.391 2.181 0.661 3.885 0.745 1.703 0.077 2.244 0.093 6.593 0.093s4.891-0.021 6.593-0.093c1.704-0.084 2.865-0.355 3.885-0.745 1.052-0.412 1.948-0.959 2.833-1.849 0.891-0.885 1.443-1.776 1.849-2.833 0.391-1.020 0.661-2.181 0.745-3.885 0.077-1.703 0.093-2.244 0.093-6.593s-0.021-4.891-0.093-6.593c-0.084-1.704-0.355-2.871-0.745-3.885-0.412-1.052-0.959-1.948-1.849-2.833-0.885-0.891-1.776-1.443-2.833-1.849-1.020-0.396-2.181-0.661-3.885-0.745-1.703-0.077-2.244-0.093-6.593-0.093zM16 2.88c4.271 0 4.781 0.021 6.469 0.093 1.557 0.073 2.405 0.333 2.968 0.553 0.751 0.291 1.276 0.635 1.844 1.197 0.557 0.557 0.901 1.088 1.192 1.839 0.22 0.563 0.48 1.411 0.553 2.968 0.072 1.688 0.093 2.199 0.093 6.469s-0.021 4.781-0.099 6.469c-0.084 1.557-0.344 2.405-0.563 2.968-0.303 0.751-0.641 1.276-1.199 1.844-0.563 0.557-1.099 0.901-1.844 1.192-0.556 0.22-1.416 0.48-2.979 0.553-1.697 0.072-2.197 0.093-6.479 0.093s-4.781-0.021-6.48-0.099c-1.557-0.084-2.416-0.344-2.979-0.563-0.76-0.303-1.281-0.641-1.839-1.199-0.563-0.563-0.921-1.099-1.197-1.844-0.224-0.556-0.48-1.416-0.563-2.979-0.057-1.677-0.084-2.197-0.084-6.459 0-4.26 0.027-4.781 0.084-6.479 0.083-1.563 0.339-2.421 0.563-2.979 0.276-0.761 0.635-1.281 1.197-1.844 0.557-0.557 1.079-0.917 1.839-1.199 0.563-0.219 1.401-0.479 2.964-0.557 1.697-0.061 2.197-0.083 6.473-0.083zM16 7.787c-4.541 0-8.213 3.677-8.213 8.213 0 4.541 3.677 8.213 8.213 8.213 4.541 0 8.213-3.677 8.213-8.213 0-4.541-3.677-8.213-8.213-8.213zM16 21.333c-2.948 0-5.333-2.385-5.333-5.333s2.385-5.333 5.333-5.333c2.948 0 5.333 2.385 5.333 5.333s-2.385 5.333-5.333 5.333zM26.464 7.459c0 1.063-0.865 1.921-1.923 1.921-1.063 0-1.921-0.859-1.921-1.921 0-1.057 0.864-1.917 1.921-1.917s1.923 0.86 1.923 1.917z"></path>
						</svg>
					</a>
                    <a rel="noopener noreferrer" href={pujaData.social_links?.discord} title="Discord" className="flex items-center p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-discord w-6  h-6" viewBox="0 0 16 16">
  <path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612"/>
</svg>
					</a>
        </div>
          </div>

          {/* Contact Form Section */}
          <form className="md:col-span-6 p-10" onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-500 text-xs mb-2">Name</label>
              <input
                className="appearance-none block w-full border-b-2 py-3 px-4"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <p className="text-red-500">{errors.name}</p>}
            </div>

            <div className="flex flex-wrap mb-6">
              <div className="w-full md:w-1/2 px-3">
                <label className="block text-gray-500 text-xs mb-2">Email</label>
                <input
                  className="appearance-none block w-full border-b-2 py-3 px-4"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <p className="text-red-500">{errors.email}</p>}
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block text-gray-500 text-xs mb-2">
                  Phone number
                </label>
                <input
                  className="appearance-none block w-full border-b-2 py-3 px-4"
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && <p className="text-red-500">{errors.phone}</p>}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-500 text-xs mb-2">Message</label>
              <textarea
                className="appearance-none block w-full border-b-2 py-3 px-4"
                name="message"
                placeholder="Type a Message..."
                value={formData.message}
                onChange={handleChange}
              ></textarea>
              {errors.message && <p className="text-red-500">{errors.message}</p>}
            </div>

            <button
              type="submit"
              className="bg-[#E5644E] text-white px-10 py-2 rounded-2xl shadow-lg"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
