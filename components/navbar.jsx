"use client";
import React, { useEffect, useState } from "react";
import { Search, Sparkles } from "lucide-react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe(); // cleanup
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <nav className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 border-b border-blue-800/50 sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 group">
           
            <a href="/"> <div className=" text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-slate-300">
              Wearcy
            </div>
            </a>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex space-x-1">
            <a href="/" className="text-white hover:text-blue-300 font-medium px-4 py-2 rounded-lg hover:bg-blue-800/30 transition-all duration-200 relative group">
              Home
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400 transform scale-x-100 group-hover:scale-x-110 transition-transform duration-200"></span>
            </a>
            <a href="/discover" className="text-slate-300 hover:text-blue-300 font-medium px-4 py-2 rounded-lg hover:bg-blue-800/30 transition-all duration-200 relative group">
              Discover
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
            </a>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-blue-400 transition-colors duration-200" />
              <input
                type="text"
                placeholder="Search anything..."
                className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl pl-10 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/50 focus:bg-slate-800/70 transition-all duration-200 backdrop-blur-sm"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
            </div>
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex space-x-3 items-center">
            {user ? (
              <div className="flex items-center space-x-4">
               <a href="/profile"> 
               <div className="text-white font-medium">
                  👋 {user.email.split("@")[0]}
                </div>
                </a>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium shadow-md transition-all"
                >
                  Log out
                </button>
              </div>
            ) : (
              <>
                <a href="/login">
                  <button className="text-slate-300 hover:text-white font-medium px-4 py-2 rounded-lg hover:bg-slate-800/50 transition-all duration-200">
                    Sign In
                  </button>
                </a>
                
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
