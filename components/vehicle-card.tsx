'use client';

import { Heart, Zap, Gauge } from 'lucide-react';
import { useState } from 'react';
import { Car } from '@/lib/car-data';

interface VehicleCardProps {
  car: Car;
  onCardClick: (car: Car) => void;
  isFavorite?: boolean;
  onFavoriteToggle?: (carId: number) => void;
}

export function VehicleCard({
  car,
  onCardClick,
  isFavorite = false,
  onFavoriteToggle,
}: VehicleCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onCardClick(car)}
    >
      {/* Image Container */}
      <div className="relative bg-gray-100 h-48 overflow-hidden">
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-full object-cover transition-transform duration-300"
          style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
        />
        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFavoriteToggle?.(car.id);
          }}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow"
        >
          <Heart
            size={20}
            className={isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900">{car.name}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{car.model}</p>

        {/* Rating and Distance */}
        <div className="flex items-center justify-between text-sm mb-3">
          <div className="flex items-center gap-1">
            <span className="font-semibold text-gray-900">{car.rating}</span>
            <span className="text-yellow-500">★</span>
            <span className="text-gray-500">({car.reviewCount})</span>
          </div>
          <span className="text-gray-500">
            {car.distance} {car.distanceUnit}
          </span>
        </div>

        {/* Specs Row */}
        <div className="flex items-center gap-3 text-xs text-gray-600 mb-3 pb-3 border-b">
          <div className="flex items-center gap-1">
            <Zap size={14} />
            <span>{car.power} {car.powerUnit}</span>
          </div>
          <div className="flex items-center gap-1">
            <Gauge size={14} />
            <span>{car.transmission}</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-gray-900">
            ${car.pricePerHour.toFixed(2)}
          </span>
          <span className="text-gray-600">/hour</span>
        </div>
        <div className="text-xs text-gray-500 mt-1">
          ${car.pricePerDay.toFixed(0)}/day
        </div>
      </div>
    </div>
  );
}
