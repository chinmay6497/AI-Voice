import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layout
import MainLayout from '../components/layout/MainLayout';

// Company Pages
import About from '../pages/company/About';
import Mission from '../pages/company/Mission';
import Team from '../pages/company/Team';
import Careers from '../pages/company/Careers';
import Press from '../pages/company/Press';

// Services Pages
import MockInterview from '../pages/app/MockInterview';
import InterviewFeedback from '../pages/services/InterviewFeedback';
import CompanyPrep from '../pages/app/CompanyPrep';
import CodingPrep from '../pages/app/CodingPrep';

// Resources Pages
import Learning from '../pages/app/Learning';
import Blog from '../pages/resources/Blog';
import Guides from '../pages/resources/Guides';
import FAQ from '../pages/resources/FAQ';

// Legal Pages
import Privacy from '../pages/legal/Privacy';
import Terms from '../pages/legal/Terms';
import Cookies from '../pages/legal/Cookies';
import Disclaimer from '../pages/legal/Disclaimer';

// Support Pages
import Support from '../pages/support/Support';
import Contact from '../pages/support/Contact';

// Auth Pages
import SignIn from '../pages/auth/SignIn';
import SignUp from '../pages/auth/SignUp';

// Other Pages
import Home from '../pages/Home';
import Pricing from '../pages/Pricing';
import NotFound from '../pages/NotFound';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="pricing" element={<Pricing />} />

        {/* Company Routes */}
        <Route path="company">
          <Route path="about" element={<About />} />
          <Route path="mission" element={<Mission />} />
          <Route path="team" element={<Team />} />
          <Route path="careers" element={<Careers />} />
          <Route path="press" element={<Press />} />
        </Route>

        {/* Services Routes */}
        <Route path="services">
          <Route path="feedback" element={<InterviewFeedback />} />
        </Route>

        {/* App Routes */}
        <Route path="app">
          <Route path="mock-interview" element={<MockInterview />} />
          <Route path="company-prep" element={<CompanyPrep />} />
          <Route path="coding-prep" element={<CodingPrep />} />
          <Route path="learning" element={<Learning />} />
        </Route>

        {/* Resources Routes */}
        <Route path="resources">
          <Route path="blog" element={<Blog />} />
          <Route path="guides" element={<Guides />} />
          <Route path="faq" element={<FAQ />} />
        </Route>

        {/* Legal Routes */}
        <Route path="legal">
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="cookies" element={<Cookies />} />
          <Route path="disclaimer" element={<Disclaimer />} />
        </Route>

        {/* Support Routes */}
        <Route path="support">
          <Route index element={<Support />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        {/* Auth Routes */}
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes; 