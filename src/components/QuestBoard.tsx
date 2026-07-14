/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Quest, QuestType, Difficulty, StatCategory, Milestone, SkillNode } from '../types';
import { 
  Plus, 
  Trash, 
  Flame, 
  Check, 
  BookOpen, 
  Zap, 
  Crown, 
  Shield, 
  Calendar, 
  Layers, 
  X,
  ChevronDown,
  ChevronUp,
  Award,
  Sparkles,
  Dumbbell
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface QuestBoardProps {
  quests: Quest[];
  skills?: SkillNode[];
  onAddQuest: (quest: Quest) => void;
  onCompleteQuest: (questId: string) => void;
  onDeleteQuest: (questId: string) => void;
  onToggleMilestone: (questId: string, milestoneId: string) => void;
  onForceResetDailies: () => void;
  onUpdateQuestStreak: (questId: string, streak: number) => void;
  isAppLocked?: boolean;
}

export function QuestBoard({
  quests,
  skills = [],
  onAddQuest,
  onCompleteQuest,
  onDeleteQuest,
  onToggleMilestone,
  onForceResetDailies,
  onUpdateQuestStreak,
  isAppLocked = false,
}: QuestBoardProps) {
  // Ordered sub-tabs: 'main' (Principale), 'secondary' (Secondaire), 'skills' (Compétences), 'streaks' (Séries)
  const [activeSubTab, setActiveSubTab] = useState<'main' | 'secondary' | 'skills' | 'streaks'>('main');
  
  // Clear filter for Quest Types
  const [activeTypeFilter, setActiveTypeFilter] = useState<'all' | 'daily' | 'short' | 'epic'>('all');
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [expandedQuest, setExpandedQuest] = useState<string | null>(null);

  // Confirmation state
  const [confirmingQuest, setConfirmingQuest] = useState<Quest | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<QuestType>('short');
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [category, setCategory] = useState<StatCategory>('wisdom');
  const [frequency, setFrequency] = useState<'once' | 'daily' | 'weekly' | 'monthly'>('once');
  const [isMain, setIsMain] = useState<boolean>(true);
  const [scheduledDate, setScheduledDate] = useState<string>('');
  const [deadline, setDeadline] = useState<string>('');
  const [milestones, setMilestones] = useState<{ title: string }[]>([]);
  const [newMilestoneTitle, setNewMilestoneTitle] = useState('');
  const [selectedSkillId, setSelectedSkillId] = useState<string>('');

  // Ticker to force re-render countdown timers
  const [, setTick] = useState(0);
  React.useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 10000);
    return () => clearInterval(interval);
  }, []);

  const getDeadlineCountdown = (deadlineStr?: string) => {
    if (!deadlineStr) return null;
    const now = new Date().getTime();
    const target = new Date(deadlineStr).getTime();
    const diff = target - now;

    if (isNaN(target)) return null;

    if (diff <= 0) {
      return { text: 'Dépassée ! ⚠️', isOverdue: true };
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    let timeString = '';
    if (d > 0) timeString += `${d}j `;
    if (h > 0 || d > 0) timeString += `${h}h `;
    timeString += `${m}m`;

    return { text: `Temps restant: ${timeString} ⏱️`, isOverdue: false };
  };

  // Open modal with preconfigured properties based on active tab
  const handleOpenAddModal = () => {
    if (activeSubTab === 'main') {
      setIsMain(true);
      setSelectedSkillId('');
    } else if (activeSubTab === 'secondary') {
      setIsMain(false);
      setSelectedSkillId('');
    } else if (activeSubTab === 'streaks') {
      setIsMain(false);
      setSelectedSkillId('');
    } else { // skills
      setIsMain(false);
      if (skills.length > 0) {
        setSelectedSkillId(skills[0].id);
        setCategory(skills[0].category);
      } else {
        setSelectedSkillId('');
      }
    }
    
    // Default form values
    setTitle('');
    setDescription('');
    setType(activeSubTab === 'streaks' ? 'daily' : (activeTypeFilter === 'all' ? 'short' : activeTypeFilter));
    setDifficulty('medium');
    setFrequency(activeSubTab === 'streaks' ? 'daily' : 'once');
    setScheduledDate('');
    setDeadline('');
    setMilestones([]);
    setShowAddModal(true);
  };

  // Categorize quests for the sub-tabs
  const isSkillQuest = (q: Quest) => {
    const excludedIds = ['q-fm-d1', 'q-fm-d2', 'q-fm-d3', 'q-fm-d4'];
    if (excludedIds.includes(q.id)) return false;
    return !!q.skillIdToUnlock;
  };

  const getSubTabQuests = () => {
    if (activeSubTab === 'streaks') {
      // Uniquement les quêtes en série (quotidiennes) liées à des compétences
      return quests.filter(q => q.type === 'daily' && isSkillQuest(q));
    } else if (activeSubTab === 'skills') {
      // Uniquement les quêtes de validation de compétences (non quotidiennes)
      return quests.filter(q => isSkillQuest(q) && q.type !== 'daily');
    } else if (activeSubTab === 'main') {
      return quests.filter(q => q.isMain && !isSkillQuest(q));
    } else { // secondary
      return quests.filter(q => !q.isMain && !isSkillQuest(q));
    }
  };

  const filteredQuests = getSubTabQuests()
    .filter(q => {
      if (activeTypeFilter === 'all') return true;
      return q.type === activeTypeFilter;
    })
    .sort((a, b) => {
      // Completed last
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      return b.createdAt.localeCompare(a.createdAt);
    });

  const handleAddMilestone = () => {
    if (newMilestoneTitle.trim()) {
      setMilestones([...milestones, { title: newMilestoneTitle.trim() }]);
      setNewMilestoneTitle('');
    }
  };

  const handleRemoveMilestoneForm = (index: number) => {
    setMilestones(milestones.filter((_, i) => i !== index));
  };

  const handleCreateQuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const formattedMilestones: Milestone[] = type === 'epic' 
      ? milestones.map((m, idx) => ({ id: `ms-${Date.now()}-${idx}`, title: m.title, completed: false }))
      : [];

    const newQuest: Quest = {
      id: `quest-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      type,
      difficulty,
      category,
      completed: false,
      streak: 0,
      frequency: type === 'daily' ? 'daily' : frequency,
      isMain: activeSubTab === 'skills' ? isMain : (activeSubTab === 'main'),
      milestones: formattedMilestones.length > 0 ? formattedMilestones : undefined,
      scheduledDate: scheduledDate || undefined,
      deadline: deadline || undefined,
      createdAt: new Date().toISOString(),
      skillIdToUnlock: selectedSkillId || (activeSubTab === 'skills' && skills.length > 0 ? skills[0].id : undefined),
    };

    onAddQuest(newQuest);
    
    // Reset Form
    setTitle('');
    setDescription('');
    setDifficulty('medium');
    setCategory('wisdom');
    setFrequency('once');
    setIsMain(true);
    setScheduledDate('');
    setDeadline('');
    setMilestones([]);
    setSelectedSkillId('');
    setShowAddModal(false);
  };

  const getDifficultyColor = (diff: Difficulty) => {
    switch (diff) {
      case 'easy':
        return 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5';
      case 'medium':
        return 'text-blue-400 border-blue-500/20 bg-blue-500/5';
      case 'hard':
        return 'text-amber-400 border-amber-500/20 bg-amber-500/5';
      case 'epic':
        return 'text-purple-400 border-purple-500/20 bg-purple-500/5 shadow-[0_0_8px_rgba(168,85,247,0.15)]';
    }
  };

  const getDifficultyLabel = (diff: Difficulty) => {
    switch (diff) {
      case 'easy': return 'Facile';
      case 'medium': return 'Moyen';
      case 'hard': return 'Difficile';
      case 'epic': return 'Épique';
    }
  };

  const getCategoryDetails = (cat: StatCategory) => {
    switch (cat) {
      case 'vitality':
        return { label: 'Vitalité', color: 'text-red-400 bg-red-950/20 border-red-500/20', icon: Shield };
      case 'wisdom':
        return { label: 'Sagesse', color: 'text-blue-400 bg-blue-950/20 border-blue-500/20', icon: BookOpen };
      case 'strength':
        return { label: 'Force', color: 'text-orange-400 bg-orange-950/20 border-orange-500/20', icon: Dumbbell };
      case 'serenity':
        return { label: 'Sérénité', color: 'text-teal-400 bg-teal-950/20 border-teal-500/20', icon: Sparkles };
      case 'magic':
        return { label: 'Magie', color: 'text-purple-400 bg-purple-950/20 border-purple-500/20', icon: Zap };
      default:
        return { label: 'Général', color: 'text-slate-400 bg-slate-950/20 border-slate-500/20', icon: Award };
    }
  };

  const getTypeBadge = (questType: QuestType) => {
    switch (questType) {
      case 'daily':
        return {
          label: 'Quotidienne',
          color: 'text-sky-400 bg-sky-950/30 border-sky-500/20',
          icon: Calendar
        };
      case 'short':
        return {
          label: 'Unique',
          color: 'text-emerald-400 bg-emerald-950/30 border-emerald-500/20',
          icon: Award
        };
      case 'epic':
        return {
          label: 'Épique',
          color: 'text-purple-400 bg-purple-950/30 border-purple-500/20',
          icon: Layers
        };
    }
  };

  const handleToggleEpicQuestExpand = (questId: string) => {
    setExpandedQuest(expandedQuest === questId ? null : questId);
  };

  const renderQuestCard = (quest: Quest) => {
    const catDetails = getCategoryDetails(quest.category);
    const CatIcon = catDetails.icon;

    const hasMilestones = quest.milestones && quest.milestones.length > 0;
    const epicProgressPercent = hasMilestones
      ? Math.round((quest.milestones!.filter(m => m.completed).length / quest.milestones!.length) * 100)
      : 0;
    
    const isEpicFinished = quest.type === 'epic' && hasMilestones && epicProgressPercent === 100;

    const typeInfo = getTypeBadge(quest.type);
    const TypeIcon = typeInfo.icon;

    return (
      <motion.div
        key={quest.id}
        layoutId={quest.id}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        className={`relative bg-[#111113]/90 border rounded-xl overflow-hidden transition-all duration-300 hover:border-[#2a2a2a] flex flex-col justify-between h-full ${
          quest.completed 
            ? 'border-[#1a1a1a]/40 opacity-55 shadow-none' 
            : quest.type === 'epic' 
              ? 'border-purple-500/20 shadow-[0_4px_16px_rgba(168,85,247,0.04)] bg-gradient-to-b from-[#111113] to-[#140f1a]'
              : quest.type === 'daily'
                ? 'border-sky-500/20 shadow-[0_4px_16px_rgba(56,189,248,0.03)] bg-gradient-to-b from-[#111113] to-[#0e141c]'
                : 'border-[#1a1a1a] bg-gradient-to-b from-[#111113] to-[#0c0c0e]'
        }`}
      >
        {/* Top colored indicator band */}
        <div className={`h-1 w-full bg-gradient-to-r ${
          quest.type === 'daily' 
            ? 'from-sky-500 to-indigo-500' 
            : quest.type === 'short' 
              ? 'from-emerald-500 to-teal-500' 
              : 'from-purple-600 to-pink-500 animate-pulse'
        }`} />

        <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            {/* Header: Category and type/difficulty */}
            <div className="flex items-center justify-between gap-2">
              <span className={`text-[9px] font-extrabold font-mono uppercase tracking-wider px-2 py-0.5 border rounded-md flex items-center gap-1 ${catDetails.color}`}>
                <CatIcon className="w-2.5 h-2.5" />
                {catDetails.label}
              </span>
              
              <div className="flex items-center gap-1.5">
                <span className={`text-[9px] font-bold font-mono px-1.5 py-0.5 border rounded-md flex items-center gap-1 ${typeInfo.color}`}>
                  <TypeIcon className="w-2.5 h-2.5" />
                  {typeInfo.label}
                </span>

                <span className={`text-[9px] font-bold font-mono px-1.5 py-0.5 border rounded-md ${getDifficultyColor(quest.difficulty)}`}>
                  {getDifficultyLabel(quest.difficulty)}
                </span>
              </div>
            </div>

            {/* Title & Description */}
            <div className="space-y-1">
              <h4 className={`font-bold text-sm leading-snug tracking-wide font-display ${quest.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                {quest.title}
              </h4>
              {quest.description && (
                <p className={`text-xs ${quest.completed ? 'text-slate-600' : 'text-slate-400'} italic font-sans leading-relaxed line-clamp-2`}>
                  {quest.description}
                </p>
              )}
            </div>

            {/* Daily Streak Info */}
            {quest.type === 'daily' && quest.streak > 0 && (
              <div className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
                <Flame className="w-3 h-3 fill-amber-500/20" />
                Série : {quest.streak} jour{quest.streak > 1 ? 's' : ''}
              </div>
            )}

            {/* Epic quest milestones progression */}
            {quest.type === 'epic' && hasMilestones && (
              <div className="space-y-2 bg-[#0c0c0e]/50 border border-[#1a1a1a] rounded-lg p-2.5">
                <div className="flex items-center justify-between text-[10px] font-mono font-bold text-slate-400">
                  <span className="uppercase tracking-wider">Jalons Requis</span>
                  <span className="text-purple-400">
                    {quest.milestones!.filter(m => m.completed).length} / {quest.milestones!.length}
                  </span>
                </div>
                
                <div className="w-full bg-[#1a1a1a] h-1.5 rounded-full overflow-hidden border border-[#2a2a2a]">
                  <div 
                    className="bg-gradient-to-r from-purple-600 to-pink-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${epicProgressPercent}%` }}
                  />
                </div>

                <button
                  id={`expand-epic-${quest.id}`}
                  type="button"
                  onClick={() => handleToggleEpicQuestExpand(quest.id)}
                  className="w-full text-[10px] text-slate-500 hover:text-slate-300 flex items-center justify-center gap-1 py-0.5 transition uppercase font-bold tracking-wider cursor-pointer"
                >
                  <span>{expandedQuest === quest.id ? "Masquer" : "Gérer les jalons"}</span>
                  {expandedQuest === quest.id ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>

                {/* Milestones expander list inside card */}
                {expandedQuest === quest.id && (
                  <div className="space-y-1.5 pt-1.5 border-t border-[#1a1a1a] max-h-36 overflow-y-auto">
                    {quest.milestones!.map((ms) => (
                      <label
                        key={ms.id}
                        className={`flex items-center gap-2 text-[11px] py-1 px-1.5 rounded hover:bg-[#1a1a1a]/40 cursor-pointer transition ${ms.completed ? 'text-slate-500 line-through font-mono' : 'text-slate-300'}`}
                      >
                        <input
                          type="checkbox"
                          checked={ms.completed}
                          disabled={quest.completed}
                          onChange={() => onToggleMilestone(quest.id, ms.id)}
                          className="rounded bg-[#0c0c0e] border-[#1a1a1a] text-purple-500 focus:ring-purple-500/20 cursor-pointer"
                        />
                        <span className="select-none">{ms.title}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer stats metadata & CTA actions */}
          <div className="space-y-2.5 pt-2.5 border-t border-[#1a1a1a]/50">
            <div className="flex flex-wrap gap-1.5">
              {quest.scheduledDate && (
                <span className="text-[8px] font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/20 border border-cyan-500/20 px-1.5 py-0.5 rounded">
                  📅 {new Date(quest.scheduledDate).toLocaleDateString('fr-FR')}
                </span>
              )}

              {quest.deadline && (() => {
                const countdown = getDeadlineCountdown(quest.deadline);
                if (!countdown) return null;
                return (
                  <span className={`text-[8px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 border rounded ${
                    countdown.isOverdue 
                      ? 'bg-red-950/30 border-red-500/20 text-red-400 animate-pulse' 
                      : 'bg-[#111113] border-emerald-500/20 text-emerald-400'
                  }`}>
                    ⏱️ {countdown.text}
                  </span>
                );
              })()}

              {quest.skillIdToUnlock && (() => {
                const linkedSkill = skills.find(s => s.id === quest.skillIdToUnlock);
                if (!linkedSkill) return null;
                return (
                  <span className="text-[8px] font-extrabold font-mono uppercase tracking-wider px-1.5 py-0.5 border border-[#10b981]/40 bg-[#10b981]/15 text-[#10b981] rounded flex items-center gap-1">
                    ✨ Compétence : {linkedSkill.title}
                  </span>
                );
              })()}
            </div>

            {/* Complete & Delete buttons on bottom right/left */}
            <div className="flex items-center gap-2">
              <button
                id={`complete-quest-${quest.id}`}
                disabled={quest.completed || (quest.type === 'epic' && hasMilestones && !isEpicFinished)}
                onClick={() => setConfirmingQuest(quest)}
                className={`flex-1 py-1.5 px-3 rounded-lg border text-[10px] font-bold tracking-wider uppercase flex items-center justify-center gap-1.5 transition cursor-pointer ${
                  quest.completed
                    ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-400 font-extrabold'
                    : quest.type === 'epic' && hasMilestones && !isEpicFinished
                      ? 'border-[#1a1a1a] bg-[#0c0c0e]/50 text-slate-500 cursor-not-allowed'
                      : 'bg-[#10b981] hover:bg-[#059669] border-[#10b981] text-slate-950 active:scale-95'
                }`}
              >
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                {quest.completed ? "Quête Validée" : "Valider la quête"}
              </button>

              {!isAppLocked && (
                <button
                  id={`delete-quest-${quest.id}`}
                  onClick={() => onDeleteQuest(quest.id)}
                  className="text-slate-500 hover:text-red-400 p-2 hover:bg-red-950/20 rounded-lg border border-[#1a1a1a] transition shrink-0 cursor-pointer"
                  title="Supprimer la quête"
                >
                  <Trash className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header & Sub-Tabs Switchers */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1a1a1a] pb-4">
        
        {/* Navigation Tabs - Strict requested order: Principale, Secondaire, Compétences, Séries */}
        <div className="flex bg-[#0c0c0e] border border-[#1a1a1a] p-1 rounded-xl w-fit flex-wrap gap-1">
          <button
            id="subtab-main"
            onClick={() => {
              setActiveSubTab('main');
            }}
            className={`px-4 py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase font-display flex items-center gap-2 transition cursor-pointer ${
              activeSubTab === 'main' 
                ? 'bg-[#1a1a1a] text-[#10b981] border border-[#2a2a2a] shadow-inner font-extrabold' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Crown className="w-3.5 h-3.5 text-[#10b981]" />
            Principale
          </button>
          
          <button
            id="subtab-secondary"
            onClick={() => {
              setActiveSubTab('secondary');
            }}
            className={`px-4 py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase font-display flex items-center gap-2 transition cursor-pointer ${
              activeSubTab === 'secondary' 
                ? 'bg-[#1a1a1a] text-[#10b981] border border-[#2a2a2a] shadow-inner font-extrabold' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-slate-400" />
            Secondaire
          </button>

          <button
            id="subtab-skills"
            onClick={() => {
              setActiveSubTab('skills');
            }}
            className={`px-4 py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase font-display flex items-center gap-2 transition cursor-pointer ${
              activeSubTab === 'skills' 
                ? 'bg-[#1a1a1a] text-[#10b981] border border-[#2a2a2a] shadow-inner font-extrabold' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            Compétences
          </button>

          <button
            id="subtab-streaks"
            onClick={() => {
              setActiveSubTab('streaks');
            }}
            className={`px-4 py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase font-display flex items-center gap-2 transition cursor-pointer ${
              activeSubTab === 'streaks' 
                ? 'bg-[#1a1a1a] text-amber-400 border border-[#2a2a2a] shadow-inner font-extrabold' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500/10" />
            Séries
          </button>
        </div>

        {/* Top Reset and Create Actions */}
        {!isAppLocked && (
          <div className="flex items-center gap-2">
            <button
              id="open-add-quest-modal"
              onClick={handleOpenAddModal}
              className="bg-gradient-to-r from-[#10b981] to-[#059669] hover:opacity-90 active:scale-95 text-slate-950 px-4 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase font-display flex items-center gap-1.5 transition shadow-[0_0_15px_rgba(16,185,129,0.2)] cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              Créer une Quête
            </button>
          </div>
        )}
      </div>

      {/* Quest Type filter section - makes quest types much clearer! */}
      {activeSubTab !== 'streaks' && (
        <div className="flex flex-wrap items-center justify-between gap-3 bg-[#111113]/50 border border-[#1a1a1a] p-3 rounded-xl">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">
              Filtrer par type de quête :
            </span>
            <div className="flex flex-wrap gap-1">
              {[
                { id: 'all', label: 'Toutes', icon: Layers },
                { id: 'daily', label: 'Quotidiennes', icon: Calendar },
                { id: 'short', label: 'Courtes', icon: Award },
                { id: 'epic', label: 'Épiques', icon: Flame },
              ].map((f) => {
                const IconComp = f.icon;
                const isSelected = activeTypeFilter === f.id;
                return (
                  <button
                    key={f.id}
                    id={`type-filter-${f.id}`}
                    onClick={() => setActiveTypeFilter(f.id as any)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wider uppercase font-mono flex items-center gap-1.5 border transition cursor-pointer ${
                      isSelected 
                        ? 'bg-[#10b981]/15 border-[#10b981] text-[#10b981] font-extrabold' 
                        : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-[#1a1a1a]/40'
                    }`}
                  >
                    <IconComp className="w-3 h-3" />
                    {f.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="text-[10px] text-slate-500 font-mono">
            {filteredQuests.length} quête{filteredQuests.length > 1 ? 's' : ''} trouvée{filteredQuests.length > 1 ? 's' : ''}
          </div>
        </div>
      )}

      {activeSubTab === 'streaks' ? (
        <div className="space-y-4">
          {filteredQuests.length === 0 ? (
            <div className="text-center py-16 bg-[#111113]/20 rounded-2xl border-2 border-dashed border-[#1a1a1a] px-4 flex flex-col items-center justify-center">
              <div className="text-4xl mb-3">🔥</div>
              <p className="text-slate-400 font-display text-sm font-semibold">Aucune série de quêtes active.</p>
              <p className="text-slate-500 text-xs mt-1 max-w-sm leading-normal">
                Créez une quête de type "Quotidienne" liée à une compétence pour commencer à suivre vos séries et débloquer ses rangs de discipline !
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredQuests.map(qd => {
                const linkedSkill = skills.find(s => s.id === qd.skillIdToUnlock);
                const catDetails = getCategoryDetails(qd.category);
                const CatIcon = catDetails.icon;

                return (
                  <div key={qd.id} className="bg-[#111113]/90 border border-amber-500/10 hover:border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.01)] hover:shadow-[0_0_20px_rgba(245,158,11,0.03)] p-5 rounded-2xl space-y-4 transition-all duration-300 relative overflow-hidden group">
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold text-slate-100 tracking-wide line-clamp-1">{qd.title}</h4>
                          {qd.completed ? (
                            <span className="text-[8px] font-mono bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/20 px-1.5 py-0.5 rounded font-extrabold uppercase">Validée</span>
                          ) : (
                            <span className="text-[8px] font-mono bg-slate-500/10 text-slate-400 border border-slate-500/10 px-1.5 py-0.5 rounded font-bold uppercase">À faire</span>
                          )}
                        </div>
                        
                        {linkedSkill ? (
                          <div className="flex items-center gap-1.5 text-[10px] text-slate-300 font-mono">
                            <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 border rounded-md ${catDetails.color} text-[8px] font-bold uppercase`}>
                              <CatIcon className="w-2.5 h-2.5" />
                              {catDetails.label}
                            </span>
                            <span>Compétence : <span className="text-[#10b981] font-semibold">{linkedSkill.title}</span></span>
                          </div>
                        ) : (
                          <p className="text-[10px] text-slate-500 italic font-mono">Aucune compétence liée à cette quête</p>
                        )}
                      </div>

                      <div className="flex flex-col items-end shrink-0">
                        <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full text-xs font-bold text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.05)]">
                          <Flame className="w-4 h-4 fill-amber-500/10 animate-pulse" />
                          <span>{qd.streak || 0} jour{(qd.streak || 0) > 1 ? 's' : ''}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-[#1a1a1a]/50 pt-3 text-[10px]">
                      <span className="text-slate-500 font-mono">Ajuster la série :</span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          disabled={(qd.streak || 0) <= 0}
                          onClick={() => onUpdateQuestStreak(qd.id, Math.max(0, (qd.streak || 0) - 1))}
                          className="w-7 h-7 rounded-lg bg-[#0c0c0e] border border-[#1a1a1a] hover:border-red-500/30 text-slate-400 hover:text-red-400 flex items-center justify-center transition active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                          title="Diminuer la série d'un jour"
                        >
                          -1
                        </button>
                        <button
                          type="button"
                          onClick={() => onUpdateQuestStreak(qd.id, (qd.streak || 0) + 1)}
                          className="w-7 h-7 rounded-lg bg-[#0c0c0e] border border-[#1a1a1a] hover:border-amber-500/30 text-slate-400 hover:text-amber-400 flex items-center justify-center transition active:scale-95 cursor-pointer"
                          title="Augmenter la série d'un jour"
                        >
                          +1
                        </button>
                        
                        <div className="flex gap-1 pl-1.5 border-l border-[#1a1a1a]/50">
                          {[5, 15, 30, 60, 120].map(p => (
                            <button
                              key={p}
                              type="button"
                              onClick={() => onUpdateQuestStreak(qd.id, p)}
                              className={`px-2 py-1 rounded-md text-[8px] font-mono font-extrabold border transition ${(qd.streak || 0) === p ? 'bg-amber-500/20 border-amber-500 text-amber-400' : 'bg-[#0c0c0e] border-[#1a1a1a] text-slate-500 hover:text-slate-300'} cursor-pointer`}
                            >
                              {p}j
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        /* Quest Grid Display (Dalles) */
        <div className="min-h-[300px]">
          {filteredQuests.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-[#1a1a1a] rounded-2xl bg-[#111113]/20">
              <div className="text-4xl mb-3">📜</div>
              <p className="text-slate-400 font-display text-sm font-semibold">Aucune quête disponible ici.</p>
              <p className="text-slate-500 text-xs mt-1 max-w-xs leading-normal">
                Forgez de nouvelles quêtes pour récolter du butin, de l'XP et éveiller vos statistiques légendaires !
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence mode="popLayout">
                {filteredQuests.map(quest => renderQuestCard(quest))}
              </AnimatePresence>
            </div>
          )}
        </div>
      )}

      {/* CREATE QUEST MODAL OVERLAY */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="absolute inset-0 bg-[#09090b]/90 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-[#111113] border border-[#1a1a1a] rounded-2xl shadow-2xl p-6 overflow-hidden z-10"
            >
              {/* Green trim detail */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#10b981] via-[#059669] to-[#10b981]" />
              
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-lg font-bold font-display text-slate-100 tracking-wide flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#10b981] animate-pulse" />
                  Forger une Nouvelle Quête
                </h3>
                <button 
                  id="close-modal-btn"
                  onClick={() => setShowAddModal(false)} 
                  className="text-slate-400 hover:text-white bg-[#1a1a1a] p-1.5 rounded-lg transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateQuest} className="space-y-4">
                {/* Title */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400 tracking-wide block">Titre de la Quête</label>
                  <input
                    id="quest-title-input"
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ex: Courir 5km, Lire 2 chapitres..."
                    className="w-full bg-[#0c0c0e] border border-[#2a2a2a] focus:border-[#10b981] rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none transition"
                  />
                </div>

                {/* Description */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400 tracking-wide block">Description / Notes (Optionnel)</label>
                  <textarea
                    id="quest-desc-input"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Détaillez vos objectifs ou motivations..."
                    rows={2}
                    className="w-full bg-[#0c0c0e] border border-[#2a2a2a] focus:border-[#10b981] rounded-xl px-4 py-2 text-sm text-slate-100 focus:outline-none resize-none transition"
                  />
                </div>

                {/* Type Selection */}
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    id="select-type-daily"
                    onClick={() => setType('daily')}
                    className={`p-2.5 border rounded-xl text-center flex flex-col items-center justify-center gap-1 transition cursor-pointer ${type === 'daily' ? 'border-[#10b981]/50 bg-[#10b981]/10 text-[#10b981] font-bold' : 'border-[#1a1a1a] bg-[#0c0c0e] text-slate-400 hover:text-slate-200'}`}
                  >
                    <Calendar className="w-4 h-4" />
                    <span className="text-[10px] tracking-wider uppercase font-bold">Quotidienne</span>
                  </button>
                  <button
                    type="button"
                    id="select-type-short"
                    onClick={() => setType('short')}
                    className={`p-2.5 border rounded-xl text-center flex flex-col items-center justify-center gap-1 transition cursor-pointer ${type === 'short' ? 'border-[#10b981]/50 bg-[#10b981]/10 text-[#10b981] font-bold' : 'border-[#1a1a1a] bg-[#0c0c0e] text-slate-400 hover:text-slate-200'}`}
                  >
                    <Award className="w-4 h-4" />
                    <span className="text-[10px] tracking-wider uppercase font-bold">Unique</span>
                  </button>
                  <button
                    type="button"
                    id="select-type-epic"
                    onClick={() => setType('epic')}
                    className={`p-2.5 border rounded-xl text-center flex flex-col items-center justify-center gap-1 transition cursor-pointer ${type === 'epic' ? 'border-[#10b981]/50 bg-[#10b981]/10 text-[#10b981] font-bold' : 'border-[#1a1a1a] bg-[#0c0c0e] text-slate-400 hover:text-slate-200'}`}
                  >
                    <Layers className="w-4 h-4" />
                    <span className="text-[10px] tracking-wider uppercase font-bold">Épique</span>
                  </button>
                </div>

                {/* Grid for Category & Difficulty */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Category */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-400 tracking-wide block">Statistique Associée</label>
                    <select
                      id="quest-category-select"
                      value={category}
                      onChange={(e) => setCategory(e.target.value as StatCategory)}
                      className="w-full bg-[#0c0c0e] border border-[#2a2a2a] focus:border-[#10b981] rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none transition cursor-pointer"
                    >
                      <option value="vitality">🔴 Vitalité (Santé, Sport)</option>
                      <option value="wisdom">🔵 Sagesse (Études, Lecture)</option>
                      <option value="strength">🟠 Force (Musculation, Effort)</option>
                      <option value="serenity">🟢 Sérénité (Méditation, Repos)</option>
                      <option value="magic">🟣 Magie (Créativité, Art, Code)</option>
                    </select>
                  </div>

                  {/* Difficulty */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-400 tracking-wide block">Difficulté (Butin & XP)</label>
                    <select
                      id="quest-difficulty-select"
                      value={difficulty}
                      onChange={(e) => setDifficulty(e.target.value as Difficulty)}
                      className="w-full bg-[#0c0c0e] border border-[#2a2a2a] focus:border-[#10b981] rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none transition cursor-pointer"
                    >
                      <option value="easy">Facile (XP: 15, Or: 10)</option>
                      <option value="medium">Moyen (XP: 35, Or: 25)</option>
                      <option value="hard">Difficile (XP: 80, Or: 60)</option>
                      <option value="epic">Épique (XP: 250, Or: 150)</option>
                    </select>
                  </div>
                </div>

                {/* Linked Skill Selection (Locked to true if activeSubTab is skills) */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400 tracking-wide block">🎯 Valider une Compétence {activeSubTab === 'skills' ? '(Requis)' : '(Optionnel)'}</label>
                  <select
                    id="quest-skill-select"
                    required={activeSubTab === 'skills'}
                    value={selectedSkillId}
                    onChange={(e) => {
                      const val = e.target.value;
                      setSelectedSkillId(val);
                      if (val) {
                        const sk = skills.find(s => s.id === val);
                        if (sk) setCategory(sk.category);
                      }
                    }}
                    className="w-full bg-[#0c0c0e] border border-[#2a2a2a] focus:border-[#10b981] rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none transition cursor-pointer"
                  >
                    {activeSubTab !== 'skills' && <option value="">Aucune (Quête standard)</option>}
                    {skills.map(s => (
                      <option key={s.id} value={s.id}>
                        {s.category === 'vitality' ? '🔴' : s.category === 'wisdom' ? '🔵' : s.category === 'strength' ? '🟠' : s.category === 'serenity' ? '🟢' : '🟣'} {s.title} (Rang actuel : {s.level} / {s.maxLevel})
                      </option>
                    ))}
                  </select>
                  <p className="text-[10px] text-slate-500 italic px-1">
                    Compléter cette quête débloquera ou améliorera automatiquement la compétence sélectionnée !
                  </p>
                </div>

                {/* Additional Quest Attributes (isMain & frequency) */}
                <div className="grid grid-cols-2 gap-4 border-t border-[#1a1a1a] pt-3">
                  {/* Main Quest Toggle - hidden if we are forcing main/secondary, but visible for skill subtab */}
                  {activeSubTab === 'skills' ? (
                    <div className="flex items-center gap-2 py-2">
                      <input
                        id="quest-ismain-toggle"
                        type="checkbox"
                        checked={isMain}
                        onChange={(e) => setIsMain(e.target.checked)}
                        className="rounded bg-[#0c0c0e] border-[#2a2a2a] text-[#10b981] focus:ring-[#10b981]/20 w-4 h-4 cursor-pointer"
                      />
                      <label htmlFor="quest-ismain-toggle" className="text-xs font-semibold text-slate-300 tracking-wide cursor-pointer flex items-center gap-1">
                        👑 Quête Principale
                      </label>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 py-2">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        Catégorie :
                      </span>
                      <span className="text-xs font-semibold text-[#10b981]">
                        {activeSubTab === 'main' ? '👑 Principale' : '⚔️ Secondaire'}
                      </span>
                    </div>
                  )}

                  {/* Frequency */}
                  {type !== 'daily' && (
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider block">Récurrence</label>
                      <select
                        id="quest-frequency-select"
                        value={frequency}
                        onChange={(e) => setFrequency(e.target.value as any)}
                        className="w-full bg-[#0c0c0e] border border-[#2a2a2a] focus:border-[#10b981] rounded-xl px-2 py-1.5 text-xs text-slate-200 focus:outline-none transition cursor-pointer"
                      >
                        <option value="once">Unique (Une fois)</option>
                        <option value="weekly">Hebdomadaire</option>
                        <option value="monthly">Mensuelle</option>
                      </select>
                    </div>
                  )}
                </div>

                {/* Date Selection and Deadline Calendar */}
                <div className="grid grid-cols-2 gap-4 border-t border-[#1a1a1a] pt-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-400 tracking-wide block">📅 Planifier pour le</label>
                    <input
                      id="quest-scheduled-date-input"
                      type="date"
                      value={scheduledDate}
                      onChange={(e) => setScheduledDate(e.target.value)}
                      className="w-full bg-[#0c0c0e] border border-[#2a2a2a] focus:border-[#10b981] rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none transition cursor-pointer"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-400 tracking-wide block">⏱️ Date limite (Deadline)</label>
                    <input
                      id="quest-deadline-input"
                      type="datetime-local"
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                      className="w-full bg-[#0c0c0e] border border-[#2a2a2a] focus:border-[#10b981] rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none transition cursor-pointer"
                    />
                  </div>
                </div>

                {/* Milestones Add Section (Only for Epic) */}
                {type === 'epic' && (
                  <div className="border border-[#1a1a1a] rounded-xl p-3 bg-[#0c0c0e]/40 space-y-2">
                    <div className="text-xs font-semibold text-slate-400 tracking-wide flex justify-between">
                      <span>Jalons requis (Milestones)</span>
                      <span className="text-[10px] text-slate-500 font-mono">({milestones.length} ajoutés)</span>
                    </div>

                    {/* Milestones list inside form */}
                    {milestones.length > 0 && (
                      <div className="space-y-1 max-h-24 overflow-y-auto mb-2">
                        {milestones.map((m, idx) => (
                          <div key={idx} className="flex justify-between items-center text-xs bg-[#0c0c0e] px-2 py-1.5 border border-[#1a1a1a] rounded-md">
                            <span className="truncate text-slate-300">{idx + 1}. {m.title}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveMilestoneForm(idx)}
                              className="text-slate-500 hover:text-red-400 cursor-pointer"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Milestone adding inputs */}
                    <div className="flex gap-2">
                      <input
                        id="milestone-title-input"
                        type="text"
                        value={newMilestoneTitle}
                        onChange={(e) => setNewMilestoneTitle(e.target.value)}
                        placeholder="Ajouter une sous-tâche..."
                        className="w-full bg-[#0c0c0e] border border-[#1a1a1a] focus:border-purple-500 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none transition"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddMilestone();
                          }
                        }}
                      />
                      <button
                        type="button"
                        id="add-milestone-form-btn"
                        onClick={handleAddMilestone}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition shrink-0 cursor-pointer"
                      >
                        Ajouter
                      </button>
                    </div>
                  </div>
                )}

                {/* Submit buttons */}
                <button
                  type="submit"
                  id="submit-quest-btn"
                  className="w-full bg-gradient-to-r from-[#10b981] to-[#059669] hover:opacity-90 text-slate-950 font-bold py-2.5 rounded-xl transition text-sm tracking-wider uppercase font-display shadow-[0_0_15px_rgba(16,185,129,0.2)] cursor-pointer"
                >
                  Graver dans le Grimoire des Quêtes
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* QUEST COMPLETE CONFIRMATION MODAL */}
      <AnimatePresence>
        {confirmingQuest && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setConfirmingQuest(null)}
              className="absolute inset-0 bg-[#09090b]/95 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="relative w-full max-w-md bg-[#0c0c0e] border border-[#10b981]/30 rounded-2xl shadow-2xl p-6 text-center z-10"
            >
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500 via-[#10b981] to-emerald-500" />
              
              <div className="text-4xl my-2">🏆</div>
              <h3 className="text-base font-bold font-display text-slate-100 tracking-wide uppercase">
                Valider cette Quête ?
              </h3>
              
              <p className="text-sm font-semibold text-[#10b981] font-display mt-2 px-4 leading-relaxed">
                « {confirmingQuest.title} »
              </p>

              {confirmingQuest.description && (
                <p className="text-xs text-slate-400 font-sans mt-1 max-w-xs mx-auto italic">
                  {confirmingQuest.description}
                </p>
              )}

              {/* Loot Rewards previews */}
              <div className="bg-[#111113] border border-[#1a1a1a] rounded-xl p-4 my-4 grid grid-cols-2 gap-3 max-w-xs mx-auto">
                <div className="flex flex-col items-center justify-center">
                  <span className="text-lg">✨</span>
                  <span className="text-xs font-semibold text-slate-400 mt-0.5">Expérience</span>
                  <span className="font-mono text-sm font-bold text-teal-400">
                    +{confirmingQuest.difficulty === 'easy' ? 15 : confirmingQuest.difficulty === 'medium' ? 35 : confirmingQuest.difficulty === 'hard' ? 80 : 250} XP
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center border-l border-[#1a1a1a]">
                  <span className="text-lg">🪙</span>
                  <span className="text-xs font-semibold text-slate-400 mt-0.5">Or de Butin</span>
                  <span className="font-mono text-sm font-bold text-emerald-400">
                    +{confirmingQuest.difficulty === 'easy' ? 10 : confirmingQuest.difficulty === 'medium' ? 25 : confirmingQuest.difficulty === 'hard' ? 60 : 150} Or
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-500 leading-snug">
                Confirmez-vous avoir réellement accompli cet objectif aujourd'hui ?
              </p>

              <div className="flex gap-3 mt-5">
                <button
                  id="cancel-quest-completion"
                  type="button"
                  onClick={() => setConfirmingQuest(null)}
                  className="flex-1 px-4 py-2 border border-[#1a1a1a] text-slate-400 rounded-xl text-xs tracking-wider uppercase font-bold hover:text-white transition cursor-pointer"
                >
                  Non, pas encore
                </button>
                <button
                  id="confirm-quest-completion"
                  type="button"
                  onClick={() => {
                    onCompleteQuest(confirmingQuest.id);
                    setConfirmingQuest(null);
                  }}
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-[#059669] hover:opacity-95 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs tracking-wider uppercase transition shadow-[0_0_15px_rgba(16,185,129,0.2)] cursor-pointer"
                >
                  Oui, c'est fait !
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
