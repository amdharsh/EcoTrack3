import { calculateSustainabilityScore } from './utils/ecoLogic';
// Constants derived from your logic images
const BENCHMARK = 0.0015;
const OFFSET_THRESHOLD = 0.002;

const MCC_FACTORS = {
  "GAS_STATION": 0.0028,
  "4900": 0.0025, // Utilities
  "TRANSPORT": 0.0018,
  "DEFAULT": 0.001
};

const COUNTRY_MULTIPLIERS = {
  "China": 1.5,
  "USA": 1.0,
  "India": 1.2
};

/** * 1. Emission Calculation Formula 
 * Image Logic: Amount * Base Factor * Country Multiplier
 */
export const calculateEmission = (amount, mcc, country = "USA") => {
  const factor = MCC_FACTORS[mcc] || MCC_FACTORS["DEFAULT"];
  const multiplier = COUNTRY_MULTIPLIERS[country] || 1.0;
  return amount * factor * multiplier;
};

/** * 2. Sustainability Score Algorithm 
 * Image Logic: 100 - (avgIntensity / benchmark) * 50
 */
export const calculateSustainabilityScore = (totalEmissions, totalSpending) => {
  if (totalSpending === 0) return 100;
  const avgIntensity = totalEmissions / totalSpending;
  const score = 100 - (avgIntensity / BENCHMARK) * 50;
  return Math.max(0, Math.min(100, Math.round(score)));
};

/** * 3. Recommendation Engine Logic
 */
export const getRecommendations = (data) => {
  const { utilitySpending, transportSpending, totalEmissions, totalSpending } = data;
  const avgIntensity = totalEmissions / totalSpending;
  const recs = [];

  if (utilitySpending > 2000) {
    recs.push({ title: "Energy", text: "Suggests: Solar/renewable energy partners" });
  }
  if (transportSpending > 1000) {
    recs.push({ title: "Transport", text: "Suggests: EV fleet leasing partners" });
  }
  if (avgIntensity > OFFSET_THRESHOLD) {
    recs.push({ title: "General Offset", text: "Suggests: Carbon offset programs" });
  }

  return recs;
};
