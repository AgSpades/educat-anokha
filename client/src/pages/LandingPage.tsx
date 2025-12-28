import React from 'react';
import { useThemeContext } from '../contexts/ThemeContext';
import Navbar from '../landing-page-components/Navbar';
import Hero from '../landing-page-components/Hero';

import Features from '../landing-page-components/Features';
import HowItWorks from '../landing-page-components/HowItWorks';
import Testimonials from '../landing-page-components/Testimonials';
import CallToAction from '../landing-page-components/CallToAction';
import Footer from '../landing-page-components/Footer';
import BackgroundGradients from '../landing-page-components/BackgroundGradients';

const LandingPage: React.FC = () => {
  const { darkMode, toggleTheme } = useThemeContext();

  return (
    <div className={`min-h-screen font-sans transition-all duration-700 ease-in-out ${darkMode ? 'bg-zinc-950 text-zinc-100' : 'bg-white text-zinc-900'}`}>
      <BackgroundGradients />

      <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />

      <Hero darkMode={darkMode} />



      <Features darkMode={darkMode} />

      <HowItWorks darkMode={darkMode} />

      <Testimonials darkMode={darkMode} />

      <CallToAction darkMode={darkMode} />

      <Footer darkMode={darkMode} />
    </div>
  );
}

export default LandingPage;
