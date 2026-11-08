import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

import { styles } from "../styles";
import { getNavLinks } from "../constants";
import { logo, menu, close } from "../assets";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langDropdown, setLangDropdown] = useState(false);

  const navLinks = getNavLinks(t);

  const languages = [
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "ru", label: "Русский", flag: "🇷🇺" },
  ];

  const currentLang =
    languages.find((l) => i18n.language && i18n.language.startsWith(l.code)) ||
    languages[0];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLangDropdown(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${
        styles.paddingX
      } w-full flex items-center py-4 fixed top-0 z-30 transition-all duration-300 ${
        scrolled ? "bg-primary/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#915EFF] rounded-lg p-1"
          onClick={() => {
            setActive("");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <img src={logo} alt="logo" className="w-9 h-9 object-contain transition-transform duration-300 group-hover:scale-105" />
          <p className="text-white text-[18px] font-bold cursor-pointer flex">
            Akmalxanv &nbsp;
            <span className="sm:block hidden text-secondary font-normal group-hover:text-white transition-colors">
              | Portfolio
            </span>
          </p>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex flex-row gap-8 items-center">
          <ul className="list-none flex flex-row gap-8">
            {navLinks.map((nav) => (
              <li
                key={nav.id}
                className={`${
                  active === nav.title ? "text-white" : "text-secondary"
                } hover:text-white text-[16px] font-medium cursor-pointer transition-colors duration-200`}
                onClick={() => setActive(nav.title)}
              >
                <a
                  href={`#${nav.id}`}
                  className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#915EFF] rounded px-1.5 py-0.5"
                >
                  {nav.title}
                </a>
              </li>
            ))}
          </ul>

          {/* Language Switcher Dropdown */}
          <div className="relative ml-2">
            <button
              type="button"
              onClick={() => setLangDropdown(!langDropdown)}
              className="flex items-center gap-2 bg-tertiary/80 hover:bg-tertiary px-3 py-1.5 rounded-xl transition-all border border-white/10 hover:border-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#915EFF]"
              aria-label="Select language"
            >
              <span className="text-[18px]">{currentLang.flag}</span>
              <span className="text-white font-medium uppercase text-[13px] tracking-wide">
                {currentLang.code}
              </span>
              <svg
                className={`w-3.5 h-3.5 text-secondary transition-transform duration-200 ${
                  langDropdown ? "rotate-180 text-white" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <AnimatePresence>
              {langDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-11 right-0 bg-[#1d1836] rounded-xl border border-white/10 p-1.5 min-w-[140px] shadow-2xl z-50 flex flex-col gap-1 overflow-hidden"
                >
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      type="button"
                      onClick={() => changeLanguage(l.code)}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors w-full text-left text-[14px] ${
                        currentLang.code === l.code
                          ? "bg-white/10 text-white font-medium"
                          : "text-secondary hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <span className="text-[18px]">{l.flag}</span>
                      <span>{l.label}</span>
                      {currentLang.code === l.code && (
                        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#915EFF]" />
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex flex-1 justify-end items-center gap-3">
          {/* Quick mobile language pill */}
          <button
            type="button"
            onClick={() => changeLanguage(currentLang.code === "en" ? "ru" : "en")}
            className="flex items-center gap-1.5 bg-tertiary px-2.5 py-1 rounded-lg border border-white/10 text-[12px] text-white"
            aria-label="Toggle language"
          >
            <span>{currentLang.flag}</span>
            <span className="uppercase font-medium">{currentLang.code}</span>
          </button>

          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[26px] h-[26px] object-contain cursor-pointer transition-transform"
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 black-gradient absolute top-16 right-0 mx-4 my-2 min-w-[180px] z-50 rounded-2xl border border-white/10 shadow-2xl transform transition-all`}
          >
            <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4">
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-medium cursor-pointer text-[16px] ${
                    active === nav.title ? "text-white" : "text-secondary"
                  }`}
                  onClick={() => {
                    setToggle(false);
                    setActive(nav.title);
                  }}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}

              <li className="w-full border-t border-white/10 my-1" />

              <li className="w-full flex flex-col gap-2">
                <p className="text-[11px] text-secondary font-medium uppercase tracking-wider">
                  Language
                </p>
                <div className="flex flex-col gap-1.5">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      type="button"
                      onClick={() => {
                        changeLanguage(l.code);
                        setToggle(false);
                      }}
                      className={`flex items-center gap-3 p-2 rounded-lg text-left text-[14px] ${
                        currentLang.code === l.code
                          ? "bg-white/10 text-white font-medium"
                          : "text-secondary hover:text-white"
                      }`}
                    >
                      <span className="text-[18px]">{l.flag}</span>
                      <span>{l.label}</span>
                    </button>
                  ))}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
