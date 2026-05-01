"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Loader2,
  Car,
  Filter,
  X,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/src/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Badge } from "@/src/components/ui/badge";
import { ApiCar, Brand, BodyType, FuelType, CarModel, CarsFilterParams } from "@/src/types/car.types";
import { getCarsAction } from "@/src/services/cars/cars/getCars.action";
import { createCarAction, CreateCarPayload } from "@/src/services/cars/cars/createCar.action";
import { updateCarAction, UpdateCarPayload } from "@/src/services/cars/cars/updateCar.action";
import { deleteCarAction } from "@/src/services/cars/cars/deleteCar.action";
import { getBrandsAction } from "@/src/services/cars/brand/getBrands.action";
import { getBodyTypesAction } from "@/src/services/cars/bodyTypes/getBodyTypes.action";
import { getFuelTypesAction } from "@/src/services/cars/fuelTypes/getFuelTypes.action";
import { getModelsAction } from "@/src/services/cars/models/getmodels.action";

const PAGE_SIZE = 10;

interface FormState {
  name: string;
  brandId: string;
  modelId: string;
  year: string;
  bodyTypeId: string;
  pricePerDay: string;
  rentalType: "ANY" | "PER_DAY" | "PER_HOUR";
  seats: string;
  transmission: "AUTOMATIC" | "MANUAL";
  fuelTypeId: string;
  mileage: string;
  engineCapacity: string;
  color: string;
  registrationNo: string;
  location: string;
  isAC: boolean;
  isWithDriver: boolean;
  isAvailable: boolean;
}

const emptyForm: FormState = {
  name: "",
  brandId: "",
  modelId: "",
  year: String(new Date().getFullYear()),
  bodyTypeId: "",
  pricePerDay: "",
  rentalType: "PER_DAY",
  seats: "5",
  transmission: "AUTOMATIC",
  fuelTypeId: "",
  mileage: "",
  engineCapacity: "",
  color: "",
  registrationNo: "",
  location: "",
  isAC: true,
  isWithDriver: false,
  isAvailable: true,
};

const RENTAL_LABELS: Record<string, string> = {
  ANY: "Any",
  PER_DAY: "Per Day",
  PER_HOUR: "Per Hour",
};

const TRANSMISSION_LABELS: Record<string, string> = {
  AUTOMATIC: "Automatic",
  MANUAL: "Manual",
};

