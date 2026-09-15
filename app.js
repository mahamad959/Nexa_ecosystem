/* ============================================================
   NEXA — Technology Ecosystem
   Single-file React application (JSX via Babel standalone)
   ============================================================ */

const { useState, useEffect, useRef, useMemo, useCallback } = React;

/* ------------------------------------------------------------
   HELPERS
   ------------------------------------------------------------ */
const fmt = (n) => Number(n).toLocaleString('en-US');
const IQD = (n) => fmt(n) + ' IQD';

/* ------------------------------------------------------------
   CORE DATA
   ------------------------------------------------------------ */
const ECOSYSTEM = [
  { ico:'🛒', t:'Shop', e:'Retail', d:'Electronics, components and accessories with honest availability — in stock, 2–3 days, or on request.' },
  { ico:'🧩', t:'Build', e:'Packages', d:'A configurator that turns “what I want to do” into a compatible, tested, ready-to-run package.' },
  { ico:'🎓', t:'Projects', e:'Project Lab', d:'University and engineering project kits with PCB, enclosure, documentation and demo support.' },
  { ico:'🔬', t:'Lab', e:'Education', d:'DIY and learning kits, sensors and tutorials in Kurdish, Arabic and English.' },
  { ico:'🔧', t:'Services', e:'Service', d:'Assembly, installation, repair, configuration and on-site technical support.' },
  { ico:'🏢', t:'Business', e:'B2B', d:'Complete technology packages for restaurants, offices, schools, shops and clinics.' },
  { ico:'♻️', t:'Market', e:'Marketplace', d:'Verified, graded and warrantied used electronics — not another unmoderated classifieds board.' },
  { ico:'⏳', t:'Rent', e:'Rental', d:'Short-term equipment rental for events, exams, exhibitions and temporary projects.' },
  { ico:'🔁', t:'Trade-in', e:'Circular', d:'Turn an old device into credit against a new build. You pay less, we gain inventory.' },
  { ico:'💠', t:'Membership', e:'Recurring', d:'Tech Club: warranty, priority support, discounts and annual maintenance in one subscription.' }
];

const MARQUEE = ['Shop','Build','Projects','Lab','Services','Business','Market','Rent','Trade-in','Membership','Compatibility guarantee','Tech Lab reports','Kurdish · Arabic · English'];

const GOALS = [
  { id:'gaming',      ico:'🎮', label:'Play games' },
  { id:'engineering', ico:'🎓', label:'Study engineering' },
  { id:'programming', ico:'💻', label:'Program' },
  { id:'editing',     ico:'🎬', label:'Edit video' },
  { id:'design',      ico:'🎨', label:'Design' },
  { id:'office',      ico:'🏢', label:'Build an office' },
  { id:'smarthome',   ico:'🏠', label:'Build a smart home' },
  { id:'security',    ico:'📹', label:'Install CCTV' },
  { id:'robotics',    ico:'🤖', label:'Build a robot' },
  { id:'project',     ico:'🔬', label:'University project' },
  { id:'youtube',     ico:'🎥', label:'Start a YouTube channel' }
];

const BUDGETS = [
  { v:500000,  l:'500,000 IQD' },
  { v:750000,  l:'750,000 IQD' },
  { v:1000000, l:'1,000,000 IQD' },
  { v:1500000, l:'1,500,000 IQD' },
  { v:2000000, l:'2,000,000+ IQD' }
];

const LBL = {
  cpu:'Processor', gpu:'Graphics card', ram:'Memory', ssd:'Storage', mb:'Motherboard',
  psu:'Power supply', cooler:'Cooling', kase:'Case', monitor:'Monitor', monitor2:'Second monitor',
  input:'Keyboard & mouse', headset:'Headset', pen:'Pen / input device',
  extra:'Extra', extra2:'Extra', service:'Service & assembly'
};

const pc = (o) => Object.keys(o).filter(k => o[k]).map(k => ({ n: LBL[k] || k, v: o[k][0], p: o[k][1] }));

const OPTIONAL = new Set(['Monitor','Second monitor','Keyboard & mouse','Headset','Pen / input device','Extra','Extra 2','Service & assembly']);

const BUILDS = {
  gaming: [
    pc({ cpu:['AMD Ryzen 5 5600 (6C/12T)',130000], gpu:['GTX 1650 4GB',155000], ram:['16GB DDR4 3200MHz',45000], ssd:['512GB NVMe SSD',40000], mb:['B450M motherboard',60000], psu:['550W 80+ Bronze',45000], kase:['Airflow mid-tower',35000], monitor:['24" 75Hz IPS',100000], input:['Keyboard + mouse',30000], service:['Assembly + stress test',25000] }),
    pc({ cpu:['AMD Ryzen 5 7600',220000], gpu:['RTX 4060 8GB',400000], ram:['32GB DDR5 5600MHz',130000], ssd:['1TB NVMe Gen4',90000], mb:['B650M motherboard',175000], psu:['650W 80+ Bronze',70000], cooler:['240mm AIO',90000], kase:['Mesh mid-tower + 4 fans',55000], monitor:['27" 165Hz IPS',180000], input:['Mechanical keyboard + gaming mouse',75000], headset:['7.1 gaming headset',55000], service:['Assembly + benchmark report',40000] }),
    pc({ cpu:['AMD Ryzen 7 7800X3D',500000], gpu:['RTX 4070 Super 12GB',950000], ram:['32GB DDR5 6000 CL30',165000], ssd:['2TB NVMe Gen4',175000], mb:['B650 ATX',230000], psu:['750W 80+ Gold',120000], cooler:['360mm AIO',165000], kase:['Premium airflow tower',95000], monitor:['27" 240Hz',430000], input:['Mechanical + pro mouse',150000], headset:['Wireless gaming headset',130000], extra:['Gaming desk',180000], service:['Assembly + optimization',60000] })
  ],
  engineering: [
    pc({ cpu:['AMD Ryzen 5 5600',130000], gpu:['RTX 3050 8GB',260000], ram:['32GB DDR4 3200MHz',85000], ssd:['1TB NVMe SSD',90000], mb:['B550M motherboard',95000], psu:['650W 80+ Bronze',70000], kase:['Mid-tower',40000], monitor:['24" IPS 75Hz',110000], input:['Keyboard + mouse',30000], service:['Assembly + thermal test',25000] }),
    pc({ cpu:['AMD Ryzen 7 7700',320000], gpu:['RTX 4060 8GB',400000], ram:['32GB DDR5 5600MHz',130000], ssd:['1TB NVMe Gen4',90000], mb:['B650M motherboard',175000], psu:['750W 80+ Gold',120000], cooler:['240mm AIO',90000], kase:['Airflow mid-tower',55000], monitor:['27" 2K IPS',250000], input:['Mechanical keyboard + mouse',75000], service:['Assembly + CAD benchmark',40000] }),
    pc({ cpu:['AMD Ryzen 9 7900X',620000], gpu:['RTX 4070 Ti Super 16GB',1250000], ram:['64GB DDR5 5600MHz',300000], ssd:['2TB NVMe Gen4',175000], mb:['X670 ATX',380000], psu:['850W 80+ Gold',160000], cooler:['360mm AIO',165000], kase:['Full tower workstation',110000], monitor:['32" 4K IPS',520000], input:['Mechanical + precision mouse',150000], service:['Assembly + workstation validation',60000] })
  ],
  programming: [
    pc({ cpu:['AMD Ryzen 5 5600',130000], gpu:['GT 1030 2GB',75000], ram:['16GB DDR4 3200MHz',45000], ssd:['512GB NVMe SSD',40000], mb:['B450M motherboard',60000], psu:['550W 80+ Bronze',45000], kase:['Compact mid-tower',35000], monitor:['24" IPS 75Hz',100000], input:['Keyboard + mouse',30000], service:['Assembly + setup',25000] }),
    pc({ cpu:['AMD Ryzen 7 7700',320000], gpu:['RTX 3060 12GB',350000], ram:['32GB DDR5 5600MHz',130000], ssd:['1TB NVMe Gen4',90000], mb:['B650M motherboard',175000], psu:['650W 80+ Bronze',70000], cooler:['240mm AIO',90000], kase:['Airflow mid-tower',55000], monitor:['27" 2K IPS',250000], input:['Mechanical keyboard + mouse',75000], service:['Assembly + dev environment',40000] }),
    pc({ cpu:['AMD Ryzen 9 7900X',620000], gpu:['RTX 4070 12GB',850000], ram:['64GB DDR5 5600MHz',300000], ssd:['2TB NVMe Gen4',175000], mb:['X670 ATX',380000], psu:['850W 80+ Gold',160000], cooler:['360mm AIO',165000], kase:['Full tower',110000], monitor:['27" 2K 165Hz',320000], input:['Mechanical + pro mouse',150000], service:['Assembly + container toolchain',60000] })
  ],
  editing: [
    pc({ cpu:['AMD Ryzen 5 5600',130000], gpu:['GTX 1660 Super 6GB',220000], ram:['32GB DDR4 3200MHz',85000], ssd:['1TB NVMe SSD',90000], mb:['B450M motherboard',60000], psu:['600W 80+ Bronze',60000], kase:['Mid-tower',40000], monitor:['24" IPS 75Hz',110000], input:['Keyboard + mouse',30000], service:['Assembly + render test',25000] }),
    pc({ cpu:['AMD Ryzen 7 7700',320000], gpu:['RTX 4060 Ti 16GB',620000], ram:['32GB DDR5 5600MHz',130000], ssd:['2TB NVMe Gen4',175000], mb:['B650M motherboard',175000], psu:['750W 80+ Gold',120000], cooler:['240mm AIO',90000], kase:['Airflow mid-tower',55000], monitor:['27" 2K IPS',250000], input:['Mechanical keyboard + mouse',75000], service:['Assembly + colour setup',40000] }),
    pc({ cpu:['AMD Ryzen 9 7950X',850000], gpu:['RTX 4070 Ti Super 16GB',1250000], ram:['64GB DDR5 5600MHz',300000], ssd:['2TB NVMe Gen4',175000], extra:['4TB HDD archive drive',130000], mb:['X670 ATX',380000], psu:['850W 80+ Gold',160000], cooler:['360mm AIO',165000], kase:['Full tower',110000], monitor:['32" 4K IPS',620000], input:['Mechanical + pro mouse',150000], service:['Assembly + render farm setup',60000] })
  ],
  design: [
    pc({ cpu:['AMD Ryzen 5 5600',130000], gpu:['GTX 1650 4GB',155000], ram:['16GB DDR4 3200MHz',45000], ssd:['512GB NVMe SSD',40000], mb:['B450M motherboard',60000], psu:['550W 80+ Bronze',45000], kase:['Mid-tower',35000], monitor:['24" IPS 99% sRGB',130000], pen:['Graphics pen tablet',90000], service:['Assembly + calibration',25000] }),
    pc({ cpu:['AMD Ryzen 7 7700',320000], gpu:['RTX 3060 12GB',350000], ram:['32GB DDR5 5600MHz',130000], ssd:['1TB NVMe Gen4',90000], mb:['B650M motherboard',175000], psu:['650W 80+ Bronze',70000], cooler:['240mm AIO',90000], kase:['Airflow mid-tower',55000], monitor:['27" 2K 100% sRGB',320000], pen:['Pen display tablet',280000], service:['Assembly + colour profile',40000] }),
    pc({ cpu:['AMD Ryzen 9 7900X',620000], gpu:['RTX 4070 12GB',850000], ram:['64GB DDR5 5600MHz',300000], ssd:['2TB NVMe Gen4',175000], mb:['X670 ATX',380000], psu:['850W 80+ Gold',160000], cooler:['360mm AIO',165000], kase:['Full tower',110000], monitor:['32" 4K hardware-calibrated',780000], pen:['Professional pen display',620000], service:['Assembly + studio calibration',60000] })
  ],
  office: [
    pc({ cpu:['Intel Core i5-12400',165000], ram:['16GB DDR4 3200MHz',45000], ssd:['512GB NVMe SSD',40000], mb:['H610M motherboard',75000], psu:['500W 80+ Bronze',40000], kase:['Office chassis',30000], monitor:['24" IPS office',100000], input:['Keyboard + mouse',25000], extra:['Laser printer',180000], extra2:['Router + 8-port switch',120000], service:['Setup, imaging & cabling',40000] }),
    pc({ cpu:['3 × office PCs (i5 · 16GB · 512GB)',1350000], monitor:['3 × 24" IPS monitors',300000], input:['3 × keyboard + mouse',70000], extra:['Router + 16-port switch + Wi-Fi AP',260000], extra2:['Laser printer + scanner',320000], service:['Deployment, imaging & cabling',150000] }),
    pc({ cpu:['10 × office PCs (i5 · 16GB · 512GB)',4500000], monitor:['10 × 24" IPS monitors',1000000], input:['10 × keyboard + mouse',230000], extra:['Rack network: router, 24-port switch, 2 APs',750000], extra2:['Multifunction printer + UPS + backup',1000000], service:['Deployment, CCTV & staff training',600000] })
  ],
  smarthome: [
    pc({ cpu:['ESP32 controller hub',35000], extra:['4-channel relay module',18000], extra2:['PIR + door sensors ×4',35000], monitor:['OLED status display',15000], ram:['DHT22 temp/humidity sensor',12000], ssd:['Smart Wi-Fi plugs ×2',45000], psu:['Power supply + enclosure',30000], kase:['Wiring, connectors & trunking',15000], service:['Setup + mobile app configuration',60000] }),
    pc({ cpu:['ESP32 + Home Assistant mini PC',320000], extra:['8-channel relay board',35000], extra2:['Smart switches + dimmers ×6',240000], monitor:['Indoor IP camera',90000], ram:['Smart sensors pack (motion, door, temp)',120000], ssd:['Smart LED strip + controller',65000], psu:['Voice assistant speaker',120000], kase:['Wiring, enclosure & trunking',60000], service:['Professional installation & programming',120000] }),
    pc({ cpu:['Central controller + Home Assistant server',450000], extra:['Smart switches ×12',480000], extra2:['Smart curtain motors ×3',540000], monitor:['6 × IP cameras + NVR',1250000], ram:['Full sensor network (motion, door, climate, leak)',250000], ssd:['Smart door lock',320000], psu:['Rack, UPS & structured cabling',380000], kase:['Wall panels & touch controls',290000], service:['Installation, programming & handover',450000] })
  ],
  security: [
    pc({ cpu:['4 × 3MP IP cameras',320000], extra:['4-channel NVR + 1TB drive',250000], extra2:['PoE switch',120000], kase:['60m cabling + connectors',90000], service:['Installation & configuration',150000] }),
    pc({ cpu:['8 × 5MP IP cameras',800000], extra:['8-channel NVR + 2TB drive',420000], extra2:['16-port PoE switch',260000], kase:['150m cabling + trunking',200000], monitor:['Mobile app + remote access',60000], service:['Installation & commissioning',280000] }),
    pc({ cpu:['16 × 4K IP cameras',2400000], extra:['16-channel NVR + 8TB storage',950000], extra2:['24-port managed PoE switch',620000], kase:['Rack, UPS & structured cabling',700000], monitor:['Access control integration',850000], service:['Installation & commissioning',550000] })
  ],
  robotics: [
    pc({ cpu:['Arduino Uno R3',35000], extra:['L298N motor driver',15000], extra2:['Chassis + 2 DC motors + wheels',45000], ram:['Ultrasonic sensor HC-SR04',8000], ssd:['IR sensor array ×5',15000], psu:['Battery pack + holder',25000], kase:['Breadboard, jumpers & hardware',10000], service:['Code, documentation & assembly support',30000] }),
    pc({ cpu:['ESP32 + Arduino Nano combo',55000], extra:['4 × TT motors + driver board',60000], extra2:['4-DOF robotic arm',220000], ram:['PCA9685 servo driver',25000], ssd:['MPU6050 IMU + Bluetooth control',40000], psu:['Li-ion battery + charger',70000], kase:['3D-printed structural parts',60000], service:['Code, tutorial & build session',40000] }),
    pc({ cpu:['6-DOF robotic arm kit',850000], extra:['Raspberry Pi 4 + camera module',380000], extra2:['Computer-vision module',150000], ram:['High-torque servo set',420000], ssd:['Aluminium frame & mechanics',260000], psu:['Power system + drivers',180000], service:['ROS setup, training & documentation',300000] })
  ],
  project: [
    pc({ cpu:['ESP32 development board',35000], extra:['Sensor pack (DHT22, soil, PIR)',40000], extra2:['OLED + relay + buzzer',35000], kase:['Breadboard, jumpers & power',25000], ssd:['3D-printed enclosure',35000], service:['Documentation template, guide & 2h consultation',80000] }),
    pc({ cpu:['ESP32 + sensor/actuator set',120000], extra:['Custom PCB design + fabrication',180000], extra2:['3D-printed enclosure',60000], kase:['Full documentation + block diagrams',80000], ssd:['Video tutorial + source code',60000], service:['Demo support & 5h consultation',190000] }),
    pc({ cpu:['Raspberry Pi + ESP32 hybrid platform',380000], extra:['Custom PCB (2 revisions)',320000], extra2:['Industrial sensor set',280000], kase:['Cloud dashboard setup',200000], ssd:['3D printing & mechanical parts',180000], service:['Paper support, presentation & 10h mentorship',430000] })
  ],
  youtube: [
    pc({ cpu:['1080p webcam',90000], extra:['USB condenser microphone',75000], extra2:['Ring light + tripod',60000], kase:['Green screen',45000], ssd:['Editing software setup',30000], service:['Lighting & audio test',20000] }),
    pc({ cpu:['Mirrorless camera + lens',1250000], extra:['Shotgun microphone + recorder',380000], extra2:['LED panel lights ×2',320000], kase:['Tripod + gimbal',420000], ssd:['Capture card',150000], monitor:['Editing workstation (Ryzen 7 · 32GB · RTX 4060)',1500000], service:['Studio setup & calibration',120000] }),
    pc({ cpu:['Cinema camera + lens kit',4500000], extra:['Professional audio kit',900000], extra2:['Studio lighting kit',1200000], kase:['Acoustic treatment',650000], ssd:['Teleprompter + rigs',480000], monitor:['Editing suite (Ryzen 9 · 64GB · RTX 4070)',3200000], service:['Studio build & commissioning',500000] })
  ]
};

