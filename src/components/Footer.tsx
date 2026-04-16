import { footerSections } from "./ConstantsArrays";

const Footer = () => {
  return (
    <div className="flex justify-around bg-black text-white py-10">
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
