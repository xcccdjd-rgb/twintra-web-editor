import { FC, useRef, useState } from "react";
import Toolbar from "../components/Toolbar";
import Timeline from "../components/Timeline";
import MediaPanel from "../components/MediaPanel";
import Preview from "../components/Preview";

const EditorLayout: FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentTime, setCurrentTime] = useState(0);

  const handleTimeUpdate = () => {
    if(videoRef.current){
      setCurrentTime(videoRef.current.currentTime);
    }
  }

  return (
    <div className="h-screen flex flex-col bg-gray-900">
      <Toolbar videoRef={videoRef} />
      <div className="flex flex-1">
        <MediaPanel />
        <Preview videoRef={videoRef} onTimeUpdate={handleTimeUpdate}/>
      </div>
      <Timeline videoRef={videoRef} currentTime={currentTime}/>
    </div>
  );
};

export default EditorLayout;
