import React from 'react';

/**
 * 2-Column Key-Value Structured Data Table
 * Strict public-service tabular presentation with Dark Mode support
 */
export default function DataTable({ title, rows, badge, subtitle }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden shadow-xs">
      {title && (
        <div className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 px-4 py-3 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-[#0f2a4a] dark:text-blue-300 uppercase tracking-wider">
              {title}
            </h3>
            {subtitle && (
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>
            )}
          </div>
          {badge && (
            <span className="text-[11px] bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 px-2.5 py-0.5 rounded font-bold uppercase tracking-wider">
              {badge}
            </span>
          )}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm border-collapse">
          <thead>
            <tr className="bg-slate-100/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 font-bold text-[11px] uppercase tracking-wider">
              <th className="py-2.5 px-4 w-1/3 sm:w-2/5 border-r border-slate-200 dark:border-slate-700">Field Name</th>
              <th className="py-2.5 px-4 w-2/3 sm:w-3/5">Parsed / Verified Record Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {rows.map(([label, value], idx) => (
              <tr
                key={idx}
                className={idx % 2 === 0 ? 'bg-white dark:bg-slate-800' : 'bg-slate-50/50 dark:bg-slate-800/60 hover:bg-slate-100/50 dark:hover:bg-slate-750 transition-colors'}
              >
                <td className="py-2.5 px-4 font-semibold text-slate-700 dark:text-slate-300 border-r border-slate-200 dark:border-slate-700 align-top text-xs sm:text-sm">
                  {label}
                </td>
                <td className="py-2.5 px-4 text-slate-900 dark:text-slate-100 font-medium align-top text-xs sm:text-sm break-words">
                  {value !== undefined && value !== null && value !== '' ? (
                    value
                  ) : (
                    <span className="text-slate-400 italic font-normal">Not Provided</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