const UPGRADES = {
  gaming:[['Upgrade GPU to RTX 4070 Super',550000],['Add 32GB RAM kit',110000],['Upgrade to 240Hz monitor',250000],['Add 2TB storage',150000]],
  engineering:[['Upgrade to 64GB RAM',215000],['Add second 27" monitor',250000],['Add NVMe scratch drive',90000],['Workstation GPU upgrade',600000]],
  programming:[['Add second monitor',250000],['Upgrade to 64GB RAM',215000],['Add 2TB NVMe',90000],['Add UPS 1000VA',110000]],
  editing:[['Upgrade GPU to RTX 4070 Ti Super',630000],['Add 4TB archive drive',130000],['Upgrade to 64GB RAM',215000],['Add calibration probe',120000]],
  design:[['Upgrade to 4K calibrated monitor',460000],['Add colour calibration service',90000],['Upgrade pen display',330000],['Add 64GB RAM',215000]],
  office:[['Add UPS 1000VA',180000],['Add 4-channel CCTV',600000],['Add Wi-Fi mesh AP',160000],['Add annual IT support plan',450000]],
  smarthome:[['Add 2 IP cameras',180000],['Add smart lock',320000],['Add voice control zones',140000],['Add energy monitoring',160000]],
  security:[['Upgrade to 4K cameras',420000],['Add 4TB storage',220000],['Add access control',850000],['Add remote monitoring plan',180000]],
  robotics:[['Add vision camera module',150000],['Add 3D-printed parts set',60000],['Add ROS training session',200000],['Add spare servo set',120000]],
  project:[['Add custom PCB fabrication',180000],['Add 3D-printed enclosure',60000],['Add presentation coaching',100000],['Add extended mentorship (5h)',90000]],
  youtube:[['Add second camera',480000],['Add wireless mic kit',260000],['Add teleprompter',180000],['Add acoustic treatment',340000]]
};

const COMMON_UPGRADES = [
  ['Add Wi-Fi 6 card',35000],
  ['Extend warranty to 24 months',60000],
  ['On-site installation',45000],
  ['Priority 48h assembly',30000]
];

/* ---------- Project Lab catalogue ---------- */
const PROJECTS = [
  { id:'P-001', t:'Smart Irrigation System', dept:'Electrical', d:'IoT agriculture monitoring with automatic pump control and soil-moisture feedback.', diff:3, hrs:'4–6h', skills:'Arduino + IoT', price:245000, comps:['ESP32','Soil moisture sensors ×2','Relay module','5V water pump','OLED display','Power supply','Tubing + fittings','Custom PCB','3D-printed enclosure'] },
  { id:'P-002', t:'Smart Home Automation Hub', dept:'Electrical', d:'Control lights, sockets and appliances from a phone with scheduling and voice support.', diff:2, hrs:'3–5h', skills:'ESP32 + MQTT', price:185000, comps:['ESP32','4-channel relay board','PIR motion sensor','DHT22 sensor','OLED display','Jumper kit','Enclosure'] },
  { id:'P-003', t:'Cloud Weather Station', dept:'Computer', d:'Live temperature, humidity, pressure and rainfall pushed to an online dashboard.', diff:2, hrs:'4–5h', skills:'ESP8266 + Cloud', price:150000, comps:['ESP8266','DHT22','BMP280','Rain sensor','OLED display','Power module','Dashboard setup'] },
  { id:'P-004', t:'Line-Following Robot', dept:'Mechatronics', d:'Autonomous robot that tracks a path using an infrared sensor array and PID control.', diff:2, hrs:'3–4h', skills:'Arduino + Control', price:165000, comps:['Arduino Uno','L298N driver','IR sensor array ×5','Robot chassis','DC motors + wheels','Battery pack'] },
  { id:'P-005', t:'Obstacle-Avoiding Robot', dept:'Mechatronics', d:'Ultrasonic navigation robot with autonomous path correction and collision avoidance.', diff:2, hrs:'3–4h', skills:'Arduino + Sensors', price:155000, comps:['Arduino Uno','HC-SR04 ultrasonic','L298N driver','Chassis + motors','Servo scanner','Battery pack'] },
  { id:'P-006', t:'RFID Attendance System', dept:'Computer', d:'Tap-to-check-in system with local logging, LCD feedback and CSV export.', diff:2, hrs:'3–5h', skills:'Arduino + RFID', price:145000, comps:['Arduino Uno','RC522 RFID reader','RFID cards ×5','16×2 LCD','Buzzer + LEDs','SD card module','Enclosure'] },
  { id:'P-007', t:'Smart Energy Meter', dept:'Electrical', d:'Real-time voltage, current and power monitoring with remote cut-off and logging.', diff:3, hrs:'5–7h', skills:'ESP32 + Power', price:220000, comps:['ESP32','PZEM-004T module','OLED display','Relay cut-off','Current transformer','Enclosure + wiring'] },
  { id:'P-008', t:'Heart Rate & SpO₂ Monitor', dept:'Biomedical', d:'Wearable-style pulse oximeter with live OLED readout and data logging.', diff:3, hrs:'4–6h', skills:'ESP32 + Biomedical', price:190000, comps:['ESP32','MAX30102 sensor','OLED display','Li-ion battery','Charging module','3D-printed housing'] },
  { id:'P-009', t:'Structural Health Monitor', dept:'Civil', d:'Load and vibration monitoring for beams and small structures with live alerts.', diff:3, hrs:'5–7h', skills:'ESP32 + Instrumentation', price:230000, comps:['ESP32','Load cell + HX711','Accelerometer MPU6050','OLED display','Cloud logging','Mounting hardware'] },
  { id:'P-010', t:'Gesture-Controlled Robotic Arm', dept:'Mechatronics', d:'Robotic arm that mirrors hand movement using an IMU glove controller.', diff:3, hrs:'6–8h', skills:'Arduino + Kinematics', price:310000, comps:['Arduino Uno','4-DOF arm kit','PCA9685 driver','MPU6050 IMU','High-torque servos','Power supply','3D-printed parts'] },
  { id:'P-011', t:'Face-Recognition Door Lock', dept:'Computer', d:'Camera-based access control with an authorised-faces database and relay lock.', diff:3, hrs:'6–8h', skills:'ESP32-CAM + Vision', price:260000, comps:['ESP32-CAM','Relay + solenoid lock','MicroSD module','Programming jig','Enclosure','Power supply'] },
  { id:'P-012', t:'Water Quality Monitoring Buoy', dept:'Electrical', d:'Monitors pH, turbidity and temperature of a water body and streams results online.', diff:3, hrs:'6–8h', skills:'ESP32 + Environmental', price:290000, comps:['ESP32','pH sensor module','Turbidity sensor','DS18B20 probe','Solar + battery','Waterproof enclosure','Cloud dashboard'] },
  { id:'P-013', t:'Smart Parking System', dept:'Computer', d:'Detects free spaces, drives a barrier servo and displays availability in real time.', diff:2, hrs:'4–5h', skills:'ESP32 + IoT', price:180000, comps:['ESP32','Ultrasonic sensors ×2','Servo barrier','16×2 LCD','LED indicators','Enclosure'] },
  { id:'P-014', t:'Air Quality Monitor', dept:'Electrical', d:'Tracks CO₂, particulates and gas levels with threshold alerts and logging.', diff:2, hrs:'4–6h', skills:'ESP32 + Sensors', price:195000, comps:['ESP32','MQ-135 gas sensor','PM2.5 sensor','DHT22','OLED display','Buzzer alert','Enclosure'] }
];

