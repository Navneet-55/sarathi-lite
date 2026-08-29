import React, { useState } from 'react';
import TrafficSignImage from './TrafficSignImage';

/**
 * Driver Road Safety & Traffic Sign Training Academy
 * Complete Indian Traffic Sign Curriculum in Official IRC:67 / MoRTH Order
 */

export const COMPLETE_TRAFFIC_SIGNS = [
  // =========================================================================
  // 1. MANDATORY / REGULATORY SIGNS (Schedule I - Part A, Section 119 MV Act)
  // =========================================================================
  {
    id: 1,
    signId: 1,
    group: 'Mandatory',
    orderNum: 'M-01',
    name: 'STOP Sign',
    shape: 'Octagonal (Red with White Border)',
    action: 'Bring the vehicle to a complete and full stop behind the stop line before entering intersection.',
    rule: 'Section 119 Motor Vehicles Act. Mandatory yield to all cross-traffic and pedestrians.',
    penalty: '₹1,000 to ₹5,000 for failure to halt at stop line.',
    examTip: 'STOP is the ONLY 8-sided octagonal sign in the entire Indian road system.',
  },
  {
    id: 2,
    signId: 6,
    group: 'Mandatory',
    orderNum: 'M-02',
    name: 'GIVE WAY Sign',
    shape: 'Inverted Equilateral Triangle (Apex Pointing Down)',
    action: 'Slow down and yield right-of-way to vehicles on the main major road.',
    rule: 'Rule 9 CMVR. Drivers must yield without stopping if the road is completely clear.',
    penalty: '₹1,000 for failure to give way to oncoming traffic.',
    examTip: 'GIVE WAY is the ONLY inverted triangle in the Indian traffic code.',
  },
  {
    id: 3,
    signId: 9,
    group: 'Mandatory',
    orderNum: 'M-03',
    name: 'NO ENTRY Sign',
    shape: 'Circular (Solid Red with White Horizontal Bar)',
    action: 'Entry of all motor vehicles and transport into this street is strictly barred.',
    rule: 'Section 115 MV Act. Enforces one-way security or pedestrianized corridors.',
    penalty: '₹1,000 to ₹5,000 fine for driving against flow of traffic.',
    examTip: 'Violating No Entry is prosecuted as reckless/dangerous driving under Section 184.',
  },
  {
    id: 4,
    signId: 34,
    group: 'Mandatory',
    orderNum: 'M-04',
    name: 'ONE WAY Traffic Sign',
    shape: 'Circular with Permitted Arrow & Slashed Arrow',
    action: 'Vehicular movement permitted only in indicated direction; opposing travel prohibited.',
    rule: 'Rule 10 Road Regulations. Reversing or counter-flow driving strictly banned.',
    penalty: '₹1,000 fine and license endorsement.',
    examTip: 'On a one-way road, overtaking is permitted on both sides if space permits.',
  },
  {
    id: 5,
    signId: 2,
    group: 'Mandatory',
    orderNum: 'M-05',
    name: 'Speed Limit (50 km/h)',
    shape: 'Circular with Red Outer Border',
    action: 'Vehicle speed must not exceed 50 km/h under any traffic circumstance.',
    rule: 'Section 112 Motor Vehicles Act.',
    penalty: '₹1,000 to ₹2,000 for LMVs / ₹4,000 for transport vehicles.',
    examTip: 'Numbers enclosed within red circles indicate MAXIMUM permissible speed.',
  },
  {
    id: 6,
    signId: 35,
    group: 'Mandatory',
    orderNum: 'M-06',
    name: 'Height Limit (3.5 Meters)',
    shape: 'Circular with Top & Bottom Opposing Triangles',
    action: 'Vehicles with laden height exceeding 3.5 meters must not proceed.',
    rule: 'Protects overhead railway bridges, low-hanging utility lines, and underpasses.',
    penalty: '₹2,000 to ₹5,000 for height barrier violation.',
    examTip: 'Check vehicle height before attempting low-clearance subways and underpasses.',
  },
  {
    id: 7,
    signId: 7,
    group: 'Mandatory',
    orderNum: 'M-07',
    name: 'U-Turn Prohibited',
    shape: 'Circular with Red Slash over U-Turn Arrow',
    action: 'Making a 180-degree turnaround at this intersection or median opening is barred.',
    rule: 'Rule 12 Road Regulations.',
    penalty: '₹1,000 for illegal median turnaround.',
    examTip: 'U-turns are automatically prohibited on all bridges, flyovers, and sharp blind curves.',
  },
  {
    id: 8,
    signId: 10,
    group: 'Mandatory',
    orderNum: 'M-08',
    name: 'Overtaking Prohibited',
    shape: 'Circular with Red Slash over Passing Vehicle',
    action: 'Maintain lane position; do not attempt to pass or overtake any moving vehicle.',
    rule: 'Rule 14 CMVR. Erected on narrow roads, blind corners, bridges, and tunnels.',
    penalty: '₹1,000 to ₹5,000 for dangerous overtaking.',
    examTip: 'Always stay behind leading vehicles until the restriction ends.',
  },
  {
    id: 9,
    signId: 5,
    group: 'Mandatory',
    orderNum: 'M-09',
    name: 'Horn Prohibited (Silence Zone)',
    shape: 'Circular with Red Slash over Horn Symbol',
    action: 'Refrain completely from sounding the vehicle horn within 100 meters.',
    rule: 'Section 194F Motor Vehicles Act. Active 24/7 around hospitals, courts, and schools.',
    penalty: '₹1,000 for 1st offense, ₹2,000 for repeat offense.',
    examTip: 'Use optical headlight flashing instead of horn in silence zones at night.',
  },
  {
    id: 10,
    signId: 21,
    group: 'Mandatory',
    orderNum: 'M-10',
    name: 'No Parking Sign',
    shape: 'Blue Circular Disc with Red Border & Single Diagonal Slash',
    action: 'Vehicles may stop momentarily to pick up or set down passengers, but cannot park.',
    rule: 'Section 122 MV Act.',
    penalty: '₹500 to ₹1,500 + vehicle towing charges.',
    examTip: 'Single slash means No Parking (brief drop-off allowed). Cross slash means No Stopping.',
  },
  {
    id: 11,
    signId: 22,
    group: 'Mandatory',
    orderNum: 'M-11',
    name: 'No Stopping / No Standing',
    shape: 'Blue Circular Disc with Red Border & Red Cross (X)',
    action: 'Vehicle must not halt or stand even for a single second for any purpose.',
    rule: 'Section 122 MV Act (Clearway / Express Corridor).',
    penalty: '₹1,000 + immediate towing on high-speed expressways and arterial bridges.',
    examTip: 'Double cross slash means absolute clearway (zero stopping permitted).',
  },
  {
    id: 12,
    signId: 4,
    group: 'Mandatory',
    orderNum: 'M-12',
    name: 'Compulsory Ahead Only',
    shape: 'Blue Circular Disc with White Upward Arrow',
    action: 'Vehicle MUST travel straight ahead. Left and right turns are barred.',
    rule: 'Positive command sign under IRC:67.',
    penalty: '₹1,000 for illegal turn.',
    examTip: 'Blue circular signs always indicate COMPULSORY positive instructions.',
  },
  {
    id: 13,
    signId: 13,
    group: 'Mandatory',
    orderNum: 'M-13',
    name: 'Compulsory Turn Left',
    shape: 'Blue Circular Disc with Leftward Arrow',
    action: 'Vehicle MUST turn left at the upcoming intersection.',
    rule: 'Mandatory lane routing.',
    penalty: '₹1,000 for directional non-compliance.',
    examTip: 'Engage left turn indicator at least 30 meters in advance.',
  },
  {
    id: 14,
    signId: 14,
    group: 'Mandatory',
    orderNum: 'M-14',
    name: 'Compulsory Turn Right',
    shape: 'Blue Circular Disc with Rightward Arrow',
    action: 'Vehicle MUST turn right at the upcoming junction.',
    rule: 'Mandatory right turn routing.',
    penalty: '₹1,000 for lane disobedience.',
    examTip: 'Position vehicle in rightmost lane before executing turn.',
  },
  {
    id: 15,
    signId: 33,
    group: 'Mandatory',
    orderNum: 'M-15',
    name: 'Compulsory Keep Left',
    shape: 'Blue Circular Disc with Downward-Left Diagonal Arrow',
    action: 'Drive strictly on the left side of the traffic island, divider, or bollard.',
    rule: 'Traffic channelization under IRC:67.',
    penalty: '₹1,000 for passing on wrong side of divider.',
    examTip: 'Commonly placed at the beginning of dual carriageways and central medians.',
  },
  {
    id: 16,
    signId: 32,
    group: 'Mandatory',
    orderNum: 'M-16',
    name: 'Compulsory Sound Horn',
    shape: 'Blue Circular Disc with White Horn Symbol',
    action: 'Sound your vehicle horn to alert oncoming traffic before proceeding around blind curve.',
    rule: 'Mandatory on hairpin bends, mountain ghat roads, and blind hill crests.',
    penalty: 'Risk of head-on collision on narrow single-lane mountain passes.',
    examTip: 'Sounding horn is mandatory on blind curves to warn opposing traffic.',
  },
  {
    id: 17,
    signId: 12,
    group: 'Mandatory',
    orderNum: 'M-17',
    name: 'Compulsory Cycle Track',
    shape: 'Blue Circular Disc with White Bicycle',
    action: 'Dedicated exclusively for non-motorized pedal cycles. Motor vehicles barred.',
    rule: 'Dedicated cycle track regulation.',
    penalty: '₹1,000 for driving motorized vehicle in bicycle corridor.',
    examTip: 'Protects pedal cyclists and non-motorized commuters.',
  },

  // =========================================================================
  // 2. CAUTIONARY / WARNING SIGNS (Schedule I - Part B, Hazard Warnings)
  // =========================================================================
  {
    id: 18,
    signId: 3,
    group: 'Cautionary',
    orderNum: 'C-01',
    name: 'Pedestrian Zebra Crossing Ahead',
    shape: 'Equilateral Triangle (Red Border, Apex Up)',
    action: 'Reduce speed smoothly and be prepared to stop. Pedestrians have absolute right-of-way.',
    rule: 'Section 119 MV Act & Rule 11 Road Regulations.',
    penalty: '₹1,000 fine for failure to yield to pedestrians on zebra crossing.',
    examTip: 'Never overtake a vehicle that has stopped at a pedestrian crossing.',
  },
  {
    id: 19,
    signId: 11,
    group: 'Cautionary',
    orderNum: 'C-02',
    name: 'School Zone Ahead',
    shape: 'Equilateral Triangle (Red Border)',
    action: 'Reduce speed to 25 km/h or below. Watch for children crossing.',
    rule: 'Special speed enforcement near educational institutions.',
    penalty: '₹1,000 to ₹2,000 for overspeeding in school zones.',
    examTip: 'Highest vigilance required between 7:30-9:00 AM and 1:30-3:30 PM.',
  },
  {
    id: 20,
    signId: 8,
    group: 'Cautionary',
    orderNum: 'C-03',
    name: 'Speed Breaker / Road Hump Ahead',
    shape: 'Equilateral Triangle (Red Border)',
    action: 'Decelerate in advance to cross the hump safely without passenger discomfort.',
    rule: 'Traffic calming measure before intersections and accident-prone zones.',
    penalty: 'Risk of vehicle undercarriage damage and loss of vehicle stability.',
    examTip: 'Brake before reaching the hump, release brake gently as front wheels climb.',
  },
  {
    id: 21,
    signId: 23,
    group: 'Cautionary',
    orderNum: 'C-04',
    name: 'Right Hand Curve Ahead',
    shape: 'Equilateral Triangle (Red Border)',
    action: 'Reduce speed, downshift if necessary, and hug the center-left of your lane.',
    rule: 'Warning of upcoming rightward curvature in roadway.',
    penalty: 'Risk of skidding or lane departure due to centrifugal force.',
    examTip: 'Complete all braking before entering the curve, not while turning the steering wheel.',
  },
  {
    id: 22,
    signId: 24,
    group: 'Cautionary',
    orderNum: 'C-05',
    name: 'Left Hand Curve Ahead',
    shape: 'Equilateral Triangle (Red Border)',
    action: 'Slow down and stay firmly on the left side of the carriageway.',
    rule: 'Warning of upcoming leftward curvature.',
    penalty: 'Risk of drifting into opposing traffic lane.',
    examTip: 'Never cross the center dividing line when negotiating a curve.',
  },
  {
    id: 23,
    signId: 17,
    group: 'Cautionary',
    orderNum: 'C-06',
    name: 'Right Hairpin Bend',
    shape: 'Equilateral Triangle (Red Border)',
    action: 'Shift to 1st or 2nd gear, reduce speed below 20 km/h, and stay alert.',
    rule: 'Extreme curve on mountain / ghat sections.',
    penalty: 'Severe hazard warning on steep slopes.',
    examTip: 'Uphill vehicles have statutory right of way over downhill vehicles.',
  },
  {
    id: 24,
    signId: 25,
    group: 'Cautionary',
    orderNum: 'C-07',
    name: 'Steep Ascent (Uphill Climb)',
    shape: 'Equilateral Triangle (Red Border)',
    action: 'Select lower gear before beginning climb to avoid engine stall.',
    rule: 'Gradient warning under IRC:67.',
    penalty: 'Risk of vehicle rolling backwards.',
    examTip: 'Use handbrake technique for stationary hill starts.',
  },
  {
    id: 25,
    signId: 26,
    group: 'Cautionary',
    orderNum: 'C-08',
    name: 'Steep Descent (Downhill Slope)',
    shape: 'Equilateral Triangle (Red Border)',
    action: 'Use engine braking (lower gear); do not coast in neutral or rely solely on footbrakes.',
    rule: 'Gradient warning under IRC:67.',
    penalty: 'Risk of brake fade / complete brake failure from overheating.',
    examTip: 'Never depress the clutch or drive in neutral on downhill gradients.',
  },
  {
    id: 26,
    signId: 27,
    group: 'Cautionary',
    orderNum: 'C-09',
    name: 'Narrow Road Ahead',
    shape: 'Equilateral Triangle (Red Border)',
    action: 'Carriageway width reduces ahead. Be prepared to yield to oncoming heavy vehicles.',
    rule: 'Lane constriction warning.',
    penalty: 'Risk of sideswipe collisions.',
    examTip: 'Do not overtake when approaching narrow road bottlenecks.',
  },
  {
    id: 27,
    signId: 16,
    group: 'Cautionary',
    orderNum: 'C-10',
    name: 'Narrow Bridge Ahead',
    shape: 'Equilateral Triangle (Red Border)',
    action: 'Check opposing traffic before entering. Vehicle already on bridge has right-of-way.',
    rule: 'Rule 15 CMVR.',
    penalty: '₹1,000 for overtaking on narrow bridges.',
    examTip: 'Never overtake, reverse, or stop on a narrow bridge.',
  },
  {
    id: 28,
    signId: 28,
    group: 'Cautionary',
    orderNum: 'C-11',
    name: 'Slippery Road Ahead',
    shape: 'Equilateral Triangle (Red Border)',
    action: 'Drive gently, avoid sudden braking or aggressive steering on wet/slippery surface.',
    rule: 'Reduced tire traction hazard.',
    penalty: 'Severe skid / aquaplaning hazard.',
    examTip: 'Increase following distance from leading vehicle by double.',
  },
  {
    id: 29,
    signId: 15,
    group: 'Cautionary',
    orderNum: 'C-12',
    name: 'Roundabout Ahead (Rotary)',
    shape: 'Equilateral Triangle (Red Border)',
    action: 'Yield right-of-way to vehicles already circulating inside the rotary on your right.',
    rule: 'Rule 17 Road Regulations.',
    penalty: '₹1,000 for failing to yield at roundabout.',
    examTip: 'Traffic moves clockwise in India; always give way to vehicles from your right.',
  },
  {
    id: 30,
    signId: 29,
    group: 'Cautionary',
    orderNum: 'C-13',
    name: 'Gap in Median (Opening Ahead)',
    shape: 'Equilateral Triangle (Red Border)',
    action: 'Watch out for turning vehicles and crossing pedestrians emerging from divider gap.',
    rule: 'Median opening warning on multi-lane highways.',
    penalty: 'Risk of T-bone intersection collision.',
    examTip: 'Do not overtake in the immediate vicinity of a median opening.',
  },
  {
    id: 31,
    signId: 30,
    group: 'Cautionary',
    orderNum: 'C-14',
    name: 'Men at Work / Road Construction',
    shape: 'Equilateral Triangle (Red Border)',
    action: 'Reduce speed, watch for road workers, machinery, and gravel on carriageway.',
    rule: 'Work zone safety under MoRTH guidelines.',
    penalty: '₹1,000 to ₹5,000 for reckless speeding in active work zones.',
    examTip: 'Follow instructions of site flagmen and temporary directional arrows.',
  },
  {
    id: 32,
    signId: 36,
    group: 'Cautionary',
    orderNum: 'C-15',
    name: 'Guarded Railway Level Crossing',
    shape: 'Equilateral Triangle with Railway Gate Symbol',
    action: 'Railway crossing protected by physical barrier gates ahead. Stop when red lights flash.',
    rule: 'Section 130 Motor Vehicles Act.',
    penalty: 'Severe criminal offense for trying to cross under closing railway barrier.',
    examTip: 'Red flashes indicate barrier closure; complete stop is mandatory.',
  },
  {
    id: 33,
    signId: 18,
    group: 'Cautionary',
    orderNum: 'C-16',
    name: 'Unguarded Railway Level Crossing',
    shape: 'Equilateral Triangle with Steam Train Engine',
    action: 'No barrier or watchman. Driver MUST halt, look both directions, and listen for train.',
    rule: 'Section 131 MV Act (Duty of driver at unguarded railway crossing).',
    penalty: 'Driver license cancellation and criminal prosecution for reckless track crossing.',
    examTip: 'Never shift gears or stop while vehicle is situated across the tracks.',
  },

  // =========================================================================
  // 3. INFORMATORY & FACILITY SIGNS (Schedule I - Part C, Amenities)
  // =========================================================================
  {
    id: 34,
    signId: 19,
    group: 'Informatory',
    orderNum: 'I-01',
    name: 'First Aid Post',
    shape: 'Blue Rectangle with Red Cross in White Square',
    action: 'Informs travelers of emergency medical first aid availability along the highway.',
    rule: 'Highway emergency amenity under IRC:67.',
    penalty: 'N/A (Informatory aid).',
    examTip: 'Indicates basic emergency trauma kit availability.',
  },
  {
    id: 35,
    signId: 20,
    group: 'Informatory',
    orderNum: 'I-02',
    name: 'Hospital Facility',
    shape: 'Blue Rectangle with Letter H',
    action: 'Inpatient hospital facility nearby. Maintain strict silence and do not sound horn.',
    rule: 'Combines health guidance with mandatory silence zone.',
    penalty: '₹1,000 for sounding horn in vicinity.',
    examTip: 'Observe strict silence zone within 100m of this facility.',
  },
  {
    id: 36,
    signId: 31,
    group: 'Informatory',
    orderNum: 'I-03',
    name: 'Petrol Pump / Fuel Station',
    shape: 'Blue Rectangle with Fuel Dispenser',
    action: 'Indicates motor vehicle refueling facility ahead.',
    rule: 'Highway facility under IRC:67.',
    penalty: 'N/A (Informatory aid).',
    examTip: 'Turn off vehicle engine and mobile phone while refueling at the dispenser.',
  },
];

