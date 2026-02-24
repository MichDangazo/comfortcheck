import { useState } from 'react';
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

  const handleClick = () => {
    console.log('Card clicked!', name);
    setShowDetails(true);
  };

  const handleClose = () => {
    console.log('Closing modal');
    setShowDetails(false);
  };

  return (
    <>
      <Card 
        onClick={handleClick}
        className="dark:bg-gray-800"
      >
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">{name}</h3>
          <Badge variant={config.variant} size="sm">
            {config.icon} {config.label}
          </Badge>
        </div>
        
        <div className="mt-3 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">🌡️ Temperature</span>
            <span className="font-medium text-gray-900 dark:text-gray-100">
              {formatTemperature(temperature, preferences.temperatureUnit)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">💧 Humidity</span>
            <span className="font-medium text-gray-900 dark:text-gray-100">{humidity}%</span>
          </div>
          
          <div className="mt-2 text-xs text-blue-600 dark:text-blue-400 text-right">
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