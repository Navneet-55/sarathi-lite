import React from 'react';

/**
 * Clean Document Key-Value Ledger
 * Elegant hairline dividers and official typography without nested boxy borders.
 */
export default function DataTable({ title, rows, badge, subtitle }) {
  return (
    <div className="bg-slate-50/70 dark:bg-slate-900 rounded-xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-750 space-y-3">
      {title && (
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200/80 dark:border-slate-800">
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-[#0f2a4a] dark:text-blue-300 tracking-wide uppercase">
              {title}
            </h4>
            {subtitle && (
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>
            )}
          </div>
          {badge && (
            <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold px-2.5 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-800 uppercase tracking-wider">
              {badge}
            </span>
          )}
        </div>
      )}

      <div className="divide-y divide-slate-200/70 dark:divide-slate-800">
        {rows.map(([label, value], idx) => (
          <div
            key={idx}
            className="py-2.5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4 text-xs sm:text-sm"
          >
            <span className="text-slate-500 dark:text-slate-400 font-medium sm:w-1/3 shrink-0">
              {label}
            </span>
            <span className="text-slate-900 dark:text-slate-100 font-semibold sm:w-2/3 break-words text-left sm:text-right">
              {value !== undefined && value !== null && value !== '' ? (
                value
              ) : (
                <span className="text-slate-400 italic font-normal">Not Provided</span>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