const PROJECT_DELIVERABLES = [
  'Custom PCB (designed & fabricated)',
  '3D-printed enclosure',
  'Step-by-step assembly guide',
  'Full testing & validation report',
  'Documentation template (report-ready)',
  'Video tutorial + source code',
  'Presentation & demo support',
  'Technical consultation hours'
];

/* ---------- Marketplace / Trade-in ---------- */
const DEVICES = [
  { id:'laptop', l:'Laptop', base:900000 },
  { id:'pc', l:'Desktop PC', base:1100000 },
  { id:'gpu', l:'Graphics card', base:450000 },
  { id:'phone', l:'Smartphone', base:700000 },
  { id:'console', l:'Console', base:500000 },
  { id:'monitor', l:'Monitor', base:250000 }
];
const AGES = [ { id:'a1', l:'Under 1 year', m:1 }, { id:'a2', l:'1–3 years', m:.7 }, { id:'a3', l:'3–5 years', m:.45 }, { id:'a4', l:'5+ years', m:.25 } ];
const CONDITIONS = [
  { id:'A', l:'Grade A — Excellent', d:'No visible wear, fully functional, original accessories.', m:1 },
  { id:'B', l:'Grade B — Minor wear', d:'Light cosmetic marks, fully functional, tested.', m:.78 },
  { id:'C', l:'Grade C — Visible wear', d:'Noticeable cosmetic damage, fully functional, warrantied 30 days.', m:.55 }
];

/* ---------- B2B ---------- */
const B2B = [
  { id:'restaurant', ico:'🍽️', t:'Restaurants & Cafés', once:2850000, monthly:120000, items:['POS terminal + software setup','Receipt & kitchen printers','2 × order tablets','Barcode scanner','Router + Wi-Fi access point','4-channel CCTV','UPS & cabling','Staff training'] },
  { id:'office', ico:'🏢', t:'Offices', once:7500000, monthly:250000, items:['10 × office workstations','10 × 24" monitors','Rack network: router, 24-port switch, 2 APs','Multifunction printer','UPS + backup power','4-channel CCTV','Deployment & imaging','Annual IT support option'] },
  { id:'school', ico:'🏫', t:'Schools & Universities', once:12000000, monthly:400000, items:['20 × lab computers','Projector + smart display','Structured networking + Wi-Fi','Electronics lab kits ×20','UPS & power distribution','CCTV & access control','Teacher training','Annual maintenance'] },
  { id:'shop', ico:'🏪', t:'Shops & Retail', once:1450000, monthly:80000, items:['POS terminal + software','Barcode scanner','Receipt printer','Cash drawer','Digital signage display','2 × CCTV cameras','Network setup','Staff training'] },
  { id:'clinic', ico:'🏥', t:'Clinics & Pharmacies', once:3200000, monthly:150000, items:['3 × clinical workstations','Network + secure Wi-Fi','Automated backup system','4 × CCTV cameras','UPS & power protection','Printer + scanner','Data protection setup','Priority support plan'] }
];

/* ---------- Membership ---------- */
const CLUB = [
  { t:'Tech Club Free', p:'0 IQD', per:'forever', feats:['Product catalogue access','Project Lab browsing','Standard delivery rates','Community tutorials'], cta:'Included by default' },
  { t:'Tech Club Plus', p:'15,000 IQD', per:'/ month', feats:['5% off all products','Free PC cleaning once a year','Priority support queue','Free delivery over 250,000 IQD','Early access to drops','Trade-in bonus +5%'], cta:'Join Plus', hot:true },
  { t:'Tech Club Pro', p:'35,000 IQD', per:'/ month', feats:['10% off all products','Unlimited diagnostics','Free annual maintenance visit','Dedicated account manager','Free project consultation hours','Extended warranty on builds','Business priority SLA'], cta:'Join Pro' }
];

/* ---------- Roadmap ---------- */
const ROADMAP = [
  { phase:'Phase 1', time:'0–6 months', title:'Core commerce', goal:'Prove customers will buy.', items:['Electronics catalogue with true availability','Curated packages & PC building','University Project Lab v1','Assembly, Tech Lab testing & delivery','Kurdish / Arabic / English interface','AI shopping assistant'] },
  { phase:'Phase 2', time:'6–12 months', title:'Platform layer', goal:'Increase customer lifetime value.', items:['Full Project Lab with project generator','Trade-in programme','Verified used marketplace with grading','Loyalty & digital accounts','QR product support on every box','Advanced configurator & compatibility engine'] },
  { phase:'Phase 3', time:'Year 2', title:'Proprietary products', goal:'Increase margins and differentiation.', items:['NEXA EduBoard ESP32 education board','50–100 standardised project kits','Sensor, robotics and lab kit lines','Branded PC accessories','Private-label electronics'] },
  { phase:'Phase 4', time:'Year 2–3', title:'B2B & recurring revenue', goal:'Large orders plus predictable income.', items:['Office & restaurant technology packages','School and clinic deployments','CCTV / network project division','Technology-as-a-Service subscriptions','Regional expansion across Iraq'] }
];

/* ---------- Revenue engines ---------- */
const ENGINES = [
  { ico:'🛒', t:'Retail', d:'Electronics, components, accessories' },
  { ico:'🧩', t:'Packages', d:'Ready-made bundles & configurations' },
  { ico:'🔧', t:'Services', d:'Assembly, repair, installation' },
  { ico:'🎓', t:'Project Lab', d:'University & engineering projects' },
  { ico:'♻️', t:'Marketplace', d:'Verified used & trade-in' },
  { ico:'🏷️', t:'Private label', d:'Our own boards & kits' },
  { ico:'🏢', t:'B2B', d:'Business technology systems' }
];

/* ---------- Capital ---------- */
const CAPITAL = [
  { t:'Stage 1 — Validate', amount:'$10,000 – $15,000', focus:'Prove the machine works before building the whole machine.', alloc:[['Intelligent inventory (fast-moving only)',45],['Website & configurator build',20],['Project Lab kits & PCB prototypes',15],['Tech Lab tooling & test equipment',12],['Marketing & content launch',8]] },
  { t:'Stage 2 — Reinvest', amount:'+ $5,000 – $15,000', focus:'Reinvest profits and add the platform layer.', alloc:[['Marketplace & trade-in operations',30],['Marketing & content engine',25],['Inventory depth',25],['Staff & support capacity',20]] },
  { t:'Stage 3 — Proprietary', amount:'$20,000 – $50,000+', focus:'Own the product instead of reselling it.', alloc:[['Private-label boards & kits',40],['Laboratory & equipment',22],['Larger strategic inventory',20],['Team & specialists',18]] }
];

/* ---------- Journey ladder ---------- */
const LADDER = ['$10 component','$100 project kit','$300 electronics purchase','$1,000 PC build','Trade-in customer','B2B referral','Recurring service client'];

/* ------------------------------------------------------------
   HOOKS
   ------------------------------------------------------------ */
function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    const observeAll = () => {
      document.querySelectorAll('[data-reveal]:not(.in)').forEach((el) => io.observe(el));
    };
    observeAll();
    const mo = new MutationObserver(observeAll);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { io.disconnect(); mo.disconnect(); };
  }, []);
}

function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setP(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return p;
}

/* ------------------------------------------------------------
   SMALL UI PIECES
   ------------------------------------------------------------ */
const Reveal = ({ children, delay = 0, className = '', as: As = 'div', ...rest }) => (
  <As className={className} data-reveal="" style={{ '--d': delay + 'ms' }} {...rest}>{children}</As>
);

function QRCode() {
  const n = 21;
  const cells = [];
  let seed = 987654321;
  const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  const inFinder = (x, y) => (x < 7 && y < 7) || (x >= n - 7 && y < 7) || (x < 7 && y >= n - 7);
  const finderOn = (x, y) => {
    let rx = x, ry = y;
    if (x >= n - 7) rx = x - (n - 7);
    if (y >= n - 7 && x < 7) ry = y - (n - 7);
    const edge = rx === 0 || rx === 6 || ry === 0 || ry === 6;
    const core = rx >= 2 && rx <= 4 && ry >= 2 && ry <= 4;
    return edge || core;
  };
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      const on = inFinder(x, y) ? finderOn(x, y) : rnd() > 0.48;
      cells.push(<i key={x + '-' + y} style={{ background: on ? '#0A0C08' : 'transparent' }} />);
    }
  }
  return <div className="qr" style={{ gridTemplateColumns: `repeat(${n},1fr)`, gridTemplateRows: `repeat(${n},1fr)` }}>{cells}</div>;
}

function Tabs({ items, active, onChange }) {
  return (
    <div className="tabs" role="tablist">
      {items.map((it) => (
        <button key={it.id} role="tab" aria-selected={active === it.id}
          className={'tab' + (active === it.id ? ' on' : '')}
          onClick={() => onChange(it.id)}>{it.l}</button>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------
   NAV
   ------------------------------------------------------------ */
const NAV_LINKS = [
  { id:'ecosystem', l:'Ecosystem' },
  { id:'configurator', l:'Configurator' },
  { id:'projectlab', l:'Project Lab' },
  { id:'ai', l:'AI' },
  { id:'market', l:'Marketplace' },
  { id:'business', l:'Business' },
  { id:'platform', l:'Platform' },
  { id:'roadmap', l:'Roadmap' }
];

function Nav({ cartCount, onCartOpen, onToast }) {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      let cur = '';
      NAV_LINKS.forEach((l) => {
        const el = document.getElementById(l.id);
        if (el && el.getBoundingClientRect().top <= 180) cur = l.id;
      });
      setActive(cur);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menu ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menu]);

  const go = (id) => {
    setMenu(false);
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  };

  return (
    <>
      <nav className={'nav' + (scrolled ? ' scrolled' : '')}>
        <div className="nav-inner">
          <a className="logo" href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <span className="logo-mark">NX</span>
            <span>NEXA</span>
          </a>

          <div className="nav-links">
            {NAV_LINKS.map((l) => (
              <a key={l.id} href={'#' + l.id}
                className={'nav-link' + (active === l.id ? ' active' : '')}
                onClick={(e) => { e.preventDefault(); go(l.id); }}>{l.l}</a>
            ))}
          </div>

          <div className="nav-right">
            <button className="lang-pill" onClick={() => onToast('Kurdish, Arabic and English launch with Phase 1')}>KU · AR · EN</button>
            <button className="cart-btn" aria-label="Open cart" onClick={onCartOpen}>
              🛍
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </button>
            <button className={'burger' + (menu ? ' open' : '')} aria-label="Menu" onClick={() => setMenu(!menu)}>
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      <div className={'mobile-menu' + (menu ? ' open' : '')}>
        {NAV_LINKS.map((l) => (
          <a key={l.id} href={'#' + l.id} onClick={(e) => { e.preventDefault(); go(l.id); }}>{l.l}</a>
        ))}
        <button className="btn btn-primary" style={{ marginTop: 28 }} onClick={() => go('configurator')}>
          Start a build →
        </button>
      </div>
    </>
  );
}

/* ------------------------------------------------------------
   HERO
   ------------------------------------------------------------ */
function Hero({ onToast }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  };
  const report = [
    ['Processor', 'Ryzen 7 7800X3D'],
    ['Graphics', 'RTX 4070 Super'],
    ['Memory', '32GB DDR5 6000'],
    ['Storage', '2TB NVMe Gen4'],
    ['Thermals', '68°C under load'],
    ['Stress test', '60 min — stable']
  ];
  return (
    <header className="hero" id="top">
      <div className="container">
        <div className="hero-grid">
          <div>
            <Reveal><span className="eyebrow">Sulaymaniyah · Erbil · Duhok · Iraq</span></Reveal>
            <Reveal delay={60}>
              <h1 className="h1">
                <span className="line">Don’t just buy</span>
                <span className="line">technology.</span>
                <span className="line"><em>Tell us what you</em></span>
                <span className="line"><em>want to accomplish.</em></span>
              </h1>
            </Reveal>
            <Reveal delay={140}>
              <p className="lead" style={{ marginTop: 26 }}>
                NEXA is a technology ecosystem — shop, build, learn, install, maintain and upgrade.
                One platform, seven revenue engines, and a configurator that turns intent into a
                working, compatible, tested solution.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <div className="hero-actions">
                <button className="btn btn-primary" onClick={() => scrollTo('configurator')}>Configure my build →</button>
                <button className="btn btn-ghost" onClick={() => scrollTo('ecosystem')}>Explore the ecosystem</button>
              </div>
            </Reveal>
            <Reveal delay={260}>
              <div className="hero-stats">
                <div><div className="stat-v">10</div><div className="stat-l">Divisions</div></div>
                <div><div className="stat-v">7</div><div className="stat-l">Revenue engines</div></div>
                <div><div className="stat-v">3</div><div className="stat-l">Languages</div></div>
                <div><div className="stat-v">Same&#8209;day</div><div className="stat-l">Suli delivery</div></div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={180}>
            <div className="panel">
              <div className="panel-head">
                <div className="dot-row"><span className="dot g" /><span className="dot" /><span className="dot" /></div>
                <span className="tiny mono">TECH LAB · BUILD #KR-2026-00491</span>
              </div>
              {report.map((r) => (
                <div className="report-row" key={r[0]}>
                  <span className="muted">{r[0]}</span>
                  <span style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <span className="mono" style={{ fontSize: '.8rem' }}>{r[1]}</span>
                    <span className="check">✓</span>
                  </span>
                </div>
              ))}
              <div className="qr-wrap">
                <QRCode />
                <div>
                  <div style={{ fontSize: '.86rem', fontWeight: 600 }}>Scan for the full report</div>
                  <div className="tiny" style={{ marginTop: 4 }}>
                    Every build and every kit ships with a QR that opens its test report,
                    tutorials, firmware and support.
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------
   MARQUEE
   ------------------------------------------------------------ */
function Marquee() {
  const items = [...MARQUEE, ...MARQUEE];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {items.map((m, i) => <span className="marquee-item" key={i}>{m}</span>)}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------
   ECOSYSTEM
   ------------------------------------------------------------ */
function Ecosystem() {
  return (
    <section id="ecosystem">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">01 — The ecosystem</span>
          <h2 className="h2">A store is a transaction.<br />An ecosystem is a relationship.</h2>
          <p className="lead">
            Instead of “we sell electronics”, we help you choose, build, learn, install, maintain
            and upgrade technology. That single shift creates ten businesses inside one platform —
            and it is very hard for a normal electronics shop to copy.
          </p>
        </Reveal>

        <div className="grid g-auto">
          {ECOSYSTEM.map((e, i) => (
            <Reveal key={e.t} delay={i * 45}>
              <article className="card">
                <div className="icon-box">{e.ico}</div>
                <h3 className="h3">{e.t}</h3>
                <p className="small" style={{ marginTop: 8 }}>{e.d}</p>
                <div className="tag-row" style={{ marginTop: 18 }}>
                  <span className="tag accent">{e.e}</span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------
   CONFIGURATOR
   ------------------------------------------------------------ */
function Configurator({ onAdd, onToast }) {
  const [goal, setGoal] = useState(null);
  const [budget, setBudget] = useState(null);
  const [excluded, setExcluded] = useState([]);
  const [upgrades, setUpgrades] = useState([]);

  const tierIndex = (b) => (b <= 750000 ? 0 : b <= 1500000 ? 1 : 2);
  const TIER_NAMES = ['Starter', 'Advanced', 'Ultimate'];

  const baseItems = useMemo(() => (goal ? BUILDS[goal.id][tierIndex(budget || 750000)] : []), [goal, budget]);

  const upgradeList = useMemo(() => {
    if (!goal) return [];
    return [...(UPGRADES[goal.id] || []), ...COMMON_UPGRADES];
  }, [goal]);

  useEffect(() => { setExcluded([]); setUpgrades([]); }, [goal, budget]);

  const toggleItem = (idx) => setExcluded((p) => p.includes(idx) ? p.filter((i) => i !== idx) : [...p, idx]);
  const toggleUpgrade = (idx) => setUpgrades((p) => p.includes(idx) ? p.filter((i) => i !== idx) : [...p, idx]);

  const itemsTotal = baseItems.reduce((s, it, i) => s + (excluded.includes(i) ? 0 : it.p), 0);
  const upgTotal = upgrades.reduce((s, i) => s + upgradeList[i][1], 0);
  const total = itemsTotal + upgTotal;
  const over = budget && total > budget;

  const fitToBudget = () => {
    if (!budget) return;
    const optionalIdx = baseItems.map((it, i) => ({ it, i }))
      .filter((x) => OPTIONAL.has(x.it.n) && !excluded.includes(x.i))
      .sort((a, b) => b.it.p - a.it.p);
    let cur = total;
    const nextExcluded = [...excluded];
    let nextUpg = [...upgrades];
    // first drop selected upgrades (largest first)
    const upgSorted = nextUpg.slice().sort((a, b) => upgradeList[b][1] - upgradeList[a][1]);
    for (const ui of upgSorted) {
      if (cur <= budget) break;
      cur -= upgradeList[ui][1];
      nextUpg = nextUpg.filter((x) => x !== ui);
    }
    // then drop optional components
    for (const o of optionalIdx) {
      if (cur <= budget) break;
      cur -= o.it.p;
      nextExcluded.push(o.i);
    }
    setExcluded(nextExcluded);
    setUpgrades(nextUpg);
    onToast('Adjusted to fit your budget');
  };

  const step = !goal ? 0 : !budget ? 1 : 2;

  const reset = () => { setGoal(null); setBudget(null); };

  const addBuild = () => {
    const included = baseItems.filter((_, i) => !excluded.includes(i));
    if (!included.length) { onToast('Nothing selected to add'); return; }
    onAdd({
      name: `${TIER_NAMES[tierIndex(budget)]} ${goal.label} package`,
      detail: `${included.length} components${upgrades.length ? ` + ${upgrades.length} upgrades` : ''}`,
      price: total
    });
  };

  return (
    <section id="configurator">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">02 — Technology configurator</span>
          <h2 className="h2">Stop searching. Start describing.</h2>
          <p className="lead">
            Don’t make customers hunt through hundreds of components. Ask what they are trying to
            accomplish, ask the budget, and generate a compatible package — with transparent
            upgrades and a compatibility guarantee.
          </p>
        </Reveal>

        <Reveal>
          <div className="step-bar">
            <span className={'step-chip' + (step === 0 ? ' on' : ' done')}><span className="step-num">1</span> Goal</span>
            <span className="step-sep" />
            <span className={'step-chip' + (step === 1 ? ' on' : step > 1 ? ' done' : '')}><span className="step-num">2</span> Budget</span>
            <span className="step-sep" />
            <span className={'step-chip' + (step === 2 ? ' on' : '')}><span className="step-num">3</span> Your package</span>
          </div>
        </Reveal>

        {step === 0 && (
          <Reveal>
            <div className="card">
              <h3 className="h3" style={{ marginBottom: 6 }}>What are you trying to accomplish?</h3>
              <p className="small" style={{ marginBottom: 22 }}>Pick the outcome, not the product.</p>
              <div className="goal-grid">
                {GOALS.map((g) => (
                  <button key={g.id} className="goal" onClick={() => setGoal(g)}>
                    <span className="goal-ico">{g.ico}</span>
                    <span className="goal-lbl">{g.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </Reveal>
        )}

        {step === 1 && (
          <Reveal>
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 22 }}>
                <div>
                  <h3 className="h3">What is your budget?</h3>
                  <p className="small" style={{ marginTop: 4 }}>Goal: <span className="accent">{goal.label}</span></p>
                </div>
                <button className="btn btn-ghost btn-sm" onClick={() => setGoal(null)}>← Change goal</button>
              </div>
              <div className="budget-grid">
                {BUDGETS.map((b) => (
                  <button key={b.v} className={'budget' + (budget === b.v ? ' on' : '')} onClick={() => setBudget(b.v)}>{b.l}</button>
                ))}
              </div>
            </div>
          </Reveal>
        )}

        {step === 2 && (
          <Reveal>
            <div className="card" style={{ padding: 26 }}>
              <div className="result-head">
                <div>
                  <span className="tag accent">{TIER_NAMES[tierIndex(budget)]}</span>
                  <h3 className="h3" style={{ marginTop: 12 }}>{goal.ico} {goal.label}</h3>
                  <p className="small" style={{ marginTop: 4 }}>
                    Budget {IQD(budget)} · {baseItems.length} components · compatibility checked
                  </p>
                </div>
                <button className="btn btn-ghost btn-sm" onClick={reset}>↺ Start over</button>
              </div>

              <div className="split" style={{ gap: 48, alignItems: 'start' }}>
                <div>
                  <div className="tiny mono" style={{ marginBottom: 10, letterSpacing: '.12em' }}>COMPONENTS</div>
                  {baseItems.map((it, i) => {
                    const off = excluded.includes(i);
                    return (
                      <div className={'item-row' + (off ? ' off' : '')} key={i}>
                        <button className={'item-toggle' + (!off ? ' on' : '')} onClick={() => toggleItem(i)} aria-label="Toggle">✓</button>
                        <div className="item-main">
                          <div className="item-name">{it.n}</div>
                          <div className="item-spec">{it.v}</div>
                        </div>
                        <div className={'item-price' + (it.p === 0 ? ' free' : '')}>{it.p === 0 ? 'included' : IQD(it.p)}</div>
                      </div>
                    );
                  })}
                </div>

                <div>
                  <div className="tiny mono" style={{ marginBottom: 10, letterSpacing: '.12em' }}>UPGRADES</div>
                  <div className="grid" style={{ gap: 10 }}>
                    {upgradeList.map((u, i) => (
                      <button key={i} className={'upgrade-chip' + (upgrades.includes(i) ? ' on' : '')} onClick={() => toggleUpgrade(i)}>
                        <span>{upgrades.includes(i) ? '✓ ' : '+ '}{u[0]}</span>
                        <span className="p">+{fmt(u[1])}</span>
                      </button>
                    ))}
                  </div>

                  <div className="notice" style={{ marginTop: 20 }}>
                    <span>🛡</span>
                    <div>
                      <b>Compatibility guarantee.</b> Every component in this configuration has been
                      checked against the CPU, motherboard, memory, power supply, case and cooling.
                      If we selected it, it fits and it works.
                    </div>
                  </div>
                </div>
              </div>

              <div className="total-bar">
                <div style={{ flex: '1 1 320px' }}>
                  <div className="tiny mono" style={{ letterSpacing: '.12em' }}>ESTIMATED TOTAL</div>
                  <div className="total-v">{IQD(total)}</div>
                  <div className="meter">
                    <span className={over ? 'over' : ''} style={{ width: Math.min(100, (total / (budget || total)) * 100) + '%' }} />
                  </div>
                  <div className="tiny" style={{ marginTop: 10 }}>
                    {over
                      ? `Over budget by ${IQD(total - budget)} — remove items or fit to budget.`
                      : `Within your ${IQD(budget)} budget.`}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <button className="btn btn-ghost" onClick={fitToBudget}>Fit to budget</button>
                  <button className="btn btn-primary" onClick={addBuild}>Add package to cart →</button>
                </div>
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------
   PROJECT LAB
   ------------------------------------------------------------ */
function ProjectLab({ onAdd, onToast }) {
  const [dept, setDept] = useState('Electrical');
  const [level, setLevel] = useState('Final year');
  const [team, setTeam] = useState('3');
  const [budget, setBudget] = useState('300000');
  const [diff, setDiff] = useState('Medium');
  const [deadline, setDeadline] = useState('2 months');
  const [result, setResult] = useState(null);
  const [seed, setSeed] = useState(0);

  const DEPTS = ['Electrical','Computer','Mechatronics','Civil','Biomedical','Software','Communications'];
  const DIFFS = ['Easy','Medium','Hard'];

  const generate = useCallback((s = seed) => {
    const pool = PROJECTS.filter((p) => p.dept === dept);
    const list = pool.length ? pool : PROJECTS;
    const pick = list[(Number(team) + s + dept.length + diff.length) % list.length];
    setResult(pick);
  }, [dept, team, diff, seed]);

  useEffect(() => { if (result) generate(seed); }, [seed]); // eslint-disable-line

  const regenerate = () => setSeed((s) => s + 1);

  const weeks = deadline === '1 month' ? 4 : deadline === '2 months' ? 8 : 12;
  const timeline = [
    { w:'Week 1', t:'Scope definition, block diagram and component finalisation' },
    { w:`Week ${Math.max(2, Math.round(weeks * 0.25))}`, t:'Hardware assembly, PCB and enclosure preparation' },
    { w:`Week ${Math.max(3, Math.round(weeks * 0.5))}`, t:'Firmware / software development and sensor calibration' },
    { w:`Week ${Math.max(4, Math.round(weeks * 0.75))}`, t:'Integration, testing and troubleshooting' },
    { w:`Week ${weeks}`, t:'Documentation, presentation preparation and demo rehearsal' }
  ];

  const stars = (n) => '★'.repeat(n) + '☆'.repeat(3 - n);

  return (
    <section id="projectlab">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">03 — Project Lab</span>
          <h2 className="h2">The university project division is bigger than you think.</h2>
          <p className="lead">
            A student doesn’t want a component — they want a finished, documented, presentable
            project. Tell us the department, the team, the budget and the deadline, and the
            generator produces a project plan you can actually buy.
          </p>
        </Reveal>

        <div className="split" style={{ alignItems: 'start', gap: 40 }}>
          <Reveal>
            <div className="card">
              <h3 className="h3" style={{ marginBottom: 20 }}>Project generator</h3>
              <div className="grid g-2" style={{ gap: 16 }}>
                <div className="field">
                  <label>Department</label>
                  <select value={dept} onChange={(e) => setDept(e.target.value)}>
                    {DEPTS.map((d) => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label>Level</label>
                  <select value={level} onChange={(e) => setLevel(e.target.value)}>
                    <option>3rd year</option><option>Final year</option><option>Master’s</option>
                  </select>
                </div>
                <div className="field">
                  <label>Team size</label>
                  <select value={team} onChange={(e) => setTeam(e.target.value)}>
                    {['1','2','3','4','5'].map((n) => <option key={n}>{n}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label>Budget</label>
                  <select value={budget} onChange={(e) => setBudget(e.target.value)}>
                    <option value="150000">150,000 IQD</option>
                    <option value="300000">300,000 IQD</option>
                    <option value="500000">500,000 IQD</option>
                    <option value="1000000">1,000,000 IQD</option>
                  </select>
                </div>
                <div className="field">
                  <label>Difficulty</label>
                  <select value={diff} onChange={(e) => setDiff(e.target.value)}>
                    {DIFFS.map((d) => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label>Deadline</label>
                  <select value={deadline} onChange={(e) => setDeadline(e.target.value)}>
                    <option>1 month</option><option>2 months</option><option>3 months</option>
                  </select>
                </div>
              </div>
              <button className="btn btn-primary btn-full" style={{ marginTop: 22 }} onClick={() => generate(seed)}>
                Generate project →
              </button>
              <p className="tiny" style={{ marginTop: 14, textAlign: 'center' }}>
                We don’t just sell components. We sell a completed, defensible project.
              </p>
            </div>
          </Reveal>

          <Reveal delay={90}>
            {!result ? (
              <div className="card" style={{ display: 'grid', placeItems: 'center', minHeight: 420, textAlign: 'center' }}>
                <div>
                  <div style={{ fontSize: '2rem', marginBottom: 14 }}>🔬</div>
                  <h3 className="h3">Your project appears here</h3>
                  <p className="small" style={{ marginTop: 10, maxWidth: 320 }}>
                    Fill in the form and generate a project with components, cost, timeline,
                    difficulty and deliverables.
                  </p>
                </div>
              </div>
            ) : (
              <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 14, flexWrap: 'wrap', marginBottom: 16 }}>
                  <span className="tag accent">{result.id} · {result.dept}</span>
                  <span className="tiny mono">DIFFICULTY {stars(result.diff)}</span>
                </div>
                <h3 className="h2" style={{ fontSize: '1.45rem', marginBottom: 10 }}>{result.t}</h3>
                <p className="small" style={{ marginBottom: 20 }}>{result.d}</p>

                <div className="grid g-2" style={{ gap: 12, marginBottom: 20 }}>
                  <div className="card-flat">
                    <div className="tiny mono">BUILD TIME</div>
                    <div style={{ fontWeight: 600, marginTop: 4 }}>{result.hrs}</div>
                  </div>
                  <div className="card-flat">
                    <div className="tiny mono">SKILLS</div>
                    <div style={{ fontWeight: 600, marginTop: 4 }}>{result.skills}</div>
                  </div>
                </div>

                <div className="tiny mono" style={{ letterSpacing: '.12em', marginBottom: 8 }}>COMPONENTS</div>
                <div className="pill-list" style={{ marginBottom: 20 }}>
                  {result.comps.map((c) => <span className="pill" key={c}>{c}</span>)}
                </div>

                <div className="tiny mono" style={{ letterSpacing: '.12em', marginBottom: 10 }}>TIMELINE · {deadline.toUpperCase()}</div>
                <div className="timeline" style={{ marginBottom: 22 }}>
                  {timeline.map((t) => (
                    <div className="tl-item" key={t.w}>
                      <span className="tl-dot" />
                      <div className="mono" style={{ fontSize: '.72rem', color: 'var(--accent)', letterSpacing: '.1em' }}>{t.w.toUpperCase()}</div>
                      <div style={{ fontSize: '.88rem', marginTop: 4 }}>{t.t}</div>
                    </div>
                  ))}
                </div>

                <div className="tiny mono" style={{ letterSpacing: '.12em', marginBottom: 10 }}>WHAT YOU RECEIVE</div>
                <div style={{ marginBottom: 22 }}>
                  {PROJECT_DELIVERABLES.map((d) => <div className="bullet" key={d}>{d}</div>)}
                </div>

                <div className="total-bar" style={{ paddingTop: 20 }}>
                  <div>
                    <div className="tiny mono" style={{ letterSpacing: '.12em' }}>PROJECT KIT PRICE</div>
                    <div className="total-v" style={{ fontSize: '1.7rem' }}>{IQD(result.price)}</div>
                    <div className="tiny" style={{ marginTop: 6 }}>
                      Budget entered: {IQD(Number(budget))} · {level} · {team} student{team !== '1' ? 's' : ''}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    <button className="btn btn-ghost" onClick={regenerate}>↻ Regenerate</button>
                    <button className="btn btn-primary" onClick={() => onAdd({ name: result.t + ' — project kit', detail: result.id + ' · ' + result.skills, price: result.price })}>
                      Add kit to cart
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Reveal>
        </div>

        <Reveal delay={60} style={{ marginTop: 64 }}>
          <h3 className="h3" style={{ marginBottom: 8 }}>Standardised project kits</h3>
          <p className="small" style={{ marginBottom: 24, maxWidth: '60ch' }}>
            After 50–100 standardised projects you stop reselling electronics and start selling your
            own intellectual product — repeatable, documented and supportable.
          </p>
          <div className="grid g-auto">
            {PROJECTS.slice(0, 6).map((p, i) => (
              <Reveal key={p.id} delay={i * 40}>
                <article className="card card-tight">
                  <div className="mono big-num">PROJECT #{p.id}</div>
                  <h3 className="h3" style={{ margin: '12px 0 8px' }}>{p.t}</h3>
                  <p className="tiny" style={{ marginBottom: 14 }}>{p.d}</p>
                  <div className="row" style={{ padding: '9px 0', fontSize: '.8rem' }}>
                    <span className="muted">Difficulty</span><span className="mono accent">{stars(p.diff)}</span>
                  </div>
                  <div className="row" style={{ padding: '9px 0', fontSize: '.8rem' }}>
                    <span className="muted">Build time</span><span className="mono">{p.hrs}</span>
                  </div>
                  <div className="row" style={{ padding: '9px 0', fontSize: '.8rem', borderBottom: 'none' }}>
                    <span className="muted">Kit price</span><span className="mono">{IQD(p.price)}</span>
                  </div>
                  <button className="btn btn-ghost btn-sm btn-full" style={{ marginTop: 14 }}
                    onClick={() => onAdd({ name: p.t + ' — kit', detail: 'Project ' + p.id, price: p.price })}>
                    Add kit
                  </button>
                </article>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------
   PRIVATE LABEL
   ------------------------------------------------------------ */
function Hardware({ onToast }) {
  const specs = ['ESP32 dual-core','OLED 0.96"','RGB status LEDs','Push buttons ×4','Relay output','Buzzer','Potentiometer','Motor driver header','Temperature sensor','Grove-style connectors','USB-C power','Expansion GPIO rail'];
  return (
    <section id="hardware">
      <div className="container">
        <div className="split" style={{ alignItems: 'center', gap: 56 }}>
          <Reveal>
            <span className="eyebrow">04 — Private label</span>
            <h2 className="h2">Own the product, not just the resale.</h2>
            <p className="lead">
              Instead of permanently depending on imported products, we design our own boards and
              kits. One education board can serve dozens of university projects — and the margin
              shifts from “buy for $8, sell for $10” to design → manufacture → brand → educate →
              sell → support.
            </p>
            <div className="grid g-2" style={{ gap: 12, marginTop: 28 }}>
              {specs.slice(0, 8).map((s) => (
                <div key={s} className="bullet" style={{ padding: 0 }}>{s}</div>
              ))}
            </div>
            <button className="btn btn-ghost" style={{ marginTop: 28 }} onClick={() => onToast('EduBoard — prototype stage, join the waitlist')}>
              Join the EduBoard waitlist
            </button>
          </Reveal>

          <Reveal delay={100}>
            <div className="panel" style={{ animation: 'none' }}>
              <div className="panel-head">
                <span className="mono" style={{ fontSize: '.72rem', letterSpacing: '.14em', color: 'var(--accent)' }}>NEXA EDUBOARD · REV B</span>
                <div className="dot-row"><span className="dot g" /><span className="dot" /><span className="dot" /></div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 18 }}>
                {specs.map((s) => (
                  <div key={s} className="card-flat" style={{ padding: '12px 10px', textAlign: 'center', fontSize: '.7rem', color: 'var(--muted)' }}>{s}</div>
                ))}
              </div>
              <div className="report-row"><span className="muted">Production</span><span className="mono" style={{ fontSize: '.78rem' }}>Outsourced initially</span></div>
              <div className="report-row"><span className="muted">Design & documentation</span><span className="check">owned in-house ✓</span></div>
              <div className="report-row"><span className="muted">Use cases per board</span><span className="mono" style={{ fontSize: '.78rem' }}>20+ projects</span></div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------
   AI ASSISTANT
   ------------------------------------------------------------ */
function AIAssistant({ onToast }) {
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Hi — I’m NEXA AI. Describe what you want to accomplish and your budget, and I’ll recommend a compatible configuration or a project kit.' }
  ]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, thinking]);

  const answer = (q) => {
    const t = q.toLowerCase();
    const has = (...k) => k.some((x) => t.includes(x));

    if (has('autocad','solidworks','revit','cad','mechanical','civil eng'))
      return { text: 'For AutoCAD, SolidWorks and Revit the priority is CPU single-core speed, RAM capacity and a certified-ish GPU. Here’s a configuration for a mechanical engineering student around 1.2M IQD:', rec: [['Processor','Ryzen 7 7700'],['Graphics','RTX 4060 8GB'],['Memory','32GB DDR5'],['Storage','1TB NVMe Gen4'],['Monitor','27" 2K IPS'],['Estimated total','1,685,000 IQD']] };
    if (has('game','gaming','fps','fortnite','pubg','valorant'))
      return { text: 'For gaming, spend roughly 60% on the GPU, 25% on the platform and 15% on the monitor and peripherals. A solid mid-range build:', rec: [['Processor','Ryzen 5 7600'],['Graphics','RTX 4060 8GB'],['Memory','32GB DDR5'],['Storage','1TB NVMe Gen4'],['Monitor','27" 165Hz'],['Estimated total','1,410,000 IQD']] };
    if (has('edit','video','premiere','after effects','youtube'))
      return { text: 'Video editing wants VRAM, fast scratch storage and 32GB+ RAM. Recommended:', rec: [['Processor','Ryzen 7 7700'],['Graphics','RTX 4060 Ti 16GB'],['Memory','32GB DDR5'],['Storage','2TB NVMe Gen4'],['Monitor','27" 2K IPS'],['Estimated total','1,740,000 IQD']] };
    if (has('iot','project','graduation','arduino','esp32','sensor'))
      return { text: 'That sounds like a Project Lab request. Popular directions right now are smart irrigation, smart home automation and cloud weather stations. A full kit with PCB, enclosure, documentation and demo support starts around 245,000 IQD.', cta: 'Open Project Lab' };
    if (has('office','company','business','restaurant','shop','school','clinic'))
      return { text: 'For businesses we recommend a complete package rather than individual devices — POS, networking, CCTV, power protection, deployment and an optional monthly support plan. Tell me the type of business and the number of seats.', cta: 'See business packages' };
    if (has('cctv','camera','security','surveillance'))
      return { text: 'A 4-camera 3MP IP system with NVR, PoE switch, cabling, installation and configuration lands around 930,000 IQD. For an 8-camera 5MP system expect about 2,020,000 IQD.', cta: 'See business packages' };
    if (has('laptop','notebook'))
      return { text: 'For laptops the trade-off is thermal headroom versus portability. Engineering and editing workloads generally do better on a desktop at the same budget — but if you must be mobile, prioritise 16GB+ RAM and a discrete GPU.' };
    if (has('smart home','home automation','alexa','smart light'))
      return { text: 'A smart home starter with a controller hub, relays, sensors, smart plugs and app configuration starts around 245,000 IQD. Whole-home builds with cameras, curtain motors and a central controller reach 3,700,000 IQD.', cta: 'Configure a build' };
    if (has('robot','robotic','arm','ros'))
      return { text: 'Robotics kits scale quickly. A line-following robot is about 165,000 IQD; a 6-DOF arm with vision and ROS training reaches roughly 2,540,000 IQD.', cta: 'Configure a build' };
    if (has('used','second hand','trade','sell'))
      return { text: 'We verify, grade and warranty used devices. Trade-in credit is calculated from device type, age and condition — Grade A, B or C. Your old PC can be worth 25–100% of its base value.', cta: 'Open trade-in calculator' };
    return { text: 'Got it. To give you a precise recommendation I need three things: what you want to accomplish, your budget in IQD, and whether you need it for study, work, business or personal use.', cta: 'Open configurator' };
  };

  const send = (text) => {
    const q = (text || input).trim();
    if (!q) return;
    setMessages((m) => [...m, { role: 'me', text: q }]);
    setInput('');
    setThinking(true);
    setTimeout(() => {
      const a = answer(q);
      setThinking(false);
      setMessages((m) => [...m, { role: 'ai', text: a.text, rec: a.rec, cta: a.cta }]);
    }, 850);
  };

  const jump = (label) => {
    const map = { 'Open Project Lab': 'projectlab', 'Open configurator': 'configurator', 'Configure a build': 'configurator', 'See business packages': 'business', 'Open trade-in calculator': 'market' };
    const id = map[label];
    const el = id && document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
    else onToast('Section coming in Phase 1');
  };

  const quick = ['PC for AutoCAD, 1.2M IQD', 'Gaming build 1.5M', 'IoT graduation project', 'CCTV for a shop'];

  return (
    <section id="ai">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">05 — Ask NEXA AI</span>
          <h2 className="h2">AI isn’t just behind the scenes. It’s in the conversation.</h2>
          <p className="lead">
            A generic chatbot is a gimmick. A configuration engine that understands intent, budget
            and compatibility — and then lets you add the result to a cart — is a sales channel.
          </p>
        </Reveal>

        <div className="split" style={{ alignItems: 'start', gap: 48 }}>
          <Reveal>
            <div className="chat">
              <div className="chat-head">
                <div className="avatar">NX</div>
                <div>
                  <div style={{ fontSize: '.9rem', fontWeight: 600 }}>NEXA AI Assistant</div>
                  <div className="tiny">Compatibility-aware · Kurdish · Arabic · English</div>
                </div>
              </div>
              <div className="chat-body" ref={bodyRef}>
                {messages.map((m, i) => (
                  <div key={i} className={'msg ' + (m.role === 'ai' ? 'ai' : 'me')}>
                    <div>{m.text}</div>
                    {m.rec && (
                      <div className="rec">
                        {m.rec.map((r) => (
                          <div className="rec-row" key={r[0]}>
                            <span className="k">{r[0]}</span><span className="v">{r[1]}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {m.cta && (
                      <button className="btn btn-primary btn-sm" style={{ marginTop: 14 }} onClick={() => jump(m.cta)}>
                        {m.cta} →
                      </button>
                    )}
                  </div>
                ))}
                {thinking && (
                  <div className="msg ai"><div className="typing"><i /><i /><i /></div></div>
                )}
              </div>
              <div className="quick">
                {quick.map((q) => <button key={q} onClick={() => send(q)}>{q}</button>)}
              </div>
              <div className="chat-input">
                <input value={input} placeholder="Describe what you need…"
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && send()} />
                <button className="btn btn-primary btn-sm" onClick={() => send()}>Send</button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={90}>
            <div className="card">
              <h3 className="h3" style={{ marginBottom: 18 }}>Two AI engines, one platform</h3>
              <div className="card-flat" style={{ marginBottom: 14 }}>
                <div className="mono" style={{ fontSize: '.72rem', color: 'var(--accent)', letterSpacing: '.12em' }}>SHOPPING AI</div>
                <p className="small" style={{ marginTop: 8 }}>
                  Turns intent and budget into a compatible configuration, explains the reasoning,
                  flags compatibility and offers upgrade paths — then adds to cart.
                </p>
              </div>
              <div className="card-flat" style={{ marginBottom: 14 }}>
                <div className="mono" style={{ fontSize: '.72rem', color: 'var(--accent)', letterSpacing: '.12em' }}>PROJECT GENERATOR</div>
                <p className="small" style={{ marginTop: 8 }}>
                  Takes department, team size, budget and deadline, then produces a project
                  suggestion, component list, block diagram, timeline and required programming.
                </p>
              </div>
              <div className="notice">
                <span>💡</span>
                <div>
                  The AI is not the product. The AI is the interface between <b>what the customer
                  wants</b> and <b>what we can sell them</b>.
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------
   MARKETPLACE + TRADE-IN
   ------------------------------------------------------------ */
function Marketplace({ onToast }) {
  const [device, setDevice] = useState('laptop');
  const [age, setAge] = useState('a2');
  const [cond, setCond] = useState('B');

  const d = DEVICES.find((x) => x.id === device);
  const a = AGES.find((x) => x.id === age);
  const c = CONDITIONS.find((x) => x.id === cond);
  const raw = d.base * a.m * c.m;
  const value = Math.round(raw / 5000) * 5000;
  const newBuild = 1500000;
  const pay = Math.max(0, newBuild - value);

  return (
    <section id="market">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">06 — Marketplace & trade-in</span>
          <h2 className="h2">Don’t become Facebook Marketplace. Become the verified one.</h2>
          <p className="lead">
            Used electronics already sell locally — so a used marketplace alone isn’t a
            differentiator. Verification, grading, warranty, pricing and integration with our
            new-product business are.
          </p>
        </Reveal>

        <div className="grid g-3" style={{ marginBottom: 48 }}>
          {CONDITIONS.map((x, i) => (
            <Reveal key={x.id} delay={i * 60}>
              <div className="card">
                <div className="tag accent">Grade {x.id}</div>
                <h3 className="h3" style={{ marginTop: 14 }}>{x.l.split('— ')[1]}</h3>
                <p className="small" style={{ marginTop: 8 }}>{x.d}</p>
                <div className="row" style={{ marginTop: 16, borderBottom: 'none' }}>
                  <span className="muted" style={{ fontSize: '.82rem' }}>Value retention</span>
                  <span className="mono accent">{Math.round(x.m * 100)}%</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="split" style={{ alignItems: 'start', gap: 48 }}>
          <Reveal>
            <div className="card">
              <h3 className="h3" style={{ marginBottom: 6 }}>Trade-in calculator</h3>
              <p className="small" style={{ marginBottom: 22 }}>
                Reduce the psychological barrier to an expensive purchase — and acquire inventory at
                the same time.
              </p>
              <div className="grid g-2" style={{ gap: 16 }}>
                <div className="field">
                  <label>Device type</label>
                  <select value={device} onChange={(e) => setDevice(e.target.value)}>
                    {DEVICES.map((x) => <option key={x.id} value={x.id}>{x.l}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label>Age</label>
                  <select value={age} onChange={(e) => setAge(e.target.value)}>
                    {AGES.map((x) => <option key={x.id} value={x.id}>{x.l}</option>)}
                  </select>
                </div>
                <div className="field" style={{ gridColumn: '1 / -1' }}>
                  <label>Condition</label>
                  <select value={cond} onChange={(e) => setCond(e.target.value)}>
                    {CONDITIONS.map((x) => <option key={x.id} value={x.id}>{x.l}</option>)}
                  </select>
                </div>
              </div>

              <div className="total-bar" style={{ marginTop: 26 }}>
                <div>
                  <div className="tiny mono" style={{ letterSpacing: '.12em' }}>ESTIMATED TRADE-IN VALUE</div>
                  <div className="total-v">{IQD(value)}</div>
                </div>
                <button className="btn btn-primary" onClick={() => onToast('Trade-in request submitted — we’ll inspect and confirm')}>
                  Request inspection
                </button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={90}>
            <div className="card">
              <h3 className="h3" style={{ marginBottom: 18 }}>How the trade-in math works</h3>
              <div className="row"><span className="muted">New gaming PC</span><span className="mono">{IQD(newBuild)}</span></div>
              <div className="row"><span className="muted">Trade-in credit</span><span className="mono accent">− {IQD(value)}</span></div>
              <div className="row" style={{ borderBottom: 'none', paddingTop: 20 }}>
                <span style={{ fontWeight: 600 }}>Customer pays</span>
                <span className="mono" style={{ fontSize: '1.15rem', fontWeight: 700 }}>{IQD(pay)}</span>
              </div>

              <div className="divider" style={{ margin: '24px 0' }} />

              <div className="tiny mono" style={{ letterSpacing: '.12em', marginBottom: 12 }}>THE CIRCULAR LOOP</div>
              <div className="ladder" style={{ gap: 8 }}>
                {['Buy new','Use','Trade in','Grade & warranty','Resell','Next customer'].map((s, i, arr) => (
                  <React.Fragment key={s}>
                    <span className="ladder-step" style={{ fontSize: '.75rem', padding: '10px 14px' }}>{s}</span>
                    {i < arr.length - 1 && <span className="ladder-arrow">→</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------
   B2B
   ------------------------------------------------------------ */
function Business({ onToast }) {
  const [active, setActive] = useState('restaurant');
  const item = B2B.find((b) => b.id === active);

  return (
    <section id="business">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">07 — Tech for business</span>
          <h2 className="h2">Eventually more profitable than individual consumers.</h2>
          <p className="lead">
            Instead of selling one keyboard for 20,000 IQD, sell an entire business setup — and then
            keep earning every month by managing it.
          </p>
        </Reveal>

        <Reveal>
          <Tabs items={B2B.map((b) => ({ id: b.id, l: b.ico + '  ' + b.t }))} active={active} onChange={setActive} />
        </Reveal>

        <Reveal delay={60}>
          <div className="card">
            <div className="result-head">
              <div>
                <span className="tag accent">{item.ico} {item.t}</span>
                <h3 className="h3" style={{ marginTop: 12 }}>Complete technology package</h3>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div className="tiny mono">ONE-TIME</div>
                <div className="mono" style={{ fontSize: '1.2rem', fontWeight: 700 }}>{IQD(item.once)}</div>
                <div className="tiny" style={{ marginTop: 4 }}>or {IQD(item.monthly)} / month as a service</div>
              </div>
            </div>

            <div className="grid g-2" style={{ gap: 40 }}>
              <div>
                <div className="tiny mono" style={{ letterSpacing: '.12em', marginBottom: 12 }}>WHAT’S INCLUDED</div>
                {item.items.map((x) => <div className="bullet" key={x}>{x}</div>)}
              </div>
              <div>
                <div className="tiny mono" style={{ letterSpacing: '.12em', marginBottom: 12 }}>TECHNOLOGY AS A SERVICE</div>
                <p className="small" style={{ marginBottom: 16 }}>
                  Pay monthly and we provide, manage, maintain and support the entire technology
                  stack. Recurring revenue instead of one-off sales.
                </p>
                <div className="card-flat" style={{ marginBottom: 10 }}>
                  <div className="row" style={{ padding: '8px 0' }}><span className="muted">Hardware & installation</span><span className="mono">included</span></div>
                  <div className="row" style={{ padding: '8px 0' }}><span className="muted">Maintenance & support</span><span className="mono">included</span></div>
                  <div className="row" style={{ padding: '8px 0' }}><span className="muted">Backup & monitoring</span><span className="mono">included</span></div>
                  <div className="row" style={{ padding: '8px 0', borderBottom: 'none' }}><span className="muted">Replacement SLA</span><span className="mono">48 hours</span></div>
                </div>
                <button className="btn btn-primary btn-full" onClick={() => onToast('Quote request sent — we’ll contact you within one business day')}>
                  Request a quote
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------
   TRUST / TECH LAB
   ------------------------------------------------------------ */
function Trust() {
  const checks = [
    ['CPU test','Passed'],['GPU test','Passed'],['RAM test','Passed'],
    ['SSD health','100%'],['Temperature test','68°C max'],['Stability test','60 min'],['Benchmark','Recorded']
  ];
  return (
    <section id="trust">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">08 — Trust layer</span>
          <h2 className="h2">“We’ll make sure everything works together.”</h2>
          <p className="lead">
            This is the sentence that separates an ecosystem from a shop. Compatibility guarantee,
            a real testing laboratory and a QR code on every box.
          </p>
        </Reveal>

        <div className="grid g-3">
          <Reveal>
            <div className="card">
              <div className="icon-box">🛡</div>
              <h3 className="h3">Compatibility guarantee</h3>
              <p className="small" style={{ marginTop: 8, marginBottom: 16 }}>
                Every configuration is checked across CPU, motherboard, RAM, GPU, PSU, case and
                cooling before it is offered.
              </p>
              <div className="pill-list">
                {['CPU','Motherboard','RAM','GPU','PSU','Case','Cooling'].map((x) => <span className="pill" key={x}>{x} ✓</span>)}
              </div>
            </div>
          </Reveal>

          <Reveal delay={70}>
            <div className="card">
              <div className="icon-box">🔬</div>
              <h3 className="h3">Tech Lab testing</h3>
              <p className="small" style={{ marginTop: 8, marginBottom: 16 }}>
                Every assembled PC is tested and documented. The customer gets a digital report —
                not a promise.
              </p>
              {checks.map((c) => (
                <div className="report-row" key={c[0]}>
                  <span className="muted" style={{ fontSize: '.82rem' }}>{c[0]}</span>
                  <span className="check">{c[1]} ✓</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div className="card">
              <div className="icon-box">📱</div>
              <h3 className="h3">QR on every package</h3>
              <p className="small" style={{ marginTop: 8, marginBottom: 18 }}>
                The physical product connects to the digital platform: tutorials, firmware, parts,
                warranty and support.
              </p>
              <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
                <QRCode />
                <div className="small" style={{ fontSize: '.8rem' }}>
                  Scan → tutorial<br />
                  Scan → component list<br />
                  Scan → firmware<br />
                  Scan → troubleshooting<br />
                  Scan → warranty
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------
   MEMBERSHIP
   ------------------------------------------------------------ */
function Membership({ onToast }) {
  return (
    <section id="club">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">09 — Tech Club</span>
          <h2 className="h2">Turn one-time buyers into recurring customers.</h2>
          <p className="lead">
            A subscription layer converts a transactional relationship into a predictable one — and
            it keeps the customer inside the ecosystem between purchases.
          </p>
        </Reveal>

        <div className="grid g-3">
          {CLUB.map((c, i) => (
            <Reveal key={c.t} delay={i * 70}>
              <div className="card" style={c.hot ? { borderColor: 'rgba(200,247,81,.4)' } : undefined}>
                {c.hot && <div className="tag accent" style={{ marginBottom: 16 }}>MOST POPULAR</div>}
                <h3 className="h3">{c.t}</h3>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, margin: '14px 0 20px' }}>
                  <span className="mono" style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-.03em' }}>{c.p}</span>
                  <span className="tiny">{c.per}</span>
                </div>
                {c.feats.map((f) => <div className="bullet" key={f}>{f}</div>)}
                <button className={'btn btn-full ' + (c.hot ? 'btn-primary' : 'btn-ghost')} style={{ marginTop: 22 }}
                  disabled={!c.hot} onClick={() => onToast('Tech Club — launching with Phase 2')}>
                  {c.cta}
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------
   PLATFORM (inventory, suppliers, data, delivery)
   ------------------------------------------------------------ */
function Platform({ onToast }) {
  const [tab, setTab] = useState('inventory');

  const inventory = [
    { n:'ESP32 development board', s:'in', p:'In stock' },
    { n:'Arduino Uno R3', s:'in', p:'In stock' },
    { n:'RTX 4060 8GB', s:'mid', p:'2–3 days' },
    { n:'Ryzen 7 7800X3D', s:'mid', p:'2–3 days' },
    { n:'RTX 4070 Ti Super', s:'req', p:'On request' },
    { n:'27" 4K calibrated monitor', s:'req', p:'On request' }
  ];

  const suppliers = [
    { n:'Supplier A', price:'$20.00', ship:'$3.10', moq:'50', rel:'98%', def:'1.2%' },
    { n:'Supplier B', price:'$18.40', ship:'$4.60', moq:'200', rel:'91%', def:'3.8%' },
    { n:'Supplier C', price:'$19.20', ship:'$2.40', moq:'100', rel:'95%', def:'2.1%' }
  ];

  const dataBars = [
    ['Most searched GPU — RTX 4060', 86],
    ['Most requested PC budget — 1.0–1.5M IQD', 74],
    ['Most popular project — Smart Irrigation', 68],
    ['Peak season — September to December', 92],
    ['Attach rate — monitor with PC build', 61],
    ['Student share of total orders', 57]
  ];

  const delivery = [
    { c:'Sulaymaniyah', t:'Same day', d:'Order before 14:00' },
    { c:'Erbil', t:'Next day', d:'Defined service level' },
    { c:'Duhok', t:'1–2 days', d:'Defined service level' },
    { c:'Rest of Iraq', t:'3–5 days', d:'Tracked shipping' }
  ];

  const stages = ['Order confirmed','Preparing','Testing','Packed','Shipped','Delivered'];

  return (
    <section id="platform">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">10 — The platform layer</span>
          <h2 className="h2">The parts customers never see are the parts that protect the margin.</h2>
          <p className="lead">
            Inventory intelligence, supplier landed-cost modelling, proprietary data and delivery
            that behaves like a product — not an afterthought.
          </p>
        </Reveal>

        <Reveal>
          <Tabs
            active={tab}
            onChange={setTab}
            items={[
              { id:'inventory', l:'Inventory model' },
              { id:'suppliers', l:'Supplier intelligence' },
              { id:'data', l:'Data advantage' },
              { id:'delivery', l:'Delivery' }
            ]}
          />
        </Reveal>

        <Reveal delay={60}>
          {tab === 'inventory' && (
            <div className="card">
              <div className="split" style={{ gap: 44, alignItems: 'start' }}>
                <div>
                  <h3 className="h3" style={{ marginBottom: 12 }}>$10–15k of intelligent inventory beats $30k of random inventory.</h3>
                  <p className="small" style={{ marginBottom: 18 }}>
                    A hybrid model keeps capital efficient while staying honest with customers. The
                    website never pretends everything is immediately available.
                  </p>
                  <div className="grid" style={{ gap: 10 }}>
                    <div className="card-flat"><b>Stock</b><div className="tiny" style={{ marginTop: 4 }}>Fast-moving products held locally.</div></div>
                    <div className="card-flat"><b>On-demand</b><div className="tiny" style={{ marginTop: 4 }}>Expensive or slow products ordered when sold.</div></div>
                    <div className="card-flat"><b>Supplier network</b><div className="tiny" style={{ marginTop: 4 }}>Products we can acquire quickly on request.</div></div>
                    <div className="card-flat"><b>Private label</b><div className="tiny" style={{ marginTop: 4 }}>Products we eventually control and brand.</div></div>
                  </div>
                </div>
                <div>
                  <div className="tiny mono" style={{ letterSpacing: '.12em', marginBottom: 12 }}>LIVE AVAILABILITY EXAMPLE</div>
                  {inventory.map((it) => (
                    <div className="row" key={it.n}>
                      <span style={{ fontSize: '.88rem' }}>{it.n}</span>
                      <span className={'tag ' + (it.s === 'in' ? 'accent' : '')}>{it.p}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab === 'suppliers' && (
            <div className="card">
              <h3 className="h3" style={{ marginBottom: 10 }}>True landed cost, not the China price.</h3>
              <p className="small" style={{ marginBottom: 24, maxWidth: '70ch' }}>
                Internally we track price, shipping, MOQ, reliability and defect rate — then calculate
                the real landed cost including freight, customs, handling, expected defects and
                currency risk before setting a selling price.
              </p>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 520 }}>
                  <thead>
                    <tr>
                      {['Supplier','Unit price','Shipping','MOQ','Reliability','Defect rate'].map((h) => (
                        <th key={h} style={{ textAlign: 'left', padding: '12px 14px', fontSize: '.68rem', letterSpacing: '.12em', color: 'var(--dim)', fontFamily: 'var(--mono)', borderBottom: '1px solid var(--line)' }}>{h.toUpperCase()}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {suppliers.map((s) => (
                      <tr key={s.n}>
                        <td style={{ padding: '14px', fontSize: '.88rem', borderBottom: '1px solid rgba(255,255,255,.05)' }}>{s.n}</td>
                        <td style={{ padding: '14px', fontSize: '.85rem', fontFamily: 'var(--mono)', borderBottom: '1px solid rgba(255,255,255,.05)' }}>{s.price}</td>
                        <td style={{ padding: '14px', fontSize: '.85rem', fontFamily: 'var(--mono)', borderBottom: '1px solid rgba(255,255,255,.05)' }}>{s.ship}</td>
                        <td style={{ padding: '14px', fontSize: '.85rem', fontFamily: 'var(--mono)', borderBottom: '1px solid rgba(255,255,255,.05)' }}>{s.moq}</td>
                        <td style={{ padding: '14px', fontSize: '.85rem', fontFamily: 'var(--mono)', color: 'var(--accent)', borderBottom: '1px solid rgba(255,255,255,.05)' }}>{s.rel}</td>
                        <td style={{ padding: '14px', fontSize: '.85rem', fontFamily: 'var(--mono)', borderBottom: '1px solid rgba(255,255,255,.05)' }}>{s.def}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="notice" style={{ marginTop: 24 }}>
                <span>📊</span>
                <div>
                  Example: a <b>$20</b> component becomes <b>$20 + freight + customs + handling +
                  expected defects + currency risk</b>. The system recommends the selling price
                  automatically — protecting the margin on every order.
                </div>
              </div>
            </div>
          )}

          {tab === 'data' && (
            <div className="card">
              <h3 className="h3" style={{ marginBottom: 10 }}>Competitors have products. We have data.</h3>
              <p className="small" style={{ marginBottom: 26, maxWidth: '70ch' }}>
                After a few years this becomes the most valuable asset in the company: what people
                search for, what they build, what they return, what sells together and when.
              </p>
              {dataBars.map(([l, v], i) => (
                <div className="bar-row" key={l}>
                  <div className="bar-top"><span className="muted">{l}</span><span className="mono">{v}%</span></div>
                  <div className="bar-track"><div className="bar-fill" style={{ width: v + '%', transitionDelay: (i * 90) + 'ms' }} /></div>
                </div>
              ))}
            </div>
          )}

          {tab === 'delivery' && (
            <div className="card">
              <h3 className="h3" style={{ marginBottom: 10 }}>Delivery speed isn’t the differentiator. Predictability is.</h3>
              <p className="small" style={{ marginBottom: 24, maxWidth: '70ch' }}>
                Same-day delivery already exists locally. The opportunity is making the whole
                fulfilment chain transparent and integrated with service and warranty.
              </p>
              <div className="grid g-4" style={{ marginBottom: 30 }}>
                {delivery.map((d) => (
                  <div className="card-flat" key={d.c}>
                    <div className="mono" style={{ fontSize: '.72rem', color: 'var(--accent)', letterSpacing: '.1em' }}>{d.c.toUpperCase()}</div>
                    <div style={{ fontWeight: 600, marginTop: 8 }}>{d.t}</div>
                    <div className="tiny" style={{ marginTop: 4 }}>{d.d}</div>
                  </div>
                ))}
              </div>
              <div className="tiny mono" style={{ letterSpacing: '.12em', marginBottom: 14 }}>TRACKED ORDER STATES</div>
              <div className="ladder">
                {stages.map((s, i) => (
                  <React.Fragment key={s}>
                    <span className="ladder-step">{s}</span>
                    {i < stages.length - 1 && <span className="ladder-arrow">→</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------
   SEASONAL + MEDIA
   ------------------------------------------------------------ */
function Growth({ onToast }) {
  const drops = [
    { t:'Back-to-University', d:'August — September', x:'Student laptops, project kits, printing bundles' },
    { t:'Engineering Season', d:'September — December', x:'CAD workstations and lab equipment' },
    { t:'Gaming Season', d:'November — January', x:'Battle-station builds and peripherals' },
    { t:'Project Lab Month', d:'March — April', x:'Graduation project kits and mentorship' },
    { t:'Ramadan & Eid', d:'Seasonal', x:'Home technology, smart home, gifting bundles' },
    { t:'New Semester', d:'February', x:'Starter kits and study setups' }
  ];

  const content = [
    'How much does a good engineering laptop actually cost?',
    '5 mistakes students make when buying a PC',
    'Can this 1.4M IQD PC run SolidWorks?',
    'We built a complete IoT project for 300,000 IQD',
    'What’s the real difference between 16GB and 32GB RAM?',
    'Installing CCTV for a small shop — full breakdown'
  ];

  const flywheel = ['Content','Audience','Website','Sales','Customer data','Better products','More content'];

  return (
    <section id="growth">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">11 — Growth engine</span>
          <h2 className="h2">Marketing should teach, not shout.</h2>
          <p className="lead">
            Social platforms dominate Iraqi online shopping — around 82% of online shoppers use
            social pages, while only about a fifth use online-only retailers. Education-led content
            is how a shop becomes an authority.
          </p>
        </Reveal>

        <Reveal>
          <div className="grid g-3" style={{ marginBottom: 64 }}>
            {drops.map((d, i) => (
              <Reveal key={d.t} delay={i * 45}>
                <div className="card card-tight">
                  <div className="mono big-num">{d.d.toUpperCase()}</div>
                  <h3 className="h3" style={{ margin: '10px 0 6px' }}>{d.t}</h3>
                  <p className="tiny">{d.x}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>

        <div className="split" style={{ gap: 48, alignItems: 'start' }}>
          <Reveal>
            <h3 className="h3" style={{ marginBottom: 6 }}>Educational content beats price shouting</h3>
            <p className="small" style={{ marginBottom: 20 }}>
              A Kurdish-language technology media brand — reviews, benchmarks, builds, projects, AI,
              robotics and tutorials — that drives traffic straight into the store.
            </p>
            {content.map((c) => (
              <div className="row" key={c} style={{ cursor: 'pointer' }} onClick={() => onToast('Content library — Phase 1 launch')}>
                <span style={{ fontSize: '.88rem' }}>{c}</span>
                <span className="accent">→</span>
              </div>
            ))}
          </Reveal>

          <Reveal delay={90}>
            <div className="card">
              <h3 className="h3" style={{ marginBottom: 8 }}>The flywheel</h3>
              <p className="small" style={{ marginBottom: 22 }}>
                Each turn makes the next one cheaper and stronger.
              </p>
              <div className="ladder">
                {flywheel.map((f, i) => (
                  <React.Fragment key={f}>
                    <span className="ladder-step" style={{ fontSize: '.78rem', padding: '12px 16px' }}>{f}</span>
                    {i < flywheel.length - 1 && <span className="ladder-arrow">→</span>}
                  </React.Fragment>
                ))}
              </div>
              <div className="divider" style={{ margin: '26px 0' }} />
              <div className="tiny mono" style={{ letterSpacing: '.12em', marginBottom: 12 }}>COMPETITIVE POSITION</div>
              <p className="small">
                Serious local competitors already demonstrate organised e-commerce, PC building,
                gaming bundles and delivery. Our advantage is not the online store — it is the
                integrated ecosystem, proprietary project products, data and the service layer.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------
   ROADMAP
   ------------------------------------------------------------ */
function Roadmap() {
  return (
    <section id="roadmap">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">12 — Build order</span>
          <h2 className="h2">Don’t launch twenty ideas at once.</h2>
          <p className="lead">
            That is how a promising company becomes chaotic. Each phase funds the next one, and each
            phase has a single measurable goal.
          </p>
        </Reveal>

        <div className="grid g-2" style={{ gap: 20 }}>
          {ROADMAP.map((p, i) => (
            <Reveal key={p.phase} delay={i * 70}>
              <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <span className="tag accent">{p.phase}</span>
                  <span className="mono tiny">{p.time}</span>
                </div>
                <h3 className="h2" style={{ fontSize: '1.35rem', marginBottom: 8 }}>{p.title}</h3>
                <p className="small" style={{ marginBottom: 18 }}><b style={{ color: 'var(--text)' }}>Goal:</b> {p.goal}</p>
                {p.items.map((it) => <div className="bullet" key={it}>{it}</div>)}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------
   REVENUE + CAPITAL + LADDER
   ------------------------------------------------------------ */
function Economics() {
  return (
    <section id="economics">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">13 — The model</span>
          <h2 className="h2">Seven revenue engines. One customer journey.</h2>
          <p className="lead">
            The point is not to sell a $10 component. The point is what that $10 component can
            become.
          </p>
        </Reveal>

        <div className="grid g-4" style={{ marginBottom: 64 }}>
          {ENGINES.map((e, i) => (
            <Reveal key={e.t} delay={i * 45}>
              <div className="card card-tight">
                <div style={{ fontSize: '1.4rem', marginBottom: 12 }}>{e.ico}</div>
                <h3 className="h3">{e.t}</h3>
                <p className="tiny" style={{ marginTop: 6 }}>{e.d}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="card" style={{ marginBottom: 64 }}>
            <h3 className="h3" style={{ marginBottom: 8 }}>The ladder</h3>
            <p className="small" style={{ marginBottom: 22 }}>
              Someone arrives for a $10 electronic component. The ecosystem gives them a reason to
              keep climbing.
            </p>
            <div className="ladder">
              {LADDER.map((l, i) => (
                <React.Fragment key={l}>
                  <span className="ladder-step">{l}</span>
                  {i < LADDER.length - 1 && <span className="ladder-arrow">→</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal className="section-head">
          <span className="eyebrow">14 — Capital</span>
          <h2 className="h2">Fund the machine in stages.</h2>
          <p className="lead">
            The first $10–15k should prove the machine works — not attempt to build the entire
            machine immediately.
          </p>
        </Reveal>

        <div className="grid g-3">
          {CAPITAL.map((c, i) => (
            <Reveal key={c.t} delay={i * 70}>
              <div className="card">
                <div className="tiny mono" style={{ letterSpacing: '.12em' }}>{c.t.toUpperCase()}</div>
                <div className="mono" style={{ fontSize: '1.25rem', fontWeight: 700, margin: '12px 0 10px', letterSpacing: '-.03em' }}>{c.amount}</div>
                <p className="small" style={{ marginBottom: 20 }}>{c.focus}</p>
                {c.alloc.map(([l, v]) => (
                  <div className="bar-row" key={l}>
                    <div className="bar-top"><span className="muted" style={{ fontSize: '.78rem' }}>{l}</span><span className="mono" style={{ fontSize: '.78rem' }}>{v}%</span></div>
                    <div className="bar-track"><div className="bar-fill" style={{ width: v + '%' }} /></div>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------
   CTA + FOOTER
   ------------------------------------------------------------ */
function CTA({ onToast }) {
  return (
    <section id="start">
      <div className="container">
        <Reveal>
          <div className="card" style={{ padding: 'clamp(32px,6vw,64px)', textAlign: 'center', background: 'linear-gradient(180deg,rgba(200,247,81,.07),rgba(255,255,255,.012))' }}>
            <span className="eyebrow plain" style={{ justifyContent: 'center' }}>Ready to build</span>
            <h2 className="h2" style={{ maxWidth: 720, margin: '0 auto 18px' }}>
              Don’t just buy technology. Tell us what you want to accomplish.
            </h2>
            <p className="lead" style={{ margin: '0 auto 32px' }}>
              A component, a PC, a complete room, a university project, an office, a smart home or an
              entire business technology system — the same platform handles all of it.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn btn-primary" onClick={() => {
                const el = document.getElementById('configurator');
                if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
              }}>Start configuring →</button>
              <button className="btn btn-ghost" onClick={() => onToast('Blueprint request received')}>Request the full blueprint</button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  const cols = [
    { h:'Ecosystem', l:['Shop','Build','Projects','Lab','Services','Business'] },
    { h:'Company', l:['About','Careers','Press','Partners','Contact'] },
    { h:'Support', l:['Warranty','Compatibility guarantee','Delivery','Returns','Tech Club'] }
  ];
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="logo" style={{ marginBottom: 16 }}>
              <span className="logo-mark">NX</span><span>NEXA</span>
            </div>
            <p className="small" style={{ maxWidth: 300 }}>
              A technology ecosystem for Kurdistan and Iraq — shop, build, learn, install, maintain
              and upgrade.
            </p>
            <div className="tag-row" style={{ marginTop: 20 }}>
              <span className="tag">Sulaymaniyah</span>
              <span className="tag">Erbil</span>
              <span className="tag">Duhok</span>
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.h}>
              <h4>{c.h}</h4>
              <div className="footer-links">
                {c.l.map((x) => <a key={x} href="#top" onClick={(e) => e.preventDefault()}>{x}</a>)}
              </div>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} NEXA Technology Ecosystem. All rights reserved.</span>
          <span className="mono">KU · AR · EN · Built for Kurdistan & Iraq</span>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------
   CART DRAWER
   ------------------------------------------------------------ */
function CartDrawer({ open, onClose, cart, onRemove, onClear, onToast }) {
  const total = cart.reduce((s, c) => s + c.price, 0);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <div className={'backdrop' + (open ? ' open' : '')} onClick={onClose} />
      <aside className={'drawer' + (open ? ' open' : '')} aria-hidden={!open}>
        <div className="drawer-head">
          <div>
            <div style={{ fontWeight: 600 }}>Your cart</div>
            <div className="tiny">{cart.length} item{cart.length !== 1 ? 's' : ''}</div>
          </div>
          <button className="close-x" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <div className="drawer-body">
          {cart.length === 0 ? (
            <div className="empty-state">
              <div style={{ fontSize: '1.6rem', marginBottom: 12 }}>🛍</div>
              Nothing here yet.<br />Configure a build or pick a project kit.
            </div>
          ) : cart.map((c, i) => (
            <div className="cart-item" key={i}>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: '.9rem', fontWeight: 600 }}>{c.name}</div>
                <div className="tiny" style={{ marginTop: 3 }}>{c.detail}</div>
                <div className="mono" style={{ fontSize: '.8rem', marginTop: 8, color: 'var(--accent)' }}>{IQD(c.price)}</div>
              </div>
              <button className="close-x" style={{ width: 28, height: 28, fontSize: '.8rem' }} onClick={() => onRemove(i)} aria-label="Remove">✕</button>
            </div>
          ))}
        </div>

        <div className="drawer-foot">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
            <span className="muted" style={{ fontSize: '.85rem' }}>Estimated total</span>
            <span className="mono" style={{ fontSize: '1.2rem', fontWeight: 700 }}>{IQD(total)}</span>
          </div>
          <button className="btn btn-primary btn-full" disabled={!cart.length}
            onClick={() => { onToast('Order request sent — our team will confirm within 2 hours'); onClear(); }}>
            Request order
          </button>
          <p className="tiny" style={{ marginTop: 12, textAlign: 'center' }}>
            Compatibility checked · Tech Lab tested · Delivery confirmed before payment
          </p>
        </div>
      </aside>
    </>
  );
}

/* ------------------------------------------------------------
   APP
   ------------------------------------------------------------ */
function App() {
  useReveal();
  const progress = useScrollProgress();

  const [cart, setCart] = useState([]);
  const [drawer, setDrawer] = useState(false);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  const showToast = useCallback((msg) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2800);
  }, []);

  const addToCart = useCallback((item) => {
    setCart((c) => [...c, item]);
    showToast('Added: ' + item.name);
  }, [showToast]);

  const removeFromCart = (i) => setCart((c) => c.filter((_, idx) => idx !== i));
  const clearCart = () => setCart([]);

  return (
    <>
      <div className="progress" style={{ width: progress + '%' }} />
      <Nav cartCount={cart.length} onCartOpen={() => setDrawer(true)} onToast={showToast} />
      <Hero onToast={showToast} />
      <Marquee />
      <Ecosystem />
      <Configurator onAdd={addToCart} onToast={showToast} />
      <ProjectLab onAdd={addToCart} onToast={showToast} />
      <Hardware onToast={showToast} />
      <AIAssistant onToast={showToast} />
      <Marketplace onToast={showToast} />
      <Business onToast={showToast} />
      <Trust />
      <Membership onToast={showToast} />
      <Platform onToast={showToast} />
      <Growth onToast={showToast} />
      <Roadmap />
      <Economics />
      <CTA onToast={showToast} />
      <Footer />

      <CartDrawer
        open={drawer}
        onClose={() => setDrawer(false)}
        cart={cart}
        onRemove={removeFromCart}
        onClear={clearCart}
        onToast={showToast}
      />

      <div className={'toast' + (toast ? ' show' : '')}>{toast}</div>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
