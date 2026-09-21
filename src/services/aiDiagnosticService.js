// AI Diagnostic Engine (Ready for OpenAI / Gemini Vision / Acoustic API integration)

import { MOCK_OBD_CODES, MOCK_ACOUSTIC_SAMPLES, MOCK_WARNING_LIGHTS } from './mockData';

const SYMPTOM_KNOWLEDGE_BASE = [
  {
    keywords: ['shake', 'shaking', 'vibrate', 'vibration', 'brake', 'braking'],
    title: 'Warped Brake Rotors & Uneven Pad Wear',
    category: 'Brakes & Suspension',
    severity: 'Medium',
    severityColor: 'amber',
    confidenceScore: 96.2,
    explanation: 'Vibrations felt through the steering wheel or brake pedal specifically during deceleration are almost always caused by lateral runout (warped brake rotors) or uneven brake pad resin transfer.',
    canDrive: 'Yes (Safe for low speeds, but increases stopping distance in emergency braking)',
    diySafety: 'Moderate (Wheel removal & rotor replacement with torque wrench)',
    estimatedCost: '$190 - $380',
    troubleshootingSteps: [
      'Inspect brake disc rotor surface for deep blue heat discoloration or grooves.',
      'Measure brake rotor runout using a dial indicator gauge (< 0.05mm is normal).',
      'Check caliper guide slide pins for seized grease or stuck rubber boots.',
      'Replace front brake pads and resurface or replace brake rotors in pairs.'
    ],
    relatedDtc: 'C0035'
  },
  {
    keywords: ['white smoke', 'smoke', 'steam', 'overheating', 'sweet smell'],
    title: 'Blown Cylinder Head Gasket / Internal Coolant Leak',
    category: 'Engine Internal & Cooling',
    severity: 'Critical',
    severityColor: 'rose',
    confidenceScore: 98.4,
    explanation: 'Thick billowy sweet-smelling white smoke from the exhaust indicates coolant is entering the combustion chamber through a breached cylinder head gasket or cracked engine block.',
    canDrive: 'NO / Emergency (Driving will cause hydrostatic engine lock or engine fire)',
    diySafety: 'Professional Repair Only',
    estimatedCost: '$1,400 - $2,900',
    troubleshootingSteps: [
      'Pull over safely and turn off engine immediately.',
      'Check engine oil dipstick for milky "chocolate milkshake" discoloration.',
      'Perform a block combustion chemical leak test on cooling system.',
      'Inspect spark plugs for steam-cleaned white ceramic electrodes.'
    ],
    relatedDtc: 'P0128'
  },
  {
    keywords: ['click', 'clicking', 'turn', 'turning', 'sharp', 'wheel'],
    title: 'Worn CV Axle Shaft & Outer Joint Failure',
    category: 'Drivetrain & Axles',
    severity: 'High',
    severityColor: 'amber',
    confidenceScore: 94.8,
    explanation: 'Rhythmic metallic clicking or popping sounds heard when making sharp U-turns or turning into parking spaces indicate torn Constant Velocity (CV) rubber boot and grease loss.',
    canDrive: 'Limited (Can drive short distance to garage; axle will separate if ignored)',
    diySafety: 'Moderate to Hard (Requires axle nut socket and ball joint separation)',
    estimatedCost: '$220 - $480',
    troubleshootingSteps: [
      'Turn steering wheel full lock and inspect accordion-style rubber CV boots behind front wheels.',
      'Look for splattered black axle grease inside the wheel rim.',
      'Replace half-shaft CV axle assembly with new axle nut torqued to specification.'
    ],
    relatedDtc: null
  },
  {
    keywords: ['sputter', 'sputtering', 'hesitation', 'acceleration', 'choke', 'misfire'],
    title: 'Ignition Cylinder Misfire / Fouled Spark Plug / Clogged Injector',
    category: 'Ignition & Fuel Delivery',
    severity: 'High',
    severityColor: 'amber',
    confidenceScore: 97.1,
    explanation: 'Engine jerking or sputtering under load is typically caused by incomplete combustion in one or more cylinders due to a failing coil pack, worn spark plug, or dirty fuel injector.',
    canDrive: 'Caution (Do not tow or drive above 50 mph; avoid unburned fuel in cat)',
    diySafety: 'Easy to Moderate',
    estimatedCost: '$120 - $420',
    troubleshootingSteps: [
      'Read OBD-II DTC codes to identify specific misfiring cylinder (e.g. P0301 = Cyl 1).',
      'Swap ignition coil between Cyl 1 and Cyl 2 to check if misfire code moves.',
      'Inspect spark plug gap and ceramic insulator for carbon tracking.',
      'Verify fuel injector pulse and electrical resistance.'
    ],
    relatedDtc: 'P0300'
  },
  {
    keywords: ['dead', 'won\'t start', 'clicking start', 'no crank', 'battery'],
    title: 'Depleted 12V Starter Battery or High Starter Resistance',
    category: 'Electrical & Starting System',
    severity: 'High',
    severityColor: 'rose',
    confidenceScore: 99.1,
    explanation: 'Rapid clicking sound when turning key or pressing Start button with flickering dash lights indicates low battery voltage (< 11.8V) unable to engage the starter motor solenoid.',
    canDrive: 'Vehicle inoperable until jumped or battery replaced',
    diySafety: 'Easy (Jumpstart or 10mm wrench battery replacement)',
    estimatedCost: '$49 - $190',
    troubleshootingSteps: [
      'Check battery terminal clamps for white or green powdery corrosion.',
      'Measure resting voltage with digital multimeter (12.6V is 100% charged; < 12.0V is discharged).',
      'Use 12V jump booster pack or connect jumper cables to start engine.',
      'Test charging voltage with engine running (should be 13.8V - 14.5V from alternator).'
    ],
    relatedDtc: null
  }
];

