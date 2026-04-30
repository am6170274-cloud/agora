import { Rocket, DollarSign, Users, Briefcase, Percent, CheckCircle2, TrendingUp, ShieldCheck, ArrowUpRight } from "lucide-react";
import { MOCK_PROJECTS } from "../../lib/mockData";
import { toast } from "sonner";
import { motion } from "framer-motion";

const Launchpad = () => {
  const startups = MOCK_PROJECTS.filter(p => p.type === "startup");

  const handleInvest = (title: string) => {
    toast.success(`Investment protocol initiated for ${title}. Smart contract pending verification.`);
  };

  return (
    <div className="space-y-16 max-w-7xl mx-auto">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full bg-orange-500/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-orange-400 ring-1 ring-inset ring-orange-500/30 mb-6"
          >
            <Rocket className="h-3.5 w-3.5" />
            Equity Launchpad v1.0
          </motion.div>
          <h1 className="text-4xl font-black text-white md:text-6xl tracking-tight leading-tight">Invest in the <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Next Generation</span></h1>
          <p className="mt-6 text-xl text-slate-400 font-medium leading-relaxed">Own pieces of groundbreaking startups through secure equity NFTs. Real value, real growth, verified by AI.</p>
        </div>
        <button className="group flex items-center gap-3 rounded-2xl bg-white px-8 py-5 font-black text-slate-950 transition-all hover:bg-slate-200 hover:scale-105 active:scale-95 shadow-xl shadow-white/10">
          List My Company
          <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </button>
      </div>

      <div className="grid gap-12 lg:grid-cols-2">
        {startups.map((startup, i) => (
          <motion.div 
            key={startup.id} 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className="group relative overflow-hidden rounded-[3rem] border border-white/5 bg-slate-900/40 transition-all hover:border-indigo-500/30 hover:bg-slate-900/60 shadow-2xl ring-1 ring-white/10"
          >
            <div className="relative h-80 overflow-hidden">
              <img src={startup.imageUrl} className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={startup.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-10 left-10 right-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="rounded-xl bg-indigo-600 px-4 py-1.5 text-xs font-black text-white uppercase tracking-widest">Tier 1 Startup</span>
                  <div className="flex items-center gap-2 rounded-xl bg-green-500/20 px-4 py-1.5 text-xs font-black text-green-400 backdrop-blur-md ring-1 ring-green-500/30 uppercase tracking-widest">
                    <ShieldCheck className="h-4 w-4" />
                    AI Approved
                  </div>
                </div>
                <h2 className="text-4xl font-black text-white tracking-tight">{startup.title}</h2>
              </div>
            </div>

            <div className="p-10">
              <p className="mb-10 text-lg text-slate-400 leading-relaxed font-medium">{startup.description}</p>
              
              <div className="mb-10 grid grid-cols-2 gap-6">
                <div className="rounded-[2rem] bg-white/5 p-6 ring-1 ring-white/5">
                  <div className="mb-3 flex items-center gap-2 text-slate-500">
                    <Percent className="h-4 w-4" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Equity Offered</span>
                  </div>
                  <div className="text-3xl font-black text-white">{startup.equity}%</div>
                </div>
                <div className="rounded-[2rem] bg-white/5 p-6 ring-1 ring-white/5">
                  <div className="mb-3 flex items-center gap-2 text-slate-500">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Funds Raised</span>
                  </div>
                  <div className="text-3xl font-black text-white">${(startup.raised || 0).toLocaleString()}</div>
                </div>
              </div>

              <div className="space-y-5">
                <div className="flex justify-between text-sm font-black uppercase tracking-widest">
                  <span className="text-slate-500">Goal: ${(startup.goal || 0).toLocaleString()}</span>
                  <span className="text-indigo-400">{Math.round((startup.raised || 0) / (startup.goal || 1) * 100)}%</span>
                </div>
                <div className="h-4 overflow-hidden rounded-full bg-slate-800 ring-4 ring-slate-900">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(startup.raised || 0) / (startup.goal || 1) * 100}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-indigo-600 via-cyan-500 to-indigo-600 animate-gradient"
                  />
                </div>
              </div>

              <div className="mt-12 flex gap-5">
                <button 
                  onClick={() => handleInvest(startup.title)}
                  className="flex-1 rounded-[1.5rem] bg-indigo-600 py-5 font-black text-white transition-all hover:bg-indigo-500 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-indigo-600/30"
                >
                  Acquire Equity
                </button>
                <button className="flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-slate-800 text-slate-300 transition-all hover:bg-slate-700 hover:text-white">
                  <Briefcase className="h-7 w-7" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center rounded-[3rem] border-2 border-dashed border-white/5 bg-slate-900/20 p-16 text-center ring-1 ring-white/5"
        >
          <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-slate-800/50 shadow-2xl ring-1 ring-white/10">
            <Users className="h-12 w-12 text-slate-500" />
          </div>
          <h3 className="mb-4 text-3xl font-black text-white tracking-tight">Ready to scale?</h3>
          <p className="mx-auto mb-10 max-w-sm text-lg text-slate-500 font-medium">
            Join the elite circle of founders who choose transparency and security.
          </p>
          <button className="rounded-2xl bg-white/5 px-10 py-4 font-black text-white ring-1 ring-white/20 transition-all hover:bg-white/10 hover:scale-105 uppercase tracking-widest text-xs">
            Launchpad Application
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Launchpad;