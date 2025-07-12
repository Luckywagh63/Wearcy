"use client";
import React, { useState } from 'react';

const ReWearDiscover = () => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const clothes = [
    { id: 1, name: "Vintage Denim Jacket", user: "Sarah M.", location: "NYC", size: "M", category: "jackets", img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=400&fit=crop", condition: "Excellent", tags: ["vintage", "denim"] },
    { id: 2, name: "Designer Silk Dress", user: "Emma K.", location: "LA", size: "S", category: "dresses", img: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=300&h=400&fit=crop", condition: "Like New", tags: ["designer", "silk"] },
    { id: 3, name: "Casual Sweater", user: "Mike R.", location: "Chicago", size: "L", category: "tops", img: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=300&h=400&fit=crop", condition: "Good", tags: ["casual", "winter"] },
    { id: 4, name: "Summer Floral Top", user: "Lisa T.", location: "Miami", size: "M", category: "tops", img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop", condition: "Excellent", tags: ["summer", "floral"] },
    { id: 5, name: "Leather Boots", user: "Alex J.", location: "Seattle", size: "9", category: "shoes", img: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=300&h=400&fit=crop", condition: "Good", tags: ["leather", "boots"] },
    { id: 6, name: "Wool Coat", user: "Maria S.", location: "Boston", size: "M", category: "coats", img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=300&h=400&fit=crop", condition: "Like New", tags: ["wool", "winter"] },
    { id: 7, name: "Striped Blouse", user: "Jenny L.", location: "Portland", size: "S", category: "tops", img: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=300&h=400&fit=crop", condition: "Excellent", tags: ["stripes", "office"] },
    { id: 8, name: "Skinny Jeans", user: "Tom H.", location: "Denver", size: "32", category: "pants", img: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=400&fit=crop", condition: "Good", tags: ["denim", "skinny"] }
  ];

  const categories = ['all', 'tops', 'dresses', 'jackets', 'pants', 'shoes', 'coats'];
  const filteredClothes = filter === 'all' ? clothes : clothes.filter(item => item.category === filter);

  return (
    <div className="bg-[#F9F3EF] min-h-screen">
      {/* Header */}
      <header className="bg-white/70 backdrop-blur-sm sticky top-0 z-50 border-b border-[#D2C1B6]">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-black text-[#1B3C53]">
              Wear<span className="text-[#456882]">cy</span>
            </h1>
            <div className="flex items-center gap-4">
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-full border border-[#456882] bg-white text-[#1B3C53] focus:outline-none focus:ring-2 focus:ring-[#456882]"
              >
                <option value="newest">Newest</option>
                <option value="popular">Popular</option>
                <option value="nearby">Nearby</option>
              </select>
              <button className="bg-[#1B3C53] text-[#F9F3EF] px-6 py-2 rounded-full font-bold hover:bg-[#456882] transition-colors">
                Upload Item
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Filters */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#1B3C53] mb-4">Discover Amazing Pieces</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  filter === cat 
                    ? 'bg-[#1B3C53] text-[#F9F3EF]' 
                    : 'bg-white text-[#456882] hover:bg-[#D2C1B6]/30'
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredClothes.map(item => (
            <div key={item.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden group">
              <div className="relative overflow-hidden">
                <img 
                  src={item.img} 
                  alt={item.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold text-[#1B3C53]">
                  {item.condition}
                </div>
                <div className="absolute bottom-3 left-3 bg-[#1B3C53]/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold text-white">
                  Size {item.size}
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-bold text-lg text-[#1B3C53] mb-2">{item.name}</h3>
                <p className="text-[#456882] text-sm mb-3">by {item.user} • {item.location}</p>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {item.tags.map(tag => (
                    <span key={tag} className="bg-[#D2C1B6]/30 text-[#1B3C53] px-2 py-1 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <button className="flex-1 bg-[#1B3C53] hover:bg-[#456882] text-white py-2 px-4 rounded-full font-bold text-sm transition-colors">
                    Exchange
                  </button>
                  <button className="w-10 h-10 border-2 border-[#456882] text-[#456882] hover:bg-[#456882] hover:text-white rounded-full flex items-center justify-center transition-colors">
                    ❤️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="bg-[#456882] hover:bg-[#1B3C53] text-white px-8 py-3 rounded-full font-bold transition-colors">
            Load More Items
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReWearDiscover;