import { useState, useEffect } from "react";
import { Wallet as WalletIcon, Plus, Copy, RefreshCw, LogOut, ArrowUpRight, ArrowDownLeft, ShieldCheck, History, CreditCard, PieChart } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { UserProfile } from "../../types";
import { cn } from "../../lib/utils";

interface WalletProps {
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile | null) => void;
}

const Wallet = ({ userProfile, setUserProfile }: WalletProps) => {
  const [loading, setLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const generateWallet = () => {
    if (!userProfile) return;
    setLoading(true);
    setTimeout(() => {
      const updatedProfile = {
        ...userProfile,
        wallet_address: "0x" + Array.from({length: 40}, () => Math.floor(Math.random() * 16).toString(16)).join("")
      };
      setUserProfile(updatedProfile);
      setLoading(false);
      toast.success("MPC Native wallet created and secured with AI!");
    }, 2500);
  };

  const syncWallet = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      toast.success("Wallet synced across all chains.");
    }, 2000);
  };

  const copyAddress = () => {
    if (userProfile?.wallet_address) {
      navigator.clipboard.writeText(userProfile.wallet_address);
      toast.success("Address copied to clipboard");
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-10">
      <div className="text-center">
        <h1 className="text-4xl font-black text-white md:text-5xl tracking-tight">Native <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Vault</span></h1>
        <p className="mt-4 text-lg text-slate-400 font-medium">Secure your digital equity and art assets with institutional-grade security.</p>
      </div>

      {!userProfile?.wallet_address ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center rounded-[3rem] border border-white/5 bg-slate-900/40 p-16 text-center ring-1 ring-white/10 shadow-2xl backdrop-blur-xl"
        >
          <div className="mb-10 rounded-[2rem] bg-indigo-600/10 p-8 ring-1 ring-indigo-500/30">
            <WalletIcon className="h-16 w-16 text-indigo-400" />
          </div>
          <h2 className="mb-4 text-3xl font-black text-white">Non-Custodial Freedom</h2>
          <p className="mb-12 max-w-sm text-lg text-slate-500 font-medium">
            Create a secure, non-custodial wallet integrated with our AI behavioral analysis to safely store your assets.
          </p>
          <button 
            onClick={generateWallet}
            disabled={loading}
            className="group relative flex items-center gap-4 rounded-2xl bg-indigo-600 px-12 py-5 font-black text-white transition-all hover:bg-indigo-500 disabled:opacity-50 active:scale-95 shadow-xl shadow-indigo-600/20"
          >
            {loading ? (
              <>
                <RefreshCw className="h-6 w-6 animate-spin" />
                Initializing MPC...
              </>
            ) : (
              <>
                <Plus className="h-6 w-6" />
                Provision Native Wallet
              </>
            )}
          </button>
          <p className="mt-8 text-xs font-black text-slate-600 flex items-center gap-2 uppercase tracking-widest">
            <ShieldCheck className="h-4 w-4 text-green-500" />
            Multi-Party Computation (MPC) Active
          </p>
        </motion.div>
      ) : (
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7 space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-indigo-600 via-indigo-700 to-blue-800 p-10 text-white shadow-2xl ring-1 ring-white/20"
            >
              <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
              <div className="relative z-10">
                <div className="mb-16 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="rounded-xl bg-white/20 p-3 backdrop-blur-md">
                      <ShieldCheck className="h-7 w-7 text-white" />
                    </div>
                    <span className="text-xl font-black tracking-tighter">TRUSTMINT VAULT</span>
                  </div>
                  <button onClick={syncWallet} className="rounded-xl bg-white/10 p-3 hover:bg-white/20 transition-all">
                    <RefreshCw className={cn("h-6 w-6", isSyncing && "animate-spin")} />
                  </button>
                </div>
                
                <div className="mb-12">
                  <span className="text-xs font-black text-indigo-100/60 uppercase tracking-[0.3em]">Portfolio Value</span>
                  <div className="mt-2 flex items-baseline gap-3">
                    <span className="text-6xl font-black tracking-tighter">{userProfile.balance.toFixed(2)}</span>
                    <span className="text-3xl font-bold opacity-60">ETH</span>
                  </div>
                  <div className="mt-3 text-lg font-bold text-indigo-100/80">\u2248 $12,450.00 USD</div>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-black/30 p-4 backdrop-blur-xl border border-white/10">
                  <span className="font-mono text-xs font-bold opacity-70 tracking-widest">{userProfile.wallet_address.slice(0, 10)}...{userProfile.wallet_address.slice(-10)}</span>
                  <button onClick={copyAddress} className="rounded-xl bg-white/10 p-2.5 hover:bg-white/20 transition-all">
                    <Copy className="h-4.5 w-4.5" />
                  </button>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-6">
              <button className="group flex flex-col items-center justify-center gap-3 rounded-[2rem] bg-slate-900/60 p-10 ring-1 ring-white/5 hover:bg-indigo-600 transition-all">
                <ArrowUpRight className="h-8 w-8 text-indigo-400 group-hover:text-white transition-colors" />
                <span className="font-black text-white uppercase tracking-widest text-xs">Send Assets</span>
              </button>
              <button className="group flex flex-col items-center justify-center gap-3 rounded-[2rem] bg-slate-900/60 p-10 ring-1 ring-white/5 hover:bg-cyan-600 transition-all">
                <ArrowDownLeft className="h-8 w-8 text-cyan-400 group-hover:text-white transition-colors" />
                <span className="font-black text-white uppercase tracking-widest text-xs">Receive</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-8">
            <div className="rounded-[2.5rem] border border-white/5 bg-slate-900/40 p-8 ring-1 ring-white/5">
              <h3 className="mb-6 flex items-center gap-3 text-xl font-black text-white uppercase tracking-tight">
                <PieChart className="h-5 w-5 text-indigo-400" />
                Asset Allocation
              </h3>
              <div className="space-y-6">
                {[
                  { label: "Startup Equity", value: "65%", color: "bg-orange-500" },
                  { label: "Fine Art NFTs", value: "20%", color: "bg-cyan-500" },
                  { label: "Music Rights", value: "15%", color: "bg-purple-500" },
                ].map((asset, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-xs font-black uppercase tracking-widest">
                      <span className="text-slate-500">{asset.label}</span>
                      <span className="text-white">{asset.value}</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-800">
                      <div className={cn("h-full rounded-full", asset.color)} style={{ width: asset.value }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2.5rem] border border-white/5 bg-slate-900/40 p-8 ring-1 ring-white/5">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="flex items-center gap-3 text-xl font-black text-white uppercase tracking-tight">
                  <History className="h-5 w-5 text-indigo-400" />
                  Security Log
                </h3>
                <button className="text-xs font-bold text-slate-600 hover:text-white">Clear</button>
              </div>
              <div className="space-y-5">
                {[
                  { event: "Sync across mainnet", time: "4m ago", icon: RefreshCw },
                  { event: "Behavioral audit", time: "1h ago", icon: ShieldCheck },
                  { event: "Login from New Device", time: "2d ago", icon: CreditCard },
                ].map((log, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-4">
                      <div className="h-8 w-8 rounded-xl bg-white/5 flex items-center justify-center">
                        <log.icon className="h-4 w-4 text-slate-500" />
                      </div>
                      <span className="text-slate-300 font-bold">{log.event}</span>
                    </div>
                    <span className="text-slate-600 font-black uppercase tracking-widest text-[10px]">{log.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallet;