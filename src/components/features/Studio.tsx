import { useState } from "react";
import { Sparkles, Image as ImageIcon, Video, Wand2, History, Trash2, Download, Layers, Share2, Rocket } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const Studio = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [mode, setMode] = useState<"static" | "loop">("static");
  const [history, setHistory] = useState<{url: string, prompt: string, type: string}[]>([]);

  const handleGenerate = () => {
    if (!prompt) return;
    setIsGenerating(true);
    
    // Simulate AI Generation with a delay
    setTimeout(() => {
      const newArt = {
        url: mode === "static" 
          ? "https://storage.googleapis.com/dala-prod-public-storage/generated-images/47c34b1c-4f1b-4934-8387-c67ed9de7dcc/fine-art-3b90637d-1777545108727.webp"
          : "https://storage.googleapis.com/dala-prod-public-storage/generated-images/47c34b1c-4f1b-4934-8387-c67ed9de7dcc/music-nft-a46695f2-1777545108613.webp",
        prompt,
        type: mode
      };
      
      setHistory([newArt, ...history]);
      setIsGenerating(false);
      setPrompt("");
      toast.success("Masterpiece generated successfully!");
    }, 5000);
  };

  return (
    <div className="grid gap-12 lg:grid-cols-12 max-w-7xl mx-auto">
      <div className="lg:col-span-5 space-y-10">
        <div>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 rounded-full bg-pink-500/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-pink-400 ring-1 ring-inset ring-pink-500/30 mb-6"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Creative Engine v2.0
          </motion.div>
          <h1 className="text-4xl font-black text-white md:text-5xl leading-tight">AI Creator <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-indigo-400">Studio</span></h1>
          <p className="mt-4 text-lg text-slate-400 font-medium leading-relaxed">Transform your vision into high-fidelity assets. Perfect for NFT collections, startup branding, and immersive looping art.</p>
        </div>

        <div className="rounded-[2.5rem] border border-white/5 bg-slate-900/60 p-8 shadow-2xl backdrop-blur-xl ring-1 ring-white/10">
          <div className="mb-8 flex gap-2 rounded-2xl bg-slate-800/40 p-1.5 ring-1 ring-white/5">
            <button 
              onClick={() => setMode("static")}
              className={`flex flex-1 items-center justify-center gap-3 rounded-xl py-3.5 text-sm font-black transition-all ${mode === "static" ? "bg-indigo-600 text-white shadow-lg" : "text-slate-400 hover:text-white"}`}
            >
              <ImageIcon className="h-4.5 w-4.5" />
              High-Res Art
            </button>
            <button 
              onClick={() => setMode("loop")}
              className={`flex flex-1 items-center justify-center gap-3 rounded-xl py-3.5 text-sm font-black transition-all ${mode === "loop" ? "bg-indigo-600 text-white shadow-lg" : "text-slate-400 hover:text-white"}`}
            >
              <Video className="h-4.5 w-4.5" />
              10s Motion
            </button>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <label className="text-sm font-black text-slate-300 uppercase tracking-widest">Creative Prompt</label>
              <button className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5" />
                Style Presets
              </button>
            </div>
            <textarea 
              rows={5}
              placeholder="Describe the masterpiece you imagine... e.g., 'A futuristic city submerged in neon ocean with glowing whales, cinematic lighting, 8k'"
              className="w-full rounded-3xl border border-white/5 bg-slate-800/40 p-6 text-white font-medium placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all resize-none"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <div className="flex gap-3">
              <button className="flex-1 rounded-2xl border border-white/5 bg-slate-800/60 py-4 text-sm font-black text-slate-300 hover:bg-slate-700 transition-all">
                Enhance with AI
              </button>
              <button className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/5 bg-slate-800/60 text-indigo-400 hover:bg-indigo-500 hover:text-white transition-all">
                <Wand2 className="h-6 w-6" />
              </button>
            </div>
          </div>

          <button 
            onClick={handleGenerate}
            disabled={isGenerating || !prompt}
            className="mt-10 flex w-full items-center justify-center gap-4 rounded-2xl bg-indigo-600 py-5 font-black text-white transition-all hover:bg-indigo-500 disabled:opacity-50 active:scale-95 shadow-xl shadow-indigo-600/20"
          >
            {isGenerating ? (
              <>
                <Sparkles className="h-6 w-6 animate-spin" />
                Synthesizing Pixels...
              </>
            ) : (
              <>
                <Sparkles className="h-6 w-6" />
                Generate {mode === "static" ? "Digital Asset" : "10s Loop"}
              </>
            )}
          </button>
        </div>
      </div>

      <div className="lg:col-span-7">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-black text-white flex items-center gap-3">
            <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-indigo-500/10">
              <History className="h-6 w-6 text-indigo-400" />
            </div>
            Studio History
          </h3>
          {history.length > 0 && (
            <button 
              onClick={() => setHistory([])}
              className="text-sm font-bold text-slate-500 hover:text-red-400 transition-colors flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Clear History
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[500px] rounded-[3rem] border-2 border-dashed border-white/5 bg-slate-900/20 text-center p-10">
            <div className="mb-6 rounded-full bg-slate-800/50 p-8">
              <Sparkles className="h-16 w-16 text-slate-700" />
            </div>
            <h4 className="text-xl font-black text-slate-300">Your canvas is empty</h4>
            <p className="mt-2 text-slate-500 font-medium max-w-xs">Start dreaming and our AI will bring your ideas to life right here.</p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2">
            <AnimatePresence>
              {history.map((item, i) => (
                <motion.div 
                  key={i}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative overflow-hidden rounded-[2.5rem] bg-slate-900 border border-white/5 shadow-2xl"
                >
                  <img src={item.url} className="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-110" alt="Generated" />
                  <div className="absolute inset-0 bg-slate-950/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-6 text-center">
                    <p className="mb-6 text-xs font-medium text-slate-300 line-clamp-3">"{item.prompt}"</p>
                    <div className="flex flex-col w-full gap-3">
                      <button className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-xs font-black text-white hover:bg-indigo-500 transition-all">
                        <Download className="h-4 w-4" />
                        Save Asset
                      </button>
                      <div className="flex gap-3">
                        <button className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-xs font-black text-white backdrop-blur-md hover:bg-white/20 transition-all">
                          <Rocket className="h-4 w-4" />
                          Mint
                        </button>
                        <button className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white backdrop-blur-md hover:bg-white/20 transition-all">
                          <Share2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <div className="rounded-lg bg-slate-950/60 px-3 py-1 text-[10px] font-black text-white backdrop-blur-md border border-white/10 uppercase tracking-widest">
                      {item.type === "loop" ? "10s Loop" : "Static Art"}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default Studio;