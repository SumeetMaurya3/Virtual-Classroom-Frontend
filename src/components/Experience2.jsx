import {
    CameraControls,
    ContactShadows,
    Environment,
    Text,
  } from "@react-three/drei";
  import { Suspense, useEffect, useRef, useState } from "react";
  import { useChat } from "../hooks/useChat";
  import { Avatar } from "./Avatar";
  
  // A new Board component
  const Board = (props) => {
    return (
      <mesh {...props}>
        <planeGeometry args={[3, 2]} />
        <meshStandardMaterial color="#ffff" />
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
  
  export const Experience = () => {
    const cameraControls = useRef();
    const { cameraZoomed } = useChat();
  
    useEffect(() => {
      // Set the initial camera to focus on the board at (0,1.5,0)
      cameraControls.current.setLookAt(0, 1.5, 5, 0, 1.5, 0);
    }, []);
  
    useEffect(() => {
      if (cameraZoomed) {
        // When zoomed, the camera gets closer to the board
        cameraControls.current.setLookAt(0, 1.5, 2.5, 0, 1.5, 0, true);
      } else {
        // Default view: board remains the focus
        cameraControls.current.setLookAt(0, 1.5, 5, 0, 1.5, 0, true);
      }
    }, [cameraZoomed]);
  
    return (
      <>
        <CameraControls ref={cameraControls} />
        <Environment preset="sunset" />

        <Suspense>
          <Board position={[0, 1.5, -0.5]} />
        </Suspense>
  
        <Avatar position={[1, -0.2, 0]} />

  
        <Suspense>
          <Dots position-y={1.75} position-x={-0.02} />
        </Suspense>
  
        <ContactShadows opacity={0.7} />
      </>
    );
  };
  