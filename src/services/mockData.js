// Seed data for MECH CONNECT AI Platform

export const MOCK_MECHANICS = [
  {
    id: 'mech-1',
    name: 'Apex Precision Automotive & EV Lab',
    owner: 'Marcus Vance (Master ASE L1 & EV Specialist)',
    rating: 4.95,
    reviewCount: 342,
    distanceKm: 1.8,
    lat: 37.7749,
    lng: -122.4194,
    address: '450 10th St, SoMa, San Francisco, CA',
    phone: '+1 (415) 890-2341',
    hourlyRate: 110,
    isOpen247: false,
    isMobileUnit: false,
    hasTowTruck: true,
    specialties: ['EV & Hybrid Powertrains', 'Engine Diagnostics', 'Electrical Systems', 'Tesla & German Autos'],
    certifications: ['ASE Master Certified', 'Tesla Certified Partner', 'Bosch Car Service'],
    responseTimeMins: 15,
    image: 'https://images.unsplash.com/photo-1613214149922-f1809c99b414?auto=format&fit=crop&w=600&q=80',
    experienceYears: 16,
    verifiedBadge: true,
    services: [
      { name: 'Full AI Diagnostic & OBD-II Scan', price: 65, duration: '30 mins' },
      { name: 'Brake Pad & Rotor Replacement', price: 240, duration: '90 mins' },
      { name: 'EV High-Voltage Battery Health Test', price: 120, duration: '45 mins' },
      { name: 'Synthetic Oil & Filter Service', price: 75, duration: '30 mins' },
    ]
  },
  {
    id: 'mech-2',
    name: 'RapidRescue 24/7 Mobile Mechanics',
    owner: 'Dave Miller (Mobile Field Specialist)',
    rating: 4.88,
    reviewCount: 512,
    distanceKm: 2.4,
    lat: 37.7833,
    lng: -122.4167,
    address: 'Mobile Fleet Unit #12 (Downtown Metro Area)',
    phone: '+1 (415) 555-0199',
    hourlyRate: 95,
    isOpen247: true,
    isMobileUnit: true,
    hasTowTruck: false,
    specialties: ['Emergency Roadside Rescue', 'Dead Battery Jump/Replace', 'Flat Tyre Repair', 'On-Site Alternator & Starter'],
    certifications: ['AAA Certified Mobile Tech', 'ASE A6 & A8'],
    responseTimeMins: 8,
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=600&q=80',
    experienceYears: 12,
    verifiedBadge: true,
    services: [
      { name: 'Emergency Mobile Dispatch & Roadside Check', price: 49, duration: 'Immediate' },
      { name: 'Mobile Battery Replacement (Parts + Labor)', price: 169, duration: '20 mins' },
      { name: 'Flat Tyre Mount & Inflation', price: 55, duration: '25 mins' },
      { name: 'On-Spot Lockout Extraction', price: 65, duration: '15 mins' },
    ]
  },
  {
    id: 'mech-3',
    name: 'Golden Gate Heavy Towing & Road Recovery',
    owner: 'Samantha Cruz (Fleet Dispatch Director)',
    rating: 4.91,
    reviewCount: 289,
    distanceKm: 3.1,
    lat: 37.7690,
    lng: -122.4467,
    address: '880 Harrison St, San Francisco, CA',
    phone: '+1 (415) 777-4433',
    hourlyRate: 120,
    isOpen247: true,
    isMobileUnit: false,
    hasTowTruck: true,
    specialties: ['Flatbed Flat-Towing', 'Accident Winching & Recovery', 'Low-Clearance Garage Towing', 'Heavy Duty'],
    certifications: ['TRAA Certified Recovery', 'WreckMaster Level 5'],
    responseTimeMins: 12,
    image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=600&q=80',
    experienceYears: 20,
    verifiedBadge: true,
    services: [
      { name: 'Standard Flatbed Tow (Up to 10 miles)', price: 89, duration: 'Immediate' },
      { name: 'Accident Scene Winching & Transport', price: 149, duration: 'Immediate' },
      { name: 'Underground Parking Low-Profile Rescue', price: 110, duration: 'Immediate' }
    ]
  },
  {
    id: 'mech-4',
    name: 'EuroTech Performance & Transmission Hub',
    owner: 'Hans Weber (BMW & Porsche Master Guild)',
    rating: 4.97,
    reviewCount: 420,
    distanceKm: 4.2,
    lat: 37.7550,
    lng: -122.4220,
    address: '2210 Mission St, San Francisco, CA',
    phone: '+1 (415) 321-9876',
    hourlyRate: 140,
    isOpen247: false,
    isMobileUnit: false,
    hasTowTruck: false,
    specialties: ['German Imports (BMW/Audi/Merc/Porsche)', 'Dual-Clutch & Auto Transmissions', 'Turbo & Supercharger Systems'],
    certifications: ['ASE Master Tech', 'BMW Master Guild', 'Mercedes-Benz Star Master'],
    responseTimeMins: 20,
    image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=600&q=80',
    experienceYears: 22,
    verifiedBadge: true,
    services: [
      { name: 'Transmission Diagnostic & Fluid Flush', price: 280, duration: '2 hrs' },
      { name: 'Turbocharger Boost Pressure & Smoke Test', price: 150, duration: '1 hr' },
      { name: 'Complete German Inspection II', price: 210, duration: '90 mins' }
    ]
  },
  {
    id: 'mech-5',
    name: 'EcoDrive Hybrid & Electric Specialists',
    owner: 'Elena Rostova (High-Voltage Safety Lead)',
    rating: 4.92,
    reviewCount: 198,
    distanceKm: 2.8,
    lat: 37.7600,
    lng: -122.4100,
    address: '142 Potrero Ave, San Francisco, CA',
    phone: '+1 (415) 440-1928',
    hourlyRate: 115,
    isOpen247: false,
    isMobileUnit: true,
    hasTowTruck: false,
    specialties: ['Toyota/Lexus Hybrid Inverters', 'Tesla Drive Units', 'Battery Degradation Testing', 'Regen Brake Systems'],
    certifications: ['ASE L3 Hybrid/EV', 'SAE HV Safety Standard J2990'],
    responseTimeMins: 18,
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=80',
    experienceYears: 10,
    verifiedBadge: true,
    services: [
      { name: 'Hybrid Battery Reconditioning', price: 650, duration: '3 hrs' },
      { name: 'EV Brake Bleed & Regen Calibrate', price: 180, duration: '1 hr' },
      { name: 'Inverter Coolant System Service', price: 135, duration: '45 mins' }
    ]
  },
  {
    id: 'mech-6',
    name: 'Mission Express Brakes, Tyres & Suspension',
    owner: 'Carlos Ortiz',
    rating: 4.84,
    reviewCount: 376,
    distanceKm: 1.2,
    lat: 37.7650,
    lng: -122.4180,
    address: '1980 Folsom St, San Francisco, CA',
    phone: '+1 (415) 626-7788',
    hourlyRate: 85,
    isOpen247: false,
    isMobileUnit: false,
    hasTowTruck: false,
    specialties: ['Brakes & Rotors', 'Laser Wheel Alignment', 'Shocks & Struts', 'All-Season Tyres'],
    certifications: ['ASE A4 & A5', 'Hunter Alignment Certified'],
    responseTimeMins: 10,
    image: 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?auto=format&fit=crop&w=600&q=80',
    experienceYears: 14,
    verifiedBadge: true,
    services: [
      { name: 'Ceramic Brake Pad Replacement (Axle)', price: 189, duration: '1 hr' },
      { name: '4-Wheel Precision Laser Alignment', price: 89, duration: '45 mins' },
      { name: 'Tyre Rotation & Dynamic Balancing', price: 45, duration: '30 mins' }
    ]
  }
];

