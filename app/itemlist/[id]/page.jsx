import React from 'react';
import { Search, ShoppingCart, Heart, Star, Share2, ArrowLeft, User, MapPin, Calendar, Award, Zap, RefreshCw, Gift, Shirt, Coins, Package, Palette, Scissors, Tag, Clock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { connectToDB } from '@/lib/db';
import Item from '@/models/Item';

// This should be used as a server component
export async function generateStaticParams() {
  await connectToDB();
  const items = await Item.find();
  return items.map((item) => ({ id: item._id.toString() }));
}

const RewearPlatform = async ({ params }) => {
  // Fetch item data from MongoDB without population
  await connectToDB();
  const item = await Item.findById(params.id).lean();

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F9F5F2' }}>
        <div className="text-center">
          <XCircle className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <p className="text-xl font-medium mb-2" style={{ color: '#1E3548' }}>Item Not Found</p>
          <p className="mb-6" style={{ color: '#4A6278' }}>The item you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#1E3548' }}
          >
            <div className="flex items-center space-x-2">
              <ArrowLeft className="w-5 h-5" />
              <span>Go Back</span>
            </div>
          </button>
        </div>
      </div>
    );
  }

  // Mock user points - in real app, this would come from user session/context
  const userPoints = 3420;

  // Mock uploader data - in real app, this would come from a separate User query
  const uploader = {
    name: "Fashion Lover",
    avatar: "/api/placeholder/60/60",
    rating: 4.5,
    totalSwaps: 23,
    memberSince: "2024",
    location: "New York, NY",
    verified: true,
    responseTime: "Usually responds within 1 hour",
    sustainabilityScore: 85,
    itemsShared: 47
  };

  const getAvailabilityColor = (status) => {
    switch (status) {
      case 'available': return 'bg-green-500';
      case 'swapped': return 'bg-yellow-500';
      case 'redeemed': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getAvailabilityText = (status) => {
    switch (status) {
      case 'available': return 'Available for Rewear';
      case 'swapped': return 'Currently Swapped';
      case 'redeemed': return 'Already Redeemed';
      default: return 'Status Unknown';
    }
  };

  const getAvailabilityOptions = (availability) => {
    switch (availability) {
      case 'both': return 'Available for Swap & Points';
      case 'swap': return 'Available for Swap Only';
      case 'points': return 'Available for Points Only';
      default: return 'Availability Unknown';
    }
  };

  const getAvailabilityIcon = (availability) => {
    switch (availability) {
      case 'both': return <div className="flex items-center space-x-1"><RefreshCw className="w-4 h-4" /><span>&</span><Coins className="w-4 h-4" /></div>;
      case 'swap': return <RefreshCw className="w-4 h-4" />;
      case 'points': return <Coins className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'available': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'swapped': return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'redeemed': return <XCircle className="w-4 h-4 text-red-600" />;
      default: return <Package className="w-4 h-4 text-gray-600" />;
    }
  };

  const canUsePoints =
    item.availability === 'points' || item.availability === 'both';

  const canSwap =
    item.availability === 'swap' || item.availability === 'both';

  const isAvailable = item.status === 'available';

  // Check if user can afford the item
  const canAfford = userPoints >= (item.pointsValue || 0);

  // Calculate time since posted
  const timeAgo = (date) => {
    const now = new Date();
    const posted = new Date(date);
    const diffInHours = Math.floor((now - posted) / (1000 * 60 * 60));

    if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} days ago`;
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F9F5F2' }}>
      {/* Header */}
      <div className="sticky top-0 z-50" style={{ backgroundColor: '#1E3548' }}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-opacity-20 hover:bg-white rounded-lg transition-colors">
                <ArrowLeft className="w-6 h-6 text-white" />
              </button>
              <div className="flex items-center space-x-2">
                <Shirt className="w-8 h-8 text-white" />
                <h1 className="text-2xl font-bold text-white">
                  Rewear
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-4 py-2 rounded-full" style={{ backgroundColor: '#4A6278' }}>
                <Coins className="w-5 h-5 text-white" />
                <span className="font-bold text-white">{userPoints.toLocaleString()}</span>
                <span className="text-sm text-white opacity-90">points</span>
              </div>
              <button className="p-2 hover:bg-opacity-20 hover:bg-white rounded-lg transition-colors">
                <Heart className="w-6 h-6 text-white" />
              </button>
              <button className="p-2 hover:bg-opacity-20 hover:bg-white rounded-lg transition-colors">
                <Share2 className="w-6 h-6 text-white" />
              </button>
              <button className="p-2 hover:bg-opacity-20 hover:bg-white rounded-lg transition-colors">
                <ShoppingCart className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for clothes to rewear..."
            className="w-full px-4 py-3 pr-12 rounded-lg border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50"
            style={{
              borderColor: '#D1C3B7',
              backgroundColor: 'white',
              color: '#1E3548'
            }}
          />
          <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: '#4A6278' }} />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Images Section */}
          <div className="lg:col-span-2 space-y-4">
            {/* Main Product Image */}
            <div className="relative">
              <div
                className="aspect-square rounded-lg overflow-hidden border-2 p-4 flex items-center justify-center"
                style={{
                  backgroundColor: 'white',
                  borderColor: '#D1C3B7'
                }}
              >
                <img
                  src={item.images && item.images.length > 0 ? item.images[0] : '/api/placeholder/500/500'}
                  alt={item.title}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute top-4 right-4 p-2 rounded-full transition-colors hover:bg-pink-100" style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}>
                  <Heart className="w-6 h-6 text-gray-400 hover:text-pink-500 transition-colors cursor-pointer" />
                </div>
                <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full text-sm font-medium bg-black bg-opacity-50 text-white">
                  1 / {item.images ? item.images.length : 1}
                </div>
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium text-white" style={{ backgroundColor: '#4A6278' }}>
                  {item.condition}
                </div>
              </div>
            </div>

            {/* Product Image Thumbnails */}
            {item.images && item.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {item.images.slice(0, 4).map((image, index) => (
                  <div
                    key={index}
                    className="aspect-square rounded-lg overflow-hidden border-2 cursor-pointer hover:opacity-80 transition-opacity"
                    style={{
                      backgroundColor: 'white',
                      borderColor: '#D1C3B7'
                    }}
                  >
                    <img
                      src={image}
                      alt={`View ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Full Description */}
            <div
              className="rounded-lg p-6 border-2"
              style={{
                backgroundColor: 'white',
                borderColor: '#D1C3B7'
              }}
            >
              <h3 className="text-xl font-bold mb-4" style={{ color: '#1E3548' }}>
                About This Piece
              </h3>
              <div className="space-y-4">
                <p style={{ color: '#4A6278' }} className="leading-relaxed">
                  {item.description || 'No description available for this item.'}
                </p>

                {/* Tags Section */}
                {item.tags && item.tags.length > 0 && (
                  <div className="border-t pt-4" style={{ borderColor: '#D1C3B7' }}>
                    <div className="flex items-center space-x-2 mb-3">
                      <Tag className="w-4 h-4" style={{ color: '#4A6278' }} />
                      <span className="text-sm font-medium" style={{ color: '#1E3548' }}>Tags:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 text-xs rounded-full font-medium"
                          style={{ backgroundColor: '#F0F4F7', color: '#4A6278' }}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Enhanced Item Details */}
            <div
              className="rounded-lg p-6 border-2"
              style={{
                backgroundColor: 'white',
                borderColor: '#D1C3B7'
              }}
            >
              <h3 className="text-lg font-bold mb-4" style={{ color: '#1E3548' }}>
                Item Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  {item.brand && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium flex items-center space-x-2" style={{ color: '#1E3548' }}>
                        <Award className="w-4 h-4" />
                        <span>Brand:</span>
                      </span>
                      <span className="text-sm font-medium" style={{ color: '#4A6278' }}>{item.brand}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium flex items-center space-x-2" style={{ color: '#1E3548' }}>
                      <Package className="w-4 h-4" />
                      <span>Category:</span>
                    </span>
                    <span className="text-sm" style={{ color: '#4A6278' }}>{item.category}</span>
                  </div>
                  {item.type && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium flex items-center space-x-2" style={{ color: '#1E3548' }}>
                        <Scissors className="w-4 h-4" />
                        <span>Type:</span>
                      </span>
                      <span className="text-sm" style={{ color: '#4A6278' }}>{item.type}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium flex items-center space-x-2" style={{ color: '#1E3548' }}>
                      <Shirt className="w-4 h-4" />
                      <span>Size:</span>
                    </span>
                    <span className="text-sm font-medium" style={{ color: '#4A6278' }}>{item.size}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium flex items-center space-x-2" style={{ color: '#1E3548' }}>
                      <CheckCircle className="w-4 h-4" />
                      <span>Condition:</span>
                    </span>
                    <span className="text-sm font-medium" style={{ color: '#4A6278' }}>{item.condition}</span>
                  </div>
                  {item.color && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium flex items-center space-x-2" style={{ color: '#1E3548' }}>
                        <Palette className="w-4 h-4" />
                        <span>Color:</span>
                      </span>
                      <span className="text-sm" style={{ color: '#4A6278' }}>{item.color}</span>
                    </div>
                  )}
                  {item.material && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium flex items-center space-x-2" style={{ color: '#1E3548' }}>
                        <Package className="w-4 h-4" />
                        <span>Material:</span>
                      </span>
                      <span className="text-sm" style={{ color: '#4A6278' }}>{item.material}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium flex items-center space-x-2" style={{ color: '#1E3548' }}>
                      <Clock className="w-4 h-4" />
                      <span>Added:</span>
                    </span>
                    <span className="text-sm" style={{ color: '#4A6278' }}>
                      {timeAgo(item.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Product Details */}
          <div className="space-y-6">
            {/* Product Name and Status */}
            <div
              className="rounded-lg p-6 border-2"
              style={{
                backgroundColor: 'white',
                borderColor: '#D1C3B7'
              }}
            >
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#1E3548' }}>
                {item.title}
              </h2>

              {/* Availability Badge */}
              <div className="flex items-center space-x-2 mb-4 p-3 rounded-lg" style={{ backgroundColor: '#F0F4F7' }}>
                {getAvailabilityIcon(item.availability)}
                <span className="text-sm font-medium" style={{ color: '#1E3548' }}>
                  {getAvailabilityOptions(item.availability)}
                </span>
              </div>
            </div>

            {/* Status Card */}
            <div
              className="rounded-lg p-4 border-2"
              style={{
                backgroundColor: 'white',
                borderColor: '#D1C3B7'
              }}
            >
              <div className="flex items-center space-x-2 mb-2">
                {getStatusIcon(item.status)}
                <span className="font-medium" style={{ color: '#1E3548' }}>
                  {getAvailabilityText(item.status)}
                </span>
              </div>
              <div className="text-sm" style={{ color: '#4A6278' }}>
                Posted {timeAgo(item.createdAt)}
              </div>
            </div>

            {/* Points Required */}
            {canUsePoints && item.pointsValue > 0 && (
              <div
                className="rounded-lg p-6 border-2"
                style={{
                  backgroundColor: 'white',
                  borderColor: '#D1C3B7'
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-bold" style={{ color: '#1E3548' }}>
                    Points Required:
                  </span>
                  <div className="flex items-center space-x-2">
                    <Coins className="w-5 h-5" style={{ color: '#4A6278' }} />
                    <span className="text-2xl font-bold" style={{ color: '#1E3548' }}>
                      {item.pointsValue.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="text-sm mb-2" style={{ color: '#4A6278' }}>
                  You have: {userPoints.toLocaleString()} points
                </div>
                {!canAfford && (
                  <div className="text-sm text-red-600 mb-4 p-2 rounded-lg bg-red-50">
                    You need {(item.pointsValue - userPoints).toLocaleString()} more points
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              {canUsePoints && item.pointsValue > 0 && (
                <button
                  className={`w-full py-3 px-6 rounded-lg font-bold transition-all duration-200 ${canAfford && item.status === 'available'
                      ? 'text-white hover:opacity-90 hover:shadow-lg transform hover:-translate-y-0.5'
                      : 'text-gray-400 cursor-not-allowed opacity-60'
                    }`}
                  style={{
                    backgroundColor: canAfford && item.status === 'available' ? '#1E3548' : '#E5E7EB'
                  }}
                  disabled={!canAfford || item.status !== 'available'}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Coins className="w-5 h-5" />
                    <span>
                      {!canAfford ? 'Not Enough Points' : 'Redeem with Points'}
                    </span>
                  </div>
                </button>
              )}

              {canSwap && (
                <button
                  className={`w-full py-3 px-6 rounded-lg font-bold transition-all duration-200 border-2 ${item.status === 'available'
                      ? 'hover:bg-opacity-5 hover:shadow-lg transform hover:-translate-y-0.5'
                      : 'cursor-not-allowed opacity-50'
                    }`}
                  style={{
                    color: '#1E3548',
                    borderColor: '#1E3548',
                    backgroundColor: 'transparent'
                  }}
                  disabled={item.status !== 'available'}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <RefreshCw className="w-5 h-5" />
                    <span>Propose Swap</span>
                  </div>
                </button>
              )}

              {/* Contact Seller Button */}
              <button
                className="w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 border-2 hover:bg-opacity-5 hover:shadow-md"
                style={{
                  color: '#4A6278',
                  borderColor: '#4A6278',
                  backgroundColor: 'transparent'
                }}
              >
                <div className="flex items-center justify-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Contact Seller</span>
                </div>
              </button>
            </div>

            {/* Enhanced Uploader Profile */}
            <div
              className="rounded-lg p-6 border-2"
              style={{
                backgroundColor: 'white',
                borderColor: '#D1C3B7'
              }}
            >
              <h3 className="text-lg font-bold mb-4" style={{ color: '#1E3548' }}>
                Shared By
              </h3>
              <div className="flex items-start space-x-4">
                <div className="relative">
                  <img
                    src={uploader.avatar}
                    alt={uploader.name}
                    className="w-12 h-12 rounded-full object-cover border-2"
                    style={{ borderColor: '#D1C3B7' }}
                  />
                  {uploader.verified && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <Award className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-bold" style={{ color: '#1E3548' }}>
                      {uploader.name}
                    </h4>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${i < Math.floor(uploader.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                            }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs font-medium" style={{ color: '#4A6278' }}>
                      {uploader.rating} rating
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-3 text-xs" style={{ color: '#4A6278' }}>
                    <div className="flex items-center space-x-1">
                      <RefreshCw className="w-3 h-3" />
                      <span>{uploader.totalSwaps} swaps</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>Since {uploader.memberSince}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3" />
                      <span>{uploader.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Zap className="w-3 h-3" />
                      <span>{uploader.sustainabilityScore}% eco</span>
                    </div>
                  </div>
                  <div className="mt-3 text-xs font-medium" style={{ color: '#4A6278' }}>
                    <Clock className="w-3 h-3 inline mr-1" />
                    {uploader.responseTime}
                  </div>
                </div>
              </div>
              <button
                className="w-full mt-4 py-2 px-4 rounded-lg font-medium transition-all duration-200 border-2 hover:bg-opacity-5 hover:shadow-md"
                style={{
                  color: '#1E3548',
                  borderColor: '#1E3548',
                  backgroundColor: 'transparent'
                }}
              >
                <div className="flex items-center justify-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>View Profile</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewearPlatform;