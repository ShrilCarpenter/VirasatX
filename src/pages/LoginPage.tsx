import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Landmark, Mail, Lock, ArrowRight, AlertCircle, Sparkles, CheckCircle } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Please enter both your email address and password.');
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    if (!isSupabaseConfigured) {
      // Offline / Local Demo mode
      setTimeout(() => {
        setLoading(false);
        navigate('/profile');
      }, 500);
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMsg(error.message);
      } else {
        navigate('/profile');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 space-y-8 animate-fadeIn">
      <Breadcrumbs items={[{ label: 'Patron Sign In' }]} />

      <div className="text-center space-y-3">
        <div className="w-14 h-14 rounded-2xl bg-[#F7EFE6] text-[#936B38] flex items-center justify-center mx-auto shadow-2xs border border-[#E7D6C0]">
          <Landmark className="w-7 h-7" />
        </div>
        <span className="text-xs font-mono font-bold text-[#936B38] uppercase tracking-wider block">
          Patron &amp; Scholar Portal
        </span>
        <h1 className="font-serif text-3xl font-bold text-stone-900">
          Sign In to VirasatX
        </h1>
        <p className="text-xs sm:text-sm text-stone-600">
          Access your personal curated archives, saved epigraphy studies, and learning milestones.
        </p>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      {!isSupabaseConfigured && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs leading-relaxed space-y-1">
          <strong className="block font-semibold">Local Demonstration Mode:</strong>
          <p>
            Supabase cloud environment keys are optional. Entering any credentials in local development will safely initialize a local patron session.
          </p>
        </div>
      )}

      <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-6">
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-stone-600 block mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="scholar@heritage.org"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-[#936B38] focus:bg-white transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-stone-600">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-xs text-[#936B38] hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-[#936B38] focus:bg-white transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-[#151D2A] hover:bg-[#936B38] disabled:opacity-50 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <span>{loading ? 'Authenticating…' : 'Sign In'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="pt-4 border-t border-stone-100 text-center text-xs text-stone-600">
          <span>New to VirasatX? </span>
          <Link to="/signup" className="text-[#936B38] font-semibold hover:underline">
            Create a free patron account &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};
