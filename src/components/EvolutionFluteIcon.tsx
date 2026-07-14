import React from 'react';

interface EvolutionFluteIconProps {
  tier: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function EvolutionFluteIcon({ tier, className = '', size = 'md' }: EvolutionFluteIconProps) {
  // Determine dimensions based on size presets
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-36 h-36',
  }[size];

  // Common SVG styling and filters
  const filterId = `glow-filter-t${tier}`;
  const gradId1 = `grad-bg-t${tier}`;
  const gradId2 = `grad-flute-t${tier}`;

  // TIER 1: Flûtiste débutant (Rustic Wooden Flute)
  if (tier === 1) {
    return (
      <svg
        className={`${sizeClasses} ${className}`}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id={gradId1} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2c1e15" />
            <stop offset="100%" stopColor="#0c0c0e" />
          </radialGradient>
          <linearGradient id={gradId2} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#66462c" />
            <stop offset="50%" stopColor="#8c6239" />
            <stop offset="100%" stopColor="#b38259" />
          </linearGradient>
          <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Frame with stone texture style */}
        <circle cx="100" cy="100" r="90" fill={`url(#${gradId1})`} stroke="#3a2e25" strokeWidth="3" />
        
        {/* Runic Circle */}
        <circle cx="100" cy="100" r="76" stroke="#5c4331" strokeWidth="1.5" strokeDasharray="6 8" opacity="0.6" />
        <circle cx="100" cy="100" r="70" stroke="#5c4331" strokeWidth="1" opacity="0.3" />
        
        {/* Runes / Carvings on circle */}
        <path d="M 100 15 L 100 22 M 100 178 L 100 185 M 15 100 L 22 100 M 178 100 L 185 100" stroke="#8c6239" strokeWidth="2" opacity="0.5" />
        <path d="M 45 45 L 51 51 M 155 155 L 149 149 M 155 45 L 149 51 M 45 155 L 51 149" stroke="#8c6239" strokeWidth="2" opacity="0.5" />

        {/* Rustic Wooden Flute */}
        <g filter={`url(#${filterId})`}>
          {/* Main body shadow / glow */}
          <rect x="30" y="94" width="140" height="12" rx="3" transform="rotate(-45 100 100)" fill="#1c0f08" opacity="0.4" />
          
          {/* Main body */}
          <rect x="35" y="93" width="130" height="14" rx="4" transform="rotate(-45 100 100)" fill={`url(#${gradId2})`} stroke="#4d301b" strokeWidth="1.5" />
          
          {/* Mouthpiece */}
          <path d="M 40 148 L 47 155" stroke="#4d301b" strokeWidth="3" strokeLinecap="round" />
          <path d="M 52 136 C 54 138, 56 136, 58 134" stroke="#26140a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          
          {/* End rim */}
          <rect x="156" y="91" width="5" height="18" rx="1" transform="rotate(-45 100 100)" fill="#4d301b" />
          
          {/* Finger Holes */}
          <circle cx="85" cy="115" r="3" fill="#26140a" />
          <circle cx="100" cy="100" r="3" fill="#26140a" />
          <circle cx="115" cy="85" r="3" fill="#26140a" />
          <circle cx="130" cy="70" r="3" fill="#26140a" />
          <circle cx="145" cy="55" r="2.5" fill="#26140a" />
        </g>
        
        {/* Subtle wood lines/texture on the background */}
        <path d="M 80 50 C 90 40, 110 40, 120 50" stroke="#5c4331" strokeWidth="1" opacity="0.15" fill="none" />
        <path d="M 60 140 C 80 160, 120 160, 140 140" stroke="#5c4331" strokeWidth="1" opacity="0.15" fill="none" />
      </svg>
    );
  }

  // TIER 2: Apprenti Flûte (Silver Flute with Emerald Gems & Leaves)
  if (tier === 2) {
    return (
      <svg
        className={`${sizeClasses} ${className}`}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id={gradId1} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0b241b" />
            <stop offset="70%" stopColor="#040f0b" />
            <stop offset="100%" stopColor="#020504" />
          </radialGradient>
          <linearGradient id={gradId2} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#94a3b8" />
            <stop offset="30%" stopColor="#cbd5e1" />
            <stop offset="50%" stopColor="#f1f5f9" />
            <stop offset="70%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
          <radialGradient id="gem-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0" />
          </radialGradient>
          <filter id={filterId} x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Celtic Ring Background */}
        <circle cx="100" cy="100" r="90" fill={`url(#${gradId1})`} stroke="#10b981" strokeWidth="2.5" strokeOpacity="0.4" />
        
        {/* Emerald Leaves background pattern */}
        <path d="M 100 18 C 110 35, 90 50, 100 65 C 110 50, 90 35, 100 18 Z" fill="#047857" fillOpacity="0.25" stroke="#10b981" strokeWidth="0.8" strokeOpacity="0.4" />
        <path d="M 100 182 C 110 165, 90 150, 100 135 C 110 150, 90 165, 100 182 Z" fill="#047857" fillOpacity="0.25" stroke="#10b981" strokeWidth="0.8" strokeOpacity="0.4" />
        <path d="M 18 100 C 35 110, 50 90, 65 100 C 50 110, 35 90, 18 100 Z" fill="#047857" fillOpacity="0.25" stroke="#10b981" strokeWidth="0.8" strokeOpacity="0.4" />
        <path d="M 182 100 C 165 110, 150 90, 135 100 C 150 110, 165 90, 182 100 Z" fill="#047857" fillOpacity="0.25" stroke="#10b981" strokeWidth="0.8" strokeOpacity="0.4" />

        <circle cx="100" cy="100" r="74" stroke="#059669" strokeWidth="1" strokeOpacity="0.3" />
        <circle cx="100" cy="100" r="70" stroke="#10b981" strokeWidth="1" strokeDasharray="3 4" strokeOpacity="0.4" />

        {/* Floating Green Notes */}
        <g filter={`url(#${filterId})`} opacity="0.8">
          {/* Note 1 (top-left) */}
          <path d="M 50 60 L 50 48 L 65 44 L 65 54 M 50 50 L 65 46" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <ellipse cx="46" cy="60" rx="4" ry="3" fill="#34d399" transform="rotate(-15 46 60)" />
          <ellipse cx="61" cy="54" rx="4" ry="3" fill="#34d399" transform="rotate(-15 61 54)" />
          
          {/* Note 2 (bottom-right) */}
          <path d="M 148 145 L 148 133" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" />
          <ellipse cx="144" cy="145" rx="4" ry="3" fill="#34d399" transform="rotate(-15 144 145)" />
          <path d="M 148 133 C 152 133, 156 136, 157 140" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </g>

        {/* Silver Flute with Gems */}
        <g filter={`url(#${filterId})`}>
          {/* Silver Body shadow */}
          <rect x="30" y="94" width="140" height="12" rx="3" transform="rotate(-45 100 100)" fill="#022c1d" opacity="0.3" />
          
          {/* Silver Body */}
          <rect x="35" y="93" width="130" height="14" rx="3" transform="rotate(-45 100 100)" fill={`url(#${gradId2})`} stroke="#475569" strokeWidth="1" />
          
          {/* Gold fittings (elegant bands) */}
          <rect x="55" y="92" width="4" height="16" transform="rotate(-45 100 100)" fill="#fbbf24" stroke="#d97706" strokeWidth="0.5" />
          <rect x="141" y="92" width="4" height="16" transform="rotate(-45 100 100)" fill="#fbbf24" stroke="#d97706" strokeWidth="0.5" />

          {/* Lip plate (Mouthpiece) */}
          <ellipse cx="55" cy="145" rx="6" ry="3" transform="rotate(-45 55 145)" fill="#e2e8f0" stroke="#64748b" strokeWidth="1" />
          <circle cx="55" cy="145" r="1.5" fill="#1e293b" />

          {/* End cap */}
          <rect x="156" y="91" width="5" height="18" rx="1.5" transform="rotate(-45 100 100)" fill="#64748b" />
          
          {/* Embedded emerald gemstones (glowing buttons) */}
          <g>
            {/* Gem 1 */}
            <circle cx="85" cy="115" r="4.5" fill="#10b981" stroke="#a7f3d0" strokeWidth="1" />
            <circle cx="83.5" cy="113.5" r="1" fill="#fff" />
            
            {/* Gem 2 */}
            <circle cx="100" cy="100" r="4.5" fill="#10b981" stroke="#a7f3d0" strokeWidth="1" />
            <circle cx="98.5" cy="98.5" r="1" fill="#fff" />
            
            {/* Gem 3 */}
            <circle cx="115" cy="85" r="4.5" fill="#10b981" stroke="#a7f3d0" strokeWidth="1" />
            <circle cx="113.5" cy="83.5" r="1" fill="#fff" />
            
            {/* Gem 4 */}
            <circle cx="130" cy="70" r="4.5" fill="#10b981" stroke="#a7f3d0" strokeWidth="1" />
            <circle cx="128.5" cy="68.5" r="1" fill="#fff" />
          </g>
        </g>
      </svg>
    );
  }

  // TIER 3: Pipoteur confirmé (Dark Wood Master Flute with Luminous Neon Waves)
  if (tier === 3) {
    return (
      <svg
        className={`${sizeClasses} ${className}`}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id={gradId1} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#081829" />
            <stop offset="70%" stopColor="#030a12" />
            <stop offset="100%" stopColor="#010408" />
          </radialGradient>
          <linearGradient id={gradId2} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1e1b4b" />
            <stop offset="40%" stopColor="#312e81" />
            <stop offset="70%" stopColor="#1e1b4b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <filter id={filterId} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Circular Shield Disc */}
        <circle cx="100" cy="100" r="90" fill={`url(#${gradId1})`} stroke="#3b82f6" strokeWidth="2.5" strokeOpacity="0.4" />
        <circle cx="100" cy="100" r="82" stroke="#1d4ed8" strokeWidth="1" strokeOpacity="0.2" />

        {/* Concentric neon-etched rings */}
        <circle cx="100" cy="100" r="74" stroke="#06b6d4" strokeWidth="1" strokeDasharray="15 8" strokeOpacity="0.3" />
        <circle cx="100" cy="100" r="68" stroke="#3b82f6" strokeWidth="0.8" strokeOpacity="0.2" />

        {/* Glowing Energy Waves wrapping around */}
        <g filter={`url(#${filterId})`}>
          <path d="M 30 150 C 70 140, 90 90, 130 90 C 160 90, 180 130, 170 160" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6" />
          <path d="M 35 40 C 50 60, 90 60, 120 110 C 140 140, 170 150, 180 120" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />
          <path d="M 60 30 C 80 50, 110 50, 130 30" stroke="#00f2ff" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.4" />
        </g>

        {/* Dark Obsidian/Magic Wood Flute */}
        <g filter={`url(#${filterId})`}>
          {/* Main Body Shadow */}
          <rect x="30" y="94" width="140" height="12" rx="3" transform="rotate(-45 100 100)" fill="#000" opacity="0.5" />
          
          {/* Main Body */}
          <rect x="35" y="93" width="130" height="14" rx="3" transform="rotate(-45 100 100)" fill={`url(#${gradId2})`} stroke="#1e293b" strokeWidth="1.5" />
          
          {/* Cyan Runes glowing on the flute body */}
          <g transform="rotate(-45 100 100)">
            <path d="M 50 100 L 55 100 M 70 100 L 75 100 M 115 100 L 120 100 M 140 100 L 145 100" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
          </g>

          {/* Mouthpiece cap */}
          <path d="M 40 148 L 47 155" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
          
          {/* Neon Sound holes / Nodes */}
          <g>
            <circle cx="85" cy="115" r="3.5" fill="#00f2ff" stroke="#ffffff" strokeWidth="0.8" />
            <circle cx="85" cy="115" r="7" stroke="#00f2ff" strokeWidth="0.5" strokeOpacity="0.4" />
            
            <circle cx="100" cy="100" r="3.5" fill="#00f2ff" stroke="#ffffff" strokeWidth="0.8" />
            <circle cx="100" cy="100" r="7" stroke="#00f2ff" strokeWidth="0.5" strokeOpacity="0.4" />
            
            <circle cx="115" cy="85" r="3.5" fill="#00f2ff" stroke="#ffffff" strokeWidth="0.8" />
            <circle cx="115" cy="85" r="7" stroke="#00f2ff" strokeWidth="0.5" strokeOpacity="0.4" />
            
            <circle cx="130" cy="70" r="3.5" fill="#00f2ff" stroke="#ffffff" strokeWidth="0.8" />
            <circle cx="130" cy="70" r="7" stroke="#00f2ff" strokeWidth="0.5" strokeOpacity="0.4" />
          </g>
        </g>
      </svg>
    );
  }

  // TIER 4: La flûte est la voie (Glowing Crystalline Jade & Sacred Geometry Gold Rings)
  if (tier === 4) {
    return (
      <svg
        className={`${sizeClasses} ${className}`}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id={gradId1} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#022416" />
            <stop offset="60%" stopColor="#01140c" />
            <stop offset="100%" stopColor="#000704" />
          </radialGradient>
          <linearGradient id={gradId2} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="30%" stopColor="#34d399" />
            <stop offset="50%" stopColor="#a7f3d0" />
            <stop offset="70%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
          <radialGradient id="gold-shimmer" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#b45309" stopOpacity="0" />
          </radialGradient>
          <filter id={filterId} x="-35%" y="-35%" width="170%" height="170%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Jade Frame Base */}
        <circle cx="100" cy="100" r="90" fill={`url(#${gradId1})`} stroke="#fbbf24" strokeWidth="2" strokeOpacity="0.5" />
        
        {/* Sacred Geometry: Concentric Golden Rings interlocking */}
        <circle cx="100" cy="100" r="78" stroke="#fbbf24" strokeWidth="1" strokeOpacity="0.25" />
        <circle cx="100" cy="100" r="66" stroke="#f59e0b" strokeWidth="0.8" strokeOpacity="0.2" />
        <circle cx="100" cy="100" r="54" stroke="#d97706" strokeWidth="0.8" strokeOpacity="0.15" />
        
        {/* Star Polygon Overlay (Sacred Geometry) */}
        <path d="M 100 22 L 155 133 L 45 133 Z" stroke="#fbbf24" strokeWidth="0.6" strokeOpacity="0.15" />
        <path d="M 100 178 L 155 67 L 45 67 Z" stroke="#fbbf24" strokeWidth="0.6" strokeOpacity="0.15" />
        <circle cx="100" cy="100" r="30" stroke="#fef08a" strokeWidth="0.5" strokeOpacity="0.2" />

        {/* Golden Shimmer Light Flare */}
        <circle cx="100" cy="100" r="70" fill="url(#gold-shimmer)" opacity="0.45" />

        {/* Crystalline Jade Flute */}
        <g filter={`url(#${filterId})`}>
          {/* Main Body Shadow with deep emerald green */}
          <rect x="30" y="94" width="140" height="12" rx="3" transform="rotate(-45 100 100)" fill="#022c1d" opacity="0.6" />
          
          {/* Main Body (Translucent Jade) */}
          <rect x="35" y="93" width="130" height="14" rx="4" transform="rotate(-45 100 100)" fill={`url(#${gradId2})`} stroke="#10b981" strokeWidth="1.5" />
          
          {/* Detailed Golden Engraved Filigree Bands */}
          <g transform="rotate(-45 100 100)">
            {/* Elegant Golden Details */}
            <rect x="52" y="91.5" width="8" height="17" rx="1" fill="#fbbf24" stroke="#f59e0b" strokeWidth="0.5" />
            <rect x="75" y="91.5" width="3" height="17" fill="#fbbf24" />
            <rect x="122" y="91.5" width="3" height="17" fill="#fbbf24" />
            <rect x="140" y="91.5" width="8" height="17" rx="1" fill="#fbbf24" stroke="#f59e0b" strokeWidth="0.5" />
          </g>

          {/* Golden Mouthpiece Tip */}
          <circle cx="48" cy="152" r="3" fill="#fbbf24" stroke="#d97706" strokeWidth="0.5" />
          
          {/* Luminous holes emitting divine light */}
          <g>
            <circle cx="85" cy="115" r="3" fill="#fef08a" stroke="#fbbf24" strokeWidth="1" />
            <circle cx="85" cy="115" r="6" stroke="#fef08a" strokeWidth="0.5" strokeOpacity="0.5" />
            
            <circle cx="100" cy="100" r="3" fill="#fef08a" stroke="#fbbf24" strokeWidth="1" />
            <circle cx="100" cy="100" r="6" stroke="#fef08a" strokeWidth="0.5" strokeOpacity="0.5" />
            
            <circle cx="115" cy="85" r="3" fill="#fef08a" stroke="#fbbf24" strokeWidth="1" />
            <circle cx="115" cy="85" r="6" stroke="#fef08a" strokeWidth="0.5" strokeOpacity="0.5" />
            
            <circle cx="130" cy="70" r="3" fill="#fef08a" stroke="#fbbf24" strokeWidth="1" />
            <circle cx="130" cy="70" r="6" stroke="#fef08a" strokeWidth="0.5" strokeOpacity="0.5" />
          </g>
        </g>
      </svg>
    );
  }

  // TIER 5: Flûteur transcendental (Cosmic Nebula Flute in Spiral Galaxy Portal)
  if (tier === 5) {
    return (
      <svg
        className={`${sizeClasses} ${className}`}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id={gradId1} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1e0b36" />
            <stop offset="50%" stopColor="#0c031a" />
            <stop offset="100%" stopColor="#020005" />
          </radialGradient>
          <linearGradient id={gradId2} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4c1d95" />
            <stop offset="30%" stopColor="#8b5cf6" />
            <stop offset="50%" stopColor="#ddd6fe" />
            <stop offset="70%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#5b21b6" />
          </linearGradient>
          <radialGradient id="galaxy-swirl" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.6" />
            <stop offset="40%" stopColor="#ec4899" stopOpacity="0.3" />
            <stop offset="85%" stopColor="#3b82f6" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
          <filter id={filterId} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Space background with cosmic stars */}
        <circle cx="100" cy="100" r="90" fill={`url(#${gradId1})`} stroke="#8b5cf6" strokeWidth="2.5" strokeOpacity="0.4" />

        {/* Twinkling stars in background */}
        <g opacity="0.7">
          <circle cx="50" cy="50" r="1" fill="#fff" />
          <circle cx="150" cy="45" r="1.5" fill="#fff" />
          <circle cx="140" cy="150" r="1" fill="#fff" />
          <circle cx="65" cy="140" r="1.2" fill="#fff" />
          <circle cx="100" cy="35" r="1" fill="#fff" />
          <circle cx="35" cy="110" r="1.5" fill="#fff" />
        </g>

        {/* Spiral Galaxy Swirl */}
        <circle cx="100" cy="100" r="85" fill="url(#galaxy-swirl)" />
        
        {/* Spiral Arms representation */}
        <g filter={`url(#${filterId})`}>
          <path d="M 100 100 C 130 90, 160 120, 150 150 C 140 170, 110 160, 95 145" stroke="#ec4899" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.4" />
          <path d="M 100 100 C 70 110, 40 80, 50 50 C 60 30, 90 40, 105 55" stroke="#8b5cf6" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.4" />
          <path d="M 100 100 C 120 70, 150 50, 120 30" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.3" />
        </g>

        {/* Cosmic Nebula Flute */}
        <g filter={`url(#${filterId})`}>
          {/* Galaxy Shadow */}
          <rect x="30" y="94" width="140" height="12" rx="3" transform="rotate(-45 100 100)" fill="#120024" opacity="0.6" />
          
          {/* Cosmic Body */}
          <rect x="35" y="93" width="130" height="14" rx="3.5" transform="rotate(-45 100 100)" fill={`url(#${gradId2})`} stroke="#c084fc" strokeWidth="1" />
          
          {/* Small star dots inside flute body to give galaxy look */}
          <g transform="rotate(-45 100 100)">
            <circle cx="60" cy="100" r="0.8" fill="#fff" />
            <circle cx="75" cy="98" r="1.2" fill="#fff" />
            <circle cx="95" cy="102" r="0.7" fill="#fff" />
            <circle cx="110" cy="100" r="1" fill="#fff" opacity="0.8" />
            <circle cx="125" cy="97" r="0.8" fill="#fff" />
            <circle cx="135" cy="101" r="1.5" fill="#fff" />
          </g>

          {/* Stardust glow around mouthpiece */}
          <circle cx="48" cy="152" r="5" fill="#ec4899" opacity="0.3" />
          
          {/* Star flare on mouthpiece tip */}
          <path d="M 48 147 L 48 157 M 43 152 L 53 152" stroke="#fff" strokeWidth="1.2" />

          {/* Nebula sound holes (highly glowing purple spheres) */}
          <g>
            <circle cx="85" cy="115" r="4" fill="#f43f5e" stroke="#fff" strokeWidth="1" />
            <circle cx="85" cy="115" r="8" stroke="#f43f5e" strokeWidth="0.5" strokeOpacity="0.6" />
            
            <circle cx="100" cy="100" r="4" fill="#a855f7" stroke="#fff" strokeWidth="1" />
            <circle cx="100" cy="100" r="8" stroke="#a855f7" strokeWidth="0.5" strokeOpacity="0.6" />
            
            <circle cx="115" cy="85" r="4" fill="#3b82f6" stroke="#fff" strokeWidth="1" />
            <circle cx="115" cy="85" r="8" stroke="#3b82f6" strokeWidth="0.5" strokeOpacity="0.6" />
            
            <circle cx="130" cy="70" r="4" fill="#3b82f6" stroke="#fff" strokeWidth="1" />
            <circle cx="130" cy="70" r="8" stroke="#3b82f6" strokeWidth="0.5" strokeOpacity="0.6" />
          </g>
        </g>
      </svg>
    );
  }

  // TIER 6: Dieu Flûtant céleste (Golden Flute in front of Astronomical Astrolabe)
  if (tier === 6) {
    return (
      <svg
        className={`${sizeClasses} ${className}`}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id={gradId1} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3b2300" />
            <stop offset="60%" stopColor="#140b00" />
            <stop offset="100%" stopColor="#050300" />
          </radialGradient>
          <linearGradient id={gradId2} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d97706" />
            <stop offset="25%" stopColor="#f59e0b" />
            <stop offset="50%" stopColor="#fef08a" />
            <stop offset="75%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>
          <radialGradient id="sun-flare" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.7" />
            <stop offset="35%" stopColor="#f59e0b" stopOpacity="0.3" />
            <stop offset="70%" stopColor="#b45309" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </radialGradient>
          <filter id={filterId} x="-45%" y="-45%" width="190%" height="190%">
            <feGaussianBlur stdDeviation="9" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Space Celestial Frame */}
        <circle cx="100" cy="100" r="90" fill={`url(#${gradId1})`} stroke="#fbbf24" strokeWidth="3" />

        {/* Brilliant Solar Flare behind everything */}
        <circle cx="100" cy="100" r="85" fill="url(#sun-flare)" />

        {/* Astronomical Astrolabe Gear / Dial Design */}
        <g stroke="#fbbf24" strokeOpacity="0.4" strokeWidth="0.8">
          <circle cx="100" cy="100" r="80" />
          <circle cx="100" cy="100" r="72" strokeWidth="1.5" />
          <circle cx="100" cy="100" r="64" />
          <circle cx="100" cy="100" r="40" strokeWidth="0.5" strokeDasharray="3 3" />
          
          {/* Dial axis lines */}
          <line x1="100" y1="10" x2="100" y2="190" strokeOpacity="0.3" />
          <line x1="10" y1="100" x2="190" y2="100" strokeOpacity="0.3" />
          <line x1="36.4" y1="36.4" x2="163.6" y2="163.6" strokeOpacity="0.2" />
          <line x1="163.6" y1="36.4" x2="36.4" y2="163.6" strokeOpacity="0.2" />
          
          {/* Astrolabe degree ticks */}
          <circle cx="100" cy="100" r="76" strokeDasharray="1 5" strokeWidth="2" strokeOpacity="0.5" />
          
          {/* Inner solar rays */}
          <path d="M 100 80 L 100 65 M 100 120 L 100 135 M 80 100 L 65 100 M 120 100 L 135 100" strokeWidth="1.5" />
          <path d="M 85.8 85.8 L 75.2 75.2 M 114.2 114.2 L 124.8 124.8 M 114.2 85.8 L 124.8 75.2 M 85.8 114.2 L 75.2 124.8" strokeWidth="1.5" />
        </g>

        {/* Golden Divine Flute */}
        <g filter={`url(#${filterId})`}>
          {/* Celestial shadow */}
          <rect x="30" y="94" width="140" height="12" rx="3" transform="rotate(-45 100 100)" fill="#451a03" opacity="0.7" />
          
          {/* Majestic Golden Flute Body */}
          <rect x="35" y="93" width="130" height="14" rx="4" transform="rotate(-45 100 100)" fill={`url(#${gradId2})`} stroke="#fbbf24" strokeWidth="2" />
          
          {/* Magnificent Carvings / Relief Lines */}
          <g transform="rotate(-45 100 100)">
            {/* Crowned details */}
            <path d="M 38 93.5 L 45 93.5 L 45 106.5 L 38 106.5 Z" fill="#d97706" />
            {/* Spiraling golden ribbons */}
            <path d="M 55 93 L 65 107 M 75 93 L 85 107 M 115 93 L 125 107 M 135 93 L 145 107" stroke="#b45309" strokeWidth="1.5" opacity="0.6" />
            {/* Imperial crest band */}
            <rect x="97" y="91.5" width="6" height="17" fill="#fbbf24" stroke="#d97706" strokeWidth="0.5" />
          </g>

          {/* Golden Crown Tip Mouthpiece */}
          <path d="M 45 145 L 38 152 L 43 157 L 50 150 Z" fill="#fbbf24" stroke="#b45309" strokeWidth="1" />
          
          {/* Intense shining solar center behind mouthpiece */}
          <circle cx="48" cy="152" r="8" fill="#fff" opacity="0.4" filter="blur(2px)" />

          {/* Divine glowing diamond holes */}
          <g>
            <circle cx="85" cy="115" r="4.5" fill="#fff" stroke="#fef08a" strokeWidth="1" />
            <circle cx="85" cy="115" r="9" stroke="#fff" strokeWidth="0.5" strokeOpacity="0.7" />
            
            <circle cx="100" cy="100" r="4.5" fill="#fff" stroke="#fef08a" strokeWidth="1" />
            <circle cx="100" cy="100" r="9" stroke="#fff" strokeWidth="0.5" strokeOpacity="0.7" />
            
            <circle cx="115" cy="85" r="4.5" fill="#fff" stroke="#fef08a" strokeWidth="1" />
            <circle cx="115" cy="85" r="9" stroke="#fff" strokeWidth="0.5" strokeOpacity="0.7" />
            
            <circle cx="130" cy="70" r="4.5" fill="#fff" stroke="#fef08a" strokeWidth="1" />
            <circle cx="130" cy="70" r="9" stroke="#fff" strokeWidth="0.5" strokeOpacity="0.7" />
          </g>
        </g>
      </svg>
    );
  }

  return null;
}
