import { useState, useEffect } from "react";
import { useLocalStorage } from '../hooks/useLocalStorage';
import Header from "../components/layout/Header";
import SummaryStats from "../components/dashboard/SummaryStats";
import ClassroomCard from "../components/dashboard/ClassroomCard";
import Legend from "../components/layout/Legend";
import Button from "../components/common/Button";
import { fetchClassrooms, generateLiveData } from "../services/mockData";

const CampusOverview = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [filteredClassrooms, setFilteredClassrooms] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [autoRefresh, setAutoRefresh] = useState(true);
  
  // Get preferences from local storage
  const [preferences] = useLocalStorage('comfortcheck_preferences', {
    refreshInterval: 10,
    temperatureUnit: 'celsius',
  });

  // Initial load
  useEffect(() => {
    const data = fetchClassrooms();
    setClassrooms(data);
    setFilteredClassrooms(data);
  }, []);

  // Auto-refresh based on preferences
  useEffect(() => {
    if (!autoRefresh) return;
    
    const interval = setInterval(() => {
      const newData = generateLiveData();
      setClassrooms(newData);
      setLastUpdated(new Date());
    }, preferences.refreshInterval * 1000); // Use preference
    
    return () => clearInterval(interval);
  }, [autoRefresh, preferences.refreshInterval]);

  // Apply filter when classrooms or selectedFilter changes
  useEffect(() => {
    if (selectedFilter === "all") {
      setFilteredClassrooms(classrooms);
    } else {
      setFilteredClassrooms(
        classrooms.filter((room) => room.comfort === selectedFilter)
      );
    }
  }, [classrooms, selectedFilter]);

  // Count classrooms by comfort level
  const counts = classrooms.reduce(
    (acc, room) => {
      acc[room.comfort] = (acc[room.comfort] || 0) + 1;
      return acc;
    },
    { comfortable: 0, warm: 0, hot: 0 }
  );

  // Handle refresh button click
  const handleRefresh = () => {
    const newData = generateLiveData();
    setClassrooms(newData);
    setLastUpdated(new Date());
  };

  // Handle stat card click
  const handleStatClick = (filter) => {
    setSelectedFilter(selectedFilter === filter ? "all" : filter);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Header 
        title="ComfortCheck" 
        lastUpdated={lastUpdated}
        onRefresh={handleRefresh}
        userRole="Facility Manager"
      />

      {/* Auto-refresh toggle */}
      <div className="mb-4 flex items-center gap-2">
        <Button
          variant={autoRefresh ? "success" : "outline"}
          size="sm"
          onClick={() => setAutoRefresh(!autoRefresh)}
        >
          {autoRefresh ? "🔴 Auto-refresh On" : "⚫ Auto-refresh Off"}
        </Button>
        {selectedFilter !== "all" && (
          <Button variant="ghost" size="sm" onClick={() => setSelectedFilter("all")}>
            Clear Filter ✕
          </Button>
        )}
        <span className="text-xs text-gray-500 ml-2">
          (Interval: {preferences.refreshInterval}s)
        </span>
      </div>

      <SummaryStats counts={counts} onStatClick={handleStatClick} />

      {/* Filter indicator */}
      {selectedFilter !== "all" && (
        <div className="mb-4 text-sm text-gray-600">
          Showing: <span className="font-medium capitalize">{selectedFilter} classrooms</span>
        </div>
      )}

      {/* Classroom grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredClassrooms.map((room) => (
          <ClassroomCard 
            key={room.id} 
            classroom={room}
          />
        ))}
      </div>

      {/* Empty state */}
      {filteredClassrooms.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No classrooms match the selected filter.</p>
        </div>
      )}

      <Legend />
    </div>
  );
};

export default CampusOverview;