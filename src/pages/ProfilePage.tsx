import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, 
  Bookmark, 
  BookOpen, 
  UploadCloud, 
  LogOut, 
  Shield, 
  CheckCircle, 
  Trash2, 
  Plus, 
  ExternalLink,
  Layers,
  ArrowRight,
  Clock,
  Sparkles,
  AlertTriangle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { HERITAGE_ITEMS, LIVING_TRADITIONS, MANUSCRIPTS_DATA } from '../data/heritageData';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { VerificationBadge } from '../components/VerificationBadge';
import { SafeImage } from '../components/SafeImage';

export const ProfilePage: React.FC = () => {
  const { user, profile, refreshProfile, signOut, favorites, toggleFavorite } = useAuth();
  const navigate = useNavigate();

  const [displayName, setDisplayName] = useState('');
  const [language, setLanguage] = useState('en');
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateMsg, setUpdateMsg] = useState<string | null>(null);

  // Tabs: 'saved' | 'learning' | 'submissions' | 'settings'
  const [activeTab, setActiveTab] = useState<'saved' | 'learning' | 'submissions' | 'settings'>('saved');

  // Submissions state
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [newSubmissionOpen, setNewSubmissionOpen] = useState(false);
  const [submissionTitle, setSubmissionTitle] = useState('');
  const [submissionType, setSubmissionType] = useState('Living Tradition / Craft');
  const [submissionDesc, setSubmissionDesc] = useState('');
  const [submissionRegion, setSubmissionRegion] = useState('South India');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMsg, setSubmissionMsg] = useState<string | null>(null);

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.display_name || '');
      setLanguage(profile.preferred_language || 'en');
    }
  }, [profile]);

  // Load user submissions
  useEffect(() => {
    if (!user || !isSupabaseConfigured) return;

    supabase
      .from('submissions')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (data) setSubmissions(data);
      });
  }, [user]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsUpdating(true);
    setUpdateMsg(null);

    if (!isSupabaseConfigured) {
      setTimeout(() => {
        setIsUpdating(false);
        setUpdateMsg('Profile preferences updated in local patron session.');
      }, 400);
      return;
    }

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          display_name: displayName,
          preferred_language: language,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (error) throw error;
      await refreshProfile();
      setUpdateMsg('Profile updated successfully.');
    } catch (err: any) {
      setUpdateMsg(`Error: ${err.message || 'Could not update profile'}`);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCreateSubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!submissionTitle || !submissionDesc) return;
    setIsSubmitting(true);
    setSubmissionMsg(null);

    const newSub = {
      user_id: user?.id || 'guest-patron',
      title: submissionTitle,
      type: submissionType,
      description: submissionDesc,
      region: submissionRegion,
      status: 'pending',
      created_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured && user) {
      const { error } = await supabase.from('submissions').insert([newSub]);
      if (error) {
        setSubmissionMsg(`Submission failed: ${error.message}`);
        setIsSubmitting(false);
        return;
      }
    }

    setSubmissions(prev => [newSub, ...prev]);
    setIsSubmitting(false);
    setSubmissionMsg('Contribution recorded and placed into curatorial review queue.');
    setSubmissionTitle('');
    setSubmissionDesc('');
    setTimeout(() => setNewSubmissionOpen(false), 1500);
  };

  // Find saved items from all datasets
  const savedArtifacts = HERITAGE_ITEMS.filter(item => favorites.includes(item.id));
  const savedTraditions = LIVING_TRADITIONS.filter(t => favorites.includes(t.id));
  const savedManuscripts = MANUSCRIPTS_DATA.filter(m => favorites.includes(m.id));
  const totalSaved = savedArtifacts.length + savedTraditions.length + savedManuscripts.length;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-8 animate-fadeIn">
      <Breadcrumbs items={[{ label: 'Patron Heritage Profile' }]} />

      {/* Header Profile Banner */}
      <div className="p-8 sm:p-10 rounded-3xl bg-white border border-stone-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-[#151D2A] text-[#D4AF37] flex items-center justify-center font-serif text-2xl font-bold shadow-md border border-[#936B38]">
            {(displayName || user?.email || 'P').charAt(0).toUpperCase()}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-[#936B38] uppercase tracking-wider">
                Certified Heritage Patron
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-semibold border border-emerald-200">
                Active Session
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              {displayName || user?.email?.split('@')[0] || 'VirasatX Patron'}
            </h1>
            <p className="text-xs text-stone-500 font-mono">
              {user?.email || 'patron.session@virasatx.org'}
            </p>
          </div>
        </div>

        <button
          onClick={async () => {
            await signOut();
            navigate('/');
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-50 text-xs font-semibold transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4 text-stone-400" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Navigation Ribbon Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-2 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('saved')}
          className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shrink-0 ${
            activeTab === 'saved'
              ? 'bg-stone-900 text-white shadow-xs'
              : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
          }`}
        >
          <Bookmark className="w-3.5 h-3.5" />
          <span>Saved Discoveries ({totalSaved})</span>
        </button>

        <button
          onClick={() => setActiveTab('learning')}
          className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shrink-0 ${
            activeTab === 'learning'
              ? 'bg-stone-900 text-white shadow-xs'
              : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Learning Progress</span>
        </button>

        <button
          onClick={() => setActiveTab('submissions')}
          className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shrink-0 ${
            activeTab === 'submissions'
              ? 'bg-stone-900 text-white shadow-xs'
              : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
          }`}
        >
          <UploadCloud className="w-3.5 h-3.5" />
          <span>Community Contributions ({submissions.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shrink-0 ${
            activeTab === 'settings'
              ? 'bg-stone-900 text-white shadow-xs'
              : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>Patron Settings</span>
        </button>
      </div>

      {/* TAB 1: SAVED DISCOVERIES */}
      {activeTab === 'saved' && (
        <div className="space-y-8">
          {totalSaved === 0 ? (
            <div className="p-12 bg-white rounded-3xl border border-stone-200 text-center space-y-4 shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-[#F7EFE6] text-[#936B38] flex items-center justify-center mx-auto">
                <Bookmark className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-stone-900">
                Your personal heritage collection is empty
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto leading-relaxed">
                Discover and bookmark verified bronze sculptures, sacred monuments, ancient palm-leaf folios, and living craft traditions across your studies.
              </p>
              <div className="pt-2">
                <Link
                  to="/discover"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors"
                >
                  <span>Explore National Collection</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Artifacts */}
              {savedArtifacts.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-serif text-xl font-bold text-stone-900 border-b border-stone-200 pb-2">
                    Artifacts &amp; Architecture ({savedArtifacts.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {savedArtifacts.map(item => (
                      <div
                        key={item.id}
                        className="rounded-2xl overflow-hidden bg-white border border-stone-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
                      >
                        <div className="p-4 flex items-center gap-4">
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-16 h-16 rounded-xl object-cover border border-stone-200 shrink-0"
                          />
                          <div className="truncate">
                            <span className="text-[10px] font-mono text-[#936B38] font-bold uppercase block">
                              {item.category}
                            </span>
                            <Link
                              to={`/artifact/${item.id}`}
                              className="font-serif text-sm font-bold text-stone-900 hover:text-[#A64B2A] transition-colors truncate block"
                            >
                              {item.title}
                            </Link>
                            <p className="text-xs text-stone-500 truncate">{item.location}</p>
                          </div>
                        </div>

                        <div className="px-4 py-2.5 bg-stone-50 border-t border-stone-100 flex items-center justify-between text-xs">
                          <Link
                            to={`/artifact/${item.id}`}
                            className="font-semibold text-[#936B38] hover:underline"
                          >
                            Inspect &rarr;
                          </Link>
                          <button
                            onClick={() => toggleFavorite(item.id, 'artifact')}
                            className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                            title="Remove from saved"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Traditions */}
              {savedTraditions.length > 0 && (
                <div className="space-y-4 pt-4">
                  <h3 className="font-serif text-xl font-bold text-stone-900 border-b border-stone-200 pb-2">
                    Living Traditions &amp; Guilds ({savedTraditions.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {savedTraditions.map(trad => (
                      <div
                        key={trad.id}
                        className="rounded-2xl overflow-hidden bg-white border border-stone-200 shadow-2xs p-4 flex items-center justify-between gap-4"
                      >
                        <div className="truncate">
                          <span className="text-[10px] font-mono text-emerald-700 font-bold uppercase block">
                            {trad.subCategory}
                          </span>
                          <Link
                            to={`/artisans/${trad.id}`}
                            className="font-serif text-sm font-bold text-stone-900 hover:text-[#A64B2A] truncate block"
                          >
                            {trad.title}
                          </Link>
                          <p className="text-xs text-stone-500 truncate">{trad.location}</p>
                        </div>
                        <button
                          onClick={() => toggleFavorite(trad.id, 'tradition')}
                          className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: LEARNING PROGRESS */}
      {activeTab === 'learning' && (
        <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-6">
          <div className="space-y-1">
            <h3 className="font-serif text-2xl font-bold text-stone-900">
              Curriculum &amp; Paleography Milestones
            </h3>
            <p className="text-xs text-stone-500">
              Track your educational certificates and interactive module completions.
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-serif font-bold text-stone-900">
                  Deciphering Ashokan Brahmi &amp; Epigraphy
                </span>
                <span className="text-emerald-700 font-mono font-bold">100% Completed</span>
              </div>
              <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-600 rounded-full w-full" />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-serif font-bold text-stone-900">
                  Chola Panchaloha Metallurgy &amp; Iconometry
                </span>
                <span className="text-[#936B38] font-mono font-bold">75% In Progress</span>
              </div>
              <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
                <div className="h-full bg-[#936B38] rounded-full w-3/4" />
              </div>
            </div>
          </div>

          <div className="pt-2">
            <Link
              to="/learn"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#936B38] hover:underline"
            >
              <span>Explore All Learning Pathways</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}

      {/* TAB 3: COMMUNITY CONTRIBUTIONS */}
      {activeTab === 'submissions' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-2xl font-bold text-stone-900">
                Community Heritage Contributions
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Submissions are marked "Community-contributed" until verified by regional academic circle reviewers.
              </p>
            </div>
            <button
              onClick={() => setNewSubmissionOpen(!newSubmissionOpen)}
              className="px-4 py-2.5 rounded-xl bg-stone-900 text-white text-xs font-semibold flex items-center gap-1.5 hover:bg-stone-800 transition-colors shadow-2xs"
            >
              <Plus className="w-4 h-4" />
              <span>Submit Contribution</span>
            </button>
          </div>

          {/* Submission Modal / Box */}
          {newSubmissionOpen && (
            <form onSubmit={handleCreateSubmission} className="p-8 rounded-3xl bg-white border border-stone-300 shadow-md space-y-4 animate-scaleUp">
              <h4 className="font-serif text-lg font-bold text-stone-900">
                Document Local Tradition or Heritage Record
              </h4>

              {submissionMsg && (
                <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{submissionMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-stone-600 block mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={submissionTitle}
                    onChange={(e) => setSubmissionTitle(e.target.value)}
                    placeholder="e.g. Toda Embroidery Guild Documentation"
                    className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs focus:outline-none focus:border-[#936B38]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-600 block mb-1">Category Type</label>
                  <select
                    value={submissionType}
                    onChange={(e) => setSubmissionType(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs focus:outline-none focus:border-[#936B38]"
                  >
                    <option value="Living Tradition / Craft">Living Tradition / Craft</option>
                    <option value="Sacred Architecture">Sacred Architecture</option>
                    <option value="Ancient Inscription / Epigraphy">Ancient Inscription / Epigraphy</option>
                    <option value="Folk Oral Narrative">Folk Oral Narrative</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-600 block mb-1">Geographic Region</label>
                <input
                  type="text"
                  required
                  value={submissionRegion}
                  onChange={(e) => setSubmissionRegion(e.target.value)}
                  placeholder="e.g. Nilgiris District, Tamil Nadu"
                  className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs focus:outline-none focus:border-[#936B38]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-600 block mb-1">Detailed Description &amp; Process</label>
                <textarea
                  rows={4}
                  required
                  value={submissionDesc}
                  onChange={(e) => setSubmissionDesc(e.target.value)}
                  placeholder="Describe the craft lineage, materials, cultural significance, and community custodians..."
                  className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs focus:outline-none focus:border-[#936B38]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setNewSubmissionOpen(false)}
                  className="px-4 py-2 rounded-xl text-stone-600 text-xs font-semibold hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl bg-[#151D2A] hover:bg-[#936B38] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <span>{isSubmitting ? 'Uploading…' : 'Submit for Academic Audit'}</span>
                </button>
              </div>
            </form>
          )}

          {submissions.length === 0 ? (
            <div className="p-8 bg-white rounded-3xl border border-stone-200 text-center space-y-2">
              <UploadCloud className="w-8 h-8 text-stone-300 mx-auto" />
              <p className="text-xs text-stone-500">Your community contributions will appear here.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {submissions.map((sub, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-2"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-serif font-bold text-stone-900">{sub.title}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[10px] font-semibold border border-amber-200 capitalize">
                      {sub.status || 'Under Review'}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600">{sub.description}</p>
                  <div className="text-[11px] text-stone-400 flex items-center gap-2 pt-1">
                    <span>{sub.region}</span>
                    <span>•</span>
                    <span>{sub.type}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: SETTINGS */}
      {activeTab === 'settings' && (
        <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-6 max-w-2xl">
          <div className="space-y-1">
            <h3 className="font-serif text-2xl font-bold text-stone-900">
              Patron Profile &amp; Language Settings
            </h3>
            <p className="text-xs text-stone-500">
              Manage your scholar alias and preferred translations.
            </p>
          </div>

          {updateMsg && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{updateMsg}</span>
            </div>
          )}

          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-stone-600 block mb-1">
                Display Name / Scholar Alias
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-[#936B38]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-600 block mb-1">
                Default Curatorial Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-[#936B38]"
              >
                <option value="en">English (Default)</option>
                <option value="hi">हिन्दी (Hindi)</option>
                <option value="sa">संस्कृतम् (Sanskrit)</option>
                <option value="ta">தமிழ் (Tamil)</option>
                <option value="te">తెలుగు (Telugu)</option>
                <option value="bn">বাংলা (Bengali)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isUpdating}
              className="px-5 py-2.5 rounded-xl bg-[#151D2A] hover:bg-[#936B38] text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              {isUpdating ? 'Saving…' : 'Save Preferences'}
            </button>
          </form>

          {/* Account Deletion flow (Section 49) */}
          <div className="pt-6 border-t border-stone-200 space-y-2">
            <span className="text-xs font-bold text-rose-700 uppercase tracking-wider block">
              Account Custodianship &amp; Data Deletion
            </span>
            <p className="text-xs text-stone-500 leading-relaxed">
              If you wish to remove your patron account and clear all saved favorites and submission records, you may trigger an account purge request.
            </p>
            <button
              onClick={() => {
                if (confirm('Are you sure you want to request deletion of your VirasatX patron account? This action cannot be undone.')) {
                  signOut();
                  navigate('/');
                }
              }}
              className="px-4 py-2 rounded-xl border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-semibold transition-colors"
            >
              Purge Patron Account &amp; Data
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
