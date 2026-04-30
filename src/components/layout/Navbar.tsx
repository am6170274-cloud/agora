import { ViewType, UserProfile } from "../../types";
import { Rocket, ShieldCheck, Palette, ShoppingBag, Wallet as WalletIcon, LayoutDashboard, LogOut, User, Bell, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "../../lib/supabase";
import { Session } from "@supabase/supabase-js";
import { useState } from "react";

interface NavbarProps {
  currentView: ViewType;
  setView: (view: ViewType) => void;
  session: Session | null;
  userProfile: UserProfile | null;
}

const Navbar = ({ currentView, setView, session, userProfile }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "moderator", label: "Security", icon: ShieldCheck },
    { id: "launchpad", label: "Launchpad", icon: Rocket },
    { id: "marketplace", label: "Market", icon: ShoppingBag },
    { id: "studio", label: "Studio", icon: Palette },
    { id: "wallet", label: "Vault", icon: WalletIcon },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleNavClick = (view: ViewType) => {
    setView(view);
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-white/5 bg-black/80 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <div 
            className="flex cursor-pointer items-center gap-3"
            onClick={() => handleNavClick("dashboard")}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600 shadow-lg shadow-red-600/20">
              <ShieldCheck className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-black tracking-tighter text-white uppercase italic">Agora</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1.5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id as ViewType)}
                className={cn(
                  "flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-black uppercase tracking-widest transition-all",
                  currentView === item.id
                    ? "bg-red-600/10 text-red-500 border border-red-600/20"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {session ? (
              <div className="flex items-center gap-3">
                <button className="relative h-10 w-10 flex items-center justify-center rounded-xl bg-white/5 text-slate-400 hover:text-white transition-colors">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-red-500 border-2 border-black" />
                </button>
                
                <div className="hidden sm:block h-10 w-px bg-white/5" />

                <div className="flex items-center gap-3 pl-2">
                  <div className="hidden lg:block text-right">
                    <div className="text-xs font-black text-white tracking-tight uppercase">{userProfile?.username}</div>
                    <div className="text-[10px] font-bold text-blue-400">{userProfile?.balance.toFixed(2)} ETH</div>
                  </div>
                  <div className="group relative">
                    <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/20 ring-1 ring-blue-500/30 overflow-hidden">
                      {userProfile?.avatar_url ? (
                        <img src={userProfile.avatar_url} alt="Avatar" className="h-full w-full object-cover" />
                      ) : (
                        <User className="h-5 w-5 text-blue-400" />
                      )}
                    </button>
                    
                    <div className="absolute right-0 top-full mt-2 w-48 origin-top-right scale-0 rounded-2xl border border-white/5 bg-slate-900 p-2 shadow-2xl transition-all group-hover:scale-100">
                      <button 
                        onClick={() => handleNavClick("profile")}
                        className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-xs font-black text-slate-400 hover:bg-white/5 hover:text-white transition-all uppercase tracking-widest"
                      >
                        <User className="h-4 w-4" />
                        Profile
                      </button>
                      <button 
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-xs font-black text-red-400 hover:bg-red-400/10 transition-all uppercase tracking-widest"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <button 
                onClick={() => handleNavClick("dashboard")}
                className="rounded-xl bg-red-600 px-6 py-2.5 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-red-500 shadow-lg shadow-red-600/20"
              >
                Login
              </button>
            )}

            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMenu}
              className="lg:hidden h-10 w-10 flex items-center justify-center rounded-xl bg-white/5 text-slate-400"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-white/5 bg-black/95 backdrop-blur-2xl p-4 animate-in slide-in-from-top duration-300">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id as ViewType)}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-4 text-xs font-black uppercase tracking-widest transition-all",
                  currentView === item.id
                    ? "bg-red-600 text-white shadow-lg shadow-red-600/20"
                    : "bg-white/5 text-slate-400 hover:bg-white/10"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;