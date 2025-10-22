import React from "react";

const TranscriptionArea = ({ text }) => {
  return (
    <textarea
      value={text}
      readOnly
      className="w-full h-40 border border-gray-300 p-2 rounded mt-3"
      placeholder="Transcribed text will appear here..."
    />
  );
};

export default TranscriptionArea;