export const MOCK_OBD_CODES = [
  {
    code: 'P0300',
    title: 'Random / Multiple Cylinder Misfire Detected',
    system: 'Ignition / Fuel System',
    severity: 'High',
    severityColor: 'amber',
    canDrive: 'Limited (Drive immediately to mechanic; do not exceed 45 mph)',
    symptoms: ['Engine shaking or vibrating at idle', 'Loss of acceleration power', 'Flashing Check Engine Light', 'Fuel smell from exhaust'],
    causes: ['Worn spark plugs or ignition coils', 'Faulty fuel injector', 'Vacuum leak in intake manifold', 'Low fuel pressure'],
    diyDifficulty: 'Moderate (Spark plugs can be DIY if experienced)',
    estimatedCost: { min: 120, max: 480, parts: 60, labor: 140 },
    recommendation: 'Inspect ignition coils and spark plugs first. If Check Engine light is flashing, pull over to prevent catalytic converter meltdown.'
  },
  {
    code: 'P0420',
    title: 'Catalytic Converter System Efficiency Below Threshold (Bank 1)',
    system: 'Exhaust & Emissions',
    severity: 'Medium',
    severityColor: 'amber',
    canDrive: 'Yes (Safe for regular driving, but will fail emissions inspection)',
    symptoms: ['Check Engine Light illuminated', 'Slight drop in fuel economy', 'Sluggish highway acceleration', 'Rotten egg sulfur smell from exhaust'],
    causes: ['Degraded catalytic converter substrate', 'Faulty downstream O2 oxygen sensor', 'Exhaust leak near converter', 'Unburned fuel entering exhaust'],
    diyDifficulty: 'Hard (Requires exhaust welding or specialized sensor sockets)',
    estimatedCost: { min: 350, max: 1400, parts: 450, labor: 200 },
    recommendation: 'Have an AI technician verify if the oxygen sensor is failing before purchasing an expensive catalytic converter.'
  },
  {
    code: 'P0171',
    title: 'System Too Lean (Bank 1)',
    system: 'Air & Fuel Metering',
    severity: 'Medium',
    severityColor: 'amber',
    canDrive: 'Yes (Avoid heavy acceleration or towing)',
    symptoms: ['Rough idle or stalling when stopped', 'Hesitation when pressing accelerator', 'Whistling or hissing noise under hood', 'Decreased gas mileage'],
    causes: ['Dirty or faulty Mass Air Flow (MAF) sensor', 'Intake vacuum leak (cracked PCV hose)', 'Clogged fuel filter or weak fuel pump'],
    diyDifficulty: 'Easy to Moderate (Cleaning MAF sensor is a 10-minute DIY task)',
    estimatedCost: { min: 45, max: 320, parts: 30, labor: 95 },
    recommendation: 'Perform MAF sensor cleaning with electronic cleaner spray and inspect rubber vacuum intake tubes for cracks.'
  },
  {
    code: 'P0128',
    title: 'Coolant Thermostat Below Thermostat Regulating Temperature',
    system: 'Engine Cooling',
    severity: 'Low',
    severityColor: 'cyan',
    canDrive: 'Yes (Engine may take longer to warm up; cabin heater may blow lukewarm)',
    symptoms: ['Temperature gauge stays below middle line', 'Cabin heater takes long to blow hot air', 'Slightly higher fuel consumption in winter'],
    causes: ['Engine coolant thermostat stuck open', 'Defective Engine Coolant Temperature (ECT) sensor', 'Low coolant level'],
    diyDifficulty: 'Moderate',
    estimatedCost: { min: 95, max: 260, parts: 40, labor: 120 },
    recommendation: 'Replace thermostat and perform coolant bleed cycle to restore optimal engine operating temperatures.'
  },
  {
    code: 'P0700',
    title: 'Transmission Control System (TCM) Malfunction Indicator',
    system: 'Transmission & Drivetrain',
    severity: 'Critical',
    severityColor: 'rose',
    canDrive: 'No / Emergency (Vehicle may enter Limp Mode locked in 3rd gear)',
    symptoms: ['Transmission slipping or delayed gear shift', 'Vehicle stuck in 2nd or 3rd gear (Limp Home Mode)', 'Harsh clunk when shifting into Drive or Reverse', 'Overheating transmission warning'],
    causes: ['Low or burnt transmission fluid', 'Faulty shift solenoid valve', 'Wiring harness damage to TCM', 'Internal transmission mechanical wear'],
    diyDifficulty: 'Professional Only',
    estimatedCost: { min: 180, max: 1900, parts: 250, labor: 350 },
    recommendation: 'Pull over safely and request emergency roadside tow or mobile transmission diagnostics to avoid catastrophic gearbox failure.'
  },
  {
    code: 'C0035',
    title: 'Left Front Wheel Speed Sensor Circuit Fault',
    system: 'ABS & Traction Control',
    severity: 'Medium',
    severityColor: 'amber',
    canDrive: 'Yes (Standard braking works, but ABS and Traction Control are disabled)',
    symptoms: ['ABS and Traction Control (ESC) lights on dashboard', 'Pulsing brake pedal at low speeds without lockup', 'Hill Start Assist unavailable'],
    causes: ['Damaged wheel speed sensor wiring harness', 'Accumulated metal shavings on tone ring', 'Failed hub wheel bearing with integrated sensor'],
    diyDifficulty: 'Moderate (Wheel removal required)',
    estimatedCost: { min: 85, max: 280, parts: 65, labor: 110 },
    recommendation: 'Inspect the wheel speed sensor wiring near the steering knuckle for road debris damage or rodent chewing.'
  },
  {
    code: 'P0455',
    title: 'Evaporative Emission (EVAP) System Gross Leak Detected',
    system: 'Emissions & Fuel Tank Vapor',
    severity: 'Low',
    severityColor: 'cyan',
    canDrive: 'Yes (No risk to vehicle mechanical health, but will increase vapor emissions)',
    symptoms: ['Check Engine Light on', 'Faint gasoline odor near rear of vehicle', 'No noticeable performance change'],
    causes: ['Loose, missing, or cracked gas fuel filler cap', 'Defective purge valve or vent solenoid', 'Cracked EVAP vapor canister hose'],
    diyDifficulty: 'Easy (Check gas cap first)',
    estimatedCost: { min: 15, max: 190, parts: 20, labor: 80 },
    recommendation: 'Check that your fuel cap is tightened at least 3 clicks. If problem persists after 2 drive cycles, replace EVAP purge valve.'
  }
];

