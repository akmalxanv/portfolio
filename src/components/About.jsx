import { motion } from "framer-motion";
import { Tilt } from "react-tilt";
import { useTranslation } from "react-i18next";

import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";
import { profileImg } from "../assets";

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-5xl mx-auto">
      <motion.div variants={textVariant()} className="text-center sm:text-left">
        <p className={styles.sectionSubText}>{t("about.introduction")}</p>
        <h2 className={styles.sectionHeadText}>{t("about.overview")}.</h2>
      </motion.div>

      <div className="mt-8 sm:mt-10 flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-12 lg:gap-16">
        {/* Intro text */}
        <motion.div
          variants={fadeIn("right", "tween", 0.2, 0.8)}
          className="flex-1 w-full text-center sm:text-left"
        >
          <p className="text-secondary text-[16px] sm:text-[18px] lg:text-[19px] leading-[30px] sm:leading-[34px] font-normal">
            {t("about.text")}
          </p>
        </motion.div>

        {/* Profile photo in a refined frame */}
        <motion.div
          variants={fadeIn("left", "tween", 0.3, 0.8)}
          className="shrink-0 flex justify-center items-center"
        >
          <Tilt
            options={{ max: 15, scale: 1.02, speed: 400 }}
            className="group relative"
          >
            {/* Soft Ambient Glow */}
            <div
              className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#915EFF]/40 via-[#00cea8]/30 to-[#915EFF]/40 blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              aria-hidden="true"
            />

            {/* Subtle Gradient Border Container */}
            <div className="relative p-[1.5px] rounded-3xl bg-gradient-to-b from-[#915EFF]/80 via-white/10 to-[#00cea8]/60 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
              <div className="bg-[#100d25] p-2.5 sm:p-3 rounded-3xl overflow-hidden">
                <img
                  src={profileImg}
                  alt="Abubakr Akmalkhonov"
                  className="w-[230px] sm:w-[260px] md:w-[280px] aspect-[3/4] object-cover object-center rounded-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>
            </div>
          </Tilt>
        </motion.div>
      </div>
    </div>
  );
};

export default SectionWrapper(About, "about");
