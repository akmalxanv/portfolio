import { useTranslation } from "react-i18next";
import { logo } from "../assets";
import { getNavLinks } from "../constants";

const Footer = () => {
  const { t } = useTranslation();
  const navLinks = getNavLinks(t);

  return (
    <footer className="w-full bg-black-200/90 border-t border-white/5 py-8 sm:py-10 mt-6 sm:mt-8 sm:px-16 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
        {/* Left Section */}
        <div className="flex flex-col items-center md:items-start gap-3">
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <img
              src={logo}
              alt="logo"
              className="w-10 h-10 object-contain group-hover:scale-105 transition-transform"
            />
            <span className="text-white text-[18px] font-bold">
              Akmalxanv
            </span>
          </div>
          <p className="text-secondary text-[14px]">
            {t("footer.subtitle")}
          </p>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-center md:items-end gap-4">
          <div className="flex items-center text-[14px]">
            <a
              href="mailto:abubakrakmalkhonov@gmail.com"
              className="text-secondary hover:text-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#915EFF] rounded px-1"
            >
              abubakrakmalkhonov@gmail.com
            </a>
          </div>

          <nav className="flex flex-wrap justify-center md:justify-end gap-5 text-[14px]">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="text-secondary hover:text-white transition-colors cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#915EFF] rounded px-1"
                onClick={(e) => {
                  if (!link.id) {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
              >
                {link.title}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="w-full h-[1px] bg-white/10 my-6" />

      <p className="text-secondary text-[13px] text-center">
        &copy; {new Date().getFullYear()} Abubakr Akmalkhonov. {t("footer.rights")}
      </p>
    </footer>
  );
};

export default Footer;
