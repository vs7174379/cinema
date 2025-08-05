import React from 'react'
import SquidGameCard from '../components/SquidGameCard'
import { HoverCard } from '../components/HoverCard'

const Home = () => {
  return (
    <div className='flex  items-center justify-center w-full  bg-[url("./hero_banner.jpg")] bg-cover bg-center h-300'>
     <HoverCard/>
    </div>
  )
}

export default Home