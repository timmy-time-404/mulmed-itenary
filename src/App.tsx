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
  Waves,
  Play,
  PersonStanding
} from 'lucide-react';

// Itinerary Data
const itinerary = [
  { time: "Saturday 18:30", activity: "Gather at GA", location: "Universitas Klabat", icon: Users },
  { time: "Saturday 19:30", activity: "Photo Session", location: "Maree Studio", icon: Camera },
  { time: "Saturday 19:45", activity: "Eating Eating", location: "Megamall", icon: Coffee },
  { time: "Saturday 20:00", activity: "Walking-walking on the Mall", location: "Megamall", icon: PersonStanding },
  { time: "Saturday 21:00", activity: "Playing Billiards", location: "Octopool", icon: Play },
  { time: "Saturday 23:00", activity: "OTW to the beach", location: "Tuturuga Beach", icon: Waves },
];

// Packing List Data
const initialPackingList = [
  { id: 1, item: "Baju Ganti", checked: false },
  { id: 2, item: "Sunblock", checked: false },
  { id: 3, item: "Powerbank", checked: false },
  { id: 4, item: "Snack", checked: false },
  { id: 5, item: "Kacamata Hitam", checked: false },
  { id: 6, item: "Tripod", checked: false },
  { id: 7, item: "Uang Cash", checked: false },
  { id: 8, item: "Obat-obatan", checked: false },
  { id: 9, item: "Board Games", checked: false },
  { id: 10, item: "Tenda", checked: false },
  { id: 11, item: "Pacol", checked: false },
  { id: 12, item: "Card Games", checked: false },
  { id: 13, item: "Speaker Bluetooth", checked: false },
  { id: 14, item: "Terminal", checked: false },
  { id: 15, item: "Kamera", checked: false },
  { id: 16, item: "Peralatan Mandi", checked: false },
  { id: 17, item: "Pop Mie", checked: false },
  { id: 18, item: "Obat-obatan", checked: false },
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
          <p className="text-xs text-gray-500 mb-2">Rating:</p>
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
                <span className="text-white text-xs font-medium tracking-wider uppercase">Trip Mulmed Gacor Itinerary</span>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">24 HOURS W/ MULMED</h1>
              <div className="flex items-center gap-4 text-white/80">
                <div className="flex items-center gap-1.5">
                  <Users size={16} />
                  <span className="text-sm">8 Kepala</span>
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
              <p className="text-xs text-cyan-100 mb-1">Destination</p>
              <p className="font-semibold text-sm">Mall & Beach</p>
            </div>
            <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl p-4 text-white">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-3">
                <Umbrella size={20} className="text-white" />
              </div>
              <p className="text-xs text-amber-100 mb-1">Duration</p>
              <p className="font-semibold text-sm">1 Night</p>
            </div>
          </section>

          {/* Timeline Section */}
          <section>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                <Clock size={18} className="text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Trip Schedule</h2>
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
            
           {/* Upload to Google Drive Button */}
            <a 
              href="https://drive.google.com/drive/folders/1Jl11CPYnx4aCv4Xt2VRdWwQOCFFOhtpY?usp=sharing" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-center gap-2 w-full p-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-2xl transition-all shadow-md shadow-cyan-200 group"
            >
              <Camera size={20} className="group-hover:scale-110 transition-transform" />
              <span className="text-sm font-semibold tracking-wide">Upload Foto ke G-Drive</span>
            </a>
          </section>

          {/* Footer */}
          <footer className="pt-6 pb-8 text-center">
            <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mx-auto mb-4" />
            <p className="text-sm text-gray-400">Weekend Getaway 2026 with Mulmed Gacor</p>
            <p className="text-xs text-gray-300 mt-1">Setiap Orang ada masanya, Setiap Masa ada Orangnya. Just enjoy the journey!</p>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default App;
