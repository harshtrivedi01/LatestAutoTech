import { FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation"; // Use Next.js router for navigation
import SliderTwo from "../poojaboxdetail/SliderTwo";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
export default function Cartlist({ handleNextStep, list, updateCartQuantity, quantities, handleCartAction }) {
  const { t } = useTranslation();
  const router = useRouter();
  const cartItems = list?.cart_list || [];
  
  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (acc, item) => acc + (quantities[item.product_id] || item.quantity) * item.discounted_price,
    0
  );

  // Calculate total shipping cost
  const totalShippingCost = cartItems.reduce(
    (acc, item) => acc + parseFloat(item.shipping_cost || 0), 
    0
  );

  // Calculate final total
  const finalTotal = subtotal + totalShippingCost;

  if (subtotal === 0 || cartItems.length === 0) {
    return (
      <div className="text-center min-h-screen py-10">
        <h2 className="text-2xl font-semibold text-gray-700">{t("YourCartisEmpty")}</h2>
        <p className="text-gray-500 mt-2">{t("Lookslikeyouhaventaddedanythingyet")}</p>
        <button
          className="mt-5 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg"
          onClick={() => router.push("/")}
        >
        {t("GotoHome")}
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col  md:flex-row gap-6  sm:px-6 md:px-10  py-6">
      <div className="w-full md:w-2/3">
  {cartItems.map((item) => (
    <div key={item.id} className="w-full">
      <div className="bg-white p-4 rounded-lg border shadow-xl mb-3">
        <div className="flex flex-col sm:flex-row items-start gap-5">
          {/* Image Section */}
          <div className="w-full sm:w-1/3 flex justify-center">
            <img 
              src={item.image || "/images/logo.png"} 
              alt={item.product_name} 
              className="rounded-lg object-contain w-full sm:w-40 h-auto sm:h-40"
              onError={(e) => (e.target.src = "/images/logo.png")}
            />
          </div>

          {/* Content Section */}
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800 text-base sm:text-lg">{item.product_name}</h3>
            <p className="text-gray-500 text-sm sm:text-base my-1" dangerouslySetInnerHTML={{ 
              __html: (item.description ? item.description.split(" ").slice(0, 20).join(" ") + "..." : "Special discounted price for you!") 
            }}></p>

            <p>
              <span className="text-2xl sm:text-3xl font-bold text-slate-900">₹{Math.floor(item.discounted_price)}</span>
              <span className="text-xs sm:text-sm ms-2 text-slate-400 line-through">{t("MRP")} ₹{Math.floor(item.price)}</span>
              <span className="text-red-700 text-sm sm:text-lg ms-3">({Math.floor(item.discount)}% {t("off")})</span>
            </p>

            {/* Quantity & Actions Section */}
            <div className="mt-3 flex items-center">
                      <div className="flex items-center rounded-lg shadow-lg border border-orange-400">
                        <button
                          className="text-orange-600 text-lg px-3 py-1"
                          onClick={() => {
                            if ((quantities[item.product_id] || item.quantity) <= 1) {
                              toast.error("Quantity cannot be less than 1");
                              return;
                            }
                            updateCartQuantity(item.product_id, -1);
                          }}
                        >
                          -
                        </button>

                        <span className="mx-2 text-gray-600">{quantities[item.product_id] || item.quantity}</span>

                        <button
                          className="text-orange-600 text-lg px-3 py-1"
                          onClick={() => updateCartQuantity(item.product_id, 1)}
                          disabled={(quantities[item.product_id] || item.quantity) >= item.current_stock}
                        >
                          +
                        </button>
                      </div>

                      <FaTrash
                        className="mx-3 text-gray-700 cursor-pointer hover:text-red-600"
                        onClick={() => handleCartAction(item.product_id)}
                      />

                      {/* <span className="ml-auto font-bold p-1 lg:p-3 rounded-lg text-white bg-orange-400">
                        ₹{Math.floor((quantities[item.product_id] || item.quantity) * item.discounted_price)}
                      </span> */}
                    </div>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>


        {/* Right Section */}
        <div className="w-full md:w-1/3">
          <div className="bg-white p-6 rounded-lg shadow border border-orange-600">
            <h3 className="font-semibold text-gray-800 text-xl mb-3 border-b border-orange-500 pb-1">{t("OrderSummary")}</h3>
            
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between mb-2">
                <span className="text-gray-600">{item.product_name} (x{quantities[item.product_id] || item.quantity})</span>
                <span className="text-gray-800 font-semibold">₹{Math.floor((quantities[item.product_id] || item.quantity) * item.discounted_price)}</span>
              </div>
            ))}

            {/* Shipping Cost */}
            <div className="flex justify-between mt-3">
              <span className="text-gray-600">{t("ShippingCharges")} </span>
              <span className="text-gray-800 font-semibold">₹{Math.floor(totalShippingCost)}</span>
            </div>

            {/* Subtotal */}
            <div className="flex justify-between border-t py-2 mt-3">
              <span className="text-gray-600 text-lg font-semibold">{t("Subtotal")}</span>
              <span className="text-gray-800 font-semibold text-lg">₹{Math.floor(subtotal)}</span>
            </div>

            {/* Total Amount */}
            <div className="flex justify-between border-t py-2 mt-3">
              <span className="text-gray-600 text-lg font-semibold">{t("Total")}</span>
              <span className="text-gray-800 font-bold text-lg">₹{Math.floor(finalTotal)}</span>
            </div>

            <a href="/cartaddresspoojabox">
              <button className="w-full common-btn text-white font-semibold py-2 rounded-lg">
              {t("Checkout")}
              </button>
            </a>
          </div>
        </div>
      </div>
     
    </>
  );
}
