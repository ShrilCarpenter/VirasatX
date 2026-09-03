import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

export interface UserProfile {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  preferred_language: string;
  created_at?: string;
  updated_at?: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  loading: boolean;
  isConfigured: boolean;
  favorites: string[];
  isFavorite: (itemId: string) => boolean;
  toggleFavorite: (itemId: string, itemType?: string) => Promise<{ added: boolean; requiresAuth?: boolean }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_FAVORITES_KEY = 'virasatx_guest_favorites';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Load initial session
  useEffect(() => {
    if (!isSupabaseConfigured) {
      // Load guest favorites from localStorage
      try {
        const stored = localStorage.getItem(LOCAL_FAVORITES_KEY);
        if (stored) setFavorites(JSON.parse(stored));
      } catch (e) {
        console.error('Error reading guest favorites', e);
      }
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
        fetchFavorites(session.user.id);
      } else {
        // Load guest favorites
        try {
          const stored = localStorage.getItem(LOCAL_FAVORITES_KEY);
          if (stored) setFavorites(JSON.parse(stored));
        } catch {}
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
        fetchFavorites(session.user.id);
      } else {
        setProfile(null);
        try {
          const stored = localStorage.getItem(LOCAL_FAVORITES_KEY);
          if (stored) setFavorites(JSON.parse(stored));
          else setFavorites([]);
        } catch {
          setFavorites([]);
        }
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (!error && data) {
        setProfile(data as UserProfile);
      } else if (error && error.code === 'PGRST116') {
        // Profile row doesn't exist yet, create it
        const newProfile: UserProfile = {
          id: userId,
          display_name: user?.user_metadata?.display_name || user?.email?.split('@')[0] || 'Patron',
          avatar_url: null,
          preferred_language: 'en',
        };
        await supabase.from('profiles').insert([newProfile]);
        setProfile(newProfile);
      }
    } catch (e) {
      console.warn('Could not fetch Supabase profile:', e);
    } finally {
      setLoading(false);
    }
  };

  const fetchFavorites = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('heritage_item_id')
        .eq('user_id', userId);

      if (!error && data) {
        setFavorites(data.map((row: any) => row.heritage_item_id));
      }
    } catch (e) {
      console.warn('Could not fetch favorites from Supabase:', e);
    }
  };

  const refreshProfile = async () => {
    if (user) await fetchProfile(user.id);
  };

  const isFavorite = (itemId: string) => {
    return favorites.includes(itemId);
  };

  const toggleFavorite = async (itemId: string, itemType = 'artifact'): Promise<{ added: boolean; requiresAuth?: boolean }> => {
    // If not logged in, inform user that account is needed for persistent saving
    if (!user) {
      setAuthModalOpen(true);
      return { added: false, requiresAuth: true };
    }

    const currentlyFav = favorites.includes(itemId);

    if (currentlyFav) {
      // Remove
      setFavorites(prev => prev.filter(id => id !== itemId));
      if (isSupabaseConfigured) {
        await supabase
          .from('favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('heritage_item_id', itemId);
      }
      return { added: false };
    } else {
      // Add
      setFavorites(prev => [...prev, itemId]);
      if (isSupabaseConfigured) {
        await supabase
          .from('favorites')
          .insert([{
            user_id: user.id,
            heritage_item_id: itemId,
            heritage_item_type: itemType,
          }]);
      }
      return { added: true };
    }
  };

  const signOut = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setSession(null);
    setProfile(null);
    setFavorites([]);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        loading,
        isConfigured: isSupabaseConfigured,
        favorites,
        isFavorite,
        toggleFavorite,
        signOut,
        refreshProfile,
        authModalOpen,
        setAuthModalOpen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
