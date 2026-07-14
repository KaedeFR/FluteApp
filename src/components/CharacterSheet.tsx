/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Character, StatCategory, EquipmentItem, CharacterStats, ItemRarity } from '../types';
import { 
  Shield, 
  BookOpen, 
  Crown, 
  Zap, 
  User, 
  Star, 
  Edit3, 
  Heart, 
  Sparkles, 
  Compass,
  Check,
  Flame,
  UserCheck,
  Lock,
  Trophy,
  Activity,
  Award,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import EvolutionFluteIcon from './EvolutionFluteIcon';
import { RpgIcon } from './RpgIcon';

interface CharacterSheetProps {
  character: Character;
  onUpdateCharacter: (updated: Character) => void;
  questsCompletedCount: number;
  dailiesCompletedCount: number;
  totalGoldEarned: number;
  equipment?: EquipmentItem[];
}

const AVATARS = [
  { id: 'warrior', emoji: '⚔️', label: 'Guerrier', bg: 'bg-red-950/40 border-red-500/30 text-red-400' },
  { id: 'mage', emoji: '🧙‍♂️', label: 'Magicien', bg: 'bg-purple-950/40 border-purple-500/30 text-purple-400' },
  { id: 'rogue', emoji: '🏹', label: 'Chasseur', bg: 'bg-emerald-950/40 border-emerald-500/30 text-emerald-400' },
  { id: 'paladin', emoji: '🛡️', label: 'Paladin', bg: 'bg-blue-950/40 border-blue-500/30 text-blue-400' },
  { id: 'bard', emoji: '🎭', label: 'Barde', bg: 'bg-pink-950/40 border-pink-500/30 text-pink-400' },
  { id: 'alchemist', emoji: '🧪', label: 'Alchimiste', bg: 'bg-amber-950/40 border-amber-500/30 text-amber-400' },
  { id: 'noble', emoji: '👑', label: 'Souverain', bg: 'bg-yellow-950/40 border-yellow-500/30 text-yellow-400' },
  { id: 'companion', emoji: '🐱', label: 'Aventurier Félin', bg: 'bg-slate-950/40 border-slate-500/30 text-slate-400' },
];

export const RACES = [
  { 
    id: 'humain', 
    name: 'Humain', 
    emoji: '🧔', 
    desc: 'S\'adapte à toutes les situations.', 
    bonus: { vitality: 2, wisdom: 0, strength: 0, serenity: 0, magic: 0 }, 
    bonusLabel: '+2 Vitalité', 
    color: 'from-amber-500/10 to-yellow-600/10 border-yellow-500/30 text-yellow-400' 
  },
  { 
    id: 'elfe', 
    name: 'Elfe', 
    emoji: '🧝‍♀️', 
    desc: 'Privilégie l\'intellect et la sagesse ancienne.', 
    bonus: { vitality: 0, wisdom: 2, strength: 0, serenity: 0, magic: 0 }, 
    bonusLabel: '+2 Sagesse', 
    color: 'from-blue-500/10 to-indigo-600/10 border-blue-500/30 text-blue-400' 
  },
  { 
    id: 'nain', 
    name: 'Nain', 
    emoji: '🧔‍♂️', 
    desc: 'Robustesse et force physique légendaires.', 
    bonus: { vitality: 0, wisdom: 0, strength: 2, serenity: 0, magic: 0 }, 
    bonusLabel: '+2 Force', 
    color: 'from-orange-500/10 to-red-600/10 border-orange-500/30 text-orange-400' 
  },
  { 
    id: 'orc', 
    name: 'Orc', 
    emoji: '👹', 
    desc: 'Détermination physique et volonté d\'acier.', 
    bonus: { vitality: 0, wisdom: 0, strength: 0, serenity: 2, magic: 0 }, 
    bonusLabel: '+2 Sérénité', 
    color: 'from-teal-500/10 to-emerald-600/10 border-teal-500/30 text-teal-400' 
  },
  { 
    id: 'draconien', 
    name: 'Draconien', 
    emoji: '🐲', 
    desc: 'Noble descendant magique des anciens dragons.', 
    bonus: { vitality: 0, wisdom: 0, strength: 0, serenity: 0, magic: 2 }, 
    bonusLabel: '+2 Magie', 
    color: 'from-purple-500/10 to-pink-600/10 border-purple-500/30 text-purple-400' 
  }
];

export interface CharacterEvolution {
  tier: number;
  minLevel: number;
  title: string;
  emoji: string;
  description: string;
  bonus: string;
  color: string;
  borderColor: string;
  glowClass: string;
}

export const EVOLUTIONS: CharacterEvolution[] = [
  {
    tier: 1,
    minLevel: 1,
    title: 'Flûtiste débutant',
    emoji: '🪈',
    description: 'Chaque note de votre instrument pose les bases d\'une nouvelle discipline de vie.',
    bonus: 'Sifflement de base stable',
    color: 'text-slate-400 bg-slate-950/60 border-slate-800',
    borderColor: 'border-slate-800',
    glowClass: 'shadow-slate-500/5'
  },
  {
    tier: 2,
    minLevel: 20,
    title: 'Apprenti Flûte',
    emoji: '🎵',
    description: 'Vos habitudes se stabilisent. Vos doigts glissent avec précision sur les trous de la régularité.',
    bonus: '+10% Résistance aux échecs',
    color: 'text-emerald-400 bg-emerald-950/25 border-emerald-500/30',
    borderColor: 'border-emerald-500/30',
    glowClass: 'shadow-emerald-500/10'
  },
  {
    tier: 3,
    minLevel: 40,
    title: 'Pipoteur confirmé',
    emoji: '🎶',
    description: 'Un souffle d\'énergie pure alimente votre quotidien. Votre discipline n\'est pas du pipeau.',
    bonus: '+15% XP gagnée',
    color: 'text-blue-400 bg-blue-950/25 border-blue-500/30',
    borderColor: 'border-blue-500/30',
    glowClass: 'shadow-blue-500/10'
  },
  {
    tier: 4,
    minLevel: 60,
    title: 'La flûte est la voie',
    emoji: '✨',
    description: 'La mélodie de vos quêtes résonne en parfaite harmonie avec vos objectifs de vie.',
    bonus: '+20% d\'Or gagné',
    color: 'text-[#10b981] bg-emerald-950/20 border-[#10b981]/30',
    borderColor: 'border-[#10b981]/30',
    glowClass: 'shadow-[#10b981]/15'
  },
  {
    tier: 5,
    minLevel: 80,
    title: 'Flûteur transcendental',
    emoji: '🌟',
    description: 'Une symphonie d\'ondes positives émane de votre être, dissipant tous les doutes.',
    bonus: '+25% Régénération PV',
    color: 'text-purple-400 bg-purple-950/25 border-purple-500/30',
    borderColor: 'border-purple-500/30',
    glowClass: 'shadow-purple-500/15'
  },
  {
    tier: 6,
    minLevel: 100,
    title: 'Dieu Flûtant céleste',
    emoji: '🌌',
    description: 'Éveil suprême. Votre souffle harmonieux module le tissu même de la réalité.',
    bonus: 'Multiplicateur x1.5 et Titre Suprême',
    color: 'text-rose-400 bg-rose-950/25 border-rose-500/30',
    borderColor: 'border-rose-500/30',
    glowClass: 'shadow-rose-500/20'
  }
];

export function CharacterSheet({
  character,
  onUpdateCharacter,
  questsCompletedCount,
  dailiesCompletedCount,
  totalGoldEarned,
  equipment = [],
}: CharacterSheetProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(character.name);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);

  // Physical Metrics state
  const [isEditingMetrics, setIsEditingMetrics] = useState(false);
  const [tempWeight, setTempWeight] = useState(character.weight || 70);
  const [tempHeight, setTempHeight] = useState(character.height || 175);
  const [tempWeightGoal, setTempWeightGoal] = useState(character.weightGoal || 68);

  // Equipment helpers
  const getStatBonus = (stat: keyof CharacterStats) => {
    return equipment
      .filter(e => e.isEquipped)
      .reduce((sum, item) => sum + (item.statBonuses[stat] || 0), 0);
  };

  const getRaceBonus = (stat: keyof CharacterStats) => {
    const activeRace = RACES.find(r => r.id === (character.raceId || 'humain')) || RACES[0];
    return activeRace.bonus[stat] || 0;
  };

  const totalVitality = (character.stats.vitality || 0) + getStatBonus('vitality') + getRaceBonus('vitality');
  const totalWisdom = (character.stats.wisdom || 0) + getStatBonus('wisdom') + getRaceBonus('wisdom');
  const totalStrength = (character.stats.strength || 0) + getStatBonus('strength') + getRaceBonus('strength');
  const totalSerenity = (character.stats.serenity || 0) + getStatBonus('serenity') + getRaceBonus('serenity');
  const totalMagic = (character.stats.magic || 0) + getStatBonus('magic') + getRaceBonus('magic');

  const calculateBMI = (w: number, h: number) => {
    if (!w || !h) return '0.0';
    const hM = h / 100;
    return (w / (hM * hM)).toFixed(1);
  };

  const getBMICategory = (w: number, h: number) => {
    if (!w || !h) return '—';
    const hM = h / 100;
    const bmi = w / (hM * hM);
    if (bmi < 18.5) return 'Insuffisance';
    if (bmi < 25) return 'Normal';
    if (bmi < 30) return 'Surpoids';
    return 'Obésité';
  };

  const activeAvatar = AVATARS.find(av => av.id === character.avatarId) || AVATARS[0];

  const handleSaveName = () => {
    if (tempName.trim()) {
      onUpdateCharacter({
        ...character,
        name: tempName.trim(),
      });
      setIsEditing(false);
    }
  };

  const handleSelectAvatar = (avatarId: string) => {
    onUpdateCharacter({
      ...character,
      avatarId,
    });
    setShowAvatarPicker(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdateCharacter({
          ...character,
          customAvatar: reader.result as string,
          avatarId: 'custom',
        });
        setShowAvatarPicker(false);
      };
      reader.readAsDataURL(file);
    }
  };

  // Compute active evolution tier
  const currentLevel = character.level || 1;
  const currentEvolution = [...EVOLUTIONS]
    .sort((a, b) => b.minLevel - a.minLevel)
    .find(e => currentLevel >= e.minLevel) || EVOLUTIONS[0];

  // Compute the max XP needed for current level
  const xpNeeded = Math.round(100 * Math.pow(character.level, 1.5));
  const xpPercent = Math.min(100, (character.xp / xpNeeded) * 100);
  const hpPercent = Math.min(100, (character.hp / character.maxHp) * 100);

  // Radar Chart coordinates (smaller radius 65 instead of 75 for dense layout)
  const maxStatVal = Math.max(
    10, 
    totalVitality, 
    totalWisdom, 
    totalStrength, 
    totalSerenity,
    totalMagic
  );

  const getPoints = () => {
    const rV = (totalVitality / maxStatVal) * 65;
    const rW = (totalWisdom / maxStatVal) * 65;
    const rST = (totalStrength / maxStatVal) * 65;
    const rSE = (totalSerenity / maxStatVal) * 65;
    const rM = (totalMagic / maxStatVal) * 65;

    const angleV = -Math.PI / 2;
    const angleW = -Math.PI / 2 + (2 * Math.PI / 5);
    const angleST = -Math.PI / 2 + (4 * Math.PI / 5);
    const angleSE = -Math.PI / 2 + (6 * Math.PI / 5);
    const angleM = -Math.PI / 2 + (8 * Math.PI / 5);

    const xV = 100 + rV * Math.cos(angleV);
    const yV = 100 + rV * Math.sin(angleV);
    const xW = 100 + rW * Math.cos(angleW);
    const yW = 100 + rW * Math.sin(angleW);
    const xST = 100 + rST * Math.cos(angleST);
    const yST = 100 + rST * Math.sin(angleST);
    const xSE = 100 + rSE * Math.cos(angleSE);
    const ySE = 100 + rSE * Math.sin(angleSE);
    const xM = 100 + rM * Math.cos(angleM);
    const yM = 100 + rM * Math.sin(angleM);

    return `${xV},${yV} ${xW},${yW} ${xST},${yST} ${xSE},${ySE} ${xM},${yM}`;
  };

  const getPentagonPoints = (radius: number) => {
    const angleV = -Math.PI / 2;
    const angleW = -Math.PI / 2 + (2 * Math.PI / 5);
    const angleST = -Math.PI / 2 + (4 * Math.PI / 5);
    const angleSE = -Math.PI / 2 + (6 * Math.PI / 5);
    const angleM = -Math.PI / 2 + (8 * Math.PI / 5);

    const xV = 100 + radius * Math.cos(angleV);
    const yV = 100 + radius * Math.sin(angleV);
    const xW = 100 + radius * Math.cos(angleW);
    const yW = 100 + radius * Math.sin(angleW);
    const xST = 100 + radius * Math.cos(angleST);
    const yST = 100 + radius * Math.sin(angleST);
    const xSE = 100 + radius * Math.cos(angleSE);
    const ySE = 100 + radius * Math.sin(angleSE);
    const xM = 100 + radius * Math.cos(angleM);
    const yM = 100 + radius * Math.sin(angleM);

    return `${xV},${yV} ${xW},${yW} ${xST},${yST} ${xSE},${ySE} ${xM},${yM}`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* ================= PROFIL DU HÉROS (Col-span 5) ================= */}
      <div className="lg:col-span-5 bg-[#0c0c0e] border border-[#1a1a1a] rounded-2xl p-6 relative overflow-hidden flex flex-col items-center">
        {/* Glow décoratif de fond */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#10b981]/5 rounded-full blur-3xl pointer-events-none" />

        {/* Badge Niveau */}
        <div className="absolute top-4 right-4 bg-[#111113]/90 border border-[#2a2a2a] px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg z-10">
          <Star className="w-4 h-4 text-[#10b981] fill-[#10b981]/10 animate-spin-slow" />
          <span className="font-mono text-xs text-[#10b981] font-bold">LVL {character.level}</span>
        </div>

        {/* REPRÉSENTATION DU PORTRAIT RPG (Revised, Clean, Majestic Card Design) */}
        <div className="relative mt-4 mb-4 flex flex-col items-center select-none w-full">
          {/* Portrait Container */}
          <div className="relative w-40 h-44 rounded-2xl border-2 border-[#10b981]/40 bg-gradient-to-b from-[#111113] to-[#070709] shadow-2xl flex items-center justify-center overflow-hidden group">
            {/* Runes / Decorative circles behind */}
            <div className="absolute w-28 h-28 border border-dashed border-[#10b981]/10 rounded-full animate-[spin_40s_linear_infinite]" />
            <div className="absolute w-20 h-20 border border-dashed border-red-500/5 rounded-full animate-[spin_20s_linear_reverse_infinite]" />

            {/* Inner avatar representation */}
            <button
              id="change-avatar-btn-revised"
              onClick={() => setShowAvatarPicker(!showAvatarPicker)}
              className="relative w-24 h-24 rounded-2xl flex flex-col items-center justify-center text-6xl transition hover:scale-110 active:scale-95 duration-300 z-10 cursor-pointer"
              title="Changer d'avatar de profil"
            >
              {character.customAvatar && character.avatarId === 'custom' ? (
                <img src={character.customAvatar} alt="Profile" className="w-20 h-20 object-cover rounded-xl border border-[#1a1a1a]" referrerPolicy="no-referrer" />
              ) : (
                <span className="drop-shadow-[0_4px_12px_rgba(197,160,89,0.3)] animate-pulse-slow">
                  {character.avatarId === 'custom' ? '👤' : (AVATARS.find(av => av.id === character.avatarId)?.emoji || '🧔')}
                </span>
              )}
              
              {/* Overlay edit state */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-300 rounded-2xl">
                <Edit3 className="w-5 h-5 text-[#10b981]" />
              </div>
            </button>

            {/* Metallic corners style decoration */}
            <div className="absolute top-1 left-1 w-2.5 h-2.5 border-t border-l border-[#10b981]/40" />
            <div className="absolute top-1 right-1 w-2.5 h-2.5 border-t border-r border-[#10b981]/40" />
            <div className="absolute bottom-1 left-1 w-2.5 h-2.5 border-b border-l border-[#10b981]/40" />
            <div className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b border-r border-[#10b981]/40" />
          </div>

          {/* Active Evolution Badge under Portrait */}
          <div className="mt-3 flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-[#111113] to-[#0c0c0e] border border-[#2a2a2a] shadow-md">
            <EvolutionFluteIcon tier={currentEvolution.tier} size="sm" className="w-5 h-5" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#10b981] font-bold">
              {currentEvolution.title}
            </span>
          </div>
        </div>

        {/* Picker d'Avatar Overlay */}
        <AnimatePresence>
          {showAvatarPicker && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute inset-x-6 top-28 bg-[#111113]/98 border border-[#10b981]/30 rounded-xl p-4 shadow-2xl z-30"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="text-xs font-semibold text-slate-300 tracking-wider uppercase font-display">Choisissez votre Avatar</div>
                <button 
                  onClick={() => setShowAvatarPicker(false)}
                  className="text-slate-500 hover:text-slate-300"
                >
                  <Lock className="w-3.5 h-3.5 rotate-45" />
                </button>
              </div>
              
              <div className="grid grid-cols-4 gap-2">
                {AVATARS.map((av) => (
                  <button
                    key={av.id}
                    id={`avatar-option-${av.id}`}
                    onClick={() => handleSelectAvatar(av.id)}
                    className={`p-2.5 rounded-lg text-2xl border text-center transition hover:bg-slate-800 hover:border-[#10b981]/50 ${character.avatarId === av.id ? 'border-[#10b981] bg-[#10b981]/10' : 'border-[#1a1a1a]'}`}
                    title={av.label}
                  >
                    {av.emoji}
                  </button>
                ))}
                {character.customAvatar && (
                  <button
                    id="avatar-option-custom"
                    onClick={() => handleSelectAvatar('custom')}
                    className={`p-1 rounded-lg border text-center transition hover:bg-slate-800 hover:border-[#10b981]/50 overflow-hidden h-12 flex items-center justify-center ${character.avatarId === 'custom' ? 'border-[#10b981] bg-[#10b981]/10' : 'border-[#1a1a1a]'}`}
                    title="Photo de profil importée"
                  >
                    <img src={character.customAvatar} alt="Custom" className="w-8 h-8 object-cover rounded" referrerPolicy="no-referrer" />
                  </button>
                )}
              </div>

              {/* Upload Input */}
              <div className="mt-4 pt-3 border-t border-[#2a2a2a] flex flex-col items-center gap-1.5">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">Ou importez votre image</span>
                <label className="cursor-pointer bg-gradient-to-r from-purple-900/40 to-indigo-900/40 hover:from-purple-800/40 hover:to-indigo-800/40 border border-purple-500/20 text-purple-300 px-3 py-1.5 rounded-lg text-[10px] font-semibold tracking-wider uppercase transition flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5" />
                  Sélectionner un fichier
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload} 
                    className="hidden" 
                  />
                </label>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Nom & Titre */}
        <div className="text-center w-full px-4 mb-4">
          {isEditing ? (
            <div className="flex items-center gap-2 max-w-xs mx-auto">
              <input
                id="edit-name-input"
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                maxLength={20}
                className="w-full bg-[#111113] border border-[#2a2a2a] text-slate-100 rounded-lg px-3 py-1.5 text-center focus:outline-none focus:border-[#10b981] font-display font-medium text-lg"
                autoFocus
                onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
              />
              <button
                id="save-name-btn"
                onClick={handleSaveName}
                className="p-2 bg-gradient-to-r from-[#10b981] to-[#059669] hover:opacity-90 text-slate-950 rounded-lg font-bold transition shrink-0"
              >
                <Check className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 group cursor-pointer" onClick={() => setIsEditing(true)}>
              <h2 className="text-2xl font-bold font-display text-slate-100 tracking-wide hover:text-[#10b981] transition">{character.name}</h2>
              <Edit3 className="w-4 h-4 text-slate-500 group-hover:text-[#10b981] transition" />
            </div>
          )}
          <div className="text-[#10b981] text-xs font-semibold tracking-widest uppercase font-mono mt-1.5 flex items-center justify-center gap-1">
            <Sparkles className="w-3 h-3 animate-pulse" />
            {character.classTitle}
          </div>
        </div>

        {/* Système d'Origine / Sélection des Races */}
        <div className="w-full bg-[#111113]/60 border border-[#1a1a1a]/80 rounded-xl p-3 mb-5 space-y-2 text-center">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center justify-end px-1">
            <span className="text-[9px] text-[#10b981] font-semibold uppercase font-mono">Bonus Actif</span>
          </div>
          <div className="flex items-center gap-3 bg-[#0c0c0e]/60 border border-[#1a1a1a] rounded-lg p-3">
            {(() => {
              const currentRaceId = character.raceId || 'humain';
              const r = RACES.find(race => race.id === currentRaceId) || RACES[0];
              return (
                <>
                  <span className="text-3xl">{r.emoji}</span>
                  <div className="text-left">
                    <span className="text-sm font-bold text-slate-200 block font-display tracking-wide uppercase">{r.name}</span>
                    <span className="text-[10px] text-[#10b981] font-semibold font-mono uppercase tracking-wider block mt-1">{r.bonusLabel}</span>
                  </div>
                </>
              );
            })()}
          </div>
        </div>

        {/* Barre de PV (HP) */}
        <div className="w-full space-y-1 mb-4">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-red-400 font-bold flex items-center gap-1.5">
              <RpgIcon iconType="hp" size="xs" className="w-5 h-5 shrink-0" /> POINTS DE VIE (HP)
            </span>
            <span className="text-slate-300">{character.hp} / {character.maxHp}</span>
          </div>
          <div className="w-full bg-[#1a1a1a] h-3 rounded-full overflow-hidden border border-red-950/20 p-[2px]">
            <div 
              className="bg-gradient-to-r from-red-600 to-rose-500 h-full rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(220,38,38,0.3)]"
              style={{ width: `${hpPercent}%` }}
            />
          </div>
        </div>

        {/* Barre d'XP */}
        <div className="w-full space-y-1 mb-4">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-[#10b981] font-bold flex items-center gap-1.5">
              <RpgIcon iconType="xp" size="xs" className="w-5 h-5 shrink-0" /> EXPÉRIENCE (XP)
            </span>
            <span className="text-slate-300">{character.xp} / {xpNeeded}</span>
          </div>
          <div className="w-full bg-[#1a1a1a] h-3 rounded-full overflow-hidden border border-emerald-950/20 p-[2px]">
            <div 
              className="bg-gradient-to-r from-[#10b981] to-[#059669] h-full rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]"
              style={{ width: `${xpPercent}%` }}
            />
          </div>
        </div>

        {/* ÉQUIPEMENT ACTUEL GRID */}
        <div className="w-full border-t border-[#1a1a1a] pt-4 mt-2 mb-4">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 text-center">🛡️ Équipement</div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { key: 'head', label: 'Tête', item: equipment.find(e => e.isEquipped && e.slot === 'head') },
              { key: 'armor', label: 'Armure', item: equipment.find(e => e.isEquipped && e.slot === 'armor') },
              { key: 'weapon', label: 'Arme', item: equipment.find(e => e.isEquipped && e.slot === 'weapon') },
              { key: 'shield', label: 'Bouclier', item: equipment.find(e => e.isEquipped && e.slot === 'shield') },
              { key: 'ring', label: 'Anneau', item: equipment.find(e => e.isEquipped && e.slot === 'ring') },
              { key: 'boots', label: 'Bottes', item: equipment.find(e => e.isEquipped && e.slot === 'boots') },
            ].map((slot) => {
              const item = slot.item;
              return (
                <div 
                  key={slot.key}
                  className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center transition ${
                    item 
                      ? item.rarity === 'commun' ? 'border-slate-800 bg-slate-900/40 text-slate-300'
                        : item.rarity === 'rare' ? 'border-blue-500/30 bg-blue-950/30 text-blue-300'
                        : item.rarity === 'epique' ? 'border-purple-500/35 bg-purple-950/30 text-purple-300'
                        : item.rarity === 'mythique' ? 'border-orange-500/45 bg-orange-950/30 text-orange-300 animate-pulse'
                        : 'border-amber-500/50 bg-amber-950/35 text-amber-300 font-semibold animate-pulse'
                      : 'border-dashed border-[#1a1a1a] bg-[#0c0c0e]/30 text-slate-600'
                  }`}
                  title={item ? `${item.name} (${item.rarity.toUpperCase()})` : `Vide (${slot.label})`}
                >
                  <RpgIcon iconType={item ? item.icon : slot.key} size="md" className="w-12 h-12 mb-1" rarity={item?.rarity} />
                  <span className="text-[8px] font-mono uppercase tracking-wider block overflow-hidden text-ellipsis whitespace-nowrap max-w-full">
                    {item ? item.name : slot.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Statistiques Cumulées rapides */}
        <div className="w-full grid grid-cols-3 gap-2 border-t border-[#1a1a1a] pt-4 mt-2">
          <div className="text-center">
            <div className="text-lg font-bold font-mono text-slate-100">{questsCompletedCount}</div>
            <div className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">Quêtes</div>
          </div>
          <div className="text-center border-x border-[#1a1a1a]">
            <div className="text-lg font-bold font-mono text-amber-400 flex items-center justify-center gap-1.5">
              <RpgIcon iconType="gold" size="xs" className="w-5 h-5" />{character.gold}
            </div>
            <div className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">Or actuel</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold font-mono text-slate-100">{totalGoldEarned}</div>
            <div className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">Or total</div>
          </div>
        </div>

        {/* Suivi des Métriques Physiques */}
        <div className="w-full border-t border-[#1a1a1a] pt-4 mt-4 space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-display flex items-center gap-1.5">
              <RpgIcon iconType="mensurations" size="xs" className="w-5 h-5" /> Mensurations
            </h3>
            <button
              id="edit-metrics-btn"
              type="button"
              onClick={() => {
                if (isEditingMetrics) {
                  onUpdateCharacter({
                    ...character,
                    weight: tempWeight,
                    height: tempHeight,
                    weightGoal: tempWeightGoal,
                  });
                } else {
                  setTempWeight(character.weight || 70);
                  setTempHeight(character.height || 175);
                  setTempWeightGoal(character.weightGoal || 68);
                }
                setIsEditingMetrics(!isEditingMetrics);
              }}
              className="text-[10px] font-bold text-[#10b981] uppercase tracking-wider hover:underline flex items-center gap-1 cursor-pointer"
            >
              {isEditingMetrics ? "Enregistrer" : "Modifier"}
            </button>
          </div>

          {isEditingMetrics ? (
            <div className="grid grid-cols-3 gap-2 w-full">
              <div className="space-y-1">
                <label className="text-[9px] text-slate-500 uppercase tracking-wider block font-bold">Taille (cm)</label>
                <input
                  id="metrics-height-input"
                  type="number"
                  value={tempHeight || ''}
                  onChange={(e) => setTempHeight(parseFloat(e.target.value) || 0)}
                  placeholder="175"
                  className="w-full bg-[#111113] border border-[#2a2a2a] text-slate-100 rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-[#10b981] text-center font-mono"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] text-slate-500 uppercase tracking-wider block font-bold">Poids (kg)</label>
                <input
                  id="metrics-weight-input"
                  type="number"
                  value={tempWeight || ''}
                  onChange={(e) => setTempWeight(parseFloat(e.target.value) || 0)}
                  placeholder="70"
                  className="w-full bg-[#111113] border border-[#2a2a2a] text-slate-100 rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-[#10b981] text-center font-mono"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] text-slate-500 uppercase tracking-wider block font-bold">Objectif (kg)</label>
                <input
                  id="metrics-goal-input"
                  type="number"
                  value={tempWeightGoal || ''}
                  onChange={(e) => setTempWeightGoal(parseFloat(e.target.value) || 0)}
                  placeholder="68"
                  className="w-full bg-[#111113] border border-[#2a2a2a] text-slate-100 rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-[#10b981] text-center font-mono"
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2 w-full bg-[#111113]/50 p-2.5 rounded-xl border border-[#1a1a1a]/50">
              <div className="text-center">
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Taille</div>
                <div className="text-xs font-bold font-mono text-slate-200 mt-0.5">
                  {character.height ? `${character.height} cm` : '—'}
                </div>
              </div>
              <div className="text-center border-x border-[#1a1a1a]/40">
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Poids</div>
                <div className="text-xs font-bold font-mono text-slate-200 mt-0.5">
                  {character.weight ? `${character.weight} kg` : '—'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Objectif</div>
                <div className="text-xs font-bold font-mono text-slate-200 mt-0.5">
                  {character.weightGoal ? `${character.weightGoal} kg` : '—'}
                </div>
              </div>
            </div>
          )}

          {/* BMI (IMC) and Goal Progression badges */}
          {!isEditingMetrics && (character.weight || character.height || character.weightGoal) ? (
            <div className="flex flex-wrap gap-2 justify-center pt-1 w-full">
              {character.weight && character.height ? (
                <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-blue-950/30 border border-blue-900/30 text-blue-400">
                  IMC: {calculateBMI(character.weight, character.height)} ({getBMICategory(character.weight, character.height)})
                </span>
              ) : null}
              {character.weight && character.weightGoal ? (
                <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border ${
                  character.weight === character.weightGoal 
                    ? 'bg-emerald-950/30 border-emerald-900/30 text-emerald-400' 
                    : 'bg-emerald-950/30 border-emerald-900/30 text-[#10b981]'
                }`}>
                  Écart: {character.weight > character.weightGoal ? '+' : ''}{(character.weight - character.weightGoal).toFixed(1)} kg
                </span>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>

      {/* ================= STATISTIQUES & ÉVOLUTION (Col-span 7) ================= */}
      <div className="lg:col-span-7 flex flex-col gap-6 w-full">
        
        {/* COMPACT ATTRIBUTES & Life Balance Card */}
        <div className="bg-[#111113] border border-[#1a1a1a] rounded-2xl p-5 relative overflow-hidden">
          <div className="flex items-center gap-2 border-b border-[#1a1a1a] pb-3 mb-4">
            <Activity className="w-4 h-4 text-[#10b981]" />
            <h3 className="text-sm font-semibold text-slate-200 tracking-wider font-display uppercase">Attributs</h3>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Left: Compact Radar Chart (optimized with smaller size and centered layout) */}
            <div className="flex flex-col items-center justify-center shrink-0 w-full md:w-auto">
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg viewBox="0 0 200 200" className="w-full h-full text-slate-800">
                  {/* Concentric Pentagons */}
                  <polygon points={getPentagonPoints(65)} fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
                  <polygon points={getPentagonPoints(43)} fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
                  <polygon points={getPentagonPoints(21)} fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />

                  {/* Axis lines from center (100, 100) to pentagon vertices */}
                  {(() => {
                    const angleV = -Math.PI / 2;
                    const angleW = -Math.PI / 2 + (2 * Math.PI / 5);
                    const angleST = -Math.PI / 2 + (4 * Math.PI / 5);
                    const angleSE = -Math.PI / 2 + (6 * Math.PI / 5);
                    const angleM = -Math.PI / 2 + (8 * Math.PI / 5);

                    return (
                      <>
                        <line x1="100" y1="100" x2={100 + 65 * Math.cos(angleV)} y2={100 + 65 * Math.sin(angleV)} stroke="currentColor" strokeWidth="0.5" />
                        <line x1="100" y1="100" x2={100 + 65 * Math.cos(angleW)} y2={100 + 65 * Math.sin(angleW)} stroke="currentColor" strokeWidth="0.5" />
                        <line x1="100" y1="100" x2={100 + 65 * Math.cos(angleST)} y2={100 + 65 * Math.sin(angleST)} stroke="currentColor" strokeWidth="0.5" />
                        <line x1="100" y1="100" x2={100 + 65 * Math.cos(angleSE)} y2={100 + 65 * Math.sin(angleSE)} stroke="currentColor" strokeWidth="0.5" />
                        <line x1="100" y1="100" x2={100 + 65 * Math.cos(angleM)} y2={100 + 65 * Math.sin(angleM)} stroke="currentColor" strokeWidth="0.5" />
                      </>
                    );
                  })()}

                  {/* Radar Polygon Shape */}
                  <polygon
                    points={getPoints()}
                    fill="rgba(16, 185, 129, 0.12)"
                    stroke="#10b981"
                    strokeWidth="1.5"
                    className="transition-all duration-700"
                  />

                  {/* Axis labels with optimized coordinates */}
                  <text x="100" y="20" fill="#ef4444" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">VIT</text>
                  <text x="175" y="80" fill="#3b82f6" fontSize="10" fontWeight="bold" textAnchor="start" fontFamily="sans-serif">SAG</text>
                  <text x="150" y="170" fill="#f97316" fontSize="10" fontWeight="bold" textAnchor="start" fontFamily="sans-serif">FOR</text>
                  <text x="50" y="170" fill="#14b8a6" fontSize="10" fontWeight="bold" textAnchor="end" fontFamily="sans-serif">SER</text>
                  <text x="25" y="80" fill="#a855f7" fontSize="10" fontWeight="bold" textAnchor="end" fontFamily="sans-serif">MAG</text>
                </svg>
              </div>
            </div>

            {/* Right: Highly Compact, JRPG-Style list of 5 statistics (Removes empty/unnecessary vertical spaces) */}
            <div className="flex-1 w-full space-y-2.5">
              
              {/* Vitalité */}
              <div className="bg-[#0c0c0e]/40 border border-[#1a1a1a]/60 rounded-xl p-3 flex items-center gap-3">
                <div className="p-1 bg-[#0c0c0e]/80 rounded-xl border border-red-500/20 shadow-inner shrink-0">
                  <RpgIcon iconType="vitality" size="sm" className="w-10 h-10" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="text-red-400 font-extrabold uppercase tracking-wide">Vitalité</span>
                    <div className="font-mono font-bold text-slate-200 flex items-center gap-1">
                      <span>{totalVitality} pts</span>
                      {getRaceBonus('vitality') > 0 && (
                        <span className="text-[#10b981] text-[8px] px-1 bg-[#10b981]/10 rounded border border-[#10b981]/15" title="Bonus Race">+{getRaceBonus('vitality')}🧬</span>
                      )}
                      {getStatBonus('vitality') > 0 && (
                        <span className="text-green-400 text-[8px] px-1 bg-green-950/20 rounded border border-green-900/15" title="Bonus Équipement">+{getStatBonus('vitality')}🛡️</span>
                      )}
                    </div>
                  </div>
                  <div className="w-full bg-[#18181b] h-2 rounded-full overflow-hidden border border-[#27272a]/20">
                    <div 
                      className="bg-gradient-to-r from-red-600 to-rose-500 h-full rounded-full transition-all duration-700"
                      style={{ width: `${Math.min(100, (totalVitality / maxStatVal) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Sagesse */}
              <div className="bg-[#0c0c0e]/40 border border-[#1a1a1a]/60 rounded-xl p-3 flex items-center gap-3">
                <div className="p-1 bg-[#0c0c0e]/80 rounded-xl border border-blue-500/20 shadow-inner shrink-0">
                  <RpgIcon iconType="wisdom" size="sm" className="w-10 h-10" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="text-blue-400 font-extrabold uppercase tracking-wide">Sagesse</span>
                    <div className="font-mono font-bold text-slate-200 flex items-center gap-1">
                      <span>{totalWisdom} pts</span>
                      {getRaceBonus('wisdom') > 0 && (
                        <span className="text-[#10b981] text-[8px] px-1 bg-[#10b981]/10 rounded border border-[#10b981]/15" title="Bonus Race">+{getRaceBonus('wisdom')}🧬</span>
                      )}
                      {getStatBonus('wisdom') > 0 && (
                        <span className="text-green-400 text-[8px] px-1 bg-green-950/20 rounded border border-green-900/15" title="Bonus Équipement">+{getStatBonus('wisdom')}🛡️</span>
                      )}
                    </div>
                  </div>
                  <div className="w-full bg-[#18181b] h-2 rounded-full overflow-hidden border border-[#27272a]/20">
                    <div 
                      className="bg-gradient-to-r from-blue-600 to-cyan-500 h-full rounded-full transition-all duration-700"
                      style={{ width: `${Math.min(100, (totalWisdom / maxStatVal) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Force */}
              <div className="bg-[#0c0c0e]/40 border border-[#1a1a1a]/60 rounded-xl p-3 flex items-center gap-3">
                <div className="p-1 bg-[#0c0c0e]/80 rounded-xl border border-orange-500/20 shadow-inner shrink-0">
                  <RpgIcon iconType="strength" size="sm" className="w-10 h-10" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="text-orange-400 font-extrabold uppercase tracking-wide">Force</span>
                    <div className="font-mono font-bold text-slate-200 flex items-center gap-1">
                      <span>{totalStrength} pts</span>
                      {getRaceBonus('strength') > 0 && (
                        <span className="text-[#10b981] text-[8px] px-1 bg-[#10b981]/10 rounded border border-[#10b981]/15" title="Bonus Race">+{getRaceBonus('strength')}🧬</span>
                      )}
                      {getStatBonus('strength') > 0 && (
                        <span className="text-green-400 text-[8px] px-1 bg-green-950/20 rounded border border-green-900/15" title="Bonus Équipement">+{getStatBonus('strength')}🛡️</span>
                      )}
                    </div>
                  </div>
                  <div className="w-full bg-[#18181b] h-2 rounded-full overflow-hidden border border-[#27272a]/20">
                    <div 
                      className="bg-gradient-to-r from-orange-600 to-amber-500 h-full rounded-full transition-all duration-700"
                      style={{ width: `${Math.min(100, (totalStrength / maxStatVal) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Sérénité */}
              <div className="bg-[#0c0c0e]/40 border border-[#1a1a1a]/60 rounded-xl p-3 flex items-center gap-3">
                <div className="p-1 bg-[#0c0c0e]/80 rounded-xl border border-teal-500/20 shadow-inner shrink-0">
                  <RpgIcon iconType="serenity" size="sm" className="w-10 h-10" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="text-teal-400 font-extrabold uppercase tracking-wide">Sérénité</span>
                    <div className="font-mono font-bold text-slate-200 flex items-center gap-1">
                      <span>{totalSerenity} pts</span>
                      {getRaceBonus('serenity') > 0 && (
                        <span className="text-[#10b981] text-[8px] px-1 bg-[#10b981]/10 rounded border border-[#10b981]/15" title="Bonus Race">+{getRaceBonus('serenity')}🧬</span>
                      )}
                      {getStatBonus('serenity') > 0 && (
                        <span className="text-green-400 text-[8px] px-1 bg-green-950/20 rounded border border-green-900/15" title="Bonus Équipement">+{getStatBonus('serenity')}🛡️</span>
                      )}
                    </div>
                  </div>
                  <div className="w-full bg-[#18181b] h-2 rounded-full overflow-hidden border border-[#27272a]/20">
                    <div 
                      className="bg-gradient-to-r from-teal-600 to-emerald-500 h-full rounded-full transition-all duration-700"
                      style={{ width: `${Math.min(100, (totalSerenity / maxStatVal) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Magie */}
              <div className="bg-[#0c0c0e]/40 border border-[#1a1a1a]/60 rounded-xl p-3 flex items-center gap-3">
                <div className="p-1 bg-[#0c0c0e]/80 rounded-xl border border-purple-500/20 shadow-inner shrink-0">
                  <RpgIcon iconType="magic" size="sm" className="w-10 h-10" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="text-purple-400 font-extrabold uppercase tracking-wide">Magie</span>
                    <div className="font-mono font-bold text-slate-200 flex items-center gap-1">
                      <span>{totalMagic} pts</span>
                      {getRaceBonus('magic') > 0 && (
                        <span className="text-[#10b981] text-[8px] px-1 bg-[#10b981]/10 rounded border border-[#10b981]/15" title="Bonus Race">+{getRaceBonus('magic')}🧬</span>
                      )}
                      {getStatBonus('magic') > 0 && (
                        <span className="text-green-400 text-[8px] px-1 bg-green-950/20 rounded border border-green-900/15" title="Bonus Équipement">+{getStatBonus('magic')}🛡️</span>
                      )}
                    </div>
                  </div>
                  <div className="w-full bg-[#18181b] h-2 rounded-full overflow-hidden border border-[#27272a]/20">
                    <div 
                      className="bg-gradient-to-r from-purple-600 to-fuchsia-500 h-full rounded-full transition-all duration-700"
                      style={{ width: `${Math.min(100, (totalMagic / maxStatVal) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* CHARACTER EVOLUTIONS SECTION (Evolutions de Personnage) */}
        <div className="bg-[#111113] border border-[#1a1a1a] rounded-2xl p-5 relative overflow-hidden">
          {/* Section Header */}
          <div className="flex items-center justify-between border-b border-[#1a1a1a] pb-3 mb-4">
            <div className="flex items-center gap-1.5">
              <RpgIcon iconType="evolution" size="xs" className="w-6 h-6" />
              <h3 className="text-sm font-semibold text-slate-200 tracking-wider font-display uppercase">Évolution</h3>
            </div>
            <div className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              Palier {currentEvolution.tier} / 6
            </div>
          </div>

          {/* Current Active Form Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center bg-gradient-to-r from-[#0c0c0e] to-[#111113] border border-[#1a1a1a]/60 rounded-xl p-5 mb-5">
            <div className="md:col-span-4 flex flex-col items-center justify-center text-center p-3 md:border-r border-[#1a1a1a]/40">
              <div className="mb-2 filter drop-shadow-[0_8px_24px_rgba(16,185,129,0.35)] transition-all hover:scale-110 duration-300">
                <EvolutionFluteIcon tier={currentEvolution.tier} size="xl" className="w-28 h-28 md:w-32 md:h-32" />
              </div>
              <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-emerald-400 mt-1">Forme Active</span>
            </div>
            <div className="md:col-span-8 space-y-2.5 text-center md:text-left">
              <h4 className="text-lg font-bold text-emerald-400 font-display flex items-center justify-center md:justify-start gap-2">
                <span>{currentEvolution.title}</span>
                <span className="text-xs font-mono text-slate-500 font-normal">(Dès le Niveau {currentEvolution.minLevel})</span>
              </h4>
              <p className="text-sm text-slate-300 italic font-sans leading-relaxed">
                "{currentEvolution.description}"
              </p>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-950/20 border border-emerald-900/40 text-emerald-300 text-xs font-mono font-bold">
                <Award className="w-4 h-4 text-emerald-400" />
                Bonus de Palier : {currentEvolution.bonus}
              </div>
            </div>
          </div>

          {/* Timeline Milestones Progression Map */}
          <div className="space-y-3">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">🗺️ Paliers d'évolution à atteindre</div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {EVOLUTIONS.map((ev) => {
                const isUnlocked = currentLevel >= ev.minLevel;
                const isActive = currentEvolution.tier === ev.tier;

                return (
                  <div
                    key={ev.tier}
                    className={`p-3 rounded-xl border flex gap-3 items-center relative transition-all duration-300 ${
                      isActive 
                        ? `${ev.color} ring-1 ring-[#10b981]/40 ${ev.glowClass}`
                        : isUnlocked
                          ? 'border-[#2a2a2a] bg-[#0c0c0e]/40 text-slate-300'
                          : 'border-[#1a1a1a]/80 bg-[#0c0c0e]/10 text-slate-600 opacity-60'
                    }`}
                  >
                    {/* Status icon / number */}
                    <div className="relative shrink-0 flex items-center justify-center">
                      <div className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-300 overflow-hidden ${
                        isActive
                          ? 'border-[#10b981] bg-[#10b981]/15 shadow-[0_0_12px_rgba(16,185,129,0.25)] scale-105'
                          : isUnlocked
                            ? 'border-slate-700 bg-[#111113]'
                            : 'border-[#1a1a1a] bg-[#111113]/30 grayscale opacity-45'
                      }`}>
                        <EvolutionFluteIcon tier={ev.tier} size="sm" className="w-8 h-8" />
                      </div>
                      
                      {/* Badge indicator on the circle corner */}
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[8px] border font-bold">
                        {isUnlocked ? (
                          <div className="bg-emerald-500 text-slate-950 rounded-full w-full h-full flex items-center justify-center border border-[#111113]">
                            ✓
                          </div>
                        ) : (
                          <div className="bg-slate-900 text-slate-500 border border-slate-800 rounded-full w-full h-full flex items-center justify-center text-[7px]">
                            🔒
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Milestone details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className={`text-xs font-bold font-display truncate ${isActive ? 'text-white' : isUnlocked ? 'text-slate-200' : 'text-slate-500'}`}>
                          {ev.title}
                        </span>
                        <span className={`text-[8px] font-mono shrink-0 px-1 py-0.5 rounded ${
                          isUnlocked ? 'bg-emerald-950/20 text-emerald-400 border border-emerald-900/20' : 'bg-slate-900 text-slate-500 border border-slate-800'
                        }`}>
                          Niv. {ev.minLevel}
                        </span>
                      </div>
                      
                      <p className="text-[9px] text-slate-500 truncate mt-0.5" title={ev.description}>
                        {ev.description}
                      </p>

                      <div className="text-[8px] font-mono mt-1 flex items-center gap-1 truncate">
                        <span className="text-[#10b981] font-semibold">Effet :</span>
                        <span className={isUnlocked ? 'text-slate-400' : 'text-slate-600'}>{ev.bonus}</span>
                      </div>
                    </div>

                    {/* Active Ribbon indicator */}
                    {isActive && (
                      <div className="absolute top-2 right-2 flex items-center gap-0.5 px-1 py-0.2 rounded bg-emerald-500/10 border border-emerald-500/20 text-[#10b981] text-[7px] uppercase font-mono font-bold tracking-wider">
                        ★ Actif
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Total level track indicator */}
            <div className="bg-[#0c0c0e]/80 border border-[#1a1a1a] p-3 rounded-xl flex items-center justify-between text-xs font-mono mt-2">
              <span className="text-slate-400 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-[#10b981]" /> Prochain Palier :
              </span>
              {(() => {
                const nextEv = EVOLUTIONS.find(ev => currentLevel < ev.minLevel);
                if (nextEv) {
                  const levelsNeeded = nextEv.minLevel - currentLevel;
                  return (
                    <span className="text-[#10b981] font-bold">
                      {nextEv.title} (Niv. {nextEv.minLevel}) dans <span className="text-white underline">{levelsNeeded} niveau{levelsNeeded > 1 ? 'x' : ''}</span>
                    </span>
                  );
                }
                return <span className="text-emerald-400 font-bold">✦ Palier Maximal Atteint ✦</span>;
              })()}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
