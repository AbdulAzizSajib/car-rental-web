import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden"
      style={{ background: '#ede8df' }}
    >
      {/* Decorative gold rings */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ border: '1px solid rgba(201,168,76,.08)' }}
      />
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{ border: '1px solid rgba(201,168,76,.13)' }}
      />
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] rounded-full pointer-events-none"
        style={{ border: '1px solid rgba(201,168,76,.18)' }}
      />

      {/* Gold left edge */}
      <div
        className="absolute left-0 top-0 w-[3px] h-full"
        style={{ background: 'linear-gradient(to bottom, #c9a84c, transparent)' }}
      />

      <div className="relative z-10 text-center max-w-md">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 border text-[11px] tracking-[.12em] uppercase px-3.5 py-1.5 rounded-sm font-medium mb-6"
          style={{
            background: 'rgba(201,168,76,.10)',
            borderColor: 'rgba(201,168,76,.35)',
            color: '#c9a84c',
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full shrink-0"
            style={{ background: '#c9a84c' }}
          />
          Auto Ultimate
        </div>

        {/* 404 */}
        <div
          className="font-['Bebas_Neue'] leading-none tracking-wide mb-2 select-none"
          style={{ fontSize: 'clamp(7rem,20vw,11rem)', color: 'rgba(201,168,76,.18)' }}
        >
          404
        </div>

        {/* Heading */}
        <h1
          className="font-['Bebas_Neue'] tracking-wide leading-none text-gray-900 mb-3"
          style={{ fontSize: 'clamp(2rem,5vw,3rem)' }}
        >
          Road Not Found
        </h1>

        <div className="w-10 h-[2px] mx-auto mb-5" style={{ background: '#c9a84c' }} />

        <p className="text-sm text-gray-500 leading-relaxed mb-10">
          Looks like you took a wrong turn. The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 px-7 py-3.5 rounded-sm text-sm font-semibold tracking-[.05em] text-black transition-all hover:opacity-90 hover:-translate-y-0.5"
            style={{
              background: '#c9a84c',
              boxShadow: '0 6px 20px rgba(201,168,76,0.30)',
            }}
          >
            Back to Home <ArrowRight size={14} />
          </Link>
          <Link
            href="/vehicles"
            className="flex items-center gap-2 px-7 py-3.5 rounded-sm text-sm font-semibold tracking-[.05em] text-gray-700 bg-white border transition-all hover:-translate-y-0.5 hover:border-[#c9a84c] hover:text-[#c9a84c]"
            style={{ borderColor: '#d9d0c1' }}
          >
            Browse Vehicles
          </Link>
        </div>
      </div>
    </div>
  );
}
