import healthCheckupImg from "../assets/images/health-checkup.png";
import gymPassImg from "../assets/images/gym-pass.png";
import nutriConnectImg from "../assets/images/nutri-connect.png";
import yogaImg from "../assets/images/yoga.png";
import car from "../assets/images/car-ins-2.png";
import bike from "../assets/images/bike-ins-2.png";
import opd from "../assets/images/opd-ins-2.png";
import health from "../assets/images/health-ins-2.png";
import topup from "../assets/images/top-up-health-ins-2.png";
import term from "../assets/images/term-life-ins-2.png";
import women from "../assets/images/women-c-ins-2.png";

// ================= GROUP INSURANCE BENEFITS =================

export const groupBenefits = [
  {
    id: "grp-health",
    title: "Health Insurance",
    baseCover: "₹5 Lakh",
    basePrice: 0,
    coins: 0,
    members: ["Self"],
    type: "group"
  },
  {
    id: "grp-parents",
    title: "Parents Health Insurance",
    baseCover: "₹5 Lakh",
    basePrice: 8450,
    coins: 0,
    members: ["Father"],
    type: "group"
  },
  {
    id: "grp-accident",
    title: "Personal Accident Insurance",
    baseCover: "₹30 Lakh",
    basePrice: 4200,
    coins: 0,
    members: ["Self"],
    type: "group"
  },
  {
    id: "grp-term",
    title: "Term Life Insurance",
    baseCover: "₹50 Lakh",
    basePrice: 6350,
    coins: 0,
    members: ["Self"],
    type: "group"
  }
];



export const wellnessBenefits = [
  {
    id: "health-checkup",
    title: "Annual Health Checkup",
    image: healthCheckupImg,
    subtitle: "Fit India Full Body Checkup With Vitamin Screening",
    bullets: [
      "Check your health in one visit",
      "Includes radiology and pathology tests",
      "Easy booking",
      "Priority appointments",
      "Reliable lab reports",
      "10-hour fasting required"
    ],
    price: 1100,
    coins: 400,
    original: 2000,
    discount: "25% OFF"
  },

  {
    id: "gym-pass",
    title: "Fitpass Gyms",
    image: gymPassImg,
    subtitle: "Unlock Your Fitness Potential (12 Month)",
    bullets: [
      "Access 8,100+ premium gyms",
      "Visit any facility thrice per week",
      "AI enabled fitness coach",
      "Workout classes across globe",
      "Access valid for 1 year"
    ],
    price: 2199,
    coins: 400,
    original: 2599
  },

  {
    id: "nutri-connect",
    title: "Nutri Connect",
    image: nutriConnectImg,
    subtitle: "Unlock Your Fitness Potential (12 Month)",
    bullets: [
      "1 full discovery nutrition session",
      "3 follow up sessions",
      "Personal nutrition chart",
      "Progress tracking"
    ],
    price: 1000,
    coins: 1000,
    coinsOnly: true
  },

  {
    id: "yoga",
    title: "HIFY",
    image: yogaImg,
    subtitle: "High Intensity Fitness Yoga (4 Weeks)",
    bullets: [
      "Improve respiratory health",
      "Improve concentration",
      "Build muscle strength"
    ],
    price: 500,
    coins: 100
  }
];

export const personalBenefits = [
  {
    id: "car",
    title: "Car Insurance",
    image: car,
    type: "unlock",
    discount: "95%",
    price: 400,
    features: ["Comprehensive cover", "Zero dep", "Engine protect", "Cashless garages"]
  },
  {
    id: "bike",
    title: "Two Wheeler Insurance",
    image: bike,
    type: "unlock",
    discount: "80%",
    price: 400,
    features: ["No inspection", "Cashless garages", "Instant policy"]
  },
  {
    id: "opd",
    title: "OPD Insurance",
    image: opd,
    type: "dynamic",
    covers: [25000, 50000],
    basePremium: 415,
    features: ["Doctor visits", "Lab tests", "Medicines"]
  },
  {
    id: "health",
    title: "Health Insurance",
    image: health,
    type: "dynamic",
    covers: [1500000, 2500000, 3500000],
    basePremium: 5946,
    features: ["Hospitalization", "Room rent", "Day care"]
  },
  {
    id: "topup",
    title: "Super Top-up",
    image: topup,
    type: "dynamic",
    covers: [2000000, 3000000],
    basePremium: 8415,
    features: ["High cover", "Low premium"]
  },
  {
    id: "term",
    title: "Term Life",
    image: term,
    type: "dynamic",
    covers: [1000000, 1500000, 5000000],
    basePremium: 3415,
    features: ["No medical test", "Instant policy"]
  },
  {
    id: "women",
    title: "Women Cancer Cover",
    image: women,
    type: "dynamic",
    covers: [2000000, 3000000, 5000000],
    basePremium: 1095,
    features: ["Breast & cervical cancer", "Fast payout"]
  }
];

export const CLIENTS = [
  { id: "suzlon", name: "Suzlon" },
  { id: "intel", name: "Intel" },
  { id: "dell", name: "Dell" }
];

export const CLIENT_PLAN_RULES = {
  suzlon: {
    group: null,       // null = show ALL (existing behavior)
    wellness: null,
    personal: null
  },

  intel: {
    group: ["grp-health", "grp-parents", "grp-term"],
    wellness: ["health-checkup", "gym-pass", "yoga"],
    personal: ["car", "bike", "opd", "health"]
  },

  dell: {
    group: ["grp-health", "grp-accident", "grp-term"],
    wellness: ["nutri-connect", "yoga", "health-checkup"],
    personal: ["car", "opd", "women", "term"]
  }
};

export const CLIENT_EMPLOYEE_MAP = {
  suzlon: { name: "Lokeswara Tumma", code: "SZL1024" },
  intel:  { name: "T L V Prasad", code: "INT8842" },
  dell:   { name: "Arha Sri Charan", code: "DLL7721" }
};


