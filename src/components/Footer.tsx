import { footerSections } from "./Constants";

const Footer = () => {
  return (
    <div className="pt-6 pb-6 px-6 bg-black text-white">
      <div className="flex flex-wrap justify-between">
        {footerSections.map((section) => (
          <div key={section.title} className="flex flex-col gap-2">
            <p className="font-semibold text-gray-400 text-sm">
              {section.title}
            </p>

            {section.links.map((link) => (
              <p
                key={link.label}
                className="text-sm hover:text-gray-300 cursor-pointer"
              >
                {link.label}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Footer;
