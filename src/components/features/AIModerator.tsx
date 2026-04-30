import { useState, useEffect } from "react";
import { ShieldCheck, Search, Activity, UserCheck, AlertTriangle, FileCheck, BrainCircuit, History, ArrowRight, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AuditReport } from "../../types";
import { toast } from "sonner";

const AIModerator = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [projectUrl, setProjectUrl] = useState("");
  const [reports, setReports] = useState<AuditReport[]>([]);

  useEffect(() => {
    // Initialize with some reports
    setReports([
      { id: "1", projectName: "DeFi Protocol X", score: 94, status: "Safe", timestamp: "2h ago" },
      { id: "2", projectName: "Mars NFT Club", score: 12, status: "High Risk", timestamp: "5h ago" },
      { id: "3", projectName: "Green Energy DAO", score: 88, status: "Safe", timestamp: "1d ago" },
    ]);
  }, []);

  const handleAnalyze = () => {
    if (!projectUrl) return;
    setAnalyzing(true);
    
    // Simulate AI Audit
    setTimeout(() => {
      const score = Math.floor(Math.random() * 100);
      const status = score > 80 ? "Safe" : score > 40 ? "Caution" : "High Risk";
      
      const newReport: AuditReport = {
        id: Date.now().toString(),
        projectName: projectUrl.split('/').pop() || projectUrl,
        score,
        status,
        timestamp: "Just now"
      };

      setReports([newReport, ...reports]);
      setAnalyzing(false);
      setProjectUrl("");
      
      if (status === "Safe") {
        toast.success("Project audit completed: Low risk detected.");
      } else if (status === "Caution") {
        toast.warning("Project audit completed: Minor vulnerabilities found.");
      } else {
        toast.error("CRITICAL: High risk vulnerabilities detected!");
      }
    }, 4000);
  };

  return (
    <div className="mx-auto max-w-6xl space-y-12">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-block mb-6"
        >
          <div className="flex items-center gap-3 rounded-2xl bg-indigo-500/10 px-6 py-2 ring-1 ring-indigo-500/30">
            <BrainCircuit className="h-5 w-5 text-indigo-400" />
            <span className="text-xs font-black uppercase tracking-[0.2em] text-indigo-300">Deep Neural Analysis v4.2</span>
          </div>
        </motion.div>
        <h1 className="mb-6 text-4xl font-black text-white md:text-6xl tracking-tight">AI Security <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Sentinel</span></h1>
        <p className="mx-auto max-w-2xl text-lg text-slate-400 font-medium">
          Protect your capital with our multi-layered AI audit system. We scan contracts, social footprints, and whitepaper logic in milliseconds.
        </p>
      </div>

      <div className="relative rounded-[2.5rem] border border-white/5 bg-slate-900/60 p-8 backdrop-blur-xl md:p-12 shadow-2xl ring-1 ring-white/10">
        <div className="mb-10 flex flex-col gap-5 md:flex-row">
          <div className="relative flex-1 group">
            <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
            <input 
              type="text" 
              placeholder="Paste project URL, Github repo, or Contract address..."
              className="w-full rounded-2xl border border-white/5 bg-slate-800/40 py-5 pl-14 pr-6 text-white font-medium placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
              value={projectUrl}
              onChange={(e) => setProjectUrl(e.target.value)}
            />
          </div>
          <button 
            onClick={handleAnalyze}
            disabled={analyzing || !projectUrl}
            className="rounded-2xl bg-indigo-600 px-10 py-5 font-black text-white transition-all hover:bg-indigo-500 hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] disabled:opacity-50 active:scale-95"
          >
            {analyzing ? "Auditing..." : "Initialize Scan"}
          </button>
        </div>

        <AnimatePresence mode="wait">
          {analyzing ? (
            <motion.div 
              key="analyzing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="relative">
                <BrainCircuit className="h-24 w-24 animate-pulse text-indigo-400" />
                <div className="absolute inset-0 h-24 w-24 animate-ping rounded-full bg-indigo-500/20" />
              </div>
              <p className="mt-8 font-mono text-indigo-300 text-lg uppercase tracking-widest animate-pulse font-bold">
                Vectorizing Smart Contracts...
              </p>
              <div className="mt-6 w-full max-w-md h-1.5 rounded-full bg-slate-800 overflow-hidden">
                <motion.div 
                  className="h-full bg-indigo-500"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 4, ease: "linear" }}
                />
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="features"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
            >
              {[
                { icon: Activity, label: "Liquidity Analysis", desc: "Vets market depth & wash trade patterns.", color: "text-cyan-400", bg: "bg-cyan-400/10" },
                { icon: UserCheck, label: "Social Proofing", desc: "Cross-chain KYC & reputation tracking.", color: "text-green-400", bg: "bg-green-400/10" },
                { icon: ShieldAlert, label: "Vulnerability Scan", desc: "Real-time re-entrancy & rug detection.", color: "text-orange-400", bg: "bg-orange-400/10" },
                { icon: FileCheck, label: "Contract Logic", desc: "NLP based whitepaper & goal audit.", color: "text-indigo-400", bg: "bg-indigo-400/10" },
              ].map((item, i) => (
                <div key={i} className="group rounded-3xl bg-slate-800/30 p-8 ring-1 ring-white/5 hover:bg-slate-800/50 transition-all">
                  <div className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${item.bg}`}>
                    <item.icon className={`h-7 w-7 ${item.color}`} />
                  </div>
                  <h4 className="mb-2 text-lg font-black text-white">{item.label}</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="overflow-hidden rounded-[2rem] border border-white/5 bg-slate-900/40 p-1">
          <div className="flex items-center justify-between border-b border-white/5 bg-white/5 p-6">
            <div className="flex items-center gap-2 font-black text-white uppercase tracking-widest">
              <History className="h-5 w-5 text-indigo-400" />
              Recent Audit Logs
            </div>
            <button className="text-xs font-bold text-slate-500 hover:text-white transition-colors">View Archive</button>
          </div>
          <div className="divide-y divide-white/5">
            {reports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-6 hover:bg-white/5 transition-colors">
                <div>
                  <div className="font-bold text-slate-200">{report.projectName}</div>
                  <div className="text-[10px] font-black text-slate-600 uppercase tracking-widest mt-1">{report.timestamp}</div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex flex-col items-end">
                    <span className={`text-sm font-black ${report.status === 'Safe' ? 'text-green-400' : report.status === 'Caution' ? 'text-orange-400' : 'text-red-500'}`}>
                      {report.status}
                    </span>
                    <div className="mt-1 h-1.5 w-24 overflow-hidden rounded-full bg-slate-800">
                      <div 
                        className={`h-full ${report.status === 'Safe' ? 'bg-green-500' : report.status === 'Caution' ? 'bg-orange-400' : 'bg-red-500'}`} 
                        style={{ width: `${report.score}%` }} 
                      />
                    </div>
                  </div>
                  <button className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors">
                    <ArrowRight className="h-4 w-4 text-slate-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-white/5 bg-slate-900/40 p-10">
          <img 
            src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/47c34b1c-4f1b-4934-8387-c67ed9de7dcc/ai-moderator-bg-f9317a7a-1777545108904.webp" 
            className="absolute inset-0 -z-10 h-full w-full object-cover opacity-15 grayscale"
            alt="AI Security"
          />
          <div className="relative z-10">
            <h3 className="mb-6 text-3xl font-black text-white tracking-tight">Why Trust Sentinel?</h3>
            <p className="mb-8 text-lg text-slate-400 leading-relaxed font-medium">
              Traditional platforms rely on manual reviews that take weeks and miss subtle exploits. Our Sentinel AI analyzes 50,000+ data points per project in real-time.
            </p>
            <ul className="space-y-4 mb-10">
              {["Continuous 24/7 contract monitoring", "Machine learning bias elimination", "Social engineering detection", "Zero-knowledge proof validation"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-slate-200 font-bold">
                  <div className="h-6 w-6 rounded-full bg-indigo-500/20 flex items-center justify-center">
                    <ShieldCheck className="h-4 w-4 text-indigo-400" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            <button className="w-full rounded-2xl bg-white/5 py-4 font-black text-white ring-1 ring-white/10 hover:bg-white/10 transition-all">
              Read Security Whitepaper
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIModerator;