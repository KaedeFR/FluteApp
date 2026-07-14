import { Quest, SkillNode, Achievement } from '../types';

export const FLUTE_MONK_SKILLS: SkillNode[] = [
  {
    id: 's-fm-samatha',
    title: 'Samatha',
    description: 'Méditation de stabilisation de l\'attention.',
    category: 'serenity',
    cost: 30,
    unlocked: true,
    level: 0,
    maxLevel: 5,
    ranks: [
      { rank: 1, title: 'Samatha I', description: 'Atteindre une série de 5 jours de méditation Samatha consécutifs.' },
      { rank: 2, title: 'Samatha II', description: 'Atteindre une série de 15 jours de méditation Samatha consécutifs.' },
      { rank: 3, title: 'Samatha III', description: 'Atteindre une série de 30 jours de méditation Samatha consécutifs.' },
      { rank: 4, title: 'Samatha IV', description: 'Atteindre une série de 60 jours de méditation Samatha consécutifs.' },
      { rank: 5, title: 'Samatha V', description: 'Atteindre une série de 120 jours de méditation Samatha consécutifs.' }
    ]
  },
  {
    id: 's-fm-vipassana',
    title: 'Vipassana',
    description: 'Méditation d\'observation lucide (Pleine Conscience).',
    category: 'serenity',
    cost: 30,
    unlocked: true,
    level: 0,
    maxLevel: 5,
    ranks: [
      { rank: 1, title: 'Vipassana I', description: 'Atteindre une série de 5 jours de méditation Vipassana.' },
      { rank: 2, title: 'Vipassana II', description: 'Atteindre une série de 15 jours de méditation Vipassana.' },
      { rank: 3, title: 'Vipassana III', description: 'Atteindre une série de 30 jours de méditation Vipassana.' },
      { rank: 4, title: 'Vipassana IV', description: 'Atteindre une série de 60 jours de méditation Vipassana.' },
      { rank: 5, title: 'Vipassana V', description: 'Atteindre une série de 120 jours de méditation Vipassana.' }
    ]
  },
  {
    id: 's-fm-propre',
    title: 'Monsieur propre',
    description: 'Discipline de l\'ordre et de la propreté environnementale.',
    category: 'vitality',
    cost: 20,
    unlocked: true,
    level: 0,
    maxLevel: 5,
    ranks: [
      { rank: 1, title: 'Propreté I', description: 'Série de 5 jours de 15 minutes de ménage actif.' },
      { rank: 2, title: 'Propreté II', description: 'Série de 15 jours de 15 minutes de ménage actif.' },
      { rank: 3, title: 'Propreté III', description: 'Série de 30 jours de 15 minutes de ménage actif.' },
      { rank: 4, title: 'Propreté IV', description: 'Série de 60 jours de 15 minutes de ménage actif.' },
      { rank: 5, title: 'Propreté V', description: 'Série de 120 jours de 15 minutes de ménage actif.' }
    ]
  },
  {
    id: 's-fm-pas',
    title: 'Pas léger',
    description: 'Marche quotidienne active pour la santé cardiovasculaire.',
    category: 'vitality',
    cost: 20,
    unlocked: true,
    level: 0,
    maxLevel: 5,
    ranks: [
      { rank: 1, title: 'Pas Légers I', description: 'Série de 5 jours à 10 000 pas minimum par jour.' },
      { rank: 2, title: 'Pas Légers II', description: 'Série de 15 jours à 10 000 pas minimum par jour.' },
      { rank: 3, title: 'Pas Légers III', description: 'Série de 30 jours à 10 000 pas minimum par jour.' },
      { rank: 4, title: 'Pas Légers IV', description: 'Série de 60 jours à 10 000 pas minimum par jour.' },
      { rank: 5, title: 'Pas Légers V', description: 'Série de 120 jours à 10 000 pas minimum par jour.' }
    ]
  },
  {
    id: 's-fm-chinoiserie',
    title: 'Chinoiserie',
    description: 'Apprentissage et maîtrise de la langue chinoise.',
    category: 'wisdom',
    cost: 40,
    unlocked: true,
    level: 0,
    maxLevel: 5,
    ranks: [
      { rank: 1, title: 'Chinois I', description: 'Série de 5 jours d\'apprentissage quotidien du chinois.' },
      { rank: 2, title: 'Chinois II', description: 'Série de 15 jours d\'apprentissage quotidien du chinois.' },
      { rank: 3, title: 'Chinois III', description: 'Série de 30 jours d\'apprentissage quotidien du chinois.' },
      { rank: 4, title: 'Chinois IV', description: 'Série de 60 jours d\'apprentissage quotidien du chinois.' },
      { rank: 5, title: 'Chinois V', description: 'Série de 120 jours d\'apprentissage quotidien du chinois.' }
    ]
  },
  {
    id: 's-fm-traction',
    title: 'Traction',
    description: 'Force de tirage et contrôle du poids du corps.',
    category: 'strength',
    cost: 30,
    unlocked: true,
    level: 0,
    maxLevel: 5,
    ranks: [
      { rank: 1, title: 'Tractions I', description: 'Réussir 5 tractions consécutives en forme parfaite.' },
      { rank: 2, title: 'Tractions II', description: 'Réussir 10 tractions consécutives en forme parfaite.' },
      { rank: 3, title: 'Tractions III', description: 'Réussir 20 tractions consécutives en forme parfaite.' },
      { rank: 4, title: 'Tractions IV', description: 'Réussir 10 tractions lestées à +20 kg.' },
      { rank: 5, title: 'Tractions V', description: 'Réussir 10 tractions lestées à +40 kg.' }
    ]
  },
  {
    id: 's-fm-dips',
    title: 'Dips',
    description: 'Force de poussée verticale et développement des triceps et pectoraux.',
    category: 'strength',
    cost: 30,
    unlocked: true,
    level: 0,
    maxLevel: 5,
    ranks: [
      { rank: 1, title: 'Dips I', description: 'Réussir 10 dips consécutifs en forme parfaite.' },
      { rank: 2, title: 'Dips II', description: 'Réussir 20 dips consécutifs en forme parfaite.' },
      { rank: 3, title: 'Dips III', description: 'Réussir 10 dips lestés à +25 kg.' },
      { rank: 4, title: 'Dips IV', description: 'Réussir 10 dips lestés à +50 kg.' },
      { rank: 5, title: 'Dips V', description: 'Réussir 10 dips lestés à +80 kg.' }
    ]
  },
  {
    id: 's-fm-benchpress',
    title: 'Benchpress',
    description: 'Force de poussée horizontale maximale.',
    category: 'strength',
    cost: 30,
    unlocked: true,
    level: 0,
    maxLevel: 5,
    ranks: [
      { rank: 1, title: 'Développé Couché I', description: 'Valider une répétition maximale à 70 kg.' },
      { rank: 2, title: 'Développé Couché II', description: 'Valider une répétition maximale à 100 kg.' },
      { rank: 3, title: 'Développé Couché III', description: 'Valider une répétition maximale à 120 kg.' },
      { rank: 4, title: 'Développé Couché IV', description: 'Valider une répétition maximale à 140 kg.' },
      { rank: 5, title: 'Développé Couché V', description: 'Valider une répétition maximale à 160 kg.' }
    ]
  },
  {
    id: 's-fm-deadlift',
    title: 'Deadlift',
    description: 'Force de la chaîne postérieure et puissance brute au sol.',
    category: 'strength',
    cost: 30,
    unlocked: true,
    level: 0,
    maxLevel: 5,
    ranks: [
      { rank: 1, title: 'Soulevé de Terre I', description: 'Valider un soulevé de terre maximal à 100 kg.' },
      { rank: 2, title: 'Soulevé de Terre II', description: 'Valider un soulevé de terre maximal à 125 kg.' },
      { rank: 3, title: 'Soulevé de Terre III', description: 'Valider un soulevé de terre maximal à 150 kg.' },
      { rank: 4, title: 'Soulevé de Terre IV', description: 'Valider un soulevé de terre maximal à 175 kg.' },
      { rank: 5, title: 'Soulevé de Terre V', description: 'Valider un soulevé de terre maximal à 200 kg.' }
    ]
  }
];

