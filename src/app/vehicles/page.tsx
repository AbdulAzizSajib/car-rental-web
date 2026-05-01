"use client";

import { useState, useEffect, useCallback } from "react";
import {
  ChevronDown,
  X,
  Heart,
  MapPin,
  Gauge,
  Users,
  Fuel,
  Zap,
  Loader2,
  Images,
} from "lucide-react";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

function resolveName(
  val: string | { name: string } | null | undefined,
): string {
  if (!val) return "";
  return typeof val === "string" ? val : val.name;
}
import { FilterSidebar, FilterState } from "@/src/components/filter-sidebar";
import { VehicleCard } from "@/src/components/vehicle-card";
import { getCarsAction } from "@/src/services/cars/getCars.action";
import { getCarByIdAction } from "@/src/services/cars/cars/getCarById.action";
import { ApiCar, CarsFilterParams } from "@/src/types/car.types";
import { Button } from "@/src/components/ui/button";
import { BookingModal } from "@/src/components/booking-modal";

function toTitleCase(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function buildApiParams(filters: FilterState): CarsFilterParams {
  const params: CarsFilterParams = { page: 1, limit: 12 };

  if (filters.rentalType !== "any") {
    params.rentalType =
      filters.rentalType === "perDay" ? "PER_DAY" : "PER_HOUR";
  }
  if (filters.availableNow) params.isAvailable = true;
  if (filters.priceMin > 0) params.priceFrom = filters.priceMin;
  if (filters.priceMax < 10000) params.priceTo = filters.priceMax;
  if (filters.transmissions.length === 1) {
    params.transmission = filters.transmissions[0].toUpperCase();
  }
  if (filters.fuelTypes.length === 1) params.fuelTypeId = filters.fuelTypes[0];
  if (filters.bodyTypes.length === 1) params.bodyTypeId = filters.bodyTypes[0];
  if (filters.brandId) params.brandId = filters.brandId;
  if (filters.modelId) params.modelId = filters.modelId;

  return params;
}

function CarDetailPanel({
  car,
  loading,
  onClose,
  isFavorite,
  onFavoriteToggle,
  onBookNow,
}: {
  car: ApiCar | null;
  loading: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onFavoriteToggle: (id: string) => void;
  onBookNow: (car: ApiCar) => void;
}) {
  const primaryImage =
    car?.images.find((img) => img.isPrimary)?.url ?? car?.images[0]?.url;
  const bodyTypeName = car
    ? resolveName(car.bodyType as string | { name: string })
    : "";
  const fuelTypeName = car
    ? resolveName(car.fuelType as string | { name: string })
    : "";

  return (
    <div
      className="w-120 shrink-0 bg-white flex flex-col overflow-y-auto custom-scrollbar"
      style={{ borderLeft: "1px solid #ede8df" }}
    >
      {/* Header — always visible */}
      <div className="shrink-0 flex items-start justify-between p-5 border-b border-gray-100">
        <div className="min-w-0 pr-2">
          {loading || !car ? (
            <div className="space-y-1.5">
              <div className="h-4 w-40 bg-gray-100 rounded animate-pulse" />
              <div className="h-3 w-24 bg-gray-100 rounded animate-pulse" />
            </div>
          ) : (
            <>
              <h2 className="font-semibold text-gray-900 text-base leading-snug">
                {car.name}
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                {resolveName(car.model)} · {car.year}
              </p>
            </>
          )}
        </div>
        <div className="flex items-center gap-1 shrink-0">
          {car && (
            <button
              onClick={() => onFavoriteToggle(car.id)}
              className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Heart
                size={18}
                className={
                  isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"
                }
              />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={18} className="text-gray-500" />
          </button>
        </div>
      </div>

      {loading || !car ? (
        <div className="flex-1 flex items-center justify-center">
          <Loader2 size={24} className="animate-spin text-gray-300" />
        </div>
      ) : (
        <>
          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto">
            {/* Image + Gallery */}
            <div className="relative w-full h-44 bg-gray-50 overflow-hidden">
              {primaryImage ? (
                <>
                  <img
                    src={primaryImage}
                    alt={car.name}
                    className="w-full h-full object-cover cursor-zoom-in"
                    onClick={(e) => {
                      e.stopPropagation();
                      Fancybox.show(
                        car.images.map((img) => ({
                          src: img.url,
                          caption: car.name,
                        })),
                      );
                    }}
                  />
                  {car.images.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        Fancybox.show(
                          car.images.map((img) => ({
                            src: img.url,
                            caption: car.name,
                          })),
                        );
                      }}
                      className="absolute bottom-2 right-2 flex items-center gap-1.5 text-[11px] font-semibold bg-black/60 text-white px-2.5 py-1 rounded-full backdrop-blur-sm hover:bg-black/80 transition-colors"
                    >
                      <Images size={12} />
                      {car.images.length} photos
                    </button>
                  )}
                </>
              ) : (
                <span className="text-gray-300 text-sm absolute inset-0 flex items-center justify-center">
                  {resolveName(car.brand)} · {car.color ?? "No image"}
                </span>
              )}
            </div>

            {/* Price */}
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                  Daily rate
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  ৳{car.pricePerDay.toLocaleString()}
                </p>
              </div>
              <span
                className={`text-[10px] font-semibold px-2 py-1 rounded-full ${car.isAvailable ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}
              >
                {car.isAvailable ? "Available" : "Unavailable"}
              </span>
            </div>

            {/* Specs grid */}
            <div className="px-5 py-4 grid grid-cols-2 gap-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Users size={15} className="text-gray-400 shrink-0" />
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider">
                    Seats
                  </p>
                  <p className="text-sm font-semibold text-gray-900">
                    {car.seats}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Gauge size={15} className="text-gray-400 shrink-0" />
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider">
                    Transmission
                  </p>
                  <p className="text-sm font-semibold text-gray-900">
                    {toTitleCase(car.transmission)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Fuel size={15} className="text-gray-400 shrink-0" />
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider">
                    Fuel
                  </p>
                  <p className="text-sm font-semibold text-gray-900">
                    {toTitleCase(fuelTypeName)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Zap size={15} className="text-gray-400 shrink-0" />
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider">
                    Mileage
                  </p>
                  <p className="text-sm font-semibold text-gray-900">
                    {car.mileage.toLocaleString()} km
                  </p>
                </div>
              </div>
            </div>

            {/* Extra info */}
            <div className="px-5 py-4 space-y-2 border-b border-gray-100">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <MapPin size={13} className="text-gray-400" />
                {car.location}
              </div>
              <div className="flex gap-2 flex-wrap">
                {car.isAC && (
                  <span className="text-[11px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                    AC
                  </span>
                )}
                {car.isWithDriver && (
                  <span className="text-[11px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                    With Driver
                  </span>
                )}
                {bodyTypeName && (
                  <span className="text-[11px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                    {bodyTypeName}
                  </span>
                )}
                <span className="text-[11px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                  {car.rentalType === "ANY"
                    ? "Any rental"
                    : car.rentalType === "PER_DAY"
                      ? "Per day"
                      : "Per hour"}
                </span>
                {car.engineCapacity && (
                  <span className="text-[11px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                    {car.engineCapacity} cc
                  </span>
                )}
                {car.color && (
                  <span className="text-[11px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                    {car.color}
                  </span>
                )}
              </div>
            </div>

            {/* Host */}
            {car.host && (
              <div className="px-5 py-3 border-b border-gray-100">
                <p className="text-xs text-gray-500">
                  Host:{" "}
                  <span className="font-medium text-gray-800">
                    {car.host.user.name}
                  </span>
                  {car.host.isVerified && (
                    <span className="ml-1.5 text-[10px] text-blue-600 font-semibold">
                      ✓ Verified
                    </span>
                  )}
                </p>
              </div>
            )}

            {/* Registration */}
            {car.registrationNo && (
              <div className="px-5 py-3 border-b border-gray-100">
                <p className="text-xs text-gray-500">
                  Reg. No:{" "}
                  <span className="font-medium text-gray-800">
                    {car.registrationNo}
                  </span>
                </p>
              </div>
            )}
          </div>

          {/* Book button — always visible at bottom */}
          <div className="shrink-0 px-5 py-4 border-t border-gray-100">
            <Button
              className="w-full bg-gray-900 text-white hover:bg-gray-800"
              disabled={!car.isAvailable}
              onClick={() => onBookNow(car)}
            >
              {car.isAvailable ? "Book now" : "Unavailable"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default function VehiclesPage() {
  const [cars, setCars] = useState<ApiCar[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedCar, setSelectedCar] = useState<ApiCar | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [bookingCar, setBookingCar] = useState<ApiCar | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    priceMin: 0,
    priceMax: 10000,
    rentalType: "any",
    availableNow: false,
    bodyTypes: [],
    transmissions: [],
    fuelTypes: [],
    brandId: undefined,
    modelId: undefined,
  });

  const fetchCars = useCallback(async (currentFilters: FilterState) => {
    setLoading(true);
    try {
      const params = buildApiParams(currentFilters);
      const result = await getCarsAction(params);
      setCars(result.data ?? []);
      setTotal(result.meta?.total ?? result.data?.length ?? 0);
    } catch {
      setCars([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCars(filters);
    }, 300);
    return () => clearTimeout(timer);
  }, [filters, fetchCars]);

  const handleFavoriteToggle = (carId: string) => {
    const next = new Set(favorites);
    if (next.has(carId)) next.delete(carId);
    else next.add(carId);
    setFavorites(next);
  };

  const handleCardClick = async (car: ApiCar) => {
    setSelectedCar(null);
    setDetailLoading(true);
    try {
      const res = await getCarByIdAction(car.id);
      setSelectedCar(res.data ?? car);
    } catch {
      setSelectedCar(car);
    } finally {
      setDetailLoading(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Filter Sidebar */}
      <aside
        className="hidden lg:block w-80 shrink-0 bg-white overflow-y-auto custom-scrollbar"
        style={{ borderRight: "1px solid #ede8df" }}
      >
        <FilterSidebar onFilterChange={setFilters} />
      </aside>

      {/* Main Vehicle area */}
      <section
        className="flex-1 flex flex-col min-w-0"
        style={{ background: "#faf8f4" }}
      >
        <div className="shrink-0 px-5 py-4 flex items-center justify-between bg-white border-b border-[#ede8df]">
          <h1 className="font-base text-gray-900">
            {loading ? "Loading..." : `${total} vehicles to rent`}
          </h1>
          <div className="flex items-center gap-4 text-sm">
            <button className="flex items-center gap-1 text-gray-500 hover:text-gray-900 transition-colors">
              Closest to me
              <ChevronDown size={14} />
            </button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden min-h-0">
          {/* Car grid */}
          <div className="flex-1 px-6 pb-8 pt-6 overflow-y-auto custom-scrollbar">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl border border-gray-100 h-52 animate-pulse"
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {cars.map((car) => (
                  <VehicleCard
                    key={car.id}
                    car={car}
                    onCardClick={handleCardClick}
                    isFavorite={favorites.has(car.id)}
                    onFavoriteToggle={handleFavoriteToggle}
                  />
                ))}
              </div>
            )}
            {!loading && cars.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  No vehicles match your filters. Try adjusting your search
                  criteria.
                </p>
              </div>
            )}
          </div>

          {/* Car detail panel */}
          {!bookingCar && (selectedCar || detailLoading) && (
            <CarDetailPanel
              car={selectedCar}
              loading={detailLoading}
              onClose={() => {
                setSelectedCar(null);
                setDetailLoading(false);
              }}
              isFavorite={selectedCar ? favorites.has(selectedCar.id) : false}
              onFavoriteToggle={handleFavoriteToggle}
              onBookNow={setBookingCar}
            />
          )}

          {/* Booking panel — replaces detail panel in the same column */}
          {bookingCar && (
            <BookingModal
              car={bookingCar}
              onClose={() => setBookingCar(null)}
            />
          )}
        </div>
      </section>
    </div>
  );
}
