import { useState, useEffect, useMemo, useCallback } from "react";
import { useLocalStorage } from '../hooks/useLocalStorage';
import Header from "../components/layout/Header";
import SummaryStats from "../components/dashboard/SummaryStats";
import ClassroomCard from "../components/dashboard/ClassroomCard";
import Legend from "../components/layout/Legend";
import Button from "../components/common/Button";
import { fetchClassrooms, generateLiveData } from "../services/mockData";

const CampusOverview = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [autoRefresh, setAutoRefresh] = useState(true);
  
  const [preferences] = useLocalStorage('comfortcheck_preferences', {
    refreshInterval: 10,
    temperatureUnit: 'celsius',
  });

  useEffect(() => {
    const data = fetchClassrooms();
    setClassrooms(data);
  }, []);

  useEffect(() => {
    if (!autoRefresh) return;
    
    const interval = setInterval(() => {
      const newData = generateLiveData();
      setClassrooms(newData);
      setLastUpdated(new Date());
    }, preferences.refreshInterval * 1000);
    
    return () => clearInterval(interval);
  }, [autoRefresh, preferences.refreshInterval]);

  const filteredClassrooms = useMemo(() => {
    if (selectedFilter === "all") {
      return classrooms;
    }
    return classrooms.filter((room) => room.comfort === selectedFilter);
  }, [classrooms, selectedFilter]);

  const counts = useMemo(() => {
    return classrooms.reduce(
      (acc, room) => {
        acc[room.comfort] = (acc[room.comfort] || 0) + 1;
        return acc;
      },
      { comfortable: 0, warm: 0, hot: 0 }
    );
  }, [classrooms]);

  const handleRefresh = useCallback(() => {
    const newData = generateLiveData();
    setClassrooms(newData);
    setLastUpdated(new Date());
  }, []);

  const handleStatClick = useCallback((filter) => {
    setSelectedFilter(selectedFilter === filter ? "all" : filter);
  }, [selectedFilter]);

  return (
    <main className="page-container">
      <Header 
        title="ComfortCheck" 
        lastUpdated={lastUpdated}
        onRefresh={handleRefresh}
        userRole="Facility Manager"
      />

      <section className="controls-section" aria-label="Controls">
        <div className="controls-group">
          <Button
            variant={autoRefresh ? "success" : "outline"}
            size="sm"
            onClick={() => setAutoRefresh(!autoRefresh)}
            aria-pressed={autoRefresh}
          >
            {autoRefresh ? "🔴 Auto-refresh On" : "⚫ Auto-refresh Off"}
          </Button>
          {selectedFilter !== "all" && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setSelectedFilter("all")}
              aria-label="Clear filter"
            >
              Clear Filter ✕
            </Button>
          )}
        </div>
      </section>

      <section aria-label="Summary Statistics">
        <SummaryStats counts={counts} onStatClick={handleStatClick} />
      </section>

      {selectedFilter !== "all" && (
        <div className="filter-indicator" role="status" aria-live="polite">
          Showing: <span className="filter-text">{selectedFilter} classrooms</span>
        </div>
      )}

      <section aria-label="Classroom Grid">
        <div className="classroom-grid">
          {filteredClassrooms.map((room) => (
            <ClassroomCard 
              key={room.id} 
              classroom={room}
            />
          ))}
        </div>
      </section>

      {filteredClassrooms.length === 0 && (
        <div className="empty-state" role="status">
          <p className="empty-text">No classrooms match the selected filter.</p>
        </div>
      )}

      <Legend />
    </main>
  );
};

export default CampusOverview;