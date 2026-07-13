import React from 'react';
import { Volume2, VolumeX, Bell, BellOff, X } from 'lucide-react';

interface SettingsMenuProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  notificationsEnabled: boolean;
  onToggleNotifications: () => void;
  onBack: () => void;
}

export function SettingsMenu({
  soundEnabled,
  onToggleSound,
  notificationsEnabled,
  onToggleNotifications,
  onBack
}: SettingsMenuProps) {
  return (
    <div className="min-h-screen bg-[#09090b] text-slate-200 p-4 md:p-8 flex items-center justify-center">
      <div className="max-w-md w-full bg-[#111113] border border-[#2a2a2a] rounded-2xl shadow-2xl overflow-hidden relative">
        <div className="bg-[#1a1a1c] border-b border-[#2a2a2a] px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold font-display uppercase tracking-widest text-slate-100">
            Paramètres
          </h2>
          <button onClick={onBack} className="text-slate-500 hover:text-slate-300 transition">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="bg-[#0c0c0e] border border-[#2a2a2a] p-4 rounded-xl flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-200">Effets Sonores</h3>
              <p className="text-xs text-slate-400 mt-1">Sons lors de la complétion de quêtes</p>
            </div>
            <button
              onClick={onToggleSound}
              className={`p-3 rounded-xl border transition ${
                soundEnabled 
                  ? 'bg-[#10b981]/10 border-[#10b981]/30 text-[#10b981]' 
                  : 'bg-[#1a1a1c] border-[#2a2a2a] text-slate-500 hover:text-slate-300'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>
          </div>

          <div className="bg-[#0c0c0e] border border-[#2a2a2a] p-4 rounded-xl flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-200">Notifications</h3>
              <p className="text-xs text-slate-400 mt-1">Afficher les popups de récompense</p>
            </div>
            <button
              onClick={onToggleNotifications}
              className={`p-3 rounded-xl border transition ${
                notificationsEnabled 
                  ? 'bg-[#10b981]/10 border-[#10b981]/30 text-[#10b981]' 
                  : 'bg-[#1a1a1c] border-[#2a2a2a] text-slate-500 hover:text-slate-300'
              }`}
            >
              {notificationsEnabled ? <Bell className="w-5 h-5" /> : <BellOff className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
