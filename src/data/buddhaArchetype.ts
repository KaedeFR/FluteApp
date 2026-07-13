import { Quest, SkillNode, Achievement } from '../types';

export const BUDDHA_SKILLS: SkillNode[] = [
  {
    id: 's-bud-1',
    title: 'Hygiène de Vie (Pilier I)',
    description: 'Fondations du bien-être physique et mental.',
    category: 'vitality',
    cost: 30,
    unlocked: true,
    level: 0,
    maxLevel: 4,
    ranks: [
      { rank: 1, title: 'Environnement Propre', description: 'Garder son lieu de vie ordonné pour réduire la charge cognitive.' },
      { rank: 2, title: 'Respect du Corps', description: 'Assurer 7h de sommeil et des repas réguliers.' },
      { rank: 3, title: 'Validation Émotionnelle', description: 'Savoir écouter et nommer ses émotions sans jugement.' },
      { rank: 4, title: 'Gestion de l\'Énergie', description: 'Appliquer la loi de Pareto et réduire les fuites énergétiques.' }
    ]
  },
  {
    id: 's-bud-2',
    title: 'Le Corps et le Mouvement (Pilier II)',
    description: 'Faire du corps un outil fonctionnel et résilient.',
    category: 'strength',
    cost: 40,
    unlocked: false,
    prerequisiteId: 's-bud-1',
    level: 0,
    maxLevel: 4,
    ranks: [
      { rank: 1, title: 'Le Mouvement Fondamental', description: 'Atteindre régulièrement 10 000 pas par jour.' },
      { rank: 2, title: 'Macro-nutrition', description: 'Trouver le bon équilibre (protéines, lipides, glucides) selon ses objectifs.' },
      { rank: 3, title: 'Renforcement et Mobilité', description: 'Pratique physique régulière avec focus sur la flexibilité.' },
      { rank: 4, title: 'Résilience Articulaire', description: 'Prendre soin de ses tendons et éviter les blessures.' }
    ]
  },
  {
    id: 's-bud-3',
    title: 'Méditation (Pilier III)',
    description: 'Entraînement de l\'attention et pleine conscience.',
    category: 'serenity',
    cost: 50,
    unlocked: false,
    prerequisiteId: 's-bud-2',
    level: 0,
    maxLevel: 4,
    ranks: [
      { rank: 1, title: 'Samatha (Attention)', description: 'Stabilité mentale en se concentrant sur le souffle.' },
      { rank: 2, title: 'Vipassana (Pleine Conscience)', description: 'Observation lucide de ce qui se passe ici et maintenant.' },
      { rank: 3, title: 'Distanciation Cognitive', description: 'Observer les émotions sans s\'y identifier ni y réagir impulsivement.' },
      { rank: 4, title: 'Hygiène Mentale', description: 'Se protéger des informations anxiogènes et nourrir son esprit.' }
    ]
  },
  {
    id: 's-bud-4',
    title: 'Social et Compassion (Pilier IV)',
    description: 'Connexion aux autres et à la nature.',
    category: 'wisdom',
    cost: 60,
    unlocked: false,
    prerequisiteId: 's-bud-3',
    level: 0,
    maxLevel: 4,
    ranks: [
      { rank: 1, title: 'Connexions Saines', description: 'Investir dans des relations de confiance et de réciprocité.' },
      { rank: 2, title: 'Karunā (Compassion)', description: 'Désir actif d\'alléger la souffrance d\'autrui.' },
      { rank: 3, title: 'Biophilie', description: 'Se reconnecter à la nature pour réduire le cortisol.' },
      { rank: 4, title: 'Solitude Choisie', description: 'Apprendre à être seul(e) sans se sentir isolé(e).' }
    ]
  },
  {
    id: 's-bud-5',
    title: 'Nutrition Avancée (Sommet I)',
    description: 'Optimisation nutritionnelle et microbiote.',
    category: 'vitality',
    cost: 50,
    unlocked: false,
    prerequisiteId: 's-bud-2',
    level: 0,
    maxLevel: 3,
    ranks: [
      { rank: 1, title: 'Micro-Nutrition', description: 'Assurer un statut optimal en vitamines et minéraux.' },
      { rank: 2, title: 'Le Microbiote', description: 'Prendre soin de sa flore intestinale pour l\'axe intestin-cerveau.' },
      { rank: 3, title: 'Diète d\'Élimination', description: 'Identifier ses propres déclencheurs inflammatoires.' }
    ]
  },
  {
    id: 's-bud-6',
    title: 'La Discipline (Sommet II)',
    description: 'L\'architecture de la liberté et de l\'action.',
    category: 'strength',
    cost: 70,
    unlocked: false,
    prerequisiteId: 's-bud-3',
    level: 0,
    maxLevel: 3,
    ranks: [
      { rank: 1, title: 'Kaizen (Progression)', description: 'De petits changements constants et itératifs.' },
      { rank: 2, title: 'Perfectionnement', description: 'Feedback critique : Mesure -> Analyse -> Ajustement.' },
      { rank: 3, title: 'Exploration de Soi', description: 'Naviguer dans l\'incertitude avec des hypothèses claires.' }
    ]
  },
  {
    id: 's-bud-7',
    title: 'Sens et Non-Soi (Sommet III)',
    description: 'La quête du Télos et la déconstruction de l\'Ego.',
    category: 'wisdom',
    cost: 100,
    unlocked: false,
    prerequisiteId: 's-bud-6',
    level: 0,
    maxLevel: 3,
    ranks: [
      { rank: 1, title: 'Télos & Ikigai', description: 'Trouver sa finalité et sa raison d\'être.' },
      { rank: 2, title: 'Anatta (Non-Soi)', description: 'Observer les pensées sans s\'identifier à un "moi" permanent.' },
      { rank: 3, title: 'L\'Écoulement (Flow)', description: 'Être absorbé par l\'action, sans ego ni notion du temps.' }
    ]
  }
];

