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
  {
    name: 'সেডান',
    count: 14,
    image: 'https://images.unsplash.com/photo-1606611013016-969c19d24e23?w=600&h=400&fit=crop',
  },
  {
    name: 'এসইউভি',
    count: 9,
    image: 'https://images.unsplash.com/photo-1605559424843-9e4c3ff86173?w=600&h=400&fit=crop',
  },
  {
    name: 'হ্যাচব্যাক',
    count: 7,
    image: 'https://images.unsplash.com/photo-1619405399517-541782920ee0?w=600&h=400&fit=crop',
  },
  {
    name: 'ক্রসওভার',
    count: 6,
    image: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=600&h=400&fit=crop',
  },
];

const stats = [
  { label: 'উপলব্ধ গাড়ি', value: '৪৮+' },
  { label: 'গড় রেটিং', value: '৪.৮★' },
  { label: 'পিকআপ লোকেশন', value: '১২' },
  { label: 'সাপোর্ট', value: '২৪/৭' },
];

const howItWorks = [
  {
    icon: Search,
    title: 'গাড়ি খুঁজুন',
    description:
      'বডি টাইপ, ফুয়েল, ট্রান্সমিশন ও বাজেট অনুযায়ী ৪৮+ প্রিমিয়াম গাড়ি ফিল্টার করুন।',
  },
  {
    icon: Calendar,
    title: 'সময় বেছে নিন',
    description:
      'ঘণ্টা, দিন বা সাপ্তাহিক ভাড়া বেছে নিন। পিকআপের ৩০ মিনিট আগে পর্যন্ত ফ্রি ক্যান্সেল।',
  },
  {
    icon: Zap,
    title: 'এখনই ড্রাইভ করুন',
    description:
      'ফোন থেকে গাড়ি আনলক করুন, রাস্তায় বের হন, নেটওয়ার্কের যেকোনো জায়গায় ফেরত দিন।',
  },
];

const perks = [
  { icon: Shield, label: 'সম্পূর্ণ বীমা অন্তর্ভুক্ত' },
  { icon: Zap, label: 'তাৎক্ষণিক আনলক' },
  { icon: Clock, label: '১০ মিনিট ফ্রি / ট্রিপ' },
  { icon: CheckCircle2, label: 'কোনো লুকানো ফি নেই' },
];

