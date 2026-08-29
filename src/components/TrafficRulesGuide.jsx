import React, { useState } from 'react';
import TrafficSignImage from './TrafficSignImage';

/**
 * Driver Road Safety & Traffic Sign Training Academy
 * Comprehensive stacked driver training module covering every official road sign and statutory rule.
 */

const TRAINING_SIGNS = [
  // 1. Mandatory / Regulatory Signs
  {
    id: 1,
    signId: 1,
    name: 'STOP Sign',
    category: 'Mandatory',
    shape: 'Octagonal (Red with White Border)',
    action: 'Bring vehicle to a complete dead halt behind the white stop line before proceeding.',
    rule: 'Section 119 Motor Vehicles Act. You must yield right-of-way to all crossing traffic and pedestrians.',
    penalty: '₹1,000 to ₹5,000 for jumping a stop signal / reckless entry.',
    examTip: 'STOP is the ONLY octagonal sign on Indian roads. Even if no vehicles are visible, complete halt is mandatory.',
  },
  {
    id: 6,
    signId: 6,
    name: 'GIVE WAY Sign',
    category: 'Mandatory',
    shape: 'Inverted Triangle (Apex Pointing Down)',
    action: 'Slow down significantly and yield right-of-way to traffic on the main intersecting road.',
    rule: 'Section 119 MV Act & Rule 9 CMVR. Yield without necessarily stopping if the road is clear.',
    penalty: '₹1,000 for failure to give way.',
    examTip: 'GIVE WAY is the ONLY inverted triangular sign on Indian roads.',
  },
  {
    id: 9,
    signId: 9,
    name: 'NO ENTRY Sign',
    category: 'Mandatory',
    shape: 'Red Disc with Horizontal White Bar',
    action: 'Strictly prohibited from entering this street or carriageway in any vehicle.',
    rule: 'Section 115 MV Act. Enforces one-way flow or restricted security corridors.',
    penalty: '₹1,000 fine + possible vehicle impoundment for driving against traffic flow.',
    examTip: 'Driving past a No Entry sign is classified as dangerous driving under Section 184.',
  },
  {
    id: 2,
    signId: 2,
    name: 'Speed Limit (50 km/h)',
    category: 'Mandatory',
    shape: 'Circular with Red Outer Border',
    action: 'Vehicle speed must not exceed 50 kilometers per hour under any circumstance.',
    rule: 'Section 112 Motor Vehicles Act (Speed Regulations).',
    penalty: '₹1,000 to ₹2,000 (Light Motor Vehicles) / ₹4,000 (Commercial).',
    examTip: 'Speed limits shown in circular red borders are maximum legal limits, not recommended speeds.',
  },
  {
    id: 4,
    signId: 4,
    name: 'Compulsory Ahead Only',
    category: 'Mandatory',
    shape: 'Blue Disc with White Straight Arrow',
    action: 'You must continue straight forward; left and right turns are strictly barred.',
    rule: 'Directional mandate under CMVR Schedule 1.',
    penalty: '₹500 to ₹1,000 for unauthorized deviation.',
    examTip: 'Blue circular signs signify positive commands (what you MUST do).',
  },
  {
    id: 7,
    signId: 7,
    name: 'U-Turn Prohibited',
    category: 'Mandatory',
    shape: 'Circular with Red Slash over U-Turn',
    action: 'Do not make a 180-degree turn at this intersection or road median opening.',
    rule: 'Rule 12 Road Regulations. U-turns prohibited on busy corridors, bridges, and curves.',
    penalty: '₹1,000 for illegal median turnaround.',
    examTip: 'Look for designated U-turn underpasses or dedicated signal phases.',
  },
  {
    id: 5,
    signId: 5,
    name: 'Horn Prohibited (Silence Zone)',
    category: 'Mandatory',
    shape: 'Circular with Red Slash over Horn',
    action: 'Do not sound vehicle horn within 100 meters of hospitals, courts, or schools.',
    rule: 'Noise Pollution Rules & Section 194F MV Act.',
    penalty: '₹1,000 first offense, ₹2,000 subsequent offense.',
    examTip: 'Silence zones are active 24/7 around designated healthcare and judicial zones.',
  },
  {
    id: 10,
    signId: 10,
    name: 'Overtaking Prohibited',
    category: 'Mandatory',
    shape: 'Circular with Black & Red Vehicles with Slash',
    action: 'Do not overtake any moving vehicle until the restriction ends.',
    rule: 'Rule 14 CMVR. Erected on narrow roads, blind corners, bridges, and tunnels.',
    penalty: '₹1,000 to ₹5,000 for dangerous overtaking.',
    examTip: 'Always stay within your lane when overtaking prohibited sign is present.',
  },
  {
    id: 12,
    signId: 12,
    name: 'Compulsory Cycle Track',
    category: 'Mandatory',
    shape: 'Blue Disc with White Bicycle',
    action: 'Designated exclusively for non-motorized pedal cycles. Motor vehicles strictly prohibited.',
    rule: 'Dedicated non-motorized transport lane.',
    penalty: '₹1,000 for driving motorized vehicle in cycle lane.',
    examTip: 'Protects vulnerable road users on arterial city roads.',
  },
  {
    id: 13,
    signId: 13,
    name: 'Compulsory Turn Left Ahead',
    category: 'Mandatory',
    shape: 'Blue Disc with Left Arrow',
    action: 'Vehicle must execute a left turn immediately ahead. Straight and right paths closed.',
    rule: 'Positive command sign under IRC:67.',
    penalty: '₹1,000 for lane disobedience.',
    examTip: 'Indicate left indicator at least 30 meters prior to executing turn.',
  },

  // 2. Cautionary / Warning Signs
  {
    id: 3,
    signId: 3,
    name: 'Pedestrian Zebra Crossing Ahead',
    category: 'Cautionary',
    shape: 'Equilateral Triangle (Red Border, Apex Up)',
    action: 'Reduce speed immediately and stop before the crossing line to allow pedestrians to cross.',
    rule: 'Section 119 MV Act & Rule 11 Road Regulations. Pedestrians have absolute legal right of way on zebra crossings.',
    penalty: '₹1,000 fine and license endorsement for blocking pedestrian crossing.',
    examTip: 'Never overtake a vehicle that has slowed down or stopped at a zebra crossing.',
  },
  {
    id: 11,
    signId: 11,
    name: 'School Zone Ahead',
    category: 'Cautionary',
    shape: 'Equilateral Triangle (Red Border)',
    action: 'Reduce speed to 25 km/h or below. Watch out for children stepping onto the carriageway.',
    rule: 'Special speed limit near educational institutions.',
    penalty: '₹1,000 to ₹2,000 for overspeeding in school zones.',
    examTip: 'Exercise maximum vigilance during morning opening and afternoon closing hours.',
  },
  {
    id: 8,
    signId: 8,
    name: 'Speed Breaker / Hump Road Ahead',
    category: 'Cautionary',
    shape: 'Equilateral Triangle (Red Border)',
    action: 'Slow down smoothly to avoid vehicle underbody impact and passenger injury.',
    rule: 'Traffic calming measure before intersections and residential roads.',
    penalty: 'Risk of vehicle suspension damage and loss of vehicle control.',
    examTip: 'Brake before reaching the bump, release brake slightly while wheels roll over.',
  },
  {
    id: 16,
    signId: 16,
    name: 'Narrow Bridge Ahead',
    category: 'Cautionary',
    shape: 'Equilateral Triangle (Red Border)',
    action: 'Prepare for road width reduction. Check oncoming vehicles before entering bridge.',
    rule: 'Rule 15 CMVR. Vehicle already on bridge has right of way over approaching vehicles.',
    penalty: '₹1,000 for overtaking on narrow bridges.',
    examTip: 'Never overtake or stop on a narrow bridge.',
  },
  {
    id: 17,
    signId: 17,
    name: 'Right Hairpin Bend',
    category: 'Cautionary',
    shape: 'Equilateral Triangle (Red Border)',
    action: 'Gear down to lower gear (2nd/1st), slow down, and stay in left lane around blind corner.',
    rule: 'Mountain / Ghat road driving rules.',
    penalty: 'Severe hazard warning for hillside road safety.',
    examTip: 'Vehicles traveling uphill have right of way over vehicles descending downhill.',
  },
  {
    id: 15,
    signId: 15,
    name: 'Roundabout Ahead (Rotary)',
    category: 'Cautionary',
    shape: 'Equilateral Triangle (Red Border)',
    action: 'Yield to traffic already circulating inside the roundabout coming from your right side.',
    rule: 'Rule 17 Road Regulations. Clockwise circulatory movement.',
    penalty: '₹1,000 for failing to yield at rotary.',
    examTip: 'Always give way to vehicles on your right inside the roundabout.',
  },
  {
    id: 18,
    signId: 18,
    name: 'Unguarded Railway Level Crossing',
    category: 'Cautionary',
    shape: 'Equilateral Triangle (Red Border)',
    action: 'Stop vehicle, look both directions, listen for train whistle, and cross only when clear.',
    rule: 'Section 131 MV Act. Mandatory stop and look duty for all drivers.',
    penalty: 'Severe offense with license cancellation and criminal prosecution for reckless train track crossing.',
    examTip: 'Never stop or shift gears while wheels are on railway tracks.',
  },

  // 3. Informatory Signs
  {
    id: 19,
    signId: 19,
    name: 'First Aid Post',
    category: 'Informatory',
    shape: 'Blue Rectangle with Red Cross in White Box',
    action: 'Informs travelers of emergency medical first aid availability along highway.',
    rule: 'Highway amenity under IRC:67.',
    penalty: 'N/A (Informatory aid).',
    examTip: 'Essential stop for emergency road accidents.',
  },
  {
    id: 20,
    signId: 20,
    name: 'Hospital Facility',
    category: 'Informatory',
    shape: 'Blue Rectangle with Letter H',
    action: 'Indicates inpatient hospital facility. Driver must maintain silence and refrain from honking.',
    rule: 'Combines medical guidance with mandatory silence zone.',
    penalty: '₹1,000 for sounding horn near hospital.',
    examTip: 'Observe strict silence zone in vicinity of this sign.',
  },
];

