import { BellIcon, LucideArrowDownAZ, SearchIcon, Smile } from 'lucide-react'
import React from 'react'
import { Link, Links } from 'react-router-dom'

const Navbar = () => {
    return (
        <div
            class="sticky top-0 z-50 bg-black/50 backdrop-blur-sm flex flex-col md:flex-row items-center justify-between p-4 gap-2">

            <div class="flex items-center w-full md:w-[30%] bg-neutral-500 rounded-full px-4 py-2">
                <input type="text" placeholder="Search" class="bg-transparent outline-none text-sm flex-grow" />
            </div>

            <div class="hidden md:flex flex-wrap justify-center gap-2 text-lg text-yellow-500 font-bold">
                <button class="px-4 py-1 rounded-full hover:bg-green-100">Movies</button>
                <button class="px-4 py-1 rounded-full hover:bg-neutral-100">TV Series</button>
                <button class="px-4 py-1 rounded-full hover:bg-green-100">Animation</button>
                <button class="px-4 py-1 rounded-full hover:bg-neutral-100">Thriller</button>
                <button class="px-4 py-1 rounded-full hover:bg-green-100">Drama</button>
                <button class="px-4 py-1 rounded-full hover:bg-neutral-100">More</button>
            </div>


            <div class="md:hidden w-full">
                <select class="text-black px-3 py-1 rounded w-full">
                    <option>Movies</option>
                    <option>TV Series</option>
                    <option>Animation</option>
                    <option>Thriller</option>
                    <option>Drama</option>
                    <option>More</option>
                </select>
            </div>


            <div class="flex items-center space-x-2 bg-black/40 p-2 rounded-full">
                <LucideArrowDownAZ/>
                <img src="https://www.deccanchronicle.com/h-upload/2025/03/30/1902795-alluarjun.webp" alt="Avatar" class="w-8 h-8 rounded-full" />
            </div>
        </div>
    )
}

export default Navbar