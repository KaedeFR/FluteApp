import React from 'react';

export type ItemRarity = 'commun' | 'rare' | 'epique' | 'mythique' | 'divin';

interface RpgIconProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  rarity?: ItemRarity;
}

function getRarityColors(rarity?: ItemRarity) {
  switch (rarity) {
    case 'commun':
      return {
        glowStart: '#64748b',
        glowEnd: '#1e293b',
        accent: '#94a3b8',
        shadow: 'rgba(148,163,184,0.25)',
        shadowHover: 'rgba(148,163,184,0.45)',
      };
    case 'rare':
      return {
        glowStart: '#3b82f6',
        glowEnd: '#1e3a8a',
        accent: '#60a5fa',
        shadow: 'rgba(59,130,246,0.3)',
        shadowHover: 'rgba(59,130,246,0.5)',
      };
    case 'epique':
      return {
        glowStart: '#a855f7',
        glowEnd: '#581c87',
        accent: '#c084fc',
        shadow: 'rgba(168,85,247,0.3)',
        shadowHover: 'rgba(168,85,247,0.5)',
      };
    case 'mythique':
      return {
        glowStart: '#f97316',
        glowEnd: '#7c2d12',
        accent: '#fb923c',
        shadow: 'rgba(249,115,22,0.35)',
        shadowHover: 'rgba(249,115,22,0.55)',
      };
    case 'divin':
      return {
        glowStart: '#eab308',
        glowEnd: '#78350f',
        accent: '#facc15',
        shadow: 'rgba(234,179,8,0.4)',
        shadowHover: 'rgba(234,179,8,0.6)',
      };
    default:
      // Fallback: Blue/default
      return {
        glowStart: '#3b82f6',
        glowEnd: '#1e3a8a',
        accent: '#60a5fa',
        shadow: 'rgba(59,130,246,0.25)',
        shadowHover: 'rgba(59,130,246,0.45)',
      };
  }
}

// Global sizes used by all icons to make them responsive and easy to scale
const sizeClassMap = {
  xs: 'w-6 h-6',       // 24px - inline or badges
  sm: 'w-10 h-10',     // 40px - small cards/status
  md: 'w-14 h-14',     // 56px - default size, ideal for slots/stats
  lg: 'w-24 h-24',     // 96px - details/showcase
  xl: 'w-36 h-36'      // 144px - huge featured display
};

// ==========================================
// 1. GOLD ICON (Gold coin stack with runes and music treble clef)
// ==========================================
export function GoldIcon({ className = '', size = 'md' }: RpgIconProps) {
  const sClass = sizeClassMap[size];
  return (
    <svg 
      className={`${sClass} ${className} transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer filter drop-shadow-[0_0_8px_rgba(251,191,36,0.3)] hover:drop-shadow-[0_0_14px_rgba(251,191,36,0.55)]`} 
      viewBox="6 6 88 88" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="gold-bg-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#b45309" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="gold-metal-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fffbeb" />
          <stop offset="25%" stopColor="#fef08a" />
          <stop offset="60%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#78350f" />
        </linearGradient>
        <filter id="gold-drop-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="3" stdDeviation="2" floodColor="#000000" floodOpacity="0.6" />
        </filter>
      </defs>
      
      {/* Background magical glow */}
      <circle cx="50" cy="50" r="48" fill="url(#gold-bg-glow)" />
      
      {/* Stone Runic Ring behind the gold */}
      <circle cx="50" cy="50" r="40" fill="#18181b" stroke="#78350f" strokeWidth="2.5" />
      <circle cx="50" cy="50" r="35" stroke="#fbbf24" strokeWidth="1" strokeDasharray="3 4" opacity="0.4" />
      
      {/* Stack of Coins */}
      <g filter="url(#gold-drop-shadow)">
        {/* Coin 1 (Bottom) */}
        <path d="M 28 66 C 28 58, 72 58, 72 66 L 72 74 C 72 82, 28 82, 28 74 Z" fill="#78350f" stroke="#451a03" strokeWidth="1.5" />
        <ellipse cx="50" cy="66" rx="22" ry="7" fill="url(#gold-metal-grad)" stroke="#b45309" strokeWidth="0.8" />

        {/* Coin 2 */}
        <path d="M 26 54 C 26 46, 74 46, 74 54 L 74 62 C 74 70, 26 70, 26 62 Z" fill="#78350f" stroke="#451a03" strokeWidth="1.5" />
        <ellipse cx="50" cy="54" rx="24" ry="8" fill="url(#gold-metal-grad)" stroke="#b45309" strokeWidth="0.8" />

        {/* Coin 3 */}
        <path d="M 24 40 C 24 31, 76 31, 76 40 L 76 49 C 76 58, 24 58, 24 49 Z" fill="#78350f" stroke="#451a03" strokeWidth="1.5" />
        <ellipse cx="50" cy="40" rx="26" ry="9" fill="url(#gold-metal-grad)" stroke="#b45309" strokeWidth="0.8" />

        {/* Coin 4 (Top) */}
        <path d="M 26 26 C 26 18, 74 18, 74 26 L 74 34 C 74 42, 26 42, 26 34 Z" fill="#9a3412" stroke="#451a03" strokeWidth="2" />
        <ellipse cx="50" cy="26" rx="24" ry="8" fill="url(#gold-metal-grad)" stroke="#eab308" strokeWidth="1.5" />
        
        {/* Top coin engravings (Runic musical lines + notes) */}
        <ellipse cx="50" cy="26" rx="17" ry="5.5" fill="none" stroke="#fef08a" strokeWidth="1" strokeDasharray="3 2" />
        {/* Treble Clef engraving */}
        <path d="M 49 21 C 47 21, 46 23, 46 25 C 46 27, 49 28, 51 26 C 53 24, 49 22, 51 29 C 51 31, 48 30, 48 28" stroke="#fef08a" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        <circle cx="48" cy="28" r="1.5" fill="#fef08a" />
      </g>
      
      {/* Sparkling magical dust/stars */}
      <g opacity="0.9">
        {/* Big star left */}
        <path d="M 22 28 L 22 36 M 18 32 L 26 32" stroke="#fff" strokeWidth="1.2" />
        <circle cx="22" cy="32" r="1.5" fill="#fff" />
        
        {/* Big star right */}
        <path d="M 78 48 L 78 56 M 74 52 L 82 52" stroke="#fef08a" strokeWidth="1.2" />
        <circle cx="78" cy="52" r="1.5" fill="#fff" />
        
        {/* Small sparkle dots */}
        <circle cx="34" cy="18" r="1.5" fill="#fff" />
        <circle cx="66" cy="16" r="1" fill="#fef08a" />
        <circle cx="50" cy="48" r="1" fill="#fff" />
        <circle cx="72" cy="74" r="1.2" fill="#fff" />
      </g>
    </svg>
  );
}

// ==========================================
// 2. EXPERIENCE / XP ICON (Glowing ancient scroll radiating cyan energy)
// ==========================================
export function XpIcon({ className = '', size = 'md' }: RpgIconProps) {
  const sClass = sizeClassMap[size];
  return (
    <svg 
      className={`${sClass} ${className} transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer filter drop-shadow-[0_0_8px_rgba(34,211,238,0.35)] hover:drop-shadow-[0_0_14px_rgba(34,211,238,0.6)]`} 
      viewBox="6 6 88 88" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="xp-bg-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#0891b2" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="scroll-wood-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="40%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#78350f" />
        </linearGradient>
        <linearGradient id="parchment-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#fef9c3" />
          <stop offset="100%" stopColor="#eab308" />
        </linearGradient>
      </defs>
      
      {/* Background magical glow */}
      <circle cx="50" cy="50" r="48" fill="url(#xp-bg-glow)" />
      
      {/* Cosmic background runic circles */}
      <circle cx="50" cy="50" r="42" fill="#090d16" stroke="#0891b2" strokeWidth="2" />
      <circle cx="50" cy="50" r="38" stroke="#22d3ee" strokeWidth="1" strokeDasharray="5 6" opacity="0.6" />
      
      {/* Floating Scroll at an angle */}
      <g transform="rotate(-12 50 50) translate(0, -2)">
        {/* Back roller shadow */}
        <rect x="22" y="24" width="56" height="48" rx="2" fill="#1c1917" opacity="0.4" />
        
        {/* Parchment Body */}
        <path d="M 26 28 C 30 26, 70 26, 74 28 L 74 68 C 70 70, 30 70, 26 68 Z" fill="url(#parchment-grad)" stroke="#78350f" strokeWidth="1.5" />
        
        {/* Top Roller Spindle */}
        <rect x="18" y="22" width="64" height="6" rx="2" fill="url(#scroll-wood-grad)" stroke="#451a03" strokeWidth="1" />
        <circle cx="18" cy="25" r="4" fill="#fbbf24" stroke="#78350f" strokeWidth="1" />
        <circle cx="82" cy="25" r="4" fill="#fbbf24" stroke="#78350f" strokeWidth="1" />
        
        {/* Bottom Roller Spindle */}
        <rect x="18" y="68" width="64" height="6" rx="2" fill="url(#scroll-wood-grad)" stroke="#451a03" strokeWidth="1" />
        <circle cx="18" cy="71" r="4" fill="#fbbf24" stroke="#78350f" strokeWidth="1" />
        <circle cx="82" cy="71" r="4" fill="#fbbf24" stroke="#78350f" strokeWidth="1" />
        
        {/* Glowing cyan musical stave waves curling around it */}
        <path d="M 12 44 Q 30 32 50 48 T 88 52" stroke="#22d3ee" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.85" />
        <path d="M 14 48 Q 32 36 50 52 T 86 56" stroke="#e0f7fa" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.9" />
        
        {/* Ancient runic notes written on scroll */}
        <path d="M 32 38 L 44 34 M 36 44 L 48 40" stroke="#78350f" strokeWidth="1" opacity="0.8" />
        <circle cx="32" cy="38" r="1.5" fill="#78350f" opacity="0.8" />
        <circle cx="44" cy="34" r="1.5" fill="#78350f" opacity="0.8" />
        
        {/* Floating cyan music notes */}
        <ellipse cx="36" cy="52" rx="3" ry="2" fill="#06b6d4" transform="rotate(-15 36 52)" />
        <path d="M 38 51 L 38 42 L 46 44 L 46 48" stroke="#06b6d4" strokeWidth="1.2" fill="none" />
        <ellipse cx="44" cy="54" rx="3" ry="2" fill="#06b6d4" transform="rotate(-15 44 54)" />
        
        <ellipse cx="64" cy="44" rx="2.5" ry="1.8" fill="#22d3ee" transform="rotate(-15 64 44)" />
        <path d="M 66 43 L 66 35" stroke="#22d3ee" strokeWidth="1" />
      </g>
      
      {/* Radiant sparkles */}
      <g>
        <path d="M 15 28 L 15 36 M 11 32 L 19 32" stroke="#22d3ee" strokeWidth="1" />
        <path d="M 85 68 L 85 76 M 81 72 L 89 72" stroke="#22d3ee" strokeWidth="1" />
        <circle cx="50" cy="16" r="1.5" fill="#fff" />
        <circle cx="50" cy="84" r="1" fill="#22d3ee" />
      </g>
    </svg>
  );
}

// ==========================================
// 3. HEALTH / HP ICON (Crystalline ruby heart wrapped in golden vines)
// ==========================================
export function HpIcon({ className = '', size = 'md' }: RpgIconProps) {
  const sClass = sizeClassMap[size];
  return (
    <svg 
      className={`${sClass} ${className} transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer filter drop-shadow-[0_0_8px_rgba(244,63,94,0.35)] hover:drop-shadow-[0_0_14px_rgba(244,63,94,0.6)]`} 
      viewBox="6 6 88 88" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="hp-bg-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#9f1239" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ruby-facet-1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fda4af" />
          <stop offset="40%" stopColor="#f43f5e" />
          <stop offset="100%" stopColor="#be123c" />
        </linearGradient>
        <linearGradient id="ruby-facet-2" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#9f1239" />
          <stop offset="60%" stopColor="#e11d48" />
          <stop offset="100%" stopColor="#fb7185" />
        </linearGradient>
        <filter id="heart-glow-filter" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      {/* Background Red Aura */}
      <circle cx="50" cy="50" r="48" fill="url(#hp-bg-glow)" />
      
      {/* Circular Stone Backdrop */}
      <circle cx="50" cy="50" r="40" fill="#1c1917" stroke="#44403c" strokeWidth="3" />
      <circle cx="50" cy="50" r="35" stroke="#f43f5e" strokeWidth="1.2" strokeDasharray="6 4" opacity="0.4" />
      
      {/* Faceted Crystalline Ruby Heart */}
      <g filter="url(#heart-glow-filter)" transform="translate(0, 1)">
        {/* Base Heart Silhouette shadow */}
        <path d="M 50 74 C 50 74, 20 50, 20 34 C 20 20, 33 14, 44 20 C 47 22, 50 26, 50 26 C 50 26, 53 22, 56 20 C 67 14, 80 20, 80 34 C 80 50, 50 74, 50 74 Z" fill="#4c0519" />
        
        {/* Crystal Facets */}
        {/* Facet Left-Top */}
        <path d="M 50 26 L 44 20 C 33 14, 20 20, 20 34 L 38 42 Z" fill="url(#ruby-facet-1)" />
        {/* Facet Right-Top */}
        <path d="M 50 26 L 56 20 C 67 14, 80 20, 80 34 L 62 42 Z" fill="url(#ruby-facet-2)" />
        {/* Facet Left-Bottom */}
        <path d="M 20 34 C 20 44, 34 56, 50 74 L 38 42 Z" fill="#9f1239" stroke="#be123c" strokeWidth="0.5" />
        {/* Facet Right-Bottom */}
        <path d="M 80 34 C 80 44, 66 56, 50 74 L 62 42 Z" fill="#881337" stroke="#be123c" strokeWidth="0.5" />
        {/* Facet Center Diamond */}
        <path d="M 50 26 L 62 42 L 50 56 L 38 42 Z" fill="#ff4d6d" stroke="#fff" strokeWidth="0.5" />
        {/* Highlight flare */}
        <path d="M 46 22 L 40 21" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
      </g>
      
      {/* Golden vines climbing and wrapping the heart with green leaves */}
      <g>
        {/* Vine Left */}
        <path d="M 22 45 C 24 56, 40 68, 50 74" stroke="#eab308" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        {/* Vine Right */}
        <path d="M 78 45 C 76 56, 60 68, 50 74" stroke="#eab308" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        
        {/* Shiny Gold highlight on vines */}
        <path d="M 25 50 C 27 58, 41 68, 48 72" stroke="#fef08a" strokeWidth="0.8" fill="none" strokeLinecap="round" />

        {/* Leaf 1 */}
        <path d="M 23 48 C 17 50, 15 58, 22 56 C 26 54, 26 50, 23 48 Z" fill="#10b981" stroke="#047857" strokeWidth="1" />
        <path d="M 20 53 C 22 52, 23 52, 24 51" stroke="#fbbf24" strokeWidth="0.8" />
        
        {/* Leaf 2 */}
        <path d="M 77 48 C 83 50, 85 58, 78 56 C 74 54, 74 50, 77 48 Z" fill="#10b981" stroke="#047857" strokeWidth="1" />
        <path d="M 80 53 C 78 52, 77 52, 76 51" stroke="#fbbf24" strokeWidth="0.8" />
        
        {/* Leaf 3 */}
        <path d="M 32 26 C 28 24, 25 28, 29 32 C 32 34, 34 30, 32 26 Z" fill="#34d399" stroke="#047857" strokeWidth="1" />
        
        {/* Leaf 4 */}
        <path d="M 50 74 C 47 70, 48 65, 50 63 C 52 65, 53 70, 50 74 Z" fill="#10b981" stroke="#047857" strokeWidth="1" />
      </g>
    </svg>
  );
}

