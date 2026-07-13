/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Character, CharacterStats, Quest, Achievement, Reward, StatCategory, Difficulty, EquipmentItem } from '../types';

/**
 * GamificationEngine contains the core game mechanics and formulas
 * for our gamified productivity RPG system.
 */
export const GamificationEngine = {
  /**
   * Calculates the XP needed to advance FROM the current level TO the next.
   * Formula: XP = Math.round(100 * (level ^ 1.5))
   */
  getXpRequiredForLevel(level: number): number {
    return Math.round(100 * Math.pow(level, 1.5));
  },

  /**
   * Determines reward outcomes based on quest difficulty and type.
   */
  getQuestRewards(difficulty: Difficulty, isDaily: boolean, streak: number = 0) {
    let baseXP = 10;
    let baseGold = 15;
    let statIncrease = 1;

    switch (difficulty) {
      case 'easy':
        baseXP = 15;
        baseGold = 10;
        statIncrease = 1;
        break;
      case 'medium':
        baseXP = 35;
        baseGold = 25;
        statIncrease = 2;
        break;
      case 'hard':
        baseXP = 80;
        baseGold = 60;
        statIncrease = 4;
        break;
      case 'epic':
        baseXP = 250;
        baseGold = 150;
        statIncrease = 10;
        break;
    }

    // Apply streak multiplier for Dailies
    let multiplier = 1.0;
    if (isDaily && streak > 0) {
      // 5% bonus per streak level, capped at 50% (+1.5x)
      multiplier = Math.min(1.5, 1.0 + (streak - 1) * 0.05);
    }

    return {
      xp: Math.round(baseXP * multiplier),
      gold: Math.round(baseGold * multiplier),
      stat: statIncrease,
    };
  },

  /**
   * Processes a completed quest, updates character XP, levels, stats and gold.
   */
  completeQuest(
    character: Character,
    quest: Quest
  ): {
    updatedCharacter: Character;
    xpGained: number;
    goldGained: number;
    statGained: number;
    levelUp: boolean;
  } {
    const isDaily = quest.type === 'daily';
    // If it's a daily quest, check if streak should increment
    const currentStreak = isDaily ? quest.streak + 1 : 0;
    
    const rewards = this.getQuestRewards(quest.difficulty, isDaily, currentStreak);

    // Clone character
    const updated = { ...character, stats: { ...character.stats } };

    // Update stats
    const cat = quest.category;
    updated.stats[cat] = (updated.stats[cat] || 0) + rewards.stat;

    // Add gold
    updated.gold += rewards.gold;

    // Add XP & check Level Up
    let xpGained = rewards.xp;
    let currentXp = updated.xp + xpGained;
    let currentLevel = updated.level;
    let levelUp = false;

    let xpNeeded = this.getXpRequiredForLevel(currentLevel);
    while (currentXp >= xpNeeded) {
      currentXp -= xpNeeded;
      currentLevel += 1;
      levelUp = true;
      xpNeeded = this.getXpRequiredForLevel(currentLevel);
      
      // Heal a bit on level up!
      updated.hp = Math.min(updated.maxHp, updated.hp + Math.round(updated.maxHp * 0.5));
    }

    updated.xp = currentXp;
    updated.level = currentLevel;

    // Dynamically update Class Title based on dominant stat as user levels up
    updated.classTitle = this.determineClassTitle(updated.stats, updated.level);

    return {
      updatedCharacter: updated,
      xpGained,
      goldGained: rewards.gold,
      statGained: rewards.stat,
      levelUp,
    };
  },

  /**
   * Applies damage to a character if they neglected daily quests, with a benevolent debuff if HP falls to 0.
   */
  applyNeglectDamage(
    character: Character,
    uncompletedCount: number
  ): {
    updatedCharacter: Character;
    hpLost: number;
    died: boolean;
  } {
    if (uncompletedCount <= 0) {
      return { updatedCharacter: character, hpLost: 0, died: false };
    }

    const hpLost = uncompletedCount * 12; // 12 HP per missed daily
    const updated = { ...character };
    let died = false;

    if (updated.hp - hpLost <= 0) {
      died = true;
      // Benevolent respawn / debuff: Reset to full HP, but lose 15% Gold as a "Tavern Fee" and gets a visual notification
      updated.hp = updated.maxHp;
      const penaltyGold = Math.round(updated.gold * 0.15);
      updated.gold = Math.max(0, updated.gold - penaltyGold);
      // Also slight loss of current level XP (10%), but NEVER drop below Level 1 or lose permanent attributes
      updated.xp = Math.max(0, Math.round(updated.xp - this.getXpRequiredForLevel(updated.level) * 0.1));
    } else {
      updated.hp = updated.hp - hpLost;
    }

    return {
      updatedCharacter: updated,
      hpLost,
      died,
    };
  },

  /**
   * Handles purchase of a reward.
   */
  purchaseReward(character: Character, goldCost: number): { updatedCharacter: Character; success: boolean } {
    if (character.gold < goldCost) {
      return { updatedCharacter: character, success: false };
    }

    const updated = { ...character };
    updated.gold -= goldCost;

    return {
      updatedCharacter: updated,
      success: true,
    };
  },

  /**
   * Dynamically determines character class based on stats.
   */
  determineClassTitle(stats: CharacterStats, level: number): string {
    const { vitality, wisdom, strength, serenity, magic } = stats;
    const maxVal = Math.max(vitality || 0, wisdom || 0, strength || 0, serenity || 0, magic || 0);

    if (level < 3) return 'Aventurier Novice';

    if (maxVal === vitality) {
      if (level >= 15) return 'Paladin de Vie';
      if (level >= 8) return 'Guérisseur Spirituel';
      return 'Athlète de Santé';
    }
    if (maxVal === wisdom) {
      if (level >= 15) return 'Archimage de Sagesse';
      if (level >= 8) return 'Grand Érudit';
      return 'Savant';
    }
    if (maxVal === strength) {
      if (level >= 15) return 'Berserker Divin';
      if (level >= 8) return 'Guerrier Élite';
      return 'Combattant';
    }
    if (maxVal === serenity) {
      if (level >= 15) return 'Moine Zen Éclairé';
      if (level >= 8) return 'Maître de Soi';
      return 'Esprit Calme';
    }
    if (maxVal === magic) {
      if (level >= 15) return 'Sorcier Cosmique';
      if (level >= 8) return 'Invocateur Éléments';
      return 'Mage Novice';
    }

    return 'Aventurier Polyvalent';
  },

  /**
   * Scans achievement list for newly unlocked achievements.
   */
  checkAchievements(
    achievements: Achievement[],
    character: Character,
    statsHistory: {
      questsCompletedCount: number;
      dailiesCompletedCount: number;
      totalGoldEarned: number;
    }
  ): { updatedAchievements: Achievement[]; newUnlocks: Achievement[] } {
    const newUnlocks: Achievement[] = [];
    
    const updatedAchievements = achievements.map((ach) => {
      if (ach.unlocked) return ach;

      let progress = 0;
      switch (ach.conditionType) {
        case 'quests_completed':
          progress = statsHistory.questsCompletedCount;
          break;
        case 'dailies_completed':
          progress = statsHistory.dailiesCompletedCount;
          break;
        case 'gold_earned':
          progress = statsHistory.totalGoldEarned;
          break;
        case 'level_reached':
          progress = character.level;
          break;
        case 'stat_reached':
          if (ach.targetStat) {
            progress = character.stats[ach.targetStat];
          }
          break;
      }

      const unlocked = progress >= ach.target;
      const unlockedAt = unlocked ? new Date().toISOString() : undefined;

      const updatedAch = {
        ...ach,
        progress: Math.min(progress, ach.target),
        unlocked,
        unlockedAt,
      };

      if (unlocked && !ach.unlocked) {
        newUnlocks.push(updatedAch);
      }

      return updatedAch;
    });

    return {
      updatedAchievements,
      newUnlocks,
    };
  },

  /**
   * Seed function for default achievements.
   */
  getDefaultAchievements(): Achievement[] {
    return [
      {
        id: 'first_quest',
        title: 'Premier Pas',
        description: 'Terminez votre première quête',
        badgeIcon: 'Compass',
        conditionType: 'quests_completed',
        conditionValue: 1,
        progress: 0,
        target: 1,
        unlocked: false,
      },
      {
        id: 'quests_10',
        title: 'Héros Actif',
        description: 'Terminez 10 quêtes au total',
        badgeIcon: 'Award',
        conditionType: 'quests_completed',
        conditionValue: 10,
        progress: 0,
        target: 10,
        unlocked: false,
      },
      {
        id: 'quests_50',
        title: 'Légende Locale',
        description: 'Terminez 50 quêtes au total',
        badgeIcon: 'Crown',
        conditionType: 'quests_completed',
        conditionValue: 50,
        progress: 0,
        target: 50,
        unlocked: false,
      },
      {
        id: 'daily_streak_5',
        title: 'Régularité de Fer',
        description: 'Terminez 5 quêtes quotidiennes',
        badgeIcon: 'Flame',
        conditionType: 'dailies_completed',
        conditionValue: 5,
        progress: 0,
        target: 5,
        unlocked: false,
      },
      {
        id: 'gold_100',
        title: 'Marchand Prospère',
        description: 'Gagnez un total de 100 Pièces d\'Or',
        badgeIcon: 'Coins',
        conditionType: 'gold_earned',
        conditionValue: 100,
        progress: 0,
        target: 100,
        unlocked: false,
      },
      {
        id: 'gold_1000',
        title: 'Crésus de la Vie',
        description: 'Gagnez un total de 1000 Pièces d\'Or',
        badgeIcon: 'Gem',
        conditionType: 'gold_earned',
        conditionValue: 1000,
        progress: 0,
        target: 1000,
        unlocked: false,
      },
      {
        id: 'level_5',
        title: 'Niveau 5 Atteint',
        description: 'Atteignez le niveau 5 de votre vie',
        badgeIcon: 'Shield',
        conditionType: 'level_reached',
        conditionValue: 5,
        progress: 0,
        target: 5,
        unlocked: false,
      },
      {
        id: 'wisdom_10',
        title: 'Érudit Éveillé',
        description: 'Atteignez un niveau de 10 en Sagesse',
        badgeIcon: 'BookOpen',
        conditionType: 'stat_reached',
        conditionValue: 10,
        targetStat: 'wisdom',
        progress: 0,
        target: 10,
        unlocked: false,
      },
      {
        id: 'vitality_10',
        title: 'Vitalité de Phénix',
        description: 'Atteignez un niveau de 10 en Vitalité',
        badgeIcon: 'Heart',
        conditionType: 'stat_reached',
        conditionValue: 10,
        targetStat: 'vitality',
        progress: 0,
        target: 10,
        unlocked: false,
      },
      {
        id: 'strength_10',
        title: 'Force de Colosse',
        description: 'Atteignez un niveau de 10 en Force',
        badgeIcon: 'Dumbbell',
        conditionType: 'stat_reached',
        conditionValue: 10,
        targetStat: 'strength',
        progress: 0,
        target: 10,
        unlocked: false,
      },
      {
        id: 'serenity_10',
        title: 'Paix Intérieure',
        description: 'Atteignez un niveau de 10 en Sérénité',
        badgeIcon: 'Sparkles',
        conditionType: 'stat_reached',
        conditionValue: 10,
        targetStat: 'serenity',
        progress: 0,
        target: 10,
        unlocked: false,
      },
      {
        id: 'magic_10',
        title: 'Maître des Éléments',
        description: 'Atteignez un niveau de 10 en Magie',
        badgeIcon: 'Zap',
        conditionType: 'stat_reached',
        conditionValue: 10,
        targetStat: 'magic',
        progress: 0,
        target: 10,
        unlocked: false,
      },
    ];
  },

  /**
   * Seed function for default custom rewards.
   */
  getDefaultRewards(): Reward[] {
    return [
      {
        id: 'reward_gaming',
        title: 'Session de Jeu Vidéo (1h)',
        description: 'S\'accorder une heure de détente sur votre jeu préféré.',
        goldCost: 40,
        isCustom: false,
        iconName: 'Gamepad2',
        timesPurchased: 0,
      },
      {
        id: 'reward_snack',
        title: 'Friandise / Snack Spécial',
        description: 'Un bon dessert, un snack gourmand ou un bubble tea.',
        goldCost: 25,
        isCustom: false,
        iconName: 'Cookie',
        timesPurchased: 0,
      },
      {
        id: 'reward_movie',
        title: 'Soirée Cinéma / Série',
        description: 'Regarder un bon film ou 2 épisodes de série sans culpabiliser.',
        goldCost: 30,
        isCustom: false,
        iconName: 'Tv',
        timesPurchased: 0,
      },
      {
        id: 'reward_restaurant',
        title: 'Soirée au Restaurant',
        description: 'Une vraie sortie gastronomique ou un bon repas commandé.',
        goldCost: 200,
        isCustom: false,
        iconName: 'Utensils',
        timesPurchased: 0,
      },
      {
        id: 'reward_nap',
        title: 'Sieste Réparatrice (30m)',
        description: 'Faire une sieste bien méritée en pleine journée.',
        goldCost: 20,
        isCustom: false,
        iconName: 'Moon',
        timesPurchased: 0,
      },
    ];
  },

  getDefaultEquipment(): EquipmentItem[] {
    return [
      // WEAPONS
      {
        id: 'eq-wp-1',
        name: 'Épée d\'Entraînement en Bois',
        slot: 'weapon',
        rarity: 'commun',
        cost: 25,
        statBonuses: { strength: 2 },
        description: 'Une simple épée en bois pour apprendre les bases du combat quotidien.',
        icon: '🗡️',
        isPurchased: false,
        isEquipped: false,
      },
      {
        id: 'eq-wp-2',
        name: 'Glaive d\'Acier du Protecteur',
        slot: 'weapon',
        rarity: 'rare',
        cost: 75,
        statBonuses: { strength: 6, vitality: 3 },
        description: 'Une lame forgée avec soin, équilibrée pour l\'entraînement intensif.',
        icon: '⚔️',
        isPurchased: false,
        isEquipped: false,
      },
      {
        id: 'eq-wp-3',
        name: 'Sceptre d\'Arno de Feu',
        slot: 'weapon',
        rarity: 'epique',
        cost: 180,
        statBonuses: { magic: 12, wisdom: 6 },
        description: 'Canalise les énergies de la créativité et de la passion ardente.',
        icon: '🔮',
        isPurchased: false,
        isEquipped: false,
      },
      {
        id: 'eq-wp-4',
        name: 'Excalibur de Volonté',
        slot: 'weapon',
        rarity: 'mythique',
        cost: 450,
        statBonuses: { strength: 25, serenity: 10, vitality: 10 },
        description: 'Une épée légendaire incrustée de runes de discipline inébranlable.',
        icon: '🔱',
        isPurchased: false,
        isEquipped: false,
      },
      {
        id: 'eq-wp-5',
        name: 'Lame Divine du Créateur',
        slot: 'weapon',
        rarity: 'divin',
        cost: 1000,
        statBonuses: { strength: 60, magic: 40, wisdom: 40, vitality: 30, serenity: 30 },
        description: 'Une arme forgée par les dieux pour les maîtres absolus de leur destin.',
        icon: '⚡',
        isPurchased: false,
        isEquipped: false,
      },

      // SHIELDS / OFFHANDS
      {
        id: 'eq-sh-1',
        name: 'Bouclier de Fortune',
        slot: 'shield',
        rarity: 'commun',
        cost: 20,
        statBonuses: { vitality: 2 },
        description: 'Un bouclier de fortune fait de planches de bois d\'érable.',
        icon: '🛡️',
        isPurchased: false,
        isEquipped: false,
      },
      {
        id: 'eq-sh-2',
        name: 'Égide de Persévérance',
        slot: 'shield',
        rarity: 'rare',
        cost: 65,
        statBonuses: { vitality: 5, serenity: 3 },
        description: 'Bloque le doute et le découragement grâce à une robustesse d\'acier.',
        icon: '🛡️',
        isPurchased: false,
        isEquipped: false,
      },
      {
        id: 'eq-sh-3',
        name: 'Miroir de Sérénité',
        slot: 'shield',
        rarity: 'epique',
        cost: 150,
        statBonuses: { serenity: 15, wisdom: 5 },
        description: 'Un bouclier poli comme un miroir, renvoyant le stress vers le néant.',
        icon: '💿',
        isPurchased: false,
        isEquipped: false,
      },
      {
        id: 'eq-sh-4',
        name: 'Rempart du Dragon Céleste',
        slot: 'shield',
        rarity: 'mythique',
        cost: 380,
        statBonuses: { vitality: 25, strength: 15 },
        description: 'Façonné à partir d\'écailles de dragon, résistant à tous les excès.',
        icon: '🛡️',
        isPurchased: false,
        isEquipped: false,
      },

      // HEAD
      {
        id: 'eq-hd-1',
        name: 'Bandana de Concentration',
        slot: 'head',
        rarity: 'commun',
        cost: 15,
        statBonuses: { wisdom: 1 },
        description: 'Un simple morceau de tissu pour garder la sueur hors des yeux pendant l\'effort.',
        icon: '🧣',
        isPurchased: false,
        isEquipped: false,
      },
      {
        id: 'eq-hd-2',
        name: 'Capuche du Moine Silencieux',
        slot: 'head',
        rarity: 'rare',
        cost: 60,
        statBonuses: { serenity: 6, wisdom: 4 },
        description: 'Isoles-toi du bruit et focalises-toi sur ta quête intérieure.',
        icon: '👤',
        isPurchased: false,
        isEquipped: false,
      },
      {
        id: 'eq-hd-3',
        name: 'Diadème d\'Éveil Mental',
        slot: 'head',
        rarity: 'epique',
        cost: 160,
        statBonuses: { wisdom: 15, magic: 10 },
        description: 'Amplifie vos capacités cognitives et stimule la clarté mentale.',
        icon: '👑',
        isPurchased: false,
        isEquipped: false,
      },
      {
        id: 'eq-hd-4',
        name: 'Heaume Céleste de Sagesse',
        slot: 'head',
        rarity: 'divin',
        cost: 850,
        statBonuses: { wisdom: 50, serenity: 30, magic: 20 },
        description: 'La couronne des archimages légendaires, révélant les vérités de l\'univers.',
        icon: '👑',
        isPurchased: false,
        isEquipped: false,
      },

      // ARMOR
      {
        id: 'eq-ar-1',
        name: 'Tunique d\'Apprenti en Lin',
        slot: 'armor',
        rarity: 'commun',
        cost: 30,
        statBonuses: { vitality: 3 },
        description: 'Vêtement léger permettant une grande liberté de mouvement.',
        icon: '👕',
        isPurchased: false,
        isEquipped: false,
      },
      {
        id: 'eq-ar-2',
        name: 'Cotte de Mailles de Discipline',
        slot: 'armor',
        rarity: 'rare',
        cost: 90,
        statBonuses: { vitality: 8, strength: 4 },
        description: 'Chaque anneau représente un jour de régularité et de constance.',
        icon: '🛡️',
        isPurchased: false,
        isEquipped: false,
      },
      {
        id: 'eq-ar-3',
        name: 'Armure de Cuir Bouilli Doré',
        slot: 'armor',
        rarity: 'epique',
        cost: 220,
        statBonuses: { vitality: 15, strength: 10, serenity: 5 },
        description: 'Élégante et incroyablement solide, digne des plus grands explorateurs.',
        icon: '🥋',
        isPurchased: false,
        isEquipped: false,
      },
      {
        id: 'eq-ar-4',
        name: 'Harnois Divin de l\'Olympe',
        slot: 'armor',
        rarity: 'divin',
        cost: 950,
        statBonuses: { vitality: 50, strength: 40, serenity: 30 },
        description: 'Une armure forgée dans des métaux divins, rendant son porteur presque invincible.',
        icon: '🌌',
        isPurchased: false,
        isEquipped: false,
      },

      // BOOTS
      {
        id: 'eq-bt-1',
        name: 'Sandales de Marche Simple',
        slot: 'boots',
        rarity: 'commun',
        cost: 15,
        statBonuses: { vitality: 1 },
        description: 'Idéal pour de courtes promenades quotidiennes.',
        icon: '🩴',
        isPurchased: false,
        isEquipped: false,
      },
      {
        id: 'eq-bt-2',
        name: 'Bottes de Voyage du Rôdeur',
        slot: 'boots',
        rarity: 'rare',
        cost: 55,
        statBonuses: { vitality: 5, strength: 3 },
        description: 'Renforcées aux chevilles, idéales pour traverser de longues journées actives.',
        icon: '🥾',
        isPurchased: false,
        isEquipped: false,
      },
      {
        id: 'eq-bt-3',
        name: 'Rangers de Course de l\'Éclair',
        slot: 'boots',
        rarity: 'epique',
        cost: 140,
        statBonuses: { strength: 12, vitality: 8 },
        description: 'Des bottes enchantées qui semblent alléger vos foulées de moitié.',
        icon: '👟',
        isPurchased: false,
        isEquipped: false,
      },

      // RINGS
      {
        id: 'eq-rn-1',
        name: 'Anneau de Cuivre poli',
        slot: 'ring',
        rarity: 'commun',
        cost: 15,
        statBonuses: { magic: 1 },
        description: 'Un anneau tout simple qui brille d\'une lueur modeste.',
        icon: '💍',
        isPurchased: false,
        isEquipped: false,
      },
      {
        id: 'eq-rn-2',
        name: 'Chevalière d\'Argent de Focus',
        slot: 'ring',
        rarity: 'rare',
        cost: 60,
        statBonuses: { wisdom: 4, magic: 4 },
        description: 'Aide à garder son esprit centré sur un objectif précis.',
        icon: '💍',
        isPurchased: false,
        isEquipped: false,
      },
      {
        id: 'eq-rn-3',
        name: 'Anneau de Concentration Absolue',
        slot: 'ring',
        rarity: 'epique',
        cost: 180,
        statBonuses: { magic: 15, wisdom: 10, serenity: 5 },
        description: 'Un catalyseur d\'énergie magique et de focus ininterrompu.',
        icon: '💍',
        isPurchased: false,
        isEquipped: false,
      }
    ];
  },
};