export const MOCK_ACOUSTIC_SAMPLES = [
  {
    id: 'sound-1',
    name: 'Deep Metallic Engine Knock (Rod Bearing)',
    category: 'Engine Internal',
    severity: 'Critical',
    severityColor: 'rose',
    confidenceScore: 97.4,
    description: 'Rhythmic, deep metal-on-metal thumping sound that speeds up with engine RPM and gets louder under load.',
    likelyRootCause: 'Worn connecting rod bearings or excessive crankshaft clearance due to low oil pressure.',
    dangerLevel: 'Catastrophic engine failure imminent. Do not drive.',
    frequencyHz: '120 - 350 Hz (Low-mid resonant metal strike)',
    estimatedCost: '$1,800 - $4,200',
    audioWaveform: [30, 45, 80, 95, 40, 20, 30, 85, 90, 45, 25, 35, 90, 100, 50, 20, 35, 85, 95, 40]
  },
  {
    id: 'sound-2',
    name: 'High-Pitched Squeal on Cold Start (Serpentine Belt)',
    category: 'Belt & Accessories',
    severity: 'Moderate',
    severityColor: 'amber',
    confidenceScore: 98.8,
    description: 'Shrill, piercing squeal that sounds when starting the car in cold weather or turning on the A/C or turning the steering wheel.',
    likelyRootCause: 'Loose or glazed serpentine drive belt, weak automatic belt tensioner, or misaligned alternator pulley.',
    dangerLevel: 'Safe to drive short distances, but belt may snap causing loss of power steering, alternator charging, and water pump cooling.',
    frequencyHz: '2,400 - 4,800 Hz (High harmonic friction squeal)',
    estimatedCost: '$95 - $230',
    audioWaveform: [85, 90, 95, 90, 88, 92, 95, 98, 92, 90, 94, 96, 90, 88, 95, 92, 90, 85, 90, 92]
  },
  {
    id: 'sound-3',
    name: 'Harsh Metal Grinding on Braking',
    category: 'Braking System',
    severity: 'High',
    severityColor: 'rose',
    confidenceScore: 96.2,
    description: 'Coarse sandpaper or metallic grinding sound whenever the brake pedal is pressed.',
    likelyRootCause: 'Brake pad friction material completely worn down to bare metal backing plate contacting rotor.',
    dangerLevel: 'Severe reduction in stopping power and rotor gouging. Immediate pad & rotor replacement required.',
    frequencyHz: '800 - 1,600 Hz (Broadband metallic abrasion)',
    estimatedCost: '$220 - $460',
    audioWaveform: [40, 70, 65, 80, 75, 85, 90, 85, 80, 75, 70, 85, 80, 75, 85, 90, 80, 70, 60, 50]
  },
  {
    id: 'sound-4',
    name: 'Low Rhythmic Drone / Airplane Sound at 45+ MPH',
    category: 'Wheel & Drivetrain',
    severity: 'Moderate',
    severityColor: 'amber',
    confidenceScore: 94.7,
    description: 'Deep humming or growling sound that gets louder as vehicle speed increases and changes pitch when veering left or right.',
    likelyRootCause: 'Pitted or dry wheel hub bearing race.',
    dangerLevel: 'Bearing can seize or cause wheel wobble over time if neglected.',
    frequencyHz: '200 - 600 Hz (Speed-dependent rotational hum)',
    estimatedCost: '$240 - $480',
    audioWaveform: [25, 30, 40, 50, 60, 70, 75, 80, 80, 75, 70, 65, 60, 55, 50, 45, 40, 35, 30, 25]
  },
  {
    id: 'sound-5',
    name: 'Ticking / Clicking Sound at Engine Top (Valve Lifter)',
    category: 'Valvetrain',
    severity: 'Moderate',
    severityColor: 'amber',
    confidenceScore: 93.1,
    description: 'Fast, sewing-machine-like clicking sound from top of cylinder head, matching half engine RPM.',
    likelyRootCause: 'Hydraulic lifter not getting sufficient oil pressure, varnished lifter, or worn rocker arm.',
    dangerLevel: 'Safe for driving if oil level is full; check engine oil immediately.',
    frequencyHz: '600 - 1,200 Hz (Periodic tap)',
    estimatedCost: '$140 - $680',
    audioWaveform: [15, 65, 20, 70, 20, 65, 18, 72, 22, 68, 19, 70, 20, 65, 18, 70, 20, 65, 18, 70]
  }
];

