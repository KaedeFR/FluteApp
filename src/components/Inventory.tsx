/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { EquipmentItem, ItemRarity, EquipmentSlot } from '../types';
import { 
  Backpack, 
  ShieldAlert, 
  Sparkles, 
  BookOpen, 
  Heart, 
  Dumbbell, 
  Zap, 
  Check, 
  X,
  Lock,
  Compass,
  TrendingUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface InventoryProps {
  equipment: EquipmentItem[];
  onToggleEquip: (itemId: string) => void;
}

const SLOT_LABELS: Record<EquipmentSlot, { label: string; icon: string }> = {
  head: { label: 'Tête', icon: '🧢' },
  armor: { label: 'Armure', icon: '👕' },
  weapon: { label: 'Arme principale', icon: '🗡️' },
  shield: { label: 'Bouclier / Secondaire', icon: '🛡️' },
  ring: { label: 'Anneau de focus', icon: '💍' },
  boots: { label: 'Bottes de vitesse', icon: '🥾' },
};

const RARITY_LABELS: Record<ItemRarity, { label: string; color: string; border: string; bg: string }> = {
  commun: { label: 'Commun', color: 'text-slate-400', border: 'border-slate-800', bg: 'bg-slate-900/30' },
  rare: { label: 'Rare', color: 'text-blue-400', border: 'border-blue-500/30', bg: 'bg-blue-950/20' },
  epique: { label: 'Épique', color: 'text-purple-400', border: 'border-purple-500/30', bg: 'bg-purple-950/20' },
  mythique: { label: 'Mythique', color: 'text-orange-400', border: 'border-orange-500/40', bg: 'bg-orange-950/20' },
  divin: { label: 'Divin', color: 'text-amber-400', border: 'border-amber-500/50', bg: 'bg-amber-950/25' },
};

export function Inventory({ equipment = [], onToggleEquip }: InventoryProps) {
  const [selectedSlotFilter, setSelectedSlotFilter] = useState<string>('all');
  const [selectedRarityFilter, setSelectedRarityFilter] = useState<string>('all');

  // Find equipped items for each slot
  const getEquipped = (slot: EquipmentSlot) => {
    return equipment.find(e => e.isEquipped && e.slot === slot);
  };

  // Only show purchased items in the backpack
  const purchasedItems = equipment.filter(e => e.isPurchased);

  const filteredItems = purchasedItems.filter(item => {
    const matchSlot = selectedSlotFilter === 'all' || item.slot === selectedSlotFilter;
    const matchRarity = selectedRarityFilter === 'all' || item.rarity === selectedRarityFilter;
    return matchSlot && matchRarity;
  });

  // Calculate total stat bonuses
  const totalStats = purchasedItems
    .filter(e => e.isEquipped)
    .reduce((totals, item) => {
      Object.entries(item.statBonuses).forEach(([stat, val]) => {
        const key = stat as keyof typeof totals;
        totals[key] = (totals[key] || 0) + (val || 0);
      });
      return totals;
    }, { vitality: 0, wisdom: 0, strength: 0, serenity: 0, magic: 0 });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1a1a1a] pb-4">
        <div>
          <h2 className="text-xl font-bold font-display text-slate-100 flex items-center gap-2">
            <Backpack className="text-[#10b981] w-5 h-5" />
            Inventaire
          </h2>
        </div>

        {/* Quick cumulative bonus display */}
        <div className="bg-[#111113] border border-[#1a1a1a] p-3 rounded-xl flex items-center gap-4 shrink-0 shadow-inner">
          <div className="text-[10px] font-bold text-slate-400 tracking-wider font-mono uppercase border-r border-[#1a1a1a] pr-4">
            🔥 Bonus Cumulés :
          </div>
          <div className="flex flex-wrap gap-3 text-xs font-mono">
            {totalStats.vitality > 0 && <span className="text-red-400 font-bold">🔴 Vit +{totalStats.vitality}</span>}
            {totalStats.wisdom > 0 && <span className="text-blue-400 font-bold">🔵 Sag +{totalStats.wisdom}</span>}
            {totalStats.strength > 0 && <span className="text-orange-400 font-bold">🟠 For +{totalStats.strength}</span>}
            {totalStats.serenity > 0 && <span className="text-teal-400 font-bold">🟢 Sér +{totalStats.serenity}</span>}
            {totalStats.magic > 0 && <span className="text-purple-400 font-bold">🟣 Mag +{totalStats.magic}</span>}
            {Object.values(totalStats).every(v => v === 0) && (
              <span className="text-slate-500 italic">Aucun bonus actif</span>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: ACTIVE EQUIPMENT PAPERDOLL GRID */}
        <div className="lg:col-span-4 bg-[#0c0c0e] border border-[#1a1a1a] rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-slate-500 tracking-widest uppercase mb-4 text-center">🛡️ Équipé sur vous</h3>
            
            <div className="grid grid-cols-2 gap-3">
              {(Object.keys(SLOT_LABELS) as EquipmentSlot[]).map((slotKey) => {
                const item = getEquipped(slotKey);
                const slotMeta = SLOT_LABELS[slotKey];
                const rarityStyle = item ? RARITY_LABELS[item.rarity] : null;

                return (
                  <div
                    key={slotKey}
                    onClick={() => item && onToggleEquip(item.id)}
                    className={`group relative rounded-xl border p-3 flex flex-col items-center justify-center text-center transition cursor-pointer min-h-[100px] ${
                      item 
                        ? `${rarityStyle?.border} ${rarityStyle?.bg} hover:border-red-500/40 hover:bg-red-950/10` 
                        : 'border-dashed border-[#1a1a1a] bg-[#0c0c0e]/40 hover:border-slate-800'
                    }`}
                  >
                    <span className="text-3xl mb-1 group-hover:scale-110 transition duration-300">
                      {item ? item.icon : slotMeta.icon}
                    </span>
                    <span className={`text-[10px] font-bold font-display ${item ? rarityStyle?.color : 'text-slate-500'}`}>
                      {item ? item.name : slotMeta.label}
                    </span>
                    
                    {item && (
                      <div className="absolute inset-0 bg-[#0c0c0e]/95 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center p-2 rounded-xl transition duration-200">
                        <span className="text-[10px] font-bold text-red-400 font-display uppercase tracking-wider mb-1">Déséquiper</span>
                        <div className="text-[8px] font-mono text-slate-400">
                          {Object.entries(item.statBonuses).map(([stat, val]) => (
                            <div key={stat}>+{val} {stat.substring(0,3).toUpperCase()}</div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 border-t border-[#1a1a1a] pt-4 text-center">
            <span className="text-[10px] font-mono text-slate-500 leading-relaxed block">
              Astuce : Cliquez sur un emplacement équipé à gauche pour retirer l'objet immédiatement.
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: BAGPACK AND FILTERS */}
        <div className="lg:col-span-8 space-y-4">
          {/* Filters Bar */}
          <div className="bg-[#111113] border border-[#1a1a1a] p-3.5 rounded-xl flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-400">Emplacement:</span>
              <select
                value={selectedSlotFilter}
                onChange={(e) => setSelectedSlotFilter(e.target.value)}
                className="bg-[#0c0c0e] border border-[#2a2a2a] focus:border-[#10b981] text-xs text-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none cursor-pointer"
              >
                <option value="all">Tous les emplacements</option>
                {Object.entries(SLOT_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>{v.icon} {v.label}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-400">Rareté:</span>
              <div className="flex gap-1">
                {['all', 'commun', 'rare', 'epique', 'mythique', 'divin'].map((rarity) => (
                  <button
                    key={rarity}
                    onClick={() => setSelectedRarityFilter(rarity)}
                    className={`px-2.5 py-1 rounded-md text-[10px] font-mono tracking-wider uppercase border transition cursor-pointer ${
                      selectedRarityFilter === rarity
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

          {/* Backpack List */}
          {filteredItems.length === 0 ? (
            <div className="bg-[#0c0c0e] border border-dashed border-[#1a1a1a] rounded-2xl p-12 text-center text-slate-500">
              <Backpack className="w-12 h-12 text-[#10b981]/10 mx-auto mb-3" />
              <p className="text-sm font-medium">Votre sac à dos est vide pour ces filtres.</p>
              <p className="text-xs mt-1 text-slate-600">
                Achetez de l'équipement légendaire dans la Boutique pour déverrouiller sa puissance !
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AnimatePresence>
                {filteredItems.map((item) => {
                  const rStyle = RARITY_LABELS[item.rarity];
                  const slotMeta = SLOT_LABELS[item.slot];

                  return (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className={`bg-[#111113]/90 border rounded-xl p-4 flex flex-col justify-between hover:bg-[#1a1a1a]/35 hover:border-[#2a2a2a] transition duration-300 group ${
                        item.isEquipped ? 'border-amber-500/20 bg-amber-950/[0.02]' : 'border-[#1a1a1a]'
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <div className={`p-2.5 rounded-xl border ${rStyle.border} ${rStyle.bg} ${rStyle.color}`}>
                            <span className="text-2xl">{item.icon}</span>
                          </div>

                          <div className="text-right">
                            <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${rStyle.border} ${rStyle.color} ${rStyle.bg}`}>
                              {rStyle.label}
                            </span>
                            <span className="block text-[8px] text-slate-500 font-mono mt-1">
                              {slotMeta.label}
                            </span>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-sm text-slate-200 font-display group-hover:text-[#10b981] transition">
                            {item.name}
                          </h4>
                          <p className="text-xs text-slate-400 mt-1 leading-relaxed font-sans h-8 line-clamp-2">
                            {item.description}
                          </p>
                        </div>

                        {/* Stat bonuses listing */}
                        <div className="bg-[#0c0c0e]/50 border border-[#1a1a1a]/40 p-2 rounded-lg">
                          <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">📈 Bonus de Statistiques</div>
                          <div className="flex flex-wrap gap-2 text-[10px] font-mono">
                            {Object.entries(item.statBonuses).map(([stat, val]) => {
                              const colors: Record<string, string> = {
                                vitality: 'text-red-400 bg-red-950/10',
                                wisdom: 'text-blue-400 bg-blue-950/10',
                                strength: 'text-orange-400 bg-orange-950/10',
                                serenity: 'text-teal-400 bg-teal-950/10',
                                magic: 'text-purple-400 bg-purple-950/10',
                              };
                              const label: Record<string, string> = {
                                vitality: 'Vitalité',
                                wisdom: 'Sagesse',
                                strength: 'Force',
                                serenity: 'Sérénité',
                                magic: 'Magie',
                              };
                              return (
                                <span key={stat} className={`px-1.5 py-0.5 rounded border border-transparent ${colors[stat] || 'text-slate-400 bg-[#111113]'}`}>
                                  +{val} {label[stat] || stat}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Equip / Unequip Action Button */}
                      <div className="mt-4 pt-3 border-t border-[#1a1a1a] flex justify-end">
                        <button
                          onClick={() => onToggleEquip(item.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                            item.isEquipped
                              ? 'bg-red-950/30 border border-red-500/30 text-red-400 hover:bg-red-950/50 hover:border-red-500'
                              : 'bg-gradient-to-r from-[#10b981] to-[#059669] text-slate-950 hover:opacity-95 shadow-md active:scale-95'
                          }`}
                        >
                          {item.isEquipped ? (
                            <>
                              <X className="w-3.5 h-3.5" />
                              Retirer
                            </>
                          ) : (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              Équiper
                            </>
                          )}
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
