import React from 'react'
import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { Experience } from "../components/Experience2";
import { UI } from "../components/UI";
export default function StudyPage() {
  return (
    <>
      <Loader />
      <Leva  hidden/>
      <UI />
      <Canvas shadows camera={{ position: [0, 0, 0], fov: 50 }}>
        <Experience />
      </Canvas>
    </>
  )
}