// ==========================================
// 4. ATTRIBUTES / GRIMOIRE ICON (Leather-bound magic book in runic circle)
// ==========================================
export function AttributesIcon({ className = '', size = 'md' }: RpgIconProps) {
  const sClass = sizeClassMap[size];
  return (
    <svg 
      className={`${sClass} ${className} transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer filter drop-shadow-[0_0_8px_rgba(168,85,247,0.35)] hover:drop-shadow-[0_0_14px_rgba(168,85,247,0.6)]`} 
      viewBox="6 6 88 88" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="attr-bg-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#a855f7" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#3b0764" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="leather-cover-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4c1d95" />
          <stop offset="60%" stopColor="#2e1065" />
          <stop offset="100%" stopColor="#0f052d" />
        </linearGradient>
        <linearGradient id="gold-trim" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#78350f" />
        </linearGradient>
      </defs>
      
      {/* Purple magical glow */}
      <circle cx="50" cy="50" r="48" fill="url(#attr-bg-glow)" />
      
      {/* Glowing Blue Cosmic Runic Circle */}
      <circle cx="50" cy="50" r="41" fill="#090514" stroke="#6366f1" strokeWidth="2.5" />
      <circle cx="50" cy="50" r="37" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 5" opacity="0.7" />
      
      {/* Floating Magic Book */}
      <g transform="translate(0, 1)">
        {/* Book shadow */}
        <rect x="25" y="27" width="50" height="42" rx="3" fill="#090514" opacity="0.6" />
        
        {/* Book Outer Cover */}
        <rect x="24" y="26" width="52" height="42" rx="3.5" fill="url(#leather-cover-grad)" stroke="#1e1b4b" strokeWidth="1.5" />
        
        {/* Ornamental Golden Corners */}
        <path d="M 24 33 L 24 26 L 31 26 Z" fill="url(#gold-trim)" />
        <path d="M 76 33 L 76 26 L 69 26 Z" fill="url(#gold-trim)" />
        <path d="M 24 61 L 24 68 L 31 68 Z" fill="url(#gold-trim)" />
        <path d="M 76 61 L 76 68 L 69 68 Z" fill="url(#gold-trim)" />
        
        {/* Gold Trim Borders */}
        <rect x="28" y="30" width="44" height="34" rx="1" fill="none" stroke="url(#gold-trim)" strokeWidth="1" opacity="0.8" />
        
        {/* Center Emblem: Glowing Cosmic Compass / Star */}
        <circle cx="50" cy="47" r="11" fill="#1e1b4b" stroke="url(#gold-trim)" strokeWidth="1.2" />
        <circle cx="50" cy="47" r="9" stroke="#60a5fa" strokeWidth="0.8" strokeDasharray="2 2" />
        {/* 8-pointed gold star in center */}
        <path d="M 50 39 L 52 45 L 58 47 L 52 49 L 50 55 L 48 49 L 42 47 L 48 45 Z" fill="url(#gold-trim)" />
        <circle cx="50" cy="47" r="1.5" fill="#fff" />
      </g>
      
      {/* Glowing Star Constellations in background */}
      <g opacity="0.8">
        {/* Left Constellation */}
        <line x1="18" y1="24" x2="30" y2="18" stroke="#818cf8" strokeWidth="0.8" />
        <line x1="30" y1="18" x2="35" y2="28" stroke="#818cf8" strokeWidth="0.8" />
        <circle cx="18" cy="24" r="1.5" fill="#38bdf8" />
        <circle cx="30" cy="18" r="2" fill="#fff" />
        <circle cx="35" cy="28" r="1.5" fill="#38bdf8" />
        
        {/* Right Constellation */}
        <line x1="82" y1="24" x2="70" y2="18" stroke="#818cf8" strokeWidth="0.8" />
        <line x1="70" y1="18" x2="65" y2="28" stroke="#818cf8" strokeWidth="0.8" />
        <circle cx="82" cy="24" r="1.5" fill="#38bdf8" />
        <circle cx="70" cy="18" r="2" fill="#fff" />
        <circle cx="65" cy="28" r="1.5" fill="#38bdf8" />
        
        {/* Magic Dust sparkles */}
        <path d="M 50 14 L 50 20 M 47 17 L 53 17" stroke="#fff" strokeWidth="1" />
        <path d="M 50 78 L 50 84 M 47 81 L 53 81" stroke="#a855f7" strokeWidth="1" />
      </g>
    </svg>
  );
}

// ==========================================
// 5. MENSURATIONS ICON (Glowing holographic body proportions scale)
// ==========================================
export function MensurationsIcon({ className = '', size = 'md' }: RpgIconProps) {
  const sClass = sizeClassMap[size];
  return (
    <svg 
      className={`${sClass} ${className} transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer filter drop-shadow-[0_0_8px_rgba(14,165,233,0.35)] hover:drop-shadow-[0_0_14px_rgba(14,165,233,0.6)]`} 
      viewBox="6 6 88 88" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="mens-bg-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#0369a1" stopOpacity="0" />
        </radialGradient>
        <filter id="wireframe-glow">
          <feGaussianBlur stdDeviation="1" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {/* Blue blueprint aura */}
      <circle cx="50" cy="50" r="48" fill="url(#mens-bg-glow)" />
      
      {/* Blueprint / Zodiac circular grid */}
      <circle cx="50" cy="50" r="40" fill="#0b1329" stroke="#0ea5e9" strokeWidth="2.5" />
      <circle cx="50" cy="50" r="32" stroke="#1d4ed8" strokeWidth="0.8" opacity="0.6" />
      <circle cx="50" cy="50" r="24" stroke="#1d4ed8" strokeWidth="0.8" opacity="0.4" />
      
      {/* Radial axes */}
      <line x1="50" y1="10" x2="50" y2="90" stroke="#1d4ed8" strokeWidth="0.8" opacity="0.5" />
      <line x1="10" y1="50" x2="90" y2="50" stroke="#1d4ed8" strokeWidth="0.8" opacity="0.5" />
      <line x1="22" y1="22" x2="78" y2="78" stroke="#1d4ed8" strokeWidth="0.5" opacity="0.3" />
      <line x1="22" y1="78" x2="78" y2="22" stroke="#1d4ed8" strokeWidth="0.5" opacity="0.3" />
      
      {/* Glowing Cyan Holographic Silhouette */}
      <g filter="url(#wireframe-glow)" stroke="#38bdf8" fill="none" strokeLinecap="round">
        {/* Head wireframe */}
        <circle cx="50" cy="27" r="6.5" strokeWidth="1.8" />
        <circle cx="50" cy="27" r="3" strokeWidth="1" strokeDasharray="1 1" />
        
        {/* Body trunk */}
        <path d="M 50 33.5 L 50 60" strokeWidth="2" />
        
        {/* Shoulders */}
        <path d="M 38 37 L 62 37" strokeWidth="2" />
        
        {/* Arms */}
        <path d="M 38 37 L 32 52 L 26 58" strokeWidth="1.5" />
        <path d="M 62 37 L 68 52 L 74 58" strokeWidth="1.5" />
        
        {/* Chest cage wireframe triangle */}
        <path d="M 50 33.5 L 38 37 L 50 50 L 62 37 Z" strokeWidth="1" opacity="0.7" />
        
        {/* Pelvis bar */}
        <path d="M 42 60 L 58 60" strokeWidth="2" />
        
        {/* Legs */}
        <path d="M 42 60 L 40 76 L 38 84" strokeWidth="1.8" />
        <path d="M 58 60 L 60 76 L 62 84" strokeWidth="1.8" />
        
        {/* Grid dots/nodes on joints */}
        <circle cx="50" cy="33.5" r="1.5" fill="#fff" stroke="none" />
        <circle cx="38" cy="37" r="1.5" fill="#fff" stroke="none" />
        <circle cx="62" cy="37" r="1.5" fill="#fff" stroke="none" />
        <circle cx="32" cy="52" r="1.2" fill="#fff" stroke="none" />
        <circle cx="68" cy="52" r="1.2" fill="#fff" stroke="none" />
        <circle cx="42" cy="60" r="1.5" fill="#fff" stroke="none" />
        <circle cx="58" cy="60" r="1.5" fill="#fff" stroke="none" />
      </g>
      
      {/* Glowing gold/orange tape measure spiraling around torso */}
      <g>
        {/* Back tape segments */}
        <path d="M 36 43 C 44 41, 56 41, 64 43" stroke="#b45309" strokeWidth="2" fill="none" strokeDasharray="3 2" />
        <path d="M 38 52 C 44 50, 56 50, 62 52" stroke="#b45309" strokeWidth="2" fill="none" strokeDasharray="3 2" />
        
        {/* Front tape loops */}
        <path d="M 33 46 C 42 49, 58 49, 67 46" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M 35 55 C 43 58, 57 58, 65 55" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M 32 63 C 44 67, 56 67, 68 63" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" fill="none" />
        
        {/* Tape Tick marks */}
        <path d="M 39 47.2 L 39 48.2 M 45 47.8 L 45 48.8 M 51 48 L 51 49 M 57 47.8 L 57 48.8 M 61 47.2 L 61 48.2" stroke="#78350f" strokeWidth="0.8" />
        <path d="M 41 56.2 L 41 57.2 M 47 56.8 L 47 57.8 M 53 57 L 53 58 M 59 56.8 L 59 57.8 M 63 56.2 L 63 57.2" stroke="#78350f" strokeWidth="0.8" />
      </g>
    </svg>
  );
}