export default function HomePage() {
  const popularCars = carsData
    .slice()
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);

  return (
    <div className="bg-white">

      {/* ─── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white">

        {/* Background blobs */}
        <div className="absolute -top-40 -right-40 w-130 h-130 rounded-full bg-brand/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-105 h-105 rounded-full bg-gold/10 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 pt-12 pb-10 lg:pt-16 lg:pb-16 grid lg:grid-cols-2 gap-12 items-center">

          {/* Left — copy */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-soft border border-brand/20 px-3 py-1 text-xs text-brand font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              এই মুহূর্তে সান ফ্রান্সিসকোতে ৪৮টি গাড়ি উপলব্ধ
            </div>

            {/* Headline */}
            <h1 className="mt-5 text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-gray-900 leading-[1.1] tracking-tight">
              যেকোনো গাড়ি চালান।
              <br />
              <span className="bg-linear-to-r from-brand via-blue-500 to-gold bg-clip-text text-transparent">
                ঘণ্টা হিসেবে ভাড়া।
              </span>
            </h1>

            <p className="mt-5 text-base md:text-lg text-gray-600 max-w-md leading-relaxed">
              মিনিতে ছোট কাজ থেকে এসকেলেডে সাপ্তাহিক ভ্রমণ —
              ৪৮+ প্রিমিয়াম গাড়ি ফোন থেকেই আনলক করুন।
            </p>

            {/* Search card */}
            <div className="mt-8 bg-white rounded-2xl shadow-lg shadow-brand/10 border border-gray-100 p-2 flex flex-col sm:flex-row items-stretch gap-2 max-w-xl">
              <div className="flex items-center gap-2 px-3 py-2 flex-1 min-w-0">
                <MapPin size={16} className="text-brand shrink-0" />
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-wider text-gray-400">পিকআপ</p>
                  <p className="text-sm font-semibold text-gray-900 truncate">সান ফ্রান্সিসকো, ইউএস</p>
                </div>
              </div>
              <div className="hidden sm:block w-px bg-gray-100 my-2" />
              <div className="flex items-center gap-2 px-3 py-2 flex-1 min-w-0">
                <Calendar size={16} className="text-gold shrink-0" />
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-wider text-gray-400">কখন</p>
                  <p className="text-sm font-semibold text-gray-900 truncate">আজ, দুপুর ০২:০০</p>
                </div>
              </div>
              <Link
                href="/vehicles"
                className="bg-brand hover:bg-brand-hover text-white text-sm font-semibold rounded-xl px-5 py-3 flex items-center justify-center gap-2 transition-colors shadow-md shadow-brand/30"
              >
                খুঁজুন
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Perks */}
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
              {perks.map((perk) => {
                const Icon = perk.icon;
                return (
                  <div key={perk.label} className="flex items-center gap-1.5 text-xs text-gray-500">
                    <Icon size={13} className="text-brand" />
                    {perk.label}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right — visual */}
          <div className="relative">
            <div className="relative aspect-[5/4] rounded-3xl overflow-hidden shadow-2xl shadow-brand/20">
              <img
                src="https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=1000&h=800&fit=crop"
                alt="Featured car"
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/placeholder.svg'; }}
              />
              <div className="absolute inset-0 bg-linear-to-t from-gray-900/50 via-transparent to-transparent" />

              {/* Featured badge */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg">
                <p className="text-[10px] uppercase tracking-wider text-brand font-semibold">ফিচার্ড</p>
                <p className="text-sm font-bold text-gray-900">অডি A4 — $২৪.৫৯ / ঘণ্টা</p>
              </div>

              {/* Bottom overlay */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1 text-xs">
                    <Star size={12} className="fill-gold text-gold" />
                    <span className="font-bold text-gray-900">৪.৯</span>
                    <span className="text-gray-400">(৫০৯)</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-900 mt-0.5">আজ ২৫০+ প্রিমিয়াম রাইড</p>
                </div>
                <div className="flex -space-x-2">
                  {['bg-brand', 'bg-gold', 'bg-emerald-400'].map((c, i) => (
                    <div key={i} className={`w-7 h-7 rounded-full ${c} ring-2 ring-white`} />
                  ))}
                </div>
              </div>
            </div>

            {/* Floating accent card */}
            <div className="absolute -bottom-5 -right-4 bg-brand rounded-2xl px-4 py-3 shadow-xl shadow-brand/40 text-white">
              <p className="text-xs opacity-80">সাশ্রয়</p>
              <p className="text-xl font-bold">৩০%</p>
              <p className="text-xs opacity-80">সাপ্তাহিক বুকিং-এ</p>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="relative max-w-7xl mx-auto px-6 pb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-200 rounded-2xl overflow-hidden shadow-sm">
            {stats.map((s, i) => (
              <div key={s.label} className={`bg-white text-center px-4 py-5 ${i === 0 ? 'rounded-l-2xl' : ''} ${i === 3 ? 'rounded-r-2xl' : ''}`}>
                <p className="text-2xl font-bold text-brand">{s.value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Categories ───────────────────────────────────── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs uppercase tracking-widest text-brand font-semibold">ধরন অনুযায়ী দেখুন</p>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-1">আপনার পছন্দ বেছে নিন</h2>
            </div>
            <Link href="/vehicles" className="text-sm text-brand hover:text-brand-hover font-medium flex items-center gap-1 transition-colors">
              সব দেখুন <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                href="/vehicles"
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-200"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/placeholder.svg'; }}
                />
                <div className="absolute inset-0 bg-linear-to-t from-gray-900/80 via-gray-900/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 flex items-end justify-between">
                  <div>
                    <p className="text-base font-bold text-white">{cat.name}</p>
                    <p className="text-xs text-white/70">{cat.count}টি গাড়ি</p>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white group-hover:bg-brand group-hover:border-brand transition-all">
                    <ArrowRight size={13} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Popular vehicles ─────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs uppercase tracking-widest text-gold font-semibold">এই সপ্তাহের শীর্ষ রেটিং</p>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-1">জনপ্রিয় গাড়ি</h2>
            </div>
            <Link href="/vehicles" className="text-sm text-brand hover:text-brand-hover font-medium flex items-center gap-1 transition-colors">
              সব ৪৮টি দেখুন <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {popularCars.map((car) => (
              <Link
                key={car.id}
                href="/vehicles"
                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-brand/10 hover:-translate-y-1 transition-all duration-200"
              >
                <div className="flex items-center justify-between px-4 pt-3 pb-1">
                  <div className="flex items-center gap-1 text-xs">
                    <Star size={12} className="fill-gold text-gold" />
                    <span className="font-bold text-gray-900">{car.rating.toFixed(1)}</span>
                    <span className="text-gray-400">({car.reviewCount})</span>
                  </div>
                  <Heart size={15} className="text-gray-200 group-hover:text-red-400 transition-colors" />
                </div>
                <div className="h-36 px-4 flex items-center justify-center overflow-hidden bg-gray-50">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/placeholder.svg'; }}
                  />
                </div>
                <div className="px-4 pb-4 pt-3 flex items-end justify-between gap-2 border-t border-gray-50">
                  <div className="min-w-0">
                    <h3 className="font-bold text-[15px] text-gray-900 truncate">{car.name}</h3>
                    <p className="text-xs text-gray-500 truncate mt-0.5">{car.model}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-base font-bold text-brand">${car.pricePerHour.toFixed(2)}</span>
                    <span className="text-xs text-gray-400"> / ঘণ্টা</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How it works ─────────────────────────────────── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-widest text-brand font-semibold">তিনটি সহজ ধাপ</p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">
              ড্রাইভিং কখনো এত সহজ ছিল না
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {howItWorks.map((step, i) => {
              const Icon = step.icon;
              const accent = i === 1 ? 'bg-gold shadow-gold/30' : 'bg-brand shadow-brand/30';
              return (
                <div
                  key={step.title}
                  className="relative bg-white border border-gray-100 rounded-2xl p-7 hover:shadow-lg transition-shadow"
                >
                  <div className="absolute top-5 right-5 text-6xl font-black text-gray-100 select-none leading-none">
                    {i + 1}
                  </div>
                  <div className={`w-11 h-11 rounded-xl ${accent} shadow-lg text-white flex items-center justify-center mb-5`}>
                    <Icon size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Final CTA ────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          {/* Decorative ring */}
          <div className="relative inline-block mb-6">
            <div className="w-16 h-16 rounded-full bg-brand-soft flex items-center justify-center mx-auto">
              <div className="w-10 h-10 rounded-full bg-brand flex items-center justify-center">
                <Zap size={20} className="text-white" />
              </div>
            </div>
            <div className="absolute inset-0 rounded-full bg-brand/20 animate-ping" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            চলতে প্রস্তুত?
          </h2>
          <p className="mt-3 text-gray-500 text-lg">
            আপনার কাছ থেকে মাত্র কয়েক মিনিট দূরে অপেক্ষায় আছে ৪৮টি গাড়ি।
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/vehicles"
              className="bg-brand hover:bg-brand-hover text-white font-semibold text-sm rounded-full px-8 py-3.5 flex items-center gap-2 shadow-lg shadow-brand/30 transition-all hover:shadow-xl hover:shadow-brand/40 hover:-translate-y-0.5"
            >
              সব গাড়ি দেখুন
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/vehicles"
              className="border border-gray-200 text-gray-700 hover:border-brand hover:text-brand font-semibold text-sm rounded-full px-8 py-3.5 transition-all"
            >
              আরও জানুন
            </Link>
          </div>

          <p className="mt-8 text-xs text-gray-400">
            কোনো ক্রেডিট কার্ড দরকার নেই · ৩০ মিনিট আগে ফ্রি ক্যান্সেল · তাৎক্ষণিক কনফার্মেশন
          </p>
        </div>
      </section>
    </div>
  );
}