export default function AdminAllCarsPage() {
  const [cars, setCars] = useState<ApiCar[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // filter state
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [filterBrandId, setFilterBrandId] = useState("");
  const [filterModelId, setFilterModelId] = useState("");
  const [filterBodyTypeId, setFilterBodyTypeId] = useState("");
  const [filterFuelTypeId, setFilterFuelTypeId] = useState("");
  const [filterTransmission, setFilterTransmission] = useState("");
  const [filterRentalType, setFilterRentalType] = useState("");
  const [filterAvailable, setFilterAvailable] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // reference data
  const [brands, setBrands] = useState<Brand[]>([]);
  const [bodyTypes, setBodyTypes] = useState<BodyType[]>([]);
  const [fuelTypes, setFuelTypes] = useState<FuelType[]>([]);
  const [allModels, setAllModels] = useState<CarModel[]>([]);

  // dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<ApiCar | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [filteredModels, setFilteredModels] = useState<CarModel[]>([]);

  // delete
  const [deleteTarget, setDeleteTarget] = useState<ApiCar | null>(null);
  const [deleting, setDeleting] = useState(false);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  // load reference data once
  useEffect(() => {
    const load = async () => {
      const [b, bt, ft, m] = await Promise.allSettled([
        getBrandsAction({ limit: 100 }),
        getBodyTypesAction({ limit: 100 }),
        getFuelTypesAction({ limit: 100 }),
        getModelsAction(),
      ]);
      if (b.status === "fulfilled") setBrands(b.value.data ?? []);
      if (bt.status === "fulfilled") setBodyTypes(bt.value.data ?? []);
      if (ft.status === "fulfilled") setFuelTypes(ft.value.data ?? []);
      if (m.status === "fulfilled") setAllModels(m.value.data ?? []);
    };
    load();
  }, []);

  // filter models by selected brand in form
  useEffect(() => {
    if (form.brandId) {
      setFilteredModels(allModels.filter((m) => m.brandId === form.brandId));
    } else {
      setFilteredModels(allModels);
    }
  }, [form.brandId, allModels]);

  const fetchCars = useCallback(async () => {
    setLoading(true);
    try {
      const params: CarsFilterParams = {
        page,
        limit: PAGE_SIZE,
        search: debouncedSearch || undefined,
        brandId: filterBrandId || undefined,
        modelId: filterModelId || undefined,
        bodyTypeId: filterBodyTypeId || undefined,
        fuelTypeId: filterFuelTypeId || undefined,
        transmission: filterTransmission || undefined,
        rentalType: filterRentalType || undefined,
        isAvailable: filterAvailable === "" ? undefined : filterAvailable === "true",
      };
      const res = await getCarsAction(params);
      setCars(res.data ?? []);
      setTotal(res.meta?.total ?? res.data?.length ?? 0);
    } catch {
      setCars([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch, filterBrandId, filterModelId, filterBodyTypeId, filterFuelTypeId, filterTransmission, filterRentalType, filterAvailable]);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, filterBrandId, filterModelId, filterBodyTypeId, filterFuelTypeId, filterTransmission, filterRentalType, filterAvailable]);

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  const activeFilterCount = [
    filterBrandId,
    filterModelId,
    filterBodyTypeId,
    filterFuelTypeId,
    filterTransmission,
    filterRentalType,
    filterAvailable,
  ].filter(Boolean).length;

  const clearFilters = () => {
    setFilterBrandId("");
    setFilterModelId("");
    setFilterBodyTypeId("");
    setFilterFuelTypeId("");
    setFilterTransmission("");
    setFilterRentalType("");
    setFilterAvailable("");
  };

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setFormError(null);
    setDialogOpen(true);
  };

  const openEdit = (car: ApiCar) => {
    setEditing(car);
    const brandId = typeof car.brand === "object" ? car.brand.id : "";
    const modelId = typeof car.model === "object" ? car.model.id : "";
    const bodyTypeId = typeof car.bodyType === "object"
      ? (car.bodyType as { id: string }).id
      : bodyTypes.find((bt) => bt.name === car.bodyType)?.id ?? "";
    const fuelTypeId = fuelTypes.find((ft) => ft.name === car.fuelType)?.id ?? "";
    setForm({
      name: car.name,
      brandId,
      modelId,
      year: String(car.year),
      bodyTypeId,
      pricePerDay: String(car.pricePerDay),
      rentalType: car.rentalType === "ANY" ? "ANY" : car.rentalType,
      seats: String(car.seats),
      transmission: car.transmission,
      fuelTypeId,
      mileage: String(car.mileage),
      engineCapacity: car.engineCapacity != null ? String(car.engineCapacity) : "",
      color: car.color ?? "",
      registrationNo: car.registrationNo ?? "",
      location: car.location,
      isAC: car.isAC,
      isWithDriver: car.isWithDriver,
      isAvailable: car.isAvailable,
    });
    setFormError(null);
    setDialogOpen(true);
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) { setFormError("Name is required"); return; }
    if (!form.brandId) { setFormError("Brand is required"); return; }
    if (!form.modelId) { setFormError("Model is required"); return; }
    if (!form.bodyTypeId) { setFormError("Body type is required"); return; }
    if (!form.fuelTypeId) { setFormError("Fuel type is required"); return; }
    if (!form.pricePerDay) { setFormError("Price per day is required"); return; }
    if (!form.location.trim()) { setFormError("Location is required"); return; }

    setSubmitting(true);
    setFormError(null);
    try {
      const base = {
        name: form.name.trim(),
        brandId: form.brandId,
        modelId: form.modelId,
        year: Number(form.year),
        bodyTypeId: form.bodyTypeId,
        pricePerDay: Number(form.pricePerDay),
        rentalType: form.rentalType,
        seats: Number(form.seats),
        transmission: form.transmission,
        fuelTypeId: form.fuelTypeId,
        mileage: Number(form.mileage),
        location: form.location.trim(),
        isAC: form.isAC,
        isWithDriver: form.isWithDriver,
        isAvailable: form.isAvailable,
        ...(form.engineCapacity ? { engineCapacity: Number(form.engineCapacity) } : {}),
        ...(form.color.trim() ? { color: form.color.trim() } : {}),
        ...(form.registrationNo.trim() ? { registrationNo: form.registrationNo.trim() } : {}),
      };

      if (editing) {
        await updateCarAction(editing.id, base as UpdateCarPayload);
      } else {
        await createCarAction(base as CreateCarPayload);
      }
      setDialogOpen(false);
      await fetchCars();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      setFormError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteCarAction(deleteTarget.id);
      setDeleteTarget(null);
      if (cars.length === 1 && page > 1) {
        setPage((p) => p - 1);
      } else {
        await fetchCars();
      }
    } catch {
      // swallow
    } finally {
      setDeleting(false);
    }
  };

  const getBrandName = (car: ApiCar) =>
    typeof car.brand === "object" ? car.brand.name : car.brand;
  const getBrandLogo = (car: ApiCar) =>
    typeof car.brand === "object" ? car.brand.logo : null;
  const getModelName = (car: ApiCar) =>
    typeof car.model === "object" ? car.model.name : car.model;

  const primaryImage = (car: ApiCar) =>
    car.images?.find((i) => i.isPrimary)?.url ?? car.images?.[0]?.url ?? null;

  return (
    <div className="min-h-screen p-8" style={{ background: "#faf8f4" }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-[11px] uppercase tracking-[.18em] font-semibold text-gray-500">
              Cars / All Cars
            </span>
            <h1 className="font-['Bebas_Neue'] text-3xl tracking-wide text-gray-900 mt-1">
              Manage Cars
            </h1>
          </div>
          <Button
            onClick={openCreate}
            className="bg-gray-900 hover:bg-gray-800 text-white"
          >
            <Plus size={16} /> New Car
          </Button>
        </div>

        <div className="bg-white rounded-xl border border-[#ede8df] overflow-hidden">
          {/* Toolbar */}
          <div className="px-5 py-4 border-b border-[#ede8df] flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="relative flex-1 max-w-sm">
                <Search
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search cars…"
                  className="pl-9"
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters((v) => !v)}
                className="flex items-center gap-1.5"
              >
                <Filter size={13} />
                Filters
                {activeFilterCount > 0 && (
                  <Badge className="ml-1 h-4 px-1.5 text-[10px] bg-gray-900 text-white">
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>
              {activeFilterCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-gray-400 hover:text-gray-700 px-2"
                >
                  <X size={13} /> Clear
                </Button>
              )}
              <span className="text-xs text-gray-500 ml-auto">{total} total</span>
            </div>

            {showFilters && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 pt-1">
                <Select value={filterBrandId} onValueChange={setFilterBrandId}>
                  <SelectTrigger className="text-xs h-8">
                    <SelectValue placeholder="Brand" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All brands</SelectItem>
                    {brands.map((b) => (
                      <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={filterModelId} onValueChange={setFilterModelId}>
                  <SelectTrigger className="text-xs h-8">
                    <SelectValue placeholder="Model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All models</SelectItem>
                    {allModels
                      .filter((m) => !filterBrandId || m.brandId === filterBrandId)
                      .map((m) => (
                        <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>
                      ))}
                  </SelectContent>
                </Select>

                <Select value={filterBodyTypeId} onValueChange={setFilterBodyTypeId}>
                  <SelectTrigger className="text-xs h-8">
                    <SelectValue placeholder="Body type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All body types</SelectItem>
                    {bodyTypes.map((b) => (
                      <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={filterFuelTypeId} onValueChange={setFilterFuelTypeId}>
                  <SelectTrigger className="text-xs h-8">
                    <SelectValue placeholder="Fuel type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All fuel types</SelectItem>
                    {fuelTypes.map((f) => (
                      <SelectItem key={f.id} value={f.id}>{f.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={filterTransmission} onValueChange={setFilterTransmission}>
                  <SelectTrigger className="text-xs h-8">
                    <SelectValue placeholder="Transmission" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All transmissions</SelectItem>
                    <SelectItem value="AUTOMATIC">Automatic</SelectItem>
                    <SelectItem value="MANUAL">Manual</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterRentalType} onValueChange={setFilterRentalType}>
                  <SelectTrigger className="text-xs h-8">
                    <SelectValue placeholder="Rental type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All rental types</SelectItem>
                    <SelectItem value="PER_DAY">Per Day</SelectItem>
                    <SelectItem value="PER_HOUR">Per Hour</SelectItem>
                    <SelectItem value="ANY">Any</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterAvailable} onValueChange={setFilterAvailable}>
                  <SelectTrigger className="text-xs h-8">
                    <SelectValue placeholder="Availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All</SelectItem>
                    <SelectItem value="true">Available</SelectItem>
                    <SelectItem value="false">Unavailable</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-wider text-gray-500 border-b border-[#ede8df]">
                  <th className="px-5 py-3 font-semibold">Car</th>
                  <th className="px-5 py-3 font-semibold">Brand / Model</th>
                  <th className="px-5 py-3 font-semibold">Year</th>
                  <th className="px-5 py-3 font-semibold">Transmission</th>
                  <th className="px-5 py-3 font-semibold">Rental</th>
                  <th className="px-5 py-3 font-semibold text-right">Price/Day</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={8} className="px-5 py-12 text-center text-gray-400">
                      <Loader2 size={18} className="animate-spin inline-block" />
                    </td>
                  </tr>
                ) : cars.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-5 py-12 text-center text-gray-400">
                      No cars found.
                    </td>
                  </tr>
                ) : (
                  cars.map((car) => (
                    <tr
                      key={car.id}
                      className="border-b border-[#ede8df] last:border-0 hover:bg-[#faf8f4]"
                    >
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          {primaryImage(car) ? (
                            <Image
                              src={primaryImage(car)!}
                              alt={car.name}
                              width={48}
                              height={36}
                              className="w-12 h-9 rounded-md object-cover bg-gray-100 flex-shrink-0"
                              unoptimized
                            />
                          ) : (
                            <div className="w-12 h-9 rounded-md bg-gray-100 flex items-center justify-center flex-shrink-0">
                              <Car size={16} className="text-gray-300" />
                            </div>
                          )}
                          <div>
                            <p className="font-medium text-gray-900 leading-none">{car.name}</p>
                            {car.location && (
                              <p className="text-[11px] text-gray-400 mt-0.5">{car.location}</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          {getBrandLogo(car) && (
                            <Image
                              src={getBrandLogo(car)!}
                              alt={getBrandName(car)}
                              width={20}
                              height={20}
                              className="w-5 h-5 rounded object-contain"
                              unoptimized
                            />
                          )}
                          <div>
                            <p className="text-gray-900 font-medium leading-none">{getBrandName(car)}</p>
                            <p className="text-[11px] text-gray-400 mt-0.5">{getModelName(car)}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-gray-600">{car.year}</td>
                      <td className="px-5 py-3">
                        <Badge variant="outline" className="text-[11px] font-normal">
                          {TRANSMISSION_LABELS[car.transmission] ?? car.transmission}
                        </Badge>
                      </td>
                      <td className="px-5 py-3 text-gray-600 text-[12px]">
                        {RENTAL_LABELS[car.rentalType] ?? car.rentalType}
                      </td>
                      <td className="px-5 py-3 text-right font-medium text-gray-900">
                        ৳{car.pricePerDay.toLocaleString()}
                      </td>
                      <td className="px-5 py-3">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium ${
                            car.isAvailable
                              ? "bg-green-50 text-green-700"
                              : "bg-red-50 text-red-600"
                          }`}
                        >
                          {car.isAvailable ? "Available" : "Unavailable"}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-right">
                        <div className="inline-flex gap-1">
                          <Button
                            size="icon-sm"
                            variant="ghost"
                            onClick={() => openEdit(car)}
                            title="Edit"
                          >
                            <Pencil size={14} />
                          </Button>
                          <Button
                            size="icon-sm"
                            variant="ghost"
                            onClick={() => setDeleteTarget(car)}
                            title="Delete"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-5 py-3 border-t border-[#ede8df] flex items-center justify-between text-xs text-gray-500">
            <span>
              Page {page} of {totalPages}
            </span>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                disabled={page <= 1 || loading}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Previous
              </Button>
              <Button
                size="sm"
                variant="outline"
                disabled={page >= totalPages || loading}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Create / Edit dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Car" : "New Car"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={submitForm} className="flex flex-col gap-4">
            {/* Row 1: Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-700">Car Name</label>
              <Input
                autoFocus
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="e.g. Corolla 2022"
              />
            </div>

            {/* Row 2: Brand + Model */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-gray-700">Brand</label>
                <Select
                  value={form.brandId}
                  onValueChange={(v) => setForm((f) => ({ ...f, brandId: v, modelId: "" }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select brand" />
                  </SelectTrigger>
                  <SelectContent>
                    {brands.map((b) => (
                      <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-gray-700">Model</label>
                <Select
                  value={form.modelId}
                  onValueChange={(v) => setForm((f) => ({ ...f, modelId: v }))}
                  disabled={!form.brandId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredModels.map((m) => (
                      <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Row 3: Body Type + Fuel Type */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-gray-700">Body Type</label>
                <Select
                  value={form.bodyTypeId}
                  onValueChange={(v) => setForm((f) => ({ ...f, bodyTypeId: v }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select body type" />
                  </SelectTrigger>
                  <SelectContent>
                    {bodyTypes.map((b) => (
                      <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-gray-700">Fuel Type</label>
                <Select
                  value={form.fuelTypeId}
                  onValueChange={(v) => setForm((f) => ({ ...f, fuelTypeId: v }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select fuel type" />
                  </SelectTrigger>
                  <SelectContent>
                    {fuelTypes.map((f) => (
                      <SelectItem key={f.id} value={f.id}>{f.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Row 4: Year + Seats + Transmission */}
            <div className="grid grid-cols-3 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-gray-700">Year</label>
                <Input
                  type="number"
                  value={form.year}
                  onChange={(e) => setForm((f) => ({ ...f, year: e.target.value }))}
                  placeholder="2022"
                  min={1990}
                  max={new Date().getFullYear() + 1}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-gray-700">Seats</label>
                <Input
                  type="number"
                  value={form.seats}
                  onChange={(e) => setForm((f) => ({ ...f, seats: e.target.value }))}
                  placeholder="5"
                  min={1}
                  max={20}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-gray-700">Transmission</label>
                <Select
                  value={form.transmission}
                  onValueChange={(v: "AUTOMATIC" | "MANUAL") =>
                    setForm((f) => ({ ...f, transmission: v }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AUTOMATIC">Automatic</SelectItem>
                    <SelectItem value="MANUAL">Manual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Row 5: Price + Rental Type */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-gray-700">Price Per Day (৳)</label>
                <Input
                  type="number"
                  value={form.pricePerDay}
                  onChange={(e) => setForm((f) => ({ ...f, pricePerDay: e.target.value }))}
                  placeholder="5000"
                  min={0}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-gray-700">Rental Type</label>
                <Select
                  value={form.rentalType}
                  onValueChange={(v: "ANY" | "PER_DAY" | "PER_HOUR") =>
                    setForm((f) => ({ ...f, rentalType: v }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PER_DAY">Per Day</SelectItem>
                    <SelectItem value="PER_HOUR">Per Hour</SelectItem>
                    <SelectItem value="ANY">Any</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Row 6: Mileage + Engine Capacity */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-gray-700">Mileage (km)</label>
                <Input
                  type="number"
                  value={form.mileage}
                  onChange={(e) => setForm((f) => ({ ...f, mileage: e.target.value }))}
                  placeholder="15000"
                  min={0}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-gray-700">Engine Capacity (cc)</label>
                <Input
                  type="number"
                  value={form.engineCapacity}
                  onChange={(e) => setForm((f) => ({ ...f, engineCapacity: e.target.value }))}
                  placeholder="1600"
                  min={0}
                />
              </div>
            </div>

            {/* Row 7: Color + Registration No */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-gray-700">Color</label>
                <Input
                  value={form.color}
                  onChange={(e) => setForm((f) => ({ ...f, color: e.target.value }))}
                  placeholder="Silver"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-gray-700">Registration No</label>
                <Input
                  value={form.registrationNo}
                  onChange={(e) => setForm((f) => ({ ...f, registrationNo: e.target.value }))}
                  placeholder="DH-1234"
                />
              </div>
            </div>

            {/* Row 8: Location */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-700">Location</label>
              <Input
                value={form.location}
                onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                placeholder="Banani, Dhaka"
              />
            </div>

            {/* Row 9: Toggles */}
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={form.isAC}
                  onChange={(e) => setForm((f) => ({ ...f, isAC: e.target.checked }))}
                  className="rounded"
                />
                Air Conditioned
              </label>
              <label className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={form.isWithDriver}
                  onChange={(e) => setForm((f) => ({ ...f, isWithDriver: e.target.checked }))}
                  className="rounded"
                />
                With Driver
              </label>
              <label className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={form.isAvailable}
                  onChange={(e) => setForm((f) => ({ ...f, isAvailable: e.target.checked }))}
                  className="rounded"
                />
                Available
              </label>
            </div>

            {formError && (
              <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
                {formError}
              </p>
            )}

            <DialogFooter className="mt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={submitting}
                className="bg-gray-900 hover:bg-gray-800 text-white"
              >
                {submitting ? (
                  <>
                    <Loader2 size={14} className="animate-spin" /> Saving…
                  </>
                ) : editing ? (
                  "Save changes"
                ) : (
                  "Create"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete car?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete{" "}
              <span className="font-semibold text-gray-900">
                {deleteTarget?.name}
              </span>
              . This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                confirmDelete();
              }}
              disabled={deleting}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {deleting ? "Deleting…" : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
