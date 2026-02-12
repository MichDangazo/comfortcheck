import { useState, useEffect } from "react";
import ClassroomCard from "../components/ClassroomCard";
import { fetchClassrooms, generateLiveData } from "../services/mockData";

const CampusOverview = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Initial load
  useEffect(() => {
    setClassrooms(fetchClassrooms());
  }, []);

  // Simulate real-time updates every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setClassrooms(generateLiveData());
      setLastUpdated(new Date());
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Count how many classrooms in each comfort category
  const counts = classrooms.reduce(
    (acc, room) => {
      acc[room.comfort] = (acc[room.comfort] || 0) + 1;
      return acc;
    },
    { comfortable: 0, warm: 0, hot: 0 }
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">ComfortCheck</h1>
        <p className="text-gray-600">Campus Overview – Real-time comfort levels</p>
        <div className="mt-2 text-sm text-gray-500">
          Last updated: {lastUpdated.toLocaleTimeString()}
        </div>
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="text-green-700 font-semibold">😊 Comfortable</div>
          <div className="text-2xl font-bold text-green-800">{counts.comfortable}</div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <div className="text-yellow-700 font-semibold">😐 Warm</div>
          <div className="text-2xl font-bold text-yellow-800">{counts.warm}</div>
        </div>
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <div className="text-red-700 font-semibold">🥵 Hot</div>
          <div className="text-2xl font-bold text-red-800">{counts.hot}</div>
        </div>
      </div>

      {/* Classroom Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {classrooms.map((room) => (
          <ClassroomCard key={room.id} classroom={room} />
        ))}
      </div>

      {/* Legend */}
      <div className="mt-8 text-xs text-gray-400 flex gap-4">
        <span>🟢 Comfortable (≤25°C)</span>
        <span>🟡 Warm (26–29°C)</span>
        <span>🔴 Hot (≥30°C)</span>
      </div>
    </div>
  );
};

export default CampusOverview;