export const CORE_DRIVING_RULES = [
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

  const filteredSigns = COMPLETE_TRAFFIC_SIGNS.filter((sign) => {
    const matchesCategory =
      activeTab === 'all' || sign.group.toLowerCase() === activeTab.toLowerCase();
    const matchesSearch =
      sign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sign.orderNum.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
            Complete IRC:67 Catalog ({COMPLETE_TRAFFIC_SIGNS.length} Signs)
          </span>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
          Complete mandatory curriculum in official statutory order. Review all regulatory commands, cautionary warnings, and informatory markers before launching the 5-question test.
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
              All Signs ({COMPLETE_TRAFFIC_SIGNS.length})
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
              1. Mandatory Signs (M-01 to M-17)
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
              2. Cautionary Signs (C-01 to C-16)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('informatory')}
              className={`px-3 py-1.5 rounded transition-colors ${
                activeTab === 'informatory'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              3. Informatory Signs (I-01 to I-03)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('rules')}
              className={`px-3 py-1.5 rounded transition-colors ${
                activeTab === 'rules'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              4. MV Act Rules & Penalties
            </button>
          </div>

          {/* Quick Search */}
          <div className="w-full sm:w-auto">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search sign (e.g. M-01, STOP, U-Turn)..."
              className="w-full sm:w-60 px-3 py-1 text-xs border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-700"
            />
          </div>
        </div>

        {/* Informational Training Banner */}
        <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
          <span>
            Showing <strong>{activeTab === 'rules' ? CORE_DRIVING_RULES.length : filteredSigns.length}</strong> items in statutory sequence
          </span>
          <span className="text-[11px] text-blue-800 dark:text-blue-300 font-semibold">
            Click any sign row to expand full legal explanation, fines & examination tips
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
        /* Vertical Card Stack of Every Traffic Sign in Strict Order */
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
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded">
                          {item.orderNum}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                            item.group === 'Mandatory'
                              ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/70 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
                              : item.group === 'Cautionary'
                              ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                              : 'bg-blue-100 text-blue-800 dark:bg-blue-950/70 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                          }`}
                        >
                          {item.group}
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
            Once you have reviewed the complete road signs and regulations catalog above, proceed to the timed 5-question qualifying test.
          </p>
        </div>

        <button
          type="button"
          onClick={onStartTest}
          className="px-6 py-3 bg-blue-700 hover:bg-blue-800 active:bg-blue-900 text-white font-bold text-sm rounded shadow-xs transition-colors inline-flex items-center gap-2"
        >
          <span>I have completed full driver training • Start 5-Question Test →</span>
        </button>
      </div>
    </div>
  );
}