export const MOCK_WARNING_LIGHTS = [
  {
    id: 'light-engine',
    name: 'Check Engine (MIL)',
    iconType: 'engine',
    color: '#F59E0B',
    severity: 'Medium to High',
    description: 'Engine management system detected an emissions, sensor, or combustion fault.',
    action: 'Scan with OBD-II tool. If flashing, pull over immediately.',
    urgencyScore: 85
  },
  {
    id: 'light-oil',
    name: 'Low Engine Oil Pressure',
    iconType: 'oil',
    color: '#E11D48',
    severity: 'Critical / Stop Immediately',
    description: 'Oil pressure has dropped below safe threshold. Engine lubrication is failing.',
    action: 'SHUT OFF ENGINE IMMEDIATELY. Check oil dipstick. Do NOT restart if dry.',
    urgencyScore: 100
  },
  {
    id: 'light-battery',
    name: 'Charging System / Battery Alert',
    iconType: 'battery',
    color: '#E11D48',
    severity: 'High',
    description: 'Alternator is not charging 12V battery. Car will stall once battery drains (approx 10-25 mins).',
    action: 'Turn off A/C, radio, headlights if safe. Drive to nearest repair center.',
    urgencyScore: 90
  },
  {
    id: 'light-temp',
    name: 'Engine Coolant Overheating',
    iconType: 'temp',
    color: '#E11D48',
    severity: 'Critical',
    description: 'Engine coolant has exceeded safe boiling threshold (230°F+). Risk of blown head gasket or warped engine head.',
    action: 'Pull over, turn off engine, turn cabin heat to MAX while rolling to bleed heat. DO NOT open radiator cap when hot.',
    urgencyScore: 98
  },
  {
    id: 'light-brakes',
    name: 'Brake System Warning',
    iconType: 'brakes',
    color: '#E11D48',
    severity: 'Critical',
    description: 'Low brake fluid level, parking brake engaged, or hydraulic pressure loss in dual circuit.',
    action: 'Verify parking brake is off. Check brake pedal firmness. If spongy, do not drive.',
    urgencyScore: 95
  },
  {
    id: 'light-abs',
    name: 'Anti-lock Braking System (ABS)',
    iconType: 'abs',
    color: '#F59E0B',
    severity: 'Medium',
    description: 'ABS safety assist is offline due to sensor or valve issue. Standard hydraulic brakes remain functional.',
    action: 'Drive cautiously, especially in wet/icy conditions. Schedule sensor inspection.',
    urgencyScore: 60
  },
  {
    id: 'light-tpms',
    name: 'Tyre Pressure Monitoring (TPMS)',
    iconType: 'tpms',
    color: '#F59E0B',
    severity: 'Low to Medium',
    description: 'One or more tyres has dropped 25% or more below recommended PSI.',
    action: 'Inspect tyres for punctures/nails. Inflate to door-jamb PSI specification.',
    urgencyScore: 50
  }
];