// ==========================================
// 6. EVOLUTION / LOTUS ICON (Brilliant glowing cyan water lotus)
// ==========================================
export function EvolutionIcon({ className = '', size = 'md' }: RpgIconProps) {
  const sClass = sizeClassMap[size];
  return (
    <svg 
      className={`${sClass} ${className} transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer filter drop-shadow-[0_0_8px_rgba(34,211,238,0.35)] hover:drop-shadow-[0_0_14px_rgba(34,211,238,0.6)]`} 
      viewBox="6 6 88 88" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="evo-bg-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#0f766e" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="lotus-petal-grad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#0f766e" />
          <stop offset="60%" stopColor="#2dd4bf" />
          <stop offset="100%" stopColor="#ccfbf1" />
        </linearGradient>
      </defs>
      
      {/* Teal background glow */}
      <circle cx="50" cy="50" r="48" fill="url(#evo-bg-glow)" />
      
      {/* Stone Runic Medallion Border */}
      <circle cx="50" cy="50" r="40" fill="#061215" stroke="#0d9488" strokeWidth="3" />
      <circle cx="50" cy="50" r="35" stroke="#2dd4bf" strokeWidth="1.2" strokeDasharray="4 6" opacity="0.6" />
      
      {/* Lotus Bloom floating on water ripples */}
      <g transform="translate(0, 3)">
        {/* Concentric Water Ripple waves */}
        <ellipse cx="50" cy="65" rx="26" ry="6" stroke="#0d9488" strokeWidth="1.5" opacity="0.4" />
        <ellipse cx="50" cy="65" rx="18" ry="4" stroke="#2dd4bf" strokeWidth="2" opacity="0.7" fill="#0f766e" fillOpacity="0.2" />
        <ellipse cx="50" cy="65" rx="10" ry="2.2" stroke="#ccfbf1" strokeWidth="1" opacity="0.8" />
        
        {/* Layer 1: Back Petals */}
        <path d="M 50 20 C 36 38, 22 46, 22 58 C 22 64, 50 64, 50 64 C 50 64, 78 64, 78 58 C 78 46, 64 38, 50 20 Z" fill="url(#lotus-petal-grad)" opacity="0.5" />
        
        {/* Layer 2: Side Petals */}
        <path d="M 50 28 C 42 40, 16 48, 16 58 C 16 63, 50 63, 50 63 Z" fill="url(#lotus-petal-grad)" opacity="0.8" stroke="#14b8a6" strokeWidth="0.5" />
        <path d="M 50 28 C 58 40, 84 48, 84 58 C 84 63, 50 63, 50 63 Z" fill="url(#lotus-petal-grad)" opacity="0.8" stroke="#14b8a6" strokeWidth="0.5" />
        
        {/* Layer 3: Main Inner Petals */}
        <path d="M 50 25 C 44 40, 26 48, 26 60 C 26 63, 50 63, 50 63 C 50 63, 74 63, 74 60 C 74 48, 56 40, 50 25 Z" fill="url(#lotus-petal-grad)" stroke="#ccfbf1" strokeWidth="0.8" />
        
        {/* Layer 4: Front Core Petals */}
        <path d="M 50 32 C 46 43, 34 50, 34 61 C 34 63, 50 63, 50 63 Z" fill="#2dd4bf" stroke="#ccfbf1" strokeWidth="1" />
        <path d="M 50 32 C 54 43, 66 50, 66 61 C 66 63, 50 63, 50 63 Z" fill="#2dd4bf" stroke="#ccfbf1" strokeWidth="1" />
        <path d="M 50 35 C 48 45, 42 50, 42 61 C 42 63, 58 63, 58 61 C 58 50, 52 45, 50 35 Z" fill="#ccfbf1" stroke="#fff" strokeWidth="0.8" />
        
        {/* Glowing golden stamen dots */}
        <circle cx="50" cy="56" r="1.5" fill="#fbbf24" />
        <circle cx="46" cy="58" r="1.2" fill="#fbbf24" />
        <circle cx="54" cy="58" r="1.2" fill="#fbbf24" />
      </g>
      
      {/* Twinkles */}
      <circle cx="20" cy="24" r="1.5" fill="#fff" opacity="0.8" />
      <circle cx="80" cy="24" r="1.5" fill="#fff" opacity="0.8" />
      <circle cx="50" cy="14" r="1" fill="#fff" />
    </svg>
  );
}

