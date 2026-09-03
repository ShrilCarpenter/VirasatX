import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, CheckCircle, AlertCircle, Landmark } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setErrorMsg(null);

    if (!isSupabaseConfigured) {
      setSent(true);
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) {
        setErrorMsg(error.message);
      } else {
        setSent(true);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Could not send reset instructions.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 space-y-8 animate-fadeIn">
      <Breadcrumbs items={[{ label: 'Sign In', path: '/login' }, { label: 'Reset Password' }]} />

      <div className="text-center space-y-3">
        <div className="w-14 h-14 rounded-2xl bg-[#F7EFE6] text-[#936B38] flex items-center justify-center mx-auto shadow-2xs border border-[#E7D6C0]">
          <Landmark className="w-7 h-7" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-stone-900">
          Reset Password
        </h1>
        <p className="text-xs sm:text-sm text-stone-600">
          Enter your registered patron email to receive secure recovery instructions.
        </p>
      </div>

      {sent ? (
        <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-sm text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-xl font-bold text-stone-900">
            Recovery Email Dispatched
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            If an account exists for <strong>{email}</strong>, a password reset link has been dispatched. Please check your inbox and spam folders.
          </p>
          <div className="pt-2">
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#936B38] hover:underline"
            >
              <span>Return to Sign In</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-6">
          {errorMsg && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleReset} className="space-y-4">
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

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-[#151D2A] hover:bg-[#936B38] disabled:opacity-50 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <span>{loading ? 'Sending Instructions…' : 'Send Reset Link'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          <div className="pt-2 text-center text-xs text-stone-500">
            <Link to="/login" className="hover:underline">
              Remember your password? Sign in &rarr;
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
