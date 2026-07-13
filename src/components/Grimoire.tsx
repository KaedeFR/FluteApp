/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Achievement, Character, Quest, JournalEntries } from '../types';
import { 
  Award, 
  Compass, 
  Flame, 
  Shield, 
  BookOpen, 
  Crown, 
  Coins, 
  Sparkles, 
  Gem, 
  Zap,
  TrendingUp,
  Calendar as CalendarIcon,
  CheckCircle2,
  Heart,
  ChevronLeft,
  ChevronRight,
  PenTool,
  Save,
  BookMarked,
  Scroll,
  CalendarDays
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface GrimoireProps {
  achievements: Achievement[];
  character: Character;
  questsCompletedCount: number;
  dailiesCompletedCount: number;
  totalGoldEarned: number;
  quests: Quest[];
  journalEntries?: JournalEntries;
  onSaveJournalEntry?: (dateStr: string, noteText: string) => void;
}

const ICON_MAP: Record<string, any> = {
  Compass,
  Award,
  Crown,
  Flame,
  Coins,
  Gem,
  Shield,
  BookOpen,
  Zap
};

const MONTHS_FR = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
];

const DAYS_FR = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

export function Grimoire({
  achievements,
  character,
  questsCompletedCount,
  dailiesCompletedCount,
  totalGoldEarned,
  quests = [],
  journalEntries = {},
  onSaveJournalEntry,
}: GrimoireProps) {
  // Calendar states
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [selectedDateStr, setSelectedDateStr] = useState(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  });

  // Local note draft
  const [localNote, setLocalNote] = useState('');
  const [isSavedSuccessfully, setIsSavedSuccessfully] = useState(false);

  // Keep local draft synchronized with selected date in journalEntries
  useEffect(() => {
    setLocalNote(journalEntries[selectedDateStr] || '');
    setIsSavedSuccessfully(false);
  }, [selectedDateStr, journalEntries]);

  const selectedYear = currentDate.getFullYear();
  const selectedMonth = currentDate.getMonth();

  // Navigation handlers
  const handlePrevMonth = () => {
    setCurrentDate(new Date(selectedYear, selectedMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(selectedYear, selectedMonth + 1, 1));
  };

  const handleGoToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    setSelectedDateStr(`${year}-${month}-${day}`);
  };

  // Helper to retrieve the correct Lucide icon component
  const getBadgeIcon = (name: string) => {
    return ICON_MAP[name] || Award;
  };

  // Rolling 28-day consistency rating (identical logic, separate computation)
  const getConsistencyPercentage = () => {
    const today = new Date();
    let activeDays = 0;
    for (let i = 27; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      const completed = quests.filter(q => q.completed && q.lastCompletedDate === dateStr).length;
      if (completed > 0) activeDays++;
    }
    return Math.round((activeDays / 28) * 100);
  };

  const consistencyPercent = getConsistencyPercentage();

  // Generate calendar cells (6 weeks matrix starting Monday)
  const generateMonthCells = () => {
    const cells = [];
    const daysInCurrentMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(selectedYear, selectedMonth, 0).getDate();
    
    // Day of the week offset for 1st of month (Monday = 0, Sunday = 6)
    const firstDay = new Date(selectedYear, selectedMonth, 1);
    const dayOfWeek = firstDay.getDay();
    const offset = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

    // Previous month trailing days
    for (let i = offset - 1; i >= 0; i--) {
      const d = daysInPrevMonth - i;
      const prevMonthDate = new Date(selectedYear, selectedMonth - 1, d);
      const dateStr = `${prevMonthDate.getFullYear()}-${String(prevMonthDate.getMonth() + 1).padStart(2, '0')}-${String(prevMonthDate.getDate()).padStart(2, '0')}`;
      cells.push({
        day: d,
        dateStr,
        isCurrentMonth: false,
        date: prevMonthDate,
      });
    }

    // Current month days
    for (let d = 1; d <= daysInCurrentMonth; d++) {
      const dateStr = `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      cells.push({
        day: d,
        dateStr,
        isCurrentMonth: true,
        date: new Date(selectedYear, selectedMonth, d),
      });
    }

    // Next month trailing days to pad standard 42 cell grid
    const remaining = 42 - cells.length;
    for (let d = 1; d <= remaining; d++) {
      const nextMonthDate = new Date(selectedYear, selectedMonth + 1, d);
      const dateStr = `${nextMonthDate.getFullYear()}-${String(nextMonthDate.getMonth() + 1).padStart(2, '0')}-${String(nextMonthDate.getDate()).padStart(2, '0')}`;
      cells.push({
        day: d,
        dateStr,
        isCurrentMonth: false,
        date: nextMonthDate,
      });
    }

    return cells;
  };

  const calendarCells = generateMonthCells();

  // Color mapping based on completed quests count on that day
  const getQuestsCompletedCountForDate = (dateStr: string) => {
    return quests.filter(q => q.completed && q.lastCompletedDate === dateStr).length;
  };

  const getHeatmapColorClass = (count: number, isCurrentMonth: boolean, isSelected: boolean) => {
    if (isSelected) {
      return 'border-[#10b981] shadow-[0_0_12px_rgba(16,185,129,0.3)] scale-105 z-10 bg-[#10b981]/20 text-[#10b981]';
    }

    const baseOpacity = isCurrentMonth ? 'opacity-100' : 'opacity-35';
    
    if (count >= 3) {
      return `${baseOpacity} bg-[#10b981] border-[#10b981] text-slate-950 font-extrabold`;
    } else if (count === 2) {
      return `${baseOpacity} bg-[#10b981]/40 border-[#10b981]/50 text-[#10b981] font-bold`;
    } else if (count === 1) {
      return `${baseOpacity} bg-[#10b981]/15 border-[#10b981]/25 text-[#10b981]/90`;
    } else {
      return `${baseOpacity} bg-[#0c0c0e] border-[#161619] text-slate-400 hover:border-[#2a2a2f]`;
    }
  };

  const handleSaveNotes = () => {
    if (onSaveJournalEntry) {
      onSaveJournalEntry(selectedDateStr, localNote);
      setIsSavedSuccessfully(true);
      setTimeout(() => setIsSavedSuccessfully(false), 2000);
    }
  };

  // Convert "YYYY-MM-DD" into "Mardi 14 Juillet 2026"
  const formatSelectedDateFullFR = (dateStr: string) => {
    try {
      const parts = dateStr.split('-');
      const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
      return d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    } catch (e) {
      return dateStr;
    }
  };

  // Completed quests listed on the selected day
  const completedQuestsForSelectedDate = quests.filter(
    q => q.completed && q.lastCompletedDate === selectedDateStr
  );

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <div className="space-y-8">
      {/* Overview Analytics Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Insight Card 1 */}
        <div className="bg-[#111113]/90 border border-[#1a1a1a] rounded-2xl p-5 backdrop-blur-xl relative overflow-hidden flex items-center gap-4">
          <div className="p-3.5 bg-[#10b981]/10 border border-[#10b981]/20 text-[#10b981] rounded-xl">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-400 tracking-wider font-mono uppercase">Expérience Totale Cumulée</div>
            <div className="text-xl font-extrabold text-slate-100 mt-0.5 font-display">
              {Math.round(character.xp + (character.level > 1 ? Array.from({ length: character.level - 1 }, (_, k) => Math.round(100 * Math.pow(k + 1, 1.5))).reduce((a, b) => a + b, 0) : 0))} <span className="text-xs text-[#10b981] font-mono">XP</span>
            </div>
          </div>
        </div>

        {/* Insight Card 2 */}
        <div className="bg-[#111113]/90 border border-[#1a1a1a] rounded-2xl p-5 backdrop-blur-xl relative overflow-hidden flex items-center gap-4">
          <div className="p-3.5 bg-pink-950/25 border border-pink-500/20 text-pink-400 rounded-xl">
            <CalendarIcon className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-400 tracking-wider font-mono uppercase">Régularité des Habitudes</div>
            <div className="text-xl font-extrabold text-slate-100 mt-0.5 font-display">
              {consistencyPercent} %
            </div>
          </div>
        </div>

        {/* Insight Card 3 */}
        <div className="bg-[#111113]/90 border border-[#1a1a1a] rounded-2xl p-5 backdrop-blur-xl relative overflow-hidden flex items-center gap-4">
          <div className="p-3.5 bg-purple-950/25 border border-purple-500/20 text-purple-400 rounded-xl">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-400 tracking-wider font-mono uppercase">Hauts Faits Débloqués</div>
            <div className="text-xl font-extrabold text-slate-100 mt-0.5 font-display">
              {unlockedCount} / {achievements.length} <span className="text-xs text-purple-400 font-mono">Badges</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reworked Calendar & Journal Split Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Grid Panel: Monthly Calendar */}
        <div className="bg-[#111113]/95 border border-[#1a1a1a] rounded-2xl p-6 relative overflow-hidden backdrop-blur-xl lg:col-span-7 flex flex-col justify-between">
          <div>
            {/* Calendar Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
              <h3 className="text-sm font-semibold text-slate-200 tracking-wider font-display uppercase flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-[#10b981]" />
                Calendrier
              </h3>

              <div className="flex items-center gap-2 bg-[#0c0c0e] border border-[#1a1a1a] p-1 rounded-xl">
                <button
                  id="calendar-prev-month"
                  onClick={handlePrevMonth}
                  className="p-1.5 hover:bg-[#1a1a1a] text-slate-400 hover:text-white rounded-lg transition"
                  title="Mois précédent"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <span className="text-xs font-bold text-slate-300 px-3 font-mono min-w-[120px] text-center uppercase tracking-wide">
                  {MONTHS_FR[selectedMonth]} {selectedYear}
                </span>

                <button
                  id="calendar-next-month"
                  onClick={handleNextMonth}
                  className="p-1.5 hover:bg-[#1a1a1a] text-slate-400 hover:text-white rounded-lg transition"
                  title="Mois suivant"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                <div className="h-4 w-[1px] bg-[#1a1a1a] mx-1" />

                <button
                  id="calendar-today"
                  onClick={handleGoToToday}
                  className="text-[9px] font-bold font-mono px-2 py-1.5 hover:bg-[#1a1a1a] text-[#10b981] rounded-lg transition uppercase tracking-wider"
                  title="Revenir à aujourd'hui"
                >
                  Aujourd'hui
                </button>
              </div>
            </div>

            {/* Weekdays Row */}
            <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-bold font-mono text-slate-500 mb-2 uppercase tracking-wider">
              {DAYS_FR.map(d => (
                <div key={d} className="py-1">
                  {d}
                </div>
              ))}
            </div>

            {/* Days Cells Grid */}
            <div className="grid grid-cols-7 gap-2">
              {calendarCells.map((cell, idx) => {
                const completedCount = getQuestsCompletedCountForDate(cell.dateStr);
                const isSelected = selectedDateStr === cell.dateStr;
                const hasNote = !!journalEntries[cell.dateStr];

                return (
                  <button
                    key={idx}
                    id={`day-${cell.dateStr}`}
                    onClick={() => setSelectedDateStr(cell.dateStr)}
                    className={`aspect-square rounded-xl border flex flex-col items-center justify-between p-1.5 text-[11px] font-mono font-bold transition-all duration-200 relative group overflow-hidden ${getHeatmapColorClass(
                      completedCount,
                      cell.isCurrentMonth,
                      isSelected
                    )}`}
                  >
                    {/* Golden journal marker dot / pen sign in corner */}
                    {hasNote && (
                      <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#10b981] rounded-full shadow-[0_0_8px_#10b981]" />
                    )}

                    {/* Day Number */}
                    <span className="relative z-10 self-start">{cell.day}</span>

                    {/* Miniature completion icons or counts */}
                    {completedCount > 0 && (
                      <span className="text-[8px] opacity-75 self-end mt-auto leading-none">
                        {completedCount}⚡
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Grid Legend */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center justify-between text-[10px] font-mono text-slate-500 pt-5 mt-6 border-t border-[#161619]">
            <div className="flex items-center gap-1.5">
              <span>Niveau d'activité : </span>
              <div className="w-3 h-3 bg-[#0c0c0e] border border-[#161619] rounded" />
              <div className="w-3 h-3 bg-[#10b981]/15 border border-[#10b981]/25 rounded" />
              <div className="w-3 h-3 bg-[#10b981]/40 border-[#10b981]/50 rounded" />
              <div className="w-3 h-3 bg-[#10b981] border border-[#10b981] rounded" />
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-[#10b981] rounded-full shadow-[0_0_8px_#10b981]" />
              <span>Indique une note enregistrée dans le journal</span>
            </div>
          </div>
        </div>

        {/* Right Grid Panel: Journal Editor & Achievements details */}
        <div className="bg-[#111113]/95 border border-[#1a1a1a] rounded-2xl p-6 relative backdrop-blur-xl lg:col-span-5 flex flex-col justify-between overflow-hidden">
          {/* Gold subtle corner framing to make it look like a scroll/parchment */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#10b981]/30 rounded-tl pointer-events-none" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#10b981]/30 rounded-tr pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#10b981]/30 rounded-bl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#10b981]/30 rounded-br pointer-events-none" />

          <div className="space-y-5">
            {/* Journal Title */}
            <div>
              <div className="text-[10px] font-bold text-[#10b981] font-mono uppercase tracking-[0.2em] flex items-center gap-1.5">
                <Scroll className="w-3.5 h-3.5 text-[#10b981]" />
                Journal
              </div>
              <h4 className="text-sm font-bold text-slate-200 mt-1 capitalize font-display">
                {formatSelectedDateFullFR(selectedDateStr)}
              </h4>
            </div>

            {/* Rich Note Textarea */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 font-mono uppercase tracking-wider block">
                📝 Carnet de Route
              </label>
              <textarea
                id="journal-note-input"
                className="bg-[#070708] border border-[#1a1a1a] text-slate-100 placeholder-slate-600 focus:border-[#10b981]/50 focus:ring-1 focus:ring-[#10b981]/50 rounded-xl p-4 w-full h-44 resize-none font-sans text-xs leading-relaxed focus:outline-none transition-all duration-300"
                placeholder="Consignez vos exploits, vos leçons du jour, ou vos pensées personnelles dans ce parchemin..."
                value={localNote}
                onChange={(e) => setLocalNote(e.target.value)}
              />
            </div>

            {/* Actions Panel */}
            <div className="flex items-center justify-between gap-3 pt-1">
              <button
                id="journal-save-btn"
                onClick={handleSaveNotes}
                className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 px-4 font-bold font-display text-xs uppercase tracking-wider transition-all duration-300 ${
                  isSavedSuccessfully 
                    ? 'bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                    : 'bg-gradient-to-r from-[#10b981] to-[#059669] text-slate-950 hover:shadow-[0_0_15px_rgba(16,185,129,0.25)]'
                }`}
              >
                {isSavedSuccessfully ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 animate-bounce" />
                    Notes Sauvegardées !
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Enregistrer les Notes
                  </>
                )}
              </button>
            </div>

            {/* List of Deeds/Quests completed this day */}
            <div className="border-t border-[#1a1a1a] pt-4 space-y-2">
              <div className="text-[10px] font-bold text-slate-400 font-mono uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                Exploits Validés ({completedQuestsForSelectedDate.length})
              </div>

              <div className="max-h-[140px] overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                {completedQuestsForSelectedDate.length > 0 ? (
                  completedQuestsForSelectedDate.map((q) => (
                    <div 
                      key={q.id}
                      className="bg-[#0c0c0e] border border-[#161619] rounded-xl p-2.5 flex items-center justify-between text-xs transition hover:border-slate-800"
                    >
                      <div className="min-w-0 pr-2">
                        <p className="font-semibold text-slate-300 truncate">{q.title}</p>
                        <p className="text-[9px] text-slate-500 truncate mt-0.5">{q.description}</p>
                      </div>
                      <span className="shrink-0 text-[10px] font-bold font-mono text-[#10b981] bg-[#10b981]/10 px-1.5 py-0.5 rounded border border-[#10b981]/10">
                        {q.difficulty === 'easy' ? '+10XP' : q.difficulty === 'medium' ? '+25XP' : q.difficulty === 'hard' ? '+50XP' : '+100XP'}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-[11px] text-slate-500 italic py-2">
                    Aucun fait marquant n'a été accompli dans le grimoire aujourd'hui. Remplissez des quêtes pour forger votre légende !
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-slate-300 tracking-wider font-display uppercase flex items-center gap-2">
          <Award className="w-4 h-4 text-purple-400" />
          Hauts Faits
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((ach) => {
            const BadgeIcon = getBadgeIcon(ach.badgeIcon);
            const progressPercent = Math.round((ach.progress / ach.target) * 100);

            return (
              <div
                key={ach.id}
                className={`border rounded-xl p-4 flex gap-4 relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:border-[#10b981]/40 ${
                  ach.unlocked 
                    ? 'bg-[#111113]/95 border-[#10b981]/30 shadow-[0_0_15px_rgba(16,185,129,0.08)]' 
                    : 'bg-[#111113]/40 border-[#1a1a1a]'
                }`}
              >
                {/* Gold aura for unlocked badges */}
                {ach.unlocked && (
                  <div className="absolute top-0 right-0 w-16 h-16 bg-[#10b981]/5 rounded-full blur-xl pointer-events-none" />
                )}

                {/* Badge Icon circle */}
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 transition-all duration-300 ${
                  ach.unlocked 
                    ? 'bg-[#10b981]/10 border-[#10b981] text-[#10b981] scale-105 shadow-[0_0_10px_rgba(16,185,129,0.15)]' 
                    : 'bg-[#0c0c0e] border-[#1a1a1a] text-slate-600'
                }`}>
                  <BadgeIcon className="w-6 h-6" />
                </div>

                {/* Text & Progress */}
                <div className="flex-1 min-w-0 space-y-1.5 self-center">
                  <div>
                    <h4 className={`font-semibold text-sm leading-snug font-display tracking-wide truncate ${ach.unlocked ? 'text-slate-200' : 'text-slate-500'}`}>
                      {ach.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 leading-normal line-clamp-2">
                      {ach.description}
                    </p>
                  </div>

                  {/* Progress Line */}
                  {!ach.unlocked && (
                    <div className="space-y-1 pt-1">
                      <div className="flex justify-between text-[9px] font-mono text-slate-500">
                        <span>Progression</span>
                        <span>{ach.progress} / {ach.target}</span>
                      </div>
                      <div className="w-full bg-[#0c0c0e] h-1.5 rounded-full overflow-hidden border border-[#1a1a1a]">
                        <div 
                          className="bg-gradient-to-r from-purple-600 to-indigo-500 h-full rounded-full transition-all duration-500"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {ach.unlocked && (
                    <div className="text-[10px] font-bold text-[#10b981] font-mono flex items-center gap-1.5 pt-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" />
                      COMPLÉTÉ
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
