import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Landmark, Mail, Lock, User, ArrowRight, AlertCircle, CheckCircle, Shield } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const SignupPage: React.FC = () => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [language, setLanguage] = useState('en');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !displayName) {
      setErrorMsg('Please complete all required fields.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Password should be at least 6 characters in length.');
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    if (!isSupabaseConfigured) {
      setTimeout(() => {
        setLoading(false);
        navigate('/profile');
      }, 500);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: displayName,
            preferred_language: language,
          },
        },
      });

      if (error) {
        setErrorMsg(error.message);
      } else if (data.user && data.session) {
        // Direct login
        navigate('/profile');
      } else {
        // Confirmation email sent
        setSuccessMsg('Account created successfully! Please verify your email to begin your patron journey.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Could not complete registration. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 space-y-8 animate-fadeIn">
      <Breadcrumbs items={[{ label: 'Create Patron Account' }]} />

      <div className="text-center space-y-3">
        <div className="w-14 h-14 rounded-2xl bg-[#F7EFE6] text-[#936B38] flex items-center justify-center mx-auto shadow-2xs border border-[#E7D6C0]">
          <Landmark className="w-7 h-7" />
        </div>
        <span className="text-xs font-mono font-bold text-[#936B38] uppercase tracking-wider block">
          Heritage Custodianship
        </span>
        <h1 className="font-serif text-3xl font-bold text-stone-900">
          Join VirasatX
        </h1>
        <p className="text-xs sm:text-sm text-stone-600">
          Save discoveries, track learning paths, and contribute to living tradition documentation.
        </p>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-start gap-2.5">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <span>{successMsg}</span>
        </div>
      )}

      <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-6">
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-stone-600 block mb-1.5">
              Full Name / Scholar Alias
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Dr. Rajeshwari Sharma"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-[#936B38] focus:bg-white transition-all"
              />
            </div>
          </div>

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
            <label className="text-xs font-semibold text-stone-600 block mb-1.5">
              Password (min. 6 characters)
            </label>
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

          <div>
            <label className="text-xs font-semibold text-stone-600 block mb-1.5">
              Preferred Curatorial Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full py-2.5 px-3 rounded-xl border border-stone-200 bg-stone-50 text-xs text-stone-900 focus:outline-none focus:border-[#936B38]"
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी (Hindi)</option>
              <option value="sa">संस्कृतम् (Sanskrit)</option>
              <option value="ta">தமிழ் (Tamil)</option>
              <option value="te">తెలుగు (Telugu)</option>
              <option value="bn">বাংলা (Bengali)</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-[#151D2A] hover:bg-[#936B38] disabled:opacity-50 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <span>{loading ? 'Creating Account…' : 'Create Free Account'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="pt-4 border-t border-stone-100 text-center text-xs text-stone-600">
          <span>Already have an account? </span>
          <Link to="/login" className="text-[#936B38] font-semibold hover:underline">
            Sign in &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};
