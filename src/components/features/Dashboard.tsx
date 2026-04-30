import { ViewType } from "../../types";
import { MOCK_PROJECTS } from "../../lib/mockData";
import { ArrowRight, ShieldCheck, Rocket, Palette, Sparkles, TrendingUp, Zap } from "lucide-react";
import { motion } from "framer-motion";

interface DashboardProps {
  setView: (view: ViewType) => void;
}

const Dashboard = ({ setView }: DashboardProps) => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-red-950/40 via-black to-blue-950/40 p-8 md:p-20 border border-white/5">
        <div className="relative z-10 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-red-500/15 px-4 py-1.5 text-xs font-bold text-red-400 ring-1 ring-inset ring-red-500/30 uppercase tracking-widest">
              <Zap className="h-3.5 w-3.5 fill-red-400" />
              Agora protocol v2.0
            </span>
            <h1 className="mb-6 text-5xl font-black leading-tight text-white md:text-7xl italic">
              AI Driven <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-blue-500 to-red-500 animate-gradient">Digital Assets</span>
            </h1>
            <p className="mb-10 text-xl text-slate-400 leading-relaxed">
              The world's first decentralized equity platform with automated neural audits. We verify every creator so you can invest with confidence.
            </p>
            <div className="flex flex-wrap gap-5">
              <button 
                onClick={() => setView("launchpad")}
                className="flex items-center gap-3 rounded-2xl bg-red-600 px-8 py-4 font-black text-white transition-all hover:bg-red-500 hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_30px_-5px_rgba(239,68,68,0.5)] uppercase tracking-widest text-xs"
              >
                Explore Launchpad
                <ArrowRight className="h-5 w-5" />
              </button>
              <button 
                onClick={() => setView("moderator")}
                className="flex items-center gap-3 rounded-2xl bg-blue-600/20 px-8 py-4 font-black text-white transition-all hover:bg-blue-600/30 hover:scale-[1.02] active:scale-[0.98] border border-blue-500/30 backdrop-blur-md uppercase tracking-widest text-xs"
              >
                Run AI Audit
                <ShieldCheck className="h-5 w-5 text-blue-400" />
              </button>
            </div>
          </motion.div>
        </div>
        
        {/* Abstract Shapes */}
        <div className="absolute -right-20 -top-20 h-[30rem] w-[30rem] rounded-full bg-red-600/10 blur-[120px]" />
        <div className="absolute -bottom-40 -left-20 h-[30rem] w-[30rem] rounded-full bg-blue-600/10 blur-[100px]" />
      </section>

      {/* Stats Counter */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: "Total Raised", value: "$12.5M+", color: "text-red-500" },
          { label: "Verified Assets", value: "850+", color: "text-blue-500" },
          { label: "Active Investors", value: "25k+", color: "text-red-500" },
          { label: "Scams Blocked", value: "1.2k", color: "text-blue-500" }
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + (i * 0.1) }}
            className="text-center p-6 rounded-3xl bg-slate-900/20 border border-white/5"
          >
            <div className={`text-3xl font-black mb-1 ${stat.color}`}>{stat.value}</div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</div>
          </motion.div>
        ))}
      </section>

      {/* Feature Cards */}
      <section className="grid gap-8 md:grid-cols-3">
        {[
          { 
            title: "Equity Launchpad", 
            desc: "Tokenize company equity into compliant NFTs with automated profit distribution.",
            icon: Rocket,
            color: "from-red-600 to-red-400",
            bg: "bg-red-500/10",
            view: "launchpad"
          },
          { 
            title: "Generative Studio", 
            desc: "Create AI art and looping visuals up to 10s. One-click minting included.",
            icon: Palette,
            color: "from-blue-600 to-blue-400",
            bg: "bg-blue-500/10",
            view: "studio"
          },
          { 
            title: "Security Sentinel", 
            desc: "Our proprietary AI monitors project credibility, social growth, and code security.",
            icon: ShieldCheck,
            color: "from-red-600 to-blue-600",
            bg: "bg-purple-500/10",
            view: "moderator"
          }
        ].map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 * i }}
            onClick={() => setView(item.view as ViewType)}
            className="group cursor-pointer rounded-[2rem] border border-white/5 bg-slate-900/20 p-10 transition-all hover:border-red-500/30 hover:bg-slate-900/40 hover:-translate-y-2"
          >
            <div className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${item.color} shadow-lg shadow-black/20`}>
              <item.icon className="h-8 w-8 text-white" />
            </div>
            <h3 className="mb-3 text-2xl font-black text-white">{item.title}</h3>
            <p className="text-slate-400 leading-relaxed text-sm">{item.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Trending Projects */}
      <section>
        <div className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-red-500/15">
              <TrendingUp className="h-6 w-6 text-red-400" />
            </div>
            <h2 className="text-3xl font-black text-white tracking-tight italic">Hottest Assets</h2>
          </div>
          <button onClick={() => setView("marketplace")} className="group flex items-center gap-2 text-sm font-black text-red-500 uppercase tracking-widest">
            View All
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {MOCK_PROJECTS.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i }}
              className="group overflow-hidden rounded-[2rem] border border-white/5 bg-slate-900/20 transition-all hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/10"
            >
              <div className="aspect-[16/10] relative overflow-hidden">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute right-4 top-4 rounded-xl bg-black/80 px-3 py-1.5 text-[10px] font-black backdrop-blur-md text-white border border-white/10 uppercase tracking-widest">
                  {project.type}
                </div>
              </div>
              <div className="p-8">
                <div className="mb-4 flex items-center justify-between">
                  <h4 className="text-xl font-black text-white">{project.title}</h4>
                  <div className="flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-black text-blue-400 ring-1 ring-inset ring-blue-500/20">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    {project.credibilityScore}%
                  </div>
                </div>
                <p className="mb-6 line-clamp-2 text-slate-400 text-sm leading-relaxed font-medium">{project.description}</p>
                <div className="flex items-center justify-between border-t border-white/5 pt-6">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-slate-800 border border-white/10" />
                    <span className="text-xs font-bold text-slate-500">{project.creator}</span>
                  </div>
                  <button className="text-xs font-black text-red-500 hover:text-red-400 uppercase tracking-widest">Invest Now</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;