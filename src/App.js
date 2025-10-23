import React, { useState } from "react";
import MicButton from "./components/MicButton";
import TranscriptionArea from "./components/TranscriptionArea";
import RecordingStatus from "./components/RecordingStatus";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [status, setStatus] = useState("Not recording");
  const [isRecording, setIsRecording] = useState(false);

  const handleRecordClick = async () => {
    if (isRecording) return; // prevent multiple clicks
    setIsRecording(true);
    console.log("Record button clicked");

    try {
      setStatus("Requesting microphone permission...");
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log("Microphone access granted", stream);
      setStatus("Recording...");

      const mediaRecorder = new MediaRecorder(stream);
      const audioChunks = [];

      mediaRecorder.ondataavailable = (e) => {
        console.log("Audio chunk received", e.data);
        audioChunks.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        console.log("Recording stopped");
        setStatus("Processing your voice...");
        setIsRecording(false);

        if (audioChunks.length === 0) {
          setText("No audio recorded");
          setStatus("❌ Recording failed");
          return;
        }

        const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
        const formData = new FormData();
        formData.append("audio", audioBlob, "recording.webm");

        try {
          const response = await fetch(
            "https://voice-to-text-be.vercel.app/api/voice-to-text",
            { method: "POST", body: formData }
          );

          if (!response.ok) throw new Error("Failed to fetch transcription");

          const data = await response.json();
          setText(data.transcribedText || "No text detected");
          setStatus("✅ Transcription complete!");
        } catch (error) {
          console.error("Error fetching transcription:", error);
          setText("Error fetching transcription");
          setStatus("❌ Error during transcription");
        }
      };

      mediaRecorder.start();
      console.log("MediaRecorder started");

      // Stop recording after 5 seconds
      setTimeout(() => {
        if (mediaRecorder.state !== "inactive") mediaRecorder.stop();
      }, 5000);
    } catch (err) {
      console.error("Microphone access denied:", err);
      setStatus("❌ Microphone permission required!");
      setText("Microphone access denied");
      setIsRecording(false);
      alert("Please allow microphone access!");
    }
  };

  return (
    <div className="App p-5 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-5">🎤 Voice-to-Text App</h1>
      <MicButton onClick={handleRecordClick} disabled={isRecording} />
      <RecordingStatus status={status} />
      <TranscriptionArea text={text} />
    </div>
  );
}

export default App;
