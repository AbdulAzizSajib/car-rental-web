'use client';

import { Heart, MapPin } from 'lucide-react';
import { ApiCar } from '@/src/types/car.types';

function resolveName(val: string | { name: string } | null | undefined): string {
  if (!val) return '';
  return typeof val === 'string' ? val : val.name;
}

interface VehicleCardProps {
  car: ApiCar;
  onCardClick: (car: ApiCar) => void;
  isFavorite?: boolean;
  onFavoriteToggle?: (carId: string) => void;
}

export function VehicleCard({
  car,
  onCardClick,
  isFavorite = false,
  onFavoriteToggle,
}: VehicleCardProps) {
  const primaryImage = car.images.find((img) => img.isPrimary)?.url ?? car.images[0]?.url;
  const brandName = resolveName(car.brand);
  const modelName = resolveName(car.model);

  return (
    <div
      className="group bg-white rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
      style={{ border: '1px solid #ede8df' }}
      onClick={() => onCardClick(car)}
    >
      {/* Image area */}
      <div className="relative h-44 bg-gray-50 overflow-hidden">
        {primaryImage ? (
          <img
            src={primaryImage}
            alt={car.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-gray-300 text-xs">{car.year} · {car.color ?? brandName}</span>
          </div>
        )}

        {/* Top overlay badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="flex items-center gap-1 text-[11px] font-medium text-gray-700 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full shadow-sm">
              <MapPin size={10} className="text-gray-400" />
              {car.location}
            </span>
            {brandName && (
              <span className="text-[11px] font-medium text-gray-700 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full shadow-sm">
                {brandName}
              </span>
            )}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onFavoriteToggle?.(car.id);
            }}
            className="p-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors"
            aria-label="Toggle favorite"
          >
            <Heart
              size={14}
              className={isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}
            />
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="px-4 py-3">
        <h3 className="font-bold text-[15px] text-gray-900 truncate leading-tight">
          {car.name}
        </h3>
        <p className="text-xs text-gray-400 truncate mt-0.5">{modelName}</p>

        <div className="mt-3 flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-gray-900">
              ৳{car.pricePerDay.toLocaleString()}
            </span>
            <span className="text-xs text-gray-400"> / day</span>
          </div>
          <span
            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
              car.isAvailable
                ? 'bg-green-50 text-green-700'
                : 'bg-red-50 text-red-500'
            }`}
          >
            {car.isAvailable ? 'Available' : 'Unavailable'}
          </span>
        </div>
      </div>
    </div>
  );
}
