import React from 'react';
import TrafficSignImage from './TrafficSignImage';

/**
 * Basic Traffic Rules & Road Safety Guidelines Handbook (MV Act & CMVR)
 * Required reading before taking the mandatory 5-question Learner's License test.
 */
export default function TrafficRulesGuide({ onStartTest }) {
  const rules = [
    {
      id: 'r1',
      title: '1. Mandatory Stop at Stop Line',
      desc: 'An octagonal red STOP sign commands a 100% complete halt at the white stop line. Check right, left, and right again before entering the intersection.',
      signId: 1,
      section: 'Section 119, MV Act',
    },
    {
      id: 'r2',
      title: '2. Speed Limit Restrictions',
      desc: 'Circular signs with red borders indicate the maximum legal speed limit under standard conditions (e.g. 50 km/h in urban corridors, 25 km/h in school zones).',
      signId: 2,
      section: 'Section 112, MV Act',
    },
    {
      id: 'r3',
      title: '3. Pedestrian Zebra Crossing Priority',
      desc: 'Drivers must slow down when approaching an upward-pointing triangular warning sign. Pedestrians on marked zebra crossings have absolute right of way.',
      signId: 3,
      section: 'Rule 11, Rules of the Road',
    },
    {
      id: 'r4',
      title: '4. Silence Zones / Honking Prohibition',
      desc: 'Honking is strictly forbidden within 100 meters of hospitals, educational institutions, and court premises (indicated by a crossed-out horn symbol).',
      signId: 5,
      section: 'Rule 21, CMVR',
    },
    {
      id: 'r5',
      title: '5. Priority & Give Way Rule',
      desc: 'An inverted triangle dictates GIVE WAY. Traffic entering a roundabout or major road must yield precedence to traffic already circulating on the carriageway.',
      signId: 6,
      section: 'IRC:67 Mandatory Series',
    },
    {
      id: 'r6',
      title: '6. Left Overtaking Prohibition',
      desc: 'Vehicles must always be overtaken on their right side. Overtaking on the left is permitted ONLY when the vehicle ahead is signaling and executing a right turn.',
      signId: 10,
      section: 'Rule 14, Rules of the Road',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-700 pb-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold text-[#0f2a4a] dark:text-blue-200">
            Road Safety Regulations & Traffic Rules Study Guide
          </h2>
          <span className="text-[11px] bg-blue-50 dark:bg-blue-950/60 text-blue-900 dark:text-blue-300 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-800 font-mono">
            Mandatory Study Material
          </span>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
          Review the essential Motor Vehicles Act rules and regulatory signs below before beginning your 5-question qualifying test.
        </p>
      </div>

      {/* Rules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rules.map((rule) => (
          <div
            key={rule.id}
            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 shadow-xs flex flex-col justify-between space-y-3"
          >
            <div className="flex items-start gap-3">
              <div className="shrink-0 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded p-1.5 flex items-center justify-center">
                <TrafficSignImage signId={rule.signId} />
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-xs sm:text-sm text-[#0f2a4a] dark:text-blue-300">
                    {rule.title}
                  </h3>
                </div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono block">
                  {rule.section}
                </span>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed pt-1">
                  {rule.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Important General Guidelines Card */}
      <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg p-4 text-xs text-slate-700 dark:text-slate-300 space-y-2">
        <h4 className="font-bold text-[#0f2a4a] dark:text-blue-300 uppercase tracking-wider text-[11px]">
          Essential Road Etiquette:
        </h4>
        <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400 leading-normal">
          <li><strong>Seatbelts & Helmets:</strong> Wearing BIS-certified helmets (two-wheelers) and seatbelts (four-wheelers) is mandatory for driver and pillion/passengers.</li>
          <li><strong>Mobile Phone Use:</strong> Holding or using mobile devices while operating a motor vehicle is strictly prohibited under Section 184(c).</li>
          <li><strong>Emergency Vehicles:</strong> Always yield immediate right-of-way by moving to the left when hearing an ambulance or fire tender siren.</li>
        </ul>
      </div>

      {/* Proceed to Test Action Button */}
      <div className="pt-2 text-center">
        <button
          type="button"
          onClick={onStartTest}
          className="w-full py-4 bg-blue-700 hover:bg-blue-800 active:bg-blue-900 text-white font-bold text-sm sm:text-base rounded-lg shadow-xs transition-colors flex items-center justify-center gap-2"
        >
          <span>I have read the rules • Start 5-Question Knowledge Test →</span>
        </button>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
          Passing criteria: Minimum 3 out of 5 correct answers required
        </p>
      </div>
    </div>
  );
}
