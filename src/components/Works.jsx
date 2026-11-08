import { motion } from "framer-motion";
import { Tilt } from "react-tilt";
import { useTranslation } from "react-i18next";

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { myGithub, getProjects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
  app_link,
}) => {
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.1, 0.75)} className="w-full">
      <Tilt
        options={{ max: 12, scale: 1.01, speed: 450 }}
        className="bg-tertiary p-5 sm:p-6 rounded-2xl w-full flex flex-col justify-between h-full border border-white/5 hover:border-white/20 transition-all duration-300 shadow-card"
      >
        <div>
          <div className="relative w-full h-[200px] sm:h-[220px] overflow-hidden rounded-xl bg-black-200 group/img">
            {image && (
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                loading="lazy"
              />
            )}

            <div className="absolute top-2.5 right-2.5 flex gap-2">
              {source_code_link && (
                <a
                  href={source_code_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="black-gradient w-9 h-9 rounded-full flex justify-center items-center cursor-pointer shadow-md hover:scale-105 transition-transform duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#915EFF]"
                  title="Source Code"
                  aria-label={`${name} source code on GitHub`}
                >
                  <img
                    src={github}
                    alt="source code"
                    className="w-1/2 h-1/2 object-contain"
                  />
                </a>
              )}
            </div>
          </div>

          <div className="mt-4">
            {app_link ? (
              <a
                href={app_link}
                target="_blank"
                rel="noopener noreferrer"
                className="group/title inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#915EFF] rounded-lg"
              >
                <h3 className="text-white font-bold text-[18px] sm:text-[20px] group-hover/title:text-[#915EFF] transition-colors flex items-center gap-1.5">
                  <span>{name}</span>
                  <span className="text-[13px] text-secondary group-hover/title:text-[#915EFF] transition-colors">↗</span>
                </h3>
              </a>
            ) : (
              <h3 className="text-white font-bold text-[18px] sm:text-[20px]">
                {name}
              </h3>
            )}
            <p className="mt-2 text-secondary text-[13px] sm:text-[14px] line-clamp-3 leading-[22px]">
              {description}
            </p>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap gap-1.5 sm:gap-2">
          {tags.map((tag) => (
            <span
              key={`${name}-${tag.name}`}
              className={`text-[11px] sm:text-[12px] font-medium px-2 py-0.5 rounded-md bg-black-100 ${tag.color}`}
            >
              #{tag.name}
            </span>
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  const { t } = useTranslation();
  const projects = getProjects(t);

  return (
    <>
      <motion.div variants={textVariant()} className="text-center">
        <p className={styles.sectionSubText}>{t("works.title")}</p>
        <h2 className={styles.sectionHeadText}>{t("works.header")}</h2>
      </motion.div>

      <div className="w-full flex justify-center">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[15px] sm:text-[16px] max-w-3xl leading-[26px] sm:leading-[28px] text-center"
        >
          {t("works.description")}
        </motion.p>
      </div>

      <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto w-full">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>

      <div className="w-full flex flex-col items-center justify-center mt-8 sm:mt-10 text-center">
        <p className="text-secondary text-[15px] sm:text-[17px] max-w-xl leading-[24px]">
          {t("works.github_text")}
        </p>

        <a
          href={myGithub}
          target="_blank"
          rel="noopener noreferrer"
          className="green-pink-gradient p-[1px] rounded-full flex justify-center items-center mt-4 select-none hover:shadow-lg transition-all duration-200 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#915EFF] focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
        >
          <div className="bg-tertiary rounded-full px-5 py-2 sm:px-6 sm:py-2.5 flex items-center gap-2.5 transition-colors group-hover:bg-[#1f1945]">
            <img
              src={github}
              alt="GitHub profile"
              className="w-5 h-5 object-contain"
            />
            <span className="text-white font-medium text-[15px]">
              {t("works.github_btn")}
            </span>
          </div>
        </a>
      </div>
    </>
  );
};

export default SectionWrapper(Works, "projects");
