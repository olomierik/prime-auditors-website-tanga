
import React from 'react';
import { MapPin } from 'lucide-react';

const GoogleMap = () => {
  // Prime Auditors office coordinates
  const latitude = -5.0714256;
  const longitude = 39.1005272;
  
  // Create a static map URL using OpenStreetMap tiles
  const mapImageUrl = `https://static-maps.yandex.ru/1.x/?lang=en_US&ll=${longitude},${latitude}&z=16&l=map&size=600,400&pt=${longitude},${latitude},pm2rdm`;

  return (
    <div className="w-full h-64 rounded-lg overflow-hidden shadow-lg border border-gray-200 relative">
      <img 
        src={mapImageUrl}
        alt="Prime Auditors Office Location in Tanga, Tanzania"
        className="w-full h-full object-cover"
        onError={(e) => {
          // Fallback to a placeholder map if the external service fails
          e.currentTarget.src = `https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&h=400&fit=crop`;
        }}
      />
      
      {/* Overlay with location info */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
        <div className="flex items-center space-x-2 text-white">
          <MapPin className="w-5 h-5 text-prime-gold" />
          <div>
            <div className="font-semibold text-sm">Prime Auditors Office</div>
            <div className="text-xs opacity-90">Tanga, Tanzania • {latitude}, {longitude}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleMap;
