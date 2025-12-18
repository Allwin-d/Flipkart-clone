const Footer = () => {
  const About = [
    "Contact Us",
    "About us ",
    "Careers",
    "Flipkart Stories",
    "Press",
    "Corporate Information",
  ];
  const groupCompanies = ["Myntra", "ClearTrip", "Shopsy"];
  const Help = ["Payments", "Shipping", "Cancellation & Returns", "FAQ"];
  const ConsumerPolicy = [
    "Cancellation & Returns",
    "Terms of Use",
    "Security",
    "Sitemap",
    "Grievance Redressal",
    "ERP Compilance",
  ];

  return (
    <div className="flex flex-row items-center justify-around bg-black text-white p-14 mt-8">
      {/* This is for About Section */}

      <div className="flex flex-col space-y-3">
        <p className="text-gray-500">About </p>
        {About.map((item) => (
          <p className="cursor-pointer">{item}</p>
        ))}
      </div>

      {/* This is for the GroupCompanies Section */}
      <div className="flex flex-col space-y-3">
        <p className="text-gray-500">Group Companies</p>
        {groupCompanies.map((item) => (
          <p className="cursor-pointer">{item}</p>
        ))}
      </div>

      {/* This is for the help Section */}
      <div className="flex flex-col space-y-3">
        <p className="text-gray-500">Help</p>
        {Help.map((item) => (
          <p className="cursor-pointer">{item}</p>
        ))}
      </div>

      {/* This is for the Consumer Policy Section */}
      <div className="flex flex-col space-y-3">
        <p className="text-gray-500">Consumer Policy </p>
        {ConsumerPolicy.map((item) => (
          <p className="cursor-pointer">{item}</p>
        ))}
      </div>
    </div>
  );
};

export default Footer;
