export const convertTemperature = (celsius, toUnit) => {
  if (toUnit === 'fahrenheit') {
    return (celsius * 9/5) + 32;
  }
  return celsius;
};

export const formatTemperature = (celsius, unit, decimals = 1) => {
  const converted = convertTemperature(celsius, unit);
  const symbol = unit === 'fahrenheit' ? '°F' : '°C';
  return `${converted.toFixed(decimals)}${symbol}`;
};