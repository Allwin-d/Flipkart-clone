import { footerSections } from "../../Constants/ConstantArrays/constantsArrays";

const Footer = () => {
  return (
    <div className="grid grid-cols-2 gap-8 bg-black px-5 py-8 text-white sm:px-8 md:grid-cols-4 md:justify-items-center md:py-10">
      {footerSections.map((section) => (
        <div key={section.title} className="flex flex-col gap-2">
          <p className="font-semibold">{section.title}</p>

          {section.links.map((link) => (
            <a
              href={link.href}
              key={link.label}
              className="text-sm text-gray-400 cursor-pointer"
            >
              {link.label}
            </a>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Footer;
