import React from 'react';
import { Play, PlusCircle, Settings, Music, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface MainMenuProps {
  hasExistingCharacter: boolean;
  onContinue: () => void;
  onNewGame: () => void;
  onSettings: () => void;
}

export function MainMenu({ hasExistingCharacter, onContinue, onNewGame, onSettings }: MainMenuProps) {
  return (
    <div className="min-h-screen bg-[#09090b] text-slate-200 flex flex-col items-center justify-center p-4">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-[#09090b] to-[#09090b] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-10 flex flex-col items-center max-w-md w-full"
      >
        {/* Stylized Flute Logo Container */}
        <div className="w-28 h-28 mb-8 rounded-full bg-gradient-to-br from-[#111113] to-[#0c0c0e] border border-emerald-500/20 flex flex-col items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.15)] relative">
          {/* Decorative ambient music notes and sparkles */}
          <Music className="w-5 h-5 text-emerald-400 absolute -top-1 -right-1 animate-bounce" />
          <Sparkles className="w-4 h-4 text-emerald-500 absolute bottom-2 left-2 animate-pulse" />
          
          {/* Beautiful HTML/Tailwind flute representation */}
          <div className="w-20 h-4 bg-gradient-to-r from-emerald-400 via-[#10b981] to-emerald-600 rounded-full flex items-center justify-between px-3 relative shadow-[0_0_15px_rgba(16,185,129,0.4)] rotate-[-20deg]">
            {/* Embouchure hole */}
            <div className="w-2 h-2 rounded-full bg-[#09090b] shadow-inner" />
            {/* Finger holes */}
            <div className="flex gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#09090b] shadow-inner" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#09090b] shadow-inner" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#09090b] shadow-inner" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#09090b] shadow-inner" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#09090b] shadow-inner" />
            </div>
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-[#10b981] to-emerald-500 mb-12 text-center tracking-tight">
          L'histoire d'un flûtiste
        </h1>

        <div className="w-full space-y-4">
          {hasExistingCharacter && (
            <button
              onClick={onContinue}
              className="w-full bg-[#111113] border border-[#2a2a2a] hover:border-[#10b981] hover:bg-[#1a1a1c] text-slate-200 hover:text-white px-6 py-4 rounded-xl font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-[0_0_15px_rgba(16,185,129,0.15)] cursor-pointer group"
            >
              <Play className="w-5 h-5 text-slate-400 group-hover:text-[#10b981] transition-colors" />
              Continuer
            </button>
          )}
          
          <button
            onClick={onNewGame}
            className="w-full bg-[#111113] border border-[#2a2a2a] hover:border-[#10b981] hover:bg-[#1a1a1c] text-slate-200 hover:text-white px-6 py-4 rounded-xl font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-[0_0_15px_rgba(16,185,129,0.15)] cursor-pointer group"
          >
            <PlusCircle className="w-5 h-5 text-slate-400 group-hover:text-[#10b981] transition-colors" />
            Nouveau Héros
          </button>

          <button
            onClick={onSettings}
            className="w-full bg-[#111113] border border-[#2a2a2a] hover:border-[#10b981] hover:bg-[#1a1a1c] text-slate-200 hover:text-white px-6 py-4 rounded-xl font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-[0_0_15px_rgba(16,185,129,0.15)] cursor-pointer group"
          >
            <Settings className="w-5 h-5 text-slate-400 group-hover:text-[#10b981] transition-colors" />
            Paramètres
          </button>
        </div>
      </motion.div>
    </div>
  );
}
