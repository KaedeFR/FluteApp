import React from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  Award, 
  Clock, 
  Zap, 
  Flame, 
  Target, 
  Dumbbell, 
  Brain, 
  Shield, 
  Sparkles, 
  Smile,
  CheckCircle2,
  Calendar,
  Compass
} from 'lucide-react';
import { Character, Quest, SkillNode, EquipmentItem } from '../types';

interface AnalyticsDashboardProps {
  character: Character;
  quests: Quest[];
  skills: SkillNode[];
  equipment: EquipmentItem[];
  questsCompletedCount: number;
  dailiesCompletedCount: number;
  totalGoldEarned: number;
}

export function AnalyticsDashboard({
  character,
  quests,
  skills,
  equipment,
  questsCompletedCount,
  dailiesCompletedCount,
  totalGoldEarned
}: AnalyticsDashboardProps) {
  // Calculations
  const totalQuests = quests.length;
  const completedQuestsList = quests.filter(q => q.completed);
  const activeQuestsList = quests.filter(q => !q.completed);
  
  const completedCount = questsCompletedCount + completedQuestsList.length; // estimate historical + current
  const activeCount = activeQuestsList.length;
  
  // Calculate category distributions
  const categories = [
    { id: 'serenity', name: 'Sérénité', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', icon: Smile },
    { id: 'wisdom', name: 'Sagesse', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', icon: Brain },
    { id: 'strength', name: 'Force', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20', icon: Dumbbell },
    { id: 'vitality', name: 'Vitalité', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20', icon: Shield },
    { id: 'magic', name: 'Magie', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20', icon: Sparkles }
  ];

  const categoryStats = categories.map(cat => {
    const totalInCat = quests.filter(q => q.category === cat.id).length;
    const completedInCat = quests.filter(q => q.category === cat.id && q.completed).length;
    const skillsInCat = skills.filter(s => s.category === cat.id && s.level > 0).length;
    
    return {
      ...cat,
      total: totalInCat,
      completed: completedInCat,
      skillsCount: skillsInCat,
      ratio: totalInCat > 0 ? Math.round((completedInCat / totalInCat) * 100) : 0
    };
  });

  // Productivity Score (0-100)
  const streakBonus = Math.min(20, (quests.reduce((max, q) => Math.max(max, q.streak || 0), 0)) * 2);
  const completionRate = totalQuests > 0 ? (completedQuestsList.length / totalQuests) * 100 : 75;
  const rawProductivityScore = Math.round((completionRate * 0.7) + (streakBonus * 1.5) + (character.level * 1.5));
  const productivityScore = Math.min(100, Math.max(10, rawProductivityScore));

  // Determine Productivity Tier
  let productivityLabel = 'Initié';
  if (productivityScore >= 90) {
    productivityLabel = 'Maître Flûtiste Zen';
  } else if (productivityScore >= 75) {
    productivityLabel = 'Discipline de l\'Éveil';
  } else if (productivityScore >= 50) {
    productivityLabel = 'Adepte Concentré';
  }

  // Next level progress percentage
  const xpNeeded = Math.round(100 * Math.pow(character.level, 1.5));
  const xpPercent = Math.round(Math.min(100, (character.xp / xpNeeded) * 100));

  // Count skills stats
  const unlockedSkills = skills.filter(s => s.level > 0).length;
  const maxedSkills = skills.filter(s => s.level >= s.maxLevel).length;

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#111113] border border-[#2a2a2a] p-6 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-1 z-10">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <h2 className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
              Analytique & Productivité
            </h2>
          </div>
          <h3 className="text-xl font-bold font-display text-white">Tableau de Bord de l'Éveil</h3>
        </div>

        <div className="flex items-center gap-4 bg-[#0c0c0e] border border-[#1a1a1c] p-3 rounded-xl shrink-0">
          <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 relative border border-emerald-500/20">
            <Flame className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <span className="text-[9px] uppercase tracking-wider text-slate-500 block font-mono">Score de Focus</span>
            <span className="text-2xl font-mono font-bold text-white">{productivityScore}%</span>
          </div>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#111113] border border-[#1a1a1c] rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#64748b] mb-2">
            <span className="text-[10px] font-mono uppercase tracking-wider">Quêtes Accomplies</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <span className="text-2xl font-mono font-bold text-white">{completedCount}</span>
            <p className="text-[9px] text-slate-400 mt-1">Disciplines totales validées</p>
          </div>
        </div>

        <div className="bg-[#111113] border border-[#1a1a1c] rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#64748b] mb-2">
            <span className="text-[10px] font-mono uppercase tracking-wider">Compétences Forgées</span>
            <Award className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <span className="text-2xl font-mono font-bold text-white">{unlockedSkills}</span>
            <p className="text-[9px] text-slate-400 mt-1">{maxedSkills} au rang maximum</p>
          </div>
        </div>

        <div className="bg-[#111113] border border-[#1a1a1c] rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#64748b] mb-2">
            <span className="text-[10px] font-mono uppercase tracking-wider">Trésor Accumulé</span>
            <Zap className="w-4 h-4 text-yellow-400" />
          </div>
          <div>
            <span className="text-2xl font-mono font-bold text-white">{totalGoldEarned} 🪙</span>
            <p className="text-[9px] text-slate-400 mt-1">Solde actuel : {character.gold} Or</p>
          </div>
        </div>

        <div className="bg-[#111113] border border-[#1a1a1c] rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#64748b] mb-2">
            <span className="text-[10px] font-mono uppercase tracking-wider">Niveau de Conscience</span>
            <Compass className="w-4 h-4 text-purple-400" />
          </div>
          <div>
            <span className="text-2xl font-mono font-bold text-white">Lvl {character.level}</span>
            <div className="flex items-center gap-1.5 mt-1.5">
              <div className="flex-1 bg-[#1a1a1a] h-1.5 rounded-full overflow-hidden">
                <div className="bg-purple-500 h-full rounded-full" style={{ width: `${xpPercent}%` }} />
              </div>
              <span className="text-[8px] font-mono text-slate-500">{xpPercent}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Analysis Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Stats & Category Radar Representation */}
        <div className="bg-[#111113] border border-[#1a1a1c] p-5 rounded-2xl space-y-4 lg:col-span-2">
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <Target className="w-4 h-4 text-emerald-400" />
            Répartition par Voie de l'Éveil
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Custom SVG Circular Graphic representation */}
            <div className="flex justify-center py-4 relative">
              <svg viewBox="0 0 200 200" className="w-48 h-48 max-w-full drop-shadow-xl">
                {/* Background circles */}
                <circle cx="100" cy="100" r="85" fill="none" stroke="#222" strokeWidth="1" strokeDasharray="4" />
                <circle cx="100" cy="100" r="60" fill="none" stroke="#222" strokeWidth="1" strokeDasharray="4" />
                <circle cx="100" cy="100" r="35" fill="none" stroke="#222" strokeWidth="1" strokeDasharray="4" />
                
                {/* Axes */}
                <line x1="100" y1="15" x2="100" y2="185" stroke="#1d1d21" strokeWidth="1" />
                <line x1="15" y1="100" x2="185" y2="100" stroke="#1d1d21" strokeWidth="1" />

                {/* SVG Polygon representation mapping category ratios */}
                {(() => {
                  const points = categoryStats.map((cat, i) => {
                    const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
                    const value = Math.max(15, Math.min(85, 15 + (cat.ratio * 0.7))); // ratio map to radius
                    const x = 100 + value * Math.cos(angle);
                    const y = 100 + value * Math.sin(angle);
                    return `${x},${y}`;
                  }).join(' ');

                  return (
                    <>
                      {/* Interactive Polygon shadow */}
                      <polygon 
                        points={points} 
                        fill="rgba(16, 185, 129, 0.15)" 
                        stroke="#10b981" 
                        strokeWidth="2.5" 
                        className="animate-pulse"
                      />
                      
                      {/* Dots on the tips */}
                      {categoryStats.map((cat, i) => {
                        const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
                        const value = Math.max(15, Math.min(85, 15 + (cat.ratio * 0.7)));
                        const x = 100 + value * Math.cos(angle);
                        const y = 100 + value * Math.sin(angle);
                        let dotColor = '#10b981';
                        if (cat.id === 'wisdom') dotColor = '#60a5fa';
                        if (cat.id === 'strength') dotColor = '#fb923c';
                        if (cat.id === 'vitality') dotColor = '#f87171';
                        if (cat.id === 'magic') dotColor = '#c084fc';

                        return (
                          <circle 
                            key={cat.id} 
                            cx={x} 
                            cy={y} 
                            r="5" 
                            fill={dotColor} 
                            stroke="#09090b" 
                            strokeWidth="1.5" 
                          />
                        );
                      })}
                    </>
                  );
                })()}

                {/* Label Positions */}
                <text x="100" y="12" fill="#a1a1aa" fontSize="8" textAnchor="middle" className="font-mono uppercase font-bold">SER</text>
                <text x="188" y="80" fill="#a1a1aa" fontSize="8" textAnchor="start" className="font-mono uppercase font-bold">SAG</text>
                <text x="155" y="180" fill="#a1a1aa" fontSize="8" textAnchor="middle" className="font-mono uppercase font-bold">FOR</text>
                <text x="45" y="180" fill="#a1a1aa" fontSize="8" textAnchor="middle" className="font-mono uppercase font-bold">VIT</text>
                <text x="12" y="80" fill="#a1a1aa" fontSize="8" textAnchor="end" className="font-mono uppercase font-bold">MAG</text>
              </svg>
              
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center bg-[#09090b]/80 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-[#2a2a2a]">
                  <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest block">Équilibre</span>
                  <span className="text-xs font-mono font-extrabold text-[#10b981]">Harmonieux</span>
                </div>
              </div>
            </div>

            {/* List with horizontal meters */}
            <div className="space-y-3.5">
              {categoryStats.map((cat) => {
                const Icon = cat.icon;
                return (
                  <div key={cat.id} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className={`p-1 rounded ${cat.bg} ${cat.color} border ${cat.border}`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <span className="font-medium text-slate-300">{cat.name}</span>
                      </div>
                      <div className="font-mono text-slate-400 text-[11px] flex gap-2">
                        <span>{cat.completed}/{cat.total} quêtes</span>
                        <span className={`${cat.color} font-bold`}>{cat.ratio}%</span>
                      </div>
                    </div>
                    
                    <div className="h-2 w-full bg-[#1a1a1a] rounded-full overflow-hidden p-[1px] border border-[#2a2a2a]">
                      <div 
                        className={`h-full rounded-full transition-all duration-700 ${
                          cat.id === 'serenity' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]' :
                          cat.id === 'wisdom' ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.4)]' :
                          cat.id === 'strength' ? 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.4)]' :
                          cat.id === 'vitality' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]' :
                          'bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.4)]'
                        }`} 
                        style={{ width: `${Math.max(4, cat.ratio)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Productivity Diagnostic */}
        <div className="bg-[#111113] border border-[#1a1a1c] p-5 rounded-2xl flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-400" />
              Diagnostic de Régularité
            </h4>

            {/* Score Ring Display */}
            <div className="bg-[#0c0c0e] border border-[#1a1a1c] p-4 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[9px] uppercase font-mono tracking-wider text-slate-500 block">Niveau de Discipline</span>
                  <span className="text-sm font-bold text-emerald-400 font-display">{productivityLabel}</span>
                </div>
                <div className="text-right">
                  <span className="text-[9px] uppercase font-mono tracking-wider text-slate-500 block">Streak Max</span>
                  <span className="text-xs font-mono font-bold text-orange-400">🔥 {quests.reduce((max, q) => Math.max(max, q.streak || 0), 0)} J</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2 text-center text-[9px] font-mono text-slate-600 border-t border-[#1a1a1c] mt-auto">
            Généré localement • Mis à jour en temps réel
          </div>
        </div>

      </div>
    </div>
  );
}
