import { FacebookIcon, Instagram, InstagramIcon, TwitterIcon, YoutubeIcon } from "lucide-react";
import React from "react";


export default function Footer() {
  return (
    <footer className="bg-black text-gray-400  text-[12px] py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Social icons */}
        <div className="flex space-x-4  mb-6">
          <FacebookIcon className="hover:text-white  cursor-pointer w-5 h-5" />
          <InstagramIcon className="hover:text-white cursor-pointer w-5 h-5" />
          <TwitterIcon className="hover:text-white cursor-pointer w-5 h-5" />
          <YoutubeIcon className="hover:text-white cursor-pointer w-5 h-5" />
        </div>

        {/* Grid of links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <a href="#" className="hover:underline">Audio Description</a>
          <a href="#" className="hover:underline">Help Centre</a>
          <a href="#" className="hover:underline">Gift Cards</a>
          <a href="#" className="hover:underline">Media Centre</a>
          
          <a href="#" className="hover:underline">Investor Relations</a>
          <a href="#" className="hover:underline">Jobs</a>
          <a href="#" className="hover:underline">Terms of Use</a>
          <a href="#" className="hover:underline">Privacy</a>

          <a href="#" className="hover:underline">Legal Notices</a>
          <a href="#" className="hover:underline">Cookie Preferences</a>
          <a href="#" className="hover:underline">Corporate Information</a>
          <a href="#" className="hover:underline">Contact Us</a>
        </div>

        {/* Service Code button */}
        <button className="border border-gray-400 px-3 py-1 mb-4 hover:bg-gray-700 transition-colors">
          Service Code
        </button>

        {/* Copyright */}
        <p className="text-xs">&copy; 1997–2025 Netflix, Inc.</p>
      </div>
    </footer>
  );
}
