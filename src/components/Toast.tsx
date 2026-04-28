import { Toaster } from "react-hot-toast";

const Toast = () => {
  return (
    <Toaster
      position="top-right"
      gutter={12}
      containerStyle={{
        top: 110, // 👈 this replaces mt-20 (80px ≈ mt-20)
        right: 20,
      }}
      toastOptions={{
        duration: 3000,
        style: {
          background: "#1f2937",
          color: "#fff",
          borderRadius: "12px",
          padding: "12px 16px",
          fontSize: "14px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
        },
        success: {
          style: {
            background: "#16a34a",
          },
        },
        error: {
          style: {
            background: "#dc2626",
          },
        },
      }}
    />
  );
};

export default Toast;
