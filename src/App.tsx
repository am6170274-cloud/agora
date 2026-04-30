import { useState, useEffect } from "react";
import { Toaster } from "sonner";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./components/features/Dashboard";
import AIModerator from "./components/features/AIModerator";
import Launchpad from "./components/features/Launchpad";
import Marketplace from "./components/features/Marketplace";
import Wallet from "./components/features/Wallet";
import Studio from "./components/features/Studio";
import Auth from "./components/auth/Auth";
import { ViewType, UserProfile } from "./types";
import { supabase } from "./lib/supabase";
import { Session } from "@supabase/supabase-js";

function App() {
  const [currentView, setCurrentView] = useState<ViewType>("dashboard");
  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set document title to Agora
    document.title = "Agora | AI-Powered Digital Assets";
    
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session?.user) {
      // In a real app, fetch profile from DB
      setUserProfile({
        id: session.user.id,
        username: session.user.user_metadata.username || "User",
        balance: 5.25,
        wallet_address: "0x" + session.user.id.slice(0, 38)
      });
    } else {
      setUserProfile(null);
    }
  }, [session]);

  const renderView = () => {
    if (!session) return <Auth />;

    switch (currentView) {
      case "dashboard": return <Dashboard setView={setCurrentView} />;
      case "moderator": return <AIModerator />;
      case "launchpad": return <Launchpad />;
      case "marketplace": return <Marketplace />;
      case "wallet": return <Wallet userProfile={userProfile} setUserProfile={setUserProfile} />;
      case "studio": return <Studio />;
      case "profile": return <div className="p-8 text-center font-black uppercase text-slate-500">Profile Section Coming Soon</div>;
      default: return <Dashboard setView={setCurrentView} />;
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-black">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-red-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-slate-50 selection:bg-red-500/30 font-sans">
      <Navbar 
        currentView={currentView} 
        setView={setCurrentView} 
        session={session} 
        userProfile={userProfile}
      />
      <main className="container mx-auto px-4 py-8">
        {renderView()}
      </main>
      <Toaster position="top-center" richColors theme="dark" />
    </div>
  );
}

export default App;