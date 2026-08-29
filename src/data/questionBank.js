/**
 * Authentic Indian Road Traffic Signs & Regulations Question Bank
 * Sourced in accordance with the Motor Vehicles Act, 1988 & IRC (Indian Roads Congress) standards
 */
export const QUESTION_BANK = [
  {
    id: 1,
    question: "What is the mandatory action required when approaching a red octagonal STOP sign?",
    options: [
      "Bring the vehicle to a complete halt before the stop line and proceed only when clear",
      "Slow down and continue if no vehicle is approaching from the right",
      "Sound horn and proceed at 20 km/h",
      "Stop only if emergency vehicles are in transit"
    ],
    correctIndex: 0,
    explanation: "Under Section 119 of the Motor Vehicles Act, an octagonal STOP sign (IRC:67) mandates a 100% complete halt at the stop line before proceeding.",
    signEmoji: "🛑",
    shape: "Octagonal",
    category: "Mandatory / Regulatory",
    lawSection: "Section 119, MV Act 1988"
  },
  {
    id: 2,
    question: "What does a circular sign with a red border containing the numeral '50' indicate?",
    options: [
      "Minimum permissible speed is 50 km/h",
      "Maximum legal speed limit is 50 km/h",
      "Next petrol pump is 50 km ahead",
      "Axle weight capacity limit is 50 quintals"
    ],
    correctIndex: 1,
    explanation: "Circular signs with red borders signify prohibition or mandatory limits. The number indicates the maximum legal speed limit under standard conditions.",
    signEmoji: "⭕",
    shape: "Circular",
    category: "Mandatory / Speed Restriction",
    lawSection: "Section 112, MV Act 1988"
  },
  {
    id: 3,
    question: "What does an equilateral triangle pointing upwards with a pedestrian zebra crossing icon warn drivers about?",
    options: [
      "Pedestrian zebra crossing ahead; yield right-of-way to pedestrians",
      "Pedestrian movement is strictly prohibited",
      "Foot-over bridge available ahead",
      "Designated jogging track zone"
    ],
    correctIndex: 0,
    explanation: "Upward triangular signs with red borders are Cautionary Signs. Drivers must decelerate and give precedence to pedestrians crossing.",
    signEmoji: "🚶",
    shape: "Triangular",
    category: "Cautionary / Warning",
    lawSection: "Rule 11, Rules of the Road Regulations"
  },
  {
    id: 4,
    question: "What does a blue circular sign with a white arrow pointing straight ahead command?",
    options: [
      "Compulsory ahead only; no turns permitted",
      "One way traffic in the opposite direction",
      "Narrow bridge ahead",
      "Lane change recommended"
    ],
    correctIndex: 0,
    explanation: "Blue circular signs without red slashes are Positive Mandatory Direction signs. Traffic must travel strictly in the indicated arrow direction.",
    signEmoji: "⬆️",
    shape: "Circular",
    category: "Mandatory / Positive Direction",
    lawSection: "IRC:67 Standard Sign"
  },
  {
    id: 5,
    question: "What does a circular sign showing an automobile horn crossed by a red diagonal slash signify?",
    options: [
      "Horn prohibited / Silence zone (near hospitals, schools, courts)",
      "Sound horn continuously while driving",
      "Horn testing area ahead",
      "Defective horns are penalized"
    ],
    correctIndex: 0,
    explanation: "A crossed-out horn indicates a designated Silence Zone. Honking within 100 meters of hospitals, educational institutions, and courts is an offence.",
    signEmoji: "🔇",
    shape: "Circular",
    category: "Mandatory / Prohibitory",
    lawSection: "Noise Pollution Rules & MV Act"
  },
  {
    id: 6,
    question: "What is the meaning of an inverted (downward-pointing) triangular sign with a red border?",
    options: [
      "Give Way / Yield right of way to traffic on the major road",
      "Dead end / No thoroughfare ahead",
      "Rest area ahead",
      "Toll plaza approaching"
    ],
    correctIndex: 0,
    explanation: "The inverted triangle is universally recognized as 'GIVE WAY'. It assigns priority to traffic already moving on the priority carriageway.",
    signEmoji: "🔻",
    shape: "Inverted Triangle",
    category: "Mandatory / Priority Control",
    lawSection: "IRC:67 Mandatory Series"
  },
  {
    id: 7,
    question: "What does a circular sign with a U-turn arrow crossed by a red diagonal slash indicate?",
    options: [
      "U-Turn is strictly prohibited",
      "Compulsory U-turn ahead",
      "Roundabout ahead with right-of-way",
      "Sharp left hairpin bend ahead"
    ],
    correctIndex: 0,
    explanation: "A red slash across a U-turn arrow prohibits turning the vehicle 180 degrees at that junction or road cut.",
    signEmoji: "↩️",
    shape: "Circular",
    category: "Mandatory / Prohibitory",
    lawSection: "Section 119, MV Act 1988"
  },
  {
    id: 8,
    question: "What does a cautionary triangular sign showing a hump on the road surface indicate?",
    options: [
      "Speed breaker / Rough road hump ahead; reduce speed immediately",
      "Mountain terrain beginning",
      "Railway level crossing without barrier",
      "Dual road merge ahead"
    ],
    correctIndex: 0,
    explanation: "This cautionary sign alerts motorists to reduce vehicle velocity to safely negotiate a speed breaker or uneven surface.",
    signEmoji: "⚠️",
    shape: "Triangular",
    category: "Cautionary / Road Condition",
    lawSection: "IRC Road Safety Guidelines"
  },
  {
    id: 9,
    question: "What does a circular red sign with a central horizontal white bar signify?",
    options: [
      "No Entry for all vehicular traffic",
      "One way traffic to the right",
      "Speed check camera zone",
      "Commercial vehicles restricted"
    ],
    correctIndex: 0,
    explanation: "A solid red disc with a horizontal white bar is the standard 'NO ENTRY' sign. Entry into that road is strictly forbidden.",
    signEmoji: "⛔",
    shape: "Circular",
    category: "Mandatory / Prohibitory",
    lawSection: "Section 115, MV Act 1988"
  },
  {
    id: 10,
    question: "When are you legally permitted to overtake a vehicle on its left side in India?",
    options: [
      "When the vehicle ahead is signaling and making a right turn in an open multi-lane road",
      "Whenever the right lane is congested",
      "At night when flashing headlights",
      "Left overtaking is never permissible under any circumstance"
    ],
    correctIndex: 0,
    explanation: "According to the Rules of the Road Regulations (1989), overtaking on the left is permitted only when the front vehicle indicates its intention to turn right.",
    signEmoji: "🚗",
    shape: "Rule-Based",
    category: "Traffic Regulation Rule",
    lawSection: "Rule 14, Rules of the Road Regulations"
  },
  {
    id: 11,
    question: "What does a triangular cautionary sign showing two children with school bags indicate?",
    options: [
      "School zone ahead; drive with extreme caution and reduce speed",
      "Children playground area; parking permitted",
      "Pedestrian footpath closed",
      "Public park entrance"
    ],
    correctIndex: 0,
    explanation: "Warns drivers that children may suddenly cross the road. Drivers must slow down to school zone speed limits (usually 25 km/h).",
    signEmoji: "🚸",
    shape: "Triangular",
    category: "Cautionary / Warning",
    lawSection: "School Safety Guidelines, MoRTH"
  },
  {
    id: 12,
    question: "What does a circular sign with a blue background and a white bicycle symbol specify?",
    options: [
      "Compulsory cycle track / Dedicated bicycle lane only",
      "Cycles prohibited",
      "Motorcycle lane",
      "Bicycle repair shop ahead"
    ],
    correctIndex: 0,
    explanation: "A blue circle indicates a compulsory path reserved exclusively for non-motorized pedal bicycles.",
    signEmoji: "🚲",
    shape: "Circular",
    category: "Mandatory / Lane Reservation",
    lawSection: "IRC:67 Mandatory Series"
  }
];
