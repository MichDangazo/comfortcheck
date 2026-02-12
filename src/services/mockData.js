// Static base data for all classrooms
const baseClassrooms = [
  { id: 1, name: "Room 101", temperature: 23.5, humidity: 55 },
  { id: 2, name: "Room 102", temperature: 27.2, humidity: 62 },
  { id: 3, name: "Room 103", temperature: 31.8, humidity: 70 },
  { id: 4, name: "Room 104", temperature: 22.1, humidity: 48 },
  { id: 5, name: "Room 105", temperature: 26.5, humidity: 58 },
  { id: 6, name: "Room 106", temperature: 29.4, humidity: 65 },
  { id: 7, name: "Room 107", temperature: 24.0, humidity: 52 },
  { id: 8, name: "Room 108", temperature: 28.1, humidity: 60 },
];

// Determine comfort level based on temperature
const getComfortLevel = (temp) => {
  if (temp <= 25) return "comfortable";
  if (temp <= 29) return "warm";
  return "hot";
};

// Initial fetch – returns a fresh copy with comfort added
export const fetchClassrooms = () => {
  return baseClassrooms.map((room) => ({
    ...room,
    comfort: getComfortLevel(room.temperature),
  }));
};

// Simulate real-time changes – call this every few seconds
export const generateLiveData = () => {
  return baseClassrooms.map((room) => {
    // Slight random variation (±1.5°C, ±8% humidity)
    const newTemp = +(room.temperature + (Math.random() * 3 - 1.5)).toFixed(1);
    const newHumidity = Math.min(
      90,
      Math.max(30, room.humidity + Math.floor(Math.random() * 11 - 5))
    );
    return {
      ...room,
      temperature: newTemp,
      humidity: newHumidity,
      comfort: getComfortLevel(newTemp),
    };
  });
};