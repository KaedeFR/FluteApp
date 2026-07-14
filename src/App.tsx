/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Character, Quest, Reward, Achievement, QuestType, ActiveTimer, SkillNode, EquipmentItem, JournalEntries, CharacterProfile, KeyboardShortcuts } from './types';
import { GamificationEngine } from './lib/gamification';
import { FLUTE_MONK_QUESTS, FLUTE_MONK_SKILLS, FLUTE_MONK_ACHIEVEMENTS } from './data/fluteMonkArchetype';
import { CharacterSheet } from './components/CharacterSheet';
import { QuestBoard } from './components/QuestBoard';
import { LootShop } from './components/LootShop';
import { Grimoire } from './components/Grimoire';
import { SkillTree } from './components/SkillTree';
import { Inventory } from './components/Inventory';
import { MainMenu } from './components/MainMenu';
import { CharacterCreation } from './components/CharacterCreation';
import { SettingsMenu } from './components/SettingsMenu';
import { SetupGuide } from './components/SetupGuide';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { 
  User, 
  Calendar, 
  ShoppingBag, 
  Award, 
  Coins, 
  Heart, 
  Star, 
  Sparkles,
  Volume2,
  VolumeX,
  X,
  ShieldAlert,
  Dumbbell,
  GitBranch,
  Backpack,
  TrendingUp,
  Lock,
  Unlock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Default mock seed data
const DEFAULT_CHARACTER: Character = {
  name: 'Kaelen l\'Audacieux',
  avatarId: 'warrior',
  classTitle: 'Aventurier Novice',
  level: 1,
  xp: 0,
  hp: 100,
  maxHp: 100,
  gold: 60,
  stats: {
    vitality: 5,
    wisdom: 5,
    strength: 5,
    serenity: 5,
    magic: 5,
  },
};

const DEFAULT_SKILLS: SkillNode[] = [
  { 
    id: 's-vit-1', 
    title: 'Sommeil Royal', 
    description: 'Garantit au moins 7h30 de sommeil réparateur pour revitaliser le corps.', 
    category: 'vitality', 
    cost: 30, 
    unlocked: false, 
    level: 0, 
    maxLevel: 5,
    ranks: [
      { rank: 1, title: 'Éveil Sain', description: 'Se coucher avant 23h30 pour un sommeil réparateur.' },
      { rank: 2, title: 'Régularité', description: 'Dormir au moins 7h par nuit pour stabiliser l\'humeur.' },
      { rank: 3, title: 'Sommeil Profond', description: 'Éteindre tous les écrans 30 minutes avant de dormir.' },
      { rank: 4, title: 'Restauration', description: 'Zéro caféine après 14h pour préserver le cycle.' },
      { rank: 5, title: 'Sommeil Royal', description: 'Un rythme régulier parfait de 7h30 de sommeil réparateur.' }
    ]
  },
  { 
    id: 's-wis-1', 
    title: 'Hyper-Concentration', 
    description: 'Technique Pomodoro pour éliminer les distractions et optimiser l\'intellect.', 
    category: 'wisdom', 
    cost: 30, 
    unlocked: false, 
    level: 0, 
    maxLevel: 5,
    ranks: [
      { rank: 1, title: 'Débutant Concentré', description: 'Effectuer 1 session Pomodoro de 25 minutes sans distraction.' },
      { rank: 2, title: 'Productivité', description: 'Travailler sur une tâche complexe sans téléphone pendant 1h.' },
      { rank: 3, title: 'Flow de Travail', description: 'Réaliser 2 sessions Pomodoro consécutives avec 5m de pause.' },
      { rank: 4, title: 'Esprit Clair', description: 'Bloquer les distractions numériques et sites inutiles toute la matinée.' },
      { rank: 5, title: 'Hyper-Concentration', description: 'Maîtriser une session de concentration profonde de 2h de flow.' }
    ]
  },
  { 
    id: 's-str-1', 
    title: 'Rigueur de l\'Acier', 
    description: 'Maintient un rythme d\'entraînement hebdomadaire infaillible.', 
    category: 'strength', 
    cost: 40, 
    unlocked: false, 
    level: 0, 
    maxLevel: 5,
    ranks: [
      { rank: 1, title: 'Mise en route', description: 'Faire 15 minutes d\'exercice physique ou de marche rapide.' },
      { rank: 2, title: 'Consistance', description: 'S\'entraîner au moins 2 fois par semaine au poids du corps ou en salle.' },
      { rank: 3, title: 'Force d\'acier', description: 'Faire une séance complète intense de 45 minutes.' },
      { rank: 4, title: 'Dépassement de soi', description: 'Améliorer son endurance ou augmenter la charge sur un exercice.' },
      { rank: 5, title: 'Athlète Émérite', description: 'Rythme d\'entraînement hebdomadaire de 3 séances maintenu avec succès.' }
    ]
  },
  { 
    id: 's-ser-1', 
    title: 'Calme Stoïque', 
    description: 'S\'accorde un moment de respiration profonde lors des pics de stress.', 
    category: 'serenity', 
    cost: 30, 
    unlocked: false, 
    level: 0, 
    maxLevel: 5,
    ranks: [
      { rank: 1, title: 'Instant Présent', description: 'Faire 3 respirations profondes lors d\'un pic de stress.' },
      { rank: 2, title: 'Détachement', description: 'Prendre du recul et accepter calmement un imprévu quotidien.' },
      { rank: 3, title: 'Sérénité Matinale', description: 'Commencer la journée par 5 minutes de méditation en silence.' },
      { rank: 4, title: 'Contrôle Stoïque', description: 'Désamorcer une frustration par l\'analyse rationnelle.' },
      { rank: 5, title: 'Esprit de Plomb', description: 'Calme et calme olympien inaltérable face à n\'importe quelle situation.' }
    ]
  },
  { 
    id: 's-mag-1', 
    title: 'Flûtiste Divin', 
    description: 'Améliore la maîtrise de votre art, qu\'il s\'agisse de musique ou de code.', 
    category: 'magic', 
    cost: 35, 
    unlocked: false, 
    level: 0, 
    maxLevel: 5,
    ranks: [
      { rank: 1, title: 'Apprenti Artisan', description: 'Pratiquer son instrument ou programmer pendant 30m.' },
      { rank: 2, title: 'Harmonie', description: 'Étudier une nouvelle technique théorique ou un design pattern.' },
      { rank: 3, title: 'Créateur Agile', description: 'Résoudre un défi technique complexe de programmation ou d\'écriture.' },
      { rank: 4, title: 'Virtuose', description: 'Créer un projet open-source personnel ou composer un morceau entier.' },
      { rank: 5, title: 'Flûtiste Divin', description: 'Maîtrise artistique et technique parfaite démontrée au quotidien.' }
    ]
  },
];

const DEFAULT_QUESTS: Quest[] = [
  {
    id: 'q-seed-1',
    title: 'Hydratation Maximale (2L d\'eau)',
    description: 'Boire un grand verre d\'eau régulièrement tout au long de la journée.',
    type: 'daily',
    difficulty: 'easy',
    category: 'vitality',
    completed: false,
    streak: 0,
    createdAt: new Date().toISOString(),
    frequency: 'daily',
    isMain: false,
  },
  {
    id: 'q-seed-2',
    title: 'Grimoire du Savoir (Lecture 15m)',
    description: 'Lire un chapitre d\'un livre de développement personnel ou de fiction.',
    type: 'daily',
    difficulty: 'easy',
    category: 'wisdom',
    completed: false,
    streak: 0,
    createdAt: new Date().toISOString(),
    frequency: 'daily',
    isMain: false,
  },
  {
    id: 'q-seed-3',
    title: 'Quête Focus (Travail profond 1h)',
    description: 'Une heure de concentration intense sans regarder le téléphone.',
    type: 'daily',
    difficulty: 'medium',
    category: 'wisdom',
    completed: false,
    streak: 0,
    createdAt: new Date().toISOString(),
    frequency: 'daily',
    isMain: false,
  },
  {
    id: 'q-seed-4',
    title: 'Séance d\'entraînement du Héros',
    description: 'Une séance de sport intensive à la salle ou au poids du corps.',
    type: 'short',
    difficulty: 'hard',
    category: 'strength',
    completed: false,
    streak: 0,
    createdAt: new Date().toISOString(),
    frequency: 'once',
    isMain: false,
  },
  {
    id: 'q-seed-5',
    title: 'Lancer mon Application MVP',
    description: 'Construire la première version stable de mon idée de projet.',
    type: 'epic',
    difficulty: 'epic',
    category: 'magic',
    completed: false,
    streak: 0,
    milestones: [
      { id: 'ms-seed-1', title: 'Rédiger l\'arborescence et le schéma de données', completed: true },
      { id: 'ms-seed-2', title: 'Développer le moteur de gamification et l\'UI', completed: true },
      { id: 'ms-seed-3', title: 'Lancer le MVP pour les utilisateurs', completed: false },
    ],
    createdAt: new Date().toISOString(),
    frequency: 'once',
    isMain: true,
  },
];

interface Notification {
  id: string;
  title: string;
  description: string;
  type: 'levelup' | 'achievement' | 'purchased' | 'damage' | 'respawn';
}

const syncAllAchievements = (
  achievementsList: Achievement[],
  questsList: Quest[],
  skillsList: SkillNode[],
  onUnlockNotification?: (title: string, desc: string) => void
): Achievement[] => {
  return achievementsList.map(ach => {
    if (ach.unlocked) return ach;

    let isCompleted = false;

    // 1. Check milestone-based achievements
    for (const q of questsList) {
      if (q.milestones) {
        const matchingMs = q.milestones.find(m => 
          m.title.toLowerCase().startsWith(ach.title.toLowerCase()) ||
          m.title.toLowerCase().includes(ach.title.toLowerCase())
        );
        if (matchingMs && matchingMs.completed) {
          isCompleted = true;
          break;
        }
      }
    }

    // 2. Check skill-level based achievements (for physical feats)
    if (!isCompleted) {
      const tractionSkill = skillsList.find(s => s.id === 's-fm-traction');
      const dipsSkill = skillsList.find(s => s.id === 's-fm-dips');
      const benchSkill = skillsList.find(s => s.id === 's-fm-benchpress');
      const deadliftSkill = skillsList.find(s => s.id === 's-fm-deadlift');

      if (ach.id === 'a-fm-strength-pullup-10' && tractionSkill && tractionSkill.level >= 2) isCompleted = true;
      if (ach.id === 'a-fm-strength-pullup-20' && tractionSkill && tractionSkill.level >= 4) isCompleted = true;
      if (ach.id === 'a-fm-strength-pullup-30' && tractionSkill && tractionSkill.level >= 4) isCompleted = true;
      if (ach.id === 'a-fm-strength-pullup-40' && tractionSkill && tractionSkill.level >= 5) isCompleted = true;

      if (ach.id === 'a-fm-strength-dip-35' && dipsSkill && dipsSkill.level >= 3) isCompleted = true;
      if (ach.id === 'a-fm-strength-dip-50' && dipsSkill && dipsSkill.level >= 4) isCompleted = true;
      if (ach.id === 'a-fm-strength-dip-65' && dipsSkill && dipsSkill.level >= 4) isCompleted = true;
      if (ach.id === 'a-fm-strength-dip-80' && dipsSkill && dipsSkill.level >= 5) isCompleted = true;

      if (ach.id === 'a-fm-strength-bench-100' && benchSkill && benchSkill.level >= 2) isCompleted = true;
      if (ach.id === 'a-fm-strength-bench-120' && benchSkill && benchSkill.level >= 3) isCompleted = true;
      if (ach.id === 'a-fm-strength-bench-140' && benchSkill && benchSkill.level >= 4) isCompleted = true;
      if (ach.id === 'a-fm-strength-bench-160' && benchSkill && benchSkill.level >= 5) isCompleted = true;

      if (ach.id === 'a-fm-strength-dead-125' && deadliftSkill && deadliftSkill.level >= 2) isCompleted = true;
      if (ach.id === 'a-fm-strength-dead-150' && deadliftSkill && deadliftSkill.level >= 3) isCompleted = true;
      if (ach.id === 'a-fm-strength-dead-175' && deadliftSkill && deadliftSkill.level >= 4) isCompleted = true;
      if (ach.id === 'a-fm-strength-dead-200' && deadliftSkill && deadliftSkill.level >= 5) isCompleted = true;
    }

    if (isCompleted) {
      if (onUnlockNotification) {
        onUnlockNotification(ach.title, ach.description);
      }
      return {
        ...ach,
        progress: ach.target,
        unlocked: true,
        unlockedAt: new Date().toISOString()
      };
    }

    return ach;
  });
};

// Retroactive loop that calculates correct skill levels and stat bonuses
const applyRetroactiveSkillsSync = (
  qList: Quest[],
  sList: SkillNode[],
  char: Character
): { updatedSkills: SkillNode[]; updatedCharacter: Character; changed: boolean } => {
  let changed = false;
  const updatedCharacter = { ...char, stats: { ...char.stats } };

  const updatedSkills = sList.map(skill => {
    // Count how many completed quests are linked to this skill (validation / one-time quests)
    const completedQuestsCount = qList.filter(
      q => q.completed && q.skillIdToUnlock === skill.id && q.type !== 'daily'
    ).length;

    // Check if there are any associated daily quests
    const linkedDailies = qList.filter(
      q => q.type === 'daily' && q.skillIdToUnlock === skill.id
    );
    const hasLinkedDaily = linkedDailies.length > 0;

    let targetLevel = 0;

    if (hasLinkedDaily) {
      // For daily-linked skills, level is directly mapped to the streak / completion
      let maxStreak = 0;
      let anyCompleted = false;
      linkedDailies.forEach(q => {
        if (q.streak > maxStreak) maxStreak = q.streak;
        if (q.completed) anyCompleted = true;
      });

      // Daily streak tiers:
      // - level 1: streak >= 1 OR currently completed today
      // - level 2: streak >= 5
      // - level 3: streak >= 15
      // - level 4: streak >= 30
      // - level 5: streak >= 60
      if (maxStreak >= 60) targetLevel = 5;
      else if (maxStreak >= 30) targetLevel = 4;
      else if (maxStreak >= 15) targetLevel = 3;
      else if (maxStreak >= 5) targetLevel = 2;
      else if (maxStreak >= 1 || anyCompleted) targetLevel = 1;
      else targetLevel = 0;
    } else {
      // For standard skills, level is simply the completed count of its validation quests
      targetLevel = completedQuestsCount;
    }

    targetLevel = Math.min(skill.maxLevel, targetLevel);

    if (skill.level !== targetLevel || (targetLevel > 0 && !skill.unlocked)) {
      changed = true;
      const levelDiff = targetLevel - skill.level;
      
      // Update corresponding stat: +2 per level difference
      updatedCharacter.stats[skill.category] = (updatedCharacter.stats[skill.category] || 0) + (levelDiff * 2);
      
      return {
        ...skill,
        level: targetLevel,
        unlocked: targetLevel > 0,
      };
    }
    return skill;
  });

  return { updatedSkills, updatedCharacter, changed };
};

export default function App() {
  // Navigation state
  const [appState, setAppState] = useState<'menu' | 'character-creation' | 'game' | 'settings'>('menu');
  const [showSetupGuide, setShowSetupGuide] = useState(false);
  const [hasExistingCharacter, setHasExistingCharacter] = useState(false);
  
  // Multiple characters profiles state
  const [profiles, setProfiles] = useState<CharacterProfile[]>([]);
  const [activeProfileId, setActiveProfileId] = useState<string | null>(null);
  
  // Core state loaded from LocalStorage
  const [character, setCharacter] = useState<Character>(DEFAULT_CHARACTER);
  const [quests, setQuests] = useState<Quest[]>([]);
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [skills, setSkills] = useState<SkillNode[]>([]);
  const [equipment, setEquipment] = useState<EquipmentItem[]>([]);
  const [activeTimers, setActiveTimers] = useState<ActiveTimer[]>([]);
  const [journalEntries, setJournalEntries] = useState<JournalEntries>({});
  const [activeTab, setActiveTab] = useState<'character' | 'quests' | 'skills' | 'inventory' | 'shop' | 'grimoire' | 'analytics'>('quests');
  
  // Custom Keyboard Shortcuts & Windows Background States
  const [shortcuts, setShortcuts] = useState<KeyboardShortcuts>({
    navCharacter: 'c',
    navQuests: 'q',
    navSkills: 's',
    navInventory: 'i',
    navShop: 'b',
    navGrimoire: 'g',
    navAnalytics: 'a',
    toggleSound: 'm',
  });
  const [windowsBackgroundEnabled, setWindowsBackgroundEnabled] = useState(false);
  
  // App locked/unlocked mode state
  const [appModeLocked, setAppModeLocked] = useState<boolean>(() => {
    const cached = localStorage.getItem('rpg_app_mode_locked');
    return cached !== null ? cached === 'true' : true; // Default to locked mode
  });
  
  // Stats history for achievements
  const [history, setHistory] = useState({
    questsCompletedCount: 0,
    dailiesCompletedCount: 0,
    totalGoldEarned: 40, // start with starting gold
  });

  // Sound and notifications
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  // Dynamic uptime tracker matching Immersive theme
  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsElapsed(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Auto-dismiss notifications after 4.5 seconds to feel responsive and fast
  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        setNotifications(prev => prev.slice(1));
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, [notifications]);

  // Countdown timer ticker for purchased rewards
  useEffect(() => {
    const timerInterval = setInterval(() => {
      setActiveTimers(prevTimers => {
        if (prevTimers.length === 0) return prevTimers;
        
        let hasChanges = false;
        const nextTimers = prevTimers.map(t => {
          if (t.secondsRemaining > 0) {
            hasChanges = true;
            const updatedSec = t.secondsRemaining - 1;
            
            if (updatedSec === 0) {
              triggerNotification(
                'TEMPS ÉCOULÉ ! ⏰',
                `Votre temps de récompense pour "${t.rewardTitle}" est terminé. Prêt à reprendre l'entraînement, héros ?`,
                'levelup'
              );
            }
            return { ...t, secondsRemaining: updatedSec };
          }
          return t;
        }).filter(t => t.secondsRemaining > 0);
        
        if (hasChanges) {
          localStorage.setItem('rpg_timers', JSON.stringify(nextTimers));
        }
        return nextTimers;
      });
    }, 1000);
    
    return () => clearInterval(timerInterval);
  }, []);

  // Global Keyboard Shortcuts Event Listener
  useEffect(() => {
    const handleGlobalShortcuts = (e: KeyboardEvent) => {
      // Ignore if user is writing in a text input, textarea, or contenteditable
      const activeEl = document.activeElement;
      if (activeEl) {
        const tagName = activeEl.tagName.toLowerCase();
        if (tagName === 'input' || tagName === 'textarea' || tagName === 'select' || activeEl.hasAttribute('contenteditable')) {
          return;
        }
      }

      const key = e.key.toLowerCase();

      if (key === shortcuts.navCharacter) {
        e.preventDefault();
        setActiveTab('character');
      } else if (key === shortcuts.navQuests) {
        e.preventDefault();
        setActiveTab('quests');
      } else if (key === shortcuts.navSkills) {
        e.preventDefault();
        setActiveTab('skills');
      } else if (key === shortcuts.navInventory) {
        e.preventDefault();
        setActiveTab('inventory');
      } else if (key === shortcuts.navShop) {
        e.preventDefault();
        setActiveTab('shop');
      } else if (key === shortcuts.navGrimoire) {
        e.preventDefault();
        setActiveTab('grimoire');
      } else if (key === shortcuts.navAnalytics) {
        e.preventDefault();
        setActiveTab('analytics');
      } else if (key === shortcuts.toggleSound) {
        e.preventDefault();
        setSoundEnabled(prev => {
          const newVal = !prev;
          localStorage.setItem('rpg_sound_enabled', newVal.toString());
          return newVal;
        });
      }
    };

    window.addEventListener('keydown', handleGlobalShortcuts);
    return () => window.removeEventListener('keydown', handleGlobalShortcuts);
  }, [shortcuts]);

  const formatUptime = (sec: number) => {
    const h = Math.floor(sec / 3600).toString().padStart(2, '0');
    const m = Math.floor((sec % 3600) / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  // Initial Load & Seeding
  useEffect(() => {
    const cachedSound = localStorage.getItem('rpg_sound_enabled');
    const cachedNotifs = localStorage.getItem('rpg_notifs_enabled');
    const cachedShortcuts = localStorage.getItem('rpg_shortcuts');
    const cachedWinBg = localStorage.getItem('rpg_windows_background');

    if (cachedSound !== null) setSoundEnabled(cachedSound === 'true');
    if (cachedNotifs !== null) setNotificationsEnabled(cachedNotifs === 'true');
    if (cachedShortcuts !== null) {
      try {
        setShortcuts(JSON.parse(cachedShortcuts));
      } catch (e) {
        console.error("Failed to parse shortcuts", e);
      }
    }
    if (cachedWinBg !== null) setWindowsBackgroundEnabled(cachedWinBg === 'true');

    // 1. Load profiles list
    const cachedProfilesStr = localStorage.getItem('rpg_profiles');
    let loadedProfiles: CharacterProfile[] = [];
    
    if (cachedProfilesStr) {
      try {
        loadedProfiles = JSON.parse(cachedProfilesStr);
      } catch (e) {
        console.error("Failed to parse profiles", e);
      }
    }

    const cachedChar = localStorage.getItem('rpg_character');
    
    // Backward compatibility conversion:
    if (loadedProfiles.length === 0 && cachedChar) {
      try {
        const cachedQuests = localStorage.getItem('rpg_quests');
        const cachedRewards = localStorage.getItem('rpg_rewards');
        const cachedAchievements = localStorage.getItem('rpg_achievements');
        const cachedHistory = localStorage.getItem('rpg_history');
        const cachedSkills = localStorage.getItem('rpg_skills');
        const cachedTimers = localStorage.getItem('rpg_timers');
        const cachedEquipment = localStorage.getItem('rpg_equipment');
        const cachedJournal = localStorage.getItem('rpg_journal_entries');

        let loadedChar = JSON.parse(cachedChar);
        let loadedQuests = cachedQuests ? JSON.parse(cachedQuests) : DEFAULT_QUESTS;
        let loadedRewards = cachedRewards ? JSON.parse(cachedRewards) : GamificationEngine.getDefaultRewards();
        let loadedAchievements = cachedAchievements ? JSON.parse(cachedAchievements) : GamificationEngine.getDefaultAchievements();
        let loadedHistory = cachedHistory ? JSON.parse(cachedHistory) : { questsCompletedCount: 0, dailiesCompletedCount: 0, totalGoldEarned: 40 };
        let loadedSkills = cachedSkills ? JSON.parse(cachedSkills) : DEFAULT_SKILLS;
        let loadedEquipment = cachedEquipment ? JSON.parse(cachedEquipment) : GamificationEngine.getDefaultEquipment();
        if (!loadedEquipment || loadedEquipment.length === 0) {
          loadedEquipment = GamificationEngine.getDefaultEquipment();
        }
        let loadedTimers = cachedTimers ? JSON.parse(cachedTimers) : [];
        const loadedJournal = cachedJournal ? JSON.parse(cachedJournal) : {};

        // Run retroactive sync loop on initial load to maintain data consistency
        const { updatedSkills, updatedCharacter } = applyRetroactiveSkillsSync(
          loadedQuests,
          loadedSkills,
          loadedChar
        );

        const legacyProfile: CharacterProfile = {
          id: 'legacy-profile',
          createdAt: Date.now(),
          lastActiveAt: Date.now(),
          character: updatedCharacter,
          quests: loadedQuests,
          rewards: loadedRewards,
          achievements: loadedAchievements,
          skills: updatedSkills,
          equipment: loadedEquipment,
          activeTimers: loadedTimers,
          journalEntries: loadedJournal,
          history: loadedHistory
        };

        loadedProfiles = [legacyProfile];
        localStorage.setItem('rpg_profiles', JSON.stringify(loadedProfiles));
        localStorage.setItem('rpg_active_profile_id', 'legacy-profile');
      } catch (e) {
        console.error("Failed to parse legacy character", e);
      }
    }

    setProfiles(loadedProfiles);

    // 2. Select active profile ID
    let activeId = localStorage.getItem('rpg_active_profile_id');
    if (!activeId && loadedProfiles.length > 0) {
      loadedProfiles.sort((a, b) => b.lastActiveAt - a.lastActiveAt);
      activeId = loadedProfiles[0].id;
      localStorage.setItem('rpg_active_profile_id', activeId);
    }

    if (activeId) {
      const activeProf = loadedProfiles.find(p => p.id === activeId);
      if (activeProf) {
        setActiveProfileId(activeId);
        setHasExistingCharacter(true);

        // Load states
        setCharacter(activeProf.character);
        setQuests(activeProf.quests);
        setRewards(activeProf.rewards);
        setAchievements(activeProf.achievements);
        setHistory(activeProf.history);
        setSkills(activeProf.skills);
        setEquipment(activeProf.equipment);
        setActiveTimers(activeProf.activeTimers);
        setJournalEntries(activeProf.journalEntries);

        // Update active profile single keys for safety
        localStorage.setItem('rpg_character', JSON.stringify(activeProf.character));
        localStorage.setItem('rpg_quests', JSON.stringify(activeProf.quests));
        localStorage.setItem('rpg_rewards', JSON.stringify(activeProf.rewards));
        localStorage.setItem('rpg_achievements', JSON.stringify(activeProf.achievements));
        localStorage.setItem('rpg_history', JSON.stringify(activeProf.history));
        localStorage.setItem('rpg_skills', JSON.stringify(activeProf.skills));
        localStorage.setItem('rpg_equipment', JSON.stringify(activeProf.equipment));
        localStorage.setItem('rpg_timers', JSON.stringify(activeProf.activeTimers));
        localStorage.setItem('rpg_journal_entries', JSON.stringify(activeProf.journalEntries));
      } else {
        setHasExistingCharacter(false);
      }
    } else {
      setHasExistingCharacter(false);
    }
  }, []);

  // Sync state helpers
  const saveState = (
    char: Character,
    qList: Quest[],
    rList: Reward[],
    achList: Achievement[],
    hist: typeof history,
    skillsList: SkillNode[] = skills,
    timersList: ActiveTimer[] = activeTimers,
    eqList: EquipmentItem[] = equipment,
    journalList: JournalEntries = journalEntries,
    overrideProfileId?: string
  ) => {
    // Run retroactive sync loop on every state save
    const { updatedSkills, updatedCharacter, changed } = applyRetroactiveSkillsSync(
      qList,
      skillsList,
      char
    );

    let finalQuests = [...qList];

    const finalChar = changed ? updatedCharacter : char;
    const finalSkills = changed ? updatedSkills : skillsList;

    // Sync all milestone and physical achievements
    let updatedAchievements = syncAllAchievements(
      achList,
      finalQuests,
      finalSkills,
      (title, desc) => {
        triggerNotification('HAUT FAIT DÉBLOQUÉ !', `${title} : ${desc}`, 'achievement');
      }
    );

    // Evaluate standard/custom progress conditions (quests_completed, gold_earned, level_reached, etc.)
    const checked = GamificationEngine.checkAchievements(
      updatedAchievements,
      finalChar,
      hist
    );
    if (checked.newUnlocks.length > 0) {
      checked.newUnlocks.forEach(ach => {
        triggerNotification('HAUT FAIT DÉBLOQUÉ !', `${ach.title} : ${ach.description}`, 'achievement');
      });
    }
    updatedAchievements = checked.updatedAchievements;

    // If retroactive sync triggered changes, display premium level-up / unlock notification
    if (changed) {
      finalSkills.forEach((newS) => {
        const oldS = skillsList.find(s => s.id === newS.id);
        const oldLevel = oldS ? oldS.level : 0;
        if (newS.level > oldLevel) {
          triggerNotification(
            newS.level === 1 ? 'APTITUDE DÉBLOQUÉE ! 🔑' : 'APTITUDE ÉLEVÉE ! ⚡',
            `Félicitations ! Vous maîtrisez maintenant le Rang ${newS.level} de "${newS.title}". Vos attributs de ${newS.category} augmentent de +2 !`,
            'levelup'
          );
        }
      });
    }

    setCharacter(finalChar);
    setQuests(finalQuests);
    setRewards(rList);
    setAchievements(updatedAchievements);
    setHistory(hist);
    setSkills(finalSkills);
    setActiveTimers(timersList);
    setEquipment(eqList);
    setJournalEntries(journalList);

    // Legacy keys for safety
    localStorage.setItem('rpg_character', JSON.stringify(finalChar));
    localStorage.setItem('rpg_quests', JSON.stringify(finalQuests));
    localStorage.setItem('rpg_rewards', JSON.stringify(rList));
    localStorage.setItem('rpg_achievements', JSON.stringify(updatedAchievements));
    localStorage.setItem('rpg_history', JSON.stringify(hist));
    localStorage.setItem('rpg_skills', JSON.stringify(finalSkills));
    localStorage.setItem('rpg_timers', JSON.stringify(timersList));
    localStorage.setItem('rpg_equipment', JSON.stringify(eqList));
    localStorage.setItem('rpg_journal_entries', JSON.stringify(journalList));

    // Save profile inside multi-character selector
    let currentProfileId = overrideProfileId || activeProfileId;
    if (!currentProfileId) {
      currentProfileId = 'profile-' + Date.now();
      setActiveProfileId(currentProfileId);
      localStorage.setItem('rpg_active_profile_id', currentProfileId);
    }

    setProfiles(prevProfiles => {
      const updatedProfiles = prevProfiles.map(p => {
        if (p.id === currentProfileId) {
          return {
            ...p,
            lastActiveAt: Date.now(),
            character: finalChar,
            quests: finalQuests,
            rewards: rList,
            achievements: updatedAchievements,
            skills: finalSkills,
            equipment: eqList,
            activeTimers: timersList,
            journalEntries: journalList,
            history: hist
          };
        }
        return p;
      });

      const exists = updatedProfiles.some(p => p.id === currentProfileId);
      if (!exists) {
        const newProfile: CharacterProfile = {
          id: currentProfileId!,
          createdAt: Date.now(),
          lastActiveAt: Date.now(),
          character: finalChar,
          quests: finalQuests,
          rewards: rList,
          achievements: updatedAchievements,
          skills: finalSkills,
          equipment: eqList,
          activeTimers: timersList,
          journalEntries: journalList,
          history: hist
        };
        const finalProfiles = [...updatedProfiles, newProfile];
        localStorage.setItem('rpg_profiles', JSON.stringify(finalProfiles));
        return finalProfiles;
      }

      localStorage.setItem('rpg_profiles', JSON.stringify(updatedProfiles));
      return updatedProfiles;
    });
  };

  // Notification trigger
  const triggerNotification = (title: string, description: string, type: Notification['type']) => {
    if (!notificationsEnabled) return;
    const newNotif: Notification = {
      id: `notif-${Date.now()}-${Math.random()}`,
      title,
      description,
      type,
    };
    setNotifications((prev) => [...prev, newNotif]);
    
    // Play synthetic browser note sounds for RPG immersion if enabled
    if (soundEnabled) {
      try {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        if (type === 'levelup') {
          // Epic chime
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(261.63, ctx.currentTime); // C4
          osc.frequency.exponentialRampToValueAtTime(523.25, ctx.currentTime + 0.15); // C5
          osc.frequency.exponentialRampToValueAtTime(1046.50, ctx.currentTime + 0.3); // C6
          gain.gain.setValueAtTime(0.08, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.5);
          osc.start();
          osc.stop(ctx.currentTime + 0.5);
        } else if (type === 'achievement') {
          // Success fan-fare
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(392.00, ctx.currentTime); // G4
          osc.frequency.setValueAtTime(523.25, ctx.currentTime + 0.1); // C5
          osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.2); // E5
          osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.3); // G5
          gain.gain.setValueAtTime(0.1, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.45);
          osc.start();
          osc.stop(ctx.currentTime + 0.5);
        } else if (type === 'damage') {
          // Hurt buzz
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(120, ctx.currentTime);
          osc.frequency.linearRampToValueAtTime(60, ctx.currentTime + 0.25);
          gain.gain.setValueAtTime(0.15, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.3);
          osc.start();
          osc.stop(ctx.currentTime + 0.3);
        } else {
          // Gentle pop
          osc.type = 'sine';
          osc.frequency.setValueAtTime(440, ctx.currentTime); // A4
          gain.gain.setValueAtTime(0.08, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.15);
          osc.start();
          osc.stop(ctx.currentTime + 0.15);
        }
      } catch (e) {
        // Audio API may be blocked by browser sandbox
      }
    }
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // ACTIONS: QUESTS

  const handleAddQuest = (newQuest: Quest) => {
    const updatedQuests = [newQuest, ...quests];
    saveState(character, updatedQuests, rewards, achievements, history);
    triggerNotification('Quête forged !', `"${newQuest.title}" ajoutée au Grimoire.`, 'purchased');
  };

  const handleCompleteQuest = (questId: string) => {
    const quest = quests.find(q => q.id === questId);
    if (!quest || quest.completed) return;

    // Run core engine logic
    const { updatedCharacter, xpGained, goldGained, levelUp } = GamificationEngine.completeQuest(character, quest);

    // Update quest status
    const updatedQuests = quests.map(q => {
      if (q.id === questId) {
        return {
          ...q,
          completed: true,
          streak: q.type === 'daily' ? q.streak + 1 : 0,
          lastCompletedDate: new Date().toISOString().split('T')[0],
        };
      }
      return q;
    });

    // Update stats history
    const updatedHistory = {
      questsCompletedCount: history.questsCompletedCount + 1,
      dailiesCompletedCount: quest.type === 'daily' ? history.dailiesCompletedCount + 1 : history.dailiesCompletedCount,
      totalGoldEarned: history.totalGoldEarned + goldGained,
    };

    // Check achievement unlocks
    const { updatedAchievements, newUnlocks } = GamificationEngine.checkAchievements(
      achievements,
      updatedCharacter,
      updatedHistory
    );

    // Build notifications
    let feedbackMsg = `+${xpGained} XP, +${goldGained} 🪙 Or`;
    triggerNotification('Quête Accomplie !', feedbackMsg, 'purchased');

    if (levelUp) {
      triggerNotification('LEVEL UP !', `Félicitations, vous atteignez le Niveau ${updatedCharacter.level} !`, 'levelup');
    }

    newUnlocks.forEach(ach => {
      triggerNotification('HAUT FAIT DÉBLOQUÉ !', `${ach.title} : ${ach.description}`, 'achievement');
    });

    saveState(updatedCharacter, updatedQuests, rewards, updatedAchievements, updatedHistory);
  };

  const handleDeleteQuest = (questId: string) => {
    const updatedQuests = quests.filter(q => q.id !== questId);
    saveState(character, updatedQuests, rewards, achievements, history);
  };

  const handleAddAchievement = (newAch: Achievement) => {
    const updatedAchievements = [...achievements, newAch];
    saveState(character, quests, rewards, updatedAchievements, history);
  };

  const handleDeleteAchievement = (achId: string) => {
    const updatedAchievements = achievements.filter(a => a.id !== achId);
    saveState(character, quests, rewards, updatedAchievements, history);
  };

  const handleUpdateQuestStreak = (questId: string, streak: number) => {
    const updatedQuests = quests.map(q => {
      if (q.id === questId) {
        return { ...q, streak };
      }
      return q;
    });
    saveState(character, updatedQuests, rewards, achievements, history);
    triggerNotification('Série mise à jour !', `La série de la quête quotidienne a été mise à jour à ${streak} jour(s).`, 'purchased');
  };

  const handleToggleMilestone = (questId: string, milestoneId: string) => {
    const updatedQuests = quests.map(q => {
      if (q.id === questId && q.milestones) {
        const updatedMilestones = q.milestones.map(m => {
          if (m.id === milestoneId) {
            return { ...m, completed: !m.completed };
          }
          return m;
        });
        return { ...q, milestones: updatedMilestones };
      }
      return q;
    });

    saveState(character, updatedQuests, rewards, achievements, history);
  };

  const handleForceResetDailies = () => {
    // Collect all uncompleted dailies
    const uncompletedDailies = quests.filter(q => q.type === 'daily' && !q.completed);
    const count = uncompletedDailies.length;

    const { updatedCharacter, hpLost, died } = GamificationEngine.applyNeglectDamage(character, count);

    // Reset daily quests to uncompleted status
    const updatedQuests = quests.map(q => {
      if (q.type === 'daily') {
        const wasCompleted = q.completed;
        return {
          ...q,
          completed: false,
          // If was not completed, daily streak resets to 0. If it was completed, keep streak.
          streak: wasCompleted ? q.streak : 0,
        };
      }
      return q;
    });

    if (died) {
      triggerNotification(
        'LE HÉROS A SUCCOMBÉ !',
        `Le manque de rigueur vous coûte 15% de votre Or accumulé. Vous vous réveillez à l'auberge soigné.`,
        'respawn'
      );
    } else if (hpLost > 0) {
      triggerNotification(
        'DÉGÂTS DE NÉGLIGENCE !',
        `Vous subissez -${hpLost} HP pour vos ${count} quêtes quotidiennes négligées.`,
        'damage'
      );
    } else {
      triggerNotification(
        'Nouveau Jour Débuté !',
        'Toutes vos quêtes quotidiennes se sont réinitialisées. Prêt pour l\'aventure ?',
        'purchased'
      );
    }

    saveState(updatedCharacter, updatedQuests, rewards, achievements, history);
  };

  // ACTIONS: LOOT & SHOP

  const handleAddReward = (newReward: Reward) => {
    const updatedRewards = [newReward, ...rewards];
    saveState(character, quests, updatedRewards, achievements, history);
    triggerNotification('Nouveau lot disponible !', `"${newReward.title}" a été ajoutée à la boutique.`, 'purchased');
  };

  const handlePurchaseReward = (rewardId: string) => {
    const rwd = rewards.find(r => r.id === rewardId);
    if (!rwd || character.gold < rwd.goldCost) return;

    const { updatedCharacter, success } = GamificationEngine.purchaseReward(character, rwd.goldCost);
    if (!success) return;

    // Increment reward times purchased
    const updatedRewards = rewards.map(r => {
      if (r.id === rewardId) {
        return { ...r, timesPurchased: r.timesPurchased + 1 };
      }
      return r;
    });

    triggerNotification('BUTIN ACHETÉ !', `Profitez bien de : "${rwd.title}" (-${rwd.goldCost} 🪙)`, 'purchased');
    saveState(updatedCharacter, quests, updatedRewards, achievements, history);
  };

  const handleDeleteReward = (rewardId: string) => {
    const updatedRewards = rewards.filter(r => r.id !== rewardId);
    saveState(character, quests, updatedRewards, achievements, history);
  };

  const handleStartTimer = (rewardTitle: string, rewardId: string, durationMinutes: number) => {
    const newTimer: ActiveTimer = {
      id: `timer-${Date.now()}-${Math.random()}`,
      rewardId,
      rewardTitle,
      durationSeconds: durationMinutes * 60,
      secondsRemaining: durationMinutes * 60,
      startedAt: new Date().toISOString(),
    };
    
    const updatedTimers = [...activeTimers, newTimer];
    saveState(character, quests, rewards, achievements, history, skills, updatedTimers);
    triggerNotification(
      'CHRONO DÉMARRÉ ! ⏱️',
      `Le décompte de ${durationMinutes}m pour "${rewardTitle}" a débuté !`,
      'purchased'
    );
  };

  const handleCancelTimer = (timerId: string) => {
    const updatedTimers = activeTimers.filter(t => t.id !== timerId);
    saveState(character, quests, rewards, achievements, history, skills, updatedTimers);
    triggerNotification('CHRONO ANNULÉ', 'Le minuteur a été supprimé.', 'damage');
  };

  const handleUpgradeSkill = (skillId: string) => {
    const skill = skills.find(s => s.id === skillId);
    if (!skill || skill.level >= skill.maxLevel) return;

    // Check prerequisite skill Cascade
    if (skill.prerequisiteId) {
      const prereq = skills.find(s => s.id === skill.prerequisiteId);
      if (!prereq || prereq.level < 1) {
        triggerNotification('VERROUILLÉ ! 🔒', `Vous devez débloquer "${prereq?.title || 'le prérequis'}" au moins au niveau 1.`, 'damage');
        return;
      }
    }

    // Check if there is already an active (uncompleted) quest linked to this skill
    const activeQuest = quests.find(q => q.skillIdToUnlock === skillId && !q.completed);
    if (activeQuest) {
      triggerNotification('QUÊTE DE VALIDATION ACTIVE ⏳', `La quête "${activeQuest.title}" est déjà en cours dans vos quêtes courtes !`, 'damage');
      return;
    }

    // Determine the next target rank/level for the description
    const nextLevel = skill.level + 1;

    // Automatically forge a validation quest
    const newQuest: Quest = {
      id: `quest-skill-${skillId}-${Date.now()}`,
      title: nextLevel === 1 
        ? `Débloquer la compétence : ${skill.title}` 
        : `Améliorer la compétence : ${skill.title} (Rang ${nextLevel})`,
      description: `Accomplir cette discipline de vie pour valider le Rang ${nextLevel} de la compétence : ${skill.title}. (${skill.description})`,
      type: 'short', // Added under short/one-time quests
      difficulty: 'medium', // Default medium difficulty
      category: skill.category,
      completed: false,
      streak: 0,
      frequency: 'once',
      isMain: false,
      createdAt: new Date().toISOString(),
      skillIdToUnlock: skillId, // Linked skill ID!
    };

    const updatedQuests = [newQuest, ...quests];
    saveState(character, updatedQuests, rewards, achievements, history);

    triggerNotification(
      'QUÊTE DE VALIDATION CRÉÉE ! 🔑',
      `La quête pour "${skill.title}" a été ajoutée à vos quêtes courtes. Accomplissez-la pour valider cette compétence !`,
      'purchased'
    );
  };

  const handleDeleteSkill = (skillId: string) => {
    const updatedSkills = skills.filter(s => s.id !== skillId);
    saveState(character, quests, rewards, achievements, history, updatedSkills, activeTimers);
    triggerNotification('Compétence Supprimée 🗑️', 'Cette compétence a été retirée de votre arbre.', 'damage');
  };

  const handleAddSkill = (newSkill: SkillNode, createDailyQuest?: boolean) => {
    const updatedSkills = [...skills, newSkill];
    let updatedQuests = [...quests];

    if (createDailyQuest) {
      const dailyQuest: Quest = {
        id: `quest-daily-${newSkill.id}-${Date.now()}`,
        title: `Discipline : ${newSkill.title}`,
        description: `Pratiquer quotidiennement la compétence : ${newSkill.title}. (${newSkill.description})`,
        type: 'daily',
        difficulty: 'medium',
        category: newSkill.category,
        completed: false,
        streak: 0,
        frequency: 'daily',
        isMain: false,
        createdAt: new Date().toISOString(),
        skillIdToUnlock: newSkill.id,
      };
      updatedQuests = [dailyQuest, ...updatedQuests];
    }

    saveState(character, updatedQuests, rewards, achievements, history, updatedSkills, activeTimers);
    
    if (createDailyQuest) {
      triggerNotification(
        'COMPÉTENCE & QUÊTE FORGÉES ! 🎨',
        `La compétence "${newSkill.title}" et sa discipline quotidienne ont été ajoutées !`,
        'purchased'
      );
    } else {
      triggerNotification(
        'Compétence Forgée ! 🎨',
        `La compétence "${newSkill.title}" a été ajoutée à votre arbre de compétences !`,
        'purchased'
      );
    }
  };

  const handleUpdateCharacter = (updated: Character) => {
    saveState(updated, quests, rewards, achievements, history);
  };

  const handleSaveJournalEntry = (dateStr: string, noteText: string) => {
    const updatedJournal = {
      ...journalEntries,
      [dateStr]: noteText
    };
    saveState(character, quests, rewards, achievements, history, skills, activeTimers, equipment, updatedJournal);
    triggerNotification('JOURNAL MIS À JOUR 📝', `Vos notes ont été enregistrées !`, 'purchased');
  };

  const handlePurchaseEquipment = (itemId: string) => {
    const item = equipment.find(e => e.id === itemId);
    if (!item) return;
    if (character.gold < item.cost) {
      triggerNotification('Or Insuffisant 🪙', 'Complétez des quêtes pour remplir votre bourse !', 'damage');
      return;
    }

    const updatedChar = { ...character, gold: character.gold - item.cost };
    const updatedEq = equipment.map(e => e.id === itemId ? { ...e, isPurchased: true } : e);

    saveState(updatedChar, quests, rewards, achievements, history, skills, activeTimers, updatedEq);
    triggerNotification('Équipement Acquis ! ⚔️', `Vous avez acheté "${item.name}" ! Visitez votre inventaire pour l'équiper.`, 'purchased');
  };

  const handleToggleEquip = (itemId: string) => {
    const item = equipment.find(e => e.id === itemId);
    if (!item) return;

    let updatedEq = [...equipment];

    if (item.isEquipped) {
      // Unequip
      updatedEq = equipment.map(e => e.id === itemId ? { ...e, isEquipped: false } : e);
      triggerNotification('Objet Déséquipé 🛡️', `Vous avez retiré "${item.name}".`, 'purchased');
    } else {
      // Equip: First unequip any other item in the same slot
      updatedEq = equipment.map(e => {
        if (e.slot === item.slot && e.isEquipped) {
          return { ...e, isEquipped: false };
        }
        if (e.id === itemId) {
          return { ...e, isEquipped: true };
        }
        return e;
      });
      triggerNotification('Objet Équipé ! ⚔️', `Vous portez maintenant "${item.name}". Vos attributs ont augmenté !`, 'purchased');
    }

    saveState(character, quests, rewards, achievements, history, skills, activeTimers, updatedEq);
  };

  // Render proper sub-views
  const renderTabContent = () => {
    switch (activeTab) {
      case 'character':
        return (
          <CharacterSheet
            character={character}
            onUpdateCharacter={handleUpdateCharacter}
            questsCompletedCount={history.questsCompletedCount}
            dailiesCompletedCount={history.dailiesCompletedCount}
            totalGoldEarned={history.totalGoldEarned}
            equipment={equipment}
          />
        );
      case 'quests':
        return (
          <QuestBoard
            quests={quests}
            skills={skills}
            onAddQuest={handleAddQuest}
            onCompleteQuest={handleCompleteQuest}
            onDeleteQuest={handleDeleteQuest}
            onToggleMilestone={handleToggleMilestone}
            onForceResetDailies={handleForceResetDailies}
            onUpdateQuestStreak={handleUpdateQuestStreak}
            isAppLocked={appModeLocked}
          />
        );
      case 'skills':
        return (
          <SkillTree
            gold={character.gold}
            skills={skills}
            quests={quests}
            onUpgradeSkill={handleUpgradeSkill}
            onAddSkill={handleAddSkill}
            onDeleteSkill={handleDeleteSkill}
            isAppLocked={appModeLocked}
          />
        );
      case 'inventory':
        return (
          <Inventory
            equipment={equipment}
            onToggleEquip={handleToggleEquip}
          />
        );
      case 'shop':
        return (
          <LootShop
            gold={character.gold}
            rewards={rewards}
            onPurchaseReward={handlePurchaseReward}
            onAddReward={handleAddReward}
            onDeleteReward={handleDeleteReward}
            activeTimers={activeTimers}
            onStartTimer={handleStartTimer}
            onCancelTimer={handleCancelTimer}
            equipment={equipment}
            onPurchaseEquipment={handlePurchaseEquipment}
          />
        );
      case 'grimoire':
        return (
          <Grimoire
            achievements={achievements}
            character={character}
            questsCompletedCount={history.questsCompletedCount}
            dailiesCompletedCount={history.dailiesCompletedCount}
            totalGoldEarned={history.totalGoldEarned}
            quests={quests}
            journalEntries={journalEntries}
            onSaveJournalEntry={handleSaveJournalEntry}
            isAppLocked={appModeLocked}
            onAddAchievement={handleAddAchievement}
            onDeleteAchievement={handleDeleteAchievement}
          />
        );
      case 'analytics':
        return (
          <AnalyticsDashboard
            character={character}
            quests={quests}
            skills={skills}
            equipment={equipment}
            questsCompletedCount={history.questsCompletedCount}
            dailiesCompletedCount={history.dailiesCompletedCount}
            totalGoldEarned={history.totalGoldEarned}
          />
        );
    }
  };

  const xpNeeded = Math.round(100 * Math.pow(character.level, 1.5));
  const xpPercent = Math.min(100, (character.xp / xpNeeded) * 100);
  const hpPercent = Math.min(100, (character.hp / character.maxHp) * 100);

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

  const handleCreateComplete = (newChar: Character, shouldShowGuide: boolean, archetypeId?: string) => {
    const newProfileId = 'profile-' + Date.now();
    setActiveProfileId(newProfileId);
    localStorage.setItem('rpg_active_profile_id', newProfileId);

    setCharacter(newChar);
    setHistory({ questsCompletedCount: 0, dailiesCompletedCount: 0, totalGoldEarned: newChar.gold });
    
    let initialQuests = [] as Quest[];
    let initialSkills = [] as SkillNode[];

    if (archetypeId === 'flute_monk') {
      initialQuests = FLUTE_MONK_QUESTS;
      initialSkills = FLUTE_MONK_SKILLS;
    } else if (archetypeId) {
      initialQuests = DEFAULT_QUESTS;
      initialSkills = DEFAULT_SKILLS;
    }

    setQuests(initialQuests);
    setSkills(initialSkills);
    
    const initialEquipment = GamificationEngine.getDefaultEquipment();
    setEquipment(initialEquipment);
    setActiveTimers([]);
    setJournalEntries({});
    
    const initialAchievements = archetypeId === 'flute_monk'
      ? FLUTE_MONK_ACHIEVEMENTS
      : GamificationEngine.getDefaultAchievements();
    setAchievements(initialAchievements);
    
    const initialRewards = GamificationEngine.getDefaultRewards();
    setRewards(initialRewards);
    
    saveState(newChar, initialQuests, initialRewards, initialAchievements, { questsCompletedCount: 0, dailiesCompletedCount: 0, totalGoldEarned: newChar.gold }, initialSkills, [], initialEquipment, {}, newProfileId);
    setHasExistingCharacter(true);
    setAppState('game');
    if (shouldShowGuide) setShowSetupGuide(true);
  };

  const handleSelectProfile = (profileId: string) => {
    const prof = profiles.find(p => p.id === profileId);
    if (!prof) return;

    setActiveProfileId(profileId);
    localStorage.setItem('rpg_active_profile_id', profileId);
    setHasExistingCharacter(true);

    setCharacter(prof.character);
    setQuests(prof.quests);
    setRewards(prof.rewards);
    setAchievements(prof.achievements);
    setHistory(prof.history);
    setSkills(prof.skills);
    setEquipment(prof.equipment);
    setActiveTimers(prof.activeTimers);
    setJournalEntries(prof.journalEntries);

    // Save active profile single keys for safety
    localStorage.setItem('rpg_character', JSON.stringify(prof.character));
    localStorage.setItem('rpg_quests', JSON.stringify(prof.quests));
    localStorage.setItem('rpg_rewards', JSON.stringify(prof.rewards));
    localStorage.setItem('rpg_achievements', JSON.stringify(prof.achievements));
    localStorage.setItem('rpg_history', JSON.stringify(prof.history));
    localStorage.setItem('rpg_skills', JSON.stringify(prof.skills));
    localStorage.setItem('rpg_equipment', JSON.stringify(prof.equipment));
    localStorage.setItem('rpg_timers', JSON.stringify(prof.activeTimers));
    localStorage.setItem('rpg_journal_entries', JSON.stringify(prof.journalEntries));

    setAppState('game');
  };

  const handleDeleteProfile = (profileId: string) => {
    const updatedProfiles = profiles.filter(p => p.id !== profileId);
    setProfiles(updatedProfiles);
    localStorage.setItem('rpg_profiles', JSON.stringify(updatedProfiles));

    if (activeProfileId === profileId) {
      setActiveProfileId(null);
      localStorage.removeItem('rpg_active_profile_id');
      setHasExistingCharacter(updatedProfiles.length > 0);

      localStorage.removeItem('rpg_character');
      localStorage.removeItem('rpg_quests');
      localStorage.removeItem('rpg_rewards');
      localStorage.removeItem('rpg_achievements');
      localStorage.removeItem('rpg_history');
      localStorage.removeItem('rpg_skills');
      localStorage.removeItem('rpg_equipment');
      localStorage.removeItem('rpg_timers');
      localStorage.removeItem('rpg_journal_entries');

      setCharacter(DEFAULT_CHARACTER);
      setQuests([]);
      setRewards([]);
      setAchievements([]);
      setHistory({ questsCompletedCount: 0, dailiesCompletedCount: 0, totalGoldEarned: 40 });
      setSkills([]);
      setEquipment([]);
      setActiveTimers([]);
      setJournalEntries({});
    } else {
      setHasExistingCharacter(updatedProfiles.length > 0);
    }
  };

  const handleUpdateShortcut = (actionKey: keyof KeyboardShortcuts, newKey: string) => {
    setShortcuts(prev => {
      const updated = { ...prev, [actionKey]: newKey };
      localStorage.setItem('rpg_shortcuts', JSON.stringify(updated));
      return updated;
    });
  };

  const handleResetShortcuts = () => {
    const defaultShortcuts: KeyboardShortcuts = {
      navCharacter: 'c',
      navQuests: 'q',
      navSkills: 's',
      navInventory: 'i',
      navShop: 'b',
      navGrimoire: 'g',
      navAnalytics: 'a',
      toggleSound: 'm',
    };
    setShortcuts(defaultShortcuts);
    localStorage.setItem('rpg_shortcuts', JSON.stringify(defaultShortcuts));
  };

  const handleToggleWindowsBackground = () => {
    setWindowsBackgroundEnabled(prev => {
      const newVal = !prev;
      localStorage.setItem('rpg_windows_background', newVal.toString());
      return newVal;
    });
  };

  const toggleSound = () => {
    const newVal = !soundEnabled;
    setSoundEnabled(newVal);
    localStorage.setItem('rpg_sound_enabled', newVal.toString());
  };

  const toggleNotifs = () => {
    const newVal = !notificationsEnabled;
    setNotificationsEnabled(newVal);
    localStorage.setItem('rpg_notifs_enabled', newVal.toString());
  };

  if (appState === 'menu') {
    return (
      <MainMenu
        hasExistingCharacter={hasExistingCharacter}
        onContinue={() => setAppState('game')}
        onNewGame={() => setAppState('character-creation')}
        onSettings={() => setAppState('settings')}
        profiles={profiles}
        activeProfileId={activeProfileId}
        onSelectProfile={handleSelectProfile}
        onDeleteProfile={handleDeleteProfile}
      />
    );
  }

  if (appState === 'character-creation') {
    return (
      <CharacterCreation
        onComplete={handleCreateComplete}
        onCancel={() => setAppState('menu')}
      />
    );
  }

  if (appState === 'settings') {
    return (
      <SettingsMenu
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
        notificationsEnabled={notificationsEnabled}
        onToggleNotifications={toggleNotifs}
        onBack={() => setAppState('menu')}
        shortcuts={shortcuts}
        onUpdateShortcut={handleUpdateShortcut}
        onResetShortcuts={handleResetShortcuts}
        windowsBackgroundEnabled={windowsBackgroundEnabled}
        onToggleWindowsBackground={handleToggleWindowsBackground}
      />
    );
  }

  return (
    <>
      {showSetupGuide && <SetupGuide onComplete={() => setShowSetupGuide(false)} />}
      <div className="min-h-screen bg-[#09090b] text-[#e2e8f0] font-sans border-4 border-[#1a1a1a] select-none flex flex-col justify-between">
      <div className="max-w-6xl w-full mx-auto px-4 py-6 md:py-8 space-y-6 flex-1 flex flex-col justify-between">
        {/* TOP NAVIGATION BAR */}
        <header className="h-20 md:h-16 border border-[#2a2a2a] bg-[#111113] rounded-xl flex flex-col sm:flex-row items-center justify-between px-6 py-2 sm:py-0 shadow-xl relative overflow-hidden">
          {/* Subtle green decoration corners */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#10b981]/30 rounded-tl-lg pointer-events-none" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#10b981]/30 rounded-tr-lg pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#10b981]/30 rounded-bl-lg pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#10b981]/30 rounded-br-lg pointer-events-none" />

          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-[#10b981] to-[#059669] rounded overflow-hidden flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)] text-2xl relative">
              {character.customAvatar && character.avatarId === 'custom' ? (
                <img 
                  src={character.customAvatar} 
                  alt="Avatar" 
                  className="w-full h-full object-cover" 
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span>{getEmojiForAvatar(character.avatarId)}</span>
              )}
              <span className="absolute -bottom-1 -right-1 bg-[#09090b] border border-[#2a2a2a] text-[#10b981] font-mono text-[9px] font-bold px-1 rounded z-10">
                {character.level}
              </span>
            </div>
            <div>
              <h1 className="text-[10px] uppercase tracking-widest text-[#059669] font-bold">{character.classTitle}</h1>
              <p className="text-sm font-semibold text-white leading-tight">{character.name}</p>
            </div>
          </div>

          <div className="flex items-center space-x-6 md:space-x-8 mt-2 sm:mt-0">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-[#10b981] shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
              <span className="text-sm font-mono text-[#10b981] font-bold">{character.gold} GP</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.5)]"></div>
              <span className="text-sm font-mono text-blue-400 font-bold">{character.xp} XP</span>
            </div>
            <div className="hidden md:block h-8 w-[1px] bg-[#2a2a2a]"></div>
            <div className="hidden sm:block text-right">
              <p className="text-[10px] uppercase text-[#64748b]">Uptime</p>
              <p className="text-sm font-mono tracking-tighter text-slate-300">{formatUptime(secondsElapsed)}</p>
            </div>
            <div className="flex items-center space-x-2">
              {/* Lock/Unlock App Mode Padlock */}
              <button
                id="toggle-app-lock-btn"
                onClick={() => {
                  const newLocked = !appModeLocked;
                  setAppModeLocked(newLocked);
                  localStorage.setItem('rpg_app_mode_locked', newLocked.toString());
                  triggerNotification(
                    newLocked ? 'MODE VERROUILLÉ 🔒' : 'MODE DÉVERROUILLÉ 🔓',
                    newLocked 
                      ? 'Création et suppression de quêtes, hauts faits et compétences désactivées.'
                      : 'Vous pouvez désormais créer et supprimer librement vos contenus !',
                    'purchased'
                  );
                }}
                className={`p-1.5 border rounded-lg transition-all duration-300 flex items-center justify-center ${
                  appModeLocked
                    ? 'border-red-950 bg-red-950/20 text-red-400 hover:text-red-300 hover:bg-red-950/40 hover:border-red-500/50'
                    : 'border-emerald-950 bg-emerald-950/20 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/40 hover:border-emerald-500/50'
                }`}
                title={appModeLocked ? 'Passer en mode déverrouillé' : 'Passer en mode verrouillé'}
              >
                {appModeLocked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
              </button>

              <button
                id="toggle-sound-btn"
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="text-slate-400 hover:text-white p-1.5 border border-[#2a2a2a] bg-[#0c0c0e] rounded-lg transition"
                title={soundEnabled ? 'Désactiver le son de l\'interface' : 'Activer le son de l\'interface'}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 text-[#10b981]" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
              </button>
            </div>
          </div>
        </header>

        {/* VITALS HUD PANEL */}
        <div className="bg-[#111113] border border-[#1a1a1a] rounded-xl p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* HP Bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] uppercase font-bold text-red-500">
              <span className="flex items-center gap-1">🔴 Vitalité (HP)</span>
              <span>{character.hp} / {character.maxHp}</span>
            </div>
            <div className="h-3.5 w-full bg-[#1a1a1a] rounded-full border border-red-900/30 overflow-hidden p-[2px]">
              <div 
                className="h-full bg-red-600 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.3)] transition-all duration-500" 
                style={{ width: `${hpPercent}%` }}
              />
            </div>
          </div>
          {/* XP Bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] uppercase font-bold text-[#10b981]">
              <span className="flex items-center gap-1">🟢 Éveil (XP)</span>
              <span>{character.xp} / {xpNeeded}</span>
            </div>
            <div className="h-3.5 w-full bg-[#1a1a1a] rounded-full border border-[#10b981]/30 overflow-hidden p-[2px]">
              <div 
                className="h-full bg-[#10b981] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)] transition-all duration-500" 
                style={{ width: `${xpPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* CORE MENU NAVIGATION */}
        <div className="grid grid-cols-4 md:grid-cols-7 bg-[#111113] border border-[#1a1a1a] p-1 rounded-xl w-full max-w-4xl mx-auto font-display gap-1">
          <button
            id="nav-character"
            onClick={() => setActiveTab('character')}
            className={`py-2 rounded-lg text-xs font-semibold tracking-wider uppercase flex flex-col sm:flex-row items-center justify-center gap-1.5 transition ${activeTab === 'character' ? 'bg-[#1a1a1a] text-[#10b981] border border-[#2a2a2a]' : 'text-slate-400 hover:text-white'}`}
          >
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">Héros</span>
          </button>

          <button
            id="nav-quests"
            onClick={() => setActiveTab('quests')}
            className={`py-2 rounded-lg text-xs font-semibold tracking-wider uppercase flex flex-col sm:flex-row items-center justify-center gap-1.5 transition ${activeTab === 'quests' ? 'bg-[#1a1a1a] text-[#10b981] border border-[#2a2a2a]' : 'text-slate-400 hover:text-white'}`}
          >
            <Calendar className="w-4 h-4" />
            <span className="hidden sm:inline">Quêtes</span>
          </button>

          <button
            id="nav-skills"
            onClick={() => setActiveTab('skills')}
            className={`py-2 rounded-lg text-xs font-semibold tracking-wider uppercase flex flex-col sm:flex-row items-center justify-center gap-1.5 transition ${activeTab === 'skills' ? 'bg-[#1a1a1a] text-[#10b981] border border-[#2a2a2a]' : 'text-slate-400 hover:text-white'}`}
          >
            <Sparkles className="w-4 h-4" />
            <span className="hidden sm:inline">Compétences</span>
          </button>

          <button
            id="nav-inventory"
            onClick={() => setActiveTab('inventory')}
            className={`py-2 rounded-lg text-xs font-semibold tracking-wider uppercase flex flex-col sm:flex-row items-center justify-center gap-1.5 transition ${activeTab === 'inventory' ? 'bg-[#1a1a1a] text-[#10b981] border border-[#2a2a2a]' : 'text-slate-400 hover:text-white'}`}
          >
            <Backpack className="w-4 h-4" />
            <span className="hidden sm:inline">Inventaire</span>
          </button>

          <button
            id="nav-shop"
            onClick={() => setActiveTab('shop')}
            className={`py-2 rounded-lg text-xs font-semibold tracking-wider uppercase flex flex-col sm:flex-row items-center justify-center gap-1.5 transition ${activeTab === 'shop' ? 'bg-[#1a1a1a] text-[#10b981] border border-[#2a2a2a]' : 'text-slate-400 hover:text-white'}`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Boutique</span>
          </button>

          <button
            id="nav-grimoire"
            onClick={() => setActiveTab('grimoire')}
            className={`py-2 rounded-lg text-xs font-semibold tracking-wider uppercase flex flex-col sm:flex-row items-center justify-center gap-1.5 transition ${activeTab === 'grimoire' ? 'bg-[#1a1a1a] text-[#10b981] border border-[#2a2a2a]' : 'text-slate-400 hover:text-white'}`}
          >
            <Award className="w-4 h-4" />
            <span className="hidden sm:inline">Grimoire</span>
          </button>

          <button
            id="nav-analytics"
            onClick={() => setActiveTab('analytics')}
            className={`py-2 col-span-2 md:col-span-1 rounded-lg text-xs font-semibold tracking-wider uppercase flex flex-col sm:flex-row items-center justify-center gap-1.5 transition ${activeTab === 'analytics' ? 'bg-[#1a1a1a] text-[#10b981] border border-[#2a2a2a]' : 'text-slate-400 hover:text-white'}`}
          >
            <TrendingUp className="w-4 h-4" />
            <span className="hidden sm:inline">Analyses</span>
          </button>
        </div>

        {/* CORE VIEWPORT PORTAL */}
        <div className="flex-1 min-h-[400px]">
          {renderTabContent()}
        </div>

        {/* FOOTER STATUS BAR */}
        <footer className="h-auto md:h-10 bg-[#0c0c0e] border border-[#1a1a1a] rounded-xl flex flex-col md:flex-row items-center justify-between px-6 py-3 md:py-0 text-[9px] uppercase tracking-[0.3em] text-[#334155] gap-2 mt-4">
          <div className="flex space-x-4">
            <span>Local Node: v1.0.42</span>
            <span>Status: Synced</span>
          </div>
          <div className="flex space-x-4">
            <span className="text-emerald-800 font-bold">Active Boost: Mental Clarity (+5% XP)</span>
            <span>System Time: {new Date().toISOString().slice(0, 10).replace(/-/g, '.')}-{new Date().toTimeString().slice(0, 5)}</span>
          </div>
        </footer>
      </div>

      {/* PREMIUM FLOATING NOTIFICATIONS OVERLAYS */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full px-4 sm:px-0">
        <AnimatePresence>
          {notifications.map((notif) => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.9, transition: { duration: 0.2 } }}
              className={`border p-4 rounded-xl shadow-2xl relative overflow-hidden backdrop-blur-xl flex gap-3 ${
                notif.type === 'levelup'
                  ? 'bg-gradient-to-r from-slate-900/90 to-emerald-950/40 border-[#10b981] shadow-[#10b981]/10'
                  : notif.type === 'achievement'
                    ? 'bg-gradient-to-r from-slate-900/90 to-purple-950/40 border-purple-500 shadow-purple-500/10'
                    : notif.type === 'damage'
                      ? 'bg-gradient-to-r from-slate-900/90 to-red-950/40 border-red-500 shadow-red-500/10'
                      : notif.type === 'respawn'
                        ? 'bg-gradient-to-r from-slate-900/90 to-rose-950/50 border-rose-600 shadow-rose-600/10'
                        : 'bg-slate-900/95 border-slate-800'
              }`}
            >
              {/* Green/Purple decorative bar */}
              <div className={`absolute top-0 bottom-0 left-0 w-1 ${
                notif.type === 'levelup' ? 'bg-[#10b981]' :
                notif.type === 'achievement' ? 'bg-purple-500' :
                notif.type === 'damage' ? 'bg-red-500' :
                notif.type === 'respawn' ? 'bg-rose-500' :
                'bg-slate-600'
              }`} />

              <div className="flex-1 pl-1">
                {/* Icon context representation inside toast */}
                <div className="flex items-center gap-1.5">
                  {notif.type === 'levelup' && <Sparkles className="w-4 h-4 text-[#10b981] animate-pulse" />}
                  {notif.type === 'achievement' && <Award className="w-4 h-4 text-purple-400 animate-pulse" />}
                  {notif.type === 'damage' && <ShieldAlert className="w-4 h-4 text-red-400" />}
                  {notif.type === 'respawn' && <ShieldAlert className="w-4 h-4 text-rose-400 animate-pulse" />}
                  
                  <h4 className={`text-xs font-bold uppercase tracking-wider font-display ${
                    notif.type === 'levelup' ? 'text-[#10b981]' :
                    notif.type === 'achievement' ? 'text-purple-400' :
                    notif.type === 'damage' ? 'text-red-400' :
                    notif.type === 'respawn' ? 'text-rose-400' :
                    'text-slate-200'
                  }`}>
                    {notif.title}
                  </h4>
                </div>
                <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                  {notif.description}
                </p>
              </div>

              {/* Close toast button */}
              <button
                id={`close-notif-${notif.id}`}
                onClick={() => removeNotification(notif.id)}
                className="text-slate-500 hover:text-white shrink-0 self-start p-0.5 rounded transition"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
    </>
  );
}
