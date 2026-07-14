import React, { useState, useEffect } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Bell, 
  BellOff, 
  X, 
  Keyboard, 
  Monitor, 
  Download, 
  Check, 
  RotateCcw, 
  Info, 
  ShieldAlert,
  Sparkles,
  Command
} from 'lucide-react';
import { KeyboardShortcuts } from '../types';

interface SettingsMenuProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  notificationsEnabled: boolean;
  onToggleNotifications: () => void;
  onBack: () => void;
  shortcuts: KeyboardShortcuts;
  onUpdateShortcut: (actionKey: keyof KeyboardShortcuts, newKey: string) => void;
  onResetShortcuts: () => void;
  windowsBackgroundEnabled: boolean;
  onToggleWindowsBackground: () => void;
}

export function SettingsMenu({
  soundEnabled,
  onToggleSound,
  notificationsEnabled,
  onToggleNotifications,
  onBack,
  shortcuts,
  onUpdateShortcut,
  onResetShortcuts,
  windowsBackgroundEnabled,
  onToggleWindowsBackground
}: SettingsMenuProps) {
  const [assigningKey, setAssigningKey] = useState<keyof KeyboardShortcuts | null>(null);

  // Listen to next key press when re-assigning a shortcut
  useEffect(() => {
    if (!assigningKey) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      e.stopPropagation();
      
      // We can use the code or the key, key is simpler and more readable (e.g. 'c', 'q')
      const pressedKey = e.key.toLowerCase();
      
      // Exclude generic modifier keypresses themselves
      if (['control', 'shift', 'alt', 'meta'].includes(pressedKey)) {
        return;
      }

      onUpdateShortcut(assigningKey, pressedKey);
      setAssigningKey(null);
    };

    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [assigningKey, onUpdateShortcut]);

  const downloadStartupScript = () => {
    const appUrl = window.location.origin; // dynamic current origin
    const scriptContent = `@echo off\n` +
      `:: =========================================================================\n` +
      `:: SCRIPT DE DEMARRAGE EN ARRIERE-PLAN - FLUTISTE RPG\n` +
      `:: =========================================================================\n\n` +
      `echo [Flutiste RPG] Configuration du lancement automatique...\n` +
      `powershell -Command "$WshShell = New-Object -ComObject WScript.Shell; $Shortcut = $WshShell.CreateShortcut(\\"$Home\\\\AppData\\\\Roaming\\\\Microsoft\\\\Windows\\\\Start Menu\\\\Programs\\\\Startup\\\\FlutisteRPG.lnk\\"); $Shortcut.TargetPath = \\"chrome.exe\\"; $Shortcut.Arguments = \\"--app=${appUrl} --background\\"; $Shortcut.Save()"\n` +
      `echo.\n` +
      `echo [SUCCES] Raccourci de démarrage crée avec succes dans Windows Startup !\n` +
      `echo L'application se lancera desormais au demarrage de Windows en mode autonome.\n` +
      `echo.\n` +
      `pause\n`;
    
    const blob = new Blob([scriptContent], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'configurer_rpg_arriere_plan.bat';
    link.click();
  };

  const testWindowsNotifications = () => {
    if (!("Notification" in window)) {
      alert("Ce navigateur ne prend pas en charge les notifications de bureau.");
      return;
    }
    
    if (Notification.permission === "granted") {
      new Notification("Flûtiste RPG Zen 🪈", {
        body: "Le mode arrière-plan est actif. Prêt à méditer et valider vos objectifs de vie !",
        icon: "/favicon.ico"
      });
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          new Notification("Flûtiste RPG Zen 🪈", {
            body: "Les notifications Windows de bureau sont activées !",
            icon: "/favicon.ico"
          });
        }
      });
    } else {
      alert("Les notifications de bureau sont bloquées. Veuillez les autoriser dans les paramètres de votre navigateur.");
    }
  };

  const shortcutLabels: Record<keyof KeyboardShortcuts, { title: string; desc: string }> = {
    navCharacter: { title: "Menu Héros", desc: "Basculer vers la feuille de personnage" },
    navQuests: { title: "Menu Quêtes", desc: "Ouvrir le tableau de bord des disciplines" },
    navSkills: { title: "Menu Compétences", desc: "Consulter l'arbre d'évolution" },
    navInventory: { title: "Menu Inventaire", desc: "Ouvrir votre sac d'équipement" },
    navShop: { title: "Boutique d'Or", desc: "Acheter des récompenses et des bonus" },
    navGrimoire: { title: "Le Grimoire", desc: "Ouvrir les accomplissements et le journal" },
    navAnalytics: { title: "Analyses de Vie", desc: "Ouvrir le tableau de bord analytique" },
    toggleSound: { title: "Muter l'Interface", desc: "Activer ou couper instantanément le son" }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-slate-200 p-4 md:p-8 flex items-center justify-center relative">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-950/10 via-[#09090b] to-[#09090b] pointer-events-none" />
      
      <div className="max-w-4xl w-full bg-[#111113] border border-[#2a2a2a] rounded-2xl shadow-2xl overflow-hidden relative z-10 flex flex-col">
        {/* Header */}
        <div className="bg-[#1a1a1c] border-b border-[#2a2a2a] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Command className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold font-display uppercase tracking-wider text-slate-100">
              Paramètres Avancés
            </h2>
          </div>
          <button onClick={onBack} className="text-slate-500 hover:text-slate-300 transition cursor-pointer p-1 rounded-lg hover:bg-[#252528]">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Scrollable Container with responsive grid */}
        <div className="p-6 overflow-y-auto max-h-[80vh] space-y-6">
          
          {/* TOP PANEL: Classic controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#0c0c0e] border border-[#2a2a2a] p-4 rounded-xl flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-200">Effets Sonores</h3>
                <p className="text-[11px] text-slate-400 mt-0.5">Sons de complétion et alertes de combat</p>
              </div>
              <button
                onClick={onToggleSound}
                className={`p-2.5 rounded-xl border transition cursor-pointer ${
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
                <h3 className="text-sm font-bold text-slate-200">Notifications</h3>
                <p className="text-[11px] text-slate-400 mt-0.5">Afficher les popups d'accomplissements</p>
              </div>
              <button
                onClick={onToggleNotifications}
                className={`p-2.5 rounded-xl border transition cursor-pointer ${
                  notificationsEnabled 
                    ? 'bg-[#10b981]/10 border-[#10b981]/30 text-[#10b981]' 
                    : 'bg-[#1a1a1c] border-[#2a2a2a] text-slate-500 hover:text-slate-300'
                }`}
              >
                {notificationsEnabled ? <Bell className="w-5 h-5" /> : <BellOff className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* MIDDLE PANEL: Windows Background Mode */}
          <div className="bg-[#0c0c0e] border border-[#2a2a2a] p-5 rounded-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#2a2a2a]">
              <div className="flex items-center gap-2.5">
                <Monitor className="w-5 h-5 text-emerald-400" />
                <div>
                  <h3 className="text-sm font-bold text-slate-200">Mode Arrière-plan (Windows)</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">Garder l'application active et discrète</p>
                </div>
              </div>
              
              <button
                onClick={onToggleWindowsBackground}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  windowsBackgroundEnabled ? 'bg-[#10b981]' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    windowsBackgroundEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {windowsBackgroundEnabled && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs">
                <div className="bg-[#111113] border border-[#1d1d21] p-3.5 rounded-lg space-y-1.5 flex flex-col justify-between">
                  <span className="font-bold text-emerald-400 block font-mono text-[10px] uppercase">Étape 1 : PWA</span>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Cliquez sur l'icône d'installation dans la barre d'adresse de Chrome/Edge pour installer l'application de façon autonome.
                  </p>
                  <div className="h-4" />
                </div>

                <div className="bg-[#111113] border border-[#1d1d21] p-3.5 rounded-lg space-y-1.5 flex flex-col justify-between">
                  <span className="font-bold text-emerald-400 block font-mono text-[10px] uppercase">Étape 2 : Démarrage</span>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Téléchargez notre script de démarrage sécurisé pour ajouter l'application à votre dossier de démarrage Windows.
                  </p>
                  <button
                    onClick={downloadStartupScript}
                    className="w-full mt-2 py-1.5 bg-emerald-950/40 hover:bg-emerald-900/40 text-emerald-400 hover:text-emerald-300 border border-emerald-500/20 hover:border-emerald-500/40 rounded-lg font-bold font-mono text-[10px] uppercase flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Télécharger (.bat)
                  </button>
                </div>

                <div className="bg-[#111113] border border-[#1d1d21] p-3.5 rounded-lg space-y-1.5 flex flex-col justify-between">
                  <span className="font-bold text-emerald-400 block font-mono text-[10px] uppercase">Étape 3 : Notifications</span>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Autorisez les notifications système Windows pour recevoir vos alertes de quêtes et minuteries d'activité.
                  </p>
                  <button
                    onClick={testWindowsNotifications}
                    className="w-full mt-2 py-1.5 bg-[#1a1a1c] hover:bg-[#252528] text-slate-300 border border-[#2a2a2a] rounded-lg font-bold font-mono text-[10px] uppercase flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    <Bell className="w-3.5 h-3.5 text-emerald-400" />
                    Tester l'alerte
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* LOWER PANEL: Hotkey Shortcuts */}
          <div className="bg-[#0c0c0e] border border-[#2a2a2a] p-5 rounded-xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#2a2a2a]">
              <div className="flex items-center gap-2.5">
                <Keyboard className="w-5 h-5 text-emerald-400" />
                <div>
                  <h3 className="text-sm font-bold text-slate-200">Raccourcis Clavier</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">Naviguez instantanément dans l'interface</p>
                </div>
              </div>
              <button
                onClick={onResetShortcuts}
                className="text-[10px] uppercase font-mono tracking-wider text-slate-400 hover:text-white flex items-center gap-1 transition cursor-pointer bg-[#1a1a1c] px-2 py-1 rounded-lg border border-[#2a2a2a]"
              >
                <RotateCcw className="w-3 h-3 text-emerald-400" /> Réinitialiser
              </button>
            </div>

            {/* Grid of Shortcuts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              {(Object.keys(shortcuts) as Array<keyof KeyboardShortcuts>).map((key) => {
                const isAssigning = assigningKey === key;
                const value = shortcuts[key];
                const labels = shortcutLabels[key] || { title: key, desc: "" };

                return (
                  <div 
                    key={key} 
                    className="flex items-center justify-between bg-[#111113] border border-[#1d1d21] p-3 rounded-xl hover:border-[#2a2a2a] transition"
                  >
                    <div className="min-w-0 pr-2">
                      <span className="font-bold text-xs text-slate-200 block truncate">{labels.title}</span>
                      <span className="text-[10px] text-slate-400 block truncate leading-normal">{labels.desc}</span>
                    </div>

                    <button
                      onClick={() => setAssigningKey(key)}
                      className={`h-9 px-3.5 rounded-lg border font-mono text-xs font-bold uppercase shrink-0 transition flex items-center justify-center min-w-[70px] cursor-pointer ${
                        isAssigning
                          ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 animate-pulse'
                          : 'bg-[#1a1a1c] border-[#2a2a2a] text-slate-300 hover:bg-[#252528] hover:border-slate-500'
                      }`}
                    >
                      {isAssigning ? "..." : value}
                    </button>
                  </div>
                );
              })}
            </div>
            
            <div className="flex gap-2 bg-[#1a1a1c]/40 border border-[#2a2a2a] p-3 rounded-lg text-[10px] text-slate-400 leading-relaxed">
              <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>Note :</strong> Les raccourcis clavier sont globaux mais sont automatiquement désactivés lorsque vous écrivez dans un champ de texte (par exemple, la saisie d'une quête ou la rédaction du journal intime) afin d'éviter toute perturbation.
              </span>
            </div>
          </div>

        </div>

        {/* Footer actions */}
        <div className="bg-[#1a1a1c] border-t border-[#2a2a2a] px-6 py-4 flex justify-end">
          <button
            onClick={onBack}
            className="px-5 py-2 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-black font-bold font-mono text-xs uppercase tracking-wider rounded-lg shadow-lg hover:shadow-[0_0_15px_rgba(16,185,129,0.25)] transition cursor-pointer"
          >
            Sauvegarder & Retour
          </button>
        </div>
      </div>
    </div>
  );
}
