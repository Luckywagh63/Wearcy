"use client";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function BrowsePage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const q = query(collection(db, "items"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setItems(data);
    };

    fetchItems();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <h1 className="text-2xl font-bold text-center mb-6">Browse Exchange Items</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-md p-4">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-48 object-cover rounded-md mb-3"
            />
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <p className="text-sm text-slate-600">{item.description}</p>
            <p className="text-xs text-slate-500 mt-1">
              Size: {item.size} | Category: {item.category}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
