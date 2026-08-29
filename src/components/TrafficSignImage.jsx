import React from 'react';

/**
 * Official Indian Roads Congress (IRC:67) Vector Road Sign Graphics
 * High-definition vector graphics for Driver Training & LL Examination
 */
export default function TrafficSignImage({ signId, size = 96 }) {
  const dimension = size;
  const numId = Number(signId);

  switch (numId) {
    case 1:
      // Red Octagonal STOP Sign (IRC:67 Mandatory)
      return (
        <svg width={dimension} height={dimension} viewBox="0 0 120 120" className="drop-shadow-xs shrink-0" aria-label="STOP Sign">
          <polygon points="35,10 85,10 110,35 110,85 85,110 35,110 10,85 10,35" fill="#dc2626" stroke="#ffffff" strokeWidth="4" />
          <polygon points="37,13 83,13 107,37 107,83 83,107 37,107 13,83 13,37" fill="#dc2626" />
          <text x="60" y="70" fill="#ffffff" fontSize="26" fontFamily="Arial, sans-serif" fontWeight="900" textAnchor="middle" letterSpacing="1">
            STOP
          </text>
        </svg>
      );

    case 2:
      // Speed Limit 50 Sign (IRC:67 Mandatory)
      return (
        <svg width={dimension} height={dimension} viewBox="0 0 120 120" className="drop-shadow-xs shrink-0" aria-label="Speed Limit 50">
          <circle cx="60" cy="60" r="54" fill="#ffffff" stroke="#dc2626" strokeWidth="12" />
          <text x="60" y="73" fill="#0f172a" fontSize="38" fontFamily="Arial, sans-serif" fontWeight="900" textAnchor="middle">
            50
          </text>
        </svg>
      );

    case 3:
      // Pedestrian Crossing Ahead (IRC:67 Cautionary)
      return (
        <svg width={dimension} height={dimension} viewBox="0 0 120 120" className="drop-shadow-xs shrink-0" aria-label="Pedestrian Crossing Ahead">
          <polygon points="60,10 112,100 8,100" fill="#ffffff" stroke="#dc2626" strokeWidth="10" strokeLinejoin="round" />
          <circle cx="60" cy="42" r="5" fill="#0f172a" />
          <path d="M58,48 L56,66 L50,82 M58,54 L68,64 M58,52 L64,68 L70,82" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <line x1="42" y1="86" x2="78" y2="86" stroke="#0f172a" strokeWidth="2.5" />
          <line x1="46" y1="90" x2="74" y2="90" stroke="#0f172a" strokeWidth="2.5" />
        </svg>
      );

    case 4:
      // Compulsory Ahead Only (IRC:67 Mandatory)
      return (
        <svg width={dimension} height={dimension} viewBox="0 0 120 120" className="drop-shadow-xs shrink-0" aria-label="Compulsory Ahead Only">
          <circle cx="60" cy="60" r="54" fill="#1d4ed8" stroke="#ffffff" strokeWidth="3" />
          <path d="M60,24 L78,48 L66,48 L66,92 L54,92 L54,48 L42,48 Z" fill="#ffffff" />
        </svg>
      );

    case 5:
      // Silence Zone / Horn Prohibited (IRC:67 Mandatory)
      return (
        <svg width={dimension} height={dimension} viewBox="0 0 120 120" className="drop-shadow-xs shrink-0" aria-label="Horn Prohibited">
          <circle cx="60" cy="60" r="54" fill="#ffffff" stroke="#dc2626" strokeWidth="10" />
          <path d="M40,54 L52,54 L70,42 L70,78 L52,66 L40,66 Z" fill="#0f172a" />
          <path d="M38,54 C34,54 30,57 30,60 C30,63 34,66 38,66 Z" fill="#0f172a" />
          <line x1="22" y1="22" x2="98" y2="98" stroke="#dc2626" strokeWidth="9" strokeLinecap="round" />
        </svg>
      );

    case 6:
      // Give Way (IRC:67 Mandatory Inverted Triangle)
      return (
        <svg width={dimension} height={dimension} viewBox="0 0 120 120" className="drop-shadow-xs shrink-0" aria-label="Give Way Sign">
          <polygon points="60,110 8,20 112,20" fill="#ffffff" stroke="#dc2626" strokeWidth="10" strokeLinejoin="round" />
          <text x="60" y="55" fill="#dc2626" fontSize="13" fontFamily="Arial, sans-serif" fontWeight="900" textAnchor="middle">
            GIVE WAY
          </text>
        </svg>
      );

    case 7:
      // U-Turn Prohibited (IRC:67 Mandatory)
      return (
        <svg width={dimension} height={dimension} viewBox="0 0 120 120" className="drop-shadow-xs shrink-0" aria-label="U-Turn Prohibited">
          <circle cx="60" cy="60" r="54" fill="#ffffff" stroke="#dc2626" strokeWidth="10" />
          <path d="M68,80 L68,52 C68,40 50,40 50,52 L50,68" stroke="#0f172a" strokeWidth="7" fill="none" strokeLinecap="round" />
          <polygon points="44,66 50,78 56,66" fill="#0f172a" />
          <line x1="22" y1="22" x2="98" y2="98" stroke="#dc2626" strokeWidth="9" strokeLinecap="round" />
        </svg>
      );

    case 8:
      // Speed Breaker Ahead (IRC:67 Cautionary)
      return (
        <svg width={dimension} height={dimension} viewBox="0 0 120 120" className="drop-shadow-xs shrink-0" aria-label="Speed Breaker Ahead">
          <polygon points="60,10 112,100 8,100" fill="#ffffff" stroke="#dc2626" strokeWidth="10" strokeLinejoin="round" />
          <path d="M32,78 Q46,55 60,78 Q74,55 88,78" fill="none" stroke="#0f172a" strokeWidth="5" strokeLinecap="round" />
        </svg>
      );

    case 9:
      // No Entry (IRC:67 Mandatory)
      return (
        <svg width={dimension} height={dimension} viewBox="0 0 120 120" className="drop-shadow-xs shrink-0" aria-label="No Entry Sign">
          <circle cx="60" cy="60" r="54" fill="#dc2626" stroke="#ffffff" strokeWidth="2" />
          <rect x="22" y="49" width="76" height="22" rx="3" fill="#ffffff" />
        </svg>
      );

    case 10:
      // Overtaking Prohibited (IRC:67 Mandatory)
      return (
        <svg width={dimension} height={dimension} viewBox="0 0 120 120" className="drop-shadow-xs shrink-0" aria-label="Overtaking Prohibited">
          <circle cx="60" cy="60" r="54" fill="#ffffff" stroke="#dc2626" strokeWidth="10" />
          {/* Black Car Left */}
          <rect x="32" y="52" width="22" height="18" rx="4" fill="#0f172a" />
          <circle cx="37" cy="71" r="3" fill="#0f172a" />
          <circle cx="49" cy="71" r="3" fill="#0f172a" />
          {/* Red Car Right */}
          <rect x="66" y="52" width="22" height="18" rx="4" fill="#dc2626" />
          <circle cx="71" cy="71" r="3" fill="#dc2626" />
          <circle cx="83" cy="71" r="3" fill="#dc2626" />
          <line x1="22" y1="22" x2="98" y2="98" stroke="#dc2626" strokeWidth="9" strokeLinecap="round" />
        </svg>
      );

    case 11:
      // School Zone Ahead (IRC:67 Cautionary)
      return (
        <svg width={dimension} height={dimension} viewBox="0 0 120 120" className="drop-shadow-xs shrink-0" aria-label="School Zone Ahead">
          <polygon points="60,10 112,100 8,100" fill="#ffffff" stroke="#dc2626" strokeWidth="10" strokeLinejoin="round" />
          <circle cx="50" cy="46" r="4" fill="#0f172a" />
          <circle cx="70" cy="54" r="3.5" fill="#0f172a" />
          <path d="M48,52 L44,76 M52,52 L56,76 M50,58 L62,58" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
          <path d="M68,60 L65,80 M72,60 L75,80" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 12:
      // Compulsory Cycle Track (IRC:67 Mandatory)
      return (
        <svg width={dimension} height={dimension} viewBox="0 0 120 120" className="drop-shadow-xs shrink-0" aria-label="Compulsory Cycle Track">
          <circle cx="60" cy="60" r="54" fill="#1d4ed8" stroke="#ffffff" strokeWidth="3" />
          {/* Bicycle Wheels */}
          <circle cx="42" cy="68" r="12" fill="none" stroke="#ffffff" strokeWidth="3" />
          <circle cx="78" cy="68" r="12" fill="none" stroke="#ffffff" strokeWidth="3" />
          {/* Frame */}
          <path d="M42,68 L56,54 L72,54 M56,54 L60,68 L78,68 M60,68 L50,44 L44,44 M72,54 L78,68" stroke="#ffffff" strokeWidth="3" fill="none" strokeLinecap="round" />
        </svg>
      );

    case 13:
      // Compulsory Turn Left Ahead (IRC:67 Mandatory)
      return (
        <svg width={dimension} height={dimension} viewBox="0 0 120 120" className="drop-shadow-xs shrink-0" aria-label="Compulsory Turn Left">
          <circle cx="60" cy="60" r="54" fill="#1d4ed8" stroke="#ffffff" strokeWidth="3" />
          <path d="M66,88 L66,54 L48,54 L48,64 L30,48 L48,32 L48,42 L78,42 L78,88 Z" fill="#ffffff" />
        </svg>
      );

    case 14:
      // Compulsory Turn Right Ahead (IRC:67 Mandatory)
      return (
        <svg width={dimension} height={dimension} viewBox="0 0 120 120" className="drop-shadow-xs shrink-0" aria-label="Compulsory Turn Right">
          <circle cx="60" cy="60" r="54" fill="#1d4ed8" stroke="#ffffff" strokeWidth="3" />
          <path d="M54,88 L54,54 L72,54 L72,64 L90,48 L72,32 L72,42 L42,42 L42,88 Z" fill="#ffffff" />
        </svg>
      );

    case 15:
      // Roundabout Ahead (IRC:67 Cautionary)
      return (
        <svg width={dimension} height={dimension} viewBox="0 0 120 120" className="drop-shadow-xs shrink-0" aria-label="Roundabout Ahead">
          <polygon points="60,10 112,100 8,100" fill="#ffffff" stroke="#dc2626" strokeWidth="10" strokeLinejoin="round" />
          {/* 3 Circular Rotating Arrows */}
          <path d="M60,42 C68,42 74,48 74,56 L70,54 L78,64 L82,50 L78,52 C78,42 68,36 58,38 Z" fill="#0f172a" />
          <path d="M72,66 C68,74 58,76 50,72 L52,68 L40,70 L48,80 L48,76 C60,80 72,76 76,64 Z" fill="#0f172a" />
          <path d="M48,54 C50,46 56,42 60,42" stroke="#0f172a" strokeWidth="3" fill="none" strokeLinecap="round" />
        </svg>
      );

    case 16:
      // Narrow Bridge Ahead (IRC:67 Cautionary)
      return (
        <svg width={dimension} height={dimension} viewBox="0 0 120 120" className="drop-shadow-xs shrink-0" aria-label="Narrow Bridge Ahead">
          <polygon points="60,10 112,100 8,100" fill="#ffffff" stroke="#dc2626" strokeWidth="10" strokeLinejoin="round" />
          {/* Bridge Bottleneck */}
          <path d="M40,90 L40,68 L50,60 L50,44 M80,90 L80,68 L70,60 L70,44" stroke="#0f172a" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 17:
      // Right Hairpin Bend (IRC:67 Cautionary)
      return (
        <svg width={dimension} height={dimension} viewBox="0 0 120 120" className="drop-shadow-xs shrink-0" aria-label="Right Hairpin Bend">
          <polygon points="60,10 112,100 8,100" fill="#ffffff" stroke="#dc2626" strokeWidth="10" strokeLinejoin="round" />
          <path d="M46,88 L46,58 C46,44 74,44 74,58 L74,72" stroke="#0f172a" strokeWidth="7" fill="none" strokeLinecap="round" />
          <polygon points="68,70 74,84 80,70" fill="#0f172a" />
        </svg>
      );

    case 18:
      // Unguarded Railway Crossing Ahead (IRC:67 Cautionary)
      return (
        <svg width={dimension} height={dimension} viewBox="0 0 120 120" className="drop-shadow-xs shrink-0" aria-label="Unguarded Railway Crossing">
          <polygon points="60,10 112,100 8,100" fill="#ffffff" stroke="#dc2626" strokeWidth="10" strokeLinejoin="round" />
          {/* Train Engine Silhouette */}
          <rect x="42" y="52" width="36" height="26" rx="2" fill="#0f172a" />
          <rect x="46" y="44" width="8" height="8" fill="#0f172a" />
          <circle cx="50" cy="82" r="5" fill="#0f172a" />
          <circle cx="70" cy="82" r="5" fill="#0f172a" />
          <line x1="36" y1="88" x2="84" y2="88" stroke="#0f172a" strokeWidth="3" />
        </svg>
      );

    case 19:
      // First Aid Post (IRC:67 Informatory)
      return (
        <svg width={dimension} height={dimension} viewBox="0 0 120 120" className="drop-shadow-xs shrink-0" aria-label="First Aid Facility">
          <rect x="12" y="12" width="96" height="96" rx="6" fill="#1d4ed8" />
          <rect x="24" y="24" width="72" height="72" rx="4" fill="#ffffff" />
          <rect x="52" y="36" width="16" height="48" fill="#dc2626" />
          <rect x="36" y="52" width="48" height="16" fill="#dc2626" />
        </svg>
      );

    case 20:
      // Hospital Nearby (IRC:67 Informatory)
      return (
        <svg width={dimension} height={dimension} viewBox="0 0 120 120" className="drop-shadow-xs shrink-0" aria-label="Hospital Facility">
          <rect x="12" y="12" width="96" height="96" rx="6" fill="#1d4ed8" />
          <rect x="24" y="24" width="72" height="72" rx="4" fill="#ffffff" />
          <text x="60" y="74" fill="#1d4ed8" fontSize="48" fontFamily="Arial, sans-serif" fontWeight="900" textAnchor="middle">
            H
          </text>
        </svg>
      );

    default:
      return (
        <svg width={dimension} height={dimension} viewBox="0 0 120 120" className="drop-shadow-xs shrink-0" aria-label="Regulatory Traffic Sign">
          <circle cx="60" cy="60" r="54" fill="#ffffff" stroke="#dc2626" strokeWidth="10" />
          <text x="60" y="68" fill="#0f172a" fontSize="24" fontFamily="Arial, sans-serif" fontWeight="bold" textAnchor="middle">
            RTO
          </text>
        </svg>
      );
  }
}
