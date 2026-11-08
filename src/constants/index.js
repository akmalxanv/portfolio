import {
  css,
  html,
  javascript,
  myCV,
  reactjs,
  tailwind,
  namedu,
  namozlarim,
  cvPreview,
} from "../assets";

export const myGithub = "https://github.com/akmalxanv";
export const MyCV = myCV;
export const CVPreview = cvPreview;

export const getResumeTabs = (t) => [
  { id: "all", label: t("cv.tabs.all") },
  { id: "experience", label: t("cv.tabs.experience") },
  { id: "education", label: t("cv.tabs.education") },
  { id: "certs_languages", label: t("cv.tabs.certs_languages") },
];

export const getResumeData = (t) => ({
  experience: t("cv.experience", { returnObjects: true }) || [],
  education: t("cv.education", { returnObjects: true }) || [],
  certsActivities: t("cv.certs_activities", { returnObjects: true }) || [],
  languages: t("cv.languages", { returnObjects: true }) || [],
});

export const getNavLinks = (t) => [
  {
    id: "",
    title: t("nav.home"),
  },
  {
    id: "about",
    title: t("nav.about"),
  },
  {
    id: "skills",
    title: t("nav.skills"),
  },
  {
    id: "projects",
    title: t("nav.projects"),
  },
  {
    id: "contact",
    title: t("nav.contact"),
  },
];

export const getSkills = (t) => [
  {
    name: t("skills.frontend"),
    id: "Front-end Developer",
    icon: "frontend",
    type: "icon",
  },
  {
    name: t("skills.html"),
    id: "HTML",
    icon: html,
    type: "image",
  },
  {
    name: t("skills.css"),
    id: "CSS",
    icon: css,
    type: "image",
  },
  {
    name: t("skills.javascript"),
    id: "JavaScript",
    icon: javascript,
    type: "image",
  },
  {
    name: t("skills.tailwind"),
    id: "Tailwind CSS",
    icon: tailwind,
    type: "image",
  },
  {
    name: t("skills.react"),
    id: "React",
    icon: reactjs,
    type: "image",
  },
  {
    name: t("skills.esl"),
    id: "ESL Teacher",
    icon: "teacher",
    type: "icon",
  },
  {
    name: t("skills.swimmer"),
    id: "Varsity Swimmer",
    icon: "swimmer",
    type: "icon",
  },
  {
    name: t("skills.diver"),
    id: "Varsity Diver",
    icon: "diver",
    type: "icon",
  },
];

export const getProjects = (t) => [
  {
    name: "Namangan Edu",
    description: t("projects_list.namedu_desc"),
    tags: [
      {
        name: "React",
        color: "pink-text-gradient",
      },
      {
        name: "TailwindCSS",
        color: "orange-text-gradient",
      },
      {
        name: "Supabase",
        color: "green-text-gradient",
      },
      {
        name: "JavaScript",
        color: "orange-text-gradient",
      },
      {
        name: "vite",
        color: "blue-text-gradient",
      },
    ],
    image: namedu,
    source_code_link: "https://github.com/akmalxanv",
    app_link: "https://namanganedu.uz/",
  },
  {
    name: "Namozlarim.uz",
    description: t("projects_list.namozlarim_desc"),
    tags: [
      {
        name: "Next.js",
        color: "blue-text-gradient",
      },
      {
        name: "React",
        color: "pink-text-gradient",
      },
      {
        name: "TailwindCSS",
        color: "orange-text-gradient",
      },
      {
        name: "TypeScript",
        color: "green-text-gradient",
      },
      {
        name: "MongoDB",
        color: "pink-text-gradient",
      },
    ],
    image: namozlarim,
    source_code_link: "https://github.com/akmalxanv/salahtrack",
    app_link: "https://namozlarim.uz",
  },
];
