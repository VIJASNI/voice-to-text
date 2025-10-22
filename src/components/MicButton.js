import React from "react";

const MicButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition"
    >
      🎤 Record
    </button>
  );
};

export default MicButton;
