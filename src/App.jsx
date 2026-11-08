import { useEffect, lazy, Suspense } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";

import {
  About,
  Contact,
  Hero,
  Navbar,
  Tech,
  Works,
  CV,
  Socials,
  Footer,
} from "./components";

const StarsCanvas = lazy(() => import("./components/canvas/Stars"));

const ScrollToSection = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    // If hash is present (e.g. #about)
    if (hash) {
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else if (pathname !== "/") {
      // If direct route like /about was accessed
      const sectionId = pathname.replace("/", "");
      const element = document.getElementById(sectionId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [hash, pathname]);

  return null;
};

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToSection />
      <div className="relative z-0 bg-primary min-h-screen selection:bg-[#915EFF] selection:text-white">
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar />
          <Hero />
        </div>
        <About />
        <Tech />
        <Works />
        <CV />
        <div className="relative z-0">
          <Contact />
          <Socials />
          <Suspense fallback={null}>
            <StarsCanvas />
          </Suspense>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
