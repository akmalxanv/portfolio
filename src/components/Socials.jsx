import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { SectionWrapper } from "../hoc";
import { textVariant, fadeIn } from "../utils/motion";
import { styles } from "../styles";
import {
  FaInstagram,
  FaTelegram,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

const socials = [
  {
    name: "Telegram",
    handle: "@akmalxanv",
    icon: FaTelegram,
    url: "https://t.me/akmalxanv",
    color: "text-[#229ED9]",
    borderHover: "hover:border-[#229ED9]/50",
  },
  {
    name: "GitHub",
    handle: "akmalxanv",
    icon: FaGithub,
    url: "https://github.com/akmalxanv",
    color: "text-white",
    borderHover: "hover:border-white/50",
  },
  {
    name: "LinkedIn",
    handle: "akmalxanv",
    icon: FaLinkedin,
    url: "https://linkedin.com/in/akmalxanv",
    color: "text-[#0A66C2]",
    borderHover: "hover:border-[#0A66C2]/50",
  },
  {
    name: "Instagram",
    handle: "@akmalxanv",
    icon: FaInstagram,
    url: "https://instagram.com/akmalxanv",
    color: "text-[#E4405F]",
    borderHover: "hover:border-[#E4405F]/50",
  },
];

const SocialCard = ({ index, name, handle, icon: Icon, url, color, borderHover }) => {
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      variants={fadeIn("up", "spring", index * 0.06, 0.5)}
      className={`group bg-tertiary/70 hover:bg-tertiary border border-white/10 ${borderHover} rounded-2xl p-4 flex items-center gap-4 transition-all duration-200 hover:scale-[1.015] shadow-card w-full sm:w-[260px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#915EFF] focus-visible:ring-offset-2 focus-visible:ring-offset-primary active:scale-[0.98]`}
    >
      <div className="w-12 h-12 rounded-xl bg-black-200/80 flex justify-center items-center shrink-0 border border-white/5 group-hover:scale-105 transition-transform duration-200">
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
      <div className="flex flex-col overflow-hidden">
        <span className="text-white font-semibold text-[15px] group-hover:text-[#915EFF] transition-colors">
          {name}
        </span>
        <span className="text-secondary text-[12px] truncate">
          {handle}
        </span>
      </div>
    </motion.a>
  );
};

const Socials = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full">
      <motion.div variants={textVariant()} className="text-center">
        <p className={styles.sectionSubText}>{t("socials.subtitle")}</p>
        <h2 className={styles.sectionHeadText}>{t("socials.header")}</h2>
      </motion.div>

      <div className="mt-6 sm:mt-8 flex flex-wrap gap-3.5 sm:gap-4 justify-center max-w-4xl mx-auto">
        {socials.map((social, index) => (
          <SocialCard key={social.name} index={index} {...social} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Socials, "socials");
