import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  HiDownload,
  HiExternalLink,
  HiOutlineBriefcase,
  HiOutlineAcademicCap,
  HiOutlineBadgeCheck,
  HiOutlineTranslate,
  HiOutlineCalendar,
} from "react-icons/hi";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { MyCV, CVPreview, getResumeTabs, getResumeData } from "../constants";

const ExperienceTimelineItem = ({ item, isLast, compact }) => {
  return (
    <div className="relative flex items-start gap-3.5 sm:gap-5 group">
      {!isLast && (
        <span
          className="absolute left-[15px] sm:left-[19px] top-8 sm:top-9 bottom-0 w-[2px] bg-gradient-to-b from-[#915EFF] via-[#915EFF]/25 to-transparent group-hover:via-[#915EFF]/50 transition-colors duration-300"
          aria-hidden="true"
        />
      )}

      {/* Clean Modern Node */}
      <div className="relative z-10 shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#151030] border-2 border-[#915EFF] flex items-center justify-center shadow-[0_0_12px_rgba(145,94,255,0.4)] group-hover:shadow-[0_0_18px_rgba(145,94,255,0.7)] group-hover:scale-105 transition-all duration-300">
        <HiOutlineBriefcase className="w-4 h-4 sm:w-5 sm:h-5 text-[#915EFF]" />
      </div>

      <div className={`flex-1 ${compact ? "pb-6" : "pb-7 sm:pb-8"}`}>
        <div className="bg-tertiary/50 hover:bg-tertiary/80 border border-white/10 hover:border-[#915EFF]/30 rounded-2xl p-4 sm:p-5 backdrop-blur-sm transition-all duration-300 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-3 mb-2">
            <div>
              <h4 className="text-white text-[15px] sm:text-[17px] font-bold tracking-tight">
                {item.role}
              </h4>
              <div className="flex items-center gap-2 mt-0.5">
                {item.link ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#915EFF] hover:underline inline-flex items-center gap-1 text-[13px] sm:text-[14px] font-medium transition-colors"
                  >
                    <span>{item.company}</span>
                    <HiExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="text-[#00cea8] text-[13px] sm:text-[14px] font-medium">
                    {item.company || ""}
                  </span>
                )}
              </div>
            </div>

            <span className="self-start sm:self-center shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] sm:text-[12px] font-semibold bg-[#915EFF]/15 text-[#caaaff] border border-[#915EFF]/30">
              {item.period}
            </span>
          </div>

          <p className="text-secondary text-[13px] sm:text-[14px] leading-[22px] mt-1.5 mb-2.5">
            {item.description}
          </p>

          {Array.isArray(item.tags) && item.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-white/5">
              {item.tags.map((tag, tagIdx) => (
                <span
                  key={tagIdx}
                  className="bg-black-200/80 border border-white/10 px-2 py-0.5 rounded-md text-[11px] text-white-100 font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const EducationTimelineItem = ({ item, isLast }) => {
  return (
    <div className="relative flex items-start gap-3.5 sm:gap-5 group">
      {/* Sleek connector */}
      {!isLast && (
        <span
          className="absolute left-[15px] sm:left-[19px] top-8 sm:top-9 bottom-0 w-[2px] bg-gradient-to-b from-[#915EFF] via-[#915EFF]/25 to-transparent group-hover:via-[#915EFF]/50 transition-colors duration-300"
          aria-hidden="true"
        />
      )}

      {/* Modern Clean Node */}
      <div className="relative z-10 shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#151030] border-2 border-[#915EFF] flex items-center justify-center shadow-[0_0_12px_rgba(145,94,255,0.4)] group-hover:shadow-[0_0_18px_rgba(145,94,255,0.7)] group-hover:scale-105 transition-all duration-300">
        <HiOutlineAcademicCap className="w-4 h-4 sm:w-5 sm:h-5 text-[#915EFF]" />
      </div>

      <div className="flex-1 pb-7 sm:pb-8">
        <div className="bg-tertiary/50 hover:bg-tertiary/80 border border-white/10 hover:border-[#915EFF]/30 rounded-2xl p-4 sm:p-5 backdrop-blur-sm transition-all duration-300 shadow-sm">
          {/* Header row: regular text degree + subtle link icon if clickable + clear date pill */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-3 mb-2">
            <div className="flex items-center gap-1.5 flex-wrap">
              {item.link ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#915EFF] font-semibold text-[15px] sm:text-[17px] inline-flex items-center gap-1.5 transition-colors group/link"
                >
                  <span>{item.degree}</span>
                  <HiExternalLink className="w-3.5 h-3.5 text-secondary group-hover/link:text-[#915EFF] transition-colors shrink-0" />
                </a>
              ) : (
                <span className="text-white font-semibold text-[15px] sm:text-[17px]">
                  {item.degree}
                </span>
              )}
            </div>

            <span className="self-start sm:self-center shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] sm:text-[12px] font-semibold bg-[#915EFF]/15 text-[#caaaff] border border-[#915EFF]/30">
              {item.period}
            </span>
          </div>

          {item.description && (
            <p className="text-secondary text-[13px] sm:text-[14px] leading-[22px] mt-1.5 mb-2.5">
              {item.description}
            </p>
          )}

          {Array.isArray(item.tags) && item.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-white/5">
              {item.tags.map((tag, tagIdx) => (
                <span
                  key={tagIdx}
                  className="bg-black-200/80 border border-white/10 px-2 py-0.5 rounded-md text-[11px] text-white-100 font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CertCard = ({ cert }) => {
  return (
    <div className="bg-tertiary/50 hover:bg-tertiary/80 border border-white/10 hover:border-[#915EFF]/30 rounded-2xl p-4 sm:p-5 backdrop-blur-sm transition-all duration-300 hover:scale-[1.01] shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#915EFF]/20 border border-[#915EFF]/40 flex items-center justify-center text-[#915EFF] shrink-0">
            <HiOutlineBadgeCheck className="w-4 h-4" />
          </span>
          <span className="text-[11px] font-semibold bg-[#915EFF]/15 text-[#caaaff] border border-[#915EFF]/30 px-2 py-0.5 rounded-full">
            {cert.period}
          </span>
        </div>

        <h4 className="text-white text-[15px] sm:text-[16px] font-bold tracking-tight mb-0.5">
          {cert.title}
        </h4>
        <p className="text-[#00cea8] text-[12px] sm:text-[13px] font-medium mb-1.5">
          {cert.organization}
        </p>
        <p className="text-secondary text-[12px] sm:text-[13px] leading-[20px] mb-3">
          {cert.description}
        </p>
      </div>

      {Array.isArray(cert.tags) && cert.tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 pt-2.5 border-t border-white/5">
          {cert.tags.map((tag, tagIdx) => (
            <span
              key={tagIdx}
              className="bg-black-200/80 border border-white/10 px-2 py-0.5 rounded-md text-[10px] text-white-100 font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

const LanguageCard = ({ lang }) => {
  return (
    <div className="bg-tertiary/50 hover:bg-tertiary/80 border border-white/10 hover:border-[#915EFF]/30 rounded-2xl p-4 backdrop-blur-sm transition-all duration-300 hover:scale-[1.01] shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#915EFF] to-[#4020a5] text-white font-bold text-[13px] flex items-center justify-center shadow-[0_0_8px_rgba(145,94,255,0.4)]">
            {lang.code}
          </span>
          <span className="text-[11px] font-semibold text-[#00cea8] bg-[#00cea8]/10 border border-[#00cea8]/20 px-2 py-0.5 rounded-full">
            {lang.level}
          </span>
        </div>

        <h4 className="text-white font-bold text-[15px] sm:text-[16px]">
          {lang.name}
        </h4>
      </div>

      <div className="mt-3 pt-2.5 border-t border-white/5">
        <div className="flex items-center justify-between text-[11px] text-secondary mb-1">
          <span>{lang.level}</span>
          <span className="font-semibold text-white-100">{lang.proficiency}%</span>
        </div>
        <div className="grid grid-cols-5 gap-1 h-1.5">
          {[1, 2, 3, 4, 5].map((barIndex) => (
            <div
              key={barIndex}
              className={`h-full rounded-full transition-colors duration-300 ${
                barIndex <= lang.bars
                  ? "bg-gradient-to-r from-[#915EFF] to-[#00cea8] shadow-[0_0_4px_rgba(145,94,255,0.6)]"
                  : "bg-white/10"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const CV = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("all");
  const tabRefs = useRef([]);

  const tabs = getResumeTabs(t);
  const { experience, education, certsActivities, languages } = getResumeData(t);

  const handleTabKeyDown = (e, index) => {
    let newIndex = index;
    if (e.key === "ArrowRight") {
      newIndex = (index + 1) % tabs.length;
    } else if (e.key === "ArrowLeft") {
      newIndex = (index - 1 + tabs.length) % tabs.length;
    } else if (e.key === "Home") {
      newIndex = 0;
    } else if (e.key === "End") {
      newIndex = tabs.length - 1;
    } else {
      return;
    }

    e.preventDefault();
    setActiveTab(tabs[newIndex].id);
    if (tabRefs.current[newIndex]) {
      tabRefs.current[newIndex].focus();
    }
  };

  return (
    <div className="w-full">
      {/* Section Header */}
      <motion.div variants={textVariant()} className="text-center sm:text-left">
        <p className={styles.sectionSubText}>{t("cv.subtitle")}</p>
        <h2 className={styles.sectionHeadText}>{t("cv.title")}</h2>
      </motion.div>

      {/* Compact Horizontal CV Card */}
      <motion.div
        variants={fadeIn("up", "tween", 0.15, 0.75)}
        className="relative mt-8 sm:mt-10 bg-gradient-to-r from-tertiary/90 via-[#151030]/80 to-tertiary/90 border border-white/10 hover:border-[#915EFF]/30 rounded-2xl p-4 sm:p-5 backdrop-blur-md shadow-card transition-all overflow-hidden"
      >
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-[#915EFF]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6">
          {/* PDF Preview Thumbnail on Left */}
          <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-4 sm:gap-5 flex-1 min-w-0 w-full md:w-auto">
            <a
              href={MyCV}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("cv.preview_alt")}
              className="relative group/thumb shrink-0 w-20 sm:w-24 aspect-[1/1.41] rounded-xl overflow-hidden border border-white/15 bg-black-200 shadow-md hover:border-[#915EFF]/60 transition-all duration-300 hover:scale-[1.03]"
            >
              <img
                src={CVPreview}
                alt={t("cv.preview_alt")}
                className="w-full h-full object-cover object-top transition-transform duration-300 group-hover/thumb:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-end p-1.5 text-center">
                <HiExternalLink className="w-4 h-4 text-white mb-0.5" />
                <span className="text-[9px] text-white font-medium leading-tight">
                  {t("cv.view_preview")}
                </span>
              </div>
            </a>

            {/* Name, Role & Badges in Middle */}
            <div className="flex flex-col min-w-0">
              <h3 className="text-white text-[19px] sm:text-[22px] font-bold tracking-tight">
                {t("cv.name")}
              </h3>
              <p className="text-[#915EFF] font-medium text-[14px] sm:text-[15px] mt-0.5">
                {t("cv.role")}
              </p>

              {/* PDF / Size / Date Badges */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-2.5">
                <span className="inline-flex items-center gap-1.5 text-[11px] bg-white/5 border border-white/10 text-white-100 px-2.5 py-0.5 rounded-full font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#915EFF]" />
                  {t("cv.badge_format")}
                </span>
                <span className="inline-flex items-center text-[11px] bg-white/5 border border-white/10 text-secondary px-2.5 py-0.5 rounded-full font-medium">
                  {t("cv.badge_size")}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] bg-white/5 border border-white/10 text-[#00cea8] px-2.5 py-0.5 rounded-full font-medium">
                  <HiOutlineCalendar className="w-3.5 h-3.5" />
                  {t("cv.badge_date")}
                </span>
              </div>
            </div>
          </div>

          {/* Buttons on Right */}
          <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full md:w-auto shrink-0">
            <a
              href={MyCV}
              download="Akmalxanv's portfolio.pdf"
              className="violet-gradient w-full sm:w-auto py-2.5 px-4 rounded-xl text-white font-semibold flex items-center justify-center gap-2 shadow-md shadow-[#915EFF]/20 hover:shadow-lg hover:shadow-[#915EFF]/40 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] text-[13px] sm:text-[14px]"
            >
              <HiDownload className="w-4 h-4 shrink-0" />
              <span>{t("cv.download")}</span>
              <span className="text-[11px] font-normal bg-black/30 border border-white/15 px-2 py-0.5 rounded-md text-white/90 ml-0.5">
                {t("cv.badge_size")}
              </span>
            </a>

            <a
              href={MyCV}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black-100 hover:bg-black-200 border border-white/15 hover:border-white/30 w-full sm:w-auto py-2.5 px-4 rounded-xl text-white font-medium flex items-center justify-center gap-1.5 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] text-[13px] sm:text-[14px]"
            >
              <HiExternalLink className="w-4 h-4 text-secondary shrink-0" />
              <span>{t("cv.open_new_tab")}</span>
            </a>
          </div>
        </div>
      </motion.div>

      {/* Tabbed Switcher Bar */}
      <motion.div
        variants={fadeIn("up", "tween", 0.25, 0.75)}
        className="mt-8 sm:mt-10 flex justify-center"
      >
        <div
          role="tablist"
          aria-label={t("cv.subtitle")}
          className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar p-1.5 bg-black-100/70 border border-white/10 rounded-2xl max-w-full"
        >
          {tabs.map((tab, idx) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={isActive}
                aria-controls={`tabpanel-${tab.id}`}
                tabIndex={isActive ? 0 : -1}
                ref={(el) => (tabRefs.current[idx] = el)}
                onKeyDown={(e) => handleTabKeyDown(e, idx)}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl font-medium text-[13px] sm:text-[14px] whitespace-nowrap transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#915EFF] ${
                  isActive
                    ? "text-white shadow-[0_0_15px_rgba(145,94,255,0.4)]"
                    : "text-secondary hover:text-white hover:bg-white/5"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabPill"
                    transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#915EFF] to-[#733be8] -z-10"
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Tabbed Switcher Panels with Smooth Transition */}
      <div
        id={`tabpanel-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeTab}`}
        className="mt-8 sm:mt-10 max-w-5xl mx-auto"
      >
        <AnimatePresence mode="wait">
          {activeTab === "all" && (
            <motion.div
              key="panel-all"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10"
            >
              {/* Left Column: Experience */}
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-3 pb-2 border-b border-white/10">
                  <div className="p-2 rounded-xl bg-[#915EFF]/15 border border-[#915EFF]/30 text-[#915EFF]">
                    <HiOutlineBriefcase className="w-5 h-5" />
                  </div>
                  <h3 className="text-white text-[18px] sm:text-[20px] font-bold">
                    {t("cv.sections.experience")}
                  </h3>
                </div>
                <div className="pl-1">
                  {experience.map((item, index) => (
                    <ExperienceTimelineItem
                      key={item.id || index}
                      item={item}
                      isLast={index === experience.length - 1}
                      compact
                    />
                  ))}
                </div>
              </div>

              {/* Right Column: Certifications & Languages */}
              <div className="flex flex-col gap-8">
                {/* Certifications & Activities */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 pb-2 border-b border-white/10">
                    <div className="p-2 rounded-xl bg-[#915EFF]/15 border border-[#915EFF]/30 text-[#915EFF]">
                      <HiOutlineBadgeCheck className="w-5 h-5" />
                    </div>
                    <h3 className="text-white text-[18px] sm:text-[20px] font-bold">
                      {t("cv.sections.certs")}
                    </h3>
                  </div>
                  <div className="flex flex-col gap-3.5">
                    {certsActivities.map((cert, index) => (
                      <CertCard key={cert.id || index} cert={cert} />
                    ))}
                  </div>
                </div>

                {/* Languages */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 pb-2 border-b border-white/10">
                    <div className="p-2 rounded-xl bg-[#915EFF]/15 border border-[#915EFF]/30 text-[#915EFF]">
                      <HiOutlineTranslate className="w-5 h-5" />
                    </div>
                    <h3 className="text-white text-[18px] sm:text-[20px] font-bold">
                      {t("cv.sections.languages")}
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {languages.map((lang) => (
                      <LanguageCard key={lang.id || lang.code} lang={lang} />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "experience" && (
            <motion.div
              key="panel-experience"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="max-w-3xl mx-auto"
            >
              <div className="flex items-center gap-3 mb-6 pb-2 border-b border-white/10">
                <div className="p-2 rounded-xl bg-[#915EFF]/15 border border-[#915EFF]/30 text-[#915EFF]">
                  <HiOutlineBriefcase className="w-5 h-5" />
                </div>
                <h3 className="text-white text-[19px] sm:text-[21px] font-bold">
                  {t("cv.sections.experience")}
                </h3>
              </div>
              <div className="pl-1">
                {experience.map((item, index) => (
                  <ExperienceTimelineItem
                    key={item.id || index}
                    item={item}
                    isLast={index === experience.length - 1}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "education" && (
            <motion.div
              key="panel-education"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="max-w-3xl mx-auto"
            >
              <div className="flex items-center gap-3 mb-6 pb-2 border-b border-white/10">
                <div className="p-2 rounded-xl bg-[#915EFF]/15 border border-[#915EFF]/30 text-[#915EFF]">
                  <HiOutlineAcademicCap className="w-5 h-5" />
                </div>
                <h3 className="text-white text-[19px] sm:text-[21px] font-bold">
                  {t("cv.sections.education")}
                </h3>
              </div>
              <div className="pl-1">
                {education.map((item, index) => (
                  <EducationTimelineItem
                    key={item.id || index}
                    item={item}
                    isLast={index === education.length - 1}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "certs_languages" && (
            <motion.div
              key="panel-certs_languages"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="flex flex-col gap-10"
            >
              {/* Certifications & Activities */}
              <div>
                <div className="flex items-center gap-3 mb-6 pb-2 border-b border-white/10">
                  <div className="p-2 rounded-xl bg-[#915EFF]/15 border border-[#915EFF]/30 text-[#915EFF]">
                    <HiOutlineBadgeCheck className="w-5 h-5" />
                  </div>
                  <h3 className="text-white text-[19px] sm:text-[21px] font-bold">
                    {t("cv.sections.certs")}
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
                  {certsActivities.map((cert, index) => (
                    <CertCard key={cert.id || index} cert={cert} />
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div>
                <div className="flex items-center gap-3 mb-6 pb-2 border-b border-white/10">
                  <div className="p-2 rounded-xl bg-[#915EFF]/15 border border-[#915EFF]/30 text-[#915EFF]">
                    <HiOutlineTranslate className="w-5 h-5" />
                  </div>
                  <h3 className="text-white text-[19px] sm:text-[21px] font-bold">
                    {t("cv.sections.languages")}
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {languages.map((lang) => (
                    <LanguageCard key={lang.id || lang.code} lang={lang} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SectionWrapper(CV, "cv");
