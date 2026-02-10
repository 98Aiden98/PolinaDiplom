import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import GlobalLoader from './components/GlobalLoader';

import Home from './pages/Home';
import NewsList from './pages/NewsList';
import NewsDetails from './pages/NewsDetails';
import Team from './pages/Team';
import Schedule from './pages/Schedule';
import Results from './pages/Results';
import Gallery from './pages/Gallery';
import Contacts from './pages/Contacts';

import AdminGate from './admin/AdminGate';
import AdminDashboard from './admin/Dashboard';
import AdminNews from './admin/NewsCrud';
import AdminSchedule from './admin/ScheduleCrud';
import AdminResults from './admin/ResultsCrud';
import AdminGallery from './admin/GalleryCrud';
import AdminTeam from './admin/TeamCrud';

export default function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="app">
      {!isAdminRoute && <Navbar />}
      <GlobalLoader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<NewsList />} />
        <Route path="/news/:slug" element={<NewsDetails />} />
        <Route path="/team" element={<Team />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/results" element={<Results />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contacts" element={<Contacts />} />

        <Route path="/admin/login" element={<Navigate to="/admin" replace />} />
        <Route path="/admin" element={<AdminGate />}>
          <Route index element={<AdminDashboard />} />
          <Route path="news" element={<AdminNews />} />
          <Route path="schedule" element={<AdminSchedule />} />
          <Route path="results" element={<AdminResults />} />
          <Route path="gallery" element={<AdminGallery />} />
          <Route path="team" element={<AdminTeam />} />
        </Route>
      </Routes>
      {!isAdminRoute && <Footer />}
    </div>
  );
}