export const MOCK_EMERGENCY_SERVICES = [
  {
    id: 'sos-jumpstart',
    name: '12V Battery Jumpstart & Diagnostic',
    icon: 'BatteryCharging',
    etaMins: 12,
    basePrice: 49,
    description: 'Rapid on-site booster pack start + alternator voltage test.',
    popular: true
  },
  {
    id: 'sos-tyre',
    name: 'Emergency Flat Tyre Swap & Air Fill',
    icon: 'Disc',
    etaMins: 15,
    basePrice: 55,
    description: 'Spare tyre mount or heavy-duty tyre plug seal on the roadside.',
    popular: true
  },
  {
    id: 'sos-tow',
    name: 'Flatbed Tow Truck Dispatch (Up to 10 mi)',
    icon: 'Truck',
    etaMins: 18,
    basePrice: 89,
    description: 'Safe damage-free transport for AWD, EV, low-clearance, and standard cars.',
    popular: true
  },
  {
    id: 'sos-fuel',
    name: 'Emergency Fuel Delivery (2.5 Gallons)',
    icon: 'Fuel',
    etaMins: 14,
    basePrice: 45,
    description: 'Gasoline or Diesel brought straight to your stranded GPS location.',
    popular: false
  },
  {
    id: 'sos-lockout',
    name: 'Vehicle Lockout Rescue',
    icon: 'KeyRound',
    etaMins: 16,
    basePrice: 65,
    description: 'Non-destructive door lock opening with scratch-free air wedge tools.',
    popular: false
  },
  {
    id: 'sos-winch',
    name: 'Winch-Out & Mud/Snow Recovery',
    icon: 'Anchor',
    etaMins: 22,
    basePrice: 129,
    description: 'Extraction from snowbanks, mud trenches, ditches, or steep driveways.',
    popular: false
  }
];