export const FLUTE_MONK_QUESTS: Quest[] = [
  // Quêtes quotidiennes (Non liées à des compétences)
  {
    id: 'q-fm-d1',
    title: 'Nutrition idéale',
    description: 'Consommer des aliments sains conformes aux objectifs nutritionnels.',
    type: 'daily',
    difficulty: 'medium',
    category: 'vitality',
    completed: false,
    streak: 0,
    createdAt: new Date().toISOString(),
    frequency: 'daily',
    isMain: false
  },
  {
    id: 'q-fm-d2',
    title: 'Entraînement physique',
    description: 'Effectuer sa session de musculation, de tractions, de dips ou de renforcement.',
    type: 'daily',
    difficulty: 'medium',
    category: 'strength',
    completed: false,
    streak: 0,
    createdAt: new Date().toISOString(),
    frequency: 'daily',
    isMain: false
  },
  {
    id: 'q-fm-d3',
    title: 'Écriture créative',
    description: 'Consacrer du temps à l\'écriture libre ou à la tenue de son journal.',
    type: 'daily',
    difficulty: 'easy',
    category: 'wisdom',
    completed: false,
    streak: 0,
    createdAt: new Date().toISOString(),
    frequency: 'daily',
    isMain: false
  },
  {
    id: 'q-fm-d4',
    title: 'Interprétation musicale',
    description: 'Pratiquer la flûte ou s\'exercer à l\'interprétation de pièces musicales.',
    type: 'daily',
    difficulty: 'medium',
    category: 'magic',
    completed: false,
    streak: 0,
    createdAt: new Date().toISOString(),
    frequency: 'daily',
    isMain: false
  },

  // Quêtes quotidiennes de Série (Compétences en Série)
  {
    id: 'q-fm-ds1',
    title: 'Méditation Samatha',
    description: 'Pratiquer la méditation de stabilisation de l\'attention (Samatha) pour développer le calme mental.',
    type: 'daily',
    difficulty: 'medium',
    category: 'serenity',
    completed: false,
    streak: 0,
    createdAt: new Date().toISOString(),
    frequency: 'daily',
    isMain: false,
    skillIdToUnlock: 's-fm-samatha'
  },
  {
    id: 'q-fm-ds2',
    title: 'Méditation Vipassana',
    description: 'Pratiquer l\'observation lucide en pleine conscience (Vipassana) pour cultiver l\'éveil spirituel.',
    type: 'daily',
    difficulty: 'medium',
    category: 'serenity',
    completed: false,
    streak: 0,
    createdAt: new Date().toISOString(),
    frequency: 'daily',
    isMain: false,
    skillIdToUnlock: 's-fm-vipassana'
  },
  {
    id: 'q-fm-ds3',
    title: 'Monsieur propre',
    description: 'Consacrer 15 minutes au nettoyage actif et ordonner rigoureusement son espace.',
    type: 'daily',
    difficulty: 'easy',
    category: 'vitality',
    completed: false,
    streak: 0,
    createdAt: new Date().toISOString(),
    frequency: 'daily',
    isMain: false,
    skillIdToUnlock: 's-fm-propre'
  },
  {
    id: 'q-fm-ds4',
    title: 'Pas légers',
    description: 'Effectuer sa marche quotidienne active pour atteindre au moins 10 000 pas.',
    type: 'daily',
    difficulty: 'medium',
    category: 'vitality',
    completed: false,
    streak: 0,
    createdAt: new Date().toISOString(),
    frequency: 'daily',
    isMain: false,
    skillIdToUnlock: 's-fm-pas'
  },
  {
    id: 'q-fm-ds5',
    title: 'Chinoiserie',
    description: 'Étudier le chinois et pratiquer les caractères ou la grammaire aujourd\'hui.',
    type: 'daily',
    difficulty: 'medium',
    category: 'wisdom',
    completed: false,
    streak: 0,
    createdAt: new Date().toISOString(),
    frequency: 'daily',
    isMain: false,
    skillIdToUnlock: 's-fm-chinoiserie'
  },

  // Quêtes secondaires de Validation (Compétences à Validation)
  {
    id: 'q-fm-s1',
    title: 'Validation : Tractions Niveau I',
    description: 'Réussir 5 tractions consécutives en forme parfaite pour valider le premier palier de compétence.',
    type: 'short',
    difficulty: 'medium',
    category: 'strength',
    completed: false,
    streak: 0,
    createdAt: new Date().toISOString(),
    frequency: 'once',
    isMain: false,
    skillIdToUnlock: 's-fm-traction'
  },
  {
    id: 'q-fm-s2',
    title: 'Validation : Dips Niveau I',
    description: 'Réussir 10 dips consécutifs en forme parfaite pour valider le premier palier de compétence.',
    type: 'short',
    difficulty: 'medium',
    category: 'strength',
    completed: false,
    streak: 0,
    createdAt: new Date().toISOString(),
    frequency: 'once',
    isMain: false,
    skillIdToUnlock: 's-fm-dips'
  },
  {
    id: 'q-fm-s3',
    title: 'Validation : Développé Couché Niveau I',
    description: 'Valider une répétition maximale à 70 kg au développé couché pour valider le premier palier.',
    type: 'short',
    difficulty: 'medium',
    category: 'strength',
    completed: false,
    streak: 0,
    createdAt: new Date().toISOString(),
    frequency: 'once',
    isMain: false,
    skillIdToUnlock: 's-fm-benchpress'
  },
  {
    id: 'q-fm-s4',
    title: 'Validation : Soulevé de Terre Niveau I',
    description: 'Valider un soulevé de terre maximal à 100 kg pour valider le premier palier de compétence.',
    type: 'short',
    difficulty: 'medium',
    category: 'strength',
    completed: false,
    streak: 0,
    createdAt: new Date().toISOString(),
    frequency: 'once',
    isMain: false,
    skillIdToUnlock: 's-fm-deadlift'
  },

  // Quêtes principales (Épiques)
  {
    id: 'q-fm-m1',
    title: 'Atteindre l\'objectif de 12% bodyfat',
    description: 'Optimiser sa composition corporelle en réduisant sainement son taux de masse grasse.',
    type: 'epic',
    difficulty: 'epic',
    category: 'vitality',
    completed: false,
    streak: 0,
    createdAt: new Date().toISOString(),
    frequency: 'once',
    isMain: true,
    milestones: [
      { id: 'm-fm-m1-1', title: 'Affûté : Passer sous les 18% de bodyfat', completed: false },
      { id: 'm-fm-m1-2', title: 'Dessiné : Atteindre 15% (les abdos pointent le bout de leur nez)', completed: false },
      { id: 'm-fm-m1-3', title: 'Sec : Atteindre les 12% fat initiaux', completed: false }
    ]
  },
  {
    id: 'q-fm-m2',
    title: 'Réaliser une série de 365 jours de méditation Vipassana',
    description: 'Forger un mental de moine zen en méditant en pleine conscience chaque jour de l\'année.',
    type: 'epic',
    difficulty: 'epic',
    category: 'serenity',
    completed: false,
    streak: 0,
    createdAt: new Date().toISOString(),
    frequency: 'once',
    isMain: true,
    milestones: [
      { id: 'm-fm-m2-1', title: 'Ancré : Atteindre une série de 90 jours', completed: false },
      { id: 'm-fm-m2-2', title: 'Éveillé : Atteindre une série de 180 jours', completed: false },
      { id: 'm-fm-m2-3', title: 'Moine : Atteindre les 365 jours consécutifs', completed: false }
    ]
  },
  {
    id: 'q-fm-m3',
    title: 'Savoir tenir une conversation fluide en chinois',
    description: 'Étudier régulièrement la langue chinoise jusqu\'à pouvoir converser avec aisance.',
    type: 'epic',
    difficulty: 'epic',
    category: 'wisdom',
    completed: false,
    streak: 0,
    createdAt: new Date().toISOString(),
    frequency: 'once',
    isMain: true,
    milestones: [
      { id: 'm-fm-m3-1', title: 'Premiers Mots : Maîtriser le niveau HSK 1 (150 mots)', completed: false },
      { id: 'm-fm-m3-2', title: 'Débrouillard : Commander à manger et demander sa route seul', completed: false },
      { id: 'm-fm-m3-3', title: 'Bilingue : Tenir une vraie conversation fluide de 15 minutes', completed: false }
    ]
  },
  {
    id: 'q-fm-m4',
    title: 'Arrêter définitivement la vape',
    description: 'Se sevrer de toute inhalation de vapeur et de nicotine pour retrouver une pleine capacité pulmonaire.',
    type: 'epic',
    difficulty: 'epic',
    category: 'vitality',
    completed: false,
    streak: 0,
    createdAt: new Date().toISOString(),
    frequency: 'once',
    isMain: true,
    milestones: [
      { id: 'm-fm-m4-1', title: 'Sevrage : Tenir 1 semaine complète sans toucher à la vape', completed: false },
      { id: 'm-fm-m4-2', title: 'Purifié : Atteindre 1 mois complet sans fumer', completed: false },
      { id: 'm-fm-m4-3', title: 'Poumons Sains : Atteindre les 6 mois de liberté totale', completed: false }
    ]
  },
  {
    id: 'q-fm-m5',
    title: 'Monter mon entreprise de pâtisserie',
    description: 'Planifier, fonder et démarrer une activité entrepreneuriale dans la pâtisserie artisanale.',
    type: 'epic',
    difficulty: 'epic',
    category: 'wisdom',
    completed: false,
    streak: 0,
    createdAt: new Date().toISOString(),
    frequency: 'once',
    isMain: true,
    milestones: [
      { id: 'm-fm-m5-1', title: 'Architecte : Finaliser le business plan et les recettes signatures', completed: false },
      { id: 'm-fm-m5-2', title: 'Légal : Obtenir le statut juridique et les validations d\'hygiène', completed: false },
      { id: 'm-fm-m5-3', title: 'Chef : Enregistrer le tout premier euro de vente officielle', completed: false }
    ]
  },
  {
    id: 'q-fm-m6',
    title: 'Sortir mon tout premier album',
    description: 'Réaliser la production musicale complète d\'un album de flûte ou de compositions.',
    type: 'epic',
    difficulty: 'epic',
    category: 'magic',
    completed: false,
    streak: 0,
    createdAt: new Date().toISOString(),
    frequency: 'once',
    isMain: true,
    milestones: [
      { id: 'm-fm-m6-1', title: 'Maquettiste : Valider les 10 démos brutes du projet', completed: false },
      { id: 'm-fm-m6-2', title: 'Studio : Finaliser le mixage et le mastering de tous les titres', completed: false },
      { id: 'm-fm-m6-3', title: 'Opus 1 : Publier officiellement l\'album sur les plateformes', completed: false }
    ]
  },
  {
    id: 'q-fm-m7',
    title: 'Équiper parfaitement ma cuisine',
    description: 'Acquérir du matériel de cuisine haut de gamme pour travailler de façon professionnelle.',
    type: 'epic',
    difficulty: 'epic',
    category: 'vitality',
    completed: false,
    streak: 0,
    createdAt: new Date().toISOString(),
    frequency: 'once',
    isMain: true,
    milestones: [
      { id: 'm-fm-m7-1', title: 'Commis : Four à pizza, couteaux professionnels et batterie de cuisine', completed: false },
      { id: 'm-fm-m7-2', title: 'Chef 3 Étoiles : Rendre la cuisine 100% opérationnelle', completed: false }
    ]
  },
  {
    id: 'q-fm-m8',
    title: 'Terminer l\'aménagement du bureau',
    description: 'Bâtir un espace de travail inspirant, propre et ergonomique.',
    type: 'epic',
    difficulty: 'epic',
    category: 'wisdom',
    completed: false,
    streak: 0,
    createdAt: new Date().toISOString(),
    frequency: 'once',
    isMain: true,
    milestones: [
      { id: 'm-fm-m8-1', title: 'Fondations : Installer le bureau et le siège ergonomique', completed: false },
      { id: 'm-fm-m8-2', title: 'Connecté : Configurer l\'informatique et le câble-management', completed: false },
      { id: 'm-fm-m8-3', title: 'Le Bureau : Finaliser l\'éclairage et la décoration', completed: false }
    ]
  },
  {
    id: 'q-fm-m9',
    title: 'Terminer le tatouage sur le torse',
    description: 'Compléter toutes les sessions d\'encrage et de retouches pour finaliser l\'œuvre d\'art corporelle.',
    type: 'epic',
    difficulty: 'epic',
    category: 'magic',
    completed: false,
    streak: 0,
    createdAt: new Date().toISOString(),
    frequency: 'once',
    isMain: true,
    milestones: [
      { id: 'm-fm-m9-1', title: 'Marqué : Terminer la toute dernière séance de retouches', completed: false }
    ]
  }
];

