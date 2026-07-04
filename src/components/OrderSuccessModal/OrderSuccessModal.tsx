import type { OrderSuccessModalProps } from "./orderSuccessModal.types";

const OrderSuccessModal = ({ isOpen, onClose }: OrderSuccessModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-8 w-[420px] text-center shadow-xl">
        <div className="text-6xl mb-4">✅</div>

        <h2 className="text-3xl font-bold mb-2">Order Placed Successfully!</h2>

        <p className="text-gray-600 mb-6">
          Thank you for shopping with us. Your order has been placed
          successfully.
        </p>

        <button
          onClick={onClose}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderSuccessModal;
