import {
  CameraControls,
  ContactShadows,
  Environment,
  Text,
  Html,
  useTexture,
} from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import { useChat } from "../hooks/useChat";
import { Avatar } from "./Avatar";
import getGeminiSummary from "./Gemini";

const Board = ({ content, currentSlide, ...props }) => {
  const section = content[currentSlide];

  if (!section) return null;

  return (
    <mesh {...props}>
      <planeGeometry args={[4, 2]} />
      <meshStandardMaterial color="#ffffff" />

      <Html position={[-0, 0, 0.01]} transform occlude>
        <div style={{ fontSize: "3px", maxWidth: "150px" }}>
          <h3 style={{ fontWeight: "bold" }}>{section.title}</h3>
          <p>{section.text}</p>
        </div>
      </Html>
    </mesh>
  );
};

const Dots = (props) => {
  const { loading } = useChat();
  const [loadingText, setLoadingText] = useState("");

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setLoadingText((prev) => (prev.length > 2 ? "." : prev + "."));
      }, 800);
      return () => clearInterval(interval);
    } else {
      setLoadingText("");
    }
  }, [loading]);

  if (!loading) return null;

  return (
    <group {...props}>
      <Text fontSize={0.14} anchorX="left" anchorY="bottom">
        {loadingText}
        <meshBasicMaterial attach="material" color="black" />
      </Text>
    </group>
  );
};

// ✅ Environment Cube Component
const EnvironmentCube = () => {
  const floortexture = useTexture("/images/floor.jpg"); // Add your own texture image
  const walltexture = useTexture("/images/ceil.png"); // Add your own texture image
  const sidewalltexture = useTexture("/images/pain13.png"); // Add your own texture image
  const bricktexture = useTexture("/images/pain13.png"); // Add your own texture image
  const size = 8;

  return (
    <group>
      {/* Floor */}
      <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[size, size]} />
        <meshBasicMaterial map={floortexture} />
      </mesh>

      {/* Ceiling */}
      <mesh position={[0, size / 2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[size, size]} />
        <meshStandardMaterial map={walltexture} />
      </mesh>

      {/* Back Wall */}
      <mesh position={[0, 0, size]}>
        <planeGeometry args={[size, size]} />
        <meshStandardMaterial map={bricktexture} />
      </mesh>

      {/* Front Wall */}
      <mesh position={[0, 0, -0.7]}>
        <planeGeometry args={[size, size]} />
        <meshStandardMaterial map={bricktexture} />
      </mesh>

      {/* Left Wall */}
      <mesh position={[-size / 2, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[size, size]} />
        <meshBasicMaterial map={sidewalltexture} />
      </mesh>

      {/* Right Wall */}
      <mesh position={[size / 2, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[size, size]} />
        <meshBasicMaterial map={sidewalltexture} />
      </mesh>
    </group>
  );
};

export const Experience = ({ parsedContent, currentSlide }) => {
  const cameraControls = useRef();
  const { cameraZoomed, chat } = useChat();
  const [sentSlides, setSentSlides] = useState(new Set());

  useEffect(() => {
    // Initial camera position
    cameraControls.current.setLookAt(0, 1.5, 5, 0, 1.5, 0);
  }, []);

  // Dynamically generate the slide content
  const contentSections = [
    { title: "Title", text: parsedContent?.title || "No title available" },
    ...(parsedContent?.keyFacts.map((fact, i) => ({
      title: `Key Fact ${i + 1}`,
      text: fact.text,
    })) || []),
    ...(parsedContent?.mainPoints.map((point, i) => ({
      title: `Main Point ${i + 1}`,
      text: point.text,
    })) || []),
    { title: "Detailed Analysis", text: parsedContent?.analysis || "" },
    { title: "Conclusion", text: parsedContent?.conclusion || "" },
  ];

  useEffect(() => {
    const fetchSummaryAndSend = async () => {
      if (!sentSlides.has(currentSlide)) {
        const section = contentSections[currentSlide];
        if (section) {
          const message = `${section.title}: ${section.text}`;

          try {
            const summary = await getGeminiSummary(message); // Call Gemini API
            chat(summary); // Send Gemini’s response to chat
            setSentSlides((prev) => new Set(prev).add(currentSlide)); // Mark as sent
          } catch (error) {
            console.error("Error fetching summary:", error);
          }
        }
      }
    };

    fetchSummaryAndSend();
  }, [currentSlide, chat, contentSections, sentSlides]);

  useEffect(() => {
    if (cameraZoomed) {
      cameraControls.current.setLookAt(0, 1.5, 2.5, 0, 1.5, 0, true);
    } else {
      cameraControls.current.setLookAt(0, 1.5, 5, 0, 1.5, 0, true);
    }
  }, [cameraZoomed]);

  return (
    <>
      <CameraControls ref={cameraControls} />
      <Environment preset="sunset" />

      <Suspense>
        <EnvironmentCube /> {/* ✅ Add Environment Cube */}
      </Suspense>

      <Suspense>
        <Board
          position={[0, 1.5, -0.5]}
          content={contentSections}
          currentSlide={currentSlide}
        />
      </Suspense>

      <Avatar position={[2, 0, 0]} />

      <Suspense>
        <Dots position-y={1.75} position-x={-0.02} />
      </Suspense>

      <ContactShadows opacity={0.7} />
    </>
  );
};
