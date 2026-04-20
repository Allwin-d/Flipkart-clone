import { Toaster } from "react-hot-toast";
const Toast = () => {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        className: "bg-gray-900 text-white rounded-lg shadow-lg",
        success: {
          className: "bg-green-500 text-white",
        },
        error: {
          className: "bg-red-500 text-white",
        },
      }}
    />
  );
};

export default Toast;
