"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { Slider } from "@/src/components/ui/slider";
import { Checkbox } from "@/src/components/ui/checkbox";
import { Switch } from "@/src/components/ui/switch";
import { getBrandsAction } from "@/src/services/cars/brand/getBrands.action";
import { getModelsAction } from "@/src/services/cars/getModels.action";
import { getFuelTypesAction } from "@/src/services/cars/getFuelTypes.action";
import { getBodyTypesAction } from "@/src/services/cars/getBodyTypes.action";
import { Brand, CarModel, FuelType, BodyType } from "@/src/types/car.types";

export interface FilterState {
  priceMin: number;
  priceMax: number;
  rentalType: "any" | "perDay" | "perHour";
  availableNow: boolean;
  bodyTypes: string[];
  transmissions: string[];
  fuelTypes: string[];
  brandId?: string;
  modelId?: string;
}

interface FilterSidebarProps {
  onFilterChange: (filters: FilterState) => void;
}

const HISTOGRAM = [
  6, 8, 10, 14, 18, 22, 28, 36, 44, 56, 70, 82, 92, 96, 90, 80, 68, 58, 48, 40,
  34, 28, 24, 20, 18, 16, 14, 12, 10, 8,
];

function SectionHeader({
  title,
  open,
  onToggle,
}: {
  title: string;
  open: boolean;
  onToggle?: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between text-[11px] font-semibold tracking-wider text-gray-500 uppercase"
    >
      <span>{title}</span>
      {open ? (
        <ChevronUp size={14} className="text-gray-400" />
      ) : (
        <ChevronDown size={14} className="text-gray-400" />
      )}
    </button>
  );
}

