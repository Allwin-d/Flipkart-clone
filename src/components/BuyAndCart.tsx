const BuyAndCart = () => {
  return (
    <div className="flex items-center justify-around mt-8">
      <button className="bg-orange-500 text-white font-medium text-2xl p-4 rounded-lg hover:bg-orange-700 hover:scale-105 transition duration-200 ">
        Add To Cart
      </button>
      <button className="bg-orange-700 text-white font-medium text-2xl p-4 rounded-lg hover:bg-orange-900 hover:scale-105 transition duration-200">
        Buy Now
      </button>
    </div>
  );
};

export default BuyAndCart;
