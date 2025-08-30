import { FC, RefObject } from "react";

interface PreviewProps {
  videoRef: RefObject<HTMLVideoElement>;
  onTimeUpdate: () => void;
}

const Preview: FC<PreviewProps> = ({ videoRef, onTimeUpdate }) => {
  return (
    <div className="flex-1 bg-black flex items-center justify-center">
      <video
        ref={videoRef}
        src="/assets/sample.mp4"
        controls
        className="w-full h-full object-contain"
        onTimeUpdate={onTimeUpdate}
      />
    </div>
  );
};

export default Preview;
