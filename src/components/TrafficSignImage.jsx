import React from 'react';

/**
 * High-Fidelity SVG Traffic Sign Graphics (IRC:67 Standards)
 * Provides crisp visual reference for each Learner's License test question.
 */
export default function TrafficSignImage({ signId }) {
  switch (Number(signId)) {
    case 1:
      // Red Octagonal STOP Sign
      return (
        <svg width="120" height="120" viewBox="0 0 120 120" className="drop-shadow-xs" aria-label="STOP Sign">
          <polygon points="35,10 85,10 110,35 110,85 85,110 35,110 10,85 10,35" fill="#dc2626" stroke="#ffffff" strokeWidth="4" />
          <polygon points="37,13 83,13 107,37 107,83 83,107 37,107 13,83 13,37" fill="#dc2626" />
          <text x="60" y="70" fill="#ffffff" fontSize="26" fontFamily="Arial, sans-serif" fontWeight="900" textAnchor="middle" letterSpacing="1">
            STOP
          </text>
        </svg>
      );

    case 2:
      // Speed Limit 50 Sign
      return (
        <svg width="120" height="120" viewBox="0 0 120 120" className="drop-shadow-xs" aria-label="Speed Limit 50">
          <circle cx="60" cy="60" r="54" fill="#ffffff" stroke="#dc2626" strokeWidth="12" />
          <text x="60" y="73" fill="#0f172a" fontSize="38" fontFamily="Arial, sans-serif" fontWeight="900" textAnchor="middle">
            50
          </text>
        </svg>
      );

    case 3:
      // Pedestrian Crossing Sign
      return (
        <svg width="120" height="120" viewBox="0 0 120 120" className="drop-shadow-xs" aria-label="Pedestrian Crossing Ahead">
          <polygon points="60,10 112,100 8,100" fill="#ffffff" stroke="#dc2626" strokeWidth="10" strokeLinejoin="round" />
          {/* Walking Figure */}
          <circle cx="60" cy="42" r="5" fill="#0f172a" />
          <path d="M58,48 L56,66 L50,82 M58,54 L68,64 M58,52 L64,68 L70,82" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          {/* Zebra Lines */}
          <line x1="42" y1="86" x2="78" y2="86" stroke="#0f172a" strokeWidth="2.5" />
          <line x1="46" y1="90" x2="74" y2="90" stroke="#0f172a" strokeWidth="2.5" />
        </svg>
      );

    case 4:
      // Compulsory Ahead Only (Blue Circle with White Arrow)
      return (
        <svg width="120" height="120" viewBox="0 0 120 120" className="drop-shadow-xs" aria-label="Compulsory Ahead Only">
          <circle cx="60" cy="60" r="54" fill="#1d4ed8" stroke="#ffffff" strokeWidth="3" />
          {/* White Straight Arrow */}
          <path d="M60,25 L76,48 L65,48 L65,92 L55,92 L55,48 L44,48 Z" fill="#ffffff" />
        </svg>
      );

    case 5:
      // Silence Zone / Horn Prohibited
      return (
        <svg width="120" height="120" viewBox="0 0 120 120" className="drop-shadow-xs" aria-label="Horn Prohibited">
          <circle cx="60" cy="60" r="54" fill="#ffffff" stroke="#dc2626" strokeWidth="10" />
          {/* Horn Body */}
          <path d="M40,54 L52,54 L70,42 L70,78 L52,66 L40,66 Z" fill="#0f172a" />
          <path d="M38,54 C34,54 30,57 30,60 C30,63 34,66 38,66 Z" fill="#0f172a" />
          {/* Red Diagonal Slash */}
          <line x1="22" y1="22" x2="98" y2="98" stroke="#dc2626" strokeWidth="9" strokeLinecap="round" />
        </svg>
      );

    case 6:
      // Give Way (Inverted Triangle)
      return (
        <svg width="120" height="120" viewBox="0 0 120 120" className="drop-shadow-xs" aria-label="Give Way Sign">
          <polygon points="60,110 8,20 112,20" fill="#ffffff" stroke="#dc2626" strokeWidth="10" strokeLinejoin="round" />
          <text x="60" y="55" fill="#dc2626" fontSize="14" fontFamily="Arial, sans-serif" fontWeight="bold" textAnchor="middle">
            GIVE WAY
          </text>
        </svg>
      );

    case 7:
      // U-Turn Prohibited
      return (
        <svg width="120" height="120" viewBox="0 0 120 120" className="drop-shadow-xs" aria-label="U-Turn Prohibited">
          <circle cx="60" cy="60" r="54" fill="#ffffff" stroke="#dc2626" strokeWidth="10" />
          {/* U-Turn Arrow */}
          <path d="M68,80 L68,52 C68,40 50,40 50,52 L50,68" stroke="#0f172a" strokeWidth="7" fill="none" strokeLinecap="round" />
          <polygon points="44,66 50,78 56,66" fill="#0f172a" />
          {/* Red Diagonal Slash */}
          <line x1="22" y1="22" x2="98" y2="98" stroke="#dc2626" strokeWidth="9" strokeLinecap="round" />
        </svg>
      );

    case 8:
      // Speed Breaker Ahead
      return (
        <svg width="120" height="120" viewBox="0 0 120 120" className="drop-shadow-xs" aria-label="Speed Breaker Ahead">
          <polygon points="60,10 112,100 8,100" fill="#ffffff" stroke="#dc2626" strokeWidth="10" strokeLinejoin="round" />
          {/* Road Hump */}
          <path d="M32,78 Q46,55 60,78 Q74,55 88,78" fill="none" stroke="#0f172a" strokeWidth="5" strokeLinecap="round" />
        </svg>
      );

    case 9:
      // No Entry
      return (
        <svg width="120" height="120" viewBox="0 0 120 120" className="drop-shadow-xs" aria-label="No Entry Sign">
          <circle cx="60" cy="60" r="54" fill="#dc2626" stroke="#ffffff" strokeWidth="2" />
          <rect x="22" y="49" width="76" height="22" rx="3" fill="#ffffff" />
        </svg>
      );

    case 11:
      // School Zone
      return (
        <svg width="120" height="120" viewBox="0 0 120 120" className="drop-shadow-xs" aria-label="School Zone Ahead">
          <polygon points="60,10 112,100 8,100" fill="#ffffff" stroke="#dc2626" strokeWidth="10" strokeLinejoin="round" />
          <circle cx="50" cy="46" r="4" fill="#0f172a" />
          <circle cx="70" cy="54" r="3.5" fill="#0f172a" />
          <path d="M48,52 L44,76 M52,52 L56,76 M50,58 L62,58" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
          <path d="M68,60 L65,80 M72,60 L75,80" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    default:
      // Generic Mandatory / Cautionary Default Sign
      return (
        <svg width="120" height="120" viewBox="0 0 120 120" className="drop-shadow-xs" aria-label="Regulatory Traffic Sign">
          <circle cx="60" cy="60" r="54" fill="#ffffff" stroke="#dc2626" strokeWidth="10" />
          <text x="60" y="68" fill="#0f172a" fontSize="24" fontFamily="Arial, sans-serif" fontWeight="bold" textAnchor="middle">
            RTO
          </text>
        </svg>
      );
  }
}
