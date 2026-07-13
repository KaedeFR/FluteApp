/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Reward, ActiveTimer, EquipmentItem, ItemRarity } from '../types';
import { 
  ShoppingBag, 
  Plus, 
  Trash, 
  Coins, 
  X, 
  Info,
  Gamepad2,
  Cookie,
  Tv,
  Utensils,
  Moon,
  Gift,
  Coffee,
  Clock,
  Play,
  Check,
  Timer,
  Shield,
  Sparkles,
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LootShopProps {
  gold: number;
  rewards: Reward[];
  onPurchaseReward: (rewardId: string) => void;
  onAddReward: (reward: Reward) => void;
  onDeleteReward: (rewardId: string) => void;
  activeTimers: ActiveTimer[];
  onStartTimer: (rewardTitle: string, rewardId: string, durationMinutes: number) => void;
  onCancelTimer: (timerId: string) => void;
  equipment?: EquipmentItem[];
  onPurchaseEquipment?: (itemId: string) => void;
}

const PRESET_ICONS = [
  { name: 'Gamepad2', icon: Gamepad2, label: 'Jeu Vidéo' },
  { name: 'Cookie', icon: Cookie, label: 'Gourmandise' },
  { name: 'Tv', icon: Tv, label: 'Série / Cinéma' },
  { name: 'Utensils', icon: Utensils, label: 'Restaurant' },
  { name: 'Moon', icon: Moon, label: 'Sieste' },
  { name: 'Coffee', icon: Coffee, label: 'Café / Boisson' },
  { name: 'Gift', icon: Gift, label: 'Cadeau' },
];

export function LootShop({
  gold,
  rewards,
  onPurchaseReward,
  onAddReward,
  onDeleteReward,
  activeTimers = [],
  onStartTimer,
  onCancelTimer,
  equipment = [],
  onPurchaseEquipment,
}: LootShopProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [shopTab, setShopTab] = useState<'rewards' | 'equipment'>('rewards');

  // Equipment filters
  const [eqRarityFilter, setEqRarityFilter] = useState<string>('all');
  const [eqSlotFilter, setEqSlotFilter] = useState<string>('all');
  
  // Custom Timer modal field
  const [customTimerMinutes, setCustomTimerMinutes] = useState(30);
  const [timerSetupRewardId, setTimerSetupRewardId] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [goldCost, setGoldCost] = useState(30);
  const [iconName, setIconName] = useState('Gift');

  const handleCreateReward = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || goldCost <= 0) return;

    const newReward: Reward = {
      id: `reward-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      goldCost,
      isCustom: true,
      iconName,
      timesPurchased: 0,
    };

    onAddReward(newReward);
    
    // Reset Form
    setTitle('');
    setDescription('');
    setGoldCost(30);
    setIconName('Gift');
    setShowAddForm(false);
  };

  const getIconComponent = (name: string) => {
    const found = PRESET_ICONS.find(i => i.name === name);
    return found ? found.icon : Gift;
  };

  const formatTime = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const purchasableEquipment = equipment.filter(e => !e.isPurchased);

  const filteredEq = purchasableEquipment.filter(item => {
    const matchSlot = eqSlotFilter === 'all' || item.slot === eqSlotFilter;
    const matchRarity = eqRarityFilter === 'all' || item.rarity === eqRarityFilter;
    return matchSlot && matchRarity;
  });

  const SLOT_LABELS: Record<string, string> = {
    head: '🧢 Tête',
    armor: '👕 Armure',
    weapon: '🗡️ Arme',
    shield: '🛡️ Bouclier',
    ring: '💍 Anneau',
    boots: '🥾 Bottes',
  };

  const RARITY_LABELS: Record<ItemRarity, { label: string; color: string; border: string; bg: string }> = {
    commun: { label: 'Commun', color: 'text-slate-400', border: 'border-slate-800', bg: 'bg-slate-900/30' },
    rare: { label: 'Rare', color: 'text-blue-400', border: 'border-blue-500/30', bg: 'bg-blue-950/20' },
    epique: { label: 'Épique', color: 'text-purple-400', border: 'border-purple-500/30', bg: 'bg-purple-950/20' },
    mythique: { label: 'Mythique', color: 'text-orange-400', border: 'border-orange-500/40', bg: 'bg-orange-950/20' },
    divin: { label: 'Divin', color: 'text-amber-400', border: 'border-amber-500/50', bg: 'bg-amber-950/25' },
  };

  return (
    <div className="space-y-6">
      {/* Shop Header & Quick Balance */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1a1a1a] pb-4">
        <div>
          <h2 className="text-xl font-bold font-display text-slate-100 flex items-center gap-2">
            <ShoppingBag className="text-[#10b981] w-5 h-5" />
            Boutique
          </h2>
        </div>

        {/* Balance Display & Add Action */}
        <div className="flex items-center gap-3">
          <div className="bg-[#111113] border border-[#1a1a1a] px-4 py-2 rounded-xl flex items-center gap-2 shadow-inner">
            <span className="text-[10px] font-bold text-slate-400 tracking-wider font-mono uppercase">VOTRE COFFRE :</span>
            <div className="text-lg font-extrabold text-[#10b981] font-mono flex items-center gap-1">
              <span>🪙</span>{gold} <span className="text-[10px] font-semibold text-slate-500">Or</span>
            </div>
          </div>

          {shopTab === 'rewards' && (
            <button
              id="open-add-reward-btn"
              onClick={() => setShowAddForm(true)}
              className="bg-gradient-to-r from-[#10b981] to-[#059669] hover:opacity-90 active:scale-95 text-slate-950 px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase font-display flex items-center gap-1.5 transition shadow-[0_0_15px_rgba(16,185,129,0.2)]"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              Créer un Lot
            </button>
          )}
        </div>
      </div>

      {/* Tab Switch: Rewards vs Equipment */}
      <div className="flex border-b border-[#1a1a1a] gap-2">
        <button
          onClick={() => setShopTab('rewards')}
          className={`pb-3 px-4 font-display text-xs font-bold uppercase tracking-wider transition relative ${
            shopTab === 'rewards' ? 'text-[#10b981]' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          🎁 Lots
          {shopTab === 'rewards' && (
            <motion.div layoutId="shopTabLine" className="absolute bottom-0 inset-x-0 h-[2px] bg-[#10b981]" />
          )}
        </button>
        <button
          onClick={() => setShopTab('equipment')}
          className={`pb-3 px-4 font-display text-xs font-bold uppercase tracking-wider transition relative flex items-center gap-1.5 ${
            shopTab === 'equipment' ? 'text-[#10b981]' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          ⚔️ Équipement
          <span className="bg-[#10b981]/10 text-[#10b981] text-[9px] px-1.5 py-0.5 rounded-full border border-[#10b981]/20 animate-pulse">Armes</span>
          {shopTab === 'equipment' && (
            <motion.div layoutId="shopTabLine" className="absolute bottom-0 inset-x-0 h-[2px] bg-[#10b981]" />
          )}
        </button>
      </div>

      {shopTab === 'rewards' ? (
        <>
          {/* ACTIVE TIMERS RUNNING PANEL */}
          {activeTimers.length > 0 && (
            <div className="bg-[#0c0c0e] border border-purple-500/20 rounded-2xl p-5 space-y-4 shadow-xl">
              <div className="flex items-center gap-2 text-purple-400">
                <Timer className="w-5 h-5 animate-pulse" />
                <h3 className="text-sm font-bold tracking-wider uppercase font-display">Chronomètres de Récompense Actifs</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {activeTimers.map((timer) => {
                  const pct = (timer.secondsRemaining / timer.durationSeconds) * 100;
                  return (
                    <div 
                      key={timer.id}
                      className="bg-[#111113] border border-[#2a2a2a] rounded-xl p-4 flex items-center justify-between gap-4"
                    >
                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-200 truncate pr-2 font-display">{timer.rewardTitle}</span>
                          <span className="font-mono text-sm font-extrabold text-purple-400">{formatTime(timer.secondsRemaining)}</span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-[#1a1a1a] h-1.5 rounded-full overflow-hidden border border-[#222]">
                          <div 
                            className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full rounded-full transition-all duration-1000"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>

                      <button
                        id={`cancel-timer-${timer.id}`}
                        onClick={() => onCancelTimer(timer.id)}
                        className="text-slate-500 hover:text-red-400 p-1.5 hover:bg-red-950/20 rounded-lg transition"
                        title="Annuler le chronomètre"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Rewards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rewards.map((reward) => {
              const IconComponent = getIconComponent(reward.iconName);
              const canAfford = gold >= reward.goldCost;

              return (
                <motion.div
                  key={reward.id}
                  layout
                  className={`bg-[#111113]/90 border rounded-xl p-5 flex flex-col justify-between transition-all group ${
                    canAfford 
                      ? 'border-[#1a1a1a] hover:border-[#2a2a2a] hover:bg-[#1a1a1a]/35' 
                      : 'border-[#1a1a1a]/60 opacity-75'
                  }`}
                >
                  {/* Card top */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      {/* Reward Icon badge */}
                      <div className={`p-3 rounded-xl border ${
                        canAfford 
                          ? 'bg-[#10b981]/10 border-[#10b981]/20 text-[#10b981]' 
                          : 'bg-[#0c0c0e] border-[#1a1a1a] text-slate-500'
                      }`}>
                        <IconComponent className="w-5 h-5" />
                      </div>

                      {/* Times purchased and Delete action */}
                      <div className="flex items-center gap-2">
                        {reward.timesPurchased > 0 && (
                          <span className="text-[9px] font-bold font-mono px-2 py-0.5 rounded-full border border-[#1a1a1a] text-slate-400 bg-[#0c0c0e]">
                            Acheté {reward.timesPurchased}x
                          </span>
                        )}

                        {/* Allowing all rewards to be deleted as requested */}
                        <button
                          id={`delete-reward-${reward.id}`}
                          onClick={() => onDeleteReward(reward.id)}
                          className="text-slate-500 hover:text-red-400 p-1 rounded hover:bg-red-950/20 transition cursor-pointer"
                          title="Supprimer la récompense"
                        >
                          <Trash className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Info Text */}
                    <div className="space-y-1">
                      <h4 className="font-semibold text-sm text-slate-200 font-display tracking-wide truncate group-hover:text-[#10b981] transition">
                        {reward.title}
                      </h4>
                      <p className="text-xs text-slate-400 leading-normal line-clamp-2 h-8 font-sans">
                        {reward.description || "Aucune description fournie."}
                      </p>
                    </div>
                  </div>

                  {/* Timer Controls panel if purchased at least once */}
                  {reward.timesPurchased > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-[#1a1a1a]/50 flex items-center justify-between">
                      <span className="text-[10px] text-purple-400 font-semibold flex items-center gap-1 font-mono">
                        <Clock className="w-3 h-3" /> Gérer le Temps
                      </span>

                      <div className="flex gap-1.5">
                        <button
                          id={`quick-timer-15-${reward.id}`}
                          onClick={() => onStartTimer(reward.title, reward.id, 15)}
                          className="text-[9px] font-mono font-bold px-1.5 py-1 rounded bg-[#0c0c0e] border border-purple-950 hover:border-purple-600/50 text-slate-400 hover:text-purple-400 transition"
                          title="Lancer un chrono de 15 min"
                        >
                          15m
                        </button>
                        <button
                          id={`quick-timer-30-${reward.id}`}
                          onClick={() => onStartTimer(reward.title, reward.id, 30)}
                          className="text-[9px] font-mono font-bold px-1.5 py-1 rounded bg-[#0c0c0e] border border-purple-950 hover:border-purple-600/50 text-slate-400 hover:text-purple-400 transition"
                          title="Lancer un chrono de 30 min"
                        >
                          30m
                        </button>
                        <button
                          id={`setup-custom-timer-${reward.id}`}
                          onClick={() => setTimerSetupRewardId(reward.id)}
                          className="text-[9px] font-mono font-bold px-1.5 py-1 rounded bg-[#0c0c0e] border border-purple-950 hover:border-purple-600/50 text-slate-400 hover:text-purple-400 transition flex items-center gap-0.5"
                          title="Définir un chrono personnalisé"
                        >
                          + Custom
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Card bottom buy controls */}
                  <div className="pt-3 border-t border-[#1a1a1a] mt-3 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-slate-400 font-mono">Coût:</span>
                      <span className="text-sm font-extrabold text-[#10b981] font-mono">🪙 {reward.goldCost} Or</span>
                    </div>

                    <button
                      id={`buy-reward-${reward.id}`}
                      disabled={!canAfford}
                      onClick={() => onPurchaseReward(reward.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                        canAfford
                          ? 'bg-[#10b981] hover:bg-[#10b981]/90 text-slate-950 shadow-md cursor-pointer hover:scale-105 active:scale-95'
                          : 'bg-[#0c0c0e] border border-[#1a1a1a] text-slate-500 cursor-not-allowed'
                      }`}
                    >
                      <Coins className="w-3.5 h-3.5" />
                      Acheter
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </>
      ) : (
        /* EQUIPMENT SECTION */
        <div className="space-y-5">
          {/* Equipment Filters */}
          <div className="bg-[#111113] border border-[#1a1a1a] p-3 rounded-xl flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-400">Emplacement:</span>
              <select
                value={eqSlotFilter}
                onChange={(e) => setEqSlotFilter(e.target.value)}
                className="bg-[#0c0c0e] border border-[#2a2a2a] focus:border-[#10b981] text-xs text-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none cursor-pointer"
              >
                <option value="all">Tous les emplacements</option>
                {Object.entries(SLOT_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-400">Rareté:</span>
              <div className="flex gap-1">
                {['all', 'commun', 'rare', 'epique', 'mythique', 'divin'].map((rarity) => (
                  <button
                    key={rarity}
                    onClick={() => setEqRarityFilter(rarity)}
                    className={`px-2.5 py-1 rounded-md text-[10px] font-mono tracking-wider uppercase border transition cursor-pointer ${
                      eqRarityFilter === rarity
                        ? 'bg-[#1a1a1a] border-[#10b981] text-[#10b981]'
                        : 'border-transparent text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    {rarity === 'all' ? 'Tout' : rarity}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Equipment catalog grid */}
          {filteredEq.length === 0 ? (
            <div className="bg-[#0c0c0e] border border-dashed border-[#1a1a1a] rounded-2xl p-12 text-center text-slate-500">
              <Sparkles className="w-12 h-12 text-[#10b981]/10 mx-auto mb-3 animate-pulse" />
              <p className="text-sm font-medium">Aucun équipement disponible.</p>
              <p className="text-xs mt-1 text-slate-600">
                Vous avez déjà acquis tous les objets légendaires de cette section !
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredEq.map((item) => {
                const rStyle = RARITY_LABELS[item.rarity];
                const canAfford = gold >= item.cost;

                return (
                  <motion.div
                    key={item.id}
                    layout
                    className={`bg-[#111113]/95 border rounded-xl p-5 flex flex-col justify-between transition-all duration-300 group ${
                      canAfford 
                        ? 'border-[#1a1a1a] hover:border-[#2a2a2a] hover:bg-[#1a1a1a]/40 shadow-lg' 
                        : 'border-[#1a1a1a]/50 opacity-80'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        {/* Avatar / Item emoji with rarity background */}
                        <div className={`p-3 rounded-xl border ${rStyle.border} ${rStyle.bg} ${rStyle.color}`}>
                          <span className="text-2xl">{item.icon}</span>
                        </div>

                        <div className="text-right">
                          <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${rStyle.border} ${rStyle.color} ${rStyle.bg}`}>
                            {rStyle.label}
                          </span>
                          <span className="block text-[8px] text-slate-500 font-mono mt-1 uppercase tracking-widest">
                            {SLOT_LABELS[item.slot] || item.slot}
                          </span>
                        </div>
                      </div>

                      {/* Name & Desc */}
                      <div className="space-y-1">
                        <h4 className="font-semibold text-sm text-slate-200 font-display tracking-wide group-hover:text-[#10b981] transition">
                          {item.name}
                        </h4>
                        <p className="text-xs text-slate-400 leading-relaxed font-sans h-10 line-clamp-2">
                          {item.description}
                        </p>
                      </div>

                      {/* Attribute Bonuses List */}
                      <div className="bg-[#0c0c0e]/60 border border-[#1a1a1a]/30 p-2.5 rounded-lg space-y-1">
                        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block mb-1">📈 Effets Stat</span>
                        <div className="flex flex-wrap gap-1.5 text-[10px] font-mono">
                          {Object.entries(item.statBonuses).map(([stat, val]) => {
                            const colors: Record<string, string> = {
                              vitality: 'text-red-400',
                              wisdom: 'text-blue-400',
                              strength: 'text-orange-400',
                              serenity: 'text-teal-400',
                              magic: 'text-purple-400',
                            };
                            const labels: Record<string, string> = {
                              vitality: '🔴 Vit',
                              wisdom: '🔵 Sag',
                              strength: '🟠 For',
                              serenity: '🟢 Sér',
                              magic: '🟣 Mag',
                            };
                            return (
                              <span key={stat} className={`px-2 py-0.5 rounded bg-[#111113] border border-[#1a1a1a] font-bold ${colors[stat] || 'text-slate-300'}`}>
                                {labels[stat] || stat} +{val}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Gold and purchase CTA */}
                    <div className="pt-4 border-t border-[#1a1a1a] mt-4 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1 font-mono">
                        <span className="text-xs text-slate-500">Prix:</span>
                        <span className="text-sm font-extrabold text-[#10b981]">🪙 {item.cost} Or</span>
                      </div>

                      <button
                        id={`buy-equipment-${item.id}`}
                        disabled={!canAfford}
                        onClick={() => onPurchaseEquipment && onPurchaseEquipment(item.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                          canAfford
                            ? 'bg-gradient-to-r from-[#10b981] to-[#059669] text-slate-950 font-extrabold shadow-md cursor-pointer hover:scale-105 active:scale-95'
                            : 'bg-[#0c0c0e] border border-[#1a1a1a] text-slate-500 cursor-not-allowed'
                        }`}
                      >
                        <Coins className="w-3.5 h-3.5" />
                        Forger l'Objet
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* CUSTOM TIMER SETUP MODAL */}
      <AnimatePresence>
        {timerSetupRewardId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setTimerSetupRewardId(null)}
              className="absolute inset-0 bg-[#09090b]/90 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="relative w-full max-w-sm bg-[#0c0c0e] border border-purple-500/30 rounded-2xl shadow-2xl p-6 z-10"
            >
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-500" />
              
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-bold font-display text-slate-100 tracking-wide uppercase flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-purple-400" />
                  Chronomètre Personnalisé
                </h3>
                <button 
                  id="close-custom-timer-modal"
                  onClick={() => setTimerSetupRewardId(null)} 
                  className="text-slate-400 hover:text-white bg-[#1a1a1a] p-1 rounded-lg transition"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-400 uppercase block tracking-wider">Durée (Minutes)</label>
                  <input
                    type="number"
                    min={1}
                    max={360}
                    value={customTimerMinutes}
                    onChange={(e) => setCustomTimerMinutes(Math.max(1, parseInt(e.target.value) || 0))}
                    className="w-full bg-[#111113] border border-[#2a2a2a] focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none font-mono"
                  />
                </div>

                <button
                  id="confirm-custom-timer-btn"
                  onClick={() => {
                    const rwd = rewards.find(r => r.id === timerSetupRewardId);
                    if (rwd) {
                      onStartTimer(rwd.title, rwd.id, customTimerMinutes);
                    }
                    setTimerSetupRewardId(null);
                  }}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 text-white font-bold py-2 rounded-xl transition text-xs tracking-wider uppercase font-display"
                >
                  Démarrer le Compte à Rebours
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CREATE REWARD MODAL */}
      <AnimatePresence>
        {showAddForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddForm(false)}
              className="absolute inset-0 bg-[#09090b]/90 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-[#111113] border border-[#1a1a1a] rounded-2xl shadow-2xl p-6 overflow-hidden z-10"
            >
              {/* Decorative line */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#10b981] via-[#059669] to-[#10b981]" />
              
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-lg font-bold font-display text-slate-100 tracking-wide flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#10b981] animate-pulse" />
                  Créer une Récompense Réelle
                </h3>
                <button 
                  id="close-reward-modal-btn"
                  onClick={() => setShowAddForm(false)} 
                  className="text-slate-400 hover:text-white bg-[#1a1a1a] p-1.5 rounded-lg transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateReward} className="space-y-4">
                {/* Title */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400 tracking-wide block">Titre du lot</label>
                  <input
                    id="reward-title-input"
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ex: 30 minutes de lecture plaisir, Un Bubble Tea..."
                    className="w-full bg-[#0c0c0e] border border-[#2a2a2a] focus:border-[#10b981] rounded-xl px-4 py-2 text-sm text-slate-100 focus:outline-none transition"
                  />
                </div>

                {/* Description */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400 tracking-wide block">Description</label>
                  <textarea
                    id="reward-desc-input"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Quelles sont les conditions ou les détails de ce plaisir ?"
                    rows={2}
                    className="w-full bg-[#0c0c0e] border border-[#2a2a2a] focus:border-[#10b981] rounded-xl px-4 py-2 text-sm text-slate-100 focus:outline-none resize-none transition"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Gold Cost */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-400 tracking-wide block">Coût en Or (🪙)</label>
                    <input
                      id="reward-cost-input"
                      type="number"
                      required
                      min={10}
                      max={1000}
                      value={goldCost}
                      onChange={(e) => setGoldCost(parseInt(e.target.value) || 0)}
                      className="w-full bg-[#0c0c0e] border border-[#2a2a2a] focus:border-[#10b981] rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none transition font-mono"
                    />
                  </div>

                  {/* Icon Selection */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-400 tracking-wide block">Icône</label>
                    <select
                      id="reward-icon-select"
                      value={iconName}
                      onChange={(e) => setIconName(e.target.value)}
                      className="w-full bg-[#0c0c0e] border border-[#2a2a2a] focus:border-[#10b981] rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none transition select-none cursor-pointer"
                    >
                      {PRESET_ICONS.map((i) => (
                        <option key={i.name} value={i.name}>
                          {i.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  id="submit-reward-btn"
                  className="w-full bg-gradient-to-r from-[#10b981] to-[#059669] hover:opacity-90 text-slate-950 font-bold py-2.5 rounded-xl transition text-sm tracking-wider uppercase font-display shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                >
                  Ajouter aux Étagères du Magasin
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
