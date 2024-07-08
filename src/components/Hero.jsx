import React from 'react'
import post from "../assets/post.png"
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className='w-full h-screen flex flex-col md:flex-row gap-16 justify-between items-center'>
        <div className='w-full lg:w-1/2'>
            <h1 class="text-4xl font-bold text-gray-900 mb-6">
                Welcome to PostIt: Your Ultimate Blogging Platform
            </h1>
            <p class="text-lg text-gray-700 mb-8">
                Discover a seamless way to create, and manage your posts with ease.
                Join our community of writers and start sharing your stories today.
            </p>
            <Link to ="/login">
                <button  className="theme py-2 px-4 rounded-md">
                Get Started
                </button>
            </Link>
        </div>
        <div class="flex justify-center mb-8 w-full lg:w-1/2">
            <img src={post} alt="PostIt App Screenshot" class="rounded-lg shadow-lg w-4/5"/>
    </div>
    </div>
  )
}

export default Hero