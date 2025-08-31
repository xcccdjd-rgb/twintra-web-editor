import React from 'react';
import PhotoEditor from '../components/PhotoEditor';
import VideoEditor from '../components/VideoEditor';
import LogoDesigner from '../components/LogoDesigner';
import Footer from '../components/Footer';

const Dashboard = () => {
  return (
    <div>
      <h2>Editor Dashboard</h2>
      <PhotoEditor />
      <VideoEditor />
      <LogoDesigner />
      <Footer />
    </div>
  );
};

export default Dashboard;
