const Footer = () => {
  const About = [
    "Contact Us",
    "About Us",
    "Careers",
    "Flipkart Stories",
    "Press",
    "Corporate Information",
  ];

  const GroupCompanies = ["Myntra", "ClearTrip", "Shopsy"];

  const Help = ["Payments", "Shipping", "Cancellation & Returns"];

  const ConsumerPolicy = [
    "Cancellation & Returns",
    "Terms of Use",
    "Security",
    "Privacy",
    "Sitemap",
    "Grievance Redressal",
    "ERP Compliance",
  ];

  return (
    <footer className="bg-black text-white p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* About Section */}
        <div>
          <p className="text-gray-400 font-semibold mb-2">ABOUT</p>
          <ul className="space-y-1">
            {About.map((item, index) => (
              <li key={index} className="hover:text-gray-300 cursor-pointer">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Group Companies Section */}
        <div>
          <p className="text-gray-400 font-semibold mb-2">GROUP COMPANIES</p>
          <ul className="space-y-1">
            {GroupCompanies.map((item, index) => (
              <li key={index} className="hover:text-gray-300 cursor-pointer">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Help Section */}
        <div>
          <p className="text-gray-400 font-semibold mb-2">HELP</p>
          <ul className="space-y-1">
            {Help.map((item, index) => (
              <li key={index} className="hover:text-gray-300 cursor-pointer">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Consumer Policy Section */}
        <div>
          <p className="text-gray-400 font-semibold mb-2">CONSUMER POLICY</p>
          <ul className="space-y-1">
            {ConsumerPolicy.map((item, index) => (
              <li key={index} className="hover:text-gray-300 cursor-pointer">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