export const MOCK_VEHICLES = [
  {
    id: 'veh-1',
    make: 'Tesla',
    model: 'Model Y Long Range',
    year: 2023,
    trim: 'AWD Dual Motor',
    vin: '5YJ3E1EB6PF928174',
    licensePlate: '7XYZ892 (CA)',
    mileage: 28450,
    healthScore: 94,
    fuelType: 'Electric',
    batteryHealth: 98,
    status: 'Healthy',
    oilLifePercent: null,
    brakePadLifePercent: 88,
    tyreTreadPercent: 78,
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=600&q=80',
    upcomingServices: [
      { item: 'Cabin Air Filter & HEPA Replacement', dueDate: 'In 3,500 mi', priority: 'Low' },
      { item: 'Brake Fluid Moisture Test', dueDate: 'In 6 months', priority: 'Medium' }
    ]
  },
  {
    id: 'veh-2',
    make: 'Toyota',
    model: 'RAV4 Hybrid',
    year: 2021,
    trim: 'XLE Premium AWD',
    vin: '2T3C1RFV8MC118239',
    licensePlate: '9MCV441 (CA)',
    mileage: 48920,
    healthScore: 88,
    fuelType: 'Hybrid',
    batteryHealth: 95,
    status: 'Maintenance Due Soon',
    oilLifePercent: 18,
    brakePadLifePercent: 62,
    tyreTreadPercent: 65,
    image: 'https://images.unsplash.com/photo-1581540222194-0def2dda95b8?auto=format&fit=crop&w=600&q=80',
    upcomingServices: [
      { item: '0W-16 Full Synthetic Oil & Filter Change', dueDate: 'Due in 250 miles', priority: 'High' },
      { item: 'Tyre Rotation & Pressure Balancing', dueDate: 'Due in 250 miles', priority: 'High' },
      { item: 'Engine Air & Hybrid Battery Filter Inspection', dueDate: 'In 1,500 mi', priority: 'Medium' }
    ]
  },
  {
    id: 'veh-3',
    make: 'BMW',
    model: '330i xDrive',
    year: 2019,
    trim: 'M Sport Package',
    vin: 'WBA5R7C58KFN19382',
    licensePlate: '6BMR103 (CA)',
    mileage: 64200,
    healthScore: 81,
    fuelType: 'Gasoline Turbo',
    batteryHealth: 82,
    status: 'Warning Detected',
    oilLifePercent: 45,
    brakePadLifePercent: 35,
    tyreTreadPercent: 55,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=600&q=80',
    upcomingServices: [
      { item: 'Front Ceramic Brake Pads & Rotors (35% remaining)', dueDate: 'Attention Needed', priority: 'High' },
      { item: 'Spark Plugs & Ignition Coil Inspection', dueDate: 'In 5,800 mi', priority: 'Medium' },
      { item: 'Brake Fluid Flush (DOT 4 LV)', dueDate: 'In 2 months', priority: 'Medium' }
    ]
  }
];

