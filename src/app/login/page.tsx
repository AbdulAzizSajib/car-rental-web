'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, ArrowRight, Mail, Lock } from 'lucide-react';
import { useForm } from '@tanstack/react-form';
import { useSearchParams } from 'next/navigation';
import { z } from 'zod';
import { loginAction } from '../../services/auth/login.action';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect') ?? undefined;

  const form = useForm({
    defaultValues: { email: '', password: '' },
    onSubmit: async ({ value }) => {
      setServerError(null);
      const result = await loginAction(value, redirectPath);
      if (result && 'success' in result && !result.success) {
        setServerError(result.message);
      }
    },
  });

  return (
    <div className="min-h-screen flex" style={{ background: '#ede8df' }}>

      {/* ── Left panel ── */}
      <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden flex-col">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&h=900&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-linear-to-br from-black/80 via-black/60 to-black/70" />

        {/* Gold left edge */}
        <div className="absolute left-0 top-0 w-0.75 h-full"
          style={{ background: 'linear-gradient(to bottom, #c9a84c, #8b5e1a)' }} />

        {/* Content */}
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

          {/* Mid copy */}
          <div className="flex-1 flex flex-col justify-center max-w-md">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-0.5" style={{ background: '#c9a84c' }} />
              <p className="text-[11px] uppercase tracking-[.18em] font-semibold"
                style={{ color: '#c9a84c' }}>
                Premium Car Rental
              </p>
            </div>
            <h2 className="font-['Bebas_Neue'] text-white leading-[.92] tracking-[.01em] mb-6"
              style={{ fontSize: 'clamp(2.8rem,4.5vw,4.2rem)' }}>
              Drive the car<br />
              you <span style={{ color: '#c9a84c' }}>deserve</span>
            </h2>
            <p className="text-sm leading-relaxed max-w-xs"
              style={{ color: 'rgba(255,255,255,.5)' }}>
              Access a curated fleet of premium vehicles. Instant unlock, full insurance, no hidden fees.
            </p>
          </div>

          {/* Stats */}
          <div className="flex gap-6">
            {[
              { num: '200+', lbl: 'Vehicles' },
              { num: '50K+', lbl: 'Trips Done' },
              { num: '4.9★', lbl: 'Avg Rating' },
            ].map(({ num, lbl }) => (
              <div key={lbl} className="border rounded-md px-5 py-3 text-center"
                style={{
                  background: 'rgba(255,255,255,.06)',
                  borderColor: 'rgba(255,255,255,.10)',
                  backdropFilter: 'blur(12px)',
                }}>
                <div className="font-['Bebas_Neue'] text-2xl text-white tracking-wide leading-none">{num}</div>
                <div className="text-[10px] uppercase tracking-widest mt-1"
                  style={{ color: 'rgba(255,255,255,.38)' }}>{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right panel ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-12"
        style={{ background: '#ede8df' }}>

        <div className="w-full max-w-sm">

          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-10 lg:hidden">
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
          <div className="mb-8">
            <h1 className="font-['Bebas_Neue'] text-4xl tracking-wide leading-none text-gray-900 mb-1">
              Welcome Back
            </h1>
            <p className="text-sm text-gray-500">Sign in to continue to your account</p>
          </div>

          {/* Server error */}
          {serverError && (
            <div className="mb-4 px-4 py-3 rounded-sm text-sm text-red-700 bg-red-50 border border-red-200">
              {serverError}
            </div>
          )}

          {/* Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="flex flex-col gap-4"
          >

            {/* Email */}
            <form.Field
              name="email"
              validators={{
                onBlur: ({ value }) => {
                  const result = z.string().email('Invalid email address').safeParse(value);
                  return result.success ? undefined : result.error.issues[0].message;
                },
              }}
            >
              {(field) => (
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] uppercase tracking-[.12em] font-semibold text-gray-600">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <input
                      type="email"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full pl-10 pr-4 py-3 rounded-sm text-sm bg-white border transition-all outline-none placeholder:text-gray-300 text-gray-900"
                      style={{
                        borderColor: field.state.meta.errors.length ? '#ef4444' : '#d9d0c1',
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = '#c9a84c')}
                      onBlur={(e) => {
                        field.handleBlur();
                        e.currentTarget.style.borderColor = field.state.meta.errors.length ? '#ef4444' : '#d9d0c1';
                      }}
                    />
                  </div>
                  {field.state.meta.errors.length > 0 && (
                    <p className="text-[11px] text-red-500">{String(field.state.meta.errors[0])}</p>
                  )}
                </div>
              )}
            </form.Field>

            {/* Password */}
            <form.Field
              name="password"
              validators={{
                onBlur: ({ value }) => {
                  if (!value) return 'Password is required';
                  if (value.length < 8) return 'Password must be at least 8 characters long';
                  return undefined;
                },
              }}
            >
              {(field) => (
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] uppercase tracking-[.12em] font-semibold text-gray-600">
                      Password
                    </label>
                    <Link href="/forgot-password"
                      className="text-[11px] font-medium transition-colors hover:text-[#c9a84c]"
                      style={{ color: '#c9a84c' }}>
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-11 py-3 rounded-sm text-sm bg-white border transition-all outline-none placeholder:text-gray-300 text-gray-900"
                      style={{
                        borderColor: field.state.meta.errors.length ? '#ef4444' : '#d9d0c1',
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = '#c9a84c')}
                      onBlur={(e) => {
                        field.handleBlur();
                        e.currentTarget.style.borderColor = field.state.meta.errors.length ? '#ef4444' : '#d9d0c1';
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                  {field.state.meta.errors.length > 0 && (
                    <p className="text-[11px] text-red-500">{String(field.state.meta.errors[0])}</p>
                  )}
                </div>
              )}
            </form.Field>

            {/* Remember me */}
            <label className="flex items-center gap-2.5 cursor-pointer select-none">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="sr-only"
                />
                <div
                  className="w-4 h-4 rounded-sm border-2 flex items-center justify-center transition-all"
                  style={{
                    borderColor: remember ? '#c9a84c' : '#c8bfad',
                    background: remember ? '#c9a84c' : 'transparent',
                  }}
                >
                  {remember && (
                    <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="#000" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              </div>
              <span className="text-xs text-gray-500">Remember me for 30 days</span>
            </label>

            {/* Submit */}
            <form.Subscribe selector={(s) => s.isSubmitting}>
              {(isSubmitting) => (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 w-full flex items-center justify-center gap-2 py-3.5 rounded-sm text-sm font-semibold tracking-[.06em] text-black transition-all hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
                  style={{
                    background: '#c9a84c',
                    boxShadow: '0 6px 20px rgba(201,168,76,0.35)',
                  }}
                >
                  {isSubmitting ? 'Signing in…' : <> Sign In <ArrowRight size={15} /></>}
                </button>
              )}
            </form.Subscribe>
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
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>

          {/* Sign up link */}
          <p className="mt-8 text-center text-xs text-gray-500">
            Don&apos;t have an account?{' '}
            <Link href="/register"
              className="font-semibold transition-colors hover:opacity-80"
              style={{ color: '#c9a84c' }}>
              Create one
            </Link>
          </p>

        </div>
      </div>

    </div>
  );
}
