import { useState } from "react";
import Card from "../common/Card";
import Badge from "../common/Badge";

const comfortConfig = {
  comfortable: { variant: "success", label: "😊 Comfortable", icon: "✅" },
  warm: { variant: "warning", label: "😐 Warm", icon: "⚠️" },
  hot: { variant: "danger", label: "🥵 Hot", icon: "🔥" },
};

const ClassroomCard = ({ classroom, onSelect }) => {
  const { id, name, temperature, humidity, comfort } = classroom;
  const [expanded, setExpanded] = useState(false);
  const config = comfortConfig[comfort] || comfortConfig.comfortable;

  return (
    <Card 
      className="hover:border-blue-400 transition-all cursor-pointer"
      onClick={() => {
        setExpanded(!expanded);
        onSelect?.(classroom);
      }}
    >
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-bold">{name}</h3>
        <Badge variant={config.variant} size="sm">
          {config.icon} {config.label}
        </Badge>
      </div>
      
      <div className="mt-3 space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">🌡️ Temperature</span>
          <span className="font-medium">{temperature}°C</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">💧 Humidity</span>
          <span className="font-medium">{humidity}%</span>
        </div>
        
        {/* Interactive expanded section */}
        {expanded && (
          <div className="mt-3 pt-3 border-t border-gray-200 animate-fadeIn">
            <p className="text-sm text-gray-600 mb-2">Quick Actions:</p>
            <div className="flex gap-2">
              <Badge variant="info" size="sm" className="cursor-pointer hover:opacity-80">
                📊 Details
              </Badge>
              <Badge variant="default" size="sm" className="cursor-pointer hover:opacity-80">
                ⏰ History
              </Badge>
              <Badge variant="default" size="sm" className="cursor-pointer hover:opacity-80">
                🔔 Alert
              </Badge>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ClassroomCard;