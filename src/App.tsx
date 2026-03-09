import { useState } from 'react';
import { 
  MapPin, 
  Clock, 
  Star, 
  Camera, 
  CheckSquare, 
  Square, 
  Users, 
  Calendar,
  Sun,
  Umbrella,
  Coffee,
  ShoppingBag,
  Waves
} from 'lucide-react';

// Itinerary Data
const itinerary = [
  { time: "Sabtu 19:00", activity: "Kumpul di GA", location: "Universitas Klabat", icon: Users },
  { time: "Sabtu 21:00", activity: "Doing Something FUN", location: "Kawasan", icon: ShoppingBag },
  { time: "Sabtu 23:00", activity: "Nongki-Nongki", location: "Sunbae", icon: Coffee },
  { time: "Minggu 05:00", activity: "OTW Pantai", location: "Tuturuga Beach", icon: Sun },
  { time: "Minggu 08:00", activity: "Makan Pagi", location: "Tuturuga Beach", icon: Waves },
];

// Packing List Data
const initialPackingList = [
  { id: 1, item: "Baju Ganti", checked: false },
  { id: 2, item: "Sunblock", checked: false },
  { id: 3, item: "Powerbank", checked: false },
  { id: 4, item: "Snack", checked: false },
  { id: 5, item: "Kacamata Hitam", checked: false },
  { id: 6, item: "Handuk", checked: false },
  { id: 7, item: "Uang Cash", checked: false },
  { id: 8, item: "Obat-obatan", checked: false },
];

// Gallery Images
const galleryImages = [
  { src: "/images/gallery-1.jpg", alt: "Moment Bersama" },
  { src: "/images/gallery-2.jpg", alt: "Pantai" },
  { src: "/images/gallery-3.jpg", alt: "Nongki" },
  { src: "/images/gallery-4.jpg", alt: "Mall" },
];

// Google Maps Link Generator
const getGoogleMapsLink = (location: string) => {
  const encodedLocation = encodeURIComponent(location);
  return `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`;
};

// Star Rating Component
function StarRating({ rating, onRatingChange }: { rating: number; onRatingChange: (rating: number) => void }) {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => onRatingChange(star)}
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
          className="transition-transform hover:scale-110 focus:outline-none"
        >
          <Star
            size={20}
            className={`${
              star <= (hoverRating || rating)
                ? "fill-amber-400 text-amber-400"
                : "fill-gray-200 text-gray-200"
            } transition-colors`}
          />
        </button>
      ))}
    </div>
  );
}

