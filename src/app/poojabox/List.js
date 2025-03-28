import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import api from "../lib/axiosInstance";
import { useTranslation } from "react-i18next";
import { FaTrash } from "react-icons/fa";

export default function List({ pujaData }) {
  // Track pujaData in state to allow updates
   const { t } = useTranslation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [quantities, setQuantities] = useState({}); 
  
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("authToken"));
  }, []);
  const [pujaDataState, setPujaDataState] = useState(pujaData); // For handling state based on props

  function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }
  // Initialize display data
  const [dataToDisplay, setDataToDisplay] = useState(pujaData?.product_list || []);

  // Use effect to handle prop changes
  useEffect(() => {
    setPujaDataState(pujaData); // Update the local state when prop changes
    setDataToDisplay(pujaData?.product_list || []);
  }, [pujaData]); // Dependency array to trigger when `pujaData` changes

  useEffect(() => {
    const initialQuantities = {};
    pujaData?.cart_list?.forEach((item) => {
      initialQuantities[item.product_id] = item.quantity || 1; // Ensure a default of 1
    });
    setQuantities(initialQuantities);
  }, [pujaData]);
  
  

  const updateCartQuantity = async (productId, change) => {
    const product = pujaDataState.product_list.find((item) => item.id === productId);
  
    if (!product || !product.cart_status) {
      toast.error("Item is not in the cart.");
      return;
    }
  
    const currentQuantity = quantities[productId] ?? product.quantity ?? 1;
    const newQuantity = currentQuantity + change;
  
    if (newQuantity < 1) {
      toast.error("Quantity cannot be less than 1");
      return;
    }
  
    if (newQuantity > product.current_stock) {
      toast.error("Cannot exceed available stock");
      return;
    }
  
    setQuantities((prev) => ({
      ...prev,
      [productId]: newQuantity,
    }));
  
    try {
      let formData = new FormData();
      formData.append("type", "update_cart_quantity");
      formData.append(
        "update_detail",
        JSON.stringify([{ product_id: productId, quantity: newQuantity }])
      );
  
      const response = await api.post("/cart", formData);
  
      if (response.status === 200) {
        toast.success(`Quantity updated to ${newQuantity}`);
  
        // Update product quantity in pujaDataState
        setPujaDataState((prevState) => ({
          ...prevState,
          product_list: prevState.product_list.map((item) =>
            item.id === productId ? { ...item, quantity: newQuantity } : item
          ),
        }));
      } else {
        toast.error(response.data?.message || "Failed to update quantity");
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Error updating cart. Please try again.");
    }
  };
  
  
  
  
  

  const handleCartAction = async (id, currentStatus) => {
    try {
      let formData = new FormData();
      formData.append("type", currentStatus ? "remove_cart" : "add_to_cart");
      formData.append("product_id", id);
      formData.append("quantity", "1");

      const response = await api.post("/cart", formData);

      if (response.data.status == 0) {
        toast.error(response.data.message || "Action failed!");
      } else {
        toast.success(response.data.message || (currentStatus ? "Removed from cart!" : "Added to cart!"));

        // Update `pujaDataState` and `dataToDisplay` simultaneously
        const updatedPujaData = {
          ...pujaDataState,
          product_list: pujaDataState.product_list.map((product) =>
            product.id === id ? { ...product, cart_status: !currentStatus } : product
          ),
        };

        // Update both `pujaDataState` and `dataToDisplay`
        setPujaDataState(updatedPujaData);
        setDataToDisplay(updatedPujaData.product_list);
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
      console.error("Error handling cart action:", error);
    }
  };

  return (
    
    <div className="container max-w-7xl  mx-auto  leading-relaxed">
      <Toaster position="top-right" reverseOrder={false} />
      <ul className="grid gap-6 sm:grid-cols-2 justify-center lg:grid-cols-3 p-60">
        {dataToDisplay && Array.isArray(pujaDataState.product_list) && pujaDataState.product_list.length > 0 ? (
          pujaDataState.product_list.map((product) => (
            <li key={product.id}>
              <div className="bg-white rounded-lg">
              <a
  className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4 w-full"
  href={`/poojaboxdetail/${product.id}`}
>
  <img
    className="w-full sm:w-40 h-40 object-fill rounded-lg"
    src={product.image || "/images/logo.png"}
    onError={(e) => (e.target.src = "/images/logo.png")}
    alt="product image"
  />
   <span className="m-2 rounded-full px-2 text-xl font-bold leading-relaxed">
                    {product.name}
                    <p className="mt-3 text-base font-medium text-sm text-black leading-relaxed">
    {product.description ? (
      <span
        dangerouslySetInnerHTML={{
          __html:
            // Decode HTML entities, limit the length, and add ellipsis if necessary
            decodeHtml(product.description).length > 190
              ? decodeHtml(product.description).substring(0, 190) + "..."
              : decodeHtml(product.description),
        }}
      />
    ) : (
      // Display fallback text when description is not available
      ""
    )}
  </p>
                  </span>
</a>

                <div className="mt-4 px-5 pb-5">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, index) => (
                      <svg key={index} aria-hidden="true" className={`h-5 w-5 ${index < Math.round(product.rating_user / 2) ? 'text-yellow-300' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="mr-2 rounded text-yellow-900 px-2.5 py-0.5 text-xs font-semibold">({product.rating_user})</span>
                  </div>
                  <div className="mt-2 mb-5 flex items-center justify-between">
                    <p>
                      <span className="text-3xl font-bold text-slate-900">₹{Math.floor(product.discounted_price)}</span>
                      <span className="text-sm ms-2 text-slate-400 line-through"> {t("MRP")} ₹{product.price}</span>
                      <span className="text-red-700 text-lg ms-3">({Math.floor(product.discount)}% {t("off")})</span>
                    </p>
                  </div>
                   {product.current_stock >=0 ? (
                      <div className="">
                        {isLoggedIn ? (
                       <>
                      {!product.cart_status && (
  <a
    onClick={() => handleCartAction(product.id, product.cart_status)}
    className="flex cursor-pointer items-center justify-center rounded-md bg-[#E5644E] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
    {t("Addtocart")}
  </a>
)}

{/* Show Quantity Counter only if product is in cart */}
{product.cart_status && (
  <div className="mt-3 flex items-center">
    <div className="flex items-center rounded-lg shadow-lg border border-[#E5644E]">
      {/* Decrease Quantity */}
      <button
        className="text-orange-600 text-lg px-3 py-1"
        onClick={() => updateCartQuantity(product.id, -1)}
      >
        -
      </button>

    {/* Display Quantity */}
    <span className="mx-2 text-gray-600">
  {quantities[product.id] > 0 
    ? quantities[product.id] 
    : product.quantity > 0 
    ? product.quantity 
    : 1}
</span>




      {/* Increase Quantity */}
      <button
        className="text-orange-600 text-lg px-3 py-1"
        onClick={() => updateCartQuantity(product.id, 1)}
      >
        +
      </button>
    </div>

    {/* Remove from Cart Button */}
    <FaTrash
      className="ms-5 text-gray-700 cursor-pointer hover:text-red-600"
      onClick={() => handleCartAction(product.id, product.cart_status)}
    />
  </div>
)}

                     </>
                     
                        )
                        : (
                         <a href="/login">
                           <button className="flex w-full items-center justify-center rounded-md bg-[#E5644E] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="mr-2 h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                              />
                            </svg>
                            
                            {t("Addtocart")}</button>
                         </a>
                        )}
                      </div>
                    ) : (
                      <p className="text-red-600 font-bold  items-center justify-center rounded-md px-5 border shadow-xl py-2 text-center text-sm font-medium ">{t("OutofStock")}</p>
                    )}
                  
                </div>
              </div>
            </li>
          ))
        ) : (
          <li>{t("Noproductsavailable")}</li>
        )}
      </ul>
    </div>
  );
}
