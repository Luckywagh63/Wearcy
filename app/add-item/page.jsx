'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddItemPage() {
  const [formData, setFormData] = useState({
    title: '',
    brand: '',
    category: '',
    size: '',
    condition: '',
    color: '',
    material: '',
    type: '',
    description: '',
    tags: '',
    availability: 'both',
    pointsValue: 0,
    images: [],
  });

  const [uploading, setUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const router = useRouter();

  const categories = [
    'Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Shoes', 
    'Accessories', 'Activewear', 'Formal', 'Casual', 'Vintage'
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'One Size'];
  const conditions = ['Like New', 'Very Good', 'Good', 'Fair', 'Worn'];
  const colors = [
    'Black', 'White', 'Gray', 'Navy', 'Blue', 'Red', 'Pink', 
    'Purple', 'Green', 'Yellow', 'Orange', 'Brown', 'Beige', 'Multi'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (!files) return;

    if (formData.images.length + files.length > 6) {
      alert('Maximum 6 images allowed');
      return;
    }

    await handleFiles(files);
  };

  const handleFiles = async (files) => {
    const newImages = [];
    setUploading(true);

    for (const file of files) {
      const data = new FormData();
      data.append('file', file);

      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: data,
        });

        const result = await res.json();

        if (res.ok && result.url) {
          newImages.push(result.url);
        } else {
          console.error('Upload error:', result.error || result);
          alert('Image upload failed.');
        }
      } catch (err) {
        console.error('Upload exception:', err);
        alert('Image upload failed.');
      }
    }

    setFormData((prev) => ({ ...prev, images: [...prev.images, ...newImages] }));
    setUploading(false);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files = Array.from(e.dataTransfer.files);
    await handleFiles(files);
  };

  const removeImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, images: newImages }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      ...formData,
      tags: formData.tags.split(',').map((tag) => tag.trim()),
      pointsValue: Number(formData.pointsValue),
      createdBy: '665e6d91a2b3c8e51a9b12c4', // 🔁 Replace with a real user ID from MongoDB
    };

    try {
      const res = await fetch('/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        router.push(`/items/${data.item._id}`);
      } else {
        console.error('❌ Upload error:', data.error);
        alert(`Item upload failed: ${data.error || 'Unknown error'}`);
      }
    } catch (err) {
      console.error('❌ Submit exception:', err);
      alert('Something went wrong while uploading the item.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F9F5F2' }}>
      {/* Header */}
      <div className="sticky top-0 z-10 px-4 py-3 shadow-sm" style={{ backgroundColor: '#1E3548' }}>
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <button 
            onClick={() => router.back()}
            className="text-white hover:opacity-80 transition-opacity"
          >
            ← Back
          </button>
          <h1 className="text-xl font-semibold text-white">Add New Item</h1>
          <div className="w-12"></div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload Section */}
          <div className="p-6 rounded-lg shadow-sm" style={{ backgroundColor: '#4A6278' }}>
            <h2 className="text-lg font-semibold text-white mb-4">Product Images</h2>
            
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive ? 'border-white bg-black bg-opacity-10' : 'border-gray-300'
              }`}
              style={{ borderColor: dragActive ? '#D1C3B7' : '#D1C3B7' }}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <div className="text-white">
                  <div className="text-4xl mb-2">📸</div>
                  <p className="text-lg font-medium">Add Images</p>
                  <p className="text-sm opacity-80">Drag & drop or click to upload</p>
                  <p className="text-xs opacity-60 mt-1">Maximum 6 images</p>
                </div>
              </label>
            </div>

            {uploading && (
              <div className="mt-4 text-center">
                <p className="text-white">Uploading...</p>
              </div>
            )}

            {/* Image Previews */}
            {formData.images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {formData.images.map((url, index) => (
                  <div key={index} className="relative">
                    <img
                      src={url}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="p-6 rounded-lg shadow-sm" style={{ backgroundColor: 'white', borderColor: '#D1C3B7' }}>
            <h2 className="text-lg font-semibold mb-4" style={{ color: '#1E3548' }}>Product Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#1E3548' }}>
                  Title *
                </label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Vintage Denim Jacket"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  style={{ borderColor: '#D1C3B7' }}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#1E3548' }}>
                  Brand
                </label>
                <input
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  placeholder="e.g., Levi's, H&M, Zara"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  style={{ borderColor: '#D1C3B7' }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#1E3548' }}>
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  style={{ borderColor: '#D1C3B7' }}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#1E3548' }}>
                  Size *
                </label>
                <select
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  style={{ borderColor: '#D1C3B7' }}
                  required
                >
                  <option value="">Select Size</option>
                  {sizes.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#1E3548' }}>
                  Condition *
                </label>
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  style={{ borderColor: '#D1C3B7' }}
                  required
                >
                  <option value="">Select Condition</option>
                  {conditions.map(condition => (
                    <option key={condition} value={condition}>{condition}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#1E3548' }}>
                  Color
                </label>
                <select
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  style={{ borderColor: '#D1C3B7' }}
                >
                  <option value="">Select Color</option>
                  {colors.map(color => (
                    <option key={color} value={color}>{color}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#1E3548' }}>
                  Material
                </label>
                <input
                  name="material"
                  value={formData.material}
                  onChange={handleChange}
                  placeholder="e.g., Cotton, Denim, Polyester"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  style={{ borderColor: '#D1C3B7' }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#1E3548' }}>
                  Type
                </label>
                <input
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  placeholder="e.g., Casual, Formal, Party"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  style={{ borderColor: '#D1C3B7' }}
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium mb-1" style={{ color: '#1E3548' }}>
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your item's style, fit, and any special features..."
                rows={4}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                style={{ borderColor: '#D1C3B7' }}
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium mb-1" style={{ color: '#1E3548' }}>
                Tags
              </label>
              <input
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="vintage, trendy, summer, casual (comma-separated)"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                style={{ borderColor: '#D1C3B7' }}
              />
            </div>
          </div>

          {/* Exchange Options */}
          <div className="p-6 rounded-lg shadow-sm" style={{ backgroundColor: 'white', borderColor: '#D1C3B7' }}>
            <h2 className="text-lg font-semibold mb-4" style={{ color: '#1E3548' }}>Available For</h2>
            
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="availability"
                  value="both"
                  checked={formData.availability === 'both'}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span style={{ color: '#1E3548' }}>Both Swap & Points</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="availability"
                  value="swap"
                  checked={formData.availability === 'swap'}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span style={{ color: '#1E3548' }}>Swap Only</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="availability"
                  value="points"
                  checked={formData.availability === 'points'}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span style={{ color: '#1E3548' }}>Points Only</span>
              </label>
            </div>

            {(formData.availability === 'points' || formData.availability === 'both') && (
              <div className="mt-4">
                <label className="block text-sm font-medium mb-1" style={{ color: '#1E3548' }}>
                  Points Value
                </label>
                <input
                  type="number"
                  name="pointsValue"
                  value={formData.pointsValue}
                  onChange={handleChange}
                  placeholder="Enter points value"
                  min="1"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  style={{ borderColor: '#D1C3B7' }}
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              style={{ color: '#1E3548' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 text-white rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
              style={{ backgroundColor: '#1E3548' }}
            >
              {isSubmitting ? 'Adding Item...' : 'List Item'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}