// Timeline Item Component
function TimelineItem({ 
  item, 
  index, 
  rating, 
  onRatingChange 
}: { 
  item: typeof itinerary[0]; 
  index: number; 
  rating: number;
  onRatingChange: (rating: number) => void;
}) {
  const Icon = item.icon;
  
  return (
    <div className="relative pl-8 pb-8 last:pb-0">
      {/* Timeline Line */}
      {index < itinerary.length - 1 && (
        <div className="absolute left-[11px] top-8 w-0.5 h-[calc(100%-2rem)] bg-gradient-to-b from-cyan-400 to-blue-500" />
      )}
      
      {/* Timeline Dot */}
      <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-200">
        <div className="w-2.5 h-2.5 rounded-full bg-white" />
      </div>
      
      {/* Card */}
      <div className="bg-white rounded-2xl p-5 shadow-lg shadow-gray-100 border border-gray-100 hover:shadow-xl hover:shadow-cyan-100 transition-all duration-300">
        {/* Time Badge */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1.5 bg-gradient-to-r from-cyan-50 to-blue-50 px-3 py-1.5 rounded-full">
            <Clock size={14} className="text-cyan-600" />
            <span className="text-sm font-medium text-cyan-700">{item.time}</span>
          </div>
        </div>
        
        {/* Activity */}
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center flex-shrink-0">
            <Icon size={20} className="text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 text-lg">{item.activity}</h3>
            <a 
              href={getGoogleMapsLink(item.location)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-blue-500 hover:text-blue-600 mt-1 group"
            >
              <MapPin size={14} className="group-hover:scale-110 transition-transform" />
              <span className="underline underline-offset-2">{item.location}</span>
            </a>
          </div>
        </div>
        
        {/* Rating Section */}
        <div className="pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-500 mb-2">Beri rating aktivitas ini:</p>
          <StarRating rating={rating} onRatingChange={onRatingChange} />
        </div>
      </div>
    </div>
  );
}

// Packing List Item Component
function PackingItem({ 
  item, 
  onToggle 
}: { 
  item: typeof initialPackingList[0]; 
  onToggle: (id: number) => void;
}) {
  return (
    <button
      onClick={() => onToggle(item.id)}
      className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 w-full text-left ${
        item.checked 
          ? 'bg-gradient-to-r from-cyan-50 to-blue-50 border-cyan-200' 
          : 'bg-white border-gray-100 hover:border-cyan-200 hover:shadow-md'
      }`}
    >
      <div className={`flex-shrink-0 ${item.checked ? 'text-cyan-500' : 'text-gray-300'}`}>
        {item.checked ? <CheckSquare size={24} /> : <Square size={24} />}
      </div>
      <span className={`font-medium ${item.checked ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
        {item.item}
      </span>
    </button>
  );
}

// Main App Component
function App() {
  // State for ratings
  const [ratings, setRatings] = useState<Record<number, number>>({});
  
  // State for packing list
  const [packingList, setPackingList] = useState(initialPackingList);

  // Handle rating change
  const handleRatingChange = (index: number, rating: number) => {
    setRatings(prev => ({ ...prev, [index]: rating }));
  };

  // Handle packing item toggle
  const handlePackingToggle = (id: number) => {
    setPackingList(prev => 
      prev.map(item => 
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  // Calculate progress
  const checkedCount = packingList.filter(item => item.checked).length;
  const progress = (checkedCount / packingList.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 via-white to-blue-50">
      {/* Mobile Container */}
      <div className="max-w-md mx-auto min-h-screen bg-white/80 backdrop-blur-sm shadow-2xl">
        
        {/* Hero Section */}
        <header className="relative overflow-hidden">
          {/* Background Image */}
          <div className="relative h-64">
            <img 
              src="/images/hero-beach.jpg" 
              alt="Weekend Getaway" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            
            {/* Header Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-cyan-300 text-xs font-medium tracking-wider uppercase">Trip Itinerary</span>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Weekend Getaway</h1>
              <div className="flex items-center gap-4 text-white/80">
                <div className="flex items-center gap-1.5">
                  <Users size={16} />
                  <span className="text-sm">8 Orang</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar size={16} />
                  <span className="text-sm">Sabtu - Minggu</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-5 py-6 space-y-8">
          
          {/* Trip Info Cards */}
          <section className="grid grid-cols-2 gap-3">
            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl p-4 text-white">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-3">
                <Sun size={20} className="text-white" />
              </div>
              <p className="text-xs text-cyan-100 mb-1">Destinasi</p>
              <p className="font-semibold text-sm">Mall & Pantai</p>
            </div>
            <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl p-4 text-white">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-3">
                <Umbrella size={20} className="text-white" />
              </div>
              <p className="text-xs text-amber-100 mb-1">Durasi</p>
              <p className="font-semibold text-sm">1 Malam</p>
            </div>
          </section>

          {/* Timeline Section */}
          <section>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                <Clock size={18} className="text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Jadwal Perjalanan</h2>
            </div>
            
            <div className="space-y-0">
              {itinerary.map((item, index) => (
                <TimelineItem
                  key={index}
                  item={item}
                  index={index}
                  rating={ratings[index] || 0}
                  onRatingChange={(rating) => handleRatingChange(index, rating)}
                />
              ))}
            </div>
          </section>

          {/* Packing List Section */}
          <section>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                  <CheckSquare size={18} className="text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Packing List</h2>
              </div>
              <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                {checkedCount}/{packingList.length}
              </span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full h-2 bg-gray-100 rounded-full mb-5 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            
            {/* Packing Items Grid */}
            <div className="grid grid-cols-2 gap-3">
              {packingList.map((item) => (
                <PackingItem
                  key={item.id}
                  item={item}
                  onToggle={handlePackingToggle}
                />
              ))}
            </div>
          </section>

          {/* Gallery Section */}
          <section>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                <Camera size={18} className="text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Gallery Foto</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {galleryImages.map((image, index) => (
                <div 
                  key={index}
                  className="relative aspect-square rounded-2xl overflow-hidden group"
                >
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white text-sm font-medium">{image.alt}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Upload Placeholder */}
            <div className="mt-3 p-6 border-2 border-dashed border-gray-200 rounded-2xl text-center hover:border-cyan-300 hover:bg-cyan-50/50 transition-colors cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
                <Camera size={24} className="text-gray-400" />
              </div>
              <p className="text-sm text-gray-500">Tap untuk menambah foto</p>
            </div>
          </section>

          {/* Footer */}
          <footer className="pt-6 pb-8 text-center">
            <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mx-auto mb-4" />
            <p className="text-sm text-gray-400">Weekend Getaway 2025</p>
            <p className="text-xs text-gray-300 mt-1">Selamat menikmati perjalanan!</p>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default App;
