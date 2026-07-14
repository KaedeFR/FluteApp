import React from 'react';
import { Play, PlusCircle, Settings, Music, Sparkles, Trash2, Check, X, Shield, Brain, Dumbbell, Sun, Sparkle } from 'lucide-react';
import { motion } from 'motion/react';
import { CharacterProfile } from '../types';

interface MainMenuProps {
  hasExistingCharacter: boolean;
  onContinue: () => void;
  onNewGame: () => void;
  onSettings: () => void;
  profiles: CharacterProfile[];
  activeProfileId: string | null;
  onSelectProfile: (id: string) => void;
  onDeleteProfile: (id: string) => void;
}

const getEmojiForAvatar = (id: string) => {
  const avatars: Record<string, string> = {
    warrior: '⚔️',
    mage: '🧙‍♂️',
    rogue: '🏹',
    paladin: '🛡️',
    bard: '🎭',
    alchemist: '🧪',
    noble: '👑',
    monk: '🧘',
    flutist_monk: '🪈',
    companion: '🐱'
  };
  return avatars[id] || '⚔️';
};

function DeleteButton({ onDelete }: { onDelete: () => void }) {
  const [confirm, setConfirm] = React.useState(false);

  if (confirm) {
    return (
      <div className="flex items-center space-x-1 bg-red-950/50 border border-red-500/40 rounded-lg p-0.5" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
            setConfirm(false);
          }}
          className="bg-red-600 hover:bg-red-700 text-white p-1 rounded transition cursor-pointer"
          title="Confirmer la suppression définitive"
        >
          <Check className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setConfirm(false);
          }}
          className="bg-slate-800 hover:bg-slate-700 text-slate-300 p-1 rounded transition cursor-pointer"
          title="Annuler"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        setConfirm(true);
      }}
      className="bg-red-950/20 hover:bg-red-900/30 text-red-400 hover:text-red-300 border border-red-500/10 hover:border-red-500/30 p-2 rounded-lg transition cursor-pointer"
      title="Supprimer le héros"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}

