import { useState, useCallback } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { formatTemperature } from '../../utils/temperature';
import Card from "../common/Card";
import Badge from "../common/Badge";
import RoomDetailsModal from './RoomDetailsModal';

const comfortConfig = {
  comfortable: { variant: "success", label: "😊 Comfortable", icon: "✅" },
  warm: { variant: "warning", label: "😐 Warm", icon: "⚠️" },
  hot: { variant: "danger", label: "🥵 Hot", icon: "🔥" },
};

const ClassroomCard = ({ classroom }) => {
  const [showDetails, setShowDetails] = useState(false);
  const { id, name, temperature, humidity, comfort } = classroom;
  const config = comfortConfig[comfort] || comfortConfig.comfortable;
  
  const [preferences] = useLocalStorage('comfortcheck_preferences', {
    temperatureUnit: 'celsius',
  });

  const handleClick = useCallback(() => {
    setShowDetails(true);
  }, []);

  const handleClose = useCallback(() => {
    setShowDetails(false);
  }, []);

  return (
    <>
      <Card 
        onClick={handleClick}
        className="classroom-card"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
          }
        }}
        aria-label={`View details for ${name}`}
      >
        <div className="classroom-header">
          <h3 className="classroom-name">{name}</h3>
          <Badge variant={config.variant} size="sm">
            <span aria-hidden="true">{config.icon}</span> {config.label}
          </Badge>
        </div>
        
        <div className="classroom-metrics">
          <div className="metric-row">
            <span className="metric-label">
              <span aria-hidden="true">🌡️</span> Temperature
            </span>
            <span className="metric-value">
              {formatTemperature(temperature, preferences.temperatureUnit)}
            </span>
          </div>
          <div className="metric-row">
            <span className="metric-label">
              <span aria-hidden="true">💧</span> Humidity
            </span>
            <span className="metric-value">{humidity}%</span>
          </div>
          
          <div className="classroom-hint">
            Click for details →
          </div>
        </div>
      </Card>

      <RoomDetailsModal 
        room={classroom}
        isOpen={showDetails}
        onClose={handleClose}
      />
    </>
  );
};

export default ClassroomCard;