import { Toaster, toast } from "react-hot-toast";

const ToastExample = () => {
  const showToast = () => {
    toast.success("This is a success message!", {
      duration: 3000,
      position: "top-right",
    });
  };

//   **for error and Normal message**

//   toast.success("Success!") → Green success message
//   toast.error("Error occurred!") → Red error message
//   toast("Normal message") → Default toast
//   position: "top-right" → Change to "top-left", "bottom-right", etc.

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <Toaster />
      <button
        onClick={showToast}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
      >
        Show Toast
      </button>
    </div>
  );
};

export default ToastExample;
