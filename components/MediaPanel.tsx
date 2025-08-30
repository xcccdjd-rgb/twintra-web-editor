import { FC } from "react";

const MediaPanel: FC = () => {
  return (
    <div className="w-64 bg-gray-800 p-2 overflow-y-auto">
      <p className="text-white mb-2">Media Library</p>
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-gray-700 h-20"></div>
        <div className="bg-gray-700 h-20"></div>
        <div className="bg-gray-700 h-20"></div>
        <div className="bg-gray-700 h-20"></div>
      </div>
    </div>
  );
};

export default MediaPanel;