export const aiDiagnosticService = {
  // Query symptom by natural text
  diagnoseSymptomText: async (queryText) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    const lower = queryText.toLowerCase();

    // Look for OBD code match first
    const obdMatch = MOCK_OBD_CODES.find((c) => lower.includes(c.code.toLowerCase()));
    if (obdMatch) {
      return {
        type: 'OBD_CODE',
        match: obdMatch,
        title: `${obdMatch.code} - ${obdMatch.title}`,
        severity: obdMatch.severity,
        severityColor: obdMatch.severityColor,
        confidenceScore: 99.5,
        explanation: obdMatch.recommendation,
        canDrive: obdMatch.canDrive,
        diySafety: obdMatch.diyDifficulty,
        estimatedCost: `$${obdMatch.estimatedCost.min} - $${obdMatch.estimatedCost.max}`,
        troubleshootingSteps: obdMatch.causes,
        symptoms: obdMatch.symptoms
      };
    }

    // Match keywords
    let bestMatch = null;
    let highestScore = 0;

    for (const item of SYMPTOM_KNOWLEDGE_BASE) {
      let score = 0;
      for (const kw of item.keywords) {
        if (lower.includes(kw)) {
          score += 1;
        }
      }
      if (score > highestScore) {
        highestScore = score;
        bestMatch = item;
      }
    }

    if (bestMatch && highestScore > 0) {
      return {
        type: 'SYMPTOM_MATCH',
        ...bestMatch
      };
    }

    // Fallback generalized intelligent AI diagnosis
    return {
      type: 'GENERAL_AI_TRIAGE',
      title: 'Multisystem Sensor & Drivetrain Diagnostic Flag',
      category: 'General Vehicle Diagnostics',
      severity: 'Medium',
      severityColor: 'amber',
      confidenceScore: 89.2,
      explanation: `Our AI analyzed your description: "${queryText}". The symptoms suggest an intermittent sensor discrepancy or fuel/air metering fluctuation. We recommend connecting an OBD-II real-time data logger.`,
      canDrive: 'Yes, with caution (Monitor dashboard instrument cluster for flashing warnings)',
      diySafety: 'Inspection recommended',
      estimatedCost: '$85 - $260',
      troubleshootingSteps: [
        'Check for pending trouble codes stored in vehicle ECU memory.',
        'Inspect air intake filter and vacuum tubes for blockages or splits.',
        'Verify fuel cap seal and fluid levels (Oil, Coolant, Brake fluid).'
      ]
    };
  },

  // Lookup OBD code directly
  getObdCodeDetails: (code) => {
    const formatted = code.trim().toUpperCase();
    return MOCK_OBD_CODES.find((c) => c.code === formatted) || null;
  },

  // Audio acoustic match
  diagnoseAcousticAudio: async (sampleIdOrFile) => {
    await new Promise((resolve) => setTimeout(resolve, 1400));
    const sample = MOCK_ACOUSTIC_SAMPLES.find((s) => s.id === sampleIdOrFile) || MOCK_ACOUSTIC_SAMPLES[0];
    return sample;
  },

  // Visual warning light scan
  diagnoseWarningLight: async (lightId) => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    const light = MOCK_WARNING_LIGHTS.find((l) => l.id === lightId) || MOCK_WARNING_LIGHTS[0];
    return light;
  }
};
