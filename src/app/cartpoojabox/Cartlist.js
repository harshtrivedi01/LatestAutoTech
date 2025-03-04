import { FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation"; // Use Next.js router for navigation

export default function Cartlist({ handleNextStep, list, updateCartQuantity, quantities, handleCartAction }) {
  const router = useRouter();
  const cartItems = list?.cart_list || [];
  const subtotal = cartItems.reduce(
    (acc, item) => acc + Number(item.discounted_price) * item.quantity,
    0
  );

  // If cart is empty
  if (subtotal === 0 || cartItems.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-semibold text-gray-700">Your Cart is Empty</h2>
        <p className="text-gray-500 mt-2">Looks like you haven't added anything yet.</p>
        <button
          className="mt-5 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg"
          onClick={() => router.push("/")} // Redirect to home page
        >
          Go to Home
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="md:w-2/3">
        {cartItems.map((item) => (
          <div key={item.id} className="w-full my-5">
            <div className="bg-white p-4 rounded-lg border shadow-xl">
              <div className="flex items-start gap-4">
                <img src={item.image || "https://www.punyasetu.com/assets/images/logo.png"} alt={item.product_name} 
                className="rounded-lg object-contain h-40 w-40" 
                onError={(e) => (e.target.src = "https://www.punyasetu.com/assets/images/logo.png")}/>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 text-lg">{item.product_name}</h3>
                  <p className="text-gray-500 text-lg mt-1">Special discounted price for you!</p>

                  <p>
                    <span className="text-3xl font-bold text-slate-900">
                      ₹{Math.floor(item.discounted_price)}
                    </span>
                    <span className="text-sm ms-2 text-slate-400 line-through">
                      M.R.P ₹{Math.floor(item.price)}
                    </span>
                    <span className="text-red-700 text-lg ms-3">
                      ({Math.floor(item.discount)}% off)
                    </span>
                  </p>
                  
                  <div className="mt-3 flex items-center">
                    <div className="flex items-center rounded-lg shadow-lg border border-orange-400">
                      {/* Decrease Button */}
                      <button
                        className="text-orange-600 text-lg px-3 py-1"
                        onClick={() => updateCartQuantity(item.product_id, -1)}
                        disabled={(quantities[item.product_id] || item.quantity) <= 1}
                      >
                        -
                      </button>

                      <span className="mx-2 text-gray-600">{quantities[item.product_id] || item.quantity}</span>

                      {/* Increase Button */}
                      <button
                        className="text-orange-600 text-lg px-3 py-1"
                        onClick={() => updateCartQuantity(item.product_id, 1)}
                        disabled={(quantities[item.product_id] || item.quantity) >= item.current_stock}
                      >
                        +
                      </button>
                    </div>

                    {/* Remove from cart */}
                    <FaTrash
                      className="ms-5 text-gray-700 cursor-pointer hover:text-red-600"
                      onClick={() => handleCartAction(item.product_id)}
                    />

                    <span className="ml-auto font-bold p-1 m lg:p-3 rounded-lg text-white bg-orange-400">
                     ₹{Math.floor((quantities[item.product_id] || item.quantity) * item.discounted_price)}
                    </span>
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
          <h3 className="font-semibold text-gray-800 text-xl mb-3">SubTotal</h3>
          <div className="flex justify-between mb-4">
            <span className="text-gray-600 text-lg">Total</span>
            <span className="text-gray-800 font-semibold text-lg">₹{Math.floor(subtotal)}</span>
          </div>
          <a href="/cartaddresspoojabox">
          <button
            className="w-full common-btn text-white font-semibold py-2 rounded-lg"
            // onClick={handleNextStep}
          >
            Checkout
          </button>
          </a>
        </div>
      </div>
    </div>
  );
}