export const MOCK_REVIEWS = [
  {
    id: 'rev-1',
    author: 'Sarah Jenkins',
    role: 'Tesla Model 3 Owner',
    rating: 5,
    date: '2 days ago',
    comment: 'The AI Audio diagnostic listened to my squeaking wheel for 10 seconds and accurately diagnosed a worn bearing. RapidRescue mobile tech came out in 14 minutes and replaced it right in my driveway!',
    verified: true,
    service: 'Mobile Roadside Diagnostics'
  },
  {
    id: 'rev-2',
    author: 'David Kim',
    role: 'Toyota Tacoma Driver',
    rating: 5,
    date: '1 week ago',
    comment: 'Check Engine light flashed on the freeway at 11 PM. Mech Connect AI gave me the exact P0300 misfire cause, told me not to drive it fast, and connected me with Apex Precision who had it fixed first thing in the morning.',
    verified: true,
    service: 'Emergency AI Triage & Repair'
  },
  {
    id: 'rev-3',
    author: 'Elena Gomez',
    role: 'Honda Civic Owner',
    rating: 5,
    date: '3 weeks ago',
    comment: 'Saved over $450 compared to the dealership quote! Transparent cost estimator breakdown gave me the exact parts vs labor quote before I even stepped into the workshop.',
    verified: true,
    service: 'Brake Replacement & Inspection'
  }
];

export const MOCK_COST_ESTIMATOR_CATEGORIES = [
  {
    category: 'Brakes & Rotors',
    items: [
      { service: 'Front Brake Pads & Rotors Replacement', mechPrice: 240, dealerPrice: 480, parts: 95, labor: 145 },
      { service: 'Rear Brake Pads & Rotors Replacement', mechPrice: 220, dealerPrice: 450, parts: 85, labor: 135 },
      { service: 'Brake Fluid Bleed & Flush', mechPrice: 85, dealerPrice: 190, parts: 25, labor: 60 },
      { service: 'Brake Caliper Replacement (Single)', mechPrice: 195, dealerPrice: 380, parts: 110, labor: 85 }
    ]
  },
  {
    category: 'Engine & Electrical Diagnostics',
    items: [
      { service: 'Comprehensive OBD-II & Live Sensor Diagnostics', mechPrice: 65, dealerPrice: 175, parts: 0, labor: 65 },
      { service: 'Alternator Replacement (Parts + Labor)', mechPrice: 340, dealerPrice: 680, parts: 190, labor: 150 },
      { service: 'Starter Motor Replacement', mechPrice: 290, dealerPrice: 590, parts: 160, labor: 130 },
      { service: '12V AGM Battery Replacement & Registration', mechPrice: 185, dealerPrice: 340, parts: 145, labor: 40 },
      { service: 'Ignition Coils & Spark Plugs (4-Cylinder)', mechPrice: 210, dealerPrice: 460, parts: 110, labor: 100 }
    ]
  },
  {
    category: 'Cooling & Fluids',
    items: [
      { service: 'Radiator Replacement & Coolant Flush', mechPrice: 420, dealerPrice: 890, parts: 220, labor: 200 },
      { service: 'Water Pump & Thermostat Replacement', mechPrice: 380, dealerPrice: 780, parts: 180, labor: 200 },
      { service: 'Full Synthetic Oil & Filter Service', mechPrice: 65, dealerPrice: 125, parts: 35, labor: 30 },
      { service: 'Transmission Fluid & Filter Exchange', mechPrice: 180, dealerPrice: 360, parts: 75, labor: 105 }
    ]
  },
  {
    category: 'Suspension & Steering',
    items: [
      { service: 'Front Struts & Shock Absorbers (Pair)', mechPrice: 490, dealerPrice: 980, parts: 260, labor: 230 },
      { service: 'Wheel Hub & Bearing Replacement (Single)', mechPrice: 260, dealerPrice: 520, parts: 130, labor: 130 },
      { service: '4-Wheel Computerized Laser Alignment', mechPrice: 89, dealerPrice: 180, parts: 0, labor: 89 },
      { service: 'Control Arm & Ball Joint Assembly', mechPrice: 310, dealerPrice: 650, parts: 160, labor: 150 }
    ]
  }
];