const CORE_DRIVING_RULES = [
  {
    title: '1. Right-of-Way at Intersections (Uncontrolled Junctions)',
    content: 'When two vehicles approach an intersection simultaneously with no traffic lights or signs, the vehicle on the RIGHT always has the statutory right-of-way. You must give way to traffic approaching from your right.',
  },
  {
    title: '2. Correct Overtaking Protocol',
    content: 'Always overtake other vehicles from the RIGHT side. Overtaking from the left is strictly prohibited, except when the vehicle in front is clearly indicating and positioning to take a right turn, or on designated multi-lane highways with separate lane controls.',
  },
  {
    title: '3. Mandatory Right-of-Way for Emergency Vehicles',
    content: 'Under Section 194E of the Motor Vehicles Act, all motorists MUST immediately draw to the left and provide free unimpeded passage to ambulances, fire tenders, and police emergency response vehicles. Failure to do so carries a fine up to ₹10,000 and imprisonment up to 6 months.',
  },
  {
    title: '4. Mobile Phone & Distracted Driving Prohibition',
    content: 'Holding or using a mobile phone, texting, or using handheld devices while operating a motor vehicle is strictly banned under Section 184(c) MV Act. Fine: ₹1,500 to ₹5,000.',
  },
  {
    title: '5. Roundabout & Ghat Road Hill Climbing Priority',
    content: 'Inside roundabouts, vehicles already inside moving clockwise on your right have priority. On steep hill roads, vehicles traveling UPHILL have priority over downhill descending vehicles.',
  },
];

