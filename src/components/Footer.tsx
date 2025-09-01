const Footer = () => {
  const About = [
    "Contact Us",
    "About Us",
    "Careers",
    "Press",
    "Corporate Information",
  ];
  const Help = ["Payments", "Shipping", "Cancellation & Returns", "FAQ"];
  const GroupCompanies = ["Myntra", "ClearTrip", "Shopsy"];
  const ConsumerPolicy = ["Terms Of Use", "Security", "Privacy", "Sitemap"];

  const sectionData = [
    { title: "About", items: About },
    { title: "Help", items: Help },
    { title: "Group Companies", items: GroupCompanies },
    { title: "Consumer Policy", items: ConsumerPolicy },
  ];

  return (
    <div className="w-full bg-black py-10 px-8">
      <div className="flex flex-wrap justify-between">
        {sectionData.map((section, index) => (
          <div key={index} className="flex flex-col gap-3 mb-6">
            <h1 className="text-white font-semibold text-lg">
              {section.title}
            </h1>
            {section.items.map((item, i) => (
              <p
                key={i}
                className="text-white text-sm hover:underline cursor-pointer"
              >
                {item}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Footer;
