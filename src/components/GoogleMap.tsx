
import React, { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { supabase } from '@/integrations/supabase/client';

// TypeScript declarations for Google Maps
declare global {
  interface Window {
    google: any;
  }
}

const GoogleMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [apiKey, setApiKey] = React.useState<string>('');

  useEffect(() => {
    const getApiKey = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('get-secret', {
          body: { name: 'GOOGLE_MAPS_API_KEY' }
        });
        
        if (error) {
          console.error('Error fetching API key:', error);
          return;
        }
        
        if (data?.value) {
          setApiKey(data.value);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    getApiKey();
  }, []);

  useEffect(() => {
    if (!apiKey || !mapRef.current || !window.google) return;

    const loader = new Loader({
      apiKey: apiKey,
      version: 'weekly',
    });

    loader.load().then(() => {
      if (!mapRef.current || !window.google) return;

      // Prime Auditors office coordinates - updated to your specified location
      const officeLocation = { lat: -5.0714256, lng: 39.1005272 };

      const map = new window.google.maps.Map(mapRef.current, {
        zoom: 16,
        center: officeLocation,
        mapTypeId: window.google.maps.MapTypeId.ROADMAP,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'on' }]
          }
        ]
      });

      // Add marker for the office
      const marker = new window.google.maps.Marker({
        position: officeLocation,
        map: map,
        title: 'Prime Auditors Office',
        animation: window.google.maps.Animation.DROP,
      });

      // Add info window with office details
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 10px; max-width: 300px;">
            <h3 style="margin: 0 0 10px 0; color: #1e40af; font-weight: bold;">Prime Auditors</h3>
            <p style="margin: 0 0 5px 0; font-size: 14px;"><strong>Address:</strong></p>
            <p style="margin: 0 0 5px 0; font-size: 13px;">Plot 24, Block KB 3</p>
            <p style="margin: 0 0 5px 0; font-size: 13px;">NHC Building Apartment No 02</p>
            <p style="margin: 0 0 5px 0; font-size: 13px;">Market Street, Independence Avenue Road</p>
            <p style="margin: 0 0 10px 0; font-size: 13px;">Central Ward, Tanga City, Tanzania</p>
            <p style="margin: 0 0 5px 0; font-size: 14px;"><strong>Phone:</strong></p>
            <p style="margin: 0 0 5px 0; font-size: 13px;">+255 712 747 539</p>
            <p style="margin: 0 0 5px 0; font-size: 13px;">+255 752 401 012</p>
            <p style="margin: 0 0 5px 0; font-size: 14px;"><strong>Email:</strong></p>
            <p style="margin: 0; font-size: 13px;">primeauditors@gmail.com</p>
          </div>
        `
      });

      // Show info window when marker is clicked
      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });

      // Open info window by default
      infoWindow.open(map, marker);
    }).catch((error) => {
      console.error('Error loading Google Maps:', error);
    });
  }, [apiKey]);

  if (!apiKey) {
    return (
      <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-600">Loading map...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-64 rounded-lg overflow-hidden shadow-lg border border-gray-200">
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
};

export default GoogleMap;
