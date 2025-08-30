import { FC, RefObject } from "react";

interface ToolbarProps {
  videoRef: RefObject<HTMLVideoElement>;
}

const Toolbar: FC<ToolbarProps> = ({ videoRef }) => {

  const handlePlay = () => videoRef.current?.play();
  const handlePause = () => videoRef.current?.pause();

  return (
    <div className="flex items-center justify-start bg-gray-800 p-2 space-x-2">
      <button className="bg-gray-700 text-white px-3 py-1 rounded" onClick={handlePlay}>Play</button>
      <button className="bg-gray-700 text-white px-3 py-1 rounded" onClick={handlePause}>Pause</button>
      <button className="bg-gray-700 text-white px-3 py-1 rounded">Cut</button>
      <button className="bg-gray-700 text-white px-3 py-1 rounded">Trim</button>
    </div>
  );
};

export default Toolbar;