// ==========================================
// 7. STRENGTH / FORCE ICON (Heavy volcanic fist with molten lava veins)
// ==========================================
export function StrengthIcon({ className = '', size = 'md' }: RpgIconProps) {
  const sClass = sizeClassMap[size];
  return (
    <svg 
      className={`${sClass} ${className} transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer filter drop-shadow-[0_0_8px_rgba(249,115,22,0.35)] hover:drop-shadow-[0_0_14px_rgba(249,115,22,0.6)]`} 
      viewBox="6 6 88 88" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="str-bg-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f97316" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#7c2d12" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="iron-metal-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4b5563" />
          <stop offset="50%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
        <filter id="lava-glow">
          <feGaussianBlur stdDeviation="1.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {/* Background Volcanic Glow */}
      <circle cx="50" cy="50" r="48" fill="url(#str-bg-glow)" />
      
      {/* Runic Stone Backing */}
      <circle cx="50" cy="50" r="40" fill="#1c1917" stroke="#ea580c" strokeWidth="3" />
      <circle cx="50" cy="50" r="35" stroke="#f97316" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
      
      {/* Heavy Clenched Volcanic Fist */}
      <g transform="translate(0, -1)">
        {/* Forearm guard */}
        <path d="M 41 68 L 59 68 L 55 81 L 45 81 Z" fill="url(#iron-metal-grad)" stroke="#111827" strokeWidth="2" />
        <path d="M 45 68 L 55 68 L 52 77 L 48 77 Z" fill="#d97706" opacity="0.7" />
        
        {/* Gauntlet Clenched Hand */}
        <path d="M 33 46 C 33 38, 41 33, 50 33 C 59 33, 67 38, 67 46 L 62 68 L 38 68 Z" fill="url(#iron-metal-grad)" stroke="#111827" strokeWidth="2" />
        
        {/* Joint rivets on fingers */}
        <circle cx="41" cy="40" r="2.5" fill="#ca8a04" stroke="#78350f" strokeWidth="1" />
        <circle cx="50" cy="38" r="2.5" fill="#ca8a04" stroke="#78350f" strokeWidth="1" />
        <circle cx="59" cy="40" r="2.5" fill="#ca8a04" stroke="#78350f" strokeWidth="1" />
        
        {/* Clenched thumb wrapping over */}
        <path d="M 32 48 C 34 54, 46 54, 46 48 L 40 44 Z" fill="#374151" stroke="#111827" strokeWidth="1" />
        
        {/* Glowing Orange/Red Volcanic Magma Cracks */}
        <g filter="url(#lava-glow)" stroke="#f97316" strokeWidth="2" strokeLinecap="round">
          {/* Main vertical vein */}
          <path d="M 50 38 L 50 65" />
          {/* Side lightning veins */}
          <path d="M 41 40 L 46 52 L 39 60" strokeWidth="1.5" />
          <path d="M 59 40 L 54 52 L 61 60" strokeWidth="1.5" />
          {/* Horizontal molten joint line */}
          <path d="M 36 50 L 64 50" stroke="#fdba74" strokeWidth="1.2" />
        </g>
      </g>
      
      {/* Volcanic embers floating */}
      <circle cx="28" cy="22" r="1.5" fill="#f97316" />
      <circle cx="74" cy="20" r="1.2" fill="#f59e0b" />
      <circle cx="22" cy="64" r="1" fill="#ef4444" />
      <circle cx="80" cy="62" r="1.5" fill="#f97316" />
    </svg>
  );
}

// Wisdom Icon maps to AttributesIcon with purple dropshadow
export function WisdomIcon({ className = '', size = 'md' }: RpgIconProps) {
  return <AttributesIcon className={className} size={size} />;
}

// Serenity Icon maps to EvolutionIcon with cyan/teal dropshadow
export function SerenityIcon({ className = '', size = 'md' }: RpgIconProps) {
  return <EvolutionIcon className={className} size={size} />;
}

// ==========================================
// 8. MAGIC / MAGIE ICON (Purple vortex cosmic lightning portal)
// ==========================================
export function MagicIcon({ className = '', size = 'md' }: RpgIconProps) {
  const sClass = sizeClassMap[size];
  return (
    <svg 
      className={`${sClass} ${className} transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer filter drop-shadow-[0_0_8px_rgba(168,85,247,0.35)] hover:drop-shadow-[0_0_14px_rgba(168,85,247,0.6)]`} 
      viewBox="6 6 88 88" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="magic-bg-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#d946ef" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#4a044e" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="portal-nebula" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fdf4ff" />
          <stop offset="35%" stopColor="#f472b6" />
          <stop offset="70%" stopColor="#a21caf" />
          <stop offset="100%" stopColor="#3b0764" />
        </radialGradient>
        <filter id="lightning-glow">
          <feGaussianBlur stdDeviation="1" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {/* Background Glow */}
      <circle cx="50" cy="50" r="48" fill="url(#magic-bg-glow)" />
      
      {/* Heavy obsidian runic portal ring */}
      <circle cx="50" cy="50" r="41" fill="#090514" stroke="#4a044e" strokeWidth="3" />
      <circle cx="50" cy="50" r="37.5" stroke="#f472b6" strokeWidth="1" strokeDasharray="2 4" opacity="0.7" />
      
      {/* Portal Core */}
      <circle cx="50" cy="50" r="30" fill="url(#portal-nebula)" stroke="#fdf4ff" strokeWidth="0.8" />
      
      {/* Swirling energy arms */}
      <g opacity="0.5">
        <path d="M 50 24 C 60 24, 72 32, 72 44 C 72 56, 56 68, 50 68 C 44 68, 28 56, 28 44 C 28 32, 40 24, 50 24 Z" stroke="#e9d5ff" strokeWidth="1.5" strokeDasharray="10 5" />
        <path d="M 50 28 C 58 28, 66 34, 66 44 C 66 54, 54 62, 50 62" stroke="#f472b6" strokeWidth="1" />
      </g>
      
      {/* Crackling Electric Lightning Bolts */}
      <g filter="url(#lightning-glow)" stroke="#fdf4ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 32 32 L 44 42 L 40 50 L 56 52 L 52 64 L 66 66" />
        <path d="M 66 32 L 56 40 L 62 48 L 50 50" stroke="#f472b6" strokeWidth="1.2" />
        <path d="M 30 54 L 36 52 L 34 60" stroke="#e879f9" strokeWidth="1" />
      </g>
      
      {/* Magical stars */}
      <circle cx="50" cy="50" r="2" fill="#fff" />
      <path d="M 24 18 L 24 24 M 21 21 L 27 21" stroke="#fdf4ff" strokeWidth="1.2" />
      <path d="M 76 80 L 76 86 M 73 83 L 79 83" stroke="#fdf4ff" strokeWidth="1.2" />
    </svg>
  );
}

// Vitality Icon maps to HpIcon with rose dropshadow
export function VitalityIcon({ className = '', size = 'md' }: RpgIconProps) {
  return <HpIcon className={className} size={size} />;
}

