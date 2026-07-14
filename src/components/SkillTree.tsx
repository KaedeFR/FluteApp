/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SkillNode, StatCategory, Quest, SkillRank } from '../types';
import { 
  Sparkles, 
  Plus, 
  Lock, 
  BookOpen, 
  Heart, 
  Dumbbell, 
  Zap, 
  Check, 
  Sliders,
  ChevronDown,
  ChevronUp,
  Award,
  Trash,
  Link2,
  X,
  LockKeyhole,
  Compass,
  Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SkillTreeProps {
  skills: SkillNode[];
  gold: number;
  quests?: Quest[];
  onUpgradeSkill: (skillId: string) => void;
  onAddSkill: (newSkill: SkillNode, createDailyQuest?: boolean) => void;
  onDeleteSkill?: (skillId: string) => void;
  editorMode?: boolean;
  isAppLocked?: boolean;
}

const CATEGORY_META = {
  vitality: { label: 'Vitalité', color: 'text-red-400 border-red-500/20 bg-red-950/20', icon: Heart, badge: 'bg-red-500/10 border-red-500/30' },
  wisdom: { label: 'Sagesse', color: 'text-blue-400 border-blue-500/20 bg-blue-950/20', icon: BookOpen, badge: 'bg-blue-500/10 border-blue-500/30' },
  strength: { label: 'Force', color: 'text-orange-400 border-orange-500/20 bg-orange-950/20', icon: Dumbbell, badge: 'bg-orange-500/10 border-orange-500/30' },
  serenity: { label: 'Sérénité', color: 'text-teal-400 border-teal-500/20 bg-teal-950/20', icon: Sparkles, badge: 'bg-teal-500/10 border-teal-500/30' },
  magic: { label: 'Magie', color: 'text-purple-400 border-purple-500/20 bg-purple-950/20', icon: Zap, badge: 'bg-purple-500/10 border-purple-500/30' },
};

export function SkillTree({
  skills = [],
  gold,
  quests = [],
  onUpgradeSkill,
  onAddSkill,
  onDeleteSkill,
  isAppLocked = false,
}: SkillTreeProps) {
  // Ordered sub-tabs: 'unlocked' (Débloquées), 'locked' (Non-débloquées)
  const [activeSubTab, setActiveSubTab] = useState<'unlocked' | 'locked'>('unlocked');
  const [localEditorMode, setLocalEditorMode] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Automatically switch off editor mode if app becomes locked
  React.useEffect(() => {
    if (isAppLocked) {
      setLocalEditorMode(false);
      setShowAddForm(false);
    }
  }, [isAppLocked]);

  // New Skill Form fields
  const [selectedCategory, setSelectedCategory] = useState<StatCategory>('wisdom');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [maxLevel, setMaxLevel] = useState(5);
  const [prerequisiteId, setPrerequisiteId] = useState<string>('');
  const [requiredQuestId, setRequiredQuestId] = useState<string>('');
  const [rankDetails, setRankDetails] = useState<{ title: string; description: string }[]>([]);
  const [autoCreateDaily, setAutoCreateDaily] = useState(false);

  // Synchronize rank details size with maxLevel and pre-populate with default names
  React.useEffect(() => {
    const defaultTitles = ["Novice", "Adepte", "Initié", "Expert", "Maître", "Grand Maître", "Légende", "Transcendant", "Divin", "Absolu"];
    setRankDetails(prev => {
      const updated = [...prev];
      if (updated.length < maxLevel) {
        for (let i = updated.length; i < maxLevel; i++) {
          updated.push({
            title: defaultTitles[i] || `Rang ${i + 1}`,
            description: `S'entraîner assidûment au niveau ${i + 1}.`
          });
        }
      } else if (updated.length > maxLevel) {
        updated.splice(maxLevel);
      }
      return updated;
    });
  }, [maxLevel]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const finalRanks: SkillRank[] = rankDetails.map((rd, idx) => ({
      rank: idx + 1,
      title: rd.title.trim() || `Rang ${idx + 1}`,
      description: rd.description.trim() || `S'entraîner assidûment au niveau ${idx + 1}.`,
      bonus: `+2 ${CATEGORY_META[selectedCategory]?.label || ''}`
    }));

    const newSkill: SkillNode = {
      id: `skill-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      category: selectedCategory,
      cost: 0,
      unlocked: false,
      level: 0,
      maxLevel,
      prerequisiteId: prerequisiteId || undefined,
      requiredQuestId: requiredQuestId || undefined,
      ranks: finalRanks,
    };

    onAddSkill(newSkill, autoCreateDaily);
    
    // Reset fields
    setTitle('');
    setDescription('');
    setMaxLevel(5);
    setPrerequisiteId('');
    setRequiredQuestId('');
    setAutoCreateDaily(false);
    setShowAddForm(false);
  };

  const unlockedSkills = skills.filter(s => s.level > 0);
  const lockedSkills = skills.filter(s => s.level === 0);

  const getFilteredSkills = () => {
    const activeSkillsList = activeSubTab === 'unlocked' ? unlockedSkills : lockedSkills;
    const q = searchQuery.toLowerCase();
    return activeSkillsList.filter(s => 
      s.title.toLowerCase().includes(q) || 
      s.description.toLowerCase().includes(q) ||
      CATEGORY_META[s.category]?.label.toLowerCase().includes(q)
    );
  };

  const displaySkillsList = getFilteredSkills();

  return (
    <div className="space-y-6">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1a1a1a] pb-4">
        <div>
          <h2 className="text-xl font-bold font-display text-slate-100 flex items-center gap-2">
            <Sparkles className="text-[#10b981] w-5 h-5 animate-pulse" />
            Compétences
          </h2>
        </div>

        {/* Action Toggle controls */}
        {!isAppLocked && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLocalEditorMode(!localEditorMode)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider font-display flex items-center gap-1.5 transition cursor-pointer ${
                localEditorMode
                  ? 'bg-purple-950/40 border border-purple-500/50 text-purple-300'
                  : 'bg-[#111113] border border-[#1a1a1a] text-slate-400 hover:text-slate-200 hover:border-slate-800'
              }`}
            >
              <Sliders className="w-4 h-4" />
              {localEditorMode ? 'Mode Visionneur' : 'Gérer / Forger'}
            </button>

            {localEditorMode && (
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 active:scale-95 text-white font-bold px-4 py-2 rounded-xl text-xs tracking-wider uppercase font-display flex items-center gap-1.5 transition shadow-lg shadow-purple-900/10 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Créer une Compétence
              </button>
            )}
          </div>
        )}
      </div>

      {/* SUB-TABS & SEARCH BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0c0c0e] border border-[#1a1a1a] rounded-2xl p-3.5">
        
        {/* Unlocked / Locked Sub-Tabs */}
        <div className="flex bg-[#111113] border border-[#1d1d21] p-1 rounded-xl w-fit">
          <button
            id="skills-tab-unlocked"
            onClick={() => {
              setActiveSubTab('unlocked');
              setSearchQuery('');
            }}
            className={`px-4 py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase font-display flex items-center gap-2 transition cursor-pointer ${
              activeSubTab === 'unlocked' 
                ? 'bg-[#1a1a1a] text-[#10b981] border border-[#2a2a2a] shadow-inner font-extrabold' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            Débloquées ({unlockedSkills.length})
          </button>
          
          <button
            id="skills-tab-locked"
            onClick={() => {
              setActiveSubTab('locked');
              setSearchQuery('');
            }}
            className={`px-4 py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase font-display flex items-center gap-2 transition cursor-pointer ${
              activeSubTab === 'locked' 
                ? 'bg-[#1a1a1a] text-[#10b981] border border-[#2a2a2a] shadow-inner font-extrabold' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <LockKeyhole className="w-3.5 h-3.5 text-red-400" />
            Non-débloquées ({lockedSkills.length})
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:max-w-xs">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Rechercher une compétence..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#111113] border border-[#1a1a1a] focus:border-[#10b981] text-xs text-slate-200 rounded-xl pl-9 pr-4 py-2.5 focus:outline-none"
          />
        </div>
      </div>

      {/* CREATION FORM FOR MODULABLE SKILLS */}
      <AnimatePresence>
        {localEditorMode && showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <form onSubmit={handleSubmit} className="bg-[#0c0c0e] border border-purple-500/20 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2 border-b border-[#1a1a1a] pb-3 mb-1">
                <Sliders className="w-4 h-4 text-[#10b981]" />
                <h3 className="font-bold text-sm tracking-wider uppercase text-[#10b981] font-display">Forges de Compétence</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Nom de la compétence</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="ex: Méditation Avancée, Focus Élite, Code Robuste..."
                    maxLength={30}
                    required
                    className="w-full bg-[#111113] border border-[#1a1a1a] text-slate-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Statistique Associée</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value as StatCategory)}
                    className="w-full bg-[#111113] border border-[#1a1a1a] text-slate-100 rounded-lg px-3 py-2 text-sm focus:outline-none cursor-pointer"
                  >
                    <option value="vitality">🔴 Vitalité (Santé, Sommeil, Sport)</option>
                    <option value="wisdom">🔵 Sagesse (Études, Lecture, Intellect)</option>
                    <option value="strength">🟠 Force (Musculation, Effort physique)</option>
                    <option value="serenity">🟢 Sérénité (Méditation, Stoïcisme, Repos)</option>
                    <option value="magic">🟣 Magie (Créativité, Art, Programmation)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Branche Prérequise (Optionnel)</label>
                  <select
                    value={prerequisiteId}
                    onChange={(e) => setPrerequisiteId(e.target.value)}
                    className="w-full bg-[#111113] border border-[#1a1a1a] text-slate-100 rounded-lg px-3 py-2 text-sm focus:outline-none cursor-pointer"
                  >
                    <option value="">Aucune (Point de départ / Racines)</option>
                    {skills
                      .map(s => (
                        <option key={s.id} value={s.id}>
                          {CATEGORY_META[s.category]?.label} : {s.title} (Niv. Max {s.maxLevel})
                        </option>
                      ))
                    }
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">🔑 Quête requise pour débloquer (Optionnel)</label>
                  <select
                    value={requiredQuestId}
                    onChange={(e) => setRequiredQuestId(e.target.value)}
                    className="w-full bg-[#111113] border border-[#1a1a1a] text-slate-100 rounded-lg px-3 py-2 text-sm focus:outline-none cursor-pointer"
                  >
                    <option value="">Aucune (Toujours disponible)</option>
                    {quests.map(q => (
                      <option key={q.id} value={q.id}>
                        [{q.isMain ? 'Principale' : 'Secondaire'}] {q.title} {q.completed ? '✅ Terminée' : '❌ Non accomplie'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Description Générale de la Compétence</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Quelles habitudes d'acier allez-vous forger avec cette compétence ?"
                  maxLength={120}
                  required
                  rows={2}
                  className="w-full bg-[#111113] border border-[#1a1a1a] text-slate-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500 resize-none"
                />
              </div>

              {/* Dynamic Ranks Configurator */}
              <div className="space-y-3 bg-[#111113] border border-[#1a1a1a] rounded-xl p-4.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#222] pb-2">
                  <div>
                    <h4 className="text-xs font-bold text-[#10b981] uppercase tracking-wider font-display">Configuration des Rangs ({maxLevel})</h4>
                    <p className="text-[10px] text-slate-500 font-sans mt-0.5">Personnalisez le titre et l'exigence pour chaque niveau de cette discipline.</p>
                  </div>
                  <div className="flex gap-1">
                    {[1, 3, 5, 10].map(v => (
                      <button
                        key={v}
                        type="button"
                        onClick={() => setMaxLevel(v)}
                        className={`px-2 py-1 text-[9px] font-mono font-bold rounded transition cursor-pointer ${
                          maxLevel === v 
                            ? 'bg-[#10b981]/15 border border-[#10b981]/30 text-[#10b981]' 
                            : 'bg-[#0c0c0e] border border-[#222] text-slate-500 hover:text-slate-300'
                        }`}
                      >
                        {v} {v === 1 ? 'Rang' : 'Rangs'}
                      </button>
                    ))}
                    {![1, 3, 5, 10].includes(maxLevel) && (
                      <span className="px-2 py-1 text-[9px] font-mono font-bold rounded bg-[#10b981]/15 border border-[#10b981]/30 text-[#10b981]">
                        {maxLevel} Rangs
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                  {rankDetails.map((rank, idx) => (
                    <div key={idx} className="bg-[#0c0c0e] border border-[#1a1a1a] rounded-lg p-3 space-y-2 relative">
                      <div className="absolute top-2.5 right-2.5 bg-[#10b981]/10 text-[#10b981] text-[8px] font-mono font-bold px-1.5 py-0.5 rounded-full uppercase">
                        Rang {idx + 1}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                        <div className="space-y-1">
                          <label className="text-[10px] font-semibold text-slate-400">Titre ou Suffixe du Rang</label>
                          <input
                            type="text"
                            value={rank.title}
                            onChange={(e) => {
                              const updated = [...rankDetails];
                              updated[idx].title = e.target.value;
                              setRankDetails(updated);
                            }}
                            placeholder={`ex: Novice, Adepte, Maître...`}
                            required
                            className="w-full bg-[#111113] border border-[#222] focus:border-[#10b981] text-xs text-slate-200 rounded-md px-2.5 py-1.5 focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-semibold text-slate-400">Exigence ou Discipline requise</label>
                          <input
                            type="text"
                            value={rank.description}
                            onChange={(e) => {
                              const updated = [...rankDetails];
                              updated[idx].description = e.target.value;
                              setRankDetails(updated);
                            }}
                            placeholder="ex: Méditer 5 min, s'entraîner 2 fois par semaine..."
                            required
                            className="w-full bg-[#111113] border border-[#222] focus:border-[#10b981] text-xs text-slate-200 rounded-md px-2.5 py-1.5 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Direct Max Level Input Option */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2.5 border-t border-[#1d1d21]">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-semibold text-slate-400">Nombre de rangs personnalisé:</span>
                    <input
                      type="number"
                      min={1}
                      max={10}
                      value={maxLevel}
                      onChange={(e) => setMaxLevel(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
                      className="w-16 bg-[#0c0c0e] border border-[#222] focus:border-[#10b981] text-xs text-slate-200 rounded px-2 py-1 focus:outline-none text-center font-mono"
                    />
                    <span className="text-[9px] text-slate-500 italic">(Maximum 10 rangs)</span>
                  </div>

                  <div className="flex items-center gap-2 bg-[#0c0c0e] border border-[#1d1d21] rounded-lg px-3 py-1.5 hover:border-purple-500/30 transition-all">
                    <input
                      type="checkbox"
                      id="autoCreateDaily"
                      checked={autoCreateDaily}
                      onChange={(e) => setAutoCreateDaily(e.target.checked)}
                      className="rounded border-[#222] bg-[#0c0c0e] text-purple-600 focus:ring-purple-500 w-3.5 h-3.5 cursor-pointer accent-purple-600"
                    />
                    <label htmlFor="autoCreateDaily" className="text-[10px] font-bold text-slate-300 cursor-pointer select-none">
                      Créer automatiquement une quête quotidienne liée ⚔️
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-[#1a1a1a]">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 border border-[#1a1a1a] text-slate-400 rounded-lg text-xs tracking-wider uppercase font-bold hover:text-white transition cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 text-white font-bold px-4 py-2 rounded-lg text-xs tracking-wider uppercase transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  Forger la Compétence
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TILES CONTAINER (GRID OF COMPÉTENCES) */}
      {displaySkillsList.length === 0 ? (
        <div className="bg-[#0c0c0e] border border-dashed border-[#1a1a1a] rounded-2xl p-12 text-center text-slate-500">
          <Award className="w-12 h-12 text-[#10b981]/10 mx-auto mb-3" />
          <p className="text-sm font-medium">Aucune compétence trouvée pour cette catégorie.</p>
          <p className="text-xs mt-1 text-slate-600">
            {localEditorMode ? "Utilisez le bouton 'Créer une Compétence' pour forger votre première discipline !" : "Activez le mode 'Gérer / Forger' pour créer des compétences personnalisées !"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {displaySkillsList.map(skill => (
              <SkillCard
                key={skill.id}
                skill={skill}
                skills={skills}
                quests={quests}
                localEditorMode={localEditorMode}
                onUpgradeSkill={onUpgradeSkill}
                onDeleteSkill={onDeleteSkill}
              />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

interface SkillCardProps {
  key?: string;
  skill: SkillNode;
  skills: SkillNode[];
  quests: Quest[];
  localEditorMode: boolean;
  onUpgradeSkill: (skillId: string) => void;
  onDeleteSkill?: (skillId: string) => void;
}

function SkillCard({
  skill,
  skills,
  quests,
  localEditorMode,
  onUpgradeSkill,
  onDeleteSkill,
}: SkillCardProps) {
  const [showAllRanks, setShowAllRanks] = useState(false);

  const meta = CATEGORY_META[skill.category] || CATEGORY_META.wisdom;
  const Icon = meta.icon;
  const isMaxed = skill.level >= skill.maxLevel;

  const checkPrereqMet = (prereqId?: string) => {
    if (!prereqId) return true;
    const prereq = skills.find(s => s.id === prereqId);
    return prereq ? prereq.level >= 1 : false;
  };

  const checkQuestMet = (questId?: string) => {
    if (!questId) return true;
    const quest = quests.find(q => q.id === questId);
    return quest ? quest.completed : false;
  };

  const prereqMet = checkPrereqMet(skill.prerequisiteId);
  const questMet = checkQuestMet(skill.requiredQuestId);
  const isLocked = !prereqMet || !questMet;

  const parentSkill = skill.prerequisiteId ? skills.find(s => s.id === skill.prerequisiteId) : null;
  const boundQuest = skill.requiredQuestId ? quests.find(q => q.id === skill.requiredQuestId) : null;

  return (
    <motion.div
      layoutId={skill.id}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      className={`relative bg-[#111113]/90 border rounded-xl overflow-hidden transition-all duration-300 hover:border-[#2a2a2a] flex flex-col justify-between h-full ${
        isLocked
          ? 'border-red-950/20 opacity-60 shadow-none'
          : skill.level > 0
            ? 'border-slate-800 bg-gradient-to-b from-[#111113] to-[#121c16]/10'
            : 'border-[#1a1a1a] bg-gradient-to-b from-[#111113] to-[#111]'
      }`}
    >
      {/* Top indicator band corresponding to the stat category */}
      <div className={`h-1 w-full bg-gradient-to-r ${
        skill.category === 'vitality' ? 'from-red-500 to-rose-600' :
        skill.category === 'wisdom' ? 'from-blue-500 to-indigo-600' :
        skill.category === 'strength' ? 'from-orange-500 to-amber-600' :
        skill.category === 'serenity' ? 'from-teal-500 to-emerald-600' :
        'from-purple-500 to-pink-600'
      }`} />

      {/* Delete button (for forged customizable skills) */}
      {localEditorMode && onDeleteSkill && (
        <button
          id={`delete-skill-${skill.id}`}
          type="button"
          onClick={() => onDeleteSkill(skill.id)}
          className="absolute top-3.5 right-3.5 text-slate-600 hover:text-red-400 p-1 rounded-md transition hover:bg-red-950/20 cursor-pointer z-10"
          title="Supprimer cette compétence"
        >
          <Trash className="w-3.5 h-3.5" />
        </button>
      )}

      {/* Level indicators glow */}
      {isMaxed && (
        <div className="absolute top-0 right-0 w-16 h-16 bg-[#10b981]/5 rounded-full blur-xl pointer-events-none" />
      )}

      <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          {/* Header row: category and rank badge */}
          <div className="flex items-center justify-between gap-2">
            <span className={`text-[9px] font-extrabold font-mono uppercase tracking-wider px-2 py-0.5 border rounded-md flex items-center gap-1 ${meta.color}`}>
              <Icon className="w-2.5 h-2.5" />
              {meta.label}
            </span>

            {isMaxed ? (
              <span className="bg-[#10b981]/10 border border-[#10b981]/30 text-[#10b981] text-[8px] font-mono font-bold px-1.5 py-0.5 rounded-md uppercase tracking-widest shrink-0">
                Maxé 🏆
              </span>
            ) : isLocked ? (
              <span className="bg-red-950/25 border border-red-900/30 text-red-500/80 text-[8px] font-mono font-bold px-1.5 py-0.5 rounded-md uppercase tracking-widest shrink-0 flex items-center gap-1">
                <LockKeyhole className="w-2 h-2" /> Bloqué
              </span>
            ) : (
              <span className="bg-emerald-950/20 border border-emerald-700/20 text-[#10b981] text-[8px] font-mono font-bold px-1.5 py-0.5 rounded-md uppercase tracking-widest shrink-0">
                Rang {skill.level} / {skill.maxLevel}
              </span>
            )}
          </div>

          {/* Title & Description */}
          <div className="space-y-1">
            <h4 className={`font-bold text-sm leading-snug tracking-wide font-display ${isLocked ? 'text-slate-500' : 'text-slate-200'}`}>
              {skill.title}
            </h4>
            <p className={`text-xs ${isLocked ? 'text-slate-600' : 'text-slate-400'} font-sans leading-relaxed line-clamp-2`}>
              {skill.description}
            </p>
          </div>

          {/* Visual pip indicators of leveling */}
          <div className="flex gap-1 pt-1">
            {Array.from({ length: skill.maxLevel }).map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full flex-1 transition-all duration-300 ${
                  i < skill.level 
                    ? 'bg-gradient-to-r from-[#10b981] to-[#059669] shadow-[0_0_8px_rgba(16,185,129,0.4)]' 
                    : 'bg-[#141416] border border-[#222]'
                }`}
              />
            ))}
          </div>

          {/* Inherent Rank Status Section */}
          <div className="space-y-2 border-t border-[#1a1a1a]/50 pt-2.5">
            {skill.level > 0 && (
              <div className="bg-[#1a1a1a]/40 border border-[#222] rounded-lg p-2 flex flex-col">
                <span className="text-[8px] uppercase tracking-wider font-extrabold text-[#10b981] font-mono">🏆 Rang Actuel (Rang {skill.level}) :</span>
                <span className="text-xs font-bold text-slate-200 mt-0.5">{skill.ranks?.[skill.level - 1]?.title || `Initié`}</span>
                <span className="text-[10px] text-slate-400 italic mt-0.5 leading-snug">{skill.ranks?.[skill.level - 1]?.description || `Discipline complétée.`}</span>
              </div>
            )}

            {!isMaxed && !isLocked && (
              <div className="bg-[#1a1a1a]/20 border border-dashed border-[#10b981]/10 rounded-lg p-2 flex flex-col">
                <span className="text-[8px] uppercase tracking-wider font-extrabold text-teal-400 font-mono">🚀 Prochain Palier (Rang {skill.level + 1}) :</span>
                <span className="text-xs font-bold text-slate-300 mt-0.5">{skill.ranks?.[skill.level]?.title || `Prochain Niveau`}</span>
                <span className="text-[10px] text-slate-400 italic mt-0.5 leading-snug">{skill.ranks?.[skill.level]?.description || `Entraînez-vous pour élever cette discipline.`}</span>
              </div>
            )}
          </div>

          {/* Prerequisite & Quest connections */}
          {(parentSkill || boundQuest) && (
            <div className="border-t border-[#1a1a1a]/30 pt-2 space-y-1 text-[9px] font-mono">
              {parentSkill && (
                <div className={`flex items-center gap-1 ${prereqMet ? 'text-emerald-500' : 'text-amber-500/80'}`}>
                  <Link2 className="w-3 h-3 shrink-0" />
                  <span className="font-semibold">Requis :</span>
                  <span className="truncate max-w-[120px] font-bold">{parentSkill.title}</span>
                  <span>(Rang 1+)</span>
                  <span>{prereqMet ? '✅' : '❌'}</span>
                </div>
              )}
              {boundQuest && (
                <div className={`flex items-center gap-1.5 ${questMet ? 'text-emerald-500' : 'text-amber-500/80'}`}>
                  <Award className="w-3 h-3 shrink-0" />
                  <span className="font-semibold">Quête :</span>
                  <span className="truncate max-w-[120px] font-bold">{boundQuest.title}</span>
                  <span>{questMet ? '✅' : '❌'}</span>
                </div>
              )}
            </div>
          )}

          {/* Ranks expander list inside card */}
          <div className="pt-1.5">
            <button
              id={`expand-ranks-${skill.id}`}
              type="button"
              onClick={() => setShowAllRanks(!showAllRanks)}
              className="w-full text-[10px] text-slate-500 hover:text-slate-300 flex items-center justify-center gap-1 py-1 transition uppercase font-bold tracking-wider cursor-pointer border-t border-[#1a1a1a]/40"
            >
              <span>{showAllRanks ? "Masquer la liste" : `Voir tous les rangs (${skill.maxLevel})`}</span>
              {showAllRanks ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>

            {showAllRanks && (
              <div className="space-y-1.5 pt-2 max-h-36 overflow-y-auto pr-1 mt-1 font-sans">
                {skill.ranks?.map((r, idx) => {
                  const isUnlocked = r.rank <= skill.level;
                  const isNext = r.rank === skill.level + 1;
                  return (
                    <div 
                      key={idx} 
                      className={`text-[10px] p-2 rounded-lg flex items-start gap-1.5 border transition ${
                        isUnlocked 
                          ? 'bg-[#10b981]/5 border-[#10b981]/20 text-[#10b981]' 
                          : isNext && !isLocked
                            ? 'bg-[#141416] border-dashed border-[#10b981]/30 text-slate-200' 
                            : 'bg-[#09090b]/50 border-transparent text-slate-600 opacity-60'
                      }`}
                    >
                      <span className="font-bold font-mono shrink-0">R{r.rank}:</span>
                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-[10px] truncate">{r.title}</p>
                        <p className="text-[9px] text-slate-400 mt-0.5 leading-tight">{r.description}</p>
                      </div>
                      {isUnlocked && <Check className="w-3 h-3 text-[#10b981] shrink-0 ml-auto self-center" />}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Action upgrading button */}
        {!isMaxed && (
          <div className="mt-3.5 pt-2.5 border-t border-[#1a1a1a]/50 flex items-center justify-between gap-2">
            {(() => {
              const linkedDailyQuest = quests.find(q => q.skillIdToUnlock === skill.id && q.type === 'daily');
              
              if (linkedDailyQuest) {
                return (
                  <>
                    <div className="flex flex-col">
                      <span className="text-[9px] uppercase tracking-wider font-semibold text-slate-500 font-mono">Condition</span>
                      <span className="text-[10px] font-bold text-teal-400 font-sans">🔥 Série Quotidienne</span>
                    </div>
                    <div className="flex flex-col items-end text-right">
                      <span className="text-[9px] text-slate-500 italic">Série actuelle</span>
                      <span className="px-2.5 py-1 bg-teal-500/10 border border-teal-500/30 text-teal-400 text-[10px] font-bold uppercase rounded-lg flex items-center gap-1">
                        {linkedDailyQuest.streak} {linkedDailyQuest.streak > 1 ? 'jours' : 'jour'} ⚡
                      </span>
                    </div>
                  </>
                );
              }

              return (
                <>
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase tracking-wider font-semibold text-slate-500 font-mono">Condition</span>
                    <span className="text-[10px] font-bold text-amber-500 font-sans">⚔️ Quête de Validation</span>
                  </div>

                  {(() => {
                    const activeQuest = quests.find(q => q.skillIdToUnlock === skill.id && !q.completed);
                    
                    if (!prereqMet) {
                      return (
                        <button
                          disabled
                          className="px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-red-950/5 border border-red-950/20 text-red-500/30 cursor-not-allowed flex items-center gap-1"
                        >
                          <span>Bloqué</span>
                          <LockKeyhole className="w-3.5 h-3.5" />
                        </button>
                      );
                    }

                    if (activeQuest) {
                      return (
                        <div className="flex flex-col items-end">
                          <span className="text-[9px] text-slate-500 italic">Quête active</span>
                          <span className="px-2.5 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-bold uppercase rounded-lg animate-pulse flex items-center gap-1">
                            En cours ⏳
                          </span>
                        </div>
                      );
                    }

                    return (
                      <button
                        id={`upgrade-skill-btn-${skill.id}`}
                        onClick={() => onUpgradeSkill(skill.id)}
                        className="px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-[#10b981]/10 border border-[#10b981]/40 hover:border-[#10b981] text-[#10b981] cursor-pointer active:scale-95 flex items-center gap-1 transition-all"
                      >
                        <span>{skill.level === 0 ? 'Débloquer' : 'Élever'}</span>
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    );
                  })()}
                </>
              );
            })()}
          </div>
        )}
      </div>
    </motion.div>
  );
}
