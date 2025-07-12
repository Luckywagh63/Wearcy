"use client"
import React, { useState, useEffect } from 'react';

const ReWearLanding = () => {
  const [counters, setCounters] = useState({ users: 0, items: 0, waste: 0, countries: 0 });

  useEffect(() => {
    const targets = { users: 50, items: 2000, waste: 80, countries: 150 };
    let current = { users: 0, items: 0, waste: 0, countries: 0 };
    
    const increment = () => {
      Object.keys(targets).forEach(key => {
        if (current[key] < targets[key]) {
          current[key] += Math.ceil(targets[key] / 50);
          if (current[key] > targets[key]) current[key] = targets[key];
        }
      });
      setCounters({ ...current });
      if (Object.values(current).some((val, i) => val < Object.values(targets)[i])) {
        requestAnimationFrame(increment);
      }
    };
    setTimeout(increment, 1000);
  }, []);

  return (
    <div className="bg-[#F9F3EF] text-[#1B3C53] overflow-hidden">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#F9F3EF] via-[#D2C1B6]/20 to-[#456882]/10"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#456882]/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-[#D2C1B6]/30 rounded-full blur-2xl animate-bounce"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
                <span className="text-[#1B3C53]">Wear</span><span className="text-[#456882]">cy</span>
              </h1>
              <p className="text-xl md:text-2xl text-[#456882] mb-8 font-light">
                Transform your wardrobe, transform the world.<br />
                <span className="text-[#1B3C53] font-medium">Exchange clothes sustainably.</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-[#1B3C53] hover:bg-[#456882] text-[#F9F3EF] px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl">
                  Start Exchanging
                </button>
                <button className="border-2 border-[#1B3C53] text-[#1B3C53] hover:bg-[#1B3C53] hover:text-[#F9F3EF] px-8 py-4 rounded-full font-bold text-lg transition-all duration-300">
                  Learn More
                </button>
              </div>
            </div>
            
            {/* Model Images */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative overflow-hidden rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-500">
                    <img 
                      src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=600&fit=crop&crop=face"
                      alt="Female model wearing sustainable fashion"
                      className="w-full h-80 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1B3C53]/50 to-transparent"></div>
                  </div>
                  <div className="relative overflow-hidden rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-500">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
                      alt="Male model in casual wear"
                      className="w-full h-60 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#456882]/50 to-transparent"></div>
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="relative overflow-hidden rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-500">
                    <img 
                      src="https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=500&fit=crop&crop=face"
                      alt="Female model in trendy outfit"
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#D2C1B6]/50 to-transparent"></div>
                  </div>
                  <div className="relative overflow-hidden rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-500">
                    <img 
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face"
                      alt="Male model in stylish clothing"
                      className="w-full h-72 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1B3C53]/50 to-transparent"></div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-[#456882] rounded-full opacity-20 animate-bounce"></div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-[#D2C1B6] rounded-full opacity-30 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-[#F9F3EF] to-[#D2C1B6]/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-[#1B3C53] mb-6">Why Choose ReWear?</h2>
            <p className="text-xl text-[#456882] max-w-2xl mx-auto">Join the sustainable fashion revolution</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "🔄", title: "Easy Exchange", desc: "Simple, secure platform to exchange clothes worldwide." },
              { icon: "🌱", title: "Eco-Friendly", desc: "Reduce waste by giving clothes a second life." },
              { icon: "✨", title: "Quality Assured", desc: "All items verified for quality and authenticity." }
            ].map((item, i) => (
              <div key={i} className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 text-center hover:shadow-xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
                <div className="w-16 h-16 bg-[#1B3C53] rounded-full mx-auto mb-6 flex items-center justify-center text-3xl">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-[#456882]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-[#1B3C53] to-[#456882] text-[#F9F3EF]">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div><div className="text-5xl font-black mb-2">{counters.users}K+</div><div className="text-[#D2C1B6]">Happy Users</div></div>
            <div><div className="text-5xl font-black mb-2">{counters.items}K+</div><div className="text-[#D2C1B6]">Items Exchanged</div></div>
            <div><div className="text-5xl font-black mb-2">{counters.waste}%</div><div className="text-[#D2C1B6]">Waste Reduced</div></div>
            <div><div className="text-5xl font-black mb-2">{counters.countries}+</div><div className="text-[#D2C1B6]">Countries</div></div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gradient-to-b from-[#F9F3EF] to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-[#1B3C53] mb-6">Trending Exchanges</h2>
            <p className="text-xl text-[#456882]">Discover amazing pieces from our community</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=400&fit=crop", name: "Vintage Denim Jacket", user: "Sarah M.", location: "NYC" },
              { img: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=300&h=400&fit=crop", name: "Designer Silk Dress", user: "Emma K.", location: "LA" },
              { img: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=300&h=400&fit=crop", name: "Casual Sweater", user: "Mike R.", location: "Chicago" },
              { img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop", name: "Summer Floral Top", user: "Lisa T.", location: "Miami" }
            ].map((item, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-500">
                  <img src={item.img} alt={item.name} className="w-full h-72 object-cover transform group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 text-white transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    <p className="text-sm opacity-90">by {item.user} • {item.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button className="bg-[#1B3C53] hover:bg-[#456882] text-[#F9F3EF] px-8 py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105">
              View All Items
            </button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-[#F9F3EF]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-[#1B3C53] mb-6">How It Works</h2>
            <p className="text-xl text-[#456882]">Three simple steps to sustainable fashion</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Upload", desc: "Take photos of clothes you want to exchange", icon: "📱" },
              { step: "2", title: "Match", desc: "Connect with users who have items you love", icon: "🔗" },
              { step: "3", title: "Exchange", desc: "Complete the exchange and enjoy new pieces", icon: "✨" }
            ].map((item, i) => (
              <div key={i} className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-[#1B3C53] to-[#456882] rounded-full mx-auto mb-6 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <div className="text-4xl font-black text-[#456882] mb-2">{item.step}</div>
                <h3 className="text-2xl font-bold text-[#1B3C53] mb-4">{item.title}</h3>
                <p className="text-[#456882]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1B3C53] text-[#F9F3EF] py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-black mb-4">ReWear</h3>
              <p className="text-[#D2C1B6]">Sustainable fashion for tomorrow</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Platform</h4>
              <ul className="space-y-2 text-[#D2C1B6]">
                <li><a href="#" className="hover:text-[#F9F3EF] transition-colors">How it works</a></li>
                <li><a href="#" className="hover:text-[#F9F3EF] transition-colors">Features</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-[#D2C1B6]">
                <li><a href="#" className="hover:text-[#F9F3EF] transition-colors">About</a></li>
                <li><a href="#" className="hover:text-[#F9F3EF] transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Follow</h4>
              <div className="flex space-x-3">
                {['📱', '🐦', '📘'].map((icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 bg-[#456882] rounded-full flex items-center justify-center hover:bg-[#D2C1B6] transition-colors">
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-[#456882] mt-8 pt-8 text-center text-[#D2C1B6]">
            <p>&copy; 2025 ReWear. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ReWearLanding;