// ==========================================
// 9. HELMET / CASQUE ICON (Metallic knight helmet with glowing visor)
// ==========================================
export function HeadIcon({ className = '', size = 'md', rarity }: RpgIconProps) {
  const sClass = sizeClassMap[size];
  const rColors = getRarityColors(rarity);
  const id = React.useId();
  const cleanId = id.replace(/:/g, '');
  const bgGlowId = `helm-bg-glow-${cleanId}`;
  const metalId = `helm-metal-${cleanId}`;
  const goldId = `helm-gold-${cleanId}`;

  return (
    <svg 
      className={`${sClass} ${className} transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer`} 
      style={{
        filter: `drop-shadow(0 0 8px ${rColors.shadow})`
      }}
      viewBox="6 6 88 88" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id={bgGlowId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={rColors.glowStart} stopOpacity="0.45" />
          <stop offset="100%" stopColor={rColors.glowEnd} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={metalId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#cbd5e1" />
          <stop offset="35%" stopColor="#64748b" />
          <stop offset="75%" stopColor="#334155" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
        <linearGradient id={goldId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#854d0e" />
        </linearGradient>
      </defs>
      
      {/* Dynamic magical glow */}
      <circle cx="50" cy="50" r="48" fill={`url(#${bgGlowId})`} />
      
      {/* Stone Medallion Ring */}
      <circle cx="50" cy="50" r="40" fill="#1c1917" stroke="#44403c" strokeWidth="3" />
      <circle cx="50" cy="50" r="35" stroke={rColors.accent} strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
      
      {/* Metallic Helmet */}
      <g transform="translate(0, 2)">
        {/* Plume feathers */}
        <path d="M 50 18 C 38 10, 32 18, 28 26 C 36 24, 44 26, 48 30 Z" fill={rColors.glowStart} stroke={rColors.glowEnd} strokeWidth="1" />
        <path d="M 50 18 C 62 10, 68 18, 72 26 C 64 24, 56 26, 52 30 Z" fill={rColors.glowStart} stroke={rColors.glowEnd} strokeWidth="1" />
        
        {/* Helmet Dome Body */}
        <path d="M 31 48 C 31 28, 69 28, 69 48 L 66 70 C 66 74, 34 74, 34 70 Z" fill={`url(#${metalId})`} stroke="#0f172a" strokeWidth="2" />
        
        {/* Forehead Golden crown pattern */}
        <path d="M 37 36 Q 50 42 63 36 L 57 32 Q 50 36 43 32 Z" fill={`url(#${goldId})`} stroke="#78350f" strokeWidth="1" />
        <path d="M 50 28 L 53 34 L 47 34 Z" fill={`url(#${goldId})`} />
        <circle cx="50" cy="26" r="1.5" fill="#fef08a" />
        
        {/* Faceplate Visor Guard */}
        <path d="M 31 46 L 69 46 L 65 56 L 35 56 Z" fill="#1e293b" stroke="#0f172a" strokeWidth="1.5" />
        
        {/* Visor Slit glowing with rarity color */}
        <rect x="36" y="49" width="28" height="3.5" rx="1" fill={rColors.glowEnd} stroke={rColors.accent} strokeWidth="1" />
        <line x1="39" y1="51" x2="61" y2="51" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" />
        
        {/* Vent Holes */}
        <circle cx="43" cy="63" r="1" fill="#0f172a" />
        <circle cx="47" cy="63" r="1" fill="#0f172a" />
        <circle cx="50" cy="63" r="1" fill="#0f172a" />
        <circle cx="53" cy="63" r="1" fill="#0f172a" />
        <circle cx="57" cy="63" r="1" fill="#0f172a" />
        <circle cx="45" cy="67" r="1" fill="#0f172a" />
        <circle cx="50" cy="67" r="1" fill="#0f172a" />
        <circle cx="55" cy="67" r="1" fill="#0f172a" />
      </g>
    </svg>
  );
}

// ==========================================
// 10. ARMOR / BREASTPLATE ICON (Obsidian plate armor with teal runes)
// ==========================================
export function ArmorIcon({ className = '', size = 'md', rarity }: RpgIconProps) {
  const sClass = sizeClassMap[size];
  const rColors = getRarityColors(rarity);
  const id = React.useId();
  const cleanId = id.replace(/:/g, '');
  const bgGlowId = `arm-bg-glow-${cleanId}`;
  const metalId = `obsidian-metal-${cleanId}`;

  return (
    <svg 
      className={`${sClass} ${className} transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer`} 
      style={{
        filter: `drop-shadow(0 0 8px ${rColors.shadow})`
      }}
      viewBox="6 6 88 88" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id={bgGlowId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={rColors.glowStart} stopOpacity="0.45" />
          <stop offset="100%" stopColor={rColors.glowEnd} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={metalId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="40%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#020617" />
        </linearGradient>
        <filter id={`rune-neon-${cleanId}`}>
          <feGaussianBlur stdDeviation="0.8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {/* Dynamic backing glow */}
      <circle cx="50" cy="50" r="48" fill={`url(#${bgGlowId})`} />
      
      {/* Stone Runic Ring */}
      <circle cx="50" cy="50" r="40" fill="#1c1917" stroke={rColors.glowEnd} strokeWidth="3" />
      <circle cx="50" cy="50" r="35" stroke={rColors.accent} strokeWidth="1" strokeDasharray="3 4" opacity="0.6" />
      
      {/* Heavy Obsidian Plate Breastplate */}
      <g transform="translate(0, 3)">
        {/* Shoulder Pauldrons */}
        <path d="M 32 30 C 24 28, 20 36, 21 44 L 34 40 Z" fill={`url(#${metalId})`} stroke="#020617" strokeWidth="1.5" />
        <path d="M 68 30 C 76 28, 80 36, 79 44 L 66 40 Z" fill={`url(#${metalId})`} stroke="#020617" strokeWidth="1.5" />
        
        {/* Neck collar cutout */}
        <path d="M 38 24 C 42 29, 58 29, 62 24 L 68 34 L 66 54 C 66 66, 50 72, 50 72 C 50 72, 34 66, 34 54 L 32 34 Z" fill={`url(#${metalId})`} stroke="#020617" strokeWidth="2" />
        
        {/* Golden chest trim */}
        <path d="M 40 28 C 45 31, 55 31, 60 28" stroke="#eab308" strokeWidth="1.5" fill="none" opacity="0.8" />
        <path d="M 50 30 L 50 70" stroke="#020617" strokeWidth="1.5" />
        
        {/* Glowing Runic Glyphs in rarity color */}
        <g filter={`url(#rune-neon-${cleanId})`} stroke={rColors.accent} strokeWidth="1.5" strokeLinecap="round">
          <path d="M 40 38 H 45 M 38 46 L 43 49" />
          <path d="M 60 38 H 55 M 62 46 L 57 49" />
          <path d="M 48 58 L 50 61 L 52 58" strokeWidth="1" />
        </g>
        
        {/* Rivets */}
        <circle cx="34" cy="54" r="1" fill="#64748b" />
        <circle cx="66" cy="54" r="1" fill="#64748b" />
        <circle cx="48" cy="70" r="1" fill="#64748b" />
        <circle cx="52" cy="70" r="1" fill="#64748b" />
      </g>
    </svg>
  );
}

// ==========================================
// 11. WEAPON / SWORD ICON (Damascus blade runesword with ruby crossguard)
// ==========================================
export function WeaponIcon({ className = '', size = 'md', rarity }: RpgIconProps) {
  const sClass = sizeClassMap[size];
  const rColors = getRarityColors(rarity);
  const id = React.useId();
  const cleanId = id.replace(/:/g, '');
  const bgGlowId = `wep-bg-glow-${cleanId}`;
  const bladeId = `steel-blade-${cleanId}`;
  const hiltId = `gold-hilt-${cleanId}`;

  return (
    <svg 
      className={`${sClass} ${className} transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer`} 
      style={{
        filter: `drop-shadow(0 0 8px ${rColors.shadow})`
      }}
      viewBox="6 6 88 88" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id={bgGlowId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={rColors.glowStart} stopOpacity="0.45" />
          <stop offset="100%" stopColor={rColors.glowEnd} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={bladeId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f1f5f9" />
          <stop offset="50%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
        <linearGradient id={hiltId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#78350f" />
        </linearGradient>
      </defs>
      
      {/* Background magical glow */}
      <circle cx="50" cy="50" r="48" fill={`url(#${bgGlowId})`} />
      
      {/* Dark Stone Runic Backdrop */}
      <circle cx="50" cy="50" r="40" fill="#18181b" stroke="#44403c" strokeWidth="3" />
      <circle cx="50" cy="50" r="35" stroke={rColors.accent} strokeWidth="1" strokeDasharray="3 5" opacity="0.6" />
      
      {/* Sword Angled Down-Left to Top-Right */}
      <g transform="rotate(-45 50 50) translate(0, -2)">
        <path d="M 47 12 L 53 12 L 53 66 L 47 66 Z" fill="#000" opacity="0.3" filter="blur(1px)" />
        <path d="M 47 14 L 53 14 L 52 66 L 48 66 Z" fill={`url(#${bladeId})`} stroke="#1e293b" strokeWidth="1" />
        <path d="M 47 14 L 50 6 L 53 14 Z" fill="#fff" stroke="#1e293b" strokeWidth="1" />
        <line x1="50" y1="12" x2="50" y2="66" stroke="#475569" strokeWidth="1" />
        
        {/* Glowing Runes in rarity color */}
        <path d="M 50 18 L 50 58" stroke={rColors.accent} strokeWidth="1.2" strokeDasharray="3 5" opacity="0.9" />
        
        {/* Detailed Golden Crossguard */}
        <path d="M 34 66 C 34 66, 44 65, 50 68 C 56 65, 66 66, 66 66 L 62 70 L 38 70 Z" fill={`url(#${hiltId})`} stroke="#78350f" strokeWidth="1" />
        
        {/* Glowing Ruby Gem in rarity color */}
        <circle cx="50" cy="68" r="3" fill={rColors.accent} stroke={rColors.glowEnd} strokeWidth="0.8" />
        <circle cx="49.5" cy="67" r="0.8" fill="#fff" />
        
        {/* Grip */}
        <rect x="46.5" y="70" width="7" height="15" rx="1" fill="#451a03" stroke="#1c1917" strokeWidth="1" />
        <line x1="47" y1="73" x2="53" y2="73" stroke={rColors.accent} strokeWidth="0.8" />
        <line x1="47" y1="77" x2="53" y2="77" stroke={rColors.accent} strokeWidth="0.8" />
        <line x1="47" y1="81" x2="53" y2="81" stroke={rColors.accent} strokeWidth="0.8" />
        
        {/* Pommel */}
        <path d="M 46 85 C 46 85, 48 89, 50 89 C 52 89, 54 85, 54 85 Z" fill={`url(#${hiltId})`} stroke="#78350f" strokeWidth="1" />
        <circle cx="50" cy="85" r="2.5" fill={`url(#${hiltId})`} stroke="#78350f" strokeWidth="0.8" />
      </g>
      
      {/* Magical Sparks */}
      <circle cx="34" cy="22" r="1" fill="#fff" />
      <circle cx="68" cy="24" r="1.5" fill={rColors.accent} />
      <circle cx="20" cy="46" r="1.2" fill={rColors.accent} />
      <circle cx="82" cy="48" r="1" fill="#fff" />
    </svg>
  );
}

// ==========================================
// 12. SHIELD / BOUCLIER ICON (Celtic design shield with glowing core)
// ==========================================
export function ShieldIcon({ className = '', size = 'md', rarity }: RpgIconProps) {
  const sClass = sizeClassMap[size];
  const rColors = getRarityColors(rarity);
  const id = React.useId();
  const cleanId = id.replace(/:/g, '');
  const bgGlowId = `sh-bg-glow-${cleanId}`;
  const goldId = `shield-gold-${cleanId}`;
  const silverId = `shield-silver-${cleanId}`;

  return (
    <svg 
      className={`${sClass} ${className} transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer`} 
      style={{
        filter: `drop-shadow(0 0 8px ${rColors.shadow})`
      }}
      viewBox="6 6 88 88" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id={bgGlowId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={rColors.glowStart} stopOpacity="0.45" />
          <stop offset="100%" stopColor={rColors.glowEnd} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={goldId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#78350f" />
        </linearGradient>
        <linearGradient id={silverId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f1f5f9" />
          <stop offset="60%" stopColor="#64748b" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
        <filter id={`core-glow-${cleanId}`}>
          <feGaussianBlur stdDeviation="1" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {/* Dynamic backing glow */}
      <circle cx="50" cy="50" r="48" fill={`url(#${bgGlowId})`} />
      
      {/* Stone Backdrop */}
      <circle cx="50" cy="50" r="40" fill="#1c1917" stroke="#44403c" strokeWidth="3" />
      
      {/* Ornate Shield Aegis */}
      <g transform="translate(0, 1)">
        {/* Outer Silver Rim Frame */}
        <path d="M 32 26 C 44 22, 56 22, 68 26 L 66 52 C 66 65, 50 76, 50 76 C 50 76, 34 65, 34 52 Z" fill={`url(#${silverId})`} stroke="#0f172a" strokeWidth="2" />
        
        {/* Inner Gold Shield plate */}
        <path d="M 36 30 C 45 27, 55 27, 64 30 L 62 50 C 62 61, 50 69, 50 69 C 50 69, 38 61, 38 50 Z" fill={`url(#${goldId})`} stroke="#78350f" strokeWidth="1.2" opacity="0.9" />
        
        {/* Celtic knot lines */}
        <path d="M 40 38 Q 50 33 60 38 L 58 48 Q 50 43 42 48 Z" fill="none" stroke="#78350f" strokeWidth="1" opacity="0.6" />
        
        {/* Center Glowing Runic Power Core in rarity color */}
        <g filter={`url(#core-glow-${cleanId})`}>
          <circle cx="50" cy="46" r="10" fill="#0f172a" stroke={rColors.accent} strokeWidth="1.5" />
          <circle cx="50" cy="46" r="6" fill={rColors.glowStart} />
          <path d="M 50 41 L 50 51 M 45 46 L 55 46" stroke="#fff" strokeWidth="1" />
          <circle cx="50" cy="46" r="2.2" fill="#fff" />
        </g>
      </g>
    </svg>
  );
}

// ==========================================
// 13. RING / ANNEAU ICON (Amethyst Celtic ring with galaxy gemstone)
// ==========================================
export function RingIcon({ className = '', size = 'md', rarity }: RpgIconProps) {
  const sClass = sizeClassMap[size];
  const rColors = getRarityColors(rarity);
  const id = React.useId();
  const cleanId = id.replace(/:/g, '');
  const bgGlowId = `ring-bg-glow-${cleanId}`;
  const gemId = `gem-nebula-${cleanId}`;
  const goldId = `ring-gold-grad-${cleanId}`;

  return (
    <svg 
      className={`${sClass} ${className} transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer`} 
      style={{
        filter: `drop-shadow(0 0 8px ${rColors.shadow})`
      }}
      viewBox="6 6 88 88" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id={bgGlowId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={rColors.glowStart} stopOpacity="0.45" />
          <stop offset="100%" stopColor={rColors.glowEnd} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={gemId} cx="50%" cy="36" r="50%">
          <stop offset="0%" stopColor="#fdf4ff" />
          <stop offset="35%" stopColor={rColors.accent} />
          <stop offset="70%" stopColor={rColors.glowStart} />
          <stop offset="100%" stopColor={rColors.glowEnd} />
        </radialGradient>
        <linearGradient id={goldId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fffbeb" />
          <stop offset="40%" stopColor="#fbbf24" />
          <stop offset="70%" stopColor="#b45309" />
          <stop offset="100%" stopColor="#78350f" />
        </linearGradient>
      </defs>
      
      {/* Background Glow */}
      <circle cx="50" cy="50" r="48" fill={`url(#${bgGlowId})`} />
      
      {/* Dark Stone Medallion Ring */}
      <circle cx="50" cy="50" r="40" fill="#18181b" stroke="#3f3f46" strokeWidth="3" />
      <circle cx="50" cy="50" r="35" stroke={rColors.accent} strokeWidth="0.8" strokeDasharray="4 4" opacity="0.6" />
      
      {/* Golden Celtic Ring */}
      <g transform="translate(0, 2)">
        {/* Heavy Gold Band */}
        <ellipse cx="50" cy="56" rx="20" ry="16" stroke={`url(#${goldId})`} strokeWidth="5" fill="none" />
        <ellipse cx="50" cy="56" rx="20" ry="16" stroke="#fff" strokeWidth="0.8" fill="none" opacity="0.3" />
        
        {/* Celtic knot engravements */}
        <path d="M 33 54 C 36 50, 44 48, 50 52 C 56 48, 64 50, 67 54" stroke="#78350f" strokeWidth="1.2" fill="none" opacity="0.7" />
        
        {/* Crown Socket */}
        <path d="M 41 42 L 59 42 L 55 48 L 45 48 Z" fill="#78350f" stroke={`url(#${goldId})`} strokeWidth="1" />
        
        {/* Cosmic Gemstone with Rarity Color */}
        <ellipse cx="50" cy="36" rx="10.5" ry="9" fill={`url(#${gemId})`} stroke="#fdf4ff" strokeWidth="1.2" />
        
        {/* Mini spiral galaxy */}
        <path d="M 47 38 C 48 35, 52 35, 53 36 C 53 37, 50 38, 49 37 Q 47 36, 48 34" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" opacity="0.95" />
        <circle cx="53" cy="33" r="0.8" fill="#fff" />
        <circle cx="45" cy="35" r="0.6" fill="#fdf4ff" />
        <circle cx="48" cy="39" r="0.6" fill="#fff" />
      </g>
    </svg>
  );
}

// ==========================================
// 14. BOOTS / BOTTES ICON (Winged explorer leather boots with silver armor plating)
// ==========================================
export function BootsIcon({ className = '', size = 'md', rarity }: RpgIconProps) {
  const sClass = sizeClassMap[size];
  const rColors = getRarityColors(rarity);
  const id = React.useId();
  const cleanId = id.replace(/:/g, '');
  const bgGlowId = `boot-bg-glow-${cleanId}`;
  const leatherId = `leather-boot-${cleanId}`;
  const silverId = `silver-armor-${cleanId}`;

  return (
    <svg 
      className={`${sClass} ${className} transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer`} 
      style={{
        filter: `drop-shadow(0 0 8px ${rColors.shadow})`
      }}
      viewBox="6 6 88 88" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id={bgGlowId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={rColors.glowStart} stopOpacity="0.45" />
          <stop offset="100%" stopColor={rColors.glowEnd} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={leatherId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#92400e" />
          <stop offset="100%" stopColor="#451a03" />
        </linearGradient>
        <linearGradient id={silverId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f1f5f9" />
          <stop offset="100%" stopColor="#64748b" />
        </linearGradient>
      </defs>
      
      {/* Speed backing glow */}
      <circle cx="50" cy="50" r="48" fill={`url(#${bgGlowId})`} />
      
      {/* Stone Medallion Circle */}
      <circle cx="50" cy="50" r="40" fill="#1e293b" stroke="#334155" strokeWidth="3" />
      <circle cx="50" cy="50" r="35" stroke={rColors.accent} strokeWidth="1" strokeDasharray="3 4" opacity="0.6" />
      
      {/* Winged explorer boot */}
      <g transform="translate(-2, 1)">
        {/* Left Boot */}
        <g opacity="0.6" transform="translate(-5, 4) scale(0.9)">
          <path d="M 44 32 L 58 35 L 54 62 L 46 62 Z" fill="#451a03" />
          <path d="M 46 62 L 64 62 C 68 62, 68 68, 64 68 L 38 68 Z" fill="#451a03" />
        </g>
        
        {/* Right Boot */}
        <path d="M 46 32 L 62 36 L 58 64 L 46 64 Z" fill={`url(#${leatherId})`} stroke="#1c1917" strokeWidth="1.8" />
        <path d="M 46 64 L 68 64 C 74 64, 74 72, 68 72 L 40 72 C 38 72, 40 64, 46 64 Z" fill={`url(#${leatherId})`} stroke="#1c1917" strokeWidth="1.8" />
        
        {/* Laces */}
        <line x1="53" y1="42" x2="59" y2="44" stroke={rColors.accent} strokeWidth="1.5" />
        <line x1="51" y1="50" x2="57" y2="52" stroke={rColors.accent} strokeWidth="1.5" />
        <line x1="49" y1="58" x2="55" y2="60" stroke={rColors.accent} strokeWidth="1.5" />
        
        {/* Silver Armor shin plate */}
        <path d="M 47 34 L 56 36 L 53 52 L 47 50 Z" fill={`url(#${silverId})`} stroke="#1e293b" strokeWidth="1" />
        {/* Silver toe plate */}
        <path d="M 62 64 L 68 64 C 74 64, 74 72, 68 72 Z" fill={`url(#${silverId})`} stroke="#1e293b" strokeWidth="1" />
        
        {/* Heavy Sole */}
        <path d="M 40 72 L 68 72" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
        
        {/* Wings of Speed */}
        <g transform="translate(30, 36)" filter="drop-shadow(0px 2px 3px rgba(0,0,0,0.5))">
          <path d="M 12 18 C 6 12, -4 16, -10 14 C -6 22, 6 24, 14 21 Z" fill="#fff" stroke={rColors.accent} strokeWidth="1" />
          <path d="M 12 12 C 4 6, -8 10, -14 7 C -8 18, 4 20, 14 17 Z" fill="#fff" stroke={rColors.accent} strokeWidth="1" />
          <path d="M 12 6 C 2 0, -12 2, -18 -2 C -10 12, 2 14, 14 11 Z" fill="#fffbeb" stroke={rColors.accent} strokeWidth="1.2" />
        </g>
      </g>
    </svg>
  );
}

// ==========================================
// 15. DYNAMIC ROUTING COMPONENT
// ==========================================
interface DynamicIconProps {
  iconType: string;
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  rarity?: ItemRarity;
}

export function RpgIcon({ iconType, className = '', size = 'md', rarity }: DynamicIconProps) {
  const normalized = iconType.toLowerCase().trim();

  // Core statistics currencies
  if (normalized === 'gold' || normalized === 'coin' || normalized === '🪙') {
    return <GoldIcon className={className} size={size} />;
  }
  if (normalized === 'xp' || normalized === 'experience' || normalized === '⭐' || normalized === 'star') {
    return <XpIcon className={className} size={size} />;
  }
  if (normalized === 'hp' || normalized === 'vitality' || normalized === 'health' || normalized === 'heart' || normalized === '❤️' || normalized === 'vitalité') {
    return <HpIcon className={className} size={size} />;
  }
  if (normalized === 'attributes' || normalized === 'grimoire' || normalized === 'book' || normalized === '🔮' || normalized === '📖') {
    return <AttributesIcon className={className} size={size} />;
  }
  if (normalized === 'mensurations' || normalized === 'poids' || normalized === 'taille' || normalized === '⚖️' || normalized === 'metrics') {
    return <MensurationsIcon className={className} size={size} />;
  }
  if (normalized === 'evolution' || normalized === 'lotus' || normalized === '🏆' || normalized === 'trophy' || normalized === 'évolution') {
    return <EvolutionIcon className={className} size={size} />;
  }

  // Attributes
  if (normalized === 'strength' || normalized === 'force' || normalized === '🏋️‍♂️' || normalized === 'dumbbell' || normalized === 'for') {
    return <StrengthIcon className={className} size={size} />;
  }
  if (normalized === 'wisdom' || normalized === 'sagesse' || normalized === '🧠' || normalized === 'sag') {
    return <WisdomIcon className={className} size={size} />;
  }
  if (normalized === 'serenity' || normalized === 'sérénité' || normalized === '🧘' || normalized === 'sér') {
    return <SerenityIcon className={className} size={size} />;
  }
  if (normalized === 'magic' || normalized === 'magie' || normalized === '⚡' || normalized === 'mag') {
    return <MagicIcon className={className} size={size} />;
  }

  // Equipment slots
  if (normalized === 'head' || normalized === 'tête' || normalized === '🧢' || normalized === 'helmet') {
    return <HeadIcon className={className} size={size} rarity={rarity} />;
  }
  if (normalized === 'armor' || normalized === 'armure' || normalized === '👕' || normalized === 'breastplate') {
    return <ArmorIcon className={className} size={size} rarity={rarity} />;
  }
  if (normalized === 'weapon' || normalized === 'arme' || normalized === '🗡️' || normalized === 'sword' || normalized === '⚔️' || normalized === '🔱') {
    return <WeaponIcon className={className} size={size} rarity={rarity} />;
  }
  if (normalized === 'shield' || normalized === 'bouclier' || normalized === '🛡️') {
    return <ShieldIcon className={className} size={size} rarity={rarity} />;
  }
  if (normalized === 'ring' || normalized === 'anneau' || normalized === '💍') {
    return <RingIcon className={className} size={size} rarity={rarity} />;
  }
  if (normalized === 'boots' || normalized === 'bottes' || normalized === '🥾' || normalized === 'shoes') {
    return <BootsIcon className={className} size={size} rarity={rarity} />;
  }

  // Fallback to text emojis if not found
  return (
    <span className={`inline-flex items-center justify-center text-lg ${className}`}>
      {iconType}
    </span>
  );
}
