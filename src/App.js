import logo from './logo.svg';
import React, { useState } from "react";
import MicButton from "./components/MicButton";
import TranscriptionArea from "./components/TranscriptionArea";
import RecordingStatus from "./components/RecordingStatus";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [status, setStatus] = useState("Not recording");

  const handleRecordClick = () => {
    setStatus("Listening...");
    setTimeout(() => {
      setStatus("Not recording");
      setText("Hello World"); // Temporary dummy text
    }, 3000);
  };

  return (
    <div className="App p-5 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-5">Voice-to-Text App</h1>
      <MicButton onClick={handleRecordClick} />
      <RecordingStatus status={status} />
      <TranscriptionArea text={text} />
    </div>
  );
}

export default App;
