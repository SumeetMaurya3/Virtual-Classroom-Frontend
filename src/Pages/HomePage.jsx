import React from 'react'
import Head from '../components/Head.jsx'
import HomeProfile from '../components/HomeProfile.jsx'
import PopularCourses from '../components/PopularCourses.jsx'
import Foot from '../components/Foot.jsx'

export default function HomePage() {
  return (
    <>
    <Head/>
    <HomeProfile/>
    <PopularCourses/>
    <Foot/>
    </>
  )
}