export default function TrafficRulesGuide({ onStartTest }) {
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'mandatory' | 'cautionary' | 'informatory' | 'rules'
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSignId, setExpandedSignId] = useState(null);

  const filteredSigns = TRAINING_SIGNS.filter((sign) => {
    const matchesCategory =
      activeTab === 'all' || sign.category.toLowerCase() === activeTab.toLowerCase();
    const matchesSearch =
      sign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sign.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sign.rule.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="border-b border-slate-200 dark:border-slate-700 pb-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold text-[#0f2a4a] dark:text-blue-200">
            Driver Road Safety & Traffic Sign Training Academy
          </h2>
          <span className="text-[11px] bg-blue-50 dark:bg-blue-950/60 text-blue-900 dark:text-blue-300 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-800 font-mono font-bold">
            IRC:67 & MV Act Curriculum
          </span>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
          Review all mandatory road signs, cautionary warnings, and statutory driving rules before attempting the qualifying 5-question test.
        </p>
      </div>

      {/* Interactive Category Tabs Stack */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-700 pb-3">
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-bold">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded transition-colors ${
                activeTab === 'all'
                  ? 'bg-[#0f2a4a] text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              All Signs ({TRAINING_SIGNS.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('mandatory')}
              className={`px-3 py-1.5 rounded transition-colors ${
                activeTab === 'mandatory'
                  ? 'bg-rose-700 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              Mandatory Signs (Prohibitions & Commands)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('cautionary')}
              className={`px-3 py-1.5 rounded transition-colors ${
                activeTab === 'cautionary'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              Cautionary Signs (Hazards)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('rules')}
              className={`px-3 py-1.5 rounded transition-colors ${
                activeTab === 'rules'
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              Statutory MV Act Rules
            </button>
          </div>

          {/* Quick Search */}
          <div className="w-full sm:w-auto">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search sign, rule, penalty..."
              className="w-full sm:w-56 px-3 py-1 text-xs border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-700"
            />
          </div>
        </div>

        {/* Informational Training Banner */}
        <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
          <span>
            Showing <strong>{activeTab === 'rules' ? CORE_DRIVING_RULES.length : filteredSigns.length}</strong> training topics
          </span>
          <span className="text-[11px] text-amber-700 dark:text-amber-400 font-semibold">
            Tip: Click any sign stack to expand full legal explanation & test tips
          </span>
        </div>
      </div>

      {/* Main Training Stack Container */}
      {activeTab === 'rules' ? (
        /* Statutory Driving Rules Stack */
        <div className="space-y-3">
          {CORE_DRIVING_RULES.map((rule, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 shadow-xs space-y-2"
            >
              <h3 className="text-xs sm:text-sm font-bold text-[#0f2a4a] dark:text-blue-300">
                {rule.title}
              </h3>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {rule.content}
              </p>
            </div>
          ))}
        </div>
      ) : (
        /* Vertical Card Stack of Every Traffic Sign */
        <div className="space-y-3">
          {filteredSigns.map((item) => {
            const isExpanded = expandedSignId === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setExpandedSignId(isExpanded ? null : item.id)}
                className={`bg-white dark:bg-slate-800 border rounded-lg p-4 shadow-xs transition-colors cursor-pointer ${
                  isExpanded
                    ? 'border-blue-700 dark:border-blue-500 ring-1 ring-blue-700/20'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  {/* Left: Sign Graphic & Title */}
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-slate-50 dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0">
                      <TrafficSignImage signId={item.signId} size={76} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                            item.category === 'Mandatory'
                              ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/70 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
                              : item.category === 'Cautionary'
                              ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                              : 'bg-blue-100 text-blue-800 dark:bg-blue-950/70 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                          }`}
                        >
                          {item.category}
                        </span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                          {item.shape}
                        </span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-[#0f2a4a] dark:text-slate-100 mt-1">
                        {item.name}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 line-clamp-1 sm:line-clamp-none">
                        <strong>Action:</strong> {item.action}
                      </p>
                    </div>
                  </div>

                  {/* Right: Expand Indicator */}
                  <div className="shrink-0 self-end sm:self-center">
                    <span className="text-xs text-blue-700 dark:text-blue-400 font-bold hover:underline">
                      {isExpanded ? 'Collapse ▲' : 'View Full Details ▼'}
                    </span>
                  </div>
                </div>

                {/* Expanded Structured Details */}
                {isExpanded && (
                  <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="bg-slate-50 dark:bg-slate-900/60 p-3 rounded border border-slate-200 dark:border-slate-700 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider">
                        Statutory Regulation:
                      </span>
                      <p className="text-slate-800 dark:text-slate-200 leading-relaxed">
                        {item.rule}
                      </p>
                    </div>

                    <div className="bg-rose-50/50 dark:bg-rose-950/30 p-3 rounded border border-rose-200 dark:border-rose-900/50 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-rose-800 dark:text-rose-300 tracking-wider">
                        Penalty for Violation:
                      </span>
                      <p className="text-rose-900 dark:text-rose-200 font-semibold leading-relaxed">
                        {item.penalty}
                      </p>
                    </div>

                    <div className="md:col-span-2 bg-blue-50 dark:bg-blue-950/40 p-3 rounded border border-blue-200 dark:border-blue-800/60 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-blue-900 dark:text-blue-300 tracking-wider">
                        Driver Examination Key Tip:
                      </span>
                      <p className="text-blue-950 dark:text-blue-200 font-medium leading-relaxed">
                        {item.examTip}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Call to Action: Complete Training & Launch 5-Question Test */}
      <div className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-5 text-center space-y-3 shadow-xs">
        <div className="max-w-md mx-auto space-y-1">
          <h3 className="text-sm sm:text-base font-bold text-[#0f2a4a] dark:text-blue-200">
            Ready for the Official Knowledge Test?
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Once you have reviewed the road signs and regulations above, proceed to the timed 5-question qualifying test.
          </p>
        </div>

        <button
          type="button"
          onClick={onStartTest}
          className="px-6 py-3 bg-blue-700 hover:bg-blue-800 active:bg-blue-900 text-white font-bold text-sm rounded shadow-xs transition-colors inline-flex items-center gap-2"
        >
          <span>I have completed driver training • Start 5-Question Test →</span>
        </button>
      </div>
    </div>
  );
}
