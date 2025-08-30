import { FC, RefObject, useEffect, useState } from "react";

interface TimelineProps {
  videoRef: RefObject<HTMLVideoElement>;
  currentTime: number;
}

const Timeline: FC<TimelineProps> = ({ videoRef, currentTime }) => {
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if(videoRef.current){
      setDuration(videoRef.current.duration || 0);
    }
  }, [videoRef]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(videoRef.current){
      videoRef.current.currentTime = Number(e.target.value);
    }
  };

  return (
    <div className="p-2 bg-gray-900 flex items-center">
      <input
        type="range"
        min={0}
        max={duration}
        value={currentTime}
        onChange={handleChange}
        className="w-full"
      />
    </div>
  );
};

export default Timeline;
