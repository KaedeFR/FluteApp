import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Sparkles, Brain, Heart, ChevronLeft, ChevronRight, User, Dumbbell } from 'lucide-react';
import { Character, CharacterStats } from '../types';

interface CharacterCreationProps {
  onComplete: (character: Character, setupGuide: boolean, archetypeId?: string) => void;
  onCancel: () => void;
}

type Archetype = {
  id: string;
  name: string;
  description: string;
  stats: CharacterStats;
  avatarId: string;
  classTitle: string;
};

const ARCHETYPES: Archetype[] = [
  {
    id: 'flute_monk',
    name: 'Le Moine Flûtiste',
    description: 'Combine l\'harmonie de l\'esprit (méditation), la rigueur physique (musculation), l\'écriture, l\'expression musicale et la maîtrise linguistique.',
    stats: { vitality: 6, strength: 6, wisdom: 6, serenity: 7, magic: 5 },
    avatarId: 'flutist_monk',
    classTitle: 'Moine Flûtiste',
  },
];

export function CharacterCreation({ onComplete, onCancel }: CharacterCreationProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [creationMode, setCreationMode] = useState<'archetype' | 'custom' | null>(null);
  
  // Form state
  const [name, setName] = useState('');
  const [selectedArchetype, setSelectedArchetype] = useState<Archetype | null>(null);
  const [raceId, setRaceId] = useState('human');
  
  // Custom stats
  const [customStats, setCustomStats] = useState<CharacterStats>({
    vitality: 5,
    wisdom: 5,
    strength: 5,
    serenity: 5,
    magic: 5,
  });
  const [customAvatar, setCustomAvatar] = useState('adventurer');
  const [customClass, setCustomClass] = useState('Aventurier');

  const maxStatsBudget = 30;
  const totalCustomStats = (Object.values(customStats) as number[]).reduce((a, b) => a + b, 0);
  const pointsRemaining = maxStatsBudget - totalCustomStats;

  const handleNext = () => {
    if (step === 1 && name.trim()) setStep(2);
    else if (step === 2 && creationMode) setStep(3);
  };

  const handleFinish = () => {
    let finalCharacter: Partial<Character> = {
      name: name.trim(),
      level: 1,
      xp: 0,
      hp: 100,
      maxHp: 100,
      gold: 50,
      raceId,
    };

    if (creationMode === 'archetype' && selectedArchetype) {
      finalCharacter = {
        ...finalCharacter,
        stats: selectedArchetype.stats,
        avatarId: selectedArchetype.avatarId,
        classTitle: selectedArchetype.classTitle,
      };
    } else {
      finalCharacter = {
        ...finalCharacter,
        stats: customStats,
        avatarId: customAvatar,
        classTitle: customClass || 'Aventurier',
      };
    }

    onComplete(finalCharacter as Character, true, creationMode === 'archetype' ? selectedArchetype?.id : undefined);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-slate-200 p-4 md:p-8 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-[#111113] border border-[#2a2a2a] rounded-2xl shadow-2xl overflow-hidden relative">
        {/* Header */}
        <div className="bg-[#1a1a1c] border-b border-[#2a2a2a] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <User className="text-[#10b981] w-6 h-6" />
            <h2 className="text-xl font-bold font-display uppercase tracking-widest text-slate-100">
              Création de Personnage
            </h2>
          </div>
          <button onClick={onCancel} className="text-slate-500 hover:text-slate-300 transition text-sm uppercase tracking-wider font-bold">
            Annuler
          </button>
        </div>

        <div className="p-6 md:p-8">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold font-display text-[#10b981] mb-2">Quel est votre nom, héros ?</h3>
                  <p className="text-slate-400 text-sm">Le nom par lequel vous serez connu dans les légendes.</p>
                </div>
                
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Kaelen l'Audacieux"
                  className="w-full bg-[#0c0c0e] border border-[#2a2a2a] focus:border-[#10b981] rounded-xl px-6 py-4 text-lg text-center text-slate-100 focus:outline-none transition shadow-inner"
                  autoFocus
                />
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold font-display text-[#10b981] mb-2">Votre Origine</h3>
                  <p className="text-slate-400 text-sm">Sélectionnez votre race, cela forgera votre identité.</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'human', label: 'Humain', emoji: '🧑' },
                    { id: 'elf', label: 'Elfe', emoji: '🧝' },
                    { id: 'dwarf', label: 'Nain', emoji: '🧔' },
                    { id: 'orc', label: 'Orc', emoji: '👹' },
                  ].map(race => (
                    <button
                      key={race.id}
                      onClick={() => setRaceId(race.id)}
                      className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition ${
                        raceId === race.id 
                          ? 'border-[#10b981] bg-[#10b981]/10 text-slate-100' 
                          : 'border-[#2a2a2a] bg-[#0c0c0e] text-slate-400 hover:border-[#10b981]/50'
                      }`}
                    >
                      <span className="text-3xl">{race.emoji}</span>
                      <span className="text-xs font-bold uppercase tracking-wider">{race.label}</span>
                    </button>
                  ))}
                </div>

                <div className="text-center mt-8 mb-4">
                  <h3 className="text-lg font-bold font-display text-slate-300 mb-2">Voie de l'Évolution</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={() => setCreationMode('archetype')}
                    className={`p-6 rounded-xl border text-left transition ${
                      creationMode === 'archetype' 
                        ? 'border-[#10b981] bg-[#10b981]/10' 
                        : 'border-[#2a2a2a] bg-[#0c0c0e] hover:border-[#10b981]/50'
                    }`}
                  >
                    <Shield className={`w-8 h-8 mb-3 ${creationMode === 'archetype' ? 'text-[#10b981]' : 'text-slate-500'}`} />
                    <h4 className="font-bold text-slate-200 mb-1">Archétypes Prédéfinis</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">Choisissez parmi des classes classiques avec des statistiques optimisées pour certains objectifs.</p>
                  </button>

                  <button
                    onClick={() => setCreationMode('custom')}
                    className={`p-6 rounded-xl border text-left transition ${
                      creationMode === 'custom' 
                        ? 'border-[#10b981] bg-[#10b981]/10' 
                        : 'border-[#2a2a2a] bg-[#0c0c0e] hover:border-[#10b981]/50'
                    }`}
                  >
                    <Sparkles className={`w-8 h-8 mb-3 ${creationMode === 'custom' ? 'text-[#10b981]' : 'text-slate-500'}`} />
                    <h4 className="font-bold text-slate-200 mb-1">Entièrement Personnalisé</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">Définissez vous-même vos statistiques, votre icône et votre titre d'aventurier.</p>
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && creationMode === 'archetype' && (
              <motion.div
                key="step3-arch"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold font-display text-[#10b981] mb-2">Choisissez votre Classe</h3>
                </div>

                <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-2">
                  {ARCHETYPES.map(arch => (
                    <button
                      key={arch.id}
                      onClick={() => setSelectedArchetype(arch)}
                      className={`w-full p-4 rounded-xl border text-left flex items-start gap-4 transition ${
                        selectedArchetype?.id === arch.id 
                          ? 'border-[#10b981] bg-[#10b981]/10' 
                          : 'border-[#2a2a2a] bg-[#0c0c0e] hover:border-[#10b981]/50'
                      }`}
                    >
                      <div className="text-4xl bg-[#111113] p-3 rounded-lg border border-[#1a1a1a]">
                        {arch.avatarId === 'warrior' ? '⚔️' : arch.avatarId === 'mage' ? '🔮' : arch.avatarId === 'flutist_monk' ? '🪈' : '🧘'}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-200 text-lg">{arch.name}</h4>
                        <p className="text-xs text-slate-400 mt-1 mb-3">{arch.description}</p>
                        <div className="flex gap-3 text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider">
                          <span className="flex items-center gap-1"><Heart className="w-3 h-3 text-red-400"/> {arch.stats.vitality}</span>
                          <span className="flex items-center gap-1"><Dumbbell className="w-3 h-3 text-orange-400"/> {arch.stats.strength}</span>
                          <span className="flex items-center gap-1"><Brain className="w-3 h-3 text-blue-400"/> {arch.stats.wisdom}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && creationMode === 'custom' && (
              <motion.div
                key="step3-custom"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold font-display text-[#10b981] mb-2">Façonnez votre Destin</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 block">Titre de Classe</label>
                    <input
                      type="text"
                      value={customClass}
                      onChange={(e) => setCustomClass(e.target.value)}
                      placeholder="Ex: Chasseur de Primes"
                      className="w-full bg-[#0c0c0e] border border-[#2a2a2a] focus:border-[#10b981] rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none transition"
                    />
                  </div>

                  <div className="bg-[#0c0c0e] border border-[#2a2a2a] p-4 rounded-xl">
                    <div className="flex justify-between items-center mb-3">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Attributs de statistique</label>
                      <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${
                        pointsRemaining === 0 
                          ? 'text-[#10b981] border-[#10b981]/20 bg-[#10b981]/10' 
                          : pointsRemaining < 0 
                            ? 'text-red-400 border-red-500/20 bg-red-950/20' 
                            : 'text-amber-400 border-amber-500/20 bg-amber-950/20 animate-pulse'
                      }`}>
                        {pointsRemaining === 0 
                          ? 'Tous les points attribués ✓' 
                          : `Points restants : ${pointsRemaining}`
                        }
                      </span>
                    </div>
                    <div className="space-y-3">
                      {Object.entries(customStats).map(([key, value]) => {
                        const val = value as number;
                        const isMin = val <= 1;
                        const isMax = pointsRemaining <= 0 || val >= 10; // Cap single attribute at 10 to encourage balanced distribution
                        return (
                          <div key={key} className="flex items-center justify-between">
                            <span className="text-sm font-semibold capitalize text-slate-300">{key === 'vitality' ? 'Vitalité' : key === 'wisdom' ? 'Sagesse' : key === 'strength' ? 'Force' : key === 'serenity' ? 'Sérénité' : 'Magie'}</span>
                            <div className="flex items-center gap-3">
                              <button 
                                type="button"
                                disabled={isMin}
                                onClick={() => setCustomStats(prev => ({...prev, [key]: Math.max(1, prev[key as keyof CharacterStats] - 1)}))}
                                className="w-6 h-6 flex items-center justify-center bg-[#1a1a1c] border border-[#2a2a2a] rounded text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition"
                              >-</button>
                              <span className="w-4 text-center font-mono font-bold text-[#10b981]">{val}</span>
                              <button 
                                type="button"
                                disabled={isMax}
                                onClick={() => {
                                  if (pointsRemaining > 0) {
                                    setCustomStats(prev => ({...prev, [key]: prev[key as keyof CharacterStats] + 1}));
                                  }
                                }}
                                className="w-6 h-6 flex items-center justify-center bg-[#1a1a1c] border border-[#2a2a2a] rounded text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition"
                              >+</button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer actions */}
        <div className="bg-[#1a1a1c] border-t border-[#2a2a2a] px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setStep(step > 1 ? (step - 1 as any) : 1)}
            disabled={step === 1}
            className={`px-4 py-2 rounded-lg font-bold tracking-wider uppercase text-xs transition flex items-center gap-2 ${
              step === 1 ? 'opacity-0 pointer-events-none' : 'text-slate-400 hover:text-slate-200 bg-[#111113] border border-[#2a2a2a] hover:border-slate-500'
            }`}
          >
            <ChevronLeft className="w-4 h-4" /> Retour
          </button>

          {step < 3 ? (
            <button
              onClick={handleNext}
              disabled={
                (step === 1 && !name.trim()) || 
                (step === 2 && !creationMode)
              }
              className="bg-[#10b981] hover:bg-[#059669] text-slate-950 px-6 py-2.5 rounded-lg font-bold tracking-wider uppercase text-xs transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(16,185,129,0.2)]"
            >
              Continuer <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              disabled={creationMode === 'archetype' ? !selectedArchetype : (pointsRemaining !== 0)}
              className="bg-gradient-to-r from-[#10b981] to-[#059669] hover:opacity-90 text-slate-950 px-6 py-2.5 rounded-lg font-bold tracking-wider uppercase text-xs transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(16,185,129,0.3)]"
            >
              {creationMode === 'custom' && pointsRemaining > 0 
                ? `Attribuer ${pointsRemaining} point${pointsRemaining > 1 ? 's' : ''}` 
                : creationMode === 'custom' && pointsRemaining < 0 
                  ? `Trop de points (${Math.abs(pointsRemaining)})` 
                  : <>Forger ma Légende <Sparkles className="w-4 h-4" /></>
              }
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
