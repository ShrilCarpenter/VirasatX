import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { HeritageItem } from '../types';
import { HERITAGE_ITEMS } from '../data/heritageData';
import { Link } from 'react-router-dom';
import { MapPin, Navigation, Compass, Layers } from 'lucide-react';
import { SafeImage } from './SafeImage';

interface LeafletHeritageMapProps {
  onSelectItem?: (item: HeritageItem) => void;
  selectedItemId?: string;
  highContrast?: boolean;
}

export const LeafletHeritageMap: React.FC<LeafletHeritageMapProps> = ({
  onSelectItem,
  selectedItemId,
  highContrast
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [id: string]: L.Marker }>({});

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeRegion, setActiveRegion] = useState<string>('All');
  const [selectedItem, setSelectedItem] = useState<HeritageItem | null>(
    HERITAGE_ITEMS.find(i => i.id === selectedItemId) || HERITAGE_ITEMS[0]
  );

  const filteredItems = HERITAGE_ITEMS.filter(item => {
    if (!item.coordinates) return false;
    const matchCat = activeCategory === 'All' || item.category === activeCategory;
    const matchReg = activeRegion === 'All' || item.region === activeRegion;
    return matchCat && matchReg;
  });

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [21.5, 79.5],
        zoom: 5,
        minZoom: 4,
        maxZoom: 14,
        zoomControl: true,
        scrollWheelZoom: true
      });

      // Standard OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Clear old markers
    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};

    // Custom SVG Pin Icon
    const createCustomIcon = (isSelected: boolean, category: string) => {
      const color = isSelected ? '#A64B2A' : category === 'Monuments' ? '#936B38' : '#151D2A';
      const size = isSelected ? 36 : 28;

      return L.divIcon({
        className: 'custom-heritage-marker',
        html: `
          <div style="
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border: 2px solid #FFFFFF;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: transform 0.2s ease;
          ">
            <div style="
              width: 8px;
              height: 8px;
              background: #FFFFFF;
              border-radius: 50%;
              transform: rotate(45deg);
            "></div>
          </div>
        `,
        iconSize: [size, size],
        iconAnchor: [size / 2, size]
      });
    };

    // Add markers for filtered items
    filteredItems.forEach(item => {
      if (!item.coordinates) return;
      const isSelected = selectedItem?.id === item.id;
      const marker = L.marker([item.coordinates.lat, item.coordinates.lng], {
        icon: createCustomIcon(isSelected, item.category)
      }).addTo(map);

      marker.on('click', () => {
        setSelectedItem(item);
        if (onSelectItem) onSelectItem(item);
        map.flyTo([item.coordinates!.lat, item.coordinates!.lng], 7, { duration: 1.2 });
      });

      marker.bindPopup(`
        <div style="font-family: inherit; width: 220px;">
          <img src="${item.imageUrl}" alt="${item.title}" style="width: 100%; height: 110px; object-fit: cover; border-radius: 8px; margin-bottom: 8px;" />
          <div style="font-size: 11px; text-transform: uppercase; color: #936B38; font-weight: 700;">${item.category} • ${item.region}</div>
          <div style="font-size: 14px; font-weight: 600; color: #151D2A; margin: 2px 0 4px 0;">${item.title}</div>
          <div style="font-size: 11px; color: #666; margin-bottom: 8px;">${item.period} | ${item.location}</div>
          <a href="/artifact/${item.id}" style="display: inline-block; background: #151D2A; color: #FFF; font-size: 11px; padding: 4px 10px; border-radius: 6px; text-decoration: none; font-weight: 500;">View Record &rarr;</a>
        </div>
      `);

      markersRef.current[item.id] = marker;
    });

    return () => {
      // Map cleanup if component unmounts
    };
  }, [filteredItems, selectedItem, onSelectItem]);

  return (
    <div className={`rounded-3xl border overflow-hidden shadow-sm ${
      highContrast ? 'bg-stone-950 border-stone-800' : 'bg-white border-stone-200'
    }`}>
      {/* Map Filter Toolbar */}
      <div className="p-4 border-b border-stone-200 flex flex-wrap items-center justify-between gap-4 bg-stone-50/70">
        <div className="flex items-center flex-wrap gap-2">
          <div className="flex items-center gap-1 text-xs font-semibold uppercase text-stone-500 mr-2">
            <Layers className="w-3.5 h-3.5" />
            <span>Category:</span>
          </div>
          {['All', 'Monuments', 'Artifacts', 'Manuscripts'].map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
                activeCategory === cat
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center flex-wrap gap-2">
          <div className="flex items-center gap-1 text-xs font-semibold uppercase text-stone-500 mr-2">
            <Compass className="w-3.5 h-3.5" />
            <span>Region:</span>
          </div>
          {['All', 'North', 'South', 'East', 'West', 'Central'].map(reg => (
            <button
              key={reg}
              onClick={() => setActiveRegion(reg)}
              className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
                activeRegion === reg
                  ? 'bg-[#936B38] text-white shadow-xs'
                  : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
              }`}
            >
              {reg}
            </button>
          ))}
        </div>
      </div>

      {/* Main Map View & Selected Card Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 min-h-[520px]">
        {/* Interactive Map Box */}
        <div className="lg:col-span-2 relative h-[520px]">
          <div ref={mapContainerRef} className="w-full h-full z-10" />
          <div className="absolute bottom-4 left-4 z-20 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-stone-200 text-xs text-stone-600 shadow-sm flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#936B38] inline-block" />
            <span>Showing {filteredItems.length} curated cultural sites</span>
          </div>
        </div>

        {/* Selected Record Information Side Panel */}
        <div className="p-6 border-t lg:border-t-0 lg:border-l border-stone-200 flex flex-col justify-between bg-stone-50/50">
          {selectedItem ? (
            <div className="space-y-4">
              <div className="relative rounded-xl overflow-hidden h-48 bg-stone-900 border border-stone-200">
                <SafeImage
                  src={selectedItem.imageUrl}
                  alt={selectedItem.title}
                  creditKey={selectedItem.id}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-[#151D2A]/80 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded-full border border-white/10">
                  {selectedItem.category}
                </div>
                <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md text-stone-900 text-[11px] font-mono px-2 py-0.5 rounded-md border border-stone-200">
                  {selectedItem.accessionNo}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-xs text-[#936B38] font-bold uppercase tracking-wider">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{selectedItem.location}</span>
                </div>
                <h3 className="text-xl font-serif font-semibold text-stone-900 mt-1">
                  {selectedItem.title}
                </h3>
                {selectedItem.nativeTitle && (
                  <p className="text-sm text-stone-500 italic mt-0.5 font-serif">
                    {selectedItem.nativeTitle}
                  </p>
                )}
              </div>

              <p className="text-stone-600 text-xs leading-relaxed line-clamp-3">
                {selectedItem.description}
              </p>

              <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-stone-200">
                <div>
                  <span className="text-stone-400 block">Period</span>
                  <span className="font-medium text-stone-800">{selectedItem.period}</span>
                </div>
                <div>
                  <span className="text-stone-400 block">Repository</span>
                  <span className="font-medium text-stone-800 truncate block">{selectedItem.repository}</span>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-3">
                <Link
                  to={`/artifact/${selectedItem.id}`}
                  className="flex-1 text-center py-2.5 px-4 rounded-xl bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors shadow-xs"
                >
                  Inspect Full Dossier &rarr;
                </Link>
                {selectedItem.coordinates && (
                  <button
                    onClick={() => {
                      mapInstanceRef.current?.flyTo([selectedItem.coordinates!.lat, selectedItem.coordinates!.lng], 10, { duration: 1 });
                    }}
                    className="p-2.5 rounded-xl border border-stone-300 text-stone-700 hover:bg-white transition-colors"
                    title="Zoom in on map"
                  >
                    <Navigation className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-center text-stone-400 text-sm py-12">
              Select any marker on the map to inspect curatorial dossier.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
