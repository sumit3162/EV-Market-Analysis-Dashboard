
function calculateCrossCorrelation(evCounts, chargerCounts) {

  const commonCities = Object.keys(evCounts).filter(city => chargerCounts.hasOwnProperty(city));
  

  const evValues = commonCities.map(city => evCounts[city]);
  const chargerValues = commonCities.map(city => chargerCounts[city]);
  

  const { covariance, varianceEv, varianceCharger } = evValues.reduce(
    (acc, ev, i) => {
      const charger = chargerValues[i];
      acc.covariance += (ev - mean(evValues)) * (charger - mean(chargerValues));
      acc.varianceEv += Math.pow(ev - mean(evValues), 2);
      acc.varianceCharger += Math.pow(charger - mean(chargerValues), 2);
      return acc;
    }, 
    { covariance: 0, varianceEv: 0, varianceCharger: 0 }
  );
  
  return covariance / Math.sqrt(varianceEv * varianceCharger);
}


function mean(arr) {
  return arr.reduce((a,b) => a + b, 0) / arr.length;
}


const correlation = calculateCrossCorrelation(
  { 'Bangalore': 3250, 'Delhi': 2800 }, 
  { 'Bangalore': 320, 'Delhi': 280 }
);
console.log(`Correlation: ${correlation.toFixed(2)}`);