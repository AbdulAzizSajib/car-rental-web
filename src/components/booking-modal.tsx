"use client";

import { useState, useTransition } from "react";
import {
  X,
  MapPin,
  Calendar,
  Phone,
  MessageSquare,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Car,
  Navigation,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/src/components/ui/button";
import { ApiCar } from "@/src/types/car.types";
import {
  createBookingAction,
  CreateBookingPayload,
} from "@/src/services/bookings/createBooking.action";

function resolveName(val: string | { name: string } | null | undefined): string {
  if (!val) return "";
  return typeof val === "string" ? val : val.name;
}

interface BookingModalProps {
  car: ApiCar;
  onClose: () => void;
}

type TripType = "ONE_WAY" | "ROUND_TRIP";

interface FormState {
  pickupLocation: string;
  dropLocation: string;
  startDate: string;
  endDate: string;
  tripType: TripType;
  contactNumber: string;
  specialRequest: string;
}

const STEPS = ["Trip details", "Schedule", "Contact"] as const;
type Step = 0 | 1 | 2;

function toMinDate() {
  return new Date().toISOString().slice(0, 16);
}

function calcDays(start: string, end: string) {
  if (!start || !end) return 0;
  const diff = new Date(end).getTime() - new Date(start).getTime();
  return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

function formatDateDisplay(iso: string) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function BookingModal({ car, onClose }: BookingModalProps) {
  const [step, setStep] = useState<Step>(0);
  const [isPending, startTransition] = useTransition();
  const [done, setDone] = useState(false);

  const primaryImage =
    car.images.find((img) => img.isPrimary)?.url ?? car.images[0]?.url;

  const [form, setForm] = useState<FormState>({
    pickupLocation: "",
    dropLocation: "",
    startDate: "",
    endDate: "",
    tripType: "ONE_WAY",
    contactNumber: "",
    specialRequest: "",
  });

  const set = (key: keyof FormState, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const days = calcDays(form.startDate, form.endDate);
  const totalPrice = days * car.pricePerDay;

  // ── Step validation ──────────────────────────────────────────────────────────
  function canProceed(): boolean {
    if (step === 0)
      return form.pickupLocation.trim() !== "" && form.dropLocation.trim() !== "";
    if (step === 1) return form.startDate !== "" && form.endDate !== "" && new Date(form.endDate) > new Date(form.startDate);
    return form.contactNumber.trim().length >= 7;
  }

  function handleNext() {
    if (step < 2) setStep((s) => (s + 1) as Step);
    else handleSubmit();
  }

  function handleSubmit() {
    startTransition(async () => {
      try {
        const payload: CreateBookingPayload = {
          carId: car.id,
          pickupLocation: form.pickupLocation.trim(),
          dropLocation: form.dropLocation.trim(),
          startDate: new Date(form.startDate).toISOString(),
          endDate: new Date(form.endDate).toISOString(),
          tripType: form.tripType,
          contactNumber: form.contactNumber.trim(),
          specialRequest: form.specialRequest.trim() || undefined,
        };
        await createBookingAction(payload);
        setDone(true);
      } catch {
        toast.error("Booking failed. Please try again.");
      }
    });
  }

  return (
    <div
      className="w-120 shrink-0 bg-white flex flex-col overflow-y-auto custom-scrollbar"
      style={{ borderLeft: "1px solid #ede8df" }}
    >
        {/* ── Header ──────────────────────────────────────────────────────────── */}
        <div className="shrink-0 flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">
              Book a ride
            </p>
            <h2 className="text-base font-semibold text-gray-900 leading-snug mt-0.5">
              {car.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={18} className="text-gray-500" />
          </button>
        </div>

        {/* ── Success state ────────────────────────────────────────────────────── */}
        {done ? (
          <div className="flex-1 flex flex-col items-center justify-center px-8 gap-4 text-center">
            <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
              <CheckCircle2 size={36} className="text-green-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Booking confirmed!
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Your booking for{" "}
                <span className="font-medium text-gray-800">{car.name}</span> has
                been placed. We&apos;ll contact you shortly.
              </p>
            </div>
            <div className="w-full rounded-xl border border-gray-100 bg-gray-50 p-4 text-left space-y-2 text-sm">
              <Row label="Pickup" value={form.pickupLocation} />
              <Row label="Drop" value={form.dropLocation} />
              <Row label="From" value={formatDateDisplay(form.startDate)} />
              <Row label="To" value={formatDateDisplay(form.endDate)} />
              <Row label="Duration" value={`${days} day${days !== 1 ? "s" : ""}`} />
              <Row
                label="Total"
                value={`৳${totalPrice.toLocaleString()}`}
                bold
              />
            </div>
            <Button
              className="w-full bg-gray-900 text-white hover:bg-gray-800"
              onClick={onClose}
            >
              Done
            </Button>
          </div>
        ) : (
          <>
            {/* ── Car preview strip ───────────────────────────────────────────── */}
            <div className="shrink-0 flex items-center gap-3 px-6 py-3 bg-[#faf8f4] border-b border-gray-100">
              <div className="w-14 h-10 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                {primaryImage ? (
                  <img
                    src={primaryImage}
                    alt={car.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Car size={16} className="text-gray-300" />
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <p className="text-xs text-gray-500 truncate">
                  {resolveName(car.brand)} · {resolveName(car.model)}
                </p>
                <p className="text-sm font-semibold text-gray-900">
                  ৳{car.pricePerDay.toLocaleString()}
                  <span className="text-xs font-normal text-gray-400"> / day</span>
                </p>
              </div>
              {days > 0 && (
                <div className="ml-auto text-right shrink-0">
                  <p className="text-[10px] text-gray-400">{days}d total</p>
                  <p className="text-sm font-bold text-gray-900">
                    ৳{totalPrice.toLocaleString()}
                  </p>
                </div>
              )}
            </div>

            {/* ── Step indicator ──────────────────────────────────────────────── */}
            <div className="shrink-0 flex items-center gap-0 px-6 pt-4 pb-2">
              {STEPS.map((label, i) => (
                <div key={i} className="flex items-center">
                  <div className="flex items-center gap-1.5">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors ${
                        i < step
                          ? "bg-gray-900 text-white"
                          : i === step
                            ? "bg-gray-900 text-white ring-2 ring-gray-900 ring-offset-2"
                            : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {i < step ? "✓" : i + 1}
                    </div>
                    <span
                      className={`text-xs font-medium transition-colors ${
                        i <= step ? "text-gray-900" : "text-gray-400"
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div
                      className={`mx-2 h-px w-6 transition-colors ${
                        i < step ? "bg-gray-900" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* ── Step content ────────────────────────────────────────────────── */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4 custom-scrollbar">
              {/* Step 0 — Trip details */}
              {step === 0 && (
                <div className="space-y-4">
                  {/* Trip type */}
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Trip type
                    </label>
                    <div className="mt-2 flex gap-2">
                      {(["ONE_WAY", "ROUND_TRIP"] as TripType[]).map((t) => (
                        <button
                          key={t}
                          onClick={() => set("tripType", t)}
                          className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                            form.tripType === t
                              ? "bg-gray-900 text-white border-gray-900"
                              : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                          }`}
                        >
                          {t === "ONE_WAY" ? "One Way" : "Round Trip"}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Pickup location */}
                  <FieldWrap
                    label="Pickup location"
                    icon={<MapPin size={15} className="text-gray-400" />}
                  >
                    <input
                      type="text"
                      placeholder="e.g. Dhaka Airport"
                      value={form.pickupLocation}
                      onChange={(e) => set("pickupLocation", e.target.value)}
                      className="w-full text-sm text-gray-900 bg-transparent outline-none placeholder-gray-400"
                    />
                  </FieldWrap>

                  {/* Drop location */}
                  <FieldWrap
                    label="Drop location"
                    icon={<Navigation size={15} className="text-gray-400" />}
                  >
                    <input
                      type="text"
                      placeholder="e.g. Chittagong"
                      value={form.dropLocation}
                      onChange={(e) => set("dropLocation", e.target.value)}
                      className="w-full text-sm text-gray-900 bg-transparent outline-none placeholder-gray-400"
                    />
                  </FieldWrap>
                </div>
              )}

              {/* Step 1 — Schedule */}
              {step === 1 && (
                <div className="space-y-4">
                  <FieldWrap
                    label="Pickup date & time"
                    icon={<Calendar size={15} className="text-gray-400" />}
                  >
                    <input
                      type="datetime-local"
                      min={toMinDate()}
                      value={form.startDate}
                      onChange={(e) => {
                        set("startDate", e.target.value);
                        if (form.endDate && new Date(e.target.value) >= new Date(form.endDate)) {
                          set("endDate", "");
                        }
                      }}
                      className="w-full text-sm text-gray-900 bg-transparent outline-none"
                    />
                  </FieldWrap>

                  <FieldWrap
                    label="Return date & time"
                    icon={<Calendar size={15} className="text-gray-400" />}
                  >
                    <input
                      type="datetime-local"
                      min={form.startDate || toMinDate()}
                      value={form.endDate}
                      onChange={(e) => set("endDate", e.target.value)}
                      className="w-full text-sm text-gray-900 bg-transparent outline-none"
                    />
                  </FieldWrap>

                  {days > 0 && (
                    <div className="rounded-xl bg-gray-50 border border-gray-100 px-4 py-3 flex items-center justify-between">
                      <p className="text-sm text-gray-600">
                        {days} day{days !== 1 ? "s" : ""} · ৳
                        {car.pricePerDay.toLocaleString()} / day
                      </p>
                      <p className="text-sm font-bold text-gray-900">
                        ৳{totalPrice.toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Step 2 — Contact */}
              {step === 2 && (
                <div className="space-y-4">
                  <FieldWrap
                    label="Contact number"
                    icon={<Phone size={15} className="text-gray-400" />}
                  >
                    <input
                      type="tel"
                      placeholder="e.g. 01700000000"
                      value={form.contactNumber}
                      onChange={(e) => set("contactNumber", e.target.value)}
                      className="w-full text-sm text-gray-900 bg-transparent outline-none placeholder-gray-400"
                    />
                  </FieldWrap>

                  <FieldWrap
                    label="Special request (optional)"
                    icon={<MessageSquare size={15} className="text-gray-400" />}
                  >
                    <textarea
                      placeholder="e.g. Need early pickup, child seat..."
                      value={form.specialRequest}
                      onChange={(e) => set("specialRequest", e.target.value)}
                      rows={3}
                      className="w-full text-sm text-gray-900 bg-transparent outline-none placeholder-gray-400 resize-none"
                    />
                  </FieldWrap>

                  {/* Final summary */}
                  <div className="rounded-xl border border-gray-100 bg-[#faf8f4] p-4 space-y-2 text-sm">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                      Booking summary
                    </p>
                    <Row label="Car" value={car.name} />
                    <Row label="Pickup" value={form.pickupLocation} />
                    <Row label="Drop" value={form.dropLocation} />
                    <Row label="From" value={formatDateDisplay(form.startDate)} />
                    <Row label="To" value={formatDateDisplay(form.endDate)} />
                    <Row label="Trip" value={form.tripType === "ONE_WAY" ? "One Way" : "Round Trip"} />
                    <div className="border-t border-gray-200 pt-2 mt-2">
                      <Row
                        label={`${days} day${days !== 1 ? "s" : ""} × ৳${car.pricePerDay.toLocaleString()}`}
                        value={`৳${totalPrice.toLocaleString()}`}
                        bold
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ── Footer actions ───────────────────────────────────────────────── */}
            <div className="shrink-0 flex items-center gap-3 px-6 py-4 border-t border-gray-100">
              {step > 0 && (
                <Button
                  variant="outline"
                  onClick={() => setStep((s) => (s - 1) as Step)}
                  className="gap-1.5"
                  disabled={isPending}
                >
                  <ArrowLeft size={14} />
                  Back
                </Button>
              )}
              <Button
                className="flex-1 bg-gray-900 text-white hover:bg-gray-800 gap-1.5"
                onClick={handleNext}
                disabled={!canProceed() || isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Confirming…
                  </>
                ) : step < 2 ? (
                  <>
                    Next
                    <ArrowRight size={14} />
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={14} />
                    Confirm booking
                  </>
                )}
              </Button>
            </div>
          </>
        )}
    </div>
  );
}

/* ── helpers ──────────────────────────────────────────────────────────────── */

function FieldWrap({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        {label}
      </label>
      <div className="mt-1.5 flex items-start gap-2.5 border border-gray-200 rounded-xl px-3 py-2.5 focus-within:border-gray-400 transition-colors bg-white">
        <span className="mt-0.5 shrink-0">{icon}</span>
        {children}
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  bold,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-gray-500 shrink-0">{label}</span>
      <span
        className={`text-right ${bold ? "font-bold text-gray-900" : "text-gray-800"}`}
      >
        {value}
      </span>
    </div>
  );
}