export function FilterSidebar({ onFilterChange }: FilterSidebarProps) {
  const initial: FilterState = {
    priceMin: 0,
    priceMax: 10000,
    rentalType: "any",
    availableNow: false,
    bodyTypes: [],
    transmissions: [],
    fuelTypes: [],
    brandId: undefined,
    modelId: undefined,
  };

  const [filters, setFilters] = useState<FilterState>(initial);
  const [openSections, setOpenSections] = useState({
    rentalType: true,
    availableNow: true,
    priceRange: true,
    carBrand: true,
    carModel: true,
    bodyType: true,
    transmission: true,
    fuelType: true,
  });

  const [brands, setBrands] = useState<Brand[]>([]);
  const [allModels, setAllModels] = useState<CarModel[]>([]);
  const [bodyTypeOptions, setBodyTypeOptions] = useState<BodyType[]>([]);
  const [fuelTypeOptions, setFuelTypeOptions] = useState<FuelType[]>([]);

  useEffect(() => {
    getBrandsAction()
      .then((res) => setBrands(res.data ?? []))
      .catch(() => {});
    getModelsAction()
      .then((res) => setAllModels(res.data ?? []))
      .catch(() => {});
    getBodyTypesAction()
      .then((res) => setBodyTypeOptions(res.data ?? []))
      .catch(() => {});
    getFuelTypesAction()
      .then((res) => setFuelTypeOptions(res.data ?? []))
      .catch(() => {});
  }, []);

  const filteredModels = filters.brandId
    ? allModels.filter((m) => m.brandId === filters.brandId)
    : allModels;

  const update = (next: FilterState) => {
    setFilters(next);
    onFilterChange(next);
  };

  const toggleSection = (key: keyof typeof openSections) => {
    setOpenSections((s) => ({ ...s, [key]: !s[key] }));
  };

  const reset = () => update(initial);

  const togglePill = (
    category: "bodyTypes" | "transmissions" | "fuelTypes",
    value: string,
  ) => {
    const list = filters[category];
    const next = list.includes(value)
      ? list.filter((v) => v !== value)
      : [...list, value];
    update({ ...filters, [category]: next });
  };

  const selectBrand = (id: string) => {
    const isSame = filters.brandId === id;
    update({
      ...filters,
      brandId: isSame ? undefined : id,
      modelId: undefined,
    });
  };

  const selectModel = (id: string) => {
    update({ ...filters, modelId: filters.modelId === id ? undefined : id });
  };

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <h2 className="text-base font-semibold text-gray-900">Filter by</h2>
        <button
          onClick={reset}
          className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700"
        >
          Reset all <X size={12} />
        </button>
      </div>

      {/* Rental Type */}
      <div className="px-5 py-4 border-b border-gray-100">
        <SectionHeader
          title="Rental type"
          open={openSections.rentalType}
          onToggle={() => toggleSection("rentalType")}
        />
        {openSections.rentalType && (
          <div className="mt-3 inline-flex border border-gray-200 rounded-md overflow-hidden">
            {(
              [
                { label: "Any", value: "any" },
                { label: "Per day", value: "perDay" },
                { label: "Per hour", value: "perHour" },
              ] as const
            ).map((opt, i) => (
              <button
                key={opt.value}
                onClick={() => update({ ...filters, rentalType: opt.value })}
                className={`px-3 py-1.5 text-xs transition-colors ${
                  i > 0 ? "border-l border-gray-200" : ""
                } ${
                  filters.rentalType === opt.value
                    ? "bg-gray-900 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Available now only */}
      <div className="px-5 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold tracking-wider text-gray-500 uppercase">
            Available now only
          </span>
          <Switch
            checked={filters.availableNow}
            onCheckedChange={(checked) =>
              update({ ...filters, availableNow: checked })
            }
          />
        </div>
      </div>

      {/* Price Range */}
      <div className="px-5 py-4 border-b border-gray-100">
        <SectionHeader
          title="Price range / day"
          open={openSections.priceRange}
          onToggle={() => toggleSection("priceRange")}
        />
        {openSections.priceRange && (
          <div className="mt-4">
            <div className="flex items-end gap-0.5 h-16 mb-2">
              {HISTOGRAM.map((h, i) => {
                const stepValue = (i / HISTOGRAM.length) * 10000;
                const inRange =
                  stepValue >= filters.priceMin &&
                  stepValue <= filters.priceMax;
                return (
                  <div
                    key={i}
                    className={`flex-1 rounded-sm ${
                      inRange ? "bg-gray-900" : "bg-gray-200"
                    }`}
                    style={{ height: `${h}%` }}
                  />
                );
              })}
            </div>
            <Slider
              min={0}
              max={10000}
              step={100}
              value={[filters.priceMin, filters.priceMax]}
              onValueChange={(v) =>
                update({ ...filters, priceMin: v[0], priceMax: v[1] })
              }
              className="mb-3"
            />
            <div className="flex items-center justify-between gap-2">
              <div className="flex-1 border border-gray-200 rounded-md px-3 py-1.5 flex items-center justify-between">
                <span className="text-[10px] tracking-wider text-gray-400 uppercase">
                  From
                </span>
                <span className="text-sm font-semibold text-gray-900">
                  ৳{filters.priceMin.toLocaleString()}
                </span>
              </div>
              <div className="flex-1 border border-gray-200 rounded-md px-3 py-1.5 flex items-center justify-between">
                <span className="text-[10px] tracking-wider text-gray-400 uppercase">
                  To
                </span>
                <span className="text-sm font-semibold text-gray-900">
                  ৳{filters.priceMax.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Car Brand */}
      <div className="px-5 py-4 border-b border-gray-100">
        <SectionHeader
          title="Car brand"
          open={openSections.carBrand}
          onToggle={() => toggleSection("carBrand")}
        />
        {openSections.carBrand && (
          <div className="mt-3 space-y-2 grid grid-cols-1 md:grid-cols-2">
            {brands.length === 0 ? (
              <p className="text-xs text-gray-400">Loading...</p>
            ) : (
              brands.map((brand) => (
                <label
                  key={brand.id}
                  className="flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={filters.brandId === brand.id}
                      onCheckedChange={() => selectBrand(brand.id)}
                    />
                    <span className="text-sm text-gray-700 group-hover:text-gray-900">
                      {brand.name}
                    </span>
                  </div>
                  {/* <span className="text-[11px] text-gray-400">{brand._count.cars}</span> */}
                </label>
              ))
            )}
          </div>
        )}
      </div>

      {/* Car Model */}
      <div className="px-5 py-4 border-b border-gray-100">
        <SectionHeader
          title="Car model"
          open={openSections.carModel}
          onToggle={() => toggleSection("carModel")}
        />
        {openSections.carModel && (
          <div className="mt-3 space-y-2 grid grid-cols-1 md:grid-cols-2">
            {!filters.brandId && allModels.length === 0 ? (
              <p className="text-xs text-gray-400">Loading...</p>
            ) : filteredModels.length === 0 ? (
              <p className="text-xs text-gray-400">No models found.</p>
            ) : (
              filteredModels.map((model) => (
                <label
                  key={model.id}
                  className="flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={filters.modelId === model.id}
                      onCheckedChange={() => selectModel(model.id)}
                    />
                    <span className="text-sm text-gray-700 group-hover:text-gray-900">
                      {model.name}
                    </span>
                  </div>
                  {/* <span className="text-[11px] text-gray-400">{model._count.cars}</span> */}
                </label>
              ))
            )}
          </div>
        )}
      </div>

      {/* Body Type */}
      <div className="px-5 py-4 border-b border-gray-100">
        <SectionHeader
          title="Body type"
          open={openSections.bodyType}
          onToggle={() => toggleSection("bodyType")}
        />
        {openSections.bodyType && (
          <div className="mt-3 grid grid-cols-2 gap-y-2.5 gap-x-3">
            {bodyTypeOptions.length === 0 ? (
              <p className="text-xs text-gray-400">Loading...</p>
            ) : (
              bodyTypeOptions.map((type) => (
                <label
                  key={type.id}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Checkbox
                    checked={filters.bodyTypes.includes(type.id)}
                    onCheckedChange={() => togglePill("bodyTypes", type.id)}
                  />
                  <span className="text-sm text-gray-700">{type.name}</span>
                </label>
              ))
            )}
          </div>
        )}
      </div>

      {/* Transmission */}
      <div className="px-5 py-4 border-b border-gray-100">
        <SectionHeader
          title="Transmission"
          open={openSections.transmission}
          onToggle={() => toggleSection("transmission")}
        />
        {openSections.transmission && (
          <div className="mt-3 inline-flex border border-gray-200 rounded-md overflow-hidden">
            {["Any", "Automatic", "Manual"].map((opt, i) => {
              const isAny = opt === "Any";
              const active = isAny
                ? filters.transmissions.length === 0
                : filters.transmissions.includes(opt);
              return (
                <button
                  key={opt}
                  onClick={() =>
                    update({
                      ...filters,
                      transmissions: isAny
                        ? []
                        : filters.transmissions.includes(opt)
                          ? filters.transmissions.filter((t) => t !== opt)
                          : [...filters.transmissions, opt],
                    })
                  }
                  className={`px-3 py-1.5 text-xs transition-colors ${
                    i > 0 ? "border-l border-gray-200" : ""
                  } ${
                    active
                      ? "bg-gray-900 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Fuel Type */}
      <div className="px-5 py-4">
        <SectionHeader
          title="Fuel type"
          open={openSections.fuelType}
          onToggle={() => toggleSection("fuelType")}
        />
        {openSections.fuelType && (
          <div className="mt-3 grid grid-cols-2 gap-y-2.5 gap-x-3">
            {fuelTypeOptions.length === 0 ? (
              <p className="text-xs text-gray-400">Loading...</p>
            ) : (
              fuelTypeOptions.map((type) => (
                <label
                  key={type.id}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Checkbox
                    checked={filters.fuelTypes.includes(type.id)}
                    onCheckedChange={() => togglePill("fuelTypes", type.id)}
                  />
                  <span className="text-sm text-gray-700">{type.name}</span>
                </label>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
