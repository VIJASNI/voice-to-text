import React, { useState } from "react";
import axios from "axios";

const MicButton = ({ setTranscribedText }) => {
  const [recording, setRecording] = useState(false);

  // Function triggered when the record button is clicked
  const handleClick = async () => {
    setRecording(!recording); // Toggle the recording state

    // Placeholder for voice data collection
    // In the real implementation,record audio from the user's microphone
    const voiceData = {
      // Convert recorded audio to base64 or FormData before sending
    };

    try {
      // Send recorded voice data to backend API
      const response = await axios.post(
        "https://voice-to-text-be.vercel.app/api/voice-to-text", 
        voiceData
      );

      // Update the transcribed text in the parent component (App.js)
      setTranscribedText(response.data.transcribedText);
    } catch (error) {
      console.error("Error sending voice data:", error);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition"
    >
      🎤 {recording ? "Recording..." : "Record"} {/* Display current recording state */}
    </button>
  );
};

export default MicButton;
