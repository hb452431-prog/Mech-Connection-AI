// Simple AI Vehicle Assistance Service

const KNOWLEDGE_BASE = [
  {
    keywords: ['battery', 'start', 'dead', 'click', 'won\'t start', 'crank'],
    problem: 'Possible 12V Battery Discharge / Loose Terminal',
    isComplex: false,
    type: 'SIMPLE',
    badgeText: 'SIMPLE PROBLEM',
    advice: 'You may be able to solve this yourself.',
    steps: [
      'Check whether the vehicle dashboard lights and headlights turn on.',
      'Inspect the battery terminals under the hood for loose clamps or white powder corrosion.',
      'Connect jumper cables or portable booster pack and try starting the vehicle again.'
    ]
  },
  {
    keywords: ['tyre', 'tire', 'flat', 'puncture', 'air', 'pressure'],
    problem: 'Low Tyre Pressure or Tread Puncture',
    isComplex: false,
    type: 'SIMPLE',
    badgeText: 'SIMPLE PROBLEM',
    advice: 'You may be able to solve this yourself.',
    steps: [
      'Park on a flat, safe surface and engage the parking brake.',
      'Inspect the tyre tread for nails, screws, or visual sidewall deflation.',
      'Mount your vehicle spare tyre using the trunk jack or use an emergency puncture seal kit.'
    ]
  },
  {
    keywords: ['smoke', 'white smoke', 'overheat', 'temperature', 'steam', 'hot', 'radiator', 'coolant'],
    problem: 'Engine Coolant Overheating / Internal Head Gasket Failure',
    isComplex: true,
    type: 'COMPLEX',
    badgeText: 'COMPLEX PROBLEM',
    advice: 'Professional mechanic assistance is recommended.',
    steps: [
      'Pull over safely and turn off the engine immediately to prevent engine seizure.',
      'DO NOT open the radiator pressure cap while the engine is hot.',
      'Request emergency towing or mobile mechanic roadside assistance.'
    ]
  },
  {
    keywords: ['brake', 'squeak', 'grind', 'pedal', 'shaking', 'stopping'],
    problem: 'Worn Brake Pads / Rotor Surface Abrasion',
    isComplex: true,
    type: 'COMPLEX',
    badgeText: 'COMPLEX PROBLEM',
    advice: 'Professional mechanic assistance is recommended.',
    steps: [
      'Avoid high-speed driving and maintain extra following distance.',
      'Check brake fluid reservoir level in the engine bay.',
      'Have a certified mechanic inspect pad thickness and rotor runout immediately.'
    ]
  },
  {
    keywords: ['suddenly stopped', 'stopped', 'stall', 'bike', 'scooter', 'shut off'],
    problem: 'Fuel Supply Interruption or Spark Plug Ignition Failure',
    isComplex: false,
    type: 'SIMPLE',
    badgeText: 'SIMPLE PROBLEM',
    advice: 'You may be able to solve this yourself.',
    steps: [
      'Verify if the fuel switch / reserve valve is ON and there is sufficient fuel.',
      'Check the engine kill switch on the handlebar to ensure it was not flipped accidentally.',
      'Wait 2 minutes and attempt to restart with the choke engaged or kickstart.'
    ]
  }
];

export const aiService = {
  analyzeProblem: async (typedText, hasImage = false) => {
    await new Promise((r) => setTimeout(r, 4000));

    if (!typedText && hasImage) {
      return {
        problem: 'Exterior Tyre / Wheel Area Deflation Detected',
        isComplex: false,
        type: 'SIMPLE',
        badgeText: 'SIMPLE PROBLEM',
        advice: 'You may be able to solve this yourself.',
        steps: [
          'Visually inspect the tyre sidewall for rim damage.',
          'Check tyre pressure with a handheld gauge.',
          'Inflate using a 12V portable pump or mount the spare wheel.'
        ]
      };
    }

    const lower = (typedText || '').toLowerCase();
    for (const item of KNOWLEDGE_BASE) {
      if (item.keywords.some((kw) => lower.includes(kw))) {
        return item;
      }
    }

    // Default fallback
    return {
      problem: 'General Powertrain or Sensor Discrepancy',
      isComplex: true,
      type: 'COMPLEX',
      badgeText: 'COMPLEX PROBLEM',
      advice: 'Professional mechanic assistance is recommended.',
      steps: [
        'Check dashboard cluster for any glowing warning lights.',
        'Inspect fluid levels (Engine oil, coolant, brake fluid).',
        'Have a nearby garage connect an OBD diagnostic scanner to read error codes.'
      ]
    };
  }
};
