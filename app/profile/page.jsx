"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser) {
        router.push("/login");
      } else {
        setUser(firebaseUser);
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (!user) {
    return (
      <div className="min-h-screen bg-[#F9F3EF] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-[#456882] rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse">
            <span className="text-2xl text-[#F9F3EF]">👤</span>
          </div>
          <p className="text-[#456882] text-lg">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F3EF] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F9F3EF] via-[#D2C1B6]/20 to-[#456882]/10"></div>
      <div className="absolute top-20 left-10 w-32 h-32 bg-[#456882]/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-[#D2C1B6]/30 rounded-full blur-2xl animate-bounce"></div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-[#1B3C53] mb-4">
            Your <span className="text-[#456882]">Profile</span>
          </h1>
          <p className="text-xl text-[#456882]">Manage your Wearcy account</p>
        </div>

        {/* Profile Card */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
            <div className="text-center mb-8">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-[#456882] shadow-lg"
                />
              ) : (
                <div className="w-24 h-24 bg-gradient-to-br from-[#1B3C53] to-[#456882] rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl text-[#F9F3EF]">👤</span>
                </div>
              )}
              <h2 className="text-2xl font-bold text-[#1B3C53]">
                {user.displayName || "Fashion Enthusiast"}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-[#F9F3EF] rounded-2xl p-6">
                <h3 className="text-lg font-bold text-[#1B3C53] mb-2">📧 Email</h3>
                <p className="text-[#456882]">{user.email}</p>
              </div>
              
              <div className="bg-[#F9F3EF] rounded-2xl p-6">
                <h3 className="text-lg font-bold text-[#1B3C53] mb-2">🆔 User ID</h3>
                <p className="text-[#456882] text-sm font-mono">{user.uid.substring(0, 8)}...</p>
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center bg-gradient-to-br from-[#1B3C53] to-[#456882] rounded-2xl p-4 text-white">
                <div className="text-2xl font-black">12</div>
                <div className="text-sm opacity-90">Items Listed</div>
              </div>
              <div className="text-center bg-gradient-to-br from-[#456882] to-[#D2C1B6] rounded-2xl p-4 text-[#1B3C53]">
                <div className="text-2xl font-black">8</div>
                <div className="text-sm opacity-90">Exchanges</div>
              </div>
              <div className="text-center bg-gradient-to-br from-[#D2C1B6] to-[#F9F3EF] rounded-2xl p-4 text-[#1B3C53]">
                <div className="text-2xl font-black">4.8</div>
                <div className="text-sm opacity-90">Rating</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 bg-[#1B3C53] hover:bg-[#456882] text-[#F9F3EF] py-3 px-6 rounded-full font-bold transition-all duration-300 transform hover:scale-105">
                Edit Profile
              </button>
              <button className="flex-1 border-2 border-[#456882] text-[#456882] hover:bg-[#456882] hover:text-[#F9F3EF] py-3 px-6 rounded-full font-bold transition-all duration-300">
                View My Items
              </button>
              <button 
                onClick={() => auth.signOut()}
                className="flex-1 bg-[#D2C1B6] hover:bg-[#456882] text-[#1B3C53] hover:text-[#F9F3EF] py-3 px-6 rounded-full font-bold transition-all duration-300"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="max-w-4xl mx-auto mt-12 grid md:grid-cols-3 gap-6">
          {[
            { icon: "📤", title: "Upload Item", desc: "List a new piece for exchange" },
            { icon: "💬", title: "Messages", desc: "Check your conversations" },
            { icon: "⚙️", title: "Settings", desc: "Manage your preferences" }
          ].map((item, i) => (
            <div key={i} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-[#1B3C53] to-[#456882] rounded-full mx-auto mb-4 flex items-center justify-center text-2xl">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-[#1B3C53] mb-2">{item.title}</h3>
              <p className="text-[#456882] text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}