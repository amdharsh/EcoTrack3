# Benchmarks and Multipliers
BENCHMARK_INTENSITY = 0.0015  # kgCO2e/$
OFFSET_INTENSITY_THRESHOLD = 0.002  #

# Example factors from documentation
MCC_BASE_FACTORS = {
    "4900": 0.0025,  # Utility MCC example
    "GAS_STATION": 0.0028,
}

COUNTRY_MULTIPLIERS = {
    "China": 1.5,
    "USA": 1.0,
}
def calculate_emission(amount_usd, mcc_code, country):
    """
    Formula: Amount (USD) x Base Factor (MCC) x Country Multiplier
    """
    base_factor = MCC_BASE_FACTORS.get(mcc_code, 0.001) # Default factor if not found
    multiplier = COUNTRY_MULTIPLIERS.get(country, 1.0)
    
    total_emission = amount_usd * base_factor * multiplier
    return total_emission
    def calculate_sustainability_score(total_emissions, total_spending):
    """
    1. Calculate avg intensity: emissions / spending
    2. Compare against benchmark: 100 - (intensity / benchmark) * 50
    3. Clamp to 0-100
    """
    if total_spending == 0:
        return 100
        
    avg_intensity = total_emissions / total_spending
    
    # Formula: score = 100 - (avgIntensity / 0.0015) * 50
    score = 100 - (avg_intensity / BENCHMARK_INTENSITY) * 50
    
    # Clamp to 0-100 range
    return max(0, min(100, score))
    def generate_recommendations(utility_spending, transport_spending, avg_intensity):
    recommendations = []
    
    # Energy: Triggered when Utility spending (MCC 4900) > $2,000
    if utility_spending > 2000:
        recommendations.append({
            "category": "Energy",
            "suggestion": "Solar/renewable energy partners"
        })
        
    # Transport: Triggered when Fuel/transport spending > $1,000
    if transport_spending > 1000:
        recommendations.append({
            "category": "Transport",
            "suggestion": "EV fleet leasing partners"
        })
        
    # General Offset: Triggered when intensity > 0.002 kgCO2e/$
    if avg_intensity > OFFSET_INTENSITY_THRESHOLD:
        recommendations.append({
            "category": "General Offset",
            "suggestion": "Carbon offset programs"
        })
        
    return recommendations
    # 1. New Transaction: $1,000 at a China gas station
new_emission = calculate_emission(1000, "GAS_STATION", "China")
# Result: 4.2 kgCO2e

# 2. Aggregated Data for Scoring
user_total_emissions = 4500  # example
user_total_spending = 4000000 # example
score = calculate_sustainability_score(user_total_emissions, user_total_spending)

# 3. Generate Personalized Recs
recs = generate_recommendations(
    utility_spending=2500, 
    transport_spending=1200, 
    avg_intensity=0.0025
)