export const FLUTE_MONK_ACHIEVEMENTS: Achievement[] = [
  // --- NUTRITION & BODYFAT ---
  {
    id: 'a-fm-bodyfat-18',
    title: 'Affûté',
    description: 'Passer sous la barre des 18% de taux de masse grasse.',
    badgeIcon: 'Heart',
    conditionType: 'quests_completed', // custom unlocked via milestone mapping
    conditionValue: 1,
    progress: 0,
    target: 1,
    unlocked: false
  },
  {
    id: 'a-fm-bodyfat-15',
    title: 'Dessiné',
    description: 'Atteindre 15% de bodyfat (les abdos pointent le bout de leur nez).',
    badgeIcon: 'Heart',
    conditionType: 'quests_completed',
    conditionValue: 1,
    progress: 0,
    target: 1,
    unlocked: false
  },
  {
    id: 'a-fm-bodyfat-12',
    title: 'Sec',
    description: 'Atteindre les 12% de bodyfat fixés en objectif initial.',
    badgeIcon: 'Gem',
    conditionType: 'quests_completed',
    conditionValue: 1,
    progress: 0,
    target: 1,
    unlocked: false
  },

  // --- MEDITATION VIPASSANA ---
  {
    id: 'a-fm-med-90',
    title: 'Ancré',
    description: 'Atteindre une série consécutive de 90 jours de méditation Vipassana.',
    badgeIcon: 'Sparkles',
    conditionType: 'quests_completed',
    conditionValue: 1,
    progress: 0,
    target: 1,
    unlocked: false
  },
  {
    id: 'a-fm-med-180',
    title: 'Éveillé',
    description: 'Atteindre une série consécutive de 180 jours de méditation Vipassana.',
    badgeIcon: 'Sparkles',
    conditionType: 'quests_completed',
    conditionValue: 1,
    progress: 0,
    target: 1,
    unlocked: false
  },
  {
    id: 'a-fm-med-365',
    title: 'Moine',
    description: 'Atteindre le sommet spirituel de 365 jours de méditation consécutifs.',
    badgeIcon: 'Crown',
    conditionType: 'quests_completed',
    conditionValue: 1,
    progress: 0,
    target: 1,
    unlocked: false
  },

  // --- CHINOIS ---
  {
    id: 'a-fm-chinese-1',
    title: 'Premiers Mots',
    description: 'Maîtriser le vocabulaire et les caractères requis pour le niveau HSK 1 (150 mots).',
    badgeIcon: 'BookOpen',
    conditionType: 'quests_completed',
    conditionValue: 1,
    progress: 0,
    target: 1,
    unlocked: false
  },
  {
    id: 'a-fm-chinese-2',
    title: 'Débrouillard',
    description: 'Pouvoir commander à manger et demander son chemin seul dans un environnement sinophone.',
    badgeIcon: 'BookOpen',
    conditionType: 'quests_completed',
    conditionValue: 1,
    progress: 0,
    target: 1,
    unlocked: false
  },
  {
    id: 'a-fm-chinese-3',
    title: 'Bilingue',
    description: 'Soutenir une conversation fluide et spontanée de 15 minutes en chinois.',
    badgeIcon: 'Crown',
    conditionType: 'quests_completed',
    conditionValue: 1,
    progress: 0,
    target: 1,
    unlocked: false
  },

  // --- ARRET DE LA VAPE ---
  {
    id: 'a-fm-vape-7',
    title: 'Sevrage',
    description: 'Tenir une semaine complète d\'abstinence totale sans toucher à la vape.',
    badgeIcon: 'Heart',
    conditionType: 'quests_completed',
    conditionValue: 1,
    progress: 0,
    target: 1,
    unlocked: false
  },
  {
    id: 'a-fm-vape-30',
    title: 'Purifié',
    description: 'Atteindre un mois complet (30 jours) sans fumer ni vapoter.',
    badgeIcon: 'Heart',
    conditionType: 'quests_completed',
    conditionValue: 1,
    progress: 0,
    target: 1,
    unlocked: false
  },
  {
    id: 'a-fm-vape-180',
    title: 'Poumons Sains',
    description: 'Atteindre les 6 mois de liberté totale et respirer un air pur.',
    badgeIcon: 'Gem',
    conditionType: 'quests_completed',
    conditionValue: 1,
    progress: 0,
    target: 1,
    unlocked: false
  },

  // --- ENTREPRISE DE PATISSERIE ---
  {
    id: 'a-fm-bakery-plan',
    title: 'Architecte',
    description: 'Finaliser l\'ensemble du business plan et valider les recettes de pâtisseries signatures.',
    badgeIcon: 'Compass',
    conditionType: 'quests_completed',
    conditionValue: 1,
    progress: 0,
    target: 1,
    unlocked: false
  },
  {
    id: 'a-fm-bakery-legal',
    title: 'Légal',
    description: 'Obtenir l\'existence juridique de l\'entreprise et valider toutes les normes d\'hygiène.',
    badgeIcon: 'Shield',
    conditionType: 'quests_completed',
    conditionValue: 1,
    progress: 0,
    target: 1,
    unlocked: false
  },
  {
    id: 'a-fm-bakery-sale',
    title: 'Chef',
    description: 'Facturer et encaisser officiellement le tout premier euro d\'une vente de pâtisserie.',
    badgeIcon: 'Coins',
    conditionType: 'quests_completed',
    conditionValue: 1,
    progress: 0,
    target: 1,
    unlocked: false
  },

  // --- ALBUM MUSICAL ---
  {
    id: 'a-fm-album-demos',
    title: 'Maquettiste',
    description: 'Enregistrer et valider les 10 maquettes brutes constituant la base du projet.',
    badgeIcon: 'Zap',
    conditionType: 'quests_completed',
    conditionValue: 1,
    progress: 0,
    target: 1,
    unlocked: false
  },
  {
    id: 'a-fm-album-studio',
    title: 'Studio',
    description: 'Finaliser l\'étape ultime de mixage et de mastering pour l\'ensemble des morceaux.',
    badgeIcon: 'Zap',
    conditionType: 'quests_completed',
    conditionValue: 1,
    progress: 0,
    target: 1,
    unlocked: false
  },
  {
    id: 'a-fm-album-release',
    title: 'Opus 1',
    description: 'Publier et distribuer officiellement son tout premier album musical sur les plateformes.',
    badgeIcon: 'Crown',
    conditionType: 'quests_completed',
    conditionValue: 1,
    progress: 0,
    target: 1,
    unlocked: false
  },

  // --- CUISINE ---
  {
    id: 'a-fm-kitchen-gear',
    title: 'Commis',
    description: 'S\'équiper d\'un four à pizza professionnel, de couteaux forgés et de batteries de cuisson de qualité.',
    badgeIcon: 'Compass',
    conditionType: 'quests_completed',
    conditionValue: 1,
    progress: 0,
    target: 1,
    unlocked: false
  },
  {
    id: 'a-fm-kitchen-ready',
    title: 'Chef 3 Étoiles',
    description: 'Avoir une cuisine parfaitement organisée, optimisée et 100% opérationnelle.',
    badgeIcon: 'Crown',
    conditionType: 'quests_completed',
    conditionValue: 1,
    progress: 0,
    target: 1,
    unlocked: false
  },

  // --- BUREAU ---
  {
    id: 'a-fm-office-desk',
    title: 'Fondations',
    description: 'Installer un bureau stable avec un siège ergonomique haut de gamme pour l\'assise corporelle.',
    badgeIcon: 'Shield',
    conditionType: 'quests_completed',
    conditionValue: 1,
    progress: 0,
    target: 1,
    unlocked: false
  },
  {
    id: 'a-fm-office-tech',
    title: 'Connecté',
    description: 'Configurer l\'ensemble de l\'informatique et réaliser un câble-management impeccable.',
    badgeIcon: 'Zap',
    conditionType: 'quests_completed',
    conditionValue: 1,
    progress: 0,
    target: 1,
    unlocked: false
  },
  {
    id: 'a-fm-office-decor',
    title: 'Le Bureau',
    description: 'Finaliser l\'ambiance avec un éclairage adapté et une décoration harmonieuse.',
    badgeIcon: 'Sparkles',
    conditionType: 'quests_completed',
    conditionValue: 1,
    progress: 0,
    target: 1,
    unlocked: false
  },

  // --- TATOUAGE ---
  {
    id: 'a-fm-tattoo-final',
    title: 'Marqué',
    description: 'Achever la toute dernière séance de tatouage sur le torse incluant les retouches finales.',
    badgeIcon: 'Gem',
    conditionType: 'quests_completed',
    conditionValue: 1,
    progress: 0,
    target: 1,
    unlocked: false
  },

  // --- PHYSICAL PROGRESSION: TRACTIONS ---
  {
    id: 'a-fm-strength-pullup-10',
    title: 'Leste Léger',
    description: 'Valider une série de 10 tractions lestées à +10 kg.',
    badgeIcon: 'Flame',
    conditionType: 'quests_completed',
    conditionValue: 1,
    progress: 0,
    target: 1,
    unlocked: false
  },
  {
    id: 'a-fm-strength-pullup-20',
    title: 'Force Pure',
    description: 'Valider une série de 10 tractions lestées à +20 kg.',
    badgeIcon: 'Flame',
    conditionType: 'quests_completed',
    conditionValue: 1,
    progress: 0,
    target: 1,
    unlocked: false
  },
  {
    id: 'a-fm-strength-pullup-30',
    title: 'Poids Lourd',
    description: 'Valider une série de 10 tractions lestées à +30 kg.',
    badgeIcon: 'Flame',
    conditionType: 'quests_completed',
    conditionValue: 1,
    progress: 0,
    target: 1,
    unlocked: false
  },
  {
    id: 'a-fm-strength-pullup-40',
    title: 'Dos d\'Acier',
    description: 'Débloquer le palier légendaire de 10 tractions lestées à +40 kg.',
    badgeIcon: 'Crown',
    conditionType: 'quests_completed',
    conditionValue: 1,
    progress: 0,
    target: 1,
    unlocked: false
  },

  // --- PHYSICAL PROGRESSION: DIPS ---
  {
    id: 'a-fm-strength-dip-35',
    title: 'Solide',
    description: 'Valider une série de 10 dips lestés à +35 kg.',
    badgeIcon: 'Flame',
    conditionType: 'quests_completed',
    conditionValue: 1,
    progress: 0,
    target: 1,
    unlocked: false
  },
  {
    id: 'a-fm-strength-dip-50',
    title: 'Roc',
    description: 'Valider une série de 10 dips lestés à +50 kg.',
    badgeIcon: 'Flame',
    conditionType: 'quests_completed',
    conditionValue: 1,
    progress: 0,
    target: 1,
    unlocked: false
  },
  {
    id: 'a-fm-strength-dip-65',
    title: 'Presse Humaine',
    description: 'Valider une série de 10 dips lestés à +65 kg.',
    badgeIcon: 'Flame',
    conditionType: 'quests_completed',
    conditionValue: 1,
    progress: 0,
    target: 1,
    unlocked: false
  },
  {
    id: 'a-fm-strength-dip-80',
    title: 'Roi des Dips',
    description: 'Débloquer le palier mythique de 10 dips lestés à +80 kg.',
    badgeIcon: 'Crown',
    conditionType: 'quests_completed',
    conditionValue: 1,
    progress: 0,
    target: 1,
    unlocked: false
  },

  // --- PHYSICAL PROGRESSION: BENCHPRESS ---
  {
    id: 'a-fm-strength-bench-100',
    title: 'Centurion',
    description: 'Passer la barre mythique des 100 kg au développé couché.',
    badgeIcon: 'Shield',
    conditionType: 'quests_completed',
    conditionValue: 1,
    progress: 0,
    target: 1,
    unlocked: false
  },
  {
    id: 'a-fm-strength-bench-120',
    title: 'Guerrier',
    description: 'Atteindre un record maximal de 120 kg au développé couché.',
    badgeIcon: 'Shield',
    conditionType: 'quests_completed',
    conditionValue: 1,
    progress: 0,
    target: 1,
    unlocked: false
  },
  {
    id: 'a-fm-strength-bench-140',
    title: 'Monstre',
    description: 'Atteindre un record maximal de 140 kg au développé couché.',
    badgeIcon: 'Shield',
    conditionType: 'quests_completed',
    conditionValue: 1,
    progress: 0,
    target: 1,
    unlocked: false
  },
  {
    id: 'a-fm-strength-bench-160',
    title: 'Hercule',
    description: 'Débloquer le palier divin de 160 kg au développé couché.',
    badgeIcon: 'Crown',
    conditionType: 'quests_completed',
    conditionValue: 1,
    progress: 0,
    target: 1,
    unlocked: false
  },

  // --- PHYSICAL PROGRESSION: DEADLIFT ---
  {
    id: 'a-fm-strength-dead-125',
    title: 'Ancrage',
    description: 'Arracher 125 kg du sol au soulevé de terre.',
    badgeIcon: 'Shield',
    conditionType: 'quests_completed',
    conditionValue: 1,
    progress: 0,
    target: 1,
    unlocked: false
  },
  {
    id: 'a-fm-strength-dead-150',
    title: 'Puissance',
    description: 'Atteindre un soulevé de terre maximal de 150 kg.',
    badgeIcon: 'Shield',
    conditionType: 'quests_completed',
    conditionValue: 1,
    progress: 0,
    target: 1,
    unlocked: false
  },
  {
    id: 'a-fm-strength-dead-175',
    title: 'Brute',
    description: 'Atteindre un soulevé de terre maximal de 175 kg.',
    badgeIcon: 'Shield',
    conditionType: 'quests_completed',
    conditionValue: 1,
    progress: 0,
    target: 1,
    unlocked: false
  },
  {
    id: 'a-fm-strength-dead-200',
    title: 'Titan',
    description: 'Débloquer le palier titanesque de 200 kg au soulevé de terre.',
    badgeIcon: 'Crown',
    conditionType: 'quests_completed',
    conditionValue: 1,
    progress: 0,
    target: 1,
    unlocked: false
  }
];
