import { useRef, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useChat } from "../hooks/useChat";
import getGeminiSummary from "./Gemini";

export const UI = ({ hidden, totalSlides, setCurrentSlide, ...props }) => {
  const { chat, loading, cameraZoomed, setCameraZoomed, message } = useChat();
  const [slideIndex, setSlideIndex] = useState(0);
  const { transcript, resetTranscript, listening } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);
  const [manualInput, setManualInput] = useState(""); // State for keyboard input

  const sendMessage = async () => {
    const text = `${manualInput} ${transcript}`.trim();
    if (!loading && !message && text) {
      const summary = await getGeminiSummary(text);
      chat(summary);
      setManualInput(""); // Clear manual input
      resetTranscript(); // Reset speech input
    }
  };

  const handleNextSlide = () => {
    setSlideIndex((prev) => {
      const nextIndex = (prev + 1) % totalSlides;
      setCurrentSlide(nextIndex);
      return nextIndex;
    });
  };

  const handlePrevSlide = () => {
    setSlideIndex((prev) => {
      const prevIndex = (prev - 1 + totalSlides) % totalSlides;
      setCurrentSlide(prevIndex);
      return prevIndex;
    });
  };

  const toggleListening = () => {
    if (isListening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening({ continuous: true });
    }
    setIsListening(!isListening);
  };

  if (hidden) {
    return null;
  }

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 z-10 flex justify-between p-4 flex-col pointer-events-none">
        <div className="w-full flex flex-col items-end justify-center gap-4">
          <button
            onClick={() => setCameraZoomed(!cameraZoomed)}
            className="pointer-events-auto bg-yellow-500 hover:bg-yellow-600 text-white p-4 rounded-md"
          >
            {cameraZoomed ? "Zoom Out" : "Zoom In"}
          </button>

          {/* Slide Controls */}
          <div className="flex gap-2">
            <button
              onClick={handlePrevSlide}
              className="pointer-events-auto bg-yellow-500 hover:bg-yellow-600 text-white p-4 rounded-md"
            >
              Previous
            </button>
            <button
              onClick={handleNextSlide}
              className="pointer-events-auto bg-yellow-500 hover:bg-yellow-600 text-white p-4 rounded-md"
            >
              Next
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto max-w-screen-sm w-full mx-auto">
          <input
            className="w-full placeholder:text-gray-800 placeholder:italic p-4 rounded-md bg-opacity-50 bg-white backdrop-blur-md"
            placeholder="Type a message..."
            value={manualInput || transcript}
            onChange={(e) => setManualInput(e.target.value)} // Handle keyboard input
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          />
          <button
            disabled={loading || message}
            onClick={sendMessage}
            className={`bg-yellow-500 hover:bg-yellow-600 text-white p-4 px-10 font-semibold uppercase rounded-md ${
              loading || message ? "cursor-not-allowed opacity-30" : ""
            }`}
          >
            Send
          </button>

          {/* Speech Recognition Button */}
          <button
            onClick={toggleListening}
            className={`p-4 rounded-md ${
              isListening
                ? "bg-red-500 hover:bg-red-600"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white`}
          >
            {isListening ? "Stop" : "Speak"}
          </button>
        </div>
      </div>
    </>
  );
};
