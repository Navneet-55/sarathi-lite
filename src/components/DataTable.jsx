import React from 'react';

/**
 * 2-Column Key-Value Structured Data Table
 * Provides clear public-service data presentation without decorative graphics
 */
export default function DataTable({ title, rows, badge }) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-xs">
      {title && (
        <div className="bg-slate-50 border-b border-slate-200 px-4 py-2.5 flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#0f2a4a] uppercase tracking-wider">{title}</h3>
          {badge && (
            <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded font-medium">
              {badge}
            </span>
          )}
        </div>
      )}
      <table className="w-full text-left text-xs sm:text-sm border-collapse">
        <thead>
          <tr className="bg-slate-100/60 text-slate-600 border-b border-slate-200 font-semibold">
            <th className="py-2.5 px-4 w-1/3 border-r border-slate-200">Field Name</th>
            <th className="py-2.5 px-4 w-2/3">Parsed / Verified Value</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {rows.map(([label, value], idx) => (
            <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'}>
              <td className="py-2.5 px-4 font-medium text-slate-600 border-r border-slate-200 align-top">
                {label}
              </td>
              <td className="py-2.5 px-4 text-slate-900 font-medium align-top">
                {value || <span className="text-slate-400 italic">Not available</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
