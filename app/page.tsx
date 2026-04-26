'use client';

import Link from 'next/link';
import {
  ArrowRight,
  Search,
  MapPin,
  Calendar,
  Star,
  Shield,
  Zap,
  Clock,
  CheckCircle2,
  Heart,
} from 'lucide-react';
import { carsData } from '@/lib/car-data';

const categories = [
  { name: 'Sedan', count: 14, image: 'https://images.unsplash.com/photo-1606611013016-969c19d24e23?w=600&h=400&fit=crop' },
  { name: 'SUV', count: 9, image: 'https://images.unsplash.com/photo-1605559424843-9e4c3ff86173?w=600&h=400&fit=crop' },
  { name: 'Hatchback', count: 7, image: 'https://images.unsplash.com/photo-1619405399517-541782920ee0?w=600&h=400&fit=crop' },
  { name: 'Crossover', count: 6, image: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=600&h=400&fit=crop' },
];

const howItWorks = [
  { icon: Search, title: 'Find a Car', description: 'Filter from 48+ premium cars by body type, fuel, transmission, and budget.' },
  { icon: Calendar, title: 'Pick Your Time', description: 'Choose hourly, daily, or weekly rental. Free cancellation up to 30 minutes before pickup.' },
  { icon: Zap, title: 'Drive Now', description: 'Unlock the car from your phone, hit the road, and return it anywhere in the network.' },
];

const perks = [
  { icon: Shield, label: 'Full Insurance Included' },
  { icon: Zap, label: 'Instant Unlock' },
  { icon: Clock, label: '10 Min Free / Trip' },
  { icon: CheckCircle2, label: 'No Hidden Fees' },
];

export default function HomePage() {
  const popularCars = carsData
    .slice()
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);

  return (
    <div className="bg-white">

      {/* ─── Hero ─────────────────────────────────────────── */}
      <section className="relative w-full min-h-[calc(100vh-3.5rem)] overflow-hidden flex items-center">
        <video autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-55">
          <source src="/hero-section/car-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/25" />
        <div className="absolute left-0 top-0 w-[3px] h-full z-10"
          style={{ background: 'linear-gradient(to bottom, #c9a84c, #8b5e1a)' }} />
        <span className="absolute right-10 top-1/2 -translate-y-1/2 rotate-90 origin-center text-[10px] tracking-[.2em] uppercase text-white z-10 whitespace-nowrap select-none">
          Premium Fleet · Est. 2026
        </span>

        <div className="relative z-10 pl-12 pr-6 py-20 w-full max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 border text-[11px] tracking-[.12em] uppercase px-3.5 py-1.5 rounded-sm font-medium"
            style={{ background: 'rgba(201,168,76,.10)', borderColor: 'rgba(201,168,76,.35)', color: '#e8c96e' }}>
            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: '#c9a84c' }} />
            Auto Ultimate
          </div>
          <h1 className="font-['Bebas_Neue'] text-white leading-[.92] tracking-[.01em] mb-4"
            style={{ fontSize: 'clamp(3.4rem, 6.5vw, 5.4rem)' }}>
            Drive More,<br />
            Spend <span style={{ color: '#c9a84c' }}>Less</span><br />
            Every Time
          </h1>
          <div className="w-12 h-[2px] mb-5" style={{ background: '#c9a84c' }} />
          <p className="text-sm font-light leading-relaxed max-w-sm mb-8" style={{ color: 'rgba(255,255,255,.55)' }}>
            From weekend escapes to cross-city business runs — access a curated fleet that moves as fast as your plans change.
          </p>
          <div className="flex items-stretch rounded-md overflow-hidden mb-7 border"
            style={{ background: 'rgba(255,255,255,.06)', borderColor: 'rgba(255,255,255,.12)', backdropFilter: 'blur(14px)' }}>
            <div className="flex items-center gap-3 px-4 py-3 flex-1 border-r"
              style={{ borderColor: 'rgba(255,255,255,.10)' }}>
              <MapPin size={14} style={{ color: '#c9a84c', flexShrink: 0 }} />
              <div className="flex flex-col">
                <span className="text-[10px] tracking-[.08em] uppercase mb-0.5" style={{ color: 'rgba(255,255,255,.38)' }}>Location</span>
                <span className="text-sm text-white">San Francisco</span>
              </div>
            </div>
            <div className="flex items-center gap-3 px-4 py-3 flex-1 border-r"
              style={{ borderColor: 'rgba(255,255,255,.10)' }}>
              <Calendar size={14} style={{ color: '#c9a84c', flexShrink: 0 }} />
              <div className="flex flex-col">
                <span className="text-[10px] tracking-[.08em] uppercase mb-0.5" style={{ color: 'rgba(255,255,255,.38)' }}>Pick-up</span>
                <span className="text-sm text-white">Today · 02:00 PM</span>
              </div>
            </div>
            <Link href="/vehicles"
              className="flex items-center gap-2 px-6 text-[13px] font-medium tracking-[.05em] text-black whitespace-nowrap transition-all hover:opacity-90"
              style={{ background: '#c9a84c' }}>
              Search Vehicles <ArrowRight size={14} />
            </Link>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {perks.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-xs tracking-[.02em]"
                style={{ color: 'rgba(255,255,255,.45)' }}>
                <Icon size={12} style={{ color: '#c9a84c' }} />
                {label}
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 right-16 flex gap-3 z-10">
          {[{ num: '200+', lbl: 'Vehicles' }, { num: '50K+', lbl: 'Trips Done' }, { num: '4.9★', lbl: 'Avg Rating' }].map(({ num, lbl }) => (
            <div key={lbl} className="border rounded-md px-5 py-3 text-center"
              style={{ background: 'rgba(255,255,255,.07)', borderColor: 'rgba(255,255,255,.10)', backdropFilter: 'blur(12px)' }}>
              <div className="font-['Bebas_Neue'] text-2xl text-white tracking-wide leading-none">{num}</div>
              <div className="text-[10px] uppercase tracking-[.1em] mt-1" style={{ color: 'rgba(255,255,255,.38)' }}>{lbl}</div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5" style={{ opacity: .35 }}>
          <span className="text-[10px] uppercase tracking-[.15em] text-white">Scroll</span>
          <div className="w-px h-8 animate-pulse" style={{ background: 'linear-gradient(to bottom, white, transparent)' }} />
        </div>
      </section>

      {/* ─── Categories ───────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          {/* Header */}
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-[2px]" style={{ background: '#c9a84c' }} />
                <p className="text-[11px] uppercase tracking-[.18em] font-semibold" style={{ color: '#c9a84c' }}>
                  Browse by Type
                </p>
              </div>
              <h2 className="font-['Bebas_Neue'] text-4xl md:text-5xl tracking-wide leading-none text-gray-900">
                Choose Your Style
              </h2>
            </div>
            <Link href="/vehicles"
              className="flex items-center gap-2 text-xs uppercase tracking-[.12em] font-semibold px-4 py-2 rounded-sm border transition-all hover:text-white hover:bg-[#c9a84c]"
              style={{ color: '#c9a84c', borderColor: '#c9a84c' }}>
              View All <ArrowRight size={13} />
            </Link>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link key={cat.name} href="/vehicles"
                className="group relative aspect-[4/3] rounded-lg overflow-hidden"
                style={{ border: '1px solid #f0e8d6' }}>
                <img src={cat.image} alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/placeholder.svg'; }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                {/* Gold top sweep on hover */}
                <div className="absolute top-0 left-0 right-0 h-[3px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                  style={{ background: '#c9a84c' }} />
                <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
                  <div>
                    <p className="font-['Bebas_Neue'] text-lg text-white tracking-wide leading-none">{cat.name}</p>
                    <p className="text-[11px] mt-0.5 text-white/60">{cat.count} cars</p>
                  </div>
                  <div className="w-7 h-7 rounded-sm flex items-center justify-center transition-all group-hover:scale-110"
                    style={{ background: '#c9a84c', color: '#000' }}>
                    <ArrowRight size={12} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Popular Vehicles ─────────────────────────────── */}
      <section className="py-20" style={{ background: '#faf8f4' }}>
        <div className="max-w-7xl mx-auto px-6">

          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-[2px]" style={{ background: '#c9a84c' }} />
                <p className="text-[11px] uppercase tracking-[.18em] font-semibold" style={{ color: '#c9a84c' }}>
                  Top Rated This Week
                </p>
              </div>
              <h2 className="font-['Bebas_Neue'] text-4xl md:text-5xl tracking-wide leading-none text-gray-900">
                Popular Cars
              </h2>
            </div>
            <Link href="/vehicles"
              className="flex items-center gap-2 text-xs uppercase tracking-[.12em] font-semibold px-4 py-2 rounded-sm border transition-all hover:text-white hover:bg-[#c9a84c]"
              style={{ color: '#c9a84c', borderColor: '#c9a84c' }}>
              View All 48 <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {popularCars.map((car) => (
              <Link key={car.id} href="/vehicles"
                className="group bg-white rounded-lg overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
                style={{ border: '1px solid #ede8df', boxShadow: '0 2px 8px rgba(201,168,76,0.06)' }}>
                {/* Top bar */}
                <div className="flex items-center justify-between px-4 pt-3 pb-2 border-b border-gray-100">
                  <div className="flex items-center gap-1.5 text-xs">
                    <Star size={11} style={{ fill: '#c9a84c', color: '#c9a84c' }} />
                    <span className="font-bold text-gray-900">{car.rating.toFixed(1)}</span>
                    <span className="text-gray-400">({car.reviewCount})</span>
                  </div>
                  <Heart size={14} className="transition-colors group-hover:text-red-400 text-gray-300" />
                </div>
                {/* Image */}
                <div className="h-36 px-4 flex items-center justify-center overflow-hidden bg-gray-50">
                  <img src={car.image} alt={car.name}
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/placeholder.svg'; }} />
                </div>
                {/* Info */}
                <div className="px-4 pb-4 pt-3 flex items-end justify-between gap-2 border-t border-gray-100">
                  <div className="min-w-0">
                    <h3 className="font-bold text-[15px] text-gray-900 truncate">{car.name}</h3>
                    <p className="text-xs text-gray-400 truncate mt-0.5">{car.model}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-base font-bold" style={{ color: '#c9a84c' }}>${car.pricePerHour.toFixed(2)}</span>
                    <span className="text-xs text-gray-400"> / hr</span>
                  </div>
                </div>
                {/* Gold bottom sweep on hover */}
                <div className="h-[3px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                  style={{ background: '#c9a84c' }} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How It Works ─────────────────────────────────── */}
      <section className="py-20 bg-white relative">
        {/* Gold left accent */}
        <div className="absolute left-0 top-0 w-[3px] h-full"
          style={{ background: 'linear-gradient(to bottom, #c9a84c, transparent)' }} />

        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-14">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-[2px]" style={{ background: '#c9a84c' }} />
              <p className="text-[11px] uppercase tracking-[.18em] font-semibold" style={{ color: '#c9a84c' }}>
                Three Simple Steps
              </p>
            </div>
            <h2 className="font-['Bebas_Neue'] text-4xl md:text-5xl tracking-wide leading-none text-gray-900">
              Driving Has Never Been This Easy
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {howItWorks.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.title}
                  className="group relative rounded-lg p-7 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
                  style={{ background: '#fff', border: '1px solid #ede8df', boxShadow: '0 2px 8px rgba(201,168,76,0.05)' }}>
                  {/* Step number watermark */}
                  <div className="absolute top-4 right-5 font-['Bebas_Neue'] text-7xl leading-none select-none"
                    style={{ color: 'rgba(201,168,76,.08)', lineHeight: 1 }}>
                    {i + 1}
                  </div>
                  {/* Icon box */}
                  <div className="w-11 h-11 rounded-sm flex items-center justify-center mb-6"
                    style={{ background: 'rgba(201,168,76,.12)', border: '1px solid rgba(201,168,76,.3)', color: '#c9a84c' }}>
                    <Icon size={19} />
                  </div>
                  <p className="text-[10px] uppercase tracking-[.15em] mb-1.5 font-semibold"
                    style={{ color: '#c9a84c' }}>
                    Step {i + 1}
                  </p>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
                  {/* Gold bottom sweep on hover */}
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-b-lg"
                    style={{ background: '#c9a84c' }} />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Final CTA ────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden" style={{ background: '#faf8f4' }}>
        {/* Decorative gold rings */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ border: '1px solid rgba(201,168,76,.1)' }} />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full pointer-events-none"
          style={{ border: '1px solid rgba(201,168,76,.15)' }} />

        <div className="relative max-w-2xl mx-auto px-6 text-center">
         
         <h2 className="font-['Bebas_Neue'] text-5xl md:text-6xl text-gray-900 tracking-wide leading-none mb-4">
            Ready to Roll?
          </h2>
          <p className="text-base text-gray-500 mb-10">
            48 cars are just a few minutes away from you.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/vehicles"
              className="flex items-center gap-2 px-8 py-3.5 rounded-sm text-sm font-semibold tracking-[.05em] text-black transition-all hover:opacity-90 hover:-translate-y-0.5 shadow-lg"
              style={{ background: '#c9a84c', boxShadow: '0 8px 24px rgba(201,168,76,0.35)' }}>
              Browse All Cars <ArrowRight size={15} />
            </Link>
            <Link href="/vehicles"
              className="flex items-center gap-2 px-8 py-3.5 rounded-sm text-sm font-semibold tracking-[.05em] text-gray-700 transition-all hover:-translate-y-0.5 border border-gray-200 hover:border-[#c9a84c] hover:text-[#c9a84c] bg-white">
              Learn More
            </Link>
          </div>

          <p className="mt-8 text-[11px] tracking-[.06em] text-gray-400">
            No credit card required · Free cancel 30 min before · Instant confirmation
          </p>
        </div>
      </section>

    </div>
  );
}