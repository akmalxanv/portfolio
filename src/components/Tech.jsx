import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { getSkills } from "../constants";
import { textVariant, fadeIn } from "../utils/motion";
import { styles } from "../styles";
import { useTranslation } from "react-i18next";

import { Tilt } from "react-tilt";
import {
  FaSwimmer,
  FaChalkboardTeacher,
  FaLaptopCode,
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaJs,
} from "react-icons/fa";
import { SiTailwindcss } from "react-icons/si";
import { MdOutlineScubaDiving } from "react-icons/md";

const IconMap = {
  "Front-end Developer": FaLaptopCode,
  HTML: FaHtml5,
  CSS: FaCss3Alt,
  "Tailwind CSS": SiTailwindcss,
  React: FaReact,
  "Varsity Swimmer": FaSwimmer,
  "V Swimmer": FaSwimmer,
  "JV Swimmer": FaSwimmer,
  "Varsity Diver": MdOutlineScubaDiving,
  "V Diver": MdOutlineScubaDiving,
  "ESL Teacher": FaChalkboardTeacher,
  JavaScript: FaJs,
};

const SkillCard = ({ index, name, id, icon, type }) => {
  const IconComponent = IconMap[id];

  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.06, 0.5)}
      className="w-full green-pink-gradient p-[1px] rounded-2xl shadow-card h-full group"
    >
      <Tilt
        options={{
          max: 12,
          scale: 1.02,
          speed: 450,
        }}
        className="bg-tertiary rounded-2xl py-4 sm:py-5 px-3 h-full flex flex-col justify-center items-center select-none transition-colors duration-200"
      >
        {IconComponent ? (
          <IconComponent className="w-10 h-10 sm:w-12 sm:h-12 text-white transition-transform duration-300 group-hover:scale-105" />
        ) : type === "image" ? (
          <img
            src={icon}
            alt={name}
            className="w-10 h-10 sm:w-12 sm:h-12 object-contain transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-10 h-10 bg-white/10 rounded-full" />
        )}

        <h3 className="text-white text-[13px] sm:text-[14px] font-semibold text-center mt-2.5 sm:mt-3 tracking-wide">
          {name}
        </h3>
      </Tilt>
    </motion.div>
  );
};

const Tech = () => {
  const { t } = useTranslation();
  const skills = getSkills(t);

  return (
    <>
      <motion.div variants={textVariant()} className="text-center">
        <p className={styles.sectionSubText}>{t("tech.title")}</p>
        <h2 className={styles.sectionHeadText}>{t("tech.header")}</h2>
      </motion.div>

      <div className="mt-8 sm:mt-10 flex flex-wrap justify-center gap-3.5 sm:gap-5 max-w-5xl mx-auto">
        {skills.map((skill, index) => (
          <div className="w-[125px] sm:w-[145px] h-[135px] sm:h-[150px]" key={skill.id}>
            <SkillCard index={index} {...skill} />
          </div>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Tech, "skills");
