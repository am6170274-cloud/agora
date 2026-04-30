import { useState } from "react";
import { Music, Palette, Play, Heart, Share2, Filter, Search, ShoppingBag, ArrowRight } from "lucide-react";
import { MOCK_PROJECTS } from "../../lib/mockData";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const Marketplace = () => {
  const [activeTab, setActiveTab] = useState<"all" | "music" | "art">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = MOCK_PROJECTS.filter(p => {
    const matchesTab = activeTab === "all" || p.type === activeTab;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.creator.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleBuy = (title: string) => {
    toast.success(`Purchase of ${title} initiated. AI verify in progress.`);
  };

  return (
    <div className="space-y-12 max-w-7xl mx-auto">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-4xl font-black text-white md:text-6xl tracking-tight">Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Bazaar</span></h1>
          <p className="mt-4 text-lg text-slate-400 font-medium">Discover and collect rare assets vetted by the TrustMint protocol.</p>
        </div>
        
        <div className="flex items-center gap-1.5 rounded-[1.25rem] bg-slate-900 p-1.5 ring-1 ring-white/5 backdrop-blur-md shadow-2xl">
          {[
            { id: "all", label: "All Items", icon: Filter },
            { id: "music", label: "Music", icon: Music },
            { id: "art", label: "Fine Art", icon: Palette },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "flex items-center gap-2 whitespace-nowrap rounded-xl px-5 py-2.5 text-xs font-black uppercase tracking-widest transition-all",
                activeTab === tab.id 
                  ? "bg-indigo-600 text-white shadow-xl shadow-indigo-600/20" 
                  : "text-slate-500 hover:text-slate-200"
              )}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
          <input 
            type="text" 
            placeholder="Search titles, creators, or genres..."
            className="w-full rounded-2xl border border-white/5 bg-slate-900/50 py-4.5 pl-14 pr-6 text-white font-medium placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/5 bg-slate-900/50 text-slate-500 hover:text-white hover:bg-slate-800 transition-all">
          <Filter className="h-5 w-5" />
        </button>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((item, i) => (
            <motion.div 
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: i * 0.05 }}
              className="group relative rounded-[2.5rem] border border-white/5 bg-slate-900/40 p-4 transition-all hover:bg-slate-900/60 hover:border-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/10"
            >
              <div className="relative aspect-square overflow-hidden rounded-[2rem]">
                <img 
                  src={item.imageUrl} 
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  alt={item.title} 
                />
                <div className="absolute inset-0 flex items-center justify-center bg-slate-950/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {item.type === "music" ? (
                    <button className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600 text-white shadow-2xl transition-transform hover:scale-110 active:scale-95">
                      <Play className="h-7 w-7 fill-current ml-1" />
                    </button>
                  ) : (
                    <button className="group/btn flex items-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-black text-slate-950 transition-transform hover:scale-105 active:scale-95">
                      Preview Art
                      <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                  )}
                </div>
                <div className="absolute left-4 top-4">
                  <span className={cn(
                    "rounded-xl px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-2xl backdrop-blur-md border border-white/10",
                    item.type === "music" ? "bg-purple-600/80" : item.type === "art" ? "bg-cyan-600/80" : "bg-orange-600/80"
                  )}>
                    {item.type}
                  </span>
                </div>
              </div>

              <div className="mt-6 px-3 pb-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-black text-white tracking-tight">{item.title}</h3>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1.5">{item.creator}</p>
                  </div>
                  <div className="flex gap-3">
                    <Heart className="h-5 w-5 cursor-pointer text-slate-600 transition-colors hover:text-red-500" />
                    <Share2 className="h-5 w-5 cursor-pointer text-slate-600 transition-colors hover:text-indigo-400" />
                  </div>
                </div>
                
                <div className="mt-8 flex items-center justify-between pt-5 border-t border-white/5">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Current Price</span>
                    <span className="text-lg font-black text-indigo-400">{item.price} ETH</span>
                  </div>
                  <button 
                    onClick={() => handleBuy(item.title)}
                    className="flex items-center gap-2 rounded-xl bg-slate-800 px-5 py-2.5 text-xs font-black text-white hover:bg-slate-700 transition-all active:scale-95"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    Buy
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredProjects.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <ShoppingBag className="h-20 w-20 text-slate-800 mb-6" />
          <h3 className="text-2xl font-black text-slate-300">No assets found</h3>
          <p className="mt-2 text-slate-500 font-medium">Try adjusting your filters or search keywords.</p>
        </div>
      )}
    </div>
  );
};

export default Marketplace;