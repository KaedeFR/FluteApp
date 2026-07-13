/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Difficulty = 'easy' | 'medium' | 'hard' | 'epic';
export type QuestType = 'daily' | 'short' | 'epic';
export type StatCategory = 'vitality' | 'wisdom' | 'strength' | 'serenity' | 'magic';
export type QuestFrequency = 'daily' | 'weekly' | 'monthly' | 'once';

export interface Milestone {
  id: string;
  title: string;
  completed: boolean;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  type: QuestType;
  difficulty: Difficulty;
  category: StatCategory;
  completed: boolean;
  streak: number; // For dailies
  lastCompletedDate?: string; // For checking daily streak / status
  milestones?: Milestone[]; // For epic quests
  createdAt: string;
  frequency: QuestFrequency; // 'daily' | 'weekly' | 'monthly' | 'once'
  isMain: boolean; // true = Quête principale, false = Quête secondaire
  scheduledDate?: string; // YYYY-MM-DD
  deadline?: string; // ISO string datetime or HH:MM or YYYY-MM-DDTHH:MM
  skillIdToUnlock?: string; // ID of the linked skill to unlock/upgrade
}

export interface CharacterStats {
  vitality: number; // Vitalité
  wisdom: number; // Sagesse
  strength: number; // Force
  serenity: number; // Sérénité
  magic: number; // Magie
}

export interface Character {
  name: string;
  avatarId: string; // ID of selected avatar icon
  customAvatar?: string; // Base64 image URL for uploaded photo
  classTitle: string; // Custom title or automatically assigned based on stats
  level: number;
  xp: number;
  hp: number;
  maxHp: number;
  gold: number;
  stats: CharacterStats;
  weight?: number; // Poids (kg)
  height?: number; // Taille (cm)
  weightGoal?: number; // Objectif de poids (kg)
  raceId?: string; // Selected race ID
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  goldCost: number;
  isCustom: boolean; // Custom rewards made by the user
  iconName: string;
  timesPurchased: number;
}

export interface ActiveTimer {
  id: string;
  rewardId: string;
  rewardTitle: string;
  durationSeconds: number;
  secondsRemaining: number;
  startedAt: string; // ISO string
}

export interface SkillRank {
  rank: number;
  title: string;
  description: string;
  bonus?: string;
}

export interface SkillNode {
  id: string;
  title: string;
  description: string;
  category: StatCategory;
  cost: number; // Gold cost to purchase
  unlocked: boolean;
  level: number;
  maxLevel: number;
  prerequisiteId?: string; // ID of prerequisite skill
  requiredQuestId?: string; // ID of the quest required to unlock/upgrade
  ranks?: SkillRank[]; // Specific titles and details for each rank/level
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  badgeIcon: string;
  conditionType: 'quests_completed' | 'dailies_completed' | 'gold_earned' | 'level_reached' | 'stat_reached';
  conditionValue: number;
  targetStat?: StatCategory;
  progress: number;
  target: number;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface QuestCompletionEvent {
  questId: string;
  xpGained: number;
  goldGained: number;
  statGained: StatCategory;
  levelUp: boolean;
  newLevel?: number;
}

export type ItemRarity = 'commun' | 'rare' | 'epique' | 'mythique' | 'divin';
export type EquipmentSlot = 'weapon' | 'shield' | 'head' | 'armor' | 'ring' | 'boots';

export interface EquipmentItem {
  id: string;
  name: string;
  slot: EquipmentSlot;
  rarity: ItemRarity;
  cost: number;
  statBonuses: Partial<CharacterStats>;
  description: string;
  icon: string;
  isPurchased: boolean;
  isEquipped: boolean;
}

export type JournalEntries = Record<string, string>;