export const BUDDHA_QUESTS: Quest[] = [
  {
    id: 'q-bud-d1',
    title: 'Nettoyage Cognitif',
    description: 'Ranger son espace de vie pour diminuer la charge cognitive latente.',
    type: 'daily',
    difficulty: 'easy',
    category: 'serenity',
    completed: false,
    streak: 0,
    createdAt: new Date().toISOString(),
    frequency: 'daily',
    isMain: false,
  },
  {
    id: 'q-bud-d2',
    title: 'Sommeil Réparateur (7h+)',
    description: 'Respecter son rythme circadien en dormant au moins 7 heures.',
    type: 'daily',
    difficulty: 'medium',
    category: 'vitality',
    completed: false,
    streak: 0,
    createdAt: new Date().toISOString(),
    frequency: 'daily',
    isMain: false,
  },
  {
    id: 'q-bud-d3',
    title: '10 000 Pas',
    description: 'Briser la sédentarité avec le mouvement fondamental.',
    type: 'daily',
    difficulty: 'medium',
    category: 'strength',
    completed: false,
    streak: 0,
    createdAt: new Date().toISOString(),
    frequency: 'daily',
    isMain: false,
  },
  {
    id: 'q-bud-d4',
    title: 'Samatha (Méditation)',
    description: 'Pratiquer l\'attention sur le souffle pour diminuer le bruit de fond mental.',
    type: 'daily',
    difficulty: 'hard',
    category: 'serenity',
    completed: false,
    streak: 0,
    createdAt: new Date().toISOString(),
    frequency: 'daily',
    isMain: false,
  },
  {
    id: 'q-bud-e1',
    title: 'Identifier son Télos',
    description: 'Réfléchir à son Ikigai : ce que j\'aime, ce dont le monde a besoin, mes talents, ce qui est valorisé.',
    type: 'epic',
    difficulty: 'epic',
    category: 'wisdom',
    completed: false,
    streak: 0,
    createdAt: new Date().toISOString(),
    frequency: 'once',
    isMain: true,
    milestones: [
      { id: 'm1', title: 'Définir ce que j\'aime', completed: false },
      { id: 'm2', title: 'Définir mes talents', completed: false },
      { id: 'm3', title: 'Définir ce dont le monde a besoin', completed: false },
      { id: 'm4', title: 'Trouver l\'intersection (Ikigai)', completed: false }
    ]
  },
  {
    id: 'q-bud-e2',
    title: 'La Diète d\'Élimination',
    description: 'Expérimenter pour identifier ses sensibilités et réduire l\'inflammation de bas grade.',
    type: 'epic',
    difficulty: 'epic',
    category: 'vitality',
    completed: false,
    streak: 0,
    createdAt: new Date().toISOString(),
    frequency: 'once',
    isMain: true,
    milestones: [
      { id: 'm1', title: 'Retirer les aliments suspects (2-3 semaines)', completed: false },
      { id: 'm2', title: 'Observer l\'évolution des symptômes', completed: false },
      { id: 'm3', title: 'Réintroduire un par un', completed: false },
      { id: 'm4', title: 'Identifier et éliminer les déclencheurs', completed: false }
    ]
  }
];

export const BUDDHA_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'a-bud-1',
    title: 'Le Juste Milieu',
    description: "Compléter vos premières quêtes et trouver l'équilibre (Mésotès).",
    badgeIcon: 'Compass',
    conditionType: 'quests_completed',
    conditionValue: 10,
    progress: 0,
    target: 10,
    unlocked: false,
    unlockedAt: undefined
  },
  {
    id: 'a-bud-2',
    title: 'Neuroplasticité',
    description: "Faire preuve d'une constance exemplaire dans vos habitudes quotidiennes.",
    badgeIcon: 'Flame',
    conditionType: 'dailies_completed',
    conditionValue: 30,
    progress: 0,
    target: 30,
    unlocked: false,
    unlockedAt: undefined
  },
  {
    id: 'a-bud-3',
    title: 'Compassion Transcendante',
    description: "Contribuer au bien-être d'autrui (symbolisé par 500 gold récoltés).",
    badgeIcon: 'Coins',
    conditionType: 'gold_earned',
    conditionValue: 500,
    progress: 0,
    target: 500,
    unlocked: false,
    unlockedAt: undefined
  }
];
