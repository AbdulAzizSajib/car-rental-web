'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, ArrowRight, Mail, Lock, User, Phone } from 'lucide-react';

const inputClass =
  'w-full py-3 rounded-sm text-sm bg-white border transition-all outline-none placeholder:text-gray-300 text-gray-900';
const borderDefault = '#d9d0c1';
const borderFocus = '#c9a84c';

function Field({
  label,
  icon: Icon,
  type = 'text',
  placeholder,
  value,
  onChange,
}: {
  label: string;
  icon: React.ElementType;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] uppercase tracking-[.12em] font-semibold text-gray-600">
        {label}
      </label>
      <div className="relative">
        <Icon size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required
          className={`${inputClass} pl-10 pr-4`}
          style={{ borderColor: borderDefault }}
          onFocus={(e) => (e.currentTarget.style.borderColor = borderFocus)}
          onBlur={(e) => (e.currentTarget.style.borderColor = borderDefault)}
        />
      </div>
    </div>
  );
}

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex" style={{ background: '#ede8df' }}>

      {/* ── Left panel ── */}
      <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden flex-col">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&h=900&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/60 to-black/70" />
        <div className="absolute left-0 top-0 w-[3px] h-full"
          style={{ background: 'linear-gradient(to bottom, #c9a84c, #8b5e1a)' }} />

        <div className="relative z-10 flex flex-col h-full p-12">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm flex items-center justify-center"
              style={{ background: '#c9a84c' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="#000" strokeWidth="2.5"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="font-['Bebas_Neue'] text-xl tracking-[.2em] text-white">
              AUTO ULTIMATE
            </span>
          </div>

          <div className="flex-1 flex flex-col justify-center max-w-md">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-[2px]" style={{ background: '#c9a84c' }} />
              <p className="text-[11px] uppercase tracking-[.18em] font-semibold"
                style={{ color: '#c9a84c' }}>
                Join Auto Ultimate
              </p>
            </div>
            <h2 className="font-['Bebas_Neue'] text-white leading-[.92] tracking-[.01em] mb-6"
              style={{ fontSize: 'clamp(2.8rem,4vw,3.8rem)' }}>
              Your journey<br />
              starts <span style={{ color: '#c9a84c' }}>here</span>
            </h2>
            <p className="text-sm leading-relaxed max-w-xs"
              style={{ color: 'rgba(255,255,255,.5)' }}>
              Create your free account and unlock access to 200+ premium vehicles, instant booking, and full roadside coverage.
            </p>

            {/* Perks */}
            <div className="mt-8 flex flex-col gap-3">
              {[
                'Free cancellation up to 30 min before pickup',
                'Full insurance included on every trip',
                'Instant phone unlock — no key needed',
              ].map((perk) => (
                <div key={perk} className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-sm shrink-0 flex items-center justify-center"
                    style={{ background: 'rgba(201,168,76,.2)', border: '1px solid rgba(201,168,76,.4)' }}>
                    <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="#c9a84c" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="text-xs" style={{ color: 'rgba(255,255,255,.55)' }}>{perk}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-[11px] tracking-[.06em]" style={{ color: 'rgba(255,255,255,.25)' }}>
            © 2026 Auto Ultimate · San Francisco
          </p>
        </div>
      </div>

      {/* ── Right panel ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-12 overflow-y-auto"
        style={{ background: '#ede8df' }}>

        <div className="w-full max-w-sm">

          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-7 h-7 rounded-sm flex items-center justify-center"
              style={{ background: '#c9a84c' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="#000" strokeWidth="2.5"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="font-['Bebas_Neue'] text-lg tracking-[.2em] text-gray-900">
              AUTO ULTIMATE
            </span>
          </div>

          {/* Heading */}
          <div className="mb-7">
            <h1 className="font-['Bebas_Neue'] text-4xl tracking-wide leading-none text-gray-900 mb-1">
              Create Account
            </h1>
            <p className="text-sm text-gray-500">Fill in the details below to get started</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            <Field
              label="Full Name"
              icon={User}
              placeholder="Sajib"
              value={form.name}
              onChange={set('name')}
            />

            <Field
              label="Email Address"
              icon={Mail}
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={set('email')}
            />

            <Field
              label="Phone Number"
              icon={Phone}
              type="tel"
              placeholder="01XXXXXXXXX"
              value={form.phone}
              onChange={set('phone')}
            />

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] uppercase tracking-[.12em] font-semibold text-gray-600">
                Password
              </label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={set('password')}
                  placeholder="Min. 8 characters"
                  required
                  className={`${inputClass} pl-10 pr-11`}
                  style={{ borderColor: borderDefault }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = borderFocus)}
                  onBlur={(e) => (e.currentTarget.style.borderColor = borderDefault)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Terms */}
            <label className="flex items-start gap-2.5 cursor-pointer select-none mt-1">
              <div className="relative mt-0.5 shrink-0">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="sr-only"
                />
                <div
                  className="w-4 h-4 rounded-sm border-2 flex items-center justify-center transition-all"
                  style={{
                    borderColor: agreed ? '#c9a84c' : '#c8bfad',
                    background: agreed ? '#c9a84c' : 'transparent',
                  }}
                >
                  {agreed && (
                    <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="#000" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              </div>
              <span className="text-xs text-gray-500 leading-relaxed">
                I agree to the{' '}
                <Link href="/terms" className="font-semibold transition-colors hover:opacity-80"
                  style={{ color: '#c9a84c' }}>
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="font-semibold transition-colors hover:opacity-80"
                  style={{ color: '#c9a84c' }}>
                  Privacy Policy
                </Link>
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={!agreed}
              className="mt-2 w-full flex items-center justify-center gap-2 py-3.5 rounded-sm text-sm font-semibold tracking-[.06em] text-black transition-all hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0"
              style={{
                background: '#c9a84c',
                boxShadow: agreed ? '0 6px 20px rgba(201,168,76,0.35)' : 'none',
              }}
            >
              Create Account <ArrowRight size={15} />
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px" style={{ background: '#d9d0c1' }} />
            <span className="text-[11px] text-gray-400 tracking-widest uppercase">or</span>
            <div className="flex-1 h-px" style={{ background: '#d9d0c1' }} />
          </div>

          {/* Google SSO */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 py-3 rounded-sm text-sm font-medium text-gray-700 bg-white border transition-all hover:border-gray-300 hover:shadow-sm"
            style={{ borderColor: '#d9d0c1' }}
          >
            <svg width="17" height="17" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>

          {/* Sign in link */}
          <p className="mt-8 text-center text-xs text-gray-500">
            Already have an account?{' '}
            <Link href="/login"
              className="font-semibold transition-colors hover:opacity-80"
              style={{ color: '#c9a84c' }}>
              Sign in
            </Link>
          </p>

        </div>
      </div>

    </div>
  );
}
