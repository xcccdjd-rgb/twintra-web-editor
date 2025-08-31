import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SplashScreen = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/dashboard');
    }, 2200);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="splash">
      {/* SVG Logo & animasi sesuai splashscreen.html */}
      <h1>DSRT</h1>
      <div className="loading-text">
        Memuat Editor Digital Anda...<br />
        Please wait
      </div>
      <div className="loader"></div>
    </div>
  );
};

export default SplashScreen;