export function MainMenu({ 
  hasExistingCharacter, 
  onContinue, 
  onNewGame, 
  onSettings,
  profiles = [],
  activeProfileId,
  onSelectProfile,
  onDeleteProfile
}: MainMenuProps) {
  return (
    <div className="min-h-screen bg-[#09090b] text-slate-200 flex flex-col items-center justify-center p-4 py-8 relative">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-[#09090b] to-[#09090b] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-10 flex flex-col items-center max-w-2xl w-full"
      >
        {/* Stylized Flute Logo Container */}
        <div className="w-24 h-24 mb-6 rounded-full bg-gradient-to-br from-[#111113] to-[#0c0c0e] border border-emerald-500/20 flex flex-col items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.12)] relative">
          <Music className="w-4 h-4 text-emerald-400 absolute -top-1 -right-1 animate-bounce" />
          <Sparkles className="w-4 h-4 text-emerald-500 absolute bottom-2 left-2 animate-pulse" />
          
          <div className="w-16 h-3 bg-gradient-to-r from-emerald-400 via-[#10b981] to-emerald-600 rounded-full flex items-center justify-between px-2.5 relative shadow-[0_0_12px_rgba(16,185,129,0.3)] rotate-[-20deg]">
            <div className="w-1.5 h-1.5 rounded-full bg-[#09090b] shadow-inner" />
            <div className="flex gap-1">
              <div className="w-1 h-1 rounded-full bg-[#09090b] shadow-inner" />
              <div className="w-1 h-1 rounded-full bg-[#09090b] shadow-inner" />
              <div className="w-1 h-1 rounded-full bg-[#09090b] shadow-inner" />
              <div className="w-1 h-1 rounded-full bg-[#09090b] shadow-inner" />
            </div>
          </div>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-[#10b981] to-emerald-500 mb-8 text-center tracking-tight">
          L'histoire d'un flûtiste
        </h1>

        {/* CHARACTER SELECTOR LIST */}
        {profiles.length > 0 && (
          <div className="w-full mb-8 space-y-3">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-[10px] font-mono uppercase tracking-widest text-[#059669] font-bold">Sélection du Héros</h2>
              <span className="text-[10px] font-mono text-slate-500">{profiles.length} héros créé(s)</span>
            </div>
            
            <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
              {profiles.map((prof) => {
                const isActive = prof.id === activeProfileId;
                const char = prof.character;
                return (
                  <div 
                    key={prof.id} 
                    onClick={() => onSelectProfile(prof.id)}
                    className={`bg-[#111113] border transition-all duration-300 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 relative group cursor-pointer ${
                      isActive 
                        ? 'border-[#10b981] shadow-[0_0_15px_rgba(16,185,129,0.06)]' 
                        : 'border-[#2a2a2a] hover:border-slate-700'
                    }`}
                  >
                    {isActive && (
                      <span className="absolute -top-2 -left-2 bg-[#10b981] text-black font-mono text-[8px] font-extrabold uppercase px-1.5 py-0.5 rounded shadow-md tracking-wider">
                        Sélectionné
                      </span>
                    )}

                    {/* Left side: Avatar & Name */}
                    <div className="flex items-center space-x-3.5 min-w-0">
                      <div className="w-11 h-11 bg-[#0c0c0e] rounded-lg flex items-center justify-center border border-[#2a2a2a] text-2xl shrink-0 relative">
                        {char.customAvatar && char.avatarId === 'custom' ? (
                          <img 
                            src={char.customAvatar} 
                            alt="Avatar" 
                            className="w-full h-full object-cover rounded-lg" 
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <span>{getEmojiForAvatar(char.avatarId)}</span>
                        )}
                        <span className="absolute -bottom-1.5 -right-1.5 bg-[#09090b] border border-[#2a2a2a] text-slate-300 font-mono text-[9px] font-bold px-1 rounded-md">
                          Lvl {char.level}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h3 className="text-sm font-bold text-white group-hover:text-[#10b981] transition-colors truncate">{char.name}</h3>
                        </div>
                        <p className="text-[10px] uppercase font-mono tracking-wider text-emerald-500/80 truncate">{char.classTitle}</p>
                      </div>
                    </div>

                    {/* Middle: Characteristics Overview */}
                    <div className="grid grid-cols-5 gap-1.5 border-t border-b md:border-none border-[#1a1a1c] py-2.5 md:py-0 md:px-4 shrink-0">
                      <div className="flex flex-col items-center px-1.5">
                        <span className="text-[8px] uppercase font-bold text-red-400 mb-0.5" title="Vitalité">VIT</span>
                        <span className="text-xs font-mono font-bold text-slate-300">{char.stats.vitality}</span>
                      </div>
                      <div className="flex flex-col items-center px-1.5">
                        <span className="text-[8px] uppercase font-bold text-blue-400 mb-0.5" title="Sagesse">SAG</span>
                        <span className="text-xs font-mono font-bold text-slate-300">{char.stats.wisdom}</span>
                      </div>
                      <div className="flex flex-col items-center px-1.5">
                        <span className="text-[8px] uppercase font-bold text-orange-400 mb-0.5" title="Force">FOR</span>
                        <span className="text-xs font-mono font-bold text-slate-300">{char.stats.strength}</span>
                      </div>
                      <div className="flex flex-col items-center px-1.5">
                        <span className="text-[8px] uppercase font-bold text-emerald-400 mb-0.5" title="Sérénité">SER</span>
                        <span className="text-xs font-mono font-bold text-slate-300">{char.stats.serenity}</span>
                      </div>
                      <div className="flex flex-col items-center px-1.5">
                        <span className="text-[8px] uppercase font-bold text-purple-400 mb-0.5" title="Magie">MAG</span>
                        <span className="text-xs font-mono font-bold text-slate-300">{char.stats.magic}</span>
                      </div>
                    </div>

                    {/* Right: Currency / Actions */}
                    <div className="flex items-center justify-between md:justify-end gap-4">
                      <div className="flex flex-row md:flex-col items-end gap-3 md:gap-0.5 font-mono text-[11px] text-slate-400">
                        <span className="flex items-center gap-1">🟡 {char.gold} <span className="text-[8px] text-slate-500 uppercase font-sans">Or</span></span>
                        <span className="flex items-center gap-1">🟢 {char.xp} <span className="text-[8px] text-slate-500 uppercase font-sans">XP</span></span>
                      </div>

                      <div className="flex items-center space-x-2" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => onSelectProfile(prof.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                            isActive 
                              ? 'bg-[#10b981] hover:bg-[#059669] text-[#09090b]'
                              : 'bg-[#1a1a1c] hover:bg-[#10b981] text-slate-200 hover:text-black border border-[#2a2a2a]'
                          }`}
                        >
                          Charger
                        </button>
                        
                        <DeleteButton onDelete={() => onDeleteProfile(prof.id)} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* CORE MENU NAVIGATION */}
        <div className="w-full space-y-4 max-w-md">
          {hasExistingCharacter && activeProfileId && (
            <button
              onClick={onContinue}
              className="w-full bg-[#111113] border border-[#10b981]/50 hover:border-[#10b981] hover:bg-[#10b981]/10 text-[#10b981] hover:text-white px-6 py-4 rounded-xl font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] cursor-pointer group"
            >
              <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Continuer la Partie
            </button>
          )}
          
          <button
            onClick={onNewGame}
            className="w-full bg-[#111113] border border-[#2a2a2a] hover:border-[#10b981] hover:bg-[#1a1a1c] text-slate-200 hover:text-white px-6 py-4 rounded-xl font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-[0_0_15px_rgba(16,185,129,0.12)] cursor-pointer group"
          >
            <PlusCircle className="w-5 h-5 text-slate-400 group-hover:text-[#10b981] transition-colors" />
            Nouveau Héros
          </button>

          <button
            onClick={onSettings}
            className="w-full bg-[#111113] border border-[#2a2a2a] hover:border-[#10b981] hover:bg-[#1a1a1c] text-slate-200 hover:text-white px-6 py-4 rounded-xl font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-[0_0_15px_rgba(16,185,129,0.12)] cursor-pointer group"
          >
            <Settings className="w-5 h-5 text-slate-400 group-hover:text-[#10b981] transition-colors" />
            Paramètres
          </button>
        </div>
      </motion.div>
    </div>
  );
}
