import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, Shield, Target, TrendingUp, Check } from 'lucide-react';

interface SetupGuideProps {
  onComplete: () => void;
}

const STEPS = [
  {
    title: "Bienvenue dans l'Aventure",
    description: "Votre personnage vient de naître. Cette application transformera vos habitudes et objectifs réels en progression RPG.",
    icon: <Sparkles className="w-12 h-12 text-[#10b981]" />
  },
  {
    title: "Créez vos Quêtes",
    description: "Dans l'onglet Quêtes, ajoutez vos objectifs (ex: Sport, Lecture). Associez-les à des attributs pour voir vos statistiques grimper.",
    icon: <Target className="w-12 h-12 text-blue-400" />
  },
  {
    title: "Forgez vos Compétences",
    description: "Investissez votre Or dans des Compétences. Plus vous pratiquez, plus vous débloquerez de rangs pour vos disciplines favorites.",
    icon: <Shield className="w-12 h-12 text-orange-400" />
  },
  {
    title: "Équipez votre Héros",
    description: "Améliorez votre avatar en achetant de l'équipement dans la boutique pour booster vos statistiques globales.",
    icon: <TrendingUp className="w-12 h-12 text-purple-400" />
  }
];

export function SetupGuide({ onComplete }: SetupGuideProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg bg-[#111113] border border-[#2a2a2a] rounded-2xl shadow-[0_0_50px_rgba(16,185,129,0.1)] overflow-hidden"
      >
        <div className="p-8 text-center relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-[#10b981]/10 blur-3xl rounded-full" />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 flex flex-col items-center"
            >
              <div className="mb-6 p-4 bg-[#0c0c0e] rounded-full border border-[#2a2a2a] shadow-inner">
                {STEPS[currentStep].icon}
              </div>
              <h2 className="text-2xl font-bold font-display text-slate-100 mb-4 tracking-wide">
                {STEPS[currentStep].title}
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-sm mx-auto">
                {STEPS[currentStep].description}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between mt-4">
            <div className="flex gap-2">
              {STEPS.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    idx === currentStep ? 'bg-[#10b981] w-6' : 'bg-[#2a2a2a]'
                  }`} 
                />
              ))}
            </div>
            
            <button
              onClick={handleNext}
              className="bg-gradient-to-r from-[#10b981] to-[#059669] hover:opacity-90 text-slate-950 px-6 py-2.5 rounded-xl font-bold tracking-wider uppercase text-xs transition flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
            >
              {currentStep < STEPS.length - 1 ? (
                <>Suivant <ArrowRight className="w-4 h-4" /></>
              ) : (
                <>Commencer <Check className="w-4 h-4" /></>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
