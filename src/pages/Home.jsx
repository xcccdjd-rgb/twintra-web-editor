import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  function handleStart() {
    navigate('/splash');
  }

  return (
    <div className="glass-card">
      <Navbar />
      {/* Logo SVG dan animasi sesuai index.html */}
      <h1>DSRT</h1>
      <div className="desc">
        Digital Smart Revise Technology<br />
        Web editor all-in-one untuk foto, video, dan logo.
      </div>
      <ul className="features-list">
        <li>Editor Foto: crop, filter, export</li>
        <li>Editor Video: trim, merge, export (ffmpeg.js)</li>
        <li>Logo Designer: interactive (fabric.js)</li>
        <li>UI Modern: animasi 3D, glass & neon</li>
        <li>Simple Auth, mobile-friendly</li>
      </ul>
      <button className="btn-main" onClick={handleStart}>Coba Sekarang</button>
      <Footer />
    </div>
  );
};

export default Home;
