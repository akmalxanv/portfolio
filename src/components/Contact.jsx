import { useRef, useState, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const EarthCanvas = lazy(() => import("./canvas/Earth"));

const Contact = () => {
  const { t } = useTranslation();
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.warn("Please fill in all fields.", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }

    setLoading(true);

    const botToken =
      import.meta.env.VITE_TELEGRAM_BOT_TOKEN ||
      "8357848077:AAElee_92SJXDe5z_C56k35BJojMVQXlYD8";
    const chatId =
      import.meta.env.VITE_TELEGRAM_CHAT_ID || "5964600830";

    const message = `👤 Name: ${form.name}\n✉️ Email: ${form.email}\n✍️ Message: ${form.message}`;

    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        if (data.ok) {
          toast.success(t("contact.success_alert"), {
            position: "top-right",
            autoClose: 5000,
            theme: "dark",
          });
          setForm({
            name: "",
            email: "",
            message: "",
          });
        } else {
          toast.error(t("contact.fail_alert"), {
            position: "top-right",
            autoClose: 5000,
            theme: "dark",
          });
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error sending message:", error);
        toast.error(t("contact.fail_alert"), {
          position: "top-right",
          autoClose: 5000,
          theme: "dark",
        });
      });
  };

  return (
    <div className="flex flex-col-reverse xl:flex-row gap-6 sm:gap-8 items-center max-w-6xl mx-auto overflow-hidden">
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="w-full xl:w-[480px] shrink-0 bg-black-100/95 p-6 sm:p-7 rounded-2xl border border-[#915EFF]/20 shadow-card hover:border-[#915EFF]/40 transition-all relative overflow-hidden backdrop-blur-sm"
      >
        <div className="absolute -top-14 -right-14 w-36 h-36 bg-[#915EFF]/15 rounded-full blur-2xl pointer-events-none" />

        <p className={styles.sectionSubText}>{t("contact.title")}</p>
        <h3 className={styles.sectionHeadText}>{t("contact.header")}</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-4 sm:mt-5 flex flex-col gap-3 sm:gap-3.5 relative z-10"
        >
          <label className="flex flex-col">
            <span className="text-white font-medium mb-1.5 text-[13px]">
              {t("contact.name_label")}
            </span>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              placeholder={t("contact.name_placeholder")}
              className="bg-tertiary/90 py-2.5 px-4 placeholder:text-secondary/70 text-white rounded-xl outline-none border border-white/5 focus:border-[#915EFF] focus:ring-1 focus:ring-[#915EFF]/30 font-medium text-[14px] transition-all"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-white font-medium mb-1.5 text-[13px]">
              {t("contact.email_label")}
            </span>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder={t("contact.email_placeholder")}
              className="bg-tertiary/90 py-2.5 px-4 placeholder:text-secondary/70 text-white rounded-xl outline-none border border-white/5 focus:border-[#915EFF] focus:ring-1 focus:ring-[#915EFF]/30 font-medium text-[14px] transition-all"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-white font-medium mb-1.5 text-[13px]">
              {t("contact.message_label")}
            </span>
            <textarea
              rows="3"
              name="message"
              required
              value={form.message}
              onChange={handleChange}
              placeholder={t("contact.message_placeholder")}
              className="bg-tertiary/90 py-2.5 px-4 placeholder:text-secondary/70 text-white rounded-xl outline-none border border-white/5 focus:border-[#915EFF] focus:ring-1 focus:ring-[#915EFF]/30 font-medium text-[14px] resize-none transition-all"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="violet-gradient py-3 px-8 outline-none text-white font-semibold shadow-md shadow-[#915EFF]/25 rounded-xl hover:opacity-95 hover:shadow-lg hover:shadow-[#915EFF]/40 transition-all active:scale-[0.99] text-[14px] mt-1 disabled:opacity-50 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#915EFF] focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
          >
            {loading ? t("contact.sending") : t("contact.send")}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="w-full xl:flex-1 h-[260px] sm:h-[300px] md:h-[340px] xl:h-[380px] flex items-center justify-center"
      >
        <Suspense fallback={<div className="w-full h-full" />}>
          <EarthCanvas />
        </Suspense>
      </motion.